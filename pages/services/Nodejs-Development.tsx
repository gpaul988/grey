import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
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
        name: "John Abgara",
        title: "CTO, FinPlus Capital ",
        message: (
            <>
                Grey InfoTech transformed our backend infrastructure with their expert Node.js development. Their team
                delivered a high-performance system that scales effortlessly and integrates seamlessly with our
                financial tools. We now handle 10x more transactions with zero downtime. Truly a game-changer.
            </>
        ),
    },
    {
        name: "Daniel Ekong",
        title: "CEO, RecruitEdge Africa ",
        message: (
            <>
                They exceeded our expectations. Their Node.js development team built a robust, scalable backend
                that powers our recruitment platform. Their attention to detail and responsiveness made the entire
                process stress-free. We’re already planning our next project with them.
            </>
        )
    },
    {
        name: "Linda Mensah",
        title: "Head of Product, BuildSmart Solutions",
        message: (
            <>
                Working with Grey InfoTech was a smooth and rewarding experience. Their Node.js expertise helped us
                launch a real-time project management platform that our clients love. They were fast, flexible, and
                deeply committed to our success. Highly recommended for any serious tech product.
            </>
        )
    }
];

const NodejsDevelopment = () => {
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
            "NCS",
            "CND",
            "NAD",
            "NAIS",
            "NMS",
            "NAM",
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
                    Node.js Development <br className={'lg:block md:block hidden'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Boost your digital goods with Node.js solutions that are quick, scalable, and effective for your
                    company&#39;s requirements.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/node/hero.jpg'}
                        alt={'Node Development Hero'}
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
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Modern applications <br className={'lg:block md:block hidden'}/>powered by Node.js
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Node.js Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech’s Node.js development services deliver robust, scalable, and
                                    high-performance applications tailored to meet the demands of modern businesses.
                                    Whether you&#39;re in finance, healthcare, logistics, education, or retail, our
                                    experienced team applies industry best practices and technical expertise to craft
                                    custom software that aligns with your operational goals. We build web and mobile
                                    applications that are not only fast and responsive but also engineered for long-term
                                    success—ensuring reliability, maintainability, and seamless scalability as your
                                    business evolves.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our full-spectrum Node.js development services include custom application
                                    development, enterprise-grade web solutions, API creation and integration, system
                                    modernization, app migration, ongoing maintenance, and strategic consulting. We
                                    prioritise clear communication, on-time delivery, and results-focused execution
                                    throughout every stage of the project. With Grey InfoTech, you gain more than a
                                    development team—you gain a trusted technology partner committed to helping you
                                    accelerate innovation, enhance efficiency, and create lasting business value.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                    <div className={'h-auto w-full max-w-full'}>
                        <Image
                            src={'/assets/node/3.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/node/4.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/node/1.jpg'}
                            alt={'calender'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/node/2.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* Why Node */}
            <div
                className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                <div className=''>
                    <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                        Unleashing potential <br className={'lg:block md:block hidden'}/>with Node.js
                    </h6>
                </div>
                <div className='lg:-ml-[19em]'>
                    <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                        Why Node.js?
                    </h3>
                    <div
                        className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                        <div>
                            <p>
                                Our clients choose Node.js for their web applications because it offers the speed,
                                reliability, and scalability modern businesses demand. As a non-blocking, event-driven
                                framework, Node.js supports high-concurrency environments, making it an ideal choice for
                                developing fast and responsive applications across a wide range of industries.
                            </p>
                        </div>
                        <div>
                            <p>
                                Its lightweight architecture, combined with the ability to reuse code across both
                                frontend and backend, allows us to streamline development and accelerate time to market.
                                Whether it&#39;s a real-time dashboard, data-intensive platform, or scalable
                                customer-facing
                                application, Node.js empowers us to deliver clean, efficient, and performance-driven
                                solutions that support our clients’ long-term goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Node.js development solutions */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] lg:pt-[2em]  ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'node-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 max-w-full mx-auto`}>
                        <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            Our Node.js development solutions </h2>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[15em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Node.js Consulting Services", target: "NCS"},
                                    {id: "02", title: "Custom Node.js Development", target: "CND"},
                                    {id: "03", title: "Node.js API Development", target: "NAD"},
                                    {id: "04", title: "Node.js API Integration Services", target: "NAIS"},
                                    {id: "05", title: "Node.js Maintenance & Support", target: "NMS"},
                                    {id: "06", title: "Node.js App Migration", target: "NAM"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[17em] md:mb-[17em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Node.js Consulting Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technology consultation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business growth</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        You want your new Node.js application to be a smart investment—delivering high
                                        returns, long-term value, and a clear business advantage. By partnering with a
                                        trusted digital partner like Grey InfoTech, you gain more than just technical
                                        expertise; you gain a team that understands your strategic goals. Drawing on our
                                        consulting experience and hands-on capabilities in development, testing, risk
                                        mitigation, issue resolution, and scaling, we approach each project with a clear
                                        understanding of your market landscape. We assess your business needs, analyse
                                        competitors, and uncover challenges before crafting or enhancing a tailored tech
                                        solution that delivers measurable impact for your organisation.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CND'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom Node.js Development
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
                                        Every client brings a unique set of goals, challenges, and technical
                                        requirements—but when it comes to building modern web applications, Node.js
                                        consistently emerges as the preferred choice. Businesses across industries
                                        choose Node.js for its ability to deliver secure, scalable, and feature-rich
                                        applications that meet the demands of today’s fast-paced digital environments.
                                        Its event-driven architecture and non-blocking I/O model make it ideal for
                                        real-time applications and services that need to perform reliably at scale.<br/><br/>
                                        At Grey InfoTech, we harness the full potential of Node.js to create custom
                                        solutions that align with your business objectives. Whether you&#39;re launching
                                        a new product, improving an internal system, or scaling to meet new demand, our
                                        development team designs high-performance applications tailored specifically to
                                        your needs. The result is a future-ready web solution that drives efficiency,
                                        supports growth, and delivers strong returns on your technology investment.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Node.js API Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Real-time data</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data synchronisation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        APIs are the backbone of modern digital ecosystems, enabling seamless
                                        communication and data exchange between software components, platforms, and
                                        services. For businesses aiming to build interconnected systems, integrate
                                        third-party services, or create robust microservices architectures, efficient
                                        API development is essential. Node.js offers an ideal environment for API
                                        development thanks to its event-driven architecture, fast execution, and
                                        scalability—ensuring consistent performance even under heavy data
                                        loads.<br/><br/>
                                        At Grey InfoTech, we leverage Node.js to design and develop secure,
                                        high-performing APIs that serve a wide range of business needs—from real-time
                                        data exchange using WebSockets to reliable and structured RESTful APIs. This
                                        flexibility supports a variety of use cases, including customer-facing
                                        applications, internal business tools, and partner integrations. Our focus on
                                        performance, data integrity, and scalability means you can deliver seamless
                                        digital experiences to users while maintaining robust back-end efficiency.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NAIS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Node.js API Integration Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Payment integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Authentication</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We offer streamlined API integration services designed to enhance and extend the
                                        functionality of your digital products. Whether you’re integrating third-party
                                        services or internal systems, our team of Node.js specialists ensures smooth,
                                        secure, and efficient implementation. From payment gateways and authentication
                                        protocols to identity verification, CRMs, and other business-critical tools, we
                                        help unify your ecosystem for optimal performance.<br/><br/>
                                        By embedding APIs directly into robust Node.js architectures, we enable your
                                        applications to scale effortlessly, automate workflows, and deliver richer user
                                        experiences. Our integration process is thorough and strategic—focused on
                                        compatibility, security, and future-proofing—so you can confidently expand your
                                        capabilities while maintaining stability and control. Let us turn your app into
                                        a powerful, connected business asset.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Node.js Maintenance & Support</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reliable performance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Application monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System updates</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        When you launch your new Node.js application, that’s just the beginning. To
                                        remain a dependable and high-performing solution over time, your app needs
                                        consistent updates, proactive maintenance, and continuous optimisation. That’s
                                        why Grey InfoTech provides comprehensive post-launch support services designed
                                        to keep your business-critical systems running smoothly—day and night.<br/><br/>
                                        Our team of Node.js specialists offers 24/7 support and rapid issue resolution
                                        to minimise downtime and ensure uninterrupted performance. From patching
                                        vulnerabilities and improving speed to scaling infrastructure and rolling out
                                        new features, we work closely with you to future-proof your application and
                                        maximise its long-term value. With Grey InfoTech as your technology partner, you
                                        gain peace of mind and a resilient, evolving product that keeps pace with your
                                        business.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'NAM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Node.js App Migration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Minimal disruption</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalability upgrades</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App migration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Migrate your existing web applications or backend systems to the Node.js
                                        framework with our comprehensive, end-to-end migration service. Whether
                                        you&#39;re aiming for improved scalability, real-time capabilities, or a
                                        streamlined technology stack, Grey InfoTech ensures a seamless transition that
                                        enhances performance without disrupting your operations.<br/><br/>
                                        Our experienced Node.js specialists carefully plan and execute the migration
                                        process to minimise downtime and preserve business continuity. We ensure that
                                        all system functionalities remain intact and operational post-migration, so your
                                        team and users experience no interruptions. With Grey InfoTech, you get a
                                        future-ready application environment that’s robust, efficient, and ready to
                                        scale with your business.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[25em] md:-mt-[25em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/node/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why Work With Grey InfoTech Node.js Developers */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] capitalize text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Why Work with <br className={'lg:block md:block hidden'}/>Grey InfoTech Node.js <br
                            className={'lg:block md:block hidden'}/>Developers
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            We build scalable, high-performance apps tailored to your business goals—combining technical
                            expertise with real-world insight:
                        </p>
                    </div>
                </div>

                {/* Business-oriented development */}
                <div id={'BSD'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Business-oriented <br className={'lg:block md:block hidden'}/>development
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3em] md:pl-[18em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/node/bsd.jpg'
                                alt='Business Oriented Development'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Our development approach emphasizes aligning each solution with your core business
                            objectives, ensuring technical decisions directly contribute to long-term value. We
                            prioritize clean architecture, efficient code, and scalable design—focusing on smooth
                            deployment, maintainability, and strong ROI. By leveraging the latest features and best
                            practices in Node.js, we deliver applications that are robust, future-proof, and optimized
                            for performance.
                        </p>
                    </div>
                </div>

                {/* Dedicated Project Manager */}
                <div id={'DPM'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Dedicated <br className={'lg:block md:block hidden'}/>project manager
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/node/dpm.jpg'
                                alt='Dedicated Project Manager'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Every Node.js project at Grey InfoTech is assigned a dedicated project manager who oversees
                            the full development lifecycle, ensuring transparent communication and continuous progress
                            tracking. We actively involve our clients throughout the creation process, offering clear
                            visibility into key decisions and milestones—while shielding them from day-to-day technical
                            complexities.
                        </p>
                    </div>
                </div>

                {/* Seamless communication */}
                <div id={'SC'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Seamless <br className={'lg:block md:block hidden'}/>communication
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/node/sc.jpg'
                                alt='Seamless Communication'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, we believe effective communication is the foundation of successful
                            projects. We foster a transparent, collaborative environment where client feedback is not
                            only welcomed but actively integrated into the development process. With access to real-time
                            progress tracking through our communication tools and channels, you stay informed and
                            involved—every step of the way.
                        </p>
                    </div>
                </div>

                {/* Dedicated Team */}
                <div id={'DT'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Dedicated Team
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[4em] md:pl-[18em] md:-mt-[4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/node/dt.jpg'
                                alt='Dedicated Team'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Grey InfoTech is your trusted digital partner. Our skilled Node.js engineers integrate
                            seamlessly with your in-house team, functioning as a dedicated extension of your workforce.
                            You maintain full control, while we bring a culture of collaboration, transparency, and
                            technical excellence—working closely with you to build high-quality, scalable software that
                            meets your business goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Proactive risk assessment & rigorous testing */}
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
                        className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[5em] md:mt-[5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                            Proactive risk assessment <br className={'lg:block md:block hidden'}/>& rigorous testing
                        </h2>
                        <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[2em]'>
                            At Grey InfoTech, delivering a secure and high-performing Node.js solution is a top
                            priority. We take a proactive approach to risk management, incorporating early-stage
                            assessments to identify potential software development challenges and mitigate them before
                            they impact progress. Our rigorous testing protocols ensure your application performs
                            reliably under all conditions, meeting the highest standards for speed, efficiency, and
                            resilience. To further safeguard your project, we align with the ISO 27001 standard for
                            information security management, reinforcing our commitment to protecting your data at every
                            stage of development.<br/><br/>
                            We also take comprehensive measures to maintain confidentiality and data integrity
                            throughout our partnership. Before we begin, we initiate the process with a Non-Disclosure
                            Agreement (NDA) to ensure mutual trust and clarity. Our practices include strict IP
                            protection policies and the use of encrypted communication channels for all project
                            discussions. With Grey InfoTech, you can be confident that your Node.js application
                            development is not only in expert hands but also fully protected from the start.
                        </p>
                    </div>
                </div>
            </div>

            {/* Data security and confidentiality */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[5em] md:mt-[5em] lg:pr-[2.7em] md:pr-[2.7em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-6 md:text-[2em] lg:text-[3em] w-auto h-auto '>
                                data security <br className={'lg:block md:block hidden'}/>and confidentiality
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                To safeguard your Node.js application development, Grey InfoTech implements robust data
                                security and confidentiality protocols designed to protect your sensitive information
                                throughout the project lifecycle.<br/><br/>
                                Before we begin any collaboration, we initiate our engagement with a comprehensive
                                Non-Disclosure Agreement (NDA), ensuring that your intellectual property and proprietary
                                ideas remain fully protected. We strictly enforce IP protection measures and conduct all
                                project discussions via secure, encrypted communication channels. With these practices
                                in place, you can trust Grey InfoTech to handle your project with the utmost
                                professionalism, discretion, and security.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[7.8em] md:pr-[7.8em] lg:-ml-[2em]'}>
                            <Image
                                src={'/assets/node/dtc.jpg'}
                                alt={'Data security and confidentiality'}
                                width={450}
                                height={500}
                            />
                        </div>
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
                            At Grey InfoTech, delivering a successful Node.js project requires collaboration between a
                            dedicated, cross-functional team aligned with your business goals. This includes project
                            managers who oversee timelines and communication, experienced Node.js developers who build
                            scalable and secure backend systems, and quality assurance engineers who ensure the highest
                            standards through rigorous testing. Supporting this core team are UI/UX designers and
                            frontend developers who create intuitive interfaces, while DevOps specialists manage
                            deployment and infrastructure for seamless performance.<br/><br/>
                            Your involvement as the client is equally important — we keep you engaged throughout the
                            process, providing regular updates and incorporating your feedback without burdening you
                            with technical complexities. This collaborative approach ensures that the final product is
                            not only technically sound but also closely aligned with your strategic objectives,
                            delivering measurable business value.
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
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently asked <br className={'lg:block md:block hidden'}/>Node.js questions
                        </h2>
                        <p className={'font-[300] text-[0.87em] leading-[1.2] '}>
                            We strongly believe that Node.js is one of the most effective technologies for <br
                            className={'lg:block md:block hidden'}/>building modern applications. But what matters most
                            is that
                            you feel confident <br className={'lg:block md:block hidden'}/>in that choice too—so we’ve
                            answered
                            some of the most frequently asked questions <br className={'lg:block md:block hidden'}/>to
                            help you
                            better understand its advantages.
                        </p>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What exactly is Node.js?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Node.js is an open-source, server-side runtime environment that allows developers to
                                execute JavaScript outside the browser. Powered by Google Chrome’s V8 JavaScript engine,
                                Node.js is known for its speed, scalability, and efficiency. It supports the development
                                of a wide range of applications—from web servers and APIs to microservices, command-line
                                tools, desktop applications, and even IoT solutions.<br/><br/>
                                Prior to the emergence of Node.js, JavaScript was primarily confined to client-side
                                development. Node.js changed that by enabling JavaScript to run on the server side,
                                allowing for unified full-stack development. This shared language across both frontend
                                and backend not only streamlines workflows and boosts developer productivity but also
                                reduces complexity and accelerates time-to-market for businesses.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can Node.js be employed for frontend or backend?</span>
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
                                One of Node.js’s greatest strengths lies in its versatility—it supports both frontend
                                and backend development, making it one of the most powerful and flexible runtime
                                environments available. On the backend, Node.js excels at building fast, scalable
                                server-side applications that handle high volumes of concurrent connections with ease.
                                This makes it ideal for developing web applications, real-time chat platforms, streaming
                                services, online gaming servers, and other performance-intensive systems.<br/><br/>
                                On the frontend side, while Node.js doesn’t run in the browser, it plays a critical role
                                in modern development workflows. Developers use Node.js for essential build processes
                                such as compiling CSS preprocessors, bundling JavaScript modules, and optimising
                                frontend assets. Widely adopted tools like Webpack, Babel, and Gulp run on the Node.js
                                platform, enabling seamless, efficient frontend development. This dual capability
                                streamlines project pipelines, improves team collaboration, and significantly
                                accelerates development timelines.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How scalable are Node.js applications?</span>
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
                                Node.js applications are widely recognised for their exceptional scalability, making
                                them an ideal choice for businesses anticipating rapid growth or high traffic volumes.
                                Thanks to its event-driven, non-blocking I/O model, Node.js can efficiently manage
                                thousands of simultaneous connections without creating bottlenecks or performance
                                degradation. This architecture is especially advantageous for real-time applications,
                                streaming platforms, and APIs where responsiveness and throughput are
                                critical.<br/><br/>
                                Scalability can be further enhanced by leveraging horizontal scaling—running multiple
                                Node.js instances across different server nodes and distributing requests using load
                                balancers. In addition, implementing intelligent caching strategies, including in-memory
                                caches (such as Redis) and content delivery networks (CDNs), helps offload server
                                resources and improve response times. However, to fully realise these benefits, careful
                                attention must be given to system architecture, code efficiency, and ongoing performance
                                optimisation. At Grey InfoTech, we ensure that every Node.js solution we develop is
                                designed with scalability at its core, enabling your application to grow seamlessly with
                                your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does it take to develop a Node.js project?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The cost of developing a Node.js application can vary significantly depending on several
                                key factors. These include the complexity of the project, the number and type of
                                features required, integration with third-party services, UI/UX design sophistication,
                                and the overall development timeline. For instance, building a basic MVP (Minimum Viable
                                Product) with core functionality will naturally cost less than developing a
                                full-featured enterprise-grade platform with custom APIs, real-time communication
                                features, or advanced security requirements.<br/><br/>
                                At Grey InfoTech, we believe in delivering maximum value for your investment. That&#39;s
                                why
                                we work closely with you from the beginning to understand your goals, prioritise
                                features, and define a development roadmap that aligns with your budget and business
                                objectives. While it’s challenging to provide a precise quote without first reviewing
                                your project’s specifics, we’re happy to offer a tailored estimate once we understand
                                your requirements. Our transparent pricing model ensures there are no surprises—just
                                clear, strategic development aligned with measurable outcomes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the benefits of outsourcing Node.JS?</span>
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
                                Outsourcing your Node.js development can be a strategic move—if you choose the right
                                partner. By working with Grey InfoTech, you gain immediate access to a dedicated team of
                                skilled developers with deep expertise in building robust, high-performance Node.js
                                applications. Our specialists bring industry best practices, innovative solutions, and
                                technical precision to every project, ensuring faster delivery and reliable results.
                                This allows your internal team to stay focused on core business priorities while we
                                handle the heavy lifting of backend development.<br/><br/>
                                Beyond technical execution, our mature delivery process, streamlined communication, and
                                commitment to quality mean your project progresses smoothly from start to finish. We
                                ensure clear documentation, regular progress updates, and adherence to deadlines, giving
                                you confidence that your software will meet the highest standards when it launches.
                                Outsourcing to Grey InfoTech isn’t just about cost-efficiency—it’s about accelerating
                                your development with a trusted, results-driven technology partner.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Do you provide Node.js consulting service?</span>
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
                                Yes, Grey InfoTech provides comprehensive Node.js consulting services designed to help
                                businesses navigate the complexities of modern application development with clarity and
                                confidence. We understand that building a new application is a major investment, and our
                                goal is to ensure it delivers long-term value. Our consulting process goes beyond
                                development—we start by assessing your unique business needs, market conditions, and
                                competitive landscape. This allows us to recommend the right architecture, select
                                optimal technologies, and develop a scalable roadmap tailored to your goals.<br/><br/>
                                With deep expertise in Node.js outsourcing, including development, testing, performance
                                optimisation, and long-term scalability, we ensure your project is built on solid
                                technical foundations. Our team applies industry best practices, rigorous code
                                standards, and strategic thinking to craft responsive, high-performing applications that
                                are ready to scale as your business grows. When you partner with Grey InfoTech,
                                you&#39;re
                                not just building software—you’re laying the groundwork for sustainable digital success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What development process do you follow?</span>
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
                                At Grey InfoTech, we build Node.js applications using a proven methodology honed over
                                years of hands-on experience across diverse industries. Our approach is built on a
                                foundation of efficient, incremental development—designed to deliver reliable results
                                while keeping complexity manageable. We’ve refined this process through numerous
                                successful projects, ensuring that each phase is streamlined, transparent, and aligned
                                with your organisation’s strategic goals.<br/><br/>
                                We understand that developing a software application can be both challenging and
                                resource-intensive. That’s why we don’t just build—we partner with you throughout the
                                entire journey. From the initial discovery phase to post-launch support, we provide
                                expert guidance tailored to your business’s unique requirements. Our goal is to make the
                                development process as smooth and effective as possible, ensuring your Node.js
                                application is robust, scalable, and ready to deliver measurable impact.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Will I be assigned a specific project manager to look after my project?</span>
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
                                Yes, Grey InfoTech assigns a dedicated project manager to every engagement to ensure
                                your product development runs smoothly and transparently. Your project manager acts as
                                your single point of contact, keeping you updated with progress reports, milestone
                                tracking, and proactive communication throughout the entire development lifecycle. This
                                allows you to stay closely informed and involved—without being overwhelmed by the
                                day-to-day technical details.<br/><br/>
                                Our collaborative approach is built on open communication and accountability. We believe
                                in creating a strong partnership with our clients by actively listening to feedback,
                                aligning on priorities, and making decisions together. At Grey InfoTech, we view every
                                project as a shared journey—and your input is not just welcome, it’s essential to
                                delivering a successful outcome.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is Node.js still relevant in 2023?</span>
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
                                If you&#39;re exploring modern tech stacks, the answer is clear—Node.js remains highly
                                relevant in 2025 and beyond. Leading global companies like PayPal, LinkedIn, Netflix,
                                and Uber continue to rely on Node.js to build fast, scalable applications. Its ability
                                to support both frontend and backend development with a unified tech stack makes it a
                                go-to solution for high-performance, real-time applications across industries.<br/><br/>
                                Node.js’s popularity continues to grow thanks to its vast ecosystem, active community,
                                and constant evolution. Innovations like GraphQL further highlight its
                                potential—enabling more efficient data handling and faster API performance. With its
                                proven track record, scalable architecture, and future-forward capabilities, Node.js is
                                not just a current trend—it’s a strategic choice for any business building for tomorrow.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default NodejsDevelopment;