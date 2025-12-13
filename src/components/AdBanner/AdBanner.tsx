import './AdBanner.css';

interface AdBannerProps {
  imageUrl: string;
  altText?: string;
  link?: string;
}

const AdBanner = ({ imageUrl, altText = 'Advertisement', link }: AdBannerProps) => {
  const adContent = (
    <img 
      src={imageUrl} 
      alt={altText} 
      className="ad-banner__image"
    />
  );

  return (
    <div className="ad-banner">
      <div className="ad-banner__header">
        <div className="ad-banner__header-line" />
        <span className="ad-banner__label">ADVERTISEMENT - CONTINUE READING BELOW</span>
        <div className="ad-banner__header-line" />
      </div>
      <div className="ad-banner__content">
        <div className="ad-banner__container">
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="ad-banner__link">
              {adContent}
            </a>
          ) : (
            adContent
          )}
        </div>
      </div>
      <div className="ad-banner__line" />
    </div>
  );
};

export default AdBanner;

