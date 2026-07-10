/**
 * NHTSA (National Highway Traffic Safety Administration) API Service
 * Free API for vehicle recalls, safety ratings, and complaints
 * Documentation: https://vpic.nhtsa.dot.gov/api/
 */

export interface NHTSARecall {
  Manufacturer: string;
  NHTSACampaignNumber: string;
  ReportReceivedDate: string;
  Component: string;
  Summary: string;
  Consequence: string;
  Remedy: string;
  Notes: string;
  ModelYear: string;
  Make: string;
  Model: string;
}

export interface NHTSASafetyRating {
  VehicleId: number;
  VehicleDescription: string;
  ModelYear?: number;
  Make?: string;
  Model?: string;
  OverallRating: string;
  OverallFrontCrashRating: string;
  FrontCrashDriversideRating: string;
  FrontCrashPassengersideRating: string;
  FrontCrashPicture?: string;
  FrontCrashVideo?: string;
  OverallSideCrashRating: string;
  SideCrashDriversideRating: string;
  SideCrashPassengersideRating: string;
  SideCrashPicture?: string;
  SideCrashVideo?: string;
  RolloverRating: string;
  RolloverRating2: string;
  RolloverPossibility: number;
  RolloverPossibility2: number;
  SidePoleCrashRating: string;
  SidePolePicture?: string;
  SidePoleVideo?: string;
  NHTSAElectronicStabilityControl: string;
  NHTSAForwardCollisionWarning: string;
  NHTSALaneDepartureWarning: string;
}

export interface RecallsResponse {
  Count: number;
  Message: string;
  Results?: NHTSARecall[];
  results?: NHTSARecall[];
}

export interface SafetyRatingsResponse {
  Count: number;
  Message: string;
  Results: NHTSASafetyRating[];
}

export interface VehicleIdResponse {
  Count: number;
  Message: string;
  Results: Array<{
    VehicleId: number;
    VehicleDescription: string;
  }>;
}

export interface NHTSAComplaint {
  odiNumber: number;
  manufacturer: string;
  crash: boolean;
  fire: boolean;
  numberOfInjuries: number;
  numberOfDeaths: number;
  dateOfIncident: string;
  dateComplaintFiled: string;
  mileage?: number | string | null;
  Mileage?: number | string | null;
  MILEAGE?: number | string | null;
  vin: string;
  components: string;
  summary: string;
  products: Array<{
    type: string;
    productYear: string;
    productMake: string;
    productModel: string;
    manufacturer: string;
  }>;
}

export interface ComplaintsResponse {
  count?: number;
  Count?: number;
  Message?: string;
  results?: NHTSAComplaint[];
  Results?: NHTSAComplaint[];
}

export interface ComplaintsSummary {
  totalComplaints: number;
  crashCount: number;
  fireCount: number;
  injuryCount: number;
  deathCount: number;
  topComponents: { component: string; count: number }[];
  complaints: NHTSAComplaint[];
  recentComplaints: NHTSAComplaint[];
}

export interface ReliabilityContext {
  complaintsRating: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
  recallsRating: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
  complaintsPercentile: number; // 0-100, lower is better
  recallsPercentile: number;
  reliabilityScore: number;
  segmentAvgComplaints: number;
  segmentAvgRecalls: number;
  complaintsVsAverage: 'below' | 'average' | 'above';
  recallsVsAverage: 'below' | 'average' | 'above';
  overallRating: 'excellent' | 'good' | 'average' | 'below-average' | 'poor';
  summary: string;
}

interface ReliabilityContextOptions {
  modelYear?: number | string;
  complaintSummary?: Pick<ComplaintsSummary, 'crashCount' | 'fireCount' | 'injuryCount' | 'deathCount'>;
}

// Benchmark data based on approximate NHTSA model-year complaint and recall patterns.
// The reliability score adjusts these baselines by vehicle age before comparison.
const SEGMENT_BENCHMARKS: Record<string, { avgComplaints: number; avgRecalls: number }> = {
  'Sedan': { avgComplaints: 25, avgRecalls: 3 },
  'SUV': { avgComplaints: 45, avgRecalls: 5 },
  'Truck': { avgComplaints: 55, avgRecalls: 6 },
  'Coupe': { avgComplaints: 20, avgRecalls: 3 },
  'Hatchback': { avgComplaints: 20, avgRecalls: 3 },
  'Convertible': { avgComplaints: 15, avgRecalls: 2 },
  'Wagon': { avgComplaints: 20, avgRecalls: 3 },
  'Van': { avgComplaints: 40, avgRecalls: 5 },
  'default': { avgComplaints: 35, avgRecalls: 4 },
};

// Luxury brands tend to have higher complaint rates due to more complex systems
const LUXURY_BRANDS = ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche', 'Land Rover', 'Jaguar', 'Maserati', 'Bentley', 'Rolls-Royce', 'Genesis', 'Infiniti', 'Acura', 'Volvo', 'Lincoln', 'Cadillac'];

const RELIABILITY_SCORE_FLOOR = 60;
const RELIABILITY_SCORE_CEILING = 100;

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

const getModelYearAgeFactor = (modelYear?: number | string): number => {
  const parsedYear = typeof modelYear === 'string' ? parseInt(modelYear, 10) : modelYear;
  if (!parsedYear || Number.isNaN(parsedYear)) {
    return 1;
  }

  const currentYear = new Date().getFullYear();
  const modelAgeYears = clamp(currentYear - parsedYear + 1, 1, 8);

  // Benchmarks are tuned around a roughly three-model-year exposure window.
  // Newer vehicles should not be treated like they had the same time to gather complaints.
  return clamp(modelAgeYears / 3, 0.45, 2);
};

const getComplaintSeverityLoad = (
  complaintCount: number,
  complaintSummary?: ReliabilityContextOptions['complaintSummary'],
): number => {
  if (!complaintSummary || complaintCount <= 0) {
    return 0;
  }

  const weightedSignals = (
    complaintSummary.crashCount +
    complaintSummary.fireCount * 1.5 +
    complaintSummary.injuryCount * 2 +
    complaintSummary.deathCount * 4
  );

  return weightedSignals / complaintCount;
};

/**
 * Get reliability context comparing this vehicle to segment averages
 */
export function getReliabilityContext(
  complaintCount: number,
  recallCount: number,
  bodyStyle: string,
  make: string,
  options: ReliabilityContextOptions = {},
): ReliabilityContext {
  const isLuxury = LUXURY_BRANDS.includes(make);
  const benchmark = SEGMENT_BENCHMARKS[bodyStyle] || SEGMENT_BENCHMARKS['default'];
  const ageFactor = getModelYearAgeFactor(options.modelYear);
  
  // Adjust benchmarks for luxury brands (they typically have 50% more complaints)
  const adjustedAvgComplaints = (isLuxury ? benchmark.avgComplaints * 1.5 : benchmark.avgComplaints) * ageFactor;
  const adjustedAvgRecalls = (isLuxury ? benchmark.avgRecalls * 1.2 : benchmark.avgRecalls) * Math.sqrt(ageFactor);
  
  // Calculate percentile (0 = best, 100 = worst)
  const complaintsRatio = complaintCount / adjustedAvgComplaints;
  const recallsRatio = recallCount / adjustedAvgRecalls;
  const complaintSeverityLoad = getComplaintSeverityLoad(complaintCount, options.complaintSummary);
  
  // Convert ratio to percentile (capped at 100)
  const complaintsPercentile = Math.min(Math.round(complaintsRatio * 50), 100);
  const recallsPercentile = Math.min(Math.round(recallsRatio * 50), 100);
  const complaintVolumePenalty = clamp((complaintsRatio - 0.35) * 10, 0, 18);
  const recallPenalty = clamp((recallsRatio - 0.5) * 7, 0, 14);
  const severityPenalty = clamp(complaintSeverityLoad * 10, 0, 24);
  const reliabilityScore = clamp(
    Math.round(100 - complaintVolumePenalty - recallPenalty - severityPenalty),
    RELIABILITY_SCORE_FLOOR,
    RELIABILITY_SCORE_CEILING,
  );
  
  // Determine ratings
  const getComplaintsRating = (ratio: number): ReliabilityContext['complaintsRating'] => {
    if (ratio <= 0.3) return 'excellent';
    if (ratio <= 0.7) return 'good';
    if (ratio <= 1.3) return 'average';
    if (ratio <= 2.0) return 'below-average';
    return 'poor';
  };
  
  const getRecallsRating = (ratio: number): ReliabilityContext['recallsRating'] => {
    if (ratio <= 0.5) return 'excellent';
    if (ratio <= 0.8) return 'good';
    if (ratio <= 1.5) return 'average';
    if (ratio <= 2.5) return 'below-average';
    return 'poor';
  };
  
  const complaintsRating = getComplaintsRating(complaintsRatio);
  const recallsRating = getRecallsRating(recallsRatio);
  
  // Determine vs average
  const complaintsVsAverage: ReliabilityContext['complaintsVsAverage'] = 
    complaintsRatio < 0.8 ? 'below' : complaintsRatio > 1.2 ? 'above' : 'average';
  const recallsVsAverage: ReliabilityContext['recallsVsAverage'] = 
    recallsRatio < 0.8 ? 'below' : recallsRatio > 1.2 ? 'above' : 'average';
  
  // Calculate overall rating (weighted: complaints 60%, recalls 40%)
  const ratingValues = { 'excellent': 5, 'good': 4, 'average': 3, 'below-average': 2, 'poor': 1 };
  const overallScore = (ratingValues[complaintsRating] * 0.6) + (ratingValues[recallsRating] * 0.4);
  
  let overallRating: ReliabilityContext['overallRating'];
  if (overallScore >= 4.5) overallRating = 'excellent';
  else if (overallScore >= 3.5) overallRating = 'good';
  else if (overallScore >= 2.5) overallRating = 'average';
  else if (overallScore >= 1.5) overallRating = 'below-average';
  else overallRating = 'poor';
  
  // Generate human-readable summary
  const segmentName = isLuxury ? `luxury ${bodyStyle.toLowerCase()}s` : `${bodyStyle.toLowerCase()}s`;
  let summary = '';
  
  if (overallRating === 'excellent' || overallRating === 'good') {
    if (complaintCount === 0 && recallCount === 0) {
      summary = `Outstanding reliability record with no reported issues.`;
    } else if (complaintsVsAverage === 'below' && recallsVsAverage === 'below') {
      summary = `Fewer complaints and recalls than average for ${segmentName}.`;
    } else if (complaintsVsAverage === 'below') {
      summary = `Fewer owner complaints than typical for ${segmentName}.`;
    } else {
      summary = `Reliability is better than average for this segment.`;
    }
  } else if (overallRating === 'average') {
    summary = `Reliability is typical for ${segmentName} of this model year.`;
  } else {
    if (complaintsVsAverage === 'above' && recallsVsAverage === 'above') {
      summary = `More complaints and recalls than average. Review issues before buying.`;
    } else if (complaintsVsAverage === 'above') {
      summary = `Higher than average complaint rate. Check common issues carefully.`;
    } else {
      summary = `More recalls than typical. Verify all recalls have been addressed.`;
    }
  }
  
  return {
    complaintsRating,
    recallsRating,
    complaintsPercentile,
    recallsPercentile,
    reliabilityScore,
    segmentAvgComplaints: Math.round(adjustedAvgComplaints),
    segmentAvgRecalls: Math.round(adjustedAvgRecalls),
    complaintsVsAverage,
    recallsVsAverage,
    overallRating,
    summary,
  };
}

const NHTSA_BASE_URL = 'https://api.nhtsa.gov';

function normalizeNhtsaMatchValue(value: string | undefined): string {
  return (value || '').trim().toUpperCase();
}

function findPreferredVehicleId(
  results: VehicleIdResponse['Results'],
  preferredDrivetrain?: string
): number | null {
  if (!results.length) {
    return null;
  }

  const normalizedDrivetrain = normalizeNhtsaMatchValue(preferredDrivetrain);
  if (normalizedDrivetrain) {
    const drivetrainMatch = results.find((result) => (
      normalizeNhtsaMatchValue(result.VehicleDescription).includes(normalizedDrivetrain)
    ));

    if (drivetrainMatch) {
      return drivetrainMatch.VehicleId;
    }
  }

  return results[0].VehicleId;
}

/**
 * Fetch recalls for a specific vehicle
 */
export async function getRecalls(
  make: string,
  model: string,
  modelYear: number | string
): Promise<NHTSARecall[]> {
  try {
    // Skip API call for future model years (NHTSA doesn't have data for future years)
    const year: number = typeof modelYear === 'string' ? parseInt(modelYear, 10) : modelYear;
    if (isNaN(year)) {
      return [] as NHTSARecall[];
    }
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      return [] as NHTSARecall[];
    }

    const url = `${NHTSA_BASE_URL}/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${modelYear}`;
    
    const response = await fetch(url);
    
    // Handle 400 Bad Request gracefully (invalid parameters, future years, etc.)
    if (response.status === 400) {
    
      return [];
    }
    
    if (!response.ok) {
      throw new Error(`NHTSA API error: ${response.status}`);
    }
    
    const data: RecallsResponse = await response.json();
    // API returns 'results' (lowercase) but TypeScript interface uses 'Results'
    return data.results || data.Results || [];
  } catch (error) {
    // Only log unexpected errors (network issues, 500 errors, etc.)
    if (error instanceof Error && !error.message.includes('400')) {
      console.error('Error fetching NHTSA recalls:', error);
    }
    return [];
  }
}

/**
 * Get vehicle ID for safety ratings lookup
 */
export async function getVehicleId(
  make: string,
  model: string,
  modelYear: number | string,
  preferredDrivetrain?: string
): Promise<number | null> {
  try {
    // Skip API call for future model years (NHTSA doesn't have data for future years)
    const year: number = typeof modelYear === 'string' ? parseInt(modelYear, 10) : modelYear;
    if (isNaN(year)) {
      return null;
    }
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      return null;
    }

    const url = `${NHTSA_BASE_URL}/SafetyRatings/modelyear/${modelYear}/make/${encodeURIComponent(make)}/model/${encodeURIComponent(model)}?format=json`;
    const response = await fetch(url);
    
    // Handle 400 Bad Request gracefully (invalid parameters, future years, etc.)
    if (response.status === 400) {
    
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`NHTSA API error: ${response.status}`);
    }
    
    const data: VehicleIdResponse = await response.json();
    
    return findPreferredVehicleId(data.Results || [], preferredDrivetrain);
  } catch (error) {
    console.error('Error fetching NHTSA vehicle ID:', error);
    return null;
  }
}

/**
 * Get safety ratings for a vehicle by its NHTSA Vehicle ID
 */
export async function getSafetyRatings(
  vehicleId: number
): Promise<NHTSASafetyRating | null> {
  try {
    const url = `${NHTSA_BASE_URL}/SafetyRatings/VehicleId/${vehicleId}?format=json`;
    
    const response = await fetch(url);
    
    
    if (!response.ok) {
      throw new Error(`NHTSA API error: ${response.status}`);
    }
    
    const data: SafetyRatingsResponse = await response.json();
    
    if (data.Results && data.Results.length > 0) {
      return data.Results[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching NHTSA safety ratings:', error);
    return null;
  }
}

/**
 * Get both vehicle ID and safety ratings in one call
 */
export async function getVehicleSafetyRatings(
  make: string,
  model: string,
  modelYear: number | string,
  preferredDrivetrain?: string
): Promise<NHTSASafetyRating | null> {
  const vehicleId = await getVehicleId(make, model, modelYear, preferredDrivetrain);
  
  if (!vehicleId) {
    return null;
  }
  
  return getSafetyRatings(vehicleId);
}

/**
 * Format a recall date string
 */
export function formatRecallDate(dateString: string): string {
  if (!dateString) return 'Unknown date';
  
  try {
    const dayFirstMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    const date = dayFirstMatch
      ? new Date(
        parseInt(dayFirstMatch[3], 10),
        parseInt(dayFirstMatch[2], 10) - 1,
        parseInt(dayFirstMatch[1], 10),
      )
      : new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Convert NHTSA star rating string to number
 */
export function parseStarRating(rating: string): number | null {
  if (!rating || rating === 'Not Rated') return null;
  
  const match = rating.match(/(\d)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Fetch complaints for a specific vehicle
 */
export async function getComplaints(
  make: string,
  model: string,
  modelYear: number | string
): Promise<NHTSAComplaint[]> {
  try {
    // Skip API call for future model years (NHTSA doesn't have data for future years)
    const year: number = typeof modelYear === 'string' ? parseInt(modelYear, 10) : modelYear;
    if (isNaN(year)) {
      return [] as NHTSAComplaint[];
    }
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
      return [] as NHTSAComplaint[];
    }

    const url = `${NHTSA_BASE_URL}/complaints/complaintsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${modelYear}`;
    
    const response = await fetch(url);
    
    
    // Handle 400 Bad Request gracefully (invalid parameters, future years, etc.)
    if (response.status === 400) {
      return [];
    }
    if (!response.ok) {
      throw new Error(`NHTSA API error: ${response.status}`);
    }
    
    const data: ComplaintsResponse = await response.json();
    return data.results || data.Results || [];
  } catch (error) {
    console.error('Error fetching NHTSA complaints:', error);
    return [] as NHTSAComplaint[];
  }
}

/**
 * Get a summary of complaints for a vehicle
 */
export function getComplaintsSummary(complaints: NHTSAComplaint[]): ComplaintsSummary {
  const crashCount = complaints.filter(c => c.crash).length;
  const fireCount = complaints.filter(c => c.fire).length;
  const injuryCount = complaints.reduce((sum, c) => sum + (c.numberOfInjuries || 0), 0);
  const deathCount = complaints.reduce((sum, c) => sum + (c.numberOfDeaths || 0), 0);
  
  // Count complaints by component
  const componentCounts: Record<string, number> = {};
  complaints.forEach(c => {
    if (c.components) {
      // Components can be comma-separated
      const parts = c.components.split(',').map(s => s.trim());
      parts.forEach(component => {
        if (component) {
          componentCounts[component] = (componentCounts[component] || 0) + 1;
        }
      });
    }
  });
  
  // Sort by count and take top 5
  const topComponents = Object.entries(componentCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([component, count]) => ({ component, count }));
  
  const sortedComplaints = [...complaints]
    .sort((a, b) => {
      const dateA = new Date(a.dateComplaintFiled || '');
      const dateB = new Date(b.dateComplaintFiled || '');
      return dateB.getTime() - dateA.getTime();
    });

  // Get 3 most recent complaints
  const recentComplaints = sortedComplaints.slice(0, 3);
  
  return {
    totalComplaints: complaints.length,
    crashCount,
    fireCount,
    injuryCount,
    deathCount,
    topComponents,
    complaints: sortedComplaints,
    recentComplaints,
  };
}

/**
 * Format a complaint date string from NHTSA's MM/DD/YYYY API format.
 */
export function formatComplaintDate(dateString: string): string {
  if (!dateString) return 'Unknown date';
  
  try {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    return dateString;
  } catch {
    return dateString;
  }
}

/**
 * Format complaint mileage when NHTSA sends a mileage field, or when the report
 * text includes an odometer-style mileage statement.
 */
export function formatComplaintMileage(complaint: NHTSAComplaint): string | null {
  const rawMileage = complaint.mileage ?? complaint.Mileage ?? complaint.MILEAGE;
  const summaryText = complaint.summary || '';
  const summaryMileageMatch = summaryText.match(/\b(under|about|around|approximately|approx\.?|over|nearly)?\s*(\d{1,3}(?:,\d{3})+|\d+)\s*(?:miles|mile|mi)\b/i);
  const summaryMileageStatementMatch = summaryText.match(/\b(?:failure\s+)?(?:mileage|odometer(?:\s+reading)?)\s*(?:was|is|read|reads|reading|reported\s+as|:|-)?\s*(under|about|around|approximately|approx\.?|over|nearly)?\s*(\d{1,3}(?:,\d{3})+|\d+)\b/i);
  const mileagePrefix = (summaryMileageMatch?.[1] || summaryMileageStatementMatch?.[1])
    ?.replace(/\.$/, '')
    .toLowerCase();
  const mileageValue = rawMileage ?? summaryMileageMatch?.[2] ?? summaryMileageStatementMatch?.[2];
  if (mileageValue === null || mileageValue === undefined || mileageValue === '') return null;

  const numericMileage = typeof mileageValue === 'number'
    ? mileageValue
    : Number(String(mileageValue).replace(/[^0-9.]/g, ''));

  if (!Number.isFinite(numericMileage) || numericMileage < 0) return null;

  const formattedMileage = `${new Intl.NumberFormat('en-US').format(Math.round(numericMileage))} mi`;
  return mileagePrefix ? `${mileagePrefix} ${formattedMileage}` : formattedMileage;
}
