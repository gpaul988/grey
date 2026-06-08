import React, {useEffect, useRef, useState} from 'react';
import '../../app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

const tabs = [
    {key: "frameworks", label: "Frameworks"},
    {key: "cloud", label: "Cloud"},
    {key: "frontend", label: "Frontend"},
    {key: "backend & database", label: "Backend & Database"},
    {key: "others", label: "Others"}
];

const data: Record<string, { name: string; logo: string }[]> = {
    frameworks: [
        {name: "React Native", logo: "/assets/cross/logos/react_native.svg"},
        {name: "Ionic", logo: "/assets/cross/logos/ionic.svg"},
        {name: "Xamarin", logo: "/assets/cross/logos/xamarin.svg"},
        {name: "Flutter", logo: "/assets/cross/logos/flutter.svg"},
        {name: "Kotlin", logo: "/assets/cross/logos/kotlin.svg"},
        {name: "Cordova", logo: "/assets/cross/logos/cordova.svg"},
    ],
    cloud: [
        {name: "AWS", logo: "/assets/cross/logos/aws.svg"},
        {name: "Microsoft Azure", logo: "/assets/cross/logos/microsoft.svg"},
        {name: "Google Cloud Platform", logo: "/assets/cross/logos/google.svg"},
    ],
    frontend: [
        {name: "Angular.js", logo: "/assets/cms/logos/angular.svg"},
        {name: "Bootstrap", logo: "/assets/cms/logos/bootstrap.svg"},
        {name: "React.js", logo: "/assets/cms/logos/react.svg"},
        {name: "Vue.js", logo: "/assets/cms/logos/vue.svg"},
        {name: "JQuery", logo: "/assets/cross/logos/jquery.svg"},
        {name: "WPF", logo: "/assets/cross/logos/wpf.svg"},
    ],
    "backend & database": [
        {name: "Django", logo: "/assets/cms/logos/django.svg"},
        {name: "Laravel", logo: "/assets/cms/logos/laravel.svg"},
        {name: "MongoDB", logo: "/assets/cms/logos/mongodb.svg"},
        {name: "MySQL", logo: "/assets/cms/logos/mysql.svg"},
        {name: "Flask", logo: "/assets/cross/logos/flask.svg"},
        {name: "SQL Server", logo: "/assets/cross/logos/sql-server.svg"},
        {name: "Maria DB", logo: "/assets/cross/logos/mariadb.svg"},
    ],
    others: [
        {name: "Android Studio", logo: "/assets/cross/logos/android-studio.svg"},
        {name: "Visual Studio", logo: "/assets/cross/logos/visual-studio.svg"},
        {name: "Netbeans", logo: "/assets/cross/logos/netbeans.svg"},
        {name: "AWS", logo: "/assets/cross/logos/aws.svg"},
        {name: "Docker", logo: "/assets/cross/logos/docker.svg"},
        {name: "Azure", logo: "/assets/cross/logos/azure.svg"},
        {name: "Google Cloud", logo: "/assets/cross/logos/google-cloud.svg"},
    ],
};


const CrossPlatformDevelopment = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [activeAcc, setActiveAcc] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(false);
    const [activeFront, setActiveFront] = useState("frontend");


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

    // Development Services hook
    const handleScroll = () => {
        const sections = [
            "SC",
            "CPAD",
            "RA",
            "CPAM",
            "CPAS",
            "CSD",
            "CPAI"
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
    }

    // Details
    const statis: { icon: React.ReactNode; number: string; label: string }[] = [
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Gear */}
                    <circle cx="35" cy="35" r="18" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="35" cy="35" r="12" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Gear teeth */}
                    <rect x="33" y="15" width="4" height="6" fill="#10e3e3"/>
                    <rect x="33" y="54" width="4" height="6" fill="#10e3e3"/>
                    <rect x="54" y="33" width="6" height="4" fill="#10e3e3"/>
                    <rect x="15" y="33" width="6" height="4" fill="#10e3e3"/>
                    <rect x="49" y="20" width="5" height="5" transform="rotate(45 51.5 22.5)" fill="#10e3e3"/>
                    <rect x="20" y="20" width="5" height="5" transform="rotate(45 22.5 22.5)" fill="#10e3e3"/>
                    <rect x="49" y="49" width="5" height="5" transform="rotate(45 51.5 51.5)" fill="#10e3e3"/>
                    <rect x="20" y="49" width="5" height="5" transform="rotate(45 22.5 51.5)" fill="#10e3e3"/>
                    {/* Person inside gear */}
                    <circle cx="35" cy="32" r="4.5" stroke="#10e3e3" strokeWidth="2"/>
                    <path d="M27 42c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#10e3e3" strokeWidth="2"/>
                    {/* Checkmark in circle */}
                    <circle cx="55" cy="55" r="12" fill="#10e3e3"/>
                    <path d="M49 55l4 4 8-8" stroke="#0B3D5D" strokeWidth="3" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            ),
            number: '12+',
            label: 'Experts'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Monitor/Screen */}
                    <rect x="18" y="25" width="44" height="30" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Screen content lines */}
                    <rect x="24" y="31" width="32" height="3" rx="1.5" fill="#10e3e3"/>
                    <rect x="24" y="38" width="24" height="3" rx="1.5" fill="#10e3e3"/>
                    <rect x="24" y="45" width="28" height="3" rx="1.5" fill="#10e3e3"/>
                    {/* Monitor stand */}
                    <rect x="36" y="55" width="8" height="6" fill="#10e3e3"/>
                    <rect x="28" y="61" width="24" height="4" rx="2" fill="#10e3e3"/>
                    {/* CMS Gear icon on monitor */}
                    <circle cx="40" cy="18" r="8" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="40" cy="18" r="4" stroke="#10e3e3" strokeWidth="2"/>
                    <rect x="39" y="9" width="2" height="3" fill="#10e3e3"/>
                    <rect x="39" y="24" width="2" height="3" fill="#10e3e3"/>
                    <rect x="47" y="17" width="3" height="2" fill="#10e3e3"/>
                    <rect x="30" y="17" width="3" height="2" fill="#10e3e3"/>
                </svg>
            ),
            number: '10+',
            label: 'Deployed'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Document/Paper */}
                    <rect x="25" y="15" width="30" height="40" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Top dots (browser-like) */}
                    <circle cx="30" cy="22" r="2" fill="#10e3e3"/>
                    <circle cx="37" cy="22" r="2" fill="#10e3e3"/>
                    <circle cx="44" cy="22" r="2" fill="#10e3e3"/>
                    {/* Document lines */}
                    <line x1="30" y1="30" x2="50" y2="30" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="36" x2="46" y2="36" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="42" x2="50" y2="42" stroke="#10e3e3" strokeWidth="2"/>
                    <line x1="30" y1="48" x2="44" y2="48" stroke="#10e3e3" strokeWidth="2"/>
                    {/* Pencil */}
                    <path d="M52 50l-8 8 3 3 8-8-3-3z" fill="#10e3e3" stroke="#10e3e3" strokeWidth="1"/>
                    <rect x="56" y="44" width="4" height="10" transform="rotate(45 58 49)" fill="#10e3e3"/>
                    <path d="M62 42l2 2" stroke="#10e3e3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            ),
            number: '3X',
            label: 'Faster Content Publishing'
        },
        {
            icon: (
                <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lock body */}
                    <rect x="28" y="35" width="24" height="26" rx="2" stroke="#10e3e3" strokeWidth="2.5"/>
                    {/* Lock shackle */}
                    <path d="M32 35V27c0-4.4 3.6-8 8-8s8 3.6 8 8v8" stroke="#10e3e3" strokeWidth="2.5"
                          strokeLinecap="round"/>
                    {/* Keyhole */}
                    <circle cx="40" cy="46" r="3" fill="#10e3e3"/>
                    <rect x="38.5" y="46" width="3" height="8" rx="1.5" fill="#10e3e3"/>
                    {/* User icon in circle */}
                    <circle cx="58" cy="48" r="11" stroke="#10e3e3" strokeWidth="2.5"/>
                    <circle cx="58" cy="45" r="4" stroke="#10e3e3" strokeWidth="2"/>
                    <path d="M51 54c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#10e3e3" strokeWidth="2"/>
                </svg>
            ),
            number: '70%',
            label: 'Better Multi-User Access'
        }
    ];

    // Engineering Leadership in the App Economy
    const [webIndex, setWebIndex] = useState<number | null>(null);

    const toggleWeb = (index: number) => {
        setWebIndex(webIndex === index ? null : index);
    }

    // Accordion
    const steps = [
        {
            number: "01",
            title: "LAUNCHING A CROSS-PLATFORM APP",
            heading: "Launching A Cross-Platform App",
            description: (
                <>
                    Grey InfoTech&#39;s specialized cross-platform development capabilities enable enterprises to deploy
                    sophisticated applications that operate flawlessly across iOS, Android, web, and emerging platforms
                    with complete functional parity and design consistency. Our architectural approach leverages
                    industry-leading frameworks and native API integrations to deliver performance that rivals
                    platform-specific applications while significantly reducing development timelines and total cost of
                    ownership. By engineering unified codebases with platform-specific optimizations, we ensure your
                    application provides seamless user experiences regardless of device type, screen size, or operating
                    system version—eliminating market fragmentation and enabling simultaneous updates across all
                    platforms. This strategic approach accelerates market penetration, enhances brand consistency,
                    maximizes user reach, and provides the operational agility necessary to respond quickly to evolving
                    business requirements and competitive pressures in today&#39;s multi-platform digital landscape.
                </>
            )
        },
        {
            number: "02",
            title: "ACCELERATING PRODUCT LAUNCH",
            heading: "Accelerating Product Launch",
            description: (
                <>
                    Grey InfoTech&#39;s cross-platform development methodology dramatically accelerates time-to-market—a
                    critical advantage for enterprises competing in rapidly evolving digital markets. By architecting
                    unified codebases that deploy simultaneously across iOS, Android, and web platforms, we eliminate
                    the sequential development cycles required by native approaches, reducing launch timelines by up to
                    50%. This accelerated deployment capability enables businesses to capitalize on market opportunities
                    quickly, respond to competitive pressures with agility, and validate product-market fit before
                    committing extensive resources. Our streamlined development process maintains rigorous quality
                    standards while compressing timelines, allowing you to establish market presence, capture early
                    adopter momentum, and achieve faster return on investment—essential factors for maintaining
                    competitive differentiation and leadership in industries where speed and innovation determine market
                    success.
                </>
            )
        },
        {
            number: "03",
            title: "COST-EFFECTIVE APP DEVELOPMENT",
            heading: "Cost-Effective App Development",
            description: (
                <>
                    Grey InfoTech delivers exceptional value through cost-optimized cross-platform development services
                    that significantly reduce total development expenditure without compromising quality or
                    functionality. By leveraging shared codebases and unified development workflows, we eliminate the
                    substantial costs associated with maintaining separate native development teams and parallel project
                    tracks—typically reducing development investment by 40-60% compared to platform-specific approaches.
                    Our efficiency extends beyond initial development to encompass ongoing maintenance, updates, and
                    feature enhancements, where single-source modifications deploy simultaneously across all platforms.
                    This economic advantage enables businesses to allocate resources more strategically, invest in
                    enhanced features and user experiences, or accelerate additional digital initiatives. Through our
                    commitment to delivering enterprise-grade solutions at competitive price points, we ensure that
                    organizations of all sizes can access sophisticated mobile technology that drives growth and
                    competitive positioning without excessive capital commitments or operational overhead.
                </>
            )
        },
    ];

    useEffect(() => {
        const updateScreen = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        updateScreen();
        window.addEventListener("resize", updateScreen);
        return () => window.removeEventListener("resize", updateScreen);
    }, []);

    const handleClick = (idx: number) => {
        setActiveAcc((prev) => (prev === idx ? null : idx));
    };

    // Cross-Industry Domain Expertise
    const domains = [
        {
            icon: (
                <svg viewBox="0 0 53 42" fill="none" strokeWidth="1.5" className={'h-12 w-12'}>
                    <path fill="#314252"
                          d="M15.842.242c2.116 0 4.115.495 5.998 1.484 1.882.99 3.518 2.409 4.907 4.257 1.388-1.848 3.024-3.267 4.906-4.257A12.71 12.71 0 0137.651.242c3.439 0 6.318 1.16 8.637 3.479 2.32 2.319 3.479 5.198 3.479 8.637a7.3 7.3 0 01-.03.676c-.02.217-.039.443-.055.676h-3.634c.04-.233.065-.459.072-.676.008-.218.012-.443.012-.676 0-2.423-.808-4.442-2.423-6.058-1.616-1.615-3.635-2.423-6.058-2.423-1.914 0-3.682.543-5.306 1.628-1.623 1.086-2.908 2.597-3.856 4.532h-3.485c-.964-1.95-2.253-3.465-3.868-4.543-1.616-1.078-3.38-1.617-5.294-1.617-2.408 0-4.423.808-6.046 2.423C8.173 7.916 7.36 9.935 7.36 12.358c0 .233.004.458.012.676.007.217.031.443.072.676H3.81a27.076 27.076 0 00-.053-.676 7.304 7.304 0 01-.03-.676c0-3.439 1.159-6.318 3.478-8.637C9.525 1.4 12.403.242 15.842.242zM12.096 27.97h5.084a304.97 304.97 0 004.287 4.117 344.92 344.92 0 005.28 4.867 345.39 345.39 0 005.279-4.867 305.48 305.48 0 004.287-4.117h5.122a128.211 128.211 0 01-5.185 5.187 368.558 368.558 0 01-6.829 6.304l-2.674 2.405-2.675-2.405a328.495 328.495 0 01-6.811-6.304c-1.956-1.87-3.677-3.6-5.165-5.187zm12.348 1.957c.386 0 .716-.112.99-.338.275-.225.478-.518.608-.878l3.668-11.04 2.68 4.012c.201.293.46.528.778.707.317.178.662.268 1.035.268h18.593v-3.635H35.013l-4.32-6.435a1.694 1.694 0 00-.706-.609 2.201 2.201 0 00-.938-.202c-.386 0-.72.112-1.002.337a1.789 1.789 0 00-.597.879l-3.667 11.025-2.69-4.021a2.317 2.317 0 00-.777-.706 2.073 2.073 0 00-1.035-.268H.697v3.635h17.736l4.343 6.458c.18.286.42.493.718.62.298.128.615.191.95.191z">
                    </path>
                </svg>
            ),
            label: 'Healthcare'
        },
        {
            icon: (
                <svg viewBox="0 0 52 52" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M26.077 51.283c-4.725 0-9.013-1.17-12.864-3.51-3.85-2.338-6.87-5.473-9.06-9.403v7.228H.517V32.27h13.327v3.635H6.962c1.752 3.53 4.341 6.37 7.768 8.519 3.427 2.15 7.21 3.224 11.347 3.224 2.967 0 5.75-.548 8.349-1.644 2.598-1.097 4.873-2.594 6.824-4.49 1.951-1.897 3.518-4.137 4.7-6.72 1.182-2.583 1.82-5.366 1.913-8.348h3.634c-.078 3.442-.797 6.67-2.16 9.683-1.362 3.014-3.189 5.646-5.48 7.899-2.29 2.252-4.962 4.024-8.015 5.317-3.052 1.292-6.307 1.938-9.765 1.938zm-1.715-8.947V39.28c-1.773-.414-3.248-1.15-4.424-2.21-1.176-1.06-2.078-2.488-2.705-4.287l3.066-1.249c.578 1.579 1.405 2.778 2.482 3.598a5.883 5.883 0 003.66 1.23c1.379 0 2.617-.344 3.714-1.032 1.096-.688 1.645-1.792 1.645-3.311 0-1.264-.472-2.272-1.414-3.022-.943-.75-2.703-1.598-5.278-2.542-2.491-.895-4.289-1.897-5.392-3.006-1.103-1.109-1.654-2.573-1.654-4.394 0-1.563.564-2.993 1.692-4.292 1.128-1.299 2.704-2.126 4.73-2.484V9.343h3.308v2.936c1.36.106 2.614.618 3.759 1.536 1.144.918 1.97 2.021 2.476 3.31l-2.991 1.203a5.924 5.924 0 00-1.786-2.239c-.773-.595-1.79-.892-3.052-.892-1.506 0-2.688.357-3.544 1.071-.855.715-1.283 1.644-1.283 2.787s.418 2.033 1.253 2.67c.836.637 2.527 1.39 5.075 2.26 2.908 1.05 4.862 2.228 5.862 3.532 1 1.305 1.5 2.806 1.5 4.502 0 1.156-.213 2.17-.64 3.043a6.835 6.835 0 01-1.675 2.202 8.095 8.095 0 01-2.356 1.41c-.88.344-1.787.587-2.719.727v2.935h-3.309zM.658 25.234c.108-3.52.851-6.79 2.229-9.811 1.378-3.022 3.22-5.65 5.527-7.887 2.306-2.237 4.974-3.986 8.003-5.248 3.03-1.26 6.25-1.892 9.66-1.892 4.679 0 8.967 1.174 12.864 3.521 3.898 2.347 6.918 5.51 9.061 9.486V6.082h3.635v13.327H38.309v-3.634h6.884c-1.706-3.468-4.276-6.292-7.71-8.472-3.435-2.181-7.237-3.272-11.406-3.272-2.904 0-5.652.54-8.243 1.622-2.591 1.081-4.87 2.562-6.836 4.443-1.967 1.881-3.553 4.113-4.758 6.696-1.206 2.583-1.855 5.397-1.948 8.442H.658z">
                    </path>
                </svg>
            ),
            label: 'Fintech'
        },
        {
            icon: (
                <svg viewBox="0 0 47 47" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M5.318 46.437c-1.224 0-2.26-.424-3.108-1.272-.848-.848-1.272-1.884-1.272-3.109V4.777c0-1.224.424-2.26 1.272-3.108C3.058.82 4.094.396 5.318.396h37.28c1.224 0 2.26.425 3.108 1.273.848.848 1.272 1.884 1.272 3.108v37.28c0 1.224-.424 2.26-1.272 3.108-.848.848-1.884 1.272-3.109 1.272H5.318zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.513V4.777a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H5.318a.711.711 0 00-.512.233.711.711 0 00-.234.513v37.28c0 .186.078.357.234.512a.711.711 0 00.512.233zm10.904-14.819c-.593 0-1.099-.209-1.517-.626a2.066 2.066 0 01-.627-1.517c0-.593.21-1.099.627-1.517a2.066 2.066 0 011.517-.626c.594 0 1.1.208 1.517.626.418.418.627.924.627 1.517 0 .593-.21 1.099-.627 1.517a2.067 2.067 0 01-1.517.626zm15.471 0a2.067 2.067 0 01-1.517-.626 2.067 2.067 0 01-.626-1.517c0-.593.209-1.099.626-1.517a2.067 2.067 0 011.517-.626c.594 0 1.1.208 1.517.626.418.418.627.924.627 1.517 0 .593-.209 1.099-.627 1.517a2.066 2.066 0 01-1.517.626zm-23.486-6.56v15.014c0 .44.143.804.429 1.09.286.286.65.429 1.09.429h.596c.442 0 .805-.143 1.09-.43.287-.285.43-.649.43-1.09V33.11h24.232v3.328c0 .44.143.804.428 1.09.286.286.65.429 1.091.429h.596c.441 0 .805-.143 1.09-.43.286-.285.43-.649.43-1.09V21.423l-3.812-11.025a2.244 2.244 0 00-.79-1.102 2.02 2.02 0 00-1.242-.417H14.05c-.456 0-.87.139-1.241.417a2.244 2.244 0 00-.79 1.102L8.207 21.422zm4.79-2.853l2.116-6.058h17.69l2.115 6.058h-21.92zm-1.155 10.905v-7.27h24.232v7.27H11.842z">
                    </path>
                </svg>
            ),
            label: 'Automotive'
        },
        {
            icon: (
                <svg viewBox="0 0 46 48" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M13.878 47.575c-1.178 0-2.178-.412-3.003-1.237-.825-.825-1.237-1.826-1.237-3.003 0-1.178.412-2.18 1.237-3.004.825-.825 1.825-1.237 3.003-1.237 1.178 0 2.179.413 3.003 1.237.825.825 1.237 1.826 1.237 3.004 0 1.177-.412 2.178-1.237 3.003-.824.825-1.825 1.237-3.003 1.237zm23.486 0c-1.177 0-2.178-.412-3.003-1.237-.825-.825-1.237-1.826-1.237-3.003 0-1.178.412-2.18 1.237-3.004.825-.825 1.826-1.237 3.004-1.237 1.177 0 2.178.413 3.002 1.237.825.825 1.237 1.826 1.237 3.004 0 1.177-.412 2.178-1.237 3.003-.824.825-1.825 1.237-3.002 1.237zM11.12 9.27l6.142 12.862h16.52c.14 0 .264-.035.373-.105a.912.912 0 00.279-.291l6.5-11.813c.094-.171.102-.323.024-.455-.078-.132-.21-.198-.396-.198H11.119zM9.377 5.635H43.02c.992 0 1.74.422 2.248 1.266.509.843.533 1.704.073 2.584l-7.764 14.063a4.375 4.375 0 01-1.577 1.633 4.122 4.122 0 01-2.15.586H16.17l-2.806 5.125c-.124.187-.128.389-.011.606.116.218.29.327.524.327h27.726v3.634H13.878c-1.616 0-2.83-.696-3.642-2.09-.812-1.393-.84-2.784-.086-4.173l3.458-6.216L4.79 4.424H.178V.789h6.897l2.302 4.846z">
                    </path>
                </svg>
            ),
            label: 'eCommerce'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4548" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.766 0.338H58.922V58.494H0.766z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4548)">
                        <path fill="#314252"
                              d="M11.617 50.62c-1.849 0-3.421-.65-4.718-1.947-1.297-1.296-1.946-2.87-1.946-4.718 0-1.003.206-1.952.618-2.847a6.336 6.336 0 011.805-2.302V27.6h5.196V13.666h17.079L40.62 39.43c.226.534.404 1.072.533 1.614.13.542.193 1.108.193 1.699 0 2.187-.765 4.046-2.297 5.578-1.531 1.531-3.39 2.297-5.578 2.297a7.8 7.8 0 01-4.4-1.314 7.487 7.487 0 01-2.874-3.532h-8.201a6.454 6.454 0 01-2.375 3.502 6.461 6.461 0 01-4.005 1.344zm32.154-2.424v-37.56h3.634v33.925h7.317v3.635H43.77zm-32.154-1.212c.842 0 1.557-.294 2.146-.883a2.921 2.921 0 00.883-2.145c0-.843-.294-1.558-.883-2.146a2.922 2.922 0 00-2.146-.884c-.842 0-1.557.295-2.146.884a2.92 2.92 0 00-.883 2.145c0 .843.294 1.558.883 2.146a2.921 2.921 0 002.146.883zm21.855 0c1.165 0 2.163-.415 2.994-1.246.831-.831 1.247-1.829 1.247-2.994 0-1.165-.416-2.163-1.247-2.994-.83-.831-1.829-1.247-2.994-1.247-1.165 0-2.163.416-2.994 1.247-.83.83-1.246 1.829-1.246 2.994 0 1.165.415 2.163 1.246 2.994.831.83 1.829 1.246 2.994 1.246zm-15.476-4.846h7.638c.019-.677.14-1.324.366-1.94a5.539 5.539 0 01.99-1.695h-5.242l-7.088-7.27H11.01v6.152c.093-.031.19-.054.292-.07.1-.015.205-.023.314-.023a6.46 6.46 0 014.005 1.344 6.454 6.454 0 012.375 3.502zm5.299-7.27h10.4a2.55 2.55 0 011.166.28L27.256 17.3H16.207V27.6l7.088 7.27zm-1.547 3.635l-1.121-1.15a371.076 371.076 0 01-2.423-2.515 153.485 153.485 0 00-2.424-2.483l-1.12-1.121 7.088 7.27z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Logistics'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2787" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0 0.051H58.156V58.207H0z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2787)">
                        <path fill="#314252"
                              d="M34.112 30.9h10.997v-3.635H34.112V30.9zm0-6.99h10.997v-3.635H34.112v3.635zM13.049 37.983h17.707v-.867c0-1.615-.799-2.884-2.398-3.807-1.598-.923-3.75-1.384-6.455-1.384-2.706 0-4.858.461-6.457 1.384-1.598.923-2.397 2.192-2.397 3.807v.867zm8.854-9.227c1.177 0 2.178-.412 3.003-1.237.825-.825 1.237-1.826 1.237-3.003 0-1.178-.412-2.179-1.238-3.004-.824-.824-1.825-1.237-3.002-1.237-1.178 0-2.179.413-3.004 1.237-.825.825-1.237 1.826-1.237 3.004 0 1.177.412 2.178 1.237 3.003.825.825 1.826 1.237 3.004 1.237zM10.439 47.303c-1.224 0-2.26-.424-3.108-1.272-.848-.849-1.272-1.885-1.272-3.109V15.336c0-1.225.424-2.26 1.272-3.109.848-.848 1.884-1.272 3.108-1.272h37.28c1.224 0 2.26.424 3.108 1.272.848.848 1.272 1.884 1.272 3.109v27.586c0 1.224-.424 2.26-1.272 3.109-.848.848-1.884 1.272-3.108 1.272h-37.28zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.513V15.336a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H10.44a.711.711 0 00-.512.233.711.711 0 00-.234.513v27.586c0 .187.078.358.234.513a.711.711 0 00.512.233z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Social Networking'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4618" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.32 0.053H58.476V58.208999999999996H0.32z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4618)">
                        <path fill="#314252"
                              d="M11.768 47.91c-2.283 0-4.225-.805-5.825-2.417-1.6-1.613-2.425-3.577-2.474-5.891 0-.342.016-.679.049-1.011.033-.333.09-.673.17-1.02l5.089-20.355c.53-2.043 1.61-3.697 3.238-4.964 1.63-1.267 3.485-1.9 5.569-1.9H41.21c2.083 0 3.94.633 5.568 1.9 1.63 1.267 2.709 2.921 3.239 4.964l5.088 20.355c.081.347.148.697.201 1.05.053.353.08.7.08 1.041 0 2.315-.817 4.268-2.45 5.86-1.632 1.593-3.602 2.389-5.909 2.389a8.192 8.192 0 01-4.4-1.251 8.083 8.083 0 01-3.062-3.39l-1.72-3.537a2.456 2.456 0 00-1.118-1.136 3.433 3.433 0 00-1.575-.379h-11.51c-.55 0-1.073.124-1.572.373-.5.248-.873.63-1.122 1.142l-1.72 3.536a7.794 7.794 0 01-3.053 3.402 8.314 8.314 0 01-4.407 1.24zm.188-3.634c.872 0 1.671-.233 2.398-.699A4.437 4.437 0 0016 41.709l1.696-3.477a6.25 6.25 0 012.454-2.681 6.685 6.685 0 013.492-.968h11.51c1.258 0 2.424.337 3.497 1.009a7.094 7.094 0 012.51 2.664l1.696 3.453c.37.78.918 1.402 1.645 1.868a4.38 4.38 0 002.414.7c1.3 0 2.416-.437 3.345-1.308.93-.871 1.406-1.95 1.431-3.236 0-.022-.048-.452-.144-1.291l-5.089-20.294a5.522 5.522 0 00-1.918-2.992c-.964-.78-2.074-1.17-3.33-1.17H17.585c-1.272 0-2.396.39-3.373 1.17a5.18 5.18 0 00-1.875 2.992L7.248 38.442c-.065.21-.113.621-.144 1.23 0 1.302.476 2.395 1.428 3.279.952.883 2.093 1.325 3.424 1.325zm21.076-17.848c.593 0 1.099-.209 1.517-.626.417-.418.626-.924.626-1.517 0-.593-.209-1.1-.627-1.517a2.067 2.067 0 00-1.516-.626c-.594 0-1.1.208-1.517.626a2.067 2.067 0 00-.627 1.517c0 .593.21 1.099.627 1.517.418.417.923.626 1.517.626zm4.846-4.846c.593 0 1.099-.209 1.517-.627.417-.418.626-.923.626-1.516 0-.594-.209-1.1-.626-1.517a2.067 2.067 0 00-1.517-.627c-.593 0-1.099.209-1.517.627a2.067 2.067 0 00-.626 1.517c0 .593.208 1.098.626 1.516.418.418.924.627 1.517.627zm0 9.692c.593 0 1.099-.208 1.517-.626.417-.418.626-.924.626-1.517 0-.593-.209-1.099-.626-1.517a2.067 2.067 0 00-1.517-.626c-.593 0-1.099.209-1.517.626a2.067 2.067 0 00-.626 1.517c0 .593.208 1.1.626 1.517.418.418.924.627 1.517.627zm4.846-4.846c.594 0 1.1-.209 1.517-.626.418-.418.627-.924.627-1.517 0-.593-.21-1.1-.627-1.517a2.067 2.067 0 00-1.517-.626c-.593 0-1.099.208-1.517.626a2.067 2.067 0 00-.626 1.517c0 .593.209 1.099.626 1.517.418.417.924.626 1.517.626zm-21.81 3.542c.418 0 .763-.136 1.036-.41.274-.272.41-.617.41-1.035V25.73h2.796c.417 0 .763-.137 1.036-.41.273-.272.409-.617.409-1.034 0-.417-.136-.762-.41-1.036-.272-.273-.618-.41-1.035-.41H22.36v-2.796c0-.417-.136-.762-.409-1.035-.273-.273-.617-.41-1.034-.41-.417 0-.763.137-1.036.41-.273.273-.41.618-.41 1.035v2.796h-2.796c-.417 0-.762.137-1.035.41-.273.272-.41.617-.41 1.034 0 .417.137.762.41 1.036.273.273.618.41 1.035.41h2.796v2.795c0 .418.136.763.41 1.036.272.273.617.41 1.033.41z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Game & Sports'
        },
        {
            icon: (
                <svg viewBox="0 0 59 60" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2698" width="59" height="60" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.498 0.912H58.653999999999996V59.068H0.498z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2698)">
                        <path fill="#314252"
                              d="M22.035 38.555l21.333-5.648a2.094 2.094 0 001.329-1.004c.31-.523.392-1.064.246-1.624a1.82 1.82 0 00-.99-1.223 2.232 2.232 0 00-1.61-.165l-6.03 1.622-9.693-9.088-2.973.709 5.816 10.177-6.235 1.547-3.029-2.302-1.883.513 3.72 6.486zm26.18 9.61h-37.28c-1.208 0-2.24-.429-3.097-1.285-.855-.856-1.283-1.888-1.283-3.096v-7.968c1.38-.265 2.532-.941 3.458-2.03.925-1.09 1.388-2.354 1.388-3.796 0-1.441-.463-2.706-1.388-3.795-.926-1.09-2.079-1.766-3.458-2.03v-7.968c0-1.208.428-2.24 1.283-3.097.857-.856 1.889-1.284 3.097-1.284h37.28c1.208 0 2.24.428 3.096 1.284.856.856 1.284 1.889 1.284 3.097v27.587c0 1.208-.428 2.24-1.283 3.096-.857.856-1.889 1.284-3.097 1.284zm0-3.636c.217 0 .396-.07.536-.21.14-.139.21-.318.21-.535V16.197a.726.726 0 00-.21-.536.726.726 0 00-.536-.21h-37.28a.726.726 0 00-.536.21.726.726 0 00-.21.536v5.433a9.933 9.933 0 013.544 3.544 9.32 9.32 0 011.303 4.816 9.32 9.32 0 01-1.303 4.816 9.933 9.933 0 01-3.543 3.544v5.434c0 .217.07.396.21.536.139.14.317.21.535.21h37.28z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Travel & Tourism'
        },
        {
            icon: (
                <svg viewBox="0 0 38 46" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M27.994 45.537l-6.3-10.662h-7.48a1.982 1.982 0 01-1.459-.592 1.983 1.983 0 01-.591-1.458c0-.578.197-1.065.591-1.46.395-.394.881-.591 1.46-.591h7.478l6.3-10.662h1.967l-3.15 10.662h7.582l1.817-2.423h1.724l-1.337 4.474 1.337 4.473H36.21l-1.817-2.423H26.81l3.15 10.662h-1.966zM8.16 26.152l3.15-10.662H3.73l-1.817 2.423H.188l1.337-4.474L.188 8.965h1.724l1.817 2.424h7.582L8.161.727h1.966l6.3 10.662h7.48c.578 0 1.064.197 1.459.591.394.395.591.881.591 1.46 0 .577-.197 1.063-.591 1.458-.395.395-.881.592-1.46.592h-7.478l-6.3 10.662H8.16z">
                    </path>
                </svg>
            ),
            label: 'Aviation'
        },
        {
            icon: (
                <svg viewBox="0 0 49 50" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <path fill="#314252"
                          d="M42.361 30.193V13.837L29.64 4.936l-12.722 8.9v5.08h-3.635v-6.874L29.64.37l16.356 11.673v18.151h-3.635zM30.968 15.258h2.19v-2.19h-2.19v2.19zm-4.847 0h2.19v-2.19h-2.19v2.19zm4.847 4.846h2.19v-2.19h-2.19v2.19zm-4.847 0h2.19v-2.19h-2.19v2.19zm-13.56 20.248l17.587 4.976 14.464-4.483c-.124-.55-.38-.97-.769-1.264a2.13 2.13 0 00-1.319-.441H30.658c-1.057 0-1.955-.04-2.695-.121-.74-.08-1.499-.258-2.279-.531l-5.47-1.809 1.076-3.56 4.907 1.706c.733.248 1.58.418 2.54.508.96.09 2.325.147 4.096.172 0-.6-.135-1.117-.406-1.552-.27-.435-.626-.728-1.067-.88L17.3 27.908a1.103 1.103 0 00-.128-.034.626.626 0 00-.128-.012h-4.483v12.489zM.445 47.435V24.228h16.571c.255 0 .512.028.773.084.261.056.504.121.727.196l14.12 5.2c1.1.407 2.013 1.127 2.74 2.16.727 1.033 1.09 2.246 1.09 3.637h6.059c1.74 0 3.157.562 4.252 1.685 1.095 1.123 1.642 2.58 1.642 4.373v1.957l-18.15 5.639-17.708-5.051v3.327H.445zM4.08 43.8h4.846V27.863H4.08V43.8z">
                    </path>
                </svg>
            ),
            label: 'Real Estate'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4646" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.539 0.77H58.695V58.926H0.539z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4646)">
                        <path fill="#314252"
                              d="M29.623 48.86l-15.75-8.555V27.164l-8.389-4.586 24.139-13.14 24.138 13.14v17.429h-3.634V24.592l-4.753 2.572v13.14L29.623 48.86zm0-17.316l16.576-8.966-16.576-8.965-16.576 8.965 16.576 8.966zm0 13.179l12.116-6.543v-9.078l-12.116 6.613-12.116-6.613v9.078l12.116 6.543z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Education'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2795" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.754 0.77H58.91V58.926H0.754z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2795)">
                        <path fill="#314252"
                              d="M11.193 50.444c-1.224 0-2.26-.424-3.108-1.272-.848-.848-1.273-1.884-1.273-3.108V13.63c0-1.224.425-2.26 1.273-3.108.848-.848 1.884-1.272 3.108-1.272h37.28c1.224 0 2.26.424 3.108 1.272.848.848 1.272 1.884 1.272 3.108v32.434c0 1.224-.424 2.26-1.272 3.108-.848.848-1.884 1.272-3.109 1.272H11.193zm0-3.635h37.28a.711.711 0 00.512-.233.711.711 0 00.233-.512V13.63a.711.711 0 00-.233-.512.711.711 0 00-.513-.233H11.193a.711.711 0 00-.512.233.711.711 0 00-.234.512v32.434c0 .186.078.357.234.512a.711.711 0 00.512.233zm2.283-5.452h10.905v-3.635H13.476v3.635zm22.536-5.102l11.133-11.133-2.592-2.591-8.541 8.602-3.453-3.453-2.53 2.591 5.983 5.983zm-22.536-4.59h10.905V28.03H13.476v3.634zm0-9.693h10.905v-3.635H13.476v3.635z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'On-Demand'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_6871_2762" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.65 0.77H58.806V58.926H0.65z"></path>
                    </mask>
                    <g mask="url(#mask0_6871_2762)">
                        <path fill="#314252"
                              d="M29.253 36.745c1.525 0 2.815-.527 3.87-1.582 1.055-1.054 1.582-2.344 1.582-3.87V17.686h6.944v-4.287h-9.087v13.7a4.787 4.787 0 00-1.521-.944 4.99 4.99 0 00-1.788-.314c-1.525 0-2.815.527-3.87 1.582-1.055 1.055-1.582 2.345-1.582 3.87 0 1.526.527 2.816 1.582 3.87 1.055 1.055 2.345 1.582 3.87 1.582zm-10.391 6.43c-1.224 0-2.26-.423-3.109-1.271-.848-.848-1.272-1.885-1.272-3.109V11.21c0-1.224.424-2.26 1.272-3.109.848-.848 1.884-1.272 3.109-1.272h27.586c1.224 0 2.26.424 3.109 1.272.848.848 1.272 1.885 1.272 3.109v27.586c0 1.224-.424 2.26-1.272 3.109-.848.848-1.885 1.272-3.109 1.272H18.862zm0-3.634h27.586a.711.711 0 00.513-.233.711.711 0 00.233-.513V11.21a.711.711 0 00-.233-.513.711.711 0 00-.513-.233H18.862a.711.711 0 00-.513.233.711.711 0 00-.233.513v27.586c0 .187.078.358.233.513a.711.711 0 00.513.233zM10.38 51.657c-1.225 0-2.26-.424-3.109-1.272C6.424 49.537 6 48.5 6 47.277V16.054h3.635v31.221c0 .187.078.358.233.513a.711.711 0 00.512.233h31.222v3.635H10.381z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Music'
        },
        {
            icon: (
                <svg viewBox="0 0 60 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4583" width="60" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.984 0.77H59.14V58.926H0.984z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4583)">
                        <path fill="#314252"
                              d="M5.344 47.557v-5.388c0-1.248.322-2.363.967-3.343a6.59 6.59 0 012.582-2.288 37.39 37.39 0 016.947-2.605c2.328-.61 4.887-.916 7.677-.916s5.349.306 7.677.916c2.329.61 4.645 1.48 6.948 2.605a6.589 6.589 0 012.582 2.288c.645.98.967 2.094.967 3.343v5.388H5.344zm41.193 0V41.87c0-1.59-.39-3.106-1.168-4.547-.779-1.441-1.884-2.678-3.315-3.71 1.625.243 3.168.618 4.628 1.125a31.118 31.118 0 014.18 1.801c1.252.668 2.219 1.456 2.9 2.362.682.907 1.023 1.896 1.023 2.97v5.685h-8.248zm-23.02-18.454c-2.332 0-4.329-.83-5.99-2.491-1.66-1.661-2.49-3.658-2.49-5.99 0-2.333.83-4.33 2.49-5.99 1.661-1.66 3.658-2.491 5.99-2.491 2.332 0 4.329.83 5.99 2.491 1.66 1.66 2.491 3.657 2.491 5.99 0 2.332-.83 4.329-2.49 5.99-1.662 1.66-3.659 2.49-5.991 2.49zm20.923-8.481c0 2.332-.83 4.329-2.491 5.99-1.66 1.66-3.657 2.49-5.99 2.49-.273 0-.62-.03-1.043-.092a9.148 9.148 0 01-1.044-.205 12.859 12.859 0 002.203-3.824c.513-1.4.77-2.854.77-4.362a12.22 12.22 0 00-.786-4.345 14.008 14.008 0 00-2.187-3.835 4.51 4.51 0 011.044-.242 9.7 9.7 0 011.043-.056c2.333 0 4.33.83 5.99 2.491 1.66 1.66 2.491 3.657 2.491 5.99zm-35.462 23.3h29.078v-1.753c0-.506-.127-.956-.38-1.35-.253-.395-.654-.74-1.204-1.035a28.58 28.58 0 00-6.16-2.337c-2.113-.53-4.378-.795-6.795-.795s-4.681.265-6.794.794a28.582 28.582 0 00-6.16 2.338c-.55.295-.952.64-1.205 1.034-.253.395-.38.845-.38 1.351v1.753zm14.539-18.454c1.333 0 2.474-.474 3.423-1.424.949-.949 1.423-2.09 1.423-3.422 0-1.333-.474-2.474-1.423-3.423-.95-.95-2.09-1.424-3.423-1.424-1.333 0-2.474.475-3.423 1.424-.949.95-1.423 2.09-1.423 3.423 0 1.332.474 2.473 1.423 3.422.95.95 2.09 1.424 3.423 1.424z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'IT Staff Augmentation'
        },
        {
            icon: (
                <svg viewBox="0 0 59 59" fill="none" strokeWidth="1.5" className="w-12 h-12">
                    <mask id="mask0_1327_4562" width="59" height="59" x="0" y="0" maskUnits="userSpaceOnUse">
                        <path fill="#D9D9D9" d="M0.766 0.77H58.922V58.926H0.766z"></path>
                    </mask>
                    <g mask="url(#mask0_1327_4562)">
                        <path fill="#314252"
                              d="M51.087 27.359v19.31c0 1.225-.425 2.26-1.273 3.109-.848.848-1.884 1.272-3.107 1.272H13.06c-1.223 0-2.26-.424-3.107-1.272-.849-.848-1.273-1.884-1.273-3.108V27.312c-.975-.801-1.708-1.841-2.197-3.12-.49-1.278-.5-2.658-.03-4.14l2.451-8.006c.323-1.019.871-1.84 1.645-2.465.773-.624 1.698-.936 2.772-.936H46.4c1.075 0 1.993.298 2.754.894.761.597 1.316 1.417 1.663 2.461l2.498 8.052c.47 1.482.46 2.857-.03 4.126-.49 1.27-1.222 2.33-2.197 3.18zm-15.872-1.752c1.324 0 2.319-.405 2.985-1.214.666-.81.939-1.679.818-2.608l-1.473-9.506h-5.844v9.572c0 1.019.345 1.9 1.035 2.642.69.743 1.516 1.114 2.48 1.114zm-10.904 0c1.115 0 2.02-.371 2.714-1.114a3.738 3.738 0 001.042-2.642v-9.572h-5.844l-1.472 9.6c-.131.86.139 1.697.81 2.51.672.812 1.588 1.218 2.75 1.218zm-10.783 0c.898 0 1.67-.313 2.316-.94.646-.625 1.045-1.412 1.197-2.36l1.426-10.028h-5.145c-.264 0-.473.059-.628.175-.156.116-.272.291-.35.524l-2.33 7.885c-.32 1.04-.17 2.091.452 3.152.621 1.061 1.642 1.592 3.062 1.592zm32.713 0c1.31 0 2.314-.515 3.01-1.545.696-1.03.864-2.096.503-3.2l-2.451-7.93c-.078-.233-.194-.4-.35-.501-.155-.101-.364-.152-.629-.152h-5.023l1.425 10.029c.153.947.552 1.734 1.198 2.36a3.213 3.213 0 002.317.939zM13.06 47.415h33.646c.217 0 .395-.07.535-.21.14-.139.21-.318.21-.535V29.027a3.218 3.218 0 01-.662.18 4.17 4.17 0 01-.55.035c-1.09 0-2.049-.198-2.877-.592-.828-.395-1.63-1.027-2.407-1.897a7.761 7.761 0 01-2.414 1.813c-.929.45-1.988.676-3.178.676a6.76 6.76 0 01-2.907-.641c-.91-.427-1.768-1.043-2.573-1.848a7.875 7.875 0 01-2.544 1.848 6.947 6.947 0 01-2.88.64 7.958 7.958 0 01-3.076-.594c-.956-.396-1.798-1.027-2.525-1.894-1.02 1.019-1.959 1.689-2.818 2.009-.858.32-1.696.48-2.513.48-.19 0-.386-.012-.588-.036a2.104 2.104 0 01-.624-.179V46.67c0 .217.07.396.21.536.14.14.318.21.535.21z">
                        </path>
                    </g>
                </svg>
            ),
            label: 'Retail'
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
            <div id='hero'
                 className="relative overflow-hidden lg:w-full lg:h-180 justify-center items-center md:w-full md:h-[700] w-full h-[700] pb-6">
                <video
                    src='/assets/cross/hero-M.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='hidden lg:block md:block absolute inset-0 w-full h-full object-cover z-0 bg-black/70'
                />
                <video
                    src='/assets/cross/hero-P.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='block lg:hidden absolute inset-0 w-full h-full object-cover z-0 bg-black/70'
                />
                <div
                    className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-auto max-w-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${isDayTime ? 'text-white ' : 'text-white'} z-10`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[0.3em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1 className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2.1em] lg:mt-[3em] md:mt-[3em] mt-[12em] w-auto h-auto leading-[1.1] font-[700]`}>
                            Cross Platform <br/>Development Services
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Our cross-platform development services deliver high-performance applications that run
                                seamlessly across iOS, Android, and web platforms from a single codebase. We leverage
                                cutting-edge frameworks to build cost-effective, consistent user experiences that
                                accelerate time-to-market, reduce development costs, and ensure your app reaches maximum
                                audience reach without compromising quality or functionality.
                            </p>
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
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            Scalable Multi-Platform <br className={'lg:block md:block hidden'}/>Application Development
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.8em] font-[700] lg:mt-[0.01em] leading-[1.2] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Best <span className={'text-[#0ef0dd]'}>Cross-Platform App</span> Development <br
                            className={'lg:block md:block hidden'}/>Services
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    At Grey InfoTech, we solve the strategic challenges organizations face in developing
                                    applications that deliver consistent, exceptional experiences across fragmented
                                    device ecosystems and operating systems. Traditional platform-specific development
                                    creates substantial operational inefficiencies through duplicated codebases,
                                    extended timelines, escalated costs, and inconsistent user experiences that
                                    undermine competitive positioning and market responsiveness. We eliminate these
                                    limitations through expert cross-platform app development services leveraging
                                    industry-leading frameworks including <Link
                                    href={'/services/React-Native-Development'}
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>React
                                    Native</Link>, <Link href={'/services/flutter-development'}
                                                         className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>Flutter</Link>,
                                    and Xamarin. Our
                                    unified approach enables simultaneous deployment across <Link
                                    href={'/services/ios-development'}
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>iOS</Link>, <Link
                                    href={'/services/android-development'}
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>Android</Link>, <Link
                                    href={'/services/Web-Development'}
                                    className={`border-b-[1px] border-gray-500 ${isDayTime ? 'hover:border-black' : 'hover:border-white'}`}>web</Link>,
                                    and emerging platforms while maintaining native-like performance and
                                    platform-specific
                                    design conventions that preserve authentic user experiences and brand integrity.
                                </p>
                            </div>
                            <div>
                                <p>
                                    By implementing a single, strategically engineered codebase, we accelerate
                                    time-to-market by up to 60% and reduce development costs by 40-50% compared to
                                    native approaches while ensuring absolute feature parity across all platforms. Our
                                    solutions incorporate advanced capabilities including offline functionality,
                                    real-time synchronization, secure authentication, third-party integrations, and
                                    comprehensive analytics that drive continuous optimization. Grey InfoTech&#39;s
                                    cross-platform services deliver measurable outcomes: simplified maintenance through
                                    single-point updates, enhanced developer productivity, expanded market reach, and
                                    organizational agility to capitalize on emerging opportunities. This approach
                                    provides the technological foundation necessary to scale efficiently, optimize
                                    resource allocation, and achieve sustainable growth through superior user
                                    experiences that maximize engagement, retention, and long-term customer value in an
                                    increasingly mobile-first digital marketplace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Prominent Cross Platform App Development Services */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'ASO Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Our Prominent <span className={'text-[#0ef0dd]'}>Cross <br
                                className={'lg:block md:block hidden'}/>Platform App <br
                                className={'lg:block md:block hidden'}/>Development</span> Services
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                Grey InfoTech delivers high-performance cross-platform applications engineered for
                                exceptional user experiences across all devices and operating systems. Our specialized
                                team leverages advanced frameworks and development methodologies to create scalable,
                                feature-rich solutions that maximize code efficiency while maintaining native-like
                                performance. By architecting unified applications that operate seamlessly across iOS,
                                Android, and web platforms, we accelerate time-to-market, optimize development
                                investment, and ensure consistent brand experiences for your users.<br/><br/>
                                Our comprehensive cross-platform development services include:
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
                            <ul className={`list-disc capitalize constant-text text-[0.89em] ml-4 font-[600] relative space-y-3 ${
                                isDayTime ? 'text-black decoration-gray-600 focus:decoration-gray-900' : 'text-white decoration-gray-400 focus:decoration-gray-600'
                            }`}>
                                {[
                                    {id: "01", title: "Strategy & Consulting", target: "SC"},
                                    {id: "02", title: "Cross-Platform App Design", target: "CPAD"},
                                    {id: "03", title: "Responsive Apps", target: "RA"},
                                    {id: "04", title: "Cross-Platform App Migration", target: "CPAM"},
                                    {id: "05", title: "Cross-Platform App Support", target: "CPAS"},
                                    {id: "06", title: "Custom Software Development", target: "CSD"},
                                    {id: "07", title: "Cross-Platform App Integration", target: "CPAI"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[21em] md:mb-[21em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Strategy & Consulting
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Competitive Positioning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Market Analysis</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategic Roadmapping</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        We develop comprehensive strategic roadmaps that position your cross-platform
                                        application for sustained market success and competitive differentiation. Our
                                        consulting process begins with rigorous analysis of your business objectives,
                                        target audience demographics and behaviors, competitive landscape, and emerging
                                        industry trends to establish a data-driven foundation for strategic
                                        decision-making. Through collaborative planning sessions, we define clear
                                        success metrics, identify optimal market positioning strategies, and create
                                        detailed implementation roadmaps that align technical development with business
                                        milestones and go-to-market objectives. Our strategic guidance encompasses
                                        platform selection, feature prioritization, user experience optimization,
                                        technology stack recommendations, and phased deployment approaches that balance
                                        speed-to-market with quality and scalability requirements. We provide ongoing
                                        strategic counsel throughout your app development journey, adapting
                                        recommendations as market conditions evolve and ensuring that technical
                                        execution remains aligned with your overarching business vision. This strategic
                                        precision in planning and execution maximizes your application&#39;s market
                                        impact,
                                        accelerates user acquisition, optimizes resource allocation, and positions your
                                        cross-platform solution for long-term growth and sustainable competitive
                                        advantage in dynamic digital marketplaces.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPAD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Cross-Platform App Design
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Experience Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Interface Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Engagement</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Platform Consistency</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We deliver exceptional cross-platform application designs that seamlessly
                                        integrate sophisticated aesthetics with intuitive functionality, creating user
                                        experiences that drive engagement and differentiation in competitive markets.
                                        Our design team employs user-centered design principles, comprehensive usability
                                        research, and contemporary interface patterns to craft visually compelling
                                        applications that resonate with diverse user demographics while maintaining
                                        consistent brand identity across all platforms. Through meticulous attention to
                                        interaction design, information architecture, and visual hierarchy, we ensure
                                        your application provides intuitive navigation, seamless workflows, and
                                        delightful micro-interactions that enhance user satisfaction and encourage
                                        sustained engagement. Our cross-platform design approach balances
                                        platform-specific conventions with unified brand expression, ensuring
                                        native-quality experiences on iOS, Android, and web platforms while maximizing
                                        code reusability and development efficiency. By combining strategic design
                                        thinking with technical expertise, we create applications that not only capture
                                        attention through striking visual presentation but also deliver functional
                                        excellence that converts users, builds loyalty, and positions your brand as an
                                        innovator in digital experience delivery across all touchpoints and devices.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'RA'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Responsive Apps
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Multi-Device Compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Framework Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Unified User Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cost-Efficient Deployment</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We specialize in cross-platform application development that delivers seamless,
                                        consistent user experiences across diverse devices and operating systems. Our
                                        technical expertise in leading cross-platform frameworks enables us to create
                                        adaptive applications that perform flawlessly on iOS, Android, and web platforms
                                        while maintaining optimal speed, responsiveness, and native-quality
                                        interactions. Through strategic architecture design and efficient code
                                        implementation, we maximize development efficiency without compromising
                                        functionality or user experience, ensuring your application meets the highest
                                        standards of performance across all target platforms. Our cross-platform
                                        solutions provide unified feature sets, synchronized data experiences, and
                                        consistent visual presentation that strengthen brand recognition while
                                        accommodating platform-specific conventions and user expectations. This approach
                                        significantly expands market reach, accelerates time-to-market, and reduces
                                        development and maintenance costs compared to native development strategies. By
                                        delivering applications that perform reliably across multiple platforms, we
                                        enhance user accessibility, broaden your audience potential, drive engagement
                                        across all touchpoints, and position your organization to capitalize on
                                        opportunities in today&#39;s multi-device digital landscape where users expect
                                        seamless experiences regardless of their chosen platform or device.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPAM'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Cross-Platform App Migration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Platform Migration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Integrity</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Legacy Modernization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Compatibility</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Cross-Platform Transition</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We provide comprehensive application migration services that seamlessly
                                        transition your existing native or legacy applications to modern cross-platform
                                        architectures, expanding market reach while preserving critical functionality
                                        and business logic. Our migration methodology employs rigorous planning,
                                        systematic code analysis, and phased implementation strategies that minimize
                                        disruption to ongoing operations and ensure continuous service availability
                                        throughout the transition process. We prioritize data integrity through
                                        meticulous validation protocols, secure transfer mechanisms, and comprehensive
                                        testing frameworks that verify accuracy and completeness at every migration
                                        stage. Our technical team carefully reconstructs application features within
                                        cross-platform frameworks, optimizing performance, enhancing user experiences,
                                        and introducing modern capabilities that extend beyond simple code conversion.
                                        This strategic migration approach not only expands your application&#39;s
                                        accessibility across multiple platforms and devices but also modernizes your
                                        technology foundation, reduces long-term maintenance complexity, and positions
                                        your solution to adapt efficiently to evolving market demands and emerging
                                        technologies. By transforming platform-specific applications into flexible
                                        cross-platform solutions, we deliver enhanced scalability, improved development
                                        agility, reduced operational costs, and sustained competitive advantage in
                                        dynamic digital markets where adaptability and broad accessibility are essential
                                        for continued success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPAS'}>
                                    <h2 className={`text-[1.5em] font-medium mb-3`}>
                                        Cross-Platform App Support
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-light ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Proactive Monitoring</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Lifecycle Management</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Ongoing Support & Maintenance</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We provide comprehensive support and maintenance services that ensure your
                                        cross-platform application maintains optimal performance, security, and
                                        reliability throughout its operational lifecycle. Our dedicated technical team
                                        delivers proactive monitoring, regular system updates, performance optimization,
                                        security patch management, and rapid issue resolution to minimize downtime and
                                        ensure uninterrupted service delivery across all platforms. We employ systematic
                                        maintenance protocols that include bug identification and remediation,
                                        compatibility updates for evolving operating systems, feature enhancements
                                        aligned with user feedback, and continuous performance tuning to maintain
                                        superior user experiences. Our support framework ensures prompt response to
                                        technical challenges through established escalation procedures, comprehensive
                                        troubleshooting methodologies, and direct communication channels that keep you
                                        informed throughout resolution processes. Beyond reactive problem-solving, we
                                        provide strategic guidance on application evolution, technology updates, and
                                        optimization opportunities that enhance functionality and user satisfaction over
                                        time. This ongoing partnership guarantees that your cross-platform application
                                        remains secure, efficient, competitive, and aligned with both user expectations
                                        and business objectives, delivering sustained value and supporting long-term
                                        success in dynamic digital markets where continuous improvement and reliability
                                        are essential to maintaining user trust and market position.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CSD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom Software Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Bespoke Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business Alignment</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Operational Efficiency</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Requirements-Driven Design</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We deliver tailor-made cross-platform applications engineered specifically to
                                        address your organization&#39;s unique operational requirements, strategic
                                        objectives, and competitive challenges. Our custom software development approach
                                        begins with comprehensive discovery and requirements analysis, ensuring deep
                                        understanding of your business processes, user needs, and technical constraints
                                        before architecting solutions that align precisely with your vision. Through
                                        collaborative development methodologies and iterative feedback cycles, we create
                                        cross-platform applications that incorporate the exact features, workflows, and
                                        integrations your business demands, eliminating the compromises inherent in
                                        generic, off-the-shelf solutions. Our technical expertise spans modern
                                        cross-platform frameworks, cloud architectures, and integration technologies,
                                        enabling us to build scalable, high-performance applications that function
                                        seamlessly across iOS, Android, and web platforms while connecting efficiently
                                        with your existing enterprise systems. These bespoke solutions enhance
                                        operational efficiency by automating processes, streamlining workflows,
                                        improving data accessibility, and empowering teams with tools designed around
                                        their specific work patterns and requirements. By delivering custom
                                        cross-platform applications that reflect your unique business model and
                                        strategic priorities, we provide competitive differentiation, accelerate digital
                                        transformation initiatives, maximize user adoption, and drive measurable
                                        business outcomes that contribute directly to your organization&#39;s sustained
                                        growth and market success.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CPAI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Cross-Platform App Integration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Interoperability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Enterprise Connectivity</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Ecosystem</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Middleware Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We provide comprehensive cross-platform application integration services that
                                        enhance functionality, expand capabilities, and create unified digital
                                        ecosystems connecting your application with essential business systems and
                                        third-party services. Our integration specialists architect robust, scalable
                                        connections that enable seamless data exchange, synchronized workflows, and
                                        cohesive user experiences across your entire technology landscape. We employ
                                        proven integration methodologies, RESTful APIs, middleware solutions, and modern
                                        integration platforms to establish reliable connections with CRM systems, ERP
                                        platforms, payment gateways, analytics tools, marketing automation services,
                                        cloud storage solutions, and industry-specific applications critical to your
                                        operations. This comprehensive integration approach eliminates data silos,
                                        reduces manual processes, ensures real-time information availability, and
                                        creates operational continuity that empowers users to work efficiently within a
                                        connected environment. Our technical expertise encompasses both standard API
                                        integrations and custom connector development for legacy systems or specialized
                                        platforms, ensuring that your cross-platform application functions as the
                                        central hub of a cohesive digital ecosystem. By maximizing connectivity and
                                        interoperability, we enhance your application&#39;s utility, extend its value
                                        proposition, improve user productivity, and position your organization to
                                        leverage the full potential of your technology investments while delivering
                                        superior experiences to users and stakeholders across all touchpoints.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div id={'details'} className={'lg:-mt-[32em] md:-mt-[32em] h-auto max-w-full w-full mx-auto'}>
                <div className="bg-slate-500 py-20 lg:mb-20 md:mb-20 mb-10">
                    <div
                        className="lg:max-w-full w-full mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 lg:gap-8">
                            {statis.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div className="mb-5">
                                        {stat.icon}
                                    </div>
                                    <div className="text-white text-5xl lg:text-6xl font-bold mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-white text-[1em] lg:text-lg font-[300]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Cross-Platform App Development Workflow */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'cross-platform-app-development-workflow'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] lg:pb-[5em] md:pb-[5em] pb-[2em] ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.7em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                Our <span className={'text-[#0ef0dd]'}>Cross-Platform App</span> <br
                                className={'lg:block md:block hidden'}/>Development <span
                                className={'text-[#0ef0dd]'}>Workflow</span>
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Experience strategic innovation through our comprehensive cross-platform mobile
                                application development process. Our proven methodology combines technical excellence
                                with business acumen to deliver solutions precisely aligned with your objectives and
                                market requirements. As a premier cross-platform development partner, we architect
                                scalable applications that drive user engagement, operational efficiency, and measurable
                                business outcomes—ensuring your digital investment delivers sustained competitive
                                advantage and exceptional return on investment.
                            </p>
                        </div>
                    </div>

                    <div
                        className='relative grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-[4em] gap-4 lg:mb-8 mb-8 mt-10'>

                        {/* Feature 01 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">01</span>
                                <div className={`text-orange-500`}>
                                    <svg className="w-10 h-10" viewBox="0 0 47 45" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M37.4258 23.8828L39.1758 25.6328V41.1328C39.1758 42.2161 38.8216 43.112 38.1133 43.8203C37.4049 44.5286 36.5091 44.8828 35.4258 44.8828H4.42578C3.34245 44.8828 2.44661 44.5286 1.73828 43.8203C1.02995 43.112 0.675781 42.2161 0.675781 41.1328V10.1328C0.675781 9.04948 1.02995 8.15365 1.73828 7.44531C2.44661 6.73698 3.34245 6.38281 4.42578 6.38281H17.7383C17.6549 6.75781 17.6029 7.08073 17.582 7.35156C17.5612 7.6224 17.5299 7.88281 17.4883 8.13281H4.42578C3.92578 8.13281 3.46745 8.34115 3.05078 8.75781C2.63411 9.17448 2.42578 9.63281 2.42578 10.1328V41.1328C2.42578 41.6328 2.63411 42.0911 3.05078 42.5078C3.46745 42.9245 3.92578 43.1328 4.42578 43.1328H35.4258C35.9258 43.1328 36.3841 42.9245 36.8008 42.5078C37.2174 42.0911 37.4258 41.6328 37.4258 41.1328V23.8828ZM37.9258 14.8828L46.3008 23.2578L45.0508 24.5078L36.6758 16.1328C35.9674 16.8411 35.1237 17.3516 34.1445 17.6641C33.1654 17.9766 32.1758 18.1328 31.1758 18.1328C28.7174 18.1328 26.6445 17.2891 24.957 15.6016C23.2695 13.9141 22.4258 11.8411 22.4258 9.38281C22.4258 6.92448 23.2695 4.85156 24.957 3.16406C26.6445 1.47656 28.7174 0.632812 31.1758 0.632812C33.6341 0.632812 35.707 1.47656 37.3945 3.16406C39.082 4.85156 39.9258 6.92448 39.9258 9.38281C39.9258 10.5078 39.7487 11.5286 39.3945 12.4453C39.0404 13.362 38.5508 14.1745 37.9258 14.8828ZM31.1758 16.3828C33.1341 16.3828 34.7904 15.7057 36.1445 14.3516C37.4987 12.9974 38.1758 11.3411 38.1758 9.38281C38.1758 7.42448 37.4987 5.76823 36.1445 4.41406C34.7904 3.0599 33.1341 2.38281 31.1758 2.38281C29.2174 2.38281 27.5612 3.0599 26.207 4.41406C24.8529 5.76823 24.1758 7.42448 24.1758 9.38281C24.1758 11.3411 24.8529 12.9974 26.207 14.3516C27.5612 15.7057 29.2174 16.3828 31.1758 16.3828ZM2.42578 43.1328V8.13281V23.1328V22.4453V43.1328Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Strategic Planning
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Develop and articulate a detailed strategic framework that comprehensively delineates
                                the multi-platform implementation methodology, specifying the technical frameworks,
                                development tools, and architectural approaches that will be employed throughout the
                                project lifecycle to ensure seamless cross-platform functionality and optimal delivery
                                outcomes.
                            </p>
                        </div>

                        {/* Feature 02 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">02</span>
                                <div className="text-orange-500">
                                    <svg className="w-10 h-10" viewBox="0 0 43 43" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.4277 21.1328L21.2402 15.3203L15.6152 9.69531L12.6777 12.6328L11.4277 11.3828L14.3652 8.44531L8.86524 2.94531L3.05273 8.75781L15.4277 21.1328ZM34.7402 40.4453L40.5527 34.6328L35.0527 29.1328L32.1152 32.0703L30.8652 30.8203L33.8027 27.8828L28.2402 22.3203L22.4277 28.1328L34.7402 40.4453ZM10.2402 40.3828H3.17773V33.3203L14.1777 22.3203L0.677734 8.75781L8.86524 0.570312L22.4902 14.1328L34.1777 2.44531C34.3861 2.23698 34.5944 2.09115 34.8027 2.00781C35.0111 1.92448 35.2402 1.88281 35.4902 1.88281C35.7402 1.88281 35.9694 1.92448 36.1777 2.00781C36.3861 2.09115 36.5944 2.23698 36.8027 2.44531L41.1152 6.94531C41.3236 7.15365 41.459 7.36198 41.5215 7.57031C41.584 7.77865 41.6152 8.00781 41.6152 8.25781C41.6152 8.50781 41.584 8.72656 41.5215 8.91406C41.459 9.10156 41.3236 9.29948 41.1152 9.50781L29.5527 21.1328L42.9902 34.6953L34.8027 42.8828L21.2402 29.3828L10.2402 40.3828ZM4.92773 38.6328H9.49024L34.0527 14.0703L29.4902 9.50781L4.92773 34.0703V38.6328ZM31.8027 11.7578L29.4902 9.50781L34.0527 14.0703L31.8027 11.7578Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Unified Coding
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Establish and maintain a unified codebase architecture that guarantees seamless
                                compatibility and consistent performance across multiple operating systems and device
                                platforms, while simultaneously maximizing development productivity, reducing code
                                redundancy, and streamlining the overall software development lifecycle to achieve
                                optimal resource utilization and accelerated time-to-market delivery.
                            </p>
                        </div>

                        {/* Feature 03 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">03</span>
                                <div className="text-orange-500">
                                    <svg className="w-10 h-10" viewBox="0 0 33 47" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.552734 46.8828V15.1328H10.5527V6.00781L16.4277 0.507812L22.3027 6.00781V25.1328H32.3027V46.8828H0.552734ZM2.30273 45.1328H10.5527V36.8828H2.30273V45.1328ZM2.30273 35.1328H10.5527V26.8828H2.30273V35.1328ZM2.30273 25.1328H10.5527V16.8828H2.30273V25.1328ZM12.3027 45.1328H20.5527V36.8828H12.3027V45.1328ZM12.3027 35.1328H20.5527V26.8828H12.3027V35.1328ZM12.3027 25.1328H20.5527V16.8828H12.3027V25.1328ZM12.3027 15.1328H20.5527V6.88281H12.3027V15.1328ZM22.3027 45.1328H30.5527V36.8828H22.3027V45.1328ZM22.3027 35.1328H30.5527V26.8828H22.3027V35.1328Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Iterative Development
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Systematically construct, rigorously test, and continuously refine application
                                functionalities through iterative development cycles driven by ongoing user feedback and
                                performance analytics, thereby ensuring the delivery of an exceptional, user-centric
                                experience that consistently meets evolving stakeholder requirements and maintains the
                                highest standards of quality, usability, and performance optimization throughout the
                                product development lifecycle.
                            </p>
                        </div>

                        {/* Feature 04 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">04</span>
                                <div className="text-orange-500">
                                    <svg className="w-10 h-10" viewBox="0 0 47 45" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.3008 44.8828L12.3008 38.1328L4.67578 36.5078L5.42578 28.6328L0.300781 22.7578L5.42578 16.8828L4.67578 9.00781L12.3008 7.38281L16.3008 0.632812L23.4258 3.63281L30.5508 0.632812L34.5508 7.38281L42.1758 9.00781L41.4258 16.8828L46.5508 22.7578L41.4258 28.6328L42.1758 36.5078L34.5508 38.1328L30.5508 44.8828L23.4258 41.8828L16.3008 44.8828ZM17.0508 42.6328L23.4258 40.0078L29.8008 42.6328L33.4258 36.6328L40.3008 35.1328L39.6758 28.0078L44.3008 22.7578L39.6758 17.5078L40.3008 10.3828L33.4258 8.88281L29.8008 2.88281L23.4258 5.50781L17.0508 2.88281L13.4258 8.88281L6.55078 10.3828L7.17578 17.5078L2.55078 22.7578L7.17578 28.0078L6.55078 35.1328L13.4258 36.6328L17.0508 42.6328ZM20.8008 29.3828L32.6758 17.5078L31.4258 16.2578L20.8008 26.8828L15.4258 21.5078L14.1758 22.7578L20.8008 29.3828Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Quality Assurance
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Execute comprehensive, multi-tiered quality assurance protocols across an extensive
                                range of devices, operating systems, and usage scenarios to identify and eliminate
                                defects, thereby ensuring the delivery of a flawless, consistent, and seamless user
                                experience that maintains robust functionality, optimal performance, and reliability
                                standards across all supported platforms and device configurations.
                            </p>
                        </div>

                        {/* Feature 05 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">05</span>
                                <div className="text-orange-500">
                                    <svg className="w-10 h-10" viewBox="0 0 40 41" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3.05273 18.6953L9.55274 21.4453C10.3861 19.7787 11.3027 18.1641 12.3027 16.6016C13.3027 15.0391 14.4069 13.5287 15.6152 12.0703L11.6777 11.3203C11.3444 11.237 11.0215 11.2474 10.709 11.3516C10.3965 11.4557 10.1152 11.6328 9.86524 11.8828L3.05273 18.6953ZM10.9277 22.5703L17.9902 29.6328C20.0319 28.6745 22.0527 27.5078 24.0527 26.1328C26.0527 24.7578 27.9902 23.1328 29.8652 21.2578C32.4902 18.6328 34.4798 15.8724 35.834 12.9766C37.1882 10.0807 38.0111 6.487 38.3027 2.19533C34.0111 2.487 30.4277 3.30991 27.5527 4.66408C24.6777 6.01825 21.9277 8.00783 19.3027 10.6328C17.4277 12.5078 15.8027 14.4557 14.4277 16.4766C13.0527 18.4974 11.8861 20.5287 10.9277 22.5703ZM24.4277 16.0703C23.7611 15.4037 23.4277 14.612 23.4277 13.6953C23.4277 12.7787 23.7611 11.987 24.4277 11.3203C25.0944 10.6537 25.8965 10.3203 26.834 10.3203C27.7715 10.3203 28.5736 10.6537 29.2402 11.3203C29.9069 11.987 30.2402 12.7787 30.2402 13.6953C30.2402 14.612 29.9069 15.4037 29.2402 16.0703C28.5736 16.737 27.7715 17.0703 26.834 17.0703C25.8965 17.0703 25.0944 16.737 24.4277 16.0703ZM21.8027 37.5078L28.6152 30.6953C28.8652 30.4453 29.0423 30.1641 29.1465 29.8516C29.2507 29.5391 29.2611 29.2162 29.1777 28.8828L28.4277 24.9453C26.9694 26.1537 25.459 27.2578 23.8965 28.2578C22.334 29.2578 20.7194 30.1745 19.0527 31.0078L21.8027 37.5078ZM39.9902 0.570331C40.1152 5.02867 39.4173 9.0495 37.8965 12.6328C36.3757 16.2162 34.0944 19.5287 31.0527 22.5703L29.9277 23.6953L30.8652 28.5078C30.9902 29.1328 30.9694 29.737 30.8027 30.3203C30.6361 30.9037 30.3236 31.4245 29.8652 31.8828L21.1777 40.5078L17.3652 31.5078L8.99024 23.1328L-0.00976562 19.2578L8.61524 10.6328C9.07357 10.1745 9.5944 9.85158 10.1777 9.66408C10.7611 9.47658 11.3652 9.44533 11.9902 9.57033L16.9277 10.5703C17.1361 10.362 17.3132 10.1745 17.459 10.0078C17.6048 9.84116 17.7819 9.65367 17.9902 9.44533C21.0319 6.40367 24.3444 4.13283 27.9277 2.63283C31.5111 1.13283 35.5319 0.445331 39.9902 0.570331ZM4.11523 30.3203C4.94857 29.487 5.95898 29.0807 7.14648 29.1016C8.33399 29.1224 9.3444 29.5495 10.1777 30.3828C11.0111 31.2162 11.4277 32.2266 11.4277 33.4141C11.4277 34.6016 11.0111 35.612 10.1777 36.4453C9.38607 37.237 8.13607 37.9141 6.42774 38.4766C4.7194 39.0391 2.9069 39.3828 0.990234 39.5078C1.11523 37.5912 1.4694 35.7787 2.05273 34.0703C2.63607 32.362 3.32357 31.112 4.11523 30.3203ZM5.36523 31.6328C4.86523 32.1328 4.4069 32.9245 3.99023 34.0078C3.57357 35.0912 3.30273 36.2162 3.17773 37.3828C4.3444 37.2578 5.4694 36.9766 6.55273 36.5391C7.63607 36.1016 8.42774 35.6328 8.92774 35.1328C9.42774 34.6328 9.67774 34.0391 9.67774 33.3516C9.67774 32.6641 9.42774 32.0703 8.92774 31.5703C8.42774 31.0703 7.83398 30.8307 7.14648 30.8516C6.45898 30.8724 5.86523 31.1328 5.36523 31.6328Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Deployment Excellence
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Orchestrate a meticulously planned and executed deployment strategy across iOS, Android,
                                and additional target platforms, ensuring full compliance with platform-specific app
                                store guidelines, submission requirements, and quality standards to achieve a
                                successful, coordinated multi-platform launch that maximizes market reach while
                                maintaining regulatory adherence and brand integrity throughout the release process.
                            </p>
                        </div>

                        {/* Feature 06 */}
                        <div
                            className={`${isDayTime ? 'bg-white hover:bg-slate-50 text-black' : 'bg-black text-white hover:bg-slate-700'} rounded-lg p-8 hover:shadow-lg transition-shadow duration-300`}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-gray-300 text-4xl font-light">06</span>
                                <div className="text-orange-500">
                                    <svg className="w-10 h-10" viewBox="0 0 42 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.705078 36.6328V34.8828H8.70508L5.58008 31.7578C3.70508 29.8828 2.34049 27.8516 1.48633 25.6641C0.632161 23.4766 0.205078 21.2578 0.205078 19.0078C0.205078 15.1745 1.27799 11.6849 3.42383 8.53906C5.56966 5.39323 8.41341 3.09115 11.9551 1.63281V3.50781C8.91341 4.84115 6.48633 6.91406 4.67383 9.72656C2.86133 12.5391 1.95508 15.6328 1.95508 19.0078C1.95508 21.0911 2.35091 23.112 3.14258 25.0703C3.93425 27.0286 5.16341 28.8411 6.83008 30.5078L9.95508 33.6328V25.6328H11.7051V36.6328H0.705078ZM38.5801 15.1953H36.8301C36.4967 13.737 35.9655 12.3099 35.2363 10.9141C34.5072 9.51823 33.5384 8.21615 32.3301 7.00781L29.2051 3.88281V11.8828H27.4551V0.882812H38.4551V2.63281H30.4551L33.5801 5.75781C34.9551 7.17448 36.0488 8.67448 36.8613 10.2578C37.6738 11.8411 38.2467 13.487 38.5801 15.1953ZM32.0801 39.1328L31.9551 37.4453C30.8717 37.237 29.9967 36.9245 29.3301 36.5078C28.6634 36.0911 28.0384 35.5703 27.4551 34.9453L25.9551 35.7578L24.8301 34.2578L26.2676 33.1328C25.8926 32.1328 25.7051 31.1745 25.7051 30.2578C25.7051 29.3411 25.8926 28.3828 26.2676 27.3828L24.8301 26.2578L25.9551 24.7578L27.4551 25.5703C28.0384 24.9453 28.6634 24.4245 29.3301 24.0078C29.9967 23.5911 30.8717 23.2786 31.9551 23.0703L32.0801 21.3828H33.8301L33.9551 23.0703C35.0384 23.2786 35.9134 23.5911 36.5801 24.0078C37.2467 24.4245 37.8717 24.9453 38.4551 25.5703L39.9551 24.7578L41.0801 26.2578L39.6426 27.3828C40.0176 28.3828 40.2051 29.3411 40.2051 30.2578C40.2051 31.1745 40.0176 32.1328 39.6426 33.1328L41.0801 34.2578L39.9551 35.7578L38.4551 34.9453C37.8717 35.5703 37.2467 36.0911 36.5801 36.5078C35.9134 36.9245 35.0384 37.237 33.9551 37.4453L33.8301 39.1328H32.0801ZM32.9551 35.7578C34.4551 35.7578 35.7467 35.2161 36.8301 34.1328C37.9134 33.0495 38.4551 31.7578 38.4551 30.2578C38.4551 28.7578 37.9134 27.4661 36.8301 26.3828C35.7467 25.2995 34.4551 24.7578 32.9551 24.7578C31.4551 24.7578 30.1634 25.2995 29.0801 26.3828C27.9967 27.4661 27.4551 28.7578 27.4551 30.2578C27.4551 31.7578 27.9967 33.0495 29.0801 34.1328C30.1634 35.2161 31.4551 35.7578 32.9551 35.7578Z"
                                            fill="#10e3e3"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-[1.5em] font-[600] leading-[1] mb-3">
                                Post-Launch Support
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Implement a comprehensive post-launch support framework encompassing continuous
                                performance monitoring, proactive issue resolution, regular feature enhancements, and
                                systematic maintenance updates to ensure sustained application stability, optimal user
                                satisfaction, and long-term product success while adapting to evolving market demands,
                                technological advancements, and user feedback throughout the application&#39;s
                                operational
                                lifecycle.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* When to Consider Grey InfoTech's Cross Platform Application Development Services? */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'backend technology'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] lg:pb-[2em] md:pb-[2em] pb-[1em] mb-20 ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                When to Consider <span className={'text-[#0ef0dd]'}>Grey <br
                                className={'lg:block md:block hidden'}/>InfoTech&#39;s Cross Platform <br
                                className={'lg:block md:block hidden'}/>Application</span> Development <br
                                className={'lg:block md:block hidden'}/>Services?
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                We architect enterprise-grade cross-platform applications that deliver exceptional
                                functionality, intuitive user experiences, and compelling design across all mobile
                                ecosystems. Leveraging advanced frameworks and proven methodologies, our solutions
                                ensure native-like performance, consistent brand presentation, and flawless operation on
                                iOS, Android, and progressive web platforms. Through rigorous quality assurance and
                                device-specific optimizations, we create scalable applications that maximize user
                                engagement while accelerating time-to-market and optimizing development
                                investment—enabling you to maintain competitive agility in rapidly evolving digital
                                landscapes.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex max-w-full mx-auto ${isDesktop ? "flex-row h-[400px]" : "flex-col h-auto"}`}>
                        {steps.map((step, idx) => {
                            const isActive = idx === activeAcc;

                            return (
                                <div
                                    key={idx}
                                    className={`transition-all duration-500 ease-in-out flex flex-col bg-[#031E29] border border-[#0E3B46] rounded-md overflow-hidden ${
                                        isDesktop ? "mx-[0.05em]" : "mb-3"
                                    }`}
                                    style={{
                                        width: isDesktop
                                            ? isActive
                                                ? '100%'
                                                : '60px'
                                            : '100%'
                                    }}
                                >
                                    {/* Inactive Panel */}
                                    {!isActive && (
                                        <div
                                            onClick={() => handleClick(idx)}
                                            className={`flex cursor-pointer ${
                                                isDesktop
                                                    ? "flex-col items-center justify-center h-full pt-3"
                                                    : "flex-row items-center p-4"
                                            }`}>
                                            <span className="text-[1.5em] font-[600] text-gray-500">
                                                {step.number}
                                            </span>

                                            <div
                                                className={`${isDesktop ? 'flex items-center justify-center h-full' : 'items-center w-full '}`}>
                                                <span
                                                    className={`text-[0.875em] font-[600] tracking-widest uppercase text-gray-400 ${
                                                        isDesktop ? "mt-4" : "ml-3"
                                                    }`}
                                                    style={
                                                        isDesktop
                                                            ? {
                                                                writingMode: "vertical-rl",
                                                                transform: "rotate(180deg)",
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    {step.title}
                                                </span>
                                            </div>

                                        </div>
                                    )}

                                    {/* Active Panel */}
                                    {isActive && (
                                        <div
                                            className={`flex ${
                                                isDesktop ? "flex-row" : "flex-col"
                                            } flex-1 cursor-pointer`}
                                            onClick={() => handleClick(idx)}
                                        >
                                            <div
                                                className={`${
                                                    isDesktop
                                                        ? 'w-16 flex flex-col items-center justify-start pt-3 border-r'
                                                        : 'flex-row items-center p-4 border-b'
                                                } border-[#0E3B46]`}
                                            >

                                                <span className="text-[1.5em] font-[600] text-gray-500">
                                                    {step.number}
                                                </span>

                                                <span
                                                    className={`text-[0.8em] font-[600] tracking-wide uppercase text-gray-400 ${
                                                        isDesktop ? 'mt-[6em]' : 'ml-3'}`}
                                                    style={
                                                        isDesktop
                                                            ? {
                                                                writingMode: "vertical-rl",
                                                                transform: "rotate(180deg)",
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    {step.title}
                                                </span>
                                            </div>

                                            {/* Right content */}
                                            <div
                                                className={`flex-1 mx-1 relative overflow-hidden transition-all duration-500 ease-in-out ${
                                                    isDesktop
                                                        ? ""
                                                        : isActive
                                                            ? "max-h-[1000px]"
                                                            : "max-h-0"
                                                }`}
                                            >
                                                <div
                                                    className={`h-full border border-[#0E3B46] p-6 md:p-10 flex flex-col justify-center transform transition-all duration-500 ease-in-out ${
                                                        isActive
                                                            ? "opacity-100 translate-y-0"
                                                            : "opacity-0 -translate-y-4"
                                                    }`}
                                                >

                                                    <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-gray-200">
                                                        {step.heading}
                                                    </h2>
                                                    <p className="text-[0.873em] text-gray-400 text-justify  leading-relaxed">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Technologies We Use */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-slate-600'}`}>
                <div id={'Toolchain'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div className={`${isDayTime ? 'text-black' : 'text-white'} text-center`}>
                        <h2 className="capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            <span className={'text-[#0ef0dd]'}>Technologies</span> We Use
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            Grey InfoTech harnesses cutting-edge cross-platform technologies and frameworks to architect
                            mobile solutions that align precisely with your strategic business objectives. Our
                            development team leverages industry-leading platforms including React Native, Flutter, and
                            Xamarin, combined with cloud-native architectures, advanced API integrations, and modern
                            DevOps practices to create scalable, high-performance applications. By employing progressive
                            development methodologies, real-time analytics integration, and AI-powered features, we
                            ensure your mobile presence not only meets current market demands but anticipates future
                            technological evolution. This technology-forward approach enables seamless integration with
                            existing enterprise systems, supports complex business logic and workflows, and provides the
                            flexibility to adapt quickly as your requirements evolve—transforming your mobile
                            application from a standalone tool into a strategic asset that drives customer engagement,
                            operational efficiency, and measurable business outcomes aligned with your growth
                            trajectory.
                        </p>

                        {/* Tabs */}
                        <div
                            className="mt-20 flex flex-wrap justify-center gap-8 border-b text-[1.3em] font-[500] text-gray-400">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveFront(tab.key)}
                                    className={`pb-1.5 transition-colors ${
                                        activeFront === tab.key
                                            ? "border-b-1 border-[#0ef0dd] text-[#0ef0dd]"
                                            : "hover:text-gray-800"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="mt-16">
                            <div
                                className="mx-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-8 justify-start items-start">
                                {data[activeFront]?.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center gap-1.5">
                                        <div className="relative h-16 w-16 lg:h-28 lg:w-28 md:h-20 md:w-20">
                                            <Image
                                                src={item.logo}
                                                alt={item.name}
                                                fill
                                                className="object-contain"
                                                sizes="(min-width:1024px) 64px, (min-width:768px) 56px, 48px"
                                            />
                                        </div>
                                        <span
                                            className="text-[1em] md:text-[1.3em] lg:text-[1.3em] text-center font-medium  break-words max-w-[8rem]">
                          {item.name}
                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Industry-Specific Cross-Platform App Development */}
            <div
                className={`lg:pt-[2em] h-auto border-b max-w-full w-full mx-auto ${isDayTime ? 'bg-black border-white' : 'bg-white border-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[3em] md:pt-[3em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-white' : 'text-black'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                <span className={'text-[#0ef0dd]'}>Industry-Specific</span> Cross-Platform <span
                                className={'text-[#0ef0dd]'}>App Development</span>
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                Grey InfoTech&#39;s industry-specialized cross-platform development expertise delivers
                                solutions precisely calibrated to the unique regulatory requirements, operational
                                workflows, and competitive dynamics of your sector. Our deep vertical knowledge spans
                                healthcare, finance, retail, logistics, manufacturing, and beyond—enabling us to
                                architect applications that address industry-specific challenges while exceeding
                                compliance standards and performance benchmarks. We integrate sector-appropriate
                                features such as HIPAA-compliant data handling for healthcare, PCI-DSS security for
                                financial services, real-time inventory management for retail, or IoT connectivity for
                                manufacturing operations. By combining cross-platform efficiency with industry-specific
                                functionality, we create solutions that resonate with your target users, streamline
                                specialized workflows, and support regulatory adherence. This sector-focused approach
                                ensures your application not only functions seamlessly across all platforms but delivers
                                the domain expertise and contextual capabilities that differentiate your business within
                                your competitive landscape and drive measurable outcomes aligned with industry success
                                metrics.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-white' : 'text-black'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>IT Staff Augmentation & Resource Management Applications</span>
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
                                        We develop specialized cross-platform applications for IT staffing agencies,
                                        technology consulting firms, and enterprise IT departments that optimize
                                        resource allocation, streamline talent management, and enhance client-consultant
                                        collaboration. Our IT staffing solutions integrate comprehensive consultant
                                        databases with detailed skill profiles, certifications, experience levels,
                                        technology expertise, and availability status, advanced matching algorithms
                                        pairing consultants with project requirements based on skills and cultural fit,
                                        project management with resource forecasting and utilization tracking, timesheet
                                        management with mobile time entry and automated invoicing, applicant tracking
                                        for candidate sourcing and interview scheduling, client relationship management
                                        with contract details and billing rates, bench management with skills gap
                                        analysis and training recommendations, vendor management for subcontractor
                                        coordination, onboarding workflows with document collection and equipment
                                        provisioning, performance management with reviews and skill assessments,
                                        compliance tracking for certifications and work authorization, mobile access for
                                        consultants to view assignments and submit timesheets, client portals for
                                        requisition submission and consultant evaluation, resource forecasting tools
                                        predicting staffing needs, assignment history tracking for experience
                                        documentation, expense management, communication tools for team coordination,
                                        and reporting dashboards with utilization rates and revenue metrics. Advanced
                                        capabilities include AI-powered skill matching using natural language
                                        processing, predictive analytics for retention risk identification, automated
                                        resume generation, machine learning for pricing optimization, blockchain-based
                                        credential verification, video interviewing platform integration, chatbot
                                        assistance for policy questions, talent pool analytics identifying skill
                                        shortages, contract lifecycle management, project success prediction based on
                                        team composition, knowledge management systems, learning management integration
                                        for continuous development, workforce planning scenarios, automated compliance
                                        monitoring, collaboration platform integration, sentiment analysis of consultant
                                        feedback, and comprehensive business intelligence for workforce planning. These
                                        applications maximize billable utilization through efficient resource
                                        allocation, improve consultant satisfaction and retention, enhance client
                                        relationships through transparency and quality delivery, reduce administrative
                                        overhead, provide data-driven insights for strategic planning, support rapid
                                        scaling, ensure regulatory compliance, enable distributed team collaboration,
                                        optimize financial performance, and deliver the operational efficiency and
                                        talent optimization required in competitive IT staffing markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Music & Entertainment Streaming Applications</span>
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

                                        Our cross-platform music and entertainment applications serve record labels,
                                        independent artists, streaming platforms, and media companies with sophisticated
                                        solutions for content discovery, playback, and social engagement. We develop
                                        immersive platforms featuring extensive music libraries with millions of tracks,
                                        intelligent search with genre and mood filters, personalized AI-powered
                                        recommendations analyzing listening behavior, curated playlists by music
                                        experts, user-generated collaborative playlists, high-quality adaptive bitrate
                                        streaming, offline downloads, seamless playback across devices with synchronized
                                        positions, social features for following friends and sharing tracks,
                                        synchronized lyrics display, artist profiles with discographies and concert
                                        dates, podcast integration with subscriptions and variable playback speeds,
                                        radio stations, music video streaming, concert livestreaming, lossless and
                                        spatial audio options, car mode interface, voice control integration, crossfade
                                        and gapless playback, equalizer controls, sleep timer functionality, and
                                        wearable device integration. Advanced features include AI-powered music
                                        discovery based on mood and context, artist collaboration tools, fan engagement
                                        with exclusive content and direct messaging, smart playlists auto-updating based
                                        on listening patterns, concert discovery with ticket purchasing, karaoke
                                        functionality with vocal removal, social listening parties, music recognition
                                        technology, fitness application integration with BPM matching, podcast
                                        transcription with searchable text, subscription tiers and ad-supported options,
                                        blockchain for transparent royalty distribution and NFT collectibles, spatial
                                        audio experiences, live DJ mixing capabilities, artist analytics dashboards,
                                        copyright detection systems, and social media integration. These applications
                                        transform listening into engaging social experiences, democratize music
                                        distribution for independent artists, provide sustainable revenue models with
                                        fair compensation, deliver personalized discovery experiences, support the
                                        creator economy with direct monetization tools, enable seamless multi-device
                                        experiences, build vibrant communities, and deliver the high-quality, socially
                                        connected experiences essential in competitive streaming markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Business & Corporate Productivity Applications</span>
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
                                        We architect enterprise-grade cross-platform business applications for
                                        corporations, professional services firms, and consulting companies that enhance
                                        workplace productivity and streamline collaboration across iOS and Android
                                        platforms. Our corporate solutions integrate comprehensive project management
                                        with task assignment, milestone tracking, and resource allocation, team
                                        collaboration with threaded discussions and file sharing, document management
                                        with version control and collaborative editing, time tracking and timesheet
                                        management with billable hours, expense management with receipt capture and
                                        approval workflows, CRM functionality for contact management and sales pipeline
                                        tracking, meeting scheduling with calendar integration and room booking, mobile
                                        access to business intelligence dashboards and KPI monitoring, secure messaging
                                        and video conferencing, employee directory with organizational charts, approval
                                        workflows for purchase orders and contracts, invoice generation, vendor
                                        management and procurement, digital signature capabilities, business card
                                        scanning, and integration with existing enterprise systems including ERP and
                                        HRMS. Advanced capabilities include AI-powered virtual assistants for scheduling
                                        and task automation, natural language processing for voice commands, predictive
                                        analytics for sales forecasting and resource planning, automated workflow
                                        triggers, sentiment analysis for customer communication, OCR for document
                                        digitization, geolocation for field workforce tracking, blockchain for secure
                                        contract management, augmented reality for remote assistance, machine learning
                                        for intelligent document categorization, enterprise SSO integration, role-based
                                        access controls, mobile device management integration, compliance monitoring,
                                        and real-time synchronization across devices. These applications empower
                                        distributed teams to collaborate effectively, accelerate decision-making through
                                        mobile access to business-critical information, reduce administrative overhead,
                                        improve project delivery and client satisfaction, enhance employee productivity,
                                        support remote and hybrid work models, ensure data security and compliance, and
                                        deliver integrated mobile-first business tools for efficient operations.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Logistics & Transportation Applications</span>
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
                                        Our cross-platform logistics applications serve freight companies, courier
                                        services, fleet operators, and supply chain businesses with comprehensive
                                        solutions for route optimization, shipment tracking, and driver management. We
                                        develop robust platforms with shipment booking and instant quotes, real-time GPS
                                        tracking, proof of delivery with digital signatures and photos, driver apps with
                                        optimized route navigation, job acceptance and status updates, barcode and QR
                                        code scanning, electronic logging for compliance, vehicle inspection checklists,
                                        load matching marketplace functionality, customer notifications for shipment
                                        status, estimated arrival times with live traffic updates, delivery exception
                                        reporting, electronic waybills, payment processing and invoicing, customer
                                        feedback collection, offline functionality, multi-stop route planning, and fuel
                                        tracking. Advanced features include AI-powered route optimization considering
                                        traffic and delivery windows, predictive delivery time estimation, dynamic
                                        rerouting based on real-time conditions, geofencing for automatic status
                                        updates, load optimization algorithms, driver performance analytics, warehouse
                                        management integration, customs documentation, temperature monitoring for
                                        refrigerated transport, fleet telematics integration, augmented reality for
                                        warehouse navigation, blockchain for supply chain transparency, carbon footprint
                                        calculation, and comprehensive business intelligence dashboards. These
                                        applications improve delivery speed and reliability, reduce operational costs,
                                        enhance customer satisfaction, increase driver productivity, improve fleet
                                        safety, enable scalable growth, and deliver the visibility and efficiency
                                        required in demanding logistics markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Fitness & Wellness Applications</span>
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
                                        We develop engaging cross-platform fitness applications for gyms, studios,
                                        personal trainers, and wellness centers that motivate users, track progress, and
                                        deliver personalized health experiences. Our wellness solutions integrate
                                        workout libraries with video demonstrations, customizable workout plans based on
                                        goals and experience levels, workout tracking with sets and reps logging,
                                        exercise timers, progress tracking with body measurements and performance
                                        metrics, wearable device integration for automatic activity syncing, nutrition
                                        tracking with food diary and calorie counting, meal planning with recipes,
                                        hydration and sleep monitoring, guided meditation and yoga routines, personal
                                        training session booking, class schedules and check-in, virtual training
                                        sessions, social features for connecting with workout buddies, challenges and
                                        competitions, achievement badges, and progress photo tracking. Advanced
                                        capabilities include AI-powered personal training with form correction using
                                        computer vision, adaptive workout plans adjusting to performance, personalized
                                        nutrition recommendations, genetic testing integration, biometric analysis,
                                        heart rate zone training, injury prevention programs, mental health tracking
                                        with mood journals, menstrual cycle tracking with workout adjustments, music
                                        streaming integration, augmented reality experiences, comprehensive health
                                        reports, and telemedicine consultation. These applications increase gym
                                        membership retention, enable fitness professionals to scale services digitally,
                                        improve user fitness outcomes, build engaged wellness communities, support
                                        hybrid fitness models, and deliver the comprehensive, data-driven experiences
                                        health-conscious consumers demand.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Food & Restaurant Delivery Applications</span>
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
                                        Our cross-platform food delivery applications serve restaurant chains, cloud
                                        kitchens, and delivery platforms with comprehensive solutions for menu browsing,
                                        ordering, payment processing, and delivery coordination. We develop
                                        sophisticated platforms featuring visually appealing restaurant and menu
                                        browsing with high-quality photography, detailed dish descriptions with
                                        nutritional information, advanced search and filtering by cuisine, dietary
                                        preferences, and delivery time, personalized recommendations, customizable
                                        orders with modifications, multiple payment options including digital wallets,
                                        real-time order tracking with GPS-enabled driver location, push notifications
                                        for order status updates, order history for quick reordering, saved addresses
                                        and payment methods, loyalty programs, promotional codes, customer reviews and
                                        ratings, group ordering capabilities, scheduled ordering, dietary filters, and
                                        direct communication with restaurants and drivers. Advanced features include
                                        AI-powered chatbots for customer service, dynamic delivery fee calculation,
                                        surge pricing transparency, contactless delivery with photo confirmation, driver
                                        rating, subscription plans, corporate accounts, kitchen display system
                                        integration, driver route optimization, real-time inventory management, voice
                                        ordering, and analytics dashboards for menu optimization. These applications
                                        increase restaurant order volume and revenue, improve operational efficiency,
                                        enhance customer satisfaction, reduce order errors, enable restaurants to
                                        compete with third-party platforms, and deliver the fast, convenient experiences
                                        consumers expect.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Education & E-Learning Applications</span>
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
                                        We create comprehensive cross-platform educational applications for schools,
                                        universities, corporate training programs, and online learning platforms that
                                        facilitate engaging learning experiences and streamline administrative
                                        processes. Our educational solutions encompass course catalogs and enrollment,
                                        interactive multimedia lessons, video lectures with note-taking, document
                                        libraries, assignment submission and grading, assessments with various question
                                        types, discussion forums, real-time messaging and video conferencing, calendar
                                        integration, grade tracking and progress monitoring, attendance management, push
                                        notifications for deadlines, offline content access, certificate generation,
                                        learning analytics dashboards, parental access for K-12 monitoring, and library
                                        integration. Advanced features include adaptive learning paths adjusting to
                                        student performance, gamification with badges and leaderboards, AI-powered
                                        tutoring assistants, speech recognition for language learning, augmented reality
                                        for immersive science and history lessons, collaborative whiteboards, plagiarism
                                        detection, accessibility features including screen readers and closed
                                        captioning, virtual labs and simulations, career services integration, and
                                        analytics for identifying struggling students. These applications improve
                                        student engagement and outcomes, increase course completion rates, reduce
                                        administrative workload, enable flexible learning, facilitate better
                                        communication, support hybrid and remote learning models, and provide
                                        data-driven insights for continuous educational improvement.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>E-Commerce & Retail Applications</span>
                                    {webIndex === 7 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 7 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We architect sophisticated cross-platform shopping applications for retailers,
                                        consumer brands, and marketplace platforms that create seamless omnichannel
                                        experiences and maximize conversion rates across mobile devices. Our e-commerce
                                        solutions integrate comprehensive product catalogs with advanced search and
                                        filtering, detailed product pages with 360-degree views, AI-powered personalized
                                        recommendations, shopping cart and wish lists, secure checkout with multiple
                                        payment options, real-time order tracking, customer reviews and ratings, loyalty
                                        program integration, push notifications for promotions and price drops, barcode
                                        scanning, augmented reality try-on experiences, store locator with inventory
                                        availability, buy-online-pickup-in-store capabilities, returns management, and
                                        AI-powered customer service chat. Advanced features include dynamic pricing
                                        based on browsing behavior, subscription management, virtual shopping
                                        assistants, live video shopping, social commerce integration, size
                                        recommendation engines, sustainability information, same-day delivery options,
                                        multi-currency support, and comprehensive conversion analytics. These
                                        applications increase mobile sales conversion, improve customer lifetime value,
                                        reduce cart abandonment, build brand loyalty, provide valuable customer
                                        insights, and enable retailers to compete effectively in mobile-first consumer
                                        markets.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(8)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Finance & Banking Applications</span>
                                    {webIndex === 8 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 8 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform financial applications serve banks, fintech startups,
                                        investment firms, and insurance companies with secure, feature-rich mobile
                                        banking and financial services platforms that deliver consistent experiences
                                        across iOS and Android. We develop comprehensive solutions with account
                                        management, real-time balance and transaction history, funds transfer, mobile
                                        check deposit with OCR technology, bill payment, cardless ATM withdrawal,
                                        spending analytics and budgeting tools, savings goals, loan applications,
                                        investment portfolio tracking, fraud alerts, biometric authentication, and
                                        secure customer service messaging. Advanced capabilities include peer-to-peer
                                        payments, digital wallet functionality with contactless payments, personal
                                        financial management with spending insights, investment recommendations based on
                                        risk profiles, automated savings programs, document management, branch and ATM
                                        locators, cryptocurrency trading, and real-time fraud detection with machine
                                        learning. These applications enhance customer engagement and retention, reduce
                                        operational costs, attract digital-native customers, enable 24/7 account access,
                                        provide actionable financial insights, and deliver the secure, convenient
                                        experiences essential for competitive positioning in financial services.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(9)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Healthcare & Telemedicine Applications</span>
                                    {webIndex === 9 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 9 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        We develop HIPAA-compliant cross-platform mobile applications for healthcare
                                        providers, telemedicine platforms, and medical institutions that enable secure
                                        patient engagement and clinical workflow management across iOS and Android
                                        devices. Our healthcare solutions integrate electronic health records,
                                        appointment scheduling, secure video consultations with end-to-end encryption,
                                        prescription management, patient vital monitoring through wearable integration,
                                        medication reminders, and symptom tracking. Key features include real-time
                                        provider availability, insurance verification, secure document upload for
                                        medical records, telehealth video integration, patient portal access for lab
                                        results and treatment plans, billing and payment processing, provider ratings,
                                        and offline functionality for critical health information. These applications
                                        improve patient access to healthcare services, reduce no-show rates through
                                        automated reminders, enable chronic disease management, streamline
                                        administrative workflows, enhance patient satisfaction, and extend healthcare
                                        delivery beyond traditional clinical settings while ensuring data security and
                                        regulatory compliance.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(10)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>Real Estate & Property Management Applications</span>
                                    {webIndex === 10 ? (
                                        <AiFillCaretUp
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    ) : (
                                        <AiFillCaretDown
                                            className={`lg:text-[1.5em] text-[1em]`}/>
                                    )}
                                </button>
                                {webIndex === 10 && (
                                    <p className="mt-4 text-[0.873em] text-justify tracking-normal leading-[1.5]text-gray-400">
                                        Our cross-platform real estate applications serve property developers, agencies,
                                        and management companies with comprehensive solutions for property search,
                                        virtual tours, and tenant engagement. We develop feature-rich platforms with
                                        advanced property search and filtering, interactive map views with neighborhood
                                        insights, high-quality galleries and 360-degree virtual tours, augmented reality
                                        visualization for staging, saved searches with push notifications for new
                                        listings, mortgage calculators, appointment scheduling, agent communication,
                                        document management, digital signatures, rent payment processing, maintenance
                                        request tracking, inspection documentation, amenity booking, visitor management,
                                        community announcements, package notifications, lease renewal management, and
                                        investment analysis tools. Advanced capabilities include AI-powered property
                                        recommendations, chatbot assistance, video tours and live virtual showings,
                                        comparative market analysis, lead management and CRM integration, listing
                                        syndication, property performance dashboards, smart home integration, and
                                        blockchain-based transactions. These applications accelerate property discovery,
                                        improve tenant satisfaction, reduce administrative burden, enhance agent
                                        productivity, increase lead conversion, and deliver the modern digital
                                        experiences expected in competitive real estate markets.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Grey InfoTech As Your Cross-Platform App Development Company? */}
            <div
                className={`h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:pt-[6em] md:pt-[6em] pt-[4em] lg:pb-[5em] md:pb-[5em] pb-[4em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-[6em] gap-4 h-auto'}>
                        <div
                            className={'relative w-full max-w-full h-auto lg:pr-[11.2em] md:pr-[11.2em] mb-8'}>
                            <Image
                                src={'/assets/cms/why_choose_cms.jpg'}
                                alt={'CMS'}
                                width={225}
                                height={300}
                                className={'object-cover w-full h-auto rounded-xl'}
                            />
                        </div>
                        <div
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.8em] capitalize font-[700] tracking-tight leading-[1.2] mb-10 lg:text-[3.5em] md:text-[2.5em] w-auto h-auto'>
                                Why Choose <span className={'text-[#0ef0dd]'}>Grey InfoTech</span> <br
                                className={'lg:block md:block hidden'}/>As Your <span
                                className={'text-[#0ef0dd]'}>Cross-Platform App</span> <br
                                className={'lg:block md:block hidden'}/>Development Company?
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Grey InfoTech delivers comprehensive cross-platform app development expertise built on
                                continuous innovation, technical excellence, and strategic mastery of emerging
                                technologies. Our commitment to staying at the forefront of technological advancement
                                enables us to leverage cutting-edge frameworks, development methodologies, and industry
                                best practices that provide our clients with decisive competitive advantages. We harness
                                the full capabilities of modern cross-platform technologies including React Native,
                                Flutter, Xamarin, and progressive web frameworks to architect sophisticated applications
                                that execute flawlessly across iOS, Android, web, and emerging platforms. Our technical
                                proficiency encompasses advanced performance optimization, native feature integration,
                                seamless third-party service connectivity, and robust security implementations that
                                ensure applications meet the highest standards for reliability, scalability, and user
                                experience across diverse operating environments.<br/><br/>

                                Grey InfoTech&#39;s cross-platform development approach delivers exceptional
                                cost-effectiveness through maximized code reusability, accelerated deployment timelines
                                that compress market entry windows, and streamlined maintenance protocols that reduce
                                long-term operational overhead. Our solutions provide organizations with strategic
                                agility to respond rapidly to market dynamics, competitive pressures, and evolving
                                customer expectations while maintaining consistent brand experiences across all digital
                                touchpoints. By partnering with Grey InfoTech for your cross-platform mobile application
                                development, you gain access to specialized proficiency honed through extensive
                                enterprise deployments, unwavering dedication to technical excellence, and proven
                                methodologies that consistently deliver superior outcomes. This partnership positions
                                your organization on a seamless journey toward application excellence, expanded market
                                presence, enhanced customer engagement, and sustainable competitive dominance in an
                                increasingly complex and rapidly evolving digital marketplace where technological
                                innovation drives business success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Get a Cross-Platform App For Your Business? */}
            <div
                className={`h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative lg:pt-[6em] md:pt-[6em] pt-[4em] lg:pb-[5em] md:pb-[5em] pb-[4em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header Section */}
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 mb-8 sm:mb-12 md:mb-14 lg:mb-16  ${isDayTime ? 'text-white' : 'text-black'}`}>
                        {/* Left Side - Title */}
                        <div className="order-1">
                            <h2 className={`xl:text-[3.12em] lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Why Get a Cross-Platform <br className={'lg:block md:block hidden'}/>App For Your <span
                                className="text-[#0ef0dd]">Business?</span>
                            </h2>
                        </div>

                        {/* Right Side - Description */}
                        <div className="order-2 space-y-4 sm:space-y-5 md:space-y-6">
                            <p className="text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal">
                                The exponential growth of operating systems and mobile platforms has fundamentally
                                transformed the digital marketplace, making multi-platform presence essential for
                                competitive success. Applications absent from key platforms forfeit substantial user
                                acquisition opportunities and revenue potential. Cross-platform application development
                                effectively addresses this critical business challenge by enabling organizations to
                                maximize market penetration, engage diverse user demographics, and optimize revenue
                                generation across all major platforms simultaneously. Partnering with an
                                industry-leading cross-platform development firm ensures the delivery of robust,
                                enterprise-grade applications that maintain consistent performance and user experience
                                across diverse ecosystems while reducing development costs and accelerating
                                time-to-market, thereby providing significant competitive advantages in today&#39;s
                                increasingly fragmented digital landscape.
                            </p>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <div
                        className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                        {[
                            {
                                title: "Broad Market Reach",
                                description: (
                                    <>
                                        Expand market penetration by deploying your brand across multiple digital
                                        platforms, enabling multi-channel engagement with diverse customer segments
                                        while leveraging platform-specific optimization to maximize visibility and
                                        capture growth opportunities across the digital landscape.
                                    </>
                                )
                            },
                            {
                                title: "Cost and Time Efficiency",
                                description: (
                                    <>
                                        Accelerate time-to-market and reduce total cost of ownership by leveraging
                                        unified codebase architecture that eliminates redundant development efforts
                                        across platforms, streamlines maintenance workflows, and maximizes resource
                                        utilization, enabling economical cross-platform application deployment with
                                        consistent functionality while minimizing infrastructure overhead and ongoing
                                        operational expenses.
                                    </>
                                )
                            },
                            {
                                title: "Seamless Integration",
                                description: (
                                    <>
                                        Deploy new features, functionality enhancements, and system updates with minimal
                                        disruption through streamlined integration protocols that maintain application
                                        stability and performance consistency, ensuring uninterrupted user experiences
                                        across all platforms while reducing deployment complexity, accelerating release
                                        cycles, and preserving operational continuity throughout the update lifecycle.
                                    </>
                                )
                            },
                            {
                                title: "Scalability",
                                description: [
                                    <>
                                        Future-proof your digital infrastructure by implementing elastic, scalable
                                        architectural solutions that dynamically accommodate increasing user volumes,
                                        expanding feature requirements, and evolving business demands, while maintaining
                                        optimal performance and enabling seamless adaptation to emerging technologies,
                                        market shifts, and growth trajectories without requiring costly platform
                                        migrations or fundamental system redesigns.
                                    </>
                                ]
                            },
                            {
                                title: "Efficient Development",
                                description: [
                                    <>
                                        Maximize development efficiency through intelligent coding practices that
                                        leverage component reusability, modular architecture, and shared libraries
                                        across platforms, coupled with optimized deployment strategies and automated
                                        workflows that reduce redundant efforts, accelerate delivery timelines, minimize
                                        technical debt, and generate substantial cost savings while maintaining code
                                        quality and system reliability throughout the development lifecycle.
                                    </>
                                ]
                            },
                            {
                                title: "Faster launch",
                                description: [
                                    <>
                                        Accelerate time-to-market through streamlined cross-platform development
                                        methodologies that expedite production cycles and enable rapid market entry,
                                        while leveraging scalable architectural frameworks and agile deployment
                                        pipelines that support continuous iteration, seamless feature enhancements, and
                                        frequent updates to maintain competitive advantage and respond dynamically to
                                        evolving market demands and user feedback.
                                    </>
                                ]
                            }
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className={`backdrop-blur-sm rounded-lg p-5 sm:p-6 md:p-7 lg:p-8 ${isDayTime ? 'bg-slate-300/50 hover:bg-slate-300/30 text-black' : 'bg-slate-700/50 hover:bg-slate-700/30 text-white'} transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                            >
                                <h3 className={'text-[1.5em] text-center font-bold  mb-3 sm:mb-4'}>
                                    {benefit.title}
                                </h3>
                                <p className={'text-gray-200 text-justify text-[0.85em]leading-relaxed'}>
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/*  Benefits of Working with a Reputable Cross-Platform App Development Company */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div
                        className={`${isDayTime ? 'text-black' : 'text-white'} text-center mb-12 md:mb-20 lg:mb-20`}>
                        <h2 className="capitalize text-[1.8em] max-w-6xl mx-auto md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            <span className={'text-[#0ef0dd]'}>Benefits of Working</span> with a Reputable <span
                            className={'text-[#0ef0dd]'}>Cross-Platform App</span> Development Company
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            Grey InfoTech stands as a leader in cross-platform application development, leveraging
                            cutting-edge technologies and innovative methodologies to create robust, scalable solutions
                            tailored to your business objectives. Our development approach integrates streamlined, agile
                            processes with deep industry-specific expertise, ensuring efficient project execution from
                            concept to deployment. We specialize in building applications that deliver seamless user
                            experiences, consistent performance, and native-like functionality across iOS, android, and
                            web platforms. By combining technical excellence with strategic insights into your
                            sector&#39;s unique requirements and challenges, we ensure your application not only
                            differentiates itself in a competitive marketplace but also achieves sustained excellence in
                            performance, user engagement, and cross-platform compatibility.
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[
                            {
                                title: "Modern Solutions",
                                description: (
                                    <>
                                        Position your business at the cutting edge of digital innovation through our
                                        forward-thinking development approaches. We craft customized, cross-platform
                                        solutions meticulously designed to strengthen your digital footprint, enhance
                                        brand
                                        visibility, and create meaningful engagement across all online touchpoints. Our
                                        bespoke methodology ensures your platform resonates with your target audience
                                        while
                                        leveraging the latest technological advancements to deliver exceptional user
                                        experiences that drive measurable business growth.
                                    </>
                                )
                            },
                            {
                                title: "Transparency Project",
                                description: (
                                    <>
                                        Harness the power of dedicated project management solutions designed to offer
                                        comprehensive oversight of all active workflows and development activities.
                                        These
                                        sophisticated platforms create a centralized hub for stakeholder engagement,
                                        enabling transparent communication channels, streamlined feedback loops, and
                                        collaborative problem-solving. With instant access to project metrics, task
                                        dependencies, and progress indicators, you gain the insights necessary to make
                                        informed, strategic decisions that keep your project on track and aligned with
                                        business priorities.
                                    </>
                                )
                            },
                            {
                                title: "Scalability and Adaptability",
                                description: (
                                    <>
                                        Grey InfoTech equips your application with future-proof, scalable solutions
                                        designed
                                        to support dynamic business evolution. We architect systems with inherent
                                        flexibility and expandability, enabling effortless adaptation to changing market
                                        conditions, emerging user expectations, and strategic pivots. Our approach
                                        ensures
                                        your digital platform remains agile and responsive, capable of integrating new
                                        functionalities, supporting increased user bases, and accommodating
                                        organizational
                                        growth without compromising performance, stability, or user
                                        satisfaction—positioning
                                        your business for sustained competitive advantage.
                                    </>
                                )
                            },
                            {
                                title: "Ongoing Support",
                                description: (
                                    <>
                                        We ensure your application delivers a seamless, reliable user experience through
                                        rigorous quality assurance processes, comprehensive testing protocols, and
                                        proactive
                                        performance monitoring. Our commitment extends beyond deployment with responsive
                                        support systems that identify, diagnose, and resolve technical issues swiftly,
                                        minimizing disruption and maintaining user satisfaction. Through continuous
                                        optimization and rapid incident response capabilities, we guarantee your
                                        application
                                        operates flawlessly while providing users with the consistent, error-free
                                        performance they expect and deserve.
                                    </>
                                )
                            }
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 rounded-xl p-4 md:p-5 lg:p-5 hover:bg-gray-300 transition-colors duration-300 border-b-4 border-[#0ef0dd]"
                            >
                                <h3 className="text-[1em] md:text-[1.5em] lg:text-[1.5em] font-bold text-slate-800 mb-4">
                                    {benefit.title}
                                </h3>
                                <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#0ef0dd] mb-5 sm:mb-6"></div>
                                <p className="text-[0.85em] text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div
                        className={'border-b-[1px] lg:pb-[2em] md:pb-[2em] pb-[1em] lg:mb-28 md:mb-28 mb-8'}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] text-[2em] font-[700] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <span className={'text-[#0ef0dd]'}>Cross-Platform App<br
                            className={'lg:block md:block hidden'}/> Development Services</span> Questions
                        </h2>
                    </div>
                </div>
                <div className='relative mx-auto px-4 sm:px-6 lg:px-[12em] space-y-1'>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(0)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none"
                        >
                            <span>What is cross-platform app development?</span>
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
                                Cross-platform mobile app development represents an innovative software creation
                                methodology designed to build applications that deliver consistent, high-quality
                                experiences across diverse operating systems and hardware configurations. This approach
                                enables developers to architect and maintain a single, versatile codebase that
                                seamlessly adapts to multiple platforms—including iOS, Android, and progressive web
                                applications—without requiring platform-specific programming. By consolidating
                                development efforts into one unified code repository, organizations achieve accelerated
                                time-to-market, reduced development costs, simplified maintenance workflows, and
                                guaranteed feature parity across all platforms, while maintaining the native-like
                                performance and user experience that modern audiences demand.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>How do Cross Platform Apps Work?</span>
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
                                Cross-platform app development revolutionizes the software creation process by
                                empowering businesses to distribute their applications across multiple operating systems
                                and devices through a single, reusable codebase. Rather than investing resources in
                                developing distinct versions of the same application using each platform&#39;s native
                                programming languages and development environments—a traditionally costly and
                                time-intensive approach—cross-platform methodology allows teams to write code once and
                                deploy everywhere. This strategic advantage translates to substantial cost savings,
                                accelerated market entry, consistent feature rollouts across platforms, and simplified
                                ongoing maintenance, all while maintaining high-quality user experiences that rival
                                native applications.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How much does cross-platform app development cost?</span>
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
                                Determining the cost of cross-platform application development requires careful
                                consideration of multiple interdependent variables that shape project scope and
                                technical requirements. Primary cost drivers include application complexity
                                levels—ranging from simple utility apps to enterprise-grade solutions—the number and
                                sophistication of integrated features, custom design requirements and branding elements,
                                the platforms you intend to support (iOS, Android, web, or all three), security and
                                compliance needs, database architecture, API development and integration, and
                                post-launch support services. Based on industry standards and project specifications,
                                most cross-platform development initiatives fall within a $20,000 to $65,000 budget
                                range, though this spectrum can extend higher for applications demanding advanced
                                functionalities, complex backend systems, real-time capabilities, or specialized
                                industry requirements that necessitate additional development time and expertise.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What is the market share of cross-platform development?</span>
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
                                The global cross-platform application development framework market established a
                                significant economic footprint in 2023, recording a market valuation of approximately
                                US$ 120 billion as organizations worldwide increasingly prioritize unified development
                                approaches over traditional platform-specific methodologies. Market research indicates
                                sustained momentum with projections showing the industry will maintain a strong compound
                                annual growth rate of 16.7% throughout the next five-year period and continue expanding
                                thereafter. By 2033, the cross-platform development framework market is forecast to
                                achieve a remarkable valuation of $546.7 billion, demonstrating the transformative
                                impact of cross-platform technologies on the software development landscape. This
                                substantial growth trajectory reflects multiple converging factors including rising
                                demand for mobile-first solutions, the need for faster time-to-market, cost optimization
                                pressures, and the continuous evolution of sophisticated frameworks that deliver
                                near-native performance while maximizing code reusability across platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How long does cross-platform app development take?</span>
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
                                Cross-platform application development projects commonly follow a 3 to 6 month timeline
                                from initial planning through market-ready deployment, although this range should be
                                understood as a foundational estimate that adapts significantly based on the unique
                                characteristics and requirements of each individual project. Development duration is
                                substantially impacted by factors such as application complexity—from simple
                                informational apps to feature-rich enterprise solutions—the precision and
                                comprehensiveness of your initial functional specifications and user stories, the number
                                of distinct features and interactive elements to be developed, custom design and
                                branding requirements, backend development needs including database architecture and API
                                creation, third-party integrations and external service connections, the quantity of
                                platforms requiring native-like optimization, iterative feedback and revision cycles,
                                testing depth across devices and scenarios, and team collaboration efficiency. To obtain
                                the most accurate timeline projection for your specific initiative, we recommend
                                engaging in detailed project scoping sessions that thoroughly examine your business
                                goals, technical aspirations, budget parameters, and launch objectives, enabling our
                                team to develop a customized development roadmap with realistic milestones, clear
                                deliverables, and transparent communication protocols that keep your project on schedule
                                and aligned with strategic priorities.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(5)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the main benefit of cross-platform development?</span>
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
                                The primary advantage of cross-platform application development lies in its exceptional
                                cost-effectiveness and operational efficiency, delivering substantial value to
                                businesses seeking to maximize their technology investments. By leveraging a single,
                                unified codebase that intelligently adapts to multiple operating systems and device
                                environments, development teams eliminate the need for redundant coding efforts,
                                separate platform-specific teams, and duplicated testing procedures. This consolidated
                                approach enables seamless deployment across iOS, Android, and web platforms
                                simultaneously, dramatically reducing both development timelines—often by 30-50%
                                compared to native development—and associated costs including labor, infrastructure, and
                                ongoing maintenance expenses. Beyond immediate financial benefits, this streamlined
                                methodology ensures consistent feature parity across all platforms, simplifies update
                                rollouts, accelerates time-to-market for new products, and allows organizations to
                                allocate saved resources toward innovation, enhanced functionality, and superior user
                                experience rather than managing multiple parallel codebases.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(6)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is cross-platform app development the future?</span>
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
                                Cross-platform application development represents not just a current trend but a
                                fundamental evolution in how the software industry approaches mobile solution creation,
                                with mounting evidence suggesting it will define the future of application development
                                across sectors. The rapid advancement of frameworks such as Flutter with its
                                high-performance rendering engine, React Native with its extensive component ecosystem,
                                and emerging platforms incorporating cutting-edge technologies demonstrates an
                                irreversible shift toward unified development approaches. These sophisticated frameworks
                                are systematically eliminating traditional performance gaps between cross-platform and
                                native applications through innovations like ahead-of-time compilation, optimized
                                JavaScript engines, direct native module integration, and platform-adaptive UI
                                rendering. Simultaneously, framework developers are expanding access to comprehensive
                                native API sets, enabling cross-platform applications to leverage advanced device
                                features including biometric authentication, augmented reality capabilities, advanced
                                camera functions, bluetooth connectivity, background processing, and platform-specific
                                services that were once exclusively available through native development. This
                                technological convergence, combined with substantial cost and time advantages, superior
                                maintainability, and the ability to deploy consistent experiences across iOS, Android,
                                and web platforms from a single codebase, positions cross-platform development as the
                                strategic foundation for modern application architecture and the clear pathway forward
                                for organizations committed to sustainable, scalable mobile innovation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(7)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Is it possible to integrate third-party services into cross-platform apps?</span>
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
                                Cross-platform applications excel at integrating third-party services and external
                                platforms, providing businesses with the flexibility to incorporate best-in-class
                                solutions for every aspect of their application functionality without technological
                                constraints. Leading frameworks such as Flutter, React Native, and their contemporaries
                                are designed with open architectures and extensive plugin ecosystems that facilitate
                                straightforward integration of diverse APIs, SDKs, and specialized service providers
                                across multiple functional domains. Development teams can seamlessly embed essential
                                business services including comprehensive payment processing solutions from
                                industry-leading providers like Stripe, Braintree, and Authorize.net; social media
                                platform integrations that enable user authentication, profile synchronization, and
                                content sharing capabilities; advanced analytics and user tracking systems for
                                data-driven decision making and performance optimization; customer communication tools
                                including chat services, email automation, and CRM platforms; mapping and location-based
                                services; cloud infrastructure and database solutions; authentication and security
                                services; and industry-specific integrations tailored to healthcare, finance,
                                e-commerce, logistics, and other vertical markets. This integration flexibility ensures
                                businesses can select the optimal third-party solutions for their specific needs while
                                maintaining code efficiency, performance standards, and unified user experiences across
                                all supported platforms.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(8)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>Why choose Grey InfoTech for cross-platform mobile app development services?</span>
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
                                Grey InfoTech brings unparalleled expertise to cross-platform application development,
                                combining technical excellence with strategic business insight to deliver solutions that
                                don&#39;t simply meet requirements but actively drive business growth and
                                transformation.
                                Our experienced development professionals utilize the latest frameworks, tools, and best
                                practices while maintaining a comprehensive, full-lifecycle development philosophy that
                                addresses every dimension of application success. This holistic methodology encompasses
                                strategic consultation and roadmap development to align technology with business goals;
                                sophisticated engineering and architecture that ensures scalability, security, and
                                performance; meticulous optimization across platforms to guarantee seamless user
                                experiences; exhaustive testing protocols covering functionality, usability, security,
                                and compatibility; and dedicated post-launch support including monitoring, maintenance,
                                feature enhancements, and performance tuning. By entrusting your project to Grey
                                InfoTech, you&#39;re partnering with a team that takes complete ownership of your
                                success—from conceptualization through deployment and beyond—ensuring your application
                                is precisely calibrated to your market positioning, user expectations, and business
                                objectives, with every technical decision made in service of delivering exceptional
                                value and sustainable competitive differentiation.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(9)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>What is the most used cross-platform mobile development?</span>
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
                                Cross-platform mobile development benefits from a diverse landscape of sophisticated
                                frameworks, each offering distinctive technological advantages, architectural
                                approaches, and specialized capabilities tailored to different application scenarios and
                                business requirements. The premier frameworks dominating the market include Flutter,
                                Google&#39;s UI toolkit renowned for beautiful, natively compiled applications with
                                exceptional performance; React Native, Facebook&#39;s popular framework leveraging
                                JavaScript and React for familiar development patterns and extensive third-party library
                                support; Kotlin Multiplatform, JetBrains&#39; solution enabling shared business logic
                                while
                                maintaining platform-specific UI implementations; Ionic, which harnesses web
                                technologies and provides seamless progressive web app deployment; along with
                                established platforms like Xamarin utilizing C# and .NET, and innovative newcomers
                                continuously expanding available options. Each framework embodies specific trade-offs
                                and advantages across critical dimensions including runtime performance and rendering
                                efficiency, development velocity and time-to-market, code reusability percentages,
                                access to native APIs and platform features, UI/UX flexibility and customization depth,
                                testing and debugging toolchains, documentation quality and community ecosystem
                                strength, hiring pool availability, and long-term maintainability. Selecting the ideal
                                framework demands thorough analysis of your project&#39;s unique
                                characteristics—application
                                complexity, performance benchmarks, target audience expectations, team technical
                                proficiency, development timeline, budget allocation, scalability requirements, and
                                strategic technology roadmap—ensuring the chosen solution optimally balances immediate
                                needs with future growth and evolution.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default CrossPlatformDevelopment;