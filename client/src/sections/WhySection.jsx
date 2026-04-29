import SectionWrapper from "../components/SectionWrapper";

export default function WhySection() {
  const stats = [
    "50M+ Annual Visitors",
    "500+ Retail Stores",
    "Top Luxury Brands",
    "Global Destination"
  ];

  return (
    <SectionWrapper>
      <h2 className="text-4xl font-bold mb-10">Why This Property</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="p-6 bg-white/5 rounded-xl">
            {s}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}