'use client';

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {useIsDayTime} from '../useIsDayTime';

type Particle = { x: number; y: number; vx: number; vy: number; size: number };

const phases = [
    {
        days: '1-30',
        title: 'Discovery & Strategy',
        tagline: 'Understanding Your Universe',
        color: 'from-cyan-400 via-blue-500 to-indigo-600',
        accentColor: 'bg-cyan-500',
        items: [
            'Deep-dive business intelligence gathering',
            'Competitive landscape mapping',
            'Audience psychographic profiling',
            'Strategic KPI framework design',
            'Omnichannel blueprint creation'
        ],
        icon: (
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.8"/>
                    </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="35" stroke="url(#g1)" strokeWidth="2" fill="none" opacity="0.3"/>
                <circle cx="50" cy="50" r="25" stroke="url(#g1)" strokeWidth="3" fill="none"/>
                <path d="M50 25 L50 50 L70 40" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="5" fill="url(#g1)"/>
            </svg>
        )
    },
    {
        days: '31-60',
        title: 'Implementation & Launch',
        tagline: 'Igniting Your Growth Engine',
        color: 'from-purple-400 via-pink-500 to-rose-600',
        accentColor: 'bg-purple-500',
        items: [
            'Multi-channel campaign orchestration',
            'AI-powered content generation',
            'Precision audience targeting',
            'Real-time performance tracking',
            'Agile optimization protocols'
        ],
        icon: (
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <defs>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8"/>
                    </linearGradient>
                </defs>
                <path d="M50 15 L65 35 L85 35 L70 50 L75 70 L50 55 L25 70 L30 50 L15 35 L35 35 Z" stroke="url(#g2)" strokeWidth="3" fill="none"/>
                <circle cx="50" cy="50" r="12" fill="url(#g2)"/>
            </svg>
        )
    },
    {
        days: '61-90',
        title: 'Optimization & Scale',
        tagline: 'Amplifying Your Success',
        color: 'from-emerald-400 via-teal-500 to-cyan-600',
        accentColor: 'bg-emerald-500',
        items: [
            'Advanced analytics deep-dive',
            'Machine learning optimization',
            'Revenue acceleration strategies',
            'Exponential growth scaling',
            'Future-ready roadmap development'
        ],
        icon: (
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <defs>
                    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                    </linearGradient>
                </defs>
                <path d="M15 75 L30 60 L40 65 L55 45 L70 50 L85 25" stroke="url(#g3)" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <circle cx="30" cy="60" r="4" fill="#34d399"/>
            </svg>
        )
    }
];

export default function Process90({ totalDays = 90, phasesOverride }: { totalDays?: number; phasesOverride?: any[] } = {}) {
    const isDayTime = useIsDayTime();
    const [activePhase, setActivePhase] = useState<number>(0);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const currentDayRef = useRef<number>(1);

    // Dynamic phase computation (allow services to override phases or totalDays)
    const phaseSource = phasesOverride && phasesOverride.length ? phasesOverride : phases;
    const phaseCount = phaseSource.length;
    // distribute totalDays across phases evenly, give earlier phases the remainder
    const base = Math.floor(totalDays / phaseCount);
    const remainder = totalDays - base * phaseCount;
    const phaseLengths: number[] = new Array(phaseCount).fill(0).map((_, i) => base + (i < remainder ? 1 : 0));
    const cumulativeEnds: number[] = phaseLengths.map((_, i) => phaseLengths.slice(0, i + 1).reduce((a, b) => a + b, 0));
    const daysRanges: string[] = cumulativeEnds.map((end, i) => `${(i === 0 ? 1 : cumulativeEnds[i - 1] + 1)}-${end}`);
    const effectivePhases = phaseSource.map((p: any, i: number) => ({ ...p, days: daysRanges[i] }));


    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            setPointer({ x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1});
        };
        window.addEventListener('pointermove', onPointerMove, {passive: true});
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setCurrentDay((d) => (d >= 90 ? 1 : d + 1));
            }, 150);
        } else if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isPlaying]);

    const getPhaseFromDay = (day: number) => {
        for (let i = 0; i < cumulativeEnds.length; i++) {
            if (day <= cumulativeEnds[i]) return i;
        }
        return Math.max(0, cumulativeEnds.length - 1);
    };

    useEffect(() => { currentDayRef.current = currentDay; }, [currentDay]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const host = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        if (!ctx || !host) return;
        const dpr = Math.max(1, window.devicePixelRatio || 1);

        const initParticles = (count: number, w: number, h: number) => {
            const arr: Particle[] = new Array(count).fill(null).map(() => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, size: Math.random() * 2 + 1 }));
            particlesRef.current = arr;
        };

        let lastW = 0;
        const resize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (Math.abs(w - lastW) > 2 || particlesRef.current.length === 0) {
                lastW = w;
                initParticles(Math.round(Math.min(90, Math.max(40, w / 30))), w, h);
            }
        };

        resize();
        window.addEventListener('resize', resize);
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        observer?.observe(host);

        const palette = isDayTime ? ['rgba(8, 145, 178, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(5, 150, 105, 0.6)'] : ['rgba(34, 211, 238, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(52, 211, 153, 0.6)'];

        const animate = () => {
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            const particles = particlesRef.current;
            ctx.fillStyle = isDayTime ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, width, height);
            const day = currentDayRef.current;
            const color = palette[day <= 30 ? 0 : day <= 60 ? 1 : 2];

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
                grad.addColorStop(0, color);
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x; const dy = p.y - p2.y; const dist = Math.hypot(dx, dy);
                    if (dist < 150) {
                        const alpha = Math.max(0, 0.18 - dist / 900);
                        ctx.strokeStyle = color.replace(/0\.6\)$/, `${alpha})`);
                        ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); observer?.disconnect(); };
    }, [isDayTime]);

    useEffect(() => { setActivePhase(getPhaseFromDay(currentDay)); }, [currentDay]);
    const phase = effectivePhases[activePhase];

    return (
        <div className={`relative overflow-hidden lg:pt-[4em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[2em] pb-[1em] transition-colors duration-700 ${isDayTime ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100' : 'bg-gradient-to-b from-black via-gray-950 to-black'}`}>
            <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none z-0 ${isDayTime ? 'opacity-70' : 'opacity-90'}`}/>
            <div aria-hidden className={`absolute inset-0 z-0 pointer-events-none ${isDayTime ? 'opacity-[0.14]' : 'opacity-10'}`} style={{ transform: `translate(${pointer.x * 20}px, ${pointer.y * 20}px)`, transition: 'transform 0.3s ease-out' }}>
                <div className="absolute top-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-3xl"/>
                <div className="absolute bottom-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-3xl"/>
            </div>
            <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px)`, backgroundSize: '44px 44px', maskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)' }} />
            <div aria-hidden className="absolute inset-0 z-0 pointer-events-none"><div className={`dm-scanline absolute left-0 right-0 h-px ${isDayTime ? "bg-gradient-to-r from-transparent via-[rgba(13,148,136,0.45)] to-transparent" : "bg-gradient-to-r from-transparent via-[rgba(0,245,212,0.55)] to-transparent"}`}/></div>

            <div id={'Our-proven-90-Day-Process'} className={`relative z-10 lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div className={`relative ${isDayTime ? 'text-gray-900' : 'text-white'} text-center mb-12 md:mb-20 lg:mb-20 border-b ${isDayTime ? 'border-gray-200' : 'border-gray-700'} pb-[2em] space-y-6`}>
                    <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-sm font-mono text-[0.65em] font-[600] tracking-[0.35em] uppercase ${isDayTime ? 'border-teal-600/30 bg-teal-500/5 text-teal-700' : 'border-[#00f5d4]/30 bg-[#00f5d4]/5 text-[#00f5d4]'}`}>
                        <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/><span className={`relative inline-flex rounded-full h-2 w-2 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/></span>
                        Mission Protocol
                    </div>
                    <h2 className={'capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'}>Our Proven <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient ${isDayTime ? 'from-teal-600 via-cyan-600 to-violet-600' : 'from-[#00f5d4] via-cyan-400 to-violet-400'}`}>90-Day Process</span></h2>
                    <p className={`text-[0.9em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5] mx-auto max-w-6xl ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>Our structured 90-day implementation process delivers measurable results through strategic planning, precise execution, and continuous optimization. This proven methodology accelerates time-to-value while ensuring alignment with your business objectives at every phase. By combining industry best practices with agile responsiveness, we transform initial engagement into tangible outcomes, building momentum that sustains long-term success and competitive performance.</p>
                    <div className="flex justify-center items-center gap-4 pt-8">{effectivePhases.map((p: any, i: number) => (
                        <button key={i} onClick={() => setActivePhase(i)} className={`group relative transition-all duration-500 ${activePhase === i ? 'scale-110' : 'scale-100 opacity-70'}`} aria-label={`Select phase ${i + 1}`}>
                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${p.color} p-0.5 transition-all duration-500 ${activePhase === i ? 'rotate-0 shadow-lg shadow-cyan-500/20' : 'rotate-45'}`}>
                                <div className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-2xl flex items-center justify-center transition-colors duration-500`}><span className={`text-sm font-bold font-mono transition-transform duration-500 ${activePhase === i ? 'rotate-0' : '-rotate-45'} ${isDayTime ? 'text-gray-900' : 'text-white'}`}>{p.days.split('-')[0]}</span></div>
                            </div>
                            {activePhase === i && <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 ${isDayTime ? 'bg-gray-900' : 'bg-white'} rounded-full animate-ping`}/>} 
                        </button>
                    ))}</div>

                    <div className={`relative max-w-3xl mx-auto text-left rounded-2xl border backdrop-blur-md px-6 py-5 ${isDayTime ? 'border-gray-200 bg-white/70 shadow-sm' : 'border-gray-800 bg-gray-900/40'}`}>
                        <span aria-hidden className={`absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 rounded-tl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                        <span aria-hidden className={`absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 rounded-tr-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                        <span aria-hidden className={`absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 rounded-bl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                        <span aria-hidden className={`absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 rounded-br-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                        <div className={`flex items-center justify-between font-mono text-[0.65em] tracking-[0.25em] uppercase mb-3 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}><span>Mission Timeline</span><span className={isDayTime ? 'text-teal-700' : 'text-[#00f5d4]'}>Day {String(currentDay).padStart(2, '0')} / {totalDays}</span></div>
                        <div className={`relative h-2 rounded-full overflow-hidden ${isDayTime ? 'bg-gray-200' : 'bg-gray-800'}`}><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-500 transition-all duration-300" style={{width: `${(currentDay / 90) * 100}%`}}/></div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-4"><div className={`flex gap-4 font-mono text-[0.6em] tracking-[0.2em] uppercase ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}><span className={activePhase === 0 ? (isDayTime ? 'text-cyan-700' : 'text-cyan-400') : ''}>01 Discover</span><span className={activePhase === 1 ? (isDayTime ? 'text-purple-700' : 'text-purple-400') : ''}>02 Launch</span><span className={activePhase === 2 ? (isDayTime ? 'text-emerald-700' : 'text-emerald-400') : ''}>03 Scale</span></div>
                            <div className="flex gap-2"><button onClick={() => setIsPlaying((s) => !s)} className={`px-4 py-1.5 rounded-full font-mono text-[0.65em] font-[700] tracking-[0.2em] uppercase transition-colors ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-100'} transition-colors`}>{isPlaying ? 'Pause' : 'Play'}</button><button onClick={() => { setIsPlaying(false); setCurrentDay(1); }} className={`px-4 py-1.5 rounded-full border font-mono text-[0.65em] font-[700] tracking-[0.2em] uppercase transition-colors ${isDayTime ? 'border-gray-300 text-gray-600 hover:border-gray-500' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}>Reset</button></div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20"><div className="order-2 lg:order-1 flex justify-center"><div className="relative w-80 h-80 sm:w-96 sm:h-96"><div className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} blur-3xl transition-opacity duration-700 ${isDayTime ? 'opacity-20' : 'opacity-25'}`}/><div className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} ${isDayTime ? 'opacity-30' : 'opacity-20'} animate-spin-slow`}/><div className={`absolute inset-4 rounded-full border border-dashed animate-spin-reverse ${isDayTime ? 'border-gray-300' : 'border-gray-700'}`}/><div className="absolute inset-0 animate-spin-slow"><span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${phase.accentColor} shadow-lg`}/></div><div className={`absolute inset-8 rounded-full bg-gradient-to-br ${phase.color} p-1 animate-pulse-slow`}><div className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full flex items-center justify-center p-12 transition-colors duration-700`}>{phase.icon}</div></div></div></div>

                <div className="order-1 lg:order-2 space-y-8"><div><div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${phase.color} text-white font-mono font-bold text-sm tracking-[0.2em] uppercase mb-4 shadow-lg`}>Days {phase.days}</div><h3 className={`text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r ${isDayTime ? 'from-gray-900 to-gray-600' : 'from-white to-gray-400'} bg-clip-text text-transparent`}>{phase.title}</h3><p className={`text-2xl font-light bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>{phase.tagline}</p></div>

                <div className="space-y-4">{phase.items.map((item, idx) => (<div key={idx} className={`group flex items-start gap-4 p-4 rounded-2xl ${isDayTime ? 'bg-white/70 border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md' : 'bg-gray-900/50 border-gray-800 hover:border-gray-600'} backdrop-blur-sm border transition-all duration-300`}><div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center text-sm font-bold text-white`}>{idx + 1}</div><p className={`${isDayTime ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'} transition-colors`}>{item}</p></div>))}</div></div></div>

                <div className="relative group"><div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl transition-opacity ${isDayTime ? 'opacity-20 group-hover:opacity-40' : 'opacity-30 group-hover:opacity-50'}`}/><div className={`relative overflow-hidden ${isDayTime ? 'bg-white/80 backdrop-blur-md border-gray-200' : 'bg-gradient-to-r from-gray-900 to-black border-gray-800'} rounded-3xl p-12 border text-center`}><span aria-hidden className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/><span aria-hidden className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/><span aria-hidden className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/><span aria-hidden className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/><h3 className={`text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r ${isDayTime ? 'from-gray-900 via-gray-700 to-gray-500' : 'from-white via-gray-200 to-gray-400'} bg-clip-text text-transparent`}>Ready to Launch?</h3><p className={`text-xl ${isDayTime ? 'text-gray-500' : 'text-gray-400'} mb-8 max-w-2xl mx-auto`}>Join the elite companies that trust Grey InfoTech to revolutionize their digital presence</p><div className="flex flex-wrap justify-center gap-4"><Link href="/contact" className={`px-8 py-3 rounded-full font-bold ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'} transition-colors`}>Start Your 90 Days</Link><Link href="/portfolio" className={`px-8 py-3 rounded-full border font-bold ${isDayTime ? 'border-gray-300 text-gray-700 hover:border-gray-500' : 'border-gray-700 text-gray-300 hover:border-gray-500'} transition-colors`}>View Our Work</Link></div></div></div>

            </div>

            <style>{`@keyframes blob { 0%,100%{transform:translate(0,0) scale(1);}25%{transform:translate(20px,-50px) scale(1.1);}50%{transform:translate(-20px,20px) scale(0.9);}75%{transform:translate(50px,50px) scale(1.05);} }@keyframes gradient { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }@keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }@keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }@keyframes pulse-slow { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.8;transform:scale(1.05)} }@keyframes dm-scan { 0%{top:-5%} 100%{top:105%} } .dm-scanline { animation: dm-scan 8s linear infinite; } .animate-blob { animation: blob 7s infinite; } .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; } .animate-spin-slow { animation: spin-slow 20s linear infinite; } .animate-spin-reverse { animation: spin-reverse 15s linear infinite; } .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }`}</style>

        </div>
    );
}
