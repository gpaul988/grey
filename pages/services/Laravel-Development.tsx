import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";


// Testimonial data
const testimonials = [
    {
        name: "Elena Rodríguez",
        title: "Product Manager, TaskFlow Inc.",
        message: (
            <>
                They helped us scale our project management platform with a custom Laravel solution that is both
                powerful and easy to maintain. Their clear communication, responsiveness, and technical know-how made
                the collaboration incredibly smooth.
            </>
        ),
    },
    {
        name: "David Lang",
        title: "CTO, PayCore Solutions",
        message: (
            <>
                Working with Grey InfoTech was a strategic win for us. Their Laravel development team built a secure,
                high-performance backend that integrates seamlessly with our financial systems. They delivered on time,
                within budget, and exceeded expectations.
            </>
        )
    },
    {
        name: "Mark Chen",
        title: "COO, PropEdge Technologies",
        message: (
            <>
                We needed a flexible and scalable backend for our real estate analytics platform, and Grey InfoTech
                delivered flawlessly with Laravel. Their professionalism and attention to detail made the entire process
                efficient and stress-free.
            </>
        )
    }
];

const LaravelDevelopment = () => {
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
            "CWAD",
            "LC",
            "LAD",
            "LED",
            "LMS",
            "ECP",
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
                    Laravel <br className={'lg:block md:block hidden'}/>Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Official Laravel web development partners. Nigeria-based with office at Port Harcourt.<br
                    className={'lg:block md:block hidden'}/>
                    We develop modern Laravel applications, websites and software.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/laravel/hero.jpg'}
                        alt={'Laravel Development Hero'}
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
                            Your Laravel Specialists
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Laravel Development Company
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Welcome to Grey InfoTech—an experienced and
                                    trusted <Link href={'https://www.laravel.com'}
                                                  className={`relative border-b pb-[0.17em] ${
                                                      isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                                  }`}>Laravel</Link> development agency
                                    delivering tailored web solutions to businesses since 2020. Laravel is one of the
                                    most popular and robust PHP frameworks, known for its elegant syntax, high
                                    scalability, and ability to streamline
                                    the <Link href={'/services/Software-Development'}
                                              className={`relative border-b pb-[0.17em] ${
                                                  isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                              }`}>software development</Link> lifecycle. As
                                    official Laravel partners, our team of expert developers and consultants leverage
                                    the framework’s powerful features to architect secure, maintainable, and
                                    high-performing applications. From early-stage startups to established enterprises,
                                    we work closely with clients to transform business goals into functional, scalable
                                    digital platforms that drive growth and efficiency.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Whether you&#39;re launching a simple landing page, building a complex SaaS
                                    platform, or
                                    modernizing an internal business system, Grey InfoTech ensures your Laravel
                                    application is built for long-term success. We manage the entire development
                                    lifecycle—from initial planning and architecture to deployment, optimization, and
                                    post-launch support—adhering to best practices in code quality, performance, and
                                    user experience. Our holistic approach to Laravel development helps reduce
                                    time-to-market, optimize development budgets, and ensure your solution is both
                                    adaptable and future-ready. Let’s partner to bring your ideas to life with
                                    technology that delivers real business value.
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
                            src={'/assets/laravel/1.jpg'}
                            alt={'Garden'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/laravel/2.jpg'}
                            alt={'home'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/laravel/3.jpg'}
                            alt={'ecommerce'}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/laravel/4.jpg'}
                            alt={'sales'}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* Our Laravel Application Development Service */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                                Our Laravel <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Services
                            </h2>
                        </div>
                        <div className={'lg:-ml-[4em] md:-ml-[4em]'}>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                                Grey InfoTech offers end-to-end Laravel development services, including custom web
                                development, feature enhancements, architecture consulting, code reviews, and
                                performance optimization. Our team ensures your Laravel project is built for
                                scalability, efficiency, and long-term success.
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
                                    {id: "01", title: "Laravel Consulting", target: "LC"},
                                    {id: "02", title: "Custom Web Application Development", target: "CWAD"},
                                    {id: "03", title: "Laravel API Development", target: "LAD"},
                                    {id: "04", title: "Laravel Extension Development", target: "LED"},
                                    {id: "05", title: "Laravel Migration Services", target: "LMS"},
                                    {id: "06", title: "e-Commerce Platforms", target: "ECP"},
                                    {id: "07", title: "Maintenance & Support", target: "MS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[16em] md:mb-[16em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Laravel Consulting
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Web application strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Expert guidance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we provide strategic Laravel consulting to guide clients
                                        through every phase of their web application projects—from planning and
                                        architecture to execution and deployment. Our consulting services are designed
                                        to ensure that technical decisions align with broader business objectives,
                                        helping clients avoid costly missteps and accelerate time-to-value. By
                                        leveraging Laravel’s full potential, we help businesses build scalable,
                                        efficient, and future-proof solutions that support growth and long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CWAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom Web Application Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel framework</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom web applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business-focused solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailor-made development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We specialize in building custom web applications on the
                                        robust Laravel framework, tailored to solve specific business challenges and
                                        support long-term growth. Our solutions are designed to align with each client’s
                                        unique goals, workflows, and operational requirements—ensuring that the end
                                        product is not only technically sound but also delivers measurable business
                                        value. Whether it&#39;s streamlining internal processes, enhancing customer
                                        engagement, or launching a new digital product, we leverage Laravel’s
                                        flexibility and performance to deliver scalable, future-ready applications.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Laravel API Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel API development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System communication</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We excel in building robust, RESTful APIs using Laravel, enabling smooth
                                        integration and data exchange between applications, platforms, and third-party
                                        services. This capability is critical for powering modern, connected digital
                                        ecosystems and supporting scalable, multi-platform solutions.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LED'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Laravel Extension Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel packages</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom extensions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feature enhancement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel add-ons</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We specialize in developing custom Laravel extensions and packages that enhance
                                        the core functionality of your existing applications. By adding tailored
                                        features and capabilities, we help businesses adapt quickly to evolving market
                                        demands and customer expectations. This flexible approach allows your software
                                        to stay competitive and scalable, reducing the need for costly full rewrites
                                        while delivering targeted improvements that drive operational efficiency and
                                        user engagement. Our custom solutions ensure your Laravel applications continue
                                        to evolve in line with your strategic goals.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Laravel Migration Services</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Legacy to Laravel</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Web app modernisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Improved performance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We provide comprehensive migration services for businesses aiming to transition
                                        their existing web applications to the Laravel framework. By leveraging
                                        Laravel’s modern architecture, enhanced security, and performance optimizations,
                                        we help clients modernize legacy systems, improve maintainability, and unlock
                                        new opportunities for scalability and innovation. Our migration approach
                                        minimizes downtime and risk, ensuring a smooth and efficient transition that
                                        aligns with your business objectives.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ECP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>e-Commerce Platforms</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel e-commerce</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Secure payment systems</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We design and develop comprehensive e-commerce platforms using Laravel, tailored
                                        to meet the unique needs of your business. Our solutions include custom features
                                        such as advanced shopping carts, secure and flexible payment processing, and
                                        robust product and inventory management systems—ensuring a seamless, secure, and
                                        scalable online shopping experience that drives customer engagement and sales
                                        growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>API Integration</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Laravel maintenance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Application support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security updates</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We offer ongoing maintenance and support services for Laravel applications,
                                        ensuring they stay secure, up-to-date, and optimized for peak performance.
                                        Through regular updates, performance tuning, and proactive technical assistance,
                                        we help safeguard your investment, minimize downtime, and adapt your
                                        applications to evolving business needs and technology trends.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[24em] md:-mt-[24em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/laravel/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* What is Laravel? */}
            <div
                className={`relative lg:pt-[6em] md:pt-[5em] pt-[2em] lg:pb-[4em] md:pb-[4em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                    <div
                        className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                        <Image
                            src={'/assets/laravel/wl.jpg'}
                            alt={'What is Laravel'}
                            width={650}
                            height={900}
                        />
                    </div>
                    <div
                        className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mr-[8em] md:mr-[8em] lg:mt-[5em] md:mt-[5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                            What is Laravel?
                        </h2>
                        <p className='text-[0.85em] font-[400] tracking-normal text-justify leading-[1.5]'>
                            Laravel is a powerful web application framework widely used for building modern, scalable
                            web applications. Its extensive library of pre-built components and tools accelerates
                            development, allowing our team to focus on delivering tailored features and
                            business-specific functionality rather than reinventing foundational elements. As an
                            open-source framework, Laravel eliminates licensing costs while benefiting from a vast,
                            active global community of developers who continuously contribute modules, enhancements, and
                            security updates—ensuring the platform evolves to meet emerging industry demands.<br/><br/>
                            In today’s technology-driven landscape, where mobile and web applications are central to
                            customer engagement, Laravel stands out as the preferred choice for creating full-stack
                            solutions that deliver seamless, intuitive user experiences. Its flexibility and robustness
                            make it ideal for businesses aiming to innovate quickly and scale efficiently, positioning
                            Laravel as a strategic framework for future-ready digital products.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Laravel */}
            <div className={`${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Crafting Robust Web <br className={'lg:block md:block hidden'}/>Apps with Simplicity
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why Laravel?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Laravel is a leading PHP framework favored by businesses for its elegant syntax,
                                    robust features, and scalability. It enables rapid development of secure,
                                    high-performance web applications tailored to complex business needs. Laravel’s
                                    modular architecture and extensive built-in tools—such as authentication, routing,
                                    and caching—reduce development time and costs, allowing businesses to launch
                                    products faster without compromising quality. This efficiency translates into a
                                    better return on investment and the flexibility to adapt and scale as your business
                                    evolves.
                                </p>
                            </div>
                            <div>
                                <p>
                                    From a business perspective, Laravel offers strong security features, including
                                    protection against common vulnerabilities like SQL injection and cross-site
                                    scripting, which is crucial for maintaining customer trust and compliance.
                                    Additionally, its active developer community ensures continuous updates, rich
                                    documentation, and support, reducing long-term maintenance risks. Laravel’s
                                    versatility suits a wide range of applications—from simple websites to complex
                                    enterprise solutions—making it an ideal choice for businesses seeking reliable,
                                    future-proof web development.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Laravel Business Benefits */}
            <div className={`-mt-[3em] ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                                Laravel Business <br className={'lg:block md:block hidden'}/>Benefits
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[1.2em] md:-ml-[1.2em]'>
                                Partner with us to accelerate your software delivery while enjoying a seamless,
                                hassle-free development experience. We handle the complexities so you can focus on
                                bringing your product vision to market faster and with confidence.
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
                                Cost savings
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel’s open-source nature means there are no licensing fees, significantly lowering
                                the upfront costs of app development. This cost efficiency allows businesses to allocate
                                more resources toward custom features, user experience, and faster time-to-market.
                                Additionally, the extensive community support and readily available modules further
                                reduce development time and expenses, maximizing your return on investment while
                                maintaining high-quality standards.
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
                            <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                                Scalability
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel’s scalable architecture is engineered to adapt seamlessly as your business
                                evolves, allowing your applications to grow in functionality and user capacity without
                                compromising performance. This flexibility ensures that your software investment remains
                                future-proof, supporting increased demand and new features as your company expands.
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
                                Speed of development
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel’s comprehensive toolkit and pre-built components empower developers to rapidly
                                create custom web applications, significantly reducing development time. This
                                accelerated process enables businesses to launch their products faster, gain competitive
                                advantage, and respond swiftly to market opportunities.
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
                                Reliability
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel’s integrated unit testing capabilities help ensure software reliability by
                                enabling early detection and resolution of bugs. This proactive approach reduces costly
                                post-launch maintenance and downtime, resulting in higher-quality applications that
                                maintain performance and user satisfaction over time.
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
                                Security
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel’s robust built-in security features safeguard applications against common web
                                vulnerabilities such as SQL injection, cross-site scripting, and data breaches. This
                                comprehensive protection provides business owners with confidence that their systems—and
                                their customers’ sensitive data—are secure, helping to maintain trust and comply with
                                industry regulations.
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
                                Third-party integration
                            </h3>
                            <p className='text-justify text-[0.85em] font-[400]'>
                                Laravel seamlessly integrates with a wide array of third-party applications—including
                                payment gateways, marketing platforms, and analytics tools—enabling businesses to extend
                                their software’s capabilities and deliver richer, more connected user experiences. This
                                flexibility supports faster innovation and streamlined operations across your digital
                                ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Laravel Application Development */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Laravel Application<br className={'lg:block md:block hidden'}/>Development
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            Laravel’s scalability, flexibility, and built-in testing allow us to deliver reliable,
                            high-quality software faster and more cost-efficiently. Its strengths reduce maintenance
                            costs and accelerate time-to-market, making it our preferred framework for driving business
                            growth. Key features include:
                        </p>
                    </div>
                </div>

                {/* MVC architecture */}
                <div id={'MVCA'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            MVC architecture
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Laravel’s Model-View-Controller (MVC) architecture cleanly separates an application’s logic,
                            data management, and user interface. This separation simplifies ongoing maintenance,
                            enhances development efficiency, and supports scalable growth, ensuring your software can
                            evolve seamlessly alongside your business needs. By leveraging MVC, we deliver solutions
                            that are easier to update, extend, and manage—minimizing downtime and accelerating your
                            time-to-market.
                        </p>
                    </div>
                </div>

                {/* Robust toolkit */}
                <div id={'RT'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Robust toolkit
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Laravel offers a comprehensive suite of tools and libraries that streamline web application
                            development. From advanced routing and database management to powerful object-relational
                            mapping (ORM), it provides the essential building blocks to create efficient, scalable, and
                            maintainable software solutions that align with your business goals.
                        </p>
                    </div>
                </div>

                {/* Community support */}
                <div id={'CST'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Community support
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Laravel’s large, active developer community continuously drives its innovation and support,
                            giving us access to extensive resources, modules, and expertise. This collaborative
                            ecosystem ensures your projects benefit from the latest advancements and best practices.
                        </p>
                    </div>
                </div>

                {/* Template engineering */}
                <div id={'TPE'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.3] rounded-none'>
                            Template <br className={'lg:block md:block hidden'}/>engineering
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Laravel’s built-in Blade template engine enables the creation of reusable, class-based
                            components, streamlining development and reducing time-to-market by promoting code
                            efficiency and consistency across your application.
                        </p>
                    </div>
                </div>

                {/* Security */}
                <div id={'security'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] rounded-none'>
                            Security
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Laravel includes robust built-in security features that protect against common web
                            vulnerabilities like SQL injection and cross-site scripting (XSS). These safeguards help
                            defend your application from cyber threats, ensuring sensitive business and customer data
                            remains secure—giving you peace of mind and reinforcing trust with your users.
                        </p>
                    </div>
                </div>

                {/* Third-party integration */}
                <div id={'TPI'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            Third-Party <br className={'lg:block md:block hidden'}/>Integration
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Most modern web applications rely on third-party integrations—such as Stripe for payments or
                            HubSpot for marketing—and Laravel simplifies this process with its clean, well-structured
                            APIs. This allows businesses to connect seamlessly with essential tools, streamlining
                            operations and enhancing functionality without adding development complexity.
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
                            Laravel development is handled by a dedicated team that ensures every aspect of your web
                            application aligns with your business objectives. A project manager leads the process,
                            overseeing timelines, communication, and deliverables to keep the development on track. Our
                            Laravel developers focus on writing clean, scalable code while integrating custom features
                            that support your business operations. UI/UX designers work alongside them to create
                            intuitive, responsive interfaces that enhance user experience and drive engagement.
                            <br/><br/>
                            Quality assurance engineers rigorously test the application to ensure functionality,
                            security, and performance, while DevOps specialists manage deployment and system
                            optimization. Throughout the process, you remain actively involved—receiving regular
                            updates, reviewing progress, and sharing feedback—so the final product reflects your goals
                            and delivers measurable value. Laravel development at Grey InfoTech is built on
                            collaboration, precision, and a clear focus on business impact.
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
                 className={`relative max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Laravel Development <br className={'lg:block md:block hidden'}/>Services Frequently <br
                            className={'lg:block md:block hidden'}/>Asked Questions
                        </h2>
                        <p className={'font-[300] text-[0.87em] leading-[1.2] '}>
                            Choosing the right software partner and framework comes with important questions. <br
                            className={'lg:block md:block hidden'}/>Below are
                            some of the most frequently asked questions we receive about Laravel <br
                            className={'lg:block md:block hidden'}/>development to help guide your decision.
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
                            <span>What is Laravel?</span>
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
                                Laravel is a free, open-source <Link href={'/services/PHP-Development'}
                                                                     className={`relative border-b pb-[0.05em] ${
                                                                         isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                                                     }`}>PHP</Link> framework designed to simplify and
                                accelerate web application development. Built on the Model-View-Controller (MVC)
                                architecture, it offers a clean and organized structure for managing application logic,
                                user interfaces, and data. With built-in features like routing, authentication, and
                                caching, Laravel reduces development time while ensuring scalability, security, and
                                maintainability—making it an ideal choice for building modern, high-performing web
                                applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are some features of Laravel?</span>
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
                                Laravel includes a range of powerful features that make it a top choice for web
                                application development:<br/><br/>

                                <span className={'font-[600]'}>Eloquent ORM:</span> Allows developers to interact with
                                databases using clean, expressive PHP syntax instead of raw SQL.<br/><br/>

                                <span className={'font-[600]'}>Blade Templates:</span> A flexible templating engine that
                                enables dynamic content rendering and cleaner code structure.<br/><br/>

                                <span className={'font-[600]'}>MVC Architecture:</span> Separates business logic from
                                presentation, making applications easier to manage and scale.<br/><br/>

                                <span className={'font-[600]'}>Artisan Command-Line Interface (CLI):</span> A built-in
                                command-line tool that streamlines common development tasks like database migrations,
                                code generation, and more.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the difference between PHP and Laravel?</span>
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
                                PHP is a versatile scripting language commonly used
                                for <Link href={'/services/Web-Development'}
                                          className={`relative border-b pb-[0.05em] ${
                                              isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                          }`}>web development</Link>. Laravel is a robust web application framework
                                built on PHP that
                                enhances its capabilities by offering streamlined tools for routing, authentication,
                                caching, and more. While PHP provides the foundation, Laravel accelerates development by
                                simplifying complex tasks and improving application structure, making it an ideal choice
                                for modern web solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the difference between Laravel and Symfony?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>Laravel and Symfony are leading PHP web application frameworks that provide essential
                                    features like routing, authentication, and caching. The key differences include:</p>
                                <br/>
                                <ul className={'list-disc ml-4'}>
                                    <li className={'mb-2'}>Laravel is known for its ease of use and intuitive syntax,
                                        enabling faster onboarding and development cycles, making it ideal for
                                        businesses seeking rapid delivery.
                                    </li>
                                    <li className={'mb-2'}>Symfony offers greater modularity and flexibility, allowing
                                        for highly customized solutions, but typically requires more advanced expertise.
                                    </li>
                                    <li className={'mb-2'}>Laravel benefits from a larger, active community with
                                        extensive resources and support, helping businesses access ongoing innovations
                                        and quicker problem-solving.
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do I choose between Laravel and Symfony?</span>
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
                                Choosing between Laravel and Symfony depends on your unique business objectives and
                                project requirements. At Grey InfoTech, we have expertise in both frameworks and can
                                provide tailored recommendations to ensure the best fit for your development needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can I use Laravel for front-end development?</span>
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
                                While Laravel is primarily a backend framework, it integrates seamlessly with front-end
                                technologies like <Link href={'/services/Vuejs-Development'}
                                                        className={`relative border-b pb-[0.05em] ${
                                                            isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                                        }`}>Vue.js</Link> and <Link
                                href={'/services/Reactjs-Development'}
                                className={`relative border-b pb-[0.05em] ${
                                    isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                }`}>React</Link> to deliver dynamic,
                                full-stack applications. Its Blade template engine simplifies embedding dynamic content,
                                while Laravel’s routing and controller systems provide robust backend logic, enabling
                                efficient and cohesive development across the entire application stack.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can I use Laravel for mobile app development?</span>
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
                                Laravel serves as a powerful backend system for mobile applications. Although primarily
                                a web framework, Laravel enables the development of RESTful APIs
                                that <Link href={'/services/Mobile-Application-Development'}
                                           className={`relative border-b pb-[0.05em] ${
                                               isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                           }`}>mobile apps</Link> can seamlessly communicate with. This approach allows
                                businesses to reuse backend code efficiently, accelerating development timelines and
                                reducing costs across both web and mobile platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is Laravel suitable for large-scale projects?</span>
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
                                Yes, Laravel is a robust and versatile framework ideal for projects of all sizes,
                                including large-scale applications. Its rich feature set and powerful tools support the
                                development of complex, scalable solutions that can grow alongside your business needs.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can Laravel be used to build websites?</span>
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
                                Yes, Laravel is an excellent choice for building websites and software applications.
                                We’ve successfully delivered numerous Laravel-powered content management systems and
                                would be happy to share these case studies with you. Feel free to reach out anytime.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Do you outsource your Laravel development work? <br
                                className={'lg:block md:block hidden'}/>Who will be working on my project?</span>
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
                                Absolutely not. As a Laravel development company based in Port Harcourt, Nigeria, all
                                our development is done in-house by our core team. This local presence enables us to
                                effectively collaborate with clients both locally and internationally, ensuring quality
                                and accountability at every stage.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default LaravelDevelopment;