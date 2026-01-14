import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import { getMarketSpeedVehicles, type MarketSpeedVehicle } from '../../services/vehicleService';
import './MarketSpeed.css';

interface MarketSpeedProps {
  vehicleName?: string;
  make?: string;
  model?: string;
  bodyStyle?: string;
  msrp?: number;
}

const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];

const MarketSpeed = ({
  vehicleName = '2025 Chevrolet Trax',
  make = 'Chevrolet',
  model = 'Trax',
  bodyStyle = 'SUV',
  msrp = 21895,
}: MarketSpeedProps) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Get vehicles from database for the market speed table
  const salesData = useMemo<MarketSpeedVehicle[]>(() => {
    return getMarketSpeedVehicles(bodyStyle, make, model, msrp, 5);
  }, [bodyStyle, make, model, msrp]);

  const cities = selectedState 
    ? ['All Cities', `${selectedState} City 1`, `${selectedState} City 2`, `${selectedState} City 3`]
    : [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const tooltipContent: Record<string, string> = {
    marketDaySupply: 'The average number of days it takes for a vehicle to sell. Lower numbers indicate faster-selling vehicles.',
    totalForSale: 'The total number of this vehicle currently listed for sale in your selected area.',
    totalSold: 'The total number of this vehicle sold in the last 45 days in your selected area.',
  };

  return (
    <section className="market-speed">
      <div className="market-speed__card">
        {/* Header */}
        <div className="market-speed__header">
          <h2 className="market-speed__title">How Fast Does {model} Sell?</h2>
          <p className="market-speed__description">
            Explore how quickly the {vehicleName} is moving off lots. Navigate to your state or city for more detailed insights on local {make} {model} availability and offers.
          </p>
        </div>

        {/* Filters */}
        <div className="market-speed__filters">
          <div className="market-speed__select-wrapper">
            <button
              className="market-speed__select"
              onClick={() => {
                setStateDropdownOpen(!stateDropdownOpen);
                setCityDropdownOpen(false);
              }}
            >
              <span className={selectedState ? '' : 'market-speed__placeholder'}>
                {selectedState || 'Select a State'}
              </span>
              <ChevronDown size={20} />
            </button>
            {stateDropdownOpen && (
              <ul className="market-speed__options">
                {states.map((state) => (
                  <li key={state}>
                    <button
                      className={`market-speed__option ${selectedState === state ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedState(state);
                        setSelectedCity('');
                        setStateDropdownOpen(false);
                      }}
                    >
                      {state}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="market-speed__select-wrapper">
            <button
              className={`market-speed__select ${!selectedState ? 'market-speed__select--disabled' : ''}`}
              onClick={() => {
                if (selectedState) {
                  setCityDropdownOpen(!cityDropdownOpen);
                  setStateDropdownOpen(false);
                }
              }}
              disabled={!selectedState}
            >
              <span className={selectedCity ? '' : 'market-speed__placeholder'}>
                {selectedCity || 'Select a City'}
              </span>
              <ChevronDown size={20} />
            </button>
            {cityDropdownOpen && cities.length > 0 && (
              <ul className="market-speed__options">
                {cities.map((city) => (
                  <li key={city}>
                    <button
                      className={`market-speed__option ${selectedCity === city ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                    >
                      {city}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="market-speed__table-wrapper">
          <table className="market-speed__table">
            <thead>
              <tr>
                <th></th>
                <th>Make</th>
                <th>Model</th>
                <th>
                  <span className="market-speed__th-content">
                    Market Day Supply
                    <button 
                      className="market-speed__info-btn"
                      onMouseEnter={() => setActiveTooltip('marketDaySupply')}
                      onMouseLeave={() => setActiveTooltip(null)}
                      aria-label="More info about Market Day Supply"
                    >
                      <Info size={16} aria-hidden="true" />
                      {activeTooltip === 'marketDaySupply' && (
                        <div className="market-speed__tooltip" role="tooltip">
                          {tooltipContent.marketDaySupply}
                        </div>
                      )}
                    </button>
                  </span>
                </th>
                <th>
                  <span className="market-speed__th-content">
                    Total For Sale
                    <button 
                      className="market-speed__info-btn"
                      onMouseEnter={() => setActiveTooltip('totalForSale')}
                      onMouseLeave={() => setActiveTooltip(null)}
                      aria-label="More info about Total For Sale"
                    >
                      <Info size={16} aria-hidden="true" />
                      {activeTooltip === 'totalForSale' && (
                        <div className="market-speed__tooltip" role="tooltip">
                          {tooltipContent.totalForSale}
                        </div>
                      )}
                    </button>
                  </span>
                </th>
                <th>
                  <span className="market-speed__th-content">
                    Total Sold <span className="market-speed__th-sub">(45 days)</span>
                    <button 
                      className="market-speed__info-btn"
                      onMouseEnter={() => setActiveTooltip('totalSold')}
                      onMouseLeave={() => setActiveTooltip(null)}
                      aria-label="More info about Total Sold"
                    >
                      <Info size={16} aria-hidden="true" />
                      {activeTooltip === 'totalSold' && (
                        <div className="market-speed__tooltip" role="tooltip">
                          {tooltipContent.totalSold}
                        </div>
                      )}
                    </button>
                  </span>
                </th>
                <th>Avg Selling Price</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((vehicle) => (
                <tr key={vehicle.rank} className={vehicle.isCurrentVehicle ? 'market-speed__row--highlight' : ''}>
                  <td className="market-speed__rank">{vehicle.rank}</td>
                  <td>
                    <Link to={`/${vehicle.slug}`} className="market-speed__link">{vehicle.make}</Link>
                  </td>
                  <td>
                    <Link to={`/${vehicle.slug}`} className="market-speed__link">{vehicle.model}</Link>
                  </td>
                  <td>{vehicle.marketDaySupply}</td>
                  <td>
                    <Link to={`/${vehicle.slug}`} className="market-speed__link">{formatNumber(vehicle.totalForSale)}</Link>
                  </td>
                  <td>{formatNumber(vehicle.totalSold)}</td>
                  <td className="market-speed__price">{formatCurrency(vehicle.avgSellingPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Link */}
        <Link to="/vehicles" className="market-speed__footer-link">
          Show all fastest selling cars in my area
          <ChevronRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default MarketSpeed;
