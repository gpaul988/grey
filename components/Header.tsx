'use client';

import React, {useEffect, useState, useRef, Suspense} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from "next/navigation";
import {ChevronDown, Menu, X, Globe} from "lucide-react";
import {FormComponent} from "@/components/FormComponent";
import ThemeToggle from "@/components/ThemeToggle";
import SiteSearch from "@/components/SiteSearch";
import {useIsDayTime} from './useIsDayTime';

interface MenuItem {
    label: string;
    href: string;
    hasSubmenu?: boolean;
}

interface SubmenuItem {
    name: string;
    href: string;
    description?: string;
}

interface SubmenuSection {
    title: string;
    items: SubmenuItem[];
}

const HeaderContent: React.FC = () => {
    // Removed i18n

    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const [isIndustriesOpen, setIsIndustriesOpen] = useState<boolean>(false);
    const [isTechnologiesOpen, setIsTechnologiesOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(false);
    const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState<boolean>(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState<boolean>(false);
    const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState<boolean>(false);
    const [isMobileTechnologiesOpen, setIsMobileTechnologiesOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [headerTheme, setHeaderTheme] = useState({
        background: 'bg-black/60',
        textColor: 'text-white',
        blur: '',
        shadow: '',
    });
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollYRef = useRef(0);
    const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

    const isDayTime = useIsDayTime();
    const pathname = usePathname();

    const companyRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const technologiesRef = useRef<HTMLDivElement>(null);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef(false);
    const prevOverflowRef = useRef<string | null>(null);

    // Detect breakpoint: <1631px width OR <991px height
    useEffect(() => {
        const handleResize = () => {
            const isBelowThreshold = window.innerWidth < 1631 || window.innerHeight < 991;
            setIsBelowBreakpoint(isBelowThreshold);
        };
        handleResize(); // Check on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll and header visibility
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 0);

            const docEl = document.documentElement;
            const maxScroll = (docEl.scrollHeight - docEl.clientHeight) || 1;
            setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / maxScroll) * 100)));

            if (currentScrollY === 0) {
                setShowHeader(true);
            } else if (currentScrollY > lastScrollYRef.current) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            lastScrollYRef.current = currentScrollY;

            if (currentScrollY > 0) {
                setHeaderTheme({
                    background: 'bg-black/60',
                    textColor: 'text-white',
                    blur: 'backdrop-blur-md',
                    shadow: 'shadow-lg',
                });
            } else {
                setHeaderTheme({
                    background: 'bg-black/60',
                    textColor: 'text-white',
                    blur: '',
                    shadow: '',
                });
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
                setIsCompanyOpen(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
            if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
                setIsIndustriesOpen(false);
            }
            if (technologiesRef.current && !technologiesRef.current.contains(event.target as Node)) {
                setIsTechnologiesOpen(false);
            }

        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        }

        const id = window.setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsMobileServicesOpen(false);
            setIsMobileCompanyOpen(false);
            setIsMobileIndustriesOpen(false);
            setIsMobileTechnologiesOpen(false);
        }, 0);

        return () => clearTimeout(id);
    }, [pathname]);

    // Modal body scroll (preserve previous overflow value)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isModalOpen) {
            // save previous only once
            if (prevOverflowRef.current === null) prevOverflowRef.current = document.body.style.overflow || '';
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        }

        return () => {
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        };
    }, [isModalOpen]);

    // Menu handlers
    const handleServicesMouseEnter = (): void => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsServicesOpen(true);
        setIsIndustriesOpen(false);
        setIsTechnologiesOpen(false);
    };

    const handleServicesMouseLeave = (): void => {
        timeoutRef.current = setTimeout(() => {
            setIsServicesOpen(false);
        }, 150);
    };

    const handleCompanyMouseEnter = (): void => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsCompanyOpen(true);
        setIsServicesOpen(false);
        setIsIndustriesOpen(false);
        setIsTechnologiesOpen(false);
    };

    const handleCompanyMouseLeave = (): void => {
        timeoutRef.current = setTimeout(() => {
            setIsCompanyOpen(false);
        }, 150);
    };

    const handleIndustriesMouseEnter = (): void => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsIndustriesOpen(true);
        setIsServicesOpen(false);
        setIsTechnologiesOpen(false);
    };

    const handleIndustriesMouseLeave = (): void => {
        timeoutRef.current = setTimeout(() => {
            setIsIndustriesOpen(false);
        }, 150);
    };

    const handleTechnologiesMouseEnter = (): void => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsTechnologiesOpen(true);
        setIsServicesOpen(false);
        setIsIndustriesOpen(false);
    };

    const handleTechnologiesMouseLeave = (): void => {
        timeoutRef.current = setTimeout(() => {
            setIsTechnologiesOpen(false);
        }, 150);
    };

    const toggleMobileMenu = (): void => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const mainMenuItems: MenuItem[] = [
        {label: 'Services', href: '/services', hasSubmenu: true},
        {label: 'Industries', href: '/industries', hasSubmenu: true},
        {label: 'Technologies', href: '/technologies', hasSubmenu: true},
        {label: 'Blog', href: '/blog'},
        {label: 'Company', href: '/company', hasSubmenu: true},
        {label: 'Startups', href: '/startups'},
        {label: 'Store', href: '/store'},
        {label: 'Contact us', href: '/contact'},
    ];

    const companySubmenuSections: SubmenuSection[] = [
        {
            title: 'ABOUT',
            items: [
                {name: 'About Company', href: '/company', description: 'Our story, mission and values'},
                {name: 'Our Approach', href: '/our-approach', description: 'How we deliver excellence'},
                {name: 'Careers', href: '/careers', description: 'Join the Grey team'},
                {name: 'Partners', href: '/partners', description: 'Our global partnerships'},
            ],
        },
        {
            title: 'WORK',
            items: [
                {name: 'Portfolio', href: '/portfolio', description: 'Featured case studies'},
                {name: 'Case Studies', href: '/case-studies', description: 'In-depth success stories'},
                {name: 'Blog', href: '/blog', description: 'Insights and updates'},
                {name: 'FAQ', href: '/faq', description: 'Common questions answered'},
                {name: 'Support', href: '/support', description: 'Get help and resources'},
            ],
        },
    ];

    const servicesSubmenuSections: SubmenuSection[] = [
        {
            title: 'DIGITAL & WEB',
            items: [
                {name: 'App Store Optimisation', href: '/services/app-store-optimization'},
                {name: 'Branding', href: '/services/branding'},
                {name: 'CMS Development', href: '/services/cms-development'},
                {name: 'CRM Development', href: '/services/crm-development'},
                {name: 'Digital Marketing', href: '/services/digital-marketing'},
                {name: 'ERP Development', href: '/services/erp-development'},
                {name: 'Search Engine Optimisation', href: '/services/seo'},
                {name: 'Social Networking', href: '/services/Social-Networking'},
                {name: 'UI/UX Design', href: '/services/ui-ux-design'},
                {name: 'Web Application', href: '/services/Web-Application'},
                {name: 'Web Design', href: '/services/Web-Design'},
                {name: 'Web Development', href: '/services/Web-Development'},
            ],
        },
        {
            title: 'MOBILE & PLATFORM',
            items: [
                {name: 'Android Development', href: '/services/android-development'},
                {name: 'Blockchain Development', href: '/services/blockchain-development'},
                {name: 'Cloud Solutions', href: '/services/cloud-solutions'},
                {name: 'Cross Platform Development', href: '/services/cross-platform-development'},
                {name: 'Cybersecurity', href: '/services/cybersecurity'},
                {name: 'Flutter Development', href: '/services/flutter-development'},
                {name: 'Hybrid Apps Development', href: '/services/hybrid-app-development'},
                {name: 'iOS Development', href: '/services/ios-development'},
                {name: 'IoT Development', href: '/services/IoT-Development'},
                {name: 'Mobile Application Development', href: '/services/Mobile-Application-Development'},
                {name: 'MVP', href: '/services/MVP'},
                {name: 'Software Development', href: '/services/Software-Development'},
            ],
        },
        {
            title: 'CONSULTING & DATA',
            items: [
                {name: 'Consulting', href: '/services/consulting'},
                {name: 'Data Analytics', href: '/services/data-analytics'},
                {name: 'DevOps Services', href: '/services/devops-services'},
                {name: 'Discovery Phase', href: '/services/discovery-phase'},
                {name: 'Maritime & Port Management', href: '/services/maritime-port-management'},
                {name: 'QA & Testing', href: '/services/qa-testing'},
                {name: 'Salesforce Development', href: '/services/salesforce-development'},
                {name: 'Unity Development', href: '/services/unity-development'},
            ],
        },
        {
            title: 'CMS & E-COMMERCE',
            items: [
                {name: 'Drupal Development', href: '/services/drupal-development'},
                {name: 'Joomla Development', href: '/services/joomla-development'},
                {name: 'Magento Development', href: '/services/magento-development'},
                {name: 'Shopify Development', href: '/services/shopify-development'},
                {name: 'WordPress Development', href: '/services/wordpress-development'},
            ],
        },
    ];

    const technologiesSubmenuSections: SubmenuSection[] = [
        {
            title: 'FRONTEND',
            items: [
                {name: 'Frontend Development', href: '/services/frontend-development'},
                {name: 'React.js Development', href: '/services/Reactjs-Development'},
                {name: 'Next.js Development', href: '/services/Nextjs-Development'},
                {name: 'Angular Development', href: '/services/angular-development'},
                {name: 'Vue.js Development', href: '/services/Vuejs-Development'},
                {name: 'Javascript Development', href: '/services/Javascript'},
                {name: 'Typescript Development', href: '/services/Typescript'},
                {name: 'React Native Development', href: '/services/React-Native-Development'},
            ],
        },
        {
            title: 'BACKEND',
            items: [
                {name: 'Backend Development', href: '/services/backend-development'},
                {name: 'Node.js Development', href: '/services/Nodejs-Development'},
                {name: 'Python Development', href: '/services/Python-Development'},
                {name: 'PHP Development', href: '/services/PHP-Development'},
                {name: 'Laravel Development', href: '/services/Laravel-Development'},
                {name: '.Net Development', href: '/services/Net-Development'},
                {name: 'Ruby on Rails Development', href: '/services/Ruby-on-Rails'},
                {name: 'Golang Development', href: '/services/golang-development'},
                {name: 'AI Development Services', href: '/services/ai-development-services'},
            ],
        },
    ];

    const industriesSubmenuSections: SubmenuSection[] = [
        {
            title: '',
            items: [
                {name: 'Agritech', href: '/industries/agritech'},
                {name: 'Automation', href: '/industries/automation'},
                {name: 'Biotech', href: '/industries/biotech'},
                {name: 'Construction', href: '/industries/construction'},
                {name: 'e-Commerce', href: '/industries/e-commerce-development'},
                {name: 'Education', href: '/industries/education'},
            ],
        },
        {
            title: '',
            items: [
                {name: 'Fintech', href: '/industries/fintech'},
                {name: 'Government', href: '/industries/government'},
                {name: 'Healthcare', href: '/industries/healthcare'},
                {name: 'HR-Tech', href: '/industries/hr-tech'},
                {name: 'Insurance', href: '/industries/insurance'},
                {name: 'Legal Tech', href: '/industries/legal-tech'},
            ],
        },
        {
            title: '',
            items: [
                {name: 'Logistics', href: '/industries/logistics'},
                {name: 'Maritime & Shipping', href: '/industries/maritime'},
                {name: 'Media & Entertainment', href: '/industries/media-entertainment'},
                {name: 'Music', href: '/industries/music'},
                {name: 'Oil and Gas', href: '/industries/oil-and-gas'},
                {name: 'On-Demand', href: '/industries/ondemand'},
            ],
        },
        {
            title: '',
            items: [
                {name: 'Ports & Terminals', href: '/industries/port'},
                {name: 'Real Estate', href: '/industries/real-estate'},
                {name: 'Retail', href: '/industries/retail'},
                {name: 'SaaS', href: '/industries/saas'},
                {name: 'Sports Tech', href: '/industries/sports-tech'},
                {name: 'Travel & Hospitality', href: '/industries/travel-and-hospitality'},
            ],
        },
    ];

    const isActiveRoute = (href: string): boolean => {
        if (!pathname) return false;
        return pathname === href || (href !== '/' && pathname.startsWith(href));
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    };

    const handleOverlayMouseLeave = () => {
        setIsServicesOpen(false);
        setIsIndustriesOpen(false);
        setIsTechnologiesOpen(false);
        setIsCompanyOpen(false);
    };


    if (pathname?.startsWith('/store')) {
        return null;
    }

    return (
        <>
            {/* Futuristic styles */}
            <style>{`
                @keyframes greyBeamFlow {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes greyCtaPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.45), 0 0 0 0 rgba(168,85,247,0.0); }
                    50% { box-shadow: 0 0 26px 5px rgba(56,189,248,0.30), 0 0 50px 8px rgba(168,85,247,0.18); }
                }
                @keyframes greyAuroraDrift {
                    0%   { transform: translate3d(-8%, 0, 0) scale(1.05); opacity:.55; }
                    50%  { transform: translate3d(8%, 2%, 0) scale(1.15); opacity:.85; }
                    100% { transform: translate3d(-8%, 0, 0) scale(1.05); opacity:.55; }
                }
                @keyframes greyScan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    12% { opacity: .9; }
                    100% { transform: translateY(420%); opacity: 0; }
                }
                @keyframes greyHueShift {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                @keyframes greyFloatY {
                    0%,100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }

                .grey-progress-beam {
                    background: linear-gradient(90deg, #22d3ee, #38bdf8, #a855f7, #ec4899, #22d3ee);
                    background-size: 300% 100%;
                    animation: greyBeamFlow 4s linear infinite;
                    box-shadow: 0 0 14px rgba(56,189,248,0.8), 0 0 28px rgba(168,85,247,0.45);
                }

                .grey-cta-glow {
                    position: relative;
                    animation: greyCtaPulse 3.5s ease-in-out infinite;
                    transition: transform .25s cubic-bezier(.2,.8,.2,1);
                    isolation: isolate;
                }
                .grey-cta-glow:hover { transform: translateY(-2px) scale(1.04); }
                .grey-cta-glow::before {
                    content: "";
                    position: absolute; inset: -2px; z-index: -1; border-radius: inherit;
                    background: conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #22d3ee);
                    background-size: 200% 200%;
                    filter: blur(7px); opacity: 0; transition: opacity .3s;
                    animation: greyBeamFlow 3s linear infinite;
                }
                .grey-cta-glow:hover::before { opacity: .9; }

                .grey-aurora {
                    position: absolute; inset: -60% 0 auto 0; height: 320%;
                    pointer-events: none; z-index: 0; filter: blur(60px);
                    mix-blend-mode: screen; will-change: transform;
                }
                .grey-aurora.a1 { background: radial-gradient(40% 60% at 20% 40%, rgba(34,211,238,.45), transparent 70%); animation: greyAuroraDrift 14s ease-in-out infinite; }
                .grey-aurora.a2 { background: radial-gradient(40% 60% at 70% 30%, rgba(168,85,247,.40), transparent 70%); animation: greyAuroraDrift 18s ease-in-out infinite reverse; }
                .grey-aurora.a3 { background: radial-gradient(35% 50% at 50% 60%, rgba(236,72,153,.28), transparent 70%); animation: greyAuroraDrift 22s ease-in-out infinite; }

                .grey-scanline {
                    position: absolute; left: 0; right: 0; top: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, rgba(34,211,238,.9), rgba(168,85,247,.7), transparent);
                    pointer-events: none; animation: greyScan 6s ease-in-out infinite;
                }

                .grey-nav-neon { position: relative; }
                .grey-nav-neon::after {
                    content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0;
                    background: linear-gradient(90deg, #22d3ee, #a855f7, #ec4899);
                    box-shadow: 0 0 10px rgba(56,189,248,.9), 0 0 18px rgba(168,85,247,.6);
                    transition: width .3s cubic-bezier(.2,.8,.2,1);
                    border-radius: 2px;
                }
                .grey-nav-neon:hover::after { width: 100%; }

                .grey-logo-orbit { position: relative; animation: greyFloatY 5s ease-in-out infinite; }
                .grey-logo-orbit::before {
                    content: ""; position: absolute; inset: -40% -30%; z-index: -1;
                    background: radial-gradient(50% 60% at 50% 50%, rgba(56,189,248,.30), transparent 70%);
                    filter: blur(18px); animation: greyHueShift 12s linear infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .grey-progress-beam, .grey-cta-glow, .grey-cta-glow::before,
                    .grey-aurora, .grey-scanline, .grey-logo-orbit, .grey-logo-orbit::before { animation: none !important; }
                }
            `}</style>

            {/* Top progress beam */}
            {!isModalOpen && !isMobileMenuOpen && (
                <div className="fixed left-0 right-0 z-[70] h-[3px] pointer-events-none" style={{top: 'var(--ann-bar-height, 0px)'}}>
                    <div
                        className="grey-progress-beam h-full transition-[width] duration-150 ease-out"
                        style={{width: `${scrollProgress}%`}}
                        aria-hidden="true"
                    />
                </div>
            )}

            {/* Submenu overlay */}
            {(isServicesOpen || isIndustriesOpen || isTechnologiesOpen || isCompanyOpen) && !isModalOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md transition-opacity duration-300"
                    onMouseLeave={handleOverlayMouseLeave}
                />
            )}

            {/* Main Header */}
            {!isModalOpen && !isMobileMenuOpen && (
                <header
                    suppressHydrationWarning={true}
                    className={`fixed left-0 right-0 py-2 sm:py-3 md:py-5 lg:py-8 w-full z-[60] transition-transform duration-300 bg-black/60 text-white ${headerTheme.blur}`}
                    style={{
                        top: 'var(--ann-bar-height, 0px)',
                        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
                        opacity: showHeader ? 1 : 0,
                    }}
                >
                    {isScrolled && (
                        <>
                            <span className="grey-aurora a1" aria-hidden="true"/>
                            <span className="grey-aurora a2" aria-hidden="true"/>
                            <span className="grey-aurora a3" aria-hidden="true"/>
                            <span className="grey-scanline" aria-hidden="true"/>
                        </>
                    )}
                    <div className="container max-w-full relative z-10 mx-auto w-full h-auto px-4 lg:px-[4.6em]">
                        <div className="flex items-center justify-between h-auto gap-3 md:gap-4">
                            {/* Logo */}
                            <div className="shrink-0 grey-logo-orbit">
                                <Link href="/#">
                                    <Image
                                        src="/logon.png"
                                        alt="Grey InfoTech Logo"
                                        width={300}
                                        height={50}
                                        className="h-5 w-auto md:h-8 lg:h-10 object-contain"
                                        priority
                                        loading="eager"
                                    />
                                </Link>
                            </div>

                            {/* Desktop Menu */}
                            {!isBelowBreakpoint && (
                                <nav className="flex space-x-4 xl:space-x-6 items-center ml-auto mr-4">
                                    {mainMenuItems.map((item) => {
                                        if (item.label === 'Services') {
                                            return (
                                                <div
                                                    key={item.label}
                                                    className="relative z-50"
                                                    ref={servicesRef}
                                                    onMouseEnter={handleServicesMouseEnter}
                                                    onMouseLeave={handleServicesMouseLeave}
                                                >
                                                    <button
                                                        className={`grey-nav-neon text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                        aria-expanded={isServicesOpen}
                                                        aria-haspopup="true"
                                                        type="button"
                                                    >
                                                        <span className="text-base font-normal">{item.label}</span>
                                                    </button>
                                                    <div
                                                        className={`absolute top-full left-[-4em] rounded-lg transition-all duration-300 transform ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                        style={{width: '70rem'}}
                                                    >
                                                        <div className="flex gap-2 p-4">
                                                            {servicesSubmenuSections.map((section, sectionIndex) => (
                                                                <div key={section.title || `section-${sectionIndex}`}
                                                                     className="flex-1 p-2 space-y-2">
                                                                    <h3 className="text-teal-300 text-[0.7em] font-thin uppercase tracking-widest mb-2">
                                                                        {section.title}
                                                                    </h3>
                                                                    <ul className="space-y-2">
                                                                        {section.items.map((item, itemIndex) => (
                                                                            <li key={item.name || `item-${itemIndex}`}>
                                                                                <Link
                                                                                    href={item.href}
                                                                                    className={`group block text-white hover:text-teal-200 transition-colors duration-200 ${isActiveRoute(item.href) ? 'text-teal-200' : ''}`}
                                                                                >
                                                                                <span
                                                                                    className="text-base font-light leading-relaxed group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                                                                    {item.name}
                                                                                </span>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.label === 'Industries') {
                                            return (
                                                <div
                                                    key={item.label}
                                                    className="relative z-50"
                                                    ref={industriesRef}
                                                    onMouseEnter={handleIndustriesMouseEnter}
                                                    onMouseLeave={handleIndustriesMouseLeave}
                                                >
                                                    <button
                                                        className={`grey-nav-neon text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                        aria-expanded={isIndustriesOpen}
                                                        aria-haspopup="true"
                                                        type="button"
                                                    >
                                                        <span className="text-base font-normal">{item.label}</span>
                                                    </button>
                                                    <div
                                                        className={`absolute top-full left-[-1.2em] rounded-lg transition-all duration-300 transform ${isIndustriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                        style={{width: '44rem'}}
                                                    >
                                                        <div className="flex gap-2 p-4">
                                                            {industriesSubmenuSections.map((section, sectionIndex) => (
                                                                <div key={`industry-section-${sectionIndex}`}
                                                                     className="flex-1 p-2 space-y-2">
                                                                    <ul className="space-y-3">
                                                                        {section.items.map((item, itemIndex) => (
                                                                            <li key={item.name || `industry-item-${itemIndex}`}>
                                                                                <Link
                                                                                    href={item.href}
                                                                                    className={`group block text-white hover:text-teal-200 transition-colors duration-200 ${isActiveRoute(item.href) ? 'text-teal-200' : ''}`}
                                                                                >
                                                                                <span
                                                                                    className="text-base font-light leading-relaxed group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                                                                    {item.name}
                                                                                </span>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.label === 'Technologies') {
                                            return (
                                                <div
                                                    key={item.label}
                                                    className="relative z-50"
                                                    ref={technologiesRef}
                                                    onMouseEnter={handleTechnologiesMouseEnter}
                                                    onMouseLeave={handleTechnologiesMouseLeave}
                                                >
                                                    <button
                                                        className={`grey-nav-neon text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                        aria-expanded={isTechnologiesOpen}
                                                        aria-haspopup="true"
                                                        type="button"
                                                    >
                                                        <span className="text-base font-normal">{item.label}</span>
                                                    </button>
                                                    <div
                                                        className={`absolute top-full left-[-1.2em] rounded-lg transition-all duration-300 transform ${isTechnologiesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                        style={{width: '35rem'}}
                                                    >
                                                        <div className="flex gap-2 p-4">
                                                            {technologiesSubmenuSections.map((section, sectionIndex) => (
                                                                <div key={`tech-section-${sectionIndex}`}
                                                                     className="flex-1 p-2 space-y-2">
                                                                    <ul className="space-y-3">
                                                                        {section.items.map((item, itemIndex) => (
                                                                            <li key={item.name || `tech-item-${itemIndex}`}>
                                                                                <Link
                                                                                    href={item.href}
                                                                                    className={`group block text-white hover:text-teal-200 transition-colors duration-200 ${isActiveRoute(item.href) ? 'text-teal-200' : ''}`}
                                                                                >
                                                                                <span
                                                                                    className="text-base font-light leading-relaxed group-hover:translate-x-1 transition-transform duration-200 inline-block">
                                                                                    {item.name}
                                                                                </span>
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className={`text-white hover:text-cyan-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-500 after:rounded-full after:shadow-[0_0_8px_rgba(56,189,248,0.6)] after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'after:w-full' : ''}`}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            )}

                            {/* Desktop: Search + Theme + Language */}
                            {!isBelowBreakpoint && (
                                <div className="flex items-center gap-3">
                                    <div>
                                        <SiteSearch variant="desktop"/>
                                    </div>
                                    <div>
                                        <ThemeToggle className="scale-90" layoutGroupId="theme-glow-desktop"/>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="grey-cta-glow rounded-full text-[1em] font-medium py-[0.40em] px-[0.90em] border transition-all duration-300 text-teal-400 hover:text-white hover:bg-teal-500/20 border-teal-400 hover:border-teal-300 hover:scale-105"
                                    >
                                        {'Start Your Project'}
                                    </button>
                                </div>
                            )}

                            {/* Mobile: Menu Button */}
                            {isBelowBreakpoint && (
                                <div className="flex items-center gap-2">
                                    <ThemeToggle className="scale-90" layoutGroupId="theme-glow-mobile"/>
                                    <button
                                        type="button"
                                        className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors duration-200"
                                        onClick={toggleMobileMenu}
                                        aria-expanded={isMobileMenuOpen}
                                        aria-label="Toggle mobile menu"
                                    >
                                        {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            )}

            {/* Mobile Menu */}
            {isBelowBreakpoint && (
                <div
                    className={`fixed inset-0 z-40 transition-all duration-300 ${
                        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={toggleMobileMenu}
                    />

                    {/* Mobile Menu Content */}
                    <div
                        className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-black/90 transform transition-transform duration-300 overflow-y-auto ${
                            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    >
                        <div className="p-6">
                            {/* Mobile Header */}
                            <div className="flex flex-col mb-8 w-full">
                                <div className="flex justify-end">
                                    <button
                                        onClick={toggleMobileMenu}
                                        className="text-white hover:text-gray-300 transition-colors duration-200"
                                        aria-label="Close mobile menu"
                                        type="button"
                                    >
                                        <X size={24}/>
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-start">
                                    <Link href={'#'}>
                                        <Image
                                            src={'/logon.png'}
                                            alt="Grey InfoTech"
                                            width={300}
                                            height={80}
                                            className="h-5 w-auto md:h-8 lg:h-10 object-contain"
                                            priority
                                            loading="eager"
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Mobile Search */}
                            <div className="mb-6">
                                <SiteSearch variant="mobile"/>
                            </div>

                            {/* Mobile Navigation */}
                            <nav className="space-y-1">
                                {mainMenuItems.map((item: MenuItem) => (
                                    <div key={item.label}>
                                        {item.hasSubmenu ? (
                                            <div>
                                                <button
                                                    className="flex items-center justify-between w-full text-white hover:text-gray-300 transition-colors duration-200 text-[1.5em] font-normal"
                                                    onClick={() => {
                                                        if (item.label === 'Services') setIsMobileServicesOpen(!isMobileServicesOpen);
                                                        else if (item.label === 'Industries') setIsMobileIndustriesOpen(!isMobileIndustriesOpen);
                                                        else if (item.label === 'Technologies') setIsMobileTechnologiesOpen(!isMobileTechnologiesOpen);
                                                        else if (item.label === 'Company') setIsMobileCompanyOpen(!isMobileCompanyOpen);
                                                    }}
                                                    type="button"
                                                >
                                                    <span>{item.label}</span>
                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform duration-200 ${
                                                            (item.label === 'Services' && isMobileServicesOpen) ||
                                                            (item.label === 'Industries' && isMobileIndustriesOpen) ||
                                                            (item.label === 'Technologies' && isMobileTechnologiesOpen) ||
                                                            (item.label === 'Company' && isMobileCompanyOpen)
                                                                ? 'rotate-180'
                                                                : ''
                                                        }`}
                                                    />
                                                </button>

                                                {/* Mobile Submenu */}
                                                <div
                                                    className={`mt-3 space-y-2 overflow-hidden transition-all duration-300 ${
                                                        (item.label === 'Services' && isMobileServicesOpen) ||
                                                        (item.label === 'Industries' && isMobileIndustriesOpen) ||
                                                        (item.label === 'Technologies' && isMobileTechnologiesOpen) ||
                                                        (item.label === 'Company' && isMobileCompanyOpen)
                                                            ? 'opacity-100'
                                                            : 'max-h-0 opacity-0'
                                                    }`}
                                                    style={{
                                                        maxHeight: (item.label === 'Services' && isMobileServicesOpen) ||
                                                        (item.label === 'Industries' && isMobileIndustriesOpen) ||
                                                        (item.label === 'Technologies' && isMobileTechnologiesOpen) ||
                                                        (item.label === 'Company' && isMobileCompanyOpen)
                                                            ? '50rem'
                                                            : '0',
                                                    }}
                                                >
                                                    {(item.label === 'Services'
                                                            ? servicesSubmenuSections
                                                            : item.label === 'Industries'
                                                                ? industriesSubmenuSections
                                                                : item.label === 'Technologies'
                                                                    ? technologiesSubmenuSections
                                                                    : companySubmenuSections
                                                    ).map((section: SubmenuSection, sectionIndex: number) => (
                                                        <div key={section.title || `mobile-section-${sectionIndex}`}
                                                             className="ml-4">
                                                            {section.title && (
                                                                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                                                    {section.title}
                                                                </h4>
                                                            )}
                                                            <ul className="space-y-1">
                                                                {section.items.map((subItem: SubmenuItem, itemIndex: number) => (
                                                                    <li key={subItem.name || `mobile-item-${itemIndex}`}>
                                                                        <Link
                                                                            href={subItem.href}
                                                                            className={`block text-gray-300 hover:text-white transition-colors duration-200 text-sm py-1 ${
                                                                                isActiveRoute(subItem.href) ? 'text-white' : ''
                                                                            }`}
                                                                            onClick={toggleMobileMenu}
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={`block text-white hover:text-gray-300 transition-colors duration-200 text-[1.5em] font-normal py-1 ${
                                                    isActiveRoute(item.href) ? 'text-gray-300' : ''
                                                }`}
                                                onClick={toggleMobileMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </nav>


                            {/* Mobile CTA */}
                            <button
                                className="mt-6 rounded-full text-[1.5em] font-medium py-[0.40em] px-[0.90em] border transition text-teal-400 hover:text-teal-600 border-teal-400 hover:border-teal-600 w-full"
                                onMouseMove={handleMouseMove}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    toggleMobileMenu();
                                }}
                            >
                                {'Start Your Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for FormComponent */}
            {isModalOpen && (
                <div
                    suppressHydrationWarning
                    className={`fixed py-[2em] inset-0 z-50 ${isDayTime ? 'bg-white/85' : 'bg-black/85'} backdrop-blur-md w-full h-full overflow-auto overflow-x-hidden`}
                >
                    <div
                        className={`w-screen h-screen flex items-center justify-center p-8 relative`}
                        style={{minHeight: '100vh'}}
                    >
                        <div
                            className={`w-full h-full flex items-center justify-center p-8 relative`}
                            style={{minHeight: '100vh'}}
                        >
                            <button
                                className={`absolute top-8 right-8 z-[60] p-2 rounded-full ${isDayTime ? 'bg-white/20 hover:bg-white/30' : 'bg-black/20 hover:bg-black/30'} transition-colors`}
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Close form"
                                type="button"
                            >
                                <X size={24} className={isDayTime ? 'text-black' : 'text-white'}/>
                            </button>
                            <FormComponent/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderContent;
