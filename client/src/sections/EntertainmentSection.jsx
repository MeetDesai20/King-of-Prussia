import SectionWrapper from "../components/SectionWrapper";
import LazyImage from "../components/LazyImage";
import img1 from "../assets/images/entertainment/e1.jpg";
import img2 from "../assets/images/entertainment/e2";
import img3 from "../assets/images/entertainment/e3";
import img4 from "../assets/images/entertainment/e4";

const gridImages = [img1, img2, img3, img4];

export default function EntertainmentSection() {
    return (
        <SectionWrapper className="bg-stone-50">
            <div className="mx-auto max-w-7xl text-center">
                <h2 className="mb-2 text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900">Entertainment</h2>
                <p className="mb-8 md:mb-12 text-base md:text-lg text-stone-600">
                    Attractions that transform the mall into a destination.
                </p>

                <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    {gridImages.map((img, i) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <LazyImage
                                src={img}
                                alt={`Entertainment ${i + 1}`}
                                className="h-40 sm:h-56 md:h-64 lg:h-72 w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}