import SectionWrapper from "../components/SectionWrapper";
import CenteredCarousel from "../components/CenteredCarousel";

export default function EventsSection() {
  return (
    <SectionWrapper className="bg-black text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Events & Platform</h2>
          <p className="text-base md:text-lg opacity-80">
            Concerts, activations, and global brand moments.
          </p>
        </div>

        <CenteredCarousel interval={3500} />
      </div>
    </SectionWrapper>
  );
}