import SEO from "../components/SEO";
import WhySection from "../sections/WhySection";
import RetailSection from "../sections/RetailSection";
import LuxurySection from "../sections/LuxurySection";
import DiningSection from "../sections/DiningSection";
import EntertainmentSection from "../sections/EntertainmentSection";
import EventsSection from "../sections/EventsSection";
import CTASection from "../sections/CTASection";
import LazyVideo from "../components/LazyVideo";
import introVideo from '../assets/videos/kop-homepage-hero.m4v';
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function CoverSlide({ onMapClick, onStartClick }) {
  const highlights = [
    { value: "50M+", label: "annual visitors" },
    { value: "500+", label: "retail stores" },
    { value: "Luxury", label: "brand gravity" },
    { value: "Events", label: "activation-ready" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070708] text-white">
      <LazyVideo src={introVideo} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(210,180,140,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_30%),linear-gradient(180deg,rgba(7,7,8,0.18),rgba(7,7,8,0.72))]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.45em] text-white/55">
              Interactive Sales Deck
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
              King of Prussia
            </h1>
          </div>

          <div className="hidden rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur md:block">
            Deck 01
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <p className="max-w-xl text-base leading-7 text-white/78 md:text-lg md:leading-8">
              A cinematic presentation of retail scale, luxury positioning,
              dining depth, entertainment, and event-ready inventory.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStartClick}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
              >
                Start deck
              </button>
              <button
                type="button"
                onClick={onMapClick}
                className="rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-transform hover:scale-[1.02]"
              >
                Open map
              </button>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
              >
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {item.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/55">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const deckRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo(() => ([
    {
      id: 'cover',
      label: 'Cover',
      node: (
        <CoverSlide
          onMapClick={() => navigate('/map')}
          onStartClick={() => goToSlide(1)}
        />
      ),
    },
    {
      id: 'why',
      label: 'Why it matters',
      node: <WhySection />,
    },
    {
      id: 'retail',
      label: 'Retail',
      node: <RetailSection />,
    },
    {
      id: 'luxury',
      label: 'Luxury',
      node: <LuxurySection />,
    },
    {
      id: 'dining',
      label: 'Dining',
      node: <DiningSection />,
    },
    {
      id: 'entertainment',
      label: 'Entertainment',
      node: <EntertainmentSection />,
    },
    {
      id: 'events',
      label: 'Events',
      node: <EventsSection />,
    },
    {
      id: 'cta',
      label: 'Close',
      node: <CTASection />,
    },
  ]), [navigate]);

  useEffect(() => {
    // Reset scroll to top on page mount
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const nextIndex = Number(visibleEntry.target.getAttribute('data-index'));
          if (!Number.isNaN(nextIndex)) {
            setActiveSlide(nextIndex);
          }
        }
      },
      {
        root: deckRef.current,
        threshold: [0.45, 0.6, 0.75],
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) {
        observer.observe(slide);
      }
    });

    return () => observer.disconnect();
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const keys = ['ArrowDown', 'PageDown', 'ArrowRight', ' ', 'Enter'];
      const reverseKeys = ['ArrowUp', 'PageUp', 'ArrowLeft'];

      if (keys.includes(event.key)) {
        event.preventDefault();
        const nextIndex = Math.min(activeSlide + 1, slides.length - 1);
        slideRefs.current[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (reverseKeys.includes(event.key)) {
        event.preventDefault();
        const previousIndex = Math.max(activeSlide - 1, 0);
        slideRefs.current[previousIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (event.key === 'Home') {
        event.preventDefault();
        slideRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (event.key === 'End') {
        event.preventDefault();
        slideRefs.current[slides.length - 1]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, slides.length]);

  const goToSlide = (index) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="King of Prussia | Digital Deck"
        description="A slide-style presentation of retail, luxury, dining, entertainment, and event opportunities at King of Prussia."
        image="/preview.jpg"
      />
      <main
        ref={deckRef}
        className="deck-shell h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#f7f2ea] text-gray-950 scroll-smooth"
      >
        <div className="pointer-events-none fixed inset-x-0 top-0 z-40">
          <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-4 px-4 py-4 md:px-6">
            <div className="pointer-events-auto rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-gray-700 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              King of Prussia Deck
            </div>

            <div className="pointer-events-auto hidden items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:flex">
              <button
                type="button"
                onClick={() => goToSlide(Math.max(activeSlide - 1, 0))}
                className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-700 transition hover:bg-black hover:text-white"
              >
                Prev
              </button>
              <div className="px-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
              <button
                type="button"
                onClick={() => goToSlide(Math.min(activeSlide + 1, slides.length - 1))}
                className="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <aside className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block">
          <div className="pointer-events-auto rounded-[2rem] border border-black/10 bg-white/80 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
            <div className="mb-3 text-[0.65rem] uppercase tracking-[0.4em] text-gray-500">
              Slides
            </div>
            <div className="flex flex-col gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`group flex items-center gap-3 rounded-full px-3 py-2 text-left transition ${
                    index === activeSlide
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-black/5 hover:text-gray-950'
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[0.65rem] font-semibold transition ${
                    index === activeSlide ? 'bg-white text-black' : 'bg-black/5 text-gray-700 group-hover:bg-black/10'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium">
                    {slide.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="fixed inset-x-0 bottom-4 z-30 px-4 md:hidden">
          <div className="mx-auto flex max-w-[560px] items-center gap-2 overflow-x-auto rounded-full border border-black/10 bg-white/85 p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl no-scrollbar">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition ${
                  index === activeSlide
                    ? 'bg-black text-white'
                    : 'bg-transparent text-gray-600'
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>

        {slides.map((slide, index) => (
          <section
            key={slide.id}
            ref={(element) => {
              slideRefs.current[index] = element;
            }}
            data-index={index}
            className="snap-start"
          >
            {slide.node}
          </section>
        ))}
      </main>
    </>
  );
}