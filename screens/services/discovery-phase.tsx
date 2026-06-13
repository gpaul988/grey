'use client';
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import CountUp from "react-countup";


const DiscoveryPhase = () => {
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
            "URED",
            "CRA",
            "PV",
            "BA",
            "TFA",
            "PR",
            "PPE",
            "SHA",
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
    const imageIds: string[] = [
        "Initial Meeting",
        "Workshops",
        "Follow-up Meetings",
        "Write-up & Presentation",
    ];

    const handleScrollStages = () => {
        for (const imageId of imageIds) {
            const textElement = document.getElementById(imageId); // Corresponding text element
            const imageElement = document.getElementById(imageId); // Corresponding image element

            if (textElement && imageElement) {
                const textRect = textElement.getBoundingClientRect();
                const screenCenter = window.innerHeight / 2; // Center of the screen

                // Check if the text is centered on the screen
                if (textRect.top <= screenCenter && textRect.bottom >= screenCenter) {
                    setActiveId(imageId); // Set activeId when the text is centered
                    break;
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScrollStages);
        return () => {
            window.removeEventListener("scroll", handleScrollStages);
        };
    }, []);

    // Sticky menu hook
    useEffect(() => {
        const handleScroll = () => {
            const stagesSection = document.getElementById('stages');
            const involvedSection = document.getElementById('involved');

            if (stagesSection && involvedSection) {
                const stagesRect = stagesSection.getBoundingClientRect();
                const involvedRect = involvedSection.getBoundingClientRect();

                // Make sticky menu visible only within the "services-section"
                setIsVisible(
                    stagesRect.top <= window.innerHeight &&
                    stagesRect.bottom >= 0 &&
                    involvedRect.top >= window.innerHeight
                );
            } else {
                console.warn('Sections not found in DOM');
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Discovery Process Deliverables Hook
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

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
                    Project <br className={'lg:block md:block hidden'}/>Discovery Phase
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Unlock your product’s potential with strategic roadmapping and user-focused design — built to drive
                    market success and elevate user satisfaction.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/disc/hero.jpg'}
                        alt={'Discovery Phase'}
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
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 md:pt-20 pt-6 lg:pb-16 md:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Simplifying product discovery
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            What is the Discovery Phase <br className={'lg:block md:block hidden'}/>and How Does it
                            Work?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Kickstart your digital product with a focused and collaborative discovery process
                                    tailored to align with your business vision and objectives. Whether you&#39;re
                                    building a solution from the ground up or refining an existing concept, our team
                                    partners with you to define success metrics, understand your users, and uncover
                                    opportunities that deliver measurable value. Through detailed market research, user
                                    experience mapping, and stakeholder alignment, we craft a solid foundation that
                                    informs every decision moving forward.
                                </p>
                            </div>
                            <div>
                                <p>
                                    We prioritise features that drive the most impact while identifying secure, scalable
                                    technologies that support growth and performance over time. From architecture
                                    planning to user journey optimisation, every recommendation is made with long-term
                                    ROI in mind. Our goal is to help you reduce risk, accelerate time-to-market, and
                                    confidently achieve product-market fit. With a strategic discovery phase, you gain
                                    clarity, direction, and a roadmap for meaningful digital success.
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
                                src={'/assets/disc/2.jpg'}
                                alt={'home'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/disc/3.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/disc/1.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div>
                            <Image
                                src={'/assets/disc/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Discovery process solutions */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'node-development'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.25em] md:text-[3.25em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                Discovery Process Solutions
                            </h2>
                        </div>
                    </div>
                    <div
                        className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-16 lg:mt-28 md:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                        <div
                            className='lg:sticky md:sticky top-28 lg:h-screen md:h-screen lg:mr-[11em] overflow-hidden'>
                            <h3 className={`text-[1.5em] font-[500] tracking-tight constant-text ${
                                isDayTime ? 'text-white' : 'text-black'
                            }`}>
                                Our Solutions
                            </h3>
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-white decoration-gray-300 focus:decoration-gray-600' : 'text-black decoration-gray-600 focus:decoration-gray-900'
                            }`}>
                                {[
                                    {id: "01", title: "User Research & Experience Design", target: "URED"},
                                    {id: "02", title: "Competitor Research & Analysis", target: "CRA"},
                                    {id: "03", title: "Prototyping & Validation", target: "PV"},
                                    {id: "04", title: "Business Analysis", target: "BA"},
                                    {id: "05", title: "Technical Feasibility Assessment", target: "TFA"},
                                    {id: "06", title: "Product Roadmapping", target: "PR"},
                                    {id: "07", title: "Project Planning & Estimation", target: "PPE"},
                                    {id: "08", title: "Stakeholder Alignment", target: "SHA"},
                                ].map((item, index) => (
                                    <li key={index} className={'group lg:mt-6 mt-4'}>
                                        <button
                                            onClick={() => scrollToSection(item.target)}
                                            className={`w-full text-left flex items-center gap-4 mb-4 focus:font-[650] ${
                                                isDayTime
                                                    ? `focus:text-white ${activeId === item.target ? 'text-gray-100 font-[650]' : 'text-gray-500 font-[400]'}`
                                                    : `focus:text-black ${activeId === item.target ? 'text-gray-900 font-[650]' : 'text-gray-500 font-[400]'}`
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[10em] md:mb-[19em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'URED'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        User Research & Experience Design
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Experience Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>UX Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Usability Testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Personas</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Journey Mapping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Prototyping</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Let’s get to know the people who matter most to your business—your customers. We
                                        begin by engaging with them directly, listening to their experiences, and
                                        gaining a clear understanding of what motivates their decisions, behaviours, and
                                        expectations.<br/><br/>

                                        Through meaningful interviews, surveys, and data analysis, we identify patterns,
                                        pain points, and opportunities that your product can address. These insights
                                        help us craft detailed user personas and customer journey maps, providing a
                                        strategic foundation for designing a product experience that’s intuitive,
                                        relevant, and tailored to real user needs.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CRA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Competitor Research & Analysis
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Market Research</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Audience Segmentation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Market Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Industry Trends</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Growth</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Competitor research and analysis are vital to understanding the market dynamics
                                        that shape your industry. By examining competitor products, positioning, and
                                        customer feedback, we deliver clear, actionable insights that support smarter
                                        product decisions. Our thorough analysis helps you uncover gaps in the market,
                                        anticipate trends, and refine your value proposition to gain a competitive edge.
                                        <br/><br/>
                                        Working closely with you, we define key audience segments, evaluate market
                                        demand, and validate the potential of your product. This data-driven approach
                                        ensures your go-to-market strategy is focused, relevant, and aligned with
                                        customer expectations—setting your business up for long-term growth and success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PV'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Prototyping & Validation
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Prototyping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Design Iteration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Product Validation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Wireframing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>User Feedback</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Imagine being able to see your product come to life—before a single line of code
                                        is written. With interactive prototypes and detailed wireframes, we turn your
                                        ideas into tangible experiences, allowing you to visualise how users will engage
                                        with your product. This early-stage validation helps ensure that every feature
                                        aligns with real user needs and business objectives, reducing the risk of costly
                                        rework later on.<br/><br/>
                                        By gathering feedback directly from your target audience and rapidly iterating
                                        on designs, we fine-tune the user experience to be intuitive, effective, and
                                        aligned with expectations. This user-first approach enhances decision-making,
                                        strengthens stakeholder confidence, and ensures your final product is primed for
                                        real-world success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'BA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Business Analysis
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Monetisation Strategies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Customer Support</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Revenue Evaluation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Pricing Models</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Market Entry Plans</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Marketing Strategy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our business analysis services focus on aligning your products and services with
                                        your core business objectives to drive growth and profitability. We assess your
                                        unique requirements and goals to identify effective monetisation strategies and
                                        customer support solutions—like knowledge bases and chatbots—that enhance
                                        engagement and satisfaction. By evaluating revenue potential, we help develop
                                        pricing models designed to maximise profitability and market impact.<br/><br/>

                                        Beyond monetisation, we craft tailored market entry and marketing plans that
                                        position your product strategically for success. This comprehensive, data-driven
                                        approach ensures your business is well-equipped to thrive in competitive markets
                                        and adapt to evolving customer needs.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'TFA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Technical Feasibility Assessment
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Technical Feasibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Technology Stack</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Infrastructure Requirements</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>System Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Web Applications</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        A technical feasibility assessment helps us identify the ideal technology stack
                                        tailored to your business needs, ensuring your product is both viable and
                                        scalable for the future. Drawing on our experience with high-traffic systems, we
                                        evaluate infrastructure and growth requirements to recommend solutions that
                                        support long-term performance and reliability.<br/><br/>

                                        We also assess integration capabilities to ensure your new product works
                                        seamlessly within your existing systems. This approach minimises operational
                                        disruptions and maximises efficiency, enabling smooth data flow and cohesive
                                        business processes.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Product Roadmapping
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Product Roadmapping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>MVP Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Strategic Planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Budget Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Milestone Planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Feature Prioritisation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We understand that budgets are finite and that the scope of any collaboration
                                        must reflect your available resources. Investors and stakeholders need clarity
                                        on what’s achievable, and our role is to help you define a clear, focused
                                        product vision and development strategy. With structured milestones and
                                        transparent timelines, we ensure every step aligns with your business
                                        goals—keeping progress measurable, purposeful, and within budget.<br/><br/>

                                        To maximise impact and efficiency, we recommend prioritising features for your
                                        Minimum Viable Product (MVP) and mapping out follow-up development phases. This
                                        phased approach allows essential features to be delivered early, providing value
                                        to users and actionable feedback for improvement. Our high-level development
                                        roadmap provides the strategic clarity you need to allocate resources wisely and
                                        build a product that is both market-ready and future-proof.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'PPE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Project Planning & Estimation
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Project Planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cost Estimation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Risk Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Development Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Resource Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Timeline Management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Stay on track and within budget with our precise time and cost estimates
                                        tailored to your development goals. By clearly defining the project scope, key
                                        deliverables, and iterative phases, we help you maintain focus, reduce scope
                                        creep, and stay aligned with your strategic objectives throughout the
                                        development lifecycle.<br/><br/>

                                        We also work collaboratively to identify potential risks early and implement
                                        effective mitigation strategies. This proactive planning approach ensures that
                                        unforeseen challenges are addressed before they impact your timeline or budget.
                                        With full visibility into your development roadmap, you can manage resources
                                        with confidence and drive your project toward successful, on-time delivery.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'SHA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Stakeholder Alignment
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Stakeholder Alignment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Project Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Requirements Gathering</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Project Planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Collaboration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Product Vision</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Your internal team, end users, and stakeholders hold valuable insights that are
                                        critical to shaping a successful product. By engaging them early through
                                        workshops and interviews, we uncover their expectations, challenges, and
                                        objectives—ensuring the solution is aligned with real-world needs, not
                                        assumptions.<br/><br/>

                                        These sessions foster clarity and collaboration, allowing us to define
                                        requirements, prioritise features, and align on key outcomes. With everyone
                                        working toward the same goals, we eliminate misalignment and ensure informed
                                        decision-making at every stage of the project.<br/><br/>

                                        We document all findings in a structured format, creating a clear roadmap that
                                        guides development. This ensures transparency, supports strategic planning, and
                                        sets the foundation for a product that delivers measurable business value.
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
                    src={'/assets/disc/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Discovery process benefits */}
            <div
                className={`lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[3em] md:pb-[3em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'discovery-phase-benefit'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* .Net Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.2em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Discovery <br className={'lg:block md:block hidden'}/>Process Benefits
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Kicking off with a discovery phase isn’t just smart—it’s strategic. It sets the
                                technical foundation for your software project, helping you validate ideas, uncover
                                risks, align stakeholders, and define a clear roadmap. Here are just a few of the
                                game-changing benefits.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'reduced-risk'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/risk1.svg' : '/assets/disc/icon/risk.svg'}
                                alt={'Reduced Risk'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Reduced Risk
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The discovery phase plays a critical role in reducing project risk by uncovering
                                technical, market, and operational challenges early on. By aligning goals, validating
                                assumptions, and planning strategically, it enables informed decision-making, prevents
                                costly delays, and sets a clear path for efficient, on-budget execution.
                            </p>
                        </div>
                        <div id={'cost-saving'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/sca1.svg' : '/assets/disc/icon/sca.svg'}
                                alt={'Cost Savings'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Cost Savings
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Investing in discovery helps reduce overall development costs by clarifying
                                requirements, validating concepts early, and identifying potential roadblocks before
                                they become costly issues. This upfront alignment ensures that resources are used
                                efficiently, minimizing rework and accelerating time-to-market.
                            </p>
                        </div>
                        <div id={'improved-ux'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/test1.svg' : '/assets/disc/icon/test.svg'}
                                alt={'Improved User Experience'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Improved User Experience
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Through in-depth user research and interactive prototyping, the discovery phase ensures
                                your product is built around genuine user needs, behaviors, and expectations. This
                                strategic, user-centric approach enhances usability, boosts satisfaction, and increases
                                the likelihood of adoption and long-term business success.
                            </p>
                        </div>
                        <div id={'clear-direction-goals'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/att1.svg' : '/assets/disc/icon/att.svg'}
                                alt={'Clear Direction & Goals'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Clear Direction & Goals
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The discovery process establishes a clear product vision, strategic goals, and a defined
                                roadmap, ensuring alignment across all stakeholders. This solid foundation guides
                                decision-making, keeps development focused, and increases the likelihood of delivering a
                                successful, market-ready product.
                            </p>
                        </div>
                        <div id={'market-validation'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/fast1.svg' : '/assets/disc/icon/fast.svg'}
                                alt={'Market Validation'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Market Validation
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                By conducting thorough market research and competitor analysis, you can validate your
                                product idea early, assess demand, and identify opportunities for differentiation. This
                                helps you achieve product-market fit before investing heavily, reducing risk and
                                increasing your chances of success.
                            </p>
                        </div>
                        <div id={'accurate-estimation'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/test1.svg' : '/assets/disc/icon/test.svg'}
                                alt={'Accurate Estimation'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Accurate Estimation
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The comprehensive understanding gained during discovery allows for more accurate and
                                reliable time and budget estimates. This precision supports effective resource
                                allocation, reduces the risk of unexpected costs, and helps keep the entire development
                                process on schedule and within financial targets.
                            </p>
                        </div>
                        <div id={'informed-decision-making'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/cust1.svg' : '/assets/disc/icon/cust.svg'}
                                alt={'Informed Decision Making'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Informed Decision Making
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The insights gathered during discovery empower stakeholders to make informed,
                                data-driven decisions regarding the product’s features, design, and strategic direction.
                                This clarity ensures the development aligns with business goals and user needs,
                                increasing the likelihood of market success.
                            </p>
                        </div>
                        <div id={'team-alignment'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/risk1.svg' : '/assets/disc/icon/risk.svg'}
                                alt={'Team Alignment'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Team Alignment
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The discovery phase ensures all team members and stakeholders are aligned with a shared
                                understanding of the project’s goals, technical requirements, user needs, and potential
                                challenges. This alignment streamlines communication, reduces ambiguity, and lays the
                                groundwork for effective collaboration and successful delivery.
                            </p>
                        </div>
                        <div id={'enhanced-stakeholder-confidence'}>
                            <Image
                                src={isDayTime ? '/assets/disc/icon/sca1.svg' : '/assets/disc/icon/sca.svg'}
                                alt={'Enhanced Stakeholder Confidence'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] leading-[1.3] font-[500] mb-8'}>
                                Enhanced Stakeholder <br className={'lg:block md:block hidden'}/>Confidence
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                The discovery phase fosters trust by actively involving stakeholders from the start,
                                aligning business objectives, and encouraging transparent collaboration. This early
                                engagement creates a sense of shared ownership and accountability, boosting confidence
                                in the project’s direction and paving the way for smoother execution, informed
                                decisions, and stronger long-term outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stages of Our Discovery Process */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div className={`${isDayTime ? 'text-black' : ' text-white'}`}>
                    <div id={'process'}
                         className={`relative lg:pt-[2em] md:pt-[2em] pt-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] `}>
                        <h2 className={'border-b pb-[0.8em] capitalize border-gray-500 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                            Stages of Our<br className={'lg:block md:block hidden'}/>Discovery Process
                        </h2>

                        <div id={'stages'}
                             className={'grid lg:grid-cols-2 grid-cols-1 gap-10 lg:mt-[10em] mt-6 max-w-full mx-auto w-full h-full lg:mb-0 mb-6'}>

                            {/* Left Section */}
                            <div className={'lg:mr-28 md:mr-28 lg:mb-[9em] md:mb-[9em]'}>

                                {/* Initial Meeting */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Initial Meeting'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Initial Meeting</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        We begin with an initial meeting to understand your project goals, business
                                        objectives, and technical requirements. This session allows us to explore your
                                        vision, clarify expectations, and assess how we can deliver value from day one.
                                        It&#39;s also a chance for you to experience our process, ask questions, and
                                        align
                                        on priorities. While we always welcome face-to-face meetings to foster stronger
                                        relationships and gain deeper insights, we also offer seamless virtual sessions
                                        via MS Teams, Google Meet, or Zoom. Whichever format you prefer, our focus
                                        remains the same—laying the foundation for a successful collaboration built on
                                        clarity, trust, and shared purpose.
                                    </p>
                                </div>

                                {/* Workshops */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Workshops'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Workshops</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Next, we’ll conduct a series of structured, collaborative workshops to delve
                                        deeper into your project’s requirements, user expectations, and overall business
                                        goals. These sessions are designed to align stakeholders, clarify priorities,
                                        and uncover potential challenges or constraints early in the process. Together,
                                        we’ll map out user journeys, define core workflows, and assess any technical or
                                        operational considerations that may impact delivery. Whether hosted in person or
                                        virtually, these workshops are tailored to your organisation’s needs and focused
                                        on generating actionable insights, enabling informed decisions that shape a
                                        clear and strategic roadmap for your product.
                                    </p>
                                </div>

                                {/* Follow-up Meetings */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Follow-up Meetings'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Follow-up Meetings</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Following the workshops, we’ll hold structured follow-up meetings to present our
                                        findings, validate key assumptions, and outline actionable recommendations
                                        tailored to your business objectives. These sessions are designed to be
                                        collaborative and outcome-driven, giving you the opportunity to review our
                                        insights, provide feedback, and ensure strategic alignment before moving into
                                        execution. By addressing open questions, refining priorities, and confirming the
                                        project direction, we establish a clear, shared understanding across all
                                        stakeholders. Whether conducted in person or remotely, these meetings are
                                        focused on delivering clarity, accountability, and measurable value for your
                                        organisation.
                                    </p>
                                </div>

                                {/* Write-up & Presentation */}
                                <div className={`lg:mb-[15em] md:mb-[15em] mb-14`} id={'Write-up & Presentation'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Write-up & Presentation</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.8em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 ${isDayTime ? 'bg-black' : 'bg-white'} rounded-full`}>Workshops</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitor Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Flow Diagrams</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] lg:mb-[3em] mb-[1.5em] font-[300]'}>
                                        Finally, we’ll consolidate all insights, findings, and strategic recommendations
                                        into a detailed report and presentation that serves as a clear and actionable
                                        roadmap for your project. This comprehensive documentation will outline key
                                        milestones, timelines, budget estimates, technical recommendations, and
                                        potential risks—ensuring you have full visibility and alignment before
                                        development begins. It acts as both a reference and a blueprint, equipping you
                                        with the clarity and confidence to move forward efficiently and effectively.
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
                                                    src={`/assets/disc/stages/${imageId}.jpg`}
                                                    alt={imageId}
                                                    className="transition-transform duration-500 ease-in-out transform scale-105 hover:scale-110"
                                                    width={1030}
                                                    height={768}
                                                />
                                            </div>
                                        )
                                    ))}
                                </div>

                                {/* sticky menu */}
                                {isVisible && (
                                    <div
                                        className={`lg:fixed justify-center md:fixed bottom-0 left-0 w-full ${
                                            isDayTime ? 'bg-black text-white' : 'bg-white text-black'} py-5 z-50`}>
                                        <div
                                            className={`grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 lg:max-w-full w-full h-auto lg:px-[4.6em] mx-auto justify-center gap-0 ${
                                                isDayTime ? 'border-gray-500' : 'border-gray-500'}`}>
                                            {imageIds.map((id) => (
                                                <button
                                                    key={id}
                                                    onClick={() => {
                                                        const element = document.getElementById(id);
                                                        if (element) {
                                                            element.scrollIntoView({behavior: 'smooth'});
                                                        }
                                                    }}
                                                    className={`mt-4 ${
                                                        activeId === id
                                                            ? isDayTime
                                                                ? 'text-white hover:text-gray-500 focus:text-gray-500'
                                                                : 'text-black hover:text-gray-500 focus:text-gray-500'
                                                            : isDayTime
                                                                ? 'text-gray-500 hover:text-white focus:text-white'
                                                                : 'text-gray-500 hover:text-black focus:text-black'
                                                    }`}
                                                >
                                                    {id.replace('-', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Who is involved in the process */}
            <div className={`lg:-mt-[9em] md:-mt-[9em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
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

            {/* Discovery Process Deliverables */}
            <div className={`lg:-mt-[3.5em] md:-mt-[3.5em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.33em] md:text-[3.33em] text-[1.5em] font-[500] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Discovery Process <br className={'lg:block md:block hidden'}/>Deliverables
                            </h2>
                            <p className={'text-[0.873em] font-[400] leading-[1.5] tracking-normal text-justify'}>
                                To ensure your project’s success, we provide clear, actionable deliverables that align
                                stakeholders, streamline development, and maintain transparency—keeping your business
                                goals front and center throughout the process.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Product Requirements Document</span>
                                    {webIndex === 0 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 0 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clearly defined overview of your product’s vision, strategic goals, core
                                        features, user interface design, and key performance indicators ensures
                                        alignment across all teams and stakeholders. This shared understanding minimizes
                                        miscommunication, streamlines decision-making, and keeps the project focused on
                                        delivering tangible business outcomes.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>User Stories & Personas</span>
                                    {webIndex === 1 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 1 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A comprehensive profile of your target audience — covering demographics,
                                        behaviours, goals, and interaction patterns — enables you to design a product
                                        that resonates with real users. This insight-driven approach ensures your
                                        solution is relevant, user-centric, and positioned to deliver meaningful value
                                        and long-term engagement.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Interactive Prototypes</span>
                                    {webIndex === 2 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 2 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A visual representation of your product—featuring user flows, interactive
                                        wireframes, and high-fidelity mockups—enables you to test core functionality,
                                        validate assumptions, and gather real user feedback early. This iterative
                                        process helps refine the user experience, reduce development risks, and ensure
                                        the final product aligns with user expectations and business objectives.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Technical Architecture Diagram</span>
                                    {webIndex === 3 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 3 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A comprehensive overview of your system’s architecture—covering components such
                                        as database schema, APIs, and integration points—ensures technical alignment
                                        with your business needs. This foundational clarity supports scalability,
                                        performance, and future enhancements, reducing development friction and enabling
                                        smoother implementation.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Project Estimates & Timeline</span>
                                    {webIndex === 4 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 4 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clear breakdown of development phases, resource allocation, key milestones,
                                        and dependencies provides you with the structure needed to manage your project
                                        efficiently. This transparency enables better planning, risk mitigation, and
                                        informed decision-making throughout the development lifecycle.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Team Composition Plan</span>
                                    {webIndex === 5 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 5 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A clear and structured outline of team roles, responsibilities, and required
                                        skill sets ensures your project is staffed with the right expertise from day
                                        one. This strategic alignment enhances collaboration, reduces inefficiencies,
                                        and drives faster, more effective execution across all phases of development.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                                >
                                    <span>Risk Assessment Report</span>
                                    {webIndex === 6 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 6 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        A proactive assessment of potential project risks, supported by well-defined
                                        mitigation strategies and prioritised response plans, equips your team to manage
                                        uncertainties efficiently, reduce delays, and maintain consistent progress
                                        toward successful delivery.
                                    </p>
                                )}
                            </div>
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            FAQ&#39;s About The <br className={'lg:block md:block hidden'}/>Discovery Process
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            We&#39;re a <Link
                            href='/services/Mobile-Application-Development'
                            className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>mobile
                            app</Link> design and development company focused on delivering reliable,
                            high-performance solutions <br className={'lg:block md:block hidden'}/>that align with your
                            business
                            objectives. With a proven track record and a team you can trust, we turn your ideas <br
                            className={'lg:block md:block hidden'}/>into scalable, user-centric mobile experiences that
                            drive real
                            results.
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
                            <span>In what ways does the discovery phase help mitigate project risks?</span>
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
                                A well-executed discovery phase plays a critical role in reducing project risks by
                                uncovering potential technical, strategic, or market-related challenges early in the
                                process. This allows for the implementation of effective mitigation strategies and
                                contingency plans before significant resources are committed. By clearly defining the
                                project’s goals, scope, and requirements upfront, the discovery phase also minimises
                                ambiguity, aligns stakeholders, and ensures that the entire team operates with a shared
                                understanding—ultimately improving efficiency and increasing the likelihood of a
                                successful outcome.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What essential outcomes are delivered during the software <br
                                className={'lg:block md:block hidden'}/>discovery phase?</span>
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
                                The key deliverables from a software discovery phase typically include a comprehensive
                                solution document that outlines the product vision, objectives, and scope; a detailed
                                system requirements specification defining functional and technical needs; a risk
                                assessment and mitigation plan to address potential challenges; wireframes and
                                interactive prototypes that visualise the user experience; and a project estimation and
                                MVP development plan that breaks down timelines, costs, and feature priorities to guide
                                development effectively.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>In what ways does the discovery phase shape project <br
                                className={'lg:block md:block hidden'}/>goals and establish realistic deadlines?</span>
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
                                The discovery phase plays a vital role in establishing clear and achievable project
                                goals and deadlines by gaining a comprehensive understanding of the project’s
                                objectives, scope, and detailed requirements. Through careful analysis, this phase
                                identifies potential risks, constraints, and opportunities that could impact delivery.
                                Armed with these insights, we can develop a realistic and strategic project timeline and
                                budget that reflect both business priorities and resource capabilities. This structured
                                approach not only enhances planning accuracy but also ensures alignment among
                                stakeholders, setting the stage for efficient execution and successful project outcomes.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How important is user feedback in shaping the discovery phase?</span>
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
                                User feedback is essential during the discovery phase as it validates assumptions,
                                uncovers user expectations, and highlights potential usability issues early on. By
                                leveraging methods such as surveys, interviews, and usability testing, businesses gain
                                direct insights into real user behaviour and preferences. This data-driven approach
                                ensures the product or service is shaped around actual user needs, reducing the risk of
                                costly revisions later and increasing the likelihood of market acceptance and long-term
                                success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How does the discovery phase increase the likelihood of product success?</span>
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
                                The discovery phase significantly enhances the likelihood of product success by
                                establishing a clear understanding of project objectives, scope, and technical
                                requirements from the outset. It enables early identification of risks and
                                opportunities, allowing for a realistic and achievable timeline and budget. By
                                validating assumptions and uncovering potential issues through research and user
                                feedback, the discovery phase helps avoid costly mistakes, align stakeholders, and
                                ensure the final product is both high-quality and market-ready.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What does the discovery phase involve in software development?</span>
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
                                The discovery phase is the foundational stage of a <Link
                                href='/services/Software-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>software
                                development</Link> project where
                                research, analysis, and strategic planning come together to define the project’s vision,
                                goals, and key requirements. This phase sets the direction for the entire development
                                lifecycle by aligning stakeholders, identifying user needs, assessing technical
                                feasibility, and outlining a clear roadmap to guide successful execution.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What key activities take place during the discovery phase?</span>
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
                                During the discovery phase, the team collects and analyzes essential data to understand
                                the project’s goals, limitations, and potential opportunities. This process involves
                                conducting market research, user analysis, and technical feasibility assessments to
                                ensure the product aligns with business objectives, meets user needs, and is viable from
                                a technical standpoint.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Why is the discovery phase important?</span>
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
                                The discovery phase is essential because it clarifies the project’s goals, defines the
                                scope, and uncovers potential challenges and constraints. It ensures the project&#39;s
                                feasibility, aligns stakeholder expectations, and lays a solid foundation for informed
                                decision-making and successful execution.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are the benefits of the discovery phase?</span>
                            {onIndex === 8 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 8 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The discovery phase offers key benefits such as reduced project risks, enhanced planning
                                accuracy, and greater confidence in the project’s success. It also fosters collaboration
                                and trust between the client and development team by aligning expectations early and
                                establishing a shared understanding of objectives.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How long does the discovery phase typically last?</span>
                            {onIndex === 9 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 9 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The discovery phase typically spans from a few weeks to a few months, depending on the
                                project’s complexity, scope, and research needs. Larger or more intricate projects may
                                require more time to ensure thorough analysis, while smaller initiatives can move
                                through the phase more quickly without compromising quality.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are the deliverables of the discovery phase?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                The discovery phase deliverables typically consist of a comprehensive project vision
                                document, detailed system requirements specification, risk assessment with mitigation
                                strategies, interactive wireframes and prototypes, and a project estimation alongside an
                                MVP development plan. These outputs provide a clear foundation and roadmap for
                                successful project execution.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Can I skip the discovery phase?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] text-gray-500`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Of course, skipping the discovery phase is possible but strongly discouraged. It’s like
                                building a house without consulting an architect—this vital step ensures clarity on
                                goals and scope, uncovers potential challenges, and sets a solid foundation. Without it,
                                projects risk misalignment, unforeseen obstacles, and ultimately, failure.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default DiscoveryPhase;