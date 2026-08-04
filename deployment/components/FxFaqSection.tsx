'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FxReveal, FxSectionHeading, FxHoloCard } from '@/components/futuristic/fx';
import { useFaqsByCategory, type FaqItem } from '@/hooks/useFaqsByCategory';

interface FxFaqSectionProps {
    day?: boolean;
    category?: string;
    title?: React.ReactNode;
    eyebrow?: string;
    accent?: string;
    customFaqs?: FaqItem[];
}

export default function FxFaqSection({
    day = false,
    category,
    title = 'Frequently Asked',
    eyebrow = 'FAQs',
    accent = 'Questions',
    customFaqs,
}: FxFaqSectionProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const { faqs: fetchedFaqs, loading } = useFaqsByCategory(category);
    
    const faqs = customFaqs || fetchedFaqs;

    if (loading && !customFaqs) {
        return (
            <section className={`relative overflow-hidden ${day ? 'bg-white' : 'bg-[#050810]'} text-white py-24`}>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-gray-400">Loading FAQs...</p>
                </div>
            </section>
        );
    }

    if (!faqs.length) return null;

    return (
        <section className={`relative overflow-hidden ${day ? 'bg-white' : 'bg-[#050810]'}`}>
            <div className="relative z-10 lg:py-24 py-12 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-white">
                <FxReveal className="mb-12">
                    <FxSectionHeading
                        day={day}
                        eyebrow={eyebrow}
                        title={title}
                        accent={accent}
                    />
                </FxReveal>

                <div className="space-y-3 max-w-4xl">
                    {faqs.map((faq, i) => {
                        const isOpen = openFaq === i;
                        return (
                            <FxReveal key={faq.id} delay={0.04 * i}>
                                <FxHoloCard day={day} className="overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : i)}
                                        className="w-full flex justify-between items-center text-left gap-6 px-6 py-5"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="text-[1em] font-[500] leading-snug">{faq.question}</span>
                                        <motion.span
                                            animate={{ rotate: isOpen ? 45 : 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={`text-[1.8em] leading-none shrink-0 ${isOpen ? 'text-teal-400' : 'text-gray-500'}`}
                                        >
                                            +
                                        </motion.span>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 pb-6 text-[0.88em] font-[300] leading-[1.7] text-gray-300 text-justify lg:pr-[6em]">
                                                    {faq.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </FxHoloCard>
                            </FxReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
