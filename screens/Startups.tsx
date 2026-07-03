'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import {AnimatePresence, motion} from 'framer-motion'
import Image from "next/image";
import Link from "next/link";
import FloatingButton from "@/components/FloatingButton";
import {useIsDayTime} from '../components/useIsDayTime';
import {
    FxBackground,
    FxChip,
    FxReveal,
    FxButton,
    FxHoloCard,
    FxFrame,
    FxGlitchText,
    FxSectionHeading,
    FxOrbit,
    FxStickyScrollSection,
    FxScrollItem
} from '@/components/futuristic/fx';

const reasons = [
    {
        id: 1,
        title: 'Proven History of Commercial Achievement',
        description: 'We have assisted startups, such as POAWD Ltd., in reaching noteworthy milestones and scaling to' +
            ' success.  Our emphasis on creating user-centered, scalable solutions guarantees that your firm is ready for market success.',
    },
    {
        id: 2,
        title: 'Startup-Oriented Proficiency',
        description: 'We create solutions to meet strict budgets, short turnaround times, and changing objectives since' +
            'we recognize the difficulties faced by entrepreneurs.  Our customized strategy guarantees that your software' +
            ' is scalable, agile, and in line with business goals.'
    },
    {
        id: 3,
        title: 'Complete Assistance',
        description: 'We support you at every stage of your journey, from conception to launch and beyond.  Our proactive' +
            ' support guarantees that your software develops without hiccups, freeing you up to concentrate on growing your company.'
    },
    {
        id: 4,
        title: 'Innovative Techniques and Technologies',
        description: 'We use agile development in conjunction with frameworks like React, Node.js, and Laravel to provide' +
            ' cutting-edge, flexible, and future-proof solutions that expand with your company.'
    },
    {
        id: 5,
        title: 'A collaborator in development',
        description: 'We consider ourselves to be your partner, not just a supplier of services.  Every solution is designed' +
            ' to assist your long-term success and goals thanks to our collaborative approach.'
    },
];

const Startups = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev % reasons.length) + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
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
    const isDayTime = useIsDayTime();


    const handleScroll = () => {
        const sections = [
            "integration",
            "virtual",
            "data",
            "scalable",
            "custom",
            "cloud",
            "end",
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
    };

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.2) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* ── Futuristic Hero ── */}
            <section className="relative overflow-hidden min-h-[80vh] flex flex-col justify-end">
                <div className="absolute inset-0">
                    <Image
                        src='/assets/startup/hero.jpg'
                        alt='startups'
                        fill
                        sizes="100vw"
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90"/>
                <FxBackground day={false} grid aurora className="opacity-55"/>
                <div className="gx-scanline pointer-events-none"/>
                <div className="gx-hero-scan"/>
                <div className="gx-noise-overlay"/>
                <div className="gx-orbit pointer-events-none absolute"
                     style={{width: '75vmax', height: '75vmax', top: '-28vmax', right: '-25vmax', opacity: .16}}/>
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute"
                     style={{width: '48vmax', height: '48vmax', top: '-10vmax', right: '-5vmax', opacity: .11}}/>

                <div className="relative z-10 gx-page-hero-content">
                    <div
                        className="max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                        <FxReveal>
                            <FxChip day={false} className="mb-5 text-white">For Startups</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-5xl">
                                <FxGlitchText tag="h1" className="gx-hero-title text-white">
                                    Development <br/>Services
                                    <span className="gx-gradient-text"> for Startups</span>
                                </FxGlitchText>
                            </div>
                            <p className="text-white/65 max-w-3xl text-[0.95em] md:text-[1.05em] leading-relaxed mb-8">
                                From validated MVP to scaled platform — we&apos;ve helped startups launch, grow, and
                                succeed in over 15 industries.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {['MVP Development', 'Virtual CTO', 'Scalable Architecture', 'Lean & Agile'].map(s => (
                                    <span key={s} className="gx-data-pill">{s}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* ── Intro ── */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>YOUR INSIGHTS, OUR
                            EXPERIENCE</FxChip>
                    </div>
                    <div>
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Enabling startups to<br/><span
                                className="gx-gradient-text">launch, grow and succeed</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div>
                                    <p>Our specialty at <Link href='/#'
                                                              className={`border-b-[0.1em] ${isDayTime ? 'border-gray-800' : 'border-gray-300'}`}>Grey
                                        InfoTech</Link> is turning innovative concepts into digital products that are
                                        profitable. We have years of experience working with startups, so we are aware
                                        of the particular difficulties they face, such as limited funding, short
                                        turnaround times, and the requirement for scalable solutions.</p>
                                </div>
                                <div>
                                    <p>Our customized strategy blends state-of-the-art technology, creative thinking,
                                        and a strong dedication to your development. Grey InfoTech is your success
                                        partner whether you&apos;re scaling your business or creating an <Link
                                            href='/services/MVP' className='border-b-[0.1em] border-gray-300'>MVP</Link>.
                                    </p>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            <FxStickyScrollSection
                day={isDayTime}
                heading={<>Development<br/>solutions for startups</>}
                intro="Writing code is only one aspect of developing software for a startup; another is laying the groundwork for expansion, creativity, and sustained success."
                navLabel="Our Solutions"
                activeId={activeId}
                onNavClick={scrollToSection}
                items={[
                    {
                        id: "01",
                        title: "Integration solutions",
                        target: "integration",
                        body: (
                            <p>By connecting your product to third-party APIs, payment gateways, CRMs, and other crucial
                                systems, our integration solutions guarantee a cohesive and effective workflow. We help
                                you increase user satisfaction, save time, and streamline operations by removing data
                                silos and improving interoperability. We offer solutions that support your
                                company&apos;s goals, whether you&apos;re integrating pre-existing tools or require
                                specially designed connections.</p>
                        ),
                    },
                    {
                        id: "02",
                        title: "Virtual CTO services",
                        target: "virtual",
                        tags: ["Startup strategy", "Technical leadership", "Tech roadmap"],
                        body: (
                            <p>Early on, it is not practical for many startups to hire a full-time Chief Technology
                                Officer (CTO). Our Virtual CTO services can help with that. Without the long-term
                                commitment of a full-time hire, we provide startups with access to senior-level
                                technical expertise and strategic direction. In order to make well-informed technology
                                decisions, match development with business goals, and develop a plan for scalable
                                expansion, our virtual CTOs collaborate closely with your team.</p>
                        ),
                    },
                    {
                        id: "03",
                        title: "Data-driven solutions",
                        target: "data",
                        tags: ["Business Intelligence", "Data analytics", "Data driven decisions"],
                        body: (
                            <p>One of your most important resources is data, which we assist you in using to guide your
                                choices. We create solutions that transform unstructured data into strategic
                                possibilities, ranging from operational measurements, KPIs, and OKRs to consumer
                                behavior analytics. This enables you to fully comply with data protection laws while
                                improving customer engagement, streamlining your offering, and finding new income
                                sources.</p>
                        ),
                    },
                    {
                        id: "04",
                        title: "Scalable MVPs",
                        target: "scalable",
                        tags: ["MVP development", "Lean startup", "Market validation", "Startup growth"],
                        body: (
                            <p>More than just a prototype, a Minimum Viable Product (MVP) is your first step in gaining
                                early adopters and validating your business concept. Many startups have benefited from
                                our assistance in creating MVPs that offer distinctive business value. Our method
                                guarantees that your MVP is scalable in addition to being functional, allowing you to
                                add features and grow as your company does. Quick development cycles allow you to launch
                                your MVP as soon as possible, get insightful feedback, and iterate efficiently to
                                maximize the potential of your product.</p>
                        ),
                    },
                    {
                        id: "05",
                        title: "Custom application development",
                        target: "custom",
                        tags: ["Custom apps", "Bespoke software", "Startup development", "Agile"],
                        body: (
                            <p>Any successful startup relies heavily on custom applications, which is why you&apos;re
                                doing this. We create custom software that is suited to your target market and business
                                requirements. We develop cutting-edge solutions that address practical issues and
                                provide financial value, whether it&apos;s a robust web platform, a <Link
                                    href='/services/Mobile-Application-Development'
                                    className='border-b border-current opacity-70 hover:opacity-100'>mobile app</Link>,
                                or a combination of the two.</p>
                        ),
                    },
                    {
                        id: "06",
                        title: "Cloud-based platforms",
                        target: "cloud",
                        tags: ["Cloud computing", "Scalable platforms", "Secure software"],
                        body: (
                            <p>Cloud-based platforms offer the foundation for scalability and reliability, which are
                                crucial for startups. Our cloud solutions guarantee excellent security and performance
                                while optimizing your operations by enabling software accessibility from any location at
                                any time. We work with leading cloud providers such as Amazon AWS, Azure and Digital
                                Ocean to build platforms that grow with your business, whether dealing with spikes in
                                user activity, expanding into new markets, or adding advanced functionalities.</p>
                        ),
                    },
                    {
                        id: "07",
                        title: "End-to-End product lifecycle management",
                        target: "end",
                        tags: ["Product lifecycle", "Startup support", "Feature enhancements", "Startup scaling"],
                        body: (
                            <p>A startup product launch is just the first step. Our comprehensive product lifecycle
                                management services guarantee that your software keeps developing and prospering. We are
                                your partner at every stage of the process, from original development and implementation
                                to upgrades, scalability, and continuing maintenance.</p>
                        ),
                    },
                ] satisfies FxScrollItem[]}
            />

            <div
                className={`relative lg:py-32 py-16 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                    backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                }}/>

                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20"
                         style={{background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)'}}/>
                    <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10"
                         style={{background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'}}/>
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-14">
                            <FxChip day={isDayTime}>YOUR DIGITAL ADVENTURE</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>FOR STARTUPS</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <FxReveal>
                            <div className="relative">
                                <div
                                    className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10"/>
                                <div
                                    className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10"/>
                                <div
                                    className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10"/>
                                <div className="absolute inset-0 rounded-2xl opacity-40"
                                     style={{boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)'}}/>
                                <div className="relative overflow-hidden rounded-2xl">
                                    <Image src="/assets/startup/startup.jpg" alt="startup development" width={600}
                                           height={440} className="w-full object-cover" style={{height: 'auto'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)'}}/>
                                    <div className="absolute inset-0 pointer-events-none"
                                         style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)'}}/>
                                    <motion.div initial={{opacity: 0, y: 10}} whileInView={{opacity: 1, y: 0}}
                                                viewport={{once: true}} transition={{delay: 0.4}}
                                                className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                                                style={{
                                                    background: 'rgba(0,0,0,0.65)',
                                                    border: '1px solid rgba(45,212,191,0.35)'
                                                }}>
                                        ◈ MVPs · Custom Apps · Scale
                                    </motion.div>
                                </div>
                                <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                                            className="absolute -right-6 top-10 hidden lg:block">
                                    <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                                         style={{
                                             background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)',
                                             border: '1px solid rgba(45,212,191,0.35)'
                                         }}>
                                        <div className="text-[2em] font-[900] text-teal-400 leading-none">50+</div>
                                        <div
                                            className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Projects
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FxReveal>

                        <div>
                            <FxReveal delay={0.1}>
                                <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                                    Your digital <span className="gx-gradient-text">adventure</span><br/>
                                    <span
                                        className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>starts here.</span>
                                </h2>
                            </FxReveal>
                            <FxReveal delay={0.18}>
                                <p className={`text-[0.9em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    Our specialty in the fast-paced IT industry is assisting business owners and
                                    entrepreneurs in realizing their product concepts. We&apos;ve developed MVPs, built
                                    digital products, scaled tech and infrastructure, and supported numerous startups
                                    from launch to success.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.24}>
                                <p className={`text-[0.9em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>
                                    We understand the unique challenges startups face — limited budgets, tight
                                    timelines, and the need for scalable solutions. That&apos;s why we deliver lean,
                                    agile, and cost-effective solutions tailored to your growth trajectory.
                                </p>
                            </FxReveal>
                            <FxReveal delay={0.3}>
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {['MVP Development', 'Startup Strategy', 'Scalable Architecture', 'Lean & Agile'].map(item => (
                                        <span key={item}
                                              className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-400/30 text-teal-300 bg-teal-400/08' : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>{item}</span>
                                    ))}
                                </div>
                            </FxReveal>
                            <FxReveal delay={0.36}>
                                <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                                    Let&apos;s discuss your plans and figure out how we can support your startup&apos;s
                                    growth.
                                </p>
                                <FxButton day={!isDayTime} href="/contact" variant="solid">Get in touch <span
                                    className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                            </FxReveal>
                        </div>
                    </div>

                    <FxReveal delay={0.1} y={16}>
                        <div
                            className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                            {[
                                {val: '50+', label: 'Projects Delivered'},
                                {val: '8+', label: 'Years of Expertise'},
                                {val: '15+', label: 'Industries Served'},
                                {val: '100%', label: 'Client Satisfaction'},
                            ].map(s => (
                                <div key={s.label} className="text-center lg:text-left">
                                    <div
                                        className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                                    <div
                                        className={`text-[0.72em] font-[500] tracking-tight ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </FxReveal>
                </div>
            </div>

            {/* ── Why Grey InfoTech — Company-style approach ── */}
            <div
                className={`relative overflow-hidden ${isDayTime ? 'bg-slate-950' : 'bg-slate-50'} lg:pt-[5em] pt-[3em] lg:pb-[6em] pb-[3em]`}>
                <FxBackground day={false} grid aurora className="opacity-50"/>
                <FxOrbit size={600} top="-100px" right="-180px" opacity={0.12} speed={32}/>
                <FxOrbit size={350} top="200px" left="-120px" opacity={0.09} speed={26} reverse/>

                <div className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em]">
                    {/* Heading row */}
                    <FxReveal>
                        <div
                            className={`grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b border-white/10 pb-10 mb-12 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <FxSectionHeading
                                day={false}
                                eyebrow="Why Us"
                                title="Why Grey InfoTech for your startup"
                            />
                            <p className="text-[0.873em] font-[400] lg:-mt-[0.2em] leading-[1.5] text-white/55 lg:-ml-[7em]">
                                We blend startup speed with enterprise discipline so you get a partner that understands
                                product-market fit, technical execution, and long-term scalability from day one.
                            </p>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-8">
                        {/* Left — FxHoloCard accordion */}
                        <div className="flex flex-col gap-3 lg:pr-[3em]">
                            {reasons.map((reason, index) => {
                                const isActive = index + 1 === activeIndex;
                                return (
                                    <FxHoloCard
                                        key={reason.id}
                                        day={false}
                                        className={`p-5 transition-all duration-300 cursor-pointer ${isActive ? 'ring-1 ring-teal-400/40' : 'opacity-60 hover:opacity-90'}`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        <h3 className={`leading-[1.2] lg:text-[1.1em] text-[1em] font-[600] mb-2 transition-all ${isActive ? 'text-teal-300' : 'text-white/55'}`}>
                                            <span
                                                className="font-mono text-[0.68em] mr-2 text-teal-500/50">{String(reason.id).padStart(2, '0')}</span>
                                            {reason.title}
                                        </h3>
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.p
                                                    key={reason.id}
                                                    initial={{opacity: 0, height: 0}}
                                                    animate={{opacity: 1, height: 'auto'}}
                                                    exit={{opacity: 0, height: 0}}
                                                    transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                                                    className={`text-[0.875em] leading-[1.6] overflow-hidden ${isDayTime ? 'text-white/55' : 'text-black/55'}`}
                                                >
                                                    {reason.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </FxHoloCard>
                                );
                            })}
                        </div>

                        {/* Right — image */}
                        <div className="">
                            <FxFrame className="w-full">
                                <Image src="/assets/startup/mockup.jpg" alt="Why Grey InfoTech for your startup"
                                       width={660} height={280}
                                       className="w-full h-auto rounded-xl object-cover"/>
                            </FxFrame>
                        </div>
                    </div>

                    {/* CTA */}
                    <FxReveal className="mt-16 flex flex-col items-center justify-center text-center">
                        <FxGlitchText tag="h2"
                                      className="lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 text-white">
                            Prepared to initiate the discussion?
                        </FxGlitchText>
                        <FxButton day={false} href="/contact" variant="solid">Get started →</FxButton>
                    </FxReveal>
                </div>
            </div>

            {/* Startups Products — Redesigned Modern Card Layout */}
            <div
                className={`relative overflow-hidden lg:-mt-20 lg:py-32 md:py-16 py-8 lg:mt-32 md:mt-24 mt-8 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-20"/>
                <div
                    className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    {/* Section Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 lg:mb-16 mb-10 border-b lg:pb-[5em] pb-[3em] ${isDayTime ? 'text-black border-gray-200' : 'text-white border-white/10'}`}>
                        <div>
                            <FxReveal>
                                <FxGlitchText tag="h2"
                                              className={`lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] tracking-tighter leading-[1.2] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    Popular product types for startups
                                </FxGlitchText>
                            </FxReveal>
                        </div>
                        <div>
                            <p className={`text-[0.875em] font-[400] leading-[1.5] ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}>
                                These app categories are not only popular, but they have also been shown to generate
                                significant market traction when developed with the proper competence. Our talents
                                extend far beyond these areas; if you have a vision, we&#39;re here to make it reality.
                            </p>
                        </div>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mb-8 mb-6">
                        {/* On-Demand Services */}
                        <Link href='/industries/Ondemand'>
                            <FxReveal>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    className="h-full">
                                    <div
                                        className={`group relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                                        ${isDayTime
                                            ? 'bg-gradient-to-br from-white/80 via-white/60 to-gray-100/50 border border-white/30 hover:border-teal-300/50 shadow-lg hover:shadow-teal-200/30'
                                            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 hover:border-teal-400/40 shadow-2xl hover:shadow-teal-500/20'
                                        } backdrop-blur-xl p-8`}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isDayTime
                                            ? 'bg-gradient-to-br from-teal-50/30 via-transparent to-transparent'
                                            : 'bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10'
                                        }`}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div
                                                    className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    🚀
                                                </div>
                                                <motion.div
                                                    initial={{opacity: 0, x: -10}}
                                                    whileHover={{opacity: 1, x: 0}}
                                                    className={`text-xl transition-all ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                    →
                                                </motion.div>
                                            </div>

                                            <h3 className={`text-[1.6em] font-[700] mb-3 transition-colors duration-300
                                                ${isDayTime ? 'text-black group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'}`}>
                                                On-Demand Services
                                            </h3>

                                            <p className={`text-[0.875em] font-[400] leading-[1.6] transition-colors
                                                ${isDayTime ? 'text-gray-600 group-hover:text-gray-700' : 'text-white/60 group-hover:text-white/80'}`}>
                                                Real-time monitoring, scheduling, and location-based features that
                                                connect users to services instantaneously with efficiency.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        </Link>

                        {/* Healthcare & Fitness */}
                        <Link href='/industries/healthcare'>
                            <FxReveal>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    className="h-full">
                                    <div
                                        className={`group relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                                        ${isDayTime
                                            ? 'bg-gradient-to-br from-white/80 via-white/60 to-gray-100/50 border border-white/30 hover:border-teal-300/50 shadow-lg hover:shadow-teal-200/30'
                                            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 hover:border-teal-400/40 shadow-2xl hover:shadow-teal-500/20'
                                        } backdrop-blur-xl p-8`}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isDayTime
                                            ? 'bg-gradient-to-br from-teal-50/30 via-transparent to-transparent'
                                            : 'bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10'
                                        }`}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div
                                                    className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    💊
                                                </div>
                                                <motion.div
                                                    initial={{opacity: 0, x: -10}}
                                                    whileHover={{opacity: 1, x: 0}}
                                                    className={`text-xl transition-all ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                    →
                                                </motion.div>
                                            </div>

                                            <h3 className={`text-[1.6em] font-[700] mb-3 transition-colors duration-300
                                                ${isDayTime ? 'text-black group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'}`}>
                                                Healthcare & Fitness
                                            </h3>

                                            <p className={`text-[0.875em] font-[400] leading-[1.6] transition-colors
                                                ${isDayTime ? 'text-gray-600 group-hover:text-gray-700' : 'text-white/60 group-hover:text-white/80'}`}>
                                                AI and wearables integrated with telemedicine, fitness tracking, and
                                                personalized health solutions for wellness.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        </Link>

                        {/* E-Commerce & Marketplace */}
                        <Link href='/industries/e-commerce-development'>
                            <FxReveal>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    className="h-full">
                                    <div
                                        className={`group relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                                        ${isDayTime
                                            ? 'bg-gradient-to-br from-white/80 via-white/60 to-gray-100/50 border border-white/30 hover:border-teal-300/50 shadow-lg hover:shadow-teal-200/30'
                                            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 hover:border-teal-400/40 shadow-2xl hover:shadow-teal-500/20'
                                        } backdrop-blur-xl p-8`}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isDayTime
                                            ? 'bg-gradient-to-br from-teal-50/30 via-transparent to-transparent'
                                            : 'bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10'
                                        }`}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div
                                                    className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    🛒
                                                </div>
                                                <motion.div
                                                    initial={{opacity: 0, x: -10}}
                                                    whileHover={{opacity: 1, x: 0}}
                                                    className={`text-xl transition-all ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                    →
                                                </motion.div>
                                            </div>

                                            <h3 className={`text-[1.6em] font-[700] mb-3 transition-colors duration-300
                                                ${isDayTime ? 'text-black group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'}`}>
                                                E-Commerce & Marketplace
                                            </h3>

                                            <p className={`text-[0.875em] font-[400] leading-[1.6] transition-colors
                                                ${isDayTime ? 'text-gray-600 group-hover:text-gray-700' : 'text-white/60 group-hover:text-white/80'}`}>
                                                Scalable platforms with secure payments, personalized recommendations,
                                                and streamlined commerce functionality.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        </Link>

                        {/* FinTech Solutions */}
                        <Link href='/industries/fintech'>
                            <FxReveal>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    className="h-full">
                                    <div
                                        className={`group relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                                        ${isDayTime
                                            ? 'bg-gradient-to-br from-white/80 via-white/60 to-gray-100/50 border border-white/30 hover:border-teal-300/50 shadow-lg hover:shadow-teal-200/30'
                                            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 hover:border-teal-400/40 shadow-2xl hover:shadow-teal-500/20'
                                        } backdrop-blur-xl p-8`}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isDayTime
                                            ? 'bg-gradient-to-br from-teal-50/30 via-transparent to-transparent'
                                            : 'bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10'
                                        }`}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div
                                                    className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    💳
                                                </div>
                                                <motion.div
                                                    initial={{opacity: 0, x: -10}}
                                                    whileHover={{opacity: 1, x: 0}}
                                                    className={`text-xl transition-all ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                    →
                                                </motion.div>
                                            </div>

                                            <h3 className={`text-[1.6em] font-[700] mb-3 transition-colors duration-300
                                                ${isDayTime ? 'text-black group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'}`}>
                                                FinTech Solutions
                                            </h3>

                                            <p className={`text-[0.875em] font-[400] leading-[1.6] transition-colors
                                                ${isDayTime ? 'text-gray-600 group-hover:text-gray-700' : 'text-white/60 group-hover:text-white/80'}`}>
                                                Financial management for investments, payments, and crypto with
                                                enterprise security and regulatory compliance.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        </Link>

                        {/* Social Networks */}
                        <Link href='/services/Social-Networking'>
                            <FxReveal>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    transition={{duration: 0.3, ease: 'easeOut'}}
                                    className="h-full">
                                    <div
                                        className={`group relative h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-300
                                        ${isDayTime
                                            ? 'bg-gradient-to-br from-white/80 via-white/60 to-gray-100/50 border border-white/30 hover:border-teal-300/50 shadow-lg hover:shadow-teal-200/30'
                                            : 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 hover:border-teal-400/40 shadow-2xl hover:shadow-teal-500/20'
                                        } backdrop-blur-xl p-8`}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isDayTime
                                            ? 'bg-gradient-to-br from-teal-50/30 via-transparent to-transparent'
                                            : 'bg-gradient-to-br from-teal-500/10 via-transparent to-purple-500/10'
                                        }`}
                                        />

                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div
                                                    className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    👥
                                                </div>
                                                <motion.div
                                                    initial={{opacity: 0, x: -10}}
                                                    whileHover={{opacity: 1, x: 0}}
                                                    className={`text-xl transition-all ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                                    →
                                                </motion.div>
                                            </div>

                                            <h3 className={`text-[1.6em] font-[700] mb-3 transition-colors duration-300
                                                ${isDayTime ? 'text-black group-hover:text-teal-700' : 'text-white group-hover:text-teal-300'}`}>
                                                Social Networks
                                            </h3>

                                            <p className={`text-[0.875em] font-[400] leading-[1.6] transition-colors
                                                ${isDayTime ? 'text-gray-600 group-hover:text-gray-700' : 'text-white/60 group-hover:text-white/80'}`}>
                                                Messaging, content sharing, and engagement platforms tailored to
                                                communities and interests.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        </Link>
                    </div>
                </div>
            </div>

            {/* last image */}
            <div className='relative max-w-full h-auto mx-auto w-full'>
                <Image
                    src='/assets/startup/pap.jpg'
                    alt='mid image'
                    width={1619}
                    height={1080}
                    className={'max-w-auto w-full'}
                />
            </div>

            {/* Interest for startups - ULTRA PREMIUM REDESIGN */}
            <div
                className={`relative overflow-hidden lg:-mt-20 md:-mt-20 lg:py-48 py-32 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid aurora className="opacity-20"/>

                {/* Multi-layer animated gradient orbs with enhanced effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Primary blue orb */}
                    <motion.div
                        className={`absolute w-[500px] h-[500px] rounded-full blur-3xl ${isDayTime ? 'bg-blue-300/15' : 'bg-blue-500/12'}`}
                        animate={{
                            x: [0, 80, -60, 0],
                            y: [0, 120, -80, 0],
                            scale: [1, 1.2, 0.9, 1]
                        }}
                        transition={{duration: 20, repeat: Infinity, ease: "easeInOut"}}
                        style={{top: '-15%', right: '-10%'}}
                    />
                    {/* Secondary purple orb */}
                    <motion.div
                        className={`absolute w-[400px] h-[400px] rounded-full blur-3xl ${isDayTime ? 'bg-purple-300/12' : 'bg-purple-500/10'}`}
                        animate={{
                            x: [0, -100, 50, 0],
                            y: [0, -140, 60, 0],
                            scale: [0.9, 1.1, 1, 0.9]
                        }}
                        transition={{duration: 22, repeat: Infinity, ease: "easeInOut"}}
                        style={{bottom: '-15%', left: '-5%'}}
                    />
                    {/* Tertiary cyan accent */}
                    <motion.div
                        className={`absolute w-[350px] h-[350px] rounded-full blur-3xl ${isDayTime ? 'bg-cyan-200/10' : 'bg-cyan-500/8'}`}
                        animate={{
                            x: [0, 120, -40, 0],
                            y: [0, 60, -120, 0]
                        }}
                        transition={{duration: 25, repeat: Infinity, ease: "easeInOut"}}
                        style={{top: '50%', left: '10%'}}
                    />
                </div>

                <div
                    className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    {/* Premium header section */}
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-12 lg:mb-20 mb-16 border-b lg:pb-16 pb-12 ${isDayTime ? 'text-black border-gray-200/40' : 'text-white border-white/8'}`}>
                        <div>
                            <FxReveal>
                                <div className="relative">
                                    {/* Enhanced glowing border effect */}
                                    <motion.div
                                        className={`absolute -inset-1.5 rounded-lg blur-lg opacity-30 ${isDayTime ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'}`}
                                        animate={{opacity: [0.25, 0.45, 0.25]}}
                                        transition={{duration: 4, repeat: Infinity}}
                                    />
                                    <motion.div
                                        className={`absolute -inset-1.5 rounded-lg blur opacity-20 ${isDayTime ? 'bg-gradient-to-r from-blue-300 to-purple-300' : 'bg-gradient-to-r from-blue-400 to-purple-400'}`}
                                        animate={{opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.05, 0.95]}}
                                        transition={{duration: 5, repeat: Infinity}}
                                    />
                                    <FxGlitchText tag="h2"
                                                  className="lg:text-[3.5em] md:text-[2.8em] text-[2.2em] font-[850] tracking-tighter leading-[1.1] relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                                        Business interest <br className="lg:block md:block hidden"/>for startups
                                    </FxGlitchText>
                                </div>
                            </FxReveal>
                        </div>
                        <div className="flex items-center">
                            <p className={`text-[1em] font-[400] tracking-normal text-justify leading-relaxed ${isDayTime ? 'text-gray-700' : 'text-white/75'}`}>
                                All the advantages of traditional software are present in a bespoke or
                                custom{' '}
                                <Link href="/services/Web-Application"
                                      className={`font-semibold py-[0.2em] transition-all duration-300 relative group ${isDayTime ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'}`}>
                                    web application
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${isDayTime ? 'bg-blue-600' : 'bg-blue-400'}`}/>
                                </Link>,
                                with the exception that it is more affordable, more accessible, and can grow with
                                your company&#39;s demands. Companies across a wide range of industries have benefited
                                from our creative web apps. Collaborate with us for a stress-free product development
                                process.
                            </p>
                        </div>
                    </div>

                    {/* Premium Benefits Grid with sophisticated design */}
                    <div className="space-y-8">
                        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8">
                            {[
                                {
                                    id: 'speed',
                                    emoji: '⚡',
                                    title: 'Speed of Development',
                                    body: 'With open source frameworks and robust toolkits, we swiftly create unique software solutions — enabling companies to launch their products more quickly.',
                                    gradient: 'from-blue-600/5 via-cyan-500/5 to-blue-400/5',
                                    borderGradient: 'from-blue-400 via-cyan-400 to-blue-500',
                                    glowColor: 'bg-blue-500/25',
                                    iconGradient: 'from-blue-400 to-cyan-400',
                                    index: 0
                                },
                                {
                                    id: 'reliability',
                                    emoji: '🛡️',
                                    title: 'Reliability',
                                    body: 'Well-architected web applications provide software reliability, minimizing expensive maintenance and facilitating the identification and resolution of defects.',
                                    gradient: 'from-purple-600/5 via-pink-500/5 to-purple-400/5',
                                    borderGradient: 'from-purple-400 via-pink-400 to-purple-500',
                                    glowColor: 'bg-purple-500/25',
                                    iconGradient: 'from-purple-400 to-pink-400',
                                    index: 1
                                },
                                {
                                    id: 'cost',
                                    emoji: '💰',
                                    title: 'Cost Savings',
                                    body: 'Web applications may be rapidly produced and disseminated, hence aiding in the reduction of development expenses.',
                                    gradient: 'from-green-600/5 via-emerald-500/5 to-green-400/5',
                                    borderGradient: 'from-green-400 via-emerald-400 to-green-500',
                                    glowColor: 'bg-green-500/25',
                                    iconGradient: 'from-green-400 to-emerald-400',
                                    index: 2
                                },
                            ].map(({
                                       id,
                                       emoji,
                                       title,
                                       body,
                                       gradient,
                                       borderGradient,
                                       glowColor,
                                       iconGradient,
                                       index
                                   }) => (
                                <FxReveal key={id}>
                                    <motion.div
                                        className={`group relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${isDayTime ? 'bg-white/40 border border-gray-200/40' : 'bg-white/[0.03] border border-white/10'} hover:border-opacity-100 backdrop-blur-xl`}
                                        whileHover={{
                                            y: -12,
                                            boxShadow: isDayTime ? '0 30px 80px rgba(59, 130, 246, 0.25)' : '0 30px 80px rgba(59, 130, 246, 0.35)'
                                        }}
                                        initial={{opacity: 0, y: 30}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                    >
                                        {/* Multi-layer glow effect */}
                                        <motion.div
                                            className={`absolute -inset-1 ${glowColor} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
                                        />
                                        <motion.div
                                            className={`absolute -inset-0.5 ${glowColor} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10`}
                                        />

                                        {/* Card background gradient */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}/>

                                        {/* Animated border gradient */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                                            animate={{backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']}}
                                            transition={{duration: 4, repeat: Infinity}}
                                        />

                                        {/* Premium content container */}
                                        <div className="relative p-10 h-full flex flex-col">
                                            {/* Icon container with premium treatment */}
                                            <motion.div
                                                className="relative mb-8 flex items-center justify-start"
                                                whileHover={{scale: 1.1}}
                                                transition={{duration: 0.3}}
                                            >
                                                {/* Icon background - gradient circle */}
                                                <motion.div
                                                    className={`absolute w-20 h-20 rounded-full bg-gradient-to-br ${iconGradient} opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500`}
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        rotate: [0, 180, 360]
                                                    }}
                                                    transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                                                />
                                                {/* Inner gradient circle */}
                                                <motion.div
                                                    className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${iconGradient} opacity-15 group-hover:opacity-30 blur-lg transition-all duration-500`}
                                                    animate={{
                                                        scale: [1, 1.2, 0.95],
                                                    }}
                                                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                                                />
                                                {/* Icon ring */}
                                                <motion.div
                                                    className={`absolute w-14 h-14 rounded-full border-2 border-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-50 transition-all duration-500`}
                                                    animate={{rotate: [0, -360]}}
                                                    transition={{duration: 10, repeat: Infinity, ease: "linear"}}
                                                />
                                                {/* Main icon with breathing animation */}
                                                <motion.div
                                                    className="text-6xl relative z-10"
                                                    animate={{
                                                        y: [0, -8, 0],
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: index * 0.3
                                                    }}
                                                >
                                                    {emoji}
                                                </motion.div>
                                            </motion.div>

                                            {/* Premium title with gradient transition */}
                                            <h3 className={`text-[1.45em] font-[750] mb-5 tracking-tight transition-all duration-300 leading-tight ${isDayTime ? 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text' : 'text-white/95 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text'}`}>
                                                {title}
                                            </h3>

                                            {/* Enhanced description text */}
                                            <p className={`text-[1em] font-[400] leading-relaxed flex-grow transition-all duration-300 ${isDayTime ? 'text-gray-700 group-hover:text-gray-800' : 'text-white/70 group-hover:text-white/90'}`}>
                                                {body}
                                            </p>

                                            {/* Premium bottom accent elements */}
                                            <div className="mt-8 flex items-center gap-3">
                                                {/* Animated line */}
                                                <motion.div
                                                    className={`h-1 flex-grow rounded-full transform origin-left transition-all duration-500 bg-gradient-to-r ${borderGradient} scale-x-0 group-hover:scale-x-100`}
                                                />
                                                {/* Decorative dots */}
                                                <div className="flex gap-1.5">
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-100`}
                                                            animate={{scale: [1, 1.5, 1]}}
                                                            transition={{duration: 2, repeat: Infinity, delay: i * 0.2}}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </FxReveal>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-8">
                            {[
                                {
                                    id: 'scalability',
                                    emoji: '📈',
                                    title: 'Scalability',
                                    body: 'The software may grow with your organization. Customised web applications adjust and develop as business demands do — with scalable server design.',
                                    gradient: 'from-orange-600/5 via-red-500/5 to-orange-400/5',
                                    borderGradient: 'from-orange-400 via-red-400 to-orange-500',
                                    glowColor: 'bg-orange-500/25',
                                    iconGradient: 'from-orange-400 to-red-400',
                                    index: 3
                                },
                                {
                                    id: 'integration',
                                    emoji: '🔗',
                                    title: 'Third-party integration',
                                    body: 'By integrating web apps with marketing tools, payment gateways, and more, companies leverage a wealth of features to improve their software.',
                                    gradient: 'from-indigo-600/5 via-blue-500/5 to-indigo-400/5',
                                    borderGradient: 'from-indigo-400 via-blue-400 to-indigo-500',
                                    glowColor: 'bg-indigo-500/25',
                                    iconGradient: 'from-indigo-400 to-blue-400',
                                    index: 4
                                },
                                {
                                    id: 'security',
                                    emoji: '🔒',
                                    title: 'Web app security',
                                    body: 'Our security team uses measures that guard against typical online threats — keeping your data and your customers\' data safe and secure.',
                                    gradient: 'from-red-600/5 via-pink-500/5 to-red-400/5',
                                    borderGradient: 'from-red-400 via-pink-400 to-red-500',
                                    glowColor: 'bg-red-500/25',
                                    iconGradient: 'from-red-400 to-pink-400',
                                    index: 5
                                },
                            ].map(({
                                       id,
                                       emoji,
                                       title,
                                       body,
                                       gradient,
                                       borderGradient,
                                       glowColor,
                                       iconGradient,
                                       index
                                   }) => (
                                <FxReveal key={id}>
                                    <motion.div
                                        className={`group relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${isDayTime ? 'bg-white/40 border border-gray-200/40' : 'bg-white/[0.03] border border-white/10'} hover:border-opacity-100 backdrop-blur-xl`}
                                        whileHover={{
                                            y: -12,
                                            boxShadow: isDayTime ? '0 30px 80px rgba(59, 130, 246, 0.25)' : '0 30px 80px rgba(59, 130, 246, 0.35)'
                                        }}
                                        initial={{opacity: 0, y: 30}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.6, delay: index * 0.1}}
                                    >
                                        {/* Multi-layer glow effect */}
                                        <motion.div
                                            className={`absolute -inset-1 ${glowColor} opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
                                        />
                                        <motion.div
                                            className={`absolute -inset-0.5 ${glowColor} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10`}
                                        />

                                        {/* Card background gradient */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}/>

                                        {/* Animated border gradient */}
                                        <motion.div
                                            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                                            animate={{backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']}}
                                            transition={{duration: 4, repeat: Infinity}}
                                        />

                                        {/* Premium content container */}
                                        <div className="relative p-10 h-full flex flex-col">
                                            {/* Icon container with premium treatment */}
                                            <motion.div
                                                className="relative mb-8 flex items-center justify-start"
                                                whileHover={{scale: 1.1}}
                                                transition={{duration: 0.3}}
                                            >
                                                {/* Icon background - gradient circle */}
                                                <motion.div
                                                    className={`absolute w-20 h-20 rounded-full bg-gradient-to-br ${iconGradient} opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500`}
                                                    animate={{
                                                        scale: [1, 1.3, 1],
                                                        rotate: [0, 180, 360]
                                                    }}
                                                    transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                                                />
                                                {/* Inner gradient circle */}
                                                <motion.div
                                                    className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${iconGradient} opacity-15 group-hover:opacity-30 blur-lg transition-all duration-500`}
                                                    animate={{
                                                        scale: [1, 1.2, 0.95],
                                                    }}
                                                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                                                />
                                                {/* Icon ring */}
                                                <motion.div
                                                    className={`absolute w-14 h-14 rounded-full border-2 border-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-50 transition-all duration-500`}
                                                    animate={{rotate: [0, -360]}}
                                                    transition={{duration: 10, repeat: Infinity, ease: "linear"}}
                                                />
                                                {/* Main icon with breathing animation */}
                                                <motion.div
                                                    className="text-6xl relative z-10"
                                                    animate={{
                                                        y: [0, -8, 0],
                                                        scale: [1, 1.1, 1]
                                                    }}
                                                    transition={{
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        delay: (index - 3) * 0.3
                                                    }}
                                                >
                                                    {emoji}
                                                </motion.div>
                                            </motion.div>

                                            {/* Premium title with gradient transition */}
                                            <h3 className={`text-[1.45em] font-[750] mb-5 tracking-tight transition-all duration-300 leading-tight ${isDayTime ? 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text' : 'text-white/95 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text'}`}>
                                                {title}
                                            </h3>

                                            {/* Enhanced description text */}
                                            <p className={`text-[1em] font-[400] leading-relaxed flex-grow transition-all duration-300 ${isDayTime ? 'text-gray-700 group-hover:text-gray-800' : 'text-white/70 group-hover:text-white/90'}`}>
                                                {body}
                                            </p>

                                            {/* Premium bottom accent elements */}
                                            <div className="mt-8 flex items-center gap-3">
                                                {/* Animated line */}
                                                <motion.div
                                                    className={`h-1 flex-grow rounded-full transform origin-left transition-all duration-500 bg-gradient-to-r ${borderGradient} scale-x-0 group-hover:scale-x-100`}
                                                />
                                                {/* Decorative dots */}
                                                <div className="flex gap-1.5">
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-100`}
                                                            animate={{scale: [1, 1.5, 1]}}
                                                            transition={{duration: 2, repeat: Infinity, delay: i * 0.2}}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </FxReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Startups;