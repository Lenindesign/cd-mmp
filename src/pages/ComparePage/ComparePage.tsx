import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  X, Check, Minus, Star, Fuel, Gauge, Settings, DollarSign,
  Sparkles, Search, Plus, ArrowRight, ChevronUp, Trash2,
} from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import { OptimizedImage } from '../../components/OptimizedImage';
import { useVehicleAIChat } from '../../hooks/useVehicleAIChat';
import type { Vehicle } from '../../types/vehicle';
import './ComparePage.css';

interface ComparisonSpec {
  category: string;
  specs: {
    name: string;
    values: (string | boolean | null)[];
    highlight?: 'higher' | 'lower';
  }[];
}

const MAX_VEHICLES = 4;

const ComparePage = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [aiExpanded, setAiExpanded] = useState(true);
  const [aiQuery, setAiQuery] = useState('');
  const { messages: chatMessages, isTyping: aiTyping, sendMessage: sendAiMessage, clearChat } = useVehicleAIChat(selectedVehicles);
  const chatThreadRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSlot !== null && searchRef.current) {
      searchRef.current.focus();
    }
  }, [activeSlot]);

  useEffect(() => {
    const el = chatThreadRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [chatMessages, aiTyping]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveSlot(null);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return vehicleDatabase.slice(0, 12);
    const q = searchQuery.toLowerCase();
    return vehicleDatabase
      .filter(v => {
        const full = `${v.year} ${v.make} ${v.model}`.toLowerCase();
        return full.includes(q) || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q);
      })
      .slice(0, 20);
  }, [searchQuery]);

  const addVehicle = useCallback((vehicle: Vehicle) => {
    if (selectedVehicles.find(v => v.id === vehicle.id)) return;
    if (selectedVehicles.length >= MAX_VEHICLES) return;
    setSelectedVehicles(prev => [...prev, vehicle]);
    setActiveSlot(null);
    setSearchQuery('');
  }, [selectedVehicles]);

  const removeVehicle = useCallback((id: string) => {
    setSelectedVehicles(prev => prev.filter(v => v.id !== id));
  }, []);

  const comparisonData = useMemo((): ComparisonSpec[] => {
    if (selectedVehicles.length < 2) return [];
    return [
      {
        category: 'Pricing',
        specs: [
          {
            name: 'Starting MSRP',
            values: selectedVehicles.map(v => v.priceMin ? `$${v.priceMin.toLocaleString()}` : '—'),
            highlight: 'lower',
          },
          {
            name: 'Price Range',
            values: selectedVehicles.map(v => v.priceRange || '—'),
          },
        ],
      },
      {
        category: 'Ratings',
        specs: [
          {
            name: 'C/D Rating',
            values: selectedVehicles.map(v => v.staffRating ? `${v.staffRating.toFixed(1)}/10` : '—'),
            highlight: 'higher',
          },
          {
            name: 'Community Rating',
            values: selectedVehicles.map(v => v.communityRating ? `${v.communityRating.toFixed(1)}/10` : '—'),
            highlight: 'higher',
          },
        ],
      },
      {
        category: 'Performance',
        specs: [
          {
            name: 'Horsepower',
            values: selectedVehicles.map(v => v.horsepower ? `${v.horsepower} hp` : '—'),
            highlight: 'higher',
          },
          {
            name: 'Fuel Economy',
            values: selectedVehicles.map(v => v.mpg || '—'),
            highlight: 'higher',
          },
          {
            name: 'Drivetrain',
            values: selectedVehicles.map(v => v.drivetrain || '—'),
          },
          {
            name: 'Transmission',
            values: selectedVehicles.map(v => v.transmission || '—'),
          },
        ],
      },
      {
        category: 'Details',
        specs: [
          {
            name: 'Body Style',
            values: selectedVehicles.map(v => v.bodyStyle || '—'),
          },
          {
            name: 'Fuel Type',
            values: selectedVehicles.map(v => v.fuelType || '—'),
          },
          {
            name: 'Seating',
            values: selectedVehicles.map(v => v.seatingCapacity ? `${v.seatingCapacity} passengers` : '—'),
          },
          {
            name: 'Cargo Space',
            values: selectedVehicles.map(v => v.cargoSpace ? `${v.cargoSpace} cu ft` : '—'),
            highlight: 'higher',
          },
        ],
      },
      {
        category: 'Awards',
        specs: [
          {
            name: "Editor's Choice",
            values: selectedVehicles.map(v => v.editorsChoice ?? false),
          },
          {
            name: '10Best',
            values: selectedVehicles.map(v => v.tenBest ?? false),
          },
          {
            name: 'EV of the Year',
            values: selectedVehicles.map(v => v.evOfTheYear ?? false),
          },
        ],
      },
    ];
  }, [selectedVehicles]);

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
      return validIndices.reduce((best, current) => (current.value! > best.value!) ? current : best).index;
    }
    return validIndices.reduce((best, current) => (current.value! < best.value!) ? current : best).index;
  };

  const renderValue = (value: string | boolean | null, isBest = false) => {
    if (value === true) return <span className="compare-page__val compare-page__val--yes"><Check size={18} /></span>;
    if (value === false) return <span className="compare-page__val compare-page__val--no"><Minus size={16} /></span>;
    if (value === null || value === '—') return <span className="compare-page__val compare-page__val--na"><Minus size={16} /></span>;
    return <span className={`compare-page__val compare-page__val--text ${isBest ? 'compare-page__val--best' : ''}`}>{value}</span>;
  };

  const aiSummary = useMemo(() => {
    if (selectedVehicles.length < 2) return '';
    const names = selectedVehicles.map(v => `${v.year} ${v.make} ${v.model}`);
    const parts: string[] = [];

    const seats = selectedVehicles.map(v => v.seatingCapacity || 0);
    if (seats.some(s => s > 0) && new Set(seats.filter(s => s > 0)).size > 1) {
      const maxI = seats.indexOf(Math.max(...seats));
      const minI = seats.indexOf(Math.min(...seats.filter(s => s > 0)));
      if (maxI !== minI) {
        parts.push(`The most significant difference is seating capacity: the **${names[maxI]}** offers ${seats[maxI]} seats, while the **${names[minI]}** is a ${seats[minI]}-seat vehicle.`);
      }
    }

    const prices = selectedVehicles.map(v => v.priceMin || 0);
    if (prices.filter(p => p > 0).length >= 2) {
      const strs = selectedVehicles.map((_, i) => prices[i] > 0 ? `The **${names[i]}** starts at **$${prices[i].toLocaleString()}**` : null).filter(Boolean);
      if (strs.length >= 2) parts.push(strs.join(', compared to ') + '.');
    }

    const hps = selectedVehicles.map(v => v.horsepower || 0);
    if (hps.filter(h => h > 0).length >= 2) {
      const maxI = hps.indexOf(Math.max(...hps));
      parts.push(`The **${names[maxI]}** leads in power with **${hps[maxI]} hp**.`);
    }

    const ratings = selectedVehicles.map(v => v.staffRating || 0);
    if (ratings.filter(r => r > 0).length >= 2) {
      const topI = ratings.indexOf(Math.max(...ratings));
      parts.push(`The **${names[topI]}** earns the highest C/D rating at **${ratings[topI].toFixed(1)}/10**.`);
    }

    const mpgs = selectedVehicles.map(v => {
      const m = v.mpg?.match(/(\d+)\/(\d+)/);
      return m ? (parseInt(m[1]) + parseInt(m[2])) / 2 : 0;
    });
    if (mpgs.filter(m => m > 0).length >= 2) {
      const bestI = mpgs.indexOf(Math.max(...mpgs));
      parts.push(`The **${names[bestI]}** offers the best fuel economy at **${selectedVehicles[bestI].mpg} mpg**.`);
    }

    return parts.join(' ') || `Compare the ${names.join(' and ')} across pricing, performance, and features to find the best fit for your needs.`;
  }, [selectedVehicles]);

  const POPULAR_SUGGESTIONS = [
    'Best for city commute',
    'Best safety ratings',
    'Most cargo space',
    'Best for winter driving',
    'Best for long highway commute',
  ];

  const popularVehicles = useMemo(() => {
    return vehicleDatabase
      .filter(v => v.staffRating >= 8)
      .sort((a, b) => b.staffRating - a.staffRating)
      .slice(0, 8);
  }, []);

  const emptySlots = MAX_VEHICLES - selectedVehicles.length;

  return (
    <div className="compare-page">
      {/* Hero */}
      <section className="compare-page__hero">
        <div className="container">
          <h1 className="compare-page__title">Compare Vehicles</h1>
          <p className="compare-page__subtitle">
            Select up to {MAX_VEHICLES} vehicles for a side-by-side comparison of specs, ratings, and pricing.
            No account required.
          </p>
        </div>
      </section>

      {/* Vehicle Selector */}
      <section className="compare-page__selector">
        <div className="container">
          <div className="compare-page__slots">
            {selectedVehicles.map((vehicle) => (
              <div key={vehicle.id} className="compare-page__slot compare-page__slot--filled">
                <button
                  type="button"
                  className="compare-page__slot-remove"
                  onClick={() => removeVehicle(vehicle.id)}
                  aria-label={`Remove ${vehicle.make} ${vehicle.model}`}
                >
                  <X size={14} />
                </button>
                <div className="compare-page__slot-image">
                  <OptimizedImage src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} width={160} height={100} />
                </div>
                <div className="compare-page__slot-info">
                  <span className="compare-page__slot-name">{vehicle.year} {vehicle.make} {vehicle.model}</span>
                  <span className="compare-page__slot-price">${vehicle.priceMin?.toLocaleString()}</span>
                </div>
              </div>
            ))}

            {Array.from({ length: emptySlots }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className={`compare-page__slot compare-page__slot--empty ${activeSlot === selectedVehicles.length + idx ? 'compare-page__slot--active' : ''}`}
                ref={activeSlot === selectedVehicles.length + idx ? dropdownRef : undefined}
              >
                <button
                  type="button"
                  className="compare-page__slot-add"
                  onClick={() => setActiveSlot(selectedVehicles.length + idx)}
                >
                  <Plus size={20} />
                  <span>Add Vehicle</span>
                </button>

                {activeSlot === selectedVehicles.length + idx && (
                  <div className="compare-page__search-dropdown">
                    <div className="compare-page__search-bar">
                      <Search size={16} />
                      <input
                        ref={searchRef}
                        type="text"
                        className="compare-page__search-input"
                        placeholder="Search by make, model, or year..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button type="button" className="compare-page__search-clear" onClick={() => setSearchQuery('')}>
                          <X size={14} />
                        </button>
                      )}
                    </div>
                    <ul className="compare-page__search-results">
                      {filteredVehicles.map(v => (
                        <li key={v.id}>
                          <button
                            type="button"
                            className="compare-page__search-item"
                            onClick={() => addVehicle(v)}
                            disabled={!!selectedVehicles.find(s => s.id === v.id)}
                          >
                            <img src={v.image} alt="" className="compare-page__search-thumb" />
                            <div className="compare-page__search-item-info">
                              <span className="compare-page__search-item-name">{v.year} {v.make} {v.model}</span>
                              <span className="compare-page__search-item-meta">
                                ${v.priceMin?.toLocaleString()} &middot; {v.staffRating.toFixed(1)}/10
                              </span>
                            </div>
                            {selectedVehicles.find(s => s.id === v.id) && (
                              <Check size={16} className="compare-page__search-item-check" />
                            )}
                          </button>
                        </li>
                      ))}
                      {filteredVehicles.length === 0 && (
                        <li className="compare-page__search-empty">No vehicles found for "{searchQuery}"</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedVehicles.length === 0 && (
            <div className="compare-page__popular">
              <h3 className="compare-page__popular-title">Popular Comparisons</h3>
              <div className="compare-page__popular-grid">
                {popularVehicles.map(v => (
                  <button
                    key={v.id}
                    type="button"
                    className="compare-page__popular-card"
                    onClick={() => addVehicle(v)}
                  >
                    <img src={v.image} alt="" className="compare-page__popular-img" />
                    <div className="compare-page__popular-info">
                      <span className="compare-page__popular-name">{v.year} {v.make} {v.model}</span>
                      <span className="compare-page__popular-meta">
                        <Star size={12} fill="currentColor" /> {v.staffRating.toFixed(1)} &middot; ${v.priceMin?.toLocaleString()}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      {selectedVehicles.length >= 2 && (
        <section className="compare-page__results">
          <div className="container">
            {/* Vehicle Cards */}
            <div className="compare-page__cards">
              {selectedVehicles.map(vehicle => (
                <div key={vehicle.id} className="compare-page__card">
                  <div className="compare-page__card-image">
                    <OptimizedImage src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} width={280} height={170} />
                  </div>
                  <div className="compare-page__card-info">
                    <h3 className="compare-page__card-name">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                    <div className="compare-page__card-meta">
                      <span className="compare-page__card-price">
                        <DollarSign size={14} />${vehicle.priceMin?.toLocaleString()}
                      </span>
                      <span className="compare-page__card-rating">
                        <Star size={14} fill="currentColor" />{vehicle.staffRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="compare-page__card-specs">
                      {vehicle.horsepower && <span className="compare-page__card-spec"><Gauge size={12} />{vehicle.horsepower} hp</span>}
                      {vehicle.mpg && <span className="compare-page__card-spec"><Fuel size={12} />{vehicle.mpg}</span>}
                      {vehicle.drivetrain && <span className="compare-page__card-spec"><Settings size={12} />{vehicle.drivetrain}</span>}
                    </div>
                    <Link to={`/${vehicle.year}/${vehicle.make}/${vehicle.model.replace(/\s+/g, '-')}`} className="compare-page__card-link">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Table */}
            {comparisonData.filter(c => c.category === 'Pricing').length > 0 && (
              <div className="compare-page__table-wrap">
                <table className="compare-page__table">
                  <thead>
                    <tr>
                      <th className="compare-page__table-corner">Specification</th>
                      {selectedVehicles.map(v => (
                        <th key={v.id} className="compare-page__table-vh">{v.make} {v.model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.filter(c => c.category === 'Pricing').map(category => (
                      <>
                        <tr key={category.category} className="compare-page__table-cat-row">
                          <td colSpan={selectedVehicles.length + 1} className="compare-page__table-cat">{category.category}</td>
                        </tr>
                        {category.specs.map(spec => {
                          const bestIdx = getBestValueIndex(spec.values, spec.highlight);
                          return (
                            <tr key={spec.name} className="compare-page__table-row">
                              <td className="compare-page__table-label">{spec.name}</td>
                              {spec.values.map((value, i) => (
                                <td key={i} className={`compare-page__table-cell ${bestIdx === i ? 'compare-page__table-cell--best' : ''}`}>
                                  {renderValue(value, bestIdx === i)}
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
            <div className="compare-page__ai">
              <button
                type="button"
                className="compare-page__ai-header"
                onClick={() => setAiExpanded(prev => !prev)}
                aria-expanded={aiExpanded}
              >
                <div className="compare-page__ai-header-left">
                  <span className="compare-page__ai-header-title">Ask Car and Driver Assist</span>
                  <Sparkles size={18} className="compare-page__ai-sparkle" />
                </div>
                <ChevronUp size={20} className={`compare-page__ai-chevron ${!aiExpanded ? 'compare-page__ai-chevron--collapsed' : ''}`} />
              </button>

              {aiExpanded && (
                <div className="compare-page__ai-body">
                  <div className="compare-page__ai-response">
                    <p className="compare-page__ai-label">C/D Says:</p>
                    <p
                      className="compare-page__ai-text"
                      dangerouslySetInnerHTML={{ __html: aiSummary.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                    />
                  </div>

                  {chatMessages.length > 0 ? (
                    <div className="compare-page__chat">
                      <div className="compare-page__chat-header">
                        <span className="compare-page__chat-title">Conversation</span>
                        <button type="button" className="compare-page__chat-clear" onClick={clearChat} aria-label="Clear conversation">
                          <Trash2 size={14} />
                          <span>Clear</span>
                        </button>
                      </div>
                      <div className="compare-page__chat-thread" ref={chatThreadRef}>
                        {chatMessages.map(msg => (
                          <div key={msg.id} className={`compare-page__chat-msg compare-page__chat-msg--${msg.role}`}>
                            <div className="compare-page__chat-msg-header">
                              {msg.role === 'assistant' && <Sparkles size={12} className="compare-page__chat-msg-icon" />}
                              <span className="compare-page__chat-msg-role">{msg.role === 'user' ? 'You' : 'C/D Assist'}</span>
                            </div>
                            <div
                              className="compare-page__chat-msg-content"
                              dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          </div>
                        ))}
                        {aiTyping && (
                          <div className="compare-page__chat-msg compare-page__chat-msg--assistant">
                            <div className="compare-page__chat-msg-header">
                              <Sparkles size={12} className="compare-page__chat-msg-icon" />
                              <span className="compare-page__chat-msg-role">C/D Assist</span>
                            </div>
                            <div className="compare-page__chat-typing">
                              <span /><span /><span />
                            </div>
                          </div>
                        )}
                      </div>
                      <form
                        className="compare-page__ai-prompt compare-page__ai-prompt--chat"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (aiQuery.trim() && !aiTyping) {
                            sendAiMessage(aiQuery);
                            setAiQuery('');
                          }
                        }}
                      >
                        <Sparkles size={14} className="compare-page__ai-prompt-icon" />
                        <input
                          type="text"
                          className="compare-page__ai-input"
                          placeholder="Ask a follow-up question..."
                          value={aiQuery}
                          onChange={(e) => setAiQuery(e.target.value)}
                          disabled={aiTyping}
                        />
                        <button type="submit" className="compare-page__ai-search-btn" aria-label="Send" disabled={aiTyping || !aiQuery.trim()}>
                          <Search size={18} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <form
                      className="compare-page__ai-prompt"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (aiQuery.trim() && !aiTyping) {
                          sendAiMessage(aiQuery);
                          setAiQuery('');
                        }
                      }}
                    >
                      <Sparkles size={14} className="compare-page__ai-prompt-icon" />
                      <input
                        type="text"
                        className="compare-page__ai-input"
                        placeholder="Which of these vehicles is best for a family of five that likes road trips?"
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        disabled={aiTyping}
                      />
                      <button type="submit" className="compare-page__ai-search-btn" aria-label="Send" disabled={aiTyping || !aiQuery.trim()}>
                        <Search size={18} />
                      </button>
                    </form>
                  )}

                  {chatMessages.length === 0 && (
                    <div className="compare-page__ai-suggestions">
                      <span className="compare-page__ai-suggestions-label">Popular suggestions:</span>
                      <div className="compare-page__ai-chips">
                        {POPULAR_SUGGESTIONS.map(s => (
                          <button key={s} type="button" className="compare-page__ai-chip" onClick={() => { sendAiMessage(s); }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="compare-page__ai-disclaimer">
                    We are committed to transparency in our usage of artificial intelligence (AI). These vehicle summaries are generated using AI trained on content previously published on CarandDriver.com. In other words, the information you will read here is based on our editorial staff's rigorous testing, comprehensive reviews, and expertise.
                  </p>
                </div>
              )}
            </div>

            {/* Remaining categories (Ratings, Performance, Details, Awards) */}
            {comparisonData.filter(c => c.category !== 'Pricing').length > 0 && (
              <div className="compare-page__table-wrap">
                <table className="compare-page__table">
                  <thead>
                    <tr>
                      <th className="compare-page__table-corner">Specification</th>
                      {selectedVehicles.map(v => (
                        <th key={v.id} className="compare-page__table-vh">{v.make} {v.model}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.filter(c => c.category !== 'Pricing').map(category => (
                      <>
                        <tr key={category.category} className="compare-page__table-cat-row">
                          <td colSpan={selectedVehicles.length + 1} className="compare-page__table-cat">{category.category}</td>
                        </tr>
                        {category.specs.map(spec => {
                          const bestIdx = getBestValueIndex(spec.values, spec.highlight);
                          return (
                            <tr key={spec.name} className="compare-page__table-row">
                              <td className="compare-page__table-label">{spec.name}</td>
                              {spec.values.map((value, i) => (
                                <td key={i} className={`compare-page__table-cell ${bestIdx === i ? 'compare-page__table-cell--best' : ''}`}>
                                  {renderValue(value, bestIdx === i)}
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

            {/* Legend */}
            <div className="compare-page__legend">
              <div className="compare-page__legend-items">
                <span className="compare-page__legend-item">
                  <Check size={16} className="compare-page__legend-icon compare-page__legend-icon--yes" /> Yes
                </span>
                <span className="compare-page__legend-item">
                  <Minus size={16} className="compare-page__legend-icon compare-page__legend-icon--na" /> Not Available
                </span>
                <span className="compare-page__legend-item">
                  <span className="compare-page__legend-best"></span> Best in Category
                </span>
              </div>
              <p className="compare-page__legend-note">
                Specifications shown are for base models. Verify with dealer for exact features.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ComparePage;
