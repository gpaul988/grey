'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Link from 'next/link'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import CountUp from "react-countup";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";

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

const SoftwareDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

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
    const [isDayTime, setIsDayTime] = useState(true);

    useEffect(() => {
        // Determine if it's day or night based on the current hour
        const hour = new Date().getHours();
        setIsDayTime(hour >= 6 && hour < 18); // Daytime is between 6 AM and 6 PM
    }, []);

    const reasons = [
        {
            id: 1,
            title: 'End-To-End Expertise',
            description: (
                <>
                    We provide a full-spectrum service—starting with consultancy and app design, through to development,
                    backend infrastructure, deployment, and long-term maintenance. Our team works across all sectors,
                    including healthcare, finance, education, logistics, real estate, e-commerce, and more. Whether
                    you&#39;re a startup looking to launch or an established business aiming to innovate, we handle
                    every
                    stage of app creation. With a focus on quality, scalability, and alignment with your business goals,
                    we
                    turn your ideas into robust, high-performing digital products.
                </>
            ),
        },
        {
            id: 2,
            title: 'Bespoke Solutions',
            description: (
                <>
                    At Grey InfoTech, we don’t believe in one-size-fits-all solutions. We take the time to understand
                    your unique business objectives, user expectations, and market dynamics. This allows us to craft
                    bespoke mobile applications that not only meet your goals but also deliver meaningful value to your
                    users. Whether you&#39;re looking to drive engagement, streamline operations, or open up new revenue
                    streams, we build <Link
                    href={'/services/Mobile-Application-Development'}
                    className={`border-b pb-[0.05em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>mobile
                    app</Link> that stand out for the right reasons—functionally, visually, and strategically.
                </>
            ),
        },
        {
            id: 3,
            title: 'Proven Track Record',
            description: (
                <>
                    Our team has successfully delivered mobile applications across a wide range of industries,
                    including <Link href={'/industries/fintech'} className={`border-b pb-[0.05em] ${
                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                }}`}>fintech</Link>, proptech, healthcare, retail, and more. Backed by a portfolio of
                    award-winning solutions, we bring deep technical expertise and domain knowledge to every project.
                    From startups to enterprise-level clients, we build high-performance, scalable mobile apps that
                    deliver measurable impact—whether it&#39;s user engagement, operational efficiency, or revenue
                    growth.
                </>
            ),
        },
        {
            id: 4,
            title: 'Technology Innovation',
            description: (
                <>
                    We stay ahead of the curve by leveraging the latest technologies, frameworks, and third-party
                    integrations to build robust, future-ready mobile applications. Whether you&#39;re investing in
                    native
                    development or seeking the flexibility of cross-platform solutions, we use the most efficient and
                    scalable tools to ensure your app delivers long-term value, performance, and adaptability in a
                    fast-evolving digital landscape.
                </>
            ),
        },
        {
            id: 5,
            title: 'Ongoing Support & Maintenance',
            description: (
                <>
                    Our partnership doesn’t end at launch. We provide ongoing support to ensure your app evolves with
                    your business—offering regular updates, security patches, performance monitoring, and feature
                    enhancements. This ensures your application remains secure, scalable, and aligned with user
                    expectations and market demands.
                </>
            ),
        },
    ];

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
            "BSBA",
            "WADS",
            "SDS",
            "CPSDS",
            "UDC",
            "MADS",
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

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, image, message} = testimonials[current];

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
            <div id={'hero'}
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] md:mt-[3em] mt-[1.5em] leading-[1.1] font-[500] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Software <br className={'lg:block md:block hidden'}/> Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Turn your idea into a reality
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/soft/hero.jpg'}
                        alt={'Software Development Hero'}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Building scalable solutions <br className={'lg:block md:block hidden'}/>for modern
                            businesses
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='capitalize lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Custom software development <br className={'lg:block md:block hidden'}/>that drives
                            innovation
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech is a custom software development company based in Port Harcourt,
                                    Rivers State, Nigeria. Since 2015, our team has been delivering bespoke software
                                    solutions tailored to the unique needs of startups and established businesses. We
                                    specialise in building robust, scalable applications that solve real business
                                    challenges and support long-term growth.
                                </p>
                            </div>
                            <div>
                                <p>
                                    As a dedicated team of software consultants, product designers, and developers based
                                    in Nigeria, We delivers high-quality software products, applications, and
                                    business systems tailored to your goals. With proven experience across sectors
                                    including financial services, real estate, entertainment, aviation, and
                                    manufacturing, we understand industry-specific challenges and how to solve them.
                                    Whether you’re building from scratch or modernising an existing platform, we offer a
                                    wide range of software development services with a cost-effective, collaborative,
                                    and results-driven approach.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our software Development Services */}
            <div className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div id={'software-services'}
                     className={'relative lg:pt-[5em] md:pt-[5em] pt-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <h2 className={'border-b pb-[0.8em] border-gray-500/50 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                        Software Development Services
                    </h2>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky top-28 lg:h-screen overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-100' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Bespoke Software & Business Applications", target: "BSBA"},
                                    {id: "02", title: "Web Application Development Services", target: "WADS"},
                                    {id: "03", title: "Software Development for Startups", target: "SDS"},
                                    {id: "04", title: "Customer Portal Software Development Services", target: "CPSDS"},
                                    {id: "05", title: "Unity Development Company", target: "UDC"},
                                    {id: "06", title: "Mobile Application Development Services", target: "MADS"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-950 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-50 font-[650]' : 'text-gray-500 font-[300]'}`
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
                        <div className={'lg:-ml-[7em] lg:mb-[18em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BSBA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Bespoke Software & Business Applications
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        With the rapid growth of Software as a Service (SaaS), there are countless
                                        business applications on the market. However, off-the-shelf software doesn’t
                                        always meet the unique needs of your organisation. That’s where our bespoke
                                        software development services come in.
                                        <br/><br/>
                                        Whether you’re looking to enhance customer service, streamline internal
                                        processes, improve operational efficiency, or drive sales growth, Grey InfoTech
                                        designs and builds custom business applications tailored precisely to your
                                        requirements.
                                        <br/><br/>
                                        Our consultative process is designed to understand your business in depth. We
                                        take the time to map your workflows, identify pain points, and define your goals
                                        before recommending a custom solution that aligns with your strategy.
                                        <br/><br/>
                                        We offer a free initial consultation to explore your needs and determine how we
                                        can support your success with the right technology.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WADS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Web Application Development
                                        Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business growth</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Responsive web applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Modern applications</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        In today’s service-driven economy, customers demand access to business services
                                        anytime, anywhere. Web applications provide a reliable solution by being
                                        accessible online 24/7, every day of the year. Whether you’re building a SaaS
                                        platform, an internal system for employees and clients worldwide, or a customer
                                        portal or service tool, a well-designed web application offers scalable,
                                        cost-effective support for your business needs.
                                        <br/><br/>
                                        At Grey InfoTech, our expert software development team creates responsive web
                                        applications that perform seamlessly across all devices—mobile, tablet, and
                                        desktop. Leveraging modern technologies and frameworks such as Microsoft <Link
                                        href={'/services/Net-Development'}
                                        className={`border-b pb-[0.02em] ${
                                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                        }`}>.NET</Link>, <Link href={'/services/Javascript'}
                                                               className={`border-b pb-[0.02em] ${
                                                                   isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                               }`}>JavaScript</Link>, <Link
                                        href={'/services/PHP-Development'}
                                        className={`border-b pb-[0.02em] ${
                                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                        }`}>PHP</Link>, <Link
                                        href={'/services/Reactjs-Development'}
                                        className={`border-b pb-[0.02em] ${
                                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                        }`}>React</Link>, <Link href={'/services/Vuejs-Development'}
                                                                className={`border-b pb-[0.02em] ${
                                                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                }`}>Vue.js</Link>, and <Link
                                        href={'/services/angular-development'}
                                        className={`border-b pb-[0.02em] ${
                                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                        }`}>Angular</Link>, we deliver custom software
                                        solutions that are robust, secure, and tailored to your unique business goals.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SDS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Software Development For
                                        Startups</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Startup solution</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>MVP development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business innovation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Every great product begins with an idea, a business challenge, or a new
                                        opportunity. But turning that spark into reality can be daunting. That’s where
                                        Grey InfoTech steps in. With extensive experience working alongside startups, we
                                        understand that your challenges and needs are unique compared to established
                                        companies.
                                        <br/><br/>
                                        When launching a new venture, you may not have all the answers upfront. Often,
                                        you need to validate your concept before fully committing resources. Our expert
                                        team of product developers and consultants supports you at every stage—from
                                        initial planning, creating detailed specifications, and designing prototypes, to
                                        delivering your Minimum Viable Product (<Link href={'/services/MVP'}
                                                                                      className={`border-b pb-[0.02em] ${
                                                                                          isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                                      }`}>MVP</Link>). We’re here to
                                        help you test the waters and build a solid foundation for growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPSDS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Customer Portal Software Development Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Customer engagement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Document exchange</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Self-service tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost efficiency</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Many businesses enhance customer service, build loyalty, and
                                        strengthen <Link href={'/services/branding'}
                                                         className={`border-b pb-[0.05em] ${
                                                             isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                         }`}>brand</Link> awareness by developing custom business
                                        software—particularly through customer
                                        portals that also reduce operational costs by streamlining service delivery.
                                        <br/><br/>
                                        A customer portal provides secure, 24/7 access to key information and services
                                        beyond traditional business hours. The advantages include:
                                    </p>
                                    <ul className={'text-justify font-[300] leading-[1.5] text-[0.81em] list-disc ml-4'}>
                                        <li className={'mb-2'}>
                                            <span className={'font-[600] '}>Improved Communication:</span> By
                                            channeling customer interactions through a
                                            centralized messaging center, you increase operational efficiency and keep
                                            all communications organized in one place. Clients can securely access
                                            private information such as policies, statements, and documents without
                                            needing to contact support directly.
                                        </li>
                                        <li className={'mb-2'}>
                                            <span className={'font-[600] '}>Seamless Document Exchange:</span> Customers
                                            can upload large files directly via the portal, eliminating the need for
                                            external file transfer services and simplifying workflows for both your team
                                            and clients.
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'UDC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Unity Development Company</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cross-platform development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Game prototyping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>High-quality graphics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive experiences</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Looking for a team with extensive experience in creating cross-platform games
                                        and applications with stunning, high-quality graphics? You’ve found the right
                                        partner.
                                        <br/><br/>
                                        Unity offers clear advantages: powerful cross-platform capabilities, a robust
                                        physics engine, and advanced graphical features. These tools enable us to
                                        rapidly prototype and develop complex, immersive games and applications without
                                        compromising quality.
                                        <br/><br/>
                                        At Grey InfoTech, we go beyond just coding — we’re your strategic creative
                                        partner. We collaborate closely with you to transform your vision into
                                        captivating, fully-realized experiences that perform flawlessly across all
                                        platforms, delivering results faster than you ever imagined.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MADS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Mobile Application Development
                                        Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Native app development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Hardware optimisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Superior user experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We work across all major mobile platforms, including Apple’s <Link
                                        href={'/services/ios-development'}
                                        className={`border-b pb-[0.05em] ${
                                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                        }`}>iOS</Link> and <Link href={'/services/seo'}
                                                                 className={`border-b pb-[0.05em] ${
                                                                     isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                 }`}>Google’s</Link> Android, to deliver
                                        high-performance native mobile applications tailored to your
                                        business goals. By developing custom business software natively for each
                                        platform, we’re able to fully leverage device hardware — from cameras and
                                        sensors to GPS and biometrics — ensuring maximum performance, seamless
                                        functionality, and an exceptional user experience. Whether you&#39;re launching
                                        a customer-facing app or an internal business tool, our native development
                                        approach allows us to create intuitive, reliable and scalable mobile solutions
                                        that truly stand out.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'-mt-[20em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/soft/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Trusted Digital Partners */}
            <div className={`-mt-[2em] ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'partners'}
                     className={`relative lg:py-20 lg:mb-20 md:mb-20 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-black' : 'text-white'
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
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}
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
            </div>

            {/* Testimonials */}
            <div
                className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full -mt-[5em] h-auto ${
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

            {/* Why Choose Grey InfoTech */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Why choose Grey InfoTech <br className={'lg:block md:block hidden'}/>for your your next
                                project?
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                Ignore functional. We create digital products that excite consumers and provide the
                                outcomes you require.
                            </p>
                        </div>
                    </div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[250vh]">
                        <div
                            className="sticky top-52 flex h-[80vh] w-full max-w-full items-center overflow-hidden">
                            <motion.div
                                style={{x}}
                                className="flex lg:gap-[15em] md:gap-[15em] gap-[10em]" // Add padding for centering
                            >
                                {[
                                    {
                                        id: 1,
                                        subtitle: "01",
                                        title: (
                                            <>
                                                We’re Experienced
                                            </>
                                        ),
                                        description: (
                                            <>
                                                When it comes to digital, we bring deep, hands-on experience across a
                                                wide range of projects and industries. No matter the size or complexity
                                                of your brief, we draw on everything we&#39;ve learned—from past
                                                challenges
                                                to proven successes—to deliver solutions that blend creativity,
                                                technical expertise, commercial insight, and practical strategy. With
                                                Grey InfoTech, you gain a partner who brings not just capability, but
                                                clarity and direction.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "We’re Proactive",
                                        description: (
                                            <>
                                                At Grey InfoTech, we don&#39;t just deliver on expectations—we exceed
                                                them. Our proactive approach means we anticipate challenges before they
                                                arise, act swiftly without being prompted, and consistently look for new
                                                opportunities to drive your project forward. You can count on us to
                                                think ahead, solve problems before they happen, and add value at every
                                                stage of the process.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "We're Collaborative",
                                        description: (
                                            <>
                                                We&#39;re passionate about technology—but we never lose sight of the
                                                people
                                                behind the projects. Collaboration, for us, goes beyond being
                                                approachable and communicative. It means becoming a true partner who
                                                shares your vision, enthusiasm, and drive to build something
                                                exceptional. We bring not only technical expertise, but also a human
                                                touch that makes the journey as rewarding as the result.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                We&#39;re Invested
                                            </>
                                        ),
                                        description: (
                                            <>
                                                When you partner with Grey InfoTech, your goals become our mission. We
                                                take every project personally—demonstrated in our commitment to
                                                excellence, attention to detail, and unwavering accountability. We
                                                don&#39;t
                                                just deliver software; we take ownership of outcomes, ensuring your
                                                investment results in long-term value and measurable impact.
                                            </>
                                        ),
                                    },
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[350px] w-[400px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-black' : 'text-white'
                                        } ${index === array.length - 1 ? 'ml-auto' : ''}`} // Ensure last item aligns
                                    >
                                        <h3 className="text-[1em] font-[400] text-gray-500">{card.subtitle}</h3>
                                        <h2 className="sm:text-[1.5em] md:text-[2.5em] lg:text-[2.5em] font-[500] mt-4 leading-[1.1]">{card.title}</h2>
                                        <p className="text-[0.873em] font-[300] mt-4 text-justify">{card.description}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full lg:mb-36 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
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
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Last image*/}
            <div id={'last image'} className={'lg:-mt-[10em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/soft/last.jpg'}
                    alt={'Last Image'}
                    width={1720}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why Grey InfoTech For Your App Project */}
            <div className={`relative lg:-mt-20 py-36 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-20 mb-12`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:max-w-[90em] mx-auto px-4 sm:px-6 lg:px-[4.6em] border-b-[0.001em] pb-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            Why Grey InfoTech For <br className={'lg:block md:block hidden'}/>Your App Projects
                        </h2>
                    </div>
                    <div className='lg:-ml-[8em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We have completed projects for businesses across a wide range of industries.Details about
                            this encounter that could be pertinent to you are included in this section.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`relative -mt-20 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-16 lg:pb-28 pb-14 mb-12  px-6`}>
                <div
                    className='relative mx-auto px-4 sm:px-6 lg:px-[4.6em] grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-36'>
                    {/* Left Section */}
                    <div
                        className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4 lg:pl-4 lg:pr-[3em]`}>
                        {reasons.map((reason, index) => (
                            <div
                                key={reason.id}
                                className={`relative mb-6 ${
                                    index + 1 === activeIndex
                                        ? isDayTime
                                            ? 'bg-white py-5'
                                            : 'bg-black py-5'
                                        : ''
                                }`}
                            >
                                <h3
                                    className={`relative pr-[6em] leading-[1.2] lg:text-[1.5em] text-[1em] mb-4 cursor-pointer transition-all ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'text-black font-bold'
                                                : 'text-white font-bold'
                                            : 'text-gray-500'
                                    }`}
                                    onClick={() => setActiveIndex(index + 1)}
                                >
                                    {reason.title}
                                </h3>
                                <div>
                                    <AnimatePresence mode="wait">
                                        {index + 1 === activeIndex && (
                                            <motion.div
                                                key={reason.id}
                                                initial={{opacity: 0, y: -50}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 0}}
                                                transition={{duration: 0}}
                                                className={`relative inline-block ${
                                                    isDayTime ? 'text-black' : 'text-white'
                                                }`}
                                            >
                                                {reason.description}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='lg:mt-[3em] h-[30vh] sticky'>
                        <Image
                            src={'/assets/soft/why.jpg'}
                            alt="Mockup"
                            width={660}
                            height={150}
                        />
                    </div>
                </div>
                <div
                    className={`lg:px-[28em] items-center ${isDayTime ? 'text-black bg-white' : 'text-white bg-black'} justify-center`}>
                    <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 text-center'>
                        Prepared to initiate the discussion?
                    </h2><br/>
                    <Link href='/contact'
                          className='flex items-center justify-center-safe text-center'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border tracking-tighter rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-[4em] -translate-y-[2.8em] absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[100%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left text-black ${isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'} transition-colors duration-200 ease-in-out`}>Get
                                started <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span className="absolute inset-0 rounded-full "></span>
                        </button>
                    </Link>
                </div>
            </div>


            <Footer/>
        </div>
    );
};

export default SoftwareDevelopment;