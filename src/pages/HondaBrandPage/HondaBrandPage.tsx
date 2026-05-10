import BrandHubPage from '../BrandHubPage/BrandHubPage';

const HondaBrandPage = () => (
  <BrandHubPage
    make="Honda"
    brandPath="/brands/honda"
    description="Explore Honda cars and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals."
    logoPath="/oem-logos/group-1494791743.svg"
    offerCounts={{
      buying: 12,
      leasing: 6,
      total: 18,
    }}
  />
);

export default HondaBrandPage;
