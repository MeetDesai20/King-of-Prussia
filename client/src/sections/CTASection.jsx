import SectionWrapper from "../components/SectionWrapper";
import CTAButton from "../components/CTAButton";

export default function CTASection() {
  return (
    <SectionWrapper className="text-center">
      <h2 className="text-4xl font-bold mb-6">
        Be Part of the Destination
      </h2>

      <p className="mb-8 opacity-80">
        Leasing, sponsorships, and event opportunities available.
      </p>

      <div className="flex gap-4 justify-center">
        <CTAButton>Leasing</CTAButton>
        <CTAButton>Sponsorship</CTAButton>
        <CTAButton>Book Event</CTAButton>
      </div>
    </SectionWrapper>
  );
}