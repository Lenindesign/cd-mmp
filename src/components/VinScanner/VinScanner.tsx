import { useState, useRef, useCallback } from 'react';
import { 
  Camera, 
  X, 
  Upload, 
  Scan, 
  CheckCircle, 
  AlertCircle, 
  Car,
  Loader2,
  RotateCcw,
  Keyboard,
  Info
} from 'lucide-react';
import { vehicleDatabase } from '../../data/vehicles';
import { Button } from '../Button';
import './VinScanner.css';

interface VinScannerProps {
  /** Callback when VIN is successfully decoded */
  onVinDecoded?: (data: VinDecodedData) => void;
  /** Callback when user wants to get trade-in value */
  onGetTradeInValue?: (data: VinDecodedData) => void;
  /** Show compact mode (for embedding in other components) */
  compact?: boolean;
}

export interface VinDecodedData {
  vin: string;
  year: string;
  make: string;
  model: string;
  trim?: string;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  bodyStyle?: string;
  fuelType?: string;
  vehicleImage?: string;
}

type ScanMode = 'idle' | 'camera' | 'uploading' | 'processing' | 'success' | 'error';

// Mock VIN decoder (in production, this would call NHTSA API or Google Vision)
const decodeVin = async (vin: string): Promise<VinDecodedData | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate VIN format (17 characters, no I, O, Q)
  const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
  if (!vinRegex.test(vin)) {
    return null;
  }
  
  // Mock decoding based on VIN patterns
  // In production, this would call the NHTSA vPIC API: https://vpic.nhtsa.dot.gov/api/
  const mockDecodings: Record<string, Partial<VinDecodedData>> = {
    '1': { make: 'Chevrolet', year: '2024' },
    '2': { make: 'Ford', year: '2024' },
    '3': { make: 'Chrysler', year: '2024' },
    '4': { make: 'Buick', year: '2024' },
    '5': { make: 'Honda', year: '2024' },
    'J': { make: 'Toyota', year: '2024' },
    'W': { make: 'BMW', year: '2024' },
  };
  
  const firstChar = vin.charAt(0).toUpperCase();
  const baseData = mockDecodings[firstChar] || { make: 'Unknown', year: '2024' };
  
  // Try to find a matching vehicle in our database
  const matchingVehicle = vehicleDatabase.find(v => 
    v.make.toLowerCase() === baseData.make?.toLowerCase()
  );
  
  return {
    vin: vin.toUpperCase(),
    year: baseData.year || '2024',
    make: baseData.make || 'Unknown',
    model: matchingVehicle?.model || 'Model',
    trim: matchingVehicle?.trim || 'Base',
    engine: '2.0L 4-Cylinder Turbo',
    transmission: matchingVehicle?.transmission || 'Automatic',
    drivetrain: matchingVehicle?.drivetrain || 'FWD',
    bodyStyle: matchingVehicle?.bodyStyle || 'Sedan',
    fuelType: matchingVehicle?.fuelType || 'Gasoline',
    vehicleImage: matchingVehicle?.image,
  };
};

// Simulate OCR extraction from image
const extractVinFromImage = async (_imageData: string): Promise<string | null> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In production, this would:
  // 1. Send image to Google Cloud Vision API
  // 2. Use TEXT_DETECTION to extract text
  // 3. Filter for VIN pattern (17 alphanumeric, no I/O/Q)
  
  // For demo, return a sample VIN
  const sampleVins = [
    '1HGBH41JXMN109186',
    '5YJSA1E26MF123456',
    'WVWZZZ3CZWE123456',
    '1G1YY22G965109876',
  ];
  
  return sampleVins[Math.floor(Math.random() * sampleVins.length)];
};

const VinScanner = ({
  onVinDecoded,
  onGetTradeInValue,
  compact = false,
}: VinScannerProps) => {
  const [mode, setMode] = useState<ScanMode>('idle');
  const [manualVin, setManualVin] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [decodedData, setDecodedData] = useState<VinDecodedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setMode('camera');
      setError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Prefer back camera
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please check permissions or try uploading an image.');
      setMode('idle');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setMode('idle');
  }, [cameraStream]);

  // Capture photo from camera
  const capturePhoto = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Get image data
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    // Stop camera
    stopCamera();
    
    // Process image
    await processImage(imageData);
  }, [stopCamera]);

  // Handle file upload
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setMode('uploading');
    setError(null);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      await processImage(imageData);
    };
    reader.readAsDataURL(file);
  }, []);

  // Process captured/uploaded image
  const processImage = async (imageData: string) => {
    setMode('processing');
    
    try {
      // Extract VIN from image using OCR
      const extractedVin = await extractVinFromImage(imageData);
      
      if (!extractedVin) {
        setError('Could not detect a VIN in the image. Please try again or enter manually.');
        setMode('error');
        return;
      }
      
      // Decode the VIN
      const decoded = await decodeVin(extractedVin);
      
      if (!decoded) {
        setError('Invalid VIN format. Please try again or enter manually.');
        setMode('error');
        return;
      }
      
      setDecodedData(decoded);
      setMode('success');
      onVinDecoded?.(decoded);
    } catch (err) {
      console.error('Processing error:', err);
      setError('An error occurred while processing. Please try again.');
      setMode('error');
    }
  };

  // Handle manual VIN submission
  const handleManualSubmit = async () => {
    if (!manualVin || manualVin.length !== 17) {
      setError('Please enter a valid 17-character VIN');
      return;
    }
    
    setMode('processing');
    setError(null);
    
    const decoded = await decodeVin(manualVin);
    
    if (!decoded) {
      setError('Invalid VIN. Please check and try again.');
      setMode('error');
      return;
    }
    
    setDecodedData(decoded);
    setMode('success');
    onVinDecoded?.(decoded);
  };

  // Reset scanner
  const reset = () => {
    setMode('idle');
    setDecodedData(null);
    setError(null);
    setManualVin('');
    setShowManualInput(false);
    stopCamera();
  };

  // Format VIN input
  const formatVinInput = (value: string) => {
    // Remove invalid characters and convert to uppercase
    return value.replace(/[IOQ]/gi, '').replace(/[^A-HJ-NPR-Z0-9]/gi, '').toUpperCase().slice(0, 17);
  };

  return (
    <section className={`vin-scanner ${compact ? 'vin-scanner--compact' : ''}`}>
      <div className="vin-scanner__container">
        {/* Header */}
        {!compact && (
          <div className="vin-scanner__header">
            <div className="vin-scanner__icon">
              <Scan size={24} />
            </div>
            <div className="vin-scanner__title-group">
              <h2 className="vin-scanner__title">Scan Your VIN</h2>
              <p className="vin-scanner__subtitle">
                Instantly identify your vehicle by scanning or photographing the VIN
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="vin-scanner__content">
          {/* Idle State - Show Options */}
          {mode === 'idle' && !showManualInput && (
            <div className="vin-scanner__options">
              <button 
                className="vin-scanner__option"
                onClick={startCamera}
              >
                <div className="vin-scanner__option-icon">
                  <Camera size={32} />
                </div>
                <div className="vin-scanner__option-text">
                  <span className="vin-scanner__option-title">Use Camera</span>
                  <span className="vin-scanner__option-desc">Point at VIN barcode or plate</span>
                </div>
              </button>
              
              <button 
                className="vin-scanner__option"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="vin-scanner__option-icon">
                  <Upload size={32} />
                </div>
                <div className="vin-scanner__option-text">
                  <span className="vin-scanner__option-title">Upload Photo</span>
                  <span className="vin-scanner__option-desc">Select an image of your VIN</span>
                </div>
              </button>
              
              <button 
                className="vin-scanner__option vin-scanner__option--secondary"
                onClick={() => setShowManualInput(true)}
              >
                <div className="vin-scanner__option-icon vin-scanner__option-icon--secondary">
                  <Keyboard size={24} />
                </div>
                <div className="vin-scanner__option-text">
                  <span className="vin-scanner__option-title">Enter Manually</span>
                  <span className="vin-scanner__option-desc">Type your 17-character VIN</span>
                </div>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="vin-scanner__file-input"
              />
            </div>
          )}

          {/* Manual Input */}
          {showManualInput && mode === 'idle' && (
            <div className="vin-scanner__manual">
              <div className="vin-scanner__manual-header">
                <h3 className="vin-scanner__manual-title">Enter Your VIN</h3>
                <button 
                  className="vin-scanner__back-btn"
                  onClick={() => setShowManualInput(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="vin-scanner__manual-input-wrapper">
                <input
                  type="text"
                  className="vin-scanner__manual-input"
                  placeholder="e.g. 1HGBH41JXMN109186"
                  value={manualVin}
                  onChange={(e) => setManualVin(formatVinInput(e.target.value))}
                  maxLength={17}
                />
                <span className="vin-scanner__char-count">
                  {manualVin.length}/17
                </span>
              </div>
              
              {error && (
                <div className="vin-scanner__error-inline">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleManualSubmit}
                disabled={manualVin.length !== 17}
              >
                DECODE VIN
              </Button>
              
              <div className="vin-scanner__vin-help">
                <Info size={16} />
                <p>
                  Find your VIN on the driver's side dashboard (visible through windshield), 
                  driver's door jamb, or your vehicle registration.
                </p>
              </div>
            </div>
          )}

          {/* Camera View */}
          {mode === 'camera' && (
            <div className="vin-scanner__camera">
              <video 
                ref={videoRef}
                className="vin-scanner__video"
                playsInline
                autoPlay
                muted
              />
              <canvas ref={canvasRef} className="vin-scanner__canvas" />
              
              <div className="vin-scanner__camera-overlay">
                <div className="vin-scanner__scan-frame">
                  <div className="vin-scanner__scan-corner vin-scanner__scan-corner--tl" />
                  <div className="vin-scanner__scan-corner vin-scanner__scan-corner--tr" />
                  <div className="vin-scanner__scan-corner vin-scanner__scan-corner--bl" />
                  <div className="vin-scanner__scan-corner vin-scanner__scan-corner--br" />
                  <div className="vin-scanner__scan-line" />
                </div>
                <p className="vin-scanner__camera-hint">
                  Position the VIN within the frame
                </p>
              </div>
              
              <div className="vin-scanner__camera-controls">
                <button 
                  className="vin-scanner__camera-btn vin-scanner__camera-btn--cancel"
                  onClick={stopCamera}
                >
                  <X size={24} />
                </button>
                <button 
                  className="vin-scanner__camera-btn vin-scanner__camera-btn--capture"
                  onClick={capturePhoto}
                >
                  <div className="vin-scanner__capture-ring" />
                </button>
                <button 
                  className="vin-scanner__camera-btn vin-scanner__camera-btn--manual"
                  onClick={() => { stopCamera(); setShowManualInput(true); }}
                >
                  <Keyboard size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Processing State */}
          {(mode === 'processing' || mode === 'uploading') && (
            <div className="vin-scanner__processing">
              <div className="vin-scanner__processing-animation">
                <Loader2 size={48} className="vin-scanner__spinner" />
                <Car size={32} className="vin-scanner__car-icon" />
              </div>
              <h3 className="vin-scanner__processing-title">
                {mode === 'uploading' ? 'Uploading Image...' : 'Decoding VIN...'}
              </h3>
              <p className="vin-scanner__processing-text">
                {mode === 'uploading' 
                  ? 'Preparing your image for analysis'
                  : 'Identifying your vehicle details'
                }
              </p>
            </div>
          )}

          {/* Error State */}
          {mode === 'error' && (
            <div className="vin-scanner__error">
              <div className="vin-scanner__error-icon">
                <AlertCircle size={48} />
              </div>
              <h3 className="vin-scanner__error-title">Unable to Decode</h3>
              <p className="vin-scanner__error-text">{error}</p>
              <div className="vin-scanner__error-actions">
                <Button
                  variant="primary"
                  onClick={reset}
                  iconLeft={<RotateCcw size={18} />}
                >
                  TRY AGAIN
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setMode('idle'); setShowManualInput(true); }}
                  iconLeft={<Keyboard size={18} />}
                >
                  ENTER MANUALLY
                </Button>
              </div>
            </div>
          )}

          {/* Success State */}
          {mode === 'success' && decodedData && (
            <div className="vin-scanner__success">
              <div className="vin-scanner__success-header">
                <CheckCircle size={24} className="vin-scanner__success-icon" />
                <span className="vin-scanner__success-label">Vehicle Identified</span>
              </div>
              
              <div className="vin-scanner__vehicle-card">
                {decodedData.vehicleImage && (
                  <div className="vin-scanner__vehicle-image">
                    <img src={decodedData.vehicleImage} alt={`${decodedData.year} ${decodedData.make} ${decodedData.model}`} />
                  </div>
                )}
                
                <div className="vin-scanner__vehicle-info">
                  <h3 className="vin-scanner__vehicle-title">
                    {decodedData.year} {decodedData.make} {decodedData.model}
                  </h3>
                  {decodedData.trim && (
                    <span className="vin-scanner__vehicle-trim">{decodedData.trim}</span>
                  )}
                  
                  <div className="vin-scanner__vehicle-vin">
                    <span className="vin-scanner__vin-label">VIN:</span>
                    <span className="vin-scanner__vin-value">{decodedData.vin}</span>
                  </div>
                  
                  <div className="vin-scanner__vehicle-specs">
                    {decodedData.engine && (
                      <div className="vin-scanner__spec">
                        <span className="vin-scanner__spec-label">Engine</span>
                        <span className="vin-scanner__spec-value">{decodedData.engine}</span>
                      </div>
                    )}
                    {decodedData.transmission && (
                      <div className="vin-scanner__spec">
                        <span className="vin-scanner__spec-label">Transmission</span>
                        <span className="vin-scanner__spec-value">{decodedData.transmission}</span>
                      </div>
                    )}
                    {decodedData.drivetrain && (
                      <div className="vin-scanner__spec">
                        <span className="vin-scanner__spec-label">Drivetrain</span>
                        <span className="vin-scanner__spec-value">{decodedData.drivetrain}</span>
                      </div>
                    )}
                    {decodedData.fuelType && (
                      <div className="vin-scanner__spec">
                        <span className="vin-scanner__spec-label">Fuel Type</span>
                        <span className="vin-scanner__spec-value">{decodedData.fuelType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="vin-scanner__success-actions">
                <Button
                  variant="success"
                  size="large"
                  fullWidth
                  onClick={() => onGetTradeInValue?.(decodedData)}
                >
                  GET TRADE-IN VALUE
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  fullWidth
                  onClick={reset}
                >
                  SCAN ANOTHER VIN
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        {!compact && mode === 'idle' && !showManualInput && (
          <div className="vin-scanner__footer">
            <div className="vin-scanner__powered-by">
              Powered by <strong>Google Cloud Vision</strong>
            </div>
            <div className="vin-scanner__privacy">
              <Info size={14} />
              <span>Images are processed securely and not stored</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VinScanner;

