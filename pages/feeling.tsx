// typescript
import React, {useEffect, useRef, useState, useMemo} from 'react';
import '../app/globals.css';

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
};

type Phase = {
    days: string;
    title: string;
    tagline: string;
    color: string;
    accentColor: string;
    items: string[];
    icon: React.ReactNode;
};

const phases: Phase[] = [
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
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden>
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
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                <defs>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.8"/>
                    </linearGradient>
                </defs>
                <path
                    d="M50 15 L65 35 L85 35 L70 50 L75 70 L50 55 L25 70 L30 50 L15 35 L35 35 Z"
                    stroke="url(#g2)"
                    strokeWidth="3"
                    fill="none"
                />
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
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden>
                <defs>
                    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8"/>
                    </linearGradient>
                </defs>
                <path
                    d="M15 75 L30 60 L40 65 L55 45 L70 50 L85 25"
                    stroke="url(#g3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                />
                <circle cx="30" cy="60" r="4" fill="#34d399"/>
            </svg>
        )
    }
];

export default function GreyInfoTechProcess(): React.ReactElement {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    const getPhaseFromDay = (day: number): number => {
        if (day <= 30) return 0;
        if (day <= 60) return 1;
        return 2;
    };

    const activePhase = useMemo(() => getPhaseFromDay(currentDay), [currentDay]);
    const phase = phases[activePhase];

    const isDayTime = (now = new Date()): boolean => {
        const h = now.getHours();
        return h >= 6 && h < 18;
    };

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            setPointer({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };
        window.addEventListener('pointermove', onPointerMove, {passive: true});
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            setScrollProgress(Math.min((scrolled / maxScroll) * 100, 100));
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initParticles = (count = 60) => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const arr: Particle[] = new Array(count).fill(null).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2 + 1
            }));
            particlesRef.current = arr;
        };

        const resize = () => {
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initParticles(Math.round(Math.max(40, window.innerWidth / 30)));
        };

        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            const particles = particlesRef.current;

            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

                const color =
                    currentDay <= 30
                        ? 'rgba(34, 211, 238, 0.6)'
                        : currentDay <= 60
                            ? 'rgba(168, 85, 247, 0.6)'
                            : 'rgba(52, 211, 153, 0.6)';

                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
                grad.addColorStop(0, color);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 150) {
                        const alpha = Math.max(0, 0.18 - dist / 900);
                        ctx.strokeStyle = color.replace(/0\.6\)$/, `${alpha})`);
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [currentDay]);

    const startDayForPhase = (index: number) => index * 30 + 1;

    // day -> black background + white text; night -> white background + black text
    const isDay = isDayTime();
    const topLevelBgClass = isDay ? 'bg-black' : 'bg-white';
    const topLevelTextClass = isDay ? 'text-white' : 'text-black';

    return (
        <div className={`min-h-screen ${topLevelBgClass} ${topLevelTextClass} overflow-hidden relative`}>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0"/>

            <div
                className="fixed inset-0 opacity-10 z-0"
                style={{
                    transform: `translate(${pointer.x * 20}px, ${pointer.y * 20}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                <div className="absolute top-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-3xl"/>
                <div
                    className="absolute bottom-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl"/>
                <div
                    className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-3xl"/>
            </div>

            <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-500 transition-all duration-300"
                    style={{width: `${scrollProgress}%`}}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Hero */}
                <div className="text-center mb-20 space-y-6">
                    <h1
                        className={`text-6xl sm:text-7xl lg:text-8xl font-black mb-4 ${
                            isDay ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
                        } bg-clip-text text-transparent animate-gradient`}
                    >
                        90 DAYS
                    </h1>
                    <p className={`text-xl ${isDay ? 'text-gray-200' : 'text-gray-700'} max-w-3xl mx-auto leading-relaxed`}>
                        Grey InfoTech&apos;s process transforming businesses into digital powerhouses.
                    </p>

                    <div className="flex justify-center items-center gap-4 pt-8">
                        {phases.map((p: Phase, i: number) => (
                            <button
                                key={i}
                                onClick={() => setCurrentDay(startDayForPhase(i))}
                                className={`group relative transition-all duration-500 ${activePhase === i ? 'scale-110' : 'scale-100 opacity-50'}`}
                                aria-label={`Select phase ${i + 1}`}
                            >
                                <div
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${p.color} p-0.5 transition-all duration-500 ${activePhase === i ? 'rotate-0' : 'rotate-45'}`}
                                >
                                    <div
                                        className="w-full h-full bg-white dark:bg-black rounded-2xl flex items-center justify-center">
                                        <span className="text-sm font-bold">{p.days.split('-')[0]}</span>
                                    </div>
                                </div>
                                {activePhase === i && (
                                    <div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping"/>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 lg:order-1 flex justify-center">
                        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                            <div
                                className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} opacity-20 animate-spin-slow`}/>
                            <div
                                className={`absolute inset-8 rounded-full bg-gradient-to-br ${phase.color} p-1 animate-pulse-slow`}>
                                <div
                                    className="w-full h-full bg-white dark:bg-black rounded-full flex items-center justify-center p-12">{phase.icon}</div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-8">
                        <div>
                            <div
                                className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${phase.color} text-white font-bold text-sm mb-4`}>DAYS {phase.days}</div>
                            <h3 className="text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{phase.title}</h3>
                            <p className={`text-2xl font-light bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>{phase.tagline}</p>
                        </div>

                        <div className="space-y-4">
                            {phase.items.map((item: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300"
                                >
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center text-sm font-bold`}>{idx + 1}</div>
                                    <p className="text-gray-300 group-hover:text-white transition-colors">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="relative group">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"/>
                    <div
                        className="relative bg-gradient-to-r from-gray-900 to-black rounded-3xl p-12 border border-gray-800 text-center">
                        <h3 className="text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Ready
                            to Launch?</h3>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Join the elite companies that trust
                            Grey InfoTech to revolutionize their digital presence</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setIsPlaying((s) => !s)}
                                    className="px-6 py-3 rounded-full bg-white text-black font-bold">
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>
                            <button onClick={() => setCurrentDay(1)}
                                    className="px-6 py-3 rounded-full border border-gray-700">
                                Reset Day
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                                @keyframes blob { 0%,100%{transform:translate(0,0) scale(1);}25%{transform:translate(20px,-50px) scale(1.1);}50%{transform:translate(-20px,20px) scale(0.9);}75%{transform:translate(50px,50px) scale(1.05);} }
                                @keyframes gradient { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
                                @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                                @keyframes spin-reverse { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
                                @keyframes pulse-slow { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.8;transform:scale(1.05)} }
                                .animate-blob { animation: blob 7s infinite; }
                                .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; }
                                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                                .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
                                .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                              `}</style>
        </div>
    );
}