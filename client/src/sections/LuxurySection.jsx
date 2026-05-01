import { useNavigate } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';

const luxuryBrands = [
  'Louis Vuitton',
  'Gucci',
  'Prada',
  'Chanel',
  'Dior',
  'Hermès',
  'Cartier',
  'Tiffany & Co.',
  'Rolex',
  'Burberry',
  'Versace',
  'Balenciaga',
  'Bvlgari',
  'Fendi',
  'Saint Laurent',
  'Moncler',
  'Celine',
  'Miu Miu',
  'Givenchy',
  'Audemars Piguet',
];

export default function LuxurySection() {
  const navigate = useNavigate();

  const openMallMap = (brandName) => {
    navigate('/map', { state: { selectedStoreName: brandName } });
  };

  return (
    <SectionWrapper className="relative overflow-hidden bg-white text-gray-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(17,24,39,0.06),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.10),_transparent_34%)]" />

      <div className="max-w-3xl mb-8">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500 mb-3">
          Luxury
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-950">
          A Single Seamless Line of Luxury Brands
        </h2>
        <p className="mt-4 text-base md:text-lg text-gray-600 leading-8">
          A continuous marquee of premium brand identities that moves smoothly
          across the section without interruption.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] py-6">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="marquee-track flex w-max items-center gap-4 px-6">
          {[...luxuryBrands, ...luxuryBrands].map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white px-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => openMallMap(brand)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openMallMap(brand);
                }
              }}
            >
              <div className="text-center">
                <div className="text-sm uppercase tracking-[0.35em] text-gray-400">
                  Luxury
                </div>
                <div className="mt-2 text-lg font-semibold text-gray-950">
                  {brand}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}