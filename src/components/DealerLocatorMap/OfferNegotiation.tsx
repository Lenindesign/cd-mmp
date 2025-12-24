import { useState } from 'react';
import { X, DollarSign, CheckCircle, XCircle, MessageSquare, Send, Clock, ArrowRight, Handshake } from 'lucide-react';
import { formatPrice } from '../../services/dealerService';
import './OfferNegotiation.css';

export type OfferStatus = 'pending' | 'countered' | 'accepted' | 'rejected' | 'expired';

export interface NegotiationMessage {
  id: string;
  type: 'offer' | 'counter' | 'message' | 'accepted' | 'rejected';
  sender: 'customer' | 'dealer';
  amount?: number;
  message?: string;
  timestamp: Date;
}

export interface NegotiationData {
  id: string;
  status: OfferStatus;
  dealerName: string;
  dealerId: string;
  vehicle: {
    year: number;
    make: string;
    model: string;
    trim?: string;
    msrp: number;
  };
  initialOffer: number;
  currentOffer: number;
  messages: NegotiationMessage[];
  createdAt: Date;
  expiresAt?: Date;
}

interface OfferNegotiationProps {
  negotiation: NegotiationData;
  onSendCounter: (amount: number, message?: string) => void;
  onAcceptOffer: () => void;
  onRejectOffer: () => void;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const OfferNegotiation = ({
  negotiation,
  onSendCounter,
  onAcceptOffer,
  onRejectOffer,
  onSendMessage,
  onClose,
}: OfferNegotiationProps) => {
  const [counterAmount, setCounterAmount] = useState(negotiation.currentOffer);
  const [messageText, setMessageText] = useState('');
  const [showCounterForm, setShowCounterForm] = useState(false);

  const latestDealerOffer = negotiation.messages
    .filter(m => m.sender === 'dealer' && (m.type === 'offer' || m.type === 'counter'))
    .pop();

  const canRespond = negotiation.status === 'countered' || negotiation.status === 'pending';

  const handleSendCounter = () => {
    if (counterAmount > 0) {
      onSendCounter(counterAmount, messageText || undefined);
      setShowCounterForm(false);
      setMessageText('');
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const getStatusBadge = () => {
    switch (negotiation.status) {
      case 'pending':
        return <span className="negotiation__status negotiation__status--pending"><Clock size={14} /> Pending</span>;
      case 'countered':
        return <span className="negotiation__status negotiation__status--countered"><ArrowRight size={14} /> Counter Received</span>;
      case 'accepted':
        return <span className="negotiation__status negotiation__status--accepted"><CheckCircle size={14} /> Accepted</span>;
      case 'rejected':
        return <span className="negotiation__status negotiation__status--rejected"><XCircle size={14} /> Declined</span>;
      case 'expired':
        return <span className="negotiation__status negotiation__status--expired"><Clock size={14} /> Expired</span>;
      default:
        return null;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="negotiation">
      {/* Header */}
      <header className="negotiation__header">
        <button className="negotiation__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="negotiation__header-content">
          <h2 className="negotiation__title">Offer Negotiation</h2>
          <p className="negotiation__vehicle">
            {negotiation.vehicle.year} {negotiation.vehicle.make} {negotiation.vehicle.model}
          </p>
          <p className="negotiation__dealer">{negotiation.dealerName}</p>
        </div>
        {getStatusBadge()}
      </header>

      {/* Summary Bar */}
      <div className="negotiation__summary">
        <div className="negotiation__summary-item">
          <span className="negotiation__summary-label">MSRP</span>
          <span className="negotiation__summary-value">{formatPrice(negotiation.vehicle.msrp)}</span>
        </div>
        <div className="negotiation__summary-divider" />
        <div className="negotiation__summary-item">
          <span className="negotiation__summary-label">Your Offer</span>
          <span className="negotiation__summary-value negotiation__summary-value--highlight">
            {formatPrice(negotiation.initialOffer)}
          </span>
        </div>
        {latestDealerOffer && (
          <>
            <div className="negotiation__summary-divider" />
            <div className="negotiation__summary-item">
              <span className="negotiation__summary-label">Dealer Counter</span>
              <span className="negotiation__summary-value negotiation__summary-value--counter">
                {formatPrice(latestDealerOffer.amount || 0)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="negotiation__messages">
        {negotiation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`negotiation__message negotiation__message--${msg.sender}`}
          >
            <div className="negotiation__message-content">
              {msg.type === 'offer' && (
                <div className="negotiation__message-offer">
                  <DollarSign size={16} />
                  <span>Offered <strong>{formatPrice(msg.amount || 0)}</strong></span>
                </div>
              )}
              {msg.type === 'counter' && (
                <div className="negotiation__message-counter">
                  <ArrowRight size={16} />
                  <span>Counter offer: <strong>{formatPrice(msg.amount || 0)}</strong></span>
                </div>
              )}
              {msg.type === 'accepted' && (
                <div className="negotiation__message-accepted">
                  <Handshake size={16} />
                  <span>Offer accepted!</span>
                </div>
              )}
              {msg.type === 'rejected' && (
                <div className="negotiation__message-rejected">
                  <XCircle size={16} />
                  <span>Offer declined</span>
                </div>
              )}
              {msg.message && (
                <p className="negotiation__message-text">{msg.message}</p>
              )}
            </div>
            <span className="negotiation__message-time">
              {formatTimestamp(msg.timestamp)}
            </span>
          </div>
        ))}
      </div>

      {/* Action Area */}
      {negotiation.status === 'accepted' && (
        <div className="negotiation__success">
          <CheckCircle size={48} />
          <h3>Congratulations!</h3>
          <p>Your offer of <strong>{formatPrice(negotiation.currentOffer)}</strong> has been accepted.</p>
          <p>The dealer will contact you shortly to finalize the purchase.</p>
        </div>
      )}

      {negotiation.status === 'rejected' && (
        <div className="negotiation__rejected">
          <XCircle size={48} />
          <h3>Offer Declined</h3>
          <p>Unfortunately, the dealer was unable to accept your offer.</p>
          <p>You can try submitting a new offer or contact the dealer directly.</p>
        </div>
      )}

      {canRespond && (
        <div className="negotiation__actions">
          {showCounterForm ? (
            <div className="negotiation__counter-form">
              <div className="negotiation__counter-header">
                <h4>Send Counter Offer</h4>
                <button 
                  className="negotiation__counter-cancel" 
                  onClick={() => setShowCounterForm(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="negotiation__counter-input">
                <span className="negotiation__input-prefix">$</span>
                <input
                  type="number"
                  value={counterAmount}
                  onChange={(e) => setCounterAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>
              <textarea
                className="negotiation__counter-message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Add a message (optional)"
                rows={2}
              />
              <button 
                className="negotiation__btn negotiation__btn--primary"
                onClick={handleSendCounter}
              >
                <Send size={16} />
                Send Counter
              </button>
            </div>
          ) : (
            <>
              {latestDealerOffer && (
                <div className="negotiation__response-options">
                  <p className="negotiation__response-prompt">
                    The dealer countered with <strong>{formatPrice(latestDealerOffer.amount || 0)}</strong>
                  </p>
                  <div className="negotiation__response-buttons">
                    <button 
                      className="negotiation__btn negotiation__btn--accept"
                      onClick={onAcceptOffer}
                    >
                      <CheckCircle size={16} />
                      Accept Offer
                    </button>
                    <button 
                      className="negotiation__btn negotiation__btn--counter"
                      onClick={() => {
                        setCounterAmount(latestDealerOffer.amount || negotiation.currentOffer);
                        setShowCounterForm(true);
                      }}
                    >
                      <ArrowRight size={16} />
                      Counter
                    </button>
                    <button 
                      className="negotiation__btn negotiation__btn--reject"
                      onClick={onRejectOffer}
                    >
                      <XCircle size={16} />
                      Decline
                    </button>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="negotiation__message-input">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Send a message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  className="negotiation__send-btn"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <MessageSquare size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OfferNegotiation;

