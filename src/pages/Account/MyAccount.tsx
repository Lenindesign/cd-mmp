import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Bookmark, 
  Newspaper,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Plus,
  Play,
  Car,
  Heart,
  Blend,
  Crosshair,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { vehicleDatabase } from '../../data/vehicles';
import { getAvatarImageUrl, getUserInitials } from '../../utils/avatarUtils';
import { getBannerImageUrl } from '../../utils/bannerUtils';
import EditProfileModal from '../../components/EditProfileModal';
import './MyAccount.css';

type TabType = 'profile' | 'saved' | 'subscriptions';

// Social provider icons
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#1877F2"/>
    <path d="M16.5 12.5h-2.5v8h-3v-8h-2v-2.5h2v-1.5c0-2.5 1-4 4-4h2v2.5h-1.5c-1 0-1.5.5-1.5 1.5v1.5h3l-.5 2.5z" fill="white"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
  </svg>
);

// Sample articles data
const sampleArticles = [
  {
    id: '1',
    title: 'Luxury on Training Wheels? Our Yearlong Test of the 2025 Acura ADX Begins',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    author: 'Alex Leanse',
    date: 'Nov 07, 2025',
    type: 'Article',
  },
  {
    id: '2',
    title: '2026 Hyundai Ioniq 6 N First Drive: Watch Out, BMW M3, C63 AMG!',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67b65771aeee54000885f0c5/39-2025-tesla-model-3-front-view.jpg',
    author: 'Alex Leanse',
    date: 'Nov 07, 2025',
    type: 'Article',
  },
  {
    id: '3',
    title: '2025 Subaru WRX tS First Test: Points for STI-le, But...',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/68d4789daa39b80002b684f4/2026-toyota-gr-corolla-premium-plus-at-supersonicred-014.jpg',
    author: 'Alexander Stoklosa',
    date: 'Jan 21, 2025',
    type: 'Article',
  },
  {
    id: '4',
    title: "Yes! Honda's Electric Sports Car Is Real, but Timing Remains Uncertain",
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    author: 'Alisa Priddle',
    date: 'Nov 06, 2025',
    type: 'Article',
  },
];

// Sample videos data
const sampleVideos = [
  {
    id: '1',
    title: 'Tested: The 2023 Honda Civic Type R Shares Our Faith',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/68d4789daa39b80002b684f4/2026-toyota-gr-corolla-premium-plus-at-supersonicred-014.jpg',
    author: 'Justin Banner',
    date: 'Oct 10, 2025',
  },
  {
    id: '2',
    title: 'The Shelby GT500 Is The Coolest Mustang Ever Produced',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg',
    author: 'Justin Banner',
    date: 'Oct 10, 2025',
  },
];

// Sample comparison data
const sampleComparisons = [
  {
    id: '1',
    title: '2025 Ford Bronco / 2025 Ford Bronco S',
    image: 'https://d2kde5ohu8qb21.cloudfront.net/files/67b65771aeee54000885f0c5/39-2025-tesla-model-3-front-view.jpg',
    type: 'Comparison',
  },
];

// Sample vehicle data for search suggestions
// Generate vehicle suggestions from the actual database
const vehicleSuggestions = vehicleDatabase.map(vehicle => ({
  id: vehicle.id,
  name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
  make: vehicle.make,
  model: vehicle.model,
  year: String(vehicle.year),
  image: vehicle.image,
  priceMin: vehicle.priceMin,
}));

const MyAccount: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isAuthenticated, updateUser, addSavedVehicle, removeSavedVehicle, signOut } = useAuth();
  
  // Get initial tab from URL query param or default to 'profile'
  const getInitialTab = (): TabType => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved' || tabParam === 'subscriptions' || tabParam === 'profile') {
      return tabParam;
    }
    return 'profile';
  };
  
  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [editedUserType, setEditedUserType] = useState<'buyer' | 'enthusiast' | 'both' | null>(null);
  
  // Danger zone state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Vehicle search state
  const [vehicleSearchQuery, setVehicleSearchQuery] = useState('');
  const [showVehicleSuggestions, setShowVehicleSuggestions] = useState(false);
  const [filteredVehicleSuggestions, setFilteredVehicleSuggestions] = useState(vehicleSuggestions);
  const vehicleInputRef = React.useRef<HTMLInputElement>(null);
  const vehicleSuggestionsRef = React.useRef<HTMLDivElement>(null);
  
  // Add vehicle modal state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [addVehicleType, setAddVehicleType] = useState<'want' | 'own'>('want');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [modalFilteredVehicles, setModalFilteredVehicles] = useState(vehicleSuggestions);
  const modalInputRef = React.useRef<HTMLInputElement>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, navigate]);

  // Update active tab when URL search params change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'saved' || tabParam === 'subscriptions' || tabParam === 'profile') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Initialize editedUserType when step 2 is expanded
  useEffect(() => {
    if (expandedStep === 2 && user?.userType) {
      setEditedUserType(user.userType);
    }
  }, [expandedStep, user?.userType]);

  // Filter vehicle suggestions based on search query
  useEffect(() => {
    if (vehicleSearchQuery.trim()) {
      const filtered = vehicleSuggestions.filter(vehicle =>
        vehicle.name.toLowerCase().includes(vehicleSearchQuery.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(vehicleSearchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(vehicleSearchQuery.toLowerCase())
      );
      setFilteredVehicleSuggestions(filtered);
      setShowVehicleSuggestions(true);
    } else {
      setFilteredVehicleSuggestions(vehicleSuggestions);
      setShowVehicleSuggestions(false);
    }
  }, [vehicleSearchQuery]);

  // Close vehicle suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        vehicleSuggestionsRef.current && 
        !vehicleSuggestionsRef.current.contains(event.target as Node) &&
        vehicleInputRef.current &&
        !vehicleInputRef.current.contains(event.target as Node)
      ) {
        setShowVehicleSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter modal vehicles based on search query
  useEffect(() => {
    if (modalSearchQuery.trim()) {
      const filtered = vehicleSuggestions.filter(vehicle =>
        vehicle.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        vehicle.make.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(modalSearchQuery.toLowerCase())
      );
      setModalFilteredVehicles(filtered);
    } else {
      setModalFilteredVehicles(vehicleSuggestions);
    }
  }, [modalSearchQuery]);

  // Focus modal input when modal opens
  useEffect(() => {
    if (showAddVehicleModal && modalInputRef.current) {
      setTimeout(() => modalInputRef.current?.focus(), 100);
    }
  }, [showAddVehicleModal]);

  // Handle opening the add vehicle modal
  const handleOpenAddVehicleModal = (type: 'want' | 'own') => {
    setAddVehicleType(type);
    setModalSearchQuery('');
    setShowAddVehicleModal(true);
  };

  // Handle adding a vehicle from modal
  const handleAddVehicleFromModal = async (vehicle: typeof vehicleSuggestions[0]) => {
    try {
      await addSavedVehicle({
        id: vehicle.id,
        name: vehicle.name,
        ownership: addVehicleType,
      });
      setShowAddVehicleModal(false);
      setModalSearchQuery('');
    } catch (err) {
      console.error('Failed to add vehicle:', err);
    }
  };

  // Handle selecting a vehicle from suggestions
  const handleSelectVehicle = async (vehicle: typeof vehicleSuggestions[0]) => {
    try {
      await addSavedVehicle({
        id: vehicle.id,
        name: vehicle.name,
        ownership: 'want',
      });
    } catch (err) {
      console.error('Failed to add vehicle:', err);
    }
    setVehicleSearchQuery('');
    setShowVehicleSuggestions(false);
  };

  // Handle removing a vehicle
  const handleRemoveVehicle = async (vehicleId: string) => {
    try {
      await removeSavedVehicle(vehicleId);
    } catch (err) {
      console.error('Failed to remove vehicle:', err);
    }
  };

  if (!user) {
    return null;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completed = 0;
    const total = 4;
    
    if (user.name) completed++;
    if (user.userType) completed++;
    if (user.savedVehicles && user.savedVehicles.length > 0) completed++;
    if (user.newsletterSubscriptions && user.newsletterSubscriptions.length > 0) completed++;
    
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const profileCompletion = getProfileCompletion();

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: <User size={18} /> },
    { id: 'saved' as TabType, label: 'Saved', icon: <Bookmark size={18} /> },
    { id: 'subscriptions' as TabType, label: 'Subscriptions', icon: <Newspaper size={18} /> },
  ];

  const onboardingSteps = [
    { step: 1, label: 'Tell us about yourself', completed: !!user.name, path: '/onboarding/step-1' },
    { step: 2, label: 'Your interests', completed: !!user.userType, path: '/onboarding/step-2' },
    { step: 3, label: 'Your vehicles', completed: !!(user.savedVehicles && user.savedVehicles.length > 0), path: '/onboarding/step-3' },
    { step: 4, label: 'Newsletter preferences', completed: !!(user.newsletterSubscriptions && user.newsletterSubscriptions.length > 0), path: '/onboarding/step-4' },
  ];

  // Get vehicles from database for display
  const getVehicleDetails = (vehicleName: string) => {
    const parts = vehicleName.split(' ');
    
    // Check if first part is a year (4 digits)
    const firstPartIsYear = parts.length >= 1 && /^\d{4}$/.test(parts[0]);
    
    if (firstPartIsYear && parts.length >= 3) {
      // Format: "2025 Chevrolet Trax"
      const year = parseInt(parts[0]);
      const make = parts[1];
      const model = parts.slice(2).join(' ');
      
      // Try exact match first
      let vehicle = vehicleDatabase.find(
        v => Number(v.year) === year && v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
      
      // If no match, try without year
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
        );
      }
      
    return vehicle;
    } else if (parts.length >= 2) {
      // Format: "Chevrolet Trax" or "Ram 1500" (no year)
      const make = parts[0];
      const model = parts.slice(1).join(' ');
      
      // Try exact match on make and model
      let vehicle = vehicleDatabase.find(
        v => v.make.toLowerCase() === make.toLowerCase() && v.model.toLowerCase() === model.toLowerCase()
      );
      
      // If no match, try partial match
      if (!vehicle) {
        vehicle = vehicleDatabase.find(
          v => v.make.toLowerCase() === make.toLowerCase() && 
               (v.model.toLowerCase().includes(model.toLowerCase()) || model.toLowerCase().includes(v.model.toLowerCase()))
        );
      }
      
      // If still no match, try searching the full name anywhere
      if (!vehicle) {
        const searchName = vehicleName.toLowerCase();
        vehicle = vehicleDatabase.find(
          v => `${v.make} ${v.model}`.toLowerCase().includes(searchName) ||
               searchName.includes(`${v.make} ${v.model}`.toLowerCase())
        );
      }
      
      return vehicle;
    }
    
    return null;
  };

  // Separate vehicles by ownership
  const carsIWant = user.savedVehicles?.filter(v => v.ownership === 'want') || [];
  const carsIOwn = user.savedVehicles?.filter(v => v.ownership === 'own' || v.ownership === 'previously_owned') || [];

  // Toggle ownership - available for future use
  const _handleToggleOwnership = async (vehicleId: string, newOwnership: 'own' | 'want') => {
    if (!user.savedVehicles) return;
    
    const updatedVehicles = user.savedVehicles.map(v => 
      v.id === vehicleId ? { ...v, ownership: newOwnership } : v
    );
    
    await updateUser({ savedVehicles: updatedVehicles });
  };
  void _handleToggleOwnership; // Suppress unused warning

  return (
    <div className="my-account">
      {/* Hero Header with Background */}
      <div className="my-account__hero">
        <div className="my-account__hero-bg">
          <img 
            src={getBannerImageUrl(user.banner)} 
            alt="" 
            className="my-account__hero-img"
          />
          <div className="my-account__hero-overlay" />
        </div>
        <div className="my-account__hero-content">
          <div className="my-account__avatar">
            {getAvatarImageUrl(user.avatar) ? (
              <img 
                src={getAvatarImageUrl(user.avatar)!} 
                alt={user.name || 'User avatar'} 
                className="my-account__avatar-img"
              />
            ) : (
              <span>{getUserInitials(user.name)}</span>
            )}
          </div>
          <div className="my-account__hero-info">
            <h1 className="my-account__name">{user.name || 'Member'}</h1>
            <div className="my-account__meta">
              <span className="my-account__meta-item">
                <Calendar size={14} />
                Joined {formatDate(user.createdAt)}
              </span>
              {user.location && (
                <span className="my-account__meta-item">
                  <MapPin size={14} />
                  {user.location}
                </span>
              )}
            </div>
          </div>
          <button 
            className="my-account__edit-profile-btn"
            onClick={() => setShowEditProfileModal(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-account__container">
        <div className="my-account__layout">
          {/* Sidebar with Tabs */}
          <aside className="my-account__sidebar">
            <nav className="my-account__tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`my-account__tab ${activeTab === tab.id ? 'my-account__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="my-account__main">
            {activeTab === 'profile' && (
              <div className="my-account__profile">
                {/* Profile Fields Card */}
                <div className="my-account__card">
                  <div className="my-account__field">
                    <span className="my-account__field-label">Full Name</span>
                    <div className="my-account__field-row">
                      <span className="my-account__field-value">{user.name || '—'}</span>
                      <button className="my-account__field-edit">Edit</button>
                    </div>
                  </div>

                  <div className="my-account__field">
                    <span className="my-account__field-label">Username</span>
                    <div className="my-account__field-row">
                      <span className="my-account__field-value">{user.email?.split('@')[0] || '—'}</span>
                      <button className="my-account__field-edit">Edit</button>
                    </div>
                  </div>

                  <div className="my-account__field">
                    <span className="my-account__field-label">Email Address</span>
                    <div className="my-account__field-row">
                      <span className="my-account__field-value">{user.email}</span>
                      <button className="my-account__field-edit">Edit</button>
                    </div>
                  </div>

                  <div className="my-account__field">
                    <span className="my-account__field-label">Password</span>
                    <div className="my-account__field-row">
                      <span className="my-account__field-value">••••••••••••••</span>
                      <button className="my-account__field-edit">Edit</button>
                    </div>
                  </div>

                  <div className="my-account__field">
                    <span className="my-account__field-label">Location</span>
                    <div className="my-account__field-row">
                      <span className="my-account__field-value">{user.location || '—'}</span>
                      <button className="my-account__field-edit">Edit</button>
                    </div>
                  </div>
                </div>

                {/* Profile Completion Card */}
                <div className="my-account__card my-account__completion-card">
                  <div className="my-account__completion-header">
                    <CheckCircle2 size={24} className="my-account__completion-icon" />
                    <div className="my-account__completion-text">
                      <h3 className="my-account__completion-title">
                        {profileCompletion.percentage === 100 ? 'Profile Complete!' : 'Complete Your Profile'}
                      </h3>
                      <p className="my-account__completion-subtitle">
                        {profileCompletion.percentage === 100 
                          ? 'Your profile is all set up! You can edit any information below.'
                          : 'Complete your profile to get personalized recommendations.'}
                      </p>
                    </div>
                  </div>

                  <div className="my-account__progress">
                    <span className="my-account__progress-label">{profileCompletion.percentage}% Complete</span>
                    <div className="my-account__progress-bar">
                      <div 
                        className="my-account__progress-fill" 
                        style={{ width: `${profileCompletion.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="my-account__steps">
                    {/* Step 1: Tell us about yourself */}
                    <div className="my-account__step-accordion">
                      <button 
                        className={`my-account__step-header ${expandedStep === 1 ? 'my-account__step-header--expanded' : ''}`}
                        onClick={() => setExpandedStep(expandedStep === 1 ? null : 1)}
                      >
                        <div className={`my-account__step-check ${onboardingSteps[0].completed ? 'my-account__step-check--completed' : ''}`}>
                          {onboardingSteps[0].completed && <CheckCircle2 size={20} />}
                        </div>
                        <span className="my-account__step-label">
                          Step 1: {onboardingSteps[0].label}
                        </span>
                        <div className="my-account__step-actions">
                          <button 
                            className="my-account__step-edit"
                            onClick={(e) => { e.stopPropagation(); setExpandedStep(expandedStep === 1 ? null : 1); }}
                          >
                            {expandedStep === 1 ? 'Cancel' : 'Edit'}
                          </button>
                          <ChevronDown 
                            size={18} 
                            className={`my-account__step-chevron ${expandedStep === 1 ? 'my-account__step-chevron--expanded' : ''}`}
                          />
                        </div>
                      </button>
                      {expandedStep === 1 && (
                        <div className="my-account__step-content">
                          <div className="my-account__step-form">
                            <h4 className="my-account__step-form-title">Tell Us About Yourself</h4>
                            <div className="my-account__step-field">
                              <label className="my-account__step-field-label">What is Your Name?</label>
                              <input 
                                type="text" 
                                className="my-account__step-input"
                                defaultValue={user.name || ''}
                                placeholder="Enter your name"
                              />
                            </div>
                            <div className="my-account__step-field">
                              <label className="my-account__step-field-label">Where are you located? (Optional)</label>
                              <div className="my-account__step-input-wrapper">
                                <input 
                                  type="text" 
                                  className="my-account__step-input"
                                  defaultValue={user.location || ''}
                                  placeholder="City, State"
                                />
                                <button className="my-account__step-input-icon">
                                  <Crosshair size={18} />
                                </button>
                              </div>
                            </div>
                            <button 
                              className="my-account__step-save"
                              onClick={() => setExpandedStep(null)}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 2: Your interests */}
                    <div className="my-account__step-accordion">
                      <button 
                        className={`my-account__step-header ${expandedStep === 2 ? 'my-account__step-header--expanded' : ''}`}
                        onClick={() => setExpandedStep(expandedStep === 2 ? null : 2)}
                      >
                        <div className={`my-account__step-check ${onboardingSteps[1].completed ? 'my-account__step-check--completed' : ''}`}>
                          {onboardingSteps[1].completed && <CheckCircle2 size={20} />}
                        </div>
                        <span className="my-account__step-label">
                          Step 2: {onboardingSteps[1].label}
                        </span>
                        <div className="my-account__step-actions">
                          <button 
                            className="my-account__step-edit"
                            onClick={(e) => { e.stopPropagation(); setExpandedStep(expandedStep === 2 ? null : 2); }}
                          >
                            {expandedStep === 2 ? 'Cancel' : 'Edit'}
                          </button>
                          <ChevronDown 
                            size={18} 
                            className={`my-account__step-chevron ${expandedStep === 2 ? 'my-account__step-chevron--expanded' : ''}`}
                          />
                        </div>
                      </button>
                      {expandedStep === 2 && (
                        <div className="my-account__step-content">
                          <div className="my-account__step-form">
                            <h4 className="my-account__step-form-title">What describes you best?</h4>
                            <p className="my-account__step-form-subtitle">Choose the option that best fits your automotive interests</p>
                            <div className="my-account__interest-options">
                              <button 
                                className={`my-account__interest-card ${editedUserType === 'buyer' ? 'my-account__interest-card--selected' : ''}`}
                                type="button"
                                onClick={() => setEditedUserType('buyer')}
                                aria-pressed={editedUserType === 'buyer'}
                              >
                                <div className="my-account__interest-icon">
                                  <Car size={28} fill="currentColor" strokeWidth={0} />
                                </div>
                                <h5 className="my-account__interest-title">Car Buyer</h5>
                                <p className="my-account__interest-desc">I'm shopping for a new or used car.</p>
                              </button>
                              <button 
                                className={`my-account__interest-card ${editedUserType === 'enthusiast' ? 'my-account__interest-card--selected' : ''}`}
                                type="button"
                                onClick={() => setEditedUserType('enthusiast')}
                                aria-pressed={editedUserType === 'enthusiast'}
                              >
                                <div className="my-account__interest-icon">
                                  <Heart size={28} fill="currentColor" strokeWidth={0} />
                                </div>
                                <h5 className="my-account__interest-title">Car Enthusiast</h5>
                                <p className="my-account__interest-desc">I nerd out on all things car-related.</p>
                              </button>
                              <button 
                                className={`my-account__interest-card ${editedUserType === 'both' ? 'my-account__interest-card--selected' : ''}`}
                                type="button"
                                onClick={() => setEditedUserType('both')}
                                aria-pressed={editedUserType === 'both'}
                              >
                                <div className="my-account__interest-icon">
                                  <Blend size={28} strokeWidth={1.5} />
                                </div>
                                <h5 className="my-account__interest-title">Both</h5>
                                <p className="my-account__interest-desc">I'm a car lover on the lookout for my next ride.</p>
                              </button>
                            </div>
                            <button 
                              className="my-account__step-save"
                              onClick={async () => {
                                if (editedUserType) {
                                  await updateUser({ userType: editedUserType });
                                  setExpandedStep(null);
                                }
                              }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 3: Your vehicles */}
                    <div className="my-account__step-accordion">
                      <button 
                        className={`my-account__step-header ${expandedStep === 3 ? 'my-account__step-header--expanded' : ''}`}
                        onClick={() => setExpandedStep(expandedStep === 3 ? null : 3)}
                      >
                        <div className={`my-account__step-check ${onboardingSteps[2].completed ? 'my-account__step-check--completed' : ''}`}>
                          {onboardingSteps[2].completed && <CheckCircle2 size={20} />}
                        </div>
                        <span className="my-account__step-label">
                          Step 3: {onboardingSteps[2].label}
                        </span>
                        <div className="my-account__step-actions">
                          <button 
                            className="my-account__step-edit"
                            onClick={(e) => { e.stopPropagation(); setExpandedStep(expandedStep === 3 ? null : 3); }}
                          >
                            {expandedStep === 3 ? 'Cancel' : 'Edit'}
                          </button>
                          <ChevronDown 
                            size={18} 
                            className={`my-account__step-chevron ${expandedStep === 3 ? 'my-account__step-chevron--expanded' : ''}`}
                          />
                        </div>
                      </button>
                      {expandedStep === 3 && (
                        <div className="my-account__step-content">
                          <div className="my-account__step-form">
                            <h4 className="my-account__step-form-title">Your Vehicles</h4>
                            <div className="my-account__step-search">
                              <label className="my-account__step-field-label">Search for a vehicle</label>
                              <div className="my-account__step-input-wrapper my-account__step-input-wrapper--search">
                                <svg className="my-account__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                                  <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <input 
                                  ref={vehicleInputRef}
                                  type="text" 
                                  className="my-account__step-input my-account__step-input--search"
                                  placeholder="Start typing to search..."
                                  value={vehicleSearchQuery}
                                  onChange={(e) => setVehicleSearchQuery(e.target.value)}
                                  onFocus={() => vehicleSearchQuery && setShowVehicleSuggestions(true)}
                                  autoComplete="off"
                                />
                              </div>
                              
                              {/* Search Suggestions Dropdown */}
                              {showVehicleSuggestions && filteredVehicleSuggestions.length > 0 && (
                                <div ref={vehicleSuggestionsRef} className="my-account__vehicle-suggestions">
                                  {filteredVehicleSuggestions.slice(0, 5).map((vehicle) => (
                                    <button
                                      key={vehicle.id}
                                      className="my-account__vehicle-suggestion-item"
                                      onClick={() => handleSelectVehicle(vehicle)}
                                      type="button"
                                    >
                                      {vehicle.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {user.savedVehicles && user.savedVehicles.length > 0 && (
                              <div className="my-account__step-vehicles">
                                <p className="my-account__step-field-label">Selected Vehicles:</p>
                                <div className="my-account__vehicle-grid">
                                  {user.savedVehicles.map((vehicle) => {
                                    const details = getVehicleDetails(vehicle.name);
                                    return (
                                      <div key={vehicle.id} className="my-account__vehicle-card">
                                        <div className="my-account__vehicle-header">
                                          <h4 className="my-account__vehicle-name">{vehicle.name}</h4>
                                          <div className="my-account__vehicle-rating-box">
                                            <span className="my-account__vehicle-rating-score">
                                              {details?.staffRating || 8.8}<span>/10</span>
                                            </span>
                                            <span className="my-account__vehicle-rating-label">C/D Rating</span>
                                          </div>
                                        </div>
                                        <div className="my-account__vehicle-image">
                                          <img 
                                            src={details?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg'} 
                                            alt={vehicle.name}
                                          />
                                        </div>
                                        <div className="my-account__vehicle-footer-section">
                                          <div className="my-account__vehicle-price">
                                            <span className="my-account__vehicle-price-label">Starting At</span>
                                            <span className="my-account__vehicle-price-value">
                                              ${details?.priceMin?.toLocaleString() || '27,295'}
                                            </span>
                                          </div>
                                          <Link 
                                            to={details?.slug ? `/${details.slug}` : '#'} 
                                            className="my-account__vehicle-cta"
                                          >
                                            Shop New
                                          </Link>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            <button 
                              className="my-account__step-save"
                              onClick={() => setExpandedStep(null)}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 4: Newsletter preferences */}
                    <div className="my-account__step-accordion">
                      <button 
                        className={`my-account__step-header ${expandedStep === 4 ? 'my-account__step-header--expanded' : ''}`}
                        onClick={() => setExpandedStep(expandedStep === 4 ? null : 4)}
                      >
                        <div className={`my-account__step-check ${onboardingSteps[3].completed ? 'my-account__step-check--completed' : ''}`}>
                          {onboardingSteps[3].completed && <CheckCircle2 size={20} />}
                        </div>
                        <span className="my-account__step-label">
                          Step 4: {onboardingSteps[3].label}
                        </span>
                        <div className="my-account__step-actions">
                          <button 
                            className="my-account__step-edit"
                            onClick={(e) => { e.stopPropagation(); setExpandedStep(expandedStep === 4 ? null : 4); }}
                          >
                            {expandedStep === 4 ? 'Cancel' : 'Edit'}
                          </button>
                          <ChevronDown 
                            size={18} 
                            className={`my-account__step-chevron ${expandedStep === 4 ? 'my-account__step-chevron--expanded' : ''}`}
                          />
                        </div>
                      </button>
                      {expandedStep === 4 && (
                        <div className="my-account__step-content">
                          <div className="my-account__step-form">
                            <h4 className="my-account__step-form-title">Let's Keep In Touch</h4>
                            <p className="my-account__step-form-subtitle">With Personalized Car Information and Inspiration</p>
                            <div className="my-account__newsletter-options">
                              <label className="my-account__newsletter-option">
                                <input 
                                  type="checkbox" 
                                  defaultChecked={user.newsletterSubscriptions?.includes('car-and-driver')}
                                />
                                <span className="my-account__newsletter-checkmark">
                                  <CheckCircle2 size={20} />
                                </span>
                                <span className="my-account__newsletter-label">Subscribe to Car and Driver Newsletter</span>
                              </label>
                              <label className="my-account__newsletter-option">
                                <input 
                                  type="checkbox" 
                                  defaultChecked={user.newsletterSubscriptions?.includes('car-and-driver-deals')}
                                />
                                <span className="my-account__newsletter-checkmark">
                                  <CheckCircle2 size={20} />
                                </span>
                                <span className="my-account__newsletter-label">Subscribe to Car and Driver Deals & Offers</span>
                              </label>
                              <label className="my-account__newsletter-option">
                                <input 
                                  type="checkbox" 
                                  defaultChecked={user.newsletterSubscriptions?.includes('car-and-driver-events')}
                                />
                                <span className="my-account__newsletter-checkmark">
                                  <CheckCircle2 size={20} />
                                </span>
                                <span className="my-account__newsletter-label">Subscribe to Car and Driver Events</span>
                              </label>
                            </div>
                            <button 
                              className="my-account__step-save"
                              onClick={() => setExpandedStep(null)}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connected Accounts Card */}
                <div className="my-account__card">
                  <h3 className="my-account__card-title">Connected Accounts</h3>
                  
                  <div className="my-account__social-accounts">
                    <div className="my-account__social-account">
                      <div className="my-account__social-info">
                        <GoogleIcon />
                        <div className="my-account__social-details">
                          <span className="my-account__social-name">Google</span>
                          <span className="my-account__social-email">{user.email}</span>
                        </div>
                      </div>
                      <span className="my-account__social-status my-account__social-status--connected">
                        Connected
                      </span>
                    </div>

                    <div className="my-account__social-account">
                      <div className="my-account__social-info">
                        <FacebookIcon />
                        <div className="my-account__social-details">
                          <span className="my-account__social-name">Facebook</span>
                        </div>
                      </div>
                      <button className="my-account__social-connect">
                        Connect
                      </button>
                    </div>

                    <div className="my-account__social-account">
                      <div className="my-account__social-info">
                        <AppleIcon />
                        <div className="my-account__social-details">
                          <span className="my-account__social-name">Apple</span>
                        </div>
                      </div>
                      <button className="my-account__social-connect">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone Card */}
                <div className="my-account__card my-account__danger-card">
                  <div className="my-account__danger-header">
                    <Trash2 size={20} className="my-account__danger-icon" />
                    <h3 className="my-account__danger-title">Danger Zone</h3>
                  </div>
                  <div className="my-account__danger-content">
                    <div className="my-account__danger-info">
                      <h4 className="my-account__danger-subtitle">Delete Account</h4>
                      <p className="my-account__danger-text">
                        Once you delete your account, there is no going back. 
                        All your data will be permanently removed.
                      </p>
                    </div>
                    {!showDeleteConfirm ? (
                      <button 
                        className="my-account__danger-btn"
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        Delete Account
                      </button>
                    ) : (
                      <div className="my-account__delete-confirm">
                        <p className="my-account__delete-warning">
                          <AlertCircle size={18} />
                          Are you sure? This action cannot be undone.
                        </p>
                        <div className="my-account__delete-actions">
                          <button 
                            className="my-account__delete-cancel"
                            onClick={() => setShowDeleteConfirm(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="my-account__delete-confirm-btn"
                            onClick={async () => {
                              await signOut();
                              navigate('/');
                            }}
                          >
                            Yes, Delete My Account
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="my-account__saved">
                {/* Vehicles Section */}
                <div className="my-account__card">
                  <h2 className="my-account__section-title">Vehicles in My Garage</h2>
                  
                  {/* Cars I Want */}
                  <div className="my-account__vehicle-section">
                    <h3 className="my-account__vehicle-section-title">Cars I Want</h3>
                    <div className="my-account__vehicle-grid">
                      {carsIWant.map((vehicle) => {
                        const details = getVehicleDetails(vehicle.name);
                        return (
                          <div key={vehicle.id} className="my-account__vehicle-card">
                            <div className="my-account__vehicle-header">
                              <h4 className="my-account__vehicle-name">{vehicle.name}</h4>
                              <div className="my-account__vehicle-rating-box">
                                <span className="my-account__vehicle-rating-score">
                                  {details?.staffRating || 8.1}<span>/10</span>
                                </span>
                                <span className="my-account__vehicle-rating-label">C/D Rating</span>
                              </div>
                            </div>
                            <div className="my-account__vehicle-image">
                              <img 
                                src={details?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg'} 
                                alt={vehicle.name}
                              />
                              <button
                                className="my-account__vehicle-unsave"
                                onClick={() => handleRemoveVehicle(vehicle.id)}
                                aria-label="Remove from saved"
                                title="Remove from saved"
                              >
                                <Bookmark size={16} fill="currentColor" />
                              </button>
                            </div>
                            <div className="my-account__vehicle-footer-section">
                              <div className="my-account__vehicle-price">
                                <span className="my-account__vehicle-price-label">Starting At</span>
                                <span className="my-account__vehicle-price-value">
                                  ${details?.priceMin?.toLocaleString() || '20,290'}
                                </span>
                              </div>
                              <Link 
                                to={details?.slug ? `/${details.slug}` : '#'} 
                                className="my-account__vehicle-cta"
                              >
                                Shop New
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Add Vehicle Card */}
                      <button 
                        className="my-account__add-vehicle-card"
                        onClick={() => handleOpenAddVehicleModal('want')}
                      >
                        <div className="my-account__add-vehicle-icon">
                          <Plus size={24} />
                        </div>
                        <span>Add Vehicle</span>
                      </button>
                    </div>
                  </div>

                  {/* Cars I Own */}
                  <div className="my-account__vehicle-section">
                    <h3 className="my-account__vehicle-section-title">Cars I Own</h3>
                    <div className="my-account__vehicle-grid">
                      {carsIOwn.map((vehicle) => {
                        const details = getVehicleDetails(vehicle.name);
                        return (
                          <div key={vehicle.id} className="my-account__vehicle-card">
                            <div className="my-account__vehicle-header">
                              <h4 className="my-account__vehicle-name">{vehicle.name}</h4>
                              <div className="my-account__vehicle-rating-box">
                                <span className="my-account__vehicle-rating-score">
                                  {details?.staffRating || 9.1}<span>/10</span>
                                </span>
                                <span className="my-account__vehicle-rating-label">C/D Rating</span>
                              </div>
                            </div>
                            <div className="my-account__vehicle-image">
                              <img 
                                src={details?.image || 'https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg'} 
                                alt={vehicle.name}
                              />
                              <button
                                className="my-account__vehicle-unsave"
                                onClick={() => handleRemoveVehicle(vehicle.id)}
                                aria-label="Remove vehicle"
                                title="Remove vehicle"
                              >
                                <Bookmark size={16} fill="currentColor" />
                              </button>
                            </div>
                            <div className="my-account__vehicle-footer-section">
                              <div className="my-account__vehicle-price">
                                <span className="my-account__vehicle-price-label">Starting At</span>
                                <span className="my-account__vehicle-price-value">
                                  ${details?.priceMin?.toLocaleString() || '38,000'}
                                </span>
                              </div>
                              <Link 
                                to={details?.slug ? `/${details.slug}` : '#'} 
                                className="my-account__vehicle-cta"
                              >
                                Shop New
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Add Vehicle Card */}
                      <button 
                        className="my-account__add-vehicle-card"
                        onClick={() => handleOpenAddVehicleModal('own')}
                      >
                        <div className="my-account__add-vehicle-icon">
                          <Plus size={24} />
                        </div>
                        <span>Add Vehicle</span>
                      </button>
                    </div>
                  </div>

                  {/* Your Listings */}
                  <div className="my-account__vehicle-section">
                    <h3 className="my-account__vehicle-section-title">Your Listings</h3>
                    <div className="my-account__vehicle-grid">
                      <div className="my-account__vehicle-card">
                        <div className="my-account__vehicle-header">
                          <h4 className="my-account__vehicle-name">2024 Honda Pilot Base</h4>
                          <div className="my-account__vehicle-rating-box">
                            <span className="my-account__listing-badge">CPO</span>
                          </div>
                        </div>
                        <div className="my-account__vehicle-image">
                          <img 
                            src="https://d2kde5ohu8qb21.cloudfront.net/files/679d37b47ff34400082301e7/19-2025-honda-accord-front-view.jpg" 
                            alt="2024 Honda Pilot Base"
                          />
                          <button
                            className="my-account__vehicle-unsave"
                            onClick={() => console.log('Remove listing')}
                            aria-label="Remove listing"
                            title="Remove listing"
                          >
                            <Bookmark size={16} fill="currentColor" />
                          </button>
                        </div>
                        <div className="my-account__vehicle-footer-section">
                          <div className="my-account__vehicle-price">
                            <span className="my-account__vehicle-price-label">Your Price</span>
                            <span className="my-account__vehicle-price-value">$36,300</span>
                          </div>
                          <button className="my-account__vehicle-cta">
                            Edit Listing
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Articles Section */}
                <div className="my-account__card">
                  <h2 className="my-account__section-title">Articles</h2>
                  <div className="my-account__vehicle-grid">
                    {sampleArticles.map((article) => (
                      <div key={article.id} className="my-account__vehicle-card">
                        <div className="my-account__vehicle-header">
                          <h4 className="my-account__vehicle-name my-account__vehicle-name--small">{article.title}</h4>
                        </div>
                        <div className="my-account__vehicle-image">
                          <img src={article.image} alt={article.title} />
                          <button
                            className="my-account__vehicle-unsave"
                            onClick={() => console.log('Remove article:', article.id)}
                            aria-label="Remove from saved"
                            title="Remove from saved"
                          >
                            <Bookmark size={16} fill="currentColor" />
                          </button>
                        </div>
                        <div className="my-account__vehicle-footer-section">
                          <div className="my-account__vehicle-price">
                            <span className="my-account__article-author">{article.author}</span>
                            <span className="my-account__article-date">{article.date}</span>
                          </div>
                          <button className="my-account__vehicle-cta">
                            Read
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Car Comparisons Section */}
                <div className="my-account__card">
                  <h2 className="my-account__section-title">Car Comparisons</h2>
                  <div className="my-account__vehicle-grid">
                    {sampleComparisons.map((comparison) => (
                      <div key={comparison.id} className="my-account__vehicle-card">
                        <div className="my-account__vehicle-header">
                          <h4 className="my-account__vehicle-name my-account__vehicle-name--small">{comparison.title}</h4>
                        </div>
                        <div className="my-account__vehicle-image">
                          <img src={comparison.image} alt={comparison.title} />
                          <button
                            className="my-account__vehicle-unsave"
                            onClick={() => console.log('Remove comparison:', comparison.id)}
                            aria-label="Remove from saved"
                            title="Remove from saved"
                          >
                            <Bookmark size={16} fill="currentColor" />
                          </button>
                        </div>
                        <div className="my-account__vehicle-footer-section">
                          <div className="my-account__vehicle-price">
                            <span className="my-account__vehicle-price-label">{comparison.type}</span>
                          </div>
                          <button className="my-account__vehicle-cta">
                            Compare
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos Section */}
                <div className="my-account__card">
                  <h2 className="my-account__section-title">Videos</h2>
                  <div className="my-account__vehicle-grid">
                    {sampleVideos.map((video) => (
                      <div key={video.id} className="my-account__vehicle-card">
                        <div className="my-account__vehicle-header">
                          <h4 className="my-account__vehicle-name my-account__vehicle-name--small">{video.title}</h4>
                        </div>
                        <div className="my-account__vehicle-image">
                          <img src={video.image} alt={video.title} />
                          <div className="my-account__video-play">
                            <Play size={24} fill="white" />
                          </div>
                          <button
                            className="my-account__vehicle-unsave"
                            onClick={() => console.log('Remove video:', video.id)}
                            aria-label="Remove from saved"
                            title="Remove from saved"
                          >
                            <Bookmark size={16} fill="currentColor" />
                          </button>
                        </div>
                        <div className="my-account__vehicle-footer-section">
                          <div className="my-account__vehicle-price">
                            <span className="my-account__vehicle-price-label">{video.author}</span>
                            <span className="my-account__vehicle-price-value my-account__vehicle-price-value--small">{video.date}</span>
                          </div>
                          <button className="my-account__vehicle-cta">
                            Play
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscriptions' && (
              <div className="my-account__subscriptions">
                <div className="my-account__card">
                  <div className="my-account__subscription-header">
                    <h3 className="my-account__card-title">Let's Keep In Touch</h3>
                    <p className="my-account__subscription-subtitle">With Personalized Car Information and Inspiration</p>
                  </div>
                  <div className="my-account__subscription-options">
                    <label className="my-account__subscription-option">
                      <input 
                        type="checkbox" 
                        checked={user.newsletterSubscriptions?.includes('car-and-driver-newsletter') || false}
                        onChange={(e) => {
                          const current = user.newsletterSubscriptions || [];
                          if (e.target.checked) {
                            updateUser({ newsletterSubscriptions: [...current, 'car-and-driver-newsletter'] });
                          } else {
                            updateUser({ newsletterSubscriptions: current.filter(n => n !== 'car-and-driver-newsletter') });
                          }
                        }}
                        className="my-account__subscription-checkbox"
                      />
                      <span className="my-account__subscription-label">Subscribe to Car and Driver Newsletter</span>
                    </label>
                    <label className="my-account__subscription-option">
                      <input 
                        type="checkbox" 
                        checked={user.newsletterSubscriptions?.includes('deals-and-offers') || false}
                        onChange={(e) => {
                          const current = user.newsletterSubscriptions || [];
                          if (e.target.checked) {
                            updateUser({ newsletterSubscriptions: [...current, 'deals-and-offers'] });
                          } else {
                            updateUser({ newsletterSubscriptions: current.filter(n => n !== 'deals-and-offers') });
                          }
                        }}
                        className="my-account__subscription-checkbox"
                      />
                      <span className="my-account__subscription-label">Subscribe to Car and Driver Deals & Offers</span>
                    </label>
                    <label className="my-account__subscription-option">
                      <input 
                        type="checkbox" 
                        checked={user.newsletterSubscriptions?.includes('events') || false}
                        onChange={(e) => {
                          const current = user.newsletterSubscriptions || [];
                          if (e.target.checked) {
                            updateUser({ newsletterSubscriptions: [...current, 'events'] });
                          } else {
                            updateUser({ newsletterSubscriptions: current.filter(n => n !== 'events') });
                          }
                        }}
                        className="my-account__subscription-checkbox"
                      />
                      <span className="my-account__subscription-label">Subscribe to Car and Driver Events</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="my-account__modal-overlay" onClick={() => setShowAddVehicleModal(false)}>
          <div className="my-account__modal" onClick={(e) => e.stopPropagation()}>
            <div className="my-account__modal-header">
              <h3 className="my-account__modal-title">
                {addVehicleType === 'want' ? 'Add a Car You Want' : 'Add a Car You Own'}
              </h3>
              <button 
                className="my-account__modal-close"
                onClick={() => setShowAddVehicleModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="my-account__modal-content">
              <div className="my-account__modal-search">
                <Crosshair size={18} className="my-account__modal-search-icon" />
                <input
                  ref={modalInputRef}
                  type="text"
                  placeholder="Search by make, model, or year..."
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="my-account__modal-search-input"
                />
              </div>
              <div className="my-account__modal-results">
                {modalFilteredVehicles.slice(0, 10).map((vehicle) => (
                  <button
                    key={vehicle.id}
                    className="my-account__modal-result-item"
                    onClick={() => handleAddVehicleFromModal(vehicle)}
                  >
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="my-account__modal-result-image"
                    />
                    <div className="my-account__modal-result-info">
                      <span className="my-account__modal-result-name">{vehicle.name}</span>
                      <span className="my-account__modal-result-price">
                        Starting at ${vehicle.priceMin?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <Plus size={20} className="my-account__modal-result-add" />
                  </button>
                ))}
                {modalFilteredVehicles.length === 0 && (
                  <p className="my-account__modal-no-results">
                    No vehicles found. Try a different search term.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={showEditProfileModal} 
        onClose={() => setShowEditProfileModal(false)} 
      />
    </div>
  );
};

export default MyAccount;
