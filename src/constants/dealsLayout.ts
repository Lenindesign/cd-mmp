/**
 * Shared layout constants for the deals-listing pages.
 *
 * Every deals listing renders the same skeleton: a grid of cards, segmented
 * every N cards by a full-bleed advertisement, with the later segments
 * showing a different sidebar creative than the first. These values used to
 * be copy-pasted in ~18 page files; keeping them in one module means an ops
 * update lands in every listing simultaneously.
 */

interface SidebarCreativeProps {
  imageUrl?: string;
  altText?: string;
  link?: string;
  secondaryImageUrl?: string;
  secondaryAltText?: string;
  secondaryLink?: string;
}

export const GRID_BREAKER_AFTER_CARD_COUNT = 12;

export const DEALS_GRID_BREAKER_AD_URL =
  'https://d2kde5ohu8qb21.cloudfront.net/files/693a37c1e2108b000272edd6/nissan.jpg';

export const DEALS_SIDEBAR_PRIMARY_IMAGE =
  'https://d2kde5ohu8qb21.cloudfront.net/files/69387d364230820002694996/300x600.jpg';

/**
 * Sidebar creative shown in any grid segment AFTER the first full-bleed
 * breaker. The first segment uses the default `AdSidebar` (no props) so the
 * house primary ad appears at the top of the page.
 */
export const SIDEBAR_AFTER_BREAK_PROPS: SidebarCreativeProps = {
  imageUrl: DEALS_SIDEBAR_PRIMARY_IMAGE,
  altText: 'Advertisement',
  secondaryImageUrl: DEALS_GRID_BREAKER_AD_URL,
  secondaryAltText: 'Advertisement',
  link: '#',
  secondaryLink: '#',
};

/**
 * The brand name we italicize inside FAQ questions across the deals section.
 * Pulled out so copy audits can change the emphasis token in one place.
 */
export const CAR_AND_DRIVER_BRAND = 'Car and Driver';
