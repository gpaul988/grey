'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import {FxBackground, FxStickyScrollSection, FxChip, FxReveal, FxButton, FxHoloCard} from '@/components/futuristic/fx';
import type {FxScrollItem} from '@/components/futuristic/fx';

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

// Currency-aware, futuristic pricing component — embedded here to keep single-file context
const CurrencyAwarePricing: React.FC = () => {
const isDayTimeLocal = useIsDayTime();
const [rates, setRates] = React.useState<Record<string, number> | null>(null);
const [loading, setLoading] = React.useState(true);
const [currency, setCurrency] = React.useState<string>('GBP');

const basePlans = [
    {name: 'Launch', monthlyGBP: 3500, bullets: ['Starter strategy', 'PPC & social ads', 'Basic analytics']},
    {name: 'Scale', monthlyGBP: 8500, bullets: ['Full-funnel strategy', 'Multichannel campaigns', 'Advanced analytics + ML']},
    {name: 'Enterprise', monthlyGBP: null, bullets: ['Dedicated team', 'Custom integrations', 'SLA & executive reporting']},
];

React.useEffect(() => {
    let mounted = true;
    async function fetchRates() {
        try {
            setLoading(true);
            // open.er-api.com (ExchangeRate-API) provides free public rates without an API key
            const res = await fetch('/api/exchange');
                        const json = await res.json();
                        if (mounted && json && json.rates) {
                            setRates(json.rates as Record<string, number>);
                        } else {
                            console.warn('Exchange rate fetch returned unexpected payload', json);
                        }
        } catch (e) {
            console.error('Failed to fetch currency rates', e);
        } finally {
            if (mounted) setLoading(false);
        }
    }
    fetchRates();
    const iv = setInterval(fetchRates, 10 * 60 * 1000);
    return () => { mounted = false; clearInterval(iv); };
}, []);

// Auto-default currency to NGN for Nigerian locales
React.useEffect(() => {
    if (typeof navigator !== 'undefined') {
        const loc = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
        if (loc.includes('ng')) setCurrency('NGN');
    }
}, []);

const format = (amountGBP: number | null, to: string) => {
    if (amountGBP === null) return 'Custom pricing';
    if (!rates) return '—';
    const rate = (to === 'GBP') ? 1 : rates[to];
    if (!rate) return '—';
    const converted = amountGBP * rate;
    try {
        // choose locale by currency for nicer formatting
        const locale = to === 'GBP' ? 'en-GB' : to === 'NGN' ? 'en-NG' : (to === 'USD' ? 'en-US' : 'en-IE');
        return new Intl.NumberFormat(locale, {style: 'currency', currency: to}).format(converted);
    } catch (e) {
        return `${to} ${converted.toFixed(0)}`;
    }
};

return (
    <section className="py-16">
        <div className="max-w-[90em] mx-auto px-6 sm:px-10 lg:px-[4.6em]">
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-[1.8em] font-[700] ${isDayTimeLocal ? 'text-gray-900' : 'text-white'}`}>Packages & Pricing</h3>
                <div className="flex items-center gap-3">
                    <label className={`text-sm ${isDayTimeLocal ? 'text-gray-600' : 'text-white/60'}`}>Display currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={`px-3 py-1 rounded border ${isDayTimeLocal ? 'bg-white/5 border-gray-200 text-gray-900' : 'bg-black/20 border-white/10 text-white'}`}>
                        <option value="GBP">GBP (£)</option>
                        <option value="NGN">NGN (₦)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                    </select>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {basePlans.map((p) => (
                    <FxHoloCard key={p.name} day={isDayTimeLocal} className="p-6 text-center relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-teal-400/20 to-cyan-400/20 blur-3xl animate-blob opacity-70"/>
                        <div className="relative z-10">
                            <div className={`text-[0.9em] ${isDayTimeLocal ? 'text-gray-700' : 'text-white/50'} uppercase mb-2`}>{p.name}</div>
                            <div className={`text-3xl font-[800] mb-3 ${isDayTimeLocal ? 'text-black' : 'text-white'}`}>{format(p.monthlyGBP, currency)}</div>
                            <div className={`${isDayTimeLocal ? 'text-gray-500' : 'text-white/40'} text-xs mb-2`}>{loading ? 'Fetching live exchange rates…' : `≈ ${format(p.monthlyGBP, 'NGN')} (₦)`}</div>
                            <ul className={`${isDayTimeLocal ? 'text-gray-700/80' : 'text-white/60'} mb-4`}>
                                {p.bullets.map((b) => <li key={b} className="py-1">{b}</li>)}
                            </ul>
                            {p.monthlyGBP === null ? (
                                <Link href="/quote-request">
                                    <button className="px-6 py-3 rounded-full bg-[#00f5d4] text-black font-[700]">Contact
                                        us
                                    </button>
                                </Link>
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/quote-request?plan=' + encodeURIComponent(p.name)}
                                    className="px-6 py-3 rounded-full bg-[#00f5d4] text-black font-[700]">
                                    Get started
                                </button>
                            )}
                        </div>
                    </FxHoloCard>
                ))}
            </div>
        </div>
    </section>
);
};

const DigitalMarketing = () => {
    const isDayTime = useIsDayTime();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeFront, setActiveFront] = useState("frontend");
    const videoRef = useRef<HTMLVideoElement>(null);

    // Force video autoplay on mount
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Fallback if autoplay fails
                console.log('Video autoplay blocked by browser policy');
            });
        }
    }, []);

    const dmSolutions: FxScrollItem[] = [
        {
            id: 'SEO', title: 'Search Engine Optimization', target: 'SEO',
            tags: ['Organic Visibility', 'Keyword Research', 'Link Building', 'Technical Optimization'],
            body: <>We deliver comprehensive SEO strategies that improve organic search visibility, drive qualified
                traffic, and establish sustainable online authority. Our services include technical audits, extensive
                keyword research, on-page optimization, authoritative backlink acquisition through digital PR, and local
                SEOâ€”providing transparent reporting with rankings tracking, organic traffic analysis, conversion
                attribution, and competitor benchmarking.</>,
        },
        {
            id: 'PPCA', title: 'Pay-Per-Click Advertising', target: 'PPCA',
            tags: ['ROAS Optimization', 'Campaign Management', 'Conversion Tracking', 'Automated Bidding'],
            body: <>Our PPC management maximizes return on ad spend through data-driven strategies across Google Ads,
                Microsoft Advertising, and social platforms. We develop comprehensive paid search campaigns with
                granular keyword research, competitive bid analysis, compelling ad copy, and Google Shopping
                optimizationâ€”plus remarketing strategies, multi-touch attribution modelling, and advanced responsive
                search ad testing.</>,
        },
        {
            id: 'SMM', title: 'Social Media Marketing', target: 'SMM',
            tags: ['Community Engagement', 'Content Strategy', 'Paid Social Campaigns', 'Influencer Marketing'],
            body: <>We create engaging social media strategies that build brand awareness, foster community engagement,
                and generate measurable results across Facebook, Instagram, LinkedIn, Twitter, TikTok, and Pinterest.
                Our management encompasses content calendars, professional graphic design, video production, community
                management, paid social campaigns with precise audience targeting, and comprehensive analytics tracking
                reach, engagement, and conversions.</>,
        },
        {
            id: 'CM', title: 'Content Marketing', target: 'CM',
            tags: ['Thought Leadership', 'Strategic Content Creation', 'Multi-Format Distribution', 'Content Personalization'],
            body: <>Our content marketing establishes thought leadership, attracts target audiences, and drives
                conversions through strategically crafted content. We develop comprehensive strategies with buyer
                journey mapping, competitive gap analysis, and editorial calendar planningâ€”producing blog posts,
                e-books, case studies, whitepapers, infographics, video content, podcasts, and webinars distributed
                across owned, earned, and paid channels.</>,
        },
        {
            id: 'EM', title: 'Email Marketing', target: 'EM',
            tags: ['Marketing Automation', 'Audience Segmentation', 'Personalized Campaigns', 'Lifecycle Nurturing'],
            body: <>We design strategic email campaigns that nurture leads, retain customers, and maximise lifetime
                value through personalised, automated communication. Our services include audience segmentation,
                automation workflow design for welcome series and cart recovery, mobile-responsive templates, compelling
                copywriting, sophisticated behavioural triggers, predictive send time optimisation, and comprehensive
                analytics tracking open rates, conversions, and revenue attribution.</>,
        },
        {
            id: 'CRO', title: 'Conversion Rate Optimization', target: 'CRO',
            tags: ['A/B Testing', 'User Experience Analysis', 'Conversion Funnel Optimization', 'Performance Improvement'],
            body: <>Our CRO services systematically improve website and landing page performance, maximising visitor
                conversions and increasing marketing ROI. We conduct comprehensive audits with heatmaps, session
                recordings, form analytics, and user surveysâ€”then run A/B tests on headlines, CTAs, page layouts,
                pricing presentation, and trust signals, with multivariate testing and personalisation to deliver
                measurable conversion lift.</>,
        },
        {
            id: 'ORM', title: 'Online Reputation Management', target: 'ORM',
            tags: ['Brand Monitoring', 'Review Management', 'Crisis Response', 'Sentiment Analysis'],
            body: <>We protect and enhance brand reputation through proactive monitoring, strategic response management,
                and positive content amplification. Our services include comprehensive monitoring across search engines,
                review platforms, and social media; review management encouraging satisfied customers to post; negative
                content suppression; rapid crisis response protocols; and proactive thought leadership content that
                builds consumer trust and sustainable competitive advantages.</>,
        },
        {
            id: 'ADI', title: 'Analytics & Data Intelligence', target: 'ADI',
            tags: ['Data-Driven Insights', 'Attribution Modelling', 'Performance Tracking', 'Predictive Analytics'],
            body: <>We transform marketing data into actionable intelligence through comprehensive analytics
                implementation and strategic reporting. Our services include GA4 configuration, custom event tracking,
                enhanced e-commerce tracking, server-side tracking, multi-touch attribution analysis, data-driven
                attribution using machine learning, custom executive dashboards, cohort analysis, predictive analytics,
                and competitive intelligenceâ€”providing clear performance visibility and proving marketing ROI.</>,
        },
    ];


    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200); // Show the button after scrolling 200px
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
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
        const sections = dmSolutions.map(item => item.target);

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                // Check if section is in viewport (top half of screen)
                if (rect.top >= -rect.height / 2 && rect.top <= window.innerHeight / 2) {
                    setActiveId(sectionId);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        // Initialize with first section
        if (dmSolutions.length > 0 && !activeId) {
            setActiveId(dmSolutions[0].target);
        }

        // Scroll event listener
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [dmSolutions, activeId]);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            const offset = 120; // Top nav/header offset
            const elementPosition = section.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
            setActiveId(target); // Ensure the arrow icon is displayed when a section is clicked
        }
    }

    //process
    const [activePhase, setActivePhase] = useState<number>(0);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [pointer, setPointer] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const currentDayRef = useRef<number>(1);

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

    // keep the canvas loop in sync with the animated day without re-initialising particles
    useEffect(() => {
        currentDayRef.current = currentDay;
    }, [currentDay]);

    // canvas + particles animation (scoped to the process section, theme-aware)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const host = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        if (!ctx || !host) return;

        const dpr = Math.max(1, window.devicePixelRatio || 1);

        const initParticles = (count: number, w: number, h: number) => {
            const arr: Particle[] = new Array(count).fill(null).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                size: Math.random() * 2 + 1
            }));
            particlesRef.current = arr;
        };

        let lastW = 0;
        const resize = () => {
            const w = host.clientWidth;
            const h = host.clientHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
            if (Math.abs(w - lastW) > 2 || particlesRef.current.length === 0) {
                lastW = w;
                initParticles(Math.round(Math.min(90, Math.max(40, w / 30))), w, h);
            }
        };

        resize();
        window.addEventListener('resize', resize);
        const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
        observer?.observe(host);

        // phase palettes tuned per theme so particles and links stay visible on both backgrounds
        const palette = isDayTime
            ? ['rgba(8, 145, 178, 0.6)', 'rgba(147, 51, 234, 0.6)', 'rgba(5, 150, 105, 0.6)']
            : ['rgba(34, 211, 238, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(52, 211, 153, 0.6)'];

        const animate = () => {
            const width = canvas.width / dpr;
            const height = canvas.height / dpr;
            const particles = particlesRef.current;

            // subtle trail fading toward the section background
            ctx.fillStyle = isDayTime ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, width, height);

            const day = currentDayRef.current;
            const color = palette[day <= 30 ? 0 : day <= 60 ? 1 : 2];

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // wrap
                if (p.x < -20) p.x = width + 20;
                if (p.x > width + 20) p.x = -20;
                if (p.y < -20) p.y = height + 20;
                if (p.y > height + 20) p.y = -20;

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
            observer?.disconnect();
        };
    }, [isDayTime]);

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


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Unified Futuristic Digital Marketing Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Image/Video */}
                {/* Video Background (plays on desktop, image on mobile) */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/digital/Hero-M.png"
                >
                    <source src="/assets/digital/Hero-M.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image Background for Mobile and Video Fallback */}
                <Image
                    src="/assets/digital/Hero-M.png"
                    alt="Digital Marketing Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,212,0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                    <div className="gx-orbit absolute"
                         style={{width: '40vmax', height: '40vmax', bottom: '-15vmax', left: '-10vmax', opacity: .08}}/>
                </div>

                {/* Content Container - Two Column Layout */}
                <div
                    className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column - Main Content */}
                        <div>
                            {/* Eyebrow with animated dot */}
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"/>
                                <span
                                    className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Digital Marketing Strategy</span>
                            </div>

                            {/* Main Heading with Gradient */}
                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Drive Traffic &amp; <span className="gx-gradient-text">Revenue Growth</span> with
                                Data-Driven Strategies
                            </h1>

                            {/* Description */}
                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Comprehensive digital marketing solutions combining SEO, paid advertising, social media
                                marketing, content strategy, and conversion optimization to maximize your ROI and
                                accelerate sustainable business growth.
                            </p>

                            {/* Key Capabilities Pills */}
                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {["SEO Optimization", "PPC Campaigns", "Social Media", "Content Strategy", "Analytics", "Conversion Rate"].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/quote-request">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: '#00f5d4', color: '#000'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start Your Campaign →</span>
                                    </button>
                                </Link>
                                <Link href="/portfolio">
                                    <button
                                        className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                        style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                        View Case Studies
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Campaigns Managed', value: '200+'},
                                    {label: 'Marketing Experts', value: '30+'},
                                    {label: 'Avg ROI Increase', value: '300%'},
                                    {label: 'Success Rate', value: '96%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 transition-all duration-300 hover:border-teal-400/50 text-right">
                                        <div
                                            className="text-teal-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
                                        <div
                                            className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Stats - Visible on small screens only */}
                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Campaigns', value: '200+'},
                            {label: 'Experts', value: '30+'},
                            {label: 'Success', value: '96%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md">
                                <div
                                    className="text-teal-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div
                                    className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Animated Particles */}
                <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse"/>
                <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-teal-500 animate-pulse"
                     style={{animationDelay: '0.5s'}}/>
                <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse"
                     style={{animationDelay: '1s'}}/>
            </section>

            {/* Introductory Section - Futuristic Digital Marketing Strategy Overview */}
            <section ref={sectionRef}
                     className={`pt-16 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                             : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                     }`}>
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>DIGITAL STRATEGY</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Grow Your Digital <span
                                className="gx-gradient-text">Marketing Revenue</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                                <div>
                                    <p>
                                        Digital marketing excellence requires a strategic blend of data-driven insights,
                                        creative excellence, and relentless optimization. At Grey InfoTech, our digital
                                        marketing specialists combine deep industry expertise with cutting-edge tools
                                        and methodologies to deliver campaigns that drive measurable business results.
                                        From SEO and paid advertising to content marketing and conversion optimization,
                                        we architect comprehensive digital strategies that expand market reach, engage
                                        high-value prospects, and accelerate sustainable revenue growth.
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Our data-driven approach integrates advanced analytics, behavioral targeting,
                                        audience segmentation, and continuous performance optimization to maximize your
                                        marketing ROI. We develop multi-channel strategies that leverage search
                                        visibility, social media engagement, content distribution, paid media
                                        efficiency, and conversion optimization across every digital touchpoint. By
                                        combining strategic planning with agile execution and real-time performance
                                        monitoring, we deliver transparent results that demonstrate clear attribution to
                                        business outcomes. This comprehensive methodology ensures your digital marketing
                                        investments consistently drive qualified leads, accelerate customer acquisition,
                                        enhance brand authority, and achieve your most ambitious revenue objectives.
                                    </p>

                                    <div className="flex flex-wrap gap-3 text-[0.65em] mt-4">
                                        {['SEO & SEM', 'Social Marketing', 'Content Strategy', 'Conversion Optimization'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* Our Prominent Digital Marketing Services */}
            <section
                className="bg-[#050810]">
                <div id={'digital marketing Services Overview'}>
                    <FxStickyScrollSection
                        heading={<>Our Prominent<br/>Digital Marketing<br/>Services</>}
                        intro={<>Integrated solutions across search optimization, paid media, social engagement, and
                            content strategyâ€”each engineered to drive visibility, engagement, and measurable
                            conversion.</>}
                        navLabel="Our Solutions"
                        items={dmSolutions}
                        activeId={activeId}
                        onNavClick={scrollToSection}
                        day={false}
                    />
                </div>
                {/* Stats Row */}
                <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-24 pb-16 max-w-auto w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    {[
                        {number: '30+', label: 'Marketing Experts'},
                        {number: '50+', label: 'Campaigns Deployed'},
                        {number: '3X', label: 'Faster Content Publishing'},
                        {number: '70%', label: 'Better Multi-Channel ROI'},
                    ].map((stat, i) => (
                        <FxHoloCard key={i} day={false} className="p-8 flex flex-col items-center text-center gap-2">
                            <div className="text-[#00f5d4] text-4xl lg:text-5xl font-bold">{stat.number}</div>
                            <div className="text-gray-300 text-sm font-[300]">{stat.label}</div>
                        </FxHoloCard>
                    ))}
                </div>
            </section>

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
                                Key <span className={'text-[#00f5d4]'}>Features</span> Of Our <br
                                className={'lg:block md:block hidden'}/><span
                                className={'text-[#00f5d4]'}>Digital Marketing</span>
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We recognize that exceptional digital marketing partnerships extend beyond service
                                deliveryâ€”they hinge on generating quantifiable business outcomes through strategic
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
                                engagement. We optimize for actions that matter to your businessâ€”whether leads, sales,
                                appointments, downloads, or other conversion goalsâ€”by implementing conversion tracking
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
                className={`relative overflow-hidden lg:pt-[4em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[2em] pb-[1em] transition-colors duration-700 ${isDayTime ? 'bg-gradient-to-b from-slate-50 via-white to-slate-100' : 'bg-gradient-to-b from-black via-gray-950 to-black'}`}>

                {/* neural particle field (canvas sizes itself to this wrapper) */}
                <canvas ref={canvasRef}
                        className={`absolute inset-0 pointer-events-none z-0 ${isDayTime ? 'opacity-70' : 'opacity-90'}`}/>

                {/* aurora orbs with pointer parallax, scoped to this section */}
                <div
                    aria-hidden
                    className={`absolute inset-0 z-0 pointer-events-none ${isDayTime ? 'opacity-[0.14]' : 'opacity-10'}`}
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
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-emerald-500 rounded-full blur-3xl"/>
                </div>

                {/* holographic grid */}
                <div
                    aria-hidden
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(15,23,42,0.06)' : 'rgba(0,245,212,0.06)'} 1px, transparent 1px)`,
                        backgroundSize: '44px 44px',
                        maskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 90% 75% at 50% 40%, black 25%, transparent 100%)'
                    }}
                />

                {/* scanline sweep */}
                <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className={`dm-scanline absolute left-0 right-0 h-px ${isDayTime ? 'bg-gradient-to-r from-transparent via-[rgba(13,148,136,0.45)] to-transparent' : 'bg-gradient-to-r from-transparent via-[rgba(0,245,212,0.55)] to-transparent'}`}/>
                </div>

                <div id={'Our-proven-90-Day-Process'}
                     className={`relative z-10 lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative ${isDayTime ? 'text-gray-900' : 'text-white'} text-center mb-12 md:mb-20 lg:mb-20 border-b ${isDayTime ? 'border-gray-200' : 'border-gray-700'} pb-[2em] space-y-6`}>
                        <div
                            className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-sm font-mono text-[0.65em] font-[600] tracking-[0.35em] uppercase ${isDayTime ? 'border-teal-600/30 bg-teal-500/5 text-teal-700' : 'border-[#00f5d4]/30 bg-[#00f5d4]/5 text-[#00f5d4]'}`}>
                            <span className="relative flex h-2 w-2">
                                <span
                                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                                <span
                                    className={`relative inline-flex rounded-full h-2 w-2 ${isDayTime ? 'bg-teal-600' : 'bg-[#00f5d4]'}`}/>
                            </span>
                            Mission Protocol // 90 Days
                        </div>
                        <h2 className={'capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'}>
                            Our Proven <span
                            className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient ${isDayTime ? 'from-teal-600 via-cyan-600 to-violet-600' : 'from-[#00f5d4] via-cyan-400 to-violet-400'}`}>90-Day Process</span>
                        </h2>
                        <p className={`text-[0.9em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5] mx-auto max-w-6xl ${isDayTime ? 'text-gray-600' : 'text-gray-300'}`}>
                            Our structured 90-day implementation process delivers measurable results through
                            strategic planning, precise execution, and continuous optimization. This proven
                            methodology accelerates time-to-value while ensuring alignment with your business
                            objectives at every phase. By combining industry best practices with agile
                            responsiveness, we transform initial engagement into tangible outcomes, building momentum
                            that sustains long-term success and competitive performance.
                        </p>
                        <div className="flex justify-center items-center gap-4 pt-8">
                            {phases.map((p, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActivePhase(i)}
                                    className={`group relative transition-all duration-500 ${activePhase === i ? 'scale-110' : 'scale-100 opacity-70'}`}
                                    aria-label={`Select phase ${i + 1}`}
                                >
                                    <div
                                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${p.color} p-0.5 transition-all duration-500 ${activePhase === i ? 'rotate-0 shadow-lg shadow-cyan-500/20' : 'rotate-45'}`}>
                                        <div
                                            className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-2xl flex items-center justify-center transition-colors duration-500`}>
                                            <span
                                                className={`text-sm font-bold font-mono transition-transform duration-500 ${activePhase === i ? 'rotate-0' : '-rotate-45'} ${isDayTime ? 'text-gray-900' : 'text-white'}`}>{p.days.split('-')[0]}</span>
                                        </div>
                                    </div>
                                    {activePhase === i && <div
                                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 ${isDayTime ? 'bg-gray-900' : 'bg-white'} rounded-full animate-ping`}/>}
                                </button>
                            ))}
                        </div>

                        {/* Mission timeline HUD */}
                        <div
                            className={`relative max-w-3xl mx-auto text-left rounded-2xl border backdrop-blur-md px-6 py-5 ${isDayTime ? 'border-gray-200 bg-white/70 shadow-sm' : 'border-gray-800 bg-gray-900/40'}`}>
                            <span aria-hidden
                                  className={`absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 rounded-tl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 rounded-tr-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 rounded-bl-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>
                            <span aria-hidden
                                  className={`absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 rounded-br-2xl ${isDayTime ? 'border-teal-600' : 'border-[#00f5d4]'}`}/>

                            <div
                                className={`flex items-center justify-between font-mono text-[0.65em] tracking-[0.25em] uppercase mb-3 ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                <span>Mission Timeline</span>
                                <span
                                    className={isDayTime ? 'text-teal-700' : 'text-[#00f5d4]'}>Day {String(currentDay).padStart(2, '0')} / 90</span>
                            </div>
                            <div
                                className={`relative h-2 rounded-full overflow-hidden ${isDayTime ? 'bg-gray-200' : 'bg-gray-800'}`}>
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-500 transition-all duration-300"
                                    style={{width: `${(currentDay / 90) * 100}%`}}/>
                                <span aria-hidden
                                      className={`absolute top-0 bottom-0 left-1/3 w-px ${isDayTime ? 'bg-white' : 'bg-black'}`}/>
                                <span aria-hidden
                                      className={`absolute top-0 bottom-0 left-2/3 w-px ${isDayTime ? 'bg-white' : 'bg-black'}`}/>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                                <div
                                    className={`flex gap-4 font-mono text-[0.6em] tracking-[0.2em] uppercase ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span
                                        className={activePhase === 0 ? (isDayTime ? 'text-cyan-700' : 'text-cyan-400') : ''}>01 Discover</span>
                                    <span
                                        className={activePhase === 1 ? (isDayTime ? 'text-purple-700' : 'text-purple-400') : ''}>02 Launch</span>
                                    <span
                                        className={activePhase === 2 ? (isDayTime ? 'text-emerald-700' : 'text-emerald-400') : ''}>03 Scale</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setIsPlaying((s) => !s)}
                                            className={`px-4 py-1.5 rounded-full font-mono text-[0.65em] font-[700] tracking-[0.2em] uppercase transition-colors ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white text-black hover:bg-gray-200'}`}>
                                        {isPlaying ? 'Pause' : 'Play'}
                                    </button>
                                    <button onClick={() => {
                                        setIsPlaying(false);
                                        setCurrentDay(1);
                                    }}
                                            className={`px-4 py-1.5 rounded-full border font-mono text-[0.65em] font-[700] tracking-[0.2em] uppercase transition-colors ${isDayTime ? 'border-gray-300 text-gray-600 hover:border-gray-500' : 'border-gray-700 text-gray-300 hover:border-gray-500'}`}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} blur-3xl transition-opacity duration-700 ${isDayTime ? 'opacity-20' : 'opacity-25'}`}/>
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${phase.color} ${isDayTime ? 'opacity-30' : 'opacity-20'} animate-spin-slow`}/>
                                <div
                                    className={`absolute inset-4 rounded-full border border-dashed animate-spin-reverse ${isDayTime ? 'border-gray-300' : 'border-gray-700'}`}/>
                                <div className="absolute inset-0 animate-spin-slow">
                                    <span
                                        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${phase.accentColor} shadow-lg`}/>
                                </div>
                                <div
                                    className={`absolute inset-8 rounded-full bg-gradient-to-br ${phase.color} p-1 animate-pulse-slow`}>
                                    <div
                                        className={`w-full h-full ${isDayTime ? 'bg-white' : 'bg-black'} rounded-full flex items-center justify-center p-12 transition-colors duration-700`}>{phase.icon}</div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div>
                                <div
                                    className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${phase.color} text-white font-mono font-bold text-sm tracking-[0.2em] uppercase mb-4 shadow-lg`}>Days {phase.days}</div>
                                <h3 className={`text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r ${isDayTime ? 'from-gray-900 to-gray-600' : 'from-white to-gray-400'} bg-clip-text text-transparent`}>{phase.title}</h3>
                                <p className={`text-2xl font-light bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>{phase.tagline}</p>
                            </div>

                            <div className="space-y-4">
                                {phase.items.map((item, idx) => (
                                    <div key={idx}
                                         className={`group flex items-start gap-4 p-4 rounded-2xl ${isDayTime ? 'bg-white/70 border-gray-200 hover:border-gray-400 shadow-sm hover:shadow-md' : 'bg-gray-900/50 border-gray-800 hover:border-gray-600'} backdrop-blur-sm border transition-all duration-300`}>
                                        <div
                                            className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center text-sm font-bold text-white`}>{idx + 1}</div>
                                        <p className={`${isDayTime ? 'text-gray-600 group-hover:text-gray-900' : 'text-gray-300 group-hover:text-white'} transition-colors`}>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="relative group">
                        <div
                            className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl transition-opacity ${isDayTime ? 'opacity-20 group-hover:opacity-40' : 'opacity-30 group-hover:opacity-50'}`}/>
                        <div
                            className={`relative overflow-hidden ${isDayTime ? 'bg-white/80 backdrop-blur-md border-gray-200' : 'bg-gradient-to-r from-gray-900 to-black border-gray-800'} rounded-3xl p-12 border text-center`}>
                            <span aria-hidden
                                  className={`absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <span aria-hidden
                                  className={`absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 ${isDayTime ? 'border-teal-600/60' : 'border-[#00f5d4]/60'}`}/>
                            <h3 className={`text-4xl sm:text-5xl font-black mb-6 bg-gradient-to-r ${isDayTime ? 'from-gray-900 via-gray-700 to-gray-500' : 'from-white via-gray-200 to-gray-400'} bg-clip-text text-transparent`}>Ready
                                to Launch?</h3>
                            <p className={`text-xl ${isDayTime ? 'text-gray-500' : 'text-gray-400'} mb-8 max-w-2xl mx-auto`}>Join
                                the elite companies that
                                trust
                                Grey InfoTech to revolutionize their digital presence</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/contact"
                                      className={`px-8 py-3 rounded-full font-bold ${isDayTime ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100'} transition-colors`}>
                                    Start Your 90 Days
                                </Link>
                                <Link href="/portfolio"
                                      className={`px-8 py-3 rounded-full border font-bold ${isDayTime ? 'border-gray-300 text-gray-700 hover:border-gray-500' : 'border-gray-700 text-gray-300 hover:border-gray-500'} transition-colors`}>
                                    View Our Work
                                </Link>
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
                        @keyframes dm-scan { 0%{top:-5%} 100%{top:105%} }
                        .dm-scanline { animation: dm-scan 8s linear infinite; }
                        .animate-blob { animation: blob 7s infinite; }
                        .animate-gradient { background-size: 200% auto; animation: gradient 3s ease infinite; }
                        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
                        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                      `}</style>
            </div>

            {/* Pricing / Packages replaced by currency-aware component */}
            <CurrencyAwarePricing/>

            {/* Final CTA — Contact & Demo */}
            <section className="py-20">
                <div className="max-w-[90em] mx-auto px-6 sm:px-10 lg:px-[4.6em] text-center">
                    <h2 className="text-[2em] font-[800] mb-4">Ready to transform your marketing?</h2>
                    <p className="text-[1em]  mb-8">Book a free strategy call and get a customised 90-day
                        growth plan.</p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/quote-request">
                            <button className="px-8 py-4 rounded-full bg-[#00f5d4] text-black font-[800]">Book Strategy
                                Call
                            </button>
                        </Link>
                        <Link href="/portfolio">
                            <button
                                className={`px-8 py-4 rounded-full border ${isDayTime ? 'border-black text-black' : '  border-white/20 text-white'}`}>View
                                Work
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <ServiceCapabilities
                accentColor="#14b8a6"
                variant="terminal"
                isDarkBg={!isDayTime}
                ctaHref="/quote-request"
                ctaLabel="Request a Quote"
                capabilities={[
                    {
                        id: "seo-content",
                        icon: "🔍",
                        title: "SEO & Content",
                        description: "Advanced technical SEO audits, data-driven keyword strategy, and AI-enhanced content optimization to dominate search rankings."
                    },
                    {
                        id: "paid-advertising",
                        icon: "🎯",
                        title: "Paid Advertising",
                        description: "Programmatic campaigns across Google, Meta, and LinkedIn with ML-powered targeting, real-time bid optimization, and transparent ROI tracking."
                    },
                    {
                        id: "social-media",
                        icon: "📱",
                        title: "Social Media",
                        description: "Platform-native strategies with predictive analytics, community intelligence, and organic growth acceleration through authentic engagement."
                    },
                    {
                        id: "email-marketing",
                        icon: "📧",
                        title: "Email Marketing",
                        description: "Intelligent automation with behavioral triggers, dynamic segmentation, and personalized lifecycle journeys that drive conversion and retention."
                    },
                    {
                        id: "analytics-reporting",
                        icon: "📊",
                        title: "Analytics & Reporting",
                        description: "Real-time intelligence dashboards with advanced attribution modeling, predictive analytics, and actionable insights across all channels."
                    },
                    {
                        id: "conversion-optimization",
                        icon: "📈",
                        title: "Conversion Optimisation",
                        description: "Continuous A/B testing, advanced funnel analysis, and conversion rate optimization powered by behavioral data and machine learning."
                    },
                ]}
            />
        </div>
    );
};

export default DigitalMarketing;
