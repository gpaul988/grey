'use client';

import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import CountUp from 'react-countup';
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';
import {AnimatePresence} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import ProcessesSection from '@/components/futuristic/ProcessesSection';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxFrame,
    FxStickyScrollSection
} from '@/components/futuristic/fx';

const WebApplication = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("saas");
    const [isVisible, setIsVisible] = useState(false);

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDaytime react hook
    const isDayTime = useIsDayTime();

    // Introductory section hook
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.15 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Web App Solutions section scroll tracking
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "saas",
                "pwa",
                "cms",
                "ecommerce",
                "collab",
                "analytics",
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

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target);
        }
    };

    const stats = [
        {label: 'Years Experience', value: 12, suffix: '+'},
        {label: 'Applications Built', value: 220, suffix: '+'},
        {label: 'Team Members', value: 18, suffix: '+'},
        {label: 'Projects Delivered', value: 350, suffix: '+'},
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Hero section */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Background Video */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/web-app/hero.jpg"
                >
                    <source src="/assets/hero/hero.mp4" type="video/mp4"/>
                </video>

                {/* Fallback Image for Mobile */}
                <Image
                    src="/assets/web-app/hero.jpg"
                    alt="Web Application Development Hero"
                    fill
                    priority
                    className="lg:hidden object-cover"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>

                {/* Hero Content */}
                <div className="relative z-[3] h-full flex flex-col justify-between p-8 lg:p-16">
                    <div />
                    <div className="space-y-6">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2, duration: 0.8}}
                        >
                            <FxChip label="Web Application Development" day={isDayTime}/>
                        </motion.div>

                        <motion.h1
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4, duration: 0.8}}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight"
                        >
                            Powerful Browser-Based <span className="gx-gradient-text">Applications</span> That Scale
                        </motion.h1>

                        <motion.p
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.6, duration: 0.8}}
                            className="text-xl text-white/70 max-w-2xl"
                        >
                            From SaaS platforms and PWAs to e-commerce systems and collaboration tools — we build web applications that reach users anywhere, perform beautifully, and drive measurable business impact.
                        </motion.p>

                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.8, duration: 0.8}}
                            className="flex gap-4 pt-4"
                        >
                            <Link href="#solutions">
                                <FxButton variant="primary">Explore Solutions</FxButton>
                            </Link>
                            <Link href="/contact">
                                <FxButton variant="secondary">Start Your Project</FxButton>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Stats Pills */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 1, duration: 0.8}}
                        className="flex flex-wrap gap-6"
                    >
                        {stats.map((stat, idx) => (
                            <div key={idx} className="gx-data-pill">
                                <div className="text-2xl font-bold text-cyan-400">
                                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.5}/>
                                </div>
                                <div className="text-sm text-white/60">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section ref={sectionRef} className={`relative py-20 lg:py-32 transition-all duration-500 ${isBackgroundActive ? 'bg-opacity-100' : 'bg-opacity-0'}`}>
                <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ${isBackgroundActive ? 'opacity-100' : 'opacity-0'}`}>
                    <FxBackground day={isDayTime} grid={true} aurora={false}/>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.8}}
                            viewport={{once: true}}
                        >
                            <FxChip label="Browser-Based, Accessible, Powerful" day={isDayTime}/>
                            <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-6">
                                Web Application Development: <span className="gx-gradient-text">Building for the Browser</span>
                            </h2>
                            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                                <p>
                                    Web applications have become the dominant platform for business software. At Grey InfoTech we build web applications that harness modern browser capabilities to deliver experiences rivaling native applications. From SaaS platforms and content systems to progressive web apps and real-time collaboration tools, web technology enables us to build once and reach users on any device.
                                </p>
                                <p>
                                    We combine modern web technologies, proven patterns, and careful attention to performance and user experience to create applications that users actually want to use.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.8}}
                            viewport={{once: true}}
                            className="relative"
                        >
                            <Image
                                src="/assets/web-app/intro.jpg"
                                alt="Web Application Development"
                                width={600}
                                height={400}
                                className="rounded-2xl"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8, delay: 0.2}}
                        viewport={{once: true}}
                        className="grid md:grid-cols-3 gap-8 mt-20"
                    >
                        <FxFrame day={isDayTime} className="p-8">
                            <div className="text-4xl font-bold text-cyan-400 mb-4">∞</div>
                            <h3 className="text-xl font-semibold mb-3">Universal Accessibility</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Works on any device with a browser. No installation required. Users stay updated automatically as you deploy changes.
                            </p>
                        </FxFrame>
                        <FxFrame day={isDayTime} className="p-8">
                            <div className="text-4xl font-bold text-blue-400 mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-3">Modern Capabilities</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Modern browser APIs provide offline functionality, push notifications, geolocation, and near-native performance.
                            </p>
                        </FxFrame>
                        <FxFrame day={isDayTime} className="p-8">
                            <div className="text-4xl font-bold text-purple-400 mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-3">Cost Efficiency</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Single web application instead of native apps for each platform. Lower development costs and smaller maintenance teams.
                            </p>
                        </FxFrame>
                    </motion.div>
                </div>
            </section>

            {/* Web Application Solutions with Sticky Scroll */}
            <section id="solutions" className="relative py-20 lg:py-32 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={true}/>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 mb-16">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="max-w-2xl"
                    >
                        <FxChip label="Comprehensive Solutions" day={isDayTime}/>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Web Application Solutions
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                            From browser-based systems and SaaS applications to progressive web apps and content platforms, we deliver comprehensive web application development with modern technologies and best practices.
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <FxStickyScrollSection
                        intro="Web Application Solutions"
                        navLabel="Solution Types"
                        activeId={activeId}
                        onNavClickAction={scrollToSection}
                        items={[
                            {
                                id: "saas",
                                label: "SaaS Applications",
                                title: "Multi-Tenant SaaS Platforms",
                                description: "We build subscription-based SaaS applications with multi-tenant architecture, billing integration, and team collaboration features. User authentication, role-based access, analytics, and automation enable businesses to monetize software effectively.",
                                tags: ["Multi-tenant", "Billing", "Scalable"],
                                image: "/assets/web-app/saas.jpg",
                                color: "from-cyan-500 to-blue-500"
                            },
                            {
                                id: "pwa",
                                label: "Progressive Web Apps",
                                title: "App-Like Web Experiences",
                                description: "We develop progressive web apps that work offline, load instantly, and deliver app-like experiences from the browser. Service workers, caching strategies, and responsive design create applications that compete with native apps.",
                                tags: ["PWA", "Offline", "Performance"],
                                image: "/assets/web-app/pwa.jpg",
                                color: "from-blue-500 to-purple-500"
                            },
                            {
                                id: "cms",
                                label: "Content Management Systems",
                                title: "Publishing & Content Platforms",
                                description: "We build content management systems and publishing platforms that enable non-technical users to create and manage content. Editorial workflows, scheduling, SEO optimization, and multi-channel publishing drive content distribution at scale.",
                                tags: ["CMS", "Publishing", "Content"],
                                image: "/assets/web-app/cms.jpg",
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                id: "ecommerce",
                                label: "E-Commerce Platforms",
                                title: "High-Performance Store Systems",
                                description: "We develop e-commerce platforms with product catalogs, shopping carts, secure checkout, and payment integration. Performance optimization, conversion rate optimization, and mobile responsiveness drive sales and customer satisfaction.",
                                tags: ["Store", "Checkout", "Conversion"],
                                image: "/assets/web-app/ecommerce.jpg",
                                color: "from-pink-500 to-red-500"
                            },
                            {
                                id: "collab",
                                label: "Collaboration Tools",
                                title: "Real-Time Productivity Apps",
                                description: "We build collaboration tools enabling teams to work together — document editing, task management, communication, and workflow automation. Real-time synchronization and responsive UI create seamless collaboration experiences.",
                                tags: ["Real-time", "Collaboration", "Features"],
                                image: "/assets/web-app/collab.jpg",
                                color: "from-red-500 to-orange-500"
                            },
                            {
                                id: "analytics",
                                label: "Analytics Dashboards",
                                title: "Data-Driven Decision Making",
                                description: "We develop analytics and reporting dashboards that transform data into actionable insights. Real-time metrics, custom reports, data visualization, and drill-down capabilities enable data-driven decision-making.",
                                tags: ["Analytics", "Reporting", "Insights"],
                                image: "/assets/web-app/analytics.jpg",
                                color: "from-orange-500 to-yellow-500"
                            },
                        ]}
                    />
                </div>
            </section>

            {/* Development Process Section using ProcessesSection component */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={false}/>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="mb-16"
                    >
                        <FxChip label="Our Development Methodology" day={isDayTime}/>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Web Application Development Process
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
                            Our proven development methodology ensures every web application is architected for scalability, performance, and user satisfaction.
                        </p>
                    </motion.div>

                    <ProcessesSection/>
                </div>
            </section>

            {/* Why Choose Us - Features Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={true}/>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="mb-16"
                    >
                        <FxChip label="Why Choose Grey InfoTech" day={isDayTime}/>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Web Excellence <span className="gx-gradient-text">Delivered</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🎯",
                                title: "Performance First",
                                description: "Lightning-fast load times, smooth 60fps interactions, and optimized core web vitals that keep users engaged."
                            },
                            {
                                icon: "📱",
                                title: "Mobile Optimized",
                                description: "Responsive design that works flawlessly on phones, tablets, and desktops with touch-first interaction patterns."
                            },
                            {
                                icon: "🔒",
                                title: "Security Built-In",
                                description: "Enterprise-grade security with HTTPS/TLS, authentication, authorization, and protection against common vulnerabilities."
                            },
                            {
                                icon: "📈",
                                title: "Scalable Architecture",
                                description: "Applications that grow with your business, handling increased load and user traffic without performance degradation."
                            },
                            {
                                icon: "🔄",
                                title: "Continuous Deployment",
                                description: "Modern DevOps practices enable rapid iteration, testing, and deployment with zero-downtime updates."
                            },
                            {
                                icon: "👥",
                                title: "User-Focused Design",
                                description: "Every decision driven by user research and data, ensuring intuitive interfaces that delight and convert."
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: idx * 0.1}}
                                viewport={{once: true}}
                            >
                                <FxFrame day={isDayTime} className="p-8 h-full">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                                </FxFrame>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={false}/>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                        className="mb-16"
                    >
                        <FxChip label="Client Success Stories" day={isDayTime}/>
                        <h2 className="text-4xl lg:text-5xl font-bold mt-6">What Our Clients Say</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Kwame Mensah",
                                title: "CEO, SaaS Company",
                                message: "Grey InfoTech's web application platform handles 1M+ monthly users seamlessly. The architecture scales beautifully, and the user experience is excellent. Best investment we've made in our technology."
                            },
                            {
                                name: "Francesca Benedetti",
                                title: "Founder, Content Platform",
                                message: "Their progressive web app works offline which was critical for our mobile users with connectivity issues. Performance improved 40%, engagement increased significantly. Fantastic solution."
                            },
                            {
                                name: "Rajeev Kumar",
                                title: "VP Product, E-commerce Company",
                                message: "Web application from Grey InfoTech works perfectly on mobile, tablet, and desktop. Conversion rates improved noticeably and the development cost was half of building native apps. Excellent partnership."
                            },
                        ].map((testimonial, idx) => (
                            <motion.div
                                key={idx}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.8, delay: idx * 0.1}}
                                viewport={{once: true}}
                            >
                                <FxFrame day={isDayTime} className="p-8 h-full flex flex-col justify-between">
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{testimonial.message}"</p>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                                    </div>
                                </FxFrame>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 z-0">
                    <FxBackground day={isDayTime} grid={true} aurora={true}/>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            Build Powerful <span className="gx-gradient-text">Web Applications</span>
                        </h2>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                            From SaaS platforms and progressive web apps to content management systems and e-commerce platforms, Grey InfoTech delivers web applications that reach your users across devices and drive real business results. Let's build something extraordinary.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/contact">
                                <FxButton variant="primary">Get Started</FxButton>
                            </Link>
                            <Link href="/portfolio">
                                <FxButton variant="secondary">View Our Work</FxButton>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default WebApplication;
