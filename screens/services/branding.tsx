'use client';


import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import CountUp from "react-countup";
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';
const Branding = () => {    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 200); // Show the button after scrolling 200px
        };

        window.addEventListener("scroll", handleScroll);
        return (
    <FuturisticServiceLayout title={`Branding`}>
) => window.removeEventListener("scroll", handleScroll
    </FuturisticServiceLayout>
  );
    }, []);

    // isDaytime react hook
    const isDayTime = useIsDayTime();


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

    // Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "BG",
            "BI",
            "LD",
            "BS",
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

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            <ServiceHero
                title="Branding & Identity"
                subtitle="Distinctive brand identities that communicate your values, differentiate your business, and build lasting recognition."
                accentColor="#a3e635"
                variant="particles"
                badges={["Logo Design", "Brand Strategy", "Visual Identity", "Style Guides", "Brand Voice", "Packaging"]}
            />
            <ServiceCapabilities
                accentColor="#a3e635"
                variant="cards"
                capabilities={[
                    { id: "cap-1", icon: "🌟", title: "Brand Strategy", description: "Positioning, messaging frameworks, and brand architecture that align with your business goals and audience." },
                    { id: "cap-2", icon: "✏️", title: "Logo & Identity", description: "Timeless logo design with complete identity systems including colour palettes, typography, and iconography." },
                    { id: "cap-3", icon: "📖", title: "Brand Guidelines", description: "Comprehensive style guides that ensure brand consistency across every touchpoint and team member." },
                    { id: "cap-4", icon: "🗣️", title: "Brand Voice", description: "Tone of voice frameworks and messaging playbooks that make every word sound unmistakably you." },
                    { id: "cap-5", icon: "📦", title: "Packaging Design", description: "Product packaging that stands out on shelves and online, designed to attract and convert buyers." },
                    { id: "cap-6", icon: "🔄", title: "Rebranding", description: "Strategic rebranding that preserves equity while modernising your brand for new markets and audiences." },
                ]}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                {/* ─── Futuristic FX overlay (hero enhancement) ─── */}
                <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                    <div className="gx-scanline" />
                    <div className="gx-noise-overlay" />
                    <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .15 }} />
                </div>
                
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    We offer comprehensive digital branding and identity solutions that help position your business
                    strategically in the market—differentiating your products and services, <br
                    className={'lg:block md:block hidden'}/>enhancing recognition, and
                    driving long-term brand value.
                </p>
                <ResponsiveVideoHero videoDesktop="/assets/brand/hero.mp4" videoMobile="/assets/brand/hero-mobile.mp4" posterImage="/assets/brand/hero.jpg" />
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-12 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Unified branding <br className={'lg:block md:block hidden'}/>across all platforms
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Digital Branding
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    In today’s highly competitive digital environment, your brand’s visibility extends
                                    far beyond traditional touchpoints. Maintaining a consistent and professional
                                    appearance across websites, mobile apps, social media platforms, and other digital
                                    channels is no longer optional—it’s essential to building trust, enhancing
                                    recognition, and driving engagement. We help businesses achieve this by developing
                                    comprehensive digital branding guidelines that ensure your brand remains cohesive,
                                    recognisable, and aligned with your core identity across every digital touchpoint.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Beyond branding documentation, we support your team with the tools and training
                                    needed to implement your brand effectively across digital platforms. This includes
                                    creating detailed digital style guides specifically tailored for web interfaces and
                                    product design, covering everything from typography and colour usage to UI
                                    components and responsive behaviour. Through tailored workshops or documentation
                                    handovers, we empower your internal teams to uphold brand consistency at
                                    scale—maximising both impact and efficiency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Branding Solutions */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'SEO Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                Our Branding Solutions
                            </h2>
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
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Branding Guidelines", target: "BG"},
                                    {id: "02", title: "Branding Identity", target: "BI"},
                                    {id: "03", title: "Logo Design", target: "LD"},
                                    {id: "04", title: "Brand Strategy", target: "BS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[30em] md:mb-[30em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Branding Guidelines
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Consistent Branding</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Transformation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Maintaining a strong, consistent brand is essential for building trust and
                                        long-term recognition, which is why investing in comprehensive brand guidelines
                                        is a strategic necessity. At Grey InfoTech, we create clear, practical brand
                                        documentation that acts as a safeguard for your visual and verbal
                                        identity—ensuring consistency across all digital and offline channels. These
                                        guidelines help internal teams and external partners apply your brand correctly,
                                        covering key elements such as logo usage, colour palettes, typography, imagery,
                                        and tone of voice. By protecting against misuse and brand dilution, we help you
                                        maintain a cohesive and professional presence that strengthens your market
                                        position.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Branding Identity
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Typography</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tone of Voice</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Photographic Style</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        A strong corporate identity instantly communicates your business values and
                                        unique selling proposition to all stakeholders, including customers, employees,
                                        partners, and the media. In today’s crowded marketplace, it serves as a powerful
                                        differentiator and touchpoint that builds recognition and trust. At Grey
                                        InfoTech, we go beyond logo design to craft a cohesive identity system that
                                        extends across your entire organisation—from signage and uniforms to digital
                                        assets, training materials, and marketing communications. We define and develop
                                        key visual and verbal elements such as brand marks, typography, photographic
                                        style, tone of voice, and graphic systems, ensuring your brand presents a
                                        unified, professional image at every interaction.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Logo Design
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Revolutionary Update</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Logo from Scratch</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        A logo is a fundamental brand asset that helps businesses identify,
                                        differentiate, and establish a lasting impression in their market. At Grey
                                        InfoTech, our branding team specialises in creating and refining logos for
                                        startups, SMEs, and large enterprises alike. For new businesses, we design logos
                                        from the ground up to reflect your mission and appeal to your target audience.
                                        For established brands, we offer thoughtful logo evolution to maintain clarity
                                        and relevance, or complete redesigns when undergoing significant transformation.
                                        Regardless of your company’s size or stage, we ensure your logo aligns with your
                                        brand strategy and communicates your identity effectively.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={` ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Brand Strategy
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}></span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}></span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}></span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Your company exists to solve problems, deliver value, and make a meaningful
                                        impact—and your brand should clearly reflect that. Customers care when they see
                                        a brand that resonates with their values, understands their needs, and
                                        communicates with purpose. Likewise, employees feel engaged when they connect
                                        with a mission they believe in. At Grey InfoTech, we help businesses define and
                                        articulate their brand strategy, mission, values, and unique selling proposition
                                        (USP) in a way that inspires loyalty, builds trust, and drives measurable
                                        business growth. Our approach ensures your brand speaks clearly and consistently
                                        to both your customers and your team.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto lg:-mt-[34em] md:-mt-[34em]'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/brand/branding.jpg'}
                    alt={'Branding'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>



            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-white' : 'text-black'
                     }`}>
                    <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                        Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                        We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                        applications that drive real results. From funded startups to established businesses, we&#39;ve
                        helped a wide range of clients bring their digital products to life—delivering standout
                        experiences
                        that fuel growth, engagement, and long-term success.
                    </p>
                    <Link href='/contact'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 lg:mb-[4em] md:mb-[4em] ${
                             isDayTime ? 'text-white' : 'text-black'
                         }`}
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center "
                            >
                                <h2 className="gx-gradient-text lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                    <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                                </h2>
                                <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Branding;