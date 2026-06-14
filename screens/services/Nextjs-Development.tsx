'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";



const NextjsDevelopment = () => {
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
            "NWAD",
            "NCS",
            "CNAD",
            "NSSRI",
            "NSSG",
            "CWC",
            "NMS",
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
                    Next.js Development <br className={'lg:block md:block hidden'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Grey InfoTech is a leading Next.js development agency serving clients in Port Harcourt and across
                    Nigeria.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/next/hero.jpg'}
                        alt={'Next Development Hero'}
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
                            A powerhouse for developing <br className={'not-sr-only'}/>best-in-class web apps.
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            What is Next.js?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Next.js is a leading development framework widely trusted for building modern,
                                    scalable back-end solutions. Its ability to accelerate time-to-market makes it ideal
                                    for businesses looking to launch software products quickly without compromising
                                    quality. With built-in responsive design, it ensures a seamless user experience
                                    across all devices—from desktops to mobile.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Next.js also includes a suite of pre-built components that streamline development
                                    and make it easier to iterate based on customer feedback. Its flexible data-fetching
                                    strategies support a wide range of application architectures, allowing for highly
                                    customised builds. Combined with fast-loading pages, SEO-friendly performance, and
                                    active community support, Next.js stands out as a powerful, well-rounded framework
                                    for today’s fast-moving digital landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] items-center mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-6 text-center'}>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/node/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/node/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/node/1.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/node/2.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Node.js development solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'node-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] md:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.1em] md:text-[2em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                Our Next.js <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[7.5em] tracking-noromal'>
                                We leverage Next.js’s powerful static site generation capabilities to build fast,
                                lightweight static websites that can be effortlessly deployed across multiple hosting
                                platforms. This results in faster load times, lower server costs, enhanced performance,
                                and a smoother, more scalable user experience.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[6em] gap-6 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[6em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Next.js Web Application Development", target: "NWAD"},
                                    {id: "02", title: "Next.js Consulting Services", target: "NCS"},
                                    {id: "03", title: "Custom Next.js App Development", target: "CNAD"},
                                    {
                                        id: "04",
                                        title: (
                                            <>
                                                Next.js Server-Side Rendering (SSR) <br
                                                className={'not-sr-only'}/> Implementation
                                            </>
                                        ),
                                        target: "NSSRI"
                                    },
                                    {id: "05", title: "Next.js Static Site Generation (SSG)", target: "NSSG"},
                                    {id: "06", title: "Custom Web Components", target: "CWC"},
                                    {id: "07", title: "Next.js Maintenance & Support", target: "NMS"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 md:mt-3 mt-2'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-2 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[300]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[300]'}`
                                            }`}
                                        >
                                            <div className={'flex gap-2'}>
                                                <span className={'shrink-0'}>{item.id}</span>
                                                <span
                                                    className={`opacity-0 transition-opacity text-[1.5em] leading-[0.59em] ${activeId === item.target ? 'opacity-100' : ''}`}>→</span>
                                                <span>{item.title}</span>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[14.5em] md:mb-[14.5em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NWAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Next.js Web Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Responsive Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Dynamic Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>High Performance App</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Web application development with Next.js delivers a seamless and efficient
                                        experience by combining the flexibility of <Link
                                        href='/services/Reactjs-Development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                        React</Link> with the performance benefits
                                        of server-side rendering. This results in faster page load times, enhanced SEO,
                                        and a consistently responsive <Link
                                        href='/services/ui-ux-design'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                        user interface</Link> across all devices. With its
                                        powerful data-fetching capabilities, modular architecture, and streamlined
                                        deployment process, Next.js allows us to build dynamic, scalable, and
                                        high-performing web applications tailored to your business goals. Whether
                                        you&#39;re
                                        launching a new product or modernising an existing platform, Next.js provides
                                        the reliability and speed needed to stay ahead in a competitive market.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Next.js Consulting Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Tech Strategy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Engage our Next.js consulting services to gain clarity, direction, and tailored
                                        technical solutions for your business. Our expert team of business analysts and
                                        developers work closely with you to understand your goals, assess market
                                        dynamics, evaluate competitors, and identify key challenges. Through strategic
                                        insights and technical expertise, we ensure that your investment in Next.js
                                        delivers measurable value—accelerating development, enhancing performance, and
                                        positioning your product for long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CNAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Custom Next.js App Development</h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we leverage the full power of Next.js to craft bespoke
                                        applications that transform user experiences and drive tangible business
                                        results. Our deep expertise in Next.js features—such as server-side rendering,
                                        static generation, and dynamic routing—enables us to build fast, secure, and
                                        scalable solutions tailored to your unique needs. Whether you require a
                                        sophisticated <Link
                                        href='/industries/e-commerce-development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                        eCommerce</Link> platform, a real-time analytics dashboard, or
                                        collaborative tools to enhance team productivity, we align every project with
                                        your strategic goals. By thoroughly understanding your business and audience, we
                                        deliver seamless, high-performance digital products designed for both immediate
                                        impact and long-term growth, ensuring your investment adapts smoothly to future
                                        challenges and opportunities.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NSSRI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Next.js Server-Side Rendering (SSR)
                                        Implementation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Crawlable Websites</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Fast Loading</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We understand how critical it is for your website or web application&#39;s front
                                        end
                                        to be easily crawlable and discoverable by search engines. That’s why we
                                        leverage Next.js’s built-in server-side rendering (SSR) capabilities to
                                        significantly enhance both performance and SEO. By pre-rendering pages on the
                                        server, we ensure faster initial load times, better indexing by search engines,
                                        and improved visibility on search engine results pages (SERPs). This approach
                                        not only delivers a smoother user experience but also helps drive organic
                                        traffic, making your digital presence more competitive and impactful.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NSSG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Next.js Static Site Generation
                                        (SSG)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Faster Websites</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Hosting Optimisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Static Site Generation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We leverage Next.js’s powerful static site generation (SSG) feature to build
                                        high-performance static websites that are fast, efficient, and cost-effective.
                                        By pre-rendering pages at build time, these sites load almost instantly and
                                        require minimal server resources, resulting in lower hosting costs and an
                                        enhanced user experience. Additionally, static sites can be easily deployed
                                        across a wide range of hosting platforms, making them an ideal solution for
                                        businesses looking to maximise performance while keeping infrastructure simple
                                        and scalable.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CWC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Custom Web Components</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Enhanced Functionality</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Already have a software product you’re looking to enhance? Next.js is an ideal
                                        framework for building custom web components that integrate smoothly into your
                                        existing applications. Its modular architecture and flexibility make it easy to
                                        extend functionality without disrupting your current system. Whether you&#39;re
                                        adding new features, improving performance, or refining the user interface,
                                        Next.js allows for scalable enhancements that deliver a richer, more dynamic
                                        experience for your users—helping you stay competitive and aligned with evolving
                                        customer expectations.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'NMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Next.js Maintenance & Support</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Bug Fixing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>App Maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We’re with you every step of the way. At Grey InfoTech, our comprehensive
                                        Next.js maintenance and support services ensure your application continues to
                                        perform reliably and scale effectively as your business grows. From routine
                                        updates and proactive bug fixes to performance monitoring and system
                                        optimisation, our expert Next.js team provides round-the-clock support to keep
                                        your application running smoothly. With us, you gain a dependable technical
                                        partner dedicated to minimising downtime, enhancing stability, and ensuring
                                        uninterrupted functionality—so you can stay focused on driving your business
                                        forward.
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
                    src={'/assets/next/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Why Next.js */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/next/why.jpg'}
                                alt={'Why Next.js?'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[5em] md:mt-[5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                                Why Next.js?
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[2em]'>
                                Next.js is a robust and modern development framework that stands out for its ability to
                                accelerate product delivery without compromising quality. Its rapid time-to-market
                                capabilities make it a top choice for businesses aiming to deploy software quickly and
                                stay ahead in a competitive landscape. By combining the power of React with features
                                like server-side rendering and static site generation, Next.js delivers fast-loading,
                                SEO-friendly web applications that perform exceptionally across all devices. Its
                                responsive design ensures a seamless user experience whether your audience is browsing
                                on mobile, tablet, or desktop—enhancing engagement and retention from day one.<br/><br/>

                                Beyond performance, Next.js is equipped with versatile data-fetching methods and a
                                wealth of pre-built components that streamline development workflows and support custom
                                builds. These features enable your team to integrate user feedback efficiently and adapt
                                quickly to changing requirements. Whether you&#39;re building a new digital product from
                                scratch or enhancing an existing platform, Next.js offers the flexibility and
                                scalability needed to support long-term growth. With reliable community support,
                                excellent documentation, and an architecture designed for maintainability, it’s a
                                future-ready framework that empowers your business to build high-quality, dynamic web
                                applications that evolve alongside your goals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next.js features and functionality */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[5em] md:mt-[5em] lg:pr-[2.7em] md:pr-[2.7em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-6 md:text-[2em] lg:text-[3em] w-auto h-auto '>
                                Next.js Features <br className={'lg:block md:block hidden'}/>and Functionality
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                Next.js empowers businesses to build dynamic, high-performing digital experiences—from
                                real-time interactive dashboards to personalised landing pages that drive lead
                                generation. Its support for Progressive Web Apps ensures accessibility even offline,
                                while secure client portals enhance user engagement and customer satisfaction.<br/><br/>
                                We also specialise in seamless migration of existing websites and applications to
                                Next.js, minimising downtime and preserving SEO integrity. This strategic move boosts
                                performance, security, and scalability, enabling your platform to adapt and grow with
                                your business needs.
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

            {/* Why Work With Grey InfoTech Next.js Developers */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.05em] capitalize text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Why Work with <br className={'lg:block md:block hidden'}/>Grey InfoTech <br
                            className={'lg:block md:block hidden'}/>Next.js Developers
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            At Grey InfoTech, we’re committed to driving your digital success. Collaborating closely
                            with you, we build Next.js applications tailored specifically to your business goals,
                            turning your vision into reality. Our skilled developers focus on delivering reliable,
                            highly scalable solutions that support your company’s growth journey. Don’t just take our
                            word for it—explore our case studies to see the impact we’ve made.
                        </p>
                    </div>
                </div>

                {/* Business-oriented development */}
                <div id={'BSD'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
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
                            Our approach to crafting your custom app solution centers on aligning development with your
                            company’s core business goals. We begin with an in-depth discovery phase and maintain close
                            communication throughout the project. Understanding your need for a high-value product, we
                            prioritize smooth implementation, straightforward maintenance, and delivering a strong
                            return on investment—utilizing the latest industry innovations and best practices.
                        </p>
                    </div>
                </div>

                {/* Dedicated Project Manager */}
                <div id={'DPM'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
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
                            Every Next.js project at Grey InfoTech is assigned a dedicated project manager who oversees
                            the entire development process from start to finish. We provide clear, consistent progress
                            updates and ensure you’re involved at every key stage—giving you full visibility, control,
                            and confidence as your application takes shape.
                        </p>
                    </div>
                </div>

                {/* Seamless communication */}
                <div id={'SC'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
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
                            At Grey InfoTech, we prioritise clear, consistent communication to keep you fully engaged
                            throughout the development process. We foster a transparent, collaborative environment where
                            your feedback is valued and swiftly implemented. With dedicated tools and channels for
                            real-time updates and progress tracking, you’ll always have visibility and control—ensuring
                            the final product aligns seamlessly with your business objectives.
                        </p>
                    </div>
                </div>

                {/* Dedicated Team */}
                <div id={'DT'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Dedicated Team
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.2em] md:pl-[18em] md:-mt-[3.2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
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
                            Grey InfoTech is your trusted digital partner, offering highly skilled Next.js engineers who
                            integrate seamlessly with your in-house team. Acting as dedicated developers under your
                            direction, we prioritise clear communication, full transparency, and a collaborative
                            approach. With a deep understanding of your goals, we work alongside you to deliver
                            exceptional, scalable software solutions tailored to your unique business
                            requirements—driving efficiency, performance, and long-term success.
                        </p>
                    </div>
                </div>

                {/* Proactive risk assessment & rigorous testing */}
                <div id={'prart'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Proactive Risk <br className={'lg:block md:block hidden'}/>Assessment & <br
                            className={'lg:block md:block hidden'}/>Rigorous Testing
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3em] md:pl-[18em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/next/prart.jpg'
                                alt='Proactive risk assessment & rigorous testing'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We ensuring the highest level of security and performance in your Next.js
                            solution is our top priority. We proactively assess potential risks,
                            address <Link
                            href='/services/backend-development'
                            className={`border-b-[1px] border-gray-300 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                            back-end development</Link> challenges early, and conduct rigorous pre-launch testing to
                            ensure your
                            application functions flawlessly from day one. Committed to best practices, we align our
                            processes with the ISO 27001 standard for information security management—giving you
                            confidence that your data and systems are handled with the utmost care and professionalism.
                        </p>
                    </div>
                </div>

                {/* Data security and confidentiality */}
                <div id={'DSC'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Data Security <br className={'lg:block md:block hidden'}/>And Confidentiality
                        </h2>
                        <div
                            className='absolute lg:block md:block sm:hidden lg:pl-[18em] lg:-mt-[3.4em] md:pl-[18em] md:-mt-[3.4em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/next/dsc.jpg'
                                alt='Data security and confidentiality'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We implements robust data security and confidentiality protocols to protect every
                            aspect of your Next.js application development. As part of our commitment to safeguarding
                            your intellectual property, we begin each collaboration with a Non-Disclosure Agreement
                            (NDA). We also ensure all communication takes place over secure channels, maintaining the
                            highest levels of privacy and discretion throughout your project journey.
                        </p>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em] md:mr-[8em] lg:mt-[2em] md:mt-[2em] '}>
                        <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            At Grey InfoTech, Next.js development is handled by a focused team dedicated to building
                            fast, scalable, and SEO-friendly web applications. A project manager leads the process,
                            ensuring timelines and communication stay on track, while our Next.js developers implement
                            server-side rendering, API integrations, and performance optimization. Designers collaborate
                            to create clean, responsive interfaces that elevate the user experience.<br/><br/>

                            QA engineers test the application for speed, functionality, and device compatibility, while
                            DevOps specialists manage deployment and ongoing maintenance. Your feedback is included
                            throughout the process to ensure the final product aligns with your business goals and
                            delivers long-term value.
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



            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently asked <br className={'lg:block md:block hidden'}/>Next.js questions
                        </h2>
                        <p className={'font-[300] text-[0.87em] leading-[1.2] '}>
                            We believe Next.js is one of the top frameworks for building modern web applications—and
                            <br className={'lg:block md:block hidden'}/>we’d love for you to see why. Let us guide you
                            through
                            some frequently asked questions about
                            <br className={'lg:block md:block hidden'}/>Next.js and show you what makes it such a
                            powerful choice
                            for your business.
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
                            <span>What exactly is Next.js?</span>
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
                                Next.js is a powerful open-source <Link
                                href='/services/Web-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                web development</Link> framework built on <Link
                                href='/services/Nodejs-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                Node.js</Link> and React,
                                designed to streamline the creation of modern, high-performance web applications. It
                                enables server-side rendering (SSR) and static site generation, offering enhanced speed,
                                scalability, and SEO optimisation. With features like automatic code splitting,
                                client-side routing, and simplified deployment, Next.js allows developers to build
                                dynamic, user-friendly applications efficiently. Its flexibility and performance make it
                                a preferred choice for businesses seeking fast, responsive, and scalable web solutions
                                with minimal configuration.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can Next.js be employed for frontend or backend development?</span>
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
                                Next.js is primarily used for front-end development, enabling the creation of
                                interactive, dynamic user interfaces with the power of React. However, its built-in
                                support for server-side rendering (SSR) and API routes extends its functionality to the
                                back end as well—making it a highly versatile framework for full-stack development. This
                                combination allows businesses to build seamless, high-performance applications that
                                handle both client-side experiences and server-side logic within a unified codebase.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How scalable are Next.js applications?</span>
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
                                Next.js applications are built for scalability, making them ideal for growing businesses
                                and high-traffic environments. With features like server-side rendering, automatic code
                                splitting, and incremental static generation (ISG), Next.js ensures fast load times and
                                optimal performance even under heavy user demand. Its efficient routing and
                                data-fetching capabilities enable seamless handling of complex, large-scale projects.
                                This flexibility makes Next.js a reliable framework for building dynamic,
                                high-performing applications that evolve alongside your business needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does it cost to develop a Next.js project?</span>
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
                                The cost of developing a Next.js application depends on several factors, including the
                                complexity of the project, required features, and overall development timeline. Since
                                every project is unique, it&#39;s challenging to provide an accurate estimate without
                                understanding your specific requirements. Get in touch with us to discuss your goals,
                                and we’ll offer a tailored quote based on your needs and budget.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the benefits of outsourcing Next.js?</span>
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
                                Outsourcing Next.js development to the right partner brings numerous strategic
                                advantages. It gives you access to highly skilled developers with deep expertise in the
                                framework, without the overhead of managing in-house teams or infrastructure. This
                                approach reduces operational costs, accelerates delivery timelines, and allows dedicated
                                teams to stay focused on delivering quality outcomes. Additionally, outsourcing
                                introduces fresh perspectives and innovative problem-solving, often resulting in more
                                efficient and refined digital products. Most importantly, it offers the flexibility to
                                scale your project as business needs evolve, ensuring agility throughout the development
                                lifecycle.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What development process do you follow?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                At Grey InfoTech, we build Next.js applications using a proven approach shaped by years
                                of hands-on experience across diverse projects. Our method emphasises efficient,
                                step-by-step development—ensuring a smooth journey from initial consultation through to
                                launch and long-term support. We understand the challenges that come with application
                                development, which is why we provide tailored guidance at every stage, aligning our
                                process with your unique business goals and technical requirements.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is Next.js still relevant in 2025?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                As we move through 2025, Next.js continues to solidify its position as a leading web
                                development framework. Its seamless React integration, advanced SEO optimisation, and
                                cutting-edge features keep it at the forefront of modern web technologies. Backed by an
                                active, innovative community and frequent updates, Next.js evolves to meet the shifting
                                demands of the digital landscape. For businesses and developers focused on creating
                                fast, dynamic, and user-centric web applications, Next.js remains an indispensable,
                                future-ready platform built to adapt and scale with emerging trends.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default NextjsDevelopment;