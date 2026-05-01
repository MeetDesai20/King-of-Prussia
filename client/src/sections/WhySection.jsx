import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';

function CountUpValue({ end, suffix = '', duration = 1600, active }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    let frameId;
    const startTime = performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const nextValue = Math.floor(progress * end);
      setValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [active, duration, end]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function WhySection() {
  const stats = [
    {
      value: 50,
      suffix: 'M+',
      label: 'Annual Visitors',
      detail: 'Consistent audience scale across peak seasons and everyday traffic.',
      numeric: true,
    },
    {
      value: 500,
      suffix: '+',
      label: 'Retail Stores',
      detail: 'A dense retail mix that keeps the destination active throughout the day.',
      numeric: true,
    },
    {
      value: 'Top',
      label: 'Luxury Brands',
      detail: 'Premium labels that strengthen the property’s destination value.',
      numeric: false,
    },
    {
      value: 'Global',
      label: 'Destination Reach',
      detail: 'A recognized name with regional pull and international appeal.',
      numeric: false,
    },
  ];

  return (
    <SectionWrapper className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(17,24,39,0.06),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_35%)]" />

      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-gray-500 mb-4">
            Destination Advantage
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-950">
            Why This Property Stands Out
          </h2>
          <p className="mt-6 text-base md:text-lg text-gray-600 leading-8">
            This is more than a retail location. It is a premium, high-footfall
            destination shaped by strong commerce, elevated brands, and a
            broader experience that keeps people returning.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-gray-500">Footfall quality</div>
              <div className="mt-2 text-lg font-semibold text-gray-950">
                Consistent audience across retail, dining, and events
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-gray-500">Positioning</div>
              <div className="mt-2 text-lg font-semibold text-gray-950">
                A premium ecosystem designed for long dwell time
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] border border-gray-200 bg-white p-5 md:p-6 shadow-xl"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <div className="rounded-[1.5rem] border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Market Snapshot
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-gray-950">
                  Property Strengths
                </h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center text-gray-700">
                ●
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-950 tabular-nums tracking-tight">
                    {stat.numeric ? (
                      <CountUpValue
                        end={stat.value}
                        suffix={stat.suffix}
                        active
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-500">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {stat.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 leading-6">
              Premium retail, lifestyle, and event programming work together to
              create a destination that performs like an ecosystem, not a single
              asset.
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}