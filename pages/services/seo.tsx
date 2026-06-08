import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import '../../app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import CountUp from "react-countup";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

// Testimonial data
const testimonials = [
    {
        name: "Ayo Mensimah",
        title: "Head of Web Experience, TaskFlow Inc",
        message: (
            <>
                Their SEO strategy helped us dramatically improve our visibility in European markets. Their
                technical audits, keyword targeting, and on-page improvements led to a steady rise in organic traffic
                and better conversion rates. They truly understand how to align SEO with business goals.
            </>
        ),
    },
    {
        name: "Chika Eze",
        title: "Digital Marketing Lead, ShopEase",
        message: (
            <>
                We partnered with Grey InfoTech to strengthen our online presence, and the results were impressive.
                Their SEO team boosted our rankings for key shopping-related queries, driving a surge in qualified
                traffic and increasing customer retention. Their support made a real difference to our growth.
            </>
        )
    },
];

const Seo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);


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
            "SEOC",
            "KMR",
            "TSEOA",
            "OSEO",
            "LB",
            "CM",
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

    // Our Discovery Process Hook
    const imageIds = useMemo(() => [
        "The Digital Phase",
        "Dedicated FinTech Engineers",
        "Security & Regulatory Compliance",
        "DevOps",
        "Quality Assurance",
        "Product Development",
    ], []);

    const handleScrollStages = useCallback(() => {
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
    }, [imageIds]);

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, [handleScrollStages]);

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

// Reasons
    const reasons = [
        {
            id: 1,
            title: 'End-to-End Expertise',
            description: (
                <>
                    We provide end-to-end mobile app development services, covering everything from initial consulting
                    and
                    UX/UI design to robust backend infrastructure, development, deployment, and ongoing support. Whether
                    you&#39;re a <Link href='/Startups'
                                       className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>startup</Link> looking
                    to launch or an established enterprise aiming to innovate, we manage the entire
                    lifecycle—ensuring your app is not only functional and scalable but also aligned with your business
                    goals.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
        {
            id: 2,
            title: 'Bespoke Solutions',
            description: (
                <>
                    At Grey InfoTech, we reject the one-size-fits-all approach. Instead, we invest time in understanding
                    your specific business objectives, user expectations, and industry dynamics to craft
                    tailored <Link href='/services/Mobile-Application-Development'
                                   className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>mobile
                    applications</Link>. Our focus is on delivering solutions that create measurable value, enhance user
                    engagement, and give your business a competitive edge in the marketplace.
                </>
            ),
            images: ['/assets/fin/grey1.jpg']
        },
        {
            id: 3,
            title: 'Proven Track Record',
            description: (
                <>
                    Our team brings proven expertise across diverse industries such
                    as <Link href='/industries/fintech'
                             className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>fintech</Link>,
                    proptech, and beyond. With a portfolio of award-winning mobile applications, we consistently deliver
                    high-performance, scalable solutions designed to drive measurable business results and foster
                    lasting success.
                </>
            ),
            images: ['/assets/fin/grey2.jpg']
        },
        {
            id: 4,
            title: 'Technology Innovation',
            description: (
                <>
                    We stay ahead of the curve by leveraging the latest technologies, frameworks, and integrations.
                    Whether developing native apps or cross-platform solutions, we ensure your product is built with the
                    most efficient, scalable, and future-proof technology to maximize performance and longevity.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
        {
            id: 5,
            title: 'Ongoing Support & Maintenance',
            description: (
                <>
                    Our partnership extends well beyond launch. We provide ongoing support, including regular updates,
                    security patches, and feature enhancements, ensuring your app remains secure, up-to-date, and
                    optimally aligned with your evolving business needs.
                </>
            ),
            images: ['/assets/fin/grey.jpg']
        },
    ];

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
                 className={`relative max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                <h1
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] sm:text-[2em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[1em] leading-[1.1] font-[600]`}>
                    Search Engine <br className={'lg:block md:block hidden'}/>Optimisation Agency
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Did you know the top 3 Google search results capture over 75% of all clicks? Let us help you get
                    there. Request a free SEO audit from one of our experts and discover <br
                    className={'lg:block md:block hidden'}/>what’s holding your site back.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/seo/hero.jpg'}
                        alt={'SEO'}
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
                            Smart SEO strategies <br className={'lg:block md:block hidden'}/>tailored for business <br
                            className={'lg:block md:block hidden'}/>success
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Search Engine Optimisation (SEO)
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Search Engine Optimisation (SEO) is a critical component of digital success, focused
                                    on improving your website’s ranking on Search Engine Results Pages (SERPs) to drive
                                    consistent, high-quality organic traffic. At Grey InfoTech, we approach SEO as a
                                    long-term investment that delivers measurable results. From on-page optimisation and
                                    technical audits to keyword research, content strategy and link-building, our
                                    comprehensive SEO solutions are designed to increase visibility, enhance brand
                                    authority and support lead generation for sustained business growth.
                                </p>
                            </div>
                            <div>
                                <p>
                                    With over 8 years of industry experience, we understand the ever-changing nature of
                                    search engine algorithms and adapt our strategies accordingly. Our team of seasoned
                                    SEO consultants and content creators deliver clear, data-backed guidance without
                                    jargon or unnecessary complexity. Whether you’re a startup looking to gain traction
                                    or an established business seeking to boost your digital presence, we provide a
                                    structured, ROI-focused approach to help you reach and exceed your growth
                                    objectives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO services overview */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'SEO Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                SEO Services <br className={'lg:block md:block hidden'}/>Overview
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                We help optimize some of the web’s largest and most complex sites. Leverage our
                                expertise through a range of proven SEO services designed to drive traffic, improve
                                rankings, and deliver measurable results.
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
                                    {id: "01", title: "SEO Consultancy", target: "SEOC"},
                                    {id: "02", title: "Keyword & Market Research", target: "KMR"},
                                    {id: "03", title: "Technical SEO Audit", target: "TSEOA"},
                                    {id: "04", title: "Onsite SEO", target: "OSEO"},
                                    {id: "05", title: "Link Building", target: "LB"},
                                    {id: "06", title: "Content Marketing", target: "CM"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[15em] md:mb-[19em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SEOC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        SEO Consultancy
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>SEO Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Keywords</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Search Engines</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Whether you’re new to SEO or an established business seeking better performance,
                                        Grey InfoTech delivers strategic, results-driven SEO solutions tailored to your
                                        goals. We focus on improving your online visibility, increasing organic traffic,
                                        and driving qualified leads through proven techniques and data-backed insights.
                                        Whether working independently or alongside your internal team, we ensure a
                                        seamless collaboration that prioritises measurable outcomes, long-term growth,
                                        and full transparency throughout the process. With our deep industry expertise
                                        and commitment to excellence, we position your business for sustained success in
                                        competitive search landscapes.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'KMR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Keyword & Market Research
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market Research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Traffic Potential</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        It all starts with a search—by identifying and analysing the keywords and
                                        phrases your potential customers are most likely to use when searching online.
                                        Through comprehensive keyword research, aligned with your industry and target
                                        market, we uncover high-value opportunities that form the foundation of an
                                        effective SEO strategy. This process enables us to provide realistic traffic
                                        projections, assess competition levels, and forecast your website’s visibility
                                        potential. With this insight, we help you make informed decisions, align content
                                        with user intent, and set measurable goals that drive meaningful business growth
                                        through search.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'TSEOA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Technical SEO Audit
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Website Audit</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Search Engines</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Website Traffic</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We begin with a comprehensive audit of your website to assess all technical SEO
                                        elements, from site structure and crawl-ability to page speed and mobile
                                        optimisation. By analysing the audit findings, we identify issues that may
                                        hinder search engine visibility and prioritise them based on impact. This leads
                                        to a clear, actionable plan focused on ensuring your site is properly indexed,
                                        efficiently crawled, and positioned to perform well in search engine
                                        rankings—laying the groundwork for sustained organic growth and improved
                                        discoverability.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'OSEO'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Onsite SEO
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Internal Linking</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Online Presence</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Site Navigation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Onsite SEO focuses on optimising elements within your website to improve
                                        visibility and relevance in search engine results. This includes enhancing site
                                        navigation for better user experience, refining internal linking structures to
                                        guide both users and search engines, and optimising headings and metadata for
                                        clarity and keyword alignment. Additionally, producing high-quality, targeted
                                        content ensures your site effectively communicates its value, increases
                                        engagement, and strengthens your overall online presence.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'LB'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Link Building
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Payment Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Authentication</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Link building remains one of the most influential factors in establishing your
                                        website’s authority and improving search engine rankings. Through strategic PR
                                        and outreach efforts, we focus on securing high-quality, trusted backlinks that
                                        not only drive referral traffic but also enhance your <Link
                                        href='/services/branding'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>brand’s</Link> credibility
                                        online. By partnering with reputable sources, we ensure that every link adds
                                        genuine value and supports long-term SEO success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Content Marketing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalability Upgrades</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Minimal Disruption</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>App Migration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Content is still king, and having the right team makes all the difference. Our
                                        expert content creators, copywriters, designers, and videographers work together
                                        to produce high-quality content that aligns with your brand and drives
                                        engagement. We don’t just deliver one-off pieces—we build and execute a scalable
                                        content strategy tailored to your goals, ensuring consistent output that
                                        supports your long-term growth and enhances your digital presence.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frst image*/}
            <div id={'first image'} className={'lg:-mt-[32em] md:-mt-[32em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/first.jpg'}
                    alt={'first Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Research */}
            <div
                className={` lg:pt-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/seo/research.jpg'}
                                alt={'Research'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[1.5em] md:mt-[1.5em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Search Engine Optimization (SEO) is a strategic, long-term investment critical to
                                enhancing your online presence and driving sustainable business growth. Success begins
                                with a deep understanding of your industry, business objectives, and target audience. We
                                start every SEO engagement with comprehensive market research and a detailed audit of
                                your website using industry-leading tools. This process uncovers performance gaps,
                                technical issues, and opportunities to refine your digital strategy.<br/><br/>

                                Contrary to common misconceptions, effective SEO extends beyond a handful of generic
                                keywords. Our approach involves crafting a diversified keyword strategy tailored to your
                                business, targeting a wide range of relevant search terms across your website’s pages.
                                This ensures that all areas of your site attract qualified traffic, maximizing
                                visibility and engagement throughout the customer journey.<br/><br/>

                                By implementing this holistic SEO strategy, your business benefits from increased
                                organic search traffic, improved user experience, and higher conversion rates. Our focus
                                on measurable outcomes and continuous optimization ensures that your website not only
                                ranks well in search engines but also delivers tangible business results over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyword Research */}
            <div className={`border-b ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[4em] md:mt-[4em] lg:-mr-[5.4em] md:-mr-[5.4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Keyword Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                Selecting the right keywords is fundamental to driving meaningful traffic and business
                                growth through search marketing. By thoroughly researching your market’s top keywords
                                and understanding your customers’ search behaviour, we identify the most valuable terms
                                and phrases to target with SEO. This targeted approach ensures that you attract visitors
                                who are not just numerous but highly relevant to your business objectives.<br/><br/>

                                Effective keyword research goes beyond simply increasing site traffic; it focuses on
                                drawing the right audience—those most likely to engage and convert. We prioritise
                                keywords based on their relevance, search volume, and profitability, aligning them
                                closely with your competitive strengths and content capabilities.<br/><br/>

                                Starting with keywords where you already have a competitive edge allows us to build
                                momentum quickly and strategically. This refined keyword strategy forms the foundation
                                for sustainable SEO success, driving quality traffic that supports your business goals.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[11em] md:pr-[11em] lg:ml-[3.5em] md:ml-[3.5em]'}>
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

            {/* Competitors Research */}
            <div className={`border-b ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:pr-[2.7em] md:pr-[2.7em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Competitors Research
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:-mr-[4.3em] md:-mr-[4.3em]'>
                                During the Competitor Research phase, we begin by identifying who your true digital
                                competitors are—those ranking for the keywords your target audience is actively
                                searching. This often includes both direct business rivals and companies outside your
                                industry competing for online visibility. We assess their content strategies, technical
                                SEO health, backlink profiles, and overall search performance to map out the competitive
                                landscape with precision.<br/><br/>

                                Our research goes beyond surface-level analysis. We use advanced SEO tools to uncover
                                the keywords your competitors are ranking for, how they structure their content, and
                                which tactics they use to drive authority. This allows us to benchmark your current
                                standing and identify strategic opportunities for growth based on what’s working in your
                                space.<br/><br/>

                                We then filter and validate these competitors based on relevance, keyword overlap, and
                                traffic value. This stage helps us focus on the players that truly influence your
                                rankings and market share. Simultaneously, we revisit and refine the keyword list to
                                align with findings from the competitor review, ensuring high-impact terms are
                                prioritized.<br/><br/>

                                The insights gathered form the foundation of your tailored SEO strategy. From on-page
                                recommendations to long-term content planning, everything is informed by a solid
                                understanding of your digital competition. With a clear view of the landscape, we’re
                                able to help you outpace the competition, drive high-quality traffic, and position your
                                business for measurable, long-term success.
                            </p>
                        </div>
                        <div
                            className={'relative mb-4 w-full h-auto max-w-full lg:pr-[11em] md:pr-[11em] lg:ml-[3.5em] md:ml-[3.5em]'}>
                            <Image
                                src={'/assets/seo/compe.jpg'}
                                alt={''}
                                width={400}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/mid.jpg'}
                    alt={'mid Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Implementation */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.15em] md:text-[3.15em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Implementation
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            With the research phase complete, we move into optimization—implementing targeted
                            improvements that enhance your site’s performance, visibility, and user experience.

                        </p>
                    </div>
                </div>

                {/* Initial Setup */}
                <div id={'initial setup'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] capitalize justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            initial setup
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            The initial setup phase is focused on resolving foundational technical and on-page SEO
                            issues that may hinder your website’s visibility and organic performance. This includes
                            addressing broken links, correcting poorly formed HTML, adding missing image metadata, and
                            optimising page titles, meta descriptions, and URL structures to align with SEO best
                            practices. We also implement semantic enhancements such as schema markup, Open Graph tags,
                            and microdata to help search engines better understand your content and improve how it
                            appears in search results. In some cases, adjustments to your website’s template or
                            underlying code may be necessary to support these optimisations. By establishing a
                            technically sound and search-friendly foundation, this phase ensures your site is
                            well-positioned for long-term growth, improved rankings, and increased visibility across
                            relevant search queries.
                        </p>
                    </div>
                </div>

                {/* One-Page Optimisation */}
                <div id={'one-page optimisation'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            One-page <br className={'lg:block md:block hidden'}/>Optimisation
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Once the technical and semantic issues are resolved, we move into the on-page optimisation
                            phase, focusing on enhancing individual pages to boost user engagement and search
                            visibility. This involves reviewing your content to ensure it’s clear, well-structured, and
                            compelling for your target audience. Our copywriters refine and enhance existing copy where
                            needed, improving tone, readability, and relevance to key search terms. We may also
                            recommend and help source high-quality images, videos, or other multimedia assets to enrich
                            your content and elevate user experience. This stage ensures each page is not only optimised
                            for search engines but also resonates with potential customers, driving better results and
                            deeper engagement.
                        </p>
                    </div>
                </div>

                {/* SEO Link Building and Outreach */}
                <div id={'SEO link building and Outreach '}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-700 hover:text-white' : 'text-gray-300 hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] capitalize font-[500] justify-center tracking-tight lg:pr-[10em] md:pr-[10em] leading-[1.2] rounded-none'>
                            SEO Link Building <br className={'lg:block md:block hidden'}/>and Outreach
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            In addition to on-site optimisation, off-site factors—especially backlinks—play a critical
                            role in search engine rankings. Building a strong backlink profile enhances your website’s
                            authority and credibility, signaling to search engines that your content is trustworthy and
                            relevant. We implement targeted strategies to earn high-quality, relevant backlinks by
                            promoting your content through digital PR, industry blogs, and social platforms. Our
                            approach not only drives referral traffic but also strengthens your site&#39;s overall
                            visibility and ranking potential across search engines.
                        </p>
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
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-800' : 'text-white group-hover:text-gray-300'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-500 ${
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

            {/* SEO Reporting and Reviews */}
            <div className={`${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Monitor Performance, <br className={'lg:block md:block hidden'}/>Ensure Success
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            SEO Reporting and Reviews
                        </h3>
                        <div
                            className=' mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <p>
                                Understanding what’s working is key to measuring SEO success. That’s why we begin every
                                project with a comprehensive benchmark report, capturing your site’s current
                                performance, keyword rankings, and traffic metrics. From there, we track progress month
                                by month, delivering clear performance, traffic, and revenue reports that reflect real
                                value. But we don’t stop at data—we provide expert insights into what’s driving results
                                and offer strategic recommendations for continuous growth and refinement.<br/><br/>

                                Ready to take the next step? Contact us today for a free SEO website audit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div
                className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
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

            {/* Stages of our development process */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'development process'}
                     className={`lg:pt-[6em] md:pt-[6em] pt-[2em] relative mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[3.2em] lg:text-[3.2em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Stages of Our <br className={'lg:block md:block hidden'}/>Development Process
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We design digital products that people love to use and businesses are proud to own.
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
                                                We’re Experienced
                                            </>
                                        ),
                                        description: (
                                            <>
                                                With a proven track record across a wide range of digital projects, we
                                                blend creative thinking, technical precision, strategic insight, and
                                                hands-on execution to deliver solutions that generate measurable
                                                business impact. Our approach is focused on achieving long-term value
                                                and sustainable growth—ensuring that every project not only meets
                                                expectations but drives real results.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "We’re Proactive",
                                        description: (
                                            <>
                                                You can rely on us to consistently exceed expectations by taking a
                                                proactive, solution-driven approach at every stage of your project. We
                                                identify potential challenges early, offer innovative recommendations
                                                without being asked, and continually look for new ways to deliver added
                                                value. Our commitment is not just to complete the work, but to elevate
                                                it—ensuring outcomes that are smarter, stronger, and aligned with your
                                                long-term goals.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "We're Collaborative",
                                        description: (
                                            <>
                                                While we’re passionate about technology, our greatest strength lies in
                                                the people behind it. To us, collaboration means more than just being
                                                easy to work with—it’s about becoming a trusted partner who shares your
                                                vision, ambition, and commitment to achieving something exceptional. We
                                                align with your goals, bring fresh thinking to the table, and work side
                                                by side to turn bold ideas into real business outcomes.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                We&#39;re Invested
                                            </>
                                        ),
                                        description: (
                                            <>
                                                When you invest in us, we become fully invested in your business goals.
                                                Every project is approached with a strong sense of ownership and
                                                responsibility, ensuring no detail is overlooked. Our team is committed
                                                to delivering results that meet the highest professional standards,
                                                taking accountability for outcomes, and consistently striving to exceed
                                                expectations. This dedication drives us to deliver solutions that are
                                                not only technically sound but also strategically aligned with your
                                                long-term objectives.
                                            </>
                                        ),
                                    },
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[350px] w-[400px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-white' : 'text-black'
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

            {/* last image*/}
            <div id={'last image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/seo/last.jpg'}
                    alt={''}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
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
                                We&#39;ve successfully delivered projects across various industries. In this section,
                                you&#39;ll
                                find examples that may align with your needs.
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
                                                    transition={{duration: 0.3, ease: "easeInOut"}}
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>Search Engine <br
                            className={'sm:no-sr-only'}/>Optimisation (SEO) <br className={'lg:block md:block hidden'}/>Questions
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
                            <span>What exactly is Search Engine Optimisation (SEO)?</span>
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
                                Search Engine Optimization (SEO) is a critical business strategy focused on increasing a
                                website’s visibility and ranking within search engine results pages (SERPs) to drive
                                qualified organic traffic. By applying targeted techniques that improve site relevance,
                                authority, and <Link
                                href='/services/ui-ux-design'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>user
                                experience</Link>, SEO helps businesses attract the right audience, enhance
                                brand credibility, and ultimately increase conversions. This comprehensive approach
                                involves ongoing analysis and optimization to ensure sustained performance and alignment
                                with evolving search engine algorithms and market trends, making SEO an essential
                                component for achieving long-term digital growth and competitive advantage.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why is SEO important for my website?</span>
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
                                SEO is essential because it enables search engines to accurately interpret your
                                website’s content and intent, improving your chances of ranking higher for relevant
                                queries. Achieving higher rankings boosts your online visibility, drives increased
                                organic traffic, and enhances conversion opportunities. Ultimately, effective SEO
                                supports your business growth by strengthening your digital presence and attracting
                                valuable, intent-driven visitors to your site.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What are the key components of SEO?</span>
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
                                SEO is made up of several key components that work together to improve a website’s
                                search engine performance. These include keyword research, which identifies the search
                                terms your audience is using; on-page optimisation, which refines elements like meta
                                tags, headings, and content for relevance and clarity; and technical optimisation, which
                                ensures your site is properly crawled and indexed. Link building helps establish
                                authority through high-quality backlinks, while user experience optimisation focuses on
                                improving site speed, mobile responsiveness, and overall usability. Together, these
                                elements drive sustainable organic growth and improve visibility in search engine
                                results.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to see results from SEO?</span>
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
                                The timeline for seeing results from SEO depends on several variables, such as industry
                                competition, the existing condition of your website, and the consistency of your SEO
                                strategy. Typically, noticeable improvements in rankings and traffic begin to appear
                                within 3 to 6 months, though this can vary. SEO is not a one-time task but a long-term
                                investment that demands ongoing optimisation, regular performance tracking, and
                                adaptability to evolving search engine algorithms and market dynamics to maintain and
                                grow results over time.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Are there any risks or potential drawbacks to SEO?</span>
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
                                While SEO provides substantial benefits, it also comes with potential risks if not
                                executed properly. Using unethical or manipulative tactics—such as keyword stuffing,
                                link schemes, or cloaking—can lead to penalties or deindexing from search engines,
                                damaging your online visibility and credibility. That’s why adhering to ethical,
                                white-hat SEO practices is critical. Furthermore, SEO is a long-term strategy that
                                requires patience, consistency, and ongoing effort. Results are not immediate or
                                guaranteed, and success depends on continuous optimisation and alignment with evolving
                                search engine algorithms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Should I hire an SEO agency or do it myself?</span>
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
                                Choosing between managing SEO in-house or hiring an agency depends on your business’s
                                capabilities, goals, and available resources. SEO is multifaceted—requiring technical
                                expertise, content creation, analytics, and continuous updates aligned with evolving
                                search engine algorithms. If your team has the time, tools, and knowledge, in-house SEO
                                may work. However, partnering with an experienced SEO agency can bring specialised
                                skills, efficient execution, and strategic insights that accelerate performance and free
                                up internal resources. For many businesses, outsourcing SEO ensures a higher return on
                                investment and more consistent, measurable results.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Do you partner with SEO companies?</span>
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
                                Yes, Grey InfoTech partners with reputable SEO agencies to deliver data-driven,
                                results-focused strategies tailored to your audience. Through these collaborations, we
                                leverage advanced tools and expert insights to conduct comprehensive keyword research,
                                competitor analysis, and technical audits—ensuring your website is optimised for
                                visibility, engagement, and long-term growth.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Seo;