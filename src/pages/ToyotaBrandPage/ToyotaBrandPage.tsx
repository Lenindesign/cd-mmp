import BrandHubPage from '../BrandHubPage/BrandHubPage';
import ToyotaIncentives from '../../components/ToyotaIncentives/ToyotaIncentives';

const ToyotaBrandPage = () => (
  <BrandHubPage
    make="Toyota"
    brandPath="/brands/toyota"
    description="Toyota offers a wide range of legendarily reliable vehicles, ranging from the GR86 sports car to the three-row Grand Highlander. The company's most exciting model is GR GT sports car, but the rest of the lineup is rather tame. The Camry is one of the better mid-size sedans you can buy, while the Tacoma has a well-earned reputation for being a sturdy pickup that isn't afraid to get dirty. The Corolla sedan and the RAV4 SUV are great choices for those seeking economical transportation, but when it comes to fuel economy, the Prius hybrid is king. Read our Toyota reviews below for pricing, specs, and more."
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
