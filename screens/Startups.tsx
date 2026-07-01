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
    FxGlitchText,
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


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);


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
              <FxBackground day={isDayTime} />
              <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                <div>
                  <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>YOUR INSIGHTS, OUR EXPERIENCE</FxChip>
                </div>
                <div className="lg:-ml-[19em]">
                  <FxReveal>
                    <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                      Enabling startups to<br /><span className="gx-gradient-text">launch, grow and succeed</span>
                    </h3>
                  </FxReveal>
                  <FxReveal delay={0.1}>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                      <div>
                        <p>Our specialty at <Link href='/#' className={`border-b-[0.1em] ${isDayTime ? 'border-gray-800' : 'border-gray-300'}`}>Grey InfoTech</Link> is turning innovative concepts into digital products that are profitable. We have years of experience working with startups, so we are aware of the particular difficulties they face, such as limited funding, short turnaround times, and the requirement for scalable solutions.</p>
                      </div>
                      <div>
                        <p>Our customized strategy blends state-of-the-art technology, creative thinking, and a strong dedication to your development. Grey InfoTech is your success partner whether you&apos;re scaling your business or creating an <Link href='/services/MVP' className='border-b-[0.1em] border-gray-300'>MVP</Link>.</p>
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

            <div className={`relative lg:py-32 py-16 overflow-hidden ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Grid background */}
                <div className="pointer-events-none absolute inset-0" style={{
                  backgroundImage: `linear-gradient(${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? 'rgba(45,212,191,0.06)' : 'rgba(13,148,136,0.07)'} 1px, transparent 1px)`,
                  backgroundSize: '44px 44px',
                }} />
                
                {/* Aurora blobs */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #2dd4bf 0%, transparent 70%)' }} />
                  <div className="absolute -bottom-32 -left-24 w-[480px] h-[480px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
                </div>

                <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-8 lg:px-[4.6em]">
                  <FxReveal>
                    <div className="flex items-center gap-5 mb-14">
                      <FxChip day={isDayTime}>YOUR DIGITAL ADVENTURE</FxChip>
                      <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`} />
                      <span className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>FOR STARTUPS</span>
                    </div>
                  </FxReveal>

                  <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <FxReveal>
                      <div className="relative">
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-teal-400 rounded-tl-sm z-10" />
                        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-teal-400 rounded-tr-sm z-10" />
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-teal-400 rounded-bl-sm z-10" />
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-teal-400 rounded-br-sm z-10" />
                        <div className="absolute inset-0 rounded-2xl opacity-40" style={{ boxShadow: '0 0 60px -10px rgba(45,212,191,0.5)' }} />
                        <div className="relative overflow-hidden rounded-2xl">
                          <Image src="/assets/startup/startup.jpg" alt="startup development" width={600} height={440} className="w-full object-cover" style={{ height: 'auto' }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 60%)' }} />
                          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(45,212,191,0.03) 3px, rgba(45,212,191,0.03) 4px)' }} />
                          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                            className="absolute bottom-5 left-5 px-4 py-2 rounded-full backdrop-blur-md text-[0.72em] font-semibold tracking-wider text-teal-300"
                            style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(45,212,191,0.35)' }}>
                            ◈ MVPs · Custom Apps · Scale
                          </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
                          className="absolute -right-6 top-10 hidden lg:block">
                          <div className="rounded-2xl px-5 py-4 backdrop-blur-xl text-center min-w-[110px]"
                            style={{ background: isDayTime ? 'rgba(15,15,15,0.85)' : 'rgba(255,255,255,0.85)', border: '1px solid rgba(45,212,191,0.35)' }}>
                            <div className="text-[2em] font-[900] text-teal-400 leading-none">50+</div>
                            <div className={`text-[0.65em] font-[600] tracking-widest mt-1 uppercase ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>Projects</div>
                          </div>
                        </motion.div>
                      </div>
                    </FxReveal>

                    <div>
                      <FxReveal delay={0.1}>
                        <h2 className="text-[2.6em] lg:text-[3.4em] font-[700] leading-[1.1] tracking-tight mb-8">
                          Your digital <span className="gx-gradient-text">adventure</span><br />
                          <span className={`text-[0.65em] font-[300] ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>starts here.</span>
                        </h2>
                      </FxReveal>
                      <FxReveal delay={0.18}>
                        <p className={`text-[0.9em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                          Our specialty in the fast-paced IT industry is assisting business owners and entrepreneurs in realizing their product concepts. We&apos;ve developed MVPs, built digital products, scaled tech and infrastructure, and supported numerous startups from launch to success.
                        </p>
                      </FxReveal>
                      <FxReveal delay={0.24}>
                        <p className={`text-[0.9em] leading-[1.8] mb-10 pb-10 border-b ${isDayTime ? 'text-white/75 border-white/10' : 'text-black/70 border-black/10'}`}>
                          We understand the unique challenges startups face — limited budgets, tight timelines, and the need for scalable solutions. That&apos;s why we deliver lean, agile, and cost-effective solutions tailored to your growth trajectory.
                        </p>
                      </FxReveal>
                      <FxReveal delay={0.3}>
                        <div className="flex flex-wrap gap-3 mb-10">
                          {['MVP Development', 'Startup Strategy', 'Scalable Architecture', 'Lean & Agile'].map(item => (
                            <span key={item} className={`px-4 py-1.5 rounded-full text-[0.75em] font-[600] tracking-wide border ${isDayTime ? 'border-teal-400/30 text-teal-300 bg-teal-400/08' : 'border-teal-700/30 text-teal-700 bg-teal-700/06'}`}>{item}</span>
                          ))}
                        </div>
                      </FxReveal>
                      <FxReveal delay={0.36}>
                        <p className={`text-[0.88em] font-[400] mb-6 ${isDayTime ? 'text-white/60' : 'text-black/60'}`}>
                          Let&apos;s discuss your plans and figure out how we can support your startup&apos;s growth.
                        </p>
                        <FxButton day={!isDayTime} href="/contact" variant="solid">Get in touch <span className="text-[1.2em] leading-none ml-1">→</span></FxButton>
                      </FxReveal>
                    </div>
                  </div>

                  <FxReveal delay={0.1} y={16}>
                    <div className={`mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t ${isDayTime ? 'border-white/10' : 'border-black/10'}`}>
                      {[
                        { val: '50+', label: 'Projects Delivered' },
                        { val: '8+',  label: 'Years of Expertise' },
                        { val: '15+', label: 'Industries Served' },
                        { val: '100%', label: 'Client Satisfaction' },
                      ].map(s => (
                        <div key={s.label} className="text-center lg:text-left">
                          <div className="text-[2.2em] font-[900] gx-gradient-text leading-none mb-1">{s.val}</div>
                          <div className={`text-[0.72em] font-[500] tracking-tight ${isDayTime ? 'text-white/50' : 'text-black/50'}`}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </FxReveal>
                </div>
            </div>

            {/* Why Grey InfoTech — FX accordion */}
            <div
                className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-[#050810]'} lg:pt-36 pt-20 lg:pb-0 pb-0`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-30"/>
                <div
                    className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] border-b border-white/10 pb-12 mb-0">
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6">
                        <div>
                            <FxReveal>
                                <FxChip day={isDayTime} className="mb-5">Why Grey</FxChip>
                                <FxGlitchText tag="h2"
                                              className={`lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] tracking-tighter leading-[1.15] lg:pb-6 pr-[1.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    Why Grey InfoTech for your startup
                                </FxGlitchText>
                            </FxReveal>
                        </div>
                        <div className="lg:-ml-[7em]">
                            <p className={`text-[0.875em] font-[400] lg:-mt-[0.2em] leading-[1.5] ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}>
                                We have completed projects for businesses across a wide range of industries. Details
                                about this experience that might be pertinent to you are included in this section.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`relative overflow-hidden ${isDayTime ? 'bg-white' : 'bg-[#050810]'} lg:pb-28 pb-14 mb-12`}>
                <FxBackground day={isDayTime} grid={false} aurora className="opacity-20"/>
                <div
                    className="relative z-10 mx-auto px-4 sm:px-6 lg:px-[4em] grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-20 pt-12">
                    {/* Left — accordion */}
                    <div className="relative flex flex-col gap-3 lg:pl-4 lg:pr-[3em]">
                        {reasons.map((reason, index) => {
                            const isActive = index + 1 === activeIndex;
                            return (
                                <FxHoloCard
                                    key={reason.id}
                                    day={isDayTime}
                                    className={`p-5 transition-all duration-300 cursor-pointer ${isActive ? 'ring-1 ring-teal-400/40' : 'opacity-70 hover:opacity-90'}`}
                                    onClick={() => setActiveIndex(index + 1)}
                                >
                                    <h3 className={`leading-[1.2] lg:text-[1.15em] text-[1em] font-[600] mb-2 transition-all ${
                                        isActive
                                            ? isDayTime ? 'text-teal-700' : 'text-teal-300'
                                            : isDayTime ? 'text-gray-700' : 'text-white/60'
                                    }`}>
                                        <span
                                            className="font-mono text-[0.7em] mr-2 opacity-50">{String(reason.id).padStart(2, '0')}</span>
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
                                                className={`text-[0.875em] leading-[1.6] overflow-hidden ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}
                                            >
                                                {reason.description}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </FxHoloCard>
                            );
                        })}
                    </div>
                    <div className="lg:mt-[3em] h-[30vh] sticky">
                        <Image
                            src={'/assets/startup/mockup.jpg'}
                            alt="Mockup"
                            width={660}
                            height={150}
                        />
                    </div>
                </div>

                {/* CTA */}
                <div
                    className="relative z-10 flex flex-col items-center justify-center text-center lg:px-[28em] px-4 mt-8">
                    <FxGlitchText tag="h2"
                                  className={`lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        Prepared to initiate the discussion?
                    </FxGlitchText>
                    <FxButton day={isDayTime} href="/contact" variant="solid">Get started →</FxButton>
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
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
                                                <div className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    🚀
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
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
                                                Real-time monitoring, scheduling, and location-based features that connect users to services instantaneously with efficiency.
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
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
                                                <div className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    💊
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
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
                                                AI and wearables integrated with telemedicine, fitness tracking, and personalized health solutions for wellness.
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
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
                                                <div className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    🛒
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
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
                                                Scalable platforms with secure payments, personalized recommendations, and streamlined commerce functionality.
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
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
                                                <div className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    💳
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
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
                                                Financial management for investments, payments, and crypto with enterprise security and regulatory compliance.
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
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
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
                                                <div className={`text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                                    👥
                                                </div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{ opacity: 1, x: 0 }}
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
                                                Messaging, content sharing, and engagement platforms tailored to communities and interests.
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
                />
            </div>

            {/* Interest for startups */}
            <div
                className={`relative overflow-hidden lg:-mt-20 md:-mt-20 lg:py-32 py-16 ${isDayTime ? 'bg-white' : 'bg-[#050810]'}`}>
                <FxBackground day={isDayTime} grid aurora className="opacity-30"/>
                <div
                    className="relative z-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 lg:mb-8 mb-8 border-b lg:pb-[5em] pb-[2em] ${isDayTime ? 'text-black border-gray-200' : 'text-white border-white/10'}`}>
                        <div>
                            <FxReveal>
                                <FxGlitchText tag="h2"
                                              className="lg:text-[3em] md:text-[2.3em] text-[1.8em] font-[700] tracking-tight leading-[1.2]">
                                    Business interest <br className="lg:block md:block hidden"/>for startups
                                </FxGlitchText>
                            </FxReveal>
                        </div>
                        <div>
                            <p className={`text-[0.873em] font-[400] tracking-normal text-justify leading-[1.5] lg:-ml-[3em] ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}>
                                All the advantages of traditional software are present in a bespoke or
                                custom{' '}
                                <Link href="/services/Web-Application"
                                      className={`border-b py-[0.2em] hover:text-teal-400 transition-colors ${isDayTime ? 'border-gray-300' : 'border-white/20'}`}>
                                    web application
                                </Link>,
                                with the exception that it is more affordable, more accessible, and can grow with
                                your company&#39;s demands. Companies across a wide range of industries have benefited
                                from our creative web apps. Collaborate with us for a stress-free product development
                                process.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5 lg:mb-5 mb-5 mt-12">
                        {[
                            {
                                img: ['/assets/startup/dev1.svg', '/assets/startup/dev2.svg'],
                                alt: 'Speed',
                                title: 'Speed of Development',
                                body: 'With open source frameworks and robust toolkits, we swiftly create unique software solutions — enabling companies to launch their products more quickly.'
                            },
                            {
                                img: ['/assets/startup/relia1.svg', '/assets/startup/relia2.svg'],
                                alt: 'Reliability',
                                title: 'Reliability',
                                body: 'Well-architected web applications provide software reliability, minimizing expensive maintenance and facilitating the identification and resolution of defects.'
                            },
                            {
                                img: ['/assets/startup/sav1.svg', '/assets/startup/sav2.svg'],
                                alt: 'Cost',
                                title: 'Cost Savings',
                                body: 'Web applications may be rapidly produced and disseminated, hence aiding in the reduction of development expenses.'
                            },
                        ].map(({img, alt, title, body}) => (
                            <FxReveal key={title}>
                                <FxHoloCard day={isDayTime} className="p-6 h-full">
                                    <Image src={isDayTime ? img[0] : img[1]} alt={alt} width={60} height={60}
                                           className="mb-4"/>
                                    <h3 className={`text-[1.15em] font-[600] mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>{title}</h3>
                                    <p className={`text-justify text-[0.85em] font-[400] leading-[1.5] ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}>{body}</p>
                                </FxHoloCard>
                            </FxReveal>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5">
                        {[
                            {
                                img: ['/assets/startup/sca1.svg', '/assets/startup/sca2.svg'],
                                alt: 'Scalability',
                                title: 'Scalability',
                                body: 'The software may grow with your organization. Customised web applications adjust and develop as business demands do — with scalable server design.'
                            },
                            {
                                img: ['/assets/startup/third1.svg', '/assets/startup/third2.svg'],
                                alt: 'Integration',
                                title: 'Third-party integration',
                                body: 'By integrating web apps with marketing tools, payment gateways, and more, companies leverage a wealth of features to improve their software.'
                            },
                            {
                                img: ['/assets/startup/web1.svg', '/assets/startup/web2.svg'],
                                alt: 'Security',
                                title: 'Web app security',
                                body: 'Our security team uses measures that guard against typical online threats — keeping your data and your customers\' data safe and secure.'
                            },
                        ].map(({img, alt, title, body}) => (
                            <FxReveal key={title}>
                                <FxHoloCard day={isDayTime} className="p-6 h-full">
                                    <Image src={isDayTime ? img[0] : img[1]} alt={alt} width={60} height={60}
                                           className="mb-4"/>
                                    <h3 className={`text-[1.15em] font-[600] mb-2 ${isDayTime ? 'text-black' : 'text-white'}`}>{title}</h3>
                                    <p className={`text-justify text-[0.85em] font-[400] leading-[1.5] ${isDayTime ? 'text-gray-600' : 'text-white/55'}`}>{body}</p>
                                </FxHoloCard>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Startups;