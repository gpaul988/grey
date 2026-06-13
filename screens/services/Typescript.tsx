'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";


// Testimonial data
const testimonials = [
    {
        name: "Nneka Okoye",
        title: "CTO, AgroLink ",
        message: (
            <>
                They delivered an innovative, scalable solution that transformed how we connected farmers to markets
                across Nigeria. Their team&#39;s expertise and commitment helped us launch quickly and efficiently.
            </>
        ),
    },
    {
        name: "Kwesi Boateng",
        title: "CEO, FinServe ",
        message: (
            <>
                Partnering with Grey InfoTech was a game-changer for our digital lending platform. Their deep technical
                knowledge and agile approach enabled us to meet tight deadlines without compromising quality. Grey
                InfoTech is a trusted partner for any company looking to innovate in the fintech space.
            </>
        )
    },
    {
        name: "Amina Diallo",
        title: "Head of Product, MedConnect",
        message: (
            <>
                Their team understood our vision from day one and built a user-friendly, secure healthcare app that
                truly meets the needs of our community. Their professionalism and responsiveness made the entire
                development process seamless and stress-free. We highly recommend them.
            </>
        )
    }
];


const Typescript = () => {
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
            "TWAD",
            "TIS",
            "TAD",
            "TMS",
            "SAD",
            "TSMS",
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
                 className={"relative overflow-hidden lg:w-full lg:h-[720px] justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6"}>
                <video
                    src="/assets/type/hero.webm"
                    autoPlay
                    loop
                    muted
                    className="lg:w-full lg:h-[720px] md:w-full md:h-[700] w-full h-[700] object-cover"
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white' : 'text-white'}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.1] font-[600]`}>
                            TypeScript <br className={'lg:block md:block hidden'}/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Grey InfoTech is a TypeScript development agency serving clients in Port Harcourt,
                                Nigeria, and worldwide, delivering robust, scalable, and high-performance web solutions.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[8em]'}>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Team Members</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>123+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Products Launched</p>
                            </div>
                        </div>
                    </div>
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
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-8 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className={'pt-2'}>
                        <h6 className='constant-text uppercase text-[0.85em] leading-[1.3]lg:font-[600] font-[600] tracking-wider'>
                            Trusted TypeScript <br className={'lg:block md:block hidden'}/>Specialists
                        </h6>
                    </div>
                    <div
                        className='lg:-ml-[25em] md:-ml-[16em] md:pl-[6em] mx-auto w-auto sm:break-words sm:whitespace-normal'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            TypeScript Development
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech’s dedicated TypeScript development team specializes in building
                                    scalable, enterprise-grade applications that drive long-term business growth.
                                    TypeScript, trusted by global leaders like Slack, Asana, and Microsoft Teams, is a
                                    versatile technology for both front-end and <Link
                                    href='/services/backend-development'
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>back-end
                                    development</Link>, making it ideal
                                    for complex solutions in industries such as real estate, <Link
                                    href='/industries/fintech'
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>fintech</Link>, <Link
                                    href='/industries/e-commerce-development'
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>eCommerce</Link>,
                                    and
                                    education. By leveraging TypeScript’s robust ecosystem, our developers create
                                    applications that are maintainable, high-performing, and fully aligned with your
                                    strategic objectives, providing a solid digital foundation for future expansion.
                                </p>
                            </div>
                            <div>
                                <p>
                                    As a superset of <Link href='/services/Javascript'
                                                           className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>JavaScript</Link>,
                                    TypeScript retains all the flexibility of its
                                    predecessor while introducing static type-checking, enhanced tooling, and error
                                    reduction capabilities. These advantages enable our team to deliver software that is
                                    not only reliable and secure but also optimized for scalability and seamless
                                    integration across your technology stack. By combining efficient development
                                    practices with TypeScript’s strengths, Grey InfoTech ensures rapid delivery of
                                    high-quality solutions that support innovation, reduce long-term maintenance costs,
                                    and accelerate time to market.
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
                                src={'/assets/type/1.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/type/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/type/2.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/type/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our TypeScript development solutions */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'vuejs-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Our TypeScript <br className={'lg:block md:block sm:hidden'}/>Development <br
                                className={'lg:block md:block sm:hidden'}/>Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Our TypeScript development services deliver robust, scalable, and maintainable
                                applications with cleaner code and enhanced reliability. By leveraging TypeScript’s
                                strong typing and modern features, we create solutions that improve performance, reduce
                                errors, and accelerate development for businesses of all sizes.
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
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] font-[300] relative space-y-1 md:break-words md:whitespace-normal ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "TypeScript Web Application Development", target: "TWAD"},
                                    {id: "02", title: "TypeScript Integration Services", target: "TIS"},
                                    {id: "03", title: "TypeScript API Development", target: "TAD"},
                                    {id: "04", title: "TypeScript Migration Services", target: "TMS"},
                                    {id: "05", title: "Serverless Application Development", target: "SAD"},
                                    {id: "06", title: "TypeScript Maintenance & Support", target: "TSMS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[17.5em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TWAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        TypeScript Web Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Web Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Angular</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>React</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Vue.js</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we leverage TypeScript alongside leading <Link
                                        href='/services/Javascript'
                                        className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>JavaScript</Link> frameworks
                                        such as <Link href='/services/angular-development'
                                                      className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>Angular</Link>, <Link
                                        href='/services/Reactjs-Development'
                                        className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>React</Link>,
                                        and <Link href='/services/Vuejs-Development'
                                                  className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>Vue.js</Link> to
                                        build robust, scalable <Link href='/services/Web-Application'
                                                                     className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>web
                                        applications</Link> tailored to your business needs. TypeScript’s strong typing
                                        and advanced tooling allow us to identify potential issues early in the
                                        development process, ensuring precision without sacrificing flexibility. The
                                        result is a reliable, high-performing foundation for your digital
                                        projects—whether you are launching a new application or enhancing existing
                                        systems—designed to support long-term scalability and seamless adaptability.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TIS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        TypeScript Integration Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>System Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Data Compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Third-party Services</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Smooth Connectivity</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, our expertise spans multiple development languages and
                                        technologies, enabling us to seamlessly integrate your TypeScript applications
                                        with diverse systems, databases, and third-party services. Our goal is to create
                                        a unified and efficient digital ecosystem where every component communicates
                                        flawlessly, ensuring smooth data flow, optimal compatibility, and enhanced
                                        operational efficiency. By delivering fully interconnected solutions rather than
                                        isolated applications, we provide the reliability and cohesion your business
                                        needs to operate at its highest potential.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        TypeScript API Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Secure Server-side API&#39;s</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Real-time Responses</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>High-performance Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, our developers understand the importance of security,
                                        performance, and reliability in modern server-side solutions. By integrating
                                        TypeScript with <Link href='/services/Nodejs-Development'
                                                              className={`border-b-[1px] ${isDayTime ? 'hover:border-white border-gray-800' : 'hover:border-black border-gray-300'}`}>Node.js</Link>,
                                        we build robust back-end applications and APIs capable
                                        of handling high traffic and complex data operations with ease. This combination
                                        allows us to deliver responsive, secure, and high-performing solutions—ideal for
                                        data-intensive applications, real-time services, and enterprise-grade
                                        systems—ensuring your digital infrastructure operates seamlessly and
                                        efficiently.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        TypeScript Migration Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>JavaScript to TypeScript</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Codebase Transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Application Modernisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless Migration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        If your existing product is built in JavaScript and requires modernization, Grey
                                        InfoTech’s TypeScript migration services ensure a smooth and risk-free
                                        transition. Our experts seamlessly convert legacy JavaScript codebases into
                                        TypeScript, enhancing code reliability, maintainability, and long-term
                                        scalability without disrupting your operations. This upgrade allows your
                                        applications to leverage advanced TypeScript features—such as type safety, early
                                        error detection, and improved performance—ensuring your product remains
                                        future-ready and fully optimized for evolving business demands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'SAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Serverless Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>TypeScript Serverless Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Azure Functions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        If your goal is to embrace serverless architecture, Grey InfoTech can deliver
                                        scalable solutions by leveraging TypeScript with platforms like AWS Lambda and
                                        Azure Functions. Our serverless applications are designed to automatically adapt
                                        to fluctuating workloads, ensuring optimal performance, cost efficiency, and
                                        streamlined resource management. By removing the need to manage traditional
                                        server infrastructure, we help your business achieve faster deployment, improved
                                        scalability, and a resilient foundation for modern cloud-based applications.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TSMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        TypeScript Maintenance & Support
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Ongoing Support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Bug Fixes</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Performance Update</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we offer comprehensive maintenance and support services for
                                        TypeScript applications, ensuring your software remains secure, reliable, and
                                        high-performing over its entire lifecycle. Our team provides proactive bug
                                        resolution, regular updates, and performance optimization to maintain seamless
                                        operation and user satisfaction. By continuously monitoring and enhancing your
                                        applications, we ensure they remain adaptable to evolving business requirements
                                        and technological advancements, giving you a future-ready digital solution in a
                                        fast-changing landscape.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[26em] md:-mt-[25em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/type/mid.jpg'}
                    alt={'Middle  Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* TypeScript Consulting */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-8 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className={'pt-2'}>
                        <h6 className='constant-text uppercase text-[0.85em] leading-[1.3]lg:font-[600] font-[600] tracking-wider'>
                            Expert solutions for <br className={'lg:block md:block hidden'}/>optimized development
                        </h6>
                    </div>
                    <div
                        className='lg:-ml-[25em] md:-ml-[16em] md:pl-[6em] mx-auto w-auto sm:break-words sm:whitespace-normal'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            TypeScript Consulting
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we position ourselves as a seamless extension of your team,
                                    working to ensure every development initiative aligns with your organization’s
                                    strategic goals and delivers tangible business value. Our TypeScript consulting
                                    services are designed to help you evaluate, refine, and optimize your applications
                                    with a focus on scalability, performance, and long-term maintainability. By
                                    leveraging our expertise, you gain a trusted partner that can guide you through
                                    critical technical decisions, streamline development processes, and ensure your
                                    digital investments deliver maximum return.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Our consulting support covers a full spectrum of services, including the
                                    implementation of industry best practices, comprehensive code reviews, and strategic
                                    architectural guidance to ensure your teams are fully utilizing TypeScript’s
                                    capabilities. Even if your project requirements are not yet fully defined, we work
                                    closely with your stakeholders to clarify priorities, identify potential risks, and
                                    establish a clear, actionable roadmap. This proactive approach ensures that the
                                    solutions we help you develop are not only robust and future-ready but also aligned
                                    with your broader organizational objectives, supporting sustainable growth in an
                                    evolving digital landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why choose Typescript for your project */}
            <div className={`border-b border-black bg-white`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[7em] md:mt-[3em] lg:-mr-[5.5em] md:pr-[2.7em] text-black h-auto w-auto mx-auto`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Why Choose TypeScript <br className={'lg:block md:block hidden'}/> for Your Project
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                TypeScript, a superset of JavaScript, preserves all the language’s core capabilities
                                while introducing static type-checking, advanced tooling, and enhanced error detection
                                to create more secure, maintainable, and reliable code. These added features not only
                                reduce development risks but also accelerate delivery by improving code quality and
                                streamlining collaboration across teams. At Grey InfoTech, we harness TypeScript’s
                                strengths to build robust, scalable applications that span both front-end and back-end
                                development, ensuring every solution is optimized for long-term performance,
                                adaptability, and alignment with your organization’s strategic objectives.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[11.3em] md:mr-[em] lg:ml-[3.5em] md:ml-[em]'}>
                            <Image
                                src={'/assets/fin/data.jpg'}
                                alt={'customer'}
                                width={600}
                                height={500}
                                className={'mx-auto h-auto w-auto'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* TypeScript business benefits */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div id={'benefit of using typescript'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* TypeScript Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] sm:mb-[5em] mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2.5em] lg:text-[3.3em] font-[550] break-words whitespace-normal tracking-tight leading-[1.15] lg:pb-6'>
                                TypeScript <br className={'lg:block md:block hidden'}/>Business Benefits
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Here are some of the key business and technical advantages that make TypeScript an ideal
                                choice for organizations looking to build reliable, scalable, and future-ready digital
                                products.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'higher code quality'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/att.svg' : '/assets/type/icon/att1.svg'}
                                alt={'Higher Code Quality'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Higher Code Quality
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                TypeScript’s static type-checking enables our team to detect and resolve potential code
                                issues early in the development cycle, minimizing delays and reducing the likelihood of
                                bugs in production. This proactive approach not only streamlines the development process
                                but also ensures the delivery of a secure, stable, and high-performing application that
                                meets your business objectives with confidence.
                            </p>
                        </div>
                        <div id={'future proofing'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/fast.svg' : '/assets/type/icon/fast1.svg'}
                                alt={'Future Proofing'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Future Proofing
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we prioritize future-ready development to ensure your digital products
                                remain relevant as technologies evolve. By leveraging TypeScript’s forward
                                compatibility, we create codebases that maintain functionality even as JavaScript
                                standards advance, reducing the risk of costly rewrites. Building your product with
                                TypeScript ensures long-term stability, alignment with emerging web standards, and a
                                sustainable foundation for future growth.
                            </p>
                        </div>
                        <div id={'faster development cycles'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/test.svg' : '/assets/type/icon/test1.svg'}
                                alt={'Faster Development Cycles'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Faster Development Cycles
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                If speed to market is a priority, TypeScript provides a clear advantage by streamlining
                                the development process. Its deep integration with modern IDEs, combined with features
                                like autocompletion, intelligent code suggestions, and inline error detection, enables
                                our team to work efficiently while minimizing rework. This accelerated workflow not only
                                reduces development time and costs but also ensures we can deliver high-quality,
                                reliable applications at speed—helping you meet critical business goals and capitalize
                                on market opportunities faster.
                            </p>
                        </div>
                        <div id={'interoperability'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/sca.svg' : '/assets/type/icon/sca1.svg'}
                                alt={'Interoperability'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Interoperability
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we focus on efficiency and value, not reinventing the wheel. As a
                                superset of JavaScript, TypeScript is fully compatible with existing JavaScript
                                libraries, frameworks, and tools, allowing us to leverage your current assets without
                                the need to start from scratch. This seamless integration enables us to enhance and
                                extend your existing solutions, accelerating development timelines, reducing costs, and
                                delivering a modern, scalable application that aligns with your business objectives.
                            </p>
                        </div>
                        <div id={'cost efficiency'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/risk.svg' : '/assets/type/icon/risk1.svg'}
                                alt={'Cost Efficiency'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Cost Efficiency
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we recognize that every development decision must be supported by a
                                clear cost-benefit analysis. While commissioning a TypeScript product involves an
                                initial investment, the long-term advantages consistently outweigh the upfront costs.
                                TypeScript’s reduction in runtime errors, improved maintainability, and advanced
                                developer tooling lead to faster development cycles, fewer production issues, and lower
                                ongoing maintenance costs. The result is a durable, cost-efficient solution that
                                delivers sustained value and maximizes your return on investment over the product’s
                                lifecycle.
                            </p>
                        </div>
                        <div id={'enhanced performance'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/cust.svg' : '/assets/type/icon/cust1.svg'}
                                alt={'Enhanced Performance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Enhanced Performance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                While TypeScript does not directly enhance the runtime performance of your web
                                applications, its strict type-checking and structured coding approach encourage
                                developers to write cleaner, more consistent, and maintainable code. This disciplined
                                development process often leads to indirect performance benefits, such as fewer runtime
                                errors, optimized logic, and more efficient code execution—resulting in applications
                                that are stable, reliable, and better prepared to scale with your business needs.
                            </p>
                        </div>
                        <div id={'scalable architecture'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/sca.svg' : '/assets/type/icon/sca1.svg'}
                                alt={'Scalable Architecture'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Scalable Architecture
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we focus on building digital products that grow seamlessly alongside
                                your business. TypeScript is inherently designed for scalability, and its modular
                                architecture allows our team to add new features, enhance functionality, and manage
                                increasing complexity with ease. By leveraging these capabilities, we ensure your
                                application remains adaptable, robust, and future-ready—capable of meeting evolving
                                market demands and supporting your organization’s long-term growth without disruption.
                            </p>
                        </div>
                        <div id={'collaboration'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/fast.svg' : '/assets/type/icon/fast1.svg'}
                                alt={'Collaboration'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Collaboration
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, collaboration drives every project we undertake, and TypeScript
                                naturally supports this approach through its clear, self-documenting code structure. By
                                making code easier to read, maintain, and understand, TypeScript enhances teamwork among
                                developers, simplifies onboarding for new team members, and streamlines coordination
                                across departments. This clarity leads to smoother workflows, fewer miscommunications,
                                and more efficient project delivery—ensuring your digital products are developed with
                                precision and cohesion from start to finish.
                            </p>
                        </div>
                        <div id={'proactive issues resolution'}>
                            <Image
                                src={isDayTime ? '/assets/type/icon/att.svg' : '/assets/type/icon/att1.svg'}
                                alt={'Proactive Issue Resolution'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Proactive Issue Resolution
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, our goal is to ensure your digital product can grow and evolve
                                seamlessly alongside your business. TypeScript is inherently built for scalability, and
                                its modular architecture allows our team to expand functionality, integrate new
                                features, and manage increasing complexity without disruption. By leveraging these
                                capabilities, we create solutions that remain robust, adaptable, and
                                future-ready—empowering your product to meet new challenges and market demands with
                                confidence as your organization continues to scale.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* What Grey InfoTech Does */}
            <div
                className={` lg:pt-[3em] md:pt-[3em] sm:pt-[2em] pt-[2em] lg:pb-[3em] md:pb-[3em] sm:pb-[2em] pb-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mx-auto mb-4'}>
                            <Image
                                src={'/assets/vue/grey.jpg'}
                                alt={'What Grey InfoTech Does'}
                                width={1000}
                                height={1300}
                                className={'mx-auto w-auto h-auto'}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[5em] md:mt-[5em]`}>
                            <h2
                                className='text-[1.5em] sm:text-[2.2em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[3em]'>
                                What Grey InfoTech Does
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                At Grey InfoTech, our deep expertise in TypeScript and its advanced capabilities allows
                                us to deliver cutting-edge web applications tailored to the specific requirements of
                                each client. By leveraging TypeScript’s robust type system, sophisticated tooling, and
                                extensive library ecosystem, our developers build scalable, maintainable, and
                                high-performing solutions across diverse industries and use cases. This proficiency
                                enables us to address complex challenges with precision while ensuring that every
                                application is optimized for long-term reliability and growth.<br/><br/>

                                Our commitment extends beyond functionality—we focus on creating applications that
                                provide engaging, intuitive, and seamless user experiences. Every solution we deliver is
                                designed to not only meet but exceed client expectations, driving user satisfaction and
                                supporting your organization’s broader digital objectives with future-ready,
                                business-aligned software.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* last image*/}
            <div id={'last image'}
                 className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/type/last.jpg'}
                    alt={'Last Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Digital Products Suited to TypeScript */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[4em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.2em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.2]`}>
                            Digital Products <br className={'lg:block md:block hidden'}/>Suited to TypeScript
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            TypeScript is a highly popular language for a reason. As a superset of JavaScript, it offers
                            versatility for both front-end and back-end development. While effective for smaller tasks,
                            it truly excels in long-term and large-scale projects. Here’s a quick overview of the types
                            of applications you can build with TypeScript.
                        </p>
                    </div>
                </div>

                {/* Chat Application */}
                <div id={'chatapp'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Chat Application
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[2.5em] md:-mt-[2.5em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/type/chat.jpg'}
                                alt='Chat Application'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            TypeScript’s seamless compatibility with a wide range of libraries and frameworks makes it
                            an ideal choice for building chat tools and other real-time applications. Its strong type
                            system and structured development approach enhance code reliability and maintainability,
                            while its integration with modern frameworks enables the creation of scalable,
                            high-performance solutions. This combination ensures that real-time applications built with
                            TypeScript are responsive, stable, and capable of supporting dynamic, user-driven
                            interactions with ease.
                        </p>
                    </div>
                </div>

                {/* Enterprise-scale Applications */}
                <div id={'enterprise-scall application'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Enterprise-scale <br className={'lg:block md:block hidden'}/>Applications
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[16em] md:pl-[14em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={'/assets/type/enterprise.jpg'}
                                alt='Enterprise-scale Applications'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            TypeScript’s built-in static typing and object-oriented capabilities make it exceptionally
                            well-suited for developing enterprise-scale applications such as workflow platforms,
                            communication solutions, and developer tools. Its structured approach supports the creation
                            of complex systems where maintainability, scalability, and long-term reliability are
                            critical. By enabling cleaner, more predictable code and simplifying the management of large
                            codebases, TypeScript provides a robust foundation for building sophisticated business
                            applications that can adapt and grow with organizational needs.
                        </p>
                    </div>
                </div>

                {/* Real-time Dashboards */}
                <div id={'real-time dashboard'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Real-time <br className={'lg:block md:block hidden'}/>Dashboard
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/real.jpg'}
                                alt='Real-time Dashboards'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, we recognize TypeScript’s powerful role in enabling the development of
                            dynamic, real-time dashboards. When combined with reactive frameworks, TypeScript allows us
                            to build highly interactive dashboards that update seamlessly, delivering instant,
                            data-driven insights. This approach ensures your users have access to accurate, timely
                            information, empowering informed decision-making and enhancing overall business agility.
                        </p>
                    </div>
                </div>

                {/* Interactive Web Applications Powered by Node.js */}
                <div id={'interactive web application'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Interactive Web <br className={'lg:block md:block hidden'}/>Apps with Node.js
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/interact.jpg'}
                                alt='Interactive Web Applications Powered by Node.js'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Combining a <Link href='/services/Nodejs-Development'
                                              className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>Node.js</Link>-powered
                            backend with TypeScript creates a dynamic foundation for
                            developing interactive <Link href='/services/Web-Application'
                                                         className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>web
                            applications</Link>. This full-stack approach ensures consistency and
                            efficiency across both <Link href='/services/frontend-development'
                                                         className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>front-end</Link> and <Link
                            href='/services/backend-development'
                            className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>back-end
                            development</Link>, enabling the delivery of
                            cohesive, robust solutions. By leveraging this synergy, we build smart, scalable
                            applications that streamline development workflows while enhancing performance and
                            maintainability throughout your digital ecosystem.
                        </p>
                    </div>
                </div>

                {/* Progressive Web Apps (PWAs) */}
                <div id={'progressive web apps'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Progressive Web <br className={'lg:block md:block hidden'}/>Apps (PWAs)
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/pwa.jpg'}
                                alt='Progressive Web Apps (PWAs)'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            TypeScript’s seamless compatibility with modern web frameworks makes it an ideal choice for
                            developing Progressive Web Apps (PWAs). These applications deliver native app-like
                            experiences, and by leveraging TypeScript’s advanced features, we enhance their performance,
                            reliability, and user engagement. This results in scalable, high-quality PWAs that meet the
                            evolving demands of today’s digital users.
                        </p>
                    </div>
                </div>

                {/* Websites */}
                <div id={'websites'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Websites
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/websites.jpg'}
                                alt='Websites'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At its core, TypeScript offers the versatility and robustness needed to develop a wide range
                            of web solutions, from simple static websites to complex, dynamic platforms. Its strong
                            typing and modular architecture enable the creation of maintainable, scalable, and
                            high-performance applications that align with evolving business requirements. This
                            flexibility ensures that whether your project demands a straightforward online presence or a
                            sophisticated digital ecosystem, TypeScript provides a reliable foundation that supports
                            both current needs and future growth with confidence and efficiency.
                        </p>
                    </div>
                </div>

                {/* Mobile Applications */}
                <div id={'mobile application'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Mobile Applications
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/mobile.jpg'}
                                alt='Mobile Applications'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            TypeScript serves as an excellent collaborator in cross-platform <Link
                            href='/services/Mobile-Application-Development'
                            className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-200'}`}>mobile
                            development</Link>.
                            Leveraging frameworks such as <Link href='/services/React-Native-Development'
                                                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white  border-gray-800' : 'hover:border-black border-gray-300'}`}>React
                            Native</Link> and NativeScript, our developers utilize
                            TypeScript’s strong typing and robust tooling to build sophisticated, high-quality mobile
                            applications that perform seamlessly across multiple platforms, delivering consistent user
                            experiences and efficient maintainability.
                        </p>
                    </div>
                </div>

                {/* Desktop Applications */}
                <div id={'desktop applications'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Desktop <br className={'lg:block md:block hidden'}/>Applications
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/desktop.jpg'}
                                alt='Desktop Application'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Likewise, our expert team leverages TypeScript with frameworks like Electron to develop
                            fast, scalable, and reliable cross-platform desktop applications. By combining TypeScript’s
                            strong typing, maintainability, and robust tooling with Electron’s flexibility, we deliver
                            desktop solutions that provide consistent performance, seamless functionality, and long-term
                            adaptability across operating systems.
                        </p>
                    </div>
                </div>

                {/* Backend Systems */}
                <div id={'backend systems'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Backend Systems
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/type/backend.jpg'}
                                alt='Backend Systems'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            TypeScript and Node.js form a powerful combination for building resilient, enterprise-grade
                            back-end solutions. At Grey InfoTech, we leverage this dynamic duo to develop robust APIs,
                            scalable microservices, and high-performance server-side systems designed for reliability,
                            maintainability, and seamless integration. This approach ensures your digital infrastructure
                            is secure, efficient, and fully equipped to support long-term business growth.
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
                    <div className={'lg:mr-[9em] md:mr-[2em]'}>
                        <h2 className='lg:text-[3em] md:text-[2em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            At Grey InfoTech, our TypeScript development services are executed by a dedicated team
                            focused on creating robust, maintainable, and scalable applications aligned with your
                            business objectives. A project manager leads the process, ensuring clear communication,
                            milestone tracking, and smooth collaboration. Our TypeScript developers leverage strong
                            typing and modern frameworks to deliver secure, high-performance solutions that reduce
                            errors and accelerate time-to-market.<br/><br/>

                            Supporting the development process are UI/UX designers who craft intuitive, user-friendly
                            interfaces, QA engineers who conduct thorough testing for functionality and reliability, and
                            DevOps specialists who manage seamless deployment and system performance. Your input is
                            integrated at every stage, ensuring the final solution not only meets your technical
                            requirements but also drives tangible business results.
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
                        className="relative flex flex-row lg:-ml-[2em] md:-ml-[1em] w-full h-auto max-w-full mx-auto gap-6">
                        <div className="flex-1 flex lg:-mr-[17.5em] md:-mr-[15.5em] justify-center items-center">
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
                                    className="object-fill mx-auto w-auto h-auto"
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
                                className="object-fill mx-auto w-auto h-auto"
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
                <div
                    className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-6 lg:pb-[5em] md:pb-[5em] pb-[2em]`}>
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
                className={`relative lg:pt-[6em] md:pt-[6em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] max-w-full w-full  h-auto ${
                    isDayTime ? 'bg-white' : 'bg-black'
                }`}>
                <div
                    className={`relative mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-6 ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <h5 className="uppercase text-xs font-[500] tracking-widest mb-4">What our clients say</h5>
                    </div>
                    <div className={'lg:ml-[-20em] md:ml-[-20em]'}>
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[10em] md:pb-[10em] pb-[2em] lg:mb-[10em] md:mb-[10em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>TypeScript Questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            We strongly believe TypeScript is one of the most powerful tools for building modern
                            applications. <br className={'lg:block md:block hidden'}/>To help you share that confidence,
                            here are
                            key insights and answers to some of the most frequently <br
                            className={'lg:block md:block hidden'}/>asked
                            questions about TypeScript.
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
                            <span>What is TypeScript used for?</span>
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
                                TypeScript is a powerful programming language that enhances JavaScript by introducing
                                static typing and advanced development tools. By enforcing type definitions, it helps
                                identify errors early in the development cycle, reducing risks and improving overall
                                code reliability. This structured approach not only strengthens code quality and
                                maintainability but also makes managing complex software projects more efficient. In
                                essence, TypeScript fortifies JavaScript, providing a robust, scalable foundation for
                                building high-performing, enterprise-ready applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why is enterprise web development moving toward TypeScript?</span>
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
                                TypeScript is an ideal choice for large-scale enterprise web development, providing a
                                robust foundation for creating high-quality, maintainable, and scalable applications.
                                Its strong typing and built-in safety features minimize the risk of common coding
                                errors, ensuring a reliable and stable codebase over the long term. By introducing a
                                higher level of structure, code organization, and quality control, TypeScript enables
                                teams to manage complex projects efficiently while supporting future growth. For
                                enterprise-level initiatives where precision, scalability, and long-term viability are
                                critical, TypeScript proves to be an invaluable technology.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How much does it cost to develop a TypeScript app?</span>
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
                                Estimating the cost of developing a TypeScript application depends on several factors,
                                including project complexity, required features, integrations, and overall scope. At
                                Grey InfoTech, we recognize that every project is unique, and we take a consultative
                                approach to help you determine a realistic budget aligned with your goals. We’re always
                                happy to discuss your requirements in detail, providing clear guidance on timelines,
                                costs, and potential solutions—ensuring your investment is well-planned and delivers
                                long-term value.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to develop a custom TypeScript solution?</span>
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
                                The timeline for developing a bespoke TypeScript solution varies based on the scope,
                                complexity, and specific features of your project. At Grey InfoTech, we prioritize
                                transparency and efficiency, providing a clear and realistic estimate of development
                                timelines early in the engagement. By assessing requirements upfront and aligning
                                resources strategically, we ensure your project progresses smoothly, with milestones
                                that keep delivery on track and support your business objectives.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What solutions can you build with TypeScript?</span>
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
                                TypeScript’s versatility makes it an exceptional choice for developing a wide range of
                                digital solutions, including web applications, mobile apps, server-side platforms, and
                                real-time dashboards. Its robust ecosystem and strong integration with modern frameworks
                                allow us to build scalable, maintainable, and high-performing applications across
                                diverse industries. At Grey InfoTech, we align TypeScript’s capabilities with your
                                business vision, turning complex requirements into reliable, future-ready solutions that
                                bring your digital ambitions to life.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the difference between TypeScript and JavaScript?</span>
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
                                TypeScript is a superset of JavaScript that enhances its natural flexibility with added
                                structure, static typing, and advanced error-checking capabilities. By introducing these
                                guardrails, TypeScript allows developers to identify and resolve potential issues early
                                in the development cycle, reducing the need for extensive post-development testing. This
                                structured approach results in cleaner, more maintainable code and supports the creation
                                of scalable, high-quality applications, making it a strategic choice for businesses
                                seeking reliability and efficiency in their digital solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Why should you choose TypeScript services over traditional JavaScript?</span>
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
                                There are several compelling reasons to choose TypeScript over JavaScript. Chief among
                                them is TypeScript’s enhanced code quality and robust error checking, which make it
                                especially well-suited for larger, more complex projects where long-term reliability,
                                maintainability, and scalability are critical to success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Are TypeScript development services better than JavaScript?</span>
                            {onIndex === 7 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 7 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The choice ultimately depends on your project priorities. TypeScript is often favored
                                for its superior code quality, robustness, and reliability, making it ideal for
                                large-scale or complex initiatives. Conversely, JavaScript may be better suited for
                                smaller, more flexible projects. At Grey InfoTech, we provide transparent, expert
                                guidance to help you select the best option tailored to your specific needs—just ask.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Typescript;