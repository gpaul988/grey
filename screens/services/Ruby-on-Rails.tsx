'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";


const RubyOnRails = () => {
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
            "ADI",
            "PO",
            "SSR",
            "TQA",
            "RRCS",
            "WAD",
            "MS",
            "FF",
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
    // FAQ Hook
    const [onIndex, setOnIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOnIndex(onIndex === index ? null : index);
    }


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} relative h-auto`}>
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
                    Ruby On Rails <br className={'lg:block md:block hidden'}/>Development Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Build scalable, high-performance web applications with our expert Ruby on Rails team. At Grey
                    InfoTech, we deliver cost-effective, innovative solutions that streamline user experiences and
                    support your business growth.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/ror/hero.jpg'}
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
                            Your partner for scalable <br className={'lg:block md:block hidden'}/>Ruby on Rails
                            expertise
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.3] pb-6'>
                            Ruby On Rails Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we leverage our deep expertise in Ruby on Rails to develop
                                    powerful, scalable <Link href={'/services/Web-Application'}
                                                             className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'}`}>web
                                    applications</Link> tailored to your business needs. From
                                    feature-rich online marketplaces that connect buyers and sellers to intuitive
                                    learning management systems designed for seamless user experience, we’ve delivered
                                    solutions that are both technically sound and commercially impactful. Ruby on Rails
                                    allows us to move quickly without compromising on quality—giving our clients a
                                    competitive edge in fast-moving digital markets.
                                </p>
                            </div>
                            <div>
                                <p>
                                    As a leading Rails development company, we’re passionate about the framework’s
                                    ability to support rapid development, maintain clean code, and ensure long-term
                                    scalability. By aligning with modern best practices and industry standards, we help
                                    businesses launch high-performing applications that are built to evolve. Whether
                                    you&#39;re starting from scratch or enhancing an existing platform, our Rails team
                                    is ready to deliver innovative solutions that push the boundaries of what’s possible
                                    online.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Ruby on Rails development solutions*/}
            <div className={`lg:-mt-[2em] md:-mt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'web-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.2em] md:text-[3.2em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                Our Ruby On Rails <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div className={'lg:-ml-[4em] md:-ml-[4em]'}>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                Ruby on Rails, originally developed by David Heinemeier Hansson of 37signals, was built
                                to support the creation of tailored web applications and websites. Its flexibility makes
                                it suitable for a wide range of solutions, from content management systems
                                and <Link href={'/industries/e-commerce-development'}
                                          className={`border-b pb-[0.01em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>ecommerce</Link> platforms
                                to internal company tools like intranets, workflow automation, and project
                                management software. This makes it an exceptionally versatile framework.
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
                                    {id: "01", title: "API Development & Integration", target: "ADI"},
                                    {id: "02", title: "Performance Optimization", target: "PO"},
                                    {id: "03", title: "Server-Side Rendering", target: "SSR"},
                                    {id: "04", title: "Testing & Quality Assurance", target: "TQA"},
                                    {id: "05", title: "Ruby On Rails Consulting Services", target: "RRCS"},
                                    {id: "06", title: "Web App Development", target: "WAD"},
                                    {id: "07", title: "Maintenance & Support", target: "MS"},
                                    {id: "08", title: "Features & Functionality", target: "FF"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[14em] md:mb-[14em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ADI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        API Development & Integration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data FLow</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Our developers harness Ruby on Rails to build and integrate robust, scalable
                                        APIs that enable seamless data exchange between your application and a wide
                                        range of third-party tools and platforms. Whether it&#39;s connecting to payment
                                        gateways, CRMs, analytics tools, or external data sources, we ensure smooth,
                                        secure communication that enhances your application&#39;s performance and
                                        functionality. This integration streamlines workflows, reduces manual effort,
                                        and supports automation—creating a connected, future-ready digital ecosystem
                                        that allows your business to grow, adapt, and innovate with confidence.

                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Performance Optimization
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Speed</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless Integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        There&#39;s always room to do things better—and performance is no exception. Our
                                        developers use Ruby on Rails&#39; built-in tools and follow industry best
                                        practices
                                        to optimise every layer of your application. From improving database efficiency
                                        to handling high traffic loads with ease, we fine-tune performance to ensure
                                        fast loading times, responsive functionality, and a seamless user experience.
                                        The result is a high-performing, scalable application that keeps your users
                                        engaged and your business running smoothly.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SSR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Server-Side Rendering</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Backend</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Fast Load</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        By taking full advantage of Ruby on Rails&#39; server-side rendering
                                        capabilities,
                                        we&#39;re able to significantly boost both the performance and visibility of
                                        your
                                        web application. Server-side rendering allows pages to load faster by delivering
                                        fully rendered HTML to the browser, reducing the time it takes for users to see
                                        and interact with your content. This not only leads to a smoother, more
                                        responsive user experience from the moment someone lands on your site, but it
                                        also makes your application far more search-engine friendly. Search engines can
                                        crawl and index your content more effectively, improving your SEO rankings and
                                        increasing the chances of being discovered by your target audience. Ultimately,
                                        it&#39;s a development approach that benefits both users and your
                                        business—delivering speed, visibility, and a competitive edge.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'TQA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Testing & Quality Assurance</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Reliability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bug-Free</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Highest Industry Standards</span>
                                    </div>
                                    <div className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        <p>
                                            At Grey InfoTech, we implement rigorous testing protocols and follow proven
                                            best practices to ensure every Ruby on Rails application we deliver is
                                            secure, stable, and built to the highest industry standards. Our quality
                                            assurance process includes automated test coverage, manual testing,
                                            performance benchmarking, and thorough code reviews—all aimed at identifying
                                            and resolving issues early in the development cycle. We also conduct
                                            security audits and stress testing to ensure your application performs
                                            reliably under real-world conditions and scale. This disciplined approach
                                            not only reduces risk and long-term maintenance costs but also ensures your
                                            users enjoy a smooth, error-free experience from day one. With quality at
                                            the core of everything we do, we build solutions you—and your customers—can
                                            trust.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RRCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Ruby On Rails Consulting
                                        Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Guidance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Expertise</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Facing a complex business challenge? Tap into our Ruby on Rails consulting
                                        expertise to uncover smart, scalable solutions. With years of hands-on
                                        experience, we&#39;re well-positioned to advise you on how Ruby on Rails can
                                        address your technical and operational needs. Whether you&#39;re planning a new
                                        build, modernising legacy systems, or scaling an existing product, we provide
                                        tailored guidance on architecture, performance, and best practices. Our goal is
                                        to help you make confident, informed decisions that move your business
                                        forward—faster and more efficiently.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Web App Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Budget-Friendy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Our Ruby on Rails developers collaborate closely with experienced design and UX
                                        professionals to deliver polished, high-performance web applications—on time and
                                        within budget. By leveraging Rails&#39; structured, convention-driven coding
                                        practices, we build scalable and maintainable solutions that are easy to update
                                        and expand as your business evolves. This approach not only ensures long-term
                                        reliability and efficiency, but also aligns with the same principles used by
                                        major global brands like Airbnb and Shopify. Whether you&#39;re launching a new
                                        product or improving an existing platform, we bring the right blend of technical
                                        expertise and design thinking to help you achieve your goals with confidence.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Maintenance & Support</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Stability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Proactive Care</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        We offer proactive Ruby on Rails maintenance and support services designed to
                                        keep your applications secure, stable, and performing at their best. Our team
                                        handles everything from routine updates and security patches to bug fixes,
                                        performance tuning, and system enhancements. By continuously monitoring and
                                        optimising your application, we help prevent issues before they arise—ensuring a
                                        seamless user experience and minimising downtime. Whether your platform is in
                                        active development or live in production, we act as a reliable extension of your
                                        team, committed to keeping your Rails app running smoothly as your business
                                        evolves.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FF'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Feature & Functionality</h2>
                                    <div
                                        className={`flex flex-wrap gap-2 mb-6 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Enhancements</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Migrations</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Growth-Ready</span>
                                    </div>
                                    <p className={'text-justify leading-[1.6] text-[0.85em] font-[300]'}>
                                        Ruby on Rails is an ideal framework for building scalable, high-performance
                                        platforms—whether you&#39;re launching an eCommerce site, developing a custom
                                        CMS, or expanding an existing application. At Grey InfoTech, we support you
                                        through every stage, from smooth migrations and version upgrades to in-depth
                                        performance optimisation. Our goal is to ensure your application can handle
                                        increasing traffic, maintain stability under pressure, and scale seamlessly as
                                        your business grows. With Rails, and the right development partner, you&#39;re
                                        set up for long-term success.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={'relative  max-w-full w-full h-auto lg:-mt-[21em] md:-mt-[21em]'}>
                <Image
                    src={'/assets/ror/first.jpg'}
                    alt={'first'}
                    width={1536}
                    height={865}
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>

            {/* Why Ruby On Rails */}
            <div className={`lg:-mt-[2em] md:-mt-[2em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:mt-[4em] md:mt-[4em] lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/wd/wsm.jpg'}
                                alt={'Website support and maintenance'}
                                width={367}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mr-[8em] md:mr-[8em] lg:mt-[9em] md:mt-[4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-10 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                                Why Ruby On Rails?
                            </h2>
                            <p className='text-[0.85em] font-[300] tracking-normal text-justify leading-[1.5] '>
                                Ruby on Rails remains a popular choice among our clients for back-end web application
                                development due to its strong emphasis on developer productivity, clean code
                                conventions, and rapid delivery. Its extensive library of built-in tools and frameworks
                                streamlines even the most complex tasks, allowing for faster development cycles and
                                quicker go-to-market strategies. Backed by its robust MVC architecture, Rails empowers
                                us to build scalable, maintainable, and high-performing applications—ideal for
                                businesses aiming to lead in competitive digital markets. It&#39;s a powerful foundation
                                for
                                launching reliable, future-ready platforms with efficiency and confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits of Using Ruby On Rails */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'business benefit'}
                     className={`relative lg:py-[4em] md:py-[4em] py-[2em] lg:mb-[6em] md:mb-[6em] mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Business Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Benefits of Using <br className={'lg:block md:block hidden'}/>Ruby On Rails
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Ruby on Rails streamlines the development of websites and applications, making the
                                process quicker, more efficient, and budget-friendly. It comes with a rich set of
                                built-in tools that simplify both usage and maintenance. With Rails, you get a secure,
                                scalable, and user-friendly web solution that supports your business growth with minimal
                                friction.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div id={'cost-effective'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/att1.svg' : '/assets/webd/icon2/att.svg'}
                                alt={'Cost-Effective'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Cost-Effective
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Ruby on Rails accelerates development through its comprehensive suite of built-in tools
                                and libraries, helping reduce project costs and limiting the need for extra resources.
                                Its clean, convention-driven coding standards not only streamline the development
                                process but also make ongoing maintenance simpler and more efficient. This approach
                                significantly lowers the risk of costly errors and technical debt, ensuring your
                                application remains reliable and scalable over time.
                            </p>
                        </div>
                        <div id={'flexible-scalable'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/fast1.svg' : '/assets/webd/icon2/fast.svg'}
                                alt={'Flexible & Scalable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Flexible & Scalable
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Ruby on Rails&#39; modular design and extensive library of gems provide the flexibility
                                businesses need to quickly adapt to changing market demands and evolving customer
                                expectations. This architecture enables rapid feature development and seamless
                                scalability, allowing your application to grow alongside your user base without
                                compromising on speed or performance. By leveraging these strengths, you can confidently
                                respond to new opportunities, deliver enhanced functionality faster, and maintain a
                                competitive edge in a dynamic digital landscape.
                            </p>
                        </div>
                        <div id={'secure-stable'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/test1.svg' : '/assets/webd/icon2/test.svg'}
                                alt={'Secure & Stable'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Secure & Stable
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Ruby on Rails offers robust built-in security features and receives regular updates to
                                safeguard your applications against emerging vulnerabilities. Supported by a strong,
                                active community and comprehensive documentation, Rails provides a stable and secure
                                foundation for your projects. This reliability ensures your applications remain
                                protected while maintaining performance and compliance, giving you peace of mind as your
                                business grows.
                            </p>
                        </div>
                        <div id={'high-performance'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/sca1.svg' : '/assets/webd/icon2/sca.svg'}
                                alt={'High Performance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                High Performance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Ruby on Rails enables the development of fast, efficient applications through optimised
                                code structures and advanced caching mechanisms. These features ensure your app can
                                handle high traffic volumes seamlessly, maintaining responsiveness and delivering a
                                smooth, exceptional user experience even under heavy load. By combining performance with
                                reliability, Rails helps your business scale confidently without compromising quality.
                            </p>
                        </div>
                        <div id={'rapid-development'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/cust1.svg' : '/assets/webd/icon2/cust.svg'}
                                alt={'Rapid Development'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Rapid Development
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Rails&#39; emphasis on convention over configuration accelerates development by reducing
                                the need for repetitive decision-making, allowing developers to focus on building core
                                features. This streamlined approach results in faster project launches and more
                                efficient updates, making Ruby on Rails an ideal choice for businesses with
                                time-sensitive initiatives seeking rapid time-to-market without sacrificing quality.
                            </p>
                        </div>
                        <div id={'ar-secure-stable'}>
                            <Image
                                src={isDayTime ? '/assets/webd/icon2/test1.svg' : '/assets/webd/icon2/test.svg'}
                                alt={'Secure, Stable & AR'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Secure, Stable & AR
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Ruby on Rails provides comprehensive built-in security features along with regular
                                updates to safeguard against common vulnerabilities and emerging threats. Backed by an
                                active developer community and extensive documentation, it offers a reliable and stable
                                foundation for your web applications. This commitment to security ensures that your data
                                remains protected and helps build user trust—critical factors for maintaining compliance
                                and sustaining business reputation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Work With Grey InfoTech Node.js Developers */}
            <div className={`lg:-mt-[5em] md:-mt-[5em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.1em] capitalize text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                Why Work with <br className={'lg:block md:block hidden'}/>Grey InfoTech Ruby <br
                                className={'lg:block md:block hidden'}/>On Rails Developers
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                At Grey InfoTech, we drive digital success by crafting custom Ruby on Rails applications
                                tailored to your unique business needs. Our skilled developers build dependable, highly
                                scalable solutions designed to accelerate growth and keep you ahead of the competition.
                                Backed by proven results and deep expertise
                                in <Link
                                href='/services/backend-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>
                                back-end development</Link>, we deliver robust
                                platforms that power your business forward with confidence and efficiency.
                            </p>
                        </div>
                    </div>

                    {/* Business-oriented development */}
                    <div id={'experienced-team'}
                         className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-black' : 'text-gray-500 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='text-[1.7em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                                Experienced Team
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
                                At Grey InfoTech, our skilled developers bring extensive experience in Ruby on Rails
                                development, having delivered high-performing solutions across a wide range of
                                industries. We&#39;ve successfully tackled complex business challenges through demanding
                                web application projects—building scalable, reliable platforms that drive real results.
                                Our track record reflects a deep understanding of both the framework and the strategic
                                needs of modern businesses.
                            </p>
                        </div>
                    </div>

                    {/* Dedicated Project Manager */}
                    <div id={'DPM'}
                         className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='text-[1.7em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                                Dedicated <br className={'lg:block md:block hidden'}/>project manager
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[2.7em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
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
                                Every Ruby on Rails project at Grey InfoTech is led by a dedicated project manager who
                                oversees the full development lifecycle, ensuring clear communication, consistent
                                progress, and on-time delivery. We keep clients actively involved through regular
                                updates and collaborative checkpoints, while shielding them from the technical
                                complexities. This approach allows you to stay in control and informed without getting
                                bogged down in the details—ensuring a smooth, transparent development process from start
                                to finish.
                            </p>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div id={'customer-service'}
                         className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='text-[1.7em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                                Customer Service
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3em] md:pl-[18em] md:-mt-[3.3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/ror/cs.jpg'
                                    alt='Customer Service'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                Our customer service is consistently praised by clients for its professionalism,
                                responsiveness, and reliability. We excel at addressing complex technical requirements
                                while maintaining open, transparent communication throughout every project. At Grey
                                InfoTech, we prioritise being a dependable, collaborative partner—committed to
                                delivering not just solutions, but a service experience that builds lasting trust and
                                satisfaction.
                            </p>
                        </div>
                    </div>

                    {/* Seamless Communication */}
                    <div id={'SC'}
                         className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='text-[1.7em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
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
                                At Grey InfoTech, we believe in keeping our clients fully informed throughout every
                                stage of their project. We prioritise clear, consistent communication through multiple
                                channels, providing regular updates and transparent reporting to ensure alignment. Our
                                team is committed to being responsive, flexible, and attentive—adapting to your
                                preferences and needs to foster a collaborative and productive partnership from start to
                                finish.
                            </p>
                        </div>
                    </div>

                    {/* PropTEch */}
                    <div id={'proptech'}
                         className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${isDayTime ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='text-[1.7em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                                PropTech
                            </h2>
                            <div
                                className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[4em] md:pl-[18em] md:-mt-[4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/ror/pt.jpg'
                                    alt='Property Technology'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                Ruby on Rails is an excellent fit for property technology applications, including real
                                estate marketplaces, tenant and lease management systems, and automated valuation or
                                listing tools. Its modular architecture supports the efficient handling of complex data,
                                user interactions, and integrations with third-party services. This makes it ideal for
                                building scalable, high-performing platforms that streamline operations, enhance user
                                experience, and drive digital transformation in the real estate sector.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'involved'}
                     className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                         isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                                who is involved <br className={'lg:block md:block hidden'}/>in the process
                            </h2>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                                At Grey InfoTech, Ruby on Rails development is led by a focused team committed to
                                delivering
                                results that support your business goals. A project manager oversees timelines and
                                communication, while our Rails developers build secure, scalable applications that
                                accelerate time-to-market. UI/UX designers ensure the interface is intuitive and
                                user-friendly, aligned with your brand and target audience.<br/><br/>

                                The process is supported by QA engineers who test for reliability and performance, and
                                DevOps specialists who manage deployment and system stability. Throughout the project,
                                your
                                feedback is actively integrated to ensure the final product meets expectations and
                                delivers
                                long-term business value.
                            </p><br/>
                            <Link href='/company'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                    <span
                                        className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-500' : 'text-black group-hover:text-gray-500'}`}>About Us <span
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



            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:-mt-[9em] md:-mt-[5em] lg:py-36 mb-28 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3.2em] md:text-[3.2em] sm:text-[1.5em] text-[1em] font-[500] leading-[1.2] tracking-tight mb-6'>
                            Frequently Asked Ruby <br className={'lg:block md:block hidden'}/>On Rails Questions
                        </h2>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            Have questions about whether Ruby on Rails is the right fit for your technical needs?<br
                            className={'lg:block md:block hidden'}/>
                            We&#39;re here to provide the clarity and answers you need.
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
                            <span>What is Ruby on Rails used for?</span>
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
                                Ruby on Rails is a powerful and versatile <Link
                                href='/services/Web-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                web development</Link> framework widely adopted for
                                building dynamic, feature-rich web applications. Known for its efficiency and
                                developer-friendly conventions, Rails is used to create a wide variety of solutions,
                                including content management systems (CMS), e-commerce platforms, customer relationship
                                management (CRM) tools, project management applications, and other bespoke systems
                                tailored to unique business needs. Its foundation on the Model-View-Controller (MVC)
                                architecture, combined with a strong emphasis on convention over configuration, allows
                                for rapid development without compromising code quality or scalability. This makes it
                                particularly well-suited for businesses that require fast, reliable deployment of robust
                                web applications. Whether you’re launching a startup or expanding enterprise operations,
                                Ruby on Rails offers a flexible, maintainable, and user-friendly framework that supports
                                growth and innovation across industries.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why choose Ruby on Rails for web app development?</span>
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
                                Choosing Ruby on Rails for your web application development is a strategic decision that
                                combines efficiency, scalability, and cost-effectiveness. Its streamlined framework
                                allows for faster development cycles, helping you bring products to market quickly
                                without compromising on quality. With a strong emphasis on convention over
                                configuration, Rails simplifies complex tasks and reduces development overhead. Backed
                                by a vibrant community and extensive library of tools, our team can build robust,
                                high-performing web apps that are easy to maintain and scale. Best of all, it supports
                                long-term growth while keeping costs manageable—so you can focus on delivering an
                                exceptional user experience that drives business success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to build a Ruby on Rails app?</span>
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
                                The time required to build a Ruby on Rails application depends largely on the
                                complexity, scope, and specific requirements of the project. A basic app with standard
                                features may take a few weeks to a couple of months, whereas more complex, feature-rich
                                applications—such as those involving custom integrations, third-party APIs, or advanced
                                user roles—can take several months or more. Key factors that influence the timeline
                                include the level of customisation, number of features, performance requirements, and
                                integration with external systems. At Grey InfoTech, we streamline this process by
                                working closely with you to define a clear project plan from the outset. With
                                experienced Ruby on Rails developers, structured workflows, and ongoing collaboration,
                                we help accelerate development while ensuring quality, scalability, and a smooth
                                delivery.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>
                                How are you different from other Ruby on Rails <br className={'not-sr-only'}/>development agencies in the UK?
                            </span>
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
                                We build Ruby on Rails applications using a proven development methodology refined
                                through years of hands-on experience. This structured yet flexible approach is applied
                                consistently across all client projects to ensure efficiency, clarity, and progress at
                                every stage. Understanding the complexities involved in web app development, we provide
                                expert guidance from your initial inquiry through to launch—and beyond. Each phase of
                                the process is tailored to your organisation’s specific goals, challenges, and
                                workflows, resulting in a custom solution that aligns perfectly with your business
                                objectives. Our focus is not just on delivering code, but on creating lasting value
                                through thoughtful, scalable, and maintainable applications.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default RubyOnRails;