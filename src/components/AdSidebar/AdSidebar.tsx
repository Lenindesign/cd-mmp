import './AdSidebar.css';

interface AdSidebarProps {
  imageUrl?: string;
  altText?: string;
  link?: string;
}

const AdSidebar = ({ 
  imageUrl = 'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg',
  altText = 'Advertisement',
  link = '#'
}: AdSidebarProps) => {
  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar__container">
        <span className="ad-sidebar__label">Advertisement</span>
        <a href={link} className="ad-sidebar__link" target="_blank" rel="noopener noreferrer">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="ad-sidebar__image"
            loading="lazy"
          />
        </a>
      </div>
    </aside>
  );
};

export default AdSidebar;














