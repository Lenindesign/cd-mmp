import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Gauge, ShieldCheck, Sparkles, ThumbsDown, ThumbsUp, X, Zap } from 'lucide-react';
import { getAllVehicles } from '../../services/vehicleService';
import './TradeInEstimateModal.css';

export type TradeInEstimateCondition = 'rough' | 'average' | 'clean';

interface TradeInEstimateModalProps {
  isOpen: boolean;
  initialVehicle?: string;
  initialMileage?: number;
  initialCondition?: TradeInEstimateCondition;
  description?: string;
  onClose: () => void;
  onApply: (estimate: {
    vehicle: string;
    mileage: number;
    zipCode: string;
    condition: TradeInEstimateCondition;
    value: number;
  }) => void;
}

const TRADE_IN_CONDITIONS: Array<{ value: TradeInEstimateCondition; label: string; description: string }> = [
  { value: 'rough', label: 'Rough', description: 'Needs visible repairs' },
  { value: 'average', label: 'Average', description: 'Normal wear, runs well' },
  { value: 'clean', label: 'Clean', description: 'Well-kept inside and out' },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const normalizeVehicleSearch = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const formatTradeInVehicle = (vehicle: { year: string; make: string; model: string }) =>
  `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

const currency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(value));

const estimateTradeInValue = (vehicleDescription: string, mileage: number, condition: TradeInEstimateCondition) => {
  const trimmedVehicle = vehicleDescription.trim();
  if (!trimmedVehicle || !mileage) return 0;

  const yearMatch = trimmedVehicle.match(/\b(19|20)\d{2}\b/);
  const vehicleYear = yearMatch ? Number(yearMatch[0]) : new Date().getFullYear() - 5;
  const age = clamp(new Date().getFullYear() - vehicleYear, 0, 25);
  const conditionMultiplier = condition === 'clean' ? 1 : condition === 'average' ? 0.86 : 0.7;
  const expectedMileage = Math.max(age, 1) * 12000;
  const mileageAdjustment = 1 - clamp((mileage - expectedMileage) / 100000, -0.12, 0.35);
  const vehicleText = trimmedVehicle.toLowerCase();
  const brandMultiplier = /toyota|honda|lexus|subaru|porsche/.test(vehicleText)
    ? 1.06
    : /bmw|mercedes|audi|cadillac|lincoln|genesis/.test(vehicleText)
      ? 1.12
      : /kia|hyundai|mazda|ford|chevrolet|chevy|gmc|jeep/.test(vehicleText)
        ? 0.98
        : 1;

  const depreciatedValue = 34000 * Math.pow(0.84, age);
  const estimate = depreciatedValue * mileageAdjustment * conditionMultiplier * brandMultiplier;

  return Math.max(500, Math.round(estimate / 100) * 100);
};

export const TradeInEstimateModal = ({
  isOpen,
  initialVehicle = '',
  initialMileage = 45000,
  initialCondition = 'average',
  description = 'Add a few details and we will drop the estimate into your buying power. No account, no extra page.',
  onClose,
  onApply,
}: TradeInEstimateModalProps) => {
  const [vehicle, setVehicle] = useState(initialVehicle);
  const [mileage, setMileage] = useState(String(initialMileage || ''));
  const [zipCode, setZipCode] = useState('');
  const [condition, setCondition] = useState<TradeInEstimateCondition>(initialCondition);

  const vehicleSuggestions = useMemo(() => {
    const latestByModel = new Map<string, { year: string; make: string; model: string; label: string; searchText: string; image: string }>();

    getAllVehicles().forEach((item) => {
      const modelKey = normalizeVehicleSearch(`${item.make} ${item.model}`);
      const current = latestByModel.get(modelKey);

      if (!current || Number(item.year) > Number(current.year)) {
        latestByModel.set(modelKey, {
          year: item.year,
          make: item.make,
          model: item.model,
          label: formatTradeInVehicle(item),
          searchText: normalizeVehicleSearch(`${item.year} ${item.make} ${item.model}`),
          image: item.image,
        });
      }
    });

    return Array.from(latestByModel.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const matchedVehicle = useMemo(() => {
    const query = normalizeVehicleSearch(vehicle);
    if (query.length < 3) return null;

    return vehicleSuggestions.find((item) => {
      const makeModel = normalizeVehicleSearch(`${item.make} ${item.model}`);
      return makeModel === query || query.includes(makeModel) || item.searchText === query || item.searchText.includes(query);
    }) ?? null;
  }, [vehicle, vehicleSuggestions]);

  const parsedMileage = Number(mileage);
  const estimatedValue = useMemo(
    () => estimateTradeInValue(vehicle, parsedMileage, condition),
    [condition, parsedMileage, vehicle],
  );
  const canUseEstimate = estimatedValue > 0 && zipCode.trim().length >= 5;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="trade-in-modal__overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="trade-in-modal" role="dialog" aria-modal="true" aria-labelledby="trade-in-modal-title">
        <div className="trade-in-modal__masthead">
          <div className="trade-in-modal__brand-lockup" aria-label="Powered by Car and Driver and Black Book">
            <svg
              viewBox="0 0 1364 262"
              className="trade-in-modal__logo"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Car and Driver"
              role="img"
            >
              <path fill="currentColor" d="M68.022 210.901C74.858 210.901 76.91 205.432 76.91 197.571V146.641H132.626V199.276C132.626 231.41 116.903 261.83 72.468 261.83H62.554C15.04 261.83 0 233.462 0 194.496V65.289C0 28.712 16.408 0 62.213 0H72.468C117.588 0 132.626 25.978 132.626 59.473V101.177H76.91V61.869C76.91 53.667 74.858 49.222 67.682 49.222C60.502 49.222 58.452 52.982 58.452 61.869V197.571C58.452 206.114 60.846 210.901 68.022 210.901Z"/>
              <path fill="currentColor" d="M272.324 257.729H217.63L213.53 220.47H187.551L183.791 257.729H134.911L167.384 3.41907H236.774L272.324 257.729ZM192.681 170.223H208.402L200.54 92.9747L192.681 170.223Z"/>
              <path fill="currentColor" d="M366.797 3.41907C391.752 3.41907 408.842 18.1158 408.842 48.1925V81.6935C408.842 105.278 396.534 115.873 386.624 120.318C396.194 124.079 408.842 134.331 408.842 153.477V237.561C408.842 247.13 410.55 252.601 412.258 256.021V257.729H356.542C354.149 254.654 352.101 248.844 352.101 239.616V165.781C352.101 157.237 350.047 153.477 342.527 153.477H334.666V257.729H278.268V3.41907H366.797ZM334.665 105.623H341.845C349.021 105.623 352.1 102.203 352.1 93.3126V59.1349C352.1 50.245 350.391 47.1691 342.871 47.1691H334.666L334.665 105.623Z"/>
              <path d="M428.499 63.023H594.769V3.61597H428.5L428.499 63.023Z" fill="#D2232A"/>
              <path d="M428.499 257.046H594.769V197.644H428.5L428.499 257.046Z" fill="#0061AF"/>
              <path fill="currentColor" d="M481.039 182.672H461.599L460.098 167.332H449.987L448.607 182.672H430.7L442.597 77.9894H468.019L481.039 182.672ZM451.864 147.839H458.219L454.742 111.882L451.864 147.839Z"/>
              <path fill="currentColor" d="M486.974 182.672V77.9889H507.008L517.652 128.64V77.9889H535.31V182.671H517.152L504.881 128.077V182.672H486.974Z"/>
              <path fill="currentColor" d="M573.909 77.9874C585.429 77.9875 592.567 84.3239 592.567 101.067V158.609C592.567 174.929 586.18 182.672 574.035 182.672H544.356V77.9874H573.909ZM564.175 162.549H567.647C570.653 162.549 571.531 160.579 571.531 156.219V103.459C571.531 99.2341 570.653 97.4093 567.898 97.4093H564.175V162.549Z"/>
              <path fill="currentColor" d="M696.341 3.41907C727.79 3.41907 747.273 18.8019 747.273 59.4728V199.276C747.273 238.928 729.839 257.729 696.682 257.729H615.674V3.41907H696.341ZM671.389 208.852H679.251C687.454 208.852 689.847 204.065 689.847 193.469V65.2892C689.847 55.0342 687.453 50.589 679.933 50.589H671.389V208.852Z"/>
              <path fill="currentColor" d="M845.438 3.41907C870.393 3.41907 887.48 18.1158 887.48 48.1925V81.6935C887.48 105.278 875.177 115.873 865.264 120.318C874.833 124.079 887.48 134.331 887.48 153.477V237.561C887.48 247.13 889.191 252.601 890.899 256.021V257.729H835.183C832.79 254.654 830.738 248.844 830.738 239.616V165.781C830.738 157.237 828.689 153.477 821.169 153.477H813.307L813.308 257.729H756.907V3.41907H845.438ZM813.307 105.623H820.482C827.662 105.623 830.737 102.203 830.737 93.3126V59.1349C830.737 50.245 829.03 47.1691 821.51 47.1691H813.307V105.623Z"/>
              <path fill="currentColor" d="M956.492 257.732H900.092V3.41895H956.492V257.732Z"/>
              <path fill="currentColor" d="M1073.15 257.729H999.319L962.748 3.41895H1022.22L1037.6 162.705L1052.99 3.41895H1107.34L1073.15 257.729Z"/>
              <path fill="currentColor" d="M1113.59 257.729V3.41895H1219.21V56.0569H1169.3V99.4689H1209.3V153.477H1169.3V204.065H1221.26V257.729H1113.59Z"/>
              <path fill="currentColor" d="M1285.45 47.1689H1293.65C1301.17 47.1689 1302.88 50.2449 1302.88 59.1349V93.313C1302.88 102.203 1299.81 105.623 1292.63 105.623H1285.45V47.1689ZM1285.45 153.477H1293.31C1300.83 153.477 1302.88 157.237 1302.88 165.781V239.616C1302.88 248.844 1304.93 254.654 1307.33 257.729H1363.04V256.021C1361.33 252.601 1359.62 247.131 1359.62 237.561V153.477C1359.62 134.331 1346.98 124.08 1337.41 120.319C1347.32 115.874 1359.62 105.279 1359.62 81.6939V48.1929C1359.62 18.1159 1342.54 3.41895 1317.58 3.41895H1229.05V257.729H1285.45V153.477Z"/>
            </svg>
            <span className="trade-in-modal__brand-plus" aria-hidden="true">+</span>
            <svg
              viewBox="86 31 124 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Black Book"
              role="img"
              className="trade-in-modal__black-book-logo"
            >
              <path
                d="M159.5,70 C162.234825,70 164,72.2783462 164,74.9997043 C164,77.7222452 162.234825,80 159.5,80 C156.765175,80 155,77.7222452 155,74.9997043 C155,72.2783462 156.765175,70 159.5,70 Z M121,71.5 C121,72.5636085 120.269394,73 118.980818,73 L117,73 L117,70 L118.980818,70 C120.115374,70 121,70.4363915 121,71.5 Z M119.622941,76 C120.975592,76 122,76.5809809 122,77.9996846 C122,79.4190191 120.975592,80 119.622941,80 L117,80 L117,76 L119.622941,76 Z M142,54 L144,49 L146,54 L142,54 Z M112,49.4994884 C112,50.5636085 111.269394,51 109.980818,51 L108,51 L108,48 L109.980818,48 C111.115374,48 112,48.4363915 112,49.4994884 Z M138.5,70 C141.234825,70 143,72.2783462 143,74.9997043 C143,77.7222452 141.234825,80 138.5,80 C135.765175,80 134,77.7222452 134,74.9997043 C134,72.2783462 135.765175,70 138.5,70 Z M184.291206,59.3020233 L187.4771,59.3020233 L181.305202,52.1677264 L186.796298,45.2744729 L183.789717,45.2744729 L178.780121,51.5668816 L178.780121,45.2744729 L176.375562,45.2744729 L176.375562,59.3020233 L178.780121,59.3020233 L178.780121,52.9696367 L184.291206,59.3020233 Z M181.488043,81.7513952 L184.674524,81.7513952 L178.502039,74.6170983 L183.993723,67.7226689 L180.987142,67.7226689 L175.976958,74.0156656 L175.976958,67.7226689 L173.572398,67.7226689 L173.572398,81.7513952 L175.976958,81.7513952 L175.976958,75.4184206 L181.488043,81.7513952 Z M163.837167,59.5424788 C167.384039,59.5424788 169.22773,57.1585007 169.22773,57.1585007 L167.624495,55.5746692 C167.624495,55.5746692 166.302281,57.2984235 163.837167,57.2984235 C161.07163,57.2984235 159.167972,54.9938134 159.167972,52.2882481 C159.167972,49.5826829 161.07163,47.2780727 163.837167,47.2780727 C166.141782,47.2780727 167.404028,48.8213384 167.404028,48.8213384 L169.02784,47.2380948 C169.02784,47.2380948 167.204138,45.0328416 163.837167,45.0328416 C159.788807,45.0328416 156.722847,48.1399499 156.722847,52.2882481 C156.722847,56.4359584 159.788807,59.5424788 163.837167,59.5424788 Z M159.444291,81.9918507 C163.532041,81.9918507 166.538622,78.8853303 166.538622,74.737032 C166.538622,70.5887338 163.532041,67.4822134 159.444291,67.4822134 C155.355952,67.4822134 152.349959,70.5887338 152.349959,74.737032 C152.349959,78.8853303 155.355952,81.9918507 159.444291,81.9918507 Z M148.353335,59.3020233 L150.777883,59.3020233 L145.326765,45.2744729 L142.88164,45.2744729 L137.43111,59.3020233 L139.855658,59.3020233 L141.138482,55.9756243 L147.070511,55.9756243 L148.353335,59.3020233 Z M138.221851,81.9918507 C142.309602,81.9918507 145.316183,78.8853303 145.316183,74.737032 C145.316183,70.5887338 142.309602,67.4822134 138.221851,67.4822134 C134.134101,67.4822134 131.128108,70.5887338 131.128108,74.737032 C131.128108,78.8853303 134.134101,81.9918507 138.221851,81.9918507 Z M122.409964,59.3020233 L130.787119,59.3020233 L131.530827,57.0174022 L124.814523,57.0174022 L124.814523,45.2744729 L122.409964,45.2744729 L122.409964,59.3020233 Z M119.404559,81.7513952 C122.050162,81.7513952 124.094331,80.0676188 124.094331,77.602509 C124.094331,75.0774324 122.110129,74.3560659 121.910239,74.316088 C122.110129,74.2561211 123.372964,73.4342218 123.372964,71.7310444 C123.372964,68.7850237 121.188871,67.7226689 118.903658,67.7226689 L114.354397,67.7226689 L114.354397,81.7513952 L119.404559,81.7513952 Z M105.813215,59.3020233 L110.862789,59.3020233 C113.508392,59.3020233 115.552561,57.6188349 115.552561,55.1531372 C115.552561,52.6286484 113.568359,51.9078699 113.367881,51.867304 C113.568359,51.8073371 114.831193,50.9854379 114.831193,49.2816726 C114.831193,46.3362397 112.646513,45.2744729 110.361888,45.2744729 L105.813215,45.2744729 L105.813215,59.3020233 Z M193.978816,31 L210,96 L102.020596,96 L86,31 L193.978816,31 Z M110.622941,53 C111.975592,53 113,53.5804416 113,54.9993691 C113,56.4195584 111.975592,57 110.622941,57 L108,57 L108,53 L110.622941,53 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <button type="button" className="trade-in-modal__close" onClick={onClose} aria-label="Close trade-in estimator">
            <X size={18} />
          </button>
        </div>

        <div className="trade-in-modal__steps" aria-label="Estimate benefits">
          <span>
            <Zap size={17} />
            <strong>Fast</strong>
            <small>About 30 seconds</small>
          </span>
          <span>
            <Gauge size={17} />
            <strong>Easy</strong>
            <small>Only the basics</small>
          </span>
          <span>
            <ShieldCheck size={17} />
            <strong>Dealer-ready</strong>
            <small>Built for planning</small>
          </span>
        </div>

        <div className="trade-in-modal__intro">
          <h2 id="trade-in-modal-title">Get a quick trade-in estimate</h2>
          <p>{description}</p>
        </div>

        <div className="trade-in-modal__body">
          <div className="trade-in-modal__form">
            <label className="trade-in-modal__field">
              <span>Current vehicle</span>
              <input
                type="text"
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                onBlur={() => {
                  if (matchedVehicle) setVehicle(matchedVehicle.label);
                }}
                placeholder="Year, make, and model"
                list="trade-in-vehicle-options"
                aria-describedby={matchedVehicle ? 'trade-in-vehicle-match' : undefined}
              />
              <datalist id="trade-in-vehicle-options">
                {vehicleSuggestions.slice(0, 80).map((item) => (
                  <option key={item.label} value={item.label} />
                ))}
              </datalist>
              {matchedVehicle && vehicle !== matchedVehicle.label && (
                <button
                  id="trade-in-vehicle-match"
                  type="button"
                  className="trade-in-modal__vehicle-match"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setVehicle(matchedVehicle.label)}
                >
                  Use {matchedVehicle.label}
                </button>
              )}
            </label>

            <div className="trade-in-modal__field-grid">
              <label className="trade-in-modal__field">
                <span>Mileage</span>
                <input
                  type="number"
                  value={mileage}
                  onChange={(event) => setMileage(event.target.value)}
                  placeholder="45,000"
                  min={0}
                  step={500}
                />
              </label>
              <label className="trade-in-modal__field">
                <span>ZIP code</span>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(event) => setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="90210"
                  inputMode="numeric"
                />
              </label>
            </div>

            <fieldset className="trade-in-modal__condition">
              <legend>Your vehicle's condition</legend>
              <div className="trade-in-modal__condition-options">
                {TRADE_IN_CONDITIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`trade-in-modal__condition-option ${condition === item.value ? 'trade-in-modal__condition-option--active' : ''}`}
                    onClick={() => setCondition(item.value)}
                  >
                    <span className="trade-in-modal__condition-icon" aria-hidden="true">
                      {item.value === 'rough' && <ThumbsDown size={22} />}
                      {item.value === 'average' && <ThumbsUp size={22} />}
                      {item.value === 'clean' && (
                        <>
                          <Sparkles size={13} className="trade-in-modal__condition-sparkle trade-in-modal__condition-sparkle--one" />
                          <Sparkles size={10} className="trade-in-modal__condition-sparkle trade-in-modal__condition-sparkle--two" />
                          <ThumbsUp size={22} />
                        </>
                      )}
                    </span>
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className="trade-in-modal__estimate" aria-live="polite">
            {matchedVehicle?.image && (
              <div className="trade-in-modal__estimate-vehicle">
                <img src={matchedVehicle.image} alt={matchedVehicle.label} />
              </div>
            )}
            <span className="trade-in-modal__estimate-label">Estimated trade-in value</span>
            <strong>{estimatedValue ? currency(estimatedValue) : 'Add vehicle details'}</strong>
            <p>This is a quick planning estimate. A dealer appraisal can adjust for trim, options, history, and local demand.</p>
          </aside>
        </div>

        <div className="trade-in-modal__actions">
          <button type="button" className="trade-in-modal__secondary" onClick={onClose}>
            Not now
          </button>
          <button
            type="button"
            className="trade-in-modal__primary"
            onClick={() => {
              if (!canUseEstimate) return;
              onApply({ vehicle, mileage: parsedMileage, zipCode, condition, value: estimatedValue });
              onClose();
            }}
            disabled={!canUseEstimate}
          >
            Use this estimate
          </button>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default TradeInEstimateModal;
