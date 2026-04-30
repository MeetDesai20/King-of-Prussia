import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="absolute inset-0 z-20">
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold">
          Experience the Scale
        </h1>

        <p className="mt-4 text-lg opacity-80 max-w-xl">
          A destination redefining retail, lifestyle, and entertainment.
        </p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white text-black px-8 py-4 rounded-full font-semibold"
        >
          Explore
        </motion.button>
      </div>
    </section>
  );
}