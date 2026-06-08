import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, CheckCircle, Quote} from "lucide-react";
import CountUp from "react-countup";
import {AnimatePresence, motion} from "framer-motion";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";

const reasons = [
    {
        id: 1,
        title: 'Proven track record',
        description: "From initial consultation and app design to development, backend infrastructure, and continuing maintenance, " +
            "we provide a comprehensive solution. We manage every stage of app development to make sure your idea becomes a reality, " +
            "whether you&#39;re a startup or an established company."
    },
    {
        id: 2,
        title: 'Technology innovation',
        description: 'Whether developing native applications or cross-platform solutions, we make sure your app is constructed ' +
            'using the most effective and future-proof technology. We keep ahead of the curve by utilizing the most recent ' +
            'technologies, frameworks, and integrations.'
    },
    {
        id: 3,
        title: 'Bespoke solution',
        description: 'There is no one-size-fits-all approach at Grey InfoTech; instead, we take the time to learn about your ' +
            'company&#39;s objectives and consumers&#39; needs in order to develop a custom mobile application that adds value and makes a statement.'
    },
    {
        id: 4,
        title: 'End-to-end expertise',
        description: 'From initial consultation and app design to development, backend infrastructure, and continuing maintenance, ' +
            'we provide a comprehensive solution. We manage every stage of app development to make sure your idea becomes a reality, ' +
            'whether you&#39;re a startup or an established company.'
    },
    {
        id: 5,
        title: 'ongoing support & maintenance',
        description: 'Our partnership continues after launch. We provide ongoing support, from frequent security patches and upgrades ' +
            'to feature additions, to make sure your app remains current and operates at its best as your company expands.'
    },
];

// Testimonial data
const testimonials = [
    {
        name: "Fatima Bello",
        title: "Operations Lead, AgroNova Solutions",
        image: "/assets/mad/fatima.jpg",
        message:
            "Grey InfoTech Limited delivered exactly what we needed—a user-friendly, high-performance mobile app that our " +
            "clients love. Their team worked efficiently, communicated clearly, and ensured we stayed on track from concept " +
            "to launch. We highly recommend them for any serious mobile app project."
    },
    {
        name: "James Ekundayo",
        title: "CEO, RideSwift",
        image: "/assets/mad/james.jpg",
        message:
            "Our experience with Grey InfoTech was outstanding. They took our complex requirements and built a beautiful, " +
            "functional app that runs flawlessly on both iOS and Android. Their professionalism and attention to detail stood " +
            "out throughout the entire process."
    },
    {
        name: "Anita Mohammed",
        title: "Head of Digital, HealthNest Technologies",
        image: "/assets/ui-ux/anita.jpg",
        message:
            "We partnered with Grey InfoTech for a major front-end revamp, and the experience was seamless from start to finish." +
            "Their collaborative process, attention to detail, and design expertise resulted in a final product that far exceeded our expectations."
    }

];

const MobileApplicationDevelopment = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
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
            "consultancy",
            "design",
            "development",
            "integration",
            "backend",
            "databases",
            "maintenance",
            "modernisation",
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

    // Mobile App Features array
    const features = [
        "Geolocation management",
        "Payments",
        "Messaging and voice/video calling",
        "Multi-device synchronisation",
        "Voice recognition and recording",
        "Chatbots",
        "Push notifications",
        "Integration with wearables and smart TV",
        "Interaction with IoT-enabled mobile devices",
        "Mobile business intelligence",
        "Push notifications",
        "QR code scanning",
        "Image recognition",
        "User experience personalisation",
        "Scheduling and booking",
        "Immersive experiences",
        "Augmented reality",
        "Virtual reality",
        "Artificial intelligence",
    ];

    // Countup hook for Digital partners
    const stats = [
        {label: 'Years Experience', value: 8, suffix: '+'},
        {label: 'Team Members', value: 10, suffix: '+'},
        {label: 'Products Launched', value: 150, suffix: '+'},
        {label: 'Successful rebrands', value: 27, suffix: '+'},
        {label: 'Increase in Website Traffic', value: 350, suffix: '%'},
    ];

    // Testimonial carousel hook
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((current + 1) % testimonials.length);

    const {name, title, image, message} = testimonials[current];

    // App project hook
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
                    className={`border-b pb-[0.5em] border-gray-300/20 px-0 constant-text lg:text-[5.5em] md:text-[3em] sm:text-[2em] text-[2.5em] lg:mt-[3em] mt-[1.5em] leading-[1.1] font-[550] ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    Mobile App <br className={'lg:block md:block hidden'}/>Development Company
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.8em] font-[400]'}>
                    Award-winning developers and designers of mobile applications. We create apps for iOS, Android,
                    hybrid, and React Native.
                </p>
                <div
                    className={'relative w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/mad/mad.jpg'}
                        alt={'Mobile Application Development'}
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
                        <h6 className='constant-text lg:text-[0.8em] text-[0.9em] lg:font-[550] font-[600] lg:tracking-wider tracking-tight'>
                            INNOVATIVE APPLICATIONS
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.5em] text-[1.8em] font-[500] lg:mt-[0.01em] lg:leading-[1.1] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Custom Mobile <br className={'lg:block md:block hidden'}/>Application Development</h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    We’re a Nigeria-based mobile app development company you can rely on for dependable,
                                    high-quality results. Our skilled in-house team excels at delivering complex and
                                    innovative app solutions with speed, precision, and a deep understanding of user
                                    needs. From strategy to launch, we help you choose the best approach for your
                                    goals—blending cutting-edge design with robust technical execution to create
                                    polished, intuitive apps that stand out and drive meaningful impact.
                                </p>
                            </div>
                            <div>
                                <p>
                                    With expertise in Hybrid, Native, and Web app development, we build for all major
                                    mobile platforms—making us the ideal partner for bringing your app idea to life. Our
                                    diverse client portfolio includes Poawd, Tokiye Medicals, Invealth Partners, Kowork,
                                    and Willkon Hub, and we’ve delivered impactful solutions across a wide range of
                                    industries, including gaming, automotive, leisure, insurance, and luxury brands. No
                                    matter the challenge, we combine technical excellence with industry insight to
                                    create high-performing, user-focused mobile experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Development Services */}
            <div id={'development services'}
                 className={`relative lg:py-[3em] py-[1em] lg:my-[5em] lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em] ${
                     isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <h2 className={'border-b pb-[0.8em]  border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    Mobile App<br className={'lg:block md:block hidden'}/>Development Services</h2>
                <div
                    className={`relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[6em] gap-4 mb-4 ${
                        isDayTime ? 'text-black' : 'text-white'}`}>
                    <div id={'ios app'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/ios1.svg' : '/assets/mad/icon/ios.svg'}
                                alt='iOS App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            iOS App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400] hover:border-animation'>
                            <Link href={'https://developer.apple.com/ios/'}
                                  className={`relative border-b pb-[0.17em] ${
                                      isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                  }`}>iOS apps</Link> offer a premium, high-performance user experience by harnessing
                            Apple’s advanced hardware and software ecosystem. With enhanced security, seamless
                            functionality, and elegant design standards, iOS is the go-to platform for engaging millions
                            of loyal Apple users. Launching on the App Store gives your app credibility, visibility, and
                            access to a trusted global marketplace.
                        </p>
                        <Link href={'/pages/services/ios-development.tsx'}
                              className={"w-auto h-auto mt-3 transition-all hover:scale-up-center flex relative"}>
                            <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.15em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>iOS app development</span>
                            </div>
                            <div
                                className={`transition-all w-0 peer-hover:w-[9.9em] h-[0.0.05em] ${
                                    isDayTime ? 'bg-black' : 'bg-white'
                                } absolute bottom-0 ease-out`}></div>
                        </Link>
                    </div>
                    <div id={'pwa app'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/pwa1.svg' : '/assets/mad/icon/pwa.svg'}
                                alt='PWA App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            PWA App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Progressive Web Apps (PWAs) combine the strengths of web and mobile apps to deliver a fast,
                            reliable, and engaging user experience—directly through a browser. Designed to work offline,
                            load instantly, and offer smooth, app-like interactions, PWAs are a cost-effective and
                            easily maintainable solution. They’re ideal for businesses looking to maximise reach and
                            performance without the complexity of native app development.
                        </p>
                    </div>
                    <div id={'react native'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/react1.svg' : '/assets/mad/icon/react.svg'}
                                alt='React Native App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] leading-[1.3] mb-4'>
                            React Native <br className={'lg:block md:block hidden'}/>App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            <Link href={'/pages/services/React-Native-Development.tsx'}
                                  className={`relative border-b pb-[0.17em] ${
                                      isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                  }`}>React Native</Link> app development harnesses Facebook’s powerful open-source
                            framework
                            to build high-performance mobile apps with a single codebase. Our skilled React developers
                            use <Link href={'/pages/services/Javascript.tsx'}
                                      className={`relative border-b pb-[0.17em] ${
                                          isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                      }`}>JavaScript</Link> to create feature-rich, cross-platform applications for both
                            iOS and
                            Android—speeding up development while maintaining native look, feel, and functionality. It’s
                            an efficient, scalable solution ideal for businesses looking to launch quickly without
                            compromising quality.
                        </p>
                        <Link href={'/pages/services/React-Native-Development.tsx'}
                              className={"w-auto h-auto mt-3 transition-all hover:scale-up-center flex relative"}>
                            <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.22em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>React native development</span>
                            </div>
                            <div
                                className={`transition-all w-0 peer-hover:w-[12em] h-[0.0.05em] ${
                                    isDayTime ? 'bg-black' : 'bg-white'
                                } absolute bottom-0 ease-out`}></div>
                        </Link>
                    </div>
                    <div id={'android'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/android1.svg' : '/assets/mad/icon/android.svg'}
                                alt='Android App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Android App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            With the largest global market share, Google’s Android platform is the world’s most widely
                            used mobile operating system—making it essential for reaching a broad and diverse audience.
                            We design and develop high-quality apps tailored for all Android devices, including phones,
                            tablets, and smartwatches, ensuring a seamless and engaging experience across the entire
                            ecosystem.
                        </p>
                        <Link href={'/pages/services/android-development.tsx'}
                              className={"w-auto h-auto mt-3 transition-all hover:scale-up-center flex relative"}>
                            <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.22em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Android app development</span>
                            </div>
                            <div
                                className={`transition-all w-0 peer-hover:w-[12em] h-[0.0.05em] ${
                                    isDayTime ? 'bg-black' : 'bg-white'
                                } absolute bottom-0 ease-out`}></div>
                        </Link>
                    </div>
                    <div id={'ionic'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/ionic1.svg' : '/assets/mad/icon/ionic.svg'}
                                alt='Ionic App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Ionic App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            The <Link href={'/www.ionicframework.com'} className={`relative border-b pb-[0.17em] ${
                            isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                        }`}>Ionic framework</Link> streamlines cross-platform app development by using familiar web
                            technologies—HTML, CSS, and JavaScript—to create powerful apps for both iOS and Android.
                            With its strong performance, reusable codebase, and native-like user experiences, Ionic
                            offers a cost-effective and efficient solution for businesses looking to launch high-quality
                            apps quickly across multiple platforms.
                        </p>
                    </div>
                    <div id={'hybrid'} className={`mt-[1em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/hybrid1.svg' : '/assets/mad/icon/hybrid.svg'}
                                alt='Hybrid App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Hybrid App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            <Link href={'/pages/services/hybrid-app-development.tsx'}
                                  className={`relative border-b pb-[0.05em] ${
                                      isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                  }`}>Hybrid app</Link> development merges the best of native and <Link
                            href={'/pages/services/Web-Application.tsx'} className={`relative border-b pb-[0.05em] ${
                            isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                        }`}>web applications</Link>, enabling a single codebase to run seamlessly on both iOS and
                            Android platforms. Built with technologies like HTML, CSS, and JavaScript, hybrid apps offer
                            faster development cycles, easier maintenance, and excellent scalability—making them a
                            smart, cost-effective choice for businesses aiming to reach a wider audience efficiently.
                        </p>
                        <Link href={'/pages/services/hybrid-app-development.tsx'}
                              className={"w-auto h-auto mt-3 transition-all hover:scale-up-center flex relative"}>
                            <div className={"w-full h-full peer"}>
                                <span
                                    className={`whitespace-nowrap border-b-[0.1em] pr-[0.23em] pb-[0.05em] inline-block ${
                                        isDayTime ? 'border-gray-300 ' : 'border-gray-800'
                                    }`}>Hybrid app development</span>
                            </div>
                            <div
                                className={`transition-all w-0 peer-hover:w-[11.2em] h-[0.0.05em] ${
                                    isDayTime ? 'bg-black' : 'bg-white'
                                } absolute bottom-0 ease-out`}></div>
                        </Link>
                    </div>
                    <div id={'wearable'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/wear1.svg' : '/assets/mad/icon/wear.svg'}
                                alt='Wearable App Development'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Wearable App Development
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Unlock the power of wearable technology with custom apps designed for smartwatches, fitness
                            trackers, and connected devices. We develop intuitive, lightweight applications that
                            seamlessly integrate with your existing systems—extending functionality, enhancing user
                            engagement, and delivering real-time value on the go. Whether for health, productivity, or
                            lifestyle, our wearable solutions help you stay ahead in a connected world.
                        </p>
                    </div>
                    <div id={'api'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/api1.svg' : '/assets/mad/icon/api.svg'}
                                alt='APIs & Backend'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            APIs & Backend
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Apps enable seamless communication by retrieving and sending information through backend
                            services—typically cloud-based servers—using APIs. We design and develop robust backend
                            architectures and secure, scalable APIs that power your app’s functionality, ensuring fast,
                            reliable data exchange and a smooth user experience across all platforms.
                        </p>
                    </div>
                    <div id={'prototyping'} className={`mt-[3em]`}>
                        <div
                            className={`relative mb-4 w-[65px] h-[65px]  ${isDayTime ? 'bg-black' : 'bg-white'}`}
                            style={{
                                clipPath: 'polygon(0% 0%, 80% 0%, 100% 20%, 100% 70%, 100% 100%, 20% 100%, 0% 80%, 0% 0%)',
                            }}
                        >
                            <Image
                                src={isDayTime ? '/assets/mad/icon/proto1.svg' : '/assets/mad/icon/proto.svg'}
                                alt='Custom App Prototyping'
                                width={40}
                                height={40}
                                className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'
                            />
                        </div>
                        <h3 className=' text-[1.5em] font-[600] mb-4'>
                            Custom App Prototyping
                        </h3>
                        <p className='text-justify text-[0.85em] font-[400]'>
                            Validate your app concept before development with a fully interactive prototype. We design
                            high-fidelity prototypes that simulate real user interactions, allowing you to test
                            functionality, refine UI/UX, and gather valuable feedback early—minimizing risk, reducing
                            costs, and ensuring your final product meets user expectations and business goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Development Solutions */}
            <div id={'development solution'}
                 className={'relative lg:py-[3em] py-[1em] lg:my-[3em] my-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                <h2 className={'border-b pb-[0.8em] border-gray-300/20 px-0 constant-text lg:text-[3em] md:text-[2em] sm:text-[1.5em] text-[1.5em] leading-[1.1] font-[500]'}>
                    Mobile App Development Solutions</h2>
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
                                {id: "01", title: "App Consultancy", target: "consultancy"},
                                {id: "02", title: "App Design", target: "design"},
                                {id: "03", title: "App Development", target: "development"},
                                {id: "04", title: "Services Integration", target: "integration"},
                                {id: "05", title: "Backend Development for Apps", target: "backend"},
                                {id: "06", title: "Databases for Apps", target: "databases"},
                                {id: "07", title: "App Maintenance", target: "maintenance"},
                                {id: "08", title: "App Modernisation", target: "modernisation"},
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
                                 id={'consultancy'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>App Consultancy</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market analysis</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feasibility assessments</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Platform and technology</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Roadmap and scoping</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Before writing a single line of code, we focus on fully understanding your vision.
                                    Whether you have a well-defined concept or just a challenge in need of a solution,
                                    our expert consultancy ensures your app’s journey starts on the right
                                    path.<br/><br/>
                                    We begin with comprehensive discovery sessions to uncover your business goals,
                                    target audience, and competitive landscape. From there, we refine your concept,
                                    define the app’s core value, and help you choose the right platform—iOS, Android, or
                                    cross-platform—based on your objectives. We also establish the ideal tech stack,
                                    project scope, and development timeline to align with your requirements, setting the
                                    foundation for a successful build.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'design'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>App Design</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Brand integration</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>High-fidelity UI design</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UX research and testing</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Wireframing and prototypes</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Great apps begin with great design—and our process is built to deliver just that. We
                                    blend creative design thinking with user-centered methodologies to craft interfaces
                                    that are not only visually striking but also highly functional and
                                    intuitive.<br/><br/>
                                    From clean layouts and seamless navigation to thoughtful interactions, every detail
                                    is designed to enhance usability and engagement. Whether you&#39;re building for
                                    consumers or enterprise users, we ensure the app&#39;s interface reflects your <Link
                                    href={'/pages/services/branding.tsx/'} className={`relative border-b pb-[0.17em] ${
                                    isDayTime ? 'border-gray-400 hover:border-black' : 'border-gray-800 hover:border-white'
                                }`}>brand</Link> identity and delivers a consistent, high-quality user experience across
                                    every screen.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'development'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>App Development</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Native iOS and Android</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cross-platform</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Agile</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Testing & QA</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Our development team turns your vision into reality using robust code and the latest
                                    technologies. Whether you&#39;re building a consumer-facing app or an
                                    enterprise-grade solution, we ensure your product is secure, scalable, and built for
                                    long-term success.<br/><br/>
                                    With full-stack expertise and deep experience in both native and cross-platform
                                    frameworks, we deliver high-performance applications tailored to your needs. Guided
                                    by agile methodologies, we collaborate closely, iterate quickly, and launch apps
                                    that meet your business goals while delivering a seamless, engaging user experience.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'integration'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Services Integration</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Payment gateways</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Social media APIs</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Geo-location</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Messaging</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Push notifications</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Analytics</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Modern apps thrive on seamless integration with third-party services that extend
                                    functionality and user engagement. We efficiently and securely integrate key
                                    features such as in-app payments, geolocation, social media, analytics, and
                                    more—enabling your app to deliver a richer, more connected experience.<br/><br/>
                                    Whether it&#39;s enhancing usability, expanding reach, or supporting
                                    business-critical functions, our team ensures every integration is optimised for
                                    performance, security, and scalability—so your app works flawlessly while meeting
                                    evolving user expectations.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`} id={'backend'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Backend Development for Apps</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API development</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Database design</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data storage</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Authentication</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cloud hosting</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    A reliable, well-architected backend is essential to the long-term success and
                                    scalability of any mobile or web application. At the core of our development
                                    approach is the creation of secure, high-performance backend systems tailored to
                                    your business needs—whether hosted in the cloud or on-premises. We focus on building
                                    resilient infrastructures that not only support current functionality but are
                                    designed to grow with your user base and evolving requirements.<br/><br/>
                                    Our team handles everything from designing APIs and setting up databases to
                                    configuring server infrastructure, ensuring seamless communication between your
                                    frontend and backend systems. With performance, security, and scalability at the
                                    forefront, we create backend solutions that enable your app to deliver consistent,
                                    real-time user experiences. Whether you&#39;re a startup preparing for launch or an
                                    established business scaling up, our backend development lays a strong, future-ready
                                    foundation for your digital product.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'databases'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>Databases for Apps</h2>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Your app’s effectiveness depends heavily on how well it manages and leverages data.
                                    We design and implement robust database solutions that are optimised for
                                    performance, scalability, and security—ensuring your app runs smoothly, even under
                                    heavy data loads.<br/><br/>
                                    Whether your application demands real-time data processing, complex relational
                                    structures, or flexible document storage, we select the right technology to match
                                    your requirements. From MySQL and PostgreSQL to NoSQL solutions like MongoDB and
                                    Firebase, our team ensures fast, reliable access to data while maintaining the
                                    highest standards of integrity and protection. With a focus on future growth, we
                                    build data architectures that scale effortlessly as your business and user base
                                    expand.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                            </div>
                            <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'maintenance'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>App Maintenance</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Updates and patches</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security monitoring</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bug fixing</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Feature expansion</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    Launching your app is just the first step—ongoing maintenance is essential to keep
                                    it secure, functional, and aligned with evolving user expectations. We provide
                                    comprehensive post-launch support and maintenance services, ensuring your app
                                    remains high-performing, secure, and up-to-date in a fast-changing digital
                                    landscape.<br/><br/>
                                    From regular performance monitoring and bug fixes to compatibility updates for new
                                    operating systems and devices, our team handles the technical upkeep so you can
                                    focus on growing your business. We also support feature enhancements and iterative
                                    improvements based on user feedback and analytics, helping your app stay
                                    competitive, relevant, and continuously optimised for success.
                                </p>
                            </div>
                            <div
                                className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                            </div>
                            <div className={`lg:mb-[25em] mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                 id={'modernisation'}>
                                <h2 className={`text-[1.5em] font-[500] mb-3`}>App Modernisation</h2>
                                <div
                                    className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                    <span className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI/UX redesign</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Refactoring</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Upgrades</span>
                                    <span
                                        className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Optimisation</span>
                                </div>
                                <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                    If your existing app is no longer meeting the demands of your business or users, our
                                    modernisation services are designed to bring it up to speed. We help transform
                                    outdated apps by improving their design, enhancing user experience, and updating the
                                    codebase to ensure compatibility with the latest technologies. Our approach ensures
                                    your app stays relevant and continues to deliver exceptional performance.<br/><br/>
                                    We take a comprehensive approach to modernisation, whether it’s through a complete
                                    visual overhaul to refresh the user interface or optimising backend systems to
                                    improve scalability and speed. By upgrading your app to align with current device
                                    standards, security protocols, and user expectations, we ensure it remains
                                    competitive in an ever-evolving market. Our goal is to extend the lifespan of your
                                    app, improve user satisfaction, and support your long-term business growth. Whether
                                    it&#39;s adding new features or refining existing ones, we make your legacy app a
                                    modern, high-performing solution that drives results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications  */}
            <div className="relative lg:h-[150vh] h-auto">
                <Image
                    src={'/assets/mad/application.png'}
                    alt={'image application'}
                    width={1920}
                    height={1080}
                    id={'image application'}
                    className={`lg:-mt-[22em] relative max-w-full mx-auto w-full h-auto`}
                />
            </div>

            {/* Benefit from our mobile app development experience */}
            <div
                className={`relative py-16 lg:mb-16 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                {/* Business Benefit Header */}
                <div className={`border-b-[0.1em] border-gray-300/50 pb-[2em] lg:mb-[5em] ${
                    isDayTime ? 'text-black' : 'text-white'
                }`}>
                    <h2 className='text-[1em] sm:text-[1.5em] md:text-[2em] lg:text-[3em] font-[550] tracking-normal leading-[1.15] lg:pb-6'>
                        Benefits From <br className={'lg:block md:block hidden'}/>Our Mobile App <br
                        className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Experience

                    </h2>
                </div>


                {/* Benefits */}
                <div
                    className={`relative w-full h-auto grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-[4em] md:gap-[3em] sm:gap-[3em] gap-[2em]  ${
                        isDayTime ? 'text-black' : 'text-white'
                    }`}>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/del1.svg' : '/assets/mad/icon1/del.svg'}
                            alt={'Accelerated mobile app delivery'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Accelerated Mobile <br className={'lg:block md:block hidden'}/>App Delivery
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            In the fast-paced world of mobile apps, time-to-market is critical for staying ahead of the
                            competition. Our streamlined mobile app delivery process is designed to accelerate
                            development without compromising quality, ensuring your app reaches the market quickly and
                            efficiently.<br/><br/>
                            By leveraging agile methodologies, experienced teams, and cutting-edge technologies, we
                            fast-track every phase—from ideation and design to development and deployment. This approach
                            enables us to meet tight deadlines, adapt to changes seamlessly, and deliver a polished,
                            high-performance app that aligns with your business goals. Whether you&#39;re launching a
                            new
                            product or updating an existing one, our goal is to ensure you get to market faster, with
                            maximum impact.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/cons1.svg' : '/assets/mad/icon1/cons.svg'}
                            alt={'Experienced app development team'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Experienced App Development Team
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our experienced app development team is made up of skilled developers, designers, and
                            strategists who work seamlessly together to deliver high-quality, user-centric mobile apps.
                            Each project benefits from a multidisciplinary approach—where technical expertise, creative
                            vision, and strategic thinking come together to create apps that are not only functional but
                            also aligned with your business goals.<br/><br/>
                            From concept to launch, we prioritise collaboration, communication, and quality. Whether
                            you’re building a brand-new product or enhancing an existing one, our team is dedicated to
                            delivering innovative solutions that perform reliably, engage users, and drive measurable
                            results.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/development1.svg' : '/assets/mad/icon1/development.svg'}
                            alt={'Cost effective app development'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Cost Effective <br className={'lg:block md:block hidden'}/>App Development
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            We understand that delivering value while managing costs is essential to any successful
                            project. Our cost-effective approach to mobile app development is designed to maximise your
                            return on investment by balancing high-quality outcomes with budget-conscious planning.<br/><br/>
                            Through efficient processes, smart technology choices, and a focus on your core business
                            goals, we ensure that every resource is used wisely. Whether you&#39;re a startup working
                            with
                            limited funding or an established business looking to scale, we deliver robust, scalable
                            mobile solutions that meet your needs without unnecessary overhead—ensuring you get the most
                            out of every dollar spent.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/brand1.svg' : '/assets/mad/icon1/brand.svg'}
                            alt={'User-centred mobile app design'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            User-centred Mobile <br className={'lg:block md:block hidden'}/>App Design
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Our approach to mobile app design is rooted in user-centric principles, ensuring that every
                            interaction feels natural, engaging, and effortless. We focus on creating intuitive
                            interfaces that not only look great but also enhance usability, helping users achieve their
                            goals quickly and efficiently.<br/><br/>
                            By understanding your target audience&#39;s needs, behaviours, and expectations, we craft
                            experiences that drive satisfaction, retention, and brand loyalty. From wireframes to
                            polished visuals, every design decision is made with the end user in mind—resulting in
                            mobile apps that are both functional and delightful to use, while also supporting your
                            broader business objectives.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/access1.svg' : '/assets/mad/icon1/access.svg'}
                            alt={'App store optimisation experts'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            App Store <br className={'lg:block md:block hidden'}/>Optimisation Experts
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Navigating the complexities of App Store Optimisation (ASO) is essential for driving
                            visibility, downloads, and long-term success in a crowded mobile marketplace. Our team of
                            ASO specialists leverages deep industry knowledge and the latest best practices to ensure
                            your app ranks higher, attracts the right audience, and converts views into
                            installs.<br/><br/>
                            From keyword research and metadata optimisation to compelling visuals, reviews management,
                            and A/B testing, we take a strategic approach to every element that influences app store
                            performance. Whether you’re launching a new app or looking to improve discoverability for an
                            existing one, we help maximise your app’s visibility and ROI by positioning it for success
                            on both the Apple App Store and Google Play Store.
                        </p>
                    </div>
                    <div>
                        <Image
                            src={isDayTime ? '/assets/mad/icon1/brand1.svg' : '/assets/mad/icon1/brand.svg'}
                            alt={'Comprehensive support and maintenance'}
                            width={60}
                            height={60}
                            className={'h-auto w-auto mb-2'}
                        />
                        <h5 className={'lg:text-[1.6em] md:text-[1.7em] sm:text-[1.6em] text-[1.3em] font-[500] mb-8'}>
                            Comprehensive Support <br className={'lg:block md:block hidden'}/>& Maintenance
                        </h5>
                        <p className={'text-[0.873em] text-justify font-[300]'}>
                            Ensuring the long-term success of your mobile app goes beyond launch—it requires consistent
                            support, maintenance, and optimisation. Our comprehensive support services are designed to
                            keep your app running at peak performance, with regular updates, proactive performance
                            monitoring, and fast, reliable issue resolution.<br/><br/>
                            We handle everything from bug fixes and security patches to OS compatibility and feature
                            enhancements, so your app remains competitive, secure, and aligned with evolving user
                            expectations. With our dedicated team by your side, you can focus on your business while we
                            ensure your app continues to deliver seamless experiences and real value over time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile App Types */}
            <div
                className={`relative mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:py-14 py-8 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px] lg:pb-[6em] pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] leading-[1.2]`}>
                            Types of mobile apps
                        </h2>
                    </div>
                    <div>
                        <p className='text-[0.873em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[3em] tracking-noromal'>
                            We deliver end-to-end application development services across all industries, crafting
                            innovative and scalable digital solutions that meet the evolving demands of both B2C and B2B
                            audiences, while accelerating growth, enhancing user experience, and driving long-term
                            business success.
                        </p>
                    </div>
                </div>

                {/* Construction App */}
                <div id={'construction'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Construction Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mad/construction.jpg'
                                alt='Construction'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We develop digital solutions—from project management platforms to cost-tracking
                            tools—that enhance collaboration, improve efficiency, and drive growth for construction
                            firms of all sizes.
                        </p>
                    </div>
                </div>

                {/* Finance App */}
                <div id={'finance'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Finance Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mad/finance.jpg'
                                alt='Finance'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            Our custom financial software strengthens security, ensures compliance, and streamlines
                            transaction processing—enabling finance firms to deliver seamless digital experiences
                            while optimising operational efficiency.
                        </p>
                    </div>
                </div>

                {/* Healthcare Apps */}
                <div id={'healthcare'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Healthcare Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mad/healthcare.jpg'
                                alt='Healthcare'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We develop versatile healthcare applications that enhance patient engagement, optimize
                            clinical workflows, and ensure compliance with industry regulations like GDPR—enabling
                            healthcare providers across the spectrum to deliver more effective, patient-centered
                            care.
                        </p>
                    </div>
                </div>

                {/* Insurance Apps */}
                <div id={'insurance'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4 border-b-[1px] lg:pb-[2em] pb-[2em] ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Insurance Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[4.8em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mad/insurance.jpg'
                                alt='Insurance'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We use AI and automation to build tailored digital solutions that streamline policy
                            management, enhance customer experience, and accelerate claims processing for insurance
                            companies.
                        </p>
                    </div>
                </div>

                {/* membership Apps */}
                <div id={'membership'}
                     className={`grid lg:grid-cols-2 grid-cols-1 lg:mb-8 mb-6 gap-4  ${isDayTime ? 'text-gray-300 hover:text-black' : 'text-gray-700 hover:text-white'} group`}>
                    <div className='relative'>
                        <h2 className='text-[2em] font-[500] justify-center tracking-tight lg:pr-[10em] leading-[1.2] rounded-none'>
                            Membership <br className={'lg:block md:block hidden'}/>& Loyalty Apps
                        </h2>
                        <div
                            className='absolute lg:block md:hidden sm:hidden lg:pl-[18em] lg:-mt-[3.2em] inset-0 opacity-0 group-hover:opacity-90 transition-opacity  duration-300'>
                            <Image
                                src='/assets/mad/membership.jpg'
                                alt='Membership & Loyalty'
                                height={250}
                                width={250}
                            />
                        </div>
                    </div>
                    <div>
                        <p className='text-[0.85em] lg:-ml-[3em] font-[400] justify-center text-justify leading-[1.2] tracking-normal'>
                            We build reliable platforms for membership organizations that simplify renewals,
                            streamline communication, and enhance member management through intuitive, user-friendly
                            systems.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Apps Features */}
            <div
                className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.5em] lg:py-14 py-8 mt-14 ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                    <div>
                        <h2 className={`lg:text-[3em] text-[1.5em] font-[500] justify-center tracking-tight lg:pr-[1em] lg:mb-12 mb-8 leading-[1.2]`}>
                            Mobile app features</h2>
                        <p className="text-gray-500 text-base">
                            Mobile apps support many native abilities. Here are just a few.
                        </p>
                    </div>
                    <div className={`lg:-ml-5 md:-ml-5 ${isDayTime ? 'text-black' : 'text-white'}`}>
                        <h2 className="text-[2em] font-[500] mb-6">Features</h2>
                        <ul className={`divide-y ${isDayTime ? 'divide-black' : 'divide-white'}`}>
                            {features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3 py-3">
                                    <CheckCircle className="w-5 h-5  mt-1"/>
                                    <span className="text-[1.2em]">{feature}</span>
                                </li>
                            ))}
                        </ul>
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
                    We specialize in crafting high-impact marketing websites, innovative web apps, and mobile
                    applications that drive real results. From funded startups to established businesses, we&#39;ve
                    helped a wide range of clients bring their digital products to life—delivering standout experiences
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

            {/* Team  */}
            <Image
                src={'/assets/mad/team.jpg'}
                alt={'Team'}
                width={1920}
                height={1080}
                id={'team'}
                className={`lg:-mt-[5em] max-w-full mx-auto w-full  h-auto`}
            />

            {/* Why Grey InfoTech for your app project */}
            <div className={`relative lg:pt-32 lg:pb-14 px-4 sm:px-6 lg:px-[4.6em] lg:mb-20 mb-12 ${
                isDayTime ? 'text-black' : 'text-white'}`}>
                <div
                    className={`relative grid lg:grid-cols-2 grid-cols-1  lg:gap-14 gap-6 lg:max-w-full mx-auto border-b-[0.001em] pb-2`}>
                    <div>
                        <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.15] lg:pb-6 rounded-none'>
                            Why Grey InfoTech <br className={'lg:block md:block hidden'}/>For Your App Project
                        </h2>
                    </div>
                    <div className='lg:-ml-[8em]'>
                        <p className='text-[0.873em] font-[400] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                            We’ve successfully delivered projects across a wide range of industries. In this section,
                            you’ll find examples of our experience that may align with your business needs.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={`relative -mt-20 ${isDayTime ? 'bg-white' : 'bg-black'} lg:mb-16 lg:pb-28 pb-14 mb-12  px-6`}>
                <div
                    className='relative mx-auto px-4 sm:px-6 lg:px-[4.6em] grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:mb-36'>
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
                                                initial={{opacity: 0, y: -50}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: 0}}
                                                transition={{duration: 0}}
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
                    <div className='lg:mt-[3em] h-[30vh] sticky'>
                        <Image
                            src={'/assets/mad/group.jpg'}
                            alt="Group"
                            width={660}
                            height={150}
                        />
                    </div>
                </div>
                <div
                    className={`items-center ${isDayTime ? 'text-black' : 'text-white'} justify-center`}>
                    <h2 className='lg:text-[3em] text-[1.5em] font-[600] tracking-tighter leading-[1.1] pb-6 text-center'>
                        Ready To Start The <br className={'lg:block md:block hidden'}/>Conversation?
                    </h2><br/>
                    <Link href='../contact.tsx' className='flex items-center justify-center-safe text-center'>
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
                        <h2 className='lg:text-[3em] md:text-[2em] sm:text-[1em] font-[500] leading-[1.2] tracking-tight mb-8'>FAQ
                            About Mobile Apps
                        </h2>
                        <p className={'text-[0.83em] font-[300] '}>The most effective way to address these questions is
                            through an initial consultation, where <br className={'lg:block md:block hidden'}/>we can
                            assess the
                            scope and requirements of your app.
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
                            <span>How much does mobile app development cost?</span>
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
                                This is often the first question we’re asked—and the most difficult to answer upfront.
                                The truth is, the cost depends on your app’s specific features, functionality, and
                                overall scope. However, we follow a proven process to define the requirements
                                collaboratively and help you arrive at a clear, realistic budget.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How long does it take to build an app?</span>
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
                                The time required to develop an app depends on a range of factors, including the size
                                and complexity of the project, the number of platforms (iOS, Android), and the specific
                                features required. We’ve delivered apps under tight deadlines and across various
                                devices. Through an initial consultation and a structured <Link
                                href={'/pages/services/discovery-phase.tsx'}
                                className={`border-b pb-1 ${
                                    isDayTime ? 'border-gray-300 hover:border-white' : 'border-gray-700 hover:border-black'
                                }`}>discovery phase</Link>, we’ll gain a
                                clear understanding of your needs and provide an accurate development timeline tailored
                                to your project.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Who develops your apps?</span>
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
                                All of our app development is carried out entirely in-house at our offices in Port
                                Harcourt, Rivers State, Nigeria. We believe that maintaining full control over every
                                stage of the development process is essential to delivering solutions of the highest
                                quality. That’s why we don’t outsource any part of our work. Our in-house team ensures
                                consistent communication, faster iteration, and full accountability from start to
                                finish. As registered Apple and Android developers, we also manage the full deployment
                                process—ensuring your app is successfully launched on both the Apple App Store
                                and <Link href={'/pages/services/seo.tsx'} className={`border-b pb-1 ${
                                isDayTime ? 'border-gray-300 hover:border-white' : 'border-gray-700 hover:border-black'
                            }`}>Google</Link> Play, in compliance with platform requirements.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is a native app?</span>
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
                                A native app is a software application developed specifically for a particular
                                platform—such as iOS or Android—using platform-specific programming languages and tools.
                                These apps are installed directly on the user’s device and are optimized to take full
                                advantage of native hardware and system capabilities, such as the camera, GPS,
                                accelerometer, contacts, and more. Native apps typically deliver superior performance,
                                responsiveness, and user experience compared to cross-platform alternatives.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is a hybrid app?</span>
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
                                Native apps are built specifically for a single platform (iOS or Android) using
                                platform-specific languages and tools. They offer the best performance, access to all
                                device features, and a seamless user experience.
                                Hybrid apps, on the other hand, are developed using web technologies (like HTML, CSS,
                                and JavaScript) and run inside a native container. While they can access some device
                                capabilities and work across multiple platforms, they may have limitations in
                                performance and responsiveness compared to fully native apps.<br/><br/>
                                The choice between native and hybrid depends on your project’s goals, timeline, and
                                budget.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What are the main differences between native <br
                                className={'lg:block md:block hidden'}/>and hybrid apps?</span>
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
                                Native apps are faster, more reliable, and offer superior responsiveness. They provide
                                better support for gestures and can fully utilize a device&#39;s features, such as push
                                notifications, GPS, and camera functionality. This makes them ideal for applications
                                that require high performance and seamless user experiences.
                                In contrast, hybrid apps are typically easier and faster to develop across multiple
                                platforms, as they use a single codebase rather than separate code for each platform.
                                While they may not match the performance of native apps, hybrid apps can be a more
                                cost-effective solution for projects that need to reach both iOS and Android users with
                                less development time.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Which is better: native or hybrid apps?</span>
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
                                The decision between native and hybrid apps largely depends on your app’s requirements,
                                budget, and timeline.<br/><br/>
                                <ul className={'list-disc'}>
                                    <li>
                                        Native Apps: If performance, reliability, and superior user experience are
                                        critical—such as for apps requiring intensive graphics, real-time interactions,
                                        or heavy use of device features (e.g., gaming apps, advanced photo editing, or
                                        augmented reality apps)—native apps are typically the best choice. They offer
                                        optimal speed and responsiveness and are tailored to each platform, ensuring a
                                        smooth and immersive experience.
                                    </li>
                                    <br/>
                                    <li>
                                        Hybrid Apps: For apps that need to be developed and deployed quickly on both iOS
                                        and Android within a constrained budget, hybrid apps are often the better
                                        solution. They are built with a single codebase and can be launched across
                                        platforms more efficiently, making them ideal for apps with moderate
                                        functionality, such as e-commerce apps, informational apps, or news apps. Hybrid
                                        apps provide a faster time to market, though they may not match native apps in
                                        performance and advanced functionality.
                                    </li>
                                </ul>
                                <br/>
                                By understanding your app’s core needs, you can determine which option is the most
                                efficient and cost-effective for your project.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Are there any popular apps that are hybrid?</span>
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
                                Yes, several high-profile apps—such as Instagram, Uber, Gmail, and Twitter—are built
                                using hybrid technology. These applications require availability on both iOS and Android
                                platforms to reach a wide audience and must be updated frequently to stay relevant and
                                competitive. Hybrid solutions offer a significant advantage in this regard, as they
                                enable faster development and streamlined updates across both platforms with a single
                                codebase. This approach reduces time to market, cuts development costs, and ensures that
                                updates are efficiently rolled out across all devices, making hybrid apps an ideal
                                choice for businesses looking to maintain a strong digital presence while optimizing
                                resources.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Can I switch from a hybrid app to a native app later?</span>
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
                                Yes, it is possible to convert a hybrid app into a native app, but it requires rewriting
                                the app using the native programming languages specific to each platform—Swift for iOS
                                and Java/Kotlin for Android. This process can be both time-consuming and costly, as it
                                involves developing separate codebases for each platform and ensuring full compatibility
                                with device-specific features. While the conversion may provide enhanced performance and
                                access to more platform-specific functionalities, it’s important to carefully consider
                                the cost, timeline, and overall benefits before proceeding with such a transition.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>What are some programming languages used <br
                                className={'lg:block md:block hidden'}/>for native and hybrid app development?</span>
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
                                For native app development, Swift and Objective-C are used for iOS, while Java and
                                Kotlin are employed for Android development. These languages are platform-specific and
                                ensure optimal performance, user experience, and access to the full range of device
                                capabilities.<br/><br/>
                                In contrast, hybrid apps are typically developed using frameworks like React Native,
                                Ionic, or Flutter. These technologies allow for the use of JavaScript, TypeScript, or
                                Dart, respectively, enabling a single codebase to run across both iOS and Android
                                platforms. Hybrid development offers efficiency and cost-effectiveness, though it may
                                involve trade-offs in performance compared to fully native solutions.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(10)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Is it easier to maintain a native or a hybrid app?</span>
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
                                Hybrid apps are generally easier to maintain because they rely on a single codebase that
                                can be deployed across multiple platforms. This unified approach simplifies updates and
                                bug fixes, making it more efficient to manage apps across both iOS and Android. Hybrid
                                solutions can save time and resources in the long term, particularly for apps that don’t
                                require complex, platform-specific features.<br/><br/>
                                On the other hand, native apps offer the advantage when it comes to quickly integrating
                                the latest platform-specific features as soon as they are released. Since native apps
                                are built using the platform’s native programming language, they are able to fully
                                leverage new capabilities and updates from iOS or Android. However, this can make
                                maintenance more time-consuming and resource-intensive, as updates and changes must be
                                made separately for each platform.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(11)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Do hybrid apps have any performance issues?</span>
                            {onIndex === 11 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 11 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Yes, hybrid apps can sometimes face performance challenges. Since they run through a
                                &#34;middle-man&#34;—a web view that connects the app to the device’s native
                                features—this can
                                lead to slower performance compared to fully native apps, which are optimized for the
                                specific platform. However, hybrid technologies are continuously evolving. Tools like
                                React Native, Flutter, and Ionic are improving performance significantly, enabling
                                hybrid apps to run more efficiently and handle more complex tasks. While hybrid apps may
                                still have some limitations in terms of speed and responsiveness compared to native
                                apps, these performance gaps are narrowing as the technology advances.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(12)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>Are native apps more secure than hybrid apps?</span>
                            {onIndex === 12 ? (
                                <AiOutlineMinus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            ) : (
                                <AiOutlinePlus
                                    className={`lg:text-[1.5em] text-[1em] ${isDayTime ? 'text-teal-800' : 'text-teal-400'}`}/>
                            )}
                        </button>
                        {onIndex === 12 && (
                            <p className="mt-4 text-[0.85em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                Both native and hybrid apps can be built to be secure, but native apps generally have a
                                slight edge in terms of security. This is because they have direct access to the
                                underlying operating system, allowing for tighter control over security features such as
                                encryption, authentication, and data protection. Since native apps are fully integrated
                                with the platform’s security protocols, they can take advantage of the latest security
                                measures offered by iOS and Android.<br/><br/>
                                That said, hybrid apps can also be highly secure if developed with the right precautions
                                and strategies. By implementing strong encryption, secure APIs, and regular updates,
                                hybrid apps can be made secure and compliant with industry standards. The key lies in
                                careful planning and leveraging the latest hybrid development tools, which continue to
                                improve in terms of security.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default MobileApplicationDevelopment;