export type CpoAssessment = {
  status: 'potential' | 'check';
  program: string;
  note: string;
};

// OEM criteria used for the preliminary screen. Recheck these when updating
// the model-year logic: Toyota https://www.toyotacertified.com/certification
// Honda https://www.hondacertified.com/certified-preowned-benefits
// Hyundai https://www.hyundaiusa.com/us/en/certified-used-vehicles
// Ford https://www.ford.com/used/about-certified/faq/

/**
 * Preliminary age/mileage screen for common OEM programs. This is not an
 * eligibility decision: model details, in-service date, history and inspection
 * can change the result. Always ask a participating dealer to verify.
 */
export function getCpoAssessment(year: number, make: string, mileage: number): CpoAssessment {
  const currentYear = new Date().getFullYear();
  const modelAge = currentYear - year;
  const normalizedMake = make.trim().toLowerCase();
  let program = '';

  if (normalizedMake === 'toyota') {
    if (modelAge <= 6 && mileage <= 85_000) program = 'Toyota Gold Certified';
    else if (modelAge <= 10 && mileage <= 125_000) program = 'Toyota Silver Certified';
  } else if (normalizedMake === 'honda') {
    if (modelAge <= 5 && mileage < 80_000) program = 'HondaTrue Certified';
    else if (modelAge <= 10) program = 'HondaTrue Used';
  } else if (normalizedMake === 'hyundai') {
    if (modelAge <= 6 && mileage <= 80_000) program = 'Hyundai Certified Used';
  } else if (normalizedMake === 'ford') {
    if (modelAge < 6 && mileage < 80_000) program = 'Ford Blue Advantage Gold';
    else if (modelAge < 10 && mileage < 150_000) program = 'Ford Blue Advantage Blue';
  }

  if (program) {
    return {
      status: 'potential',
      program,
      note: `Your ${year} ${make} is within the age and mileage screen for ${program}. A participating dealer must verify the vehicle history and complete its inspection before it can be certified.`,
    };
  }

  if (modelAge >= 0 && modelAge <= 5 && mileage < 80_000) {
    return {
      status: 'potential',
      program: 'CPO review',
      note: `Your ${year} ${make} is within a common age and mileage screening range. Ask a ${make} dealer which certification program applies; the rules vary by brand and a dealer inspection is required.`,
    };
  }

  return {
    status: 'check',
    program: 'CPO review',
    note: `CPO rules vary by brand and may include other program tiers. Ask a ${make} dealer to check this vehicle before you accept a trade-in offer.`,
  };
}
