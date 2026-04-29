import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import introVideo from '../assets/videos/kop-homepage-hero.m4v'
import { useNavigate } from "react-router-dom";

export default function Intro() {
    const videoRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">

            {/* Background Video */}
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                aria-hidden="true"
            >
                <source src={introVideo} type="video/mp4" />
            </video>

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
                    Explore Now
                </motion.button>

            </div>
        </section>
    );
}