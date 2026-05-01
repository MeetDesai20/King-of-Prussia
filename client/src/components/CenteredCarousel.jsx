import { useEffect, useRef, useState } from "react";
import LazyImage from "./LazyImage";
import c1 from "../assets/images/event-slider/event1.avif";
import c2 from "../assets/images/event-slider/event2";
import c3 from "../assets/images/event-slider/event3";
import c4 from "../assets/images/event-slider/event4";
import c5 from "../assets/images/event-slider/event5";

const images = [c1, c2, c3, c4, c5];

export default function CenteredCarousel({ interval = 3200 }) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(320);
  const [gap, setGap] = useState(20);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    function updateSizes() {
      const w = containerRef.current?.clientWidth || 1200;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
      
      if (w < 640) {
        // Mobile: show 1 image fullwidth
        setCardWidth(w);
        setGap(0);
      } else {
        // Tablet/Desktop: show all 5 images
        const maxGap = w < 1024 ? 12 : 20;
        const n = images.length;
        const candidate = Math.floor((w - (n - 1) * maxGap) / n);
        const cw = Math.max(60, Math.min(380, candidate));
        setCardWidth(cw);
        const remaining = w - n * cw;
        const newGap = Math.max(6, Math.min(maxGap, Math.floor(remaining / (n - 1))));
        setGap(newGap);
      }
    }
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  const totalItem = cardWidth + gap;
  const containerW = containerRef.current?.clientWidth || 0;
  const centerOffset = isMobile ? 0 : Math.round((containerW - cardWidth) / 2);
  const translateX = -index * totalItem + centerOffset;
  const imageHeight = isMobile ? "h-48 sm:h-56" : isTablet ? "h-[160px]" : "h-[220px]";

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-4 sm:py-6 md:py-8">
      <div
        className="flex items-center transition-transform duration-700 ease-in-out"
        style={{ transform: isMobile ? "translateX(0)" : `translateX(${translateX}px)` }}
      >
        {isMobile ? (
          // Mobile: show only current centered image
          <div
            className="flex-shrink-0 w-full"
            style={{
              transition: "opacity 700ms cubic-bezier(.2,.9,.2,1)",
              opacity: 1,
            }}
          >
            <LazyImage
              src={images[index]}
              alt={`carousel-${index}`}
              className={`${imageHeight} w-full rounded-lg object-cover shadow-2xl ring-1 ring-black/6`}
            />
          </div>
        ) : (
          // Tablet/Desktop: show all images with carousel
          images.map((src, i) => {
            const isCenter = i === index;
            const scale = isCenter ? 1.06 : 0.86;
            return (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: `${cardWidth}px`,
                  marginRight: i === images.length - 1 ? 0 : `${gap}px`,
                  transition: "transform 700ms cubic-bezier(.2,.9,.2,1), opacity 700ms",
                  transform: `scale(${scale})`,
                  opacity: isCenter ? 1 : 0.95,
                }}
              >
                <LazyImage
                  src={src}
                  alt={`carousel-${i}`}
                  className={`${imageHeight} w-full rounded-lg sm:rounded-xl object-cover shadow-2xl ring-1 ring-black/6`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
