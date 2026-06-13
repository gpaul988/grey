'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Testimonial data
const testimonials = [
    {
        name: "Moses Nwafor Onyekwelu",
        title: "CEO, POAWD Limited",
        image: "/assets/mvp/moses.jpg",
        message:
            "Grey InfoTech Limited helped us build an MVP that was not only functional but also aligned perfectly with our " +
            "vision. Their expertise in rapidly prototyping and iterating the product allowed us to test our concept quickly " +
            "in the market. The result? We were able to secure investor interest and move forward with confidence. The Grey InfoTech " +
            "team’s commitment to delivering high-quality results within tight timelines was truly impressive. We couldn’t have asked " +
            "for a better partner for our MVP development."
    },
    {
        name: "Samuel F. Karibi",
        title: "COO, Inifite Graphix",
        image: "/assets/mvp/samuel.jpg",
        message:
            "We approached Grey InfoTech with a tight deadline and a rough idea for our MVP. What they delivered exceeded our " +
            "expectations. They guided us through every step of the process, from defining core features to ensuring scalability " +
            "for future growth. The MVP they built helped us validate our business model quickly, and thanks to their expertise, " +
            "we’ve been able to secure new clients and funding. The team’s ability to deliver on time, within budget, and with " +
            "exceptional quality makes them our go-to for future projects."
    },

];

// Reasons
const reasons = [
    {
        id: 1,
        title: 'Certified To The Highest ISO Standards',
        description: (
            <>
                Our development process is guided by industry best practices and strict quality standards, ensuring that
                every MVP we deliver is secure, reliable, and built for long-term success. From code quality to data
                protection, we prioritise stability and performance to give your product a strong foundation from day
                one.
            </>
        ),
        images: ['/assets/mvp/cert.jpg']
    },
    {
        id: 2,
        title: 'Proven Expertise',
        description: (
            <>
                With a history of launching high-impact MVPs that drive user adoption and attract investment, we’re the
                strategic partner you can rely on to transform your vision into a scalable, market-ready product.
            </>
        ),
        images: ['/assets/mvp/prove.jpg']
    },
    {
        id: 3,
        title: 'Startup-Friendly Mindset',
        description: (
            <>
                We understand the strategic and operational challenges startups encounter, which is why we deliver
                customised solutions that align with your business goals, optimise resources, and position you for
                scalable growth.
            </>
        ),
        images: ['/assets/mvp/start.jpg']
    },
    {
        id: 4,
        title: 'Quality Assurance',
        description: (
            <>
                Every MVP we build undergoes comprehensive, business-aligned testing to ensure it performs flawlessly,
                supports your strategic goals, and delivers a reliable foundation for growth and market entry.
            </>
        ),
        images: ['/assets/mvp/team.jpg']
    },
    {
        id: 5,
        title: 'Customised & White-Labelled Solutions',
        description: (
            <>
                We provide flexible, scalable development solutions that can be fully customised and white-labelled to
                align with your business needs, enabling you to deliver a tailored product to your customers with ease.
            </>
        ),
        images: ['/assets/mvp/cust.jpg']
    }
];


const Mvp = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeIndex, setActiveIndex] = useState(1);
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);


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
            "idea",
            "click",
            "tier",
            "tech",
            "feat",
            "okr",
            "cto",
            "decks",
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

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, image, message} = testimonials[current];

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
        {id: 9, name: 'Partner 9', dayIma5ge: 'afro.svg', nightImage: 'afro1.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane.svg', nightImage: 'cane1.svg'},
    ];

    // Why Work hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

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
                    className={`border-b pb-[0.5em] border-gray-300/20 px-0 constant-text lg:text-[5.5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[2.5em] mt-[2.5em] leading-[1] font-[550] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    MVP <br className={'lg:block md:block hidden'}/>Development <br
                    className={'lg:block md:block hidden'}/>Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Use proven tech skills to speed up the creation of your products. From MVP to market leader: <br
                    className={'lg:block md:block hidden'}/>Scalable solutions, effective development, and advice from
                    seasoned
                    startup experts.
                </p>
                <div
                    className={'relative w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/mvp/hero.jpg'}
                        alt={'MVP Hero'}
                        width={1620}
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
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.9em] lg:font-[550] font-[600] lg:tracking-wider tracking-tight'>
                            Accelerate time to market
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.5em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            MVP Development Services</h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Turning an idea into a successful digital product takes more than inspiration—it
                                    requires structured planning, disciplined execution, and the ability to adapt
                                    quickly to user and market feedback. Our Minimum Viable Product
                                    (MVP) <Link href={'/services/Software-Development'}
                                                className={`border-b pb-[0.1em] ${
                                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                }`}>software development</Link> service is designed to help businesses
                                    efficiently bring
                                    new concepts to life by focusing on what matters most: speed to market, real-world
                                    validation, and a scalable product foundation. By building only the core features
                                    necessary to solve the key user problem, we help reduce development time and costs,
                                    while giving you the tools to test, learn, and iterate effectively.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Whether you’re a <Link href={'/Startups'} className={`border-b pb-[0.1em] ${
                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                }`}>startup</Link> seeking to validate product–market fit or an established
                                    company launching a new digital initiative, we partner with you throughout the
                                    entire journey—from initial discovery and prototyping to development, launch, and
                                    post-launch optimization. Our team works collaboratively to define your product
                                    vision, prioritise features, and deliver a solution that is both functional and
                                    future-ready. With a process grounded in agility and strategic insight, we ensure
                                    your MVP is not just a test version—but a launchpad for long-term success and
                                    growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MVP Services */}
            <div id={'mvp services'}
                 className={`relative lg:py-[2.5em] py-[1em] lg:my-[5em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                     isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    MVP Services</h2>
                <div
                    className={`relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 mb-4 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div id={'consulting'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mvp/web1.svg' : '/assets/mvp/web.svg'}
                                alt='MVP Consulting'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            MVP Consulting
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                            Our expert consultants support organisations across all industries in navigating the MVP
                            development process with strategic insights into market fit, feature prioritisation, and
                            scalability. Whether you&#39;re launching a new fintech platform, a healthcare solution, an
                            e-commerce tool, or an internal enterprise system, we help you define a clear product
                            vision, minimise development risk, and align technical decisions with business goals. From
                            startup founders to corporate innovation leads, we guide teams through every phase—from idea
                            validation to launch—ensuring the MVP is built for real-world impact, user engagement, and
                            long-term growth.
                        </p>
                    </div>
                    <div id={'mvp app'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mvp/mobile1.svg' : '/assets/mvp/mobile.svg'}
                                alt='MVP App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            MVP App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Building <Link href={'/services/Mobile-Application-Development'}
                                           className={`border-b pb-[0.1em] ${
                                               isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                           }`}>mobile applications</Link> with MVP principles allows businesses to
                            launch scalable,
                            high-impact products while controlling development costs and reducing time to market. By
                            focusing on core functionality first, we help you validate your concept quickly and make
                            data-driven decisions for future enhancements. Our team specialises in native and
                            cross-platform app development for both Android
                            and <Link href={'/services/ios-development'} className={`border-b pb-[0.1em] ${
                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                        }`}>iOS</Link>, ensuring that your app not only
                            meets technical standards but is also user-centric and market-ready from day one. Whether
                            you’re targeting consumers or enterprise users, we deliver reliable, future-proof solutions
                            designed for growth.
                        </p>
                    </div>
                    <div id={'web development'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mvp/weba1.svg' : '/assets/mvp/weba.svg'}
                                alt='MVP Web Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] leading-[1.3] mb-4'>
                            MVP Web Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            From single-page applications to complex, dynamic websites, our
                            MVP <Link href={'/services/Web-Development'} className={`border-b pb-[0.1em] ${
                            isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                        }`}>web development</Link> service is designed to deliver scalable, user-focused digital
                            solutions that adapt to your business needs. We prioritise speed to market without
                            compromising on quality, building platforms that are intuitive, high-performing, and ready
                            for future growth. Whether you&#39;re launching a customer-facing product, an internal tool,
                            or a proof of concept, our team ensures your web application is built with a strong
                            architectural foundation—making it easy to iterate, integrate new features, and scale as
                            your business evolves.
                        </p>
                    </div>
                </div>
            </div>

            {/* Development Solutions */}
            <div id={'mvp solution'}
                 className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                <h2 className={'border-b pb-[0.8em] border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    MVP Solutions</h2>
                <div
                    className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:mt-28 mt-6 px-6 max-w-full w-full mx-auto h-full'>
                    <div className='lg:sticky top-28 lg:h-screen overflow-hidden'>
                        <h3 className={`text-[1.5em] font-[500] constant-text ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                            Our Solutions
                        </h3>
                        <ul className={`list-disc constant-text text-[0.873em] ml-4 font-[300] relative space-y-1 ${
                            isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-300 focus:decoration-gray-100'
                        }`}>
                            {[
                                {id: "01", title: "Technology Consultation", target: "tech"},
                                {id: "02", title: "Upselling & Feature Upgrade ", target: "feat"},
                                {id: "03", title: "Investor Support & Decks", target: "decks"},
                                {id: "04", title: "Clickable Prototypes", target: "click"},
                                {id: "05", title: "Idea Validation", target: "idea"},
                                {id: "06", title: "Membership Tier Design", target: "tier"},
                                {id: "07", title: "OKR & KPI Reporting", target: "okr"},
                                {id: "08", title: "Virtual CTO", target: "cto"},
                            ].map((item, index) => (
                                <li key={index} className={'group lg:mt-6 mt-4'}>
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
                    <div className={'lg:-ml-[7em]'}>
                        <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                            </div>
                            <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'tech'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Technology Consultation</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Expert guidance</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System design</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Infrastructure planning</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategic decisions</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Choosing the right technology at any stage of product development—whether you&#39;re
                                    starting from scratch, building an MVP, or scaling an existing platform—is a
                                    critical factor that can influence the success, sustainability, and performance of
                                    your solution. Early decisions around frameworks, infrastructure, and integrations
                                    can either set you up for long-term agility or create costly roadblocks down the
                                    line. For growing startups and established enterprises alike, aligning technical
                                    choices with strategic business goals is essential to achieving a competitive
                                    edge.<br/><br/>
                                    We help organisations across industries make informed, future-proof technology
                                    decisions through expert guidance in system architecture, infrastructure planning,
                                    and software evaluation. Whether you’re navigating complex backend systems, choosing
                                    between cloud platforms, or determining the best tech stack for scalability, our
                                    consultants work closely with your team to understand your goals and constraints.
                                    The result is a solid technical foundation that not only meets today’s requirements
                                    but also supports ongoing innovation, efficiency, and growth.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'feat'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Upselling & Feature Upgrade</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Revenue growth</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feature enhancements</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User retention</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Dynamic pricing</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Monetisation should be built into your product strategy from the start—not as an
                                    afterthought. We help you design thoughtful, data-informed strategies that guide
                                    users toward higher-value tiers, premium features, or additional services. Whether
                                    through targeted in-app messaging, staged feature releases, or intelligent pricing
                                    models, we focus on creating user experiences that naturally encourage conversion
                                    while maintaining trust and satisfaction.<br/><br/>
                                    Our goal is to ensure your MVP isn’t just functional—it’s a revenue engine in
                                    motion. By aligning product design with monetisation opportunities from day one, we
                                    help you unlock sustainable growth and long-term value. Whether you&#39;re launching
                                    a consumer-facing app or a B2B platform, our approach ensures that monetisation is
                                    scalable, adaptable, and seamlessly integrated into your product’s user journey.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'desks'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Investor Support & Decks</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Funding preparation</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Investor communication</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Value proposition</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market strategy</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Securing funding is one of the most pivotal milestones for any startup—and a strong,
                                    well-crafted investor pitch can make all the difference. We support founders and
                                    product teams in developing compelling investor decks that clearly communicate your
                                    MVP’s value, the problem it solves, and the opportunity it represents. From
                                    positioning your product in the market to highlighting traction, team strengths, and
                                    go-to-market strategy, we help you build a narrative that resonates with potential
                                    investors.<br/><br/>
                                    Our focus is not only on design and presentation, but on aligning your product
                                    vision with your long-term business objectives. We help you articulate how your MVP
                                    serves as the foundation for scalable growth, product evolution, and revenue
                                    generation. By connecting your early-stage product to a broader strategic roadmap,
                                    we make it easier for investors to see the potential—and believe in your journey.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'click'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Clickable Prototypes</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive design</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Investor-ready</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Core functionality</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost-efficient</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Once your idea has been validated, the next step is to bring it to life in a way
                                    that’s both visual and interactive—without the cost and time of full development. We
                                    create high-fidelity, clickable prototypes that simulate your product’s core
                                    functionality and user experience. These prototypes serve as a powerful tool for
                                    internal alignment, user testing, and early-stage feedback, helping you refine the
                                    product concept before writing a single line of production code.<br/><br/>
                                    Beyond internal use, prototypes are instrumental in investor conversations and
                                    stakeholder presentations. They provide a tangible, engaging way to showcase your
                                    product’s potential, demonstrating how it will work and deliver value in the real
                                    world. By bridging the gap between concept and execution, our prototypes help you
                                    validate features, test assumptions, and gain buy-in—saving valuable time and
                                    resources while strengthening your roadmap.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'idea'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Idea Validation</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technology consultation</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market research</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Risk reduction</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User expectations</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Validating your product idea is a critical first step that ensures you&#39;re
                                    building
                                    something the market actually needs. Through a structured process of testing key
                                    assumptions, conducting user research, and analysing competitors, we help you
                                    identify whether your concept solves a real problem for your target audience. This
                                    validation phase helps prevent costly missteps, focusing your time and resources on
                                    features that deliver real value and resonate with users.<br/><br/>
                                    By aligning your idea with market demand early on, you significantly increase your
                                    chances of achieving product–market fit. Validation not only refines your product
                                    concept but also provides the data and insights needed to build with confidence.
                                    Whether you&#39;re presenting to investors or planning your MVP roadmap, a validated
                                    idea creates a solid foundation for growth, reduces risk, and accelerates your
                                    journey toward a successful launch.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'tier'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Membership Tier Design</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Monetisation strategy</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Pricing models</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User-centric plans</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Revenue growth</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Monetising your product effectively is essential to long-term sustainability and
                                    growth. We work closely with you to design pricing models that are not only flexible
                                    but also strategically aligned with your business goals and customer expectations.
                                    Whether you&#39;re launching a SaaS platform, a consumer-facing app, or an
                                    enterprise
                                    tool, we help identify the most effective approach—be it free trials, tiered
                                    subscriptions, pay-per-use, or freemium structures—to drive adoption and revenue
                                    simultaneously.<br/><br/>
                                    Our focus is on creating pricing strategies that evolve with your product and market
                                    positioning. By analysing user behaviour, competitive benchmarks, and industry
                                    trends, we ensure your monetisation model maximises lifetime value without
                                    sacrificing user experience. The result is a balanced, data-driven pricing framework
                                    that supports customer acquisition, retention, and scalable growth across all stages
                                    of your product lifecycle.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'okr'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>OKR & KPI Reporting</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance metrics</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User engagement</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Growth tracking</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data-driven insights</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    With our measurement and reporting service, you gain real-time visibility into how
                                    your MVP is performing across key metrics. We provide actionable insights into user
                                    engagement—tracking Daily Active Users (DAU), Monthly Active Users (MAU), retention
                                    rates, and churn—to help you understand exactly how users are interacting with your
                                    product. These data points give you a clear view of product traction and highlight
                                    opportunities for refinement.<br/><br/>
                                    Beyond engagement, we focus on the metrics that drive business growth. We track
                                    Customer Acquisition Cost (CAC), Average Revenue Per User (ARPU), conversion rates,
                                    feature adoption, and gather Net Promoter Score (NPS) feedback to ensure your MVP is
                                    delivering measurable value. With these insights, you can make informed decisions
                                    that optimise performance, validate your product-market fit, and accelerate your
                                    path to scalable growth.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                            </div>
                            <div className={`lg:mb-[25em] mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'cto'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Virtual CTO</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technical leadership</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Early-stage support</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategic growth</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Non-technical founders</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    For non-technical founders and early-stage businesses without in-house technical
                                    leadership, we provide virtual CTO services that offer expert guidance on all key
                                    technical decisions. Our experienced team works as an extension of your leadership,
                                    helping you navigate the complexities of product development, technology selection,
                                    and system architecture. We ensure that your technical strategy aligns with your
                                    business goals, empowering you to make informed, data-driven decisions without
                                    needing to hire a full-time CTO.<br/><br/>
                                    Whether you&#39;re building your MVP, scaling your infrastructure, or planning for
                                    future growth, our virtual CTO services ensure your technology evolves in tandem
                                    with your vision. We help you manage risk, optimise resources, and position your
                                    product for success by offering strategic insight and support at every stage of the
                                    journey, from initial concept to long-term scalability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Home */}
            <div className="relative w-full h-auto">
                <Image
                    src={'/assets/mvp/home.jpg'}
                    alt={'Home Image'}
                    width={1920}
                    height={1080}
                    id={'home image'}
                    className={`lg:-mt-[22em] relative max-w-full mx-auto w-full h-auto`}
                />
            </div>

            {/* Backend Technologies */}
            <div id={'backend technology'}
                 className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Header */}
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}
                    id={'tools'}>
                    <div>
                        <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tighter leading-[1.15] lg:pb-6'>
                            Back-end <br className={'lg:block md:block hidden'}/>technologies <br
                            className={'lg:block md:block hidden'}/>for
                            MVPs
                        </h2>
                    </div>
                    <div className='lg:-ml-[7.8em]'>
                        <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We will assist in identifying the best match during the discovery phase, since we offer a
                            number of proven and reliable technologies that are ideal for MVP development.
                        </p>
                    </div>
                </div>


                {/* Tools */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div id={'ruby'}
                         className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/mvp/ruby.svg' : '/assets/mvp/ruby1.svg'}
                                alt={'Ruby'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Ruby on Rails</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                A dynamic web application framework that prioritises “convention over configuration,”
                                enabling rapid development and clean, maintainable code. It’s ideal for startups and
                                growing teams looking to launch scalable products quickly and efficiently.
                            </p>
                            <Link href={'/services/Ruby-on-Rails'}
                                  className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Ruby on Rails Development</span>
                                </div>
                                <div
                                    className={`transition-all w-0 peer-hover:w-[12.3em] h-[0.0.05em] ${
                                        isDayTime ? 'bg-black' : 'bg-white'
                                    } absolute bottom-0 ease-out`}></div>
                            </Link>
                        </div>
                    </div>
                    <div id={'node'}
                         className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/mvp/node.svg' : '/assets/mvp/node1.svg'}
                                alt={'Node'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Node.js</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                A high-performance <Link href={'/services/Javascript'}
                                                         className={`border-b pb-[0.1em] ${
                                                             isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                         }`}>JavaScript</Link> runtime built on Chrome’s V8 engine,
                                enabling efficient
                                server-side scripting and scalable, real-time network applications. It’s ideal for
                                building fast, data-intensive solutions across distributed systems.
                            </p>
                            <Link href={'/services/Nodejs-Development'}
                                  className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Node.js Development</span>
                                </div>
                                <div
                                    className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                        isDayTime ? 'bg-black' : 'bg-white'
                                    } absolute bottom-0 ease-out`}></div>
                            </Link>
                        </div>
                    </div>
                    <div id={'next'}
                         className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/mvp/next.svg' : '/assets/mvp/next1.svg'}
                                alt={'Next'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Next.js</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                A powerful framework for building server-rendered <Link
                                href={'/services/Reactjs-Development'}
                                className={`border-b pb-[0.1em] ${
                                    isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                }`}>React</Link> applications,
                                offering improved performance, SEO optimisation, and a seamless development experience.
                                It&#39;s ideal for creating fast, scalable web applications with minimal configuration.
                            </p>
                            <Link href={'/services/Nextjs-Development'}
                                  className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Next.js Development</span>
                                </div>
                                <div
                                    className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                        isDayTime ? 'bg-black' : 'bg-white'
                                    } absolute bottom-0 ease-out`}></div>
                            </Link>
                        </div>
                    </div>
                    <div id={'laravel'}
                         className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                        <div className={'h-auto mt-3'}>
                            <Image
                                src={isDayTime ? '/assets/mvp/laravel.svg' : '/assets/mvp/laravel1.svg'}
                                alt={'Laravel'}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className={'lg:ml-0'}>
                            <h6 className={'text-[2em] font-[600] mb-2'}>Laravel</h6>
                            <p className={'text-[0.873em] text-justify'}>
                                A widely used <Link href={'/services/PHP-Development'}
                                                    className={`border-b pb-[0.1em] ${
                                                        isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                                    }`}>PHP</Link> framework that combines elegant syntax with powerful
                                features to streamline web application development. It offers built-in tools for
                                routing, security, and database management, making it ideal for building scalable and
                                maintainable applications efficiently.
                            </p>
                            <Link href={'/services/Laravel-Development'}
                                  className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Laravel Development</span>
                                </div>
                                <div
                                    className={`transition-all w-0 peer-hover:w-[9.8em] h-[0.0.05em] ${
                                        isDayTime ? 'bg-black' : 'bg-white'
                                    } absolute bottom-0 ease-out`}></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Frontend Tech */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-gray-50'}`}>
                <div id={'frontend tech'}
                     className={`relative py-24 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}
                        id={'tools'}>
                        <div>
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3.3em] font-[550] tracking-tighter leading-[1.15] lg:pb-6'>
                                Front-end <br className={'lg:block md:block hidden'}/>technologies <br
                                className={'lg:block md:block hidden'}/>for
                                MVPs
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                These are a few of the more widely used front-end technologies that we employ while
                                creating MVPs. We&#39;ll assist you in selecting the best option for your goods.
                            </p>
                        </div>
                    </div>


                    {/* Tools */}
                    <div
                        className={`relative  w-full h-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 lg:gap-[6em] md:gap-[4em] sm:gap-[3em] gap-[2em] lg:mt-[3em] md:mt-[2em] sm:mt-[1.5em] mt-[1em] ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div id={'javascript'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/mvp/js1.png' : '/assets/mvp/js.png'}
                                    alt={'Javascript'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Javascript</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A versatile and widely adopted programming language used to build dynamic,
                                    interactive web applications. As the backbone of modern web development, it enables
                                    rich user experiences across browsers and devices, powering everything from simple
                                    UI interactions to complex, data-driven applications.
                                </p>
                                <Link href={'/services/Javascript'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Javascript Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[11em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'React'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/mvp/react.svg' : '/assets/mvp/react1.svg'}
                                    alt={'React'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>React</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A leading JavaScript library for
                                    building <Link href={'/services/ui-ux-design'}
                                                   className={`border-b pb-[0.1em] ${
                                                       isDayTime ? 'border-gray-500 hover:border-white' : 'border-gray-500 hover:border-black'
                                                   }`}>UI</Link>, allowing developers to create reusable components and
                                    deliver fast, efficient rendering. It’s ideal for building scalable,
                                    high-performance web and mobile applications.
                                </p>
                                <Link href={'/services/Reactjs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>React.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[10em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'vue'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/mvp/vue.svg' : '/assets/mvp/vue1.svg'}
                                    alt={'Vue.js'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>Vue.js</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A progressive JavaScript framework for building user interfaces, known for its
                                    simplicity, flexibility, and ease of integration. It’s ideal for developing
                                    scalable, maintainable applications with a smooth learning curve and strong
                                    community support.
                                </p>
                                <Link href={'/services/Vuejs-Development'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>Vue.js Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[9.1em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                        <div id={'typescript'}
                             className={'relative grid grid-cols-[auto_1fr] gap-4 items-start border-b-[0.1em] border-gray-300/20 lg:pb-6 pb-4'}>
                            <div className={'h-auto mt-3'}>
                                <Image
                                    src={isDayTime ? '/assets/mvp/ts.png' : '/assets/mvp/ts1.png'}
                                    alt={'TypeScript'}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={'lg:ml-0'}>
                                <h6 className={'text-[2em] font-[600] mb-2'}>TypeScript</h6>
                                <p className={'text-[0.873em] text-justify'}>
                                    A strongly-typed superset of JavaScript that introduces static typing and advanced
                                    development features, improving code quality, scalability, and long-term
                                    maintainability in complex applications.
                                </p>
                                <Link href={'/services/Typescript'}
                                      className={"w-auto h-auto mt-4 transition-all hover:scale-up-center flex relative"}>
                                    <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-800 ' : 'border-gray-300'
                                    }`}>TypeScript Development</span>
                                    </div>
                                    <div
                                        className={`transition-all w-0 peer-hover:w-[11.3em] h-[0.0.05em] ${
                                            isDayTime ? 'bg-white' : 'bg-black'
                                        } absolute bottom-0 ease-out`}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle */}
            <div className="relative w-full h-auto">
                <Image
                    src={'/assets/mvp/mid.jpg'}
                    alt={'Middle Image'}
                    width={1920}
                    height={1080}
                    id={'mid image'}
                    className={`lg:-mt-[4em] relative max-w-full mx-auto w-full h-auto`}
                />
            </div>

            {/* Benefits of An MVP for Your Business */}
            <div id={'mvp benefit'}
                 className={`relative lg:top-10 py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] border-b`}>

                {/* Business Benefit Header */}
                <div className={`border-b-[0.1em] border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                    <div className={'grid lg;grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6'}>
                        <div>
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Benefits Of An MVP <br className={'lg:block md:block hidden'}/>For Your Business
                            </h2>
                        </div>
                        <div className={'lg:-ml-[1.2em] md:-ml-[1.2em]'}>
                            <p className={'text-[0.873em] font-[300] leading-[1.3] tracking-tight'}>
                                Your product development approach must include an MVP, which is not only for testing.
                                Here&#39;s why:
                            </p>
                        </div>
                    </div>
                </div>


                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div id={'cost efficiency'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/risk1.svg' : '/assets/mvp/icon1/risk.svg'}
                            alt={'Cost Efficiency'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Cost Efficiency
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            By starting with a focused feature set, you can significantly reduce development costs while
                            still delivering a meaningful product to market—one that solves real user problems and lays
                            the groundwork for future growth.
                        </p>
                    </div>
                    <div id={'faster time'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/fast1.svg' : '/assets/mvp/icon1/fast.svg'}
                            alt={'Faster Time To Market'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] capitalize md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Faster Time To Market
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Launching an MVP quickly allows you to get your product into users’ hands sooner, enabling
                            faster feedback, earlier validation, and a head start on refining your offering based on
                            real-world usage.
                        </p>
                    </div>
                    <div id={'feature prioritisation'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/feat1.svg' : '/assets/mvp/icon1/feat.svg'}
                            alt={'Feature Prioritisation'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            feature prioritisation
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            An MVP helps you identify which features users truly value, allowing you to prioritise
                            development based on real feedback and maximise the impact of future updates.
                        </p>
                    </div>
                    <div id={'risk reduction'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/risk1.svg' : '/assets/mvp/icon1/risk.svg'}
                            alt={'Risk Reduction'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            risk reduction
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Focusing on core features helps minimise the risk of building non-essential functionality,
                            allowing you to allocate time and resources where they deliver the most value.
                        </p>
                    </div>
                    <div id={'attract investment'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/attract1.svg' : '/assets/mvp/icon1/attract.svg'}
                            alt={'Attract Investment'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            attract investment
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            A well-executed MVP showcases real-world traction and validates your concept, giving
                            investors greater confidence in your product’s potential—and making it easier to secure
                            funding and support for future growth.
                        </p>
                    </div>
                    <div id={'test business'}>
                        <Image
                            src={isDayTime ? '/assets/mvp/icon1/test1.svg' : '/assets/mvp/icon1/test.svg'}
                            alt={'Test Business Ideas'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'capitalize lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Test Business Ideas
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            An MVP allows you to test your business model in real market conditions, gather actionable
                            feedback from users, and adapt your product and strategy to better meet their needs—reducing
                            risk and increasing your chances of long-term success.
                        </p>
                    </div>
                </div>
            </div>

            {/* MVP Industry Experience */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.2]`}>
                            MVP Industry <br className={'lg:block md:block hidden'}/>Experience
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            We’ve partnered with businesses across a range of industries to successfully launch MVPs
                            that validate ideas, attract users, and lay the foundation for scalable growth.
                        </p>
                    </div>
                </div>

                {/* Travels & Hospitality */}
                <div id={'travel'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight leading-[1.2] rounded-none'>
                            travels & hospitality
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mvp/travels.jpg'
                                alt='Travels & Hospitality'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We’ve developed MVPs for businesses in the travel industry, including intelligent booking
                            systems, personalised itinerary planners, and customer engagement tools—helping them test
                            concepts, attract users, and scale with confidence.
                        </p>
                    </div>
                </div>

                {/* Finance App */}
                <div id={'construction'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            construction
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mvp/construction.jpg'
                                alt='Construction'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We’ve built innovative digital solutions for the construction industry, such as project
                            management platforms, safety compliance apps, and cost-tracking tools—helping firms
                            streamline operations and enhance on-site efficiency.
                        </p>
                    </div>
                </div>

                {/* Healthcare Apps */}
                <Link href='/industries/fintech' id={'fintech'} className='relative'>
                    <div
                        className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                        <div className='relative'>
                            <h2 className='capitalize text-[1.75em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                                fintech
                            </h2>
                            <div
                                className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                                <Image
                                    src='/assets/mvp/finance.jpg'
                                    alt='FinTech'
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                        <div>
                            <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                                From streamlined payment solutions to robust compliance software, we’ve helped FinTech
                                startups build secure, scalable MVPs that drive user adoption and attract investor
                                funding.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Insurance */}
                <div
                    className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[1.75em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Insurance
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mvp/insurance.jpg'
                                alt='Insurance'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We’ve built MVPs for insurance startups delivering next-generation solutions, including
                            telematics-based products that enhance personalisation, risk assessment, and customer
                            engagement.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div
                className={`relative py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                <h1 className={'lg:text-5em] md:text-[4em] sm:text-[3em] text-[2em] font-[600] leading-[1.1]  mb-[0.6em]'}>
                    Your trusted <br className={'lg:block md:block hidden'}/>digital partner
                </h1>
                <p className={'text-[0.873em] font-[300] leading-[1.5] text-justify lg:pr-[33em] mb-10'}>
                    Have a vision but struggling to bring it to life? We specialise in transforming ideas into
                    actionable MVPs, helping you take the first step toward a successful product. Get in touch today to
                    explore how we can support your development journey and turn your concept into reality.
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
            </div>

            {/* Testimonials */}
            <div
                className={`relative lg:mt-14 md:mt-14 sm:mt-12 mt-8 py-24 lg:mb-16 mb-10 max-w-full w-full  h-auto ${
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
                            <p className="leading-tight border-b-[0.1em] border-gray-300/20 pb-12">
                                {message}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Image
                                src={image}
                                alt={name}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                            />
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

            {/* Stages of Our MVP Development Process */}
            <div id={'stages'}
                 className={`py-10 relative lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                {/* Stages Header */}
                <div className={`border-b-[0.1em]  border-gray-300/50 pb-[2em] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                    <div>
                        <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                            Stages of Our MVP <br className={'lg:block md:block hidden'}/>Development Process
                        </h2>
                        <p className={'text-[0.87em] font-[300]  leading-[1.5] tracking-tight'}>
                            Our process is strategically designed to align your MVP with both your product
                            vision and real market <br className={'lg:block md:block hidden'}/>demands—ensuring it
                            delivers value
                            from day one and sets the stage for future growth.
                        </p>
                    </div>
                </div>

                {/* X-Scroll */}
                <section ref={targetRef} className={"sticky top-0 lg:mt-[4em] md:mt-[3em] h-[250vh]"}>
                    <div
                        className="sticky top-2 flex h-[90vh] lg:-mt-32 w-full max-w-full items-center overflow-hidden">
                        <motion.div style={{x}} className="flex lg:gap-[15em] md:gap-[8em] gap-[5em]">
                            {[
                                {
                                    id: 1,
                                    subtitle: "01",
                                    title: "Market Research",
                                    description: (
                                        <>
                                            Before we begin development, we conduct comprehensive market research to
                                            gain a deep understanding of your target audience, industry landscape,
                                            competitors, and emerging trends. This foundational step enables us to
                                            uncover market gaps and opportunities, ensuring your MVP is not only
                                            relevant but strategically positioned for success. By aligning your
                                            product
                                            with user expectations and pain points early on, we reduce risk, improve
                                            product-market fit, and lay the groundwork for long-term growth and
                                            adoption.
                                        </>
                                    ),
                                },
                                {
                                    id: 2,
                                    subtitle: "02",
                                    title: "MVP Design",
                                    description: (
                                        <>
                                            Armed with research insights, our design team crafts intuitive,
                                            user-centric
                                            interfaces that focus on core functionality and seamless user
                                            experiences.
                                            We develop detailed wireframes and user flows to map out every
                                            interaction,
                                            ensuring clarity, ease of use, and alignment with real-world user
                                            behavior.
                                            This design phase prioritises both functionality and simplicity, laying
                                            a
                                            strong foundation for an MVP that not only looks great but delivers
                                            measurable value from the very first interaction.
                                        </>
                                    ),
                                },
                                {
                                    id: 3,
                                    subtitle: "03",
                                    title: "MVP Development",
                                    description: (
                                        <>
                                            Our development team brings your MVP to life by building the core
                                            functionality defined during the planning phase. We follow an agile,
                                            collaborative approach—working closely with designers, developers, and
                                            product managers to ensure every feature is implemented efficiently and
                                            aligns with your strategic goals. This flexible process allows us to
                                            adapt
                                            in real time, incorporate feedback, and make iterative improvements as
                                            needed—resulting in a high-quality MVP that’s ready for market
                                            validation.
                                        </>
                                    ),
                                },
                                {
                                    id: 4,
                                    subtitle: "04",
                                    title: "MVP Testing",
                                    description: (
                                        <>
                                            Once development is complete, we conduct thorough quality assurance
                                            using a
                                            combination of manual and automated testing methods to ensure your MVP
                                            is
                                            stable, secure, and fully functional. Our testing process is designed to
                                            identify and resolve any issues early, reducing the risk of post-launch
                                            disruptions. We also incorporate user feedback during this phase to
                                            fine-tune the experience, making sure the product is aligned with
                                            real-world
                                            expectations and ready for a confident market entry.
                                        </>
                                    ),
                                },
                                {
                                    id: 5,
                                    subtitle: "05",
                                    title: (
                                        <>
                                            Full Product <br className={'lg:block md:block hidden'}/> Development
                                        </>
                                    ),
                                    description: (
                                        <>
                                            After successful testing and user validation, we transition into full
                                            product development—building on the foundation of your MVP. At this
                                            stage,
                                            we focus on enhancing the user experience, expanding functionality, and
                                            integrating new features based on real user feedback and evolving
                                            business
                                            goals. Our team ensures the product is not only scalable and robust, but
                                            also strategically aligned to support long-term growth, market
                                            competitiveness, and sustained user engagement.
                                        </>
                                    ),
                                },
                            ].map((card) => (
                                <div
                                    key={card.id}
                                    className={`group relative h-[400px] w-[450px] overflow-hidden flex flex-col items-start justify-self-start text-start ${isDayTime ? 'text-black' : 'text-white'}`}
                                >
                                    <h3 className="text-[1em] font-[400] text-gray-500">{card.subtitle}</h3>
                                    <h2 className="sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[500] mt-4 leading-[1.1]">{card.title}</h2>
                                    <p className="text-[0.873em] font-[300] mt-4 text-justify">{card.description}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative lg:-mt-[12em] max-w-full lg:my-12 lg:mb-36 py-6 mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
                     isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
                    {partners.map((partner) => (
                        <div key={partner.id} className={`flex justify-center items-center`}>
                            <Image
                                src={`/assets/partners/${isDayTime ? partner.dayImage : partner.nightImage}`}
                                alt={partner.name}
                                width={100}
                                height={100}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* last */}
            <div className="relative w-full h-auto">
                <Image
                    src={'/assets/mvp/last.jpg'}
                    alt={'LastImage'}
                    width={1920}
                    height={1080}
                    id={'last image'}
                    className={`lg:-mt-[9em] relative max-w-full mx-auto w-full h-auto`}
                />
            </div>

            {/* Why Grey InfoTech for your app project */}
            <div className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto border-b-[0.001em] pb-2`}>
                    <div>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            Why Work With <br className={'lg:block md:block hidden'}/>Us For Your MVP
                        </h2>
                    </div>
                    <div className='lg:-ml-[8em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We bring a powerful mix of experience, technical expertise, and a customer-first
                            mindset—making us the right partner to turn your vision into a successful product.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`relative -mt-20 ${isDayTime ? 'bg-white' : 'bg-black'} w-full max-w-full lg:mb-16 lg:pb-28 pb-14 mb-12  px-6`}>
                <div
                    className='relative mx-auto px-4  grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-36'>
                    {/* Left Section */}
                    <div
                        className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-black' : 'text-white'} flex flex-col justify-center mb-4 lg:pl-4 lg:pr-[3em]`}>
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
                                    className={`relative pr-[6em] leading-[1.2] lg:text-[1.5em] text-[1em] mb-4 cursor-pointer transition-all ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'text-black font-bold'
                                                : 'text-white font-bold'
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
                                                initial={{opacity: 0, y: -20}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -20}}
                                                transition={{duration: 0.5, ease: "easeInOut"}}
                                                className={`relative inline-block ${
                                                    isDayTime ? 'text-black' : 'text-white'
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
                    <div className='lg:mt-[2em] h-auto w-full max-w-full sticky'>
                        {reasons[activeIndex - 1]?.images?.map((image, idx) => (
                            <Image
                                key={idx}
                                src={image}
                                alt={`Reason ${activeIndex} Image ${idx + 1}`}
                                fill
                                objectFit={'none'}
                                className="mb-4"
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

            {/* FAQ section */}
            <div id={'FAQ'} className={`relative lg:py-36 mb-16 ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            FAQ About MVPs
                        </h2>
                        <p className={'text-[0.83em] font-[300] '}>
                            When planning MVP development, choosing the right partner is key to achieving long-term
                            <br className={'lg:block md:block hidden'}/>success. A reliable provider helps you manage
                            costs
                            effectively, navigate each stage of <br className={'lg:block md:block hidden'}/>development
                            with
                            clarity, and leverage strategic services to validate your business idea—
                            <br className={'lg:block md:block hidden'}/>reducing risk and accelerating time to market.
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
                            <span>What is the difference between a prototype and a minimum viable product (MVP)?</span>
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
                                A prototype is a preliminary visual or interactive model designed to explore ideas and
                                gather feedback early in the design process. An MVP (Minimum Viable Product), on the
                                other hand, is a functional version of the product that includes core features, allowing
                                real users to test it in the market and provide valuable insights for further
                                development.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How much does it cost to build an MVP?</span>
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
                                The cost of developing an MVP varies based on the project’s scope, feature set, and
                                technical complexity. To provide an accurate estimate, we assess your unique
                                requirements—contact us for a personalised quote tailored to your business goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are some good examples of Minimum Viable Products?</span>
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
                                Dropbox, Uber, and Airbnb are well-known examples of successful MVPs—each began with a
                                minimal version of their product to validate demand, gather user feedback, and refine
                                their offering before scaling into globally recognised platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do you offer MVP app development services for enterprises?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, we provide MVP development services for both startups and established enterprises,
                                delivering scalable, secure, and market-ready solutions tailored to your specific
                                business objectives and growth strategy.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What features should be prioritised during the MVP development process?</span>
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
                                When prioritising MVP features, focus on those that directly solve your users’ most
                                critical problems and align with your product’s core purpose. Choose features that are
                                both technically feasible and essential to delivering immediate value. This approach not
                                only ensures early user engagement but also provides meaningful feedback to guide future
                                iterations and product growth.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>
                                In what ways do MVP development services <br
                                className={'lg:block md:block hidden'}/>differ from full-scale software development?
                            </span>
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
                                MVP development is centered on building a streamlined version of a product that includes
                                only the essential features needed to validate core assumptions and gather user
                                feedback. It allows businesses to test ideas quickly and cost-effectively. In contrast,
                                full-scale development involves creating a comprehensive solution with a complete
                                feature set, refined design, and robust infrastructure—requiring significantly more
                                time, investment, and strategic planning to support long-term scalability and
                                performance.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What considerations are critical when <br className={'lg:block md:block hidden'}/>selecting a provider for MVP development?</span>
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
                                Selecting the right MVP development provider is crucial to your product’s success. Look
                                for a team with proven expertise, a strong portfolio of relevant projects, and clear,
                                proactive communication. Equally important is their ability to understand your business
                                goals and translate them into a strategic development roadmap. An experienced provider
                                won&#39;t just execute your vision—they&#39;ll offer critical insights, anticipate
                                challenges,
                                and help refine your concept for maximum impact.
                            </p>
                        )}
                    </div>
                </div>
            </div>


            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default Mvp;