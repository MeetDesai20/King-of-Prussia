import React, { useEffect } from "react";
import { motion } from "framer-motion";
import introVideo from '../assets/videos/kop-homepage-hero.m4v'
import LazyVideo from "../components/LazyVideo";
import { useNavigate } from "react-router-dom";

export default function Intro() {
    const navigate = useNavigate()

    useEffect(() => {
        // Reset scroll to top on page mount
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">

            {/* Background Video */}
            <LazyVideo src={introVideo} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center">

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-white px-8 py-4 text-black font-semibold shadow-lg"
                    onClick={()=>navigate('/home')}
                >
                    Enter
                </motion.button>

            </div>
        </section>
    );
}