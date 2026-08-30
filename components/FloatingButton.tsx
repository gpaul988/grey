'use client';

import React, { useEffect, useState, useRef } from 'react';
import QuoteRequest from "@/components/QuoteRequest";

type FloatingButtonProps = {
    className?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ className }) => {
    const [isDark, setIsDark] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mouseInButton, setMouseInButton] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const prevOverflowRef = useRef<string | null>(null);

    // Helper function to determine text brightness
    function getTextBrightness(color: string): number {
        const match = color.match(/\d+/g);
        if (!match || match.length < 3) return 255;
        const [r, g, b] = match.map(Number);
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    // Manage body overflow when modal opens/closes
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isModalOpen) {
            if (prevOverflowRef.current === null) prevOverflowRef.current = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        }

        return () => {
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        };
    }, [isModalOpen]);

    // Observe section background colors for button contrast adjustment
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("section"));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.isIntersecting) {
                    const el = visible.target as HTMLElement;
                    const computedStyle = window.getComputedStyle(el);
                    const textColor = computedStyle.color;

                    const brightness = getTextBrightness(textColor);
                    setIsDark(brightness < 128);
                }
            },
            {
                root: null,
                threshold: 0.6,
            }
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Track mouse position for gradient effect
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setMouseInButton(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMouseInButton(false);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Determine button styling based on background with enhanced gradients
    const buttonBaseClasses = isDark
        ? 'bg-gradient-to-br from-cyan-500/25 via-teal-500/15 to-cyan-600/20 border-cyan-400/60 text-cyan-50 hover:text-cyan-100 hover:border-cyan-300/90 shadow-lg shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-400/40'
        : 'bg-gradient-to-br from-slate-900/85 via-slate-800/75 to-slate-900/85 border-slate-700/70 text-slate-100 hover:text-white hover:border-slate-600/90 shadow-lg shadow-slate-900/40 hover:shadow-2xl hover:shadow-slate-800/50';

    // Enhanced multi-layer glow effect
    const glowClasses = isHovered
        ? isDark
            ? 'after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-2xl after:bg-gradient-to-br after:from-cyan-400/50 after:to-teal-400/30 after:opacity-100 before:z-10'
            : 'after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-2xl after:bg-gradient-to-br after:from-slate-700/60 after:to-slate-600/40 after:opacity-100'
        : isDark
            ? 'after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-xl after:bg-gradient-to-br after:from-cyan-500/25 after:to-teal-500/15 after:opacity-70'
            : 'after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-xl after:bg-gradient-to-br after:from-slate-600/35 after:to-slate-700/25 after:opacity-70';

    return (
        <>
            {/* Floating Action Button - Premium Futuristic Design */}
            <button
                ref={buttonRef}
                onClick={() => { try{ fetch('/api/_debug/log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'floating_request_click', path: typeof window !== 'undefined' ? window.location.pathname : null, ts: new Date().toISOString() }) }).catch(()=>{}); } catch{} handleOpenModal(); }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                data-request-quote-floating-button="true"
                className={`
                    ${className ?? ''} 
                    ${glowClasses}
                    rounded-full text-[1em] flex font-semibold 
                    py-[0.7em] px-[1.2em] border-2 transition-all duration-300 
                    text-white backdrop-blur-lg
                    fixed bottom-8 right-8 z-[140] 
                    shadow-2xl group items-center justify-center gap-2
                    overflow-hidden
                    before:absolute before:inset-0 before:rounded-full before:border-2 
                    before:border-transparent before:bg-gradient-to-r 
                    before:from-transparent before:via-white/15 before:to-transparent
                    before:translate-x-[-100%] hover:before:translate-x-[100%]
                    before:transition-transform before:duration-[800ms]
                    before:pointer-events-none
                    ${buttonBaseClasses}
                    hover:backdrop-blur-xl
                    hover:scale-110 hover:-translate-y-2
                    active:scale-95 active:-translate-y-0
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${isDark ? 'focus:ring-cyan-400/60 focus:ring-offset-slate-900/40' : 'focus:ring-slate-500/60 focus:ring-offset-white/40'}
                    transform-gpu
                `}
                aria-label="Request a quote for your project - Premium Enterprise Solutions"
            >
                {/* Animated background layers */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-tr from-cyan-600/10 via-transparent to-teal-600/10' : 'bg-gradient-to-tr from-slate-800/15 via-transparent to-slate-700/15'}`} />
                </div>

                {/* Icon wrapper with advanced animations */}
                <div className="relative flex items-center justify-center w-6 h-6 z-10">
                    {/* Animated pulse rings */}
                    <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-cyan-400/0 group-hover:bg-cyan-400/20' : 'bg-slate-600/0 group-hover:bg-slate-600/15'} transition-all duration-500`} />
                    
                    {/* Arrow icon with smooth animation */}
                    <svg
                        className="w-6 h-6 transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>

                {/* Text with advanced gradient effect */}
                <span className={`text-[0.95em] font-bold tracking-widest relative z-10 transition-all duration-300 ${isDark ? 'bg-gradient-to-r from-cyan-100 via-teal-100 to-cyan-50 bg-clip-text text-transparent group-hover:from-cyan-50 group-hover:via-teal-50 group-hover:to-cyan-100' : 'bg-gradient-to-r from-slate-50 via-white to-slate-100 bg-clip-text text-transparent group-hover:from-white group-hover:via-slate-50 group-hover:to-white'}`}>
                    REQUEST
                </span>

                {/* Premium shimmer sweep effect */}
                <div className={`absolute top-0 -left-full w-full h-full transition-all duration-[900ms] group-hover:left-full pointer-events-none ${isDark ? 'bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent' : 'bg-gradient-to-r from-transparent via-white/30 to-transparent'}`} />

                {/* Floating particles effect on hover */}
                {isHovered && (
                    <>
                        <div className={`absolute top-2 left-2 w-1 h-1 rounded-full ${isDark ? 'bg-cyan-300/60' : 'bg-slate-300/50'} animate-float-particle-1`} />
                        <div className={`absolute top-1 right-3 w-0.5 h-0.5 rounded-full ${isDark ? 'bg-teal-300/50' : 'bg-slate-400/40'} animate-float-particle-2`} />
                        <div className={`absolute bottom-2 right-2 w-1 h-1 rounded-full ${isDark ? 'bg-cyan-400/50' : 'bg-slate-300/40'} animate-float-particle-3`} />
                    </>
                )}
            </button>

            {/* Advanced Modal System - Premium Enterprise Design */}
            {isModalOpen && (
                <div
                    className={`
                        fixed inset-0 z-50 flex items-center justify-center p-4
                        transition-all duration-300 ease-out
                        ${isDark ? 'bg-black/75 backdrop-blur-2xl' : 'bg-white/75 backdrop-blur-2xl'}
                        animate-fade-in
                    `}
                    onClick={handleCloseModal}
                    role="presentation"
                >
                    {/* Animated background orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-cyan-500/20' : 'bg-slate-400/10'} animate-float-slow-1`} />
                        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-30 ${isDark ? 'bg-teal-500/20' : 'bg-slate-400/10'} animate-float-slow-2`} />
                    </div>

                    {/* Premium Modal Container */}
                    <div
                        className={`
                            relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
                            rounded-3xl
                            ${isDark
                                ? 'bg-gradient-to-br from-slate-900/98 via-slate-850/95 to-slate-900/98 border border-cyan-400/40 shadow-2xl shadow-cyan-600/30'
                                : 'bg-gradient-to-br from-white/98 via-slate-50/95 to-white/98 border border-slate-300/60 shadow-2xl shadow-slate-700/30'
                            }
                            backdrop-blur-xl
                            transform transition-all duration-300
                            animate-slide-up
                            overflow-hidden
                        `}
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Quote request form - Premium Enterprise Solutions"
                    >
                        {/* Decorative top border glow */}
                        <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${isDark ? 'via-cyan-400/50 to-transparent' : 'via-slate-400/30 to-transparent'}`} />

                        {/* Close Button - Premium Circular Design */}
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className={`
                                absolute top-8 right-8 z-10
                                w-12 h-12 rounded-full
                                transition-all duration-300
                                backdrop-blur-lg
                                border-2 border-current/40
                                flex items-center justify-center
                                hover:scale-125 hover:rotate-90
                                group/close
                                ${isDark
                                    ? 'text-cyan-300 hover:text-cyan-100 bg-gradient-to-br from-slate-800/60 to-slate-800/40 hover:from-slate-700/80 hover:to-slate-700/60 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40'
                                    : 'text-slate-700 hover:text-slate-900 bg-gradient-to-br from-slate-200/70 to-slate-100/50 hover:from-slate-300/90 hover:to-slate-200/70 shadow-lg shadow-slate-600/20'
                                }
                            `}
                            aria-label="Close quote request modal"
                        >
                            {/* X Icon with smooth animation */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 transition-all duration-300 group-hover/close:scale-110"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Premium Modal Header with gradient */}
                        <div className={`
                            relative px-10 py-12 border-b backdrop-blur-sm
                            ${isDark
                                ? 'border-cyan-400/25 bg-gradient-to-b from-slate-800/70 via-slate-800/40 to-transparent'
                                : 'border-slate-300/40 bg-gradient-to-b from-slate-100/70 via-slate-100/40 to-transparent'
                            }
                        `}>
                            {/* Decorative accent line */}
                            <div className={`absolute left-0 top-0 h-1 bg-gradient-to-r ${isDark ? 'from-cyan-500 via-teal-500 to-transparent' : 'from-slate-700 via-slate-600 to-transparent'} w-24`} />

                            <div className={`inline-block px-4 py-1.5 rounded-full mb-4 ${isDark ? 'bg-cyan-500/20 border border-cyan-400/50' : 'bg-slate-200/50 border border-slate-400/50'}`}>
                                <span className={`text-xs font-bold tracking-widest uppercase ${isDark ? 'text-cyan-300' : 'text-slate-700'}`}>
                                    Project Consultation
                                </span>
                            </div>

                            <h2 className={`
                                text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3
                                ${isDark
                                    ? 'bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-200 bg-clip-text text-transparent'
                                    : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent'
                                }
                            `}>
                                Let's Build Your
                                <span className={`block mt-1 ${isDark ? 'text-teal-400' : 'text-slate-700'}`}>
                                    Digital Future
                                </span>
                            </h2>
                            <p className={`
                                text-base mt-4 font-medium tracking-wide max-w-2xl
                                ${isDark ? 'text-cyan-200/80' : 'text-slate-600/90'}
                            `}>
                                Transform your vision into cutting-edge enterprise solutions. Our experts are ready to deliver premium, scalable digital products tailored to your goals.
                            </p>
                        </div>

                        {/* Premium Modal Body with spacing */}
                        <div className="px-10 py-12">
                            <QuoteRequest />
                        </div>

                        {/* Premium Modal Footer Effects */}
                        <div className={`
                            relative h-24 bg-gradient-to-t 
                            ${isDark ? 'from-slate-900/50 to-transparent' : 'from-slate-50/50 to-transparent'}
                            border-t
                            ${isDark ? 'border-cyan-400/20' : 'border-slate-300/30'}
                            backdrop-blur-sm
                            pointer-events-none
                        `}>
                            {/* Floating accent elements */}
                            <div className={`absolute bottom-4 left-10 text-xs font-semibold tracking-widest uppercase ${isDark ? 'text-cyan-400/50' : 'text-slate-600/50'}`}>
                                Trusted by 50+ Enterprise Clients
                            </div>
                            <div className={`absolute bottom-4 right-10 flex gap-2`}>
                                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-cyan-400/60' : 'bg-slate-600/40'} animate-pulse`} />
                                <span className={`text-xs font-medium ${isDark ? 'text-cyan-300/70' : 'text-slate-600/70'}`}>Available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium CSS Animations Suite */}
            <style jsx>{`
                /* Fade-in animation for modal backdrop */
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        backdrop-filter: blur(0px);
                    }
                    to {
                        opacity: 1;
                        backdrop-filter: blur(32px);
                    }
                }

                /* Slide-up with scale and rotation for modal entrance */
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.90) rotateX(10deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1) rotateX(0deg);
                    }
                }

                /* Smooth float animations for particles */
                @keyframes float-particle-1 {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-12px) translateX(8px);
                        opacity: 1;
                    }
                }

                @keyframes float-particle-2 {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-15px) translateX(-6px);
                        opacity: 0.8;
                    }
                }

                @keyframes float-particle-3 {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-10px) translateX(10px);
                        opacity: 0.9;
                    }
                }

                /* Slow floating background orbs */
                @keyframes float-slow-1 {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(20px) translateX(-20px);
                    }
                }

                @keyframes float-slow-2 {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                    }
                    50% {
                        transform: translateY(-20px) translateX(20px);
                    }
                }

                /* Animation classes */
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }

                .animate-slide-up {
                    animation: slide-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                .animate-float-particle-1 {
                    animation: float-particle-1 1.2s ease-in-out infinite;
                }

                .animate-float-particle-2 {
                    animation: float-particle-2 1.4s ease-in-out infinite;
                }

                .animate-float-particle-3 {
                    animation: float-particle-3 1.3s ease-in-out infinite;
                }

                .animate-float-slow-1 {
                    animation: float-slow-1 8s ease-in-out infinite;
                }

                .animate-float-slow-2 {
                    animation: float-slow-2 10s ease-in-out infinite;
                }

                /* High performance GPU acceleration */
                .transform-gpu {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    perspective: 1000px;
                }
            `}</style>
        </>
    );
};

export default FloatingButton;