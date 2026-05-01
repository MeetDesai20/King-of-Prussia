import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';

const shops = [
  { name: 'Louis Vuitton', category: 'Luxury Fashion', note: 'Flagship energy and elevated visibility.' },
  { name: 'Apple', category: 'Technology', note: 'High dwell time and strong premium draw.' },
  { name: 'Nike', category: 'Athleisure', note: 'Fast-moving retail with broad audience appeal.' },
  { name: 'Sephora', category: 'Beauty', note: 'Discovery-led shopping with strong repeat traffic.' },
  { name: 'Zara', category: 'Fast Fashion', note: 'Core fashion destination with trend-led collections.' },
  { name: 'Ralph Lauren', category: 'Lifestyle', note: 'Classic premium positioning with timeless appeal.' },
  { name: 'Starbucks', category: 'Cafe', note: 'Everyday convenience and social stopover value.' },
  { name: 'H&M', category: 'Fashion', note: 'Accessible fashion with broad category coverage.' },
  { name: 'Sunglass Hut', category: 'Accessories', note: 'Impulse-friendly premium add-on shopping.' },
  { name: 'Aritzia', category: 'Contemporary', note: 'Curated brand presence with strong brand heat.' },
];

export default function RetailSection() {
  const navigate = useNavigate();

  const openMallMap = (shopName) => {
    navigate('/map', { state: { selectedStoreName: shopName } });
  };

  return (
    <SectionWrapper className="relative overflow-hidden bg-white text-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(17,24,39,0.05),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_35%)]" />

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 mb-3">
            Retail Destination
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-950">
            Retail Shops That Drive the Experience
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 leading-8">
            A curated mix of premium and everyday brands presented in a smooth
            horizontal rail for effortless browsing.
          </p>
        </div>

        <div className="text-sm text-gray-500 max-w-sm md:text-right">
          Scroll horizontally to explore up to 10 highlighted retail shops.
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="no-scrollbar flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pr-6 md:pr-10">
          {shops.map((shop, index) => (
            <motion.article
              key={shop.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="snap-start shrink-0 w-[280px] md:w-[340px] rounded-[1.75rem] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden group cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => openMallMap(shop.name)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openMallMap(shop.name);
                }
              }}
            >
              <div className="relative h-44 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-700 p-5 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_30%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/80">
                      Shop {index + 1}
                    </span>
                    <span className="text-xs text-white/60">Premium retail</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold leading-tight group-hover:translate-x-1 transition-transform duration-300">
                      {shop.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{shop.category}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-sm leading-6 text-gray-600">{shop.note}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    Retail highlight
                  </span>
                  <span className="h-10 w-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-gray-950 group-hover:text-white transition-colors duration-300">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}