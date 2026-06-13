'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";

const HybridAppDevelopment = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
            "RNAD",
            "IAD",
            "HAM",
            "HA",
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
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] mt-[1.5em] leading-[1.1] font-[600] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Hybrid App <br className={'lg:block md:block hidden'}/>Development
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Power your apps with flexible hybrid development.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/hybrid/hero.jpg'}
                        alt={'Hybrid Hero'}
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
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.9em] lg:font-[550] font-[600] lg:tracking-wider tracking-tight'>
                            High-performance <br className={'lg:block md:block hidden'}/>hybrid app development
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='capitalize lg:text-[3.5em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Hybrid application <br className={'lg:block md:block hidden'}/>development services
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we specialise in developing high-performance hybrid applications
                                    that provide seamless experiences across all major platforms—iOS, Android, and web.
                                    By combining the strengths of native app functionality with the flexibility of web
                                    technologies, we offer a cost-effective solution that allows businesses to reach a
                                    wider audience while simplifying app maintenance. Our hybrid approach reduces time
                                    to market, improves scalability, and ensures that your app can evolve with your
                                    business needs.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Whether you&#39;re launching a new app, enhancing an existing one, or migrating from
                                    a
                                    native technology stack, we work closely with you throughout every phase of
                                    development. Our team ensures that each application we build is intuitive, engaging,
                                    and designed for long-term success. With Grey InfoTech, you gain more than just a
                                    cross-platform app—you gain a strategic partner focused on delivering measurable
                                    results and growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Images */}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                    <div className={'h-auto w-full max-w-full'}>
                        <Image
                            src={'/assets/hybrid/3.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/hybrid/4.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/hybrid/1.png'}
                            alt={'calender'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/hybrid/2.jpg'}
                            alt={'Restaurant'}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* What is Hybrid Mobile App Development */}
            <div className={`relative py-16 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            What is hybrid <br className={'lg:block md:block hidden'}/>mobile app <br
                            className={'lg:block md:block hidden'}/>development?
                        </h2>
                    </div>
                    <div className='lg:-ml-[8em]'>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            Hybrid <Link href={'/services/Mobile-Application-Development'}
                                         className={`border-b pb-[0.05em] ${
                                             isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                         }`}>mobile app</Link> development is an efficient approach that blends the
                            flexibility of web
                            technologies like HTML5, CSS, and <Link href={'/services/Javascript'}
                                                                    className={`border-b pb-[0.05em] ${
                                                                        isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                    }`}>JavaScript</Link> with the capabilities of
                            native mobile applications. This method allows
                            developers to write a single codebase that runs seamlessly across multiple platforms such as
                            iOS and Android, significantly reducing development time and costs. Hybrid apps offer faster
                            deployment and easier maintenance without compromising performance or user experience.
                            <br/>
                            At Grey InfoTech, we use this approach to build high-quality, cross-platform apps that feel
                            and perform like native applications. With a focus on consistency, speed, and user
                            satisfaction, our hybrid development solutions are ideal for businesses looking to scale
                            quickly and efficiently while maintaining a modern, responsive mobile presence.
                        </p>
                    </div>
                </div>
            </div>

            {/* Development Services */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development service'}
                     className={'relative pt-[1em] lg:pt-[7em] md:pt-[7em] mt-[1em] lg:mt-[4em] md:mt-[4em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Our hybrid app <br className={'lg:block md:block hidden'}/>development <br
                                className={'lg:block md:block hidden'}/>services
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Grey InfoTech delivers high-performance hybrid apps that combine the best of web and
                                native
                                technologies. From idea to launch, we handle design, development, and support—ensuring
                                your
                                app works seamlessly across iOS and Android from a single codebase. This speeds up
                                delivery,
                                reduces cost, and maintains a consistent user experience.
                                <br/>Our solutions are fast, scalable, and built to grow with your business. Whether
                                you&#39;re starting fresh or improving an existing app, we focus on creating apps that
                                engage users and deliver real results.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div className='lg:sticky top-28 lg:h-screen overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                            }`}>
                                {[
                                    {id: "01", title: "React Native App Development", target: "RNAD"},
                                    {id: "02", title: "Ionic App Development ", target: "IAD"},
                                    {id: "03", title: "Hybrid App Migration", target: "HAM"},
                                    {id: "04", title: "Hybrid App Maintenance", target: "HA"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[32em] md:mb-[32em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RNAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>React Native App Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Rapid development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reusable components</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        <Link href={'/services/React-Native-Development'}
                                              className={`border-b pb-[0.05em] ${
                                                  isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                              }`}>React Native</Link> is a powerful, industry-leading framework backed
                                        by Meta
                                        (Facebook), enabling the development of mobile applications that deliver a
                                        native-like experience across both iOS and Android platforms—all from a single
                                        codebase. This approach significantly reduces development time and cost while
                                        maintaining high performance and visual appeal.<br/>
                                        At Grey InfoTech, we use React Native to serve businesses of all sizes and
                                        industries—from startups to enterprises. Whether you’re launching a new product,
                                        enhancing an existing app, or expanding to new platforms, our team ensures your
                                        application is fast, user-friendly, and built for scale. With React Native, we
                                        help
                                        you go to market faster without compromising quality or flexibility.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'IAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Ionic App Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Ionic</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>HTML</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI components</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Ionic is a widely used hybrid app development framework built on web
                                        technologies
                                        like HTML, CSS, and JavaScript. Known for its flexibility and scalability, Ionic
                                        allows businesses to deliver cross-platform applications with a single codebase.
                                        With its extensive <Link href={'/services/ui-ux-design'}
                                                                 className={`border-b pb-[0.05em] ${
                                                                     isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                                 }`}>UI</Link> component library and seamless
                                        integration with tools like
                                        Angular, Ionic is ideal for creating responsive, high-performance apps.<br/>
                                        At Grey InfoTech, we leverage Ionic to build fast, stylish applications tailored
                                        to
                                        your business goals—whether you&#39;re launching a simple utility app or a
                                        complex
                                        feature-rich platform. Our team ensures your app delivers a consistent user
                                        experience across devices, helping you reach a wider audience without
                                        sacrificing
                                        speed, quality, or design.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HAM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Hybrid App Migration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Hybrid app migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Future-proof solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        If you&#39;re looking to transition from a native app to a hybrid solution, Grey
                                        InfoTech can help streamline the process. Migrating to a hybrid app offers
                                        strategic
                                        advantages—reduced development and maintenance costs, faster updates, and the
                                        ability to reach iOS and Android users from a single codebase.<br/>
                                        Our team ensures a seamless migration by preserving your app’s core
                                        functionality
                                        while enhancing its design, performance, and scalability. We collaborate closely
                                        with you to modernise the user experience and prepare your application for
                                        long-term
                                        growth across platforms.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Hybrid App Maintenance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Hybrid app maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bug fixes</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Ongoing support</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Building an app is only the beginning—ongoing maintenance is essential to keep
                                        it
                                        secure, optimised, and aligned with evolving user expectations. At Grey
                                        InfoTech, we
                                        provide continuous hybrid app maintenance services to ensure your app remains
                                        functional, compatible with the latest platform updates, and delivers a seamless
                                        user experience.<br/>
                                        Our team handles everything from routine bug fixes to adding new features that
                                        support your business growth. Whether it’s performance tuning, security patches,
                                        or
                                        UX enhancements, we offer reliable support so you can focus on scaling your
                                        product
                                        with confidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Looking for help with your hybrid app development? */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'looking'}
                     className={`relative py-16 px-4 sm:px-6 lg:px-[4.6em] lg:-mt-[23em] md:-mt-[23em] w-full max-w-full lg:mb-14 mb-8 ${
                         isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Looking for help <br className={'lg:block md:block hidden'}/>with your hybrid <br
                                className={'lg:block md:block hidden'}/>app development?
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Whether you&#39;re building a new hybrid app or improving an existing one, Grey InfoTech
                                delivers solutions that align with your goals. We combine technical expertise with
                                creative
                                insight to build scalable, user-focused applications.Our team ensures your app performs
                                across platforms, engages users, and drives results. Let’s turn your vision into a
                                high-impact, future-ready product.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle */}
            <div className="relative lg:-mt-[4em] md:-mt-[4em] h-auto">
                <Image
                    src={'/assets/hybrid/mid.jpg'}
                    alt={'LastImage'}
                    width={1536}
                    height={1025}
                    id={'mid image'}
                    className={`lg:-mt-[2em] relative max-w-full mx-auto w-full h-auto`}
                />
            </div>

            {/* Why build a hybrid rather than a native app? */}
            <div className={`lg:-mt-[8em] md:-mt-[8em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'why build'}
                     className={`relative h-auto lg:pt-[12em] md:pt-[12em] pt-[4em] lg:mt-[4em] md:mt-[4em] mt-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:pb-[8em] md:pb-[8em] pb-[2em]${
                         isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto ${
                            isDayTime ? 'text-white' : 'text-black'}`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] mb-6 rounded-none'>
                                Why build a <br className={'lg:block md:block hidden'}/>hybrid rather than <br
                                className={'lg:block md:block hidden'}/>a native app?
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[300] lg:-mt-[0.2em] leading-[1.5] text-justify'>
                                Choosing between hybrid and native app development is a key decision in product
                                strategy.
                                While native apps are known for performance and platform-specific optimization, hybrid
                                development offers a powerful blend of flexibility, efficiency, and modern
                                capability—making
                                it an increasingly popular choice for startups and enterprise teams alike.<br/><br/>
                                <span
                                    className={'font-[500] text-[1.2em]'}>Why Hybrid Development Makes Sense</span></p>
                            <br/>
                            <ul>
                                <li className={"font-[400] mb-3  before:content-[\"—\"] before:mr-2 leading-[1.3]"}>
                                    Cost-Efficiency: Build once, deploy everywhere. A shared codebase for iOS and
                                    Android reduces engineering hours, QA complexity, and long-term maintenance
                                    costs—translating into a more efficient burn rate and higher ROI.
                                </li>
                                <li className={"font-[400] mb-3  before:content-[\"—\"] before:mr-2 leading-[1.3]"}>
                                    Accelerated Time-to-Market:With a unified development approach, product teams can
                                    launch MVPs and updates faster, respond to user feedback in real time, and capture
                                    market opportunities before competitors.
                                </li>
                                <li className={"font-[400] mb-3 before:content-[\"—\"] before:mr-2 leading-[1.3]"}>
                                    Cross-Platform Consistency: Using frameworks like React Native, Ionic, and Flutter,
                                    hybrid apps deliver a seamless user experience across devices while allowing access
                                    to native device features when needed.
                                </li>
                                <li className={"font-[400] mb-3  before:content-[\"—\"] before:mr-2 leading-[1.3]"}>
                                    Streamlined Maintenance: Updates, bug fixes, and feature rollouts happen across
                                    platforms simultaneously, improving release velocity and reducing risk of platform
                                    fragmentation.
                                </li>
                                <li className={"font-[400] before:content-[\"—\"] before:mr-2 leading-[1.3]"}>
                                    Modern, Native-Like UX: Hybrid frameworks have evolved significantly. With proper
                                    implementation, hybrid apps now rival native apps in look, feel, and
                                    responsiveness—users often can’t tell the difference.
                                </li>
                            </ul>
                            <br/>
                            <p>
                            <span
                                className={'font-[500] text-[1.2em]'}>Technical Confidence Meets Business Agility</span><br/><br/>
                                We leverage industry-leading hybrid frameworks that allow for modular architecture,
                                native
                                plugin integration, and scalable performance optimization. This approach reduces tech
                                debt
                                while maintaining flexibility for future native enhancements, if needed.<br/>
                                Whether you&#39;re launching a new product or scaling an existing one, hybrid
                                development
                                enables you to deliver fast, look modern, and spend smart.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'involved'}
                     className={`relative lg:pt-[8em] md:pt-[8em] pt-[2em] lg:pb-[8em] md:pb-[8em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                         isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                                Every successful project starts with a thoughtful discovery phase. We engage closely
                                with
                                your key stakeholders—executives, IT leaders, project sponsors, and end-users—to align
                                on
                                business goals, clarify priorities, and uncover essential insights that shape the
                                direction
                                of the solution.<br/><br/>
                                Our team—typically including a business analyst, product and project
                                managers, <Link href={'/services/ui-ux-design'}
                                                className={`border-b pb-[0.02em] ${
                                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                }`}>UX/UI designer</Link>, and technical leads—works to understand your
                                requirements, assess technical feasibility, and define the right approach. This ensures
                                we’re solving the right problems in the most effective way.<br/><br/>By fostering close
                                collaboration early, we reduce risk, streamline development, and create a clear path
                                forward. This process sets the foundation for delivering a product that is strategically
                                aligned, user-centered, and technically sound.
                            </p>
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full lg:-mt-[3em] md:-mt-[3em] lg:my-12 lg:mb-36 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
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


            <Footer/>
        </div>
    );
};

export default HybridAppDevelopment;