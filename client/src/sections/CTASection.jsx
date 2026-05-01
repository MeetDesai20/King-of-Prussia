import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import CTAButton from '../components/CTAButton';

const plans = [
  {
    name: 'Leasing Plan',
    audience: 'For retail brands, anchor tenants, and pop-up concepts.',
    facilities: [
      'Premium retail units',
      'Flexible leasing terms',
      'High-footfall positioning',
      'Brand visibility support',
    ],
  },
  {
    name: 'Sponsorship Plan',
    audience: 'For brands that want exposure through the destination ecosystem.',
    facilities: [
      'Event naming rights',
      'Digital screen placement',
      'On-ground activations',
      'Audience engagement reports',
    ],
  },
  {
    name: 'Event Booking Plan',
    audience: 'For concerts, launches, community gatherings, and premium showcases.',
    facilities: [
      'Dedicated event zones',
      'Stage and AV support',
      'Guest flow management',
      'Booking and logistics assistance',
    ],
  },
];

export default function CTASection() {
  return (
    <SectionWrapper className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Be Part of the Destination
        </h2>

        <p className="mb-12 opacity-80 max-w-2xl mx-auto">
          Choose a plan that matches your goals. Each plan is built to support
          a different way of activating the destination.
        </p>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-md p-6 shadow-xl"
            >
              <div className="mb-5">
                <CTAButton>{plan.name}</CTAButton>
              </div>

              <p className="mb-4 text-sm leading-6 opacity-85">{plan.audience}</p>

              <div>
                <h3 className="text-lg font-semibold mb-3">Facilities included</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  {plan.facilities.map((facility) => (
                    <li key={facility} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/80" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        </motion.div>
    </SectionWrapper>
  );
}