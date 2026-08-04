'use client';

import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import {FxBackground, FxChip, FxOrbit, FxReveal, FxHoloCard} from '@/components/futuristic/fx';

interface Capability {
    id: string;
    title: string;
    description: string;
    points?: string[];
    icon?: string;
}

interface ServiceCapabilitiesProps {
    heading?: string;
    subheading?: string;
    accentColor: string;
    capabilities: Capability[];
    variant?: 'tabs' | 'accordion' | 'cards' | 'terminal';
    ctaHref?: string;
    ctaLabel?: string;
    isDarkBg?: boolean;
}

/*  -  -  -  Terminal style variant  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function TerminalVariant({capabilities, accentColor}: { capabilities: Capability[]; accentColor: string }) {
    const [active, setActive] = useState(0);
    const [typed, setTyped] = useState('');

    // Enhanced typing animation effect
    React.useEffect(() => {
        const text = capabilities[active]?.description || '';
        let i = 0;
        setTyped('');
        const interval = setInterval(() => {
            if (i <= text.length) {
                setTyped(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 12);
        return () => clearInterval(interval);
    }, [active, capabilities]);

    // Autoplay carousel - cycle through capabilities every 25 seconds
    React.useEffect(() => {
        const autoplayTimer = setInterval(() => {
            setActive((prev) => (prev + 1) % capabilities.length);
        }, 25000);
        return () => clearInterval(autoplayTimer);
    }, [capabilities.length]);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden border transition-all duration-300"
            style={{
                borderColor: accentColor + '40',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
                boxShadow: `inset 0 0 60px ${accentColor}08, 0 20px 60px ${accentColor}15`
            }}>

            {/* Enhanced Sidebar */}
            <div className="lg:col-span-2 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a] border-r p-6"
                 style={{borderColor: accentColor + '20'}}>
                <div className="flex items-center gap-2 mb-6 pb-4 border-b" style={{borderColor: accentColor + '20'}}>
                    <motion.div className="w-3 h-3 rounded-full bg-red-500/70" animate={{scale: [1, 1.1, 1]}}
                                transition={{duration: 2, repeat: Infinity}}/>
                    <motion.div className="w-3 h-3 rounded-full bg-yellow-500/70" animate={{scale: [1, 1.1, 1]}}
                                transition={{duration: 2, repeat: Infinity, delay: 0.1}}/>
                    <motion.div className="w-3 h-3 rounded-full bg-green-500/70" animate={{scale: [1, 1.1, 1]}}
                                transition={{duration: 2, repeat: Infinity, delay: 0.2}}/>
                    <span
                        className="ml-auto text-[0.65em] font-mono text-white/30 uppercase tracking-wider">capabilities.sh</span>
                </div>

                <div className="space-y-2">
                    {capabilities.map((cap, i) => (
                        <motion.button
                            key={cap.id}
                            onClick={() => setActive(i)}
                            whileHover={{x: 4}}
                            className="w-full text-left px-4 py-3 rounded-xl text-[0.8em] font-mono transition-all duration-200 flex items-center gap-2 relative group"
                            style={{
                                background: active === i ? accentColor + '15' : 'rgba(255,255,255,0.02)',
                                color: active === i ? accentColor : 'rgba(255,255,255,0.35)',
                                border: active === i ? `1px solid ${accentColor}40` : '1px solid rgba(255,255,255,0.05)',
                            }}
                        >
                            <span style={{color: active === i ? accentColor : 'rgba(255,255,255,0.15)'}}>▸</span>
                            <span className="truncate font-[500]">{cap.title}</span>
                            {active === i && (
                                <motion.div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                    style={{background: accentColor}}
                                    animate={{scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6]}}
                                    transition={{duration: 1.2, repeat: Infinity}}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Enhanced Terminal output */}
            <div
                className="lg:col-span-3 bg-gradient-to-b from-[#0a0a0a] to-[#050505] p-8 font-mono min-h-[400px] flex flex-col justify-between">
                <div>
                    <motion.div
                        className="text-[0.68em] text-white/25 mb-6 flex items-center gap-2 pb-6 border-b"
                        style={{borderColor: accentColor + '15'}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        <span style={{color: accentColor}}>grey@discovery</span>
                        <span className="text-white/20">:</span>
                        <span className="text-blue-400/60">~/strategy</span>
                        <span className="text-white/20">$</span>
                        <span
                            className="text-white/20">execute {String(capabilities[active]?.title || 'service').toLowerCase().replace(/\s+/g, '-')}</span>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: 0.3}}
                        >
                            <h3
                                className="text-[0.95em] font-bold mb-4 tracking-wide flex items-center gap-2"
                                style={{color: accentColor}}
                            >
                                <span className="text-white/30">#</span>
                                {capabilities[active]?.title}
                            </h3>

                            <p className="text-[0.8em] text-white/55 leading-relaxed mb-6">
                                {typed}
                                <motion.span
                                    className="inline-block w-[2px] h-[1.2em] ml-[3px] align-middle"
                                    style={{background: accentColor}}
                                    animate={{opacity: [1, 0]}}
                                    transition={{duration: 0.6, repeat: Infinity}}
                                />
                            </p>

                            {capabilities[active]?.points && (
                                <div className="space-y-2">
                                    <p className="text-[0.68em] uppercase tracking-[0.15em] text-white/20 mb-3">Output:</p>
                                    {capabilities[active].points!.map((point, pi) => (
                                        <motion.div
                                            key={pi}
                                            initial={{opacity: 0, x: -12}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: pi * 0.1}}
                                            className="flex items-start gap-3 text-[0.78em] text-white/45"
                                        >
                                            <span style={{color: accentColor + '80'}}>→</span>
                                            <span>{point}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Status indicator */}
                <div className="mt-8 pt-6 border-t flex items-center gap-2 text-[0.68em] text-white/20"
                     style={{borderColor: accentColor + '15'}}>
                    <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{background: accentColor}}
                        animate={{opacity: [0.5, 1, 0.5]}}
                        transition={{duration: 1.5, repeat: Infinity}}
                    />
                    <span>Process executing • <span style={{color: accentColor}}>Status: Active</span></span>
                </div>
            </div>
        </motion.div>
    );
}

/*  -  -  -  Cards variant  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function CardsVariant({capabilities, accentColor}: { capabilities: Capability[]; accentColor: string }) {
    const [hovered, setHovered] = useState<string | null>(null);
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
                <motion.div
                    key={cap.id}
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: i * 0.08, duration: 0.5}}
                    onHoverStart={() => setHovered(cap.id)}
                    onHoverEnd={() => setHovered(null)}
                    className="relative rounded-2xl p-6 cursor-default group overflow-hidden"
                    style={{
                        background: hovered === cap.id
                            ? `linear-gradient(135deg, ${accentColor}10 0%, ${accentColor}05 100%)`
                            : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${hovered === cap.id ? accentColor + '50' : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: hovered === cap.id ? `inset 0 0 30px ${accentColor}08, 0 10px 30px ${accentColor}10` : 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    {/* Glow background */}
                    {hovered === cap.id && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            style={{background: `radial-gradient(circle at 50% 0%, ${accentColor}20, transparent 70%)`}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.3}}
                        />
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-5">
              <span
                  className="inline-block text-[0.7em] font-mono px-2.5 py-1 rounded-lg font-bold tracking-wider"
                  style={{background: accentColor + '18', color: accentColor}}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
                            <motion.div
                                className="w-10 h-10 rounded-full opacity-0"
                                style={{background: `radial-gradient(circle, ${accentColor}, transparent)`}}
                                animate={{opacity: hovered === cap.id ? 0.25 : 0}}
                                transition={{duration: 0.3}}
                            />
                        </div>

                        <h3 className="text-[1.15em] font-[700] text-white mb-3 tracking-tight">{cap.title}</h3>
                        <p className="text-[0.85em] text-white/55 leading-relaxed mb-4">{cap.description}</p>

                        {cap.points && (
                            <ul className="space-y-2">
                                {cap.points.slice(0, 3).map((point, idx) => (
                                    <motion.li
                                        key={point}
                                        className="text-[0.78em] text-white/45 flex items-start gap-2"
                                        initial={{opacity: 0, x: -8}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: idx * 0.05}}
                                    >
                                        <span style={{color: accentColor}} className="mt-1">·</span>
                                        <span>{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Bottom border glow on hover */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        animate={{
                            opacity: hovered === cap.id ? 1 : 0,
                            scaleX: hovered === cap.id ? 1 : 0
                        }}
                        style={{
                            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                            transformOrigin: 'left'
                        }}
                        transition={{duration: 0.4}}
                    />
                </motion.div>
            ))}
        </div>
    );
}

/*  -  -  -  Tabs variant  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
function TabsVariant({capabilities, accentColor}: { capabilities: Capability[]; accentColor: string }) {
    const [active, setActive] = useState(0);
    return (
        <div>
            {/* Tab list */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
                {capabilities.map((cap, i) => (
                    <button
                        key={cap.id}
                        onClick={() => setActive(i)}
                        className="relative px-5 py-2 rounded-full text-[0.8em] font-medium transition-all duration-200"
                        style={{
                            background: active === i ? accentColor : 'transparent',
                            color: active === i ? '#000' : 'rgba(255,255,255,0.4)',
                            border: `1px solid ${active === i ? accentColor : 'rgba(255,255,255,0.1)'}`,
                        }}
                    >
                        {cap.title}
                    </button>
                ))}
            </div>
            {/* Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{opacity: 0, y: 12}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -8}}
                    transition={{duration: 0.3}}
                    className="rounded-2xl p-8"
                    style={{background: accentColor + '08', border: `1px solid ${accentColor}22`}}
                >
                    <h3 className="text-[1.4em] font-bold text-white mb-4" style={{color: accentColor}}>
                        {capabilities[active].title}
                    </h3>
                    <p className="text-[0.9em] text-white/60 leading-relaxed mb-6">
                        {capabilities[active].description}
                    </p>
                    {capabilities[active].points && (
                        <div className="grid sm:grid-cols-2 gap-3">
                            {capabilities[active].points!.map((point, pi) => (
                                <motion.div
                                    key={pi}
                                    initial={{opacity: 0, x: -8}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: pi * 0.05}}
                                    className="flex items-start gap-3 text-[0.84em] text-white/60"
                                >
                                    <span
                                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[0.7em] font-bold"
                                        style={{background: accentColor + '20', color: accentColor}}>✓</span>
                                    {point}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/*  -  -  -  Main export  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  */
export default function ServiceCapabilities({
                                                heading = 'Strategic Capabilities',
                                                subheading = 'EXPERT SERVICES',
                                                accentColor = '#2dd4bf',
                                                capabilities,
                                                variant = 'terminal',
                                                ctaHref = '/contact',
                                                ctaLabel = 'Start Your Project',
                                                isDarkBg = true,
                                            }: ServiceCapabilitiesProps) {
    return (
        <section
            className="relative py-32 overflow-hidden"
            style={{background: isDarkBg ? '#050505' : '#fafafa'}}
        >
            {/* Enhanced background layers */}
            <FxBackground day={false} grid aurora className="opacity-20"/>
            <FxOrbit size={620} top="-200px" right="-220px" opacity={0.07} speed={35}/>
            <FxOrbit size={380} bottom="-150px" left="-160px" opacity={0.05} speed={28} reverse/>

            {/* Radial gradient overlay for depth */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, ${accentColor}30 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${accentColor}20 0%, transparent 50%)`,
                }}
            />

            <div className="relative max-w-[100em] mx-auto px-6 sm:px-10 lg:px-[4.6em]">
                {/* Premium section header */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5}}
                    className="mb-20"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full" style={{background: accentColor}}></div>
                        <span
                            className="text-xs font-bold uppercase tracking-[0.3em]"
                            style={{color: accentColor}}
                        >
              {subheading}
            </span>
                    </div>
                    <h2
                        className="text-[2.8em] sm:text-[3.5em] font-[800] leading-[1.15] max-w-3xl tracking-tight"
                        style={{color: isDarkBg ? '#ffffff' : '#111111'}}
                    >
                        {heading}
                    </h2>
                    <div className="mt-2 w-20 h-1.5 rounded-full" style={{background: accentColor, opacity: 0.6}}></div>
                </motion.div>

                {/* Variant content with enhanced styling */}
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{delay: 0.1}}
                >
                    {variant === 'terminal' && <TerminalVariant capabilities={capabilities} accentColor={accentColor}/>}
                    {variant === 'cards' && <CardsVariant capabilities={capabilities} accentColor={accentColor}/>}
                    {variant === 'tabs' && <TabsVariant capabilities={capabilities} accentColor={accentColor}/>}
                </motion.div>

                {/* Premium CTA section */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{delay: 0.2}}
                    className="mt-20 text-center"
                >
                    <Link href={ctaHref}>
                        <motion.button
                            whileHover={{scale: 1.05, y: -2}}
                            whileTap={{scale: 0.96}}
                            className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-[0.9em] font-bold overflow-hidden transition-all duration-300 shadow-lg"
                            style={{
                                background: accentColor,
                                color: '#000',
                                boxShadow: `0 12px 40px ${accentColor}40`
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.span
                                className="absolute inset-0 rounded-full"
                                style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'}}
                                animate={{x: ['-200%', '200%']}}
                                transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
                            />
                            <span className="relative flex items-center gap-2">
                {ctaLabel}
                                <span className="text-[1.1em]">→</span>
              </span>
                        </motion.button>
                    </Link>
                    <p className={`mt-5 text-[0.85em] tracking-wide ${isDarkBg ? 'text-gray-400' : 'text-gray-600'}`}>
                        Unlock strategic value with our expert team
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
