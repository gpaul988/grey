'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Image from "next/image";
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';

import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';

import FuturisticIndustryLayout from '@/components/futuristic/FuturisticIndustryLayout';
import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard} from '@/components/futuristic/fx';

const ECommerceDevelopment = () => {

    const [isVisible, setIsVisible] = useState(false);
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
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // isDaytime react hook
    const isDayTime = useIsDayTime();

    const pageAccent = '#ff005d';
    const pageAccentRgb = '255,0,93';

    const rootStyle: React.CSSProperties & Record<string, string> = {
        '--ecom-accent': pageAccent,
        '--ecom-accent-rgb': pageAccentRgb,
        '--page-accent': pageAccent,
        '--page-accent-rgb': pageAccentRgb,
    };

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
            "EWD",
            "MSMP",
            "EPSG",
            "ISCO",
            "ESEM",
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

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`} style={rootStyle}>

            {/* Unified Futuristic eCommerce Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video/Image Background */}
                <ResponsiveVideoHero
                    videoFallback="/assets/ecom/hero.mp4"
                    posterImage="/assets/ecom/hero.jpg"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--ecom-accent-rgb),0.12),transparent_50%)] z-[2]"/>

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full animate-pulse"
                                     style={{background: 'var(--ecom-accent)'}}/>
                                <span className="text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]"
                                      style={{color: 'var(--ecom-accent)'}}>eCommerce</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build Scalable, <span className="gx-gradient-text">Conversion-First</span> Online Stores
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                From storefront design to payment integrations and performance optimization, deliver
                                best-in-class eCommerce experiences that convert.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Shopify', 'Magento', 'WooCommerce', 'Headless', 'PIM'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider"
                                          style={{
                                              background: 'rgba(var(--ecom-accent-rgb),0.08)',
                                              border: '1px solid rgba(var(--ecom-accent-rgb),0.18)',
                                              color: 'rgba(var(--ecom-accent-rgb),0.95)'
                                          }}>
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact">
                                    <button
                                        className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                        style={{background: 'var(--ecom-accent)', color: '#fff'}}>
                                            <span className="absolute inset-0" style={{
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                            }}/>
                                        <span className="relative">Start a project →</span>
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
                                    {label: 'Integrations', value: '100+'},
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Products Launched', value: '123+'},
                                    {label: 'Avg Conversion Lift', value: '200%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl backdrop-blur-md transition-all duration-300 text-right"
                                         style={{
                                             border: '1px solid rgba(var(--ecom-accent-rgb),0.22)',
                                             background: 'rgba(var(--ecom-accent-rgb),0.06)'
                                         }}>
                                        <div
                                            className="text-[0.7em] uppercase tracking-wider font-[600] mb-2"
                                            style={{color: 'rgba(var(--ecom-accent-rgb),0.95)'}}>{stat.label}</div>
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
                            {label: 'Integrations', value: '100+'},
                            {label: 'Experts', value: '8+'},
                            {label: 'Satisfaction', value: '99%'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl backdrop-blur-md" style={{
                                border: '1px solid rgba(var(--ecom-accent-rgb),0.22)',
                                background: 'rgba(var(--ecom-accent-rgb),0.06)'
                            }}>
                                <div
                                    className="text-[0.5em] uppercase tracking-wider font-[600] mb-1"
                                    style={{color: 'rgba(var(--ecom-accent-rgb),0.95)'}}>{stat.label}</div>
                                <div className="text-white text-[1.1em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introductory section (futuristic style) */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>
                <div aria-hidden style={{
                    height: '6px',
                    width: '80px',
                    background: 'var(--ecom-accent)',
                    borderRadius: '999px',
                    margin: '12px 0'
                }}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>ECOMMERCE EXCELLENCE</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Build Fast, Reliable, <span className="gx-gradient-text">Revenue-Driving</span> Stores
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>We craft eCommerce platforms that put conversions first — optimized checkout
                                        flows,
                                        fast performance, and reliable integrations. Our approach blends commerce
                                        strategy,
                                        UX optimization, and secure engineering to reduce friction and increase purchase
                                        velocity.</p>
                                    <p>From headless architectures to managed SaaS platforms, we select the right stack
                                        for scale, maintainability, and speed. Tracking and experimentation are baked in
                                        to
                                        iterate on experience and maximize lifetime value.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Checkout UX', 'Headless CMS', 'Payments', 'Search & Merchandising'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p>Launch with confidence: secure payment gateways, scalable hosting, observability,
                                        and performance budgets ensure your store stays fast under peak traffic and
                                        converts
                                        reliably.</p>
                                    <p>We partner through discovery, implementation, and optimization — delivering not
                                        just code but measurable growth. Technical debt is avoided with robust testing,
                                        CI/CD, and modular architecture.</p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Observability', 'A/B Testing', 'Performance Budgets', 'Platform Integrations'].map((p) => (
                                            <span key={p} className="gx-data-pill">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* eCommerce solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'ecommerce solutions'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                eCommerce <br className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Our eCommerce solutions empower businesses to sell smarter with secure, scalable, and
                                user-friendly online stores. From seamless product management to optimized checkout
                                experiences, we deliver platforms designed to drive sales and enhance customer
                                satisfaction.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[6em] gap-6 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[6em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "eCommerce Web Design", target: "EWD"},
                                    {id: "02", title: "Membership Site & Marketplaces", target: "MSMP"},
                                    {id: "03", title: "eCommerce Payment Systems & Gateways", target: "EPSG"},
                                    {id: "04", title: "Increase Sales & Conversions Online", target: "ISCO"},
                                    {id: "05", title: "eCommerce SEO, eCommerce Marketing", target: "ESEM"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-3 mt-2'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-2'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[1.5em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[19em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'EWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce Web Design
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Shopify Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Online Store Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>eCommerce Strategy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we work with a wide range of leading eCommerce platforms to
                                        deliver solutions tailored to your unique business requirements. Our team has
                                        successfully implemented solutions using Shopify, Big Cartel, WooCommerce,
                                        and <Link href='/services/cms-development'
                                                  className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>Drupal</Link> Commerce,
                                        each selected based on its strengths and suitability for the
                                        project. By carefully evaluating your goals, operational needs, and scalability
                                        requirements, we determine the most effective platform to power your online
                                        store and support long-term growth.<br/><br/>

                                        Our eCommerce design team combines deep technical expertise with practical
                                        knowledge of online consumer behavior to create high-converting digital
                                        storefronts. From strategically placing purchase actions like “Buy” buttons to
                                        implementing best practices in product photography and designing persuasive
                                        calls to action, every element is optimized to enhance user experience and drive
                                        sales. This attention to detail ensures your eCommerce website is not only
                                        visually compelling but also functionally effective, helping you achieve
                                        measurable success in the competitive online marketplace.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'MSMP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Membership Sites & Marketplaces
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Paywall Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Membership Site Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom eCommerce Development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, our eCommerce expertise extends far beyond selling physical
                                        products. We have successfully developed advanced solutions such as
                                        paywall-enabled membership platforms that securely process recurring payments
                                        for premium content and online services. Additionally, we have built
                                        marketplace-style websites that empower users to upload, manage, and sell
                                        products directly to one another, creating dynamic, revenue-generating
                                        ecosystems. Our ability to deliver these diverse eCommerce models ensures that
                                        we can meet the unique digital requirements of businesses seeking innovative
                                        ways to monetize their products, services, and content.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'EPSG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce Payment Systems & Gateways
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Online Payment System</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Innovative Payment Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>                                </span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Selecting the right payment system is a critical step in launching a successful
                                        eCommerce business, as it directly impacts revenue collection, customer
                                        experience, and operational efficiency. Today, businesses have access to a wide
                                        range of secure and innovative payment solutions, from widely trusted platforms
                                        like Stripe, PayPal, Google Checkout, SagePay, and Worldpay to emerging digital
                                        payment technologies that empower seamless online transactions. Leveraging the
                                        right payment gateway not only ensures smooth and reliable payment processing
                                        but also provides businesses and entrepreneurs with the flexibility and
                                        scalability needed to confidently sell and grow online.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ISCO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Increase Sales & Conversions Online
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Experience Improvement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Conversion Rate Strategies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>A/B Testing Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we offer a comprehensive approach to boosting your online
                                        sales by combining strategic visibility with optimized on-site conversions. From
                                        presenting your products and services effectively to guiding customers through a
                                        seamless purchasing journey, we leverage a range of proven tools and strategies
                                        to maximize results. Our team utilizes analytics, A/B testing, and funnel
                                        visualization to gain actionable insights into user behavior, allowing us to
                                        measure, refine, and enhance the customer experience continuously. By leaving no
                                        aspect of the sales process unexplored, we ensure your eCommerce platform
                                        performs at its best, driving engagement, conversions, and sustained revenue
                                        growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ESEM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        eCommerce SEO, eCommerce Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>eCommerce Marketing Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Search Engine Visibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Sales-driven Marketing Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Building or relaunching your eCommerce website is only the first step -success
                                        depends on ensuring your customers can find and engage with your products
                                        online. This requires a comprehensive eCommerce marketing strategy designed to
                                        drive traffic, attract the right audience, and convert visits into
                                        sales.<br/><br/>

                                        At Grey InfoTech, we integrate eCommerce marketing and <Link
                                        href='/services/seo'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>SEO</Link> strategies
                                        into the
                                        foundation of every project. For new websites, we implement best practices from
                                        the very beginning to optimize visibility in search engines. For existing
                                        stores, we conduct detailed assessments to recommend improvements, enhancing
                                        your online presence and setting your sales on the right trajectory.<br/><br/>

                                        To maximize product discoverability, we leverage advanced techniques such as
                                        structured product schema, Google Merchant Center integration, and optimized
                                        product sitemaps. These strategies ensure that your products are accurately
                                        indexed, visible across relevant marketplaces, and positioned to convert
                                        potential customers into loyal buyers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[28em] md:-mt-[27em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/ecom/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

        </div>
    );
};

export default ECommerceDevelopment;

