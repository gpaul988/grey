import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import CountUp from "react-countup";
import Footer from "@/components/Footer";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";


// Testimonial data
const testimonials = [
    {
        name: "Zanele Khumalo",
        title: "Head of Product, TaskFlow Inc",
        message: (
            <>
                Their team was instrumental in building the core of our productivity suite using Ruby on
                Rails. Their speed, reliability, and clean code practices helped us meet deadlines and launch with
                confidence. It’s been a seamless experience from start to finish.
            </>
        ),
    },
    {
        name: "Kofi Boateng",
        title: "Technical Director, PropEdge Technologies",
        message: (
            <>
                They delivered a robust and scalable Ruby on Rails backend that now powers our property
                analytics platform. Their team demonstrated deep technical expertise and a clear understanding of our
                goals. We’re seeing better performance and easier maintenance than ever before.
            </>
        )
    },
    {
        name: "Chinedu Ncube",
        title: "Lead Solutions Architect, PayCore Solutions",
        message: (
            <>
                We needed a secure, high-performance backend for our financial platform, and Grey InfoTech delivered
                with Ruby on Rails. They handled everything from architecture to deployment with precision and
                professionalism. They’re a trusted partner for any critical system.
            </>
        )
    },
    {
        name: "Fatima Keita",
        title: "Product Delivery Manager, LogiFleet Systems",
        message: (
            <>
                Our experience with Grey InfoTech&#39;s Ruby on Rails development was outstanding. They built a tailored
                logistics platform that is fast, secure, and easy to scale. Their proactive communication and technical
                skill made them a true extension of our internal team.
            </>
        )
    }
];

// Reasons
const reasons = [
    {
        id: 1,
        title: 'Experienced Team',
        description: (
            <>
                Our deep industry expertise allows us to understand your specific business landscape, anticipate
                challenges, and craft solutions that align with your goals. We don’t just build software—we build
                strategic tools tailored to your operations, ensuring they solve real problems and drive measurable
                results.
            </>
        ),
        images: ['/assets/fin/grey.jpg']
    },
    {
        id: 2,
        title: 'Transparency at Every Step',
        description: (
            <>
                What truly sets us apart is our steadfast commitment to transparency. We believe in complete honesty and
                accountability throughout the development process—keeping you informed every step of the way. From clear
                communication to early visual and technical insights, we ensure you&#39;re always in control and
                confident
                in the direction of your project.
            </>
        ),
        images: ['/assets/fin/grey1.jpg']
    },
    {
        id: 3,
        title: 'Communication & Collaboration',
        description: (
            <>
                We believe strong communication and seamless collaboration are critical to every project&#39;s success.
                That’s why we prioritize clear, consistent updates and foster a transparent workflow—keeping all
                stakeholders aligned, informed, and engaged from start to finish.
            </>
        ),
        images: ['/assets/fin/grey2.jpg']
    },
    {
        id: 4,
        title: 'Scalability of Services',
        description: (
            <>
                Scalability plays a pivotal role in FinTech development by allowing platforms to efficiently handle
                increased user loads, expanding datasets, and evolving market requirements without compromising
                performance. A well-architected, scalable solution not only supports business growth but also builds
                long-term resilience and strengthens client relationships through consistent, high-quality service
                delivery.
            </>
        ),
        images: ['/assets/fin/grey.jpg']
    },
];

const Fintech = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);


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
            "PDW",
            "BC",
            "WM",
            "IM",
            "CFTA",
            "AIS",
            "IS",
            "PF",
            "BCS",
            "FRS",
            "PF",
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

    // Why Grey InfoTech for your app project 
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % reasons.length);
        }, 5000); // 5000ms = 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Our Discovery Process Hook

    const imageIds: string[] = [
        "The Digital Phase",
        "Dedicated FinTech Engineers",
        "Security & Regulatory Compliance",
        "DevOps",
        "Quality Assurance",
        "Product Development",
    ];

    useEffect(() => {
        const handleScrollStages = () => {
            for (const imageId of imageIds) {
                const textElement = document.getElementById(imageId);
                const imageElement = document.getElementById(imageId);

                if (textElement && imageElement) {
                    const textRect = textElement.getBoundingClientRect();
                    const screenCenter = window.innerHeight / 2;

                    if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                        setActiveId(imageId);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, []);

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
        {id: 1, name: 'Partner 1', dayImage: 'poawd1.svg', nightImage: 'poawd.svg'},
        {id: 2, name: 'Partner 2', dayImage: 'hub1.svg', nightImage: 'hub.svg'},
        {id: 3, name: 'Partner 3', dayImage: 'car1.svg', nightImage: 'car.svg'},
        {id: 4, name: 'Partner 4', dayImage: 'pet1.svg', nightImage: 'pet.svg'},
        {id: 5, name: 'Partner 5', dayImage: 'sew1.svg', nightImage: 'sew.svg'},
        {id: 6, name: 'Partner 6', dayImage: 'tim1.svg', nightImage: 'tim.svg'},
        {id: 7, name: 'Partner 7', dayImage: 'pat1.svg', nightImage: 'pat.svg'},
        {id: 8, name: 'Partner 8', dayImage: 'kow1.svg', nightImage: 'kow.svg'},
        {id: 9, name: 'Partner 9', dayImage: 'afro1.svg', nightImage: 'afro.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane1.svg', nightImage: 'cane.svg'},
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
                    src="/assets/fin/hero.mp4"
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
                            FinTech Software <br className={'lg:block md:block hidden'}/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Driving financial innovation through advanced, cutting-edge technology solutions.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]'}>
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
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                             : isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Innovative Fintech tools <br className={'lg:block md:block hidden'}/>designed to elevate
                            your <br
                            className={'lg:block md:block hidden'}/>business
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Demystifying Fintech <br className={'lg:block md:block hidden'}/>How We Drive Your Growth
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Grey InfoTech is a strategic partner in Fintech <Link
                                    href='/services/Software-Development'
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>software
                                    development</Link>, offering a
                                    comprehensive suite of services designed to meet the evolving needs of the financial
                                    industry. Our expertise spans bespoke Fintech solutions, <Link
                                    href='/services/Mobile-Application-Development'
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>mobile
                                    app</Link> development,
                                    intuitive UI/UX design, digital banking platforms, payment innovations, and advanced
                                    data analytics. By delivering tailored, scalable software, we enable financial
                                    institutions and startups to streamline operations, enhance compliance, and
                                    accelerate digital transformation with confidence.
                                </p>
                            </div>
                            <div>
                                <p>
                                    In today’s competitive landscape, Fintech development is essential for driving
                                    innovation and improving customer engagement. Our team leverages cutting-edge
                                    technologies such as blockchain, artificial intelligence, and machine learning to
                                    build secure, efficient, and user-centric financial products—from mobile payments
                                    and digital wallets to compliance tools and core banking systems. With Grey
                                    InfoTech, you gain a partner focused on creating solutions that not only meet
                                    regulatory demands but also deliver measurable business value and sustainable
                                    growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em]  mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                        <div className={'h-auto w-full max-w-full'}>
                            <Image
                                src={'/assets/fin/app.jpg'}
                                alt={'app'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/fin/hand.jpg'}
                                alt={'hand'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Fintech Development solutions */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'node-development'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                FinTech <br className={'lg:block md:block hidden'}/>Development <br
                                className={'lg:block md:block hidden'}/>Solutions
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.87em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                Grey InfoTech delivers focused FinTech software solutions that address the evolving
                                needs of modern financial services. From custom applications and mobile banking to
                                secure payments and analytics, our services help businesses enhance efficiency,
                                security, and user experience.<br/><br/>

                                Based in Nigeria, we build scalable, AI- and blockchain-powered platforms that
                                streamline operations and support digital transformation. Our expert team is committed
                                to delivering smart, compliant, and growth-driven FinTech products tailored to your
                                business goals.
                            </p>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${
                                isDayTime ? 'text-black' : 'text-white'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Payments & Digital Wallets", target: "PDW"},
                                    {id: "02", title: "Blockchain", target: "BC"},
                                    {id: "03", title: "Wealth Management", target: "WM"},
                                    {id: "04", title: "Investment Management", target: "IM"},
                                    {id: "05", title: "Custom FinTech Application", target: "CFTA"},
                                    {id: "06", title: "Accounting Information System (AIS)", target: "AIS"},
                                    {id: "07", title: "Insurance", target: "IS"},
                                    {id: "08", title: "Personal Finance", target: "PF"},
                                    {id: "09", title: "Background Check Software", target: "BCS"},
                                    {id: "10", title: "Financial Reporting Software", target: "FRS"},
                                    {id: "11", title: "Financial Calculators", target: "FC"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[3em] md:mb-[3em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PDW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Payments & Digital Wallets
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Financial Product Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Online Payment Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Wallets</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>B2B Transaction Platforms</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Our bespoke FinTech solutions are built to deliver exceptional user convenience,
                                        robust security, and seamless financial experiences across digital platforms. We
                                        combine intuitive design with powerful functionality to help businesses and
                                        their customers manage financial transactions efficiently and confidently. With
                                        a strong focus on data privacy and cybersecurity, our solutions—ranging from B2B
                                        payment systems to digital wallets—are developed with strict compliance
                                        standards to safeguard sensitive financial information, ensuring trust,
                                        reliability, and long-term business value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Blockchain
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Fraud Prevention</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Security</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Blockchain in FinTech</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Blockchain technology is revolutionising FinTech by enhancing security,
                                        eliminating intermediaries, and enabling trusted, tamper-proof data exchange.
                                        For financial services firms, where stability and data integrity are
                                        non-negotiable, blockchain offers a transparent and decentralised approach that
                                        aligns with industry regulations and boosts operational trust. Its ability to
                                        reduce fraud and ensure confidentiality makes it a strategic asset for secure
                                        and future-ready financial solutions.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Wealth Management
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Asset Management Software</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Personal Investing Tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Finance Analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-Driven Insight</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        The FinTech revolution is fundamentally transforming wealth management by
                                        enabling smarter, faster, and more personalised financial services. At Grey
                                        InfoTech, we’ve collaborated with clients to deliver next-generation FinTech
                                        applications that simplify asset management, optimise personal investing, and
                                        unlock real-time financial analytics. These solutions harness advanced
                                        technologies to provide data-driven insights, enhance trend forecasting, and
                                        facilitate seamless communication between advisors and clients, ultimately
                                        driving better financial outcomes and long-term value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Investment Management
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Investment Platforms</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Realtime Performance Tracking</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Financial Reporting Tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Advanced Analytics</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We can help you build comprehensive investment platforms and asset management
                                        systems designed for efficiency, scalability, and precision. By integrating
                                        real-time performance tracking, advanced analytics, and customizable reporting
                                        tools, our solutions empower financial institutions and wealth managers to
                                        monitor portfolios, assess risks, and generate actionable insights. This not
                                        only enhances decision-making but also improves client transparency, compliance,
                                        and overall investment outcomes.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CFTA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom FinTech Application
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailored Financial Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Spending Analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Risk Management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Tailored FinTech solutions significantly improve user experience by delivering
                                        personalised financial insights, seamless transactions, and enhanced security.
                                        Features such as intelligent spending analytics, real-time fraud detection, and
                                        risk management tools enable businesses to stay compliant, build customer trust,
                                        and operate efficiently in today’s fast-paced digital finance environment.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AIS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Accounting Information System (AIS)
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>ERP Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Financial Data Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regulatory Compliance Tools</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        AIS (Accounting Information Systems) seamlessly integrates with ERP systems and
                                        business intelligence tools, automating the end-to-end capture, processing, and
                                        analysis of financial data. This integration not only improves data accuracy and
                                        ensures timely financial reporting but also strengthens compliance with
                                        regulatory standards. By enabling real-time data synchronization and intelligent
                                        automation, AIS empowers finance teams to make faster, data-driven decisions,
                                        optimize operational efficiency, and maintain full transparency across financial
                                        operations.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Insurance
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Insurance Technology</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Claims Processing Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Fraud Prevention Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        FinTech software for insurance transforms key functions such as underwriting,
                                        claims processing, fraud prevention, and billing by automating and optimizing
                                        these workflows. This technology enables insurance companies to streamline
                                        operations, boost productivity, reduce errors, and deliver faster, more accurate
                                        services—ultimately enhancing customer satisfaction and driving competitive
                                        advantage in a rapidly evolving market.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'PF'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Personal Finance
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Stakeholder Alignment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Project Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Requirements Gathering</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Project Planning</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Personal finance software solutions deliver a broad range of tools designed to
                                        simplify budget management, facilitate mobile payments, and enable seamless
                                        online banking and financial planning. These platforms empower users with
                                        granular control over their financial lives through advanced features such as
                                        detailed expense tracking, savings goal analysis, and smart budgeting
                                        recommendations. By providing actionable insights and real-time financial
                                        monitoring, personal finance software helps individuals and businesses make
                                        informed decisions, optimise cash flow, and achieve greater financial stability
                                        and growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>09/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Background Check Software
                                    </h2>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Background check software verifies both personal and organisational information,
                                        helping businesses reduce the risk of fraud, identity theft, and regulatory
                                        non-compliance. It offers comprehensive features such as identity verification,
                                        criminal background screening, credit history analysis, and employment
                                        verification. By automating these checks, financial institutions and enterprises
                                        can make informed decisions, streamline onboarding processes, and maintain the
                                        integrity and security of their financial operations.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>10/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FRS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Financial Reporting Software
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Identity Verification Tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Fraud Prevention in Finance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Credit History Checks</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Automated financial reporting software facilitates precise, real-time analysis
                                        of financial transactions while significantly reducing manual effort and
                                        minimizing human error. It empowers financial institutions and businesses to
                                        streamline their reporting workflows, maintain regulatory compliance, and
                                        enhance internal and external transparency. By integrating with tools such as
                                        QuickBooks, Xero, and other financial platforms, this software improves
                                        operational efficiency, accelerates reporting cycles, and supports data-driven
                                        decision-making across the organization.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>11/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'FC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Financial Calculators
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Automated Financial Reporting</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>QuickBooks And Xero Integrations</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Accuracy Tools</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Financial Transaction Analysis</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Financial calculators play a vital role in both personal and business financial
                                        planning by offering precise and easy-to-use tools for calculating mortgages,
                                        retirement savings, investments, loans, and compound interest. By enabling users
                                        to make informed decisions quickly, these calculators improve financial
                                        accuracy, support strategic planning, and enhance customer engagement—delivering
                                        timely insights that contribute to overall financial confidence and efficiency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Design, UI and UX */}
            <div
                className={` lg:pt-[2em] lg:-mt-[21em] md:-mt-[27em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/fin/ux.jpg'}
                                alt={'Design, UI and UX'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[10em] md:mt-[10em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                Design, UI and UX
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Our UI/UX design services are crafted to simplify complex financial products through
                                intuitive, user-centric interfaces that enhance usability and engagement. We transform
                                dense financial data into clear, actionable visuals and interactive dashboards that
                                support smarter, faster decision-making for both users and businesses. Our approach
                                combines strategic design thinking with powerful tools like Figma and Sketch to deliver
                                high-fidelity prototypes that align with your business goals and regulatory standards.
                                From user research to wireframing and testing, we ensure every touchpoint delivers a
                                seamless, responsive experience that drives customer satisfaction, builds trust, and
                                improves access to digital financial services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={' h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/fin/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Data Science */}
            <div className={`border-b border-black bg-white`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[10em] md:mt-[10em] lg:pr-[2.7em] md:pr-[2.7em] text-black`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Data Science
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                Data science experts at Grey InfoTech specialise in transforming complex datasets into
                                actionable insights by leveraging advanced AI and machine learning models. Using
                                powerful tools like PowerBI, Tableau, and Google Looker Studio, we deliver real-time,
                                data-driven intelligence that drives smarter business decisions. Our big data analytics
                                capabilities enhance operational efficiency, optimise internal processes, and uncover
                                growth opportunities. By identifying patterns, predicting trends, and automating
                                analysis, our AI/ML solutions empower organisations to make informed, strategic
                                decisions with confidence. Partner with us to unlock the full potential of your data and
                                fuel innovation across your business.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[7em] md:pr-[7em] lg:ml-[2em] md:ml-[2em]'}>
                            <Image
                                src={'/assets/fin/data.jpg'}
                                alt={''}
                                width={400}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Innovative, custom and bespoke web apps */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`${isDayTime ? 'text-black' : ' text-white'}`}>
                    <div id={'process'}
                         className={`relative lg:pt-[2em] md:pt-[2em] pt-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] `}>
                        <h2 className={'border-b pb-[0.8em] capitalize border-gray-500 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                            Innovative, custom and <br className={'lg:block md:block hidden'}/>bespoke web apps
                        </h2>

                        <div id={'stages'}
                             className={'grid lg:grid-cols-2 grid-cols-1 gap-10 lg:mt-[10em] mt-6 max-w-full mx-auto w-full h-full lg:mb-0 mb-6'}>

                            {/* Left Section */}
                            <div className={'lg:mr-28 md:mr-28 lg:mb-[7em] md:mb-[7em]'}>

                                {/* The Discovery Phase */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'The Discovery Phase'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>The Discovery Phase</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitors Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Our discovery phase is a critical foundation in our fintech product development
                                        process, designed to ensure every solution is aligned with your business goals
                                        and market demands. At Grey InfoTech, our Business Analysts work closely with
                                        you to conduct in-depth requirements gathering, helping to clarify long-term
                                        needs and define a clear product vision. This phase enables us to identify
                                        potential challenges early, reduce risks, and establish a strategic roadmap
                                        tailored to your objectives. By investing time upfront, we maximise the
                                        potential of your fintech product, ensuring a more focused, efficient, and
                                        successful development journey.
                                    </p>
                                </div>

                                {/* Dedicated FinTech Engineers */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Dedicated FinTech Engineers'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Dedicated FinTech Engineers</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Project Scoping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Agile Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Compliance Checks</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Grey InfoTech’s team of seasoned fintech engineers specialises in developing
                                        robust financial software, including custom trading platforms, mobile banking
                                        applications, and secure digital payment systems. With deep industry experience
                                        and technical expertise, our engineers deliver high-quality, scalable solutions
                                        tailored to your specific business needs. Partnering with us means gaining
                                        access to a dedicated team that understands the complexities of fintech and is
                                        committed to helping you drive innovation, streamline operations, and accelerate
                                        your project’s success in today’s fast-paced financial landscape.
                                    </p>
                                </div>

                                {/* Security & Regulatory Compliance */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`}
                                     id={'Security & Regulatory Compliance'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Security & Regulatory Compliance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Risk Assessment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Regulatory alignment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Secure Development Practice</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Grey InfoTech provides end-to-end security and regulatory compliance services
                                        tailored to fintech software development. Our expertise spans implementing
                                        industry-grade security protocols, advanced data privacy frameworks, and meeting
                                        regulatory standards such as PCI DSS, GDPR, and local compliance mandates. We
                                        prioritise secure system architecture, transparent data ownership, and employ
                                        best practices including audit logging, data encryption, and tokenization. With
                                        ISO27001 certification and Cyber Essentials Plus accreditation, our commitment
                                        to safeguarding sensitive data is proven. Partnering with Grey InfoTech ensures
                                        your fintech products are not only compliant and resilient but also built with
                                        security at the core to reduce risk and maintain user trust.
                                    </p>
                                </div>

                                {/* DevOps */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'DevOps'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>DevOps</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Continuous Integration and Deployment (CI/CD)</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Infrastructure as Code (IaC)</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Monitoring and Optimisation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        DevOps plays a critical role in fintech software development by accelerating
                                        product delivery, enhancing operational reliability, and supporting continuous
                                        improvement. At Grey InfoTech, we integrate DevOps practices to automate
                                        testing, deployment, and monitoring, significantly reducing downtime and
                                        deployment delays. This ensures faster time-to-market, improved collaboration
                                        between development and operations teams, and better compliance with industry
                                        regulations. By streamlining workflows and enabling real-time feedback, DevOps
                                        empowers fintech companies to adapt quickly to market changes, meet evolving
                                        customer expectations, and maintain a competitive edge with secure,
                                        high-performing digital financial solutions.
                                    </p>
                                </div>

                                {/* Quality Assurance */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Quality Assurance'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Quality Assurance</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Initial Audit</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Automated Testing</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        At Grey InfoTech, our QA services are essential to delivering secure, reliable,
                                        and high-performing fintech software. We begin with a comprehensive audit to
                                        identify areas for process improvement, followed by performance testing to
                                        evaluate system stability under different load conditions. Our automated testing
                                        frameworks catch defects early in the development cycle, helping to reduce
                                        rework and lower costs. With a team of experienced QA professionals who
                                        understand both financial industry demands and regulatory standards, we ensure
                                        each solution meets customer expectations and business objectives. By aligning
                                        our testing strategies with your goals, we help accelerate delivery while
                                        maintaining quality, security, and compliance at every stage.
                                    </p>
                                </div>

                                {/* Product Development */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Product Development'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Product Development</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Requirements Gathering</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI/UX Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Agile Development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Our tailored fintech software development process is streamlined to deliver
                                        secure, user-centric, and results-driven solutions. We start by gathering
                                        detailed requirements, conducting in-depth research, and providing accurate
                                        project estimation to shape a clear roadmap. Our team then selects the ideal
                                        tech stack and focuses on crafting intuitive UI/UX designs to ensure seamless
                                        user experiences. Development is executed using agile methodologies, enabling
                                        flexibility, efficiency, and continuous improvement.<br/><br/>

                                        Throughout the process, we prioritise rigorous quality assurance, advanced
                                        security protocols, and strict regulatory compliance. By working closely with
                                        our clients, we ensure a smooth product launch and long-term success. Our custom
                                        financial software enhances customer engagement and business efficiency—powered
                                        by our technical expertise and dedication to excellence. Partner with Grey
                                        InfoTech to transform your fintech vision into reality.
                                    </p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div
                                className='lg:sticky md:sticky lg:top-[5em] md:top-[5em] justify-center items-center w-full max-w-full h-screen lg:h-screen md:h-screen overflow-hidden'>
                                <div>
                                    {imageIds.map((imageId: string) => (
                                        activeId === imageId && (
                                            <div
                                                key={imageId}
                                                className="relative shadow-lg transition-opacity duration-500 ease-in-out opacity-100"
                                                id={imageId}
                                            >
                                                <Image
                                                    src={`/assets/fin/stages/${imageId}.jpg`}
                                                    alt={imageId}
                                                    className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                                    width={1030}
                                                    height={768}
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your Digital Journey */}
            <div id={'digital'}
                 className={` lg:pt-[2em] lg:-mt-[12em] md:-mt-[12em] h-auto max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/fin/journey.jpg'}
                                alt={'Digital Journey'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[2em] md:mt-[2em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                Your Digital Journey
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify border-b border-gray-500 pb-[3em] mb-[3em] leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Working in the fast-paced world of technology, Grey InfoTech thrives on helping
                                entrepreneurs and businesses turn product ideas into reality. With over a decade of
                                experience, we&#39;ve refined our approach to deliver solutions that are both innovative
                                and commercially viable.<br/><br/>
                                Beyond partnering with established enterprises, we&#39;ve successfully supported
                                numerous funded startups—developing MVPs, launching scalable digital products,
                                strengthening their infrastructure, and supporting them through growth and acquisition.
                                We bring this hands-on experience and strategic insight to every project, helping you
                                navigate the journey from concept to market success.
                            </p>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify mb-[3em] lg:mr-[9em] md:mr-[9em]'>
                                We’d love to hear your plans and discuss how we can contribute.
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Grey InfoTech for your app project */}
            <div className={`lg:h-full md:h-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Why Grey InfoTech <br className={'lg:block md:block hidden'}/>for your app project
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                With unmatched expertise and a strong record of success, Grey InfoTech is a trusted
                                leader in fintech software—delivering tailored solutions that drive real impact.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em]mx-auto px-4 grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
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
                                        className={`relative leading-[1.2] lg:text-[1.5em] md:text-[1.5em] text-[1em] mb-4 font-[600] cursor-pointer transition-all ${
                                            index + 1 === activeIndex
                                                ? isDayTime
                                                    ? 'text-black font-[600]'
                                                    : 'text-white font-[600]'
                                                : 'text-gray-500'
                                        }`}
                                        onClick={() => setActiveIndex(index + 1)}
                                    >
                                        {reason.title}
                                    </h3>
                                    <div className={'lg:pr-[9.3em] md:pr-[9.3em]'}>
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
                                                <motion.div
                                                    key={reason.id}
                                                    initial={{opacity: 0, y: -20}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -20}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                    className={`relative text-justify inline-block ${
                                                        isDayTime ? 'text-black font-[300]' : 'text-white font-[300]'
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
                        <div className='lg:mt-[2em] md:mt-[2em] h-auto w-full max-w-full sticky'>
                            {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                                <Image
                                    key={idx}
                                    src={image}
                                    alt={`Reason ${activeIndex} Image ${idx + 1}`}
                                    width={1024}
                                    height={583}
                                    className="mb-4 object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    <div
                        className={`items-center ${isDayTime ? 'text-black' : 'text-white'} justify-center`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.1] pb-6 text-center'>
                            Ready to start the <br className={'lg:block md:block hidden'}/>conversation?
                        </h2><br/>
                        <Link href='/contact' className='flex items-center justify-center-safe text-center'>
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
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-white group-hover:text-gray-300' : 'text-black group-hover:text-gray-800'}`}>
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full  mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
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
                className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
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

            {/* Top Image*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em]  mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-3 h-auto md:grid-cols-3 grid-cols-1 gap-6'}>
                        <div className={'h-auto w-full max-w-full lg:mt-[1.2em] md:mt-[1.2em]'}>
                            <Image
                                src={'/assets/fin/1.jpg'}
                                alt={'app'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'h-auto w-full max-w-full'}>
                            <Image
                                src={'/assets/fin/2.jpg'}
                                alt={'hand'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'h-auto w-full max-w-full lg:mt-[8em] md:mt-[8em]'}>
                            <Image
                                src={'/assets/fin/3.jpg'}
                                alt={'hand'}
                                width={1396}
                                height={1440}
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
                            FAQ&#39;s About FinTech
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            Got questions about FinTech? You&#39;re not alone. Whether you&#39;re curious about how
                            digital payments work, <br className={'lg:block md:block hidden'}/>the role of AI in
                            finance, or what
                            it takes to build a secure FinTech app, we’ve got answers. Our FAQ section <br
                            className={'lg:block md:block hidden'}/>covers the essentials—making complex financial
                            technology
                            easier to understand and helping you make <br className={'lg:block md:block hidden'}/>informed
                            decisions.
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
                            <span>What is FinTech software development?</span>
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
                                Scalability is a key driver of long-term success in FinTech software development,
                                enabling platforms to adapt efficiently to increasing user demands, complex data flows,
                                and evolving regulatory requirements. A scalable architecture ensures that financial
                                services remain reliable, responsive, and secure as the business grows. It also supports
                                faster product updates, integration of new features, and smooth user experiences. For
                                FinTech companies, this translates to sustained performance, improved client retention,
                                and the agility to seize new market opportunities while maintaining compliance and
                                operational efficiency.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why would I need FinTech software development services?</span>
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
                                Why choose FinTech software development services? In today’s fast-evolving financial
                                landscape, they are essential for institutions and startups seeking a competitive edge.
                                With the right development partner, you can digitise and optimise your operations,
                                enhance financial management, ensure compliance, and elevate customer engagement.
                                Tailor-made FinTech solutions deliver intuitive user experiences, seamless integrations,
                                and agile scalability—empowering your business to innovate faster and serve clients
                                better. In short, investing in FinTech software is a strategic move that drives
                                efficiency, boosts growth, and future-proofs your business in the digital economy.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What makes Grey InfoTech a reliable FinTech software <br
                                className={'lg:block md:block hidden'}/>development services?</span>
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
                                Grey InfoTech is your trusted partner in FinTech development, bringing deep expertise in
                                building custom financial services and innovative FinTech applications. Our experienced
                                team leverages the latest technologies to deliver scalable, secure, and user-centric
                                solutions tailored to your business goals. We prioritise transparency, open
                                communication, and seamless collaboration throughout every stage of development. With a
                                proven track record of success in the financial sector, we understand your unique
                                challenges and are equipped to provide smart, future-ready solutions. At Grey InfoTech,
                                your success is our mission—and we’re committed to helping you achieve it.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does the FinTech software development process take?</span>
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
                                The duration of FinTech <Link
                                href='/services/Software-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>software
                                development</Link> varies based on project complexity, features, and integration needs.
                                At Grey InfoTech, we start with a thorough discovery phase to define scope, technical
                                requirements, compliance, and business goals, enabling us to create a tailored roadmap
                                and provide a realistic timeline. Smaller MVPs typically take 8–16 weeks, while complex
                                platforms may require several months. We use an agile approach with iterative sprints to
                                maintain progress and incorporate client feedback promptly, ensuring transparency,
                                alignment, and minimizing delays. Our focus is on delivering secure, scalable, and
                                high-quality fintech solutions on time, fully aligned with your business objectives and
                                regulatory requirements.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the cost of FinTech software development services?</span>
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
                                FinTech software development pricing varies based on project complexity, scope, and
                                feature requirements. At Grey InfoTech, we focus on delivering tailored solutions that
                                align with each client’s specific needs and budget. During our initial consultation, we
                                thoroughly assess your requirements to provide a clear, transparent cost estimate.
                                Throughout the development process, we prioritise cost-efficiency without compromising
                                quality, ensuring you receive top-tier FinTech solutions that exceed expectations while
                                adhering to the agreed budget.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can you ensure regulatory compliance in FinTech software development?</span>
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
                                Absolutely. At Grey InfoTech, we bring deep expertise in developing FinTech software
                                that fully complies with industry regulations and standards. Our team stays up to date
                                with the complex regulatory environment governing financial processes, ensuring every
                                solution we deliver meets essential compliance requirements. We collaborate closely with
                                clients to understand their unique compliance challenges and integrate these into the
                                development lifecycle. By combining our regulatory knowledge with advanced FinTech
                                development skills, we help clients confidently navigate compliance hurdles while
                                building secure, reliable software solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How can I stay involved in the FinTech software development process?</span>
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
                                At Grey InfoTech, we prioritise transparency and collaboration at every stage of the
                                FinTech software development process. From the outset, we provide clients with early
                                access to visual and technical designs, giving them a clear view of the project’s
                                direction and progress. This proactive approach allows for timely feedback and ensures
                                that evolving requirements are addressed effectively. We maintain open communication
                                through dedicated channels and conduct regular progress reviews to keep stakeholders
                                informed and aligned. Our goal is to create an inclusive development experience where
                                clients are fully engaged, enabling us to deliver tailored FinTech solutions that meet
                                their expectations and business goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What kind of support and maintenance do you offer after the FinTech <br
                                className={'lg:block md:block hidden'}/>software is developed?</span>
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
                                At Grey InfoTech, our commitment to clients goes well beyond software delivery—we
                                provide continuous support and maintenance to ensure the long-term reliability and
                                performance of their FinTech solutions. Our dedicated team is always on hand to resolve
                                technical issues, implement system updates, and offer expert guidance whenever required.
                                We also roll out regular upgrades to introduce new features, performance enhancements,
                                and critical security patches, ensuring the software remains secure, compliant, and
                                competitive. By handling ongoing maintenance, we enable our clients to focus on their
                                core business with full confidence that their FinTech platforms are optimised, up to
                                date, and fully supported.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Fintech;