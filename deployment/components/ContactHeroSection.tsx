'use client';

import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';

type ContactHeroSectionProps = {
    videoSrc?: string;
};

const fadeInDown: { transition: Transition } = {
    transition: {duration: 0.8}
};

export default function ContactHeroSection({
                                               videoSrc = '/assets/header/contact.mp4'
                                           }: ContactHeroSectionProps) {
    return (
        <section className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] mb-12 overflow-hidden">
            <video
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-b-3xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-b-3xl">
                <motion.h1
                    initial={{opacity: 0, y: 24}}
                    animate={{opacity: 1, y: 0}}
                    {...fadeInDown}
                    className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg text-center px-4"
                >
                    Contact Us
                </motion.h1>
            </div>
        </section>
    );
}