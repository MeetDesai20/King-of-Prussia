import { useEffect, useState } from "react";
import vc1 from '../assets/images/hero -slider/mall-front.jpg'
import vc2 from '../assets/images/hero -slider/netflix.jpg'
import vc3 from '../assets/images/hero -slider/shop.jpg'
import vc4 from '../assets/images/hero -slider/lobby.jpg'
import vc5 from '../assets/images/hero -slider/mall-floor.jpg'

const images = [
    vc1,
    vc2,
    vc3,
    vc4,
    vc5,
];

export default function VerticalCarousel() {
    const [index, setIndex] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, [index]);

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* Slides */}
            <div
                className="transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateY(-${index * 100}vh)`,
                }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="h-screen w-full flex items-center justify-center"
                    >
                        <img
                            src={img}
                            alt="slide"
                            className="h-full w-full object-cover blur-[2px] scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="absolute right-5 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-3">
                <button
                    onClick={prevSlide}
                    className="bg-white/70 hover:bg-white text-black px-3 py-2 rounded"
                >
                    ↑
                </button>
                <button
                    onClick={nextSlide}
                    className="bg-white/70 hover:bg-white text-black px-3 py-2 rounded"
                >
                    ↓
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute left-5 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-2">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-8 rounded ${i === index ? "bg-white" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}