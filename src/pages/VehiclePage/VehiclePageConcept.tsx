import { useParams, Link } from 'react-router-dom';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  ChevronDown,
  ChevronLeft,
  ChevronRight, 
  Fuel, 
  Gauge, 
  Users, 
  Cog,
  Star,
  Bookmark,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { getVehicleBySlug, getAvailableYears } from '../../services/vehicleService';
import { vehicleDatabase } from '../../data/vehicles';
import { DealerLocatorMap } from '../../components/DealerLocatorMap';
import Warranty from '../../components/Warranty/Warranty';
import { getVehicleSafetyRatings, parseStarRating, type NHTSASafetyRating } from '../../services/nhtsaService';
import TrimSelector from '../../components/TrimSelector/TrimSelector';
import { getVehicleTrims } from '../../services/trimService';
import FuelEconomy from '../../components/FuelEconomy/FuelEconomy';
import WhatsMyCarWorth from '../../components/WhatsMyCarWorth/WhatsMyCarWorth';
import './VehiclePageConcept.css';

const VehiclePageConcept = () => {
  const params = useParams<{ year: string; make: string; model: string }>();
  const { user, isAuthenticated, addSavedVehicle, removeSavedVehicle } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const [showDealerMap, setShowDealerMap] = useState(false);
  const [showTrimSelector, setShowTrimSelector] = useState(false);
  const [showFuelEconomy, setShowFuelEconomy] = useState(false);
  const [showTradeIn, setShowTradeIn] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [safetyRatings, setSafetyRatings] = useState<NHTSASafetyRating | null>(null);
  const [isLoadingSafety, setIsLoadingSafety] = useState(false);
  const [showInteriorGallery, setShowInteriorGallery] = useState(false);
  const [interiorIndex, setInteriorIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  
  const year = params.year;
  const make = params.make;
  const model = params.model;
  const slug = `${year}/${make}/${model}`;
  
  const vehicle = useMemo(() => getVehicleBySlug(slug), [slug]);
  
  // Check if vehicle is saved
  const vehicleName = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
  const isSaved = user?.savedVehicles?.some(v => v.name === vehicleName) || false;
  
  const handleSaveClick = () => {
    if (!isAuthenticated || !vehicle) return;
    
    if (isSaved) {
      const savedVehicle = user?.savedVehicles?.find(v => v.name === vehicleName);
      if (savedVehicle) {
        removeSavedVehicle(savedVehicle.id);
      }
    } else {
      addSavedVehicle({
        id: `${vehicle.slug}-${Date.now()}`,
        name: vehicleName,
        ownership: 'want',
      });
    }
  };

  // Get similar vehicles for comparison
  const similarVehicles = useMemo(() => {
    if (!vehicle) return [];
    return vehicleDatabase
      .filter(v => v.bodyStyle === vehicle.bodyStyle && v.id !== vehicle.id)
      .slice(0, 3);
  }, [vehicle]);

  // Interior gallery photos (vehicle-specific)
  const interiorPhotos = useMemo(() => {
    if (!vehicle) return [];
    
    // Toyota Corolla 2026 interior photos
    if (vehicle.make === 'Toyota' && vehicle.model === 'Corolla') {
      return [
        'https://hips.hearstapps.com/mtg-prod/688292d0da86330002f61f4f/2026toyotacorollacorollahybridsedanfwdawd-17.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292c96b5a7400029e067b/2026toyotacorollacorollahybridsedanfwdawd-12.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292d24698760002da9587/2026toyotacorollacorollahybridsedanfwdawd-18.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292cc4698760002da9584/2026toyotacorollacorollahybridsedanfwdawd-14.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292cf4698760002da9586/2026toyotacorollacorollahybridsedanfwdawd-16.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292cd6b5a7400029e067c/2026toyotacorollacorollahybridsedanfwdawd-15.jpg',
        'https://hips.hearstapps.com/mtg-prod/688292cb7d11a100027d9027/2026toyotacorollacorollahybridsedanfwdawd-13.jpg',
      ];
    }
    
    // Honda Accord interior photos
    if (vehicle.make === 'Honda' && vehicle.model === 'Accord') {
      return [
        'https://hips.hearstapps.com/mtg-prod/671a7545a32dcb0008742bac/001-2025-honda-accord-hybrid.jpg',
        'https://hips.hearstapps.com/mtg-prod/671a7548a32dcb0008742bad/002-2025-honda-accord-hybrid.jpg',
        'https://hips.hearstapps.com/mtg-prod/671a754a2647660009869398/003-2025-honda-accord-hybrid.jpg',
        'https://hips.hearstapps.com/mtg-prod/671a754d958c1a00082e2e5e/004-2025-honda-accord-hybrid.jpg',
        'https://hips.hearstapps.com/mtg-prod/671a754ea32dcb0008742bae/005-2025-honda-accord-hybrid.jpg',
        'https://hips.hearstapps.com/mtg-prod/671a7551958c1a00082e2e60/006-2025-honda-accord-hybrid.jpg',
      ];
    }
    
    // Tesla Model 3 interior photos
    if (vehicle.make === 'Tesla' && vehicle.model === 'Model 3') {
      return [
        'https://hips.hearstapps.com/mtg-prod/uploads/2024/04/2024teslamodel3performancehighland42.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a10a52f2c7000819a0c9/014-2024-tesla-model-3-awd-long-range-dashboard.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a10a52f2c7000819a0c7/012-2024-tesla-model-3-awd-long-range.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a10a32222600089f8f0d/018-2024-tesla-model-3-awd-long-range.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a0f6f4ad5b00088978c2/016-2024-tesla-model-3-rwd-short-range-infotainment-screen.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a0f6f4ad5b00088978c0/013-2024-tesla-model-3-awd-long-range-cup-holder.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a111391bac000853ba03/011-2024-tesla-model-3-awd-long-range.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a111391bac000853ba02/009-2024-tesla-model-3-awd-long-range.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a111f4ad5b00088978d8/006-2024-tesla-model-3-awd-long-range-rear-seats.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4a0fded5cac0008b1c2a6/009-2024-tesla-model-3-awd-long-range-cup-holder.jpg',
      ];
    }
    
    // Mazda 3 interior photos
    if (vehicle.make === 'Mazda' && vehicle.model === '3') {
      return [
        'https://hips.hearstapps.com/mtg-prod/677873e336112c0008bec62f/4-2025-mazda-mazda3-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/677873e6a64de300081603f2/5-2025-mazda-mazda3-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/677873e9a64de300081603f3/6-2025-mazda-mazda3-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/677873edfc798600080bec3f/7-2025-mazda-mazda3-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/677873f036112c0008bec633/8-2025-mazda-mazda3-interior.jpg',
      ];
    }
    
    // Mazda CX-5 interior photos
    if (vehicle.make === 'Mazda' && vehicle.model === 'CX-5') {
      return [
        'https://hips.hearstapps.com/mtg-prod/686c4f4fbf3cec0002569567/2026mazdacx-514.jpg',
        'https://hips.hearstapps.com/mtg-prod/66984f194051cb0008709c50/1-2025-mazda-cx-5-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66984f1cc46bda0008bb4168/2-2025-mazda-cx-5-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66984f2dc46bda0008bb416b/8-2025-mazda-cx-5-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66984f31c46bda0008bb416c/9-2025-mazda-cx-5-interior.jpg',
      ];
    }
    
    // Honda HR-V interior photos
    if (vehicle.make === 'Honda' && vehicle.model === 'HR-V') {
      return [
        'https://hips.hearstapps.com/mtg-prod/6658e6710045830008a2e0b4/31-2025-honda-hr-v-sport-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/6658e66ef31254000921b1ff/30-2025-honda-hr-v-sport-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/6658e67620298f0008243b8b/48-2025-honda-hr-v-sport-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/6658e674fdc0120008665281/33-2025-honda-hr-v-sport-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a4f2c3221e6d000823b27b/2024-honda-hr-v-awd-ex-l-interior-4.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a1884037e1e8000812fe29/2024-honda-hr-v-awd-ex-l-interior-11.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a1882152adb600099972ee/2024-honda-hr-v-awd-ex-l-interior-5.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a1883f868dc0000845b7f9/2024-honda-hr-v-awd-ex-l-interior-8.jpg',
        'https://hips.hearstapps.com/mtg-prod/65a18830979de90008c6886d/2024-honda-hr-v-awd-ex-l-interior-7.jpg',
      ];
    }
    
    // Infiniti QX60 interior photos
    if (vehicle.make === 'Infiniti' && vehicle.model === 'QX60') {
      return [
        'https://hips.hearstapps.com/mtg-prod/669fef93e0f1950008a6089a/1-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefb152fc9900098cff43/8-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefac151a5200084648d9/7-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefcc051a870008e0a5b2/12-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefcf151a5200084648db/13-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefebdf56f80008a94121/22-2025-infiniti-qx60-blck-edit-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/669fefe8051a870008e0a5b6/21-2025-infiniti-qx60-blck-edit-cargo.jpg',
      ];
    }
    
    // Hyundai Venue interior photos
    if (vehicle.make === 'Hyundai' && vehicle.model === 'Venue') {
      return [
        'https://hips.hearstapps.com/mtg-prod/66bfd23a42a00b0008c08f78/002-2025-hyundai-venue-interior-dash.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd23ee0c704000824664d/003-2025-hyundai-venue-interior-seat.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd24fa88f040008a8e2bd/008-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd24b42a00b0008c08f7a/007-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd2485e64df0008f777e2/006-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd257e0c704000824664f/010-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd25ce0c7040008246650/012-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd259a88f040008a8e2be/011-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd26396736e00081ded5d/014-2025-hyundai-venue-interior.jpg',
        'https://hips.hearstapps.com/mtg-prod/66bfd26696736e00081ded5e/015-2025-hyundai-venue-interior.jpg',
      ];
    }
    
    // Fallback to gallery images if available
    if (vehicle.galleryImages && vehicle.galleryImages.length > 0) {
      return vehicle.galleryImages;
    }
    
    return [vehicle.image];
  }, [vehicle]);

  // Get trims for this vehicle
  const vehicleTrims = useMemo(() => {
    if (!vehicle) return [];
    return getVehicleTrims(vehicle.make, vehicle.model, vehicle.priceMin, vehicle.priceMax);
  }, [vehicle]);

  // Get available years for this make/model
  const availableYears = useMemo(() => {
    if (!vehicle) return [];
    return getAvailableYears(vehicle.make, vehicle.model);
  }, [vehicle]);

  // Track if using previous year's data
  const [safetyDataYear, setSafetyDataYear] = useState<string | null>(null);

  // Fetch safety ratings (try current year, fallback to previous years)
  useEffect(() => {
    if (vehicle) {
      setIsLoadingSafety(true);
      setSafetyDataYear(null);
      
      const tryFetchSafetyData = async () => {
        const currentYear = parseInt(vehicle.year);
        const yearsToTry = [currentYear, currentYear - 1, currentYear - 2];
        
        for (const year of yearsToTry) {
          try {
            const data = await getVehicleSafetyRatings(vehicle.make, vehicle.model, String(year));
            if (data && data.OverallRating && data.OverallRating !== 'Not Rated') {
              setSafetyRatings(data);
              setSafetyDataYear(year !== currentYear ? String(year) : null);
              return;
            }
          } catch {
            // Continue to next year
          }
        }
        // No data found for any year
        setSafetyRatings(null);
      };
      
      tryFetchSafetyData().finally(() => {
        setIsLoadingSafety(false);
      });
    }
  }, [vehicle]);

  // Close year dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle year selection
  const handleYearSelect = (selectedYear: string) => {
    setIsYearDropdownOpen(false);
    // Navigate to the concept page for the selected year
    window.location.href = `/${selectedYear}/${vehicle?.make}/${vehicle?.model}/concept`;
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
      
      // Parallax effect on hero
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide the CarFinderChat FAB on this concept page
  useEffect(() => {
    const fab = document.querySelector('.car-finder-chat__fab') as HTMLElement;
    if (fab) {
      fab.style.display = 'none';
    }
    return () => {
      if (fab) {
        fab.style.display = '';
      }
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDealerMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDealerMap]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDealerMap) {
        setShowDealerMap(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showDealerMap]);

  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Build gallery media (images + video for specific vehicles)
  const galleryMedia = useMemo(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/8001da2e-0c34-4135-a77e-d17e5ce7e6e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehiclePageConcept.tsx:galleryMedia',message:'galleryMedia useMemo called',data:{vehicleMake:vehicle?.make,vehicleModel:vehicle?.model,hasVehicle:!!vehicle},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    if (!vehicle) return [{ type: 'image' as const, src: '' }];
    
    const baseImages = vehicle.galleryImages || [vehicle.image];
    
    // Custom gallery for Mazda CX-5 with Hearst images and video
    if (vehicle.make === 'Mazda' && vehicle.model === 'CX-5') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/cx5.mp4' },
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/6778870454a81800085167ef/18-2025-mazda-cx-90-front-view.jpg' },
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/686c4f4fbf3cec0002569567/2026mazdacx-514.jpg' },
        { type: 'image' as const, src: 'https://hips.hearstapps.com/mtg-prod/686c4f46308c7d00024e576e/2026mazdacx-55.jpg' },
      ];
    }
    
    // Custom gallery for Mazda 3 with video as first slide
    if (vehicle.make === 'Mazda' && vehicle.model === '3') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/mazda3.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Toyota Corolla with video as first slide
    if (vehicle.make === 'Toyota' && vehicle.model === 'Corolla') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/corolla2.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Tesla Model 3 with video as first slide
    if (vehicle.make === 'Tesla' && vehicle.model === 'Model 3') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/tesla.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Honda Accord with video as first slide
    if (vehicle.make === 'Honda' && vehicle.model === 'Accord') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/accord2.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Honda HR-V with video as first slide
    if (vehicle.make === 'Honda' && vehicle.model === 'HR-V') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/HR-V3.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Hyundai Venue with video as first slide
    if (vehicle.make === 'Hyundai' && vehicle.model === 'Venue') {
      // #region agent log
      fetch('http://127.0.0.1:7244/ingest/8001da2e-0c34-4135-a77e-d17e5ce7e6e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehiclePageConcept.tsx:VenueMatch',message:'Hyundai Venue matched - returning video',data:{videoUrl:'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/venue.mp4',baseImagesCount:baseImages.length},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2-H4'})}).catch(()=>{});
      // #endregion
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/venue.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // Custom gallery for Infiniti QX60 with video as first slide
    if (vehicle.make === 'Infiniti' && vehicle.model === 'QX60') {
      return [
        { type: 'video' as const, src: 'https://pub-29d8f12b08c34438be643f74f38892b0.r2.dev/qx60.mp4' },
        ...baseImages.map(src => ({ type: 'image' as const, src })),
      ];
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/8001da2e-0c34-4135-a77e-d17e5ce7e6e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehiclePageConcept.tsx:defaultGallery',message:'No vehicle match - using default gallery (no video)',data:{make:vehicle.make,model:vehicle.model},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    return baseImages.map(src => ({ type: 'image' as const, src }));
  }, [vehicle]);

  const currentMedia = galleryMedia[currentImageIndex] || { type: 'image', src: '' };
  
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7244/ingest/8001da2e-0c34-4135-a77e-d17e5ce7e6e0',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'VehiclePageConcept.tsx:galleryState',message:'Gallery media state',data:{galleryLength:galleryMedia.length,firstItemType:galleryMedia[0]?.type,firstItemSrc:galleryMedia[0]?.src?.substring(0,50),currentIndex:currentImageIndex,currentType:currentMedia.type},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H4-H5'})}).catch(()=>{});
  }, [galleryMedia, currentImageIndex, currentMedia]);
  // #endregion

  // Preload images
  useEffect(() => {
    if (!vehicle) return;
    
    const imageUrls = galleryMedia
      .filter(m => m.type === 'image')
      .map(m => m.src);
    
    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= 1) { // Show as soon as first image loads
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount >= 1) {
          setImagesLoaded(true);
        }
      };
      img.src = url;
    });
  }, [vehicle, galleryMedia]);

  // Auto-rotate gallery (pause on video)
  useEffect(() => {
    if (galleryMedia.length <= 1) return;
    // Don't auto-rotate if current slide is a video
    if (currentMedia.type === 'video') return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryMedia.length, currentMedia.type]);

  // Keyboard navigation for gallery and interior modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Interior gallery modal navigation
      if (showInteriorGallery) {
        if (e.key === 'Escape') {
          e.preventDefault();
          setShowInteriorGallery(false);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setInteriorIndex(prev => prev === 0 ? interiorPhotos.length - 1 : prev - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setInteriorIndex(prev => prev === interiorPhotos.length - 1 ? 0 : prev + 1);
        }
        return;
      }
      
      // Hero gallery navigation
      if (galleryMedia.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentImageIndex(prev => prev === 0 ? galleryMedia.length - 1 : prev - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryMedia.length, showInteriorGallery, interiorPhotos.length]);

  if (!vehicle) {
    return (
      <div className="concept concept--not-found">
        <div className="concept__not-found-content">
          <h1>Vehicle Not Found</h1>
          <p>The vehicle you're looking for doesn't exist.</p>
          <Link to="/vehicles" className="concept__back-link">
            <ArrowLeft size={18} />
            Browse All Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { 
      id: 'performance',
      icon: Gauge, 
      label: 'Performance', 
      value: `${vehicle.horsepower} HP`,
      detail: 'Twin-turbocharged inline-6 engine delivers exhilarating power with refined efficiency. 0-60 in 4.4 seconds.',
    },
    { 
      id: 'efficiency',
      icon: Fuel, 
      label: 'Efficiency', 
      value: `${vehicle.mpg} MPG`,
      detail: 'Combined city and highway fuel economy. Eco mode available for extended range driving.',
    },
    { 
      id: 'seating',
      icon: Users, 
      label: 'Capacity', 
      value: `${vehicle.seatingCapacity || 5} Seats`,
      detail: 'Spacious interior with premium leather seating. Rear seats fold flat for cargo flexibility.',
    },
    { 
      id: 'drivetrain',
      icon: Cog, 
      label: 'Drivetrain', 
      value: vehicle.drivetrain || 'AWD',
      detail: 'Intelligent all-wheel drive system adapts to road conditions in real-time.',
    },
  ];

  const highlights = [
    'Best-in-class safety ratings',
    'Premium interior materials',
    'Advanced driver assistance',
    'Wireless Apple CarPlay & Android Auto',
    'Panoramic moonroof',
    'Adaptive suspension',
  ];

  // Editorial Review Content
  const editorialReview = {
    headline: `${vehicle.year} ${vehicle.make} ${vehicle.model} Review: The Benchmark Evolves`,
    author: 'Eric Stafford',
    authorTitle: 'Senior Editor',
    authorAvatar: 'https://media.muckrack.com/profile/images/524536/eric-stafford.jpeg.256x256_q100_crop-smart.jpg',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    leadParagraph: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} continues to set the standard in the ${vehicle.bodyStyle.toLowerCase()} segment, delivering a compelling blend of performance, comfort, and technology that few rivals can match. After spending a week with this latest iteration, we came away impressed by how ${vehicle.make} has refined an already excellent formula.`,
    fullReview: [
      {
        heading: 'Driving Impressions',
        content: `Behind the wheel, the ${vehicle.model} feels planted and confident. The steering is precise with good feedback, and the chassis strikes an excellent balance between comfort and sportiness. Whether navigating city traffic or carving through mountain roads, this ${vehicle.bodyStyle.toLowerCase()} never feels out of its element. The ${vehicle.horsepower} horsepower engine provides more than adequate thrust, with smooth power delivery throughout the rev range.`
      },
      {
        heading: 'Interior & Technology',
        content: `Step inside and you're greeted by a cabin that punches well above its price point. Material quality is excellent, with soft-touch surfaces where your hands naturally rest. The infotainment system is intuitive and responsive, featuring wireless Apple CarPlay and Android Auto. The digital gauge cluster is crisp and customizable, though some may miss traditional analog dials.`
      },
      {
        heading: 'Practicality',
        content: `With seating for ${vehicle.seatingCapacity || 5} and a generous cargo area, the ${vehicle.model} handles daily duties with ease. Rear-seat passengers enjoy ample legroom, and the trunk swallows luggage without complaint. Fuel economy of ${vehicle.mpg} MPG combined means fewer stops at the pump, a welcome trait for commuters and road-trippers alike.`
      },
      {
        heading: 'The Verdict',
        content: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} earns its reputation as a segment leader. It's not the flashiest choice, nor the most affordable, but it delivers a well-rounded package that's difficult to fault. For buyers seeking a refined, reliable, and rewarding ${vehicle.bodyStyle.toLowerCase()}, this should be at the top of your shopping list.`
      }
    ]
  };

  return (
    <div className="concept">
      {/* Floating Navigation */}
      <nav className={`concept__nav ${isScrolled ? 'concept__nav--scrolled' : ''}`}>
        <Link to="/vehicles" className="concept__nav-back">
          <ArrowLeft size={20} />
        </Link>
        <div className="concept__nav-title">
          {isScrolled && (
            <>
              <span className="concept__nav-vehicle-name">{vehicle.year} {vehicle.make} {vehicle.model}</span>
              <span className="concept__nav-price">{vehicle.priceRange}</span>
              <span className="concept__nav-rating">
                <Star size={14} fill="var(--color-gold)" stroke="var(--color-gold)" />
                {vehicle.staffRating} C/D
              </span>
            </>
          )}
        </div>
        <div className="concept__nav-actions">
          {isScrolled && (
            <>
              <button className="concept__nav-cta concept__nav-cta--primary">
                Shop New
              </button>
              <button className="concept__nav-cta concept__nav-cta--outline">
                Shop Used
              </button>
            </>
          )}
          <button className="concept__nav-btn" aria-label="Save vehicle">
            <Bookmark size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
        <section className="concept__hero">
          <div className={`concept__hero-image-wrapper ${imagesLoaded ? 'concept__hero-image-wrapper--loaded' : ''}`} ref={heroRef}>
            {currentMedia.type === 'video' ? (
              <video
                className="concept__hero-video"
                src={currentMedia.src}
                autoPlay
                muted
                playsInline
                onEnded={() => setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length)}
              />
            ) : (
              <div 
                className="concept__hero-image"
                style={{ backgroundImage: `url(${currentMedia.src})` }}
              />
            )}
            <div 
              className="concept__hero-overlay"
              onClick={(e) => {
                if (galleryMedia.length <= 1) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const halfWidth = rect.width / 2;
                
                if (clickX < halfWidth) {
                  // Left side - previous slide
                  setCurrentImageIndex(prev => prev === 0 ? galleryMedia.length - 1 : prev - 1);
                } else {
                  // Right side - next slide
                  setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length);
                }
              }}
              style={{ cursor: galleryMedia.length > 1 ? 'pointer' : 'default' }}
            />
            
            {/* Slider Arrows */}
            {galleryMedia.length > 1 && (
              <>
                <button 
                  className="concept__slider-arrow concept__slider-arrow--prev"
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? galleryMedia.length - 1 : prev - 1)}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="concept__slider-arrow concept__slider-arrow--next"
                  onClick={() => setCurrentImageIndex(prev => (prev + 1) % galleryMedia.length)}
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Hero Content - Top */}
          <div className="concept__hero-content concept__hero-content--top">
            {/* Save button */}
            <button 
              className={`concept__save-btn ${isSaved ? 'concept__save-btn--saved' : ''}`}
              onClick={handleSaveClick}
              aria-label={isSaved ? 'Remove from saved' : 'Save vehicle'}
            >
              <Bookmark size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>

            <div className="concept__hero-text">
              <div className="concept__year-make-row">
                {/* Badges */}
                {(vehicle.editorsChoice || vehicle.tenBest) && (
                  <div className="concept__badges">
                    {vehicle.editorsChoice && (
                      <span className="concept__badge">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/editors-choice.7ecd596.svg?primary=%2523FEFEFE" 
                          alt="Editor's Choice" 
                          className="concept__badge-icon"
                        />
                        Editor's Choice
                      </span>
                    )}
                    {vehicle.tenBest && (
                      <span className="concept__badge">
                        <img 
                          src="https://www.caranddriver.com/_assets/design-tokens/caranddriver/static/images/badges-no-text/ten-best.bcb6ac1.svg" 
                          alt="10Best" 
                          className="concept__badge-icon"
                        />
                        10Best
                      </span>
                    )}
                  </div>
                )}
                
                <div className="concept__year-selector" ref={yearDropdownRef}>
                  <button 
                    className={`concept__year-pill ${isYearDropdownOpen ? 'concept__year-pill--open' : ''}`}
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    aria-expanded={isYearDropdownOpen}
                    aria-haspopup="listbox"
                  >
                    <span>{vehicle.year}</span>
                    <ChevronDown size={14} className={`concept__year-chevron ${isYearDropdownOpen ? 'concept__year-chevron--rotated' : ''}`} />
                  </button>
                  
                  {isYearDropdownOpen && (
                    <ul className="concept__year-dropdown" role="listbox">
                      {availableYears.length > 1 ? (
                        availableYears.map((yr) => (
                          <li 
                            key={yr}
                            role="option"
                            aria-selected={yr === String(vehicle.year)}
                            className={`concept__year-option ${yr === String(vehicle.year) ? 'concept__year-option--selected' : ''}`}
                            onClick={() => handleYearSelect(yr)}
                          >
                            {yr}
                          </li>
                        ))
                      ) : (
                        <li className="concept__year-option concept__year-option--only">
                          Only {vehicle.year} available
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <span className="concept__make">{vehicle.make}</span>
              </div>
              <h1 className="concept__title">
                <span className="concept__model">{vehicle.model}</span>
              </h1>
            </div>

            <div className="concept__hero-meta">
              <div className="concept__rating">
                <Star size={18} fill="currentColor" />
                <span className="concept__rating-value">{vehicle.staffRating}</span>
                <span className="concept__rating-max">/10</span>
              </div>
              <span className="concept__divider">•</span>
              <span className="concept__price">{vehicle.priceRange}</span>
            </div>
          </div>

          {/* Hero Content - Bottom */}
          <div className="concept__hero-content concept__hero-content--bottom">
            {/* Gallery Progress */}
            {galleryMedia.length > 1 && (
              <div className="concept__gallery-progress">
                {galleryMedia.map((media, idx) => (
                  <button
                    key={idx}
                    className={`concept__gallery-progress-item ${idx === currentImageIndex ? 'concept__gallery-progress-item--active' : ''} ${idx < currentImageIndex ? 'concept__gallery-progress-item--complete' : ''} ${media.type === 'video' ? 'concept__gallery-progress-item--video' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={media.type === 'video' ? `Play video` : `View image ${idx + 1}`}
                  >
                    <span className="concept__gallery-progress-fill" />
                  </button>
                ))}
              </div>
            )}

            {/* Scroll Indicator */}
            <button 
              className="concept__scroll-hint"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              aria-label="Scroll to learn more"
            >
              <span>Discover</span>
              <ChevronDown size={24} />
            </button>
          </div>
      </section>

      {/* Overview Section */}
      <section className="concept__section concept__overview">
        <div className="concept__container">
          <p className="concept__tagline">
            The {vehicle.make} {vehicle.model} represents the pinnacle of {vehicle.bodyStyle.toLowerCase()} design—where performance meets everyday practicality.
          </p>
          
          <div className="concept__cta-row">
            <button className="concept__cta concept__cta--primary">
              <span>Shop New</span>
            </button>
            <button className="concept__cta concept__cta--secondary">
              <span>Shop Used</span>
            </button>
            <button 
              className="concept__cta concept__cta--tertiary"
              onClick={() => setShowTradeIn(true)}
            >
              <span>Get Trade-In Value</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Review Section */}
      <section className="concept__section concept__review">
        <div className="concept__container concept__container--wide">
          <article className="concept__review-article">
            <header className="concept__review-header">
              <h2 className="concept__review-headline">{editorialReview.headline}</h2>
              <div className="concept__review-meta">
                <div className="concept__review-author">
                  <img 
                    src={editorialReview.authorAvatar} 
                    alt={editorialReview.author}
                    className="concept__review-avatar"
                  />
                  <div className="concept__review-author-info">
                    <span className="concept__review-author-name">{editorialReview.author}</span>
                    <span className="concept__review-author-title">{editorialReview.authorTitle}</span>
                  </div>
                </div>
                <time className="concept__review-date">{editorialReview.date}</time>
              </div>
            </header>

            <div className="concept__review-content">
              <p className="concept__review-lead">{editorialReview.leadParagraph}</p>
              
              <div className={`concept__review-full ${isReviewExpanded ? 'concept__review-full--expanded' : ''}`}>
                {editorialReview.fullReview.map((section, idx) => (
                  <div key={idx} className="concept__review-section">
                    <h3 className="concept__review-section-heading">{section.heading}</h3>
                    <p className="concept__review-section-content">{section.content}</p>
                  </div>
                ))}
              </div>

              <button 
                className="concept__review-toggle"
                onClick={() => setIsReviewExpanded(!isReviewExpanded)}
                aria-expanded={isReviewExpanded}
              >
                {isReviewExpanded ? (
                  <>
                    <Minus size={18} />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Read Full Review</span>
                  </>
                )}
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Specs Section - Progressive Disclosure */}
      <section className="concept__section concept__specs">
        <div className="concept__container">
          <h2 className="concept__section-title">At a Glance</h2>
          
          <div className="concept__specs-grid">
            {specs.map((spec) => (
              <button
                key={spec.id}
                className={`concept__spec-card ${expandedSpec === spec.id ? 'concept__spec-card--expanded' : ''}`}
                onClick={() => setExpandedSpec(expandedSpec === spec.id ? null : spec.id)}
              >
                <div className="concept__spec-header">
                  <spec.icon size={24} strokeWidth={1.5} />
                  <div className="concept__spec-info">
                    <span className="concept__spec-value">{spec.value}</span>
                    <span className="concept__spec-label">{spec.label}</span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`concept__spec-chevron ${expandedSpec === spec.id ? 'concept__spec-chevron--rotated' : ''}`}
                  />
                </div>
                {expandedSpec === spec.id && (
                  <div className="concept__spec-expanded">
                    <p className="concept__spec-detail">{spec.detail}</p>
                    {spec.id === 'efficiency' && (
                      <button 
                        className="concept__spec-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowFuelEconomy(true);
                        }}
                      >
                        View Full EPA Data
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Image Break - Interior */}
      <section 
        className="concept__image-break concept__image-break--clickable"
        onClick={() => {
          setInteriorIndex(0);
          setShowInteriorGallery(true);
        }}
      >
        <img 
          src={interiorPhotos[0] || vehicle.galleryImages?.[vehicle.galleryImages.length - 1] || vehicle.image} 
          alt={`${vehicle.make} ${vehicle.model} interior`}
        />
        <div className="concept__image-break-overlay">
          <div className="concept__image-break-cta">
            <span>View Interior Gallery</span>
            <span className="concept__image-break-count">{interiorPhotos.length} photos</span>
          </div>
        </div>
        <div className="concept__image-break-caption">
          <span>Interior crafted with precision</span>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="concept__section concept__highlights">
        <div className="concept__container">
          <h2 className="concept__section-title">Why We Love It</h2>
          
          <ul className="concept__highlights-list">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="concept__highlight-item">
                <Check size={20} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="concept__section concept__pricing">
        <div className="concept__container">
          <div className="concept__pricing-header-row">
            <h2 className="concept__section-title">Pricing</h2>
            <button 
              className="concept__compare-trims-btn"
              onClick={() => setShowTrimSelector(true)}
            >
              See All Trims
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="concept__pricing-card">
            {(() => {
              const recommendedTrim = vehicleTrims.find(t => t.recommended) || vehicleTrims[0];
              const baseTrim = vehicleTrims.length > 0 ? vehicleTrims.reduce((min, t) => {
                const minPrice = parseInt(min.price.replace(/[$,]/g, ''));
                const tPrice = parseInt(t.price.replace(/[$,]/g, ''));
                return tPrice < minPrice ? t : min;
              }, vehicleTrims[0]) : null;
              
              const basePrice = baseTrim ? parseInt(baseTrim.price.replace(/[$,]/g, '')) : vehicle.priceMin;
              const maxPrice = vehicle.priceMax;
              const recommendedPrice = recommendedTrim ? parseInt(recommendedTrim.price.replace(/[$,]/g, '')) : vehicle.priceMin;
              
              // Calculate position as percentage
              const range = maxPrice - basePrice;
              const position = range > 0 ? ((recommendedPrice - basePrice) / range) * 100 : 0;
              
              return (
                <>
                  <div className="concept__pricing-header">
                    <span className="concept__pricing-label">{recommendedTrim?.name || 'Base'} <span className="concept__pricing-recommended">Recommended</span></span>
                    <span className="concept__pricing-value">${recommendedPrice.toLocaleString()}</span>
                  </div>
                  <div className="concept__pricing-range">
                    <div className="concept__pricing-bar">
                      <div className="concept__pricing-fill" style={{ width: `${position}%` }} />
                      <div className="concept__pricing-marker" style={{ left: `${position}%` }} />
                    </div>
                    <div className="concept__pricing-labels">
                      <span>Base ${basePrice.toLocaleString()}</span>
                      <span>${maxPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="concept__pricing-note">
                    Price excludes destination, taxes, and fees. Actual pricing may vary.
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="concept__section concept__safety">
        <div className="concept__container">
          <div className="concept__safety-header-row">
            <h2 className="concept__section-title">Safety</h2>
            <button 
              className="concept__safety-link"
              onClick={() => setShowSafety(true)}
            >
              See All Safety Info
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="concept__safety-rating">
            {/* NHTSA Overall Rating */}
            <div className="concept__safety-score">
              {isLoadingSafety ? (
                <span className="concept__safety-score-value">...</span>
              ) : safetyRatings ? (
                <>
                  <div className="concept__safety-score-row">
                    <span className="concept__safety-score-value">
                      {parseStarRating(safetyRatings.OverallRating) || 'N/A'}
                    </span>
                    <div className="concept__safety-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          fill={(parseStarRating(safetyRatings.OverallRating) || 0) >= star ? 'currentColor' : 'none'}
                          strokeWidth={(parseStarRating(safetyRatings.OverallRating) || 0) >= star ? 0 : 2}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="concept__safety-score-label">NHTSA Overall</span>
                </>
              ) : (
                <>
                  <span className="concept__safety-score-value">Not Rated</span>
                  <span className="concept__safety-score-label">NHTSA</span>
                </>
              )}
            </div>

            {/* Frontal Crash Rating */}
            {safetyRatings && parseStarRating(safetyRatings.OverallFrontCrashRating) && (
              <div className="concept__safety-score">
                <div className="concept__safety-score-row">
                  <span className="concept__safety-score-value">
                    {parseStarRating(safetyRatings.OverallFrontCrashRating)}
                  </span>
                  <div className="concept__safety-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        fill={(parseStarRating(safetyRatings.OverallFrontCrashRating) || 0) >= star ? 'currentColor' : 'none'}
                        strokeWidth={(parseStarRating(safetyRatings.OverallFrontCrashRating) || 0) >= star ? 0 : 2}
                      />
                    ))}
                  </div>
                </div>
                <span className="concept__safety-score-label">Frontal Crash</span>
              </div>
            )}

            {/* Side Crash Rating */}
            {safetyRatings && parseStarRating(safetyRatings.OverallSideCrashRating) && (
              <div className="concept__safety-score">
                <div className="concept__safety-score-row">
                  <span className="concept__safety-score-value">
                    {parseStarRating(safetyRatings.OverallSideCrashRating)}
                  </span>
                  <div className="concept__safety-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        fill={(parseStarRating(safetyRatings.OverallSideCrashRating) || 0) >= star ? 'currentColor' : 'none'}
                        strokeWidth={(parseStarRating(safetyRatings.OverallSideCrashRating) || 0) >= star ? 0 : 2}
                      />
                    ))}
                  </div>
                </div>
                <span className="concept__safety-score-label">Side Crash</span>
              </div>
            )}
          </div>

          {/* Safety Features from NHTSA data */}
          <div className="concept__safety-features">
            {safetyRatings?.NHTSAForwardCollisionWarning === 'Standard' && (
              <div className="concept__safety-feature">
                <ShieldCheck size={18} />
                <span>Forward Collision Warning</span>
              </div>
            )}
            {safetyRatings?.NHTSALaneDepartureWarning === 'Standard' && (
              <div className="concept__safety-feature">
                <ShieldCheck size={18} />
                <span>Lane Departure Warning</span>
              </div>
            )}
            {safetyRatings?.NHTSAElectronicStabilityControl === 'Standard' && (
              <div className="concept__safety-feature">
                <ShieldCheck size={18} />
                <span>Electronic Stability Control</span>
              </div>
            )}
            {/* Fallback features if no NHTSA data */}
            {!safetyRatings && !isLoadingSafety && (
              <>
                <div className="concept__safety-feature">
                  <ShieldCheck size={18} />
                  <span>Forward Collision Warning</span>
                </div>
                <div className="concept__safety-feature">
                  <ShieldCheck size={18} />
                  <span>Automatic Emergency Braking</span>
                </div>
                <div className="concept__safety-feature">
                  <ShieldCheck size={18} />
                  <span>Lane Departure Warning</span>
                </div>
                <div className="concept__safety-feature">
                  <ShieldCheck size={18} />
                  <span>Blind Spot Monitoring</span>
                </div>
              </>
            )}
          </div>

          {/* Disclaimer for previous year data */}
          {safetyDataYear && (
            <p className="concept__safety-disclaimer">
              * Safety ratings shown are from the {safetyDataYear} model year. {vehicle.year} ratings not yet available.
            </p>
          )}

        </div>
      </section>

      {/* Compare Section */}
      {similarVehicles.length > 0 && (
        <section className="concept__section concept__compare">
          <div className="concept__container">
            <h2 className="concept__section-title">Compare Alternatives</h2>
            
            <div className="concept__compare-grid">
              {similarVehicles.map((similar) => (
                <Link 
                  key={similar.id}
                  to={`/${similar.slug}/concept`}
                  className="concept__compare-card"
                >
                  <div className="concept__compare-image">
                    <img src={similar.image} alt={`${similar.make} ${similar.model}`} />
                    <div className="concept__compare-rating">
                      <Star size={14} fill="currentColor" />
                      {similar.staffRating}
                    </div>
                  </div>
                  <div className="concept__compare-info">
                    <span className="concept__compare-year">{similar.year}</span>
                    <span className="concept__compare-name">
                      {similar.make} {similar.model}
                    </span>
                    <span className="concept__compare-price">{similar.priceRange}</span>
                    <div className="concept__compare-specs">
                      <div className="concept__compare-spec">
                        <span className="concept__compare-spec-label">MPG</span>
                        <span className="concept__compare-spec-value">{similar.mpg}</span>
                      </div>
                      <div className="concept__compare-spec">
                        <span className="concept__compare-spec-label">HP</span>
                        <span className="concept__compare-spec-value">{similar.horsepower}</span>
                      </div>
                      <div className="concept__compare-spec">
                        <span className="concept__compare-spec-label">Drive</span>
                        <span className="concept__compare-spec-value">{similar.drivetrain}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="concept__section concept__final-cta">
        <div className="concept__container">
          <h2 className="concept__final-title">Ready to Experience the {vehicle.model}?</h2>
          <p className="concept__final-subtitle">Find dealers near you with available inventory.</p>
          <button 
            className="concept__cta concept__cta--large"
            onClick={() => setShowDealerMap(true)}
          >
            <span>Find a Dealer</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Dealer Locator Modal */}
      {showDealerMap && (
        <div className="concept__modal-overlay" onClick={() => setShowDealerMap(false)}>
          <div 
            className="concept__modal" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Find dealers near you"
          >
            <div className="concept__modal-body">
              <DealerLocatorMap
                vehicle={{
                  year: parseInt(vehicle.year),
                  make: vehicle.make,
                  model: vehicle.model,
                  image: vehicle.image,
                  galleryImages: vehicle.galleryImages,
                  msrp: vehicle.priceMin,
                  priceMin: vehicle.priceMin,
                  priceMax: vehicle.priceMax,
                  bodyStyle: vehicle.bodyStyle,
                  mpg: vehicle.mpg ? parseInt(vehicle.mpg) : undefined,
                  rating: vehicle.staffRating,
                }}
                cardVariant="compact"
                initialLocation={{ lat: 34.0522, lng: -118.2437 }}
                initialZipCode="Los Angeles, CA"
                onClose={() => setShowDealerMap(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Spacer */}
      <div className="concept__footer-spacer" />

      {/* Compare Trims Modal */}
      {showTrimSelector && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTrimSelector(false);
          }}
        >
          <div className="concept__modal concept__modal--trims">
            <button 
              className="concept__modal-close"
              onClick={() => setShowTrimSelector(false)}
              aria-label="Close"
            >
              ×
            </button>
            <TrimSelector
              trims={vehicleTrims}
              vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              title="Compare Trims"
              subtitle={`The ${vehicleTrims.find(t => t.recommended)?.name || vehicleTrims[0]?.name} trim offers the best balance of features and value for the ${vehicle.make} ${vehicle.model}.`}
            />
          </div>
        </div>
      )}

      {/* Fuel Economy Modal */}
      {showFuelEconomy && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFuelEconomy(false);
          }}
        >
          <div className="concept__modal concept__modal--fuel">
            <button 
              className="concept__modal-close"
              onClick={() => setShowFuelEconomy(false)}
              aria-label="Close"
            >
              ×
            </button>
            <FuelEconomy
              year={parseInt(vehicle.year)}
              make={vehicle.make}
              model={vehicle.model}
              bodyStyle={vehicle.bodyStyle}
            />
          </div>
        </div>
      )}

      {/* Trade-In Modal */}
      {showTradeIn && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowTradeIn(false);
          }}
        >
          <div className="concept__modal concept__modal--trade-in">
            <button 
              className="concept__modal-close"
              onClick={() => setShowTradeIn(false)}
              aria-label="Close"
            >
              ×
            </button>
            <WhatsMyCarWorth />
          </div>
        </div>
      )}

      {/* Safety Modal */}
      {showSafety && (
        <div 
          className="concept__modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSafety(false);
          }}
        >
          <div className="concept__modal concept__modal--safety">
            <button 
              className="concept__modal-close"
              onClick={() => setShowSafety(false)}
              aria-label="Close"
            >
              ×
            </button>
            <Warranty
              items={[]}
              title="Safety & Reliability"
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              bodyStyle={vehicle.bodyStyle}
            />
          </div>
        </div>
      )}

      {/* Interior Gallery Modal */}
      {showInteriorGallery && (
        <div 
          className="concept__interior-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowInteriorGallery(false);
          }}
        >
          <button 
            className="concept__interior-close"
            onClick={() => setShowInteriorGallery(false)}
            aria-label="Close gallery"
          >
            ×
          </button>
          
          <div className="concept__interior-content">
            <img 
              src={interiorPhotos[interiorIndex]} 
              alt={`${vehicle.make} ${vehicle.model} interior ${interiorIndex + 1}`}
              className="concept__interior-image"
            />
          </div>

          {/* Navigation */}
          {interiorPhotos.length > 1 && (
            <>
              <button 
                className="concept__interior-nav concept__interior-nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setInteriorIndex(prev => prev === 0 ? interiorPhotos.length - 1 : prev - 1);
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                className="concept__interior-nav concept__interior-nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  setInteriorIndex(prev => prev === interiorPhotos.length - 1 ? 0 : prev + 1);
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Progress dots */}
          <div className="concept__interior-dots">
            {interiorPhotos.map((_, idx) => (
              <button
                key={idx}
                className={`concept__interior-dot ${idx === interiorIndex ? 'concept__interior-dot--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setInteriorIndex(idx);
                }}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="concept__interior-counter">
            {interiorIndex + 1} / {interiorPhotos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePageConcept;

