'use client';

/**
 * VerticalSolutionsAccordion
 *  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
 * Premium, reusable accordion component for showcasing industry-specific or
 * vertical-specific solutions. Supports dynamic title, subtitle, and case items.
 * 
 * Professional, futuristic aesthetic with smooth animations and responsive design.
 * Works across all service pages without hardcoding.
 */

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {AiFillCaretUp, AiFillCaretDown} from 'react-icons/ai';
import {FxReveal, FxChip, FxBackground, FxOrbit} from '@/components/futuristic/fx';

export interface VerticalSolutionItem {
    id: string | number;
    title: string;
    description: string;
}

export interface VerticalSolutionsAccordionProps {
    isDayTime: boolean;
    title: string;
    subtitle?: string;
    items: VerticalSolutionItem[];
    eyebrow?: string;
}

export default function VerticalSolutionsAccordion({
    isDayTime,
    title,
    subtitle,
    items,
    eyebrow = 'Solutions',
}: VerticalSolutionsAccordionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const dark = !isDayTime;

    const bgColor = dark ? 'bg-black' : 'bg-white';
    const textColor = dark ? 'text-white' : 'text-black';
    const borderColor = dark ? 'border-white' : 'border-black';
    const accentColor = '#00f5d4';
    const mutedText = dark ? 'text-gray-400' : 'text-gray-600';

    return (
        <section
            className={`relative lg:pt-[2em] overflow-hidden border-b max-w-full w-full ${bgColor} ${borderColor}`}>
            {/* Background FX layers */}
            <div className="pointer-events-none absolute inset-0">
                <FxBackground day={isDayTime} grid aurora className="opacity-25"/>
                <FxOrbit size={700} top="-150px" right="-200px" opacity={0.08} speed={35}/>
                <FxOrbit size={420} top="120px" left="-140px" opacity={0.06} speed={28} reverse/>
            </div>

            {/* Content */}
            <div
                className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[3em] md:pt-[3em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14 z-10`}>
                
                {/* Header Grid */}
                <div className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${textColor}`}>
                    {/* Title Section */}
                    <FxReveal className="lg:mr-[8em]">
                        {eyebrow && (
                            <FxChip day={isDayTime} className="mb-4 inline-block">
                                {eyebrow}
                            </FxChip>
                        )}
                        <h2 className="lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] tracking-tight lg:mb-6 mb-5 leading-[1.2]">
                            <span style={{color: accentColor}} className="inline-block mr-2">
                                Vertical
                            </span>
                            <br className="hidden sm:block"/>
                            <span className="inline-block">Solutions</span>
                            <span style={{color: accentColor}} className="block">
                                Expertise
                            </span>
                        </h2>
                        {subtitle && (
                            <p className="text-[0.95em] font-normal leading-relaxed tracking-normal text-justify max-w-lg">
                                {subtitle}
                            </p>
                        )}
                    </FxReveal>

                    {/* Accordion Section */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                        className={`lg:-ml-5 md:-ml-5 border-t pt-[4em] relative mx-auto max-w-full w-full space-y-0 ${textColor}`}>
                        
                        <AnimatePresence mode="wait">
                            {items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="w-full">
                                    
                                    {/* Accordion Item */}
                                    <motion.div
                                        className={`relative border-b transition-all duration-300 ${
                                            activeIndex === idx
                                                ? dark
                                                    ? 'bg-teal-400/[0.03] border-teal-400/40'
                                                    : 'bg-teal-50 border-teal-300/60'
                                                : ''
                                        }`}
                                        layout>
                                        
                                        <button
                                            onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                            className={`w-full text-left px-0 py-4 focus:outline-none transition-colors duration-200 flex items-center justify-between gap-4`}
                                            aria-expanded={activeIndex === idx}>
                                            
                                            <span
                                                className={`lg:text-[1.6em] md:text-[1.5em] sm:text-base text-sm font-[600] flex-1 transition-colors duration-200 ${
                                                    activeIndex === idx
                                                        ? `text-[${accentColor}]`
                                                        : dark
                                                            ? 'text-white'
                                                            : 'text-black'
                                                }`}>
                                                {item.title}
                                            </span>

                                            {/* Animated Chevron */}
                                            <motion.div
                                                animate={{rotate: activeIndex === idx ? 90 : 0}}
                                                transition={{duration: 0.2}}>
                                                {activeIndex === idx ? (
                                                    <AiFillCaretUp
                                                        className={`lg:text-[1.5em] text-[1em] flex-shrink-0`}
                                                        style={{color: accentColor}}/>
                                                ) : (
                                                    <AiFillCaretDown
                                                        className="lg:text-[1.5em] text-[1em] flex-shrink-0"/>
                                                )}
                                            </motion.div>
                                        </button>

                                        {/* Expanded Content */}
                                        <AnimatePresence>
                                            {activeIndex === idx && (
                                                <motion.div
                                                    initial={{opacity: 0, height: 0}}
                                                    animate={{opacity: 1, height: 'auto'}}
                                                    exit={{opacity: 0, height: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="overflow-hidden">
                                                    <motion.div
                                                        initial={{opacity: 0, y: -10}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: 0.1, duration: 0.3}}
                                                        className={`pb-5 pt-2 text-[0.95em] leading-relaxed tracking-normal text-justify ${mutedText}`}>
                                                        {item.description}
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
