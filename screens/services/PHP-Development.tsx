'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import CountUp from "react-countup";


// Testimonial data
const testimonials = [
    {
        name: "Chuka Nwankwo",
        title: "CTO, CargoLoop Nigeria",
        message: (
            <>
                They played a vital role in developing the PHP-based backend that powered CargoLoop’s logistics
                coordination platform. Their team delivered clean, scalable code that allowed us to handle thousands of
                cargo entries, route optimizations, and vendor integrations with ease. We couldn’t have asked for a
                better development partner.
            </>
        ),
    },
    {
        name: "Amina Bakari ",
        title: "Product Manager, MedReach Tanzania",
        message: (
            <>
                Grey InfoTech helped us build a PHP-powered web application that connected patients in remote areas to
                verified medical professionals and pharmacies. Their professionalism, technical expertise, and ability
                to understand our vision made the difference.
            </>
        )
    },
];

const PhpDevelopment = () => {
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
            "CPWAD",
            "PCSD",
            "ADI",
            "PM",
            "PMS",
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
                    PHP Development <br className={'lg:block md:block hidden'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Create robust, secure, and scalable web applications with our specialized PHP development services,
                    designed to meet the needs of startups, enterprises, <br className={'lg:block md:block hidden'}/>and
                    all
                    businesses in between.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/php/hero.jpg'}
                        alt={'PHP Development Hero'}
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
                            YOUR PHP EXPERTS
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            What is PHP?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    PHP remains a foundational technology powering some of the most dynamic and
                                    interactive web applications across industries. Its extensive ecosystem of libraries
                                    and frameworks allows us to design and develop bespoke backend solutions tailored
                                    specifically to your business requirements. By integrating PHP with the most
                                    suitable front-end technologies, we create cohesive digital products that deliver
                                    seamless functionality and superior user experiences. This flexibility enables us to
                                    adapt to a wide range of project scopes, from simple websites to complex enterprise
                                    applications.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Beyond versatility, PHP supports fast-loading, responsive applications optimized for
                                    all device types, ensuring your customers enjoy smooth and engaging interactions.
                                    Its scalability ensures your web app can grow with your business, handling increased
                                    traffic and expanding feature demands without compromising performance. Whether
                                    you’re looking to build a high-performing e-commerce platform, a robust content
                                    management system, or any custom web solution, PHP’s proven reliability and
                                    efficiency make it a strategic choice for delivering sustainable digital success.
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
                                src={'/assets/php/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/php/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/php/1.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/php/2.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our PHP development solutions */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'node-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.1em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                Our PHP <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                At Grey InfoTech, our PHP development services drive digital innovation by combining
                                deep backend expertise with industry insight. Our skilled developers craft custom PHP
                                applications designed to deliver powerful functionality and engaging user experiences
                                that elevate your digital presence and accelerate business growth. PHP’s proven
                                foundation supports major platforms like WordPress, <Link
                                href='/services/cms-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                Drupal</Link>, WooCommerce, and even social
                                networks such as Facebook and LinkedIn—highlighting its reliability and versatility as a
                                core technology for scalable, high-impact web solutions.
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
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "Custom PHP Web Application Development", target: "CPWAD"},
                                    {id: "02", title: "PHP Cloud Solution Development", target: "PCSD"},
                                    {id: "03", title: "API Development & Integration", target: "ADI"},
                                    {
                                        id: "04",
                                        title: "PHP Migration",
                                        target: "PM"
                                    },
                                    {id: "05", title: "PHP Maintenance & Support", target: "PMS"},
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
                                     id={'CPWAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom PHP Web Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom PHP Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalable Web Application</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Secure Back-end Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Feature-Rich Digital Platforms</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, our custom PHP <Link
                                        href='/services/backend-development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                        back-end development</Link> services are designed to
                                        meet your unique business requirements with precision and expertise. Leveraging
                                        the robust and adaptable PHP framework, we create tailor-made web applications
                                        that enhance operational efficiency and support your growth objectives. Whether
                                        you need a straightforward content-driven website or a complex, feature-rich
                                        digital platform, our experienced developers ensure your PHP applications are
                                        scalable, secure, and user-friendly. By focusing on performance and reliability,
                                        we help you achieve your digital goals while providing a seamless experience for
                                        your users.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PCSD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        PHP CLoud Solutions Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cloud-Based PHP Applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>PHP On AWS, Google Cloud, Azure</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cloud Migration Services</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cost-Efficient Web Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Whether you’re planning to migrate existing systems to the cloud or launching a
                                        new PHP project within a cloud environment, our team is equipped to bring your
                                        vision to life. We streamline your operations and boost your competitive
                                        advantage by harnessing the power and scalability of cloud computing. Our PHP
                                        developers specialise in building custom cloud-based web applications and
                                        seamlessly integrating them with leading platforms such as AWS, Google Cloud,
                                        and Azure—ensuring your solutions are accessible, secure, and cost-efficient for
                                        sustainable growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'ADI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        API Development & Integration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>API Development Services</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Third-Party API Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Custom API Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Streamlined Data Flow</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our API development and integration services create seamless, well-structured
                                        connections between your application and external platforms, ensuring efficient
                                        data exchange and smooth operations. Whether you require the integration of
                                        third-party APIs into your system or the development of custom APIs to expose
                                        your web services, our skilled PHP development team specialises in optimising
                                        communication channels to enhance <Link
                                        href='/services/ui-ux-design'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                        user experience</Link>, improve interoperability, and
                                        streamline data flow across your digital ecosystem.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        PHP Migration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>PHP Version Upgrades</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Database Migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Platform Transition Services</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Secure Integration Planning</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Feeling overwhelmed by upgrading or migrating your existing PHP application? Let
                                        us handle it for you. Our expert PHP developers manage version upgrades,
                                        database migrations, and platform transitions with precision, minimising
                                        disruption to your business operations. When you partner with us, you can trust
                                        in a smooth, stress-free migration process that unlocks the latest PHP
                                        frameworks and technologies without risk. We develop comprehensive migration
                                        plans, conduct detailed risk assessments, and execute each step methodically and
                                        securely to ensure a successful, seamless transition.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        PHP Maintenance & Support
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>PHP Application Monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Post-Launch Support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Security Updates</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Performance Optimisation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We’re with you every step of the way, not just during development but long after
                                        your PHP web application goes live. Our ongoing commitment includes
                                        comprehensive support and maintenance services designed to keep your application
                                        secure, reliable, and optimized for peak performance. Through continuous
                                        monitoring, timely updates, and proactive issue resolution, we ensure your
                                        digital assets stay current with evolving technologies and security standards.
                                        This approach minimizes downtime, maximizes user satisfaction, and gives you the
                                        confidence to focus on growing your business while we handle the technical
                                        upkeep.
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
                    src={'/assets/php/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* PHP Benefits */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'php benefit'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* PHP Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                PHP Benefits
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Ultimately, PHP is a powerful, flexible choice behind many of today’s most dynamic and
                                interactive web applications, trusted for its reliability and scalability.
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
                                src={isDayTime ? '/assets/php/icon/att.svg' : '/assets/php/icon/att1.svg'}
                                alt={'Business-oriented development'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Business-Oriented Development
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We tailor our PHP solutions to align closely with your business objectives, delivering
                                seamless implementation, long-term maintainability, and a strong return on investment.
                                By incorporating best practices and staying current with the latest industry trends and
                                technologies, we ensure your application remains competitive, scalable, and
                                well-positioned to support your growth and evolving needs.
                            </p>
                        </div>
                        <div id={'dedicated-project-manager'}>
                            <Image
                                src={isDayTime ? '/assets/php/icon/sca.svg' : '/assets/php/icon/sca1.svg'}
                                alt={'Dedicated Project Manager'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Dedicated Project Manager
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Undoubtedly, your PHP project is in expert hands with a dedicated project manager who
                                takes full ownership of delivery and coordination. From planning and development to
                                deployment and beyond, they act as your single point of contact—ensuring smooth
                                communication, timely updates, and alignment with your business goals. We keep you
                                involved in important milestones and decision-making, while shielding you from
                                day-to-day technical complexities, so you stay informed, empowered, and focused on your
                                broader objectives.
                            </p>
                        </div>
                        <div id={'consistent-communication'}>
                            <Image
                                src={isDayTime ? '/assets/php/icon/test.svg' : '/assets/php/icon/test1.svg'}
                                alt={'Consistent Communication'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Consistent communication
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We keep the conversation open and continuous because your feedback is essential to the
                                success of every project. Our collaborative approach ensures your input is not only
                                heard but actively integrated at every stage of development. With access to real-time
                                progress tracking through our communication and project management tools, you stay
                                informed, involved, and confident in the direction of your PHP solution.
                            </p>
                        </div>
                        <div id={'data-security-and-confidentiality'}>
                            <Image
                                src={isDayTime ? '/assets/php/icon/risk.svg' : '/assets/php/icon/risk1.svg'}
                                alt={'Data Security and Confidentiality'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Data Security and Confidentiality
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, your privacy isn’t just a consideration—it’s a core commitment. Before
                                we begin any project, we formalise confidentiality through a Non-Disclosure Agreement
                                (NDA), ensuring your intellectual property, data, and ideas are fully protected. We
                                adopt strict security protocols and follow industry best practices to safeguard all
                                project-related communication and assets. From initial consultation to final delivery,
                                we maintain a secure and transparent environment where your trust is respected and your
                                business interests are protected every step of the way.
                            </p>
                        </div>
                        <div id={'proactive-risk-assessment-rigorous-testing'}>
                            <Image
                                src={isDayTime ? '/assets/php/icon/cust.svg' : '/assets/php/icon/cust1.svg'}
                                alt={'Proactive risk assessment & rigorous testing'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Proactive Risk Assessment & Rigorous Testing
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We take security seriously at every stage of development. Before your application goes
                                live, we conduct comprehensive risk assessments and implement rigorous testing protocols
                                to identify and mitigate vulnerabilities. Our approach ensures your product is not only
                                fully functional but also fortified against potential threats. We align our practices
                                with ISO 27001 standards for information security management, reinforcing our commitment
                                to safeguarding your data and delivering a secure, resilient digital solution.
                            </p>
                        </div>
                        <div id={'trusted-digital-partner'}>
                            <Image
                                src={isDayTime ? '/assets/php/icon/att.svg' : '/assets/php/icon/att1.svg'}
                                alt={'Trusted digital partner'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Trusted Digital Partner
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Grey InfoTech will be your trusted digital partner, committed to delivering high-quality
                                PHP development services tailored to your business needs. Our skilled PHP engineers work
                                closely with you from concept to deployment, maintaining transparency, accountability,
                                and clear communication every step of the way. We ensure you&#39;re fully informed and
                                involved throughout the development process, creating a seamless collaboration that
                                leads to reliable, scalable, and results-driven solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'partners'}
                     className={`relative lg:py-14 md:py-16 lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-white' : 'text-black'
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
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-800' : 'text-black group-hover:text-gray-300'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-white' : 'border-black'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 ${
                             isDayTime ? 'text-white' : 'text-black'
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

            {/* Who is involved in the process */}
            <div className={`lg:-mt-[4em] md:-mt-[4em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
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
                                At Grey InfoTech, PHP development is managed by a streamlined team focused on delivering
                                reliable, scalable, and business-driven web solutions. A project manager ensures clear
                                communication, timeline management, and alignment with your goals. Our PHP developers
                                handle backend architecture, database integration, and custom feature
                                development—building secure, high-performance applications tailored to your
                                requirements.<br/><br/>

                                UI/UX designers collaborate to ensure a smooth user experience, while QA engineers test
                                for functionality, speed, and security. DevOps specialists manage hosting, deployment,
                                and updates to ensure long-term stability. Throughout the project, your input is
                                continuously integrated, ensuring the final solution meets expectations and supports
                                your business growth.
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
                            <p className="leading-tight text-justify border-b-[0.1em] border-gray-300/20 pb-20">
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
                            Frequently asked <br className={'lg:block md:block hidden'}/>PHP questions
                        </h2>
                        <p className={'font-[300] text-[0.87em] leading-[1.2] '}>
                            PHP is widely regarded as one of the top backend frameworks, known for its broad adoption
                            <br className={'lg:block md:block hidden'}/>and ongoing development. Its reliability,
                            scalability, and
                            efficiency make it a go-to choice for <br className={'lg:block md:block hidden'}/>businesses
                            of all
                            sizes. Still have questions about PHP? We’re here to provide the answers.
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
                            <span>What is PHP and what is it used for?</span>
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
                                PHP is a powerful open-source server-side scripting language widely used for building
                                dynamic websites and robust web applications. Known for its flexibility and efficiency,
                                PHP enables developers to process form data, manage sessions, interact with various
                                databases, manipulate server files, and create secure, interactive digital experiences.
                                Its adaptability makes it suitable for projects of all sizes—from small business
                                websites to large-scale platforms like WordPress, Magento, and even Facebook. With
                                strong community support, extensive libraries, and continuous updates, PHP remains a
                                reliable and cost-effective choice for businesses seeking scalable, high-performance
                                backend solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does PHP differ from other programming languages?</span>
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
                                PHP differentiates itself through its user-friendly syntax, making it accessible to
                                developers across all experience levels—from beginners to seasoned professionals. Its
                                cross-platform compatibility allows it to run seamlessly on various operating systems
                                and web servers, giving businesses greater flexibility in deployment. This adaptability,
                                combined with its vast library support and strong community backing, makes PHP a
                                practical and versatile choice for developing a wide range of web applications
                                efficiently and cost-effectively.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the key features and benefits of using PHP?</span>
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
                                The key features and benefits of PHP lie in its ability to rapidly build and deploy web
                                applications, making it an ideal choice for businesses seeking quick turnaround times.
                                Its open-source nature ensures cost-effectiveness, eliminating licensing fees while
                                providing robust performance. PHP also offers seamless integration with popular
                                databases like MySQL, PostgreSQL, and MongoDB, allowing for efficient data handling and
                                scalability. Additionally, its extensive library of built-in extensions simplifies
                                complex development tasks—enabling developers to create secure, feature-rich, and highly
                                functional applications with minimal overhead. Backed by a large and active community,
                                PHP continues to evolve, offering dependable support and continual innovation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are the best practices for secure PHP development?</span>
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
                                Secure PHP development involves a proactive approach to mitigating vulnerabilities and
                                protecting user data. This includes implementing strong validation and sanitization
                                methods to prevent common threats like SQL injection, cross-site scripting (XSS), and
                                cross-site request forgery (CSRF). Developers must also stay current with the latest PHP
                                security patches and follow best practices in secure coding to avoid introducing flaws.
                                Regular security audits, proper session management, and the use of encryption for
                                sensitive data transmission and storage further strengthen application integrity. By
                                prioritising these practices, businesses can build reliable PHP applications that
                                safeguard both users and digital assets.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How can PHP be integrated with various databases and frameworks?</span>
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
                                PHP is highly compatible with powerful frameworks like <Link
                                href='/services/Laravel-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>
                                Laravel</Link> and Symfony, which
                                streamline the development of complex, scalable web applications. Its seamless
                                integration with a wide range of databases—including MySQL, PostgreSQL, and
                                MongoDB—supports efficient data management and flexible backend architectures. Widely
                                trusted by major platforms like WordPress and Facebook, PHP demonstrates proven
                                reliability and adaptability, making it a cornerstone technology for robust,
                                high-performing digital solutions across industries.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default PhpDevelopment;