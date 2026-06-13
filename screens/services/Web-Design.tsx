'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import CountUp from "react-countup";
import {motion, useScroll, useTransform} from "framer-motion";


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

const WebDesign = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    // x-scroller
    const targetRef = useRef<HTMLDivElement | null>(null);
    const {scrollYProgress} = useScroll({target: targetRef});
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);


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

    // Web Design Solutions hook
    const handleScroll = () => {
        const sections = [
            "BWDS",
            "CMW",
            "RWD",
            "MFW",
            "WSUE",
            "WSUJ",
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

    // Web Hosting Hook
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
                    Web Design Agency
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    An experienced web design agency specializing in UX-focused, mobile-optimized, and fully responsive
                    websites tailored for performance and user engagement.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/wd/hero.jpg'}
                        alt={'Web Design Agency Hero'}
                        width={1536}
                        height={876}
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
                            Create websites that <br className={'lg:block md:block hidden'}/>captivate & convert
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.3] pb-6'>
                            Bespoke Web Design <br className={'lg:block md:block hidden'}/>Tailored To Your Vision
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    We believe that a well-crafted website is a powerful asset for business growth.
                                    That’s why our design process focuses not just on visual appeal, but also on
                                    performance, functionality, and user experience. We create responsive,
                                    mobile-optimised websites that are intuitive, fast, and aligned with your business
                                    goals—helping you attract, engage, and convert your audience more effectively. Our
                                    team blends creative design with technical expertise to ensure every solution we
                                    deliver is both beautiful and results-driven.
                                </p>
                            </div>
                            <div>
                                <p>
                                    Whether you&#39;re a startup launching your first digital product or an
                                    established <Link href={'/industries/e-commerce-development'}
                                                      className={`relative border-b pb-[0.01em] ${
                                                          isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                                      }`}>eCommerce</Link> business expanding into B2B, we offer a
                                    complete end-to-end service. From
                                    discovery and consultancy to planning, UX/UI design, development, hosting, and
                                    ongoing support, we’re with you every step of the way. Our collaborative approach
                                    means no hard sell—just thoughtful, strategic input and a can-do attitude focused on
                                    delivering value and long-term success for your business.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*f Top Image*/}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                    <div>
                        <Image
                            src={'/assets/wd/2.jpg'}
                            alt={'design1'}
                            width={800}
                            height={700}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/wd/1.jpg'}
                            alt={'design 2'}
                            width={800}
                            height={700}
                        />
                    </div>
                </div>
            </div>

            {/* Our Laravel Application Development Service */}
            <div className={`lg:pt-[2em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'react-development'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative mb-8 border-b-[1px] lg:pb-[4em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.1]`}>
                            Our Web Design Services
                        </h2>
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
                                    {id: "01", title: "Bespoke Web Design Service", target: "BWDS"},
                                    {id: "02", title: "Content Managed Website", target: "CMW"},
                                    {id: "03", title: "Responsive Web Design", target: "RWD"},
                                    {id: "04", title: "Mobile-First Website", target: "MFW"},
                                    {id: "05", title: "Website User Experience (UX)", target: "WSUE"},
                                    {id: "06", title: "Website User Journeys", target: "WSUJ"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[17em] md:mb-[17em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'BWDS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Bespoke Web Design Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Custom applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        Every project at Grey InfoTech begins with a blank canvas—no templates, no
                                        off-the-shelf designs. We take a tailored approach, creating custom websites
                                        that align precisely with your business goals. Our design team collaborates
                                        closely with you to bring your vision to life through detailed sketches,
                                        wireframes, mockups, and interactive prototypes that ensure clarity and
                                        alignment from the start.<br/><br/>
                                        Where needed, we go further by developing customer personas and mapping user
                                        journeys to optimise the user experience and drive desired outcomes. The result
                                        is not just a visually compelling website, but a strategic digital product that
                                        engages your audience and delivers measurable business value.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CMW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Content Managed Websites
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Content management system</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        The majority of the websites we build are powered by robust content management
                                        systems (CMS) like WordPress or Drupal, giving you full control over your
                                        digital presence. With an intuitive backend, you can easily update content,
                                        manage media and documents, run a blog, or even operate a full-featured
                                        eCommerce platform—all without needing technical expertise.<br/><br/>
                                        This flexibility empowers your team to keep the website current, dynamic, and
                                        aligned with your business goals. Whether you&#39;re publishing new content,
                                        launching a product, or responding to customer needs, your CMS puts the power in
                                        your hands.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RWD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Responsive Web Design</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Mobile friendly designs</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Responsive Web Design (RWD) ensures your website delivers an optimal viewing
                                        experience across all devices—desktop, tablet, or smartphone. It&#39;s not just
                                        about shrinking content to fit smaller screens, but strategically adapting
                                        layout, navigation, and functionality to match how users interact on each
                                        device.<br/><br/>
                                        At Grey InfoTech, we tailor your website’s content and structure to work
                                        seamlessly within this framework. By designing responsively, we help you provide
                                        a consistent, user-friendly experience that keeps visitors engaged, improves
                                        accessibility, and ultimately drives better business outcomes—regardless of how
                                        or where your customers access your site.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MFW'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Mobile-First Websites</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>SEO</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Responsive design isn’t just important for users—it’s critical for search engine
                                        performance. Search engines like Google prioritise mobile-friendly websites in
                                        their rankings and even highlight them in search results, influencing how easily
                                        potential customers can find and access your site. A responsive,
                                        mobile-optimised website is now a key factor in online visibility and SEO
                                        success.<br/><br/>
                                        At Grey InfoTech, we adopt a mobile-first approach to responsive design. This
                                        means we begin by optimising the experience for smaller screens, where user
                                        attention and space are limited, and then progressively enhance features for
                                        larger devices. This strategy ensures your website is fast, functional, and
                                        user-friendly across all devices, helping your business make a strong impression
                                        wherever your audience engages.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WSUE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Website User Experience (UX)</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive website</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Delivering an exceptional user experience isn’t just good design—it’s a business
                                        strategy. A website that’s intuitive, engaging, and easy to navigate helps
                                        convert visitors into customers, drives retention, and improves overall
                                        performance. When users can quickly find what they need and interact
                                        effortlessly with your content, it reflects positively on your brand and
                                        directly impacts your bottom line.<br/><br/>
                                        At Grey InfoTech, we take a strategic, data-informed approach to user
                                        experience. We study how your audience engages with your site—what they seek,
                                        how they navigate, and where they interact. This insight shapes every design
                                        decision, from layout and colour choices to call-to-action placement. By
                                        aligning digital design with user behaviour and business objectives, we create
                                        websites that don’t just look great—they deliver measurable results.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WSUJ'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Website User Journeys</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User journeys</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User engagement</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Understanding user journeys is essential to creating a website that truly serves
                                        your customers. By mapping out how users navigate your site—where they enter,
                                        what they’re looking for, and how they interact—we gain valuable insights into
                                        their behaviour and expectations. This clarity allows us to design experiences
                                        that feel intuitive and meet their needs at every step.<br/><br/>
                                        At Grey InfoTech, we strategically plan user journeys to align with your
                                        business goals. Whether it’s driving conversions, generating leads, or
                                        increasing engagement, we structure your site to guide visitors efficiently
                                        toward action. The result is a digital experience that not only meets user
                                        expectations but also maximises the value your online presence delivers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mid Image */}
            <div id={'mid'}
                 className={'relative lg:-mt-[28em] md:-mt-[28em] lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-2 h-auto md:grid-cols-2 grid-cols-1 gap-6'}>
                    <div>
                        <Image
                            src={'/assets/wd/4.jpg'}
                            alt={'design1'}
                            width={800}
                            height={700}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/wd/3.jpg'}
                            alt={'design 2'}
                            width={800}
                            height={700}
                        />
                    </div>
                </div>
            </div>

            {/* Web Hosting */}
            <div
                className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 mt-14`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className={`lg:text-[3em] md:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] lg:mb-12 mb-7 leading-[1.2]`}>
                            Web Hosting</h2>
                        <p className={'text-{0.8em] font-[200] leading-[1.2] tracking-normal text-justify'}>
                            We provides scalable, business-ready hosting solutions designed to support
                            companies of all sizes—from startups to large enterprises. Our offerings range from
                            affordable entry-level plans to high-performance, enterprise-grade infrastructure with
                            features like load balancing and high availability. Each solution is built for reliability,
                            security, and performance, ensuring your digital operations run smoothly while aligning with
                            your business objectives.
                        </p>
                    </div>
                    <div
                        className={`lg:-ml-5 md:-ml-5 border-t pt-4 relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(0)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Content Delivery Network (CDN)</span>
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
                                    A Content Delivery Network (CDN) is a strategic solution for improving website
                                    speed, performance, and reliability—key factors that impact user experience and
                                    business outcomes. By offloading static content such as images, videos, and media
                                    files to a global network of edge servers, a CDN reduces the load on your core
                                    infrastructure and accelerates content delivery to users worldwide. At Grey
                                    InfoTech, we evaluate your specific requirements and implement CDN and media hosting
                                    solutions that enhance site performance, support scalability, and ensure your
                                    digital platforms are optimised for growth.
                                </p>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(1)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Performance</span>
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
                                    In today’s fast-paced digital environment, you only have milliseconds to capture a
                                    user’s attention—making website performance critical to business success. At Grey
                                    InfoTech, we prioritise speed and reliability by leveraging advanced performance
                                    optimisation tools. From caching technologies like Redis, Memcached, and Varnish to
                                    server-side monitoring tools such as New Relic, we ensure your website runs
                                    efficiently, scales effectively, and delivers a seamless user experience that drives
                                    engagement and conversion.
                                </p>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(2)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Monitoring</span>
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
                                    &#34;Online&#34; should mean exactly that—your site is accessible at all times.
                                    That’s why we include uptime monitoring with all our hosting packages, ensuring any
                                    downtime is detected immediately. This allows our technical team to respond swiftly,
                                    minimising disruptions and protecting your business’s online presence and
                                    reputation.
                                </p>
                            )}
                        </div>
                        <div
                            className={`w-full border-b pb-4`}>
                            <button
                                onClick={() => toggleWeb(3)}
                                className="flex items-center justify-between w-full text-start lg:text-[1.5em] md:text-[1.5em] sm:text-base font-[500] focus:outline-none"
                            >
                                <span>Website Security</span>
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
                                    We prioritise website security to safeguard your digital assets against potential
                                    threats. By implementing robust protection measures—such as firewalls, regular
                                    updates, vulnerability scanning, and intrusion detection—we ensure your site remains
                                    secure, stable, and compliant. This proactive approach allows you to focus on your
                                    business with confidence, knowing your online platform is well-protected.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`${isDayTime ? 'bg-gray-500' : 'bg-gray-950'}`}>
                <div
                    className={`relative py-16 lg:mb-10 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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
                                className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-gray-300' : 'text-white group-hover:text-gray-800'}`}>
                            Start a project <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span
                                className={"absolute inset-0 border-[1px] border-gray-900 ${isDayTime ? 'border-black' : 'border-white'} rounded-full"}></span>
                        </button>
                    </Link>

                    {/* Countup */}
                    <div
                        className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}
                        id={'countup'}
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

            {/* Why Web Design */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div
                    className='relative grid lg:grid-cols-2 grid-cols-1 lg:my-[3em] my-[1em] lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-16 pb-6 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Design That Drives <br className={'lg:block md:block hidden'}/>Engagement and Growth
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Why Web Design?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    In today’s competitive digital landscape, web design is more than visual appeal—it
                                    is a core business asset. Your website often serves as the first and most lasting
                                    impression of your brand. A well-designed site communicates professionalism,
                                    credibility, and trust, all of which directly impact your ability to convert
                                    visitors into customers. Strategic web design combines user experience (UX),
                                    responsive layout, speed optimization, and strong branding to create an engaging
                                    online presence that supports your business goals. Whether you&#39;re a startup,
                                    enterprise, or growing brand, a high-performing website can help you attract new
                                    customers, showcase your offerings, and differentiate your business in crowded
                                    markets.
                                </p>
                            </div>
                            <div>
                                <p>
                                    From a business perspective, professional web design is a powerful driver of growth.
                                    It directly supports your digital marketing efforts—improving search engine
                                    rankings, lowering bounce rates, and increasing time-on-site. A strong web presence
                                    also enhances customer service through features like chatbots, easy navigation, and
                                    clear contact paths. Moreover, a custom-designed website allows for seamless
                                    integration with backend systems like CRMs, analytics tools, and marketing
                                    automation, streamlining operations and driving better decision-making. Investing in
                                    quality web design isn’t just a branding choice—it’s a strategic move to improve
                                    customer engagement, increase ROI, and future-proof your digital growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Website support and maintenance */}
            <div
                className={`relative lg:pt-[4em] md:pt-[4em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                <div
                    className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                    <div
                        className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                        <Image
                            src={'/assets/wd/wsm.jpg'}
                            alt={'Website support and maintenance'}
                            width={4650}
                            height={500}
                        />
                    </div>
                    <div
                        className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mr-[8em] md:mr-[8em] lg:mt-[4em] md:mt-[4em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2
                            className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-10 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                            Website support <br className={'lg:block md:block hidden'}/>and maintenance
                        </h2>
                        <p className='text-[0.85em] font-[300] tracking-normal text-justify leading-[1.5] '>
                            Our commitment to your success doesn’t end at launch. We offer a range of
                            tailored support and maintenance packages designed to ensure your website continues to
                            perform reliably, securely, and efficiently. From technical troubleshooting and bug fixes to
                            software updates and system monitoring, our team is available via phone or ticketing system
                            to respond promptly to your evolving needs. We also provide additional training to help your
                            team manage and update the site with confidence.<br/><br/>
                            Ongoing maintenance is essential to keeping your digital presence competitive and secure.
                            Our proactive approach includes regular security patches, performance optimisations, and
                            compatibility updates to safeguard your investment and minimise downtime. By partnering with
                            us for long-term support, you can focus on growing your business while we handle the
                            technical upkeep of your website.
                        </p>
                    </div>
                </div>
            </div>

            {/* Last image*/}
            <div id={'last-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wd/last.jpg'}
                    alt={'Last Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
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
                            Web design is a collaborative process that brings together creative and technical experts to
                            build a website that supports your business objectives and speaks to your
                            audience—regardless of industry. At the core of the team is a project manager who
                            coordinates timelines, client feedback, and overall direction. UI/UX designers shape the
                            look, feel, and usability of the website to ensure a smooth and engaging user experience
                            across all devices.<br/><br/>
                            Complementing this are front-end and back-end developers who turn design concepts into a
                            fully functional website, optimizing performance, responsiveness, and integration with other
                            systems. Depending on the project, content creators, SEO specialists, and quality assurance
                            testers may also be involved to ensure the website communicates clearly, ranks well, and
                            runs smoothly. The entire process is guided by your input, ensuring the final product is
                            aligned with your brand, goals, and customer needs.
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

            {/* Testimonials */}
            <div
                className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full  h-auto ${
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

            {/* Stages of our development process */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'development process'}
                     className={`lg:mt-[4em] md:mt-[4em] mt-[1.5em] relative lg:mb-[4em] md:mb-[4em] mb-[1.5em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Stages Of Our <br className={'lg:block md:block hidden'}/>Development Process
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                We don’t just build functional products—we craft digital experiences that captivate
                                users and drive meaningful results for your business.
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
                                                Discovery & Strategy
                                            </>
                                        ),
                                        description: (
                                            <>
                                                We begin by understanding your business, target audience, and goals.
                                                This forms the foundation for a strategy that aligns your website with
                                                your brand and objectives.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "Planning & Architecture",
                                        description: (
                                            <>
                                                We create a clear roadmap—defining the site structure, user journeys,
                                                and key features. Wireframes and sitemaps guide the user experience and
                                                functionality.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "Design & Branding",
                                        description: (
                                            <>
                                                Our design team brings your vision to life with custom UI/UX that
                                                reflects your brand, engages users, and ensures consistency across all
                                                devices.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 4,
                                        subtitle: "04",
                                        title: (
                                            <>
                                                Development
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Using modern, scalable technologies, we build responsive,
                                                high-performance websites with clean code and robust back-end systems.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 5,
                                        subtitle: "05",
                                        title: (
                                            <>
                                                Testing & Quality Assurance
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Before launch, we conduct thorough testing across browsers and devices,
                                                ensuring speed, security, and a seamless user experience.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 6,
                                        subtitle: "06",
                                        title: (
                                            <>
                                                Launch & Optimization
                                            </>
                                        ),
                                        description: (
                                            <>
                                                Once approved, we deploy your site with minimal disruption. Post-launch,
                                                we monitor performance and offer ongoing support and enhancements.
                                            </>
                                        ),
                                    },
                                ].map((card, index, array) => (
                                    <div
                                        key={card.id}
                                        className={`group relative h-[350px] w-[400px] overflow-hidden flex flex-col items-start justify-self-start text-start ${
                                            isDayTime ? 'text-black' : 'text-white'
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

            {/* NLast image*/}
            <div id={'nlast-image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/wd/nlast.jpg'}
                    alt={'NLast Image'}
                    width={1536}
                    height={900}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <br className={'lg:block md:block hidden'}/>Web Design Questions
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
                            <span>What kind of websites does Grey InfoTech design and build?</span>
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
                                Grey InfoTech designs and develops high-performing, custom websites tailored to support
                                specific business objectives. We create everything from corporate websites, product
                                landing pages, and e-commerce platforms to advanced web applications and internal
                                business portals. Each website is built with your brand, audience, and conversion goals
                                in mind.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How does web design help my business grow?</span>
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
                                A professionally designed website acts as your digital storefront—it&#39;s often the
                                first
                                point of contact for customers. A well-designed website improves brand perception,
                                enhances customer experience, builds credibility, and drives conversions. At Grey
                                InfoTech, we focus on design that not only looks great but also helps your business
                                achieve measurable outcomes like increased leads, sales, or engagement.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What industries do you work with?</span>
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
                                We work with startups, SMEs, and enterprises across a variety of sectors, including
                                technology, logistics, education, healthcare, finance, real estate, and professional
                                services. Our team adapts design and functionality to meet the specific needs and
                                expectations of your industry and customers.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is included in Grey InfoTech’s web design service?</span>
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
                                <p>Our web design service includes:</p>
                                <br/>
                                <ul className={'list-disc ml-4 mb-4'}>
                                    <li className={'mb-2'}>UI/UX strategy and responsive design
                                    </li>
                                    <li className={'mb-2'}>Custom layout development
                                    </li>
                                    <li className={'mb-2'}>SEO-friendly structure
                                    </li>
                                    <li className={'mb-2'}>CMS integration (e.g., WordPress, Webflow, or custom-built)
                                    </li>
                                    <li className={'mb-2'}>Performance optimization
                                    </li>
                                    <li className={'mb-2'}>Cross-browser and mobile responsiveness
                                    </li>
                                    <li className={'mb-2'}>Launch support and basic training
                                    </li>
                                </ul>
                                <p>We also offer optional add-ons like e-commerce integration, animations, multilingual
                                    support, and content development.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to design and launch a website?</span>
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
                                Timelines vary depending on the project scope. A simple website with standard features
                                can be delivered in 3 to 4 weeks, while larger or custom-built sites with advanced
                                integrations may take 8 to 20+ weeks. We provide clear timelines after our initial
                                discovery and planning phase.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How much does it cost to design a website with Grey InfoTech?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <div
                                className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                <p>Website design costs depend on project requirements, content volume, features, and
                                    level of customization. Instead of one-size-fits-all pricing, we offer custom quotes
                                    based on your specific business goals and budget. As a general guide:</p>
                                <br/>
                                <ul className={'list-disc ml-4 mb-4'}>
                                    <li className={'mb-2'}><span className={'font-[500]'}>Basic websites</span> start
                                        from a client-recommended range
                                    </li>
                                    <li className={'mb-2'}><span
                                        className={'font-[500]'}>Custom business websites</span> with advanced features
                                        are quoted based on your scope
                                    </li>
                                    <li className={'mb-2'}><span
                                        className={'font-[500]'}>E-commerce or portal-style platforms</span> are priced
                                        after a discovery consultation
                                    </li>
                                </ul>
                                <p>We ensure all costs are transparent and aligned with the value delivered.</p>
                            </div>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Will my website be mobile-friendly and responsive?</span>
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
                                Yes, all websites we design are mobile-responsive by default. We ensure your site
                                delivers an excellent user experience on smartphones, tablets, laptops, and
                                desktops—supporting all major browsers and devices.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can you redesign my existing website?</span>
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
                                Absolutely. We offer website redesign services that improve performance, update the user
                                interface, and modernize your brand’s online presence—while keeping what’s working and
                                upgrading what’s not. Redesign projects are treated with the same strategic care as new
                                builds.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Will I be able to manage and update the website myself?</span>
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
                                Yes. If you opt for a CMS-powered website (such as WordPress), we provide easy-to-use
                                admin tools and training so your team can update content, images, blogs, and
                                more—without needing technical expertise.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Do you provide hosting, maintenance, and support?</span>
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
                                We do. Grey InfoTech offers optional hosting and post-launch maintenance packages that
                                include website backups, security updates, performance optimization, bug fixes, and
                                priority support. This helps ensure your site stays fast, secure, and up-to-date.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Why choose Grey InfoTech for web design?</span>
                            {onIndex === 10 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 10 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                With over a decade of experience building tailored digital solutions, Grey InfoTech
                                combines modern design principles with business strategy. Our design team works closely
                                with you to create a site that reflects your brand, serves your goals, and stands out in
                                a competitive online market. We don’t just design websites—we build digital assets that
                                perform.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default WebDesign;