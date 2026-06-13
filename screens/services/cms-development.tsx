'use client';
import React, {useEffect, useRef, useState} from 'react';
import '@/app/globals.css';
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import {AiFillCaretDown, AiFillCaretUp, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Footer from "@/components/Footer";

const tabs = [
    {key: "frontend", label: "Frontend"},
    {key: "backend", label: "Backend"},
    {key: "database", label: "Database"},
    {key: "cms", label: "CMS Platforms"},
    {key: "devops", label: "DevOps"},
    {key: "security", label: "Security"},
];

const data: Record<string, { name: string; logo: string }[]> = {
    frontend: [
        {name: "Angular.js", logo: "/assets/cms/logos/angular.svg"},
        {name: "Bootstrap", logo: "/assets/cms/logos/bootstrap.svg"},
        {name: "React.js", logo: "/assets/cms/logos/react.svg"},
        {name: "Tailwind CSS", logo: "/assets/cms/logos/tailwind.svg"},
        {name: "Vue.js", logo: "/assets/cms/logos/vue.svg"},
        {name: "Sass", logo: "/assets/cms/logos/sass.svg"},
        {name: "Next.js", logo: "/assets/cms/logos/next.svg"},
        {name: "Figma", logo: "/assets/cms/logos/figma.svg"},
    ],
    backend: [
        {name: "Express.js", logo: "/assets/cms/logos/express.svg"},
        {name: "Django", logo: "/assets/cms/logos/django.svg"},
        {name: "GO", logo: "/assets/cms/logos/go.svg"},
        {name: "Laravel", logo: "/assets/cms/logos/laravel.svg"},
        {name: "Node.js", logo: "/assets/cms/logos/node.svg"},
        {name: "Ruby on Rails", logo: "/assets/cms/logos/rails.svg"},
    ],
    database: [
        {name: "MongoDB", logo: "/assets/cms/logos/mongodb.svg"},
        {name: "MySQL", logo: "/assets/cms/logos/mysql.svg"},
        {name: "Oracle", logo: "/assets/cms/logos/oracle.svg"},
        {name: "PostgreSQL", logo: "/assets/cms/logos/postgresql.svg"},
        {name: "Sql", logo: "/assets/cms/logos/sql.svg"},
    ],
    cms: [
        {name: "Contentful", logo: "/assets/cms/logos/contentful.svg"},
        {name: "Drupal", logo: "/assets/cms/logos/drupal.svg"},
        {name: "Ghost", logo: "/assets/cms/logos/ghost.png"},
        {name: "Joomla", logo: "/assets/cms/logos/joomla.svg"},
        {name: "Magento", logo: "/assets/cms/logos/magento.svg"},
        {name: "Shopify", logo: "/assets/cms/logos/shopify.svg"},
        {name: "Squarespace", logo: "/assets/cms/logos/squarespace.svg"},
        {name: "Strapi", logo: "/assets/cms/logos/strapi.svg"},
        {name: "Woo Commerce", logo: "/assets/cms/logos/woocommerce.svg"},
        {name: "WordPress", logo: "/assets/cms/logos/wordpress.svg"},
    ],
    devops: [
        {name: "Bitbucket", logo: "/assets/cms/logos/bitbucket.svg"},
        {name: "Datadog", logo: "/assets/cms/logos/datadog.svg"},
        {name: "Docker", logo: "/assets/cms/logos/docker.svg"},
        {name: "GitLab", logo: "/assets/cms/logos/gitlab.svg"},
        {name: "GitHub", logo: "/assets/cms/logos/github.svg"},
        {name: "Jenkins", logo: "/assets/cms/logos/jenkins.svg"},
        {name: "Kubernetes", logo: "/assets/cms/logos/kubernetes.svg"},
        {name: "Terraform", logo: "/assets/cms/logos/terraform.svg"},
    ],
    security: [
        {name: "JWT", logo: "/assets/cms/logos/jwt.svg"},
        {name: "Rest API", logo: "/assets/cms/logos/rest-api.svg"},
    ],
};

const CmsDevelopment = () => {
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
            "CSD",
            "EDS",
            "ADS",
            "ST",
            "SPD",
            "SI",
            "IC",
            "CCD"
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
            label: 'CMS Experts'
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
            number: '30+',
            label: 'CMS Deployed'
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
            title: "REQUIREMENTS ANALYSIS",
            heading: "Requirements Analysis",
            description: (
                <>
                    Conduct comprehensive stakeholder consultations and discovery sessions to thoroughly understand
                    organizational objectives and operational requirements, precisely define project scope with clear
                    deliverables and success criteria, and establish detailed functional and technical specifications
                    that form the foundation for a tailored CMS solution strategically aligned with your business
                    processes, content workflows, user expectations, and long-term digital transformation goals.
                </>
            )
        },
        {
            number: "02",
            title: "PLANNING PHASE",
            heading: "Planning Phase",
            description: (
                <>
                    Architect a comprehensive project roadmap with clearly defined milestones and deliverable
                    checkpoints, strategically allocate cross-functional resources including development teams, subject
                    matter experts, and quality assurance personnel to optimize productivity and expertise alignment,
                    and establish realistic timelines with phase-specific schedules that account for development cycles,
                    testing protocols, stakeholder review periods, and deployment windows to ensure predictable delivery
                    and minimize project risks throughout the implementation lifecycle.
                </>
            )
        },
        {
            number: "03",
            title: "ARCHITECTURE DESIGN",
            heading: "Architecture Design",
            description: (
                <>
                    Engineer a robust, enterprise-grade technical architecture built on scalable infrastructure
                    principles that accommodate future growth and evolving business demands, implement comprehensive
                    security frameworks with multi-layered protection protocols to safeguard sensitive data and system
                    integrity, and leverage modern headless CMS architectures coupled with decoupled microservices
                    design patterns that enable API-driven content delivery, platform independence, enhanced
                    flexibility, and seamless integration capabilities across diverse digital channels and third-party
                    enterprise systems.
                </>
            )
        },
        {
            number: "04",
            title: "DESIGN PHASE",
            heading: "Design Phase",
            description: (
                <>
                    Develop detailed wireframes and high-fidelity interactive mockups that visualize information
                    architecture and content hierarchy, prioritize intuitive user interface design principles that
                    enhance navigation efficiency and reduce cognitive load, and craft exceptional user experience
                    strategies grounded in behavioral research, accessibility standards, and usability best practices to
                    ensure seamless interactions, optimize user satisfaction, and drive engagement across all
                    touchpoints while aligning visual design elements with your brand identity and organizational
                    objectives.
                </>
            )
        },
        {
            number: "05",
            title: "DEVELOPMENT PHASE",
            heading: "Development Phase",
            description: (
                <>
                    Engineer bespoke functionality through custom code development that addresses unique business
                    requirements and operational workflows, establish seamless API integration frameworks that enable
                    bidirectional data exchange with third-party platforms, enterprise applications, and external
                    service providers, and implement robust CMS architectural foundations with modular components,
                    optimized database structures, and distributed system designs that ensure horizontal and vertical
                    scalability, accommodate increasing content volumes and user loads, support future feature
                    expansion, and maintain consistent performance under demanding operational conditions.
                </>
            )
        },
        {
            number: "06",
            title: "TESTING & QA PHASE",
            heading: "Testing & QA Phase",
            description: (
                <>
                    Execute comprehensive quality assurance protocols through rigorous functionality testing across all
                    features, user scenarios, and edge cases to validate operational integrity, perform extensive
                    security assessments including vulnerability scanning, penetration testing, and compliance
                    verification to identify and remediate potential threats, conduct detailed performance evaluations
                    measuring load capacity, response times, and system stability under varying traffic conditions, and
                    implement systematic defect resolution processes that ensure delivery of a fully optimized,
                    production-ready application free from critical bugs, security vulnerabilities, and performance
                    bottlenecks that could compromise user experience or business operations.
                </>
            )
        },
        {
            number: "07",
            title: "DATA MIGRATION PHASE",
            heading: "Data Migration Phase",
            description: (
                <>
                    Orchestrate comprehensive data migration strategies that facilitate seamless transfer of content,
                    digital assets, user records, and metadata from legacy systems to the new CMS platform, implement
                    robust extraction, transformation, and loading (ETL) processes with validation checkpoints to
                    preserve data accuracy and structural relationships, conduct thorough data integrity verification
                    through automated testing and manual audits to ensure completeness and consistency, establish
                    rollback contingencies and backup protocols to mitigate migration risks, and maintain full
                    traceability throughout the transition process to guarantee zero data loss and minimal disruption to
                    ongoing business operations during the migration window.
                </>
            )
        },
        {
            number: "08",
            title: "DEPLOYMENT, SUPPORT & MAINTENANCE",
            heading: "Deployment, Support & Maintenance",
            description: (
                <>
                    Execute strategic deployment with phased rollout protocols to ensure smooth production launch,
                    deliver comprehensive role-specific training programs to accelerate platform adoption, establish
                    dedicated support infrastructure with defined service level agreements for technical assistance,
                    implement proactive maintenance schedules with regular updates and security patches, and conduct
                    continuous performance monitoring to ensure sustained platform reliability and optimal functionality
                    aligned with business requirements.
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
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header/>}
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
                    className={`border-b pb-[0.5em] border-gray-500/50 px-0 constant-text lg:text-[5.35em] md:text-[5.35em] text-[2.5em] lg:mt-[2.5em] md:mt-[2.5em] mt-[3em] leading-[1.1] font-[750]`}>
                    CMS <br className={'lg:block md:block hidden'}/>Development <br
                    className={'lg:hidden md:hidden block'}/>Services
                </h1>
                <p className={'lg:mt-[4em] mt-[1.5em] text-[0.87em] font-[300]'}>
                    Our CMS development services deliver custom, user-friendly content management solutions tailored to
                    your business needs. We build scalable platforms that empower your team <br
                    className={'lg:block md:block hidden'}/>to efficiently create, manage, and update content across
                    your digital presence, ensuring seamless control and growth.
                </p>
                <div
                    className={'relative max-w-full w-full h-auto mt-[2em] lg:mt-[3em] bg-gray-300/10'}>
                    <Image
                        src={'/assets/cms/hero.jpg'}
                        alt={'CMS Development Services'}
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
                        <h6 className='constant-text uppercase lg:text-[0.85em] md:text-[0.85em] leading-[1.3] text-[0.7em] font-[400] lg:tracking-wider tracking-tight'>
                            Efficient Content <br className={'lg:block md:block hidden'}/>Management Solution
                        </h6>
                    </div>
                    <div className='lg:-ml-[19em]'>
                        <h3 className='lg:text-[3.2em] md:text-[3.2em] text-[1.7em] font-[700] lg:mt-[0.01em] lg:leading-[1.2] tracking-tight border-b lg:pb-[0.7em] lg:mb-[0.7em] leading-[1.1] pb-6'>
                            Custom CMS for Simplified Content Workflows
                        </h3>
                        <div
                            className='grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]'>
                            <div>
                                <p>
                                    Our CMS development services deliver enterprise-grade solutions that establish
                                    comprehensive frameworks for end-to-end content lifecycle management. We architect
                                    intuitive, responsive platforms that streamline content creation, editing, and
                                    governance processes while maintaining organizational consistency and structural
                                    integrity across all digital assets. Our approach ensures that your content
                                    operations align seamlessly with strategic business objectives, enabling teams to
                                    collaborate efficiently within a unified ecosystem that supports rigorous quality
                                    control, version management, approval workflows, and compliance standards. By
                                    implementing systematic content strategies, we help organizations establish clear
                                    ownership, accountability, and measurable performance metrics that drive continuous
                                    improvement.
                                </p>
                            </div>
                            <div>
                                <p>
                                    We design personalized CMS architectures with sophisticated multi-channel
                                    distribution capabilities, ensuring seamless content delivery across all digital
                                    touchpoints including web, mobile, social media, and emerging platforms. Our
                                    solutions feature comprehensive cross-platform accessibility that empowers
                                    stakeholders to manage content from any device or location, complemented by elastic
                                    infrastructure that scales dynamically with your business growth and evolving market
                                    demands. This forward-thinking approach incorporates advanced features such as
                                    intelligent content tagging, automated workflows, real-time analytics, and
                                    integration capabilities with existing enterprise systems. The result is optimized
                                    operational efficiency, reduced time-to-market for content initiatives, enhanced
                                    user experiences, and a robust technological foundation that positions your
                                    organization to maintain competitive advantage in an increasingly complex and
                                    fast-paced digital marketplace.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* custom CMS Development services */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[4em] md:pb-[4em] pb-[1em]  ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'ASO Services Overview'}
                     className={'relative lg:pt-[3em] md:pt-[3em] pt-[1em] lg:pb-[6em] md:pb-[6em] pb-[1em] lg:mt-[3em] md:mt-[3em] mt-[1em] lg:mb-[6em] md:mb-[6em] mb-[1em] max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]'}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-4 mb-8 border-b-[1px]  pb-[3em] ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div>
                            <h2 className={`lg:text-[3.12em] md:text-[3.12em] text-[1.7em] font-[700] justify-center tracking-tight  leading-[1.1]`}>
                                Custom CMS Development <br className={'lg:block md:block hidden'}/>Services Overview
                            </h2>
                        </div>
                        <div>
                            <p className='text-[0.85em] font-[400] justify-center text-justify leading-[1.5] lg:-ml-[7.5em] tracking-noromal'>
                                Our enterprise CMS solutions deliver scalable content management that drives
                                multi-channel performance. We provide end-to-end development, migration, and
                                modernization services to optimize content operations and achieve your digital
                                objectives.
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
                                    {id: "01", title: "custom software development", target: "CSD"},
                                    {id: "02", title: "Enterprise Development Services", target: "EDS"},
                                    {id: "03", title: "API Development Services", target: "ADS"},
                                    {id: "04", title: "software Testing", target: "ST"},
                                    {id: "05", title: "Software Product Development", target: "SPD"},
                                    {id: "06", title: "software integration", target: "SI"},
                                    {id: "07", title: "IT consulting", target: "IC"},
                                    {id: "08", title: "custom CRM development", target: "CCD"},
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
                        <div className={'lg:-ml-[8em] md:-ml-[8em] lg:mb-[18em] md:mb-[18em]'}>
                            <div className="grid lg:grid-cols-[50px_auto] grid-cols-1 lg:gap-2 gap1 items-start">
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>01/
                                </div>
                                <div className={`lg:mb-44 mb-14  ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CSD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom Software Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integrated API</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailored Implementation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business-Critical Applications</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.873em] font-[300]'}>
                                        We deliver comprehensive custom software development services meticulously
                                        tailored to address the distinct requirements of your organization. Our
                                        technical expertise spans the design and implementation of enterprise-grade
                                        applications, robust API architecture and integration, and continuous
                                        maintenance and enhancement support. Our development team employs industry best
                                        practices and rigorous quality assurance methodologies to ensure every solution
                                        aligns precisely with your operational objectives and strategic goals. We
                                        recognize that each business operates within its own unique context, and our
                                        approach reflects this understanding through meticulous requirements analysis,
                                        collaborative development processes, and solutions that scale with your
                                        organization&#39;s evolving needs. By partnering with us, you gain access to
                                        software solutions that not only meet current business challenges but are
                                        architected to adapt and grow alongside your enterprise.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>02/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'EDS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Enterprise Development Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Transformation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable Solutions</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Business Growth</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Process Efficiency</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        As a premier software development service provider, we empower enterprises to
                                        transform their operational capabilities through strategically designed
                                        technology solutions. Our custom software development services are specifically
                                        engineered to streamline and optimize critical business processes, significantly
                                        enhance organizational productivity, and drive measurable, sustainable growth
                                        across all facets of your operations. We collaborate closely with our clients to
                                        understand their unique challenges, market positioning, and long-term
                                        objectives, enabling us to deliver solutions that create tangible business
                                        value. Through our commitment to technical excellence, innovation, and client
                                        partnership, we ensure that every software solution we develop becomes a
                                        strategic asset that strengthens your competitive advantage and supports your
                                        organization&#39;s continued evolution in an increasingly digital marketplace.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>03/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ADS'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        API Development Services
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>API Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Interoperability</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Scalable Architecture</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Seamless Connectivity</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Our comprehensive end-to-end custom software development services encompass the
                                        strategic design, development, and deployment of bespoke API solutions that
                                        facilitate seamless integration between your custom applications and existing
                                        enterprise systems. We specialize in creating robust, scalable API architectures
                                        that enable fluid data exchange and interoperability across your technology
                                        ecosystem, including legacy platforms, modern applications, and third-party
                                        services. This integration-first approach eliminates operational silos, reduces
                                        redundancies, and creates a unified digital infrastructure that responds
                                        dynamically to your business requirements. By ensuring that all systems
                                        communicate efficiently and securely, we enable your organization to accelerate
                                        time-to-market for new initiatives, enhance operational agility, and scale your
                                        business operations with greater speed and confidence. Our API development
                                        methodology prioritizes performance, security, and maintainability, ensuring
                                        that your integrated systems remain resilient and adaptable as your business
                                        continues to evolve and expand.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>04/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'ST'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        software Testing
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Quality Assurance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Performance Testing</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Security Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integration Validation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>User Experience</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        To ensure optimal functionality and reliability across all system components, we
                                        implement rigorous and comprehensive software testing protocols that encompass
                                        multiple evaluation dimensions, including thorough integration testing,
                                        performance benchmarking, security assessments, and user experience validation.
                                        Our quality assurance methodology employs both automated testing frameworks and
                                        manual testing procedures to identify and resolve potential issues before
                                        deployment, ensuring that your software operates flawlessly under various
                                        conditions and usage scenarios. We conduct extensive integration testing to
                                        verify seamless communication between all interconnected systems and modules,
                                        while our performance assessments evaluate system responsiveness, scalability,
                                        load tolerance, and resource efficiency under real-world operating conditions.
                                        Our testing services are designed to guarantee that your software not only meets
                                        but exceeds industry standards for security, usability, and performance
                                        optimization. Through this meticulous approach to quality assurance, we deliver
                                        software solutions that provide exceptional user experiences, maintain robust
                                        security postures, and perform reliably as your business scales and evolves.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>05/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SPD'}>
                                    <h2 className={`text-[1.5em] font-medium mb-3`}>
                                        Software Product Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-light ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>UI/UX Design</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Prototyping</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Full-Cycle Development</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Collaborative Approach</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Product Implementation</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        Grey InfoTech delivers comprehensive full-cycle development services that span
                                        the entire spectrum of web design, UI/UX engineering, and product development,
                                        from initial conceptualization through prototyping, implementation, and ongoing
                                        support. Our collaborative approach places your vision at the center of every
                                        development phase, ensuring that we thoroughly understand your strategic
                                        objectives, user requirements, and business goals before translating them into
                                        exceptional digital experiences. We employ user-centric design principles and
                                        industry-leading development practices to create intuitive, visually compelling,
                                        and functionally robust web solutions that resonate with your target audience
                                        and support your business objectives. Throughout the development lifecycle, we
                                        maintain open lines of communication and actively solicit your feedback,
                                        remaining responsive and adaptable to evolving requirements and insights that
                                        emerge during the design and development process. Our commitment to partnership
                                        means we don&#39;t simply execute against a fixed specification; rather, we work
                                        iteratively alongside your team to refine concepts, incorporate stakeholder
                                        input, and ensure that the final product authentically represents your vision
                                        while delivering measurable value to your users and your organization.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>06/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'SI'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Software Integration
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>System Performance</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Enterprise Optimization</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Integration Architecture</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Data Flow Management</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        As a distinguished custom software development company, we provide comprehensive
                                        integration solutions that encompass the complete lifecycle of system
                                        connectivity, from strategic architecture design and implementation through
                                        sophisticated data flow management and performance optimization. Our integration
                                        expertise enables us to architect scalable, resilient solutions that connect
                                        disparate systems, applications, and data sources into a cohesive,
                                        high-performing digital ecosystem tailored to your specific business
                                        requirements. We employ advanced integration patterns, middleware technologies,
                                        and API frameworks to ensure seamless communication across your entire
                                        technology landscape, whether cloud-based, on-premises, or hybrid environments.
                                        Our team meticulously designs data flow architectures that prioritize data
                                        integrity, security, and real-time accessibility, enabling your organization to
                                        leverage information assets effectively for decision-making and operational
                                        excellence. Through continuous monitoring, performance tuning, and proactive
                                        optimization, we ensure that your integrated systems maintain peak efficiency,
                                        reliability, and responsiveness as transaction volumes grow and business demands
                                        evolve. This holistic approach to integration architecture and data management
                                        empowers your organization to eliminate bottlenecks, reduce operational
                                        complexity, and achieve superior business outcomes through technology that works
                                        cohesively to support your strategic initiatives.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>07/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'IC'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        IT Consulting
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Technology Integration</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Digital Experience</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Strategic Planning</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Outcome Optimization</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        We provide strategic IT consultation services designed to guide your
                                        organization through the complexities of digital transformation and technology
                                        adoption. Our experienced consultants work closely with your leadership and
                                        technical teams to develop comprehensive, actionable IT roadmaps that align
                                        technology investments with your business objectives and growth trajectory.
                                        Through our consultation process, we assess your current technology landscape,
                                        identify opportunities for innovation and improvement, and craft detailed
                                        implementation strategies that orchestrate the seamless integration of emerging
                                        technologies into your existing infrastructure. Our strategic planning
                                        encompasses change management considerations, resource allocation, risk
                                        mitigation, and phased deployment approaches that minimize disruption while
                                        maximizing value realization. We place particular emphasis on enhancing digital
                                        client experiences, recognizing that customer-facing technologies are critical
                                        differentiators in today&#39;s competitive marketplace. By analyzing user
                                        journeys,
                                        identifying friction points, and recommending targeted improvements, we help you
                                        create engaging, intuitive digital experiences that drive customer satisfaction
                                        and loyalty. Our consultation extends beyond planning to include ongoing
                                        advisory support throughout implementation, ensuring that your strategic IT
                                        initiatives remain on track, deliver expected outcomes, and position your
                                        organization for sustained competitive advantage in an increasingly
                                        technology-driven business environment.
                                    </p>
                                </div>
                                <div
                                    className={`font-[300] text-[0.873em] ${isDayTime ? 'text-gray-700' : 'text-gray-400'}`}>08/
                                </div>
                                <div className={`lg:mb-44 mb-14 ${isDayTime ? 'text-black' : 'text-white'}`}
                                     id={'CCD'}>
                                    <h2 className={`text-[1.5em] font-[500] mb-3`}>
                                        Custom CRM Development
                                    </h2>
                                    <div
                                        className={`flex flex-wrap gap-3 mb-3 text-[0.7em] font-[300] ${isDayTime ? 'text-white' : 'text-black'}`}>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Process Automation</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Operation Efficiency</span>
                                        <span
                                            className={`px-4 py-2 rounded-full ${isDayTime ? 'bg-black' : 'bg-white'}`}>Tailored Solutions</span>
                                    </div>
                                    <p className={'text-justify leading-[1.5] text-[0.81em] font-[300]'}>
                                        As a premier software development company specializing in <Link
                                        href='/services/crm-development'
                                        className='hover:font-[500] border-b-[1px] border-gray-500 hover:border-y-slate-900'>
                                        custom CRM development</Link>, we design and deliver bespoke customer
                                        relationship management
                                        systems meticulously engineered to transform how your organization manages
                                        client interactions, sales processes, and customer engagement strategies. Our
                                        tailored CRM solutions go beyond off-the-shelf platforms by addressing your
                                        unique business workflows, industry-specific requirements, and organizational
                                        structure, ensuring that every feature and functionality directly supports your
                                        strategic objectives. We develop comprehensive CRM systems that centralize
                                        customer data, automate routine tasks, provide actionable insights through
                                        advanced analytics, and create seamless collaboration across sales, marketing,
                                        and customer service teams. Our custom CRM platforms are built to enhance
                                        relationship management at every customer touchpoint, from initial lead capture
                                        and qualification through ongoing account management and customer retention
                                        initiatives. By streamlining corporate processes and eliminating inefficiencies
                                        inherent in generic solutions, our CRM systems significantly boost operational
                                        efficiency, reduce administrative overhead, and empower your teams to focus on
                                        high-value activities that drive revenue growth. Through intuitive interfaces,
                                        mobile accessibility, and intelligent automation, we create CRM solutions that
                                        are not only powerful and feature-rich but also adopted enthusiastically by
                                        users, ensuring that your investment in customer relationship technology
                                        delivers measurable returns and sustainable competitive advantages in your
                                        market.
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

            {/* Access Superior CMS Features */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div id={'backend technology'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] lg:pb-[5em] md:pb-[5em] pb-[2em] ${
                            isDayTime ? 'text-black' : 'text-white'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.7em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                Unlock Advanced <br className={'lg:block md:block hidden'}/>CMS Capabilities
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Our CMS specialists deliver scalable, enterprise-grade solutions—whether modernizing
                                existing systems or implementing new platforms. We engineer customizable architectures
                                with headless capabilities, advanced workflow automation, and robust content delivery
                                optimization to meet your business requirements.
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
                                Automated Content Management
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Optimize your enterprise content operations through intuitive creation workflows that
                                minimize production complexity, implement systematic archival infrastructure with
                                hierarchical organization capabilities, and leverage comprehensive metadata
                                classification systems that enable efficient asset management, rapid retrieval, and
                                seamless cross-functional accessibility across your organization.
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
                                Robust CMS Administration
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Establish enterprise-wide governance frameworks with granular policy controls, leverage
                                advanced analytics and reporting capabilities for data-driven decision-making, deploy
                                integrated help desk solutions for streamlined user support management, and maintain
                                operational visibility through instantaneous real-time notification systems that ensure
                                immediate awareness of critical events and system changes across your organization.
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
                                SEO & Publishing Tools
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Optimize digital discoverability through automated generation of search engine-optimized
                                URL structures, architect and deploy customizable workflow automation that aligns with
                                your unique business processes and operational requirements, and deliver tailored,
                                personalized user experiences that dynamically adapt to individual preferences,
                                behavioral patterns, and engagement contexts across all customer touchpoints.
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
                                Improved Security & Compliance
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Fortify your enterprise security posture through implementation of multi-layered
                                authentication protocols that validate user identities across multiple verification
                                factors, enforce sophisticated role-based access control frameworks that assign granular
                                permissions aligned with organizational hierarchies and functional responsibilities, and
                                maintain comprehensive audit trail systems that systematically document all user
                                activities, system interactions, and security events to support regulatory compliance
                                requirements, facilitate forensic investigations, and enable continuous security
                                monitoring and risk assessment.
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
                                Integrated Media Management
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Optimize organizational productivity through streamlined file management systems that
                                enable intuitive content organization and retrieval, deploy advanced indexing
                                technologies that catalog and classify digital assets with precision, leverage powerful
                                full-text search capabilities that deliver instant access to information across all
                                document repositories and content types, and implement secure archival infrastructure
                                with robust retention policies that ensure long-term data preservation, regulatory
                                compliance, and protected storage of mission-critical business information throughout
                                its entire lifecycle.
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
                                Scalable Multisite Support
                            </h3>
                            <p className="text-[0.85em] font-[400] leading-relaxed">
                                Enable global enterprise scalability through robust multisite architecture that supports
                                distributed content management across multiple domains and geographical locations,
                                deliver comprehensive multilingual capabilities with localization frameworks that
                                facilitate content translation, cultural adaptation, and region-specific customization
                                for international audiences, and ensure seamless mobile accessibility through responsive
                                design implementations and native mobile optimization that provides consistent,
                                high-performance user experiences across all devices, platforms, and screen sizes for
                                on-the-go workforce productivity and customer engagement.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            {/* Our CMS Development Services Workflow */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'backend technology'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Header */}
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 border-b-[1px] lg:pb-[3em] md:pb-[3em] pb-[1em] mb-20 ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6'>
                                Our CMS Development <br className={'lg:block md:block hidden'}/> Services Workflow
                            </h2>
                        </div>
                        <div className='lg:-ml-[7.8em]'>
                            <p className='text-[0.873em] font-[300] lg:-mt-[0.2em] rounded-none leading-[1.5]'>
                                Our CMS development organization employs streamlined agile methodologies and iterative
                                development frameworks throughout the entire project lifecycle—from strategic planning
                                and requirements analysis through user-centric design, rigorous testing, and seamless
                                deployment—to guarantee that every platform launch delivers optimal performance,
                                measurable business value, and robust capabilities that strengthen your modern digital
                                marketing infrastructure, accelerate time-to-market, and support your evolving content
                                strategy objectives.
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

            {/* Our CMS Development Infrastructure & Tooling */}
            <div
                className={`lg:pt-[2em] md:pt-[2em] pt-[1em] lg:pb-[2em] md:pb-[2em] pb-[1em] ${isDayTime ? 'bg-white' : 'bg-slate-600'}`}>
                <div id={'Toolchain'}
                     className={`relative lg:mt-[1.5em] md:mt-[1.5em] mt-[1em] lg:mb-16 md:mb-16 mb-5 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>
                    <div className={`${isDayTime ? 'text-black' : 'text-white'} text-center`}>
                        <h2 className="capitalize text-[1.8em] md:text-[3em] lg:text-[3.3em] font-[700] tracking-tight leading-[1.2] lg:pb-6">
                            Our CMS <span className={'text-[#0ef0dd]'}>Development</span> Infrastructure <br
                            className={'lg:block md:block hidden'}/> & Tooling
                        </h2>
                        <p className="mx-auto mt-4 max-w-5xl text-[0.9em] leading-relaxed ">
                            We employ carefully selected, purpose-built technologies to develop efficient, scalable
                            content management systems that provide greater content control and support long-term
                            digital strategy. Our CMS development technology stack is strategically curated to deliver
                            high throughput, low latency, and seamless dynamic content management, ensuring reliability,
                            performance, and flexibility across modern digital platforms.
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

            {/* Advancing Content Management Capabilities */}
            <div
                className={`lg:pt-[2em] h-auto border-b border-white max-w-full w-full mx-auto ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                <div
                    className={`relative max-w-full w-full mx-auto px-4 sm:px-6 lg:px-[4.6em] lg:pt-[6em] md:pt-[6em] pt-[1.2em] lg:pb-[6em] md:pb-[6em] pb-[1.2em] mt-14`}>
                    <div
                        className={`relative grid lg:grid-cols-2 grid-cols-1 gap-10 mb-8 ${isDayTime ? 'text-black' : 'text-white'} `}>
                        <div className={'lg:mr-[8em]'}>
                            <h2 className={`lg:text-[3.1em] md:text-[3.1em] text-[1.8em] font-[700] justify-center tracking-tight lg:mb-12 mb-7 leading-[1.2]`}>
                                Advancing Content <br className={'lg:block md:block hidden'}/>Management Capabilities
                            </h2>
                            <p className={'text-[0.873em] font-normal leading-normal tracking-normal text-justify'}>
                                A custom Content Management System (CMS) strengthens your digital presence, streamlines
                                content operations, and drives higher user engagement. Our expert CMS development
                                services support both startups and enterprises by delivering robust, scalable, and fully
                                tailored solutions aligned with specific business objectives.
                            </p>
                        </div>
                        <div
                            className={`lg:-ml-5 md:-ml-5 border-t pt-[6em]] relative mx-auto max-w-full w-full space-y-2 ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <div
                                className={`w-full border-b pb-6 mt-6`}>
                                <button
                                    onClick={() => toggleWeb(0)}
                                    className="flex items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>real-time content updates</span>
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
                                        Enable real-time content deployment and dynamic updates across multiple digital
                                        channels, delivering immediate market presence while maintaining the agility to
                                        refine messaging based on performance metrics and stakeholder feedback. This
                                        approach ensures optimal audience engagement through responsive content
                                        management that aligns with evolving business objectives.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(1)}
                                    className="flex items-center mt-6 justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>seamless integration</span>
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
                                        Seamlessly connect with existing enterprise systems and third-party applications
                                        through robust integration capabilities, enabling centralized content
                                        orchestration across all digital touchpoints. This unified platform approach
                                        streamlines workflow efficiency, eliminates operational silos, and ensures
                                        consistent brand messaging while reducing administrative overhead and technical
                                        complexity.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(2)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>advanced security</span>
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
                                        Safeguard proprietary content assets and sensitive user information through
                                        enterprise-grade security protocols, multi-layered encryption standards, and
                                        continuous system fortification. Our proactive security framework includes
                                        regular vulnerability assessments, compliance-driven updates, and adaptive
                                        threat mitigation strategies that ensure data integrity, maintain regulatory
                                        adherence, and protect organizational reputation against evolving cybersecurity
                                        risks.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(3)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>cost efficiency</span>
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
                                        Optimize total cost of ownership through proprietary content management
                                        infrastructure that eliminates recurring third-party licensing fees and
                                        subscription-based dependencies. This strategic investment in an
                                        internally-controlled CMS delivers sustained financial advantages, enhances
                                        operational autonomy, and provides scalable resource allocation while reducing
                                        vendor lock-in risks and ensuring predictable long-term budget planning aligned
                                        with organizational growth objectives.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(4)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>customizable templates</span>
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
                                        Deploy fully customizable design frameworks and templating architectures that
                                        align precisely with established brand guidelines and corporate identity
                                        standards. Implement granular access control mechanisms and role-based
                                        permission hierarchies that ensure appropriate content governance, maintain
                                        operational security, and empower cross-functional teams with tailored
                                        administrative privileges suited to their specific responsibilities and
                                        organizational authority levels.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(5)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>performance optimization</span>
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
                                        Enhance digital asset delivery through advanced performance optimization
                                        protocols that minimize page load latency and accelerate content rendering
                                        across all user touchpoints. This technical infrastructure prioritizes seamless
                                        end-user experiences through efficient resource allocation, intelligent caching
                                        strategies, and streamlined code execution, ultimately driving higher engagement
                                        metrics, reduced bounce rates, and improved search engine rankings that directly
                                        contribute to business conversion objectives.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full border-b pb-6`}>
                                <button
                                    onClick={() => toggleWeb(6)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>sustainable digital strategy</span>
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
                                        Architect a strategically adaptable content management infrastructure designed
                                        to accommodate evolving business requirements, market dynamics, and
                                        technological advancements. This forward-compatible solution provides extensible
                                        frameworks and modular architecture that scale proportionally with
                                        organizational expansion, supporting increased traffic volumes, diversified
                                        content portfolios, and emerging digital channels while preserving system
                                        integrity and operational continuity throughout multi-year growth trajectories
                                        and strategic pivots.
                                    </p>
                                )}
                            </div>
                            <div
                                className={`w-full`}>
                                <button
                                    onClick={() => toggleWeb(7)}
                                    className="flex mt-6 items-center justify-between w-full text-start lg:text-[1.6em] md:text-[1.5em] sm:text-base font-medium focus:outline-none"
                                >
                                    <span className={'capitalize'}>user insights & analytics</span>
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
                                        Leverage comprehensive analytics capabilities and sophisticated reporting
                                        mechanisms to extract strategic intelligence from user interaction patterns and
                                        content efficacy metrics. This data-driven approach delivers granular visibility
                                        into audience behavior, engagement trends, and conversion pathways through
                                        customizable dashboards and targeted performance indicators, empowering
                                        stakeholders to make informed decisions, optimize content strategies, and
                                        demonstrate measurable ROI aligned with key business objectives and
                                        organizational KPIs.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cross-Industry Domain Expertise */}
            <div className={`lg:py-[2em] md:py-[2em] py-[1em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div id={'php benefit'}
                     className={`relative lg:top-10 py-16 lg:mb-20 mb-10 max-w-full w-full mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em]`}>

                    {/* Cross-Industry Domain Expertise */}
                    <div
                        className={`border-b-[0.1em] border-gray-300/50 pb-[2em] lg:mb-[3em] md:mb-[3em] ${
                            isDayTime ? 'text-white' : 'text-black'
                        }`}>
                        <div>
                            <h2 className='text-start capitalize text-[1.8em] md:text-[3.2em] lg:text-[3.2em] font-[700] tracking-tight leading-[1.15] lg:pb-6 md:pb-6 pb-2'>
                                Cross-Industry Domain <br className={'lg:block md:block hidden'}/><span
                                className={'text-[#0ef0dd]'}>Expertise</span>
                            </h2>
                        </div>

                    </div>

                    <div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0">
                        {domains.map((domain, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center p-7 border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors"
                                    style={{
                                        borderRight: (index + 1) % 5 === 0 ? 'none' : undefined,
                                    }}
                                >
                                    <div
                                        className={`${isDayTime ? 'text-white hover:text-[#0ef0dd]' : 'text-black hover:text-[#0ef0dd]'} mb-3 transition-colors duration-200`}>
                                        {domain.icon}
                                    </div>
                                    <p className={`${isDayTime ? 'text-white' : 'text-black'} text-center font-medium text-[1em]`}>
                                        {domain.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* why Choos Grey Infotech */}
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
                            className={`lg:-ml-[10.5em] md:-ml-[10.5em] lg:mt-[10em] md:mt-[1.5em] ${isDayTime ? 'text-black' : 'text-white'}`}>
                            <h2
                                className='text-[1.8em] capitalize font-[700] tracking-tight leading-[1.2] mb-10 lg:text-[3.5em] md:text-[2.5em] w-auto h-auto'>
                                Why Organizations Choose Grey <br className={'lg:block md:block hidden'}/>InfoTech
                                for <span className={'text-[#0ef0dd]'}>CMS Development</span>
                            </h2>
                            <p className='text-[0.85em] font-[400] tracking-normal text-justify  leading-[1.5] lg:mr-[9em] md:mr-[9em]'>
                                Partner with Grey InfoTech to deploy enterprise-grade content management solutions that
                                deliver measurable competitive advantages through intelligent scalability aligned with
                                your organizational trajectory. Our specialized development team architects robust CMS
                                platforms featuring instantaneous content deployment capabilities, sophisticated
                                functional integrations, and multi-layered security infrastructures that safeguard
                                critical business assets.<br/><br/>
                                Our methodology prioritizes sustainable, forward-compatible systems engineered to
                                address your distinct operational requirements while maximizing performance efficiency
                                and elevating user engagement metrics. Through dedicated consultative support and
                                cutting-edge technological innovation, we empower organizations to strengthen their
                                digital ecosystem, optimize content workflows, and accelerate revenue growth. Trust Grey
                                InfoTech to transform your content management infrastructure into a strategic enabler
                                that consistently advances core business objectives and drives long-term market success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ section */}
            <div id={'FAQ'}
                 className={`relative lg:pt-[5em] md:pt-[5em] pt-[2em] lg:pb-[5em] md:pb-[5em] pb-[2em] lg:mb-[8em] md:mb-[8em] mb-[4em] ${isDayTime ? 'bg-black' : 'bg-white'}`}>
                <div
                    className={`relative mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] ${isDayTime ? 'text-white' : 'text-black'}`}>
                    <div className={'border-b-[1px] lg:pb-[2em] md:pb-[2em] pb-[1em] lg:mb-28 md:mb-28 mb-8'}>
                        <h2 className='capitalize lg:text-[3em] md:text-[2em] text-[2em] font-[700] leading-[1.2] tracking-tight mb-8'>
                            Frequently Asked <span className={'text-[#0ef0dd]'}>CMS<br
                            className={'lg:block md:block hidden'}/> Development</span> Questions
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
                            <span>Why should I partner with a custom CMS development company?</span>
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
                                Engaging specialized custom CMS development expertise delivers strategically engineered
                                solutions precisely calibrated to your organization&#39;s unique operational
                                requirements
                                and digital objectives. This partnership approach guarantees bespoke platform
                                architecture designed for proportional growth capacity, enterprise-level security
                                protocols, and frictionless interoperability with existing technology ecosystems. By
                                leveraging purpose-built content management infrastructure rather than generic
                                solutions, organizations achieve optimal alignment between technical capabilities and
                                business imperatives, ensuring sustainable competitive positioning and maximized return
                                on technology investments.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(1)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What are CMS website development services?</span>
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
                                Comprehensive CMS website development services deliver end-to-end solutions spanning
                                strategic architecture design, technical implementation, and ongoing platform
                                maintenance. These services empower organizations to efficiently produce, modify, and
                                orchestrate digital content through intuitive interfaces that eliminate barriers
                                associated with complex technical expertise. By democratizing content management
                                capabilities across business users, these platforms enable rapid response to market
                                opportunities, reduce dependency on specialized IT resources, and accelerate
                                time-to-market for critical digital initiatives while maintaining enterprise standards
                                for quality, consistency, and brand governance.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(2)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span className={'leading-[1.3]'}>How does a CMS development company enhance website performance?</span>
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
                                Specialized CMS development firms enhance digital platform performance through
                                implementation of optimized code architectures, accelerated content distribution
                                mechanisms, and sophisticated backend infrastructure management. This technical
                                excellence translates directly into reduced page load latency, improved response times,
                                and elevated user experience quality that drives engagement and conversion metrics. By
                                leveraging industry best practices in performance engineering, resource optimization,
                                and system efficiency, these development partners ensure your digital properties deliver
                                consistently superior experiences that meet contemporary user expectations while
                                supporting broader business objectives around customer satisfaction and operational
                                excellence.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(3)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span>What benefits can a CMS development company offer for scalability?</span>
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
                                Expert CMS development organizations architect inherently scalable platforms engineered
                                to evolve in lockstep with organizational expansion and strategic diversification. These
                                elastic solutions accommodate progressive feature enhancement, absorb substantial
                                traffic volume increases, and support multi-channel digital footprint extension while
                                preserving optimal system performance and operational stability. Through modular
                                frameworks and future-ready infrastructure design, these development partners ensure
                                your content management ecosystem maintains responsiveness and reliability throughout
                                growth phases, enabling confident pursuit of market opportunities without technical
                                constraints or performance degradation that could impede business momentum or compromise
                                user satisfaction.
                            </p>
                        )}
                    </div>
                    <div
                        className={`border-b py-4 ${isDayTime ? 'border-gray-400 text-gray-300 hover:text-white' : 'border-gray-100 text-gray-700 hover:text-black'}`}>
                        <button
                            onClick={() => toggleFAQ(4)}
                            className="w-full flex items-center text-start justify-between lg:text-[1.5em] md:text-[1em] sm:text-base font-[500] focus:outline-none">
                            <span
                                className={'leading-[1.3]'}>How secure are solutions provided by a CMS development company?</span>
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
                                Enterprise-grade CMS solutions delivered by specialized development firms integrate
                                comprehensive security architectures featuring advanced cryptographic protocols,
                                systematic patch management cycles, and proactive vulnerability scanning methodologies.
                                These multi-layered defense mechanisms safeguard proprietary content assets and
                                sensitive user information against evolving threat landscapes while ensuring regulatory
                                compliance and data governance standards. By embedding security considerations
                                throughout the development lifecycle and maintaining continuous monitoring protocols,
                                these partners provide organizations with resilient platforms that protect brand
                                reputation, maintain stakeholder trust, and mitigate financial and legal risks
                                associated with data breaches or security incidents in today&#39;s increasingly complex
                                cybersecurity environment.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer/>}
        </div>
    );
};

export default CmsDevelopment;