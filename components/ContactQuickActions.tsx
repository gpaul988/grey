'use client';

import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';
import Link from 'next/link';
import {FaWhatsapp, FaComments} from 'react-icons/fa';
import {SiCalendly} from 'react-icons/si';

const fadeUp: { transition: Transition } = {
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]}
};

type ContactQuickActionsProps = {
    whatsappUrl: string;
    calendlyUrl: string;
};

export default function ContactQuickActions({
                                                whatsappUrl,
                                                calendlyUrl
                                            }: ContactQuickActionsProps) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
            {/* WhatsApp Card */}
            <motion.a
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                {...fadeUp}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
            >
                <div className="flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <FaWhatsapp/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">WhatsApp</h3>
                        <p className="text-gray-600 mb-3">
                            Chat with us instantly for fast project discussions.
                        </p>
                        <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
              Start chat <FaWhatsapp/>
            </span>
                    </div>
                </div>
            </motion.a>

            {/* Calendly Card */}
            <motion.a
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                {...fadeUp}
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl bg-white shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
            >
                <div className="flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <SiCalendly/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Calendly</h3>
                        <p className="text-gray-600 mb-3">
                            Book a discovery call at a time that works for you.
                        </p>
                        <span className="inline-flex items-center gap-2 text-teal-600 font-semibold">
              Book now <SiCalendly/>
            </span>
                    </div>
                </div>
            </motion.a>

            {/* Live Chat Card */}
            <motion.div
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                {...fadeUp}
                className="group rounded-2xl bg-white shadow-lg border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
            >
                <div className="flex items-start gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <FaComments/>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Live Chat</h3>
                        <p className="text-gray-600 mb-3">
                            Use the chat widget below for quick support and questions.
                        </p>
                        <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
              Chat available <FaComments/>
            </span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}