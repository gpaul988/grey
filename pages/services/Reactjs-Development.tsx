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
        name: "Sylvia Essien ",
        title: "COO, FinPlus Capital ",
        message: (
            <>
                We needed a scalable and modern front-end for our fleet management dashboard, and Grey InfoTech
                delivered beyond expectations. Their React.js team built a sleek, performance-optimized interface that
                our clients love. We’re thrilled with the results and look forward to future collaborations.
            </>
        ),
    },
    {
        name: "Tunde Balogun",
        title: "Founder & CEO, EduTrack Africa",
        message: (
            <>
                Partnering with Grey InfoTech for our React.js front-end was one of the best decisions we made. Their
                developers created a fast, responsive, and intuitive user experience that helped us grow our student
                engagement by over 60%. Their professionalism and commitment were exceptional.
            </>
        )
    },
    {
        name: "Adaeze Nwosu",
        title: "Chief Product Officer, HealthNet Systems",
        message: (
            <>
                Grey InfoTech brought our vision to life with a beautifully crafted, user-friendly interface built on
                React.js. Their team was efficient, communicative, and deeply knowledgeable. Our platform now delivers a
                seamless experience to thousands of patients and healthcare providers daily.
            </>
        )
    }
];

const ReactjsDevelopment = () => {
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
            "UII",
            "CD",
            "MU",
            "SPA",
            "FSD",
            "AI",
            "PO",
            "SR",
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
                    React.js <br className={'lg:block md:block hidden'}/>Development <br
                    className={'lg:block md:block hidden'}/>Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Grey InfoTech is a React.js web development agency serving clients in Port Harcourt and across
                    Nigeria, delivering <br className={'lg:block md:block hidden'}/>high-performance web applications
                    tailored to
                    business needs.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/react/hero.jpg'}
                        alt={'React.js Development Hero'}
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
                            Your partner for cutting-<br className={'lg:block md:block hidden'}/>edge React.js
                            applications
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            React.js Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we deliver React.js development services that help businesses
                                    build fast, scalable, and modern applications. React is our go-to framework for
                                    creating responsive user interfaces across web and mobile platforms. Whether you’re
                                    launching a new digital product or upgrading an existing platform, we tailor each
                                    solution to your specific business needs, ensuring long-term value and
                                    growth.<br/><br/>
                                    Our approach is rooted in a component-based architecture, allowing us to build
                                    modular, reusable UI elements that speed up development and simplify maintenance.
                                    This leads to faster rollouts, consistent design, and reduced development costs over
                                    time—key advantages for businesses looking to scale efficiently. React is especially
                                    effective for building single-page applications, dynamic interfaces, and branded
                                    websites that perform under pressure.
                                </p>
                            </div>
                            <div>
                                <p>
                                    We handle everything from UI design and front-end architecture to API integration,
                                    performance optimisation, and quality testing. Whether your React app needs to
                                    connect with a CMS, integrate with back-end services, or manage real-time data, our
                                    team ensures seamless execution and reliable performance. We follow industry best
                                    practices around testing, security, and scalability to future-proof your
                                    application.
                                    <br/><br/>
                                    With Grey InfoTech as your development partner, you gain more than just technical
                                    expertise—you gain a strategic ally. We bring deep cross-industry experience, from
                                    fintech to healthcare, and work closely with your team to align the solution with
                                    your business goals. Let’s build a React.js application that elevates your customer
                                    experience and drives measurable business outcomes.
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
                            src={'/assets/react/1.jpg'}
                            alt={'Garden'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/react/2.jpg'}
                            alt={'home'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/react/3.jpg'}
                            alt={'ecommerce'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/react/4.png'}
                            alt={'sales'}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* Our React Development Service */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                Our React.js <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div className={'lg:-ml-[4em] md:-ml-[4em]'}>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                Our React.js development services are designed to modernize legacy applications by
                                transforming outdated user interfaces through a component-based architecture. As a
                                full-service React.js development company, we handle everything from concept and design
                                to deployment and long-term maintenance—delivering scalable, high-performance, and
                                user-friendly applications. Let’s build something exceptional together.
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
                                    {id: "02", title: "User Interface Implementation", target: "UII"},
                                    {id: "03", title: "Component Development", target: "CD"},
                                    {id: "04", title: "Migration & Upgrades", target: "MU"},
                                    {id: "05", title: "Single Page Applications (SPAs)", target: "SPA"},
                                    {id: "06", title: "Full-Stack Development", target: "FSD"},
                                    {id: "07", title: "API Integration", target: "AI"},
                                    {id: "08", title: "Performance Optimisation", target: "PO"},
                                    {id: "09", title: "Server-Side Rendering", target: "SR"},
                                    {id: "10", title: "Testing & Quality Assurance", target: "TQA"},
                                    {id: "11", title: "Maintenance & Support", target: "MS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[8em] md:mb-[8em]'}>
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
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailored solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Adaptable applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>React development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Whether you need a real-time data dashboard, a secure collaboration tool, or a
                                        dynamic user interface, our React.js solutions are tailored to your business
                                        objectives. We begin with a thorough discovery process to understand your
                                        workflows, user expectations, and industry-specific requirements. This ensures
                                        we deliver purpose-built applications that are not only intuitive and scalable
                                        but also aligned with your strategic goals. From fintech and logistics to
                                        healthcare and e-commerce, we develop adaptable React.js solutions that create
                                        measurable impact and long-term value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'UII'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        User Interface Implementation
                                    </h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        React.js is the go-to library for building highly interactive and efficient user
                                        interfaces. Unlike
                                        native <Link href={'/pages/services/Javascript.tsx'}
                                                     className={`border-b pb-[0.02em] ${
                                                         isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                     }`}>JavaScript</Link>, which re-renders the entire page on
                                        updates, React uses a virtual DOM to intelligently update only the components
                                        that need changes. This results in faster performance, smoother user
                                        experiences, and better resource efficiency. Its modular architecture and
                                        reusable components make it an ideal choice for developing complex,
                                        enterprise-grade applications with scalability and maintainability in mind.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Component Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom libraries</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reusable design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Brand specific design</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We develop custom <Link href={'/pages/services/ui-ux-design.tsx'}
                                                                className={`border-b pb-[0.02em] ${
                                                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                }`}>UI</Link> components and reusable design libraries
                                        tailored to your brand, ensuring both visual consistency and development
                                        efficiency. By standardizing core interface elements, we accelerate future
                                        feature rollouts, reduce technical debt, and maintain a cohesive user experience
                                        across your digital products. This approach not only supports scalability but
                                        also aligns your frontend architecture with long-term product goals.
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
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>React migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Future proofing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless transitions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our React development team specializes in modernizing legacy applications by
                                        transitioning them to the React.js ecosystem or upgrading them with the latest
                                        React features. This transformation enhances performance, improves
                                        maintainability, and ensures compatibility with modern web standards. By
                                        aligning your applications with current technologies, we future-proof your
                                        digital infrastructure and prepare your business to meet evolving user
                                        expectations and industry demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SPA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Single Page Applications (SPAs)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Responsive apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We build intuitive and responsive single-page applications (SPAs) using
                                        React.js, delivering seamless user experiences through dynamic, real-time
                                        interfaces. By minimizing page reloads and optimizing performance with React’s
                                        efficient rendering, our SPAs enhance user engagement and drive higher
                                        retention—ideal for businesses aiming to provide fast, fluid, and modern web
                                        interactions.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FSD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Full-Stack Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integrated solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We integrate React.js with robust backend technologies to develop comprehensive,
                                        feature-rich applications. This full-stack approach ensures not only sleek and
                                        responsive user interfaces but also efficient data handling, scalability, and
                                        secure operations—delivering a cohesive digital solution aligned with your
                                        business goals.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>API Integration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Extended capabilities</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>React functionality</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We integrate APIs and third-party services into your React.js applications to
                                        extend core functionality and enable smooth interactions with external
                                        platforms—whether it&#39;s payment gateways, CRM systems, analytics tools, or
                                        cloud
                                        services. This ensures your app delivers a connected, scalable, and efficient
                                        user experience.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Performance Optimisation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Faster load times</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Optimised apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our developers optimise React.js applications to effectively handle high traffic
                                        volumes and complex content structures. Through performance tuning, code
                                        splitting, lazy loading, and other advanced techniques, we reduce load times and
                                        boost responsiveness—delivering a smoother user experience that scales with your
                                        business demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>09/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Server-Side Rendering</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Improved discoverability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Accessible apps</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Using server-side rendering (SSR), we enhance
                                        both <Link href={'/pages/services/seo.tsx'}
                                                   className={`border-b pb-[0.02em] ${
                                                       isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                   }`}>SEO</Link> and performance by
                                        pre-rendering pages on the server before delivering them to the browser. This
                                        results in faster initial load times and greater visibility in search engine
                                        rankings—making your React.js application not only more discoverable but also
                                        more accessible to a broader audience.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>10/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'TQA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Testing & Quality Assurance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>React.js testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reliable apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bug free solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We rigorously test every React.js application to ensure it performs reliably
                                        under real-world conditions. Our comprehensive quality assurance process
                                        includes unit testing, integration testing, and performance benchmarking,
                                        ensuring each feature functions as intended and meets both user expectations and
                                        industry standards. The result is a stable, error-free application built for
                                        long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>11/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Maintenance & Support</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>React.js maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Secure apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Continuous improvements</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our ongoing maintenance and support services ensure your React.js applications
                                        remain secure, current, and fully optimized. From implementing the latest
                                        updates and patching vulnerabilities to accommodating new features or a
                                        full-scale rebrand, we provide proactive assistance to keep your application
                                        aligned with your business goals—ensuring performance, security, and user
                                        satisfaction never falter.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[15em] md:-mt-[15em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/react/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why React.js */}
            <div
                className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                <div className=''>
                    <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                        Building fast, interactive <br className={'lg:block md:block hidden'}/>user experiences
                    </h6>
                </div>
                <div className='lg:-ml-[19em]'>
                    <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                        Why React.js?
                    </h3>
                    <div
                        className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                        <div>
                            <p>
                                <Link href={'https://www.react.dev'}
                                      className={`border-b pb-[0.02em] ${
                                          isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                      }`}>React.js</Link> is a free, open-source JavaScript library developed by Meta
                                (formerly Facebook) in 2013 to build fast, dynamic, and highly interactive user
                                interfaces. Designed for creating both single-page applications (SPAs) and native mobile
                                apps, React powers the “view” layer of an application—essentially what users interact
                                with. Its component-based architecture allows developers to break interfaces down into
                                reusable modules, making applications easier to scale, maintain, and debug. For example,
                                treating a website’s header, navigation bar, and content section as independent
                                components enhances development efficiency and consistency.
                            </p>
                        </div>
                        <div>
                            <p>
                                Trusted by global leaders like Facebook, Instagram, WhatsApp, Netflix, and Airbnb, React
                                has become the preferred choice for building modern applications due to its agility,
                                performance, and flexibility. Its virtual DOM efficiently manages UI updates, ensuring
                                seamless experiences even with dynamic and content-heavy applications. At Grey InfoTech,
                                we frequently recommend React for projects that demand speed, scalability, and a
                                high-quality user experience. Whether you&#39;re building a new platform or modernising
                                an existing one, React offers the adaptability and performance today’s digital products
                                require.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* React.js Benefits */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                                React.js Benefits
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[1.2em] md:-ml-[1.2em]'>
                                A custom React web application delivers the reliability of traditional software with the
                                speed and flexibility modern businesses demand. It’s cost-effective, scalable, and built
                                to adapt as your needs grow. Grey InfoTech has delivered seamless, high-impact solutions
                                across diverse industries with a focus on speed, quality, and ease of use.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/rc.svg' : '/assets/react/icon/rc1.svg'}
                                alt='Reusable Components'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                                reusable components
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                React’s reusable components streamline development by leveraging modular building blocks
                                with defined functionality, allowing teams to build complex, consistent user interfaces
                                quickly and efficiently. This component-based architecture not only accelerates
                                development but also simplifies maintenance, ensures design consistency, and supports
                                scalable growth—making it an ideal solution for modern web applications across
                                industries.
                            </p>
                        </div>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/wap.svg' : '/assets/react/icon/wap1.svg'}
                                alt='Web Application Development'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='capitalize leading-[1.2] text-[1.5em] font-[600] mb-2'>
                                web application <br className={'lg:block md:block hidden'}/>development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                At Grey InfoTech, we build fast, modern web applications using React, combining
                                efficiency, scalability, and a smooth user experience. With reusable components and a
                                modular approach, we ensure consistent, high-quality interfaces. For
                                mobile, <Link href={'/pages/services/React-Native-Development.tsx'}
                                              className={`border-b pb-[0.02em] ${
                                                  isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                              }`}>React Native</Link> lets us deliver visually rich, high-performance
                                apps on Android and <Link href={'/pages/services/ios-development.tsx'}
                                                          className={`border-b pb-[0.02em] ${
                                                              isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                          }`}>iOS</Link> from a
                                single codebase—streamlining development for businesses across all industries.
                            </p>
                        </div>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/ip.svg' : '/assets/react/icon/ip1.svg'}
                                alt='Improved Performance'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                                Improved Performance
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                React’s virtual DOM leverages a diffing algorithm to efficiently update only the changed
                                elements in the real DOM, minimizing costly re-renders and improving application
                                responsiveness. This optimized rendering process accelerates performance, reduces
                                development complexity, and enables businesses to deploy scalable, high-performance web
                                applications that enhance user engagement and drive operational efficiency.
                            </p>
                        </div>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/sf.svg' : '/assets/react/icon/sf1.svg'}
                                alt='SEO-Friendly'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='text-[1.5em] font-[600] mb-2'>
                                SEO-Friendly
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                React’s server-side rendering capability allows content to be delivered similarly to
                                traditional web pages, significantly improving search engine indexing and visibility.
                                When combined with our specialized content optimization strategies, this ensures your
                                application remains highly accessible, achieves competitive search rankings, and
                                attracts increased organic traffic—supporting business growth across diverse industries.
                            </p>
                        </div>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/sdm.svg' : '/assets/react/icon/sdm1.svg'}
                                alt='Streamlined Data Management'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                                streamlined data <br className={'lg:block md:block hidden'}/>management
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                React’s unidirectional data flow enables efficient debugging and ensures predictable,
                                consistent data management throughout the application. By maintaining a clear and
                                structured flow of information between components, it minimizes the risk of errors,
                                reduces ongoing maintenance costs, and supports the development of scalable, easily
                                maintainable applications. This approach helps businesses across industries deliver
                                reliable software solutions that remain manageable as they grow and evolve.
                            </p>
                        </div>
                        <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <Image
                                src={isDayTime ? '/assets/react/icon/sc.svg' : '/assets/react/icon/sc1.svg'}
                                alt='Strong Community'
                                width={60}
                                height={60}
                                className='mb-2'
                            />
                            <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                                strong community
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                React is backed by a large and active community, complemented by a robust ecosystem of
                                tools and libraries. This strong foundation guarantees continuous innovation, regular
                                updates, and swift access to essential resources. As a result, businesses across all
                                sectors can accelerate their development processes, reduce time-to-market, and deliver
                                innovative, high-quality solutions that meet evolving market demands.
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
                            Digital Products<br className={'lg:block md:block hidden'}/>Suited To React.js
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            React.js serves as a versatile and powerful tool in digital product development. Its
                            flexibility, performance optimization, and ability to manage complex user interfaces make it
                            a preferred solution across a wide range of industries.
                        </p>
                    </div>
                </div>

                {/* Complex Web Applications */}
                <div id={'CWA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            complex web <br className={'lg:block md:block hidden'}/>applications
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.4em] md:pl-[18em] md:-mt-[3.4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/cwa.jpg'
                                alt='Complex Web Application'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            When building a dynamic and sophisticated application, React’s component-based architecture
                            enables the creation of reusable UI elements—streamlining development and ensuring
                            scalability. This approach is ideal for applications requiring sleek, modern interfaces and
                            the ability to handle frequently changing content efficiently.
                        </p>
                    </div>
                </div>

                {/* Single Page Application (SPAs) */}
                <div id={'SPA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Single Page <br className={'lg:block md:block hidden'}/>Applications (SPAs)
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/spa.jpg'
                                alt='Single Page Applications'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            React delivers seamless user experiences by intelligently updating only the necessary parts
                            of a page without requiring a full reload. This results in faster content transitions and
                            highly responsive applications—providing users with a smooth, uninterrupted experience that
                            enhances engagement and satisfaction.
                        </p>
                    </div>
                </div>

                {/* Data Dashboards and Analytics Tools */}
                <div id={'DDAT'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Data Dashboard <br className={'lg:block md:block hidden'}/>& Analytics Tools
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/ddat.jpg'
                                alt='Data Dashboard and Analytics Tools'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            React is well-suited for applications that manage large volumes of data, making it an
                            excellent choice for building responsive dashboards and real-time analytics tools. Its
                            efficient rendering and ability to handle complex data representations enable smooth,
                            intuitive data analysis—supporting smarter, faster decision-making across various business
                            functions.
                        </p>
                    </div>
                </div>

                {/* Content Publishing Platforms */}
                <div id={'CPP'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Content Publishing <br className={'lg:block md:block hidden'}/>Platforms
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/cpp.jpg'
                                alt='Content Publishing Platforms'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Managing large volumes of content can quickly become complex, but React’s robust state
                            management and efficient data handling streamline the process. It enables swift, accurate
                            updates without disrupting the user interface, ensuring a seamless and consistent user
                            experience—even as content scales.
                        </p>
                    </div>
                </div>

                {/* Collaboration Tools */}
                <div id={'CT'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Collaboration Tools
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.5em] md:pl-[18em] md:-mt-[3.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/ct.jpg'
                                alt='Collaboration Tools'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            React enables real-time collaboration in applications such as messaging platforms and
                            multi-user interaction tools. Its ability to manage concurrent updates and support live
                            communication ensures users stay synchronized across time zones—making it ideal for globally
                            distributed teams and interactive, time-sensitive solutions.
                        </p>
                    </div>
                </div>

                {/* e-Commerce Platforms */}
                <div id={'ECP'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            e-Commerce <br className={'lg:block md:block hidden'}/>Platforms
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.2em] md:pl-[18em] md:-mt-[3.2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/ecp.jpg'
                                alt='e-Commerce Platforms'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            React brings the ease of in-store shopping to the digital space by enabling seamless,
                            real-time updates and intuitive navigation through product categories. This ensures a smooth
                            and engaging user experience, enhancing customer satisfaction and driving higher conversion
                            rates in online retail environments.
                        </p>
                    </div>
                </div>

                {/* Social Media Platforms */}
                <div id={'SMP'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Social Media <br className={'lg:block md:block hidden'}/>Platforms
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/react/smp.jpg'
                                alt='Docial Media Platforms'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            React’s capability to efficiently manage frequent updates and dynamic content without
                            compromising performance makes it an ideal choice for social media and other interactive
                            platforms. It supports real-time user interactions and seamless content updates, ensuring a
                            smooth, engaging, and scalable user experience.
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
                            At Grey InfoTech, React.js development is a collaborative effort driven by a skilled team
                            working in alignment with your business goals. Each project is led by a dedicated project
                            manager who ensures clear communication and smooth execution from start to finish. Our
                            React.js developers focus on building dynamic, component-based user interfaces that are
                            responsive, scalable, and optimized for performance. UI/UX designers craft intuitive user
                            experiences, while QA engineers rigorously test each component to ensure the application is
                            stable, user-friendly, and bug-free.<br/><br/>
                            To support seamless deployment and performance, our DevOps engineers manage hosting
                            environments, automate build processes, and ensure continuous integration. Throughout the
                            process, your input as the client is central—we keep you informed, involved, and in control,
                            while taking the complexity off your plate. This integrated team approach ensures the end
                            product delivers both technical excellence and real business value.
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

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/react/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={1038}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
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
                            Frequently Asked <br className={'lg:block md:block hidden'}/>React.js Questions
                        </h2>
                        <p className={'font-[300] text-[0.87em] leading-[1.2] '}>
                            We believe React.js is one of the most effective and reliable frameworks for modern
                            <br className={'lg:block md:block hidden'}/>application development. But don’t just take our
                            word for
                            it—allow us to address some <br className={'lg:block md:block hidden'}/>of the most
                            frequently asked
                            questions to help you understand why React.js could be the <br
                            className={'lg:block md:block hidden'}/>ideal choice for your project.
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
                            <span>What is React.js and why use it?</span>
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
                                React.js is a leading JavaScript library used for building modern, high-performing user
                                interfaces. Its component-based architecture allows developers to create modular,
                                reusable UI elements, significantly improving development speed and consistency. This
                                approach not only streamlines the coding process but also simplifies long-term
                                maintenance and scalability. React’s efficient rendering engine ensures optimal
                                performance, even in complex and data-intensive applications. These capabilities make it
                                a strategic choice for businesses seeking to develop robust, scalable, and user-friendly
                                digital products that can adapt quickly to evolving market demands.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the key benefits of using React?</span>
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
                                The key advantages of using React include its component-based architecture, which
                                promotes code reusability and accelerates development timelines. Its virtual DOM
                                enhances performance by efficiently updating only necessary elements, while
                                unidirectional data flow ensures predictable and maintainable application behavior.
                                Additionally, React benefits from a vast ecosystem and an active community, providing
                                businesses with access to a wealth of tools, resources, and continuous innovation—making
                                it a reliable foundation for scalable, high-quality digital solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does React differ from other Javascript frameworks?</span>
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
                                React distinguishes itself through a combination of powerful features that enhance both
                                development efficiency and application performance. Its use of a virtual DOM enables
                                fast and responsive user interfaces by updating only the necessary components. The
                                component-based structure encourages the creation of reusable UI elements, promoting
                                consistency and reducing development time. React’s one-way data flow ensures predictable
                                application behavior, simplifying debugging and maintenance. Moreover, its declarative
                                programming style allows developers to focus on defining what the UI should look like,
                                rather than how to implement every detail—resulting in cleaner, more maintainable code
                                and a streamlined development process.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does React handle data management?</span>
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
                                In React, data flows in a single direction—from parent components to their child
                                components—ensuring a clear and predictable structure for managing application state.
                                When a parent component’s state changes, those updates are seamlessly propagated to its
                                children, maintaining consistency throughout the user interface. For applications
                                requiring more advanced state management, tools such as Redux can be integrated to
                                handle complex state logic, enabling better control, scalability, and maintainability in
                                larger or data-intensive projects.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is React suitable for SEO-friendly applications?</span>
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
                                Yes, React can be utilized on the server side to render the initial view of an
                                application—a technique known as server-side rendering (SSR). This approach
                                significantly enhances search engine visibility by delivering fully-rendered HTML
                                content that can be easily indexed by search engines. By improving SEO performance and
                                reducing initial load times, SSR ensures that applications are both discoverable and
                                fast, which is especially beneficial for businesses looking to maximize their digital
                                reach and user engagement from the outset.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How much does it cost to develop a React app?</span>
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
                                The cost of developing a React application can vary widely based on factors such as
                                project complexity, required features, third-party integrations, and overall scope.
                                However, React’s efficient development model—featuring reusable components and faster
                                iteration—often results in a more cost-effective solution compared to other frameworks.
                                For an accurate estimate tailored to your goals, feel free to reach out for a
                                no-obligation conversation. We’ll help you determine the most practical and
                                budget-friendly approach for your needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to develop a custom React solution?</span>
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
                                The timeline for developing a custom React application depends on the scope, complexity,
                                and specific requirements of your project. Smaller applications with standard features
                                can be delivered relatively quickly, while more complex solutions may take longer to
                                design, develop, and test thoroughly. Once we understand your goals and needs in more
                                detail, we’ll provide a clear and realistic timeline tailored to your project. Just
                                reach out for a quick, no-pressure consultation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the difference between React.JS and React Native?</span>
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
                                Both React.js and React Native were developed by Meta (formerly Facebook) and share core
                                principles, but they serve distinct purposes. React.js is a JavaScript library designed
                                for building dynamic, high-performance web applications. In contrast, React Native
                                leverages React principles to develop mobile applications with a native look and feel,
                                enabling cross-platform development for iOS and Android using JavaScript. Choosing
                                between them depends on whether your project targets web or mobile platforms.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ReactjsDevelopment;