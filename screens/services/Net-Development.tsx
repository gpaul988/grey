'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

const NetDevelopment = () => {
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
            "NAD",
            "NI",
            "NMS",
            "NM",
            "NMD",
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
                    .NET Development <br className={'lg:block md:block hidden'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    We combine deep technical expertise with the strength of the .NET ecosystem to create powerful
                    business applications that perform, grow, and last.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/net/hero.jpg'}
                        alt={'.Net Development Hero'}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Your partner for <br className={'lg:block md:block hidden'}/>scalable .Net expertise
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            .NET Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, our .NET development services are designed to help businesses
                                    build reliable, scalable, and high-performing digital solutions. Whether you’re
                                    looking to create an enterprise-grade software system, a SaaS platform, or a
                                    versatile mobile or desktop application, our experienced team leverages the full
                                    capabilities of the Microsoft-optimised .NET framework to deliver tailored results.
                                    With .NET, we streamline business process automation, enable seamless system
                                    integration, and enhance existing products with advanced features—all while ensuring
                                    long-term scalability and performance.
                                </p>
                            </div>
                            <div>
                                <p>
                                    What sets .NET apart is its flexibility across different application types. It
                                    allows us to build everything from rich, interactive web apps and cloud-native
                                    services to powerful desktop tools like video editing software, accounting
                                    platforms, and communication systems. At Grey InfoTech, .NET is one of our go-to
                                    technologies for creating future-ready digital experiences that grow with your
                                    business and adapt to evolving user needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em]  mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                        <div className={'h-auto w-full max-w-full'}>
                            <Image
                                src={'/assets/net/4.jpg'}
                                alt={'home'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/net/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/net/1.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/net/2.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our .NET development services */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'node-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.1em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                Our .NET Our <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                Let us drive your digital success. As a .NET development company, we offer custom
                                application development, system integration, legacy modernisation or migration, and
                                ongoing support—ensuring your solutions are secure, scalable, and built to last.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                What We Do
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: ".NET Application Development", target: "NAD"},
                                    {id: "02", title: ".NET Integration", target: "NI"},
                                    {id: "03", title: ".NET Maintenance & Support", target: "NMS"},
                                    {id: "04", title: ".NET Migration", target: "NM"},
                                    {id: "05", title: ".NET Modernisation", target: "NMD"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[19em] md:mb-[19em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        .NET Application Development
                                    </h2>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Ready to transform your digital operations? We specialise in designing and
                                        developing custom .NET applications that are purpose-built to meet your business
                                        objectives, streamline workflows, and support long-term growth. Our solutions
                                        combine exclusive features with robust architecture to enhance productivity,
                                        improve operational efficiency, and deliver seamless user experiences. From
                                        requirements analysis and system architecture to development, deployment, and
                                        post-launch support, we manage the entire lifecycle with a focus on performance,
                                        security, and scalability. Whether you need a standalone application, a scalable
                                        enterprise solution, or a fully integrated platform, our .NET expertise ensures
                                        measurable business impact and lasting value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        .NET Integration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data Flow</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We connect your .NET applications with essential business systems such as CRMs,
                                        ERPs, and third-party platforms to create a unified digital ecosystem that
                                        drives efficiency and reduces operational friction. By enabling seamless,
                                        real-time data exchange across departments and tools, we help eliminate manual
                                        workflows, improve data accuracy, and support faster, more informed
                                        decision-making. Our integration solutions are designed for reliability,
                                        scalability, and performance—ensuring your systems work together smoothly and
                                        can adapt to future business needs without disruption. With our technical
                                        expertise, you gain a streamlined infrastructure that enhances productivity and
                                        delivers measurable business value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        .NET Maintenance & Support
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Secure Applications</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our ongoing support services provide consistent value through proactive
                                        monitoring, timely updates, and advanced security enhancements—ensuring your
                                        .NET applications remain secure, high-performing, and aligned with your evolving
                                        business requirements. We focus on minimising downtime, addressing issues before
                                        they impact users, and continuously optimising your systems to support long-term
                                        stability, scalability, and growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        .NET Migration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Framework</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Transition</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We simplify the transition to the latest .NET framework by managing every aspect
                                        of the upgrade with minimal disruption to your operations. Our experienced team
                                        thoroughly reviews and updates your existing codebase, refines documentation,
                                        and enhances features to improve performance, security, and maintainability.
                                        This comprehensive process ensures your applications leverage the latest
                                        framework capabilities, providing greater stability and scalability. Beyond the
                                        upgrade, we offer ongoing support and maintenance services to address any issues
                                        promptly, optimise system performance, and align your solutions with evolving
                                        business needs—helping you maximise your technology investment and maintain a
                                        competitive edge over time.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NMD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        .NET Modernisation
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Revamping your legacy systems involves modernising their architecture to deliver
                                        enhanced performance, robust security, and seamless mobile compatibility,
                                        addressing today’s business and user demands. By updating outdated components
                                        and streamlining workflows, we help reduce ongoing maintenance costs while
                                        improving system reliability. Our approach incorporates modern development
                                        practices such as continuous integration and continuous delivery (CI/CD)
                                        alongside DevOps methodologies, enabling faster, more efficient release cycles
                                        and greater scalability. This transformation not only optimises your current
                                        applications but also positions your business for future growth and agility in
                                        an increasingly competitive digital landscape.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[27em] md:-mt-[27em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/net/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why .Net? */}
            <div className={`${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:pt-[6em] lg:pb-[6em] md:pt-[6em] md:pb-[6em] py-[1em] lg:gap-14 gap-6 pt-6 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Future-proof your <br className={'lg:block md:block hidden'}/>apps with .NET
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3em] text-[1.8em] font-[550] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why .NET?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Choosing .NET development brings several strategic advantages to your business. At
                                    its core, .NET offers a secure and stable framework that delivers robust, reliable
                                    web applications built to withstand evolving demands. Its cross-platform
                                    compatibility allows you to develop versatile applications that operate seamlessly
                                    across multiple devices and operating systems, enhancing user accessibility and
                                    engagement. This flexibility ensures your digital solutions can reach a wider
                                    audience while maintaining consistent performance and security standards.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Moreover, for organisations already invested in Microsoft technologies, .NET’s
                                    seamless integration with tools like Azure, Office 365, and Dynamics 365 facilitates
                                    streamlined workflows and efficient data management across your enterprise. This
                                    interoperability reduces operational complexity and drives greater productivity.
                                    Backed by a vibrant developer community, .NET benefits from continuous updates,
                                    patches, and feature enhancements—helping your applications stay current, secure,
                                    and competitive in a rapidly changing market. Together, these benefits make .NET a
                                    powerful choice for scalable, future-ready software development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* .NET development benefits */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'php benefit'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* .Net Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                .NET Development <br className={'lg:block md:block hidden'}/>Benefits
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                At Grey InfoTech, we drive digital success. Our developers collaborate closely with you
                                to build a custom .NET application, ensuring a reliable solution that grows with your
                                business. Feel free to explore our case studies to see our expertise in action.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div id={'business-oriented-development'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/risk.svg' : '/assets/net/icon/risk1.svg'}
                                alt={'Business-Oriented Development'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Business-Oriented <br className={'lg:block md:block hidden'}/>Development
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We tailor our .NET solutions to align precisely with your company’s strategic
                                objectives, focusing on seamless implementation, straightforward maintenance, and
                                maximizing your return on investment. Our developers continuously stay current with the
                                latest industry trends and best practices, ensuring your .NET applications remain
                                cutting-edge, efficient, and competitive in today’s fast-evolving digital landscape.
                            </p>
                        </div>
                        <div id={'dedicated-project-manager'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/sca.svg' : '/assets/net/icon/sca1.svg'}
                                alt={'Dedicated Project Manager'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Dedicated Project Manager
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Rest assured, your .NET project is in expert hands with a dedicated project manager who
                                will keep you informed at every stage. We prioritise clear communication and
                                collaboration, ensuring you stay engaged without overwhelming you with technical
                                details—making the process smooth and transparent from start to finish.
                            </p>
                        </div>
                        <div id={'consistent-communication'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/fast.svg' : '/assets/net/icon/fast1.svg'}
                                alt={'Consistent Communication'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Consistent communication
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We prioritise open and continuous communication throughout your app development journey,
                                ensuring you’re always informed and involved. Your feedback is highly valued and
                                actively incorporated at every stage to align the project with your vision. Using our
                                suite of communication tools, we make it easy for you to monitor progress and stay
                                connected—keeping the process transparent and collaborative from start to finish.
                            </p>
                        </div>
                        <div id={'data-security-confidentiality'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/att.svg' : '/assets/net/icon/att1.svg'}
                                alt={'Data Security & Confidentiality'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Data Security <br className={'lg:block md:block hidden'}/>& Confidentiality
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Protecting your privacy is our top priority. Before starting your project, we secure the
                                confidentiality of all shared information by signing a Non-Disclosure Agreement (NDA).
                                We implement strict measures to safeguard and secure your data throughout every stage of
                                the development process.
                            </p>
                        </div>
                        <div id={'thorough-testing'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/test.svg' : '/assets/net/icon/test1.svg'}
                                alt={'Thorough Testing'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Thorough Testing
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our comprehensive testing approach covers every aspect of your .NET application,
                                ensuring excellence in functionality, performance, security, and user experience. As a
                                full-service development company, our skilled developers use a combination of manual and
                                automated testing techniques to identify and resolve issues early, guaranteeing your
                                application meets rigorous industry standards and delivers reliable, high-quality
                                results.
                            </p>
                        </div>
                        <div id={'trusted-digital-partner'}>
                            <Image
                                src={isDayTime ? '/assets/net/icon/cust.svg' : '/assets/net/icon/cust1.svg'}
                                alt={'Trusted Digital Partner'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Trusted Digital Partner
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we strive to be your trusted digital partner and an extension of your
                                team. Our expert .NET engineers work closely with you throughout the development
                                process, maintaining transparency and open communication to ensure your vision is
                                realised every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div className={` ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'involved'}
                     className={`relative lg:pt-[7em] md:pt-[7em] pt-[2em] lg:pb-[7em] md:pb-[7em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                         isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 max-w-full mx-auto`}>
                        <div className={'lg:mr-[8em] md:mr-[8em] lg:mt-[2em] md:mt-[2em] '}>
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                                At Grey InfoTech, .NET development is driven by a dedicated team focused on delivering
                                scalable, secure, and high-performance business applications. A project manager
                                coordinates the process, ensuring clear communication, timely delivery, and alignment
                                with your strategic objectives. Our experienced .NET developers build robust backend
                                systems and integrate custom features tailored to your unique business needs, while
                                UI/UX designers create intuitive, user-friendly interfaces.<br/><br/>

                                Supporting the development team are quality assurance specialists who conduct thorough
                                testing to guarantee reliability and security. DevOps engineers manage deployment, cloud
                                integration, and ongoing maintenance to ensure optimal performance and scalability.
                                Throughout the project, your feedback is actively incorporated, ensuring the final
                                product delivers measurable value and supports your long-term business growth.
                            </p><br/>
                            <Link href='/company'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                    <span
                                        className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-800' : 'text-black group-hover:text-gray-300'}`}>About Us <span
                                        className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                                    <span
                                        className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
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



            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently asked <br className={'lg:block md:block hidden'}/>.NET questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            .NET is a powerful and flexible backend framework known for building secure, scalable<br
                            className={'lg:block md:block hidden'}/>
                            applications. Backed by Microsoft and widely used across industries, it’s a trusted <br
                            className={'lg:block md:block hidden'}/>choice
                            for creating high-performance software. Have questions? We’re here to help.
                        </p>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-100 text-gray-700 hover:text-black' : 'border-gray-400 text-gray-300 hover:text-white'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What are the advantages of using .NET for software development needs?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we position ourselves as your reliable digital partner—fully aligned
                                with your business goals and committed to delivering measurable value. Our skilled .NET
                                engineers integrate seamlessly with your team, fostering close collaboration, clear
                                communication, and full transparency throughout the development lifecycle. We focus on
                                building strong, results-driven partnerships that go beyond technical delivery, ensuring
                                that every solution we develop supports your long-term objectives, accelerates your
                                digital initiatives, and contributes to your overall business success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-100 text-gray-700 hover:text-black' : 'border-gray-400 text-gray-300 hover:text-white'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How scalable is .NET and can it accommodate business growth?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                .NET is a highly scalable and flexible framework, making it ideal for businesses aiming
                                to grow and evolve efficiently. Its architecture allows our developers to build
                                applications that seamlessly adapt to changing requirements and user demands, ensuring
                                long-term reliability. As your workload increases, .NET maintains consistent performance
                                and stability, enabling your systems to scale without disruption—supporting your growth
                                without compromising speed, efficiency, or user experience.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-100 text-gray-700 hover:text-black' : 'border-gray-400 text-gray-300 hover:text-white'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What security features does .NET offer and how does it ensure <br
                                className={'lg:block md:block hidden'}/>the safety of applications?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                .NET offers a robust security infrastructure designed to protect your applications and
                                data at every level. With features like code access security, role-based security, and
                                advanced encryption, it ensures that only authorised users can access specific resources
                                and functionality. Additionally, .NET’s built-in safeguards help defend against common
                                web vulnerabilities—such as cross-site scripting (XSS), SQL injection, and cross-site
                                request forgery (CSRF)—providing a secure foundation for handling sensitive information
                                and maintaining user trust.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-100 text-gray-700 hover:text-black' : 'border-gray-400 text-gray-300 hover:text-white'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can .NET integrate with existing technology stacks and databases seamlessly?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                .NET offers seamless integration with a wide range of technology stacks and databases,
                                including Microsoft Azure, Microsoft SQL Server, and other enterprise-grade systems. Its
                                interoperability with multiple programming languages—such as C#, F#, and VB.NET—makes it
                                highly adaptable for diverse application needs and development environments. This
                                flexibility allows businesses to build interconnected, scalable solutions that fit
                                smoothly into their existing infrastructure while supporting future expansion and
                                innovation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-100 text-gray-700 hover:text-black' : 'border-gray-400 text-gray-300 hover:text-white'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is the cost structure associated with implementing and maintaining <br
                                className={'lg:block md:block hidden'}/>.NET for a business?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The cost of implementing and maintaining a .NET solution varies based on your project’s
                                specific requirements, including complexity, development time, licensing, and ongoing
                                support needs. However, .NET’s efficiency, scalability, and seamless integration
                                capabilities often make it a cost-effective choice for businesses. Its ability to
                                support long-term growth, reduce maintenance overhead, and deliver reliable performance
                                ensures strong return on investment, especially for organisations seeking a robust and
                                future-ready development framework.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default NetDevelopment;