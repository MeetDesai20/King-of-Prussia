import SectionWrapper from "../components/SectionWrapper";
import LazyImage from "../components/LazyImage";
import diningImage from "../assets/images/food-court.jpg";

export default function DiningSection() {
  return (
    <SectionWrapper className="bg-stone-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <span className="mb-4 inline-flex rounded-full border border-stone-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-stone-600">
            Dining & Lifestyle
          </span>
          <h2 className="mb-6 max-w-xl text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            From fine dining to experiential food concepts.
          </h2>
          <p className="max-w-xl text-lg leading-8 text-stone-600">
            Explore a mix of elevated restaurants, fast-casual favorites, and
            destination dining designed to turn every visit into more than just
            a meal.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5">
            <LazyImage
              src={diningImage}
              alt="Dining and lifestyle at King of Prussia Mall"
              className="h-[22rem] w-full object-cover md:h-[32rem]"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}