'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {motion, useScroll, useTransform} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Testimonial data
const testimonials = [
    {
        name: "Amina Yusuf",
        title: "Co-founder & CTO, MedConnect Africa",
        message: (
            <>
                As a growing HealthTech startup, security and compliance were non-negotiable. Grey InfoTech helped us
                build a HIPAA-compliant backend from the ground up, incorporating best-in-class security protocols and
                database encryption standards. Their ability to scale the backend alongside our product roadmap was
                instrumental in securing our next funding round.
            </>
        ),
    },
    {
        name: "Zola Nkosi",
        title: "Head of Engineering, Jua Marketplace",
        message: (
            <>
                Our platform needed a serious backend overhaul to handle increasing traffic and complex order logic.
                Grey InfoTech’s backend revamp brought us from a monolithic setup to a robust, API-driven architecture.
                Their use of modern frameworks and best practices helped reduce our server costs and improve load
                handling during peak sale periods. Their deep understanding of e-commerce challenges made a measurable
                difference.
            </>
        )
    },
    {
        name: "Tunde Adebayo",
        title: "CTO, DataPulse Analytics",
        message: (
            <>
                Grey InfoTech completely transformed our backend infrastructure. We were struggling with performance
                bottlenecks and outdated architecture until their team stepped in. Not only did they refactor our
                codebase for better scalability, but they also introduced a microservices architecture that has improved
                system reliability and response times across the board. We&#39;ve seen a 40% reduction in latency and
                deployment times have dropped dramatically.
            </>
        )
    }
];

const BackendDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

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
            "DM",
            "AD",
            "AS",
            "SSL",
            "CI",
            "CMS",
            "PO",
            "RF",
            "ES",
            "DA",
            "DAR",
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
                    Back-end <br className={'lg:block md:block hidden'}/> Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Robust, scalable back-end solutions that are customized for you. Create safe, effective processes
                    that promote growth and performance.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/back/hero.jpg'}
                        alt={'Backend Development Hero'}
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
                            Business systems
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Back-end Development Overview
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Behind every successful digital product is a powerful and reliable back-end that
                                    enables core functionality, manages data securely, and ensures performance at scale.
                                    As part of our end-to-end web development services, we specialize in back-end
                                    development that forms the foundation of your software, web application, <Link
                                    href={'/services/Mobile-Application-Development'}
                                    className={`border-b pb-[0.05em] ${
                                        isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                    }`}>mobile app</Link>, or website. Our team designs and builds scalable server-side
                                    architectures that support everything from user authentication and database
                                    management to API integration and real-time functionality. We focus on building
                                    systems that are not only technically sound but also aligned with your business
                                    goals—ensuring your product is secure, efficient, and ready to grow with your users
                                    and evolving needs.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our experienced development team delivers tailored back-end solutions designed to
                                    meet your specific business needs—whether that involves designing and building
                                    intuitive admin interfaces, integrating third-party services, or developing and
                                    managing robust APIs. We ensure every system is secure, scalable, and built to
                                    perform reliably under real-world conditions. From architecting efficient databases
                                    to setting up secure server environments, we focus on creating infrastructure that
                                    supports your product’s growth, ensures data integrity, and enables seamless
                                    functionality across platforms. Our approach combines technical excellence with
                                    strategic insight, so your digital product has a strong foundation that aligns with
                                    both your operational goals and long-term vision.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* First Images */}
            <div
                className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]  xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div>
                    <Image
                        className={'object-fill'}
                        src={'/assets/back/first1.jpg'}
                        alt={'First Image'}
                        width={600}
                        height={400}
                        style={{
                            objectFit: "fill",
                            objectPosition: "center",
                        }}
                    />
                </div>
                <div>
                    <Image
                        className={'object-fill'}
                        src={'/assets/back/first.jpg'}
                        alt={'First Image'}
                        width={600}
                        height={400}
                        style={{
                            objectFit: "fill",
                            objectPosition: "center",
                        }}
                    />
                </div>
            </div>

            {/* Back-end Development Services */}
            <div id={'development services'}
                 className={`relative lg:py-[3em] py-[1em] lg:my-[5em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[600]'}>
                    Back-end <br className={'lg:block md:block hidden'}/>Development Services</h2>
                <div
                    className={`relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 mb-4 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div id={'api development'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/brand1.svg' : '/assets/back/icon/brand.svg'}
                                alt='API Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            API Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                            We design and build robust APIs that enable your application to seamlessly communicate with
                            external systems, services, and data sources. Whether it’s a RESTful API for straightforward
                            integrations or a GraphQL solution for more complex, flexible data structures, we focus on
                            creating APIs that are secure, scalable, and easy to consume. Our approach ensures your
                            backend can support third-party integrations, mobile and web clients, and future platform
                            growth—all while maintaining performance, reliability, and security standards critical to
                            your business.
                        </p>
                    </div>
                    <div id={'web app backend'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/web1.svg' : '/assets/back/icon/web.svg'}
                                alt='Web App Back-end Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className='capitalize text-[1.5em] font-[600] mb-4'>
                            Web app back-<br className={'lg:block md:block hidden'}/>end development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            We build reliable, scalable back-end systems for web applications that deliver strong
                            performance and support long-term growth. Whether you&#39;re launching an e-commerce
                            platform,
                            developing a SaaS product, or creating a fully custom solution, our back-end development
                            approach is tailored to your specific business needs and technical requirements. We focus on
                            building secure, efficient, and maintainable architectures that ensure your web app runs
                            smoothly, scales effectively, and integrates seamlessly with front-end interfaces and
                            third-party services.
                        </p>
                    </div>
                    <div id={'mobile app backend'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/weba1.svg' : '/assets/back/icon/weba.svg'}
                                alt='Mobile App Back-end Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] leading-[1.3] mb-4'>
                            Mobile App Back-<br className={'lg:block md:block hidden'}/>end Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Our mobile app back-end development expertise ensures that your app’s server-side logic is
                            tightly integrated with its front-end for optimal performance. We build back-end systems
                            that support seamless data synchronization, real-time communication, and secure
                            transactions—creating a smooth and responsive user experience
                            across <Link href={'/services/ios-development'}
                                         className={`border-b pb-[0.05em] ${
                                             isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                         }`}>iOS</Link>, Android, and cross-platform applications. Whether you&#39;re
                            building a consumer-facing app or an enterprise solution, our back-end services are designed
                            to scale, adapt, and deliver consistent functionality across devices.
                        </p>
                    </div>
                    <div id={'custom server'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/hybrid1.svg' : '/assets/back/icon/hybrid.svg'}
                                alt='Custom Server Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className='capitalize text-[1.5em] font-[600] mb-4'>
                            Custom server development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Every application has its own set of requirements, and our custom server development
                            services are built to meet those unique demands. We design, configure, and optimize
                            high-performance servers tailored to your specific use case—whether for web, mobile, or
                            enterprise applications. By prioritizing reliability, security, and operational efficiency,
                            we ensure your infrastructure can support your app’s performance, scale with growth, and
                            maintain stability under varying workloads.
                        </p>
                    </div>
                    <div id={'custom backend'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/mobile1.svg' : '/assets/back/icon/mobile.svg'}
                                alt='Custom Back-end Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className='text-[1.5em] leading-[1.2] font-[600] mb-4'>
                            Custom Back-<br className={'lg:block md:block hidden'}/>end Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            We build custom back-end systems that serve as the backbone of your application, tailored to
                            meet your specific business and technical requirements. From initial requirements analysis
                            and database architecture to API development and server optimization, every solution is
                            designed with performance, security, and scalability at its core. By leveraging the latest
                            technologies and adhering to industry best practices, we ensure your back-end is robust,
                            efficient, and future-ready—capable of supporting your app&#39;s success as it grows and
                            evolves.
                        </p>
                    </div>
                    <div id={'cloud backend'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/pwa1.svg' : '/assets/back/icon/pwa.svg'}
                                alt='Cloud Back-end Solutions'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Cloud Back-end Solution
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Leverage the power of leading cloud platforms like AWS,
                            <Link href={'/services/seo'}
                                  className={`border-b pb-[0.05em] ${
                                      isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                  }`}>Google</Link> Cloud, and Microsoft Azure to
                            build resilient, high-performing applications. Our cloud-based back-end solutions are
                            architected for scalability, cost-efficiency, and high availability—giving your app the
                            flexibility to grow without infrastructure limitations. Whether you&#39;re launching a new
                            product or scaling an existing system, we ensure your back-end is optimized for performance,
                            security, and long-term success in the cloud.
                        </p>
                    </div>
                    <div id={'backend code'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/back1.svg' : '/assets/back/icon/back.svg'}
                                alt='Back-end Code Audits'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Back-end Code Audits
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            If you already have an existing back-end, we can help you optimize it for better
                            performance, security, and scalability. Our comprehensive code audits uncover
                            vulnerabilities, inefficiencies, and architectural bottlenecks—providing clear, actionable
                            recommendations to strengthen your system. Whether you&#39;re preparing for growth or
                            looking to
                            improve stability, we ensure your back-end is robust, secure, and ready to support your
                            business goals.
                        </p>
                    </div>
                    <div id={'legacy backend'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/legacy1.svg' : '/assets/back/icon/legacy.svg'}
                                alt='Legacy Back-end Modernisation'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Legacy Back-<br className={'lg:block md:block hidden'}/>end Modernisation
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            AOutdated back-end systems can limit your app’s performance, security, and ability to scale.
                            We specialize in modernizing legacy architectures, transforming them into efficient, secure,
                            and maintainable systems that align with today’s technology standards. By upgrading your
                            back-end, we help improve functionality, reduce technical debt, and prepare your
                            infrastructure for future growth.
                        </p>
                    </div>
                    <div id={'architecture'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/back/icon/del1.svg' : '/assets/back/icon/del.svg'}
                                alt='Architecture & Infrastructure'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Architecture & Infrastructure
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            A strong architectural foundation is essential to any successful back-end. We design
                            scalable, secure, and efficient infrastructures that ensure long-term stability and
                            performance. By building robust, future-proof systems tailored to your needs, we help you
                            reduce technical risks and operational overhead—so you can focus on innovation and business
                            growth with confidence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Development Solutions */}
            <div className={`${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'development solution'}
                     className={'relative lg:pt-[5em] md:pt-[5em] pt-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <h2 className={'border-b pb-[0.8em] border-gray-500/50 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                        Back-end Development Solutions</h2>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky top-28 lg:h-screen overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-100' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "API Development", target: "AD"},
                                    {id: "02", title: "Content Management System (CMS)", target: "CMS"},
                                    {id: "03", title: "Database Management", target: "DM"},
                                    {id: "04", title: "Real-Time Functionality", target: "RF"},
                                    {id: "05", title: "E-commerce Systems", target: "ES"},
                                    {id: "06", title: "Server-Side Logic", target: "SSL"},
                                    {id: "07", title: "DevOps & Automation", target: "DA"},
                                    {id: "08", title: "Authentication & Security", target: "AS"},
                                    {id: "09", title: "Data Analytics & Reporting", target: "DAR"},
                                    {id: "10", title: "Cloud Integration", target: "CI"},
                                    {id: "11", title: "Performance Optimisation", target: "PO"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-50 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-950 font-[650]' : 'text-gray-500 font-[300]'}`
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
                        <div className={'lg:-ml-[7em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'AD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>API Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable APIs</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Third-party integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>API development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        APIs are the essential link between your back-end and the broader digital
                                        ecosystem, enabling your application to communicate seamlessly with other
                                        platforms, services, and internal systems. We specialize in designing and
                                        developing secure, scalable, and well-structured APIs that support both current
                                        functionality and future integration needs. Whether you&#39;re connecting to
                                        third-party services like payment gateways, social media platforms, CRMs, or
                                        proprietary enterprise systems, our API solutions are built for reliability,
                                        performance, and ease of use. Using RESTful APIs for simplicity and broad
                                        compatibility or GraphQL for more complex, flexible data handling, we ensure
                                        that every integration is efficient, maintainable, and aligned with your
                                        business goals—empowering your system to operate as a cohesive, connected whole.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Content Management System (CMS)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>CMS customisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Content management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Whether we&#39;re customizing a platform like WordPress or developing a fully
                                        tailored content management solution, we focus on creating intuitive,
                                        user-friendly systems that simplify content creation, editing, and publishing.
                                        Our CMS solutions are designed to meet the unique needs of your
                                        business—balancing ease of use with flexibility and control. From seamless
                                        integrations and role-based access to secure workflows and scalable
                                        architecture, we ensure your content is both protected and easy to manage. The
                                        result is a streamlined content experience that empowers your team to deliver
                                        updates quickly and confidently, without relying on technical support.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'DM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Database Management</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Database management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Efficient data models</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data integrity</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        A well-designed database is fundamental to managing, storing, and scaling your
                                        application’s data effectively. We architect and maintain relational databases
                                        such as MySQL and PostgreSQL for structured data needs, while also leveraging
                                        NoSQL solutions like MongoDB for projects that require greater flexibility and
                                        scalability. Our expertise ensures optimized data models, fast and reliable data
                                        retrieval, and strong data integrity—supporting your application’s performance
                                        and reliability as it grows. Whether you’re dealing with high-volume
                                        transactions, complex data relationships, or real-time analytics, we build
                                        database solutions tailored to your business requirements and future growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'RF'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Real-Time Functionality</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Real-Time updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Web sockets</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Chat apps</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        For applications that rely on real-time updates—such as chat platforms, live
                                        tracking systems, multiplayer games, or trading tools—we implement real-time
                                        functionality using technologies like WebSockets and frameworks such as
                                        Socket.IO. These solutions enable instant, bidirectional communication between
                                        the server and client, ensuring fast, consistent, and responsive data delivery.
                                        Our expertise in real-time architecture helps deliver smooth user experiences
                                        where low latency and immediate feedback are critical, allowing your application
                                        to perform reliably under dynamic, high-demand conditions.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ES'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>e-Commerce Systems</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>E-commerce back-end</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Secure checkout</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>E-commerce systems</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Transaction management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We develop robust back-end systems for e-commerce platforms that support
                                        everything from inventory management and product catalog organization to secure
                                        payment processing and order fulfillment. Our solutions are designed to handle
                                        multi-currency transactions, real-time stock updates, and dynamic
                                        pricing—ensuring a smooth and reliable shopping experience for customers. With a
                                        strong focus on security, scalability, and performance, we build e-commerce
                                        back-ends that integrate seamlessly with third-party services, support business
                                        growth, and adapt to evolving market demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'SSL'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Server-Side Logic</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Server-side logic</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless user experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>App development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        From processing orders and managing user interactions to handling automated
                                        workflows and data operations, server-side logic is the engine that drives your
                                        app’s core functionality. Our team designs and implements robust business logic
                                        tailored to your specific operational needs, ensuring complex tasks are executed
                                        efficiently and accurately. By optimizing performance and maintaining a seamless
                                        connection between the front-end and back-end, we create smooth, intuitive user
                                        experiences while supporting your business processes behind the scenes with
                                        stability, scalability, and precision.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'DA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>DevOps & Automation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Automated testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Deployment automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Continuous delivery</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Modern software development demands streamlined, reliable workflows, and we
                                        deliver that through robust CI/CD (Continuous Integration and Continuous
                                        Deployment) pipelines. By automating testing, integration, and deployment
                                        processes, we reduce manual errors, minimize downtime, and accelerate release
                                        cycles. Leveraging tools like Docker and Kubernetes, we ensure consistent
                                        environment configuration, efficient resource management, and scalable
                                        infrastructure. This approach not only increases development velocity but also
                                        improves stability and operational efficiency—giving your team the confidence to
                                        deploy updates quickly and securely.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'AS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Authentication & Security</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>App security</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Authentication</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Access controls</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Security is a core priority in everything we build. We implement advanced
                                        authentication mechanisms such as OAuth and JWT to protect user identities,
                                        encrypt sensitive data both in transit and at rest, and establish granular
                                        access controls to prevent unauthorized access. Our back-end systems are
                                        designed with security best practices in mind, including regular code reviews,
                                        vulnerability assessments, and compliance with industry standards. With
                                        real-time threat detection, logging, and auditing in place, we ensure your
                                        application remains resilient against evolving security threats while
                                        maintaining user trust and regulatory compliance.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>09/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'DAR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Data Analytics & Reporting</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data processing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business intelligence</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Turn data into actionable insights with our back-end solutions designed for
                                        advanced data handling and analysis. We build systems that efficiently collect,
                                        process, and manage large volumes of data from multiple sources, enabling
                                        real-time analytics, automated reporting, and meaningful visualizations. Whether
                                        you&#39;re tracking user behavior, monitoring operations, or measuring
                                        performance,
                                        our solutions provide the infrastructure and intelligence you need to make
                                        informed, data-driven decisions that drive business growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>10/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Cloud Integration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cloud platforms</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>AWS</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Back-end scaling</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Leveraging leading cloud platforms such as AWS, Google Cloud, and Azure, we
                                        enable your back-end infrastructure to scale seamlessly with your business
                                        needs. From deploying applications and managing containerized environments to
                                        implementing serverless functions and automated scaling, we design solutions
                                        that prioritize reliability, cost-efficiency, and future readiness. Our cloud
                                        expertise ensures your systems remain resilient under varying workloads while
                                        optimizing resource usage, allowing you to innovate rapidly without
                                        infrastructure constraints.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>11/
                                </div>
                                <div className={`lg:mb-[20em] mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Performance Optimisation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Performance optimisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Load balancing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalability</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We specialize in optimizing back-end performance to ensure your applications run
                                        smoothly under high traffic and demanding conditions. By implementing advanced
                                        caching solutions such as Redis, fine-tuning server response times, and
                                        optimizing load balancing strategies, we enhance system responsiveness and
                                        scalability. Our approach minimizes latency and maximizes resource efficiency,
                                        enabling your back-end to handle increased user loads effortlessly while
                                        delivering a fast, reliable experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backend Technologies */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'backend technology'}
                     className={`relative lg:-mt-[15em] py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] capitalize sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tighter leading-[1.15] lg:pb-6'>
                                Back-end web <br className={'lg:block md:block hidden'}/>app technologies
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
                             isDayTime ? 'text-black' : 'text-white'
                         }`}>
                        <div id={'next'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/next.svg' : '/assets/back/icon/next1.svg'}
                                    alt={'next'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>NEXT.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A powerful framework for building
                                    server-rendered <Link href={'/services/Reactjs-Development'}
                                                          className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>React</Link> applications,
                                    offering a seamless development experience, improved SEO, and enhanced performance
                                    out of the box. With features like automatic routing, server-side rendering, and
                                    static site generation, it enables faster load times and greater scalability—making
                                    it ideal for modern web applications that demand speed, reliability, and
                                    flexibility.
                                </p>
                                <Link href={'/services/Nextjs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Next.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.6em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'symfony'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/sym.svg' : '/assets/back/icon/sym1.svg'}
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
                                <Link href={'/services/PHP-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>PHP Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.4em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'net'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/net.png' : '/assets/back/icon/net1.png'}
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
                                <Link href={'/services/Net-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Net Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[8.2em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'laravel'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/laravel.svg' : '/assets/back/icon/laravel1.svg'}
                                    alt={'Laravel'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Laravel</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A widely adopted <Link href={'/services/PHP-Development'}
                                                           className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>PHP</Link> framework
                                    known for its elegant syntax, developer-friendly
                                    tools, and powerful features that streamline <Link
                                    href={'/services/Web-Application'}
                                    className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>web
                                    application</Link> development. With
                                    built-in support for routing, authentication, caching, and more, Laravel enables the
                                    rapid creation of secure, maintainable, and scalable applications—making it a
                                    preferred choice for businesses seeking efficient and modern PHP-based solutions.
                                </p>
                                <Link href={'/services/Laravel-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Laravel Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'ruby'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/ruby.svg' : '/assets/back/icon/ruby1.svg'}
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
                                <Link href={'/services/Ruby-on-Rails'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Ruby on Rails Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[12.3em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'node'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/back/icon/node.svg' : '/assets/back/icon/node1.svg'}
                                    alt={'Node'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Node.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A high-performance <Link href={'/services/Javascript'}
                                                             className={`border-b pb-[0.1em] ${
                                                                 isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                             }`}>JavaScript</Link> runtime built on Chrome’s V8 engine,
                                    designed for building fast,
                                    scalable network applications using server-side scripting. Its event-driven,
                                    non-blocking architecture makes it ideal for handling high-concurrency workloads
                                    such as APIs, real-time services, and microservices—enabling efficient development
                                    and performance at scale across diverse platforms.
                                </p>
                                <Link href={'/services/Nodejs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Node.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-black' : 'bg-white'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/back/meet.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Back-end development benefits */}
            <div id={'development benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div className={`border-b-[0.1em] border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                    <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                        Back-End <br className={'lg:block md:block hidden'}/>Development Benefits
                    </h2>
                </div>

                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div id={'mature'}>
                        <Image
                            src={isDayTime ? '/assets/back/icon/test.svg' : '/assets/back/icon/test1.svg'}
                            alt={'Mature Process'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Mature Process
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our development process is built around quality, reliability, and long-term performance.
                            Through rigorous code reviews, comprehensive testing practices, and structured,
                            well-documented workflows, we ensure every back-end we deliver is robust, secure, and
                            maintainable. This disciplined approach minimizes risks, accelerates development, and
                            results in scalable systems that continue to perform as your business grows.
                        </p>
                    </div>
                    <div id={'high security'}>
                        <Image
                            src={isDayTime ? '/assets/back/icon/del.svg' : '/assets/back/icon/del.svg'}
                            alt={'High Security'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            High Security
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Protecting your data is our highest priority. We implement strong encryption protocols,
                            granular access control, and real-time threat detection to safeguard sensitive information
                            at every level of your application. By following industry best practices and proactively
                            monitoring for vulnerabilities, we ensure your systems remain secure, compliant, and
                            resilient against evolving cyber threats.
                        </p>
                    </div>
                    <div id={'scalable'}>
                        <Image
                            src={isDayTime ? '/assets/back/icon/brand.svg' : '/assets/back/icon/brand1.svg'}
                            alt={'Scalable'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Scalable
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We leverage the latest technologies—including microservices, containerization, and
                            serverless architecture—to build scalable, resilient systems that evolve with your business.
                            This modern approach enables greater flexibility, faster deployment, and efficient resource
                            utilization, ensuring your infrastructure is ready to support growth, innovation, and
                            long-term success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'partners'}
                     className={`relative py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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

            {/* Back-end development process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Back-End <br className={'lg:block md:block hidden'}/>Development Process
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                Our process is strategically designed to align your MVP with both your product
                                vision and real market <br className={'lg:block md:block hidden'}/>demands—ensuring it
                                delivers
                                value from day one and sets the stage for future growth.
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
                                                Discovery <br className={'lg:block md:block hidden'}/>and Planning
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We begin by deeply understanding your business objectives and technical
                                                needs. Our team conducts thorough research and designs a backend
                                                architecture aligned with your long-term goals, ensuring reliability,
                                                scalability, and performance as your product evolves.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "Architecture Design",
                                        description: (
                                            <>
                                                Our engineers design and build backend systems that are efficient,
                                                scalable, and secure, ensuring seamless data flow across your
                                                application and smooth integration with third-party services. We focus
                                                on creating a robust technical foundation that supports long-term
                                                performance, enables future growth, and aligns with your strategic
                                                business goals—whether you&#39;re launching a new product or modernising
                                                legacy systems.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "API Development",
                                        description: (
                                            <>
                                                We build robust, well-documented APIs that seamlessly connect your
                                                frontend interfaces and external systems. Our focus on security,
                                                scalability, and performance ensures that your APIs can handle high data
                                                volumes and complex interactions without compromising speed or
                                                reliability—supporting your product&#39;s growth and integration needs
                                                with
                                                confidence.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Database Setup <br className={'lg:block md:block hidden'}/>and
                                                Optimisation
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We carefully select and optimise databases to ensure fast, reliable data
                                                storage and retrieval. Our approach reduces latency, improves system
                                                responsiveness, and lays the foundation for scalable backend
                                                infrastructure that grows with your business demands.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        subtitle: "05",
                                        title: (
                                            <>
                                                Testing and QA
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We conduct rigorous testing before deployment to ensure your backend is
                                                secure, efficient, and reliable under real-world conditions. This
                                                includes performance, security, and integration testing to safeguard
                                                your infrastructure and ensure smooth operations post-launch.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 6,
                                        subtitle: "06",
                                        title: (
                                            <>
                                                Deployment & Maintenance
                                            </>
                                        ),
                                        description: (
                                            <>
                                                After deployment, we provide continuous support and performance
                                                monitoring to ensure your backend remains stable, secure, and operating
                                                at peak efficiency. Our proactive maintenance approach helps detect and
                                                resolve issues early, supporting your long-term growth.
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
            <div id={'last-image'} className={'lg:-mt-[10em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/back/last.jpg'}
                    alt={'Last Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* FAQ section */}
            <div id={'FAQ'} className={`relative lg:py-36 mb-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            FAQs About <br className={'lg:block md:block hidden'}/>Our Back-End Development
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
                            <span>What is back-end development?</span>
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
                                Back-end development refers to the server-side of application development. It involves
                                creating and managing the infrastructure, databases, application logic, and APIs that
                                power the functionality users experience on the front-end. It ensures that data is
                                stored, processed, and delivered efficiently and securely behind the scenes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How is back-end development different from front-end development?</span>
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
                                Front-end development focuses on the user interface—what users see and interact with,
                                such as layouts, buttons, and forms. Back-end development, on the other hand, handles
                                the behind-the-scenes logic, server operations, database interactions, and APIs that
                                power those visual elements and ensure the application functions reliably and securely.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why is back-end development important?</span>
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
                                Back-end development is the foundation of any robust application. It manages data
                                processing, storage, and system communication—ensuring that everything works seamlessly
                                behind the scenes. A strong back-end is essential for performance, reliability, and
                                security, enabling your application to function efficiently and scale as your business
                                grows.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What programming languages are used in back-end development?</span>
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
                                Common programming languages for back-end development
                                include <Link href={'/services/Python-Development'}
                                              className={`border-b pb-[0.1em] ${
                                                  isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                              }`}>Python</Link>, <Link href={'/services/Javascript'}
                                                                       className={`border-b pb-[0.1em] ${
                                                                           isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                                       }`}>Java</Link>, <Link
                                href={'/services/PHP-Development'} className={`border-b pb-[0.1em] ${
                                isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                            }`}>PHP</Link>, <Link href={'/services/Ruby-on-Rails'}
                                                  className={`border-b pb-[0.1em] ${
                                                      isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                  }`}>Ruby</Link>, <Link href={'/services/Nodejs-Development'}
                                                                         className={`border-b pb-[0.1em] ${
                                                                             isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                                         }`}>Node.js</Link> (JavaScript), and C#. Each
                                language offers distinct advantages in terms
                                of
                                scalability, speed, or ecosystem support. The choice of language depends on your
                                project’s specific needs, performance goals, and long-term scalability requirements.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is an API and why is it important for the back-end?</span>
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
                                An API (Application Programming Interface) enables communication between the back-end
                                and other systems, such as the frontend or third-party services. It acts as a bridge,
                                allowing data to be exchanged securely and efficiently. APIs are critical for enabling
                                integrations, powering mobile and web apps, and ensuring that your platform can scale
                                and evolve with new features or external tools.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What makes a back-end scalable?</span>
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
                                A scalable back-end is designed to handle growing user demand, data volume, and traffic
                                without compromising performance. This involves using flexible architectures like
                                microservices, leveraging cloud infrastructure (such as AWS or Azure), and implementing
                                tools like load balancers and caching systems. Scalability ensures your application
                                remains fast, reliable, and responsive as your business grows.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you secure the back-end?</span>
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
                                Securing the back-end involves a multi-layered approach, including data encryption,
                                robust authentication and authorization protocols (such as OAuth and JWT), secure API
                                development, input validation to prevent injection attacks, and the use of firewalls.
                                Regular security audits and vulnerability assessments are also essential to identify and
                                mitigate potential risks, ensuring your system remains safe and compliant.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you choose the right database for the back-end?</span>
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
                                Choosing the right database depends on your application&#39;s data structure,
                                performance
                                needs, and scalability goals. Relational databases like MySQL or PostgreSQL are ideal
                                for structured data and complex queries, while NoSQL databases like MongoDB offer
                                flexibility for unstructured data and rapid scaling. We assess your business
                                requirements to recommend the most suitable option for long-term performance and growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the role of DevOps in back-end development?</span>
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
                                DevOps plays a crucial role in streamlining back-end development by automating processes
                                and improving collaboration between development and operations teams. Practices like
                                Continuous Integration/Continuous Deployment (CI/CD), automated testing, and
                                containerisation with tools like Docker and Kubernetes enable faster releases, reduce
                                downtime, and ensure scalable, reliable systems. This leads to more efficient
                                development cycles and better-performing back-end infrastructure.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span> How is performance optimised in a back-end system?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Performance in back-end systems is optimised using strategies like caching with tools
                                such as Redis or Memcached, implementing database indexing, and balancing traffic across
                                servers. Additionally, writing efficient server-side logic and optimising database
                                queries help ensure the system can handle high user loads while maintaining speed and
                                responsiveness. These practices collectively enhance user experience and support
                                business scalability.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to build a back-end?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The development timeline depends on the complexity, required features, and third-party
                                integrations. A basic back-end can be built in 6–24 weeks, while more advanced systems
                                involving complex logic, APIs, and scalability considerations may take several months.
                                Clear requirements and efficient planning help speed up delivery.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does back-end development cost?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The cost of back-end development varies based on the project’s scope, chosen
                                technologies, team expertise, and complexity. Small-scale projects may start from a few
                                thousand pounds, while enterprise-level systems with advanced features and integrations
                                can range into tens of thousands. A detailed project brief helps provide an accurate
                                estimate.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(12)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do you integrate a new back-end with existing systems?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Integration involves designing or adapting APIs, synchronising databases, and ensuring
                                seamless communication between the new back-end and existing systems. This requires
                                careful planning, thorough testing, and often middleware or data mapping to ensure
                                compatibility and minimise disruption.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(13)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What kind of support is required for a back-end?</span>
                            {onIndex === 13 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 13 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Ongoing support for a back-end includes performance monitoring, security updates, bug
                                fixes, and adapting to new business needs. It also involves server maintenance, database
                                optimisation, and ensuring uptime, scalability, and compliance with evolving technical
                                standards.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(14)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do I build or buy back-end software?</span>
                            {onIndex === 14 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 14 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                It depends on your business needs, budget, and timeline. Building a custom back-end
                                gives you full control, flexibility, and scalability tailored to your goals. Buying or
                                using pre-built solutions can save time and cost upfront but may lack the adaptability
                                or specific features your project requires. A hybrid approach is also
                                possible—customising existing tools to suit your needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(15)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is serverless architecture and is it suitable for all back-ends?</span>
                            {onIndex === 15 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 15 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Serverless architecture lets you run backend code without managing server
                                infrastructure—cloud providers automatically allocate resources as needed. It&#39;s
                                ideal
                                for lightweight, event-driven workloads (like image processing, form submissions, or
                                notifications). However, it may not be suitable for applications requiring persistent
                                connections, complex computations, or high-volume processing, where traditional server
                                setups offer better control and performance.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(16)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does cloud computing impact back-end development?</span>
                            {onIndex === 16 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 16 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Cloud computing significantly enhances back-end development by providing on-demand
                                infrastructure, scalability, and high availability. It simplifies resource provisioning,
                                allows for rapid deployment, and supports automation through services like CI/CD
                                pipelines. Developers can scale applications efficiently, reduce operational costs, and
                                ensure better uptime using platforms like AWS, Azure, or Google Cloud.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(17)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the role of microservices in modern back-end development?</span>
                            {onIndex === 17 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 17 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Microservices architecture divides the back-end into small, independent services, each
                                responsible for a specific function. This modular approach improves scalability, enables
                                faster development cycles, enhances fault isolation, and allows teams to use different
                                technologies for different services. It’s ideal for complex applications that need to
                                scale and evolve quickly.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(18)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How can AI and machine learning be added to the back-end?</span>
                            {onIndex === 18 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 18 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                AI and machine learning can be integrated into the back-end to enhance functionality
                                such as data analysis, user personalisation, predictive analytics, and automation. The
                                back-end processes data through trained ML models—either in real-time or in batches—and
                                then delivers intelligent outputs like recommendations, classifications, or forecasts to
                                the frontend or other systems. This adds value by enabling smarter, data-driven
                                decision-making within the application.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default BackendDevelopment;