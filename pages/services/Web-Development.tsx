import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Testimonial data
const testimonials = [
    {
        name: "Kwame Mensah",
        title: "Head of Engineering, TaskFlow Inc",
        message: (
            <>
                They played a key role in the successful development of our web platform. Their developers
                built a fast, reliable system that integrates perfectly with our existing tools. Their technical depth
                and delivery speed truly impressed our entire team.
            </>
        ),
    },
    {
        name: "Thandiwe Mokoena",
        title: "CTO, PropEdge Technologies",
        message: (
            <>
                We needed a dynamic and scalable web application to support our analytics services, and Grey InfoTech
                delivered flawlessly. Their structured approach and strong Laravel and front-end capabilities made the
                entire development process efficient and stress-free.
            </>
        )
    },
    {
        name: "Sipho Dlamini",
        title: "Digital Projects Manager, PayCore Solutions",
        message: (
            <>
                From backend APIs to frontend interfaces, Grey InfoTech built a solid, end-to-end web solution for us.
                Their developers were proactive, knowledgeable, and responsive throughout the project. We&#39;ve seen a
                major improvement in platform performance and user satisfaction.
            </>
        )
    },
    {
        name: "Amina Diallo",
        title: "Director of Operations, LogiFleet Systems",
        message: (
            <>
                We partnered with Grey InfoTech for a custom web dashboard and tracking portal, and the results exceeded
                expectations. Their ability to understand our business logic and translate it into a powerful,
                responsive web app was outstanding. Highly reliable and professional team.
            </>
        )
    }
];

// why grey infotech
const reasons = [
    {
        id: 1,
        title: (
            <>
                We&#39;re An Experienced Digital Agency
            </>
        ),
        description: (
            <>
                When it comes to digital, we’ve done it all—and learned from every project. No matter the scale or
                complexity, we bring the full weight of our experience as a digital agency to the table. That means
                combining creativity, technical expertise, strategic insight, and practical know-how to deliver
                solutions that are as effective as they are innovative.
            </>
        ),
    },
    {
        id: 2,
        title: (
            <>
                We&#39;re Proactive
            </>
        ),
        description: (
            <>
                You can count on us to go further than expected. We don&#39;t just follow instructions—we anticipate
                needs, address challenges before they arise, and proactively bring fresh ideas and opportunities to the
                table. It&#39;s our way of making sure you always get more value than you asked for.
            </>
        ),
    },
    {
        id: 3,
        title: (
            <>
                We&#39;re Collaborative
            </>
        ),
        description: (
            <>
                We’re passionate about technology, but what truly sets us apart is how we work with people.
                Collaboration, to us, means more than just being responsive or easy to work with—it’s about being a true
                partner who shares your enthusiasm, understands your goals, and is just as committed to creating
                something remarkable as you are.
            </>
        ),
    },
    {
        id: 4,
        title: (
            <>
                We&#39;re Invested
            </>
        ),
        description: (
            <>
                When you invest in us, we invest fully in you. We treat every project as if it were our own—bringing a
                strong sense of ownership, accountability, and care to every detail. You’ll see it in our commitment to
                quality, our refusal to settle for second-best, and our determination to deliver outcomes that exceed
                expectations. Your success is our priority.
            </>
        ),
    },
];

const WebDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);


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

                if (top < windowHeight * -0.0 || bottom < windowHeight * -0.0) {
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
            "FEWD",
            "BEWD",
            "FSWD",
            "OSWD",
            "MSS",
            "HI",
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

    const {name, title, message} = testimonials[current];

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

    // Why Grey InfoTech Hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative h-auto`}>
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
                    Web Development <br className={'lg:block md:block hidden'}/>Agency
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Welcome to Grey InfoTech, a web development company covering Port Harcourt, Rivers State.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/header/Web-Development-Company.jpg'}
                        alt={'Web Development Agency Hero'}
                        width={1536}
                        height={876}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6  lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            YOUR DIGITAL PARTNER
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.3] pb-6'>
                            Web Development Done Differently
                        </h3>
                        <p className='text-[0.873em] mt-11 tracking-normal leading-[1.3] font-[300]'>When technology
                            companies need a
                            reliable team to create digital experiences, they turn to Grey InfoTech: an experienced web
                            development business with decades of expertise and a disciplined strategy that ensures even
                            the most complicated projects go smoothly.</p>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Web development involves a wide range of projects, including simple online
                                    pages, <Link href='/industries/e-commerce-development'
                                                 className='hover:text-teal-600 border-b-[1px] border-gray-200'>eCommerce</Link> sites,
                                    and revolutionary web apps that enable completely distinct experiences. We&#39;ve
                                    worked with frontend, backend, and full stack development teams on projects in a
                                    variety of sectors, utilizing a wide range of technologies, and managed the entire
                                    process from start to finish.
                                </p>
                            </div>
                            <div>
                                <p>
                                    What our clients love, however, is not only the breadth and depth of our knowledge,
                                    but also a flexible method of working that allows us to pivot and alter course based
                                    on your budget, timetable, and all of the fascinating discoveries and ideas that
                                    arise along the road.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Web Development Services */}
            <div className={`lg:-mt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'web-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                Web Development <br className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div className={'lg:-ml-[4em] md:-ml-[4em]'}>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                We provide end-to-end <span
                                className={'font-[600]'}>web development services</span> tailored to businesses of all
                                sizes—from
                                startups to enterprises. Our offerings include modern website design, robust e-commerce
                                solutions, and scalable web applications built to support growth, performance, and
                                long-term success.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[12em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "Front-End Web Development", target: "FEWD"},
                                    {id: "02", title: "Back-End Web Development", target: "BEWD"},
                                    {id: "03", title: "Full-Stack Web Development", target: "FSWD"},
                                    {id: "04", title: "Open Source Web Development", target: "OSWD"},
                                    {id: "05", title: "Maintenance & Support Services", target: "MSS"},
                                    {id: "06", title: "Hosting & Infrastructure", target: "HI"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-6 mt-4'}>
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
                                     id={'FEWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Front-End Web Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User-centered interfaces</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI/UX development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Frontend technologies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>MVP development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        In today’s digital-first world, users interact with dozens of web and mobile
                                        experiences every single day—making seamless user interface (UI) and user
                                        experience (UX) design more critical than ever. Even the most powerful back-end
                                        technologies can fall flat if the front-end experience is clunky, confusing, or
                                        difficult to navigate. That&#39;s why we place UI/UX at the heart of every
                                        project we take on.<br/><br/>
                                        Our front-end developers bring together a strong sense of visual design with a
                                        deep understanding of how users think, move, and interact online. We don’t just
                                        build interfaces—we craft experiences that are intuitive, responsive, and
                                        engaging, helping your business stand out in a crowded digital landscape.
                                        Whether it&#39;s a sleek marketing website, a complex dashboard, or a full-scale
                                        web application, we ensure every detail enhances usability and drives user
                                        satisfaction.<br/><br/>
                                        From day one, our approach is iterative and results-driven. We start fast,
                                        developing an early <Link href={'/pages/services/MVP.tsx'}
                                                                  className={`border-b pb-[0.02em] ${
                                                                      isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                  }`}>MVP</Link> to test key features and workflows.
                                        From there, we
                                        refine through user feedback and performance insights—ensuring the end product
                                        not only looks great but performs flawlessly across devices. The outcome: a web
                                        experience your users will love, and a digital product that adds measurable
                                        value to your business.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BEWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Back-End Web Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Back-end technologies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System integrations</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Continuous Integration (CI)</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance and security</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        In web development, the real power lies beneath the surface—where performance,
                                        scalability, and security are engineered into the foundation of your product.
                                        Our back-end developers work behind the scenes to ensure that your application
                                        runs fast, handles complexity with ease, and integrates seamlessly with other
                                        systems. They&#39;re the ones building the logic and infrastructure that enable
                                        your digital product to perform reliably and grow with your business.<br/><br/>
                                        We take a proactive, integration-first approach using Continuous Integration
                                        (CI) practices. That means we focus not only on how your product functions in
                                        isolation, but also how it connects with your broader tech ecosystem—APIs,
                                        third-party services, internal tools, and legacy systems. By tackling complex
                                        integrations early, we reduce risk, improve stability, and ensure smoother
                                        delivery later on. This results in faster, smarter development cycles and
                                        back-end architecture built for long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FSWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Full-Stack Web Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Full stack expertise</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Front-end and back-end harmony</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>End-to-end development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Full-stack development offers a unified approach to building powerful digital
                                        solutions by combining both front-end and back-end expertise. At Grey InfoTech,
                                        our full-stack developers are skilled across the entire technology
                                        spectrum—delivering seamless, end-to-end web applications that function
                                        flawlessly from user interface to server logic.<br/><br/>
                                        Whether it&#39;s designing intuitive, user-friendly front ends or engineering
                                        secure, high-performing back-end systems, our team ensures every layer of your
                                        project is aligned, efficient, and built for scale. We don’t just write code—we
                                        architect cohesive systems that perform reliably, adapt to growth, and integrate
                                        with your existing tools and infrastructure.<br/><br/>
                                        By managing the full development lifecycle under one roof, we reduce delays,
                                        avoid miscommunication, and deliver a more consistent, strategic product. With
                                        Grey InfoTech, you get a future-proof solution tailored to your business
                                        goals—built right the first time, and ready to evolve as you do.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'OSWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Open Source Web Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Open source benefits</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost-effective development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Secure technologies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Framework and library choices</span>
                                    </div>
                                    <div className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        <p>We strongly believe in the power and potential of open source software. By
                                            leveraging trusted open source technologies, we help our clients build
                                            secure, scalable, and cost-effective web solutions that deliver real value.
                                            <br/><br/>
                                            Here are a few key advantages of using open source software in your
                                            project:</p><br/>
                                        <ul>
                                            <li className={'mb-4'}><span className={'font-[600]'}>Cost-Effective</span>:
                                                Open source tools are free to use and modify, which means no licensing
                                                fees—significantly lowering your development costs while maintaining
                                                high quality.
                                            </li>
                                            <li className={'mb-4'}><span
                                                className={'font-[600]'}>Secure and Transparent</span>:
                                                With contributions and code reviews from a global developer community,
                                                open source software benefits from constant scrutiny and improvement. We
                                                use only well-maintained, reputable libraries to ensure your solution is
                                                secure and reliable.
                                            </li>
                                            <li className={'mb-4'}><span className={'font-[600]'}>Cost-Effective</span>:
                                                Open source tools are free to use and modify, which means no licensing
                                                fees—significantly lowering your development costs while maintaining
                                                high quality.
                                            </li>
                                            <li className={'mb-4'}><span
                                                className={'font-[600]'}>Flexibility and Choice</span>:
                                                Open source offers a wide range of technologies, frameworks, and
                                                tools—enabling us to build faster, reduce time-to-market, and avoid
                                                reinventing the wheel. It gives us the freedom to select the best tools
                                                for your specific business needs.
                                            </li>
                                        </ul>
                                        <p>pen source isn&#39;t just a cost-saving strategy—it&#39;s a smart,
                                            future-proof
                                            foundation for building innovative, high-performing digital products.</p>
                                    </div>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MSS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Maintenance & Support Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Proactive maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Website security</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Full lifecycle support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technical accountability</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Our maintenance and support services are built to provide ongoing peace of
                                        mind—delivering fast, dependable help when you need it, and proactive oversight
                                        when you don’t. We handle everything from regular updates and security patches
                                        to performance monitoring and configuration reviews, ensuring your website or
                                        web app stays secure, stable, and up to date.<br/><br/>
                                        But we don’t just respond to issues—we work as an extension of your team, taking
                                        full ownership and accountability across the entire lifecycle of your digital
                                        product. For us, launching your platform is only the beginning. We&#39;re here
                                        to
                                        ensure it continues to perform, adapt, and grow with your business over time.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Hosting & Infrastructure</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cloud infrastructure</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Database integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable hosting solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>AWS and DigitalOcean experts</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        As specialists in supporting tech-driven businesses, we understand that great
                                        digital products rely on the right hosting architecture and infrastructure.
                                        That’s why we focus on building high-performance, efficient environments that
                                        empower your systems to run smoothly and scale confidently.<br/><br/>

                                        Our database engineers work with a range of technologies—from MySQL and
                                        PostgreSQL to MongoDB—ensuring seamless integration with your existing systems
                                        and handling complex migrations with zero disruption. Whether you&#39;re
                                        starting
                                        from scratch or modernising legacy systems, we make sure your data is
                                        structured, secure, and accessible.<br/><br/>

                                        We also help you unlock powerful scalability through cloud infrastructure. Using
                                        platforms like Amazon Web Services (AWS), DigitalOcean, and other leading
                                        providers, we architect fast, flexible, and reliable cloud environments tailored
                                        to your application’s specific needs. From elastic computing to secure storage
                                        and advanced data processing, we leverage the cloud to optimise performance and
                                        future-proof your infrastructure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={'relative sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] max-w-full w-full h-auto lg:-mt-[22em] md:-mt-[22em]'}>
                <Image
                    src={'/assets/webd/first.jpg'}
                    alt={'first image web development'}
                    width={1536}
                    height={865}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>

            {/* Backend Technologies */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'backend technology'}
                     className={`relative lg:mt-[4em] md:mt-[4em] pt-24 pb-16 lg:mb-8 mb-8 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[2.15em] md:text-[3.3em] lg:text-[3.3em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Back-End Web <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>technologies
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We may suggest a number of popular frameworks and technologies. Naturally, each project
                                is unique, and before choosing a strategy with you, we weigh the advantages and
                                disadvantages of several options.
                            </p>
                        </div>
                    </div>


                    {/* Tools */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-white' : 'text-black'
                         }`}>
                        <div id={'next'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/next.svg' : '/assets/webd/icon/next1.svg'}
                                    alt={'next'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>NEXT.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A powerful framework for building
                                    server-rendered <Link href={'/pages/services/Reactjs-Development.tsx'}
                                                          className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'}`}>React</Link> applications,
                                    offering a seamless development experience, improved SEO, and enhanced performance
                                    out of the box. With features like automatic routing, server-side rendering, and
                                    static site generation, it enables faster load times and greater scalability—making
                                    it ideal for modern web applications that demand speed, reliability, and
                                    flexibility.
                                </p>
                                <Link href={'/pages/services/Nextjs-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Next.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.6em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'symfony'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/sym.svg' : '/assets/webd/icon/sym1.svg'}
                                    alt={'symfony'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Symfony</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A robust and flexible PHP framework that accelerates the development of high-quality
                                    web applications through reusable components, structured architecture, and adherence
                                    to industry best practices. Its modular design promotes maintainability and
                                    scalability, making it an ideal choice for building complex, enterprise-grade
                                    systems with efficiency and long-term stability in mind.
                                </p>
                                <Link href={'/pages/services/PHP-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>PHP Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.4em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'net'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/net.png' : '/assets/webd/icon/net1.png'}
                                    alt={'.Net'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>.NET</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A versatile framework for building high-performance web, desktop, and cloud
                                    applications across multiple programming languages. It offers a secure, scalable
                                    architecture and a rich ecosystem of tools and libraries, enabling rapid development
                                    while maintaining reliability and long-term maintainability—ideal for
                                    enterprise-grade solutions and cross-platform deployment.
                                </p>
                                <Link href={'/pages/services/Net-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Net Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.2em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'laravel'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/laravel.svg' : '/assets/webd/icon/laravel1.svg'}
                                    alt={'Laravel'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Laravel</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A widely adopted <Link href={'/pages/services/PHP-Development.tsx'}
                                                           className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'}`}>PHP</Link> framework
                                    known for its elegant syntax, developer-friendly
                                    tools, and powerful features that streamline <Link
                                    href={'/pages/services/Web-Application.tsx'}
                                    className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'}`}>web
                                    application</Link> development. With
                                    built-in support for routing, authentication, caching, and more, Laravel enables the
                                    rapid creation of secure, maintainable, and scalable applications—making it a
                                    preferred choice for businesses seeking efficient and modern PHP-based solutions.
                                </p>
                                <Link href={'/pages/services/Laravel-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Laravel Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'ruby'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/ruby.svg' : '/assets/webd/icon/ruby1.svg'}
                                    alt={'Ruby on Rails'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Ruby on Rails</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A dynamic web application framework that emphasizes convention over configuration,
                                    enabling rapid development, clean code, and long-term maintainability. By
                                    streamlining repetitive tasks and encouraging best practices, it allows developers
                                    to build powerful, scalable applications quickly—making it a strong choice for
                                    startups and enterprises alike seeking fast time-to-market and robust architecture
                                </p>
                                <Link href={'/pages/services/Ruby-on-Rails.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Ruby on Rails Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[12.3em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'node'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon/node.svg' : '/assets/webd/icon/node1.svg'}
                                    alt={'Node'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Node.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A high-performance <Link href={'/pages/services/Javascript.tsx'}
                                                             className={`border-b pb-[0.1em] ${
                                                                 isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                             }`}>JavaScript</Link> runtime built on Chrome’s V8 engine,
                                    designed for building fast,
                                    scalable network applications using server-side scripting. Its event-driven,
                                    non-blocking architecture makes it ideal for handling high-concurrency workloads
                                    such as APIs, real-time services, and microservices—enabling efficient development
                                    and performance at scale across diverse platforms.
                                </p>
                                <Link href={'/pages/services/Nodejs-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Node.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Front-end Web Development Technologies */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'Frontend-Technologies'}
                     className={`relative  pt-10 pb-10 lg:mb-8 mb-18 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tight leading-[1] lg:pb-6'>
                                Front-end Web <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Technologies
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Modern apps may be built using a wide range of front-end technologies and frameworks,
                                and we have selected a solid selection of popular choices that we can suggest.
                            </p>
                        </div>
                    </div>

                    {/* Tools */}
                    <div id={'tools'}
                         className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}>
                        <div id={'angular'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/angular1.svg' : '/assets/webd/icon1/angular.svg'}
                                    alt={'Angular'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Angular</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    For large, feature-rich applications, we leverage Angular’s robust framework. Its
                                    modular architecture, two-way data binding, and built-in dependency injection make
                                    it ideal for developing scalable, maintainable, and enterprise-grade solutions.
                                    Angular enables us to create complex applications with high performance, strong
                                    structure, and seamless user experiences across platforms.
                                </p>
                                <Link href={'/pages/services/angular-development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Angular Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[10em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'react'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/react1.svg' : '/assets/webd/icon1/react.svg'}
                                    alt={'React'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>React</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    React.js is our preferred framework for building modular, high-performance user
                                    interfaces. Its component-based architecture allows us to develop reusable,
                                    maintainable code, while tools like Redux and MobX enable efficient state
                                    management. Whether it’s a dynamic single-page application or a complex web
                                    platform, we use React to deliver fast, responsive, and scalable user experiences.
                                </p>
                                <Link href={'/pages/services/Reactjs-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>React Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'html'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/html1.svg' : '/assets/webd/icon1/html.svg'}
                                    alt={'HTML'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>HTML</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    We use HTML5 as the foundation for every project, ensuring clean, semantic code that
                                    enhances browser compatibility, performance, and accessibility. By structuring
                                    content meaningfully, we improve SEO, support assistive technologies, and lay the
                                    groundwork for responsive, future-ready interfaces.
                                </p>
                            </div>
                        </div>
                        <div id={'css'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/css1.svg' : '/assets/webd/icon1/css.svg'}
                                    alt={'CSS'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>CSS</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    We use CSS3 along with advanced layout techniques like Flexbox and Grid to build
                                    responsive, visually compelling designs that adapt seamlessly across all screen
                                    sizes. By leveraging preprocessors such as SASS and LESS, we write modular,
                                    maintainable, and scalable stylesheets—enabling faster development and consistent
                                    design systems that grow with your product.
                                </p>
                            </div>
                        </div>
                        <div id={'vue'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/vue1.svg' : '/assets/webd/icon1/vue.svg'}
                                    alt={'Vue'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Vue.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    Vue.js is ideal for building lightweight, agile user interfaces that deliver strong
                                    performance without added complexity. Its intuitive structure and flexibility allow
                                    us to rapidly develop dynamic applications while maintaining scalability, clean code
                                    architecture, and an excellent user experience.
                                </p>
                                <Link href={'/pages/services/Vuejs-Development.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Vue.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.1em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'javascript'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/webd/icon1/js.png' : '/assets/webd/icon1/js1.png'}
                                    alt={'JavaScript'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Javascript</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    JavaScript powers the dynamic, interactive elements of your digital platform. Our
                                    team leverages modern ES6+ standards and cutting-edge tools to build responsive
                                    interfaces, create engaging animations, and add real-time functionality. This
                                    ensures your application is not only high-performing but also future-ready and
                                    impactful.
                                </p>
                                <Link href={'/pages/services/Javascript.tsx'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Javascript Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[11em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                <Image
                    src={'/assets/webd/mid.jpg'}
                    alt={'mid image'}
                    width={1536}
                    height={864}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>

            {/* The Benefits of Better Web Development */}
            <div id={'business benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div
                    className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                            The Benefits of Better <br className={'lg:block md:block hidden'}/>Web Development
                        </h2>
                    </div>
                    <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                        <p className={'text-justify text-[0.87em] font-[300]'}>
                            Building an application or website that essentially functions is now simpler than ever.
                            However, only a competent, experienced team can help you maximize your budget and realize
                            the full potential of your project.
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div id={'divers-knowledge'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/risk.svg' : '/assets/webd/icon2/risk1.svg'}
                            alt={'Diverse Knowledge'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Diverse Knowledge
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our team is skilled in a wide range of front-end and back-end technologies, allowing us to
                            choose the right stack for your specific needs—not just the ones we prefer. Whether it&#39;s
                            React, Vue, Node.js, Laravel, or .NET, we use the tools that best align with your goals to
                            deliver efficient, scalable solutions.
                        </p>
                    </div>
                    <div id={'scalability'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/sca.svg' : '/assets/webd/icon2/sca1.svg'}
                            alt={'Scalability'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Scalability
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We combine our web development expertise with deep knowledge of cloud infrastructure, system
                            architecture, and your broader technology stack—ensuring every solution we build is robust,
                            scalable, and seamlessly integrated with your existing environment.
                        </p>
                    </div>
                    <div id={'fast-value'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/test.svg' : '/assets/webd/icon2/test1.svg'}
                            alt={'Faster Value'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Faster Value
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our iterative development approach allows us to deliver a working product quickly, enabling
                            early testing, faster feedback, and continuous improvement. This helps us build in quality
                            from the start and ensures a smoother, more confident launch.
                        </p>
                    </div>
                    <div id={'more-control'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/fast.svg' : '/assets/webd/icon2/fast1.svg'}
                            alt={'More Control'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            More Control
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We use Git-based version control to manage your codebase efficiently and securely. This
                            allows our team to test new features, explore improvements, and collaborate
                            seamlessly—without ever compromising the stability of your main application. By isolating
                            changes in branches, we reduce risk, maintain clean workflows, and ensure that only
                            thoroughly reviewed code is merged into production.
                        </p>
                    </div>
                    <div id={'stronger-security'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/att.svg' : '/assets/webd/icon2/att1.svg'}
                            alt={'Stronger Security'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Stronger Security
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We’re with you at every stage of the development process—and beyond. As your digital product
                            evolves, we stay actively involved to address new vulnerabilities, apply critical updates,
                            and ensure long-term security and stability.
                        </p>
                    </div>
                    <div id={'less-uncertainty'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/risk.svg' : '/assets/webd/icon2/risk1.svg'}
                            alt={'less Uncertainty'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Less Uncertainty
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our proven track record speaks volumes. When you choose to work with us, you gain a
                            dedicated team that combines expertise, reliability, and efficiency to deliver high-quality
                            results consistently. We pride ourselves on meeting deadlines and staying within budget,
                            ensuring your projects progress smoothly and achieve their goals without unexpected delays
                            or costs.
                        </p>
                    </div>
                    <div id={'competitive-edge'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/sca.svg' : '/assets/webd/icon2/sca1.svg'}
                            alt={'A Competitive Edge'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            A Competitive Edge
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Incredible digital experiences are more than just technical achievements. They are strategic
                            assets that help you better understand and meet your customers’ needs, build trust with
                            investors, and differentiate your brand in a competitive market. By delivering seamless,
                            engaging, and reliable digital solutions, you position your business to drive growth, foster
                            loyalty, and outperform competitors consistently.
                        </p>
                    </div>
                    <div id={'lower-cost'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/test.svg' : '/assets/webd/icon2/test1.svg'}
                            alt={'Lower Costs'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Lower Costs
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We apply our expertise to identify efficiencies not only in the development process but also
                            in how your website or application performs for your users. By streamlining functionality,
                            optimising user flows, and reducing unnecessary complexity, we help you deliver a better
                            experience while keeping development and operational costs under control.
                        </p>
                    </div>
                    <div id={'constant-improvement'}>
                        <Image
                            src={isDayTime ? '/assets/webd/icon2/fast.svg' : '/assets/webd/icon2/fast1.svg'}
                            alt={'Constant Improvement'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Constant Improvement
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Launch is only the beginning. We partner with you long-term to continuously enhance your
                            website or application—adding new features, improving performance, and ensuring it evolves
                            in step with your business goals and customer needs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bespoke Web Development */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[6em] md:my-[6em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-[6em] md:pb-[6em] pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Tailored Web Solutions, <br className={'lg:block md:block hidden'}/>Delivered Smartly
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.9em] md:pb-[0.9em] lg:mb-[0.7em] md:mb-[0.7em] leading-[1.1] pb-6'>
                            Bespoke Web Development
                        </h3>
                        <p className={' font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'}>
                            Our dedicated team of skilled web developers works closely with you to create transformative
                            digital solutions tailored to your unique business needs. Whether it’s designing compelling,
                            user-friendly websites or building complex, custom web applications, we bring deep technical
                            expertise and strategic insight to every project. We focus on delivering high-quality,
                            scalable, and reliable solutions that drive growth, enhance user engagement, and provide a
                            competitive edge in your market. Partnering with us means more than just development — it’s
                            a commitment to your long-term digital success.</p>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    <span className={'font-[500]'}>Leveraging what already works:</span><br/>Our
                                    pragmatic approach means we prioritize
                                    proven, reliable platforms and technologies when developing your solution. By
                                    building on what already works, we minimize risks and avoid unnecessary reinvention,
                                    enabling us to focus on adding real value and custom features that matter most to
                                    your business. This strategy helps us deliver projects on time and within budget,
                                    without compromising on quality or performance—ensuring your investment drives
                                    tangible results from day one.
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span className={'font-[500]'}>Evolving your web presence:</span><br/>
                                    We analyze your existing digital assets to identify opportunities for
                                    improvement—whether that’s optimizing page load speeds, enhancing SEO performance,
                                    or adding new features that increase user engagement. Our goal is to help your web
                                    presence grow stronger, more efficient, and better aligned with your business
                                    objectives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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
                className={`relative -mt-20 py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
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

            {/* Stages of Our Development Process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Stages of Our Development process */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[3.2em] lg:text-[3.2em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Stages of Our <br className={'lg:block md:block hidden'}/>Development Process
                            </h2>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>We’re a
                                trusted <Link
                                    href='/services/Web-Design'
                                    className='border-b-[1px] border-gray-300 hover:border-gray-600'>
                                    web design</Link> and development company—an experienced agency you can rely on to
                                bring your project to life with creativity, technical excellence, and accountability.
                            </p>
                        </div>
                    </div>

                    {/* X-Scroll */}
                    <section ref={targetRef} className="h-[200vh]">
                        <div
                            className="sticky top-52 flex h-[60vh] w-full max-w-full items-center overflow-hidden">
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
                                                We&#39;re Experienced
                                            </>
                                        ),
                                        description: (
                                            <>
                                                When it comes to digital, we’ve seen—and delivered—it all. No matter the
                                                size or complexity of your project, we draw on years of experience
                                                across industries to bring a blend of creativity, technical expertise,
                                                and strategic clarity. Every solution we build benefits from the lessons
                                                we’ve learned, the challenges we’ve overcome, and the insight we’ve
                                                gained—ensuring smart, effective results from day one.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: (
                                            <>
                                                We&#39;re Proactive
                                            </>
                                        ),
                                        description: (
                                            <>
                                                You can rely on us to deliver more than expected. We go beyond the
                                                brief—anticipating needs before they&#39;re voiced, identifying
                                                potential
                                                challenges early, and proactively uncovering opportunities to improve
                                                your product. Our goal is to be a true partner, not just a service
                                                provider—committed to adding value at every stage.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: (
                                            <>
                                                We&#39;re Collaborative
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We’re passionate about technology, but at our core, we’re people-first.
                                                For us, collaboration means more than just being easy to work with—it’s
                                                about building real partnerships. We share your energy, your ambition,
                                                and your drive to create something truly exceptional. Together, we turn
                                                ideas into impactful digital experiences.
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
                                                When you invest in us, we invest fully in you. We treat every project
                                                like it’s our own—bringing a deep sense of ownership, accountability,
                                                and pride to everything we build. You’ll see it in our refusal to cut
                                                corners, our commitment to excellence, and our determination to deliver
                                                results that exceed expectations.
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

            <div
                className={'relative lg:-mt-[10.5em] max-w-full w-full h-auto  bg-gray-300/10'}>
                <Image
                    src={'/assets/webd/thumb.jpg'}
                    alt={'last image'}
                    width={1536}
                    height={864}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>

            {/* Why Grey InfoTech dark theme */}
            <div className={`relative lg:-mt-20 py-36 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-20 mb-12`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:max-w-[90em] mx-auto px-4 sm:px-6 lg:px-[4.6em] border-b-[0.001em] pb-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] tracking-tight leading-[1.2] lg:pb-6 rounded-none'>
                            Why Grey InfoTech <br className={'lg:block md:block hidden'}/>For Your App Project
                        </h2>
                    </div>
                    <div className='lg:-ml-[7em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            Benefit from the expertise of a web development agency that goes beyond the basics. We don’t
                            just build functional websites—we create digital products that engage users, elevate your
                            brand, and drive measurable results.
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
                    {/* Right Section */}
                    <div className='lg:mt-[3em] h-[30vh] sticky'>
                        <Image
                            src={'/assets/startup/mockup.jpg'}
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

            {/* FAQ section */}
            <div id={'FAQ'} className={`relative lg:py-36 mb-28 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3.2em] md:text-[3.2em] sm:text-[1.5em] text-[1em] font-[500] leading-[1.2] tracking-tight mb-6'>
                            Web Development <br className={'lg:block md:block hidden'}/>FAQs
                        </h2>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>We’re a
                            development company you can trust with your project.</p>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What kind of web development projects do you do?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                From eCommerce platforms and CMS development to custom feature builds and third-party
                                integrations—when it comes to web development, chances are we’ve done it.<br/><br/>
                                With experience across hundreds of projects, we’ve delivered everything from simple
                                one-page WordPress sites to complex, large-scale eCommerce platforms for well-known
                                brands. What sets us apart is our ability to take proven, reliable technologies and
                                apply them creatively to deliver digital products that are not only robust and scalable,
                                but truly impactful for your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you develop mobile apps?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, we do. We develop high-quality mobile applications for
                                both <Link href={'/pages/services/ios-development.tsx'}
                                           className={`border-b pb-[0.05em] ${
                                               isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                           }`}>iOS</Link> and Android,
                                complete with the robust back-end systems and APIs needed to deliver seamless
                                functionality. From initial planning and UI/UX design to full-stack development and
                                deployment, we manage the entire process in-house. Whether you’re building a standalone
                                app or extending an existing platform, we create fast, scalable, and user-friendly
                                solutions tailored to your business needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What tech should my website or app be built on?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                While some developers push their favourite tools, we believe that’s putting technology
                                before purpose. There’s no single “right” tech—only the right tech for your unique
                                goals. That’s why we take the time to understand your current stack, your long-term
                                vision, and the features that matter most to your users. From there, we recommend the
                                most efficient and scalable solution to bring your product to life—balancing
                                performance, maintainability, and future growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What does your web development process look like?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Every successful project begins with a
                                thorough <Link href={'/pages/services/discovery-phase.tsx'}
                                               className={`border-b pb-[0.05em] ${
                                                   isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                               }`}>discovery phase</Link>—where we collaborate
                                with you to clarify your vision, define project scope, and establish clear, measurable
                                goals. This foundational step ensures alignment and sets the stage for a smooth
                                development journey. From there, we guide you through an iterative process of building,
                                sharing, and refining your product, keeping you engaged and informed at every milestone.
                                Our approach prioritizes transparency and collaboration, so your feedback shapes the
                                outcome and your product evolves to meet real-world needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Does web development affect SEO?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.2em] text-[1em] text-gray-600`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Web development and search engine performance are closely intertwined, especially as
                                Google places increasing importance on page loading speed. Today, the speed and
                                responsiveness of your website or application directly influence not only user
                                experience but also your visibility in search results. A fast, well-optimized site helps
                                attract and retain visitors, improves engagement, and ultimately drives more traffic and
                                conversions. Investing in performance is no longer optional—it’s essential for staying
                                competitive and discoverable in the digital landscape.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default WebDevelopment;