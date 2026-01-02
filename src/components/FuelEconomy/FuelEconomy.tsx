import { useState, useEffect } from 'react';
import { Fuel, Leaf, DollarSign, Gauge, Info, ExternalLink, ChevronDown, ChevronUp, Trophy, MapPin } from 'lucide-react';
import {
  searchVehicle,
  getVehicleVariants,
  getFuelEconomyRating,
  getGHGRating,
  formatFuelCost,
  getTopMPGVehiclesStatic,
} from '../../services/fuelEconomyService';
import type { FuelEconomyData, TopMPGVehicle } from '../../services/fuelEconomyService';
import MPGRankingsModal from './MPGRankingsModal';
import GasStationsModal from './GasStationsModal';
import './FuelEconomy.css';

interface FuelEconomyProps {
  year: number;
  make: string;
  model: string;
  bodyStyle?: string;
}

const FuelEconomy = ({ year, make, model, bodyStyle }: FuelEconomyProps) => {
  const [fuelData, setFuelData] = useState<FuelEconomyData | null>(null);
  const [allVariants, setAllVariants] = useState<FuelEconomyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllVariants, setShowAllVariants] = useState(false);
  const [showRankingsModal, setShowRankingsModal] = useState(false);
  const [showGasStationsModal, setShowGasStationsModal] = useState(false);
  const [rankingsData, setRankingsData] = useState<{ 
    vehicles: TopMPGVehicle[]; 
    vehiclesByFuelType?: import('../../services/fuelEconomyService').TopMPGByFuelType;
    availableCategories?: import('../../services/fuelEconomyService').FuelCategory[];
    currentRank: number | null 
  }>({ vehicles: [], currentRank: null });

  useEffect(() => {
    const fetchFuelEconomy = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get the primary vehicle data
        const data = await searchVehicle(year, make, model);
        setFuelData(data);

        // Get all variants for comparison
        const variants = await getVehicleVariants(year, make, model);
        setAllVariants(variants);

        if (!data && variants.length === 0) {
          setError('Fuel economy data not available for this vehicle');
        }
      } catch (err) {
        console.error('Error fetching fuel economy:', err);
        setError('Unable to load fuel economy data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFuelEconomy();
  }, [year, make, model]);

  // Get segment average for comparison (based on body style)
  const getSegmentAverage = (): number => {
    const averages: Record<string, number> = {
      'sedan': 32,
      'suv': 26,
      'truck': 21,
      'coupe': 28,
      'hatchback': 33,
      'convertible': 26,
      'wagon': 30,
      'van': 22,
      'minivan': 22,
    };
    return averages[bodyStyle?.toLowerCase() || 'sedan'] || 28;
  };

  // Load rankings data when modal is opened
  const handleOpenRankings = () => {
    if (fuelData) {
      const data = getTopMPGVehiclesStatic(year, bodyStyle || 'sedan', make, model, fuelData.comb08);
      setRankingsData(data);
    }
    setShowRankingsModal(true);
  };

  if (isLoading) {
    return (
      <section className="fuel-economy">
        <div className="fuel-economy__header">
          <h2 className="fuel-economy__title">
            <Fuel size={24} />
            Fuel Economy
          </h2>
        </div>
        <div className="fuel-economy__loading">
          <div className="fuel-economy__spinner" />
          <span>Loading EPA fuel economy data...</span>
        </div>
      </section>
    );
  }

  if (error || !fuelData) {
    return (
      <section className="fuel-economy">
        <div className="fuel-economy__header">
          <h2 className="fuel-economy__title">
            <Fuel size={24} />
            Fuel Economy
          </h2>
        </div>
        <div className="fuel-economy__empty">
          <Fuel size={32} />
          <p>{error || 'Fuel economy data not available'}</p>
          <a 
            href={`https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=${year}&year2=${year}&make=${encodeURIComponent(make)}&baseModel=${encodeURIComponent(model)}&srchtyp=ymm`}
            target="_blank"
            rel="noopener noreferrer"
            className="fuel-economy__link"
          >
            Search on FuelEconomy.gov
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    );
  }

  const feRating = getFuelEconomyRating(fuelData.feScore);
  const ghgRating = getGHGRating(fuelData.ghgScore);
  const fuelCostInfo = formatFuelCost(fuelData.fuelCost08, fuelData.youSaveSpend);
  const segmentAverage = getSegmentAverage();
  const vsSegment = fuelData.comb08 - segmentAverage;

  return (
    <section className="fuel-economy">
      {/* Header */}
      <div className="fuel-economy__header">
        <h2 className="fuel-economy__title">
          <Fuel size={24} />
          Fuel Economy
        </h2>
        <span className="fuel-economy__source">
          <Info size={14} />
          EPA Estimates
        </span>
      </div>

      {/* Combined MPG & Cost to Drive Section */}
      <div className="fuel-economy__main-combined">
        {/* MPG Section (Combined + City/Highway stacked) */}
        <div className="fuel-economy__mpg-section">
          <div className="fuel-economy__mpg-combined">
            <span className="fuel-economy__mpg-value">{fuelData.comb08}</span>
            <span className="fuel-economy__mpg-unit">MPG</span>
            <span className="fuel-economy__mpg-label">Combined</span>
          </div>
          <div className="fuel-economy__mpg-right">
            <div className="fuel-economy__mpg-breakdown">
              <div className="fuel-economy__mpg-item">
                <span className="fuel-economy__mpg-item-value">{fuelData.city08}</span>
                <span className="fuel-economy__mpg-item-label">City</span>
              </div>
              <div className="fuel-economy__mpg-item">
                <span className="fuel-economy__mpg-item-value">{fuelData.highway08}</span>
                <span className="fuel-economy__mpg-item-label">Highway</span>
              </div>
            </div>
            <span className={`fuel-economy__vs-segment ${vsSegment >= 0 ? 'fuel-economy__vs-segment--positive' : 'fuel-economy__vs-segment--negative'}`}>
              {vsSegment >= 0 ? '+' : ''}{vsSegment} MPG vs {bodyStyle?.toLowerCase() || 'segment'} average
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="fuel-economy__section-divider" />

        {/* Cost to Drive */}
        <div className="fuel-economy__cost-section">
          <div className="fuel-economy__cost-to-drive-header">
            <h3 className="fuel-economy__cost-to-drive-title">
              Cost to Drive
              <span 
                className="fuel-economy__info-tooltip"
                title={`Calculated as: (15,000 miles/year ÷ ${fuelData.comb08} MPG) × $3.50/gallon ÷ 12 months = $${Math.round(fuelData.fuelCost08 / 12)}/mo. Average ${bodyStyle || 'vehicle'} uses ${segmentAverage} MPG for comparison.`}
              >
                <Info size={14} />
              </span>
            </h3>
            <p className="fuel-economy__cost-to-drive-subtitle">
              Monthly estimates based on California costs
            </p>
          </div>
          
          <div className="fuel-economy__cost-to-drive-comparison">
            <div className="fuel-economy__cost-to-drive-vehicle">
              <div className="fuel-economy__cost-to-drive-icon fuel-economy__cost-to-drive-icon--vehicle">
                <Fuel size={20} />
              </div>
              <div className="fuel-economy__cost-to-drive-amount">
                <span className="fuel-economy__cost-to-drive-value">
                  ${Math.round(fuelData.fuelCost08 / 12)}
                </span>
                <span className="fuel-economy__cost-to-drive-period">/mo</span>
              </div>
              <span className="fuel-economy__cost-to-drive-label">{model}</span>
            </div>

            <div className="fuel-economy__cost-to-drive-vs">vs</div>

            <div className="fuel-economy__cost-to-drive-average">
              <div className="fuel-economy__cost-to-drive-icon fuel-economy__cost-to-drive-icon--average">
                <Fuel size={20} />
              </div>
              <div className="fuel-economy__cost-to-drive-amount">
                <span className="fuel-economy__cost-to-drive-value fuel-economy__cost-to-drive-value--muted">
                  ${Math.round((15000 / segmentAverage) * 3.50 / 12)}
                </span>
                <span className="fuel-economy__cost-to-drive-period">/mo</span>
              </div>
              <span className="fuel-economy__cost-to-drive-label">Avg. {bodyStyle || 'Vehicle'}</span>
            </div>
          </div>

          <button 
            className="fuel-economy__cost-to-drive-cta"
            onClick={handleOpenRankings}
          >
            See Best MPG {bodyStyle || 'Vehicle'}
            <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
          </button>
        </div>
      </div>

      {/* Scores Grid */}
      <div className="fuel-economy__scores">
        {/* Fuel Economy Score */}
        <div className="fuel-economy__score-card">
          <div className="fuel-economy__score-header">
            <Gauge size={20} />
            <span>Fuel Economy Score</span>
          </div>
          <div className="fuel-economy__score-display">
            <div className="fuel-economy__score-gauge">
              <svg viewBox="0 0 100 50" className="fuel-economy__gauge-svg">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="var(--color-gray-200)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={`var(--color-${feRating.color === 'excellent' ? 'success' : feRating.color === 'good' ? 'success' : feRating.color === 'average' ? 'warning' : 'red'})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(fuelData.feScore / 10) * 126} 126`}
                />
              </svg>
              <span className="fuel-economy__score-value">{fuelData.feScore}</span>
              <span className="fuel-economy__score-max">/10</span>
            </div>
            <span className={`fuel-economy__score-label fuel-economy__score-label--${feRating.color}`}>
              {feRating.label}
            </span>
          </div>
        </div>

        {/* GHG Score */}
        <div className="fuel-economy__score-card">
          <div className="fuel-economy__score-header">
            <Leaf size={20} />
            <span>Greenhouse Gas Score</span>
          </div>
          <div className="fuel-economy__score-display">
            <div className="fuel-economy__score-gauge">
              <svg viewBox="0 0 100 50" className="fuel-economy__gauge-svg">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="var(--color-gray-200)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={`var(--color-${ghgRating.color === 'excellent' ? 'success' : ghgRating.color === 'good' ? 'success' : ghgRating.color === 'average' ? 'warning' : 'red'})`}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(fuelData.ghgScore / 10) * 126} 126`}
                />
              </svg>
              <span className="fuel-economy__score-value">{fuelData.ghgScore}</span>
              <span className="fuel-economy__score-max">/10</span>
            </div>
            <span className={`fuel-economy__score-label fuel-economy__score-label--${ghgRating.color}`}>
              {ghgRating.label}
            </span>
          </div>
          <span className="fuel-economy__co2">
            {fuelData.co2} g/mi CO₂
          </span>
        </div>

        {/* Annual Fuel Cost */}
        <div className="fuel-economy__score-card">
          <div className="fuel-economy__score-header">
            <DollarSign size={20} />
            <span>Annual Fuel Cost</span>
          </div>
          <div className="fuel-economy__cost-display">
            <span className="fuel-economy__cost-value">{fuelCostInfo.cost}</span>
            <span className={`fuel-economy__cost-comparison ${fuelCostInfo.isSaving ? 'fuel-economy__cost-comparison--saving' : 'fuel-economy__cost-comparison--spending'}`}>
              {fuelCostInfo.comparison}
            </span>
          </div>
          <button 
            className="fuel-economy__gas-stations-btn"
            onClick={() => setShowGasStationsModal(true)}
          >
            <MapPin size={16} />
            Find Gas Stations Near Me
          </button>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="fuel-economy__details">
        <h3 className="fuel-economy__details-title">Powertrain Details</h3>
        <div className="fuel-economy__details-grid">
          <div className="fuel-economy__detail-item">
            <span className="fuel-economy__detail-label">Engine</span>
            <span className="fuel-economy__detail-value">
              {fuelData.displ}L {fuelData.cylinders}-cyl
              {fuelData.tCharger === 'T' && ' Turbo'}
              {fuelData.sCharger === 'S' && ' Supercharged'}
            </span>
          </div>
          <div className="fuel-economy__detail-item">
            <span className="fuel-economy__detail-label">Transmission</span>
            <span className="fuel-economy__detail-value">{fuelData.trany}</span>
          </div>
          <div className="fuel-economy__detail-item">
            <span className="fuel-economy__detail-label">Drivetrain</span>
            <span className="fuel-economy__detail-value">{fuelData.drive}</span>
          </div>
          <div className="fuel-economy__detail-item">
            <span className="fuel-economy__detail-label">Fuel Type</span>
            <span className="fuel-economy__detail-value">{fuelData.fuelType1}</span>
          </div>
          {fuelData.startStop === 'Y' && (
            <div className="fuel-economy__detail-item">
              <span className="fuel-economy__detail-label">Start-Stop</span>
              <span className="fuel-economy__detail-value fuel-economy__detail-value--feature">Yes</span>
            </div>
          )}
        </div>
      </div>

      {/* All Variants */}
      {allVariants.length > 1 && (
        <div className="fuel-economy__variants">
          <button 
            className="fuel-economy__variants-toggle"
            onClick={() => setShowAllVariants(!showAllVariants)}
          >
            <span>Compare All {allVariants.length} Configurations</span>
            {showAllVariants ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {showAllVariants && (
            <div className="fuel-economy__variants-table">
              <table>
                <thead>
                  <tr>
                    <th>Configuration</th>
                    <th>City</th>
                    <th>Hwy</th>
                    <th>Comb</th>
                    <th>Annual Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {allVariants.map((variant) => (
                    <tr key={variant.id} className={variant.id === fuelData.id ? 'fuel-economy__variant--active' : ''}>
                      <td>
                        <span className="fuel-economy__variant-model">{variant.model}</span>
                        <span className="fuel-economy__variant-engine">
                          {variant.displ}L {variant.cylinders}-cyl {variant.trany}
                        </span>
                      </td>
                      <td>{variant.city08}</td>
                      <td>{variant.highway08}</td>
                      <td><strong>{variant.comb08}</strong></td>
                      <td>${variant.fuelCost08.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="fuel-economy__footer">
        <p className="fuel-economy__disclaimer">
          Fuel economy estimates from the U.S. Environmental Protection Agency. 
          Actual mileage will vary with driving conditions.
        </p>
        <a 
          href={`https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=${fuelData.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fuel-economy__epa-link"
        >
          View on FuelEconomy.gov
          <ExternalLink size={14} />
        </a>
      </div>

      {/* MPG Rankings Modal */}
      <MPGRankingsModal
        isOpen={showRankingsModal}
        onClose={() => setShowRankingsModal(false)}
        vehicles={rankingsData.vehicles}
        vehiclesByFuelType={rankingsData.vehiclesByFuelType}
        availableCategories={rankingsData.availableCategories}
        currentRank={rankingsData.currentRank}
        currentMake={make}
        currentModel={model}
        currentMPG={fuelData.comb08}
        bodyStyle={bodyStyle || 'sedan'}
        year={year}
      />

      {/* Gas Stations Modal */}
      <GasStationsModal
        isOpen={showGasStationsModal}
        onClose={() => setShowGasStationsModal(false)}
        vehicleName={`${year} ${make} ${model}`}
      />
    </section>
  );
};

export default FuelEconomy;

