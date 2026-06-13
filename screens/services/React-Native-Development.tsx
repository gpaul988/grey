'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Testimonial data
const testimonials = [
    {
        name: "Sylvia Essien ",
        title: "COO, FinPlus Capital ",
        message: (
            <>
                Working with Grey InfoTech on our React Native app was a fantastic experience. They built a performant,
                user-friendly app that perfectly fits our business needs and accelerates our digital growth. Their team
                is reliable, skilled, and truly customer-focused.
            </>
        ),
    },
    {
        name: "Tunde Balogun",
        title: "Founder & CEO, EduTrack Africa",
        message: (
            <>
                Thanks to Grey InfoTech’s React Native development, our app now offers a smooth, responsive shopping
                experience that keeps customers coming back. Their agile approach and clear communication made the
                entire process stress-free and efficient.
            </>
        )
    },
    {
        name: "Michael Adeyemi",
        title: "CTO, HealthNet Systems",
        message: (
            <>
                Their expertise enabled us to launch a high-quality, cross-platform mobile app faster than we imagined.
                Their team’s attention to detail and deep understanding of mobile UX have helped us reach more users
                with a seamless experience on both iOS and Android.
            </>
        )
    }
];

const ReactNativeDevelopment = () => {
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

    // Development Solutions hook
    const handleScroll = () => {
        const sections = [
            "CAD",
            "CPD",
            "UUD",
            "MU",
            "AI",
            "PO",
            "TQA",
            "MS",
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

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, message} = testimonials[current];

    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <Header/>
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
                    React Native App <br className={'lg:block md:block hidden'}/>Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    With React Native development, we can build an stunning mobile app for your business – fast.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/rnad/hero.jpg'}
                        alt={'React Native App Development Hero'}
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
                            Build powerful, <br className={'lg:block md:block hidden'}/>cross-platform apps <br
                            className={'lg:block md:block hidden'}/>with React Native
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            React Native Development Agency
                        </h3>
                        <div>
                            <p>
                                At Grey InfoTech, we specialize in React Native app development, delivering
                                sophisticated mobile applications designed to meet the complex demands of today’s
                                businesses. By harnessing the full potential of React Native, our experienced team
                                engineers innovative, high-performance apps that offer seamless cross-platform
                                functionality for iOS and Android devices. Serving diverse industries—including travel,
                                healthcare, e-commerce, and education—we create scalable solutions built with reusable
                                components, reducing development time and costs. Our approach ensures your business
                                remains consistently accessible to your target audience, providing a smooth and engaging
                                user experience directly on their mobile devices. With Grey InfoTech as your development
                                partner, you gain a competitive edge through cutting-edge mobile technology tailored to
                                your unique business goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* React Native development services */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-native-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                React Native <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div className={'lg:-ml-[4em] md:-ml-[4em]'}>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                As a React Native development company, Grey InfoTech guides you through the entire app
                                lifecycle—from concept and design to development and maintenance. Our goal is to deliver
                                robust, scalable, and user-friendly mobile applications that help you achieve your
                                business objectives efficiently.
                            </p>
                        </div>
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
                                    {id: "01", title: "Custom Application Development", target: "CAD"},
                                    {id: "02", title: "Cross-Platform Development", target: "CPD"},
                                    {id: "03", title: "UI/UX Design", target: "UUD"},
                                    {id: "04", title: "Migration & Upgrades", target: "MU"},
                                    {id: "05", title: "API Integration", target: "AI"},
                                    {id: "06", title: "Performance Optimisation", target: "PO"},
                                    {id: "07", title: "Testing & Quality Assurance", target: "TQA"},
                                    {id: "08", title: "Maintenance & Support", target: "MS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[14em] md:mb-[14em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailored app solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Industry-specific apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Our React Native team takes a strategic and detail-oriented
                                        approach to mobile app design and development. We ensure every solution is
                                        aligned with your target audience, business goals, and industry-specific
                                        requirements. By focusing on scalability and maintainability from the outset, we
                                        deliver applications that not only perform seamlessly today but are also easy to
                                        update and enhance as your business evolves—ensuring long-term value and
                                        adaptability.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Cross-Platform Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Multi-platform compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Single codebase efficiency</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost and time saving</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We prioritise simplicity and efficiency for our clients. React Native is an
                                        ideal choice for mobile app development because it allows our team to build
                                        high-quality applications for both iOS and Android using a single codebase. This
                                        unified approach ensures consistent performance and design across all devices,
                                        while significantly reducing development time and costs—making it a smart,
                                        scalable solution for businesses seeking to maximise value without compromising
                                        on quality.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'UUD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>UI/UX Design</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Intuitive design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Brand alignment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Customer engagement</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We deliver React Native development with a strong focus on best-in-class user
                                        interface and experience design. Our team creates visually compelling, intuitive
                                        mobile applications that not only reflect
                                        your <Link href={'/services/branding'}
                                                   className={`border-b pb-[0.02em] ${
                                                       isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                   }`}>brand</Link> identity but also
                                        prioritise user engagement, accessibility, and customer satisfaction. The result
                                        is a seamless digital experience that keeps users connected and enhances
                                        long-term loyalty.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MU'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Migration & Upgrades</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App modernisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Future-proofing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feature upgrades</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our development team can seamlessly upgrade or transition your existing
                                        applications to React Native, unlocking long-term performance benefits and
                                        future-ready capabilities. Migrating to React Native allows you to consolidate
                                        codebases, reduce technical debt, and streamline ongoing maintenance efforts. It
                                        also ensures your app remains compatible with the latest platform updates, gains
                                        access to modern features, and provides a consistent user experience across both
                                        iOS and Android. This strategic move future-proofs your mobile presence, making
                                        your application more resilient, scalable, and aligned with evolving user
                                        expectations and business growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>API Integration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Third-party plugins</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Enhanced functionality</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Extended user features</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        React Native serves as a strong foundation for building feature-rich mobile
                                        applications, and our development team is well-versed in integrating third-party
                                        APIs and plugins to extend its capabilities. Whether it’s payment gateways,
                                        mapping services, analytics tools, or custom integrations, we can seamlessly
                                        enhance your app’s functionality to deliver a more comprehensive and engaging
                                        user experience. This flexibility ensures your application not only meets
                                        current user expectations but is also equipped to evolve alongside your business
                                        needs.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Performance Optimisation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Faster load times</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Improved efficiency</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless user experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        With React Native, we deliver mobile applications that offer faster load times,
                                        seamless user experiences, and optimised performance across devices. We
                                        understand the expectations of today’s dynamic and demanding user
                                        base—and we’re committed to helping you meet those needs effortlessly. By
                                        combining React Native’s efficiency with our development expertise, we ensure
                                        your app remains responsive, reliable, and ready to scale as your business
                                        grows.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'TQA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Testing & Quality Assurance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Robust performance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Quality protocols</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reliable applications</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we uphold the highest standards of testing and quality
                                        assurance throughout the development lifecycle. Our rigorous QA protocols ensure
                                        your application is stable, secure, and performs reliably across all devices and
                                        platforms. You can count on us to deliver a product that not only meets industry
                                        standards but also supports long-term business success through consistent,
                                        high-quality performance.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Maintenance & Support</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Ongoing updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Application security</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Longevity assurance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        You can count on us to provide comprehensive ongoing support for your
                                        React Native mobile application. Our services include regular updates,
                                        performance optimisation, and proactive maintenance—ensuring your app stays
                                        efficient, secure, and aligned with the latest platform requirements. This
                                        continuous support not only extends the longevity of your application but also
                                        protects your investment as your business evolves.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[23em] md:-mt-[23em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/rnad/mid.jpg'}
                    alt={'Middle Image'}
                    width={1536}
                    height={878}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why React Native? */}
            <div className={`-mt-[3em] ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            The framework <br className={'lg:block md:block hidden'}/>behind powerful <br
                            className={'lg:block md:block hidden'}/>cross-platform apps
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why React Native?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    React Native, an open-source extension of React.js developed by Meta (formerly
                                    Facebook), has been empowering businesses since its release in 2015 by enabling the
                                    development of native mobile applications across platforms such
                                    as <Link href={'/services/ios-development'}
                                             className={`border-b pb-[0.02em] ${
                                                 isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                             }`}>iOS</Link>, Android, and
                                    even macOS. Adopted by industry leaders like Uber, Airbnb, and Instagram, it offers
                                    a proven and reliable foundation for building high-performance mobile solutions. Its
                                    cross-platform capabilities reduce the need for maintaining separate codebases,
                                    significantly lowering development costs and time-to-market—making it a strategic
                                    choice for businesses aiming to scale quickly without compromising quality.
                                </p>
                            </div>
                            <div>
                                <p>
                                    At Grey InfoTech, we harness the full potential of React Native to deliver mobile
                                    applications that combine the speed and efficiency of web technologies with the
                                    robust performance of native apps. Using familiar tools
                                    like <Link href={'/services/Javascript'}
                                               className={`border-b pb-[0.02em] ${
                                                   isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                               }`}>JavaScript</Link> and JSX, our developers craft scalable, intuitive
                                    applications tailored to your audience and business goals. React
                                    Native’s <Link href={'/services/ui-ux-design'}
                                                   className={`border-b pb-[0.02em] ${
                                                       isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                   }`}>UI</Link> framework allows us to build beautiful, seamless
                                    interfaces that feel right at home on any device, ensuring a consistent brand
                                    experience across platforms. Whether you&#39;re launching a new product or
                                    modernising an existing one, we provide the technical expertise and strategic
                                    insight to bring your mobile vision to life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits of React Native */}
            <div
                className={`relative -mt-[2em] max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            Benefits of <br className={'lg:block md:block hidden'}/>React Native
                        </h2>
                    </div>
                    <div className={'lg:-ml-[7em] md:-ml-[7em]'}>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3]'>
                            React Native enables faster, cost-effective mobile app development with one codebase for
                            both iOS and Android. It helps businesses launch quicker, reduce maintenance costs, and
                            deliver a consistent, high-quality user experience.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/rc.svg' : '/assets/rnad/icon/rc1.svg'}
                            alt='Cross-Platform Compatiibility'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Cross-Platform Compatibility
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            React Native empowers us to build high-performance mobile applications for both iOS and
                            Android from a single, unified codebase—drastically reducing development time, cost, and
                            complexity for our clients. This cross-platform efficiency ensures a consistent user
                            experience across all devices, helping businesses maintain brand consistency and meet user
                            expectations seamlessly. Beyond core development, React Native’s compatibility with
                            third-party plugins, native modules, and APIs allows us to extend app functionality with
                            features such as secure payment systems, real-time chat, geolocation services, and advanced
                            analytics. This flexibility not only accelerates time-to-market but also enables businesses
                            to scale their digital products more strategically, adapt to evolving market demands, and
                            deliver greater long-term value to their users.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/wap.svg' : '/assets/rnad/icon/wap1.svg'}
                            alt='Reusable Component'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Reusable Components
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            By leveraging React Native’s component-based architecture, we’re able to reuse modular UI
                            elements across different parts of a project—or even across multiple projects—dramatically
                            improving development efficiency. At Grey InfoTech, our team uses this approach to build
                            well-structured, scalable applications with consistent design and functionality. This not
                            only accelerates development timelines but also simplifies future updates and maintenance,
                            making it easier to introduce new features, resolve issues quickly, and adapt to changing
                            business needs without disrupting the user experience.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/ip.svg' : '/assets/rnad/icon/ip1.svg'}
                            alt='Cost-Effectiveness'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Cost-Effectiveness
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            React Native’s ability to use a single codebase to build applications across multiple
                            platforms marks a major shift from traditional mobile development methods, which often
                            required separate frameworks, teams, and timelines for iOS and Android. This unified
                            approach streamlines the entire development process, reducing overhead and shortening
                            delivery cycles without compromising on quality or native performance. At Grey InfoTech,
                            this efficiency allows us to offer React Native solutions as a cost-effective, scalable
                            alternative—enabling our clients to reach a wider audience faster, while maintaining
                            consistent design, functionality, and user experience across all devices.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sf.svg' : '/assets/rnad/icon/sf1.svg'}
                            alt='Hot Reloading'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='text-[1.5em] font-[600] mb-2'>
                            Hot Reloading
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            React Native’s support for hot reloading significantly enhances development speed and
                            efficiency by allowing our team to instantly view code changes without needing to manually
                            refresh the application. This real-time feedback loop accelerates the testing and refinement
                            process, enabling faster iterations and more responsive development cycles. At Grey
                            InfoTech, we leverage this feature to streamline collaboration, reduce downtime during
                            debugging, and deliver high-quality mobile applications to our clients more quickly—without
                            compromising stability or performance.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sdm.svg' : '/assets/rnad/icon/sdm1.svg'}
                            alt='Strong Developer Community'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Strong Developer Community
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            The vibrant and extensive React Native developer community serves as a powerful ecosystem of
                            shared knowledge, tools, and open-source solutions. By being actively engaged in this
                            community, our developers at Grey InfoTech gain immediate access to a wealth of pre-built
                            components, libraries, and best practices—accelerating development and enhancing the
                            functionality of your mobile application. This collective innovation not only supports
                            faster problem-solving but also ensures that your app benefits from the latest advancements
                            and industry-tested solutions, ultimately delivering a more polished, competitive product.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/rnad/icon/sc.svg' : '/assets/rnad/icon/sc1.svg'}
                            alt='Rapid Development Cycles'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            rapid development cycles
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            React Native’s ability to support rapid iterations and real-time updates significantly
                            boosts the agility of our development process, allowing us to respond quickly to evolving
                            business needs, market trends, and user feedback. At Grey InfoTech, we harness this
                            flexibility to help your business maintain a competitive edge—by rolling out new features,
                            optimising performance, or adjusting functionality with minimal disruption. This
                            adaptability ensures your mobile application remains relevant, responsive, and aligned with
                            both your strategic goals and shifting customer expectations.
                        </p>
                    </div>
                </div>
            </div>

            {/* Proactive risk assessment & rigorous testing */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/node/prart.jpg'}
                                alt={'Proactive Risk Assessment & Rigorous Testing'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[6em] md:mt-[6em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] font-[500] tracking-tight mb-6 leading-[1.1] pb-6 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                                What Grey InfoTech Does?
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                We’re a digital product development company based in Port Harcourt, Nigeria, and for
                                nearly a decade, we’ve specialised in delivering cutting-edge React development services
                                for businesses with complex, high-tech requirements. At Grey InfoTech, we understand
                                that creating impactful digital experiences requires more than just clean code—it
                                demands deep technical expertise, strategic thinking, and a clear understanding of your
                                business goals. That’s why we work closely with our clients to craft scalable,
                                high-performing applications that solve real-world problems and drive measurable
                                results.<br/><br/>
                                With over three billion smartphone users worldwide, mobile accessibility has become
                                critical to staying competitive. If your business doesn’t yet have a mobile app—or is
                                operating with outdated technology—you may already be falling behind more agile
                                competitors. Our team uses React Native to fast-track mobile development by writing a
                                single codebase for both iOS and Android platforms, drastically reducing time-to-market
                                and development costs. This streamlined approach means we can help you launch sooner,
                                iterate faster, and scale smarter—delivering a mobile app that’s efficient, intuitive,
                                and perfectly aligned with your business objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Digital Products Suited To React.js */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Digital Products <br className={'lg:block md:block hidden'}/>Suited To React Native
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            At Grey InfoTech, we’ve worked with businesses
                            in <Link href={'/industries/fintech'}
                                     className={`border-b pb-[0.02em] ${
                                         isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                     }`}>FinTech</Link>, PropTech, SciTech, and
                            TravelTech, using our industry knowledge to build React Native solutions aligned with your
                            goals. In the <Link href={'/services/discovery-phase'}
                                                className={`border-b pb-[0.02em] ${
                                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                }`}>discovery phase</Link>, we focus on understanding your vision to
                            create an app that drives growth, boosts user engagement, and speeds up time-to-market.
                        </p>
                    </div>
                </div>

                {/* Education and learning platforms */}
                <div id={'ELP'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Education & <br className={'lg:block md:block hidden'}/>Learning Platforms
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[2.5em] md:pl-[18em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/elp.jpg'
                                alt='Education and Learning Platforms'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            Imagine an app that delivers hassle-free browsing, smooth transactions, and engaging
                            customer experiences—this is what React Native offers for e-commerce. Its powerful features
                            like real-time updates, intuitive navigation, secure payment gateways, personalized
                            recommendations, and seamless cart management transform the shopping journey. For businesses
                            seeking a visually appealing, dynamic, and reliable mobile shopping platform, React Native
                            provides an efficient and scalable solution to stay ahead in a competitive market.
                        </p>
                    </div>
                </div>

                {/* Healthcare & Telemedicine Apps */}
                <div id={'HTA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Healthcare & <br className={'lg:block md:block hidden'}/>Telemedicine Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[2.5em] md:pl-[18em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/hta.jpg'
                                alt='Healthcare & Telemedicine Apps'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            React Native’s capabilities for real-time communication and simultaneous user interaction
                            make it a transformative solution in healthcare. It supports secure video consultations,
                            instant data synchronization, and timely updates—creating a dependable platform for seamless
                            collaboration between medical professionals and patients. Our team specialises in designing
                            React Native applications that feature secure data transfer, live symptom monitoring, and
                            reliable patient-doctor communication, ensuring your healthcare solutions are both
                            innovative and trustworthy.
                        </p>
                    </div>
                </div>

                {/* Travel & Hospitality Apps */}
                <div id={'THA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Travel & <br className={'lg:block md:block hidden'}/>Hospitality Apps
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3em] md:pl-[18em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/tha.jpg'
                                alt='Travel & Hospitality Apps'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            Using React Native, we develop compelling travel apps that deliver reliable booking,
                            seamless itinerary management, and real-time updates. Features such as GPS integration,
                            interactive navigation, and secure payment processing can be tailored to meet your specific
                            business requirements. By providing a smooth and intuitive travel experience, your native
                            mobile app will foster greater user loyalty and trust, helping your brand stand out in a
                            competitive market.
                        </p>
                    </div>
                </div>

                {/* e-Commerce Platforms */}
                <div id={'ECPF'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            e-Commerce <br className={'lg:block md:block hidden'}/>Platforms
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[2.5em] md:pl-[18em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/ecpf.jpg'
                                alt='e-Commerce Platforms'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            Imagine an app that delivers hassle-free browsing, smooth transactions, and engaging
                            customer experiences—React Native makes this a reality for e-commerce. With features like
                            real-time updates, intuitive navigation, secure payment gateways, personalized
                            recommendations, and seamless cart management, it transforms the shopping journey and sets
                            your business apart in a crowded market. If you’re seeking a visually stunning, dynamic, and
                            reliable mobile shopping platform, React Native offers an efficient and scalable solution to
                            help you succeed.
                        </p>
                    </div>
                </div>

                {/* On-Demand Service App */}
                <div id={'ODSA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            On-Demand <br className={'lg:block md:block hidden'}/>Service App
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[2.5em] md:pl-[18em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/odsa.jpg'
                                alt=' On-Demand Service App'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            For on-the-go services such as ride-sharing and food delivery, React Native delivers the
                            reliability essential for exceptional customer satisfaction. Its robust support for GPS
                            integration, real-time tracking, transparent pricing, instant notifications, and secure
                            payment processing covers all critical aspects of mobile service platforms. By leveraging
                            React Native’s flexible framework, we create seamless, trustworthy experiences that meet
                            users’ high expectations for speed and efficiency—making it the preferred choice for
                            businesses aiming to excel in fast-paced, mobile-first markets.
                        </p>
                    </div>
                </div>

                {/* Social Media Applications */}
                <div id={'SMA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Social Media <br className={'lg:block md:block hidden'}/>Applications
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3em] md:pl-[18em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/rnad/sma.jpg'
                                alt='Social Media Application'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.87em] lg:-ml-[3em] md:-ml-[3em] font-[200] justify-center text-justify leading-[1.2] tracking-normal'>
                            In today’s fast-paced digital landscape, React Native excels at handling continuous updates,
                            real-time interactions, and dynamic content—making it an ideal choice for building engaging
                            social platforms. Its ability to deliver consistent experiences across multiple devices
                            ensures seamless sharing and interaction, while features like rapid media uploads and
                            instant messaging foster vibrant, interactive communities. This combination enables
                            businesses to create social apps that captivate users and keep them connected in real time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/rnad/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={1038}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
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
                            At Grey InfoTech, building your React Native app is a team effort involving skilled
                            professionals working together to deliver the best results. A project manager keeps
                            everything on track and makes sure you’re always informed. Our React Native developers
                            create the app to work smoothly on both iOS and Android devices, while designers focus on
                            making the app easy and enjoyable to use. Quality testers check every feature to ensure the
                            app works reliably.<br/><br/>
                            Behind the scenes, DevOps specialists handle deployment and make sure your app runs smoothly
                            after launch. Throughout the process, you stay involved and can share your feedback, while
                            we manage the technical details—ensuring your app meets your goals and expectations.
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

            {/* Testimonials */}
            <div
                className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full  h-auto ${
                    isDayTime ? 'bg-white' : 'bg-black'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                    </div>
                    <div className={'lg:ml-[-20em] md:ml-[-20em] sm:ml-[-10em]'}>
                        <div
                            className="flex items-start gap-4 text-[2em] font-[500] mb-6">
                            <Quote className="w-6 h-6 shrink-0"/>
                            <p className="leading-tight text-justify border-b-[0.1em] border-gray-300/20 pb-12">
                                {message}
                            </p>
                        </div>
                        <div className="flex ml-10 items-center gap-4">
                            <div>
                                <p className="font-semibold text-[1.3em]">{name}</p>
                                <p className="text-[0.8em] ">{title}</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-1">
                            <button onClick={prev} className="">
                                <ArrowLeft className="w-8 h-6"/>
                            </button>
                            <button onClick={next} className="">
                                <ArrowRight className="w-8 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>React Native Questions
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
                            <span>What is React Native and how does it work?</span>
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
                                React Native is an open-source JavaScript framework developed by Meta (formerly
                                Facebook) for building native mobile applications on both iOS and Android platforms. It
                                enables developers to create apps with a truly native look and feel by leveraging the
                                same design principles and UI components used in traditional native apps. Built on the
                                foundation of React—a widely adopted JavaScript library for building user
                                interfaces—React Native extends its capabilities by rendering UI elements directly to
                                mobile platforms rather than the web, allowing for seamless cross-platform development
                                without sacrificing performance or user experience.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is React Native suitable for all types of mobile apps?</span>
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
                                React Native is well-suited for developing a broad spectrum of mobile applications,
                                including those with complex animations, rich user interactions, offline capabilities,
                                and the need to manage large volumes of data efficiently. Its cross-platform approach
                                accelerates development while maintaining a high-quality user experience. However, for
                                applications that demand extensive platform-specific features or deep integration with
                                custom hardware, React Native may present limitations, and native development could be a
                                more appropriate choice.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the key benefits of using React Native?</span>
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
                                The primary benefits of using React Native include its efficiency in cross-platform
                                development through a single codebase, the ability to create reusable components that
                                streamline development, and access to a vibrant developer community that continually
                                enhances the framework. These advantages lead to faster development cycles and
                                significant cost savings, making React Native an attractive choice for businesses aiming
                                to deliver high-quality mobile applications quickly and economically.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Are there any drawbacks to using React Native?</span>
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
                                    Some potential drawbacks of using React Native include:
                                </p><br/>
                                <ul className={'list-disc ml-4'}>
                                    <li>
                                        Dependence on third-party libraries: React Native often relies on external
                                        libraries to provide certain functionalities, which can increase app complexity
                                        and pose maintenance challenges.
                                    </li>
                                    <li>
                                        Performance limitations: While suitable for most applications, React Native apps
                                        may not match the performance of fully native apps, especially for
                                        resource-intensive tasks or real-time data processing.
                                    </li>
                                    <li>Limited customisation: React Native can offer less flexibility when it comes to
                                        tailoring the app’s look and feel compared to building a native app from the
                                        ground up.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does React Native differ from other Javascript frameworks?</span>
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
                                React Native stands out by enabling development with a single codebase across multiple
                                platforms, significantly streamlining the development process. Its component-based
                                architecture, combined with a focus on native rendering, facilitates efficient workflows
                                and seamless integration of native elements. Unlike some traditional JavaScript
                                frameworks that require separate codebases for each platform, React Native reduces
                                fragmentation and complexity, allowing for faster development cycles and easier
                                maintenance.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How does React Native handle data management?</span>
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
                                React Native utilizes a unidirectional data flow, where changes in a parent component’s
                                state propagate down to its child components. This is managed through the ‘props’
                                system, which ensures a clear and predictable flow of data between components. This
                                structure simplifies debugging, enhances maintainability, and supports the creation of
                                reliable, scalable applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does it cost to develop a React Native app?</span>
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
                                The cost of developing a React Native app depends on several factors, including the
                                app’s complexity, the number of features and screens, and the extent of custom
                                development required. We collaborate closely with you to understand your business needs
                                and establish a budget that aligns with your project goals, ensuring a cost-effective
                                and tailored solution.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to develop a custom React Native mobile application?</span>
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
                                The timeline for developing a React Native app varies based on your project’s scope and
                                complexity. Reach out to us, and we’ll be glad to discuss your specific requirements to
                                provide a clear and accurate estimate for both development time and costs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the difference between React.JS and React Native?</span>
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
                                React.js and React Native, both developed by Meta (formerly Facebook), serve distinct
                                purposes within application development. React.js is designed primarily for building
                                dynamic web applications, focusing on creating user interfaces that render efficiently
                                in browsers. In contrast, React Native leverages similar JavaScript and React principles
                                to build mobile applications that deliver a native look and feel on iOS and Android
                                devices, enabling cross-platform mobile development with a single codebase.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ReactNativeDevelopment;