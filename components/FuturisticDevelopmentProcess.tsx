'use client';

import React from 'react';
import {motion} from 'framer-motion';
import {useIsDayTime} from './useIsDayTime';
import {FxBackground, FxOrbit, FxReveal} from '@/components/futuristic/fx';

interface FuturisticDevelopmentProcessProps {
    day?: boolean;
    title?: string;
    description?: string;
}

const FuturisticDevelopmentProcess: React.FC<FuturisticDevelopmentProcessProps> = ({
    day = false,
    title = 'Stages of Our Development Process',
    description = 'We design digital products that people love to use and businesses are proud to own.'
}) => {
    const dayTimeHook = useIsDayTime();
    const isDayTime = day !== undefined ? day : dayTimeHook;

    const stages = [
        {
            id: 1,
            subtitle: "01",
            title: "We're Experienced",
            description: "With a proven track record across a wide range of digital projects, we blend creative thinking, technical precision, strategic insight, and hands-on execution to deliver solutions that generate measurable business impact. Our approach is focused on achieving long-term value and sustainable growth—ensuring that every project not only meets expectations but drives real results.",
        },
        {
            id: 2,
            subtitle: "02",
            title: "We're Proactive",
            description: "You can rely on us to consistently exceed expectations by taking a proactive, solution-driven approach at every stage of your project. We identify potential challenges early, offer innovative recommendations without being asked, and continually look for new ways to deliver added value. Our commitment is not just to complete the work, but to elevate it—ensuring outcomes that are smarter, stronger, and aligned with your long-term goals.",
        },
        {
            id: 3,
            subtitle: "03",
            title: "We're Collaborative",
            description: "While we're passionate about technology, our greatest strength lies in the people behind it. To us, collaboration means more than just being easy to work with—it's about becoming a trusted partner who shares your vision, ambition, and commitment to achieving something exceptional. We align with your goals, bring fresh thinking to the table, and work side by side to turn bold ideas into real business outcomes.",
        },
        {
            id: 4,
            subtitle: "04",
            title: "We're Invested",
            description: "When you invest in us, we become fully invested in your business goals. Every project is approached with a strong sense of ownership and responsibility, ensuring no detail is overlooked. Our team is committed to delivering results that meet the highest professional standards, taking accountability for outcomes, and consistently striving to exceed expectations. This dedication drives us to deliver solutions that are not only technically sound but also strategically aligned with your long-term objectives.",
        },
    ];

    return (
            <section className={`relative overflow-hidden overflow-y-hidden ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <FxBackground day={isDayTime} grid aurora className="opacity-20"/>
                <FxOrbit size={520} top="-90px" right="-140px" opacity={0.06} speed={36}/>

                <div className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] py-4 md:py-6">
                {/* Compact header */}
                <FxReveal>
                    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ${isDayTime ? 'text-white' : 'text-black'}`}>
                        <div>
                            <div className="inline-block mb-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-[0.72em] font-[700] tracking-wider">Methodology</span>
                            </div>
                            <h2 className="text-[1.9em] md:text-[2.6em] lg:text-[3.2em] font-[800] leading-tight">{title}</h2>
                            <p className={`mt-2 text-[0.95em] font-[300] max-w-3xl ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>{description}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <div className="text-[0.95em] font-[600] text-teal-300">4 Stages</div>
                            <div className="h-1 w-32 bg-gradient-to-r from-teal-400 to-transparent rounded-full"/>
                        </div>
                    </div>
                </FxReveal>

                {/* Cards row - responsive grid, no horizontal scrolling for smooth futuristic layout */}
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 py-2">
                        {stages.map((s, i) => (
                            <motion.article
                                key={s.id}
                                whileHover={{scale:1.03}}
                                transition={{duration:0.36}}
                                className={`w-full h-[360px] md:h-[420px] bg-gradient-to-br ${isDayTime ? 'from-black/20 via-black/10 to-transparent' : 'from-white/7 to-transparent'} border ${isDayTime ? 'border-teal-400/12' : 'border-teal-400/10'} rounded-3xl p-5 md:p-7 shadow-[0_12px_40px_rgba(2,6,23,0.55)]`}
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-teal-300 text-[0.72em] font-[700] uppercase tracking-[0.26em]">Stage {s.subtitle}</div>
                                                <h3 className="mt-2 text-[1.1em] md:text-[1.6em] lg:text-[1.9em] font-[800] leading-tight">{s.title}</h3>
                                            </div>
                                            <div className="ml-4 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-400/14 to-transparent border border-teal-400/8">
                                                <span className="text-[0.95em] font-[800] text-teal-200">{s.subtitle}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className={`mt-4 text-[0.92em] leading-[1.6] ${isDayTime ? 'text-white/80' : 'text-black/80'}`}>{s.description}</p>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="h-1 flex-1 bg-gradient-to-r from-teal-400/40 to-transparent rounded-full mr-3"/>
                                        <button className="text-[0.85em] font-[700] text-teal-300">Learn →</button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FuturisticDevelopmentProcess;
