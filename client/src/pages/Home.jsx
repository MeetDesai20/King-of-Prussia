import SEO from "../components/SEO";
import HeroSection from "../sections/HeroSection";
import WhySection from "../sections/WhySection";
import RetailSection from "../sections/RetailSection";
import LuxurySection from "../sections/LuxurySection";
import DiningSection from "../sections/DiningSection";
import EntertainmentSection from "../sections/EntertainmentSection";
import EventsSection from "../sections/EventsSection";
import CTASection from "../sections/CTASection";
import VerticalCarousel from "../components/VerticalCarousel";

export default function Home() {
  return (
    <>
      <SEO
        title="King of Prussia | Interactive Sales Deck"
        description="Retail, luxury, dining, entertainment, and event opportunities at one of the world’s leading destinations."
        image="/preview.jpg"
      />
      <section className="relative h-screen w-full overflow-hidden">
        <VerticalCarousel />
        <HeroSection />
      </section>
      <WhySection />
      <RetailSection />
      <LuxurySection />
      <DiningSection />
      <EntertainmentSection />
      <EventsSection />
      <CTASection />
    </>
  );
}