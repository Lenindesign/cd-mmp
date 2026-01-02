import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Send, 
  Sparkles, 
  Car, 
  X, 
  MessageCircle,
  ChevronRight,
  Fuel,
  Users,
  DollarSign,
  Gauge,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import type { Vehicle } from '../../types/vehicle';
import './CarFinderChat.css';

interface CarFinderChatProps {
  /** Callback when user selects a vehicle */
  onVehicleSelect?: (vehicle: Vehicle) => void;
  /** Initial open state */
  defaultOpen?: boolean;
  /** Floating mode (bottom-right corner) */
  floating?: boolean;
  /** Position for floating mode */
  position?: 'bottom-right' | 'bottom-left';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  vehicles?: Vehicle[];
  timestamp: Date;
  feedback?: 'positive' | 'negative';
}

interface ConversationContext {
  budget?: { min: number; max: number };
  bodyStyles?: string[];
  fuelTypes?: string[];
  seatingCapacity?: number;
  features?: string[];
  priorities?: string[];
  makes?: string[];
}

// Suggested prompts for users
const suggestedPrompts = [
  "Find me a family SUV under $45,000",
  "What's the best electric car for commuting?",
  "I need a truck for towing",
  "Show me fuel-efficient sedans",
  "What sports cars are under $60,000?",
];

// Parse user intent and extract preferences
const parseUserIntent = (message: string): Partial<ConversationContext> => {
  const context: Partial<ConversationContext> = {};
  const lowerMessage = message.toLowerCase();
  
  // Budget extraction
  const budgetMatch = lowerMessage.match(/(?:under|below|less than|max|budget|around)\s*\$?([\d,]+)(?:k|000)?/i);
  if (budgetMatch) {
    const amount = parseInt(budgetMatch[1].replace(/,/g, ''));
    const budget = amount < 1000 ? amount * 1000 : amount;
    context.budget = { min: 0, max: budget };
  }
  
  const budgetRangeMatch = lowerMessage.match(/\$?([\d,]+)(?:k|000)?\s*(?:to|-)\s*\$?([\d,]+)(?:k|000)?/i);
  if (budgetRangeMatch) {
    let min = parseInt(budgetRangeMatch[1].replace(/,/g, ''));
    let max = parseInt(budgetRangeMatch[2].replace(/,/g, ''));
    min = min < 1000 ? min * 1000 : min;
    max = max < 1000 ? max * 1000 : max;
    context.budget = { min, max };
  }
  
  // Body style extraction
  const bodyStyles: string[] = [];
  if (/suv|crossover/i.test(lowerMessage)) bodyStyles.push('SUV');
  if (/sedan/i.test(lowerMessage)) bodyStyles.push('Sedan');
  if (/truck|pickup/i.test(lowerMessage)) bodyStyles.push('Truck');
  if (/coupe/i.test(lowerMessage)) bodyStyles.push('Coupe');
  if (/hatchback/i.test(lowerMessage)) bodyStyles.push('Hatchback');
  if (/convertible/i.test(lowerMessage)) bodyStyles.push('Convertible');
  if (/wagon/i.test(lowerMessage)) bodyStyles.push('Wagon');
  if (/sports?\s*car/i.test(lowerMessage)) bodyStyles.push('Coupe', 'Convertible');
  if (bodyStyles.length > 0) context.bodyStyles = bodyStyles;
  
  // Fuel type extraction
  const fuelTypes: string[] = [];
  if (/electric|ev\b|battery/i.test(lowerMessage)) fuelTypes.push('Electric');
  if (/hybrid|phev/i.test(lowerMessage)) fuelTypes.push('Hybrid', 'Plug-in Hybrid');
  if (/gas|gasoline|petrol/i.test(lowerMessage)) fuelTypes.push('Gasoline');
  if (/diesel/i.test(lowerMessage)) fuelTypes.push('Diesel');
  if (/fuel.?efficient|good\s*mpg|great\s*mpg/i.test(lowerMessage)) {
    context.priorities = [...(context.priorities || []), 'fuel-efficiency'];
  }
  if (fuelTypes.length > 0) context.fuelTypes = fuelTypes;
  
  // Seating capacity
  if (/family|kids|children/i.test(lowerMessage)) {
    context.seatingCapacity = 5;
    context.priorities = [...(context.priorities || []), 'family-friendly'];
  }
  if (/7.?seat|third.?row|3rd.?row/i.test(lowerMessage)) {
    context.seatingCapacity = 7;
  }
  
  // Features and priorities
  const features: string[] = [];
  if (/tow|towing|haul/i.test(lowerMessage)) features.push('towing');
  if (/commut/i.test(lowerMessage)) features.push('commuting');
  if (/luxury|premium/i.test(lowerMessage)) features.push('luxury');
  if (/reliable|reliability/i.test(lowerMessage)) features.push('reliability');
  if (/fast|speed|performance|powerful/i.test(lowerMessage)) features.push('performance');
  if (/safe|safety/i.test(lowerMessage)) features.push('safety');
  if (/awd|all.?wheel|4x4|4wd/i.test(lowerMessage)) features.push('AWD');
  if (features.length > 0) context.features = features;
  
  // Make extraction
  const makes: string[] = [];
  const knownMakes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Lexus', 'Mazda', 'Hyundai', 'Kia', 'Subaru', 'Volkswagen', 'Nissan', 'Jeep', 'Ram', 'Tesla', 'Porsche', 'Volvo', 'Acura'];
  knownMakes.forEach(make => {
    if (lowerMessage.includes(make.toLowerCase())) {
      makes.push(make);
    }
  });
  if (makes.length > 0) context.makes = makes;
  
  return context;
};

// Search vehicles based on context
const searchVehicles = (context: ConversationContext): Vehicle[] => {
  let results = [...vehicleDatabase];
  
  // Filter by budget
  if (context.budget) {
    results = results.filter(v => 
      v.priceMin <= context.budget!.max && 
      (context.budget!.min === 0 || v.priceMax >= context.budget!.min)
    );
  }
  
  // Filter by body style
  if (context.bodyStyles && context.bodyStyles.length > 0) {
    results = results.filter(v => 
      context.bodyStyles!.some(style => 
        v.bodyStyle.toLowerCase() === style.toLowerCase()
      )
    );
  }
  
  // Filter by fuel type
  if (context.fuelTypes && context.fuelTypes.length > 0) {
    results = results.filter(v => 
      context.fuelTypes!.some(fuel => 
        v.fuelType.toLowerCase().includes(fuel.toLowerCase())
      )
    );
  }
  
  // Filter by make
  if (context.makes && context.makes.length > 0) {
    results = results.filter(v => 
      context.makes!.some(make => 
        v.make.toLowerCase() === make.toLowerCase()
      )
    );
  }
  
  // Sort by relevance (rating + editor's choice)
  results.sort((a, b) => {
    let scoreA = a.staffRating;
    let scoreB = b.staffRating;
    
    if (a.editorsChoice) scoreA += 0.5;
    if (b.editorsChoice) scoreB += 0.5;
    if (a.tenBest) scoreA += 0.3;
    if (b.tenBest) scoreB += 0.3;
    
    // Prioritize fuel efficiency if requested
    if (context.priorities?.includes('fuel-efficiency')) {
      const mpgA = parseInt(a.mpg?.split('/')[1] || '0');
      const mpgB = parseInt(b.mpg?.split('/')[1] || '0');
      scoreA += mpgA / 100;
      scoreB += mpgB / 100;
    }
    
    return scoreB - scoreA;
  });
  
  return results.slice(0, 5);
};

// Generate AI response based on context and results
const generateResponse = (
  context: ConversationContext, 
  vehicles: Vehicle[],
  _userMessage: string
): string => {
  if (vehicles.length === 0) {
    return "I couldn't find any vehicles matching your criteria. Could you try adjusting your budget or preferences? I'm here to help you find the perfect car!";
  }
  
  const topPick = vehicles[0];
  let response = '';
  
  // Personalized intro based on what they're looking for
  if (context.bodyStyles?.includes('SUV') && context.priorities?.includes('family-friendly')) {
    response = `Great choice for a family SUV! Based on your preferences, I'd recommend the **${topPick.year} ${topPick.make} ${topPick.model}**. `;
  } else if (context.fuelTypes?.includes('Electric')) {
    response = `For electric vehicles, the **${topPick.year} ${topPick.make} ${topPick.model}** stands out. `;
  } else if (context.features?.includes('towing')) {
    response = `For towing capability, I'd suggest the **${topPick.year} ${topPick.make} ${topPick.model}**. `;
  } else if (context.features?.includes('performance')) {
    response = `If you're looking for performance, check out the **${topPick.year} ${topPick.make} ${topPick.model}**. `;
  } else {
    response = `Based on your needs, I'd recommend the **${topPick.year} ${topPick.make} ${topPick.model}**. `;
  }
  
  // Add rating info
  if (topPick.staffRating >= 9) {
    response += `It has an excellent ${topPick.staffRating}/10 rating from our experts`;
  } else if (topPick.staffRating >= 8) {
    response += `It scores a solid ${topPick.staffRating}/10 from our team`;
  }
  
  // Add accolades
  if (topPick.editorsChoice) {
    response += ' and is an **Editor\'s Choice**';
  }
  if (topPick.tenBest) {
    response += ', plus it made our **10Best** list';
  }
  response += '.';
  
  // Add price context
  if (context.budget) {
    if (topPick.priceMin < context.budget.max * 0.7) {
      response += ` At ${topPick.priceRange}, it's well within your budget, leaving room for options.`;
    } else {
      response += ` Starting at ${topPick.priceRange}, it fits nicely in your budget.`;
    }
  }
  
  // Add more options teaser
  if (vehicles.length > 1) {
    response += `\n\nI've also found ${vehicles.length - 1} other great ${context.bodyStyles?.[0]?.toLowerCase() || 'vehicle'}${vehicles.length > 2 ? 's' : ''} that match what you're looking for. Take a look below!`;
  }
  
  return response;
};

const CarFinderChat = ({
  onVehicleSelect,
  defaultOpen = false,
  floating = false,
  position = 'bottom-right',
}: CarFinderChatProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Parse intent and update context
    const newContext = parseUserIntent(content);
    const updatedContext = { ...conversationContext, ...newContext };
    setConversationContext(updatedContext);
    
    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Search for vehicles
    const vehicles = searchVehicles(updatedContext);
    
    // Generate response
    const responseContent = generateResponse(updatedContext, vehicles, content);
    
    // Add assistant message
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      vehicles: vehicles.length > 0 ? vehicles : undefined,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, [conversationContext]);

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Handle suggested prompt click
  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  // Handle feedback
  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
  };

  // Reset conversation
  const resetConversation = () => {
    setMessages([]);
    setConversationContext({});
    inputRef.current?.focus();
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Render vehicle card
  const renderVehicleCard = (vehicle: Vehicle) => (
    <button
      key={vehicle.id}
      className="car-finder-chat__vehicle-card"
      onClick={() => onVehicleSelect?.(vehicle)}
    >
      <div className="car-finder-chat__vehicle-image">
        <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        {vehicle.editorsChoice && (
          <span className="car-finder-chat__vehicle-badge">Editor's Choice</span>
        )}
      </div>
      <div className="car-finder-chat__vehicle-info">
        <h4 className="car-finder-chat__vehicle-name">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h4>
        <div className="car-finder-chat__vehicle-meta">
          <span className="car-finder-chat__vehicle-price">
            {formatPrice(vehicle.priceMin)}+
          </span>
          <span className="car-finder-chat__vehicle-rating">
            ★ {vehicle.staffRating}
          </span>
        </div>
        <div className="car-finder-chat__vehicle-specs">
          {vehicle.mpg && (
            <span><Fuel size={12} /> {vehicle.mpg}</span>
          )}
          {vehicle.horsepower && (
            <span><Gauge size={12} /> {vehicle.horsepower} hp</span>
          )}
        </div>
      </div>
      <ChevronRight size={16} className="car-finder-chat__vehicle-arrow" />
    </button>
  );

  // Floating button (when closed)
  if (floating && !isOpen) {
    return (
      <button
        className={`car-finder-chat__fab car-finder-chat__fab--${position}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open car finder chat"
      >
        <Sparkles size={24} />
        <span className="car-finder-chat__fab-label">Find My Car</span>
      </button>
    );
  }

  return (
    <div 
      className={`car-finder-chat ${floating ? 'car-finder-chat--floating' : ''} ${floating ? `car-finder-chat--${position}` : ''} ${isExpanded ? 'car-finder-chat--expanded' : ''}`}
    >
      {/* Header */}
      <div className="car-finder-chat__header">
        <div className="car-finder-chat__header-left">
          <div className="car-finder-chat__avatar">
            <Sparkles size={20} />
          </div>
          <div className="car-finder-chat__header-text">
            <h3 className="car-finder-chat__title">Car Finder AI</h3>
            <span className="car-finder-chat__status">
              <span className="car-finder-chat__status-dot" />
              Powered by Gemini
            </span>
          </div>
        </div>
        <div className="car-finder-chat__header-actions">
          {messages.length > 0 && (
            <button
              className="car-finder-chat__header-btn"
              onClick={resetConversation}
              title="Start new conversation"
            >
              <RotateCcw size={18} />
            </button>
          )}
          {floating && (
            <>
              <button
                className="car-finder-chat__header-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                className="car-finder-chat__header-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="car-finder-chat__messages">
        {messages.length === 0 ? (
          <div className="car-finder-chat__welcome">
            <div className="car-finder-chat__welcome-icon">
              <Car size={32} />
            </div>
            <h4 className="car-finder-chat__welcome-title">
              Hi! I'm your AI car shopping assistant
            </h4>
            <p className="car-finder-chat__welcome-text">
              Tell me what you're looking for and I'll help you find the perfect vehicle. 
              You can describe your needs, budget, or preferences.
            </p>
            
            <div className="car-finder-chat__suggestions">
              <span className="car-finder-chat__suggestions-label">Try asking:</span>
              <div className="car-finder-chat__suggestions-list">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="car-finder-chat__suggestion"
                    onClick={() => handleSuggestedPrompt(prompt)}
                  >
                    <MessageCircle size={14} />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`car-finder-chat__message car-finder-chat__message--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="car-finder-chat__message-avatar">
                    <Sparkles size={16} />
                  </div>
                )}
                <div className="car-finder-chat__message-content">
                  <div 
                    className="car-finder-chat__message-text"
                    dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />') 
                    }}
                  />
                  
                  {message.vehicles && message.vehicles.length > 0 && (
                    <div className="car-finder-chat__vehicles">
                      {message.vehicles.map(renderVehicleCard)}
                    </div>
                  )}
                  
                  {message.role === 'assistant' && (
                    <div className="car-finder-chat__feedback">
                      <span className="car-finder-chat__feedback-label">Was this helpful?</span>
                      <button
                        className={`car-finder-chat__feedback-btn ${message.feedback === 'positive' ? 'car-finder-chat__feedback-btn--active' : ''}`}
                        onClick={() => handleFeedback(message.id, 'positive')}
                      >
                        <ThumbsUp size={14} />
                      </button>
                      <button
                        className={`car-finder-chat__feedback-btn ${message.feedback === 'negative' ? 'car-finder-chat__feedback-btn--active' : ''}`}
                        onClick={() => handleFeedback(message.id, 'negative')}
                      >
                        <ThumbsDown size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="car-finder-chat__message car-finder-chat__message--assistant">
                <div className="car-finder-chat__message-avatar">
                  <Sparkles size={16} />
                </div>
                <div className="car-finder-chat__message-content">
                  <div className="car-finder-chat__typing">
                    <Loader2 size={16} className="car-finder-chat__typing-spinner" />
                    <span>Finding the best options for you...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <form className="car-finder-chat__input-area" onSubmit={handleSubmit}>
        <div className="car-finder-chat__input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="car-finder-chat__input"
            placeholder="Describe your ideal car..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="car-finder-chat__send-btn"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="car-finder-chat__input-hints">
          <button type="button" onClick={() => setInputValue('under $40,000')}>
            <DollarSign size={12} /> Budget
          </button>
          <button type="button" onClick={() => setInputValue(inputValue + ' SUV')}>
            <Car size={12} /> SUV
          </button>
          <button type="button" onClick={() => setInputValue(inputValue + ' electric')}>
            <Fuel size={12} /> Electric
          </button>
          <button type="button" onClick={() => setInputValue(inputValue + ' family')}>
            <Users size={12} /> Family
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFinderChat;

