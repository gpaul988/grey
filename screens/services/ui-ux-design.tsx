'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import CountUp from 'react-countup';
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";

// Testimonial data
const testimonials = [
    {
        name: "Joseph Oluwadaisi",
        title: "CEO, AfroTech Digital",
        image: "/assets/ui-ux/joe.jpeg",
        message:
            "Grey Infotech transformed the front-end design of our ASP.NET website (Afrotech Digital) for logged-in" +
            "users, and the results exceeded our expectations. Their attention to detail and user-focused approach delivered" +
            "a sleek, modern interface that truly elevated our platform."
    },
    {
        name: "Stephen Bright",
        title: "CTO, Infinte Graphix",
        image: "/assets/ui-ux/bright.jpeg",
        message:
            "They completely overhauled the UI/UX of our internal dashboard, delivering a clean, intuitive experience that" +
            "has significantly improved usability. The feedback from our users has been overwhelmingly positive, reflecting" +
            "the impact of their thoughtful, user-centered design approach."
    },
    {
        name: "Priyanka Peeramsetty",
        title: "Founder, Fintrix",
        image: "/assets/ui-ux/priyanka.png",
        message:
            "We partnered with Grey InfoTech for a major front-end revamp, and the experience was seamless from start to finish." +
            "Their collaborative process, attention to detail, and design expertise resulted in a final product that far exceeded our expectations."
    },
    {
        name: "Esther Luchi",
        title: "Product Manager, Poawd Ltd.",
        image: "/assets/ui-ux/ledu.jpeg",
        message:
            "Outstanding communication, precise attention to detail, and exceptional design quality—Grey InfoTech delivers across" +
            "the board. Highly recommended for any UI-focused project aiming for polished, professional, and impactful results."
    },
    {
        name: "Dr. Alison Crasto",
        title: "Senior Project Executive, Cognizant",
        image: "/assets/ui-ux/anushk.png",
        message:
            "Grey Infotech Ltd. did a fantastic job handling our front-end and UI/UX project. Their team was responsive," +
            "detail-oriented, and delivered a clean, user-friendly interface that exceeded our expectations. It was a smooth" +
            "and professional experience from start to finish. Highly recommended!"
    }
];

const UiUxDesign = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);

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

    // Design Solutions hook
    const handleScroll = () => {
        const sections = [
            "ux",
            "ui",
            "visual",
            "access",
            "proto",
            "inter",
            "info",
            "use",
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
        {label: 'Team Members', value: 50, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, image, message} = testimonials[current];


    // Stages hook
    const imageIds: string[] = [
        "research",
        "ideation",
        "vd",
        "rounds",
        "guidelines",
        "testing"
    ];

    const handleScrollStages = () => {
        for (const imageId of imageIds) {
            const textElement = document.getElementById(imageId); // Corresponding text element
            const imageElement = document.getElementById(imageId); // Corresponding image element

            if (textElement && imageElement) {
                const textRect = textElement.getBoundingClientRect();
                const screenCenter = window.innerHeight / 2; // Center of the screen

                // Check if the text is centered on the screen
                if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                    setActiveId(imageId); // Set activeId when the text is centered
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, []);

    // Sticky menu hook
    useEffect(() => {
        const handleScroll = () => {
            const stagesSection = document.getElementById('stages');
            const partnersSection = document.getElementById('partners');

            if (stagesSection && partnersSection) {
                const stagesRect = stagesSection.getBoundingClientRect();
                const partnersRect = partnersSection.getBoundingClientRect();

                // Make sticky menu visible only within the "services-section"
                setIsVisible(
                    stagesRect.top <= window.innerHeight &&
                    stagesRect.bottom >= 0 &&
                    partnersRect.top >= window.innerHeight
                );
            } else {
                console.warn('Sections not found in DOM');
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        {id: 9, name: 'Partner 9', dayIma5ge: 'afro.svg', nightImage: 'afro1.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane.svg', nightImage: 'cane1.svg'},
    ];


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <Header/>
            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div
                className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1 className={`border-b pb-[0.5em]  border-gray-300/20 px-0 constant-text lg:text-[5.5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] mt-[1.5em] leading-[1.1] font-[500] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                    UX & UI design<br className={'lg:block md:block hidden'}/>services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.8em] font-[400]'}>Innovative UX and design solutions
                    that increase user involvement and boost the online presence of your company</p>
                <div
                    className={'relative w-full max-w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/ui-ux/hero.jpg'}
                        alt={'Grey Infotech UI UX Design'}
                        width={1920}
                        height={1080}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text lg:text-[0.8em] text-[0.9em] lg:font-[550] font-[600] lg:tracking-wider tracking-tight'>
                            HUMAN-CENTRED SOLUTIONS
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.5em] text-[1.8em] font-[500] lg:1mt-[0.01em] lg:leading-[1.1] tracking-tightborder-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            An end-to-end approach<br className={'lg:block md:block hidden'}/>to UX/UI design</h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>At the core of our UX/UI design process is a strategic, human-centered approach that
                                    serves businesses across all industries. We go beyond visual appeal by aligning
                                    every design decision with your goals, combining creative expertise with data-driven
                                    business analysis. This ensures that your digital products are not only
                                    aesthetically strong but also intuitive, functional, and built to engage your target
                                    audience effectively.</p>
                            </div>
                            <div>
                                <p>From initial wireframes and interactive prototypes to polished, high-performing
                                    interfaces, we focus on delivering seamless user experiences that support growth and
                                    user satisfaction. Whether you&#39;re launching a new platform, refreshing an
                                    existing
                                    product, or scaling your digital presence, our team ensures your users can navigate
                                    with ease and your brand leaves a lasting impression across all touchpoints.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Design Services Section */}
            <div
                className={`relative lg:py-[3em] py-[1em] lg:my-[6em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                    isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    UX & UI<br className={'lg:block md:block hidden'}/>Design services</h2>
                <div
                    className={`relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 mb-4 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/ux-consultancy1.svg' : '/assets/ui-ux/ux-consultancy.svg'}
                                alt='UX Consultancy'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            UX Consultancy
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Design products your users will love. Our UX consultancy helps you unlock deeper insights
                            through expert research, interviews, and usability testing—turning user needs into smarter
                            design decisions that drive engagement and growth.
                        </p>
                    </div>
                    <div className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/web-design1.svg' : '/assets/ui-ux/web-design.svg'}
                                alt='Web Design'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Web Design
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Maximize your online impact with responsive, high-performing websites designed to engage and
                            convert. We craft digital experiences that reflect your brand, captivate users across all
                            devices, and drive measurable results—whether you&#39;re launching a mobile-first platform
                            or scaling your e-commerce presence.
                        </p>
                    </div>
                    <div className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/web-app1.svg' : '/assets/ui-ux/web-app.svg'}
                                alt='Web App UX'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Web App UX
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            We design smarter web applications that make complexity feel simple. From multi-step
                            workflows and data-heavy dashboards to dynamic forms and notifications, our UX solutions
                            streamline user interactions, reduce friction, and deliver seamless digital experiences that
                            drive productivity and satisfaction.
                        </p>
                    </div>
                    <div className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/mobile1.svg' : '/assets/ui-ux/mobile.svg'}
                                alt='Mobile App UX'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Mobile App UX
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Create mobile experiences that feel effortless and intuitive. Our UX design expertise
                            leverages the full potential of smartphone interactions—optimizing for touch, gestures, and
                            screen size to deliver apps that feel native on both iOS and Android.
                        </p>
                    </div>
                    <div className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/ux-audit1.svg' : '/assets/ui-ux/ux-audit.svg'}
                                alt='UX Audit'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            UX Audit
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Transform user experience into business results with a data-driven UX audit. Our expert
                            evaluation uncovers usability gaps, highlights opportunities, and delivers clear, actionable
                            insights—helping you boost engagement, retention, and ROI across your digital product.
                        </p>
                    </div>
                    <div className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/ui-ux/design-systems1.svg' : '/assets/ui-ux/design-systems.svg'}
                                alt='Design Systems'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Design Systems
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Build with consistency, scale with confidence. A well-crafted design system unifies your
                            digital products through shared UI standards—enhancing quality, speeding up delivery, and
                            creating seamless experiences across your entire brand ecosystem.
                        </p>
                    </div>
                </div>
            </div>

            {/* hotel Images */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[7em] md:pb-[7em] pb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative max-w-full w-full mx-auto h-auto  mt-[2em] lg:mt-[5em] mb-4'}>
                        <Image
                            src={'/assets/ui-ux/hotel.jpg'}
                            alt={'hotel'}
                            width={1920} // Original width of the image
                            height={1080} // Original height of the image
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div
                        className={'relative grid max-w-full w-full lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 h-auto '}>
                        <div>
                            <Image
                                src={'/assets/ui-ux/hotel1.jpg'}
                                alt={'hotel1'}
                                width={600}
                                height={450}
                                className={'max-w-full w-full h-auto mx-auto'}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/ui-ux/hotel2.png'}
                                alt={'hotel2'}
                                width={600}
                                height={450}
                                className={'max-w-full w-full h-auto mx-auto'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Design Solutions */}
            <div
                className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                <h2 className={'border-b pb-[0.8em] border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    UX Design Solutions</h2>
                <div
                    className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                    <div className='lg:sticky top-8 lg:h-screen overflow-hidden'>
                        <h3 className={`text-[1.5em] font-[500] constant-text ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                            Our Solutions
                        </h3>
                        <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                            isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                        }`}>
                            {[
                                {id: "01", title: "User Experience (UX) Design", target: "ux"},
                                {id: "02", title: "User Interface (UI) Design", target: "ui"},
                                {id: "03", title: "Visual Design", target: "visual"},
                                {id: "04", title: "Accessibility Design", target: "access"},
                                {id: "05", title: "Prototyping", target: "proto"},
                                {id: "06", title: "Interaction Design", target: "inter"},
                                {id: "07", title: "Information Architecture", target: "info"},
                                {id: "08", title: "Usability Testing", target: "use"},
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
                    <div className={'lg:-ml-[8em] md:-ml-[8em]  lg:mb-[14em] md:mb-[14em]'}>
                        <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                            </div>
                            <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'ux'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>User Experience (UX) Design</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Imagine a digital product that not only looks great but feels intuitive, solves real
                                    problems, and aligns perfectly with your users’ goals. Great user experience is no
                                    longer a nice-to-have—it&#39;s a competitive advantage that drives engagement,
                                    satisfaction, and long-term growth. We take a strategic approach to UX design,
                                    starting with a deep understanding of your audience. Through user research, journey
                                    mapping, and behavioral insights, we uncover pain points and opportunities to create
                                    experiences that convert and retain customers.<br/><br/>
                                    Our human-centered design methodology ensures every decision we make is grounded in
                                    real user needs and business objectives. We translate insights into wireframes,
                                    prototypes, and interaction models that streamline workflows, reduce friction, and
                                    support accessibility. Whether you&#39;re launching a new product or refining an
                                    existing one, we help you build experiences that are usable, scalable, and
                                    future-ready—delivering meaningful ROI and setting your brand apart in the digital
                                    landscape.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'ui'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>User Interface (UI) Design</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    First impressions are everything—especially in the digital world. A beautifully
                                    crafted user interface not only sets the tone for your product but also reflects
                                    your brand’s professionalism and attention to detail. UI design is more than just
                                    visuals; it’s about crafting every button, menu, and interactive element to feel
                                    intuitive, seamless, and engaging. When done right, UI becomes a silent ambassador
                                    for your brand—inviting users to explore, interact, and return.<br/><br/>An
                                    exceptional UI design strikes the perfect balance between aesthetics and
                                    functionality.It guides users effortlessly through your product, reduces friction,
                                    and builds trust with every interaction. Great UI is about more than polish—it’s
                                    about clarity, accessibility, and the confidence it gives users as they engage with
                                    your platform. By prioritizing ease of use and consistency, we help you design
                                    interfaces that not only look stunning but also drive conversions and long-term
                                    loyalty.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'visual'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Visual Design</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>High-Fidelity Visual Design</span>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI Kits</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Visual Storytelling</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Branding</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Graphic Design</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Visual design is more than decoration—it&#39;s a strategic tool for brand
                                    communication
                                    and user engagement. A compelling visual identity brings your brand to life,
                                    reflecting your values, voice, and vision across every touchpoint. Through
                                    high-fidelity designs, carefully curated UI kits, and polished interfaces, we help
                                    brands create digital products that are not only beautiful but also functional,
                                    engaging, and conversion-driven.<br/><br/>
                                    Consistency in visual language plays a critical role in shaping user perception and
                                    trust. That’s why we focus on building cohesive design systems that ensure every
                                    element—from typography and color to buttons and interactions—aligns with your brand
                                    and business goals. This strategic alignment leads to better user experiences,
                                    stronger brand recognition, and measurable impact.<br/><br/>
                                    From startups to enterprise teams, we’ve helped businesses craft visually stunning
                                    products that perform—combining storytelling, structure, and style to create lasting
                                    impressions. Whether you’re launching a new brand or scaling an existing platform,
                                    our visual design solutions give you the edge to stand out in a crowded digital
                                    landscape.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'access'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Accessibility Design</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Accessibility design is the foundation of everything we do. We are committed to
                                    creating digital experiences that are inclusive, intuitive, and usable for everyone,
                                    regardless of their abilities. Our design process ensures that your products are not
                                    only functional but also welcoming, breaking down barriers for users with diverse
                                    needs. We prioritize clear and easy navigation, optimized contrast ratios, and color
                                    schemes that adhere to WCAG guidelines, enabling all users to interact with your
                                    brand seamlessly.<br/><br/>
                                    Our focus goes beyond just visual design. We ensure that your digital interfaces are
                                    fully compatible with screen readers and optimized for keyboard navigation, making
                                    it simple for users with different abilities to access and engage with your content.
                                    Additionally, our responsive design approach guarantees that your website or
                                    application provides a consistent and accessible experience across all devices, from
                                    desktops to mobile phones. With our commitment to accessibility, we help you create
                                    products that stand out and truly serve every user, regardless of their individual
                                    needs.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'proto'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Prototyping</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Interactive prototyping brings your product vision to life, enabling you to test,
                                    refine, and validate your design decisions before development begins. Clickable
                                    prototypes provide valuable insights, allowing you to identify areas for improvement
                                    and ensure the final product aligns with user expectations.<br/><br/>
                                    By integrating prototyping into the design process, you can significantly reduce
                                    development costs and accelerate time-to-market. This iterative approach ensures
                                    your product not only meets user needs but also delivers exceptional experiences.
                                    With a prototype that aligns with your business goals, you’ll create a product that
                                    drives user engagement, increases conversions, and exceeds expectations.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'inter'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Interaction Design</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Thoughtfully crafted interactions and animations transform your product into a
                                    dynamic, habit-forming experience that captivates users and drives engagement. By
                                    incorporating playful, intuitive, and innovative motion design, you create moments
                                    of delight that make your product not only functional but memorable.<br/><br/>
                                    These micro-interactions do more than entertain—they guide users, reinforce actions,
                                    and build emotional connections with your brand. A well-designed interactive
                                    experience leaves a lasting impression, strengthens brand identity, and encourages
                                    users to return, ultimately boosting satisfaction, loyalty, and conversions.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'info'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Information Architecture</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    A well-structured information architecture is key to creating digital experiences
                                    that are intuitive, efficient, and engaging. By organizing content through clear
                                    sitemaps and thoughtful architecture diagrams, users can effortlessly find what they
                                    need—reducing friction, increasing satisfaction, and driving conversions.<br/><br/>
                                    With a user-centered design approach, information architecture becomes a strategic
                                    tool that bridges business objectives and user needs. It ensures your product is not
                                    only easy to navigate but also aligned with how users think and behave, resulting in
                                    a more usable, enjoyable, and goal-oriented experience.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'use'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Usability</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    UX goes beyond aesthetics—it&#39;s a practical, user-driven discipline focused on
                                    creating meaningful and effective experiences. Usability testing plays a crucial
                                    role by observing real users as they interact with your product, revealing pain
                                    points, uncovering design flaws, and highlighting opportunities for
                                    improvement.<br/><br/>
                                    These insights allow us to refine interfaces, streamline user journeys, and enhance
                                    overall performance. By continuously testing and iterating, we ensure your digital
                                    product not only looks great but functions seamlessly—delivering a satisfying
                                    experience that drives engagement, loyalty, and measurable results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ipad Images */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:-mt-[20em] lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative max-w-full w-full mx-auto h-auto mb-4'}>
                        <Image
                            src={'/assets/ui-ux/mob.jpg'}
                            alt={'ipad'}
                            width={1920} // Original width of the image
                            height={1080} // Original height of the image
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 h-auto '}>
                        <div>
                            <Image
                                src={'/assets/ui-ux/mob1.jpg'}
                                alt={'ipad1'}
                                width={600}
                                height={450}
                                className={'max-w-full w-full h-auto mx-auto'}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/ui-ux/mob2.png'}
                                alt={'ipad2'}
                                width={600}
                                height={450}
                                className={'max-w-full w-full h-auto mx-auto'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Designers Collaborate */}
            <div
                className={`relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                    <div className={`${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] font-[500] tracking-tight leading-[1.1] pb-6 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                            How our UX and UI designers collaborate
                        </h2>
                        <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                            We bring a fast, flexible, and collaborative approach to every project—making the process as
                            enjoyable as it is effective. Crafting exceptional digital products is a team effort, and
                            our dedication doesn’t stop at the design handoff. We&#39;re invested from concept to launch
                            to ensure every detail is executed flawlessly.<br/><br/>
                            Our design team works closely with front-end developers and QA specialists to maintain
                            design integrity, streamline implementation, and uphold the highest standards of quality.
                            This end-to-end collaboration ensures the final product not only looks great but performs
                            seamlessly—delivering real value to your business and a standout experience to your users.
                        </p><br/><br/>
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
                        className={'relative w-full max-w-full h-auto mb-4'}>
                        <Image
                            src={'/assets/ui-ux/designers.png'}
                            alt={'UI/UX Designers'}
                            width={450}
                            height={500}
                            className={'w-full max-w-full lg:pr-24'} // Removed h-full to prevent forced stretching
                        />
                    </div>
                </div>
            </div>

            {/* Tools */}
            <div
                className={`relative lg:-mt-20 py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Tools Header */}
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}
                    id={'tools'}>
                    <div>
                        <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] xl:text-[4em] font-[600] tracking-tighter leading-[1.15] lg:pb-6'>
                            Our go-to <br className={'lg:block md:block hidden'}/>UX/UI tools
                        </h2>
                    </div>
                    <div className='lg:-ml-[7em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            Our team leverages industry-standard tools to craft exceptional UI/UX designs that deliver
                            engaging, intuitive, and user-focused digital experiences. By combining best-in-class
                            technology with deep design expertise, we create interfaces that not only look great but
                            also drive interaction, satisfaction, and long-term user loyalty.
                        </p>
                    </div>
                </div>

                {/* Tools */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/axure1.svg' : '/assets/ui-ux/axure.svg'}
                                alt={'Axure'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Axure</h6>
                            <p className={'text-[0.873em] text-justify'}>Axure RP empowers us to build advanced,
                                interactive prototypes that closely replicate the
                                functionality and user experience of the final product. This allows for realistic
                                testing, faster validation of ideas, and more informed design decisions—ensuring a
                                smoother path from concept to launch.</p>
                        </div>
                    </div>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 pb-6'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/figma1.svg' : '/assets/ui-ux/figma.svg'}
                                alt={'Figma'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Figma</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                Figma is our go-to platform for collaborative design, enabling real-time teamwork
                                between our UI/UX experts and clients. Its cloud-based environment ensures seamless
                                communication, faster feedback loops, and a more efficient design process—from initial
                                concept to final delivery.
                            </p>
                        </div>
                    </div>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 pb-6'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/aftereffect1.svg' : '/assets/ui-ux/aftereffect.svg'}
                                alt={'After Effects'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>After Effect</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                Adobe After Effects is our preferred tool for crafting high-impact animations that bring
                                designs to life. It allows us to tell compelling stories, communicate complex ideas with
                                clarity, and elevate the overall user experience through motion that’s both purposeful
                                and visually engaging.
                            </p>
                        </div>
                    </div>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 pb-6'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/lottie1.svg' : '/assets/ui-ux/lottie.svg'}
                                alt={'Lottie'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Lottie</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                Lottie is a game-changer for seamlessly integrating high-quality animations into apps
                                and websites without sacrificing performance. It enables us to deliver rich, lightweight
                                motion graphics that enhance user engagement while keeping load times fast and
                                experiences smooth across all platforms.
                            </p>
                        </div>
                    </div>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 pb-6'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/sketch1.svg' : '/assets/ui-ux/sketch.svg'}
                                alt={'Sketch'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600]'}>Sketch</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                Sketch still holds a valued place in our design toolkit. Its powerful vector editing
                                capabilities make it perfect for creating detailed illustrations, icons, and polished
                                graphic assets—ensuring every visual element is sharp, scalable, and on-brand.
                            </p>
                        </div>
                    </div>
                    <div
                        className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 pb-6'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/ui-ux/miro1.svg' : '/assets/ui-ux/miro.svg'}
                                alt={'Miro'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600]'}>Miro</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                Miro is our go-to virtual whiteboard for collaborative brainstorming and ideation. We
                                use it to power workshops, discovery sessions, and design sprints—creating a shared
                                space where ideas flow freely, teams stay aligned, and strategic thinking drives smart,
                                user-centered solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* UI/UX Planning */}
            <Image
                src={'/assets/ui-ux/planning.jpeg'}
                alt={'UI/UX Planning'}
                width={1920}
                height={1080}
                className={`relative max-w-full mx-auto w-full h-auto`}
            />

            {/* Business Benefits */}
            <div
                className={`relative lg:mt-14 md:mt-14 sm:mt-12 mt-8 py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 border-b-[0.1em] border-gray-300/50 pb-20 lg:gap-14 gap-6 mb-20 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}
                    id={'benefits'}>
                    <div>
                        <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] xl:text-[4em] font-[600] tracking-tighter leading-[1.15] lg:pb-6'>
                            UX/UI business benefits
                        </h2>
                    </div>
                    <div className=''>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            A bespoke web application offers all the advantages of traditional software—plus greater
                            flexibility, accessibility, and cost efficiency. Built specifically around your business
                            needs, custom web apps scale effortlessly as you grow, delivering long-term value without
                            the overhead of off-the-shelf solutions.<br/><br/>
                            We’ve delivered innovative, high-performing web applications across industries like finance,
                            technology, construction, and recruitment. When you partner with us, you get more than just
                            a development team—you gain a strategic partner committed to fast, stress-free software
                            delivery and a product that drives real results.
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/access1.svg' : '/assets/ui-ux/access.svg'}
                            alt={'Better Accessibility'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Better Accessibility
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>Inclusive design expands your audience
                            by
                            making digital products accessible, intuitive, and
                            usable for everyone—regardless of ability. It not only meets accessibility standards but
                            also enhances user experience, strengthens brand reputation, and drives greater engagement
                            across a diverse user base.</p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/development1.svg' : '/assets/ui-ux/development.svg'}
                            alt={'Cost-Efficient Development'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Cost-Efficient Development
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Prioritizing UX early in the process helps identify and resolve usability issues before
                            development begins—reducing costly redesigns, saving time, and ensuring a smoother, more
                            efficient path to launch. It’s a smart investment that leads to better products and a higher
                            return on effort.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/customer1.svg' : '/assets/ui-ux/customer.svg'}
                            alt={'Improved customer retention'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Improved Customer Retention
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            A seamless and enjoyable user experience keeps users coming back, fostering trust and
                            long-term customer loyalty. By making every interaction intuitive and satisfying, you turn
                            first-time users into repeat customers and brand advocates.
                        </p>
                    </div>
                </div>

                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em] lg:mt-[6em] md:mt-[4emt] sm:mt-[3em] mt-[1.5em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/brand1.svg' : '/assets/ui-ux/brand.svg'}
                            alt={'Stronger Brand Perception'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Stronger Brand Perception
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            A consistent and visually appealing UI/UX builds trust and credibility, reinforcing your
                            brand’s identity and leaving a lasting impression. This strong, cohesive experience not only
                            enhances user satisfaction but also cultivates loyalty and strengthens your brand’s
                            reputation over time.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/cons1.svg' : '/assets/ui-ux/cons.svg'}
                            alt={'Product Consistency'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Product Consistency
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Design systems drive consistency, efficiency, and scalability by offering a library of
                            reusable components and clear guidelines. They ensure cohesive user experiences across all
                            touchpoints while streamlining collaboration and accelerating development across teams and
                            projects.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/ui-ux/access1.svg' : '/assets/ui-ux/access.svg'}
                            alt={'Higher Conversion Rates'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Higher Conversion Rates
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Intuitive design, strategic calls to action, and a user-friendly interface work together to
                            eliminate friction and guide users effortlessly toward key actions—ultimately increasing
                            engagement and driving higher conversion rates.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div
                className={`relative lg:mt-10 md:mt-10 sm:mt-8 mt-6 py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1] lg:pr-[10em] mb-[0.6em]'}>
                    Your trusted digital partner
                </h1>
                <p className={'text-[0.873em] font-[300] leading-[1.2] text-justify lg:pr-[33em] mb-10'}>
                    We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                    applications that drive real results. From funded startups to established businesses, we&#39;ve
                    helped a wide range of clients bring their digital products to life—delivering standout experiences
                    that fuel growth, engagement, and long-term success.
                </p>
                <Link href='/contact'>
                    <button
                        className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[3%]`}></span>
                        <span
                            className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                        <span
                            className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                        <span
                            className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                    </button>
                </Link>

                {/* Countup */}
                <div
                    className={`grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}
                    id={'countup'}
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center "
                        >
                            <h2 className="lg:text-[3.2em] md:text-[3em] sm:text-[2em] text-[1.5em] text-start font-[600]">
                                <CountUp end={stat.value} duration={2} suffix={stat.suffix || ''}/>
                            </h2>
                            <p className="text-[0.873em] font-[400] mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div
                className={`relative lg:mt-14 md:mt-14 sm:mt-12 mt-8 py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
                    isDayTime ? 'bg-black' : 'bg-white'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-white' : 'text-black'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                    </div>
                    <div className={'lg:ml-[-20em] md:ml-[-20em] sm:ml-[-10em]'}>
                        <div
                            className="flex items-start gap-4 text-[1.5em] font-[500] mb-6">
                            <Quote className="w-6 h-6 shrink-0"/>
                            <p className="leading-tight border-b-[0.1em] border-gray-300/20 pb-12">
                                {message}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image
                                src={image}
                                alt={name}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />
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

            {/* Stages of Our UX/UI Process */}
            <div id={'process'}
                 className={`relative lg:py-[3em] py-[1em] lg:my-[6em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                     isDayTime ? 'text-black' : ' text-white'}`}>
                <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    Stages of Our <br className={'lg:block md:block hidden'}/>UX/UI Process
                </h2>

                <div id={'stages'}
                     className={'grid lg:grid-cols-2 grid-cols-1 gap-10 lg:mt-24 mt-6 max-w-full mx-auto w-full h-full lg:mb-0 mb-6'}>

                    {/* Left Section */}
                    <div className={'lg:mr-28 '}>

                        {/* Moodboards & ideation */}
                        <div className={`lg:mb-[15em] mb-14`} id={'ideation'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Moodboards & Ideation</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                We create moodboards to establish the visual direction of your product, laying the
                                groundwork for typography, iconography, and graphic design. This early-stage exploration
                                allows us to experiment with a wide range of styles, themes, and competitive
                                benchmarks—ensuring we align on a cohesive, compelling aesthetic before moving into
                                detailed design.
                            </p>
                        </div>

                        {/* Discovery and research */}
                        <div className={`lg:mb-[15em] mb-14`} id={'research'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Discovery & Research</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                Our process begins with in-depth research to understand your audience’s needs,
                                behaviors, and how they align with your business goals. Through user interviews, market
                                analysis, and competitor benchmarking, our designers and strategists uncover valuable
                                insights that inform every stage of the UX/UI process. This strategic foundation ensures
                                we create intuitive, engaging digital experiences that not only meet user expectations
                                but also drive measurable business outcomes such as higher engagement, retention, and
                                conversion rates.
                            </p>
                        </div>

                        {/* Design System & Guidelines */}
                        <div className={`lg:mb-[15em] mb-14`} id={'guidelines'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Design System & Guidelines</h2>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                Consistency at scale is key to building a cohesive and efficient product. As the design
                                process evolves, we develop comprehensive style guides and design systems—a toolkit of
                                reusable components like buttons, forms, and navigation patterns. This structured
                                approach ensures visual and functional consistency across your product, streamlines
                                collaboration between design and development, and simplifies future updates. By building
                                with scalability in mind, your product can grow and evolve while maintaining a unified,
                                polished user experience.
                            </p>
                        </div>

                        {/* Visual Design */}
                        <div className={`lg:mb-[15em] mb-14`} id={'vd'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Visual Design</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                Our initial design phase focuses on structure and functionality, using wireframes and
                                interactive prototypes to map out core user interactions. At this stage, we prioritize
                                intuitive navigation, clear page hierarchy, well-structured forms, and strategic calls
                                to action—ensuring a seamless and engaging user experience from the start. As we move
                                through the design process, we layer in your brand identity, visual elements, and
                                thematic styling to create a product that’s not only highly usable but also visually
                                aligned with your brand.
                            </p>
                        </div>

                        {/* User Testing & Feedback */}
                        <div className={`lg:mb-[15em] mb-14`} id={'testing'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>User Testing & Feedback</h2>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                Usability testing puts your product in the hands of real users to uncover design flaws,
                                friction points, and opportunities for improvement. By observing how users navigate
                                tasks, we gain invaluable insights that help us enhance overall user satisfaction,
                                refine the interface, and boost the product’s performance. This process ensures your
                                digital experience is not only functional but truly user-friendly and effective.
                            </p>
                        </div>

                        {/* Feedback Rounds */}
                        <div className={`lg:mb-[22em] mb-14`} id={'rounds'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Feedback Rounds</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                We work collaboratively through regular check-ins, reviewing progress with your team and
                                gathering valuable feedback at every stage. This iterative process ensures every aspect
                                of the design is working effectively and aligns with your goals. Throughout, we offer
                                guidance and strategic input to keep the project on track. Using real-world data and
                                analytics, we continuously review and refine the design—optimising performance and
                                ensuring the final product delivers maximum impact.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div
                        className='lg:sticky md:sticky lg:top-[5em] md:top-[5em] justify-center items-center w-full max-w-full h-screen lg:h-screen md:h-screen overflow-hidden'>
                        <div>
                            {imageIds.map((imageId: string) => (
                                activeId === imageId && (
                                    <div
                                        key={imageId}
                                        className="relative shadow-lg transition-opacity duration-500 ease-in-out opacity-100"
                                        id={imageId}
                                    >
                                        <Image
                                            src={`/assets/ui-ux/stages/${imageId}.jpg`}
                                            alt={imageId}
                                            className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                            width={1030}
                                            height={768}
                                        />
                                    </div>
                                )
                            ))}
                        </div>

                        {/* sticky menu */}
                        {isVisible && (
                            <div
                                className={`lg:fixed justify-center md:fixed bottom-0 left-0 w-full ${
                                    isDayTime ? 'bg-black text-gray-600' : 'bg-white text-gray-300'} py-5 z-50`}>
                                <div
                                    className={`grid lg:grid-cols-6 md:grid-cols-6 lg:max-w-full w-full h-auto lg:px-[4.6em] mx-auto justify-center gap-0 ${
                                        isDayTime ? 'border-white' : 'border-black'}`}>
                                    {imageIds.map((id) => (
                                        <button
                                            key={id}
                                            onClick={() => {
                                                const element = document.getElementById(id);
                                                if (element) {
                                                    element.scrollIntoView({behavior: 'smooth'});
                                                }
                                            }}
                                            className={`mt-4 ${
                                                activeId === id
                                                    ? isDayTime
                                                        ? 'text-white hover:text-gray-300 focus:text-gray-300'
                                                        : 'text-black hover:text-gray-700 focus:text-gray-700'
                                                    : isDayTime
                                                        ? 'text-gray-600 hover:text-white focus:text-white'
                                                        : 'text-gray-500 hover:text-black focus:text-black'
                                            }`}
                                        >
                                            {id.replace('-', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative lg:-mt-[12em] max-w-full lg:my-12 lg:mb-36 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage : partner.nightImage}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                                style={{
                                    height: 'auto',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default UiUxDesign;