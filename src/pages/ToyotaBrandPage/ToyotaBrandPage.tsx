import BrandHubPage from '../BrandHubPage/BrandHubPage';
import ToyotaIncentives from '../../components/ToyotaIncentives/ToyotaIncentives';

const ToyotaBrandPage = () => (
  <BrandHubPage
    make="Toyota"
    brandPath="/brands/toyota"
    description="Explore Toyota cars, trucks, and SUVs with Car and Driver reviews, ratings, prices, specs, and current deals."
    logoPath="/oem-logos/group-1494791744.svg"
    offerCounts={{
      buying: 34,
      leasing: 48,
      total: 82,
      buyingBadge: '8 expiring soon!',
      leasingBadge: '12 expiring soon!',
    }}
    afterSections={<ToyotaIncentives />}
  />
);

export default ToyotaBrandPage;
