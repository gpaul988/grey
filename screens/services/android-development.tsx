'use client';


import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import ResponsiveVideoHero from '@/components/ResponsiveVideoHero';
import ServiceHero from '@/components/futuristic/ServiceHero';
import ServiceCapabilities from '@/components/futuristic/ServiceCapabilities';
import Link from "next/link";
import {useIsDayTime} from '../../components/useIsDayTime';
import {motion} from 'framer-motion';

import FuturisticServiceLayout from '@/components/futuristic/FuturisticServiceLayout';

import { FxBackground, FxChip, FxReveal, FxButton, FxHoloCard } from '@/components/futuristic/fx';
const AndroidDevelopment = () => {    const [isVisible, setIsVisible] = useState(false);
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


    // Introductory section hook
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const {top, bottom} = sectionRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (top < windowHeight * -0.2 || bottom < windowHeight * -0.1) {
                    setIsBackgroundActive(true);
                } else {
                    setIsBackgroundActive(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // iOS App Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "NAPA",
            "AW",
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
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            <ServiceHero
                title="Android Development"
                subtitle="Native Android apps built for performance and reach"
                accentColor="#00f5d4"
                variant="hologram"
                badges={["Kotlin","Jetpack","Play Store","Performance"]}
                ctaHref="/contact"
                ctaLabel="Get started"
            />

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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Harness the potential <br className={'lg:block md:block hidden'}/>of the Android platform
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] capitalize md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.3] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Cutting-edge Android <br className={'lg:block md:block hidden'}/>development for dynamic
                            apps
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech is a seasoned Android development company with a strong track record
                                    of building scalable, high-performance mobile applications. Our in-house team
                                    possesses deep expertise across the Android ecosystem, enabling us to deliver
                                    robust, user-focused solutions for a wide range of devicesâ€”including smartphones,
                                    tablets, and wearablesâ€”from global manufacturers such as Samsung, Sony, Motorola,
                                    and LG. Unlike Appleâ€™s iOS, which is confined to Apple hardware, Android runs on
                                    thousands of devices worldwide, offering significantly greater market reach and
                                    flexibility. This broad device compatibility positions Android as a strategic
                                    platform for any business seeking to scale rapidly and cost-effectively.
                                </p>
                            </div>
                            <div>
                                <p>
                                    In addition to our Android expertise, we offers full cross-platform
                                    development capabilities, with in-house teams proficient in both Android and iOS.
                                    This allows us to streamline design and development workflows, reuse code and
                                    assets, and deliver consistent user experiences across platformsâ€”all while reducing
                                    time-to-market and lowering development costs. For investors, this means faster
                                    execution, broader market access, and more efficient capital deployment. Our ability
                                    to deliver end-to-end mobile solutions positions us as a valuable partner in scaling
                                    digital products and capturing growth in todayâ€™s mobile-driven economy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grey InfoTech Android development */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-native-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative mb-8 border-b-[1px] lg:pb-[2em] pb-[1em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Grey InfoTech Android Development
                        </h2>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[15em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Native Android Phone Apps", target: "NAPA"},
                                    {id: "02", title: "Android Wear", target: "AW"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-400 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-4'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>â†’</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[24em] md:mb-[24em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NAPA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Native Android Phone Apps
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Native development:</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Device compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Android market share</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Android continues to lead the global mobile market, powering over 80% of
                                        smartphones and offering unmatched reach across diverse user segments. Its
                                        open-source ecosystem allows for broad adoption across thousands of devices from
                                        manufacturers like Samsung, Sony, Motorola, and LGâ€”making it a strategic choice
                                        for businesses aiming to scale mobile solutions quickly and cost-effectively.
                                        The platformâ€™s flexibility, combined with a massive install base, presents a
                                        strong foundation for launching impactful digital products with global
                                        potential. For companies and investors alike, Android represents a high-value
                                        channel for innovation, user acquisition, and long-term growth.<br/><br/>
                                        Grey InfoTechâ€™s dedicated Android development team builds high-quality native
                                        applications using the Java programming language, tailored to deliver
                                        performance, reliability, and optimal user experience across devices. Our
                                        expertise spans key verticals such as gaming, retail, insurance, and automotive,
                                        enabling us to design solutions that meet industry-specific needs. With a
                                        thorough understanding of the Android landscapeâ€”from varying screen sizes to
                                        device capabilitiesâ€”we ensure consistency and usability across all touchpoints.
                                        By aligning technical excellence with business strategy, we help clients and
                                        stakeholders unlock value from the Android ecosystem at scale.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Android Wear
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Emerging technology</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Wearable features</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Innovation focus</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, weâ€™re passionate about emerging technologiesâ€”and Android Wear
                                        represents a significant frontier for innovation in the wearable tech space.
                                        Similar to the Apple Watch, Android wearables are equipped with advanced
                                        features like heart rate monitors, accelerometers, GPS, and temperature sensors.
                                        However, Androidâ€™s more open architecture gives developers deeper access to
                                        hardware capabilities, enabling the creation of more customized, data-rich
                                        applications for health, fitness, logistics, and beyond. For entrepreneurs and
                                        investors, this platform offers exciting opportunities to build next-generation
                                        products that seamlessly integrate into usersâ€™ daily lives.<br/><br/>
                                        Our team has been actively exploring the full potential of Android Wear, pushing
                                        the boundaries of whatâ€™s possible in wearable app development. By leveraging our
                                        experience in mobile and cross-platform technologies, weâ€™re building solutions
                                        that extend user engagement beyond smartphones and into real-time, on-the-go
                                        interactions. Whether itâ€™s enhancing productivity, tracking wellness, or
                                        enabling location-based services, our work in this space is opening new doors
                                        for innovative, scalable digital experiences. Weâ€™re excited to share our
                                        findings and help bring your ideas to life on the wrist.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[32em] md:-mt-[32em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/android/first.jpg'}
                    alt={'Middle Image'}
                    width={1536}
                    height={878}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why iOS Application?? */}
            <div className={`-mt-[3em] ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Grow on the worldâ€™s <br className={'lg:block md:block hidden'}/>No. 1 mobile platform
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why Android Application?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Developing an Android application gives your business access to the worldâ€™s largest
                                    mobile user base, with billions of active devices across global markets. Androidâ€™s
                                    open-source nature offers unmatched flexibility, allowing for highly customized apps
                                    that cater to a wide range of industries and user needs. Whether youâ€™re targeting
                                    emerging markets or aiming for mass adoption, Androidâ€™s vast reach and lower device
                                    entry points make it an ideal platform for scaling your product and brand
                                    visibility.
                                </p>
                            </div>
                            <div>
                                <p>
                                    From a business perspective, Android supports faster innovation and cost-effective
                                    development. With tools like Kotlin and Jetpack, developers can build reliable,
                                    feature-rich applications efficiently. The Google Play Storeâ€™s faster approval
                                    process also enables quicker time-to-market, while support for diverse
                                    devicesâ€”including smartphones, tablets, TVs, and wearablesâ€”opens up new channels for
                                    customer engagement. If youâ€™re looking to grow reach, maximize flexibility, and
                                    deliver value at scale, Android is a smart investment for long-term business growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits of iOS Application Development */}
            <div
                className={`relative -mt-[2em] max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            Benefits Of <br className={'lg:block md:block hidden'}/>Android Application
                        </h2>
                    </div>
                    <div className={'lg:-ml-[7em] md:-ml-[7em]'}>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3]'>
                            Android Application Development enables businesses to reach a global user base with
                            flexible, scalable solutions tailored for the worldâ€™s most popular mobile platform. It
                            supports rapid innovation, seamless Google integration, and strong device compatibility to
                            drive user engagement and growth.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/rc.svg' : '/assets/rnad/icon/rc1.svg'}
                            alt='Access to a High-Value User Base'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Global <br className={'lg:block md:block hidden'}/>Market Reach
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Android powers over 70% of the global mobile market, making it the ideal platform for
                            businesses looking to reach a broad and diverse user base. From high-end smartphones to
                            affordable devices in emerging markets, Android enables your app to scale internationally
                            with ease.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/wap.svg' : '/assets/rnad/icon/wap1.svg'}
                            alt='Enhanced Security & Data Privacy'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Cost-Effective <br className={'lg:block md:block hidden'}/>Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Androidâ€™s open-source platform and large developer community offer significant cost
                            advantages. With a flexible development environment and extensive libraries, your business
                            can save time and reduce development costsâ€”especially when targeting multiple device types
                            with one solution.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/ip.svg' : '/assets/rnad/icon/ip1.svg'}
                            alt='Superior User Experience'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Faster <br className={'lg:block md:block hidden'}/>Time-to-Market
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            The Google Play Storeâ€™s streamlined app submission and review process allows for quicker
                            release cycles. This means your business can launch features, respond to user feedback, and
                            adapt to market demands more rapidly than on more restrictive platforms.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sf.svg' : '/assets/rnad/icon/sf1.svg'}
                            alt='Faster Development & Reduced Fragmentation'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            High Customizability
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Android gives developers greater freedom to customize both the UI and functionality,
                            allowing for highly tailored business applications. This flexibility makes it easier to
                            create unique user experiences and integrate advanced features like IoT support,
                            geolocation, and AI.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sdm.svg' : '/assets/rnad/icon/sdm1.svg'}
                            alt='Strong ROI & Monetization Potential'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Multi-Device Ecosystem

                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Android supports a wide range of devices beyond smartphones, including tablets, smart TVs,
                            wearables, and in-car systems. This cross-device compatibility enables businesses to deliver
                            consistent user experiences and broaden customer touchpoints.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sc.svg' : '/assets/rnad/icon/sc1.svg'}
                            alt=' Global Reach via the App Store'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Strong Monetization Options
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Whether through in-app ads, freemium models, or subscriptions, Android provides multiple
                            revenue generation opportunities. Its integration with Googleâ€™s ad platforms and flexible
                            billing APIs gives businesses the tools they need to maximize app profitability.
                        </p>
                    </div>
                </div>
            </div>


            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            Android application development at Grey InfoTech is a collaborative effort involving a
                            well-rounded team dedicated to delivering business-ready solutions. A project manager leads
                            the process, aligning development milestones with your goals and maintaining clear
                            communication throughout. Our Android developers handle the technical build, while UI/UX
                            designers focus on creating intuitive, user-friendly interfaces that perform well across
                            Android devices.<br/><br/>
                            Supporting the core team are QA engineers who test functionality, compatibility, and
                            performance, ensuring the app is stable and secure. DevOps specialists manage deployment to
                            the Play Store and ongoing app updates. Most importantly, your input is valued at every
                            step, making sure the final product not only meets expectations but helps your business grow
                            in a competitive mobile landscape.
                        </p><br/>
                        <Link href='/company'>
                            <button
                                className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                                <span
                                    className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                <span
                                    className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>About Us <span
                                    className={`text-[1.5em] leading-[0.7]`}> â†’</span></span>
                                <span
                                    className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                            </button>
                        </Link>
                    </div>
                    <div
                        className="relative flex flex-row lg:-ml-[2em] md:-ml-[2em] w-full h-auto max-w-full mx-auto gap-6">
                        <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[17.5em] justify-center items-center">
                            <div className="flex-1 flex justify-center h-auto items-center">
                                <Image
                                    src="/assets/hybrid/trip.jpg"
                                    alt="Team at table"
                                    width={900} // Add width
                                    height={600} // Add height
                                    style={{
                                        objectFit: "fill",
                                        objectPosition: "center",
                                    }}
                                    className="object-fill"
                                />
                            </div>
                        </div>
                        <div
                            className="flex-1 flex justify-center lg:-my-[20em] md:-my-[20em] lg:pl-[15em] md:pl-[15em] lg:-mr-[4em] items-center">
                            <Image
                                src="/assets/hybrid/disc.jpg"
                                alt="Team at table"
                                height={700}
                                width={220}
                                style={{
                                    objectFit: "fill",
                                    objectPosition: "center",
                                }}
                                className="object-fill"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AndroidDevelopment;
