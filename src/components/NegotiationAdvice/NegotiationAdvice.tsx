import './NegotiationAdvice.css';

export interface VehicleInventoryData {
  listingType: 'new' | 'used';
  make: string;
  model: string;
  numberAvailable: number;
  averageDaysOnLot?: number;
  cashIncentive?: number;
  mileageRange?: {
    low: number;
    high: number;
  };
  numberWithGoodPrice: number;
  numberNewlyListed: number;
}

export interface NegotiationAdviceProps {
  vehicle: VehicleInventoryData;
  className?: string;
}

const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

const generateNewCarAdvice = (vehicle: VehicleInventoryData) => {
  const { make, model, numberAvailable, averageDaysOnLot = 0, cashIncentive = 0 } = vehicle;
  const vehicleName = `${make} ${model}`;
  
  // Determine market condition
  const isHighInventory = numberAvailable >= 15;
  const isAgedInventory = averageDaysOnLot >= 30;
  const hasIncentive = cashIncentive > 0;
  
  const marketFavor = isHighInventory || isAgedInventory ? 'buyers' : 'sellers';
  
  return {
    title: `Negotiation Advice: New ${vehicleName}`,
    marketSummary: marketFavor === 'buyers' 
      ? `This market favors buyers. There are **${numberAvailable} new ${vehicleName}s available**, with vehicles sitting an **average of ${averageDaysOnLot} days on the lot**—${averageDaysOnLot >= 30 ? 'well past the 30-day threshold where dealers start feeling pressure to sell.' : 'giving you some room to negotiate.'}`
      : `This is a competitive market with limited inventory. Only **${numberAvailable} new ${vehicleName}s are available**, so be prepared to act quickly on good deals.`,
    tips: [
      isAgedInventory 
        ? `Use inventory age as your entry point. Ask how long the specific ${model} has been on the lot and focus on units at **40+ days**, where dealers are most likely to move on price.`
        : `Ask about specific units that have been on the lot longest—these offer the best negotiating leverage.`,
      hasIncentive 
        ? `The **$${formatNumber(cashIncentive)} cash incentive** should be treated as a given, not the negotiation. Apply it first, then push for additional dealer discount.`
        : `Check for manufacturer incentives or dealer cash that can be stacked on top of your negotiated price.`,
      `For maximum leverage, negotiate **late in the month** and prioritize any **prior model-year ${vehicleName}s**, which dealers are most motivated to clear.`,
    ],
    bottomLine: `Expect room to negotiate. The best deals will come from aged inventory, end-of-month timing, and pushing beyond the incentive.`,
    playbook: [
      `Target vehicles with **40+ days** on lot`,
      hasIncentive ? `Stack the **$${formatNumber(cashIncentive)} incentive** with dealer discount` : `Ask about available incentives and rebates`,
      `Negotiate **late in the month** for best results`,
      `Focus on **prior model-year** inventory`,
    ],
  };
};

const generateUsedCarAdvice = (vehicle: VehicleInventoryData) => {
  const { make, model, numberAvailable, mileageRange, numberWithGoodPrice, numberNewlyListed } = vehicle;
  const vehicleName = `${make} ${model}`;
  
  // Determine market condition
  const isLowInventory = numberAvailable <= 10;
  const hasNoPricedWell = numberWithGoodPrice === 0;
  const hasFewNewListings = numberNewlyListed <= 2;
  const hasWideMileageRange = mileageRange && (mileageRange.high - mileageRange.low) >= 50000;
  
  const marketCondition = isLowInventory && hasNoPricedWell 
    ? 'tight but overpriced' 
    : isLowInventory 
      ? 'limited' 
      : 'competitive';
  
  return {
    title: `Negotiation Advice: Used ${vehicleName}`,
    marketSummary: `This is a **${marketCondition} market**. Only **${numberAvailable} used ${vehicleName}s are available locally**, and ${numberWithGoodPrice === 0 ? '**none are rated as a good or great price**' : `only **${numberWithGoodPrice}** are rated as a good or great price`}, which suggests sellers are testing the top of the market rather than competing aggressively.`,
    tips: [
      hasWideMileageRange && mileageRange
        ? `The **wide mileage range (${formatNumber(mileageRange.low)}–${formatNumber(mileageRange.high)} miles)** creates meaningful pricing spread. Higher-mileage units give you the strongest negotiating leverage, especially if they're priced close to lower-mileage examples. Use mileage—and expected future maintenance—as justification for a price correction.`
        : `Compare mileage across available units to find pricing inconsistencies you can use as leverage.`,
      hasFewNewListings
        ? `Only **${numberNewlyListed === 1 ? 'one vehicle is' : `${numberNewlyListed} vehicles are`} newly listed**, meaning most listings have been sitting without attracting buyers. That's a signal to push back on price, particularly on older listings where sellers may be more willing to negotiate after limited interest.`
        : `With **${numberNewlyListed} newly listed vehicles**, there's fresh competition in the market—use this to your advantage.`,
    ],
    bottomLine: hasNoPricedWell
      ? `Be prepared to walk—scarcity exists, but pricing is still soft.`
      : `There are deals to be found, but you'll need to negotiate to get there.`,
    playbook: [
      hasWideMileageRange ? `Push hardest on **higher-mileage ${vehicleName}s**` : `Focus on **highest-mileage** units for best leverage`,
      hasNoPricedWell 
        ? `Challenge pricing using **comparable listings**, since none are well-priced`
        : `Reference the **${numberWithGoodPrice} well-priced** listings in your negotiation`,
      hasFewNewListings ? `Focus on vehicles that are **not newly listed**` : `Compare against **newly listed** vehicles`,
      `Be prepared to walk—scarcity exists, but pricing is still soft`,
    ],
  };
};

const NegotiationAdvice = ({ vehicle, className = '' }: NegotiationAdviceProps) => {
  const advice = vehicle.listingType === 'new' 
    ? generateNewCarAdvice(vehicle) 
    : generateUsedCarAdvice(vehicle);

  // Helper to render text with bold markdown
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`negotiation-advice ${className}`}>
      <div className="negotiation-advice__header">
        <h3 className="negotiation-advice__title">{advice.title}</h3>
      </div>
      
      <div className="negotiation-advice__content">
        <p className="negotiation-advice__summary">
          {renderText(advice.marketSummary)}
        </p>
        
        <div className="negotiation-advice__tips">
          {advice.tips.map((tip, index) => (
            <p key={index} className="negotiation-advice__tip">
              {renderText(tip)}
            </p>
          ))}
        </div>
        
        <div className="negotiation-advice__bottom-line">
          <span className="negotiation-advice__bottom-line-label">Bottom line:</span>
          <p className="negotiation-advice__bottom-line-text">{renderText(advice.bottomLine)}</p>
        </div>
        
        <div className="negotiation-advice__playbook">
          <h4 className="negotiation-advice__playbook-title">Negotiation playbook:</h4>
          <ul className="negotiation-advice__playbook-list">
            {advice.playbook.map((item, index) => (
              <li key={index} className="negotiation-advice__playbook-item">
                {renderText(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NegotiationAdvice;
