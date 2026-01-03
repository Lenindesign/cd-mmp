import { useState, useMemo, useRef, useCallback } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Info, 
  CheckCircle,
  Car,
  Scan,
  Camera,
  Upload,
  Keyboard,
  X,
  Loader2,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import { Button } from '../Button';
import './WhatsMyCarWorth.css';

interface WhatsMyCarWorthProps {
  /** Pre-selected year */
  defaultYear?: string;
  /** Pre-selected make */
  defaultMake?: string;
  /** Pre-selected model */
  defaultModel?: string;
  /** Callback when estimate is requested */
  onGetEstimate?: (data: { year: string; make: string; model: string; mileage: number; condition: string }) => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => String(currentYear - i));

const conditions = [
  { value: 'excellent', label: 'Excellent', description: 'Like new, no visible wear' },
  { value: 'good', label: 'Good', description: 'Minor wear, well maintained' },
  { value: 'fair', label: 'Fair', description: 'Normal wear for age/mileage' },
  { value: 'poor', label: 'Poor', description: 'Significant wear or damage' },
];

type InputMethod = 'select' | 'vin';
type VinScanMode = 'idle' | 'camera' | 'uploading' | 'processing' | 'success' | 'error';

interface VinDecodedData {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim?: string;
  engine?: string;
}

// NHTSA vPIC API response types
interface NHTSAResult {
  Variable: string;
  Value: string | null;
  ValueId: string | null;
}

interface NHTSAResponse {
  Results: NHTSAResult[];
}

// Real VIN decoder using NHTSA vPIC API (free, no API key required)
const decodeVin = async (vin: string): Promise<VinDecodedData | null> => {
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  if (!vinRegex.test(vin)) return null;
  
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
    );
    
    if (!response.ok) {
      throw new Error('NHTSA API request failed');
    }
    
    const data: NHTSAResponse = await response.json();
    
    // Extract values from NHTSA response
    const getValue = (variableName: string): string | null => {
      const result = data.Results.find(r => r.Variable === variableName);
      return result?.Value || null;
    };
    
    const year = getValue('Model Year');
    const make = getValue('Make');
    const model = getValue('Model');
    const trim = getValue('Trim') || getValue('Series');
    const engineDisplacement = getValue('Displacement (L)');
    const engineCylinders = getValue('Engine Number of Cylinders');
    const fuelType = getValue('Fuel Type - Primary');
    
    // Check if we got valid data (NHTSA returns empty values for invalid VINs)
    if (!year || !make || !model) {
      // NHTSA couldn't decode this VIN
      return null;
    }
    
    // Build engine string
    let engine = '';
    if (engineDisplacement && engineCylinders) {
      engine = `${engineDisplacement}L ${engineCylinders}-Cylinder`;
      if (fuelType && fuelType !== 'Gasoline') {
        engine += ` ${fuelType}`;
      }
    }
    
    return {
      vin: vin.toUpperCase(),
      year,
      make,
      model,
      trim: trim || undefined,
      engine: engine || undefined,
    };
  } catch (error) {
    console.error('VIN decode error:', error);
    return null;
  }
};

// Simulate OCR extraction from image
const extractVinFromImage = async (): Promise<string | null> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const sampleVins = [
    '1HGBH41JXMN109186',
    '5YJSA1E26MF123456',
    'WVWZZZ3CZWE123456',
    '1G1YY22G965109876',
  ];
  return sampleVins[Math.floor(Math.random() * sampleVins.length)];
};

const WhatsMyCarWorth = ({
  defaultYear = '',
  defaultMake = '',
  defaultModel = '',
  onGetEstimate,
}: WhatsMyCarWorthProps) => {
  // Input method tab
  const [inputMethod, setInputMethod] = useState<InputMethod>('select');
  
  // Manual selection states
  const [year, setYear] = useState(defaultYear);
  const [make, setMake] = useState(defaultMake);
  const [model, setModel] = useState(defaultModel);
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('good');
  const [showEstimate, setShowEstimate] = useState(false);
  
  // Dropdown states
  const [yearOpen, setYearOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  
  // VIN Scanner states
  const [vinScanMode, setVinScanMode] = useState<VinScanMode>('idle');
  const [manualVin, setManualVin] = useState('');
  const [showManualVinInput, setShowManualVinInput] = useState(false);
  const [vinError, setVinError] = useState<string | null>(null);
  const [decodedVin, setDecodedVin] = useState<VinDecodedData | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get unique makes from database
  const makes = useMemo(() => {
    const uniqueMakes = [...new Set(vehicleDatabase.map(v => v.make))].sort();
    return uniqueMakes;
  }, []);

  // Get models for selected make
  const models = useMemo(() => {
    if (!make) return [];
    const uniqueModels = [...new Set(
      vehicleDatabase
        .filter(v => v.make === make)
        .map(v => v.model)
    )].sort();
    return uniqueModels;
  }, [make]);

  // Calculate estimated value (mock calculation)
  const estimatedValue = useMemo(() => {
    if (!year || !make || !model || !mileage) return null;
    
    // Find vehicle in database for base price
    const vehicle = vehicleDatabase.find(v => v.make === make && v.model === model);
    const basePrice = vehicle?.priceMin || 25000;
    
    // Age depreciation (roughly 15% per year for first 5 years, then 10%)
    const age = currentYear - parseInt(year);
    let ageMultiplier = 1;
    for (let i = 0; i < age; i++) {
      ageMultiplier *= i < 5 ? 0.85 : 0.90;
    }
    
    // Mileage depreciation (roughly $0.10-0.15 per mile over 12k/year average)
    const expectedMileage = age * 12000;
    const mileageNum = parseInt(mileage.replace(/,/g, ''));
    const mileageDiff = mileageNum - expectedMileage;
    const mileageAdjustment = mileageDiff * -0.12;
    
    // Condition multiplier
    const conditionMultipliers: Record<string, number> = {
      excellent: 1.10,
      good: 1.0,
      fair: 0.85,
      poor: 0.70,
    };
    
    const estimatedPrice = (basePrice * ageMultiplier + mileageAdjustment) * conditionMultipliers[condition];
    
    // Return range
    const low = Math.max(1000, Math.round(estimatedPrice * 0.92 / 100) * 100);
    const high = Math.round(estimatedPrice * 1.08 / 100) * 100;
    const mid = Math.round((low + high) / 2 / 100) * 100;
    
    // Market trend (mock)
    const trends = ['up', 'down', 'stable'] as const;
    const trend = trends[Math.floor(Math.random() * 3)];
    
    return { low, mid, high, trend };
  }, [year, make, model, mileage, condition]);

  const handleMakeChange = (newMake: string) => {
    setMake(newMake);
    setModel(''); // Reset model when make changes
    setMakeOpen(false);
  };

  const handleGetEstimate = () => {
    if (year && make && model && mileage) {
      setShowEstimate(true);
      onGetEstimate?.({
        year,
        make,
        model,
        mileage: parseInt(mileage.replace(/,/g, '')),
        condition,
      });
    }
  };

  const formatMileage = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const isFormComplete = year && make && model && mileage;

  // VIN Scanner functions
  const startCamera = useCallback(async () => {
    try {
      setVinScanMode('camera');
      setVinError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } }
      });
      
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setVinError('Unable to access camera. Please check permissions or upload an image.');
      setVinScanMode('idle');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setVinScanMode('idle');
  }, [cameraStream]);

  const processImage = async () => {
    setVinScanMode('processing');
    
    try {
      const extractedVin = await extractVinFromImage();
      
      if (!extractedVin) {
        setVinError('Could not detect a VIN. Please try again or enter manually.');
        setVinScanMode('error');
        return;
      }
      
      const decoded = await decodeVin(extractedVin);
      
      if (!decoded) {
        setVinError('Invalid VIN format. Please try again or enter manually.');
        setVinScanMode('error');
        return;
      }
      
      setDecodedVin(decoded);
      setVinScanMode('success');
    } catch {
      setVinError('An error occurred. Please try again.');
      setVinScanMode('error');
    }
  };

  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    stopCamera();
    await processImage();
  }, [stopCamera]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setVinScanMode('uploading');
    setVinError(null);
    
    // Simulate reading file
    await new Promise(resolve => setTimeout(resolve, 500));
    await processImage();
  }, []);

  const handleManualVinSubmit = async () => {
    if (!manualVin || manualVin.length !== 17) {
      setVinError('Please enter a valid 17-character VIN');
      return;
    }
    
    setVinScanMode('processing');
    setVinError(null);
    
    const decoded = await decodeVin(manualVin);
    
    if (!decoded) {
      setVinError('Invalid VIN. Please check and try again.');
      setVinScanMode('error');
      return;
    }
    
    setDecodedVin(decoded);
    setVinScanMode('success');
  };

  const useVinData = () => {
    if (decodedVin) {
      setYear(decodedVin.year);
      setMake(decodedVin.make);
      setModel(decodedVin.model);
      setInputMethod('select');
      setVinScanMode('idle');
      setDecodedVin(null);
    }
  };

  const resetVinScanner = () => {
    setVinScanMode('idle');
    setDecodedVin(null);
    setVinError(null);
    setManualVin('');
    setShowManualVinInput(false);
    stopCamera();
  };

  const formatVinInput = (value: string) => {
    return value.replace(/[IOQ]/gi, '').replace(/[^A-HJ-NPR-Z0-9]/gi, '').toUpperCase().slice(0, 17);
  };

  return (
    <section className="whats-my-car-worth">
      <div className="whats-my-car-worth__container">
        {/* Header */}
        <div className="whats-my-car-worth__header">
          <div className="whats-my-car-worth__title-group">
            <h2 className="whats-my-car-worth__title">What's My Car Worth?</h2>
            <p className="whats-my-car-worth__subtitle">
              Get an instant trade-in estimate powered by Black Book
            </p>
          </div>
        </div>

        {/* Input Method Tabs */}
        <div className="whats-my-car-worth__tabs">
          <button
            type="button"
            className={`whats-my-car-worth__tab ${inputMethod === 'select' ? 'whats-my-car-worth__tab--active' : ''}`}
            onClick={() => { setInputMethod('select'); resetVinScanner(); }}
          >
            <Car size={18} />
            <span>Select Vehicle</span>
          </button>
          <button
            type="button"
            className={`whats-my-car-worth__tab ${inputMethod === 'vin' ? 'whats-my-car-worth__tab--active' : ''}`}
            onClick={() => setInputMethod('vin')}
          >
            <Scan size={18} />
            <span>Scan VIN</span>
          </button>
        </div>

        {/* Form - Select Vehicle Tab */}
        {inputMethod === 'select' && (
        <div className="whats-my-car-worth__form">
          <div className="whats-my-car-worth__form-row">
            {/* Year */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Year</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${year ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => setYearOpen(!yearOpen)}
                >
                  <span>{year || 'Select year'}</span>
                  <ChevronDown size={18} className={yearOpen ? 'rotated' : ''} />
                </button>
                {yearOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {years.map(y => (
                      <button
                        key={y}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${y === year ? 'selected' : ''}`}
                        onClick={() => { setYear(y); setYearOpen(false); }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Make */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Make</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${make ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => setMakeOpen(!makeOpen)}
                >
                  <span>{make || 'Select make'}</span>
                  <ChevronDown size={18} className={makeOpen ? 'rotated' : ''} />
                </button>
                {makeOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {makes.map(m => (
                      <button
                        key={m}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${m === make ? 'selected' : ''}`}
                        onClick={() => handleMakeChange(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Model */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Model</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className={`whats-my-car-worth__select ${model ? 'whats-my-car-worth__select--selected' : ''}`}
                  onClick={() => make && setModelOpen(!modelOpen)}
                  disabled={!make}
                >
                  <span>{model || (make ? 'Select model' : 'Select make first')}</span>
                  <ChevronDown size={18} className={modelOpen ? 'rotated' : ''} />
                </button>
                {modelOpen && (
                  <div className="whats-my-car-worth__dropdown">
                    {models.map(m => (
                      <button
                        key={m}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${m === model ? 'selected' : ''}`}
                        onClick={() => { setModel(m); setModelOpen(false); }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="whats-my-car-worth__form-row">
            {/* Mileage */}
            <div className="whats-my-car-worth__field">
              <label className="whats-my-car-worth__label">Current Mileage</label>
              <div className="whats-my-car-worth__input-wrapper">
                <input
                  type="text"
                  className="whats-my-car-worth__input"
                  placeholder="e.g. 45,000"
                  value={mileage}
                  onChange={(e) => setMileage(formatMileage(e.target.value))}
                />
                <span className="whats-my-car-worth__input-suffix">miles</span>
              </div>
            </div>

            {/* Condition */}
            <div className="whats-my-car-worth__field whats-my-car-worth__field--wide">
              <label className="whats-my-car-worth__label">Condition</label>
              <div className="whats-my-car-worth__select-wrapper">
                <button
                  type="button"
                  className="whats-my-car-worth__select whats-my-car-worth__select--selected"
                  onClick={() => setConditionOpen(!conditionOpen)}
                >
                  <span>{conditions.find(c => c.value === condition)?.label}</span>
                  <ChevronDown size={18} className={conditionOpen ? 'rotated' : ''} />
                </button>
                {conditionOpen && (
                  <div className="whats-my-car-worth__dropdown whats-my-car-worth__dropdown--condition">
                    {conditions.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        className={`whats-my-car-worth__dropdown-item ${c.value === condition ? 'selected' : ''}`}
                        onClick={() => { setCondition(c.value); setConditionOpen(false); }}
                      >
                        <span className="whats-my-car-worth__condition-label">{c.label}</span>
                        <span className="whats-my-car-worth__condition-desc">{c.description}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            variant="success"
            size="large"
            fullWidth
            className="whats-my-car-worth__cta"
            onClick={handleGetEstimate}
            disabled={!isFormComplete}
            iconRight={<ArrowRight size={18} />}
          >
            GET MY ESTIMATE
          </Button>
        </div>
        )}

        {/* VIN Scanner Tab */}
        {inputMethod === 'vin' && (
          <div className="whats-my-car-worth__vin-scanner">
            {/* Idle State - Show Options */}
            {vinScanMode === 'idle' && !showManualVinInput && (
              <div className="whats-my-car-worth__vin-options">
                <button 
                  className="whats-my-car-worth__vin-option"
                  onClick={startCamera}
                >
                  <div className="whats-my-car-worth__vin-option-icon">
                    <Camera size={28} />
                  </div>
                  <div className="whats-my-car-worth__vin-option-text">
                    <span className="whats-my-car-worth__vin-option-title">Use Camera</span>
                    <span className="whats-my-car-worth__vin-option-desc">Point at VIN barcode or plate</span>
                  </div>
                </button>
                
                <button 
                  className="whats-my-car-worth__vin-option"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="whats-my-car-worth__vin-option-icon">
                    <Upload size={28} />
                  </div>
                  <div className="whats-my-car-worth__vin-option-text">
                    <span className="whats-my-car-worth__vin-option-title">Upload Photo</span>
                    <span className="whats-my-car-worth__vin-option-desc">Select an image of your VIN</span>
                  </div>
                </button>
                
                <button 
                  className="whats-my-car-worth__vin-option whats-my-car-worth__vin-option--secondary"
                  onClick={() => setShowManualVinInput(true)}
                >
                  <div className="whats-my-car-worth__vin-option-icon whats-my-car-worth__vin-option-icon--secondary">
                    <Keyboard size={22} />
                  </div>
                  <div className="whats-my-car-worth__vin-option-text">
                    <span className="whats-my-car-worth__vin-option-title">Enter Manually</span>
                    <span className="whats-my-car-worth__vin-option-desc">Type your 17-character VIN</span>
                  </div>
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="whats-my-car-worth__file-input"
                />
                
                <div className="whats-my-car-worth__vin-help">
                  <Info size={16} />
                  <p>
                    Find your VIN on the driver's side dashboard (visible through windshield), 
                    driver's door jamb, or your vehicle registration.
                  </p>
                </div>
              </div>
            )}

            {/* Manual VIN Input */}
            {showManualVinInput && vinScanMode === 'idle' && (
              <div className="whats-my-car-worth__vin-manual">
                <div className="whats-my-car-worth__vin-manual-header">
                  <h3 className="whats-my-car-worth__vin-manual-title">Enter Your VIN</h3>
                  <button 
                    className="whats-my-car-worth__vin-back-btn"
                    onClick={() => setShowManualVinInput(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="whats-my-car-worth__vin-input-wrapper">
                  <input
                    type="text"
                    className="whats-my-car-worth__vin-input"
                    placeholder="e.g. 1HGBH41JXMN109186"
                    value={manualVin}
                    onChange={(e) => setManualVin(formatVinInput(e.target.value))}
                    maxLength={17}
                  />
                  <span className="whats-my-car-worth__vin-char-count">
                    {manualVin.length}/17
                  </span>
                </div>
                
                {vinError && (
                  <div className="whats-my-car-worth__vin-error">
                    <AlertCircle size={16} />
                    <span>{vinError}</span>
                  </div>
                )}
                
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  onClick={handleManualVinSubmit}
                  disabled={manualVin.length !== 17}
                >
                  DECODE VIN
                </Button>
              </div>
            )}

            {/* Camera View */}
            {vinScanMode === 'camera' && (
              <div className="whats-my-car-worth__vin-camera">
                <video 
                  ref={videoRef}
                  className="whats-my-car-worth__vin-video"
                  playsInline
                  autoPlay
                  muted
                />
                <canvas ref={canvasRef} className="whats-my-car-worth__vin-canvas" />
                
                <div className="whats-my-car-worth__vin-camera-overlay">
                  <div className="whats-my-car-worth__vin-scan-frame">
                    <div className="whats-my-car-worth__vin-scan-corner whats-my-car-worth__vin-scan-corner--tl" />
                    <div className="whats-my-car-worth__vin-scan-corner whats-my-car-worth__vin-scan-corner--tr" />
                    <div className="whats-my-car-worth__vin-scan-corner whats-my-car-worth__vin-scan-corner--bl" />
                    <div className="whats-my-car-worth__vin-scan-corner whats-my-car-worth__vin-scan-corner--br" />
                    <div className="whats-my-car-worth__vin-scan-line" />
                  </div>
                  <p className="whats-my-car-worth__vin-camera-hint">
                    Position the VIN within the frame
                  </p>
                </div>
                
                <div className="whats-my-car-worth__vin-camera-controls">
                  <button 
                    className="whats-my-car-worth__vin-camera-btn whats-my-car-worth__vin-camera-btn--cancel"
                    onClick={stopCamera}
                  >
                    <X size={24} />
                  </button>
                  <button 
                    className="whats-my-car-worth__vin-camera-btn whats-my-car-worth__vin-camera-btn--capture"
                    onClick={capturePhoto}
                  >
                    <div className="whats-my-car-worth__vin-capture-ring" />
                  </button>
                  <button 
                    className="whats-my-car-worth__vin-camera-btn whats-my-car-worth__vin-camera-btn--manual"
                    onClick={() => { stopCamera(); setShowManualVinInput(true); }}
                  >
                    <Keyboard size={24} />
                  </button>
                </div>
              </div>
            )}

            {/* Processing State */}
            {(vinScanMode === 'processing' || vinScanMode === 'uploading') && (
              <div className="whats-my-car-worth__vin-processing">
                <div className="whats-my-car-worth__vin-processing-animation">
                  <Loader2 size={48} className="whats-my-car-worth__vin-spinner" />
                  <Car size={28} className="whats-my-car-worth__vin-car-icon" />
                </div>
                <h3 className="whats-my-car-worth__vin-processing-title">
                  {vinScanMode === 'uploading' ? 'Uploading Image...' : 'Decoding VIN...'}
                </h3>
                <p className="whats-my-car-worth__vin-processing-text">
                  {vinScanMode === 'uploading' 
                    ? 'Preparing your image for analysis'
                    : 'Identifying your vehicle details'
                  }
                </p>
              </div>
            )}

            {/* Error State */}
            {vinScanMode === 'error' && (
              <div className="whats-my-car-worth__vin-error-state">
                <div className="whats-my-car-worth__vin-error-icon">
                  <AlertCircle size={48} />
                </div>
                <h3 className="whats-my-car-worth__vin-error-title">Unable to Decode</h3>
                <p className="whats-my-car-worth__vin-error-text">{vinError}</p>
                <div className="whats-my-car-worth__vin-error-actions">
                  <Button
                    variant="primary"
                    onClick={resetVinScanner}
                    iconLeft={<RotateCcw size={18} />}
                  >
                    TRY AGAIN
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { resetVinScanner(); setShowManualVinInput(true); }}
                    iconLeft={<Keyboard size={18} />}
                  >
                    ENTER MANUALLY
                  </Button>
                </div>
              </div>
            )}

            {/* Success State */}
            {vinScanMode === 'success' && decodedVin && (
              <div className="whats-my-car-worth__vin-success">
                <div className="whats-my-car-worth__vin-success-header">
                  <CheckCircle size={24} className="whats-my-car-worth__vin-success-icon" />
                  <span className="whats-my-car-worth__vin-success-label">Vehicle Identified</span>
                </div>
                
                <div className="whats-my-car-worth__vin-vehicle-card">
                  <h3 className="whats-my-car-worth__vin-vehicle-title">
                    {decodedVin.year} {decodedVin.make} {decodedVin.model}
                  </h3>
                  {decodedVin.trim && (
                    <span className="whats-my-car-worth__vin-vehicle-trim">{decodedVin.trim}</span>
                  )}
                  
                  <div className="whats-my-car-worth__vin-vehicle-vin">
                    <span className="whats-my-car-worth__vin-label">VIN:</span>
                    <span className="whats-my-car-worth__vin-value">{decodedVin.vin}</span>
                  </div>
                  
                  {decodedVin.engine && (
                    <div className="whats-my-car-worth__vin-vehicle-spec">
                      <span className="whats-my-car-worth__vin-spec-label">Engine:</span>
                      <span className="whats-my-car-worth__vin-spec-value">{decodedVin.engine}</span>
                    </div>
                  )}
                </div>
                
                <div className="whats-my-car-worth__vin-success-actions">
                  <Button
                    variant="success"
                    size="large"
                    fullWidth
                    onClick={useVinData}
                    iconRight={<ArrowRight size={18} />}
                  >
                    USE THIS VEHICLE
                  </Button>
                  <Button
                    variant="outline"
                    size="large"
                    fullWidth
                    onClick={resetVinScanner}
                  >
                    SCAN ANOTHER VIN
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Estimate Results */}
        {showEstimate && estimatedValue && (
          <div className="whats-my-car-worth__results">
            <div className="whats-my-car-worth__results-header">
              <h3 className="whats-my-car-worth__results-title">
                Your {year} {make} {model} Estimate
              </h3>
              <div className="whats-my-car-worth__results-meta">
                <span>{mileage} miles</span>
                <span className="whats-my-car-worth__divider">•</span>
                <span>{conditions.find(c => c.value === condition)?.label} condition</span>
              </div>
            </div>

            <div className="whats-my-car-worth__value-display">
              <div className="whats-my-car-worth__value-range">
                <div className="whats-my-car-worth__value-low">
                  <span className="whats-my-car-worth__value-label">Trade-In Low</span>
                  <span className="whats-my-car-worth__value-amount">{formatPrice(estimatedValue.low)}</span>
                </div>
                <div className="whats-my-car-worth__value-mid">
                  <span className="whats-my-car-worth__value-label">Estimated Value</span>
                  <span className="whats-my-car-worth__value-amount whats-my-car-worth__value-amount--primary">
                    {formatPrice(estimatedValue.mid)}
                  </span>
                  <div className="whats-my-car-worth__trend">
                    {estimatedValue.trend === 'up' && (
                      <>
                        <TrendingUp size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--up" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--up">Market trending up</span>
                      </>
                    )}
                    {estimatedValue.trend === 'down' && (
                      <>
                        <TrendingDown size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--down" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--down">Market trending down</span>
                      </>
                    )}
                    {estimatedValue.trend === 'stable' && (
                      <>
                        <Minus size={16} className="whats-my-car-worth__trend-icon whats-my-car-worth__trend-icon--stable" />
                        <span className="whats-my-car-worth__trend-text whats-my-car-worth__trend-text--stable">Market stable</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="whats-my-car-worth__value-high">
                  <span className="whats-my-car-worth__value-label">Trade-In High</span>
                  <span className="whats-my-car-worth__value-amount">{formatPrice(estimatedValue.high)}</span>
                </div>
              </div>

              <div className="whats-my-car-worth__value-bar">
                <div className="whats-my-car-worth__value-bar-track">
                  <div className="whats-my-car-worth__value-bar-fill" />
                  <div className="whats-my-car-worth__value-bar-marker" />
                </div>
              </div>
            </div>

            <div className="whats-my-car-worth__results-info">
              <Info size={16} />
              <p>
                This estimate is based on current market data. Actual trade-in value may vary based on 
                vehicle history, local market conditions, and dealer assessment.
              </p>
            </div>

            <div className="whats-my-car-worth__results-actions">
              <Button 
                variant="primary"
                className="whats-my-car-worth__action-btn"
                iconLeft={<CheckCircle size={18} />}
              >
                GET DEALER OFFERS
              </Button>
              <Button 
                variant="outline"
                className="whats-my-car-worth__action-btn"
              >
                SHOP WITH TRADE-IN
              </Button>
            </div>

            <p className="whats-my-car-worth__powered-by">
              Powered by <strong>Black Book</strong>
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="whats-my-car-worth__trust">
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>No personal info required</span>
          </div>
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>Instant results</span>
          </div>
          <div className="whats-my-car-worth__trust-item">
            <CheckCircle size={16} />
            <span>Real market data</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsMyCarWorth;

