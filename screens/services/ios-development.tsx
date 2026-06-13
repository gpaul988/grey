'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

const IosDevelopment = () => {
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
            "IPA",
            "IPDA",
            "AWA",
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

    // Partners Section hook
    const partners = [
        {id: 1, name: 'Partner 1', dayImage: 'poawd.svg', nightImage: 'poawd1.svg'},
        {id: 2, name: 'Partner 2', dayImage: 'hub.svg', nightImage: 'hub1.svg'},
        {id: 3, name: 'Partner 3', dayImage: 'car.svg', nightImage: 'car1.svg'},
        {id: 4, name: 'Partner 4', dayImage: 'pet.svg', nightImage: 'pet1.svg'},
        {id: 5, name: 'Partner 5', dayImage: 'sew.svg', nightImage: 'sew1.svg'},
        {id: 6, name: 'Partner 6', dayImage: 'tim.svg', nightImage: 'tim1.svg'},
        {id: 7, name: 'Partner 7', dayImage: 'pat.svg', nightImage: 'pat1.svg'},
        {id: 8, name: 'Partner 8', dayImage: 'kow.svg', nightImage: 'kow1.svg'},
        {id: 9, name: 'Partner 9', dayImage: 'afro.svg', nightImage: 'afro1.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane.svg', nightImage: 'cane1.svg'},
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
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[600] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    iOS App Development
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    We have an expert in-house team building cutting-edge iOS apps for iPhone, iPad, and Apple Watch.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/ios/hero.jpg'}
                        alt={'iOS App Development Hero'}
                        width={1536}
                        height={864}
                        style={{
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </div>
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Unlock the power of <br className={'lg:block md:block hidden'}/>Apple’s ecosystem
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.3] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Expert iOS Development <br className={'lg:block md:block hidden'}/>For Impactful Apps
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we specialize in native iOS app development using Objective-C and
                                    Swift. This approach allows us to fully leverage the capabilities of Apple devices,
                                    ensuring optimal performance and a seamless user experience that meets the high
                                    expectations of today’s mobile users.<br/><br/>
                                    Native development unlocks full access to device hardware and operating system
                                    features, including advanced sensors, GPS, accelerometers, magnetometers, iBeacons,
                                    and cameras. By harnessing these technologies, we help businesses deliver innovative
                                    solutions that enhance user engagement and operational efficiency.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Choosing native iOS apps means your product will benefit from better stability,
                                    faster performance, and tighter security compared to cross-platform alternatives.
                                    This translates into greater customer satisfaction, stronger brand reputation, and
                                    increased competitive advantage in your market.<br/><br/>
                                    Ultimately, our focus on native development ensures your app is not only polished
                                    and powerful but also future-proofed to adapt to ongoing iOS updates and new
                                    hardware capabilities. We’re committed to delivering apps that drive real business
                                    value and lasting user loyalty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*f Top Image*/}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                    <div className={'h-auto w-full max-w-full'}>
                        <Image
                            src={'/assets/ios/4.jpg'}
                            alt={'Garden'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/ios/2.jpg'}
                            alt={'home'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/ios/3.jpg'}
                            alt={'ecommerce'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/ios/1.jpg'}
                            alt={'sales'}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* React Native development services */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-native-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative mb-8 border-b-[1px] lg:pb-[2em] pb-[1em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Our iOS App Development Services
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
                                    {id: "01", title: "iPhone Apps", target: "IPA"},
                                    {id: "02", title: "iPad Apps", target: "IPDA"},
                                    {id: "03", title: "Apple Watch Application", target: "AWA"},
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
                                                    className={`opacity-0 transition-opacity text-[2em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[23em] md:mb-[23em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IPA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        iPhone Apps
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>iPhone app development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>iPhone user experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>mobile app optimisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>cross-device compatibility</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        When planning your project with us, we’ll advise on the optimal device size to
                                        ensure your app delivers the best possible user experience. iPhone apps are
                                        ideal for customers on the move, with peak usage typically during morning and
                                        daytime hours. At Grey InfoTech, we understand how to optimize iPhone apps to
                                        provide a seamless and engaging experience across all devices. Our design and
                                        development team has extensive experience crafting visually stunning and highly
                                        functional apps that run smoothly on everything from older models like the
                                        iPhone 4s, 5, and 5s to newer devices such as the iPhone 12, 13 Plus, and 15.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IPDA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        iPad Apps
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>iPad app development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tablet app solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>iPad user experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>functional app design</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        iPads, like other tablets, offer a larger screen that’s perfect for applications
                                        requiring more information to be displayed simultaneously. Increasingly, iPads
                                        are used in workplaces over Wi-Fi connections, allowing staff to stay mobile
                                        without needing to return to a fixed desktop terminal.<br/><br/>
                                        At Grey InfoTech, we specialize in delivering beautiful, functional iPad
                                        applications designed to engage users and enhance productivity. Our apps can
                                        improve or even replace traditional desktop software, providing seamless and
                                        efficient solutions tailored to your business needs.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AWA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Apple Watch Applications</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Apple Watch app development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>wearable technology apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Apple Watch UX design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Approved Apple developers</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we understand the strategic value of developing iOS
                                        applications tailored to your business needs across the full range of Apple
                                        devices. Whether targeting on-the-go customers with optimized iPhone apps that
                                        perform seamlessly from older models to the latest releases, or enhancing
                                        workplace productivity through powerful, visually engaging iPad applications
                                        that can replace traditional desktop software, we deliver solutions that drive
                                        engagement and efficiency. Our team advises on the optimal device size and
                                        functionality to ensure your app delivers maximum impact during peak usage times
                                        and across various work environments.<br/><br/>
                                        With the Apple Watch representing a revolutionary new device category, Grey
                                        InfoTech is uniquely positioned to help businesses capitalize on wearable
                                        technology. As approved Apple Developers, we’re already developing innovative
                                        health, lifestyle, and productivity applications that leverage the Watch’s
                                        capabilities in both 38mm and 42mm sizes. Partner with us to integrate Apple’s
                                        evolving ecosystem into your product strategy, empowering your business to
                                        connect with customers in fresh and meaningful ways.
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
                    src={'/assets/ios/mid.jpg'}
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
                            Seamless iOS <br className={'lg:block md:block hidden'}/>Experiences Tailored <br
                            className={'lg:block md:block hidden'}/>for Business Success
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why iOS Application?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Developing an iOS application offers businesses access to a premium user base known
                                    for higher engagement levels and greater purchasing power. The iOS ecosystem,
                                    comprised of millions of active users on iPhones, iPads, and other Apple devices,
                                    provides a consistent, secure, and high-quality environment that fosters customer
                                    trust and loyalty. With Apple’s rigorous app review process and strict guidelines,
                                    iOS apps tend to deliver superior performance, reliability, and a seamless user
                                    experience—key factors that help businesses build strong brand reputations and drive
                                    customer retention.
                                </p>
                            </div>
                            <div>
                                <p>
                                    From a business perspective, iOS development can lead to faster time-to-market due
                                    to well-documented tools and standardized hardware. The platform also offers
                                    lucrative monetization opportunities, with users more willing to pay for apps and
                                    in-app purchases. Additionally, iOS apps benefit from strong integration with
                                    Apple’s hardware and software features, opening doors to innovative functionalities
                                    that can differentiate your product in competitive markets. For companies targeting
                                    growth, profitability, and long-term success, investing in an iOS application is a
                                    strategic decision that aligns technology with business objectives.
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
                            Benefits of <br className={'lg:block md:block hidden'}/>iOS Application
                        </h2>
                    </div>
                    <div className={'lg:-ml-[7em] md:-ml-[7em]'}>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3]'>
                            iOS Application Development delivers high-performance, secure, and user-friendly mobile
                            solutions tailored for Apple’s ecosystem. It enables businesses to reach premium users,
                            ensure app store compliance, and provide a seamless, engaging experience across iPhone,
                            iPad, and Apple Watch—driving customer loyalty and long-term growth.
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
                            Access to <br className={'lg:block md:block hidden'}/>High-Value User Base
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            iOS users are known for their strong brand loyalty, higher engagement levels, and greater
                            willingness to pay for quality apps and services. This makes iOS an ideal platform for
                            businesses targeting premium users or looking to generate revenue through in-app purchases,
                            subscriptions, or paid apps.
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
                            Enhanced Security <br className={'lg:block md:block hidden'}/>& Data Privacy
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Apple’s closed ecosystem and rigorous app review process ensure a higher standard of
                            security. iOS applications benefit from built-in security features such as data encryption,
                            secure transactions, and controlled app permissions—making the platform especially suitable
                            for finance, healthcare, and enterprise solutions.
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
                            Superior <br className={'lg:block md:block hidden'}/>User Experience
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Apple maintains strict design and performance guidelines, resulting in a consistent,
                            seamless user experience across all devices. With smooth navigation, intuitive interfaces,
                            and reliable functionality, iOS apps often see higher user satisfaction and retention.
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
                        <h3 className='text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Faster Development <br className={'lg:block md:block hidden'}/>& Reduced Fragmentation
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unlike Android, where device and OS fragmentation can delay development, iOS apps are built
                            for a limited number of devices and screen sizes. This allows for faster development,
                            simplified testing, and a quicker time-to-market—helping businesses stay agile and
                            responsive.
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
                        <h3 className='capitalize text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Strong ROI & <br className={'lg:block md:block hidden'}/>Monetization Potential

                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            iOS apps typically generate more revenue compared to their Android counterparts, thanks to
                            the spending behavior of Apple users and the platform’s strong monetization capabilities.
                            Businesses can expect better returns from well-executed iOS apps in both B2B and B2C
                            markets.
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
                        <h3 className='capitalize text-[1.5em] leading-[1.3] font-[600] mb-2'>
                            Global Reach <br className={'lg:block md:block hidden'}/>via App Store
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            With access to millions of users in over 175 countries, the Apple App Store offers a
                            powerful distribution channel. It provides visibility, credibility, and tools for app
                            promotion, making it easier for businesses to grow their customer base and expand into new
                            markets.
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
                            At Grey InfoTech, iOS app development is driven by a focused, cross-functional team aligned
                            with your business objectives. A dedicated project manager ensures smooth coordination and
                            communication, while our experienced iOS developers build secure, high-performance
                            applications tailored for Apple’s ecosystem. UI/UX designers craft intuitive, visually
                            appealing interfaces that meet Apple’s design standards and enhance user engagement.
                            <br/><br/>
                            Quality assurance engineers rigorously test the app across devices to ensure reliability,
                            while DevOps specialists handle deployment, updates, and performance monitoring. Throughout
                            the process, we keep you actively involved—providing regular updates and incorporating your
                            feedback—so the final product delivers real business impact and meets both user and market
                            expectations.
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
                                    className={`text-[1.5em] leading-[0.7]`}> →</span></span>
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full  mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:pt-[5em] md:pt-[5em] pt-[2em] lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-[5em] md:pb-[5em] pb-[2em]`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage || 'default.svg' : partner.nightImage || 'default.svg'}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>iOS Application Questions
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What kind of iOS applications does Grey InfoTech develop?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5] text-gray-400">
                                we build custom iOS applications tailored to your specific business objectives. Our
                                solutions cover a wide range of use cases, including customer-facing apps, enterprise
                                productivity tools, mobile commerce platforms, booking systems, health & lifestyle apps,
                                and smart integrations with wearable devices like the Apple Watch. Whether you&#39;re a
                                startup looking to launch your MVP or an enterprise streamlining internal operations, we
                                craft apps that align with your goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is your approach to iOS app development?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We follow a strategic, end-to-end development process that includes consultation, UX/UI
                                design, native development (using Swift and Objective-C), testing, deployment, and
                                post-launch support. We work closely with your team to ensure that the app not only
                                meets Apple’s strict standards but also delivers measurable business value through
                                performance, usability, and scalability.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to build an iOS application?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Project timelines depend on complexity, integrations, and scope. A basic iOS app with
                                standard features typically takes 10 to 16 weeks, while more complex or enterprise-level
                                solutions may require 18 weeks or more. We use agile methodologies to ensure timely
                                delivery, with iterative updates and clear communication throughout.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the cost of developing an iOS application with Grey InfoTech?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>
                                    The cost of developing an iOS application depends entirely on the scope,
                                    functionality, design requirements, and level of integration needed. At Grey
                                    InfoTech, we provide flexible pricing tailored to your business goals, project
                                    complexity, and timeline. Whether you need a basic MVP, a mid-range app with custom
                                    features, or a fully integrated enterprise solution, we offer transparent,
                                    client-driven estimates based on your specific needs and budget. After an initial
                                    consultation, we’ll provide a detailed proposal to help you plan effectively.
                                </p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you support older iPhones and iPads as well as the latest devices?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes. We design apps that are backward-compatible with older models (e.g., iPhone 5s,
                                iPhone 6) while fully optimized for the latest iPhones, iPads, and Apple Watches. This
                                ensures your app is accessible to a wider audience and future-proofed for the Apple
                                ecosystem.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Will Grey InfoTech help us publish the app to the App Store?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Absolutely. We manage the submission process, ensure compliance with Apple’s App Store
                                guidelines, and handle technical issues that may arise during review. We also optimize
                                your App Store listing with descriptions, keywords, and visuals to help your app gain
                                visibility and traction post-launch.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you offer post-launch support and maintenance?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes. We provide ongoing support packages that include performance monitoring, bug fixes,
                                iOS version updates, security patches, and feature enhancements. We act as a long-term
                                partner, ensuring your app continues to evolve with your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can the iOS app integrate with our existing software or business systems?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Definitely. We specialize in developing apps that integrate seamlessly with CRMs, ERPs,
                                payment gateways, analytics tools, and other third-party APIs. We ensure your app works
                                as an extension of your digital ecosystem, improving data flow, efficiency, and customer
                                experience.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why choose Grey InfoTech for iOS app development?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                With over a decade of experience in custom software development, Grey InfoTech combines
                                technical expertise with business insight. As certified Apple Developers, we are
                                equipped to deliver high-quality, scalable iOS solutions that meet your specific
                                business objectives—on time and within budget.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default IosDevelopment;