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
import Header from "../components/Header";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Reset scroll to top on page mount
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Header />
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
      <div id="retail">
        <RetailSection />
      </div>
      <div id="luxury">
        <LuxurySection />
      </div>
      <div id="dining">
        <DiningSection />
      </div>
      <div id="entertainment">
        <EntertainmentSection />
      </div>
      <div id="events">
        <EventsSection />
      </div>
      <div id="cta">
        <CTASection />
      </div>
    </>
  );
}