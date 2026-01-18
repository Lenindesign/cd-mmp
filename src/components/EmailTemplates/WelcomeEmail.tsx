import './WelcomeEmail.css';

export interface RecommendedStory {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface BrowsedVehicle {
  year: number;
  make: string;
  model: string;
  image?: string;
  link?: string;
  viewCount?: number;
}

export interface WelcomeEmailProps {
  /** User's first name */
  userName: string;
  /** Vehicles the user browsed before signing up */
  browsedVehicles?: BrowsedVehicle[];
  /** Featured article title */
  featuredTitle?: string;
  /** Featured article description */
  featuredDescription?: string;
  /** Featured article image URL */
  featuredImage?: string;
  /** Featured article link */
  featuredLink?: string;
  /** Recommended stories list (shown if no browsed vehicles) */
  recommendedStories?: RecommendedStory[];
  /** Profile link URL */
  profileLink?: string;
  /** Unsubscribe link URL */
  unsubscribeLink?: string;
  /** Privacy notice link URL */
  privacyLink?: string;
}

const defaultStories: RecommendedStory[] = [
  {
    id: '1',
    title: '2025 Honda CR-V Review',
    description: 'The best-selling SUV gets even better',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-honda-cr-v-101-6724bd6899498.jpg?crop=0.574xw:0.431xh;0.218xw,0.323xh&resize=980:*',
    link: '#',
  },
  {
    id: '2',
    title: '2025 Toyota Camry First Drive',
    description: 'All-new design, hybrid-only powertrain',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-fwd-102-672528076ec9c.jpg?crop=0.683xw:0.512xh;0.158xw,0.263xh&resize=980:*',
    link: '#',
  },
  {
    id: '3',
    title: 'Best SUVs of 2025',
    description: 'Our top picks across every segment',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-trax-activ-102-64e70db91e774.jpg?crop=0.668xw:0.501xh;0.147xw,0.321xh&resize=980:*',
    link: '#',
  },
  {
    id: '4',
    title: 'Electric vs Hybrid: Which is Right?',
    description: 'Breaking down the pros and cons',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2024-kia-ev9-gt-line-awd-101-6572b4470a628.jpg?crop=0.670xw:0.503xh;0.204xw,0.361xh&resize=980:*',
    link: '#',
  },
  {
    id: '5',
    title: 'How to Get the Best Deal',
    description: 'Negotiation tips from the experts',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2025-subaru-forester-touring-101-66d7f1920cc53.jpg?crop=0.673xw:0.505xh;0.139xw,0.281xh&resize=980:*',
    link: '#',
  },
];

// Default vehicle images by make (fallback when no image provided)
const vehicleImageFallbacks: Record<string, string> = {
  'Honda': 'https://hips.hearstapps.com/hmg-prod/images/2025-honda-cr-v-101-6724bd6899498.jpg?crop=0.574xw:0.431xh;0.218xw,0.323xh&resize=980:*',
  'Toyota': 'https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-fwd-102-672528076ec9c.jpg?crop=0.683xw:0.512xh;0.158xw,0.263xh&resize=980:*',
  'Chevrolet': 'https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-trax-activ-102-64e70db91e774.jpg?crop=0.668xw:0.501xh;0.147xw,0.321xh&resize=980:*',
  'Ford': 'https://hips.hearstapps.com/hmg-prod/images/2024-ford-f-150-tremor-101-64b77bcfde3f2.jpg?crop=0.668xw:0.502xh;0.201xw,0.356xh&resize=980:*',
  'Kia': 'https://hips.hearstapps.com/hmg-prod/images/2024-kia-ev9-gt-line-awd-101-6572b4470a628.jpg?crop=0.670xw:0.503xh;0.204xw,0.361xh&resize=980:*',
  'Hyundai': 'https://hips.hearstapps.com/hmg-prod/images/2024-hyundai-ioniq-5-n-101-66241eb57b4ce.jpg?crop=0.668xw:0.501xh;0.160xw,0.316xh&resize=980:*',
  'Subaru': 'https://hips.hearstapps.com/hmg-prod/images/2025-subaru-forester-touring-101-66d7f1920cc53.jpg?crop=0.673xw:0.505xh;0.139xw,0.281xh&resize=980:*',
  'BMW': 'https://hips.hearstapps.com/hmg-prod/images/2024-bmw-x5-m60i-102-64d0c8a0a6fc5.jpg?crop=0.670xw:0.503xh;0.165xw,0.332xh&resize=980:*',
  'Mercedes-Benz': 'https://hips.hearstapps.com/hmg-prod/images/2024-mercedes-amg-c63-s-e-performance-101-64345e5f79ffe.jpg?crop=0.668xw:0.502xh;0.217xw,0.370xh&resize=980:*',
  'Audi': 'https://hips.hearstapps.com/hmg-prod/images/2024-audi-q8-e-tron-101-6439c3e38b8e3.jpg?crop=0.668xw:0.501xh;0.199xw,0.286xh&resize=980:*',
};

const getVehicleImage = (vehicle: BrowsedVehicle): string => {
  // Use vehicle image if available and valid
  if (vehicle.image && vehicle.image.trim() !== '') {
    return vehicle.image;
  }
  // Fall back to make-specific image
  if (vehicleImageFallbacks[vehicle.make]) {
    return vehicleImageFallbacks[vehicle.make];
  }
  // Final fallback to default story image
  return defaultStories[0].image;
};

const WelcomeEmail = ({
  userName = 'Greg',
  browsedVehicles = [],
  featuredTitle = 'Welcome Car And Driver Article',
  featuredDescription = 'MMP Story',
  featuredImage = 'https://hips.hearstapps.com/hmg-prod/images/2024-acura-integra-type-s-102-64ccdc718d805.jpg?crop=0.668xw:0.502xh;0.189xw,0.356xh&resize=980:*',
  featuredLink = '#',
  recommendedStories = defaultStories,
  profileLink = '#',
  unsubscribeLink = '#',
  privacyLink = '#',
}: WelcomeEmailProps) => {
  // Use browsed vehicles if available, otherwise fall back to recommended stories
  const hasBrowsedVehicles = browsedVehicles.length > 0;
  
  // If user browsed vehicles, use the first one as the featured content
  const primaryVehicle = hasBrowsedVehicles ? browsedVehicles[0] : null;
  const displayedFeaturedTitle = primaryVehicle 
    ? `${primaryVehicle.year} ${primaryVehicle.make} ${primaryVehicle.model}`
    : featuredTitle;
  const displayedFeaturedDescription = primaryVehicle
    ? 'Continue where you left off'
    : featuredDescription;
  const displayedFeaturedImage = primaryVehicle
    ? getVehicleImage(primaryVehicle)
    : featuredImage;
  const displayedFeaturedLink = primaryVehicle?.link || featuredLink;
  return (
    <div className="welcome-email">
      {/* Email wrapper with dark background */}
      <div className="welcome-email__wrapper">
        {/* Main content container */}
        <table className="welcome-email__container" cellPadding="0" cellSpacing="0" role="presentation">
          <tbody>
            {/* Header */}
            <tr>
              <td className="welcome-email__header">
                <img 
                  src="/car-and-driver-logo.svg" 
                  alt="Car and Driver" 
                  className="welcome-email__logo"
                  width="342"
                  onError={(e) => {
                    console.error('[WelcomeEmail] Failed to load logo');
                    // Fallback to external URL if local file fails
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('caranddriver.com')) {
                      target.src = 'https://www.caranddriver.com/images/media/51/cd-black-background-350x90-1-3-png-1639084406.png';
                    }
                  }}
                />
              </td>
            </tr>

            {/* Greeting */}
            <tr>
              <td className="welcome-email__greeting">
                <h1 className="welcome-email__greeting-name">Hi {userName},</h1>
                <p className="welcome-email__greeting-text">
                  You're officially part of the Car And Driver family! From now on, you'll get 
                  insider access to the latest car reviews, exclusive member stories, and the 
                  best of automotive culture—delivered straight to your inbox.
                </p>
                <h2 className="welcome-email__benefits-title">Your Car And Driver Membership Card unlocks:</h2>
                <ul className="welcome-email__benefits-list">
                  <li>A custom personalized experience just for you</li>
                  <li>Exclusive newsletters, content, and more</li>
                  <li>Member-only features such as Rate and Review your cars</li>
                </ul>
              </td>
            </tr>

            {/* Featured Article / Vehicle */}
            <tr>
              <td className="welcome-email__featured">
                <h2 className="welcome-email__section-title">
                  {hasBrowsedVehicles ? 'Welcome to Car And Driver' : 'Welcome to Car And Driver'}
                </h2>
                <div className="welcome-email__featured-card">
                  <a href={displayedFeaturedLink} className="welcome-email__featured-link">
                    <img 
                      src={displayedFeaturedImage} 
                      alt={displayedFeaturedTitle}
                      className="welcome-email__featured-image"
                      onError={(e) => {
                        console.error('[WelcomeEmail] Failed to load featured image:', displayedFeaturedImage);
                        // Fallback to default image on error
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultStories[0].image) {
                          target.src = defaultStories[0].image;
                        }
                      }}
                    />
                    <div className="welcome-email__featured-content">
                      <h3 className="welcome-email__featured-title">{displayedFeaturedTitle}</h3>
                      <p className="welcome-email__featured-description">{displayedFeaturedDescription}</p>
                      <span className="welcome-email__read-more-btn">
                        {hasBrowsedVehicles ? 'View Details' : 'Read More'}
                      </span>
                    </div>
                  </a>
                </div>
              </td>
            </tr>

            {/* Browsed Vehicles or Recommended Stories */}
            <tr>
              <td className="welcome-email__recommended">
                <h2 className="welcome-email__section-title">
                  {hasBrowsedVehicles ? 'Vehicles You Viewed' : 'Recommended For You'}
                </h2>
                <div className="welcome-email__stories">
                  {hasBrowsedVehicles ? (
                    // Show browsed vehicles (skip the first one as it's featured)
                    browsedVehicles.slice(1, 6).map((vehicle, index) => (
                      <a 
                        key={`${vehicle.make}-${vehicle.model}-${index}`} 
                        href={vehicle.link || '#'} 
                        className="welcome-email__story-card"
                      >
                        <img 
                          src={getVehicleImage(vehicle)} 
                          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                          className="welcome-email__story-image"
                          onError={(e) => {
                            const imageUrl = getVehicleImage(vehicle);
                            console.error('[WelcomeEmail] Failed to load vehicle image:', imageUrl, vehicle);
                            // Fallback to make-specific or default image on error
                            const target = e.target as HTMLImageElement;
                            const fallback = vehicleImageFallbacks[vehicle.make] || defaultStories[0].image;
                            if (target.src !== fallback) {
                              target.src = fallback;
                            }
                          }}
                        />
                        <div className="welcome-email__story-content">
                          <h4 className="welcome-email__story-title">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </h4>
                          <p className="welcome-email__story-description">
                            {vehicle.viewCount && vehicle.viewCount > 1 
                              ? `Viewed ${vehicle.viewCount} times` 
                              : 'Recently viewed'}
                          </p>
                          <span className="welcome-email__read-more-btn">View Details</span>
                        </div>
                      </a>
                    ))
                  ) : (
                    // Show default recommended stories
                    recommendedStories.map((story) => (
                      <a key={story.id} href={story.link} className="welcome-email__story-card">
                        <img 
                          src={story.image} 
                          alt={story.title}
                          className="welcome-email__story-image"
                        />
                        <div className="welcome-email__story-content">
                          <h4 className="welcome-email__story-title">{story.title}</h4>
                          <p className="welcome-email__story-description">{story.description}</p>
                          <span className="welcome-email__read-more-btn">Read More</span>
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </td>
            </tr>

            {/* CTA Button */}
            <tr>
              <td className="welcome-email__cta">
                <a href={profileLink} className="welcome-email__cta-button">
                  EXPLORE YOUR PROFILE
                </a>
              </td>
            </tr>

            {/* Footer */}
            <tr>
              <td className="welcome-email__footer">
                <p className="welcome-email__footer-follow">Follow Us</p>
                <div className="welcome-email__social-links">
                  <a href="https://facebook.com/caranddriver" className="welcome-email__social-link" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/caranddriver" className="welcome-email__social-link" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/caranddriver" className="welcome-email__social-link" aria-label="X (Twitter)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>

                <div className="welcome-email__footer-links">
                  <a href={unsubscribeLink}>Unsubscribe</a>
                  <span className="welcome-email__footer-divider">|</span>
                  <a href={privacyLink}>Privacy Notice</a>
                  <span className="welcome-email__footer-divider">|</span>
                  <a href="#">CA Notice of Cancellation</a>
                </div>

                <p className="welcome-email__footer-legal">
                  MotorTrend is a publication of Hearst Autos, Inc.<br />
                  2025 Hearst Autos, Inc. All Rights Reserved.<br />
                  This email was sent by MotorTrend, a publication of Hearst Autos, Inc., 300 West 57th Street, New York, NY 10019-3779
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WelcomeEmail;
