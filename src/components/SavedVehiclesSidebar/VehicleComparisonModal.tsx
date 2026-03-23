import { useEffect, useRef, useMemo, useState } from 'react';
import { X, Check, Minus, Star, Fuel, Gauge, Settings, DollarSign, Sparkles, ChevronUp, Search, Trash2 } from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import { OptimizedImage } from '../OptimizedImage';
import { useVehicleAIChat } from '../../hooks/useVehicleAIChat';
import './VehicleComparisonModal.css';

interface CompareVehicle {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

interface VehicleComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: CompareVehicle[];
}

interface ComparisonSpec {
  category: string;
  specs: {
    name: string;
    values: (string | boolean | null)[];
    highlight?: 'higher' | 'lower'; // Which is better
  }[];
}

const VehicleComparisonModal = ({ isOpen, onClose, vehicles }: VehicleComparisonModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Get vehicle details from database
  const getVehicleDetails = (vehicleName: string) => {
    const parts = vehicleName.split(' ');
    const firstPartIsYear = parts.length >= 1 && /^\d{4}$/.test(parts[0]);
    
    if (firstPartIsYear && parts.length >= 3) {
      const year = parseInt(parts[0]);
      const make = parts[1];
      const model = parts.slice(2).join(' ');
      
      let vehicle = vehicleDatabase.find(
        v => Number(v.year) === year && v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
      
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
        );
      }
      
      return vehicle;
    } else if (parts.length >= 2) {
      const make = parts[0];
      const model = parts.slice(1).join(' ');
      
      return vehicleDatabase.find(
        v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
    }
    
    return null;
  };

  // Get full vehicle data for comparison
  const vehicleData = useMemo(() => {
    return vehicles.map(v => ({
      ...v,
      details: getVehicleDetails(v.name)
    }));
  }, [vehicles]);

  // Generate comparison data
  const comparisonData = useMemo((): ComparisonSpec[] => {
    return [
      {
        category: 'Pricing',
        specs: [
          { 
            name: 'Starting MSRP', 
            values: vehicleData.map(v => v.details?.priceMin ? `$${v.details.priceMin.toLocaleString()}` : '—'),
            highlight: 'lower'
          },
          { 
            name: 'Price Range', 
            values: vehicleData.map(v => v.details?.priceRange || '—')
          },
        ],
      },
      {
        category: 'Ratings',
        specs: [
          { 
            name: 'C/D Rating', 
            values: vehicleData.map(v => v.details?.staffRating ? `${v.details.staffRating.toFixed(1)}/10` : '—'),
            highlight: 'higher'
          },
          { 
            name: 'Community Rating', 
            values: vehicleData.map(v => v.details?.communityRating ? `${v.details.communityRating.toFixed(1)}/10` : '—'),
            highlight: 'higher'
          },
        ],
      },
      {
        category: 'Performance',
        specs: [
          { 
            name: 'Horsepower', 
            values: vehicleData.map(v => v.details?.horsepower ? `${v.details.horsepower} hp` : '—'),
            highlight: 'higher'
          },
          { 
            name: 'Fuel Economy', 
            values: vehicleData.map(v => v.details?.mpg || '—'),
            highlight: 'higher'
          },
          { 
            name: 'Drivetrain', 
            values: vehicleData.map(v => v.details?.drivetrain || '—')
          },
          { 
            name: 'Transmission', 
            values: vehicleData.map(v => v.details?.transmission || '—')
          },
        ],
      },
      {
        category: 'Details',
        specs: [
          { 
            name: 'Body Style', 
            values: vehicleData.map(v => v.details?.bodyStyle || '—')
          },
          { 
            name: 'Fuel Type', 
            values: vehicleData.map(v => v.details?.fuelType || '—')
          },
          { 
            name: 'Seating', 
            values: vehicleData.map(v => v.details?.seatingCapacity ? `${v.details.seatingCapacity} passengers` : '—')
          },
          { 
            name: 'Cargo Space', 
            values: vehicleData.map(v => v.details?.cargoSpace ? `${v.details.cargoSpace} cu ft` : '—'),
            highlight: 'higher'
          },
        ],
      },
      {
        category: 'Awards',
        specs: [
          { 
            name: "Editor's Choice", 
            values: vehicleData.map(v => v.details?.editorsChoice ?? false)
          },
          { 
            name: '10Best', 
            values: vehicleData.map(v => v.details?.tenBest ?? false)
          },
          { 
            name: 'EV of the Year', 
            values: vehicleData.map(v => v.details?.evOfTheYear ?? false)
          },
        ],
      },
    ];
  }, [vehicleData]);

  // Find best value for highlighting
  const getBestValueIndex = (values: (string | boolean | null)[], highlight?: 'higher' | 'lower'): number | null => {
    if (!highlight) return null;
    
    const numericValues = values.map(v => {
      if (typeof v === 'string') {
        const match = v.match(/[\d,.]+/);
        return match ? parseFloat(match[0].replace(/,/g, '')) : null;
      }
      return null;
    });
    
    const validIndices = numericValues
      .map((v, i) => ({ value: v, index: i }))
      .filter(item => item.value !== null);
    
    if (validIndices.length < 2) return null;
    
    if (highlight === 'higher') {
      return validIndices.reduce((best, current) => 
        (current.value! > best.value!) ? current : best
      ).index;
    } else {
      return validIndices.reduce((best, current) => 
        (current.value! < best.value!) ? current : best
      ).index;
    }
  };

  const [aiExpanded, setAiExpanded] = useState(true);
  const [aiQuery, setAiQuery] = useState('');
  const vehicleDetails = useMemo(() => vehicleData.map(v => v.details ?? null), [vehicleData]);
  const { messages: chatMessages, isTyping: aiTyping, sendMessage: sendAiMessage, clearChat } = useVehicleAIChat(vehicleDetails);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const aiSummary = useMemo(() => {
    if (vehicleData.length < 2) return '';
    const names = vehicleData.map(v => { const d = v.details; return d ? `${d.year} ${d.make} ${d.model}` : v.name; });
    const parts: string[] = [];

    const seats = vehicleData.map(v => v.details?.seatingCapacity || 0);
    if (seats.some(s => s > 0) && new Set(seats.filter(s => s > 0)).size > 1) {
      const maxI = seats.indexOf(Math.max(...seats));
      const minI = seats.indexOf(Math.min(...seats.filter(s => s > 0)));
      if (maxI !== minI) parts.push(`The most significant difference is seating capacity: the **${names[maxI]}** offers ${seats[maxI]} seats, while the **${names[minI]}** is a ${seats[minI]}-seat vehicle.`);
    }

    const prices = vehicleData.map(v => v.details?.priceMin || 0);
    if (prices.filter(p => p > 0).length >= 2) {
      const strs = vehicleData.map((_, i) => prices[i] > 0 ? `The **${names[i]}** starts at **$${prices[i].toLocaleString()}**` : null).filter(Boolean);
      if (strs.length >= 2) parts.push(strs.join(', compared to ') + '.');
    }

    const hps = vehicleData.map(v => v.details?.horsepower || 0);
    if (hps.filter(h => h > 0).length >= 2) {
      const maxI = hps.indexOf(Math.max(...hps));
      parts.push(`The **${names[maxI]}** leads in power with **${hps[maxI]} hp**.`);
    }

    const ratings = vehicleData.map(v => v.details?.staffRating || 0);
    if (ratings.filter(r => r > 0).length >= 2) {
      const topI = ratings.indexOf(Math.max(...ratings));
      parts.push(`The **${names[topI]}** earns the highest C/D rating at **${ratings[topI].toFixed(1)}/10**.`);
    }

    const mpgs = vehicleData.map(v => { const m = v.details?.mpg?.match(/(\d+)\/(\d+)/); return m ? (parseInt(m[1]) + parseInt(m[2])) / 2 : 0; });
    if (mpgs.filter(m => m > 0).length >= 2) {
      const bestI = mpgs.indexOf(Math.max(...mpgs));
      parts.push(`The **${names[bestI]}** offers the best fuel economy at **${vehicleData[bestI].details?.mpg} mpg**.`);
    }

    return parts.join(' ') || `Compare the ${names.join(' and ')} across pricing, performance, and features.`;
  }, [vehicleData]);

  const POPULAR_SUGGESTIONS = [
    'Best for city commute',
    'Best safety ratings',
    'Most cargo space',
    'Best for winter driving',
    'Best for long highway commute',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, aiTyping]);

  if (!isOpen || vehicles.length < 2) return null;

  const renderValue = (value: string | boolean | null, isBest: boolean = false) => {
    if (value === true) {
      return (
        <span className="vehicle-compare-value vehicle-compare-value--yes">
          <Check size={18} />
        </span>
      );
    }
    if (value === false) {
      return (
        <span className="vehicle-compare-value vehicle-compare-value--no">
          <Minus size={16} />
        </span>
      );
    }
    if (value === null || value === '—') {
      return (
        <span className="vehicle-compare-value vehicle-compare-value--na">
          <Minus size={16} />
        </span>
      );
    }
    return (
      <span className={`vehicle-compare-value vehicle-compare-value--text ${isBest ? 'vehicle-compare-value--best' : ''}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="vehicle-comparison-modal" onClick={handleBackdropClick}>
      <div className="vehicle-comparison-modal__content" ref={modalRef}>
        {/* Header */}
        <header className="vehicle-comparison-modal__header">
          <div className="vehicle-comparison-modal__header-content">
            <h2 className="vehicle-comparison-modal__title">Compare Vehicles</h2>
            <p className="vehicle-comparison-modal__subtitle">
              Side-by-side comparison of {vehicles.length} vehicles
            </p>
          </div>
          <button
            className="vehicle-comparison-modal__close"
            onClick={onClose}
            aria-label="Close comparison"
          >
            <X size={24} />
          </button>
        </header>

        {/* Scrollable content area */}
        <div className="vehicle-comparison-modal__body">
          {/* Vehicle Cards Header */}
          <div className="vehicle-comparison-modal__vehicles">
            {vehicleData.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-compare-card">
                <div className="vehicle-compare-card__image">
                  <OptimizedImage
                    src={vehicle.details?.image || vehicle.image}
                    alt={vehicle.name}
                    width={200}
                    height={130}
                  />
                </div>
                <div className="vehicle-compare-card__info">
                  <h3 className="vehicle-compare-card__name">{vehicle.name}</h3>
                  <div className="vehicle-compare-card__meta">
                    <span className="vehicle-compare-card__price">
                      <DollarSign size={14} />
                      {vehicle.details?.priceMin ? `$${vehicle.details.priceMin.toLocaleString()}` : `$${vehicle.price.toLocaleString()}`}
                    </span>
                    {vehicle.details?.staffRating && (
                      <span className="vehicle-compare-card__rating">
                        <Star size={14} fill="currentColor" />
                        {vehicle.details.staffRating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  {vehicle.details && (
                    <div className="vehicle-compare-card__specs">
                      {vehicle.details.horsepower && (
                        <span className="vehicle-compare-card__spec">
                          <Gauge size={12} />
                          {vehicle.details.horsepower} hp
                        </span>
                      )}
                      {vehicle.details.mpg && (
                        <span className="vehicle-compare-card__spec">
                          <Fuel size={12} />
                          {vehicle.details.mpg}
                        </span>
                      )}
                      {vehicle.details.drivetrain && (
                        <span className="vehicle-compare-card__spec">
                          <Settings size={12} />
                          {vehicle.details.drivetrain}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Table */}
          {comparisonData.filter(c => c.category === 'Pricing').length > 0 && (
            <div className="vehicle-comparison-table-wrapper">
              <table className="vehicle-comparison-table">
                <thead className="vehicle-comparison-table__head">
                  <tr>
                    <th className="vehicle-comparison-table__corner">Specification</th>
                    {vehicleData.map((vehicle) => (
                      <th key={vehicle.id} className="vehicle-comparison-table__vehicle-header">
                        {vehicle.details?.make} {vehicle.details?.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="vehicle-comparison-table__body">
                  {comparisonData.filter(c => c.category === 'Pricing').map((category) => (
                    <>
                      <tr key={category.category} className="vehicle-comparison-table__category-row">
                        <td colSpan={vehicleData.length + 1} className="vehicle-comparison-table__category">
                          {category.category}
                        </td>
                      </tr>
                      {category.specs.map((spec) => {
                        const bestIndex = getBestValueIndex(spec.values, spec.highlight);
                        return (
                          <tr key={spec.name} className="vehicle-comparison-table__spec-row">
                            <td className="vehicle-comparison-table__spec-name">{spec.name}</td>
                            {spec.values.map((value, index) => (
                              <td
                                key={index}
                                className={`vehicle-comparison-table__spec-value ${bestIndex === index ? 'vehicle-comparison-table__spec-value--best' : ''}`}
                              >
                                {renderValue(value, bestIndex === index)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* AI Module — between Pricing and Ratings */}
          <div className="vehicle-compare-ai">
            <button
              type="button"
              className="vehicle-compare-ai__header"
              onClick={() => setAiExpanded(prev => !prev)}
              aria-expanded={aiExpanded}
            >
              <div className="vehicle-compare-ai__header-left">
                <span className="vehicle-compare-ai__header-title">Ask Car and Driver Assist</span>
                <Sparkles size={16} className="vehicle-compare-ai__sparkle" />
              </div>
              <ChevronUp size={18} className={`vehicle-compare-ai__chevron ${!aiExpanded ? 'vehicle-compare-ai__chevron--collapsed' : ''}`} />
            </button>

            {aiExpanded && (
              <div className="vehicle-compare-ai__body">
                <div className="vehicle-compare-ai__response">
                  <p className="vehicle-compare-ai__label">C/D Says:</p>
                  <p className="vehicle-compare-ai__text" dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                </div>

                {chatMessages.length > 0 && (
                  <div className="vehicle-compare-ai__chat">
                    <div className="vehicle-compare-ai__chat-header">
                      <span className="vehicle-compare-ai__chat-title">Conversation</span>
                      <button type="button" className="vehicle-compare-ai__chat-clear" onClick={clearChat} aria-label="Clear conversation">
                        <Trash2 size={13} />
                        <span>Clear</span>
                      </button>
                    </div>
                    <div className="vehicle-compare-ai__chat-thread">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className={`vehicle-compare-ai__chat-msg vehicle-compare-ai__chat-msg--${msg.role}`}>
                          <div className="vehicle-compare-ai__chat-msg-header">
                            {msg.role === 'assistant' && <Sparkles size={11} className="vehicle-compare-ai__chat-msg-icon" />}
                            <span className="vehicle-compare-ai__chat-msg-role">{msg.role === 'user' ? 'You' : 'C/D Assist'}</span>
                          </div>
                          <div
                            className="vehicle-compare-ai__chat-msg-content"
                            dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                          />
                        </div>
                      ))}
                      {aiTyping && (
                        <div className="vehicle-compare-ai__chat-msg vehicle-compare-ai__chat-msg--assistant">
                          <div className="vehicle-compare-ai__chat-msg-header">
                            <Sparkles size={11} className="vehicle-compare-ai__chat-msg-icon" />
                            <span className="vehicle-compare-ai__chat-msg-role">C/D Assist</span>
                          </div>
                          <div className="vehicle-compare-ai__chat-typing">
                            <span /><span /><span />
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                )}

                <form
                  className="vehicle-compare-ai__prompt"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (aiQuery.trim() && !aiTyping) {
                      sendAiMessage(aiQuery);
                      setAiQuery('');
                    }
                  }}
                >
                  <Sparkles size={14} className="vehicle-compare-ai__prompt-icon" />
                  <input
                    type="text"
                    className="vehicle-compare-ai__input"
                    placeholder={chatMessages.length > 0 ? 'Ask a follow-up question...' : 'Which of these vehicles is best for a family of five that likes road trips?'}
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    disabled={aiTyping}
                  />
                  <button type="submit" className="vehicle-compare-ai__search-btn" aria-label="Send" disabled={aiTyping || !aiQuery.trim()}>
                    <Search size={16} />
                  </button>
                </form>

                {chatMessages.length === 0 && (
                  <div className="vehicle-compare-ai__suggestions">
                    <span className="vehicle-compare-ai__suggestions-label">Popular suggestions:</span>
                    <div className="vehicle-compare-ai__chips">
                      {POPULAR_SUGGESTIONS.map(s => (
                        <button key={s} type="button" className="vehicle-compare-ai__chip" onClick={() => { sendAiMessage(s); }}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="vehicle-compare-ai__disclaimer">
                  We are committed to transparency in our usage of artificial intelligence (AI). These vehicle summaries are generated using AI trained on content previously published on CarandDriver.com. In other words, the information you will read here is based on our editorial staff's rigorous testing, comprehensive reviews, and expertise.
                </p>
              </div>
            )}
          </div>

          {/* Remaining categories (Ratings, Performance, Details, Awards) */}
          {comparisonData.filter(c => c.category !== 'Pricing').length > 0 && (
            <div className="vehicle-comparison-table-wrapper">
              <table className="vehicle-comparison-table">
                <thead className="vehicle-comparison-table__head">
                  <tr>
                    <th className="vehicle-comparison-table__corner">Specification</th>
                    {vehicleData.map((vehicle) => (
                      <th key={vehicle.id} className="vehicle-comparison-table__vehicle-header">
                        {vehicle.details?.make} {vehicle.details?.model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="vehicle-comparison-table__body">
                  {comparisonData.filter(c => c.category !== 'Pricing').map((category) => (
                    <>
                      <tr key={category.category} className="vehicle-comparison-table__category-row">
                        <td colSpan={vehicleData.length + 1} className="vehicle-comparison-table__category">
                          {category.category}
                        </td>
                      </tr>
                      {category.specs.map((spec) => {
                        const bestIndex = getBestValueIndex(spec.values, spec.highlight);
                        return (
                          <tr key={spec.name} className="vehicle-comparison-table__spec-row">
                            <td className="vehicle-comparison-table__spec-name">{spec.name}</td>
                            {spec.values.map((value, index) => (
                              <td
                                key={index}
                                className={`vehicle-comparison-table__spec-value ${bestIndex === index ? 'vehicle-comparison-table__spec-value--best' : ''}`}
                              >
                                {renderValue(value, bestIndex === index)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="vehicle-comparison-modal__footer">
          <div className="vehicle-comparison-legend">
            <span className="vehicle-comparison-legend__item">
              <Check size={16} className="vehicle-comparison-legend__icon vehicle-comparison-legend__icon--yes" />
              <span>Yes</span>
            </span>
            <span className="vehicle-comparison-legend__item">
              <Minus size={16} className="vehicle-comparison-legend__icon vehicle-comparison-legend__icon--na" />
              <span>Not Available</span>
            </span>
            <span className="vehicle-comparison-legend__item vehicle-comparison-legend__item--best">
              <span className="vehicle-comparison-legend__best-indicator"></span>
              <span>Best in Category</span>
            </span>
          </div>
          <p className="vehicle-comparison-disclaimer">
            Specifications shown are for base models. Verify with dealer for exact features.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VehicleComparisonModal;

