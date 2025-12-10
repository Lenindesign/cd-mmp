import './VehicleOverview.css';

interface VehicleOverviewProps {
  author?: string;
  content?: string;
}

const VehicleOverview = ({
  author = 'Austin Parsons',
  content = `As one of the most affordable subcompact SUVs on the market, the Chevrolet Trax delivers a high level of value with both style and grace. The Trax's appeal starts with its sharp exterior styling, a theme that continues into its quiet and well-equipped cabin. With heaps of rear legroom for adult passengers and a capacious cargo area for recreational equipment, the Trax's utility is undeniable. So, too, is its pleasant ride quality and surprisingly nimble handling. By deftly blending all those characteristics in a package that costs less than some upscale riding lawnmowers, the Trax is about as good as it gets when it comes to bang for your buck.`,
}: VehicleOverviewProps) => {
  return (
    <section className="vehicle-overview">
      <div className="vehicle-overview__card">
        <p className="vehicle-overview__author">By {author}</p>
        <h2 className="vehicle-overview__title">Overview</h2>
        <p className="vehicle-overview__content">{content}</p>
      </div>
    </section>
  );
};

export default VehicleOverview;

