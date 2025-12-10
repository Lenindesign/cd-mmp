import { useState } from 'react';
import { ChevronDown, Info, ChevronRight } from 'lucide-react';
import './MarketSpeed.css';

interface VehicleSalesData {
  rank: number;
  make: string;
  model: string;
  marketDaySupply: number;
  totalForSale: number;
  totalSold: number;
  avgSellingPrice: number;
}

interface MarketSpeedProps {
  vehicleName?: string;
  make?: string;
  model?: string;
}

const defaultSalesData: VehicleSalesData[] = [
  { rank: 1, make: 'Chevrolet', model: 'Trax', marketDaySupply: 15, totalForSale: 3245, totalSold: 8750, avgSellingPrice: 22195 },
  { rank: 2, make: 'Honda', model: 'HR-V', marketDaySupply: 19, totalForSale: 4890, totalSold: 9420, avgSellingPrice: 25050 },
  { rank: 3, make: 'Toyota', model: 'Corolla Cross', marketDaySupply: 21, totalForSale: 5120, totalSold: 8930, avgSellingPrice: 24035 },
  { rank: 4, make: 'Hyundai', model: 'Kona', marketDaySupply: 24, totalForSale: 3890, totalSold: 6540, avgSellingPrice: 25175 },
  { rank: 5, make: 'Kia', model: 'Seltos', marketDaySupply: 26, totalForSale: 2980, totalSold: 5210, avgSellingPrice: 26085 },
];

const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];

const MarketSpeed = ({
  vehicleName = '2025 Chevrolet Trax',
  make = 'Chevrolet',
  model = 'Trax',
}: MarketSpeedProps) => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
                    >
                      <Info size={16} />
                      {activeTooltip === 'marketDaySupply' && (
                        <div className="market-speed__tooltip">
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
                    >
                      <Info size={16} />
                      {activeTooltip === 'totalForSale' && (
                        <div className="market-speed__tooltip">
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
                    >
                      <Info size={16} />
                      {activeTooltip === 'totalSold' && (
                        <div className="market-speed__tooltip">
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
              {defaultSalesData.map((vehicle) => (
                <tr key={vehicle.rank} className={vehicle.rank === 1 ? 'market-speed__row--highlight' : ''}>
                  <td className="market-speed__rank">{vehicle.rank}</td>
                  <td>
                    <a href="#" className="market-speed__link">{vehicle.make}</a>
                  </td>
                  <td>
                    <a href="#" className="market-speed__link">{vehicle.model}</a>
                  </td>
                  <td>{vehicle.marketDaySupply}</td>
                  <td>
                    <a href="#" className="market-speed__link">{formatNumber(vehicle.totalForSale)}</a>
                  </td>
                  <td>{formatNumber(vehicle.totalSold)}</td>
                  <td className="market-speed__price">{formatCurrency(vehicle.avgSellingPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Link */}
        <a href="#" className="market-speed__footer-link">
          Show all fastest selling cars in my area
          <ChevronRight size={20} />
        </a>
      </div>
    </section>
  );
};

export default MarketSpeed;

