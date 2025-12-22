import React from 'react';
import './TextBlock.css';

export interface TextBlockProps {
  /** Content as React children or HTML string */
  children?: React.ReactNode;
  /** HTML content (alternative to children) */
  htmlContent?: string;
  /** Text size variant */
  size?: 'small' | 'medium' | 'large';
  /** Enable drop cap on first paragraph */
  dropCap?: boolean;
  /** Add extra spacing between paragraphs */
  relaxedSpacing?: boolean;
  /** Maximum width constraint */
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  /** Additional CSS class */
  className?: string;
}

const TextBlockComponent: React.FC<TextBlockProps> = ({
  children,
  htmlContent,
  size = 'medium',
  dropCap = false,
  relaxedSpacing = false,
  maxWidth = 'medium',
  className = '',
}) => {
  const classes = [
    'text-block',
    `text-block--${size}`,
    `text-block--${maxWidth}`,
    dropCap && 'text-block--drop-cap',
    relaxedSpacing && 'text-block--relaxed',
    className,
  ].filter(Boolean).join(' ');

  if (htmlContent) {
    return (
      <div 
        className={classes}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export const TextBlock = TextBlockComponent as typeof TextBlockComponent & {
  Heading: typeof Heading;
  Paragraph: typeof Paragraph;
  Quote: typeof Quote;
  List: typeof List;
  Highlight: typeof Highlight;
  Divider: typeof Divider;
};

// Sub-components for structured content
export const Heading: React.FC<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}> = ({ level = 2, children, className = '' }) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={`text-block__heading text-block__heading--h${level} ${className}`}>{children}</Tag>;
};

export const Paragraph: React.FC<{
  children: React.ReactNode;
  lead?: boolean;
  className?: string;
}> = ({ children, lead = false, className = '' }) => (
  <p className={`text-block__paragraph ${lead ? 'text-block__paragraph--lead' : ''} ${className}`}>
    {children}
  </p>
);

export const Quote: React.FC<{
  children: React.ReactNode;
  cite?: string;
  className?: string;
}> = ({ children, cite, className = '' }) => (
  <blockquote className={`text-block__quote ${className}`}>
    <p>{children}</p>
    {cite && <cite className="text-block__quote-cite">— {cite}</cite>}
  </blockquote>
);

export const List: React.FC<{
  items: string[];
  ordered?: boolean;
  className?: string;
}> = ({ items, ordered = false, className = '' }) => {
  const Tag = (ordered ? 'ol' : 'ul') as keyof React.JSX.IntrinsicElements;
  return (
    <Tag className={`text-block__list ${ordered ? 'text-block__list--ordered' : ''} ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="text-block__list-item">{item}</li>
      ))}
    </Tag>
  );
};

export const Highlight: React.FC<{
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'tip';
  className?: string;
}> = ({ children, variant = 'info', className = '' }) => (
  <div className={`text-block__highlight text-block__highlight--${variant} ${className}`}>
    {children}
  </div>
);

export const Divider: React.FC<{
  variant?: 'line' | 'dots' | 'space';
}> = ({ variant = 'line' }) => (
  <hr className={`text-block__divider text-block__divider--${variant}`} />
);

// Attach sub-components
TextBlock.Heading = Heading;
TextBlock.Paragraph = Paragraph;
TextBlock.Quote = Quote;
TextBlock.List = List;
TextBlock.Highlight = Highlight;
TextBlock.Divider = Divider;

export default TextBlock;

