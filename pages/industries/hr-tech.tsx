import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import '../../app/globals.css';


// Testimonial data
const testimonials = [
    {
        name: "Isabel Martínez",
        title: "UX Lead, TaskFlow Inc.",
        message: (
            <>
                Grey InfoTech delivered a clean, modern web design that perfectly aligns with our brand and enhances
                user experience. Their design team was creative, attentive, and always open to feedback. Our product now
                looks as polished as it performs.
            </>
        ),
    },
    {
        name: "Sofia Nieminen",
        title: "Director of Digital Experience, PayCore Solutions",
        message: (
            <>
                Grey InfoTech completely reimagined our website with a sleek, user-centric design that reinforces our
                credibility in the fintech space. The process was collaborative and efficient, and the end result is
                something we’re truly proud to show clients and partners.
            </>
        )
    },
    {
        name: "Jonathan Lee",
        title: "VP of Product, PropEdge Technologies",
        message: (
            <>
                We came to Grey InfoTech with a cluttered and outdated interface. They gave our platform a fresh,
                intuitive design that not only looks great but also improved engagement and usability. Their work speaks
                for itself — sharp, professional, and conversion-focused.
            </>
        )
    }
];

const HrTech = () => {
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
            "CW",
            "CHRP",
            "HRAR",
            "AWP",
            "ERT",
            "TA",
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
    useEffect(() => {
        const imageIds: string[] = [
            "The Digital Phase",
            "Dedicated FinTech Engineers",
            "Security & Regulatory Compliance",
            "DevOps",
            "Quality Assurance",
            "Product Development",
        ];

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
                 className={`relative max-w-full w-full pb-[6em] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                     isDayTime ? 'text-black' : 'text-white'
                 }`}>
                <h1
                    className={`border-b pb-[0.3em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] sm:text-[2em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[1em] leading-[1.1] font-[600]`}>
                    HR Software <br className={'lg:block md:block hidden'}/>Development Services
                </h1>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                    <div className={'lg:-mr-[4em] md:-mr-[4em] lg:mt-[2em] md:mt-[2em]'}>
                        <p className={'text-[0.87em] font-[300]'}>
                            We develop tailored HR software that streamlines operations, enhances efficiency, and
                            supports better workforce management at scale.
                        </p>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-3 md:grid-cols-3 gap-8 lg:block md:block sm:hidden lg:ml-[8em] md:ml-[8em]'}>
                        <div className={'border-r-2 border-gray-500 '}>
                            <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                            <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                        </div>
                        <div className={'border-r-2 border-gray-500 '}>
                            <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                            <p className={'text-[0.7em] font-[300]'}>Team Members </p>
                        </div>
                        <div className={''}>
                            <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>123+</h6>
                            <p className={'text-[0.7em] font-[300]'}>Products Launched </p>
                        </div>
                    </div>

                </div>

                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/hr/hero.jpg'}
                        alt={'HR Tech'}
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
                            Revolutionize HR tech <br className={'lg:block md:block hidden'}/>integration effortlessly
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Empowering your <br className={'lg:block md:block hidden'}/>HR Tech Journey Forward
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    In today’s competitive business landscape, the seamless integration of Human
                                    Resources (HR) technology into corporate careers websites is a strategic imperative.
                                    Our HR Technology Solutions are designed to help organisations attract, engage, and
                                    retain top talent by embedding smart, scalable, and secure HR functionalities
                                    directly into their digital platforms. By optimising the candidate journey and
                                    streamlining internal HR operations, we enable businesses to deliver a cohesive and
                                    engaging experience that reflects their brand and values.
                                </p>
                            </div>
                            <div>
                                <p>
                                    We take a strategic, user-centric approach—aligning technology with your business
                                    goals to ensure your HR tools are not only functional but also intuitive and
                                    future-ready. Whether it’s implementing applicant tracking systems, onboarding
                                    solutions, or employee self-service portals, we focus on improving efficiency,
                                    enhancing data visibility, and reducing administrative burden. The result is a more
                                    agile HR operation that supports sustainable growth and elevates the employee
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HR Technology & Marketing Services */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'hr-technology-marketing-services'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.2em] md:text-[3.2em] text-[1.5em] font-[500] justify-center tracking-tight  leading-[1.1]`}>
                                HR Technology &<br className={'lg:block md:block hidden'}/>Marketing Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                We deliver end-to-end solutions that seamlessly integrate human resources functionality
                                into your corporate website—covering everything from employee onboarding and performance
                                tracking to benefits management, payroll systems, employee profiles, and beyond.
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
                                Our Services
                            </h3>
                            <ul className={`list-disc constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Careers Websites", target: "CW"},
                                    {id: "02", title: "Customisable HR Portals", target: "CHRP"},
                                    {id: "03", title: "HR Analytics & Reporting", target: "HRAR"},
                                    {id: "04", title: "Automated Workflows & Processes", target: "AWP"},
                                    {id: "05", title: "Engagement & Recruiting Tools", target: "ERT"},
                                    {id: "06", title: "Talent Acquisition", target: "TA"},
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
                                     id={'CW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Careers Websites
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Careers Website</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>candidate Attraction</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Online Hiring Strategy</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Recruitment Success</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Your careers website is a vital component of your talent acquisition strategy,
                                        serving as a key touchpoint for prospective candidates—statistics show that
                                        nearly every successful hire will visit your site at least once. At Grey
                                        InfoTech, we focus on creating recruitment websites that are professionally
                                        designed, fully optimised for speed, accessibility, and mobile responsiveness,
                                        ensuring a seamless user experience across all devices. By aligning design,
                                        content, and functionality with your employer brand and hiring objectives, we
                                        help you attract, engage, and convert top talent more effectively.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CHRP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Customisable HR Portal
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Branded HR Portals</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Training and Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>HR Technology</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Workforce Engagement</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Tailored to reflect your brand’s identity and culture, our custom HR portals
                                        provide a centralised, user-friendly hub where employees can efficiently access
                                        and manage essential HR functions such as benefits administration, training
                                        resources, performance evaluations, leave management, and internal
                                        communications. This seamless integration not only improves employee engagement
                                        and productivity but also reinforces consistency across your digital workplace
                                        experience.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'HRAR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        HR Analytics & Reporting
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-Driven Insights</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>HR Analytics</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Metrics</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Leverage data-driven insights to drive smarter, more strategic HR
                                        decision-making across your organisation. Our solutions provide robust analytics
                                        and fully customisable reporting tools, enabling you to track and analyse
                                        critical HR metrics such as employee performance, engagement levels, retention
                                        trends, recruitment efficiency, and workforce productivity. By turning data into
                                        actionable intelligence, we help you identify areas for improvement, optimise
                                        resource allocation, and align your HR initiatives with broader business goals
                                        for long-term success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'AWP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Automated Workflows & Processes
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>HR Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Onboarding Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Increased Accuracy</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Streamline your HR operations through intelligent automation that enhances
                                        efficiency across the entire employee lifecycle. From onboarding and compliance
                                        management to performance reviews and offboarding, our technology simplifies
                                        complex processes, eliminates repetitive manual tasks, and ensures greater
                                        accuracy and consistency. This not only reduces administrative overhead but also
                                        frees up your HR team to focus on strategic initiatives that drive employee
                                        satisfaction and organisational growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ERT'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Engagement & Recruiting Tools
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Talent Acquisition</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Talent Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Applicant Tracking Systems</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        From advanced applicant tracking systems that simplify and accelerate the
                                        recruitment process to employee engagement platforms that foster a connected and
                                        motivated workplace culture, our HR technology solutions are designed to enhance
                                        every stage of the employee journey. These tools not only improve hiring
                                        efficiency and candidate experience but also support ongoing engagement,
                                        retention, and performance across your organisation.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'TA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Talent Acquisition
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Recruitment Strategies</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Dynamic Work Environment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cutting-Edge Recruitment Tools</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Talent acquisition is a strategic function focused not only on sourcing
                                        qualified candidates but on identifying individuals whose capabilities, values,
                                        and ambitions align with your organisation’s vision and culture. At Grey
                                        InfoTech, we develop and execute tailored recruitment strategies that combine
                                        industry expertise, technology-driven sourcing tools, and data insights to
                                        attract top-tier professionals. Our approach ensures you secure talent that
                                        contributes to long-term business success, supports innovation, and drives
                                        meaningful growth in competitive and evolving markets.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Carousel image */}
            <div className={`carousel py-[4em] lg:mt-[-35em] md:mt-[-35em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div className={'track'}>
                    {[...Array(2)].map(() => (
                        <>
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/broadbean1.svg' : '/assets/hr/broadbean.svg'}`}
                                alt={'Broadbean'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/bullhorn1.svg' : '/assets/hr/bullhorn.svg'}`}
                                alt={'Bullhorn'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/glassdoor1.svg' : '/assets/hr/glassdoor.svg'}`}
                                alt={'Glassdoor'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/google1.svg' : '/assets/hr/google.svg'}`}
                                alt={'Google'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/hubspot1.svg' : '/assets/hr/hubspot.svg'}`}
                                alt={'Hubspot'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/indeed1.svg' : '/assets/hr/indeed.svg'}`}
                                alt={'Indeed'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/jobadder1.svg' : '/assets/hr/jobadder.svg'}`}
                                alt={'JobAdder'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/jobberman1.svg' : '/assets/hr/jobberman.svg'}`}
                                alt={'JobberMan'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/salesforce1.svg' : '/assets/hr/salesforce.svg'}`}
                                alt={'Salesforce'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/workday1.svg' : '/assets/hr/workday.svg'}`}
                                alt={'Workday'}
                                width={50}
                                height={50}
                            />
                            <Image
                                className={'image'}
                                src={`${isDayTime ? '/assets/hr/workforce1.svg' : '/assets/hr/workforce.svg'}`}
                                alt={'Workforce'}
                                width={50}
                                height={50}
                            />
                        </>
                    ))}
                </div>
            </div>

            {/* first image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/hr/first.jpg'}
                    alt={'meal app'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* What Grey InfoTech Does */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h3 className='lg:text-[3.3em] md:text-[3.3em] text-[1.8em] font-[500] tracking-tight lg:mb-[0.7em] md:mb-[0.7em] leading-[1.1] pb-6'>
                            What Grey <br className={'lg:block md:block hidden'}/>Infotech Does
                        </h3>
                    </div>
                    <div className='lg:-ml-[8em] md:-ml-[8em]'>
                        <div
                            className=' mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <p>
                                In today’s digital and fast-paced business environment, seamless integration of HR
                                technology into your corporate website is critical to improving operational efficiency
                                and employee engagement. At Grey InfoTech, we offer tailored HR Technology Solutions
                                that go beyond functionality—they are strategically designed to align with your business
                                goals. By embedding core HR capabilities such as onboarding, performance tracking,
                                analytics, and self-service portals into your careers or corporate site, we help you
                                create a unified and intuitive experience for both employees and HR teams. The result is
                                a streamlined, data-driven HR operation that supports talent retention, enhances
                                productivity, and scales with your organisation. Let’s partner to elevate your HR
                                infrastructure and empower your workforce through smart, integrated solutions.

                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto lg:-mt-[3em] md:-mt-[3em]'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/hr/mid.jpg'}
                    alt={'office'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Recruitment SEO */}
            <div className={`border-b ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={`lg:mt-[4em] md:mt-[4em] lg:-mr-[5.4em] md:-mr-[5.4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] pb-8 md:text-[3.2em] lg:text-[3.2em] w-auto h-auto '>
                                Recruitment SEO
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify lg:-mt-[0.5em] leading-[1.5] lg:mr-[2em]'>
                                At Grey InfoTech, we prioritise search engine visibility from the outset by embedding
                                SEO best practices and ensuring full compliance with Google for Jobs standards. Every
                                project includes robust, scalable hosting and proactive technical support to resolve
                                issues quickly and efficiently. In addition, our performance tracking delivers regular,
                                detailed reports on traffic, user behaviour, and technical health—giving you the
                                insights needed to make informed, data-driven decisions that drive continual
                                improvement.<br/><br/>

                                Our approach to HR website development is strategic and comprehensive, aligning
                                technology with your business objectives. We create high-performing, user-centric
                                platforms that are optimised for discoverability, functionality, and future scalability.
                                From seamless integrations to intuitive design, we ensure your careers site not only
                                reflects your brand but also enhances recruitment outcomes and supports long-term
                                organisational growth.
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

            {/* Why Choose Us? */}
            <div className={` lg:pt-[2em]  ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'why-choose-us'}
                     className={`relative lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[6em] md:pb-[6em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Why choose us/ */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[3.2em] lg:text-[3.1em] font-[550] tracking-tight leading-[1.15] lg:pb-6'>
                                Why Choose Us?
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                Partnering with Grey InfoTech means choosing a proven leader in HR technology. With over
                                a decade of experience, we deliver smart, efficient solutions that integrate seamlessly
                                into your careers website—enhancing employee engagement, streamlining HR processes, and
                                supporting business growth.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div id={'expertise'}>
                            <Image
                                src={isDayTime ? '/assets/hr/icon/wap1.svg' : '/assets/hr/icon/wap.svg'}
                                alt={'Business-Oriented Development'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Expertise in HR Tech
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                With years of experience in HR technology, our team brings a comprehensive understanding
                                of human resource processes, compliance standards, and workforce dynamics. We stay at
                                the forefront of industry advancements, leveraging emerging technologies to design and
                                implement solutions that streamline HR operations, improve employee experiences, and
                                support strategic business goals.
                            </p>
                        </div>
                        <div id={'customisation'}>
                            <Image
                                src={isDayTime ? '/assets/hr/icon/tap1.svg' : '/assets/hr/icon/tap.svg'}
                                alt={'Customisation and Flexibility'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Customisation and Flexibility
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We believe in delivering solutions tailored to your specific business needs, ensuring
                                every service we provide is adaptable, scalable, and aligned with your corporate
                                environment. Our approach prioritises flexibility and strategic alignment, allowing us
                                to create value-driven HR technology solutions that evolve with your organisation’s
                                goals and workforce requirements.
                            </p>
                        </div>
                        <div id={'user-centric'}>
                            <Image
                                src={isDayTime ? '/assets/hr/icon/sc1.svg' : '/assets/hr/icon/sc.svg'}
                                alt={'User-centric Design'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                User-centric Design
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Our emphasis on user experience ensures that both employees and HR managers benefit from
                                intuitive, efficient, and accessible solutions. By designing with usability in mind, we
                                help streamline daily HR tasks, improve engagement, and enhance overall productivity
                                across your organisation.
                            </p>
                        </div>
                        <div id={'continuous-support-development'}>
                            <Image
                                src={isDayTime ? '/assets/hr/icon/sf1.svg' : '/assets/hr/icon/sf.svg'}
                                alt={'Continuous support and development'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] leading-[1.1] text-[1.3em] font-[500] mb-8'}>
                                Continuous Support <br className={'lg:block md:block hidden'}/>and Development
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We are committed to continuous improvement, providing ongoing support, regular updates,
                                and enhancements to ensure your HR technology remains secure, scalable, and aligned with
                                evolving business needs and industry standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* mid half Image*/}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em]  mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                    <div className={'relative grid lg:grid-cols-3 h-auto md:grid-cols-3 grid-cols-1 gap-6'}>
                        <div className={'h-auto w-full max-w-full lg:mt-[1.2em] md:mt-[1.2em]'}>
                            <Image
                                src={'/assets/hr/1.jpg'}
                                alt={'app'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'h-auto w-full max-w-full'}>
                            <Image
                                src={'/assets/hr/2.jpg'}
                                alt={'hand'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                        <div className={'h-auto w-full max-w-full lg:mt-[8em] md:mt-[8em]'}>
                            <Image
                                src={'/assets/hr/3.jpg'}
                                alt={'hand'}
                                width={1396}
                                height={1440}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced integration with leading HR technologies */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] md:pb-[6em] pb-[3em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.2]`}>
                            Advanced Integration <br className={'lg:block md:block hidden'}/>with Leading <br
                            className={'lg:block md:block hidden'}/>HR Technologies
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            Our HR Technology Solutions seamlessly integrate with leading HR platforms to boost your
                            corporate website’s functionality and efficiency. We specialize in back-end development, API
                            integration, database management, and consulting services. Let’s make it happen.
                        </p>
                    </div>
                </div>

                {/* Bullhorn */}
                <div id={'bullhorn'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Bullhorn
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/bullhorn1.svg' : '/assets/hr/bullhorn.svg'}`}
                                alt='Bullhorn'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Bullhorn is a cloud-based CRM and operations platform tailored for the staffing industry,
                            offering streamlined recruitment management. Our integration with Bullhorn enables efficient
                            handling of the entire recruitment lifecycle—from candidate sourcing and tracking to
                            placement—seamlessly embedding its powerful features into your HR system. This integration
                            enhances your staffing operations by improving workflow automation, candidate engagement,
                            and data accuracy, ultimately boosting recruitment efficiency and outcomes.
                        </p>
                    </div>
                </div>

                {/* Broadbean */}
                <div id={'broadbean'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Broadbean
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/broadbean1.svg' : '/assets/hr/broadbean.svg'}`}
                                alt='Broadbean'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Broadbean is a robust platform designed for distributing job postings and sourcing
                            candidates across diverse channels. By integrating Broadbean with your HR system, you
                            streamline the process of publishing vacancies, ensuring broad reach to targeted talent
                            pools. This integration also enables comprehensive tracking and analysis of each recruitment
                            channel’s performance, allowing you to optimise your hiring strategy for maximum efficiency
                            and impact.
                        </p>
                    </div>
                </div>

                {/* HubSpot */}
                <div id={'hubspot'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            HubSpot
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/hubspot1.svg' : '/assets/hr/hubspot.svg'}`}
                                alt='HubSpot'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            HubSpot, widely recognized for its inbound marketing, sales, and service platforms, plays a
                            valuable role in HR management as well. Our integration with HubSpot enables streamlined
                            management of employee and candidate engagement by leveraging automated email campaigns,
                            personalized communication workflows, and in-depth analytics on candidate behavior. These
                            capabilities empower your HR teams to enhance recruitment outreach, improve candidate
                            nurturing, and make data-driven decisions that optimize overall talent acquisition and
                            retention strategies.
                        </p>
                    </div>
                </div>

                {/* Salesforce */}
                <div id={'salesforce'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Salesforce
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/salesforce1.svg' : '/assets/hr/salesforce.svg'}`}
                                alt='Salesforce'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Salesforce, best known for its customer relationship management (CRM) capabilities, also
                            provides powerful features that support HR functions. By integrating Salesforce with your HR
                            system, you can streamline employee data management, improve internal communication
                            workflows, and leverage advanced analytics to gain deeper insights into workforce
                            performance. This integration facilitates more informed, data-driven HR decisions, enhances
                            employee engagement, and drives operational efficiency across your organisation.
                        </p>
                    </div>
                </div>

                {/* Job Adder */}
                <div id={'jobadder'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Job Adder
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/jobadder1.svg' : '/assets/hr/jobadder.svg'}`}
                                alt='Job Adder'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Job Adder is a user-friendly, comprehensive recruitment platform designed to simplify hiring
                            workflows. Integrating Job Adder streamlines applicant tracking, job order management, and
                            candidate relationship maintenance, automating key recruitment tasks. This integration
                            enhances efficiency, reduces administrative burdens, and ensures a smoother, more effective
                            hiring process aligned with your business goals.
                        </p>
                    </div>
                </div>

                {/* Google */}
                <div id={'google'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Google for Jobs
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/google1.svg' : '/assets/hr/google.svg'}`}
                                alt='Google'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Google for Jobs is an integrated job search feature within Google Search that significantly
                            enhances job visibility. Our solutions optimise your job listings to comply with Google for
                            Jobs standards, ensuring your vacancies are prominently displayed to relevant candidates.
                            This increased visibility drives higher quality applicant traffic, helping you attract top
                            talent efficiently and effectively.
                        </p>
                    </div>
                </div>

                {/* Workday */}
                <div id={'workday'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Workday ATS
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/workday1.svg' : '/assets/hr/workday.svg'}`}
                                alt='Workday ATS'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Workday Applicant Tracking System (ATS), a component of Workday’s comprehensive human
                            capital management suite, offers seamless applicant tracking, job posting management, and
                            recruitment data analysis. Integrating Workday ATS streamlines your hiring process, ensuring
                            efficiency and cohesion from initial job posting through to candidate selection and
                            onboarding, thereby enhancing overall recruitment effectiveness.
                        </p>
                    </div>
                </div>

                {/* Indeed */}
                <div id={'indeed'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Indeed
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/indeed1.svg' : '/assets/hr/indeed.svg'}`}
                                alt='Indeed'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Indeed is a leading global employment search engine that aggregates job listings from
                            numerous sources. Integrating Indeed into your HR system significantly broadens the reach of
                            your job postings, connecting you with a worldwide talent pool. This integration leverages
                            advanced search capabilities for both employers and candidates, enhancing your recruitment
                            efforts by attracting diverse and qualified applicants efficiently.
                        </p>
                    </div>
                </div>

                {/* Glassdoor */}
                <div id={'glassdoor'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Glassdoor
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/glassdoor1.svg' : '/assets/hr/glassdoor.svg'}`}
                                alt='GLassdoor'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Glassdoor is a premier global platform that provides company reviews, salary insights, and
                            job listings from employees and employers worldwide. Integrating Glassdoor into your HR and
                            recruitment strategy amplifies your employer brand by showcasing authentic workplace
                            experiences and transparent compensation data. This integration helps attract top talent by
                            building trust and engagement, while empowering candidates to make informed career
                            decisions, ultimately enhancing the quality and diversity of your applicant pool.
                        </p>
                    </div>
                </div>

                {/* Jobberman */}
                <div id={'jobberman'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Jobberman
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[1em] md:-mt-[1em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/jobberman1.svg' : '/assets/hr/jobberman.svg'}`}
                                alt='Jobberman'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Jobberman is a leading job portal in West Africa, connecting employers with a vast network
                            of qualified candidates across multiple industries. Integrating Jobberman into your
                            recruitment process expands your reach within the regional talent market, enabling you to
                            attract skilled professionals efficiently. This integration leverages Jobberman’s targeted
                            job matching and extensive database to streamline hiring, improve candidate quality, and
                            accelerate your recruitment outcomes.
                        </p>
                    </div>
                </div>

                {/* Workforce */}
                <div id={'workforce'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className=' text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Workforce
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[14em] md:pl-[12em] lg:-mt-[3em] md:-mt-[3em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src={`${isDayTime ? '/assets/hr/workforce1.svg' : '/assets/hr/workforce.svg'}`}
                                alt='Workforce'
                                height={250}
                                width={300}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Workforce is a comprehensive human capital management platform that streamlines recruitment,
                            employee management, and payroll processes. Integrating Workforce into your HR operations
                            enhances efficiency by automating key workflows and providing real-time insights into your
                            talent pool. This integration supports better workforce planning and engagement, helping you
                            attract, retain, and develop skilled employees while driving overall organizational
                            productivity.
                        </p>
                    </div>
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

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[10em] md:pb-[10em] pb-[2em] lg:mb-[10em] md:mb-[10em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>HR Tech Questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            These FAQs address key topics around HR technology and solutions, offering insights <br
                            className={'lg:block md:block hidden'}/>into
                            their importance, functionality, and impact on today’s business operations.
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
                            <span>What is HR technology?</span>
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
                                HR technology encompasses the software and hardware solutions designed to automate and
                                optimize human resources functions within an organization. These technologies cover a
                                broad spectrum of HR activities, including recruitment, payroll processing, performance
                                management, employee data administration, and compliance tracking. By leveraging HR
                                technology, businesses can enhance operational efficiency, improve data accuracy, and
                                streamline workflows, ultimately driving better workforce management and strategic
                                decision-making.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How can HR technology improve employee engagement?</span>
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
                                HR technology enhances employee engagement by delivering robust tools for seamless
                                communication, continuous feedback, and meaningful recognition. Additionally, it
                                optimizes key HR processes such as onboarding, training, and benefits administration,
                                making them more efficient, accessible, and user-centric—ultimately driving productivity
                                and workforce satisfaction.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What are the benefits of integrating HR technology into a corporate website?</span>
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
                                Integrating HR technology into a corporate website delivers multiple advantages,
                                including streamlined recruitment workflows, enhanced employee self-service options, and
                                real-time access to essential HR services. It also strengthens data management and
                                security while ensuring a consistent and seamless employee experience across all digital
                                touchpoints.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does HR technology assist in the recruitment process?</span>
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
                                HR technology greatly improves the recruitment process by automating critical tasks such
                                as job posting, applicant tracking, candidate screening, and communication management.
                                Furthermore, it offers advanced analytics and reporting capabilities, enabling
                                organizations to measure recruitment effectiveness and optimize sourcing strategies.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What should be considered when choosing an HR technology solution?</span>
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
                                When selecting an HR technology solution, organizations must carefully assess several
                                critical factors to ensure alignment with their strategic goals. Key considerations
                                include a thorough understanding of the specific HR challenges and requirements unique
                                to the business, as well as the solution’s ease of use and intuitive user interface to
                                drive adoption. Equally important is the technology’s ability to seamlessly integrate
                                with existing systems and workflows, ensuring operational continuity. Scalability and
                                flexibility are essential to accommodate future growth and evolving business needs.
                                Additionally, robust security protocols and compliance features are vital to protect
                                sensitive employee data and meet regulatory standards. Finally, dependable vendor
                                support and service are crucial for ongoing maintenance, troubleshooting, and maximizing
                                the return on investment.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Can HR technology help in compliance and regulatory requirements?</span>
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
                                HR technology plays a crucial role in supporting compliance and regulatory adherence by
                                automating record-keeping processes, maintaining data accuracy, and delivering timely
                                notifications of legal and regulatory updates. This automation enables organizations to
                                efficiently manage labor law requirements and other regulatory obligations, reducing
                                risk and ensuring consistent compliance across all HR functions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How does HR technology impact data security?</span>
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
                                HR technology solutions are typically equipped with advanced security features designed
                                to safeguard sensitive employee information. These include data encryption, secure
                                storage protocols, role-based access controls, and routine security audits. Such
                                measures are essential for protecting confidential HR data, ensuring regulatory
                                compliance, and maintaining employee trust in digital systems.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is HR technology suitable for small businesses?</span>
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
                                Absolutely—HR technology solutions are designed to serve businesses of all sizes,
                                including small and growing enterprises. Many platforms offer scalable features and
                                flexible pricing models, allowing organizations to tailor functionality to their
                                specific operational needs and budget constraints. This ensures that even smaller
                                companies can leverage modern HR tools to drive efficiency and support growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is the future of HR technology?</span>
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
                                The future of HR technology is poised to be shaped by greater integration of artificial
                                intelligence, machine learning, and automation—enabling more intelligent, efficient, and
                                predictive HR processes. Emerging trends also include the rise of employee experience
                                platforms that personalize interactions, the use of advanced analytics to drive
                                data-informed decision-making, and enhanced mobile accessibility to support a flexible,
                                on-the-go workforce. These innovations will continue to transform how organizations
                                attract, engage, and retain talent in an increasingly digital workplace.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How does HR technology facilitate remote work?</span>
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
                                HR technology plays a vital role in enabling and supporting remote work by offering
                                digital tools for virtual recruitment, online training, remote onboarding, performance
                                management, and employee engagement—all accessible from any location. These capabilities
                                help organizations maintain productivity, foster collaboration, and ensure a cohesive
                                employee experience across geographically distributed teams.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default HrTech;