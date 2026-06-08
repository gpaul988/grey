'use client';

import React, {useEffect, useRef, useState, useMemo} from 'react';
import '../app/globals.css'
import {LiaLongArrowAltDownSolid} from "react-icons/lia";
import FloatingButton from "@/components/FloatingButton";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {motion} from "framer-motion";
import CountUp from "react-countup";
import {FaStar, FaGoogle, FaLinkedin} from "react-icons/fa6";
import {FaFileAlt} from "react-icons/fa";
import AIProjectEstimator from '@/components/AIProjectEstimator';


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

const Home = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");

    // FAQ section hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }

    // Partners Section hook
    const partners = [
        {id: 1, name: 'Partner 1', dayImage: 'poawd.svg', nightImage: 'poawd.svg'},
        {id: 2, name: 'Partner 2', dayImage: 'hub1.svg', nightImage: 'hub.svg'},
        {id: 3, name: 'Partner 3', dayImage: 'car1.svg', nightImage: 'car.svg'},
        {id: 4, name: 'Partner 4', dayImage: 'pet1.svg', nightImage: 'pet.svg'},
        {id: 5, name: 'Partner 5', dayImage: 'sew1.svg', nightImage: 'sew.svg'},
        {id: 6, name: 'Partner 6', dayImage: 'tim1.svg', nightImage: 'tim.svg'},
        {id: 7, name: 'Partner 7', dayImage: 'pat1.svg', nightImage: 'pat.svg'},
        {id: 8, name: 'Partner 8', dayImage: 'kow1.svg', nightImage: 'kow.svg'},
        {id: 9, name: 'Partner 9', dayImage: 'afro1.svg', nightImage: 'afro.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane1.svg', nightImage: 'cane.svg'},
    ];

    // Our services section hook
    const imageIds = useMemo<string[]>(() => [
        "web-design",
        "web-app",
        "mobile-app",
        "digital-market",
        "ui-ux",
        "branding",
        "discovery"
    ], []);

    // Floating button visibility hook
    useEffect(() => {
        const handleScroll = () => {
            for (const imageId of imageIds) {
                const image = document.getElementById(imageId);
                if (image) {
                    const rect = image.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                        setActiveId(imageId);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [imageIds]);

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

    // Sticky menu hook
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const serviceSection = document.getElementById('service');
            const adventureSection = document.getElementById('Adventure-section');

            if (serviceSection && adventureSection) {
                const serviceRect = serviceSection.getBoundingClientRect();
                const adventureRect = adventureSection.getBoundingClientRect();

                // Make sticky menu visible only within the "services-section"
                setIsVisible(
                    serviceRect.top <= window.innerHeight &&
                    serviceRect.bottom >= 0 &&
                    adventureRect.top >= window.innerHeight
                );
            } else {
                console.warn('Sections not found in DOM');
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    // Scroll to content function
    const scrollToContent = () => {
        const contentSection = document.getElementById('services-section');
        if (contentSection) {
            contentSection.scrollIntoView({behavior: 'smooth'});
        }
    };

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, image, message} = testimonials[current];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
            <FloatingButton
                className={`fixed bottom-6 right-6 z-9999 transition-all duration-300 ${isVisible ? 'mb-16' : 'mb-0'}`}
            />

            {/* Hero Section */}
            <div id="hero"
                 className="relative overflow-hidden  lg:w-full lg:h-[720px] md:w-full md:h-[700px] w-full h-[700px] pb-6">
                <video
                    src="/assets/hero/hero.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center bg-black/cover"
                />
                <div
                    className={`absolute inset-0 z-10 flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white ' : 'text-white'
                    }`}
                >
                    <br/><br/>
                    <h1 className={`${isDayTime ? 'text-black' : 'text-white'} lg:text-[87px] text-[45px] lg:leading-[1.1] md:leading-[1.1] leading-[1.2] font-[600] lg:mb-6`}>
                        <br/>
                        <span className={`${isDayTime ? 'text-teal-800' : 'text-teal-200'}`}>Engineering</span><br/>Scalable
                        Digital<br/> <span
                        className={`${isDayTime ? 'text-teal-800' : 'text-teal-200'}`}>Platforms for<br/>Modern Businesses</span>
                    </h1><br/><br/>
                    <h3 className={`${isDayTime ? 'text-teal-500' : 'text-white'} contents lg:text-[17.4px] leading-[1.18] font-[400]`}>
                        Grey InfoTech Limited builds secure, scalable web applications, SaaS platforms, and enterprise
                        software solutions for startups and growing businesses across Africa and globally.
                    </h3>
                </div>
                <div className='absolute top-[88%] items-center left-[40em] w-full h-full flex flex-col'>
                    <LiaLongArrowAltDownSolid
                        className={`${isDayTime ? 'text-black' : 'text-white'} text-5xl text-center transition-transform duration-500 ease-in-out hover:scale-125 cursor-pointer`}
                        onClick={scrollToContent}
                    />
                </div>
            </div>

            {/* Introductory section */}
            <section
                ref={sectionRef}
                data-bg={
                    isBackgroundActive
                        ? (isDayTime ? "Dark" : "Light")
                        : (isDayTime ? "Light" : "Dark")
                }
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        : isDayTime
                            ? "bg-white text-black"
                            : "bg-black text-white"
                }`}
            >
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text lg:text-[0.8em] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            YOUR DIGITAL PARTNER
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6'>
                            We Develop Digital <br/>Products Powered by Strategy & Data</h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p> We create and build web apps, digital platforms, and websites that help
                                    businesses flourish. We provide unique, scalable solutions that are suited to
                                    your specific needs, with an emphasis on creativity, data-driven
                                    decision-making, and demonstrable outcomes.</p>
                            </div>
                            <div>
                                <p> Our team makes sure your technology works as hard as you do, whether you&#39;re
                                    optimizing your infrastructure, launching an <Link href='/services/MVP'
                                                                                       className={`border-b-[0.1em] ${isDayTime ? 'border-gray-800' : 'border-gray-300'}`}> MVP</Link>,
                                    or growing your online
                                    presence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Our Services */}
            <div
                id={'services-section'}
                className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}
                data-bg={isDayTime ? 'Light' : 'Dark'}
            >
                <div
                    className={`border-b-[0.1em] max-w-auto mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] pt-24 pb-6 ${
                        isDayTime ? 'border-gray-200' : 'border-gray-700'
                    }`}
                >
                    <h3 className={'lg:text-[3.2em] md:text-[3em] text-[2em] font-[700]'}>Our services</h3>
                </div>

                <div id={'service'}
                     className={'grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-10 lg:mt-36 mt-6 px-6 lg:px-[4.6em] max-w-auto mx-auto w-full h-full lg:pb-[5em] pb-6'}>

                    {/* Left Section */}
                    <div className={'lg:mr-28 lg:mt-[10em]'}>

                        {/* Web Design & Development Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'web-design'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Web design & development</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Web development</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Web design</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI & UX design</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>Effective <Link
                                href='/services/Web-Design'
                                className={`border-b-[0.1em] ${isDayTime ? 'border-gray-300 hover:border-gray-600' : 'border-gray-700 hover:border-gray-300'}`}>web
                                design</Link> and development goes beyond just looking good—it’s about achieving
                                tangible
                                outcomes. Our approach centers on the user and is driven by results, ensuring every site
                                we
                                build is visually compelling, strategically crafted, and optimized to captivate your
                                audience and boost revenue. By blending design excellence, smart strategy, and proven
                                marketing techniques, we create websites that turn visitors into devoted customers.</p>
                            <Link href='/services/Web-Design'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-4 left-[6.5em] w-[5em] h-[15em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Web design agency
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* Web Application Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'web-app'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Web applications</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <span
                                className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>React.js</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Node.js</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Javascript</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>PHP</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>In
                                the modern
                                business landscape, <Link href='/services/Web-Application'
                                                          className={`border-b-[0.1em] ${isDayTime ? 'border-gray-300 hover:border-gray-600' : 'border-gray-700 hover:border-gray-300'}`}>web
                                    applications</Link> play a critical role in driving innovation and efficiency. From
                                launching bold new digital products to transforming outdated systems and optimizing
                                internal
                                workflows, we build tailored web apps that solve real challenges. With a focus on
                                performance, scalability, and user experience, our solutions empower your team and
                                support
                                long-term growth.</p>
                            <Link href='/services/Web-Application'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-2 left-[3em] w-[5em] h-[17em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:translate-x-3`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Web app development
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* Mobile Application Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'mobile-app'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Mobile applications</h2>
                            <div
                                className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <span
                                className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>iOS apps</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Android apps</span>
                                <span
                                    className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Hybrid apps</span>
                            </div>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>We
                                build modern,
                                intuitive
                                mobile apps for both <Link href='/services/ios-development'
                                                           className={`border-b-[0.1em] ${isDayTime ? 'border-gray-300 hover:border-gray-600' : 'border-gray-700 hover:border-gray-300'}`}>iOS</Link> and
                                Android devices—including phones and tablets. Whether you need a native, cross-platform,
                                or
                                hybrid solution, we have the expertise to deliver engaging, high-quality applications.
                                From
                                initial concept to app store launch, we’ll support you every step of the way to ensure a
                                first-class result.</p>
                            <Link href='/services/Mobile-Application-Development'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-4 left-[6.5em] w-[5em] h-[15em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Mobile apps
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* Digital Marketing Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'digital-market'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Digital Marketing and Strategy</h2>
                            <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>In
                                a competitive digital world, your online presence is your first impression. Whether
                                you&#39;re in retail, healthcare, tech, or professional services, we ensure your brand
                                is
                                visible, engaging, and driving results. Through strategic SEO, targeted PPC campaigns,
                                and data-driven optimization, we position you where your customers are — and turn
                                visibility into growth.</p>
                            <Link href='/services/digital-marketing'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-4 left-[6.5em] w-[5em] h-[15em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Digital marketing services
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* UX/UI & Product design Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'ui-ux'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>UX/UI & Product design</h2>
                            <p className={'text-justify leading-[1.5] lg:mb-[3em] mb-[1.5em] text-[0.81em] font-[300]'}>
                                Our UX/UI design strategy is rooted in more than just visual appeal—we blend
                                human-centered design, creative expertise, and business insight to ensure every element
                                of your product drives meaningful results. From early wireframes and prototypes to
                                polished final interfaces, we create intuitive, impactful experiences that support your
                                goals and delight your users.</p>
                            <Link href='/services/ui-ux-design'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-2 left-[4.8em] w-[5em] h-[17em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-4`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    UX & UI design services
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* Digital Branding Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'branding'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Digital Branding and Brand Management</h2>
                            <p className={'text-justify leading-[1.5] lg:mb-[3em] mb-[1.5em] text-[0.81em] font-[300]'}>
                                Customer retention isn’t just about great products or services — it’s about creating a
                                brand experience that connects and endures. In a crowded market, businesses need more
                                than just a logo; they need a distinct identity that speaks to their audience at every
                                touchpoint. Our Brand Management team helps companies across all sectors build strong,
                                consistent identities that inspire trust and foster loyalty. From visual elements like
                                logos, color palettes, and typography to brand voice, messaging, and positioning, we
                                deliver tailored solutions that make your brand instantly recognizable and impossible to
                                ignore. Stay relevant, build emotional connections, and grow through brand loyalty.</p>
                            <Link href='/services/branding'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-2 left-[4.8em] w-[5em] h-[17em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-4`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Branding services
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                        {/* Discovery & Strategy Section */}
                        <div className={`lg:mb-[15em] mb-14`} id={'discovery'}>
                            <h2 className={`text-[1.5em] font-[500] mb-3`}>Discovery & Strategy</h2>
                            <p className={'text-justify leading-[1.5] lg:mb-[3em] mb-[1.5em] text-[0.81em] font-[300]'}>
                                Jumpstart your product journey with a tailored discovery process designed to align
                                strategy with vision. Whether you&#39;re starting with a blank slate or evolving an
                                existing idea, our team works closely with you to uncover key insights, define clear
                                goals, and shape a roadmap that drives your business forward. We turn early-stage
                                thinking into a confident, actionable plan for success.</p>
                            <Link href='/services/discovery-phase'
                                  className='flex items-start justify-self-start text-center'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start group w-fit text-[0.85em] overflow-hidden border tracking-tighter rounded-full py-2 px-6'>
                                    <span
                                        className={`w-32 h-32 rotate-45 translate-x-[6em] -translate-y-[2.8em] absolute left-0 top-0 ${
                                            isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                                    <span
                                        className={`absolute top-4 left-[6.5em] w-[5em] h-[15em] -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${
                                            isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left text-black ${
                                            isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>
                                    Discovery phase
                                    <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span className="absolute inset-0 rounded-full "></span>
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* Right Section */}
                    <div
                        className='lg:sticky lg:top-[6em] justify-center items-center lg:h-screen overflow-hidden lg:block md:block hidden'>
                        <div>
                            {imageIds.map((imageId: string) => (
                                activeId === imageId && (
                                    <div
                                        key={imageId}
                                        className="relative shadow-lg transition-opacity duration-500 ease-in-out opacity-100"
                                        id={imageId}
                                    >
                                        <Image
                                            src={`/assets/home/${imageId}.jpg`}
                                            alt={imageId}
                                            className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                            width={1024}
                                            height={768}
                                        />
                                    </div>
                                )
                            ))}
                        </div>

                        {/* sticky menu */}
                        {isVisible && (
                            <div
                                className={`lg:fixed justify-center md:fixed bottom-0 left-0 w-full lg:block md:block sm:hidden ${
                                    isDayTime ? 'bg-black text-gray-600' : 'bg-white text-gray-300'} py-5 z-50`}>
                                <div
                                    className={`grid lg:grid-cols-7 md:grid-cols-5 lg:max-w-[90em] lg:px-[4.6em] mx-auto justify-center gap-0 ${
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

            {/* Digital Adventure Section */}
            <div
                className={`lg:pt-[8em] md:pt-[4em] pt-[3em] lg:pb-[2em] lg:-mt-[9em] md:-mt-[8em] -mt-[2em] mb-[1em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}
                data-bg={isDayTime ? 'light' : 'dark'}>
                <div
                    id={'Adventure-section'}
                    className={`max-w-[90em] mx-auto px-4 sm:px-6 lg:px-[4.6em]`}>
                    <div
                        className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-32 mb-16'>
                        <div className='relative sm:mb-8'>
                            <Image
                                src="/assets/startup/startup.jpg"
                                alt="startup development services"
                                width={410}
                                height={40}
                                style={{
                                    height: 'auto',
                                }}
                            />
                        </div>
                        <div className={`lg:-ml-[6.4em] lg:mr-[5.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2 className='lg:text-[3em] text-[1.5em] font-[700] capitalize tracking-tight pb-6 rounded-none lg:pr-[2.2em] lg:mt-7'>Your
                                digital adventure</h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.2em] border-b rounded-none pb-9 leading-[1.5] lg:pr-[3em]'>
                                Our specialty in the fast-paced IT industry is assisting business owners and
                                entrepreneurs
                                in
                                realizing their product concepts. And we&#39;ve learned a few things from our over 8
                                years of
                                expertise.<br/><br/>
                                In addition to collaborating with well-established companies, we have developed MVPs,
                                built
                                digital products, scaled tech and infrastructure, and ultimately sold a number of
                                financed
                                startups. We can provide you with that experience.
                            </p><br/><br/>
                            <p className='text-[0.85em] font-[450] tracking-tighter text-justify lg:-mt-[0.2em]'>Let&#39;s
                                discuss your plans and figure out how we can support you.</p><br/>
                            <Link href='/contact'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                    <span
                                        className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-800' : 'text-black group-hover:text-gray-200'}`}>Get
                                in touch <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span
                                        className={`absolute inset-0 border-[1px] ${isDayTime ? 'border-white' : 'border-black'} rounded-full`}></span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partners Sections */}
            <div className={`-mt-[3em] ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}
                 data-bg={isDayTime ? 'Light' : 'Dark'}>
                <div id={'partners'}
                     className={`relative max-w-auto lg:py-20 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em]`}>
                    <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                        <h3 className={'text-[1.5em] font-[700]'}>Our partners</h3>
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
            </div>

            {/* Trust Signals Section - Animated */}
            <div
                className={`py-24 ${isDayTime ? 'bg-teal-800 text-white' : 'bg-teal-50 text-teal-800'}`}
            >
                <div className="mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] lg:max-w-[90em]">

                    {/* Intro */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                        className="mb-16"
                    >
                        <h3 className="lg:text-[3.5em] md:text-[2.5em] text-[2em] font-[700] leading-[1.2] mb-4">
                            Trusted by Forward-Thinking Brands
                        </h3>
                        <p className={`lg:text-[1.1em] text-[0.95em] max-w-3xl font-[300] ${isDayTime ? 'text-white/90' : 'text-teal-800/90'}`}>
                            Our proven track record speaks volumes. See why companies across industries choose Grey
                            InfoTech for digital excellence.
                        </p>
                    </motion.div>

                    {/* Metrics Grid - Fancy animated counters */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.2}}
                        variants={{
                            hidden: {opacity: 0},
                            visible: {
                                opacity: 1,
                                transition: {staggerChildren: 0.12, delayChildren: 0.1}
                            }
                        }}
                    >
                        {[
                            {value: 50, label: "Projects Delivered", suffix: "+"},
                            {value: 15, label: "Industries Served", suffix: "+"},
                            {value: 99.9, label: "Uptime", suffix: "%"},
                            {value: 8, label: "Years Experience", suffix: "+"}
                        ].map((item, idx) => (
                            <motion.div
                                key={item.label}
                                className={`relative group rounded-3xl p-8 border-2 overflow-hidden transition-all duration-300 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20'
                                        : 'border-teal-800/20 bg-teal-50 hover:bg-teal-100'
                                }`}
                                initial={{opacity: 0, scale: 0.8, y: 20}}
                                whileInView={{opacity: 1, scale: 1, y: 0}}
                                viewport={{once: true, amount: 0.5}}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 20,
                                    delay: idx * 0.12
                                }}
                                whileHover={{scale: 1.08, y: -8}}
                            >
                                {/* Animated glow background */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 blur-2xl ${
                                        isDayTime ? 'bg-white' : 'bg-teal-800'
                                    }`}
                                    animate={{
                                        opacity: [0.1, 0.25, 0.1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <motion.div
                                        className={`text-5xl lg:text-6xl font-[900] mb-2 tracking-tight ${
                                            isDayTime ? 'text-white' : 'text-teal-800'
                                        }`}
                                        initial={{opacity: 0, scale: 0.5}}
                                        whileInView={{opacity: 1, scale: 1}}
                                        viewport={{once: true}}
                                        transition={{
                                            delay: idx * 0.12 + 0.3,
                                            duration: 0.6,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                    >
                                        <CountUp
                                            start={0}
                                            end={item.value}
                                            duration={2.5}
                                            separator=","
                                            decimals={Number.isInteger(item.value) ? 0 : 1}
                                            suffix={item.suffix ?? ""}
                                        />
                                    </motion.div>
                                    <motion.div
                                        className={`text-sm lg:text-base font-[600] tracking-wide ${
                                            isDayTime ? 'text-white/80' : 'text-teal-800/80'
                                        }`}
                                        initial={{opacity: 0}}
                                        whileInView={{opacity: 1}}
                                        viewport={{once: true}}
                                        transition={{delay: idx * 0.12 + 0.4, duration: 0.5}}
                                    >
                                        {item.label}
                                    </motion.div>
                                </div>

                                {/* Animated border shimmer */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl border-2 opacity-0 ${
                                        isDayTime ? 'border-white' : 'border-teal-800'
                                    }`}
                                    initial={{opacity: 0}}
                                    whileInView={{opacity: [0, 0.6, 0]}}
                                    viewport={{once: true}}
                                    transition={{delay: idx * 0.12 + 0.15, duration: 1.8}}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Proof & Testimonials Section */}
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.7, delay: 0.3}}
                        className={`rounded-3xl border-2 p-10 lg:p-12 ${
                            isDayTime
                                ? 'border-white/30 bg-white/5'
                                : 'border-teal-800/20 bg-teal-50'
                        }`}
                    >
                        <h4 className={`text-xl lg:text-2xl font-[700] mb-6 ${
                            isDayTime ? 'text-white' : 'text-teal-800'
                        }`}>
                            See what clients are saying
                        </h4>

                        {/* Proof badges grid with real icons */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                            variants={{
                                hidden: {opacity: 0},
                                visible: {
                                    opacity: 1,
                                    transition: {staggerChildren: 0.1, delayChildren: 0.5}
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount: 0.5}}
                        >
                            {/* Clutch */}
                            <motion.a
                                href="https://clutch.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, 5, -5, 0]}}
                                    transition={{duration: 2, repeat: Infinity}}
                                >
                                    <FaStar/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Clutch</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Top-rated reviews
                                </div>
                            </motion.a>

                            {/* Google Reviews */}
                            <motion.a
                                href="https://google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.1, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, -5, 5, 0]}}
                                    transition={{duration: 2.2, repeat: Infinity}}
                                >
                                    <FaGoogle/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Google Reviews</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    4.9★ Rating
                                </div>
                            </motion.a>

                            {/* LinkedIn */}
                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.2, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, 5, -5, 0]}}
                                    transition={{duration: 2.4, repeat: Infinity}}
                                >
                                    <FaLinkedin/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">LinkedIn</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Endorsed leaders
                                </div>
                            </motion.a>

                            {/* Case Studies */}
                            <motion.a
                                href="/case-studies"
                                className={`group relative rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                    isDayTime
                                        ? 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
                                        : 'border-teal-800/15 bg-white hover:bg-teal-50 text-teal-800'
                                }`}
                                initial={{opacity: 0, x: -15}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.3, duration: 0.5}}
                                whileHover={{y: -6}}
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{rotate: [0, -5, 5, 0]}}
                                    transition={{duration: 2.6, repeat: Infinity}}
                                >
                                    <FaFileAlt/>
                                </motion.div>
                                <div className="font-semibold text-sm lg:text-base">Case Studies</div>
                                <div className={`text-xs lg:text-sm mt-1 ${
                                    isDayTime ? 'text-white/70' : 'text-teal-800/60'
                                }`}>
                                    Real outcomes
                                </div>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Testimonials */}
            <div
                className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full h-auto ${
                    isDayTime ? 'bg-black' : 'bg-white'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-white' : 'text-black'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[700] tracking-widest mb-4">What our clients say</h5>
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
                                style={{
                                    height: 'auto',
                                }}
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

            <div
                className={`relative -mt-18 py-16 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] mb-8 max-w-full w-full h-auto ${
                    isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                }`}
            >
                <AIProjectEstimator/>
            </div>

            {/* FAQ section */}
            <div id={'faq-section'}
                 className={`relative lg:py-24 md:py-12 py-4 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <h3 className={'lg:text-[3.2em] md:text-[3em] text-[2em] font-[700] leading-[1.2] tracking-normal border-b-[1px] lg:pb-[1em] pb-[0.8em] lg:mb-[2em]'}>
                        Frequently<br/>asked Questions
                    </h3>
                </div>
                <div className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] space-y-2`}>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(0)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Who are Grey InfoTech?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Grey InfoTech is a vibrant digital agency based in Port Harcourt, Nigeria, established
                                in 2018. We’re passionate about crafting stunning websites, building strong brands,
                                creating dynamic eCommerce platforms, and developing innovative mobile apps. As a web,
                                software development company, we also specialize in digital transformation and digital
                                marketing strategies aiming to bring our clients’ visions to life with creativity and
                                expertise.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(1)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do i get started with Grey InfoTech?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Getting started with Grey InfoTech is simple! You can reach out to us through our
                                contact form, email, or phone number to discuss your project requirements. Once we
                                understand your needs, we will provide you with a detailed proposal and timeline for
                                your project. Upon your approval, we will begin the design and development process,
                                keeping you informed and involved at every step. Our goal is to deliver a digital
                                solution that exceeds your expectations and drives your business forward.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(2)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Who are your typical clients?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We partner with a diverse array of clients, ranging from innovative startups to
                                established enterprises across multiple industries, including retail, healthcare,
                                education, finance, and technology. Whether you are a small business or a large
                                corporation, we are dedicated to helping you achieve success and visibility in the
                                digital landscape.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(3)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you describe your web design process?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Certainly! Our web design process is both comprehensive and enjoyable. We begin by
                                understanding your goals and vision, which allows us to plan the website’s structure and
                                content effectively. Next, we move into the design phase, creating visually appealing
                                mockups and prototypes. Once approved, we proceed to development, followed by thorough
                                testing and the final launch. Throughout the process, we maintain open communication,
                                ensuring that your feedback is integrated at every stage. On average, our projects are
                                completed within 8-16 weeks.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(4)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What type of website does Grey InfoTech create?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We specialize in creating a wide variety of websites, including sophisticated corporate
                                sites, feature-rich eCommerce platforms, visually striking portfolio sites, engaging
                                blogs, and custom web applications. Our designs are fully responsive, ensuring optimal
                                performance and a seamless user experience across all devices, whether desktop, tablet,
                                or smartphone.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(5)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Which industry does Grey InfoTech serve?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We serve a diverse range of industries, including retail, healthcare, education,
                                finance, technology, and non-profits. Our deep industry expertise enables us to
                                customize our solutions to address the unique needs of each and every sector, ensuring
                                that your digital presence is a true reflection of your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(6)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What constitutes a successful web project?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                A successful web project not only meets your objectives but also enhances user
                                experience while excelling in performance, speed, security, and SEO. It should be
                                scalable, easy to maintain, and seamlessly align with your brand identity. In essence,
                                it&#39;s a project that goes beyond aesthetics driving tangible value and supporting the
                                long-term success of your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(7)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What services do web design agencies provide?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We provide a comprehensive suite of services, including website design and development,
                                branding, eCommerce solutions, mobile app development, digital marketing strategies,
                                SEO, and continuous support and maintenance. Whatever your digital requirements may be,
                                we are equipped to meet them with expertise and dedication.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(8)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Which companies benefit from using a web design agency?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Any company seeking to enhance its online presence can benefit from partnering with a
                                web design agency. This includes businesses of all sizes and industries, whether
                                you&#39;re
                                just starting out or aiming to refresh or expand your digital footprint. We customize
                                our services to help you achieve your digital goals efficiently and effectively.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(9)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the cost of web design and web development services?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Our project budgets typically varies, depending on the complexity and scope of the work.
                                Web applications and complex mobile apps may incur higher costs. We provide customized
                                quotes to ensure you receive the best value for your investment.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(10)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to complete a project?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Our projects typically take 8 to 45 weeks from start to finish depending on the project
                                type. This timeline encompasses understanding your requirements, planning, design,
                                development, testing, and launch. More complex projects, such as custom web applications
                                or large-scale eCommerce sites, may require additional time to ensure the highest
                                quality and functionality.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(11)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can Grey InfoTech meet tight deadlines?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Absolutely! We recognize that some projects require fast delivery, and we are equipped
                                to accommodate urgent needs. By prioritizing these projects and allocating the necessary
                                resources, we ensure timely delivery without compromising on quality. Our proven track
                                record demonstrates our ability to meet tight deadlines while consistently delivering
                                outstanding results.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(12)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What kind of support and maintenance do you offer after the website is launched?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We provide comprehensive support and maintenance services, including regular updates,
                                security assessments, performance monitoring, and continuous technical assistance. Our
                                aim is to ensure your website remains secure and operates efficiently long after launch.
                                Additionally, we are ISO 27001 certified and Cyber Essentials qualified, so you can
                                trust that your site’s security is in expert hands.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(13)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you manage revisions and feedback during the design process?</span>
                            {onIndex === 13 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 13 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                We highly value feedback and actively involve you at every stage of the design process.
                                Through feedback loops and iterative design, we continuously refine and enhance the
                                project to ensure it aligns with your expectations. Your input is crucial, and we ensure
                                it is fully integrated to deliver a final product that exceeds your vision.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(14)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Are there extra costs for adding digital marketing services to web projects?</span>
                            {onIndex === 14 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 14 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, adding digital marketing services may incur additional costs. These services are
                                aimed at boosting your online presence and driving measurable performance. We offer
                                detailed quotes tailored to the specific strategies required, ensuring transparency and
                                alignment with your business objectives.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(15)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the role of a content management system (CMS) in web development?</span>
                            {onIndex === 15 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 15 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                A content management system (CMS) is a software application that helps manage and
                                organize digital content. It allows users to easily create, edit, and update website
                                content without the need for extensive technical knowledge. CMS platforms enable users
                                to effortlessly update and modify content, making it easier for them to maintain and
                                manage their website&#39;s information. They often provide features such as content
                                management, version control, and user-friendly interface, streamlining the content
                                management process and enhancing the overall user experience.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(16)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What sets Grey InfoTech apart from other web design agencies?</span>
                            {onIndex === 16 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 16 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we are committed to delivering exceptional digital solutions that
                                drive success and innovation. Our team of skilled professionals is dedicated to
                                providing personalized services that meet your unique needs and exceed your
                                expectations. We combine creativity, expertise, and cutting-edge technologies to deliver
                                high-quality websites, mobile apps, and digital marketing strategies that elevate your
                                brand and engage your audience. Our focus on collaboration, transparency, and excellence
                                sets us apart and ensures your project&#39;s success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(17)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the benefits of working with Grey InfoTech?</span>
                            {onIndex === 17 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 17 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Working with Grey InfoTech offers numerous benefits, including access to a team of
                                experienced professionals dedicated to your project&#39;s success. We provide
                                personalized
                                solutions tailored to your specific needs, ensuring that your digital presence stands
                                out and drives results. Our commitment to quality, innovation, and client satisfaction
                                sets us apart and ensures that your project is delivered on time and within budget. By
                                partnering with Grey InfoTech, you gain a trusted digital partner that is invested in
                                your success and dedicated to helping you achieve your goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(18)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How can I learn more about Grey InfoTech&#39;s services?</span>
                            {onIndex === 18 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 18 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                To learn more about Grey InfoTech&#39;s services, you can explore our website, where you
                                will find detailed information about our web design, web development, mobile app
                                development, digital marketing, and branding services. You can also contact us directly
                                to discuss your project requirements and learn how we can help you achieve your digital
                                goals. Our team is always available to answer your questions and provide you with the
                                information you need to make informed decisions about your digital projects.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${
                            isDayTime
                                ? 'border-gray-400 text-gray-500 hover:text-black focus:text-black'
                                : 'border-gray-100 text-gray-200 hover:text-white focus:text-white'}`}>
                        <button onClick={() => toggleFAQ(19)}
                                className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the best way to contact Grey InfoTech?</span>
                            {onIndex === 19 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-end justify-between text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 19 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The best way to contact Grey InfoTech is through our website contact form, where you can
                                provide details about your project and request a consultation. You can also reach out to
                                us via email or phone to discuss your project requirements and learn more about our
                                services. Our team is always available to answer your questions and provide you with the
                                information you need to get started on your digital project.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;