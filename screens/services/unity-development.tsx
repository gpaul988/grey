'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from 'next/link';
import {AnimatePresence, motion} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";


// Reasons
const reasons = [
    {
        id: 1,
        title: 'Experience Meets Innovation',
        description: (
            <>
                Our team comprises seasoned professionals who have refined their skills through years of real-world,
                hands-on experience. This depth of expertise means you gain more than just technical capability—you
                benefit from strategic insight and a problem-solving mindset that only comes from experience. We
                understand the Unity engine inside and out, enabling us to maximise its capabilities and push creative
                and technical boundaries. Whether it’s developing high-performance games, immersive VR experiences, or
                scalable multiplayer systems, we deliver solutions that are not only innovative but also commercially
                viable in today’s competitive gaming landscape.
            </>
        ),
        images: ['/assets/unity/exp.jpg']
    },
    {
        id: 2,
        title: 'Creating Outstanding Games',
        description: (
            <>
                With Grey InfoTech as your partner, you gain access to a deep well of technical expertise, creative
                innovation, and global industry insight. We collaborate closely with you to transform your ideas into
                games that don’t just meet expectations—they exceed them. Our goal is to deliver experiences that
                captivate users and drive commercial success, setting new benchmarks for quality and performance in the
                gaming world.
            </>
        ),
        images: ['/assets/unity/creat.jpg']
    },
    {
        id: 3,
        title: 'Mastery Of Unity Technologies',
        description: (
            <>
                Our deep expertise in Unity technologies allows us to fully harness its capabilities—from delivering
                stunning visuals to optimising game performance. We leverage Unity’s robust features to craft engaging,
                scalable, and high-performing games that align with your goals. With Grey InfoTech, your vision is
                transformed into a seamless, immersive experience that exceeds expectations and drives results.
            </>
        ),
        images: ['/assets/unity/mast.jpg']
    },
    {
        id: 4,
        title: 'An Array Of Opportunities',
        description: (
            <>
                Our collaborations with renowned companies have expanded our perspective, exposing us to diverse
                industry challenges and cutting-edge technologies. This experience sharpens our approach to game
                development, enabling us to deliver innovative, future-ready solutions that align with evolving market
                demands and set new benchmarks in the industry.
            </>
        ),
        images: ['/assets/unity/arr.jpg']
    },
];

const UnityDevelopment = () => {
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
            "2D",
            "3D",
            "MG",
            "WBG",
            "IE",
            "EGE",
            "UNR",
            "EGCP",
            "VRAR",
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

    // Why Work hook
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);

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
                    Unity <br className={'lg:block md:block hidden'}/> Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Our deep expertise in Unity technologies allows us to fully leverage its capabilities to deliver
                    scalable, high-quality solutions that align with our <br
                    className={'lg:block md:block hidden'}/>clients&#39; business goals.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/unity/hero.jpg'}
                        alt={'Unity Development Hero'}
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
                        <h6 className='constant-text uppercase lg:text-[0.8em] text-[0.8em] lg:font-[600] font-[600] lg:tracking-wider tracking-tight'>
                            Streamlined unity <br className={'lg:block md:block hidden'}/>development
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='capitalize lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Looking for a Unity <br className={'lg:block md:block hidden'}/>development company?
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    You’ve found the right partner to unlock the full potential of Unity’s powerful
                                    platform. Unity stands out for its seamless cross-platform capabilities, robust
                                    physics engine, and state-of-the-art graphics features, making it ideal for
                                    developing immersive games and sophisticated applications that perform flawlessly
                                    across devices. Leveraging Unity allows us to rapidly prototype ideas and accelerate
                                    development timelines without compromising on quality or innovation. We understand
                                    that in today’s competitive market, speed and precision are critical — that’s why
                                    every pixel and line of code we write is meticulously crafted to bring your vision
                                    to life with the highest standards of performance and user experience. At Grey
                                    InfoTech, we don’t just use Unity as a tool; we harness it as a strategic asset that
                                    opens the door to endless possibilities, helping your business deliver captivating
                                    digital experiences that engage audiences, drive growth, and stand out in the
                                    marketplace.
                                </p>
                            </div>
                            <div>
                                <p>
                                    At Grey InfoTech, we’re not just developers—we’re your dedicated creative and
                                    technology partner, committed to transforming your ideas into powerful,
                                    fully-fledged experiences that captivate users and deliver real business impact.
                                    With deep expertise in cross-platform development, especially using technologies
                                    like Unity, we bring together creativity, strategy, and technical excellence to
                                    craft solutions that are not only visually stunning but also scalable and
                                    performance-driven. Whether you’re launching a game, an interactive application, or
                                    an enterprise-grade tool, we ensure your product stands out across all
                                    platforms—delivered faster than you thought possible and aligned perfectly with your
                                    business goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Images */}
            <div id={'top'}
                 className={'relative lg:max-w-full w-full py-16 mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'}>
                <div className={'relative grid lg:grid-cols-4 h-auto md:grid-cols-4 grid-cols-1 gap-6'}>
                    <div className={'h-auto w-full max-w-full'}>
                        <Image
                            src={'/assets/unity/1.jpg'}
                            alt={''}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/unity/2.jpg'}
                            alt={''}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/unity/3.jpg'}
                            alt={''}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div>
                        <Image
                            src={'/assets/unity/4.jpg'}
                            alt={''}
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>

            {/* Unity Development Solutions */}
            <div className={`lg:-mt-[3em] md:-mt-[3em] lg:pt-[2em]  ${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div id={'development service'}
                     className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative border-b pb-[1em] border-gray-500 grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto`}>
                        <div>
                            <h2 className='lg:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                                Our Unity <br className={'lg:block md:block hidden'}/>development <br
                                className={'lg:block md:block hidden'}/>solutions
                            </h2>
                        </div>
                        <div className='lg:-ml-[8em]'>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                At Grey InfoTech, we use Unity to build immersive, cross-platform applications and games
                                that support real business goals—from user engagement to training, marketing, or product
                                innovation. With advanced graphics, real-time rendering, and rapid prototyping, we help
                                you bring ideas to life quickly and effectively.
                                <br/><br/>
                                Whether you need an interactive experience, AR/VR solution, or a custom simulation, our
                                Unity development is focused on delivering measurable value at speed and scale.
                            </p>
                        </div>
                    </div>
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
                                    {id: "01", title: "2D Unity Games", target: "2D"},
                                    {id: "02", title: "3D Unity Games", target: "3D"},
                                    {id: "03", title: "Mobile Games", target: "MG"},
                                    {id: "04", title: "Web-Based Games", target: "WBG"},
                                    {id: "05", title: "Immersive Experiences", target: "IE"},
                                    {id: "06", title: "Elevate The Gaming Experiences", target: "EGE"},
                                    {id: "07", title: "Unlocking New Realities With Grey InfoTech", target: "UNR"},
                                    {id: "08", title: "Enhancing Gameplay, Creating Presence", target: "EGCP"},
                                    {id: "09", title: "Virtual Reality & Augmented Reality", target: "VRAR"},
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
                        <div className={'lg:-ml-[7em] lg:mb-[23em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'2D'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>2D Unity Games</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>2D game development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Classic game inspiration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Platformers and puzzles</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        At Grey InfoTech, we specialise in building impactful 2D Unity games that serve
                                        both entertainment and strategic business goals. From educational tools and
                                        branded mini-games to platformers and interactive storytelling, our 2D titles
                                        are designed to engage users, reinforce brand identity, and deliver measurable
                                        results. Drawing inspiration from industry-defining classics like Pac-Man, Sonic
                                        the Hedgehog, and Mario, we blend nostalgic appeal with modern gameplay
                                        mechanics to create memorable experiences. Whether you&#39;re a startup looking
                                        to launch an educational app or a brand seeking a new way to connect with
                                        audiences, we bring your vision to life with creativity, technical excellence,
                                        and a clear business focus. Our Self Learn Read and Spell game is just one
                                        example of how we transform game concepts into purposeful, high-quality digital
                                        products.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'3D'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>3D Unity Games</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>3D game development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>RPGs and open worlds</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Multi-platform gaming</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Discover the full potential of 3D Unity game development with Grey InfoTech,
                                        where creativity meets cutting-edge technology. We specialise in building
                                        immersive, visually compelling experiences that span a wide range of genres—from
                                        action-packed RPGs and simulations to expansive open-world adventures. Our
                                        development process is driven by a clear understanding of your audience and
                                        business goals, ensuring the final product not only looks impressive but
                                        delivers tangible value. Inspired by industry-defining titles like Skyrim and
                                        The Witcher 3, we blend high-performance design, engaging storytelling, and
                                        responsive gameplay to create memorable experiences that keep users coming back.
                                        Whether you&#39;re launching a new entertainment venture, expanding into
                                        interactive media, or seeking to strengthen customer engagement through
                                        gamification, our Unity-based 3D solutions are fully scalable and optimised for
                                        mobile, PC, VR, and console platforms. At Grey InfoTech, we don’t just build
                                        games—we help you create market-ready products that stand out and drive results.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'MG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Mobile Games</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Unity mobile development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>iOS and Android games</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market-dominating apps</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Mobile gaming is a rapidly expanding global industry, and at Grey InfoTech, we
                                        leverage Unity’s powerful cross-platform capabilities to deliver high-quality
                                        mobile games tailored for both <Link
                                        href={'/services/ios-development'}
                                        className={`border-b pb-[0.05em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>iOS</Link> and
                                        Android devices. As a seasoned Unity mobile game development partner, we combine
                                        creative innovation with technical expertise to transform your concepts into
                                        captivating, user-friendly games designed to engage and retain players. Our
                                        approach prioritizes scalable architecture, seamless performance, and
                                        monetization strategies to help your game achieve commercial success in a highly
                                        competitive market. From initial idea and prototyping through development,
                                        testing, and launch, we work closely with you to align the game’s design and
                                        features with your business objectives—whether that’s maximizing user
                                        acquisition, increasing in-app revenue, or building long-term brand loyalty.
                                        With Grey InfoTech, you get a reliable partner committed to delivering
                                        compelling mobile gaming experiences that drive growth, generate revenue, and
                                        expand your reach to millions of players worldwide.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'WBG'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Web-Based Games</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cross-platform web games</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Unity-powered development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Monetisation and analytics integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        <Link
                                            href={'/services/Web-Application'}
                                            className={`border-b pb-[0.05em] ${isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'}`}>Web-based</Link> gaming
                                        is experiencing rapid growth, and Unity’s powerful, flexible platform offers
                                        unparalleled opportunities to deliver engaging, accessible experiences to a wide
                                        audience. At Grey InfoTech, we specialize in creating Unity-powered web games
                                        that run seamlessly across all devices and browsers, ensuring maximum reach and
                                        user accessibility. Our expertise goes beyond just building captivating gameplay
                                        — we integrate advanced monetization strategies and comprehensive analytics
                                        tools, empowering you to monitor game performance, understand user behavior, and
                                        optimize revenue streams effectively. Whether your goal is to develop addictive
                                        puzzle games, realistic simulations, or rich narrative-driven experiences, we
                                        work closely with you to transform your ideas into high-quality, scalable
                                        products that deliver exceptional user engagement and measurable business
                                        impact. With a strong focus on performance, security, and user experience, Grey
                                        InfoTech is your trusted partner for leveraging web-based gaming as a dynamic
                                        channel to grow your brand and achieve sustainable success in the digital
                                        marketplace.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Immersive Experiences</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Immersive gameplay</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Unity environments</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>VR storytelling</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Immersive experiences in gaming go far beyond traditional play by placing users
                                        directly inside dynamic, interactive worlds where they are not just observers
                                        but active participants shaping the narrative and environment. At Grey InfoTech,
                                        we leverage Unity’s advanced capabilities to build richly detailed, responsive
                                        game environments that adapt seamlessly to player actions, creating deeper
                                        engagement and stronger emotional connections. This level of immersion increases
                                        user retention, drives higher player satisfaction, and ultimately boosts
                                        monetization opportunities. Furthermore, with the rise of Virtual Reality (VR),
                                        we create fully immersive digital realms that transport players into entirely
                                        new dimensions, offering experiences that feel real and captivating. By
                                        integrating VR technology, we help businesses differentiate their products in a
                                        crowded market, attracting a broader audience and opening up innovative revenue
                                        streams. Our business-focused approach ensures that every immersive experience
                                        we design aligns with your strategic goals, maximizing return on investment
                                        while delivering cutting-edge entertainment that resonates with your target
                                        market.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EGE'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Elevate The Gaming Experience</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Industry innovation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>VR and AR applications</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive technology</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        The reach of VR and AR technologies goes far beyond gaming, fundamentally
                                        transforming a wide range of industries including education, healthcare,
                                        architecture, marketing, retail, and manufacturing. These immersive technologies
                                        are reshaping how businesses engage with their customers, train employees, and
                                        visualize complex data or designs. For example, apps like the Dulux Visualizer
                                        enable customers to see paint colors in real time before making a purchase,
                                        while automotive brands like Ford use AR to explore and refine 3D car models
                                        during the design process. At Grey InfoTech, we leverage this transformative
                                        potential to develop tailored VR and AR solutions that meet your specific
                                        business needs. Whether it’s creating immersive training simulations,
                                        interactive product demonstrations, virtual showrooms, or innovative marketing
                                        campaigns, we focus on delivering scalable, user-centric experiences that drive
                                        measurable results. Our expert team combines deep technical knowledge with a
                                        clear understanding of your industry challenges to ensure your investment in VR
                                        and AR technologies translates into enhanced customer engagement, operational
                                        efficiencies, and a meaningful competitive advantage in today’s digital economy.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'UNR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>Unlocking New Realities With Grey
                                        InfoTech</h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cutting-edge gaming</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interactive worlds</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>VR and AR game development</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        At Grey InfoTech, we leverage the full potential of Unity to develop
                                        cutting-edge VR and AR games that go beyond traditional gameplay to create
                                        deeply immersive, interactive experiences. Our skilled team designs virtual and
                                        augmented reality environments tailored to your business objectives, ensuring
                                        that every project not only captivates users but also delivers measurable
                                        value—whether through enhanced customer engagement, innovative training
                                        solutions, or powerful marketing tools. As VR and AR technologies rapidly evolve
                                        and reshape industries such as gaming, education, healthcare, real estate, and
                                        retail, we partner with you to craft scalable, future-proof applications that
                                        elevate your brand and drive growth. From concept through development and
                                        ongoing support, Grey InfoTech provides strategic insight and technical
                                        expertise to bring your vision to life with seamless performance, intuitive
                                        design, and cutting-edge features that position your business at the forefront
                                        of digital innovation.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EGCP'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Enhancing Gameplay, Creating Presence
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Player immersion</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Sensory engagement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless gameplay</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Immersive gameplay engages all the senses, drawing players deeply into the game
                                        world whether they’re dodging virtual obstacles, exploring richly detailed
                                        landscapes, or battling challenging foes. This heightened sense of presence
                                        creates a powerful emotional connection between the player and the experience,
                                        leading to increased engagement, longer play sessions, and stronger brand
                                        loyalty. At Grey InfoTech, we specialize in designing Unity-based games that
                                        prioritize immersion at every level — from cutting-edge visuals and realistic
                                        physics to dynamic sound design and intuitive controls. Our team carefully
                                        crafts every element to ensure the gameplay feels natural, responsive, and
                                        emotionally resonant. By focusing on these aspects, we deliver unforgettable
                                        experiences that captivate your audience and maximize user retention. Whether
                                        developing action-packed adventures, narrative-driven titles, or complex
                                        simulations, Grey InfoTech blends creativity with technical expertise to bring
                                        your vision to life and help you stand out in a competitive market
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>09/
                                </div>
                                <div className={`${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'VRAR'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Virtual Reality & Augmented Reality
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bespoke VR/AR solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Unity game expertise</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Physical-digital integration</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        VR and AR technologies are fundamentally transforming the gaming industry by
                                        merging physical reality with immersive digital environments, offering players
                                        unprecedented levels of interaction and engagement. At Grey InfoTech, we
                                        leverage our deep expertise in Unity to develop custom VR and AR games that go
                                        beyond traditional gameplay, delivering rich, fully immersive experiences
                                        tailored to your unique vision and audience. We push the boundaries of
                                        innovation to create interactive worlds that respond dynamically to player
                                        actions, ensuring every moment is engaging and meaningful. Our approach focuses
                                        on combining cutting-edge technology with creative design to produce games that
                                        captivate users, boost retention, and drive market success. As VR and AR
                                        continue to expand across not only gaming but also education, healthcare,
                                        architecture, and marketing, Grey InfoTech is your strategic partner for
                                        harnessing these technologies to create impactful, future-proof experiences that
                                        differentiate your brand and deliver measurable business value.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'lg:-mt-[20em] h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/unity/ani.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* The benefits of Unity game development services */}
            <div
                className={`relative max-w-full w-full py-16 lg:mt-[3em] md:mt-[3em] mx-auto h-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 border-b-[1px] lg:pb-[3em] pb-[2em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                    <div>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] justify-center tracking-tight leading-[1.2]'>
                            The benefits <br className={'lg:block md:block hidden'}/>of Unity game <br
                            className={'lg:block md:block hidden'}/>development services
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.87em] font-[300] justify-center tracking-normal text-justify leading-[1.3] lg:-ml-[1.2em] md:-ml-[1.2em]'>
                            Unity is a leading choice in game development, renowned for its versatility and
                            comprehensive feature set. It combines a user-friendly interface with powerful scripting
                            capabilities and cross-platform support, enabling developers to build and deploy games
                            efficiently. The Unity Asset Store offers a vast library of ready-made assets and plugins,
                            streamlining production and reducing development time. Real-time previews, advanced graphics
                            rendering, and a strong developer community further contribute to its appeal. With the
                            ability to export to mobile, console, and PC platforms, Unity empowers developers to reach a
                            wide audience, solidifying its position as a top-tier game engine.
                        </p>
                    </div>
                </div>
                <div
                    className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 lg:mb-8 mb-8'>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/cross.svg' : '/assets/unity/icon/cross1.svg'}
                            alt='Cross-platform games development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Cross-platform <br className={'lg:block md:block hidden'}/>games development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity’s support for over 25 platforms allows developers to build once and deploy across
                            mobile, desktop, console, web, and AR/VR devices—maximising reach and revenue potential.
                            With flexible plans like Unity Personal, Pro, and Enterprise, businesses of all sizes can
                            access the tools they need at the right scale. The Unity Asset Store further accelerates
                            development with a vast library of ready-to-use assets and tools, helping teams reduce costs
                            and speed up time-to-market. For companies aiming to deliver engaging, cross-platform
                            experiences efficiently, Unity offers a robust and scalable solution.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/mult.svg' : '/assets/unity/icon/mult1.svg'}
                            alt='Multiplayer Support'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Multiplayer support
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity’s robust multiplayer capabilities empower developers to build scalable,
                            high-performance systems that connect players in real-time across the globe. With built-in
                            support for cross-platform play, Unity enables seamless interaction between users on mobile,
                            PC, consoles, and web—creating a unified and inclusive gaming ecosystem. More than just
                            connectivity, Unity’s multiplayer tools are designed to enhance player engagement by
                            fostering collaboration, competition, and lasting community bonds. For businesses, this
                            translates into higher user retention, increased monetisation opportunities, and a broader
                            market reach.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/acc.svg' : '/assets/unity/icon/acc1.svg'}
                            alt='Accelerated games development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Accelerated game <br className={'lg:block md:block hidden'}/>development </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity streamlines the entire game development lifecycle, enabling creators to move rapidly
                            from concept to launch with maximum efficiency. Its powerful engine, intuitive interface,
                            and comprehensive suite of development tools help reduce production time while maintaining
                            high performance and visual quality. Whether building casual mobile games or complex,
                            AAA-style experiences, Unity supports all genres and scales, making it an ideal solution for
                            businesses looking to accelerate time-to-market and maximise ROI without compromising on
                            creativity or functionality.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/mult.svg' : '/assets/unity/icon/mult1.svg'}
                            alt='AR & VR Support'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            AR & VR support</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity leads the way in AR and VR game development, providing advanced tools and workflows
                            that empower developers to build rich, immersive experiences across industries. With over
                            60% of AR and VR content powered by Unity 3D, the platform stands as a market leader in
                            shaping the future of interactive technology. Its real-time rendering capabilities,
                            cross-platform support, and robust development ecosystem enable businesses to create
                            cutting-edge applications—from immersive training simulations and virtual showrooms to
                            next-generation gaming—helping them stay ahead in a rapidly evolving digital landscape.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/enh.svg' : '/assets/unity/icon/enh1.svg'}
                            alt='Enhanced Customisation'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] font-[600] mb-2'>
                            Enhanced customisation</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity’s flexibility empowers developers to fully customise games and interactive experiences
                            to align with their creative and strategic vision. Whether fine-tuning physics engines for
                            realistic gameplay, designing bespoke shaders for unique visual styles, or integrating
                            third-party plugins to extend functionality, Unity provides the freedom and control required
                            for innovation. This adaptability makes it the ideal choice for businesses seeking tailored
                            game development solutions that stand out in a competitive market while delivering precise,
                            high-quality results.
                        </p>
                    </div>
                    <div className={`mt-12 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <Image
                            src={isDayTime ? '/assets/unity/icon/cost.svg' : '/assets/unity/icon/cost1.svg'}
                            alt='Cost Efficiency For Development'
                            width={60}
                            height={60}
                            className='mb-2'
                        />
                        <h3 className='capitalize text-[1.5em] leading-[1.2] font-[600] mb-2'>
                            Cost-efficiency <br className={'lg:block md:block hidden'}/>for development</h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unity offers cost-effective development solutions that are especially beneficial for
                            startups and small to medium-sized teams. With flexible licensing options like Unity
                            Personal, and access to a vast Asset Store filled with ready-made assets, tools, and
                            templates, developers can significantly reduce production costs without compromising on
                            quality. This allows businesses to focus their resources on creativity, rapid prototyping,
                            and innovation, ensuring faster time to market and better return on investment.
                        </p>
                    </div>
                </div>
            </div>

            {/* Unlocking tomorrow’s gaming possibilities today */}
            <div id={'unlocking'} className={`relative ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:max-w-[90em] py-14 mx-auto px-4 sm:px-6 lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div>
                        <h2 className={'lg:text-[3em] text-[1.5em] font-[500] tracking-tight leading-[1.1] lg:pb-6 capitalize'}>
                            unlocking <br className={'lg:block md:block hidden'}/>gaming potential<br
                            className={'lg:block md:block hidden'}/>of tomorrow now
                        </h2>
                    </div>
                    <div className='lg:-ml-[3.5em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] text-justify leading-[1.5]'>
                            In the dynamic world of Unity game development, the future is already unfolding—and at Grey
                            InfoTech, we&#39;re here to help you lead it. Whether you&#39;re building cross-platform
                            games,
                            immersive VR/AR experiences, or exploring the Metaverse, we combine technical expertise with
                            creative vision to bring your ideas to life. Our tailored development solutions are designed
                            to help you break into new markets, captivate users, and build lasting digital experiences
                            across mobile, console, and web platforms. With Unity’s powerful engine and flexible
                            toolset, we accelerate time-to-market while ensuring high performance and visual fidelity.
                            As your strategic development partner, we’re invested in your success—helping you unlock new
                            business opportunities, outpace the competition, and shape the future of interactive media.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reasons to partner with Grey InfoTech */}
            <div className={`${isDayTime ? 'bg-gray-50' : 'bg-gray-950'}`}>
                <div
                    className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-20 mb-12 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative lg:max-w-full mx-auto border-b-[0.001em] pb-2`}>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tight leading-[1.1] lg:pb-6'>
                            Reasons to partner <br className={'lg:block md:block hidden'}/>with Grey InfoTech
                        </h2>
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
                                                ? 'bg-gray-50 py-5'
                                                : 'bg-gray-950 py-5'
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

            {/* Who is involved in the process */}
            <div id={'involved'}
                 className={`relative py-16 px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                     isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:max-w-full mx-auto`}>
                    <div className={'lg:mr-[8em]'}>
                        <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 '>
                            who is involved <br className={'lg:block md:block hidden'}/>in the process
                        </h2>
                        <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                            Every successful project starts with a thoughtful discovery phase. We engage closely with
                            your key stakeholders—executives, IT leaders, project sponsors, and end-users—to align on
                            business goals, clarify priorities, and uncover essential insights that shape the direction
                            of the solution.<br/><br/>
                            Our team—typically including a business analyst, product and project
                            managers, <Link href={'/services/ui-ux-design'}
                                            className={`border-b pb-[0.02em] ${
                                                isDayTime ? 'border-gray-500 hover:border-black' : 'border-gray-500 hover:border-white'
                                            }`}>UX/UI designer</Link>, and technical leads—works to understand your
                            requirements, assess technical feasibility, and define the right approach. This ensures
                            we’re solving the right problems in the most effective way.<br/><br/>By fostering close
                            collaboration early, we reduce risk, streamline development, and create a clear path
                            forward. This process sets the foundation for delivering a product that is strategically
                            aligned, user-centered, and technically sound.
                        </p>
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
                <div className={`justify-self-start text-start lg:mt-12 mt-6 lg:mb-12 mb-6`}>
                    <h3 className={'text-[1em] font-[600]'}>Our partners</h3>
                </div>
                <div className={`grid lg:grid-cols-5 grid-cols-2 gap-6 lg:pb-12 lg:mb-10 mb-8`}>
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
            <div id={'FAQ'} className={`relative lg:py-24 md:py-24 mb-16 ${isDayTime ? 'bg-gray-950' : 'bg-gray-50'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] pb-[1em] mb-28 '}>
                        <h2 className='lg:text-[3em] capitalize md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>
                            Frequently asked Unity <br className={'lg:block md:block hidden'}/>development questions
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] mb-[3em] space-y-2'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>How can I find the right partner for my project?</span>
                            {onIndex === 0 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 0 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Finding the right partner for your game development project is critical to success. At
                                Grey InfoTech, we bring years of experience and deep expertise in Unity technologies to
                                the table. As a trusted Unity game development company, we’ve built a proven track
                                record of delivering high-quality, impactful games across multiple platforms. With our
                                skilled team and commitment to excellence, we’re the reliable partner you need to bring
                                your vision to life.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why would I choose Unity?</span>
                            {onIndex === 1 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 1 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Unity stands out as a premier game development engine, known for its versatility,
                                cross-platform compatibility, and powerful feature set. It empowers developers to create
                                high-performance games across mobile, desktop, web, AR, and VR platforms. With its vast
                                ecosystem of tools, plugins, and community support, Unity significantly accelerates
                                development time while maintaining creative flexibility—making it an ideal choice for
                                businesses looking to build engaging, scalable gaming experiences.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Why should I use Unity for game development?</span>
                            {onIndex === 2 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 2 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Unity’s prominence in the game development industry is well-earned. It provides
                                developers with a comprehensive ecosystem that combines performance optimisation, a
                                user-friendly interface, and scalable architecture. These features enable efficient
                                development cycles and ensure high-quality output. Whether you&#39;re targeting mobile,
                                desktop, console, or VR platforms, Unity makes it possible to build engaging, immersive
                                games that captivate players and drive business growth across diverse markets.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What is Unity game development?</span>
                            {onIndex === 3 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 3 && (
                            <p className="mt-4 text-[0.873em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Unity game development typically follows a structured pipeline that includes concept and
                                design, coding and development, testing and debugging, and final deployment. Each stage
                                is critical, ensuring that the game is not only visually engaging and technically sound
                                but also thoroughly tested for quality and performance. This systematic approach allows
                                developers to refine every detail, resulting in a polished product that meets user
                                expectations and stands out in the competitive gaming market.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do I hire Unity game developers?</span>
                            {onIndex === 4 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 4 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Hiring Unity game developers becomes seamless when you partner with an experienced Unity
                                game development company like Grey InfoTech. With a skilled team ready to turn your game
                                concepts into engaging, high-performance experiences, we provide end-to-end development
                                services that simplify the process and accelerate your path to market.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>Why would I outsource Unity game development?</span>
                            {onIndex === 5 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 5 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Outsourcing Unity game development offers strategic advantages such as cost efficiency,
                                access to specialised talent, and accelerated development timelines. At Grey InfoTech,
                                our outsourced game development services are designed to streamline your production
                                process while delivering high-quality, scalable results that align with your business
                                goals.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to create a game with Unity?</span>
                            {onIndex === 6 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 6 && (
                            <p className="mt-4 text-[0.85em] font-[200] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Timelines vary based on project complexity, but Unity’s efficiency and adaptability help
                                accelerate the development process. At Grey InfoTech, our seasoned team leverages these
                                strengths to ensure timely delivery without compromising on quality—no matter the scale
                                of your game.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default UnityDevelopment;