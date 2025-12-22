import { useState, useCallback, useMemo } from 'react';
import { X, User, Image, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { vehicleDatabase, coupes, suvs, sedans } from '../../data/vehicles';
import './EditProfileModal.css';

interface Avatar {
  id: string;
  name: string;
  image: string;
  type: 'preset' | 'initials';
}

interface Banner {
  id: string;
  name: string;
  image: string;
}

// Helper to find a vehicle by make and model
const findVehicle = (make: string, model: string) => 
  vehicleDatabase.find(v => v.make === make && v.model === model);

// Lifestyle avatar configurations - matching the dropdown options
const LIFESTYLE_AVATARS: { id: string; name: string; make: string; model: string; fallback: typeof suvs }[] = [
  { id: 'family', name: 'Family', make: 'Honda', model: 'Pilot', fallback: suvs },
  { id: 'adventure', name: 'Adventure', make: 'Jeep', model: 'Wrangler', fallback: suvs },
  { id: 'luxury', name: 'Luxury', make: 'Mercedes-Benz', model: 'S-Class', fallback: sedans },
  { id: 'eco-friendly', name: 'Eco-Friendly', make: 'Tesla', model: 'Model 3', fallback: sedans },
  { id: 'performance', name: 'Performance', make: 'Porsche', model: '911', fallback: coupes },
  { id: 'commuter', name: 'Commuter', make: 'Toyota', model: 'Camry', fallback: sedans },
  { id: 'value', name: 'Value', make: 'Honda', model: 'Civic', fallback: sedans },
];

// Get lifestyle-based avatars from database
const getLifestyleAvatars = (): Avatar[] => {
  return LIFESTYLE_AVATARS.map((config, index) => {
    const vehicle = findVehicle(config.make, config.model) || config.fallback[index % config.fallback.length];
    return {
      id: `avatar-${config.id}`,
      name: config.name,
      image: vehicle?.image || '',
      type: 'preset' as const,
    };
  }).filter(avatar => avatar.image);
};

// Get curated banner vehicles from database (using gallery images or main images)
const getBannerVehicles = (): Banner[] => {
  const bannerConfigs = [
    { make: 'Chevrolet', model: 'Corvette', name: 'Corvette' },
    { make: 'Land Rover', model: 'Range Rover', name: 'Range Rover' },
    { make: 'Ford', model: 'Bronco', name: 'Bronco' },
    { make: 'Porsche', model: 'Taycan', name: 'Taycan' },
    { make: 'Mercedes-Benz', model: 'AMG GT', name: 'AMG GT' },
    { make: 'BMW', model: 'X5', name: 'BMW X5' },
  ];

  return bannerConfigs.map((config) => {
    const vehicle = findVehicle(config.make, config.model);
    // Prefer gallery images for banners as they're typically wider shots
    const image = vehicle?.galleryImages?.[0] || vehicle?.image || '';
    return {
      id: `banner-${config.make.toLowerCase()}-${config.model.toLowerCase().replace(/\s+/g, '-')}`,
      name: config.name,
      image,
    };
  }).filter(banner => banner.image);
};

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'avatar' | 'banner'>('avatar');
  const [isSaving, setIsSaving] = useState(false);

  // Generate avatars and banners from vehicle database
  const presetAvatars = useMemo(() => getLifestyleAvatars(), []);
  const presetBanners = useMemo(() => getBannerVehicles(), []);

  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.avatar || presetAvatars[0]?.id || 'initials');
  const [selectedBanner, setSelectedBanner] = useState<string>(user?.banner || presetBanners[0]?.id || '');

  // Get user initials for the default avatar
  const getUserInitials = useCallback(() => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0].substring(0, 2).toUpperCase();
  }, [user?.name]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await updateUser({
        avatar: selectedAvatar,
        banner: selectedBanner,
      });
      onClose();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  }, [selectedAvatar, selectedBanner, updateUser, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="edit-profile-modal__overlay" onClick={handleOverlayClick}>
      <div className="edit-profile-modal" role="dialog" aria-modal="true" aria-labelledby="edit-profile-title">
        {/* Header */}
        <div className="edit-profile-modal__header">
          <h2 id="edit-profile-title" className="edit-profile-modal__title">Edit Profile</h2>
          <button 
            className="edit-profile-modal__close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="edit-profile-modal__tabs">
          <button
            className={`edit-profile-modal__tab ${activeTab === 'avatar' ? 'edit-profile-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('avatar')}
          >
            <User size={18} />
            <span>Avatar</span>
          </button>
          <button
            className={`edit-profile-modal__tab ${activeTab === 'banner' ? 'edit-profile-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('banner')}
          >
            <Image size={18} />
            <span>Banner</span>
          </button>
        </div>

        {/* Content */}
        <div className="edit-profile-modal__content">
          {activeTab === 'avatar' && (
            <div className="edit-profile-modal__section">
              <h3 className="edit-profile-modal__section-title">Choose Avatar</h3>
              <div className="edit-profile-modal__grid edit-profile-modal__grid--avatars">
                {/* User Initials Option */}
                <button
                  className={`edit-profile-modal__avatar-option ${selectedAvatar === 'initials' ? 'edit-profile-modal__avatar-option--selected' : ''}`}
                  onClick={() => setSelectedAvatar('initials')}
                >
                  <div className="edit-profile-modal__avatar-preview edit-profile-modal__avatar-preview--initials">
                    <span>{getUserInitials()}</span>
                  </div>
                  <span className="edit-profile-modal__avatar-name">My Initials</span>
                  {selectedAvatar === 'initials' && (
                    <div className="edit-profile-modal__check">
                      <Check size={14} />
                    </div>
                  )}
                </button>

                {/* Vehicle Avatars from Database */}
                {presetAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    className={`edit-profile-modal__avatar-option ${selectedAvatar === avatar.id ? 'edit-profile-modal__avatar-option--selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar.id)}
                  >
                    <div className="edit-profile-modal__avatar-preview">
                      <img src={avatar.image} alt={avatar.name} />
                    </div>
                    <span className="edit-profile-modal__avatar-name">{avatar.name}</span>
                    {selectedAvatar === avatar.id && (
                      <div className="edit-profile-modal__check">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'banner' && (
            <div className="edit-profile-modal__section">
              <h3 className="edit-profile-modal__section-title">Choose Banner</h3>
              <div className="edit-profile-modal__grid edit-profile-modal__grid--banners">
                {presetBanners.map((banner) => (
                  <button
                    key={banner.id}
                    className={`edit-profile-modal__banner-option ${selectedBanner === banner.id ? 'edit-profile-modal__banner-option--selected' : ''}`}
                    onClick={() => setSelectedBanner(banner.id)}
                  >
                    <div className="edit-profile-modal__banner-preview">
                      <img src={banner.image} alt={banner.name} />
                    </div>
                    <span className="edit-profile-modal__banner-name">{banner.name}</span>
                    {selectedBanner === banner.id && (
                      <div className="edit-profile-modal__check">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="edit-profile-modal__footer">
          <button 
            className="edit-profile-modal__btn edit-profile-modal__btn--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="edit-profile-modal__btn edit-profile-modal__btn--save"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

