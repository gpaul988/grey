'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

const tabs = [
    {key: "frameworks", label: "Frameworks"},
    {key: "cloud", label: "Cloud"},
    {key: "frontend", label: "Frontend"},
    {key: "backend & database", label: "Backend & Database"},
    {key: "others", label: "Others"}
];

const data: Record<string, { name: string; logo: string }[]> = {
    frameworks: [
        {name: "React Native", logo: "/assets/cross/logos/react_native.svg"},
        {name: "Ionic", logo: "/assets/cross/logos/ionic.svg"},
        {name: "Xamarin", logo: "/assets/cross/logos/xamarin.svg"},
        {name: "Flutter", logo: "/assets/cross/logos/flutter.svg"},
        {name: "Kotlin", logo: "/assets/cross/logos/kotlin.svg"},
        {name: "Cordova", logo: "/assets/cross/logos/cordova.svg"},
    ],
    cloud: [
        {name: "AWS", logo: "/assets/cross/logos/aws.svg"},
        {name: "Microsoft Azure", logo: "/assets/cross/logos/microsoft.svg"},
        {name: "Google Cloud Platform", logo: "/assets/cross/logos/google.svg"},
    ],
    frontend: [
        {name: "Angular.js", logo: "/assets/cms/logos/angular.svg"},
        {name: "Bootstrap", logo: "/assets/cms/logos/bootstrap.svg"},
        {name: "React.js", logo: "/assets/cms/logos/react.svg"},
        {name: "Vue.js", logo: "/assets/cms/logos/vue.svg"},
        {name: "JQuery", logo: "/assets/cross/logos/jquery.svg"},
        {name: "WPF", logo: "/assets/cross/logos/wpf.svg"},
    ],
    "backend & database": [
        {name: "Django", logo: "/assets/cms/logos/django.svg"},
        {name: "Laravel", logo: "/assets/cms/logos/laravel.svg"},
        {name: "MongoDB", logo: "/assets/cms/logos/mongodb.svg"},
        {name: "MySQL", logo: "/assets/cms/logos/mysql.svg"},
        {name: "Flask", logo: "/assets/cross/logos/flask.svg"},
        {name: "SQL Server", logo: "/assets/cross/logos/sql-server.svg"},
        {name: "Maria DB", logo: "/assets/cross/logos/mariadb.svg"},
    ],
    others: [
        {name: "Android Studio", logo: "/assets/cross/logos/android-studio.svg"},
        {name: "Visual Studio", logo: "/assets/cross/logos/visual-studio.svg"},
        {name: "Netbeans", logo: "/assets/cross/logos/netbeans.svg"},
        {name: "AWS", logo: "/assets/cross/logos/aws.svg"},
        {name: "Docker", logo: "/assets/cross/logos/docker.svg"},
        {name: "Azure", logo: "/assets/cross/logos/azure.svg"},
        {name: "Google Cloud", logo: "/assets/cross/logos/google-cloud.svg"},
    ],
};

// process
type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
};

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
                <path d="M50 15 L65 35 L85 35 L70 50 L75 70 L50 55 L25 70 L30 50 L15 35 L35 35 Z" stroke="url(#g2)"
                      strokeWidth="3" fill="none"/>
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
                <path d="M15 75 L30 60 L40 65 L55 45 L70 50 L85 25" stroke="url(#g3)" strokeWidth="3"
                      strokeLinecap="round" fill="none"/>
                <circle cx="30" cy="60" r="4" fill="#34d399"/>
            </svg>
        )
    }
];

const DigitalMarketing = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeFront, setActiveFront] = useState("frontend");


    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200); // Show the button after scrolling 200px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDaytime react hook
    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });

// Optional: if you want the value to update over time, use an interval (does not set state synchronously on mount)
    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime(prev => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000); // check every minute

        return () => clearInterval(id);
    }, []);

    // Introductory section hook
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.1 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Development Services hook
    const handleScroll = () => {
        const sections = [
            "SEO",
            "PPCA",
            "SMM",
            "CM",
            "EM",
            "CRO",
            "ORM",
            "ADI"
        ];

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveId(sectionId);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target); // Ensure the arrow icon is displayed when a section is clicked
        }
    }

    // Details
    const statis: { icon: React.ReactNode; number: string; label: string }[] = [
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Gear */}
                    <circle cx="35" cy="35" r="18" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="35" cy="35" r="12" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Gear teeth */}
                    <rect x="33" y="15" width="4" height="6" fill="#10e3e3"/>
                    <rect x="33" y="54" width="4" height="6" fill="#10e3e3"/>
                    <rect x="54" y="33" width="6" height="4" fill="#10e3e3"/>
                    <rect x="15" y="33" width="6" height="4" fill="#10e3e3"/>
                    <rect x="49" y="20" width="5" height="5" transform="rotate(45 51.5 22.5)" fill="#10e3e3"/>
                    <rect x="20" y="20" width="5" height="5" transform="rotate(45 22.5 22.5)" fill="#10e3e3"/>
                    <rect x="49" y="49" width="5" height="5" transform="rotate(45 51.5 51.5)" fill="#10e3e3"/>
                    <rect x="20" y="49" width="5" height="5" transform="rotate(45 22.5 51.5)" fill="#10e3e3"/>
                    {/* Person inside gear */}
                    <circle cx="35" cy="32" r="4.5" stroke="#10e3e3" strokeWidth="2"/>
                    <path d="M27 42c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#10e3e3" strokeWidth="2"/>
                    {/* Checkmark in circle */}
                    <circle cx="55" cy="55" r="12" fill="#10e3e3"/>
                    <path d="M49 55l4 4 8-8" stroke="#0B3D5D" strokeWidth="3" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            ),
            number: '30+',
            label: 'Experts'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Monitor/Screen */}
                    <rect x="18" y="25" width="44" height="30" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Screen content lines */}
                    <rect x="24" y="31" width="32" height="3" rx="1.5" fill="#10e3e3"/>
                    <rect x="24" y="38" width="24" height="3" rx="1.5" fill="#10e3e3"/>
                    <rect x="24" y="45" width="28" height="3" rx="1.5" fill="#10e3e3"/>
                    {/* Monitor stand */}
                    <rect x="36" y="55" width="8" height="6" fill="#10e3e3"/>
                    <rect x="28" y="61" width="24" height="4" rx="2" fill="#10e3e3"/>
                    {/* CMS Gear icon on monitor */}
                    <circle cx="40" cy="18" r="8" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="40" cy="18" r="4" stroke="#10e3e3" strokeWidth="2"/>
                    <rect x="39" y="9" width="2" height="3" fill="#10e3e3"/>
                    <rect x="39" y="24" width="2" height="3" fill="#10e3e3"/>
                    <rect x="47" y="17" width="3" height="2" fill="#10e3e3"/>
                    <rect x="30" y="17" width="3" height="2" fill="#10e3e3"/>
                </svg>
            ),
            number: '50+',
            label: 'Deployed'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Document/Paper */}
                    <rect x="25" y="15" width="30" height="40" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Top dots (browser-like) */}
                    <circle cx="30" cy="22" r="2" fill="#10e3e3"/>
                    <circle cx="37" cy="22" r="2" fill="#10e3e3"/>
                    <circle cx="44" cy="22" r="2" fill="#10e3e3"/>
                    {/* Document lines */}
                    <line x1="30" y1="30" x2="50" y2="30" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="36" x2="46" y2="36" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="42" x2="50" y2="42" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="48" x2="44" y2="48" stroke="#10e3e3" strokeWidth="2"/>
                    {/* Pencil */}
                    <path d="M52 50l-8 8 3 3 8-8-3-3z" fill="#10e3e3" stroke="#10e3e3" strokeWidth="1"/>
                    <rect x="56" y="44" width="4" height="10" transform="rotate(45 58 49)" fill="#10e3e3"/>
                    <path d="M62 42l2 2" stroke="#10e3e3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            ),
            number: '3X',
            label: 'Faster Content Publishing'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lock body */}
                    <rect x="28" y="35" width="24" height="26" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Lock shackle */}
                    <path d="M32 35V27c0-4.4 3.6-8 8-8s8 3.6 8 8v8" stroke="#10e3e3" strokeWidth="2.5"
                          strokeLinecap="round"/>
                    {/* Keyhole */}
                    <circle cx="40" cy="46" r="3" fill="#10e3e3"/>
                    <rect x="38.5" y="46" width="3" height="8" rx="1.5" fill="#10e3e3"/>
                    {/* User icon in circle */}
                    <circle cx="58" cy="48" r="11" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="58" cy="45" r="4" stroke="#10e3e3" strokeWidth="2"/>
                    <path d="M51 54c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#10e3e3" strokeWidth="2"/>
                </svg>
            ),
            number: '70%',
            label: 'Better Multi-User Access'
        }
    ];

    //process
    const [activePhase, setActivePhase] = useState<number>(0);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);

    // pointer events (works for mouse + touch + pen)
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

    // scroll progress
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

    // autoplay day progression
    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = window.setInterval(() => {
                setCurrentDay((d) => (d >= 90 ? 1 : d + 1));
            }, 150); // adjustable speed
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

    const getPhaseFromDay = (day: number): number => {
        if (day <= 30) return 0;
        if (day <= 60) return 1;
        return 2;
    };

    // canvas + particles animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            canvas.width = Math.round(window.innerWidth * dpr);
            canvas.height = Math.round(window.innerHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
            initParticles(Math.round(Math.max(40, window.innerWidth / 30)));
        };

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

        resize();
        window.addEventListener('resize', resize);

        let lastTs = performance.now();
        const animate = (ts: number) => {
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            const particles = particlesRef.current;

            // subtle trail
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // wrap
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

            lastTs = ts;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [currentDay]);

    // update activePhase when day changes (optional)
    useEffect(() => {
        setActivePhase(getPhaseFromDay(currentDay));
    }, [currentDay]);

    const phase = phases[activePhase];

    // Engineering Leadership in the App Economy
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Cross-Industry Domain Expertise
    const domains = [
        {
            icon: (
                <svg viewBox="0 0 53 42" fill="none" strokeWidth="1.5" className={'h-12 w-12'}>
                    <path fill="#314252"
                          d="M15.842.242c2.116 0 4.115.495 5.998 1.484 1.882.99 3.518 2.409 4.907 4.257 1.388-1.848 3.024-3.267 4.906-4.257A12.71 12.71 0 0137.651.242c3.439 0 6.318 1.16 8.637 3.479 2.32 2.319 3.479 5.198 3.479 8.637a7.3 7.3 0 01-.03.676c-.02.217-.039.443-.055.676h-3.634c.04-.233.065-.459.072-.676.008-.218.012-.443.012-.676 0-2.423-.808-4.442-2.423-6.058-1.616-1.615-3.635-2.423-6.058-2.423-1.914 0-3.682.543-5.306 1.628-1.623 1.086-2.908 2.597-3.856 4.532h-3.485c-.964-1.95-2.253-3.465-3.868-4.543-1.616-1.078-3.38-1.617-5.294-1.617-2.408 0-4.423.808-6.046 2.423C8.173 7.916 7.36 9.935 7.36 12.358c0 .233.004.458.012.676.007.217.031.443.072.676H3.81a27.076 27.076 0 00-.053-.676 7.304 7.304 0 01-.03-.676c0-3.439 1.159-6.318 3.478-8.637C9.525 1.4 12.403.242 15.842.242zM12.096 27.97h5.084a304.97 304.97 0 004.287 4.117 344.92 344.92 0 005.28 4.867 345.39 345.39 0 005.279-4.867 305.48 305.48 0 004.287-4.117h5.122a128.211 128.211 0 01-5.185 5.187 368.558 368.558 0 01-6.829 6.304l-2.674 2.405-2.675-2.405a328.495 328.495 0 01-6.811-6.304c-1.956-1.87-3.677-3.6-5.165-5.187zm12.348 1.957c.386 0 .716-.112.99-.338.275-.225.478-.518.608-.878l3.668-11.04 2.68 4.012c.201.293.46.528.778.707.317.178.662.268 1.035.268h18.593v-3.635H35.013l-4.32-6.435a1.694 1.694 0 00-.706-.609 2.201 2.201 0 00-.938-.202c-.386 0-.72.112-1.002.337a1.789 1.789 0 00-.597.879l-3.667 11.025-2.69-4.021a2.317 2.317 0 00-.777-.706 2.073 2.073 0 00-1.035-.268H.697v3.635h17.736l4.343 6.458c.18.286.42.493.718.62.298.128.615.191.95.191z">
                    </path>
                </svg>
            ),
            label: 'Healthcare'
        },
        {
            icon: (
                <svg viewBox="0 0 52 52" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M26.077 51.283c-4.725 0-9.013-1.17-12.864-3.51-3.85-2.338-6.87-5.473-9.06-9.403v7.228H.517V32.27h13.327v3.635H6.962c1.752 3.53 4.341 6.37 7.768 8.519 3.427 2.15 7.21 3.224 11.347 3.224 2.967 0 5.75-.548 8.349-1.644 2.598-1.097 4.873-2.594 6.824-4.49 1.951-1.897 3.518-4.137 4.7-6.72 1.182-2.583 1.82-5.366 1.913-8.348h3.634c-.078 3.442-.797 6.67-2.16 9.683-1.362 3.014-3.189 5.646-5.48 7.899-2.29 2.252-4.962 4.024-8.015 5.317-3.052 1.292-6.307 1.938-9.765 1.938zm-1.715-8.947V39.28c-1.773-.414-3.248-1.15-4.424-2.21-1.176-1.06-2.078-2.488-2.705-4.287l3.066-1.249c.578 1.579 1.405 2.778 2.482 3.598a5.883 5.883 0 003.66 1.23c1.379 0 2.617-.344 3.714-1.032 1.096-.688 1.645-1.792 1.645-3.311 0-1.264-.472-2.272-1.414-3.022-.943-.75-2.703-1.598-5.278-2.542-2.491-.895-4.289-1.897-5.392-3.006-1.103-1.109-1.654-2.573-1.654-4.394 0-1.563.564-2.993 1.692-4.292 1.128-1.299 2.704-2.126 4.73-2.484V9.343h3.308v2.936c1.36.106 2.614.618 3.759 1.536 1.144.918 1.97 2.021 2.476 3.31l-2.991 1.203a5.924 5.924 0 00-1.786-2.239c-.773-.595-1.79-.892-3.052-.892-1.506 0-2.688.357-3.544 1.071-.855.715-1.283 1.644-1.283 2.787s.418 2.033 1.253 2.67c.836.637 2.527 1.39 5.075 2.26 2.908 1.05 4.862 2.228 5.862 3.532 1 1.305 1.5 2.806 1.5 4.502 0 1.156-.213 2.17-.64 3.043a6.835 6.835 0 01-1.675 2.202 8.095 8.095 0 01-2.356 1.41c-.88.344-1.787.587-2.719.727v2.935h-3.309zM.658 25.234c.108-3.52.851-6.79 2.229-9.811 1.378-3.022 3.22-5.65 5.527-7.887 2.306-2.237 4.974-3.986 8.003-5.248 3.03-1.26 6.25-1.892 9.66-1.892 4.679 0 8.967 1.174 12.864 3.521 3.898 2.347 6.918 5.51 9.061 9.486V6.082h3.635v13.327H38.309v-3.634h6.884c-1.706-3.468-4.276-6.292-7.71-8.472-3.435-2.181-7.237-3.272-11.406-3.272-2.904 0-5.652.54-8.243 1.622-2.591 1.081-4.87 2.562-6.836 4.443-1.967 1.881-3.553 4.113-4.758 6.696-1.206 2.583-1.855 5.397-1.948 8.442H.658z">
                    </path>
                </svg>
            ),
            label: 'Fintech'
        },
        {
            icon: (
                <svg viewBox="0 0 47 47" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M5.318 46.437c-1.224 0-2.26-.424-3.108-1.272-.848-.848-1.272-1.884-1.272-3.109V4.777c0-1.224.424-2.26 1.272-3.108C3.058.82 4.094.396 5.318.396h37.28c1.224 0 2.26.425 3.108 1.273.848.848 1.272 1.884 1.272 3.108v37.28c0 1.224-.424 2.26-1.272 3.108-.848.848-1.884 1.272-3.109 1.272H5.318zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.513V4.777a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H5.318a.711.711 0 00-.512.233.711.711 0 00-.234.513v37.28c0 .186.078.357.234.512a.711.711 0 00.512.233zm10.904-14.819c-.593 0-1.099-.209-1.517-.626a2.066 2.066 0 01-.627-1.517c0-.593.21-1.099.627-1.517a2.066 2.066 0 011.517-.626c.594 0 1.1.208 1.517.626.418.418.627.924.627 1.517 0 .593-.21 1.099-.627 1.517a2.067 2.067 0 01-1.517.626zm15.471 0a2.067 2.067 0 01-1.517-.626 2.067 2.067 0 01-.626-1.517c0-.593.209-1.099.626-1.517a2.067 2.067 0 011.517-.626c.594 0 1.1.208 1.517.626.418.418.627.924.627 1.517 0 .593-.209 1.099-.627 1.517a2.066 2.066 0 01-1.517.626zm-23.486-6.56v15.014c0 .44.143.804.429 1.09.286.286.65.429 1.09.429h.596c.442 0 .805-.143 1.09-.43.287-.285.43-.649.43-1.09V33.11h24.232v3.328c0 .44.143.804.428 1.09.286.286.65.429 1.091.429h.596c.441 0 .805-.143 1.09-.43.286-.285.43-.649.43-1.09V21.423l-3.812-11.025a2.244 2.244 0 00-.79-1.102 2.02 2.02 0 00-1.242-.417H14.05c-.456 0-.87.139-1.241.417a2.244 2.244 0 00-.79 1.102L8.207 21.422zm4.79-2.853l2.116-6.058h17.69l2.115 6.058h-21.92zm-1.155 10.905v-7.27h24.232v7.27H11.842z">
                    </path>
                </svg>
            ),
            label: 'Automotive'
        },
        {
            icon: (
                <svg viewBox="0 0 46 48" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M13.878 47.575c-1.178 0-2.178-.412-3.003-1.237-.825-.825-1.237-1.826-1.237-3.003 0-1.178.412-2.18 1.237-3.004.825-.825 1.825-1.237 3.003-1.237 1.178 0 2.179.413 3.003 1.237.825.825 1.237 1.826 1.237 3.004 0 1.177-.412 2.178-1.237 3.003-.824.825-1.825 1.237-3.003 1.237zm23.486 0c-1.177 0-2.178-.412-3.003-1.237-.825-.825-1.237-1.826-1.237-3.003 0-1.178.412-2.18 1.237-3.004.825-.825 1.826-1.237 3.004-1.237 1.177 0 2.178.413 3.002 1.237.825.825 1.237 1.826 1.237 3.004 0 1.177-.412 2.178-1.237 3.003-.824.825-1.825 1.237-3.002 1.237zM11.12 9.27l6.142 12.862h16.52c.14 0 .264-.035.373-.105a.912.912 0 00.279-.291l6.5-11.813c.094-.171.102-.323.024-.455-.078-.132-.21-.198-.396-.198H11.119zM9.377 5.635H43.02c.992 0 1.74.422 2.248 1.266.509.843.533 1.704.073 2.584l-7.764 14.063a4.375 4.375 0 01-1.577 1.633 4.122 4.122 0 01-2.15.586H16.17l-2.806 5.125c-.124.187-.128.389-.011.606.116.218.29.327.524.327h27.726v3.634H13.878c-1.616 0-2.83-.696-3.642-2.09-.812-1.393-.84-2.784-.086-4.173l3.458-6.216L4.79 4.424H.178V.789h6.897l2.302 4.846z">
                    </path>
                </svg>
            ),
            label: 'eCommerce'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4548" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.766 0.338H58.922V58.494H0.766z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4548)">
                        <path fill="#314252"
                              d="M11.617 50.62c-1.849 0-3.421-.65-4.718-1.947-1.297-1.296-1.946-2.87-1.946-4.718 0-1.003.206-1.952.618-2.847a6.336 6.336 0 011.805-2.302V27.6h5.196V13.666h17.079L40.62 39.43c.226.534.404 1.072.533 1.614.13.542.193 1.108.193 1.699 0 2.187-.765 4.046-2.297 5.578-1.531 1.531-3.39 2.297-5.578 2.297a7.8 7.8 0 01-4.4-1.314 7.487 7.487 0 01-2.874-3.532h-8.201a6.454 6.454 0 01-2.375 3.502 6.461 6.461 0 01-4.005 1.344zm32.154-2.424v-37.56h3.634v33.925h7.317v3.635H43.77zm-32.154-1.212c.842 0 1.557-.294 2.146-.883a2.921 2.921 0 00.883-2.145c0-.843-.294-1.558-.883-2.146a2.922 2.922 0 00-2.146-.884c-.842 0-1.557.295-2.146.884a2.92 2.92 0 00-.883 2.145c0 .843.294 1.558.883 2.146a2.921 2.921 0 002.146.883zm21.855 0c1.165 0 2.163-.415 2.994-1.246.831-.831 1.247-1.829 1.247-2.994 0-1.165-.416-2.163-1.247-2.994-.83-.831-1.829-1.247-2.994-1.247-1.165 0-2.163.416-2.994 1.247-.83.83-1.246 1.829-1.246 2.994 0 1.165.415 2.163 1.246 2.994.831.83 1.829 1.246 2.994 1.246zm-15.476-4.846h7.638c.019-.677.14-1.324.366-1.94a5.539 5.539 0 01.99-1.695h-5.242l-7.088-7.27H11.01v6.152c.093-.031.19-.054.292-.07.1-.015.205-.023.314-.023a6.46 6.46 0 014.005 1.344 6.454 6.454 0 012.375 3.502zm5.299-7.27h10.4a2.55 2.55 0 011.166.28L27.256 17.3H16.207V27.6l7.088 7.27zm-1.547 3.635l-1.121-1.15a371.076 371.076 0 01-2.423-2.515 153.485 153.485 0 00-2.424-2.483l-1.12-1.121 7.088 7.27z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Logistics'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2787" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0 0.051H58.156V58.207H0z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2787)">
                        <path fill="#314252"
                              d="M34.112 30.9h10.997v-3.635H34.112V30.9zm0-6.99h10.997v-3.635H34.112v3.635zM13.049 37.983h17.707v-.867c0-1.615-.799-2.884-2.398-3.807-1.598-.923-3.75-1.384-6.455-1.384-2.706 0-4.858.461-6.457 1.384-1.598.923-2.397 2.192-2.397 3.807v.867zm8.854-9.227c1.177 0 2.178-.412 3.003-1.237.825-.825 1.237-1.826 1.237-3.003 0-1.178-.412-2.179-1.238-3.004-.824-.824-1.825-1.237-3.002-1.237-1.178 0-2.179.413-3.004 1.237-.825.825-1.237 1.826-1.237 3.004 0 1.177.412 2.178 1.237 3.003.825.825 1.826 1.237 3.004 1.237zM10.439 47.303c-1.224 0-2.26-.424-3.108-1.272-.848-.849-1.272-1.885-1.272-3.109V15.336c0-1.225.424-2.26 1.272-3.109.848-.848 1.884-1.272 3.108-1.272h37.28c1.224 0 2.26.424 3.108 1.272.848.848 1.272 1.884 1.272 3.109v27.586c0 1.224-.424 2.26-1.272 3.109-.848.848-1.884 1.272-3.108 1.272h-37.28zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.513V15.336a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H10.44a.711.711 0 00-.512.233.711.711 0 00-.234.513v27.586c0 .187.078.358.234.513a.711.711 0 00.512.233z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Social Networking'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4618" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.32 0.053H58.476V58.208999999999996H0.32z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4618)">
                        <path fill="#314252"
                              d="M11.768 47.91c-2.283 0-4.225-.805-5.825-2.417-1.6-1.613-2.425-3.577-2.474-5.891 0-.342.016-.679.049-1.011.033-.333.09-.673.17-1.02l5.089-20.355c.53-2.043 1.61-3.697 3.238-4.964 1.63-1.267 3.485-1.9 5.569-1.9H41.21c2.083 0 3.94.633 5.568 1.9 1.63 1.267 2.709 2.921 3.239 4.964l5.088 20.355c.081.347.148.697.201 1.05.053.353.08.7.08 1.041 0 2.315-.817 4.268-2.45 5.86-1.632 1.593-3.602 2.389-5.909 2.389a8.192 8.192 0 01-4.4-1.251 8.083 8.083 0 01-3.062-3.39l-1.72-3.537a2.456 2.456 0 00-1.118-1.136 3.433 3.433 0 00-1.575-.379h-11.51c-.55 0-1.073.124-1.572.373-.5.248-.873.63-1.122 1.142l-1.72 3.536a7.794 7.794 0 01-3.053 3.402 8.314 8.314 0 01-4.407 1.24zm.188-3.634c.872 0 1.671-.233 2.398-.699A4.437 4.437 0 0016 41.709l1.696-3.477a6.25 6.25 0 012.454-2.681 6.685 6.685 0 013.492-.968h11.51c1.258 0 2.424.337 3.497 1.009a7.094 7.094 0 012.51 2.664l1.696 3.453c.37.78.918 1.402 1.645 1.868a4.38 4.38 0 002.414.7c1.3 0 2.416-.437 3.345-1.308.93-.871 1.406-1.95 1.431-3.236 0-.022-.048-.452-.144-1.291l-5.089-20.294a5.522 5.522 0 00-1.918-2.992c-.964-.78-2.074-1.17-3.33-1.17H17.585c-1.272 0-2.396.39-3.373 1.17a5.18 5.18 0 00-1.875 2.992L7.248 38.442c-.065.21-.113.621-.144 1.23 0 1.302.476 2.395 1.428 3.279.952.883 2.093 1.325 3.424 1.325zm21.076-17.848c.593 0 1.099-.209 1.517-.626.417-.418.626-.924.626-1.517 0-.593-.209-1.1-.627-1.517a2.067 2.067 0 00-1.516-.626c-.594 0-1.1.208-1.517.626a2.067 2.067 0 00-.627 1.517c0 .593.21 1.099.627 1.517.418.417.923.626 1.517.626zm4.846-4.846c.593 0 1.099-.209 1.517-.627.417-.418.626-.923.626-1.516 0-.594-.209-1.1-.626-1.517a2.067 2.067 0 00-1.517-.627c-.593 0-1.099.209-1.517.627a2.067 2.067 0 00-.626 1.517c0 .593.208 1.098.626 1.516.418.418.924.627 1.517.627zm0 9.692c.593 0 1.099-.208 1.517-.626.417-.418.626-.924.626-1.517 0-.593-.209-1.099-.626-1.517a2.067 2.067 0 00-1.517-.626c-.593 0-1.099.209-1.517.626a2.067 2.067 0 00-.626 1.517c0 .593.208 1.1.626 1.517.418.418.924.627 1.517.627zm4.846-4.846c.594 0 1.1-.209 1.517-.626.418-.418.627-.924.627-1.517 0-.593-.21-1.1-.627-1.517a2.067 2.067 0 00-1.517-.626c-.593 0-1.099.208-1.517.626a2.067 2.067 0 00-.626 1.517c0 .593.209 1.099.626 1.517.418.417.924.626 1.517.626zm-21.81 3.542c.418 0 .763-.136 1.036-.41.274-.272.41-.617.41-1.035V25.73h2.796c.417 0 .763-.137 1.036-.41.273-.272.409-.617.409-1.034 0-.417-.136-.762-.41-1.036-.272-.273-.618-.41-1.035-.41H22.36v-2.796c0-.417-.136-.762-.409-1.035-.273-.273-.617-.41-1.034-.41-.417 0-.763.137-1.036.41-.273.273-.41.618-.41 1.035v2.796h-2.796c-.417 0-.762.137-1.035.41-.273.272-.41.617-.41 1.034 0 .417.137.762.41 1.036.273.273.618.41 1.035.41h2.796v2.795c0 .418.136.763.41 1.036.272.273.617.41 1.033.41z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Game & Sports'
        },
        {
            icon: (
                <svg viewBox="0 0 59 60" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2698" width="59" height="60" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.498 0.912H58.653999999999996V59.068H0.498z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2698)">
                        <path fill="#314252"
                              d="M22.035 38.555l21.333-5.648a2.094 2.094 0 001.329-1.004c.31-.523.392-1.064.246-1.624a1.82 1.82 0 00-.99-1.223 2.232 2.232 0 00-1.61-.165l-6.03 1.622-9.693-9.088-2.973.709 5.816 10.177-6.235 1.547-3.029-2.302-1.883.513 3.72 6.486zm26.18 9.61h-37.28c-1.208 0-2.24-.429-3.097-1.285-.855-.856-1.283-1.888-1.283-3.096v-7.968c1.38-.265 2.532-.941 3.458-2.03.925-1.09 1.388-2.354 1.388-3.796 0-1.441-.463-2.706-1.388-3.795-.926-1.09-2.079-1.766-3.458-2.03v-7.968c0-1.208.428-2.24 1.283-3.097.857-.856 1.889-1.284 3.097-1.284h37.28c1.208 0 2.24.428 3.096 1.284.856.856 1.284 1.889 1.284 3.097v27.587c0 1.208-.428 2.24-1.283 3.096-.857.856-1.889 1.284-3.097 1.284zm0-3.636c.217 0 .396-.07.536-.21.14-.139.21-.318.21-.535V16.197a.726.726 0 00-.21-.536.726.726 0 00-.536-.21h-37.28a.726.726 0 00-.536.21.726.726 0 00-.21.536v5.433a9.933 9.933 0 013.544 3.544 9.32 9.32 0 011.303 4.816 9.32 9.32 0 01-1.303 4.816 9.933 9.933 0 01-3.543 3.544v5.434c0 .217.07.396.21.536.139.14.317.21.535.21h37.28z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Travel & Tourism'
        },
        {
            icon: (
                <svg viewBox="0 0 38 46" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M27.994 45.537l-6.3-10.662h-7.48a1.982 1.982 0 01-1.459-.592 1.983 1.983 0 01-.591-1.458c0-.578.197-1.065.591-1.46.395-.394.881-.591 1.46-.591h7.478l6.3-10.662h1.967l-3.15 10.662h7.582l1.817-2.423h1.724l-1.337 4.474 1.337 4.473H36.21l-1.817-2.423H26.81l3.15 10.662h-1.966zM8.16 26.152l3.15-10.662H3.73l-1.817 2.423H.188l1.337-4.474L.188 8.965h1.724l1.817 2.424h7.582L8.161.727h1.966l6.3 10.662h7.48c.578 0 1.064.197 1.459.591.394.395.591.881.591 1.46 0 .577-.197 1.063-.591 1.458-.395.395-.881.592-1.46.592h-7.478l-6.3 10.662H8.16z">
                    </path>
                </svg>
            ),
            label: 'Aviation'
        },
        {
            icon: (
                <svg viewBox="0 0 49 50" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M42.361 30.193V13.837L29.64 4.936l-12.722 8.9v5.08h-3.635v-6.874L29.64.37l16.356 11.673v18.151h-3.635zM30.968 15.258h2.19v-2.19h-2.19v2.19zm-4.847 0h2.19v-2.19h-2.19v2.19zm4.847 4.846h2.19v-2.19h-2.19v2.19zm-4.847 0h2.19v-2.19h-2.19v2.19zm-13.56 20.248l17.587 4.976 14.464-4.483c-.124-.55-.38-.97-.769-1.264a2.13 2.13 0 00-1.319-.441H30.658c-1.057 0-1.955-.04-2.695-.121-.74-.08-1.499-.258-2.279-.531l-5.47-1.809 1.076-3.56 4.907 1.706c.733.248 1.58.418 2.54.508.96.09 2.325.147 4.096.172 0-.6-.135-1.117-.406-1.552-.27-.435-.626-.728-1.067-.88L17.3 27.908a1.103 1.103 0 00-.128-.034.626.626 0 00-.128-.012h-4.483v12.489zM.445 47.435V24.228h16.571c.255 0 .512.028.773.084.261.056.504.121.727.196l14.12 5.2c1.1.407 2.013 1.127 2.74 2.16.727 1.033 1.09 2.246 1.09 3.637h6.059c1.74 0 3.157.562 4.252 1.685 1.095 1.123 1.642 2.58 1.642 4.373v1.957l-18.15 5.639-17.708-5.051v3.327H.445zM4.08 43.8h4.846V27.863H4.08V43.8z">
                    </path>
                </svg>
            ),
            label: 'Real Estate'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4646" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.539 0.77H58.695V58.926H0.539z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4646)">
                        <path fill="#314252"
                              d="M29.623 48.86l-15.75-8.555V27.164l-8.389-4.586 24.139-13.14 24.138 13.14v17.429h-3.634V24.592l-4.753 2.572v13.14L29.623 48.86zm0-17.316l16.576-8.966-16.576-8.965-16.576 8.965 16.576 8.966zm0 13.179l12.116-6.543v-9.078l-12.116 6.613-12.116-6.613v9.078l12.116 6.543z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Education'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2795" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.754 0.77H58.91V58.926H0.754z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2795)">
                        <path fill="#314252"
                              d="M11.193 50.444c-1.224 0-2.26-.424-3.108-1.272-.848-.848-1.273-1.884-1.273-3.108V13.63c0-1.224.425-2.26 1.273-3.108.848-.848 1.884-1.272 3.108-1.272h37.28c1.224 0 2.26.424 3.108 1.272.848.848 1.272 1.884 1.272 3.108v32.434c0 1.224-.424 2.26-1.272 3.108-.848.848-1.884 1.272-3.109 1.272H11.193zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.512V13.63a.711.711 0 00-.233-.512.711.711 0 00-.513-.233H11.193a.711.711 0 00-.512.233.711.711 0 00-.234.512v32.434c0 .186.078.357.234.512a.711.711 0 00.512.233zm2.283-5.452h10.905v-3.635H13.476v3.635zm22.536-5.102l11.133-11.133-2.592-2.591-8.541 8.602-3.453-3.453-2.53 2.591 5.983 5.983zm-22.536-4.59h10.905V28.03H13.476v3.634zm0-9.693h10.905v-3.635H13.476v3.635z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'On-Demand'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2762" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.65 0.77H58.806V58.926H0.65z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2762)">
                        <path fill="#314252"
                              d="M29.253 36.745c1.525 0 2.815-.527 3.87-1.582 1.055-1.054 1.582-2.344 1.582-3.87V17.686h6.944v-4.287h-9.087v13.7a4.787 4.787 0 00-1.521-.944 4.99 4.99 0 00-1.788-.314c-1.525 0-2.815.527-3.87 1.582-1.055 1.055-1.582 2.345-1.582 3.87 0 1.526.527 2.816 1.582 3.87 1.055 1.055 2.345 1.582 3.87 1.582zm-10.391 6.43c-1.224 0-2.26-.423-3.109-1.271-.848-.848-1.272-1.885-1.272-3.109V11.21c0-1.224.424-2.26 1.272-3.109.848-.848 1.884-1.272 3.109-1.272h27.586c1.224 0 2.26.424 3.109 1.272.848.848 1.272 1.885 1.272 3.109v27.586c0 1.224-.424 2.26-1.272 3.109-.848.848-1.885 1.272-3.109 1.272H18.862zm0-3.634h27.586a.711.711 0 00.513-.233.711.711 0 00.233-.513V11.21a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H18.862a.711.711 0 00-.513.233.711.711 0 00-.233.513v27.586c0 .187.078.358.233.513a.711.711 0 00.513.233zM10.38 51.657c-1.225 0-2.26-.424-3.109-1.272C6.424 49.537 6 48.5 6 47.277V16.054h3.635v31.221c0 .187.078.358.233.513a.711.711 0 00.512.233h31.222v3.635H10.381z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Music'
        },
        {
            icon: (
                <svg viewBox="0 0 60 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4583" width="60" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.984 0.77H59.14V58.926H0.984z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4583)">
                        <path fill="#314252"
                              d="M5.344 47.557v-5.388c0-1.248.322-2.363.967-3.343a6.59 6.59 0 012.582-2.288 37.39 37.39 0 016.947-2.605c2.328-.61 4.887-.916 7.677-.916s5.349.306 7.677.916c2.329.61 4.645 1.48 6.948 2.605a6.589 6.589 0 012.582 2.288c.645.98.967 2.094.967 3.343v5.388H5.344zm41.193 0V41.87c0-1.59-.39-3.106-1.168-4.547-.779-1.441-1.884-2.678-3.315-3.71 1.625.243 3.168.618 4.628 1.125a31.118 31.118 0 014.18 1.801c1.252.668 2.219 1.456 2.9 2.362.682.907 1.023 1.896 1.023 2.97v5.685h-8.248zm-23.02-18.454c-2.332 0-4.329-.83-5.99-2.491-1.66-1.661-2.49-3.658-2.49-5.99 0-2.333.83-4.33 2.49-5.99 1.661-1.66 3.658-2.491 5.99-2.491 2.332 0 4.329.83 5.99 2.491 1.66 1.66 2.491 3.657 2.491 5.99 0 2.332-.83 4.329-2.49 5.99-1.662 1.66-3.659 2.49-5.991 2.49zm20.923-8.481c0 2.332-.83 4.329-2.491 5.99-1.66 1.66-3.657 2.49-5.99 2.49-.273 0-.62-.03-1.043-.092a9.148 9.148 0 01-1.044-.205 12.859 12.859 0 002.203-3.824c.513-1.4.77-2.854.77-4.362a12.22 12.22 0 00-.786-4.345 14.008 14.008 0 00-2.187-3.835 4.51 4.51 0 011.044-.242 9.7 9.7 0 011.043-.056c2.333 0 4.33.83 5.99 2.491 1.66 1.66 2.491 3.657 2.491 5.99zm-35.462 23.3h29.078v-1.753c0-.506-.127-.956-.38-1.35-.253-.395-.654-.74-1.204-1.035a28.58 28.58 0 00-6.16-2.337c-2.113-.53-4.378-.795-6.795-.795s-4.681.265-6.794.794a28.582 28.582 0 00-6.16 2.338c-.55.295-.952.64-1.205 1.034-.253.395-.38.845-.38 1.351v1.753zm14.539-18.454c1.333 0 2.474-.474 3.423-1.424.949-.949 1.423-2.09 1.423-3.422 0-1.333-.474-2.474-1.423-3.423-.95-.95-2.09-1.424-3.423-1.424-1.333 0-2.474.475-3.423 1.424-.949.95-1.423 2.09-1.423 3.423 0 1.332.474 2.473 1.423 3.422.95.95 2.09 1.424 3.423 1.424z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'IT Staff Augmentation'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4562" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.766 0.77H58.922V58.926H0.766z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4562)">
                        <path fill="#314252"
                              d="M51.087 27.359v19.31c0 1.225-.425 2.26-1.273 3.109-.848.848-1.884 1.272-3.107 1.272H13.06c-1.223 0-2.26-.424-3.107-1.272-.849-.848-1.273-1.884-1.273-3.108V27.312c-.975-.801-1.708-1.841-2.197-3.12-.49-1.278-.5-2.658-.03-4.14l2.451-8.006c.323-1.019.871-1.84 1.645-2.465.773-.624 1.698-.936 2.772-.936H46.4c1.075 0 1.993.298 2.754.894.761.597 1.316 1.417 1.663 2.461l2.498 8.052c.47 1.482.46 2.857-.03 4.126-.49 1.27-1.222 2.33-2.197 3.18zm-15.872-1.752c1.324 0 2.319-.405 2.985-1.214.666-.81.939-1.679.818-2.608l-1.473-9.506h-5.844v9.572c0 1.019.345 1.9 1.035 2.642.69.743 1.516 1.114 2.48 1.114zm-10.904 0c1.115 0 2.02-.371 2.714-1.114a3.738 3.738 0 001.042-2.642v-9.572h-5.844l-1.472 9.6c-.131.86.139 1.697.81 2.51.672.812 1.588 1.218 2.75 1.218zm-10.783 0c.898 0 1.67-.313 2.316-.94.646-.625 1.045-1.412 1.197-2.36l1.426-10.028h-5.145c-.264 0-.473.059-.628.175-.156.116-.272.291-.35.524l-2.33 7.885c-.32 1.04-.17 2.091.452 3.152.621 1.061 1.642 1.592 3.062 1.592zm32.713 0c1.31 0 2.314-.515 3.01-1.545.696-1.03.864-2.096.503-3.2l-2.451-7.93c-.078-.233-.194-.4-.35-.501-.155-.101-.364-.152-.629-.152h-5.023l1.425 10.029c.153.947.552 1.734 1.198 2.36a3.213 3.213 0 002.317.939zM13.06 47.415h33.646c.217 0 .395-.07.535-.21.14-.139.21-.318.21-.535V29.027a3.218 3.218 0 01-.662.18 4.17 4.17 0 01-.55.035c-1.09 0-2.049-.198-2.877-.592-.828-.395-1.63-1.027-2.407-1.897a7.761 7.761 0 01-2.414 1.813c-.929.45-1.988.676-3.178.676a6.76 6.76 0 01-2.907-.641c-.91-.427-1.768-1.043-2.573-1.848a7.875 7.875 0 01-2.544 1.848 6.947 6.947 0 01-2.88.64 7.958 7.958 0 01-3.076-.594c-.956-.396-1.798-1.027-2.525-1.894-1.02 1.019-1.959 1.689-2.818 2.009-.858.32-1.696.48-2.513.48-.19 0-.386-.012-.588-.036a2.104 2.104 0 01-.624-.179V46.67c0 .217.07.396.21.536.14.14.318.21.535.21z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Retail'
        },
    ];


    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id='hero'
                 className="relative overflow-hidden lg:w-full lg:h-180 justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6">
                <video
                    src='/assets/digital/hero-M.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='hidden lg:block md:block absolute inset-0 w-full h-full object-cover z-0 bg-black/70'
                />
                <video
                    src='/assets/digital/hero-P.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='block lg:hidden absolute inset-0 w-full h-full object-cover z-0 bg-black/70'
                />
                <div
                    className={`absolute top-0 left-0 -mt-12 lg:-mt-0 md:-mt-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-auto max-w-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${isDayTime ? 'text-white ' : 'text-white'} z-10`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-4 border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1 className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2.1em] lg:mt-[3em] md:mt-[3em] mt-[12em] w-auto h-auto leading-[1.1] font-[700]`}>
                            Digital <br/>Marketing Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Grey InfoTech delivers data-driven digital marketing solutions that enhance brand
                                visibility, accelerate customer acquisition, and drive measurable revenue growth. Our
                                integrated approach spans SEO, paid advertising, social media management, and content
                                strategy—each optimized through advanced analytics and continuous performance
                                refinement. By aligning marketing initiatives with your business objectives and target
                                audience behaviors, we create campaigns that generate qualified leads, improve
                                conversion rates, and deliver quantifiable ROI across all digital channels.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-12 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                             : isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            Partnering with Leaders <br className={'lg:block md:block hidden'}/>and Visionary Brands
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[700] lg:mt-[0.01em] leading-[1.2] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Grow your <span className={'text-[#0ef0dd]'}>digital marketing revenue</span> with Grey
                            InfoTech
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Accelerate your revenue growth and expand your market presence with Grey
                                    InfoTech&#39;s
                                    comprehensive digital marketing solutions designed to deliver measurable business
                                    outcomes and sustainable competitive advantage. Our data-driven approach combines
                                    strategic insight, advanced analytics, and proven methodologies across SEO, paid
                                    advertising, content marketing, social media engagement, and conversion optimization
                                    to maximize your return on investment. Request your customized proposal today to
                                    receive a detailed strategic plan meticulously tailored to your business objectives,
                                    target audience demographics, competitive landscape, and growth aspirations. Our
                                    comprehensive proposal includes a customized multi-channel marketing strategy,
                                    transparent pricing structures aligned with your budget parameters, and a detailed
                                    flight plan that outlines phased implementation timelines, key performance
                                    indicators, and projected outcomes at each milestone.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Grey InfoTech&#39;s proposal process provides complete visibility into recommended
                                    tactics, resource allocation, campaign architecture, and expected results,
                                    empowering you to make confident, informed decisions that align with your
                                    organizational priorities. We deliver actionable roadmaps that integrate seamlessly
                                    with your existing operations while positioning your business to capture market
                                    opportunities, enhance brand visibility, engage high-value prospects, and convert
                                    digital traffic into qualified leads and revenue. Partner with Grey InfoTech to
                                    leverage our specialized expertise, cutting-edge marketing technologies, and
                                    commitment to excellence that consistently drives client success in competitive
                                    digital marketplaces. Take the first step toward transforming your digital presence
                                    and achieving your revenue objectives by requesting your personalized proposal
                                    below.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Prominent Digital Marketing Services */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'digital marketing Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Our Prominent <span className={'text-[#0ef0dd]'}>Digital <br
                                className={'lg:block md:block hidden'}/>Marketing</span> Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                Our comprehensive digital marketing services transform online presence into strategic
                                business advantage. We deliver integrated solutions across search optimization, paid
                                media, social engagement, and content strategy—each engineered to drive visibility,
                                engagement, and conversion. Through data-driven methodologies and continuous
                                optimization, we help enterprises capture market share, strengthen brand authority, and
                                achieve measurable growth in competitive digital landscapes.<br/><br/>
                                Our comprehensive digital marketing¿. services include:
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc capitalize constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Search Engine Optimization (SEO)", target: "SEO"},
                                    {id: "02", title: "Pay-Per-Click (PPC) Advertising", target: "PPCA"},
                                    {id: "03", title: "Social Media Marketing", target: "SMM"},
                                    {id: "04", title: "Content Marketing", target: "CM"},
                                    {id: "05", title: "Email Marketing", target: "EM"},
                                    {id: "06", title: "Conversion Rate Optimization (CRO)", target: "CRO"},
                                    {id: "07", title: "Online Reputation Management", target: "ORM"},
                                    {id: "08", title: "Analytics & Data Intelligence", target: "ADI"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-4'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[18em] md:mb-[18em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SEO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Search Engine Optimization (SEO)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Organic Visibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Keyword Research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Link Building</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technical Optimization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        We deliver comprehensive SEO strategies that improve organic search visibility,
                                        drive qualified traffic, and establish sustainable online authority. Our
                                        services include technical audits addressing site architecture, page speed
                                        optimization, mobile responsiveness, and schema markup implementation. We
                                        conduct extensive keyword research analyzing search volume, competition, and
                                        user intent to identify high-value opportunities aligned with your business
                                        objectives. On-page optimization encompasses strategic content enhancement, meta
                                        tag refinement, header structure improvement, internal linking strategies, and
                                        URL optimization. Off-page initiatives include authoritative backlink
                                        acquisition through digital PR, guest posting, and strategic partnerships to
                                        build domain authority. Local SEO services optimize Google Business Profile,
                                        build citations, manage reviews, and create location-specific content. Advanced
                                        capabilities include Core Web Vitals optimization, international SEO with
                                        hreflang implementation, voice search optimization, featured snippet targeting,
                                        and algorithm update monitoring. We provide transparent reporting with rankings
                                        tracking, organic traffic analysis, conversion attribution, and competitor
                                        benchmarking, ensuring measurable business results and competitive market
                                        positioning.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PPCA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Pay-Per-Click (PPC) Advertising
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>ROAS Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Campaign Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Conversion Tracking</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Automated Bidding</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our PPC management maximizes return on ad spend through data-driven strategies
                                        and continuous optimization across Google Ads, Microsoft Advertising, and social
                                        platforms. We develop comprehensive paid search campaigns with granular keyword
                                        research, competitive bid analysis, strategic ad group structuring, compelling
                                        ad copy with strong calls-to-action, and ad extensions maximizing click-through
                                        rates. Google Shopping campaigns feature optimized product feeds, strategic
                                        bidding, and dynamic remarketing. Display advertising leverages audience
                                        targeting, responsive ads, and creative optimization. Remarketing strategies
                                        re-engage visitors with tailored messaging, cart abandonment recovery, and
                                        sequential campaigns. We implement conversion tracking, multi-touch attribution
                                        modeling, and automated bidding strategies using machine learning. Advanced
                                        capabilities include responsive search ads with dynamic testing, ad scheduling
                                        optimization, geographic bid adjustments, competitive conquest campaigns, and
                                        landing page optimization recommendations. Transparent reporting includes
                                        performance metrics, conversion analysis, quality score monitoring, competitive
                                        insights, and strategic recommendations ensuring maximum qualified traffic and
                                        revenue while maintaining cost efficiency.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SMM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Social Media Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Community Engagement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Content Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Paid Social Campaigns</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Influencer Marketing</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We create engaging social media strategies that build brand awareness, foster
                                        community engagement, and generate measurable results across Facebook,
                                        Instagram, LinkedIn, Twitter, TikTok, and Pinterest. Our management encompasses
                                        platform audits, strategic planning with content calendars, and campaign
                                        scheduling aligned with audience activity. Content creation includes
                                        professional graphic design, video production for Reels and TikTok, compelling
                                        copywriting, hashtag strategy, and user-generated content curation. Community
                                        management provides timely response to engagement, reputation monitoring,
                                        influencer relationship building, and social listening for customer insights.
                                        Paid social campaigns leverage precise audience targeting, compelling ad
                                        creative across formats, A/B testing, retargeting, and lookalike audience
                                        expansion. We implement comprehensive analytics tracking reach, engagement
                                        rates, follower growth, conversions, sentiment analysis, and competitive share
                                        of voice. Advanced capabilities include social commerce with shoppable posts,
                                        chatbot implementation, employee advocacy programs, micro-influencer
                                        partnerships, and platform-specific strategies. These services build meaningful
                                        audience connections, establish thought leadership, drive qualified traffic, and
                                        create loyal brand communities.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Content Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Thought Leadership</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategic Content Creation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Multi-Format Distribution</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Content Personalization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our content marketing establishes thought leadership, attracts target audiences,
                                        supports SEO objectives, and drives conversions through strategically crafted
                                        content across formats. We develop comprehensive strategies with audience
                                        persona development, buyer journey mapping, competitive gap analysis, and
                                        editorial calendar planning. Content creation encompasses in-depth blog posts
                                        optimized for search, comprehensive guides and e-books, case studies
                                        demonstrating results, whitepapers with data-driven insights, infographics
                                        visualizing complex information, video content including explainers and
                                        testimonials, podcast production, webinar development, email newsletters, social
                                        media content, and website copy optimization. Our optimization process includes
                                        keyword integration, internal linking strategies, meta description crafting,
                                        readability enhancement, and call-to-action placement. Distribution leverages
                                        owned media, earned media through PR and guest posting, paid amplification, and
                                        syndication across platforms. Advanced capabilities include content
                                        personalization, interactive content like calculators and assessments, content
                                        repurposing, pillar page and topic cluster strategies, original research
                                        generating backlinks, and influencer collaboration. These services position your
                                        brand as an industry authority, attract qualified prospects, improve organic
                                        visibility, and create reusable assets delivering long-term value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EM'}>
                                    <h2 className={`text-[1.5em] font-medium mb-3`}>
                                        Email Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-light ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Marketing Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Audience Segmentation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Personalized Campaigns</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Lifecycle Nurturing</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We design strategic email campaigns that nurture leads, retain customers, and
                                        maximize lifetime value through personalized, automated communication. Our
                                        services include strategy development with audience segmentation, campaign
                                        planning, automation workflow design for welcome series and cart recovery, and
                                        deliverability optimization. Design and development creates mobile-responsive
                                        templates, compelling visuals, dynamic content blocks, and conversion-focused
                                        layouts. Copywriting develops engaging subject lines with A/B testing,
                                        personalized body copy, and persuasive calls-to-action. List growth strategies
                                        include lead magnets, landing page optimization, website forms, social
                                        integration, and referral programs. We implement sophisticated automation
                                        including behavioral triggers, drip campaigns, predictive send time
                                        optimization, dynamic product recommendations, and lifecycle marketing.
                                        Analytics track delivery rates, open rates, click-through rates, conversions,
                                        revenue attribution, and engagement trends. Advanced capabilities include
                                        AI-powered optimization, progressive profiling, predictive analytics
                                        segmentation, interactive email elements, AMP for email, retargeting
                                        integration, and cross-channel orchestration. These services build direct
                                        audience relationships, generate consistent conversions, maximize customer
                                        retention, and deliver industry-leading ROI.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CRO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Conversion Rate Optimization (CRO)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>A/B Testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Experience Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Conversion Funnel Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Improvement</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our CRO services systematically improve website and landing page performance,
                                        maximizing visitor conversions and increasing marketing ROI. We conduct
                                        comprehensive audits analyzing user flow, identifying friction points, and
                                        conversion barriers through data analysis and user research. Analytics review
                                        examines traffic sources, behavior patterns, funnel performance, and baseline
                                        metrics. User experience analysis includes heatmaps, session recordings, form
                                        analytics, mobile usability testing, and page speed analysis. Qualitative
                                        research encompasses user surveys, customer interviews, competitive analysis,
                                        and expert evaluation. A/B testing includes headline and copy variations,
                                        call-to-action optimization, page layout testing, form optimization, pricing
                                        presentation, navigation structure, and trust signal placement. We implement
                                        multivariate testing, personalization, and sequential testing programs. Advanced
                                        optimization includes dedicated landing page development, progressive disclosure
                                        strategies, dynamic content delivery, checkout process optimization, exit-intent
                                        popups, and persuasion optimization applying psychological principles.
                                        Comprehensive reporting provides statistical significance analysis, conversion
                                        lift measurement, revenue impact, and strategic recommendations ensuring maximum
                                        traffic value and improved marketing efficiency.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ORM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Online Reputation Management
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Brand Monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Review Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Crisis Response</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Sentiment Analysis</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We protect and enhance brand reputation through proactive monitoring, strategic
                                        response management, and positive content amplification. Our services include
                                        comprehensive monitoring of brand mentions across search engines, review
                                        platforms, social media, news sites, forums, and Q&A sites using sentiment
                                        analysis. Review management encourages satisfied customers to leave reviews,
                                        provides strategic platform selection, timely professional responses, and
                                        aggregates positive reviews on marketing materials. Negative content suppression
                                        creates optimized positive content to outrank negative search results. Crisis
                                        management protocols include rapid response teams, holding statement
                                        development, situation assessment, multi-channel communication strategies, and
                                        post-crisis analysis. Social media reputation management provides real-time
                                        monitoring, rapid response to complaints, engagement with positive mentions, and
                                        competitive benchmarking. Proactive reputation building includes thought
                                        leadership content, strategic PR initiatives, community involvement, employee
                                        advocacy, and customer success stories. Advanced capabilities include sentiment
                                        analysis for trend identification, fake review detection, competitor analysis,
                                        personal reputation management for executives, Wikipedia management, and
                                        knowledge panel optimization. These services protect brand equity, build
                                        consumer trust, improve conversion rates, and create sustainable competitive
                                        advantages.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ADI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Analytics & Data Intelligence
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-Driven Insights</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Attribution Modelling</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Tracking</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Predictive Analytics</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We transform marketing data into actionable intelligence through comprehensive
                                        analytics implementation, advanced analysis, and strategic reporting. Our
                                        services include complete tracking implementation with Google Analytics 4
                                        configuration, custom event tracking, enhanced e-commerce tracking, cross-domain
                                        tracking, conversion goal setup, and tag management. Advanced measurement
                                        includes server-side tracking, user ID tracking, custom dimensions and metrics,
                                        data layer implementation, and consent mode configuration. Attribution modeling
                                        encompasses multi-touch attribution analysis, data-driven attribution using
                                        machine learning, custom model development, and marketing mix modeling. Custom
                                        reporting creates executive dashboards, channel performance reports, content
                                        analytics, user behavior analysis, funnel visualization, cohort analysis, and
                                        automated reporting. Audience analysis includes demographic and psychographic
                                        understanding, behavioral segmentation, customer lifetime value calculation,
                                        churn prediction, and lookalike audience creation. Competitive intelligence
                                        provides market share analysis, traffic source revelation, content gap
                                        identification, backlink comparison, and social media benchmarking. Advanced
                                        capabilities include predictive analytics, machine learning applications,
                                        customer journey mapping, experimentation frameworks, and data visualization.
                                        These services provide clear performance visibility, enable data-driven
                                        decision-making, identify high-impact opportunities, prove marketing ROI, and
                                        establish competitive advantages through superior customer understanding.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div id={'details'} className={'lg:-mt-[32em] md:-mt-[32em] h-auto max-w-full w-full mx-auto'}>
                <div className="bg-slate-500 py-20 lg:mb-20 md:mb-20 mb-10">
                    <div
                        className="lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 lg:gap-8">
                            {statis.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="mb-5">
                                        {stat.icon}
                                    </div>
                                    <div className="text-white text-5xl lg:text-6xl font-bold mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-white text-[1em] lg:text-lg font-[300]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Feature of our Digital marketing */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'cross-platform-app-development-workflow'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] pb-[2em] ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.7em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                Key <span className={'text-[#0ef0dd]'}>Features</span> Of Our <br
                                className={'lg:block md:block hidden'}/><span
                                className={'text-[#0ef0dd]'}>Digital Marketing</span>
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We recognize that exceptional digital marketing partnerships extend beyond service
                                delivery—they hinge on generating quantifiable business outcomes through strategic
                                planning, advanced analytics, and data-informed decision-making. Our comprehensive suite
                                of capabilities is engineered to provide complete visibility into campaign performance,
                                transparent reporting on key metrics and ROI, and adaptive, future-ready marketing
                                infrastructure that evolves with your organizational growth, market dynamics, and
                                emerging customer engagement opportunities while maintaining alignment with your
                                strategic business objectives.
                            </p>
                        </div>
                    </div>

                    <div
                        className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[4em] gap-4 lg:mb-8 mb-8 mt-10'>

                        {/* Feature 01 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">01</span>

                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Data-Driven Strategy Development
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We build digital marketing strategies grounded in comprehensive market research,
                                competitive analysis, and customer behavior insights rather than assumptions or generic
                                best practices. Our approach begins with in-depth discovery sessions understanding your
                                business objectives, target audience demographics and psychographics, unique value
                                propositions, competitive landscape, and current marketing performance. We analyze
                                historical data identifying what&#39;s working and what isn&#39;t, conduct audience
                                research
                                uncovering customer pain points, motivations, and decision-making factors, perform
                                competitive intelligence revealing market gaps and opportunities, and establish clear
                                KPIs aligned with business goals. This foundation ensures every tactic, channel, and
                                campaign is strategically aligned to drive measurable business outcomes rather than
                                vanity metrics, maximizing marketing efficiency and return on investment from the
                                outset.
                            </p>
                        </div>

                        {/* Feature 02 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">02</span>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Multi-Channel Integration
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Our digital marketing solutions create cohesive customer experiences across all
                                touchpoints, ensuring consistent messaging and coordinated execution that amplifies
                                impact beyond what isolated channel tactics can achieve. We develop integrated campaigns
                                where SEO content informs PPC ad copy, social media engagement supports email nurturing,
                                content marketing fuels organic and paid search strategies, and analytics insights
                                optimize performance across all channels simultaneously. Cross-channel attribution
                                tracking reveals how different touchpoints work together in the customer journey,
                                enabling intelligent budget allocation and strategic optimization. This holistic
                                approach eliminates siloed efforts, reduces message fragmentation, creates multiple
                                conversion pathways, and builds reinforcing brand presence that accelerates prospect
                                movement through awareness, consideration, and decision stages while maintaining brand
                                consistency and maximizing marketing synergy.
                            </p>
                        </div>

                        {/* Feature 03 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">03</span>

                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Advanced Analytics & Reporting
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We provide transparent, actionable reporting that moves beyond surface metrics to reveal
                                true marketing performance, business impact, and growth opportunities. Our analytics
                                framework includes custom dashboards visualizing key performance indicators relevant to
                                your specific business goals, detailed channel performance reports comparing ROI across
                                marketing investments, conversion funnel analysis identifying bottlenecks and
                                optimization opportunities, customer journey mapping revealing how prospects interact
                                with your brand across touchpoints, and cohort analysis tracking long-term customer
                                value and retention patterns. Regular performance reviews translate data into strategic
                                recommendations, explaining what happened, why it happened, what it means for your
                                business, and what actions should be taken. Predictive analytics and trend
                                identification provide forward-looking insights enabling proactive strategy adjustments
                                rather than reactive responses, ensuring continuous improvement and competitive
                                advantage.
                            </p>
                        </div>

                        {/* Feature 04 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">04</span>

                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Continuous Optimization & Testing
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We implement systematic testing and optimization processes that continuously improve
                                campaign performance, user experience, and conversion rates over time. Our optimization
                                methodology includes structured A/B testing experimenting with headlines, ad copy,
                                images, calls-to-action, landing page layouts, and offers to identify highest-performing
                                variations, multivariate testing analyzing interaction effects between multiple page
                                elements, audience segmentation testing discovering which messages resonate with
                                different customer groups, bid strategy optimization adjusting paid media tactics based
                                on performance data, content performance analysis identifying top-performing topics and
                                formats to guide future creation, and conversion rate optimization addressing friction
                                points throughout the customer journey. Regular testing cadence ensures we&#39;re always
                                learning, adapting to market changes, capitalizing on emerging opportunities, and
                                staying ahead of competitors. This commitment to continuous improvement compounds
                                results over time, delivering incremental gains that accumulate into significant
                                performance improvements.
                            </p>
                        </div>

                        {/* Feature 05 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">05</span>

                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Personalization & Targeting
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We leverage advanced segmentation and personalization technologies to deliver relevant,
                                timely messages that resonate with individual prospects and customers rather than
                                generic one-size-fits-all communications. Our personalization capabilities include
                                audience segmentation dividing prospects by demographics, behavior, purchase history,
                                engagement level, and lifecycle stage, dynamic content delivery adapting website, email,
                                and ad experiences based on visitor characteristics and real-time behavior, behavioral
                                targeting serving ads and content based on browsing patterns and previous interactions,
                                lookalike audience expansion identifying and reaching prospects similar to your best
                                customers, retargeting and remarketing re-engaging visitors with tailored messages
                                reflecting their specific interests and interaction depth, and predictive
                                personalization using machine learning to anticipate needs and preferences. This
                                targeted approach increases relevance, improves engagement rates, accelerates
                                conversion, reduces wasted ad spend on unqualified audiences, and creates customer
                                experiences that feel personalized rather than generic mass marketing.
                            </p>
                        </div>

                        {/* Feature 06 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">06</span>

                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Conversion-Focused Approach
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Every element of our digital marketing services is designed with conversion in mind,
                                ensuring activities drive tangible business results rather than just traffic or
                                engagement. We optimize for actions that matter to your business—whether leads, sales,
                                appointments, downloads, or other conversion goals—by implementing conversion tracking
                                across all channels, creating compelling calls-to-action that motivate desired
                                behaviors, designing landing pages with persuasive copy and friction-reducing layouts,
                                developing nurturing sequences that guide prospects toward purchase decisions, and
                                continuously analyzing conversion paths to identify and eliminate barriers. Our
                                conversion architecture includes strategic funnel development moving prospects through
                                awareness, interest, consideration, and decision stages, lead scoring and qualification
                                identifying sales-ready opportunities for prioritized follow-up, cart abandonment
                                recovery capturing otherwise lost revenue, and lifetime value optimization focusing on
                                not just acquisition but retention and repeat business. This results-oriented
                                methodology ensures marketing investments deliver measurable financial return.
                            </p>
                        </div>

                        {/* Feature 07 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">07</span>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Industry Expertise & Best Practices
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Our team brings deep digital marketing expertise across industries, platforms, and
                                tactics, combining proven methodologies with innovative approaches tailored to your
                                specific market context. We stay current with platform algorithm changes, emerging
                                technologies, shifting consumer behaviors, and regulatory developments affecting digital
                                marketing through continuous learning, industry certifications, conference
                                participation, and testing new capabilities as they become available. This expertise
                                manifests in strategic recommendations grounded in what works across hundreds of
                                campaigns, tactical execution leveraging advanced platform features many competitors
                                don&#39;t utilize, efficient troubleshooting when challenges arise, and innovative
                                solutions
                                to unique business problems. Industry-specific knowledge ensures we understand your
                                competitive landscape, customer decision factors, regulatory constraints, seasonal
                                patterns, and market dynamics, enabling strategies that reflect real-world market
                                conditions rather than generic textbook approaches.
                            </p>
                        </div>

                        {/* Feature 08 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">08</span>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Scalable Campaign Management
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We build digital marketing programs that efficiently scale alongside your business
                                growth, whether expanding to new markets, launching new products, or increasing market
                                share in existing segments. Our scalable infrastructure includes documented processes
                                enabling consistent execution across growing campaign complexity, automation workflows
                                reducing manual effort as program scope expands, template systems accelerating creation
                                of ads, landing pages, and content while maintaining quality and brand consistency, and
                                flexible team augmentation providing additional resources during peak periods or growth
                                phases. Technology integration with your CRM, marketing automation, and business systems
                                creates efficient data flow supporting larger volumes without proportional resource
                                increases. This scalability ensures digital marketing can fuel aggressive growth without
                                becoming a bottleneck, maintaining performance quality and strategic alignment even as
                                budgets, markets, and complexity increase significantly over time.
                            </p>
                        </div>

                        {/* Feature 09 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">09</span>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Cutting-Edge Tools & Technology
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We leverage industry-leading marketing technology platforms and proprietary tools that
                                enhance campaign performance, improve efficiency, and provide competitive advantages.
                                Our technology stack includes enterprise analytics platforms providing comprehensive
                                data collection and analysis, marketing automation systems enabling sophisticated
                                nurturing and personalization, SEO tools for keyword research, rank tracking, backlink
                                analysis, and technical auditing, social media management platforms streamlining content
                                publishing and engagement monitoring, heatmapping and session recording tools revealing
                                user behavior patterns, competitive intelligence software tracking competitor activities
                                and market trends, and AI-powered optimization tools accelerating testing and
                                personalization. Advanced capabilities include predictive analytics forecasting campaign
                                outcomes, machine learning algorithms optimizing bids and budgets in real-time, natural
                                language processing analyzing customer sentiment and feedback, and marketing attribution
                                platforms revealing true channel contribution. This technology infrastructure enables
                                capabilities and efficiencies impossible with basic tools, delivering superior results
                                and strategic insights.
                            </p>
                        </div>

                        {/* Feature 10 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">10</span>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Transparent Communication & Collaboration
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                We believe in partnership-based relationships with open communication, collaborative
                                planning, and transparent reporting that keeps you informed and involved in marketing
                                strategy and performance. Our communication approach includes regular status meetings
                                reviewing performance, discussing insights, and planning upcoming initiatives,
                                responsive communication with quick turnaround on questions and requests, collaborative
                                strategy sessions involving your team in major decisions and direction-setting, detailed
                                monthly reports explaining performance against goals with context and interpretation,
                                and proactive updates when significant opportunities or challenges arise requiring
                                immediate attention or decision-making. We view ourselves as an extension of your team
                                rather than external vendor, seeking to understand your business deeply, aligning with
                                your objectives and values, and working collaboratively toward shared success. This
                                transparency builds trust, ensures alignment, enables informed decision-making, and
                                creates true partnerships rather than transactional relationships.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Our Proven 90-Day Process */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'Our-proven-90-Day-Process'}
                     className={`relative  z-10 lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0"/>

                    <div
                        className="fixed inset-0 opacity-10 z-0"
                        style={{
                            transform: `translate(${pointer.x * 20}px, ${pointer.y * 20}px)`,
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        <div
                            className="absolute top-20 left-20 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 rounded-full blur-3xl"/>
                        <div
                            className="absolute bottom-20 right-20 w-72 h-72 md:w-96 md:h-96 bg-purple-500 rounded-full blur-3xl"/>
                        <div
                            className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-3xl"/>
                    </div>

                    {/* Progress Bar */}
                    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-500 transition-all duration-300"
                            style={{width: `${scrollProgress}%`}}
                        />
                    </div>

                    {/* Header */}
                    <div
                        className={` relative ${isDayTime ? 'text-white' : 'text-black'} text-center mb-12 md:mb-20 lg:mb-20 border-b border-gray-700 pb-[2em] space-y-6`}>
                        <h2 className='capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                            Our Proven <span className={'text-[#0ef0dd]'}>90-Day Process</span>
                        </h2>
                        <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5] mx-auto max-w-6xl'>
                            Our structured 90-day implementation process delivers measurable results through
                            strategic planning, precise execution, and continuous optimization. This proven
                            methodology accelerates time-to-value while ensuring alignment with your business
                            objectives at every phase. By combining industry best practices with agile
                            responsiveness, we transform initial engagement into tangible outcomes—building momentum
                            that sustains long-term success and competitive performance.
                        </p>
                        <div className="flex justify-center items-center gap-4 pt-8">
                            {phases.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActivePhase(i)}
                                    className={`group relative transition-all duration-500 ${activePhase === i ? 'scale-110' : 'scale-100 opacity-50'}`}
                                    aria-label={`Select phase ${i + 1}`}
                                >
                                    <div
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${p.color} p-0.5 transition-all duration-500 ${activePhase === i ? 'rotate-0' : 'rotate-45'}`}>
                                        <div
                                            className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                            <span className="text-sm font-bold">{p.days.split('-')[0]}</span>
                                        </div>
                                    </div>
                                    {activePhase === i && <div
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-ping"/>}
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
                                        className="w-full h-full bg-black rounded-full flex items-center justify-center p-12">{phase.icon}</div>
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
                                {phase.items.map((item, idx) => (
                                    <div key={idx}
                                         className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-600 transition-all duration-300">
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
                            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Join the elite companies that
                                trust
                                Grey InfoTech to revolutionize their digital presence</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setIsPlaying((s) => !s)}
                                        className="px-6 py-3 rounded-full bg-white text-black font-bold">
                                    {isPlaying ? 'Pause' : 'Play'}
                                </button>
                                <button onClick={() => setCurrentDay(1)}
                                        className="px-6 py-3 rounded-full border border-gray-700">Reset Day
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

            {/* Technologies We Use */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-slate-600'}`}>
                <div id={'Toolchain'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div className={`${isDayTime ? 'text-black' : 'text-white'} text-center`}>
                        <h2 className="capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            <span className={'text-[#0ef0dd]'}>Technologies</span> We Use
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            Grey InfoTech harnesses cutting-edge cross-platform technologies and frameworks to architect
                            mobile solutions that align precisely with your strategic business objectives. Our
                            development team leverages industry-leading platforms including React Native, Flutter, and
                            Xamarin, combined with cloud-native architectures, advanced API integrations, and modern
                            DevOps practices to create scalable, high-performance applications. By employing progressive
                            development methodologies, real-time analytics integration, and AI-powered features, we
                            ensure your mobile presence not only meets current market demands but anticipates future
                            technological evolution. This technology-forward approach enables seamless integration with
                            existing enterprise systems, supports complex business logic and workflows, and provides the
                            flexibility to adapt quickly as your requirements evolve—transforming your mobile
                            application from a standalone tool into a strategic asset that drives customer engagement,
                            operational efficiency, and measurable business outcomes aligned with your growth
                            trajectory.
                        </p>

                        {/* Tabs */}
                        <div
                            className="mt-20 flex flex-wrap justify-center gap-8 border-b text-[1.3em] font-[500] text-gray-400">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveFront(tab.key)}
                                    className={`pb-1.5 transition-colors ${
                                        activeFront === tab.key
                                            ? "border-b-1 border-[#0ef0dd] text-[#0ef0dd]"
                                            : "hover:text-gray-800"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="mt-16">
                            <div
                                className="mx-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-start items-start">
                                {data[activeFront]?.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center gap-1.5">
                                        <div className="relative h-16 w-16 lg:h-28 lg:w-28 md:h-20 md:w-20">
                                            <Image
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                                sizes="(min-width:1024px) 64px, (min-width:768px) 56px, 48px"
                                            />
                                        </div>
                                        <span
                                            className="text-[1em] md:text-[1.3em] lg:text-[1.3em] text-center font-medium  break-words max-w-[8rem]">
                          {item.name}
                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industry-Specific Cross-Platform App Development */}
            <div
                className={`lg:pt-[2em] h-auto border-b max-w-full w-full mx-auto ${isDayTime ? 'bg-black border-white' : 'bg-white border-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[3em] md:pt-[3em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                <span className={'text-[#0ef0dd]'}>Industry-Specific</span> Cross-Platform <span
                                className={'text-[#0ef0dd]'}>App Development</span>
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                Grey InfoTech&#39;s industry-specialized cross-platform development expertise delivers
                                solutions precisely calibrated to the unique regulatory requirements, operational
                                workflows, and competitive dynamics of your sector. Our deep vertical knowledge spans
                                healthcare, finance, retail, logistics, manufacturing, and beyond—enabling us to
                                architect applications that address industry-specific challenges while exceeding
                                compliance standards and performance benchmarks. We integrate sector-appropriate
                                features such as HIPAA-compliant data handling for healthcare, PCI-DSS security for
                                financial services, real-time inventory management for retail, or IoT connectivity for
                                manufacturing operations. By combining cross-platform efficiency with industry-specific
                                functionality, we create solutions that resonate with your target users, streamline
                                specialized workflows, and support regulatory adherence. This sector-focused approach
                                ensures your application not only functions seamlessly across all platforms but delivers
                                the domain expertise and contextual capabilities that differentiate your business within
                                your competitive landscape and drive measurable outcomes aligned with industry success
                                metrics.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>IT Staff Augmentation & Resource Management Applications</span>
                                    {webIndex === 0 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 0 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We develop specialized cross-platform applications for IT staffing agencies,
                                        technology consulting firms, and enterprise IT departments that optimize
                                        resource allocation, streamline talent management, and enhance client-consultant
                                        collaboration. Our IT staffing solutions integrate comprehensive consultant
                                        databases with detailed skill profiles, certifications, experience levels,
                                        technology expertise, and availability status, advanced matching algorithms
                                        pairing consultants with project requirements based on skills and cultural fit,
                                        project management with resource forecasting and utilization tracking, timesheet
                                        management with mobile time entry and automated invoicing, applicant tracking
                                        for candidate sourcing and interview scheduling, client relationship management
                                        with contract details and billing rates, bench management with skills gap
                                        analysis and training recommendations, vendor management for subcontractor
                                        coordination, onboarding workflows with document collection and equipment
                                        provisioning, performance management with reviews and skill assessments,
                                        compliance tracking for certifications and work authorization, mobile access for
                                        consultants to view assignments and submit timesheets, client portals for
                                        requisition submission and consultant evaluation, resource forecasting tools
                                        predicting staffing needs, assignment history tracking for experience
                                        documentation, expense management, communication tools for team coordination,
                                        and reporting dashboards with utilization rates and revenue metrics. Advanced
                                        capabilities include AI-powered skill matching using natural language
                                        processing, predictive analytics for retention risk identification, automated
                                        resume generation, machine learning for pricing optimization, blockchain-based
                                        credential verification, video interviewing platform integration, chatbot
                                        assistance for policy questions, talent pool analytics identifying skill
                                        shortages, contract lifecycle management, project success prediction based on
                                        team composition, knowledge management systems, learning management integration
                                        for continuous development, workforce planning scenarios, automated compliance
                                        monitoring, collaboration platform integration, sentiment analysis of consultant
                                        feedback, and comprehensive business intelligence for workforce planning. These
                                        applications maximize billable utilization through efficient resource
                                        allocation, improve consultant satisfaction and retention, enhance client
                                        relationships through transparency and quality delivery, reduce administrative
                                        overhead, provide data-driven insights for strategic planning, support rapid
                                        scaling, ensure regulatory compliance, enable distributed team collaboration,
                                        optimize financial performance, and deliver the operational efficiency and
                                        talent optimization required in competitive IT staffing markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Music & Entertainment Streaming Applications</span>
                                    {webIndex === 1 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 1 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">

                                        Our cross-platform music and entertainment applications serve record labels,
                                        independent artists, streaming platforms, and media companies with sophisticated
                                        solutions for content discovery, playback, and social engagement. We develop
                                        immersive platforms featuring extensive music libraries with millions of tracks,
                                        intelligent search with genre and mood filters, personalized AI-powered
                                        recommendations analyzing listening behavior, curated playlists by music
                                        experts, user-generated collaborative playlists, high-quality adaptive bitrate
                                        streaming, offline downloads, seamless playback across devices with synchronized
                                        positions, social features for following friends and sharing tracks,
                                        synchronized lyrics display, artist profiles with discographies and concert
                                        dates, podcast integration with subscriptions and variable playback speeds,
                                        radio stations, music video streaming, concert livestreaming, lossless and
                                        spatial audio options, car mode interface, voice control integration, crossfade
                                        and gapless playback, equalizer controls, sleep timer functionality, and
                                        wearable device integration. Advanced features include AI-powered music
                                        discovery based on mood and context, artist collaboration tools, fan engagement
                                        with exclusive content and direct messaging, smart playlists auto-updating based
                                        on listening patterns, concert discovery with ticket purchasing, karaoke
                                        functionality with vocal removal, social listening parties, music recognition
                                        technology, fitness application integration with BPM matching, podcast
                                        transcription with searchable text, subscription tiers and ad-supported options,
                                        blockchain for transparent royalty distribution and NFT collectibles, spatial
                                        audio experiences, live DJ mixing capabilities, artist analytics dashboards,
                                        copyright detection systems, and social media integration. These applications
                                        transform listening into engaging social experiences, democratize music
                                        distribution for independent artists, provide sustainable revenue models with
                                        fair compensation, deliver personalized discovery experiences, support the
                                        creator economy with direct monetization tools, enable seamless multi-device
                                        experiences, build vibrant communities, and deliver the high-quality, socially
                                        connected experiences essential in competitive streaming markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Business & Corporate Productivity Applications</span>
                                    {webIndex === 2 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 2 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We architect enterprise-grade cross-platform business applications for
                                        corporations, professional services firms, and consulting companies that enhance
                                        workplace productivity and streamline collaboration across iOS and Android
                                        platforms. Our corporate solutions integrate comprehensive project management
                                        with task assignment, milestone tracking, and resource allocation, team
                                        collaboration with threaded discussions and file sharing, document management
                                        with version control and collaborative editing, time tracking and timesheet
                                        management with billable hours, expense management with receipt capture and
                                        approval workflows, CRM functionality for contact management and sales pipeline
                                        tracking, meeting scheduling with calendar integration and room booking, mobile
                                        access to business intelligence dashboards and KPI monitoring, secure messaging
                                        and video conferencing, employee directory with organizational charts, approval
                                        workflows for purchase orders and contracts, invoice generation, vendor
                                        management and procurement, digital signature capabilities, business card
                                        scanning, and integration with existing enterprise systems including ERP and
                                        HRMS. Advanced capabilities include AI-powered virtual assistants for scheduling
                                        and task automation, natural language processing for voice commands, predictive
                                        analytics for sales forecasting and resource planning, automated workflow
                                        triggers, sentiment analysis for customer communication, OCR for document
                                        digitization, geolocation for field workforce tracking, blockchain for secure
                                        contract management, augmented reality for remote assistance, machine learning
                                        for intelligent document categorization, enterprise SSO integration, role-based
                                        access controls, mobile device management integration, compliance monitoring,
                                        and real-time synchronization across devices. These applications empower
                                        distributed teams to collaborate effectively, accelerate decision-making through
                                        mobile access to business-critical information, reduce administrative overhead,
                                        improve project delivery and client satisfaction, enhance employee productivity,
                                        support remote and hybrid work models, ensure data security and compliance, and
                                        deliver integrated mobile-first business tools for efficient operations.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Logistics & Transportation Applications</span>
                                    {webIndex === 3 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 3 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform logistics applications serve freight companies, courier
                                        services, fleet operators, and supply chain businesses with comprehensive
                                        solutions for route optimization, shipment tracking, and driver management. We
                                        develop robust platforms with shipment booking and instant quotes, real-time GPS
                                        tracking, proof of delivery with digital signatures and photos, driver apps with
                                        optimized route navigation, job acceptance and status updates, barcode and QR
                                        code scanning, electronic logging for compliance, vehicle inspection checklists,
                                        load matching marketplace functionality, customer notifications for shipment
                                        status, estimated arrival times with live traffic updates, delivery exception
                                        reporting, electronic waybills, payment processing and invoicing, customer
                                        feedback collection, offline functionality, multi-stop route planning, and fuel
                                        tracking. Advanced features include AI-powered route optimization considering
                                        traffic and delivery windows, predictive delivery time estimation, dynamic
                                        rerouting based on real-time conditions, geofencing for automatic status
                                        updates, load optimization algorithms, driver performance analytics, warehouse
                                        management integration, customs documentation, temperature monitoring for
                                        refrigerated transport, fleet telematics integration, augmented reality for
                                        warehouse navigation, blockchain for supply chain transparency, carbon footprint
                                        calculation, and comprehensive business intelligence dashboards. These
                                        applications improve delivery speed and reliability, reduce operational costs,
                                        enhance customer satisfaction, increase driver productivity, improve fleet
                                        safety, enable scalable growth, and deliver the visibility and efficiency
                                        required in demanding logistics markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Fitness & Wellness Applications</span>
                                    {webIndex === 4 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 4 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We develop engaging cross-platform fitness applications for gyms, studios,
                                        personal trainers, and wellness centers that motivate users, track progress, and
                                        deliver personalized health experiences. Our wellness solutions integrate
                                        workout libraries with video demonstrations, customizable workout plans based on
                                        goals and experience levels, workout tracking with sets and reps logging,
                                        exercise timers, progress tracking with body measurements and performance
                                        metrics, wearable device integration for automatic activity syncing, nutrition
                                        tracking with food diary and calorie counting, meal planning with recipes,
                                        hydration and sleep monitoring, guided meditation and yoga routines, personal
                                        training session booking, class schedules and check-in, virtual training
                                        sessions, social features for connecting with workout buddies, challenges and
                                        competitions, achievement badges, and progress photo tracking. Advanced
                                        capabilities include AI-powered personal training with form correction using
                                        computer vision, adaptive workout plans adjusting to performance, personalized
                                        nutrition recommendations, genetic testing integration, biometric analysis,
                                        heart rate zone training, injury prevention programs, mental health tracking
                                        with mood journals, menstrual cycle tracking with workout adjustments, music
                                        streaming integration, augmented reality experiences, comprehensive health
                                        reports, and telemedicine consultation. These applications increase gym
                                        membership retention, enable fitness professionals to scale services digitally,
                                        improve user fitness outcomes, build engaged wellness communities, support
                                        hybrid fitness models, and deliver the comprehensive, data-driven experiences
                                        health-conscious consumers demand.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Food & Restaurant Delivery Applications</span>
                                    {webIndex === 5 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 5 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform food delivery applications serve restaurant chains, cloud
                                        kitchens, and delivery platforms with comprehensive solutions for menu browsing,
                                        ordering, payment processing, and delivery coordination. We develop
                                        sophisticated platforms featuring visually appealing restaurant and menu
                                        browsing with high-quality photography, detailed dish descriptions with
                                        nutritional information, advanced search and filtering by cuisine, dietary
                                        preferences, and delivery time, personalized recommendations, customizable
                                        orders with modifications, multiple payment options including digital wallets,
                                        real-time order tracking with GPS-enabled driver location, push notifications
                                        for order status updates, order history for quick reordering, saved addresses
                                        and payment methods, loyalty programs, promotional codes, customer reviews and
                                        ratings, group ordering capabilities, scheduled ordering, dietary filters, and
                                        direct communication with restaurants and drivers. Advanced features include
                                        AI-powered chatbots for customer service, dynamic delivery fee calculation,
                                        surge pricing transparency, contactless delivery with photo confirmation, driver
                                        rating, subscription plans, corporate accounts, kitchen display system
                                        integration, driver route optimization, real-time inventory management, voice
                                        ordering, and analytics dashboards for menu optimization. These applications
                                        increase restaurant order volume and revenue, improve operational efficiency,
                                        enhance customer satisfaction, reduce order errors, enable restaurants to
                                        compete with third-party platforms, and deliver the fast, convenient experiences
                                        consumers expect.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Education & E-Learning Applications</span>
                                    {webIndex === 6 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 6 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We create comprehensive cross-platform educational applications for schools,
                                        universities, corporate training programs, and online learning platforms that
                                        facilitate engaging learning experiences and streamline administrative
                                        processes. Our educational solutions encompass course catalogs and enrollment,
                                        interactive multimedia lessons, video lectures with note-taking, document
                                        libraries, assignment submission and grading, assessments with various question
                                        types, discussion forums, real-time messaging and video conferencing, calendar
                                        integration, grade tracking and progress monitoring, attendance management, push
                                        notifications for deadlines, offline content access, certificate generation,
                                        learning analytics dashboards, parental access for K-12 monitoring, and library
                                        integration. Advanced features include adaptive learning paths adjusting to
                                        student performance, gamification with badges and leaderboards, AI-powered
                                        tutoring assistants, speech recognition for language learning, augmented reality
                                        for immersive science and history lessons, collaborative whiteboards, plagiarism
                                        detection, accessibility features including screen readers and closed
                                        captioning, virtual labs and simulations, career services integration, and
                                        analytics for identifying struggling students. These applications improve
                                        student engagement and outcomes, increase course completion rates, reduce
                                        administrative workload, enable flexible learning, facilitate better
                                        communication, support hybrid and remote learning models, and provide
                                        data-driven insights for continuous educational improvement.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>E-Commerce & Retail Applications</span>
                                    {webIndex === 7 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 7 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We architect sophisticated cross-platform shopping applications for retailers,
                                        consumer brands, and marketplace platforms that create seamless omnichannel
                                        experiences and maximize conversion rates across mobile devices. Our e-commerce
                                        solutions integrate comprehensive product catalogs with advanced search and
                                        filtering, detailed product pages with 360-degree views, AI-powered personalized
                                        recommendations, shopping cart and wish lists, secure checkout with multiple
                                        payment options, real-time order tracking, customer reviews and ratings, loyalty
                                        program integration, push notifications for promotions and price drops, barcode
                                        scanning, augmented reality try-on experiences, store locator with inventory
                                        availability, buy-online-pickup-in-store capabilities, returns management, and
                                        AI-powered customer service chat. Advanced features include dynamic pricing
                                        based on browsing behavior, subscription management, virtual shopping
                                        assistants, live video shopping, social commerce integration, size
                                        recommendation engines, sustainability information, same-day delivery options,
                                        multi-currency support, and comprehensive conversion analytics. These
                                        applications increase mobile sales conversion, improve customer lifetime value,
                                        reduce cart abandonment, build brand loyalty, provide valuable customer
                                        insights, and enable retailers to compete effectively in mobile-first consumer
                                        markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(8)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Finance & Banking Applications</span>
                                    {webIndex === 8 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 8 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform financial applications serve banks, fintech startups,
                                        investment firms, and insurance companies with secure, feature-rich mobile
                                        banking and financial services platforms that deliver consistent experiences
                                        across iOS and Android. We develop comprehensive solutions with account
                                        management, real-time balance and transaction history, funds transfer, mobile
                                        check deposit with OCR technology, bill payment, cardless ATM withdrawal,
                                        spending analytics and budgeting tools, savings goals, loan applications,
                                        investment portfolio tracking, fraud alerts, biometric authentication, and
                                        secure customer service messaging. Advanced capabilities include peer-to-peer
                                        payments, digital wallet functionality with contactless payments, personal
                                        financial management with spending insights, investment recommendations based on
                                        risk profiles, automated savings programs, document management, branch and ATM
                                        locators, cryptocurrency trading, and real-time fraud detection with machine
                                        learning. These applications enhance customer engagement and retention, reduce
                                        operational costs, attract digital-native customers, enable 24/7 account access,
                                        provide actionable financial insights, and deliver the secure, convenient
                                        experiences essential for competitive positioning in financial services.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(9)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Healthcare & Telemedicine Applications</span>
                                    {webIndex === 9 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 9 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We develop HIPAA-compliant cross-platform mobile applications for healthcare
                                        providers, telemedicine platforms, and medical institutions that enable secure
                                        patient engagement and clinical workflow management across iOS and Android
                                        devices. Our healthcare solutions integrate electronic health records,
                                        appointment scheduling, secure video consultations with end-to-end encryption,
                                        prescription management, patient vital monitoring through wearable integration,
                                        medication reminders, and symptom tracking. Key features include real-time
                                        provider availability, insurance verification, secure document upload for
                                        medical records, telehealth video integration, patient portal access for lab
                                        results and treatment plans, billing and payment processing, provider ratings,
                                        and offline functionality for critical health information. These applications
                                        improve patient access to healthcare services, reduce no-show rates through
                                        automated reminders, enable chronic disease management, streamline
                                        administrative workflows, enhance patient satisfaction, and extend healthcare
                                        delivery beyond traditional clinical settings while ensuring data security and
                                        regulatory compliance.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(10)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Real Estate & Property Management Applications</span>
                                    {webIndex === 10 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 10 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform real estate applications serve property developers, agencies,
                                        and management companies with comprehensive solutions for property search,
                                        virtual tours, and tenant engagement. We develop feature-rich platforms with
                                        advanced property search and filtering, interactive map views with neighborhood
                                        insights, high-quality galleries and 360-degree virtual tours, augmented reality
                                        visualization for staging, saved searches with push notifications for new
                                        listings, mortgage calculators, appointment scheduling, agent communication,
                                        document management, digital signatures, rent payment processing, maintenance
                                        request tracking, inspection documentation, amenity booking, visitor management,
                                        community announcements, package notifications, lease renewal management, and
                                        investment analysis tools. Advanced capabilities include AI-powered property
                                        recommendations, chatbot assistance, video tours and live virtual showings,
                                        comparative market analysis, lead management and CRM integration, listing
                                        syndication, property performance dashboards, smart home integration, and
                                        blockchain-based transactions. These applications accelerate property discovery,
                                        improve tenant satisfaction, reduce administrative burden, enhance agent
                                        productivity, increase lead conversion, and deliver the modern digital
                                        experiences expected in competitive real estate markets.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Grey InfoTech As Your Cross-Platform App Development Company? */}
            <div
                className={`h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[6em] md:pt-[6em] pt-[4em] lg:pb-[5em] md:pb-[5em] pb-[4em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-8'}>
                            <Image
                                src={'/assets/cms/why_choose_cms.jpg'}
                                alt={'CMS'}
                                width={225}
                                height={300}
                                className={'object-cover w-full h-auto rounded-xl'}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.8em] capitalize font-[700] tracking-tight leading-[1.2] mb-10 lg:text-[3.5em] md:text-[2.5em] w-auto h-auto'>
                                Why Choose <span className={'text-[#0ef0dd]'}>Grey InfoTech</span> <br
                                className={'lg:block md:block hidden'}/>As Your <span
                                className={'text-[#0ef0dd]'}>Cross-Platform App</span> <br
                                className={'lg:block md:block hidden'}/>Development Company?
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Grey InfoTech delivers comprehensive cross-platform app development expertise built on
                                continuous innovation, technical excellence, and strategic mastery of emerging
                                technologies. Our commitment to staying at the forefront of technological advancement
                                enables us to leverage cutting-edge frameworks, development methodologies, and industry
                                best practices that provide our clients with decisive competitive advantages. We harness
                                the full capabilities of modern cross-platform technologies including React Native,
                                Flutter, Xamarin, and progressive web frameworks to architect sophisticated applications
                                that execute flawlessly across iOS, Android, web, and emerging platforms. Our technical
                                proficiency encompasses advanced performance optimization, native feature integration,
                                seamless third-party service connectivity, and robust security implementations that
                                ensure applications meet the highest standards for reliability, scalability, and user
                                experience across diverse operating environments.<br/><br/>

                                Grey InfoTech&#39;s cross-platform development approach delivers exceptional
                                cost-effectiveness through maximized code reusability, accelerated deployment timelines
                                that compress market entry windows, and streamlined maintenance protocols that reduce
                                long-term operational overhead. Our solutions provide organizations with strategic
                                agility to respond rapidly to market dynamics, competitive pressures, and evolving
                                customer expectations while maintaining consistent brand experiences across all digital
                                touchpoints. By partnering with Grey InfoTech for your cross-platform mobile application
                                development, you gain access to specialized proficiency honed through extensive
                                enterprise deployments, unwavering dedication to technical excellence, and proven
                                methodologies that consistently deliver superior outcomes. This partnership positions
                                your organization on a seamless journey toward application excellence, expanded market
                                presence, enhanced customer engagement, and sustainable competitive dominance in an
                                increasingly complex and rapidly evolving digital marketplace where technological
                                innovation drives business success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Get a Cross-Platform App For Your Business? */}
            <div
                className={`h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[6em] md:pt-[6em] pt-[4em] lg:pb-[5em] md:pb-[5em] pb-[4em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header Section */}
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-8 sm:mb-12 md:mb-14 lg:mb-16  ${isDayTime ? 'text-white' : 'text-black'}`}>
                        {/* Left Side - Title */}
                        <div className="order-1">
                            <h2 className={`xl:text-[3.12em] lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Why Get a Cross-Platform <br className={'lg:block md:block hidden'}/>App For Your <span
                                className="text-[#0ef0dd]">Business?</span>
                            </h2>
                        </div>

                        {/* Right Side - Description */}
                        <div className="order-2 space-y-4 sm:space-y-5 md:space-y-6">
                            <p className="text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal">
                                The exponential growth of operating systems and mobile platforms has fundamentally
                                transformed the digital marketplace, making multi-platform presence essential for
                                competitive success. Applications absent from key platforms forfeit substantial user
                                acquisition opportunities and revenue potential. Cross-platform application development
                                effectively addresses this critical business challenge by enabling organizations to
                                maximize market penetration, engage diverse user demographics, and optimize revenue
                                generation across all major platforms simultaneously. Partnering with an
                                industry-leading cross-platform development firm ensures the delivery of robust,
                                enterprise-grade applications that maintain consistent performance and user experience
                                across diverse ecosystems while reducing development costs and accelerating
                                time-to-market, thereby providing significant competitive advantages in today&#39;s
                                increasingly fragmented digital landscape.
                            </p>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div
                        className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {[
                            {
                                title: "Broad Market Reach",
                                description: (
                                    <>
                                        Expand market penetration by deploying your brand across multiple digital
                                        platforms, enabling multi-channel engagement with diverse customer segments
                                        while leveraging platform-specific optimization to maximize visibility and
                                        capture growth opportunities across the digital landscape.
                                    </>
                                )
                            },
                            {
                                title: "Cost and Time Efficiency",
                                description: (
                                    <>
                                        Accelerate time-to-market and reduce total cost of ownership by leveraging
                                        unified codebase architecture that eliminates redundant development efforts
                                        across platforms, streamlines maintenance workflows, and maximizes resource
                                        utilization, enabling economical cross-platform application deployment with
                                        consistent functionality while minimizing infrastructure overhead and ongoing
                                        operational expenses.
                                    </>
                                )
                            },
                            {
                                title: "Seamless Integration",
                                description: (
                                    <>
                                        Deploy new features, functionality enhancements, and system updates with minimal
                                        disruption through streamlined integration protocols that maintain application
                                        stability and performance consistency, ensuring uninterrupted user experiences
                                        across all platforms while reducing deployment complexity, accelerating release
                                        cycles, and preserving operational continuity throughout the update lifecycle.
                                    </>
                                )
                            },
                            {
                                title: "Scalability",
                                description: [
                                    <>
                                        Future-proof your digital infrastructure by implementing elastic, scalable
                                        architectural solutions that dynamically accommodate increasing user volumes,
                                        expanding feature requirements, and evolving business demands, while maintaining
                                        optimal performance and enabling seamless adaptation to emerging technologies,
                                        market shifts, and growth trajectories without requiring costly platform
                                        migrations or fundamental system redesigns.
                                    </>
                                ]
                            },
                            {
                                title: "Efficient Development",
                                description: [
                                    <>
                                        Maximize development efficiency through intelligent coding practices that
                                        leverage component reusability, modular architecture, and shared libraries
                                        across platforms, coupled with optimized deployment strategies and automated
                                        workflows that reduce redundant efforts, accelerate delivery timelines, minimize
                                        technical debt, and generate substantial cost savings while maintaining code
                                        quality and system reliability throughout the development lifecycle.
                                    </>
                                ]
                            },
                            {
                                title: "Faster launch",
                                description: [
                                    <>
                                        Accelerate time-to-market through streamlined cross-platform development
                                        methodologies that expedite production cycles and enable rapid market entry,
                                        while leveraging scalable architectural frameworks and agile deployment
                                        pipelines that support continuous iteration, seamless feature enhancements, and
                                        frequent updates to maintain competitive advantage and respond dynamically to
                                        evolving market demands and user feedback.
                                    </>
                                ]
                            }
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className={`backdrop-blur-sm rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 ${isDayTime ? 'bg-slate-300/50 hover:bg-slate-300/30 text-black' : 'bg-slate-700/50 hover:bg-slate-700/30 text-white'} transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                            >
                                <h3 className={'text-[1.5em] text-center font-bold  mb-3 sm:mb-4'}>
                                    {benefit.title}
                                </h3>
                                <p className={'text-gray-200 text-justify text-[0.85em]leading-relaxed'}>
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*  Benefits of Working with a Reputable Cross-Platform App Development Company */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={`${isDayTime ? 'text-black' : 'text-white'} text-center mb-12 md:mb-20 lg:mb-20`}>
                        <h2 className="capitalize text-[1.8em] max-w-6xl mx-auto md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            <span className={'text-[#0ef0dd]'}>Benefits of Working</span> with a Reputable <span
                            className={'text-[#0ef0dd]'}>Cross-Platform App</span> Development Company
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            Grey InfoTech stands as a leader in cross-platform application development, leveraging
                            cutting-edge technologies and innovative methodologies to create robust, scalable solutions
                            tailored to your business objectives. Our development approach integrates streamlined, agile
                            processes with deep industry-specific expertise, ensuring efficient project execution from
                            concept to deployment. We specialize in building applications that deliver seamless user
                            experiences, consistent performance, and native-like functionality across iOS, android, and
                            web platforms. By combining technical excellence with strategic insights into your
                            sector&#39;s unique requirements and challenges, we ensure your application not only
                            differentiates itself in a competitive marketplace but also achieves sustained excellence in
                            performance, user engagement, and cross-platform compatibility.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[
                            {
                                title: "Modern Solutions",
                                description: (
                                    <>
                                        Position your business at the cutting edge of digital innovation through our
                                        forward-thinking development approaches. We craft customized, cross-platform
                                        solutions meticulously designed to strengthen your digital footprint, enhance
                                        brand
                                        visibility, and create meaningful engagement across all online touchpoints. Our
                                        bespoke methodology ensures your platform resonates with your target audience
                                        while
                                        leveraging the latest technological advancements to deliver exceptional user
                                        experiences that drive measurable business growth.
                                    </>
                                )
                            },
                            {
                                title: "Transparency Project",
                                description: (
                                    <>
                                        Harness the power of dedicated project management solutions designed to offer
                                        comprehensive oversight of all active workflows and development activities.
                                        These
                                        sophisticated platforms create a centralized hub for stakeholder engagement,
                                        enabling transparent communication channels, streamlined feedback loops, and
                                        collaborative problem-solving. With instant access to project metrics, task
                                        dependencies, and progress indicators, you gain the insights necessary to make
                                        informed, strategic decisions that keep your project on track and aligned with
                                        business priorities.
                                    </>
                                )
                            },
                            {
                                title: "Scalability and Adaptability",
                                description: (
                                    <>
                                        Grey InfoTech equips your application with future-proof, scalable solutions
                                        designed
                                        to support dynamic business evolution. We architect systems with inherent
                                        flexibility and expandability, enabling effortless adaptation to changing market
                                        conditions, emerging user expectations, and strategic pivots. Our approach
                                        ensures
                                        your digital platform remains agile and responsive, capable of integrating new
                                        functionalities, supporting increased user bases, and accommodating
                                        organizational
                                        growth without compromising performance, stability, or user
                                        satisfaction—positioning
                                        your business for sustained competitive advantage.
                                    </>
                                )
                            },
                            {
                                title: "Ongoing Support",
                                description: (
                                    <>
                                        We ensure your application delivers a seamless, reliable user experience through
                                        rigorous quality assurance processes, comprehensive testing protocols, and
                                        proactive
                                        performance monitoring. Our commitment extends beyond deployment with responsive
                                        support systems that identify, diagnose, and resolve technical issues swiftly,
                                        minimizing disruption and maintaining user satisfaction. Through continuous
                                        optimization and rapid incident response capabilities, we guarantee your
                                        application
                                        operates flawlessly while providing users with the consistent, error-free
                                        performance they expect and deserve.
                                    </>
                                )
                            }
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 rounded-xl p-4 md:p-5 lg:p-5 hover:bg-gray-300 transition-colors duration-300 border-b-4 border-[#0ef0dd]"
                            >
                                <h3 className="text-[1em] md:text-[1.5em] lg:text-[1.5em] font-bold text-slate-800 mb-4">
                                    {benefit.title}
                                </h3>
                                <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#0ef0dd] mb-5 sm:mb-6"></div>
                                <p className="text-[0.85em] text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={'border-b-[1px] lg:pb-[2em] md:pb-[2em] pb-[1em] lg:mb-28 md:mb-28 mb-8'}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] text-[2em] font-[700] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <span className={'text-[#0ef0dd]'}>Cross-Platform App<br
                            className={'lg:block md:block hidden'}/> Development Services</span> Questions
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-1'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What is cross-platform app development?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform mobile app development represents an innovative software creation
                                methodology designed to build applications that deliver consistent, high-quality
                                experiences across diverse operating systems and hardware configurations. This approach
                                enables developers to architect and maintain a single, versatile codebase that
                                seamlessly adapts to multiple platforms—including iOS, Android, and progressive web
                                applications—without requiring platform-specific programming. By consolidating
                                development efforts into one unified code repository, organizations achieve accelerated
                                time-to-market, reduced development costs, simplified maintenance workflows, and
                                guaranteed feature parity across all platforms, while maintaining the native-like
                                performance and user experience that modern audiences demand.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do Cross Platform Apps Work?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform app development revolutionizes the software creation process by
                                empowering businesses to distribute their applications across multiple operating systems
                                and devices through a single, reusable codebase. Rather than investing resources in
                                developing distinct versions of the same application using each platform&#39;s native
                                programming languages and development environments—a traditionally costly and
                                time-intensive approach—cross-platform methodology allows teams to write code once and
                                deploy everywhere. This strategic advantage translates to substantial cost savings,
                                accelerated market entry, consistent feature rollouts across platforms, and simplified
                                ongoing maintenance, all while maintaining high-quality user experiences that rival
                                native applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How much does cross-platform app development cost?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Determining the cost of cross-platform application development requires careful
                                consideration of multiple interdependent variables that shape project scope and
                                technical requirements. Primary cost drivers include application complexity
                                levels—ranging from simple utility apps to enterprise-grade solutions—the number and
                                sophistication of integrated features, custom design requirements and branding elements,
                                the platforms you intend to support (iOS, Android, web, or all three), security and
                                compliance needs, database architecture, API development and integration, and
                                post-launch support services. Based on industry standards and project specifications,
                                most cross-platform development initiatives fall within a $20,000 to $65,000 budget
                                range, though this spectrum can extend higher for applications demanding advanced
                                functionalities, complex backend systems, real-time capabilities, or specialized
                                industry requirements that necessitate additional development time and expertise.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the market share of cross-platform development?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The global cross-platform application development framework market established a
                                significant economic footprint in 2023, recording a market valuation of approximately
                                US$ 120 billion as organizations worldwide increasingly prioritize unified development
                                approaches over traditional platform-specific methodologies. Market research indicates
                                sustained momentum with projections showing the industry will maintain a strong compound
                                annual growth rate of 16.7% throughout the next five-year period and continue expanding
                                thereafter. By 2033, the cross-platform development framework market is forecast to
                                achieve a remarkable valuation of $546.7 billion, demonstrating the transformative
                                impact of cross-platform technologies on the software development landscape. This
                                substantial growth trajectory reflects multiple converging factors including rising
                                demand for mobile-first solutions, the need for faster time-to-market, cost optimization
                                pressures, and the continuous evolution of sophisticated frameworks that deliver
                                near-native performance while maximizing code reusability across platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How long does cross-platform app development take?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform application development projects commonly follow a 3 to 6 month timeline
                                from initial planning through market-ready deployment, although this range should be
                                understood as a foundational estimate that adapts significantly based on the unique
                                characteristics and requirements of each individual project. Development duration is
                                substantially impacted by factors such as application complexity—from simple
                                informational apps to feature-rich enterprise solutions—the precision and
                                comprehensiveness of your initial functional specifications and user stories, the number
                                of distinct features and interactive elements to be developed, custom design and
                                branding requirements, backend development needs including database architecture and API
                                creation, third-party integrations and external service connections, the quantity of
                                platforms requiring native-like optimization, iterative feedback and revision cycles,
                                testing depth across devices and scenarios, and team collaboration efficiency. To obtain
                                the most accurate timeline projection for your specific initiative, we recommend
                                engaging in detailed project scoping sessions that thoroughly examine your business
                                goals, technical aspirations, budget parameters, and launch objectives, enabling our
                                team to develop a customized development roadmap with realistic milestones, clear
                                deliverables, and transparent communication protocols that keep your project on schedule
                                and aligned with strategic priorities.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the main benefit of cross-platform development?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The primary advantage of cross-platform application development lies in its exceptional
                                cost-effectiveness and operational efficiency, delivering substantial value to
                                businesses seeking to maximize their technology investments. By leveraging a single,
                                unified codebase that intelligently adapts to multiple operating systems and device
                                environments, development teams eliminate the need for redundant coding efforts,
                                separate platform-specific teams, and duplicated testing procedures. This consolidated
                                approach enables seamless deployment across iOS, Android, and web platforms
                                simultaneously, dramatically reducing both development timelines—often by 30-50%
                                compared to native development—and associated costs including labor, infrastructure, and
                                ongoing maintenance expenses. Beyond immediate financial benefits, this streamlined
                                methodology ensures consistent feature parity across all platforms, simplifies update
                                rollouts, accelerates time-to-market for new products, and allows organizations to
                                allocate saved resources toward innovation, enhanced functionality, and superior user
                                experience rather than managing multiple parallel codebases.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is cross-platform app development the future?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform application development represents not just a current trend but a
                                fundamental evolution in how the software industry approaches mobile solution creation,
                                with mounting evidence suggesting it will define the future of application development
                                across sectors. The rapid advancement of frameworks such as Flutter with its
                                high-performance rendering engine, React Native with its extensive component ecosystem,
                                and emerging platforms incorporating cutting-edge technologies demonstrates an
                                irreversible shift toward unified development approaches. These sophisticated frameworks
                                are systematically eliminating traditional performance gaps between cross-platform and
                                native applications through innovations like ahead-of-time compilation, optimized
                                JavaScript engines, direct native module integration, and platform-adaptive UI
                                rendering. Simultaneously, framework developers are expanding access to comprehensive
                                native API sets, enabling cross-platform applications to leverage advanced device
                                features including biometric authentication, augmented reality capabilities, advanced
                                camera functions, bluetooth connectivity, background processing, and platform-specific
                                services that were once exclusively available through native development. This
                                technological convergence, combined with substantial cost and time advantages, superior
                                maintainability, and the ability to deploy consistent experiences across iOS, Android,
                                and web platforms from a single codebase, positions cross-platform development as the
                                strategic foundation for modern application architecture and the clear pathway forward
                                for organizations committed to sustainable, scalable mobile innovation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is it possible to integrate third-party services into cross-platform apps?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform applications excel at integrating third-party services and external
                                platforms, providing businesses with the flexibility to incorporate best-in-class
                                solutions for every aspect of their application functionality without technological
                                constraints. Leading frameworks such as Flutter, React Native, and their contemporaries
                                are designed with open architectures and extensive plugin ecosystems that facilitate
                                straightforward integration of diverse APIs, SDKs, and specialized service providers
                                across multiple functional domains. Development teams can seamlessly embed essential
                                business services including comprehensive payment processing solutions from
                                industry-leading providers like Stripe, Braintree, and Authorize.net; social media
                                platform integrations that enable user authentication, profile synchronization, and
                                content sharing capabilities; advanced analytics and user tracking systems for
                                data-driven decision making and performance optimization; customer communication tools
                                including chat services, email automation, and CRM platforms; mapping and location-based
                                services; cloud infrastructure and database solutions; authentication and security
                                services; and industry-specific integrations tailored to healthcare, finance,
                                e-commerce, logistics, and other vertical markets. This integration flexibility ensures
                                businesses can select the optimal third-party solutions for their specific needs while
                                maintaining code efficiency, performance standards, and unified user experiences across
                                all supported platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Why choose Grey InfoTech for cross-platform mobile app development services?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Grey InfoTech brings unparalleled expertise to cross-platform application development,
                                combining technical excellence with strategic business insight to deliver solutions that
                                don&#39;t simply meet requirements but actively drive business growth and
                                transformation.
                                Our experienced development professionals utilize the latest frameworks, tools, and best
                                practices while maintaining a comprehensive, full-lifecycle development philosophy that
                                addresses every dimension of application success. This holistic methodology encompasses
                                strategic consultation and roadmap development to align technology with business goals;
                                sophisticated engineering and architecture that ensures scalability, security, and
                                performance; meticulous optimization across platforms to guarantee seamless user
                                experiences; exhaustive testing protocols covering functionality, usability, security,
                                and compatibility; and dedicated post-launch support including monitoring, maintenance,
                                feature enhancements, and performance tuning. By entrusting your project to Grey
                                InfoTech, you&#39;re partnering with a team that takes complete ownership of your
                                success—from conceptualization through deployment and beyond—ensuring your application
                                is precisely calibrated to your market positioning, user expectations, and business
                                objectives, with every technical decision made in service of delivering exceptional
                                value and sustainable competitive differentiation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the most used cross-platform mobile development?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cross-platform mobile development benefits from a diverse landscape of sophisticated
                                frameworks, each offering distinctive technological advantages, architectural
                                approaches, and specialized capabilities tailored to different application scenarios and
                                business requirements. The premier frameworks dominating the market include Flutter,
                                Google&#39;s UI toolkit renowned for beautiful, natively compiled applications with
                                exceptional performance; React Native, Facebook&#39;s popular framework leveraging
                                JavaScript and React for familiar development patterns and extensive third-party library
                                support; Kotlin Multiplatform, JetBrains&#39; solution enabling shared business logic
                                while
                                maintaining platform-specific UI implementations; Ionic, which harnesses web
                                technologies and provides seamless progressive web app deployment; along with
                                established platforms like Xamarin utilizing C# and .NET, and innovative newcomers
                                continuously expanding available options. Each framework embodies specific trade-offs
                                and advantages across critical dimensions including runtime performance and rendering
                                efficiency, development velocity and time-to-market, code reusability percentages,
                                access to native APIs and platform features, UI/UX flexibility and customization depth,
                                testing and debugging toolchains, documentation quality and community ecosystem
                                strength, hiring pool availability, and long-term maintainability. Selecting the ideal
                                framework demands thorough analysis of your project&#39;s unique
                                characteristics—application
                                complexity, performance benchmarks, target audience expectations, team technical
                                proficiency, development timeline, budget allocation, scalability requirements, and
                                strategic technology roadmap—ensuring the chosen solution optimally balances immediate
                                needs with future growth and evolution.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default DigitalMarketing;