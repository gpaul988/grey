import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";
import {AnimatePresence, motion} from "framer-motion";


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

// Reasons
const reasons = [
    {
        id: 1,
        title: 'Business-Oriented Development',
        description: (
            <>
                At Grey InfoTech, our approach to JavaScript development is rooted in a deep understanding of your
                organisation’s strategic goals. We don’t just build applications — we engineer scalable, maintainable
                solutions that align with your long-term vision and deliver measurable business outcomes. By leveraging
                modern JavaScript frameworks, adhering to best practices, and focusing on seamless integration, we
                ensure that every application we develop is efficient, future-proof, and capable of delivering a strong
                return on investment. From planning to deployment, our process is designed to minimise risks, optimise
                performance, and accelerate time to value.
            </>
        ),
    },
    {
        id: 2,
        title: 'Dedicated Project Manager',
        description: (
            <>
                Every JavaScript project at Grey InfoTech is assigned a dedicated project manager who ensures clear
                communication, efficient coordination, and full alignment with your business objectives. Acting as your
                single point of contact, they oversee the entire development lifecycle—keeping you updated on progress
                while shielding you from day-to-day technical complexities. Our goal is to involve you meaningfully in
                strategic decisions without burdening you with operational minutiae, ensuring a smooth, transparent, and
                collaborative development process from start to finish.
            </>
        ),
    },
    {
        id: 3,
        title: 'Robust Toolset & Innovation',
        description: (
            <>
                Within the fast-evolving JavaScript ecosystem, Grey InfoTech harnesses a wide array of modern libraries,
                frameworks, and development tools—including React, Vue, Angular, and Node.js. These technologies
                accelerate development timelines, support scalable architectures, and enrich product functionality. By
                adopting the most effective tools for each project, we ensure that your digital solution remains
                technologically advanced, highly performant, and fully aligned with evolving market demands.
            </>
        ),
    },
    {
        id: 4,
        title: 'Seamless Communication',
        description: (
            <>
                At Grey InfoTech, communication is at the core of our development process. We foster a transparent and
                collaborative environment where client feedback is prioritised and integrated at every stage. With
                real-time visibility into project progress through our dedicated communication tools, you remain
                informed, involved, and confident in the direction of your solution.
            </>
        ),
    },
    {
        id: 5,
        title: 'Data Security & Confidentiality',
        description: (
            <>
                At Grey InfoTech, safeguarding your JavaScript application and business data is a top priority. We
                implement strict data security and confidentiality measures, beginning with a Non-Disclosure Agreement
                (NDA) to ensure your intellectual property remains protected. Throughout the development process, we
                maintain secure communication channels and enforce best practices in data handling, guaranteeing that
                all project details remain confidential and secure.
            </>
        ),
    },
    {
        id: 6,
        title: (
            <>
                Proactive Risk Assessment <br className={'lg:block md:block hidden'}/>& Rigorous Testing
            </>
        ),
        description: (
            <>
                Delivering a secure and high-performing JavaScript solution is a core priority at Grey InfoTech. We
                conduct proactive risk assessments to identify potential development challenges early and perform
                rigorous testing to ensure reliability and functionality before launch. Our processes align with ISO
                27001 standards for information security management, ensuring your application meets the highest
                benchmarks for data protection and operational excellence.
            </>
        ),
    },
    {
        id: 7,
        title: 'Dedicated Team',
        description: (
            <>
                Grey InfoTech is your trusted digital partner, offering skilled JavaScript engineers who seamlessly
                integrate with your in-house team. Acting as a dedicated extension of your workforce, our developers
                operate under your direction while upholding the highest standards of communication, collaboration, and
                transparency—ensuring efficient delivery of high-quality, business-aligned software solutions.
            </>
        ),
    },
];


const Javascript = () => {
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
            "JSWD",
            "JSAD",
            "CJSD",
            "FED",
            "AIS",
            "JSLM",
            "JSMS",
            "JSCS",
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
                    src="/assets/java/hero.webm"
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
                            JavaScript <br className={'lg:block md:block hidden'}/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Grey InfoTech is a JavaScript development agency based in Port Harcourt, Nigeria,
                                delivering dynamic and scalable web solutions for businesses of all sizes.
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
                            Proven JavaScript Expertise
                        </h6>
                    </div>
                    <div
                        className='lg:-ml-[25em] md:-ml-[16em] md:pl-[6em] mx-auto w-auto sm:break-words sm:whitespace-normal'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            What is JavaScript?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    JavaScript is a foundational technology in modern web development, trusted by
                                    businesses across sectors including fintech, healthcare, real estate, and
                                    e-commerce. Its versatility enables the creation of highly interactive, user-centric
                                    experiences through features such as dynamic content rendering, real-time form
                                    validation, animations, and seamless multimedia integration. As a client-side
                                    scripting language, JavaScript enhances user engagement and responsiveness,
                                    contributing to faster, more intuitive digital interactions that support business
                                    goals such as user retention, conversion, and operational efficiency.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Beyond the front end, JavaScript powers full-stack development through frameworks
                                    like Node.js, React, and Next.js, enabling organizations to build end-to-end
                                    applications using a unified codebase. This not only streamlines development
                                    workflows but also reduces time-to-market and maintenance overhead. With broad
                                    browser compatibility, a vast ecosystem of libraries, and strong community support,
                                    JavaScript remains a strategic choice for building scalable, high-performance web
                                    applications that adapt to evolving business and user demands.
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
                                src={'/assets/java/1.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/java/2.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/java/3.jpg'}
                                alt={'calender'}
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className={'mx-auto'}>
                            <Image
                                src={'/assets/java/4.jpg'}
                                alt={'Restaurant'}
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Our JavaScript development Services */}
            <div className={`lg:pt-[2em] md:pt-[2em] pt-[0.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'vuejs-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[2em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div>
                            <h2 className={`lg:text-[3.3em] md:text-[2.5em] sm:text-[2em] text-[2em] font-[500] justify-center tracking-tight leading-[1.1]`}>
                                Our JavaScript <br className={'lg:block md:block sm:hidden'}/>Development <br
                                className={'lg:block md:block sm:hidden'}/>Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] md:-ml-[3.5em] tracking-noromal'>
                                Got a software product idea? Let Grey InfoTech bring it to life with JavaScript—one of
                                the most powerful and in-demand programming languages today. You’ve likely heard of it,
                                but do you know what it can really do? Explore our JavaScript development services to
                                see why it’s the smart choice for your web app—and why we’re the right partner to build
                                it.<br/><br/>

                                As a dedicated JavaScript development company, we offer end-to-end services including
                                front-end and back-end development, API integration, database solutions, and expert
                                consulting. Let’s build something exceptional together.
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
                                    {id: "01", title: "JavaScript Web Development", target: "JSWD"},
                                    {id: "02", title: "JavaScript App Development", target: "JSAD"},
                                    {id: "03", title: "Custom JavaScript Development", target: "CJSD"},
                                    {
                                        id: "04",
                                        title: (
                                            <>
                                                Front-end Development
                                            </>
                                        ),
                                        target: "FED"
                                    },
                                    {id: "05", title: "API Integration Services", target: "AIS"},
                                    {id: "06", title: "JavaScript Legacy Migration", target: "JSLM"},
                                    {id: "07", title: "JavaSCript Maintenance & Services", target: "JSMS"},
                                    {id: "08", title: "JavaScript Consulting Services", target: "JSCS"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[4em] lg:mb-[14em] md:mb-[23em]'}>
                            <div
                                className="grid lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 md:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'JSWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        JavaScript Web Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Interactive Websites</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Responsive Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Seamless User Journey</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Web Interaction</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we build modern websites that go beyond static content to
                                        deliver dynamic, user-centric digital experiences. Utilizing the power of
                                        JavaScript, we develop responsive designs, enhance interactivity, and ensure
                                        seamless functionality across all devices. From sleek marketing sites to complex
                                        web applications, our solutions are built for performance, scalability, and
                                        engagement—turning your web presence into a strategic asset that drives
                                        measurable business results.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'JSAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        JavaScript App Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Cross Platform Apps</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>React Native</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Consistent Performance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        In today’s fast-paced digital environment, JavaScript app development plays a
                                        central role in delivering cross-platform solutions with speed and efficiency.
                                        By leveraging powerful frameworks like Electron for desktop and <Link
                                        href='/services/React-Native-Development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>React
                                        Native</Link> for mobile, our developers at Grey InfoTech create applications
                                        that run seamlessly across multiple platforms from a single codebase. This
                                        streamlined approach accelerates development timelines, reduces costs, and
                                        ensures consistent performance and user experience across devices—empowering
                                        businesses to reach wider audiences without compromising on quality or
                                        functionality.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'CJSD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom JavaScript Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Bespoke Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Unique User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Business-focused Development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our custom JavaScript development services are focused on delivering tailored
                                        digital solutions that align precisely with your business objectives. Rather
                                        than relying on off-the-shelf software, we leverage JavaScript to build <Link
                                        href='/services/Software-Development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>bespoke
                                        applications</Link> that address your unique requirements—whether that means
                                        implementing specialized features, integrating with specific systems, or
                                        creating distinct user experiences. This personalized approach ensures your
                                        software is not only functional but strategically aligned, providing a seamless
                                        fit that drives efficiency, innovation, and competitive advantage.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'FED'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Front-end Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Speed Optimisation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Responsive Design</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, our front-end development team leverages modern JavaScript
                                        frameworks—such as <Link href='/services/Reactjs-Development'
                                                                 className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>React</Link>, <Link
                                        href='/services/Vuejs-Development'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>Vue</Link>,
                                        and Angular—to build responsive, high-performing <Link
                                        href='/services/Web-Application'
                                        className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>web
                                        applications</Link> tailored to user and business needs. As a specialized
                                        JavaScript web application development company, we focus on delivering fast,
                                        scalable, and intuitive digital solutions by optimizing for speed,
                                        responsiveness, and seamless user interactions. Our approach ensures that every
                                        application not only performs reliably across devices but also provides a
                                        refined user experience that supports engagement and long-term growth.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'AIS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        API Integration Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Third-party Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Scalability</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We deliver seamless third-party API integration services that ensure smooth
                                        communication between disparate systems and applications, enhancing overall
                                        operational efficiency and scalability. By leveraging technologies such as
                                        Express.js and GraphQL, our team designs robust, maintainable APIs tailored to
                                        your architecture. We prioritise clean code, provide comprehensive
                                        documentation, and perform rigorous testing to guarantee reliability, security,
                                        and ease of integration—enabling your digital ecosystem to function cohesively
                                        and adapt as your business grows.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'JSLM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        JavaScript Legacy Migration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Technology Upgrade</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Security Upgrade</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Framework Migration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        As technology rapidly advances, maintaining the relevance and performance of
                                        your digital assets is crucial. Our JavaScript legacy migration service is
                                        designed to modernise outdated applications by transitioning them to current,
                                        high-performing JavaScript frameworks and environments. Whether migrating from
                                        legacy technologies like jQuery to modern libraries such as React or upgrading
                                        an older Node.js stack, we ensure a seamless transition that enhances security,
                                        scalability, and maintainability. At Grey InfoTech, we follow industry best
                                        practices to future-proof your application, improve performance, and align it
                                        with today’s evolving user expectations and business requirements.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'JSMS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        JavaScript Maintenance & Support
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Reliability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Continuous Updates</span>

                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Launching your JavaScript application marks the start of its lifecycle—not the
                                        end. At Grey InfoTech, we understand that sustained performance, security, and
                                        user satisfaction require ongoing maintenance and timely updates. Our dedicated
                                        team of JavaScript experts offers comprehensive post-launch support, including
                                        bug fixes, performance optimisation, feature enhancements, and security patches.
                                        With 24/7 monitoring and assistance, we ensure your application remains
                                        reliable, efficient, and aligned with evolving business needs and technology
                                        standards.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-400' : 'text-gray-700'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-white' : 'text-black'}`}
                                     id={'JSCS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        JavaScript Consulting Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Strategic Guidance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Risk Migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Market Evaluation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>Tech Optimisation</span>

                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Ensure your JavaScript application becomes a high-performing, value-driven asset
                                        by partnering with a trusted technology expert like Grey InfoTech. Backed by
                                        extensive consulting and technical experience, we provide end-to-end
                                        support—from strategic planning and development to testing, risk mitigation, and
                                        scalable deployment. Our team takes a thorough, data-informed approach,
                                        assessing your market landscape, competitive environment, and operational
                                        challenges to design and deliver a custom-built solution that drives efficiency,
                                        innovation, and sustainable growth for your organisation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'}
                 className={'lg:-mt-[25em] md:-mt-[25em] sm:-mt-[3em] -mt-[3em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/java/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* The Benefits of JavaScript */}
            <div
                className={`lg:pt-[3em] md:pt-[2em] pt-[1em] lg:pb-[3em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div id={'benefit of using javascript'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* JavaScript Benefit Header */}
                    <div
                        className={`border-b-[0.1em] grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 border-gray-300/50 pb-[3em] lg:mb-[5em] md:mb-[5em] sm:mb-[5em] mb-[5em]`}>
                        <div>
                            <h2 className='text-[1em] text-start sm:text-[1.5em] md:text-[2.5em] lg:text-[3.3em] font-[550] break-words whitespace-normal tracking-tight leading-[1.15] lg:pb-6'>
                                The Benefits <br className={'lg:block md:block hidden'}/>of JavaScript
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.5em] md:-ml-[1.5em]'}>
                            <p className={'text-justify text-[0.87em] font-[300]'}>
                                If you&#39;re considering commissioning a JavaScript software product, here are several
                                key
                                benefits that make it a strong choice—flexibility, speed, scalability, and a vast
                                ecosystem that supports rapid, high-quality development.
                            </p>
                        </div>
                    </div>

                    {/* Benefits */}
                    <div
                        className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]`}>
                        <div id={'cross-platform power'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/att1.svg' : '/assets/java/icon/att.svg'}
                                alt={'Cross-platform Power'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Cross-platform Power
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we fully leverage JavaScript’s powerful cross-platform capabilities to
                                deliver seamless solutions that operate consistently across web browsers, mobile
                                devices, and desktop applications. This unified approach eliminates the complexity of
                                managing multiple codebases, enabling your business to reach a broader audience
                                efficiently while maintaining high performance and a cohesive user experience across all
                                platforms.
                            </p>
                        </div>
                        <div id={'engaging user experience'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/fast1.svg' : '/assets/java/icon/fast.svg'}
                                alt={'Engaging User Experience'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.1em] font-[500] mb-8'}>
                                Engaging User Experience
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                We design JavaScript-powered interfaces that go beyond dynamic content to deliver truly
                                interactive experiences. Through real-time feedback, engaging animations, and smooth,
                                reload-free interactions, we craft seamless user journeys that captivate audiences and
                                enhance satisfaction. Our focus is on creating immersive, intuitive digital environments
                                that drive engagement and foster lasting connections with your users.
                            </p>
                        </div>
                        <div id={'robust toolset'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/test1.svg' : '/assets/java/icon/test.svg'}
                                alt={'Robust Toolset and Innovation'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Robust Toolset <br className={'lg:block md:block hidden'}/>and Innovation
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Within the rapidly evolving JavaScript ecosystem, we harness a wide array of libraries,
                                frameworks, and advanced tools—including <Link href='/services/Reactjs-Development'
                                                                               className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>React</Link>, <Link
                                href='/services/Vuejs-Development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>Vue</Link>, <Link
                                href='/services/angular-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>Angular</Link>,
                                and <Link href='/services/Nodejs-Development'
                                          className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>Node.js</Link>—to
                                accelerate development and elevate the functionality of your digital solutions. This
                                strategic use
                                of cutting-edge technologies ensures your applications are not only delivered
                                efficiently but also equipped with the latest features and performance enhancements,
                                keeping your business at the forefront of innovation and competitive advantage.
                            </p>
                        </div>
                        <div id={'scalability'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/sca1.svg' : '/assets/java/icon/sca.svg'}
                                alt={'Scalability and Optimal Performance'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Scalability and <br className={'lg:block md:block hidden'}/>Optimal Performance
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                Leveraging our expertise in technologies like Node.js, we design and develop scalable
                                back-end systems engineered to handle high volumes of user traffic without sacrificing
                                performance. Its non-blocking I/O and event-driven architecture ensure your applications
                                remain highly responsive and reliable—even under peak load—delivering a seamless,
                                uninterrupted user experience regardless of demand.
                            </p>
                        </div>
                        <div id={'swift prototyping'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/cust1.svg' : '/assets/java/icon/cust.svg'}
                                alt={'Swift Prototyping and Iteration'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] leading-[1.1] mb-8'}>
                                Swift Prototyping <br className={'lg:block md:block hidden'}/>and Iteration
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                At Grey InfoTech, we recognize the critical importance of speed and agility in
                                today’s <Link href='/services/Software-Development'
                                              className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>software
                                development</Link> landscape. Leveraging JavaScript’s versatility alongside our suite
                                of advanced tools, we enable rapid prototyping that brings your ideas to life quickly
                                and efficiently. This accelerated approach facilitates early validation and iterative
                                refinement, ensuring the final product aligns precisely with your vision while
                                significantly reducing time to market and driving competitive advantage.
                            </p>
                        </div>
                        <div id={'cost-efficient solution'}>
                            <Image
                                src={isDayTime ? '/assets/java/icon/risk1.svg' : '/assets/java/icon/risk.svg'}
                                alt={'Cost-efficient Solution'}
                                width={60}
                                height={60}
                                className={'h-auto w-auto mb-2'}
                            />
                            <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                                Cost-efficient Solution
                            </h5>
                            <p className={'text-[0.873em] text-justify font-[300]'}>
                                By seamlessly combining client-side (front-end) and server-side (back-end) development
                                using JavaScript, we streamline your project’s workflow and optimise resource
                                allocation. Eliminating the need for multiple language specialists or separate teams,
                                our unified approach delivers cost-effective development, comprehensive testing, and
                                efficient maintenance. This cohesive strategy ensures your digital solution is not only
                                tailored to your unique business needs but also built with agility and scalability in
                                mind, maximizing value throughout its lifecycle.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* JavaScript for Mobile Applications */}
            <div
                className={` lg:pt-[3em] md:pt-[3em] sm:pt-[2em] pt-[2em] lg:pb-[3em] md:pb-[3em] sm:pb-[2em] pb-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
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
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.5em] sm:text-[2.2em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[3.2em] lg:text-[3.2em] w-auto h-auto md:mr-[2.5em] lg:mr-[5em]'>
                                JavaScript for <br className={'lg:block md:block hidden'}/>Mobile Applications
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                JavaScript is a vital technology in mobile application development, renowned for its
                                versatility and efficiency. It forms the backbone of hybrid mobile apps—web applications
                                designed to deliver native-like user experiences across multiple devices. Leveraging
                                frameworks such as <Link href='/services/React-Native-Development'
                                                         className={`border-b-[1px] ${isDayTime ? 'hover:border-black border-gray-400' : 'hover:border-white border-gray-600'}`}>React
                                Native</Link>, JavaScript enables the creation of high-performance, responsive
                                interfaces by translating code into native components, ensuring seamless functionality
                                comparable to fully native applications.<br/><br/>

                                The event-driven and non-blocking I/O nature of JavaScript makes it particularly
                                well-suited for the interactive, real-time features that modern mobile users demand. Its
                                capacity to efficiently handle asynchronous operations ensures smooth and responsive
                                performance on resource-constrained mobile devices, enhancing user satisfaction and
                                engagement.<br/><br/>

                                Furthermore, the rise of <Link href='/services/Nodejs-Development'
                                                               className={`border-b-[1px] ${isDayTime ? 'hover:border-black border-gray-400' : 'hover:border-white border-gray-600'}`}>Node.js</Link> has
                                expanded JavaScript’s role to the server side, enabling end-to-end development within a
                                single language ecosystem. This facilitates seamless client-server integration,
                                supporting essential features such as real-time updates and dynamic content delivery. By
                                leveraging JavaScript across both <Link href='/services/frontend-development'
                                                                        className={`border-b-[1px] ${isDayTime ? 'hover:border-black border-gray-400' : 'hover:border-white border-gray-600'}`}>front-end</Link> and <Link
                                href='/services/backend-development'
                                className={`border-b-[1px] ${isDayTime ? 'hover:border-black border-gray-400' : 'hover:border-white border-gray-600'}`}>back-end</Link>,
                                businesses can accelerate development cycles, reduce costs, and deliver
                                scalable, high-quality mobile applications that meet evolving market needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Digital Product JavaScript is Best Suited to */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] md:px-[4.6em] lg:pt-[6em]] md:pt-[6em] pt-[2emm] lg:pb-[6em]] md:pb-[6em] pb-[2em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] pb-[4em] ${isDayTime ? 'text-white' : 'text-black'} `}>
                    <div>
                        <h2 className={`lg:text-[3.2em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] md:pr-[1em] leading-[1.2]`}>
                            Digital Products <br className={'lg:block md:block hidden'}/>JavaScript is <br
                            className={'lg:block md:block hidden'}/>Best Suited to
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] md:-ml-[3em] tracking-noromal'>
                            JavaScript is well-suited for both front-end and back-end development, but its true strength
                            shines in long-term, large-scale projects. If you&#39;re envisioning something big,
                            JavaScript might be the perfect fit. Here are just a few types of applications that can be
                            built with it.
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
                                src={'/assets/java/chat.jpg'}
                                alt='Chat Application'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            JavaScript’s versatility, supported by powerful libraries and frameworks such as Socket.io,
                            Node.js, and React, makes it an ideal choice for building real-time chat applications. Its
                            event-driven architecture and ability to manage asynchronous data streams enable seamless,
                            low-latency communication, ensuring users enjoy instant messaging experiences across
                            platforms. This capability is especially valuable for businesses aiming to enhance user
                            engagement and support responsiveness in customer-facing applications.
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
                                src={'/assets/java/enterprise.jpg'}
                                alt='Enterprise-scale Applications'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            JavaScript’s support for static typing through tools like TypeScript, combined with its
                            object-oriented features, makes it a robust foundation for building large-scale enterprise
                            applications. At Grey InfoTech, we harness these capabilities to engineer scalable,
                            maintainable solutions tailored to complex business environments. Our approach ensures that
                            enterprise systems are not only efficient and resilient but also adaptable to future growth
                            and evolving operational needs.
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
                                src={'/assets/java/real.jpg'}
                                alt='Real-time Dashboards'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Unlock the full potential of JavaScript to build dynamic, interactive dashboards that
                            deliver real-time insights and drive informed decision-making. By leveraging reactive
                            frameworks and best-in-class development practices, Grey InfoTech ensures your dashboards
                            are not only visually compelling but also highly functional—providing critical business data
                            instantly, with precision and clarity that empower agile responses and strategic actions.
                        </p>
                    </div>
                </div>

                {/* Interactive Web Applications Powered by Node.js */}
                <div id={'interactive web application'}
                     className={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:mb-8 md:mb-8 mb-6 gap-4 border-b-[1px] pb-[2em] text-gray-500 ${isDayTime ? 'hover:text-white' : 'hover:text-black'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.5em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            Interactive Web <br className={'lg:block md:block hidden'}/>Applications <br
                            className={'lg:block md:block hidden'}/>Powered by Node.js
                        </h2>
                        <div
                            className='absolute lg:block hidden lg:pl-[10em] md:pl-[8em] lg:-mt-[3em] md:-mt-[2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300'>
                            <Image
                                src={'/assets/java/interact.jpg'}
                                alt='Interactive Web Applications Powered by Node.js'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            By leveraging JavaScript’s seamless integration with Node.js, we develop robust full-stack
                            applications that maintain consistency across both front-end and back-end. This unified
                            approach enhances performance, streamlines development, and ensures your interactive web
                            applications deliver a cohesive, high-impact user experience that drives lasting engagement.
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
                                src={'/assets/java/pwa.jpg'}
                                alt='Progressive Web Apps (PWAs)'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Leveraging its compatibility with modern web frameworks, JavaScript enables the development
                            of Progressive Web Apps (PWAs) that deliver a seamless, high-performance experience
                            comparable to native applications. These PWAs offer faster load times, offline capabilities,
                            and enhanced user engagement—all while being cost-effective and easily maintainable across
                            platforms.
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
                                src={'/assets/java/websites.jpg'}
                                alt='Websites'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            At Grey InfoTech, JavaScript is the cornerstone of our web development strategy—powering
                            everything from sleek static websites to complex, dynamic platforms. Our team crafts
                            engaging digital experiences that not only reflect your brand identity but also drive user
                            interaction and long-term engagement.
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
                                src={'/assets/java/desktop.jpg'}
                                alt='Desktop Application'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            By leveraging frameworks like Electron, we extend the power of JavaScript to cross-platform
                            desktop application development. At Grey InfoTech, our expertise ensures the delivery of
                            robust, user-centric desktop solutions that combine seamless functionality with exceptional
                            performance across operating systems.
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
                                src={'/assets/java/backend.jpg'}
                                alt='Backend Systems'
                                height={250}
                                width={200}
                                className={' w-auto h-auto mx-auto '}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] md:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            By combining JavaScript with Node.js, we build robust back-end systems, scalable APIs, and
                            efficient microservices that form the core of your digital infrastructure. This unified
                            approach enhances performance, accelerates development, and ensures seamless integration
                            across your technology stack.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Work with Grey InfoTech JavaScript developers */}
            <div className={`lg:h-full md:h-full ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 md:pt-32 md:pb-14 pt-16 pb-7 px-4 px-4sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 md:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3.1em] capitalize text-[1.5em] font-[500] tracking-tight leading-[1.15] lg:pb-6 rounded-none'>
                                Why Work with <br className={'lg:block md:block hidden'}/>Grey InfoTech<br
                                className={'lg:block md:block hidden'}/> JavaScript<br
                                className={'lg:block md:block hidden'}/> Developers
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Partnering with Grey InfoTech’s JavaScript developers ensures a streamlined,
                                high-quality development process tailored to your business goals. Our expert team
                                applies modern tools and proven methodologies to deliver scalable, future-ready
                                solutions. With a strong focus on reliability, performance, and long-term value, we turn
                                your vision into impactful digital products that support sustainable growth.
                            </p>
                        </div>
                    </div>
                    <div
                        className='relative lg:mt-[6em] md:mt-[6em] mt-[3em] mx-auto grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-24'>
                        {/* Left Section */}
                        <div
                            className={`relative text-[0.873em] lg:leading-[1.5] lg:mr-[10em] md:mr-[10em] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4`}>
                            {reasons.map((reason, index) => (
                                <div
                                    key={reason.id}
                                    className={`relative text-justify mb-6 ${
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
                                    <div>
                                        <AnimatePresence mode="wait">
                                            {index + 1 === activeIndex && (
                                                <motion.div
                                                    key={reason.id}
                                                    initial={{opacity: 0, y: -30}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -30}}
                                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                                    className={`relative inline-block ${
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
                        <div
                            className='lg:mt-[5em] md:mt-[2em] h-auto w-full max-w-full lg:sticky md:sticky lg:-ml-[2em]'>
                            <Image
                                src={'/assets/java/why.jpg'}
                                alt="Mockup"
                                width={660}
                                height={150}
                                className="mb-4 object-cover"
                            />
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

            {/* What Grey InfoTech Does */}
            <div className={`lg:h-full md:h-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative  lg:pt-32 lg:pb-32 md:pt-32 md:pb-32 pt-16 pb-7 px-4 px-4sm:px-6 lg:px-[4.6em] md:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-14 md:gap-12 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3.2em] md:text-[2em] capitalize text-[1.5em] font-[500] tracking-tight leading-[1.15] lg:pb-6 md:pb-6 rounded-none'>
                                What Grey <br className={'lg:block md:block hidden'}/>InfoTech Does
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em] md:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Grey InfoTech is a digital product development company headquartered in Port Harcourt,
                                Nigeria, with over a decade of experience delivering bespoke software solutions to
                                businesses across diverse industries. We have built a strong reputation for engineering
                                high-quality, scalable, and future-ready applications, with a particular focus on
                                JavaScript and its surrounding ecosystem. Our deep technical capabilities and strong
                                business acumen allow us to support startups, SMEs, and large enterprises in achieving
                                their digital transformation goals.<br/><br/>

                                Our JavaScript development team is proficient in modern frameworks and libraries such as
                                React, Vue.js, Angular, and Node.js, enabling us to design and implement solutions that
                                are both user-centric and performance-driven. We approach every project with a
                                commitment to best practices in code quality, maintainability, and security, ensuring
                                each product delivers measurable value. By aligning our technical approach with your
                                strategic objectives, Grey InfoTech helps you build powerful web applications that drive
                                growth, streamline operations, and enhance user experience in a competitive digital
                                landscape.
                            </p>
                        </div>
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
                            At Grey InfoTech, our JavaScript development services are delivered by a cross-functional
                            team focused on building dynamic, high-performing web applications tailored to your business
                            goals. A project manager oversees the entire process, ensuring transparent communication,
                            timely execution, and strategic alignment. JavaScript developers take charge of crafting
                            scalable front-end and full-stack solutions, leveraging modern frameworks such as React,
                            Vue.js, and Node.js to ensure flexibility and speed.<br/><br/>

                            Complementing the core team are UI/UX designers who optimize user interaction, QA engineers
                            who ensure product reliability through thorough testing, and DevOps professionals who manage
                            smooth deployment and ongoing performance. Your active collaboration is encouraged
                            throughout the process, ensuring the final solution meets your functional needs and delivers
                            measurable business value.
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
                            Frequently Asked <br className={'lg:block md:block hidden'}/>JavaScript Questions
                        </h2>
                        <p className={'text-[0.873em] font-[300] leading-[1.3]'}>
                            We believe JavaScript is one of the most powerful tools for building modern applications—and
                            <br className={'lg:block md:block hidden'}/>we want you to feel the same. Let us walk you
                            through some
                            of the most frequently asked <br className={'lg:block md:block hidden'}/>questions about
                            JavaScript
                            and show you why it’s a top choice for your project.
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
                            <span>What exactly is JavaScript?</span>
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
                                JavaScript, powered by the high-performance V8 engine, has evolved into a comprehensive
                                full-stack development environment through platforms like Node.js, enabling businesses
                                to build scalable and efficient solutions across multiple domains. From web servers and
                                APIs to microservices, desktop applications, and IoT devices, JavaScript offers a
                                versatile framework that supports diverse project requirements. By unifying front-end
                                and back-end development within a single language, it facilitates seamless code sharing
                                and collaboration between teams, reducing complexity and development time. This
                                streamlined approach not only accelerates time to market but also enhances
                                maintainability and consistency across platforms, empowering organizations to deliver
                                robust, high-performance digital solutions that drive growth and operational excellence.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can JavaScript be employed for frontend or backend development?</span>
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
                                JavaScript’s versatility as a runtime environment (RTE) lies in its seamless use across
                                both <Link
                                href='/services/frontend-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>front-end</Link> and <Link
                                href='/services/backend-development'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>back-end</Link> development.
                                On the back end, JavaScript excels at building
                                server-side applications that efficiently handle numerous concurrent connections, making
                                it ideal for <Link
                                href='/services/Web-Application'
                                className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-white' : 'hover:border-black'}`}>web
                                applications</Link>, chat platforms, online gaming servers, and other
                                real-time solutions. On the front end, JavaScript plays a crucial role not only in
                                crafting interactive user interfaces but also in streamlining development workflows.
                                Tools such as Gulp, Babel, and Webpack leverage JavaScript to automate tasks like
                                compiling CSS preprocessors, bundling scripts, and optimizing assets—enhancing build
                                efficiency and accelerating time to market. This dual capability positions JavaScript as
                                an indispensable technology for modern, full-stack development.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How scalable are JavaScript applications?</span>
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
                                JavaScript applications are highly regarded for their scalability, largely due to their
                                event-driven, non-blocking I/O architecture, which efficiently manages numerous
                                concurrent connections without impacting overall performance. Scalability can be further
                                enhanced through horizontal scaling—deploying multiple instances across different server
                                nodes and employing load balancers to evenly distribute incoming traffic. Additionally,
                                strategic use of caching solutions, including in-memory caches and content delivery
                                networks (CDNs), helps reduce server load and improve response times. However, achieving
                                optimal scalability with JavaScript requires thoughtful system design, robust
                                architecture, and continuous performance optimization to meet evolving business demands
                                effectively.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does it cost to scale a Javascript project?</span>
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
                                The cost of developing a JavaScript application varies based on several key factors,
                                including the project’s complexity, the range of features required, and the anticipated
                                development timeline. Without a detailed understanding of your specific requirements,
                                providing an accurate estimate is challenging. However, the investment for a fully
                                developed JavaScript application typically begins at […], with final costs tailored to
                                the unique scope and objectives of your project.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What are the benefits of outsourcing JavaScript?</span>
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
                                Outsourcing your Node.js development to the right partner offers significant advantages,
                                granting you access to highly skilled developers with deep expertise in JavaScript. This
                                approach allows your internal team to concentrate on core business activities while
                                experienced specialists manage the technical complexities. At Grey InfoTech, our experts
                                bring industry best practices, innovative solutions, and valuable insights to every
                                project, ensuring an efficient and productive collaboration. With well-established
                                processes and rigorous quality standards, we deliver solutions that meet the highest
                                benchmarks, providing confidence and reliability when your project goes live.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Do you provide JavaScript consulting services?</span>
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
                                Grey InfoTech offers comprehensive JavaScript consulting services designed to guide you
                                through the complexities of application development with confidence. Recognizing that
                                launching a new digital solution can be daunting, we partner with you to ensure your
                                JavaScript investment delivers measurable value. Leveraging extensive experience in
                                JavaScript development, testing, and scaling, our experts conduct thorough assessments
                                of your market landscape, competitive environment, and technical challenges before
                                initiating development. By combining strategic architectural planning, industry best
                                practices, and code optimization, we deliver robust, scalable, and responsive JavaScript
                                applications that empower your organisation’s sustained growth and success.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What development processes do you follow?</span>
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
                                At Grey InfoTech, our JavaScript application development follows a proven methodology
                                refined through years of successful projects. We apply this consistent, tried-and-tested
                                approach to every client engagement, prioritising efficient, incremental development
                                that adapts to your evolving needs. Understanding that application development can be
                                complex and time-consuming, we commit to guiding you at every stage—from your initial
                                enquiry through to launch and ongoing support. Throughout the process, we ensure each
                                phase is customised to align perfectly with your organisation’s unique objectives and
                                requirements, delivering solutions that truly fit your business.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Will I be assigned a specific project manager to look after my project?</span>
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
                                At Grey InfoTech, we assign a dedicated project manager to oversee your product
                                development, ensuring you stay informed at every stage. This approach reflects our
                                commitment to keeping clients actively involved in the creation process—without
                                burdening you with technical complexities. Your project manager serves as your primary
                                point of contact, providing regular, proactive updates on progress and addressing any
                                concerns promptly. We believe communication is fundamental, fostering a collaborative
                                environment where your input is valued and integrated, ensuring the final solution
                                aligns perfectly with your vision and business goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is JavaScript still relevant in 2025?</span>
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
                                Absolutely. JavaScript continues to be a foundational technology powering modern web
                                development and shows no signs of losing relevance in the foreseeable future. Industry
                                leaders like PayPal, LinkedIn, Netflix, and Uber rely heavily on Node.js for scalable,
                                high-performance front-end and back-end solutions. Its robustness, versatility, and
                                expansive developer community have made JavaScript the most widely adopted runtime
                                environment globally. Innovations such as GraphQL—used to optimize data retrieval from
                                APIs, improving efficiency by up to 50%—further highlight JavaScript’s ongoing evolution
                                and scalability. With a growing user base and continuous advancements, JavaScript’s
                                future remains exceptionally promising.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Javascript;