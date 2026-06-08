import React, {useEffect, useRef, useState} from 'react';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import Footer from "@/components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CountUp from "react-countup";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";

// Testimonial data
const testimonials = [
    {
        name: "Ibrahim Okon",
        title: "CTO, CargoLoop",
        message: (
            <>
                Grey InfoTech developed the backend that powered our logistics platform with speed and reliability.
                Their system stayed stable and efficient throughout our operations. They were a dependable partner
                through it all.
            </>
        ),
    },
    {
        name: "Amina Bakari",
        title: "Product Manager, MedReach Tanzania",
        message: (
            <>
                heir team created a secure and user-friendly platform connecting patients to medical professionals. The
                solution remained impactful throughout our active years.
            </>
        )
    },
    {
        name: "Sola Adeyeye",
        title: "Head of Digital Strategy, EduSphere",
        message: (
            <>
                Grey InfoTech built a scalable platform that served thousands of learners with stability and ease of
                use. Their professionalism was exceptional.
            </>
        )
    },
    {
        name: "Jean-Paul Mumbere",
        title: "CTO, CivicConnect",
        message: (
            <>
                Their team crafted a powerful multilingual site for community engagement, helping us reach diverse
                audiences.
            </>
        )
    },
    {
        name: "Kemi Oladapo",
        title: "Director of Technology, FinNova",
        message: (
            <>
                Grey InfoTech delivered a secure and scalable financial platform that was critical to our success. Their
                expertise was unmatched.
            </>
        )
    },
    {
        name: "Thapelo Mokoena",
        title: "CTO, AgroLink",
        message: (
            <>
                Their team enabled us to connect farmers to vital services reliably. Their system remained core to our
                operations.
            </>
        )
    },
    {
        name: "Fatoumata Sissoko",
        title: "Head of Digital Systems, HealthBridge",
        message: (
            <>
                Grey InfoTech empowered clinics and mobile units with real-time data management, greatly improving
                healthcare delivery.
            </>
        )
    },
    {
        name: "Adaeze Nwosu",
        title: "Chief Product Officer, HealthNet Systems",
        message: (
            <>
                Their expertise brought our health platform to life with a responsive, intuitive UI that users love.
            </>
        )
    },
    {
        name: "Tunde Balogun",
        title: "Founder & CEO, EduTrack Africa ",
        message: (
            <>
                The interface Grey InfoTech built boosted our student engagement by over 60%. Their professionalism was
                exceptional.
            </>
        )
    },
    {
        name: "Sylvia Essien",
        title: "COO, LogiFleet Solutions ",
        message: (
            <>
                Their team delivered a sleek and powerful dashboard that impressed clients and investors alike.
            </>
        )
    },
];

// Our Approach
const reasons = [
    {
        id: 1,
        title: 'We Listen',
        description: (
            <>
                Every project begins with a conversation—an opportunity for us to understand your goals, vision, and the
                challenges that matter most to your business. At Grey InfoTech, we go beyond the technical brief to
                uncover what truly drives value for you. By aligning our strategy with your priorities from the start,
                we’re able to design and deliver solutions that solve real problems, unlock new opportunities, and
                create lasting impact.
            </>
        ),
    },
    {
        id: 2,
        title: 'We Strategize',
        description: (
            <>
                We design smart, scalable solutions tailored to your business goals—whether you&#39;re launching a new
                product, modernising legacy systems, or scaling operations. Our approach combines strategic thinking,
                technical expertise, and industry insight to deliver platforms that are not only robust and
                future-ready, but also aligned with your operational workflows and growth objectives. From architecture
                to deployment, we ensure every solution supports better decision-making, seamless user experiences, and
                long-term business value.
            </>
        ),
    },
    {
        id: 3,
        title: 'We Create',
        description: (
            <>
                Armed with insights, we move swiftly from strategy to execution—crafting intuitive designs, writing
                robust code, and applying our technical expertise at every stage. With a blend of creativity and
                precision, we build digital products that not only solve complex problems but also strengthen your
                brand, enhance user experience, and drive measurable business results.
            </>
        )
    },
    {
        id: 4,
        title: 'We Collaborate',
        description: (
            <>
                We work closely with you at every stage of the project, ensuring clear communication, shared
                understanding, and full transparency in every decision. By aligning with your goals and involving you in
                key milestones, we create a collaborative environment where expectations are managed, challenges are
                addressed early, and outcomes are consistently aligned with your business vision.
            </>
        )
    },
    {
        id: 5,
        title: 'We Test (A lot)',
        description: (
            <>
                Quality is at the core of everything we do. From day one, we integrate testing into every phase of
                development to catch issues early and ensure reliability. Before launch, we rigorously test across
                devices, browsers, and real-world scenarios—so your product performs flawlessly, whether it’s on the
                latest smartphone or that outdated browser your team can’t seem to let go of.
            </>
        )
    },
    {
        id: 6,
        title: 'We Stick Around',
        description: (
            <>
                The journey doesn’t stop at launch—it’s just the beginning. As technology evolves and your business
                grows, we stay by your side to adapt, optimise, and enhance your product. Whether it’s adding new
                features, improving performance, or scaling to meet new demands, we provide ongoing support to ensure
                your solution remains future-ready and continues to deliver real value over time.
            </>
        )
    },
];

const Company = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
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

    // Carousel Hook
    const carouselRef = useRef<HTMLDivElement>(null);
    const [cursorStyle, setCursorStyle] = useState({left: 0, top: 0});

    const handleMouseMove = (e: React.MouseEvent) => {
        setCursorStyle({left: e.clientX, top: e.clientY});
    };

    const handleMouseEnter = () => {
        if (carouselRef.current) {
            carouselRef.current.classList.add("active");
        }
    };

    const handleMouseLeave = () => {
        if (carouselRef.current) {
            carouselRef.current.classList.remove("active");
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

    // Our Approach
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
        {id: 9, name: 'Partner 9', dayImage: 'afro.svg', nightImage: 'afro1.svg'},
        {id: 10, name: 'Partner 10', dayImage: 'cane.svg', nightImage: 'cane1.svg'},
    ];

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, message} = testimonials[current];

    // Why Grey infoTech For Your App Project Hook

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex % reasons.length) + 1);
        }, 5000); // Change slide every 5 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up the interval on unmount
    }, []);


    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen `}>
            <Header/>

            <FloatingButton
                className={`fixed bottom-6 right-6 transition-all z-50 duration-300 ${
                    isVisible ? 'mb-16' : 'mb-0'
                }`}
            />

            {/* Hero Section */}
            <div id={'hero'}
                 className={`relative top-0 overflow-hidden w-full h-screen justify-center items-center pb-6`}>
                <div className="absolute inset-0 ">
                    <Image
                        src="/assets/comp/hero.jpg"
                        alt="company"
                        width={2560}
                        height={1440}
                        className="w-full h-[75vh] md:h-[85vh] lg:h-screen object-fill object-center"
                    />
                </div>
                <div className="absolute inset-0 bg-black/35 flex items-center">
                    <div
                        className="container max-w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]">
                        <div className="relative pt-16 pb-8 md:py-20 lg:py-28 border-b border-gray-300/80">
                            <h1 className="text-white font-extrabold leading-tight tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem]">
                                Power Your Digital <br className="hidden md:block"/>Transformation
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 text-white">
                            <div className="">
                                <p className="text-sm md:text-[0.95rem] leading-[1.4]">
                                    Location <br/>
                                    Port Harcourt, Nigeria
                                </p>
                            </div>

                            <div className="">
                                <p className="text-sm md:text-[0.95rem] leading-[1.4]">
                                    Our success is built on collaboration. By working closely with our clients, we
                                    achieve shared goals and consistently deliver outstanding results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introductory section */}
            <section ref={sectionRef}
                     className={`py-5 transition-colors duration-500 ${
                         isBackgroundActive
                             ? isDayTime
                                 ? "bg-black text-white"
                                 : "bg-white text-black"
                             : isDayTime
                                 ? "bg-white text-black"
                                 : "bg-black text-white"
                     }`}>
                <div
                    className='relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:my-[3em] md:my-[3em] -mt-[9em] lg:gap-14 md:gap-10 gap-6 lg:pt-16 md:pt-16 pt-6 lg:pb-14 md:pb-14 pb-16 lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]'>
                    <div className=''>
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            Think Ambitiously, <br className={'lg:block md:block hidden'}/>Build Exceptionally
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3em] md:text-[3em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Unlocking Growth with Tailored <br className={'lg:block md:block hidden'}/>Digital Solutions
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    We’re Grey InfoTech—a business-focused digital product development company helping
                                    brands across industries transform ideas into powerful digital solutions. Our goal
                                    is simple: to build smart, scalable, and impactful products that drive real business
                                    results. Whether it’s a high-performance web application, a custom enterprise tool,
                                    or an innovative SaaS platform, we bring clarity, speed, and precision to every
                                    project.
                                </p>
                            </div>
                            <div>
                                <p>
                                    We combine strategic thinking with technical excellence, ensuring every product we
                                    deliver is not only beautifully built but also aligned with your business goals. Our
                                    team of skilled developers, designers, and digital strategists are passionate about
                                    crafting user-friendly experiences that work seamlessly and scale effortlessly. At
                                    Grey InfoTech, we’re serious about quality, committed to innovation, and driven by
                                    your success. Let’s build something extraordinary together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Image Carousel */}
            <div className={`${isDayTime ? 'bg-white' : 'bg-black'} lg:block md:block hidden`}>
                <div id={'top'}
                     className={'relative lg:max-w-full w-full lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] mx-auto h-auto'}>
                    <div
                        ref={carouselRef}
                        className="carousel-container"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="custom-cursor"
                            style={{left: `${cursorStyle.left}px`, top: `${cursorStyle.top}px`}}
                        >
                            drag
                        </div>
                        <Slider
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                            draggable={true}
                            swipeToSlide={true}
                            arrows={false}
                            centerMode={true}
                            centerPadding="450px" // Reduces the gap between images to zero
                        >
                            <div className="h-auto mx-auto w-full max-w-full">
                                <Image
                                    src="/assets/comp/6.jpg"
                                    alt="home"
                                    width={400}
                                    height={400}
                                    className="carousel-image"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/3.jpg"
                                    alt="Restaurant"
                                    width={400}
                                    height={400}
                                    className="carousel-image lg:mt-[0.78em] md:mt-[0.78em]"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/1.jpg"
                                    alt="calendar"
                                    width={400}
                                    height={400}
                                    className="carousel-image lg:mt-[7em] md:mt-[7em]"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/2.jpg"
                                    alt="Restaurant"
                                    width={400}
                                    height={400}
                                    className="carousel-image"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/5.jpg"
                                    alt="Restaurant"
                                    width={400}
                                    height={400}
                                    className="carousel-image lg:mt-[2em] md:mt-[2em]"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/4.jpg"
                                    alt="Restaurant"
                                    width={400}
                                    height={400}
                                    className="carousel-image"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/assets/comp/7.jpg"
                                    alt="Restaurant"
                                    width={400}
                                    height={400}
                                    className="carousel-image lg:mt-[0.78em] md:mt-[0.78em]"
                                />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Mid image*/}
            <div id={'mid image'} className={'h-auto max-w-full w-full mx-auto'}>
                <Image
                    className={' object-fill'}
                    src={'/assets/comp/mid.jpg'}
                    alt={'Middle Image'}
                    width={2560}
                    height={1440}
                    style={{
                        objectFit: "fill",
                        objectPosition: "center",
                    }}
                />
            </div>

            {/* Our Mission */}
            <div className={` ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'involved'}
                     className={`relative lg:pt-[7em] md:pt-[7em] pt-[2em] lg:pb-[7em] md:pb-[7em] pb-[2em] px-4 sm:px-6 lg:px-[4.6em] w-full max-w-full lg:mb-10 mb-8 ${
                         isDayTime ? 'text-black' : 'text-white'}`}>
                    <div
                        className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 max-w-full mx-auto`}>
                        <div className={'lg:mr-[8em] md:mr-[8em] lg:mt-[2em] md:mt-[2em] '}>
                            <h2 className='lg:text-[3em] md:text-[3em] capitalize text-[1.5em] font-[500] tracking-tighter leading-[1.15] lg:pb-6 md:pb-6 mb-8'>
                                Our Mission
                            </h2>
                            <p className='text-[0.85em] font-[400] lg:-mt-[0.2em] md:-mt-[0.2em] text-justify  leading-[1.5]'>
                                To power ambitious ideas with cutting-edge technology.<br/><br/>

                                We help forward-thinking businesses—from agile startups to established enterprises—turn
                                complex challenges into scalable digital solutions that drive growth and
                                efficiency.<br/><br/>

                                Our focus is not just on building software, but on creating lasting value through
                                innovation, performance, and reliability. We design with purpose, develop with
                                precision, and deliver with impact.<br/><br/>

                                At Grey InfoTech, we’re your tech partner for the long haul—unlocking opportunities,
                                accelerating transformation, and helping you lead with confidence in the digital age.
                            </p><br/>
                            <Link href='/company'>
                                <button
                                    className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em]  border tracking-tighter  rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-[3%]`}></span>
                                    <span
                                        className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-100 group-hover:-translate-x-8`}></span>
                                    <span
                                        className={`relative w-full text-left transition-colors duration-200 ease-in-out ${isDayTime ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}`}>About Us <span
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
                                        src="/assets/comp/ai.jpg"
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
                                    src="/assets/comp/dvr.jpg"
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

            {/* Our Vision */}
            <div className={`lg:-mt-[2.5em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-4'}>
                            <Image
                                src={'/assets/comp/vr.jpg'}
                                alt={'Our Vision'}
                                width={4650}
                                height={500}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[7em] md:mt-[7em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <h2
                                className='text-[1.5em] capitalize font-[500] tracking-tight leading-[1.1] mb-8 mr-[2em] md:text-[2em] lg:text-[3em] w-auto h-auto md:mr-[2.5em] lg:mr-[3.5em]'>
                                Our Vision
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[2em]'>
                                To shape the future of business through smart, scalable technology that empowers growth,
                                innovation, and lasting impact.<br/><br/>

                                We see a future where digital solutions are not just tools, but strategic assets that
                                help
                                businesses move faster, work smarter, and stay ahead of the curve. From intelligent
                                automation to seamless user experiences, we aim to redefine what technology can do for
                                modern enterprises.<br/><br/>

                                At Grey InfoTech, we’re committed to building solutions that are agile, secure, and
                                future-ready—designed to adapt and scale as your business evolves. We believe technology
                                should unlock opportunity, not create barriers.<br/><br/>

                                Our vision is to be the trusted technology partner that forward-thinking businesses rely
                                on
                                to lead, transform, and thrive in a digital-first world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted Digital Partners */}
            <div className={`lg:-mt-[0em] md:-mt-[0em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'partners'}
                     className={`relative lg:py-20 md:py-20 lg:mb-20 md:mb-20 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
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
                    <div id={'countup'}
                         className={`grid lg:grid-cols-5 md:grid-cols-5 sm:grid-cols-3 grid-cols-1 text-center lg:mt-[3em] py-12 divide-x divide-gray-300 ${
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

            {/* Our Approach */}
            <div
                className={`relative lg:-mt-20 lg:pt-[6em] md:pt-[6em] pt-[2em] ${isDayTime ? 'bg-black' : 'bg-white'} h-screen lg:pb-[6em] md:pb-[6em] pb-[2em]`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 max-w-full w-full h-auto mx-auto px-4 sm:px-6 lg:px-[4.6em] border-b-[0.001em] pb-12 ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div>
                        <h2 className='lg:text-[3.2em] md:text-[3.2em] text-[1.5em] font-[500] tracking-tight leading-[1.15] lg:pb-6 rounded-none'>
                            Our Approach
                        </h2>
                    </div>
                    <div className='lg:-ml-[7em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We’re not just here to ship software — we’re here to make bold ideas happen. From ambitious
                            startups to complex enterprise systems, we thrive on challenges that push the limits. The
                            more technical, tangled, or tough the task, the more excited we are to take it on.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`relative -mt-[23em] ${isDayTime ? 'bg-black' : 'bg-white'} max-w-full w-full h-auto mx-auto lg:mb-16 md:mb-16 lg:pb-20 md:pb-20 pb-14 mb-12`}>
                <div
                    className='relative mx-auto px-4 sm:px-6 lg:px-[4.6em] grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-20 md:mb-20'>
                    {/* Left Section */}
                    <div
                        className={`relative text-[0.873em] lg:leading-[1.5] ${isDayTime ? 'text-white' : 'text-black'} flex flex-col justify-center mb-4 lg:pl-4 lg:pr-[3em]`}>
                        {reasons.map((reason, index) => (
                            <div
                                key={reason.id}
                                className={`relative mb-6 ${
                                    index + 1 === activeIndex
                                        ? isDayTime
                                            ? 'bg-black py-5'
                                            : 'bg-white py-5'
                                        : ''
                                }`}
                            >
                                <h3
                                    className={`relative pr-[6em] leading-[1.2] lg:text-[1.5em] text-[1em] mb-6 cursor-pointer transition-all ${
                                        index + 1 === activeIndex
                                            ? isDayTime
                                                ? 'text-white font-bold'
                                                : 'text-black font-bold'
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
                                                initial={{opacity: 0, y: -50}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 0}}
                                                transition={{duration: 0}}
                                                className={`relative inline-block ${
                                                    isDayTime ? 'text-white' : 'text-black'
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
                    <div className='lg:mt-[2em] h-[30vh] sticky'>
                        <Image
                            src={'/assets/comp/op.jpg'}
                            alt="Our Approach"
                            width={660}
                            height={150}
                        />
                    </div>
                </div>
                <div
                    className={`lg:px-[28em] items-center ${isDayTime ? 'text-white bg-black' : 'text-black bg-white'} justify-center`}>
                    <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] pb-6 text-center'>
                        Prepared to initiate the discussion?
                    </h2><br/>
                    <Link href='/contact'
                          className='flex items-center justify-center-safe text-center'>
                        <button
                            className='relative mx-auto inline-flex items-center justify-start overflow-hidden group w-fit text-[0.85em] border border-gray-500 tracking-tighter rounded-full py-2 px-6'>
                        <span
                            className={`w-32 h-32 rotate-45 translate-x-[4em] -translate-y-[2.8em] absolute left-0 top-0 ${isDayTime ? 'bg-black' : 'bg-white'} opacity-[100%]`}></span>
                            <span
                                className={`absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-90 -translate-x-56 -translate-y-24 ${isDayTime ? 'bg-white' : 'bg-black'} opacity-100 group-hover:-translate-x-8`}></span>
                            <span
                                className={`relative w-full text-left text-black ${isDayTime ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'} transition-colors duration-200 ease-in-out`}>Get
                                started <span className={`text-[1.5em] leading-[0.7]`}> →</span></span>
                            <span className="absolute inset-0 rounded-full "></span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Our Values */}
            <div className={`-mt-[4em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'values'}
                     className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[2.5em] md:pb-[2.5em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]  ${
                         isDayTime ? 'text-black' : 'text-white'
                     }`}>
                    <h1 className={'lg:text-5em] md:text-[5em] sm:text-[3em] text-[2em] font-[500] leading-[1.1]  mb-[0.3em]'}>
                        Our Values
                    </h1>
                    <p className={'text-[0.873em] font-[300] leading-[1.4] text-justify mb-10'}>
                        At Grey InfoTech, our values define how we work, innovate, and deliver value. We are <span
                        className={'font-[500]'}>Innovative</span>, constantly exploring new technologies to create
                        <br className={'lg:block md:block hidden'}/>smarter, future-ready solutions. We are <span
                        className={'font-[500]'}>Collaborative</span>,
                        working closely with clients to align every solution with their business goals. We are <span
                        className={'font-[500]'}>Adaptable</span>, <br className={'lg:block md:block hidden'}/>responding
                        quickly
                        to change and evolving needs in today’s fast-paced digital landscape. And we are <span
                        className={'font-[500]'}>Accountable</span>, taking full ownership of our <br
                        className={'lg:block md:block hidden'}/>work and delivering
                        results you can trust. These values drive us to go beyond expectations and build lasting
                        partnerships.
                    </p>
                    <div id={'core-values'}
                         className={`grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-8 text-center lg:mt-[3em] py-12 ${
                             isDayTime ? 'text-black' : 'text-white'
                         }`}
                    >
                        <div id={'innovative'} className={'border-l-2 border-gray-300 pb-[2.3em]'}>
                            <div className={'-mt-7'}>
                                <h1 className={'-mb-4 font-[600] lg:text-[6em] md:text-[6em] text-[3em] -ml-[1.2em]'}>01</h1>
                                <h2 className={'mb-4 font-[600] lg:text-[2em] md:text-[2em] text-[1em] -ml-[2em]'}>Innovative</h2>
                                <p className={'-mb-8 font-[300] text-[0.873em] ml-[2.1em] text-justify'}>
                                    We stay ahead by combining deep expertise with smart, forward-thinking solutions.
                                    Every project is guided by strategy, underpinned by innovation, and focused on
                                    delivering measurable results that align with your business goals and long-term
                                    vision.<br/><br/>

                                    No two challenges are the same, so we tailor every solution to your needs—whether
                                    building new systems, improving workflows, or integrating powerful tools—ensuring
                                    performance, scalability, efficiency, and readiness for sustainable growth.
                                </p>
                            </div>
                        </div>

                        <div id={'Collaborative'} className={'border-l-2 border-gray-300 pb-[2.3em]'}>
                            <div className={'-mt-7'}>
                                <h1 className={'-mb-4 font-[600] lg:text-[6em] md:text-[6em] text-[3em] -ml-[1.25em]'}>02</h1>
                                <h2 className={'mb-4 font-[600] lg:text-[2em] md:text-[2em] text-[1em] -ml-[0.7em]'}>Collaborative</h2>
                                <p className={'-mb-8 font-[300] text-[0.873em] ml-[2.1em] text-justify'}>
                                    We are customer-centric at every level. Our top priority is solving problems through
                                    a collaborative approach that ensures clients are not just heard, but truly
                                    understood—resulting in solutions that align with their vision and needs.<br/><br/>
                                    By fostering open communication and genuine partnership, we build lasting
                                    relationships based on trust, transparency, and mutual respect—leaving our clients,
                                    and our team, confident, empowered, and ready to grow together.
                                </p>
                            </div>
                        </div>

                        <div id={'Adaptable'} className={'border-l-2 border-gray-300 pb-[2.3em]'}>
                            <div className={'-mt-7'}>
                                <h1 className={'-mb-4 font-[600] lg:text-[6em] md:text-[6em] text-[3em] -ml-[1.25em]'}>03</h1>
                                <h2 className={'mb-4 font-[600] lg:text-[2em] md:text-[2em] text-[1em] -ml-[2em]'}>Adaptable</h2>
                                <p className={'-mb-8 font-[300] text-[0.873em] ml-[2.1em] text-justify'}>
                                    We’re happy to embrace change. Whether it’s a shift in project scope or evolving
                                    customer needs, we remain agile and adaptable—quick to respond, adjust, and deliver
                                    with confidence.<br/><br/>
                                    By staying ahead of trends and exploring emerging technologies and methods, we
                                    ensure our clients are future-ready. This proactive mindset allows us to stay sharp,
                                    relevant, and consistently valuable in a fast-changing digital landscape.
                                </p>
                            </div>
                        </div>

                        <div id={'Accountable'} className={'border-l-2 border-gray-300 pb-[2.3em]'}>
                            <div className={'-mt-7'}>
                                <h1 className={'-mb-4 font-[600] lg:text-[6em] md:text-[6em] text-[3em] -ml-[1.25em]'}>04</h1>
                                <h2 className={'mb-4 font-[600] lg:text-[2em] md:text-[2em] text-[1em] -ml-[1em]'}>Accountable</h2>
                                <p className={'-mb-8 font-[300] text-[0.873em] ml-[2.1em] text-justify'}>
                                    We take ownership of every outcome—whether it&#39;s a success or a challenge—because
                                    accountability is key to building trust. Our clients can rely on us to deliver
                                    solutions that are on time, on brief, and aligned with their expectations.<br/><br/>
                                    With clear communication, proactive follow-through, and a focus on measurable
                                    results, we hold ourselves to the highest standards in every engagement, ensuring
                                    consistency, transparency, and long-term value.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Why Choose Grey InfoTech */}
            <div className={`${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'development process'}
                     className={`lg:pt-[6em] md:pt-[6em] pt-[2em] relative mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Development Process Header */}
                    <div className={`sticky top-0 z-10 bg-opacity-90 backdrop-blur-md ${
                        isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                    }`}>
                        <div className="border-b-[0.1em] border-gray-300/50 pb-[2em]">
                            <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                                Why choose Grey InfoTech <br className={'lg:block md:block hidden'}/>for your your next
                                project?
                            </h2>
                            <p className={'text-[0.87em] font-[300] leading-[1.5] tracking-tight'}>
                                Ignore functional. We create digital products that excite consumers and provide the
                                outcomes you require.
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
                                                When it comes to digital, we bring deep, hands-on experience across a
                                                wide range of projects and industries. No matter the size or complexity
                                                of your brief, we draw on everything we&#39;ve learned—from past
                                                challenges
                                                to proven successes—to deliver solutions that blend creativity,
                                                technical expertise, commercial insight, and practical strategy. With
                                                Grey InfoTech, you gain a partner who brings not just capability, but
                                                clarity and direction.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 2,
                                        subtitle: "02",
                                        title: "We’re Proactive",
                                        description: (
                                            <>
                                                At Grey InfoTech, we don&#39;t just deliver on expectations—we exceed
                                                them. Our proactive approach means we anticipate challenges before they
                                                arise, act swiftly without being prompted, and consistently look for new
                                                opportunities to drive your project forward. You can count on us to
                                                think ahead, solve problems before they happen, and add value at every
                                                stage of the process.
                                            </>
                                        ),
                                    },
                                    {
                                        id: 3,
                                        subtitle: "03",
                                        title: "We're Collaborative",
                                        description: (
                                            <>
                                                We&#39;re passionate about technology—but we never lose sight of the
                                                people
                                                behind the projects. Collaboration, for us, goes beyond being
                                                approachable and communicative. It means becoming a true partner who
                                                shares your vision, enthusiasm, and drive to build something
                                                exceptional. We bring not only technical expertise, but also a human
                                                touch that makes the journey as rewarding as the result.
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
                                                When you partner with Grey InfoTech, your goals become our mission. We
                                                take every project personally—demonstrated in our commitment to
                                                excellence, attention to detail, and unwavering accountability. We
                                                don&#39;t
                                                just deliver software; we take ownership of outcomes, ensuring your
                                                investment results in long-term value and measurable impact.
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

            {/* Testimonials */}
            <div
                className={`relative -mt-[2.5em] lg:pt-[5em] md:pt-[5em] pt-[2em] -mb-[11em] max-w-full w-full  h-screen ${
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

            {/* Partners Sections */}
            <div id={'partners'}
                 className={`relative max-w-full lg:pb-[10em] mx-auto px-4 sm:px-6 lg:px-[4.6em] h-auto overflow-hidden ${
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

            <Footer/>
        </div>
    );
};

export default Company;