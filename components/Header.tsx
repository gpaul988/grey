'use client';

import React, {useEffect, useState, useRef} from 'react';
import '../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from "next/navigation";
import {ChevronDown, Menu, X} from "lucide-react";
import {FormComponent} from "@/components/FormComponent";
import ThemeToggle from "@/components/ThemeToggle";

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

const Header: React.FC = () => {
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const [isIndustriesOpen, setIsIndustriesOpen] = useState<boolean>(false);
    const [isTechnologiesOpen, setIsTechnologiesOpen] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState<boolean>(false);
    const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState<boolean>(false);
    const [isMobileTechnologiesOpen, setIsMobileTechnologiesOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // Futuristic: scroll progress (0-100) for the top reading-progress beam
    const [scrollProgress, setScrollProgress] = useState<number>(0);

    const [headerTheme, setHeaderTheme] = useState({
        background: 'bg-black/60',
        textColor: 'text-white',
        blur: '',
        shadow: '',
    });
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isDayTime = (() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    })();

    const pathname = usePathname();
    const servicesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const technologiesRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const mountedRef = useRef(false);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 0);

            // Futuristic: compute reading-progress (% of page scrolled)
            const docEl = document.documentElement;
            const maxScroll = (docEl.scrollHeight - docEl.clientHeight) || 1;
            setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / maxScroll) * 100)));

            if (currentScrollY > lastScrollY) setShowHeader(false);
            else if (currentScrollY > 0) setShowHeader(true);
            setLastScrollY(currentScrollY);

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
    }, [lastScrollY]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true;
            return;
        }

        // avoid synchronous setState in the effect to prevent cascading renders
        const id = window.setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsMobileServicesOpen(false);
            setIsMobileIndustriesOpen(false);
            setIsMobileTechnologiesOpen(false);
        }, 0);

        return () => clearTimeout(id);
    }, [pathname]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            // window.scrollTo({top: 0, behavior: "smooth"});
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

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

    const toggleMobileServices = (): void => {
        setIsMobileServicesOpen(!isMobileServicesOpen);
        setIsMobileIndustriesOpen(false);
        setIsMobileTechnologiesOpen(false);
    };

    const toggleMobileIndustries = (): void => {
        setIsMobileIndustriesOpen(!isMobileIndustriesOpen);
        setIsMobileServicesOpen(false);
        setIsMobileTechnologiesOpen(false);
    };

    const toggleMobileTechnologies = (): void => {
        setIsMobileTechnologiesOpen(!isMobileTechnologiesOpen);
        setIsMobileServicesOpen(false);
        setIsMobileIndustriesOpen(false);
    };

    const mainMenuItems: MenuItem[] = [
        {label: 'Services', href: '/services', hasSubmenu: true},
        {label: 'Industries', href: '/industries', hasSubmenu: true},
        {label: 'Technologies', href: '/technologies', hasSubmenu: true},
        {label: 'Blog', href: '/blog'},
        {label: 'Company', href: '/company'},
        {label: 'Startups', href: '/Startups'},
        {label: 'Store', href: '/store'},
        {label: 'Contact us', href: '/contact'},
    ];

    const servicesSubmenuSections: SubmenuSection[] = [
        {
            title: 'DIGITAL & WEB',
            items: [
                {name: 'App Store Optimisation', href: '/services/app-store-optimization'},
                {name: 'Branding', href: '/services/branding'},
                {name: 'CMS Development', href: '/services/cms-development'},
                {name: 'CRM Development', href: '/services/crm-development'},
                {name: 'ERP Development', href: '/services/erp-development'},
                {name: 'Digital Marketing', href: '/services/digital-marketing'},
                {name: 'Search Engine Optimisation', href: '/services/seo'},
                {name: 'Social Networking', href: '/services/Social-Networking'},
                {name: 'Web Application', href: '/services/Web-Application'},
                {name: 'Web Design', href: '/services/Web-Design'},
                {name: 'Web Development', href: '/services/Web-Development'},
            ],
        },
        {
            title: 'COMPLIMENTARY SERVICES',
            items: [
                {name: 'Android Development', href: '/services/android-development'},
                {name: 'Blockchain Development', href: '/services/blockchain-development'},
                {name: 'Cross Platform Development', href: '/services/cross-platform-development'},
                {name: 'Flutter Development', href: '/services/flutter-development'},
                {name: 'Hybrid Apps Development', href: '/services/hybrid-app-development'},
                {name: 'ios Development', href: '/services/ios-development'},
                {name: 'IoT Development', href: '/services/IoT-Development'},
                {name: 'Mobile Application Development', href: '/services/Mobile-Application-Development'},
                {name: 'MVP', href: '/services/MVP'},
                {name: 'Software Development', href: '/services/Software-Development'},
                {name: 'UI/UX Design', href: '/services/ui-ux-design'},
                {name: 'Unity Development', href: '/services/unity-development'},
            ],
        },
    ];

    // Split technologies into Frontend and Backend sections for clearer navigation
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
                {name: 'React Native development', href: '/services/React-Native-Development'},
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
                {name: 'AI Development Services', href: '/services/ai-development-services'},
            ],
        },
    ];

    const industriesSubmenuSections: SubmenuSection[] = [
        {
            title: '',
            items: [
                {name: 'Automation', href: '/industries/automation'},
                {name: 'Biotech', href: '/industries/biotech'},
                {name: 'Education', href: '/industries/education'},
                {name: 'e-Commerce', href: '/industries/e-commerce-development'},
                {name: 'Fintech', href: '/industries/fintech'},
            ],
        },
        {
            title: '',
            items: [
                {name: 'Healthcare', href: '/industries/healthcare'},
                {name: 'Logistics', href: '/industries/logistics'},
                {name: 'Music', href: '/industries/music'},
                {name: 'Oil and Gas', href: '/industries/oil-and-gas'},
                {name: 'On-Demand', href: '/industries/ondemand'},
            ],
        },
        {
            title: '',
            items: [
                {name: 'Real Estate', href: '/industries/real-estate'},
                {name: 'Retail', href: '/industries/retail'},
                {name: 'SAAS', href: '/industries/saas'},
                {name: 'Travel and Hospitality', href: '/industries/travel-and-hospitality'},
                {name: 'HR-Tech', href: '/industries/hr-tech'},
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

    // Overlay close handler
    const handleOverlayMouseLeave = () => {
        setIsServicesOpen(false);
        setIsIndustriesOpen(false);
        setIsTechnologiesOpen(false);
    };

    return (
        <>
            {/* Futuristic: keyframes for the animated progress beam + CTA glow */}
            <style>{`
                @keyframes greyBeamFlow {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes greyCtaPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.45); }
                    50% { box-shadow: 0 0 22px 4px rgba(56,189,248,0.25); }
                }
                .grey-progress-beam {
                    background: linear-gradient(90deg, #38bdf8, #a855f7, #38bdf8);
                    background-size: 200% 100%;
                    animation: greyBeamFlow 3s linear infinite;
                    box-shadow: 0 0 10px rgba(56,189,248,0.7);
                }
                .grey-cta-glow { animation: greyCtaPulse 3.5s ease-in-out infinite; }
                .grey-cta-glow:hover { animation-play-state: paused; }
            `}</style>

            {/* Futuristic: top reading-progress beam (additive, non-blocking) */}
            {!isModalOpen && !isMobileMenuOpen && (
                <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
                    <div
                        className="grey-progress-beam h-full transition-[width] duration-150 ease-out"
                        style={{width: `${scrollProgress}%`}}
                        aria-hidden="true"
                    />
                </div>
            )}

            {/* Submenu fullscreen background overlay */}
            {(isServicesOpen || isIndustriesOpen || isTechnologiesOpen) && !isModalOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md transition-opacity duration-300"
                    onMouseLeave={handleOverlayMouseLeave}
                />
            )}

            {/* Main Header - only show when modal is not open */}
            {!isModalOpen && !isMobileMenuOpen && (
                <header
                    className={`fixed top-0 left-0 right-0  py-4 md:py-8 lg:py-8 w-full z-50 transition-transform duration-300
                                                                            ${(isServicesOpen || isIndustriesOpen || isTechnologiesOpen) ? 'bg-transparent' : headerTheme.background}
                                                                            ${headerTheme.textColor} ${headerTheme.blur} 
                                                                            ${showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
                                                                            ${isScrolled ? '' : ''}`}
                >
                    <div className="container max-w-full relative mx-auto w-full h-auto px-4 lg:px-[4.6em]">
                        <div className="flex items-center justify-between h-auto">
                            <div className="shrink-0">
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
                            <nav className="hidden lg:flex space-x-6 items-center ml-auto mr-4">
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
                                                    className={`text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                    aria-expanded={isServicesOpen}
                                                    aria-haspopup="true"
                                                    type="button"
                                                >
                                                    <span className="text-base font-normal">{item.label}</span>
                                                </button>
                                                {/* Services Submenu Dropdown */}
                                                <div
                                                    className={`absolute top-full left-[-4em] rounded-lg transition-all duration-300 transform ${isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                    style={{ width: '51rem' }}
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
                                                                                {item.description && (
                                                                                    <span
                                                                                        className="block text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-200">
                                                                                                                                            {item.description}
                                                                                                                                        </span>
                                                                                )}
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
                                                    className={`text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                    aria-expanded={isIndustriesOpen}
                                                    aria-haspopup="true"
                                                    type="button"
                                                >
                                                    <span className="text-base font-normal">{item.label}</span>
                                                </button>
                                                {/* Industries Submenu Dropdown */}
                                                <div
                                                    className={`absolute top-full left-[-1.2em] rounded-lg transition-all duration-300 transform ${isIndustriesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                    style={{ width: '35rem' }}
                                                >
                                                    <div className="flex gap-2 p-4">
                                                        {industriesSubmenuSections.map((section, sectionIndex) => (
                                                            <div key={`industry-section-${sectionIndex}`}
                                                                 className="flex-1  p-2 space-y-2">
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
                                                    className={`text-white hover:text-gray-300 transition-colors duration-200 text-base font-normal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActiveRoute(item.href) ? 'border-b-2 border-white after:w-full' : ''}`}
                                                    aria-expanded={isTechnologiesOpen}
                                                    aria-haspopup="true"
                                                    type="button"
                                                >
                                                    <span className="text-base font-normal">{item.label}</span>
                                                </button>
                                                {/* Technologies Submenu Dropdown */}
                                                <div
                                                    className={`absolute top-full left-[-1.2em] rounded-lg transition-all duration-300 transform ${isTechnologiesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                                                    style={{ width: '35rem' }}
                                                >
                                                    <div className="flex gap-2 p-4">
                                                        {technologiesSubmenuSections.map((section, sectionIndex) => (
                                                            <div key={`tech-section-${sectionIndex}`} className="flex-1  p-2 space-y-2">
                                                                <ul className="space-y-3">
                                                                    {section.items.map((item, itemIndex) => (
                                                                        <li key={item.name || `tech-item-${itemIndex}`}>
                                                                            <Link
                                                                                href={item.href}
                                                                                className={`group block text-white hover:text-teal-200 transition-colors duration-200 ${isActiveRoute(item.href) ? 'text-teal-200' : ''}`}
                                                                            >
                                                                                        <span className="text-base font-light leading-relaxed group-hover:translate-x-1 transition-transform duration-200 inline-block">
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
                            {/* Theme toggle (desktop) */}
                            <ThemeToggle className="hidden lg:inline-flex mr-3 scale-90"/>
                            {/* CTA Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="grey-cta-glow rounded-full text-[1em] lg:block hidden font-medium py-[0.40em] px-[0.90em] border transition-all duration-300 text-teal-400 hover:text-white hover:bg-teal-500/20 border-teal-400 hover:border-teal-300 hover:scale-105"
                            >
                                Start Your Project
                            </button>
                            {/* Mobile menu button */}
                            <div className="lg:hidden flex items-center gap-2">
                                <ThemeToggle className="scale-90"/>
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
                        </div>
                    </div>
                </header>
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
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

                        {/* Mobile Navigation */}
                        <nav className="space-y-1">
                            {mainMenuItems.map((item: MenuItem) => (
                                <div key={item.label}>
                                    {item.hasSubmenu ? (
                                        <div>
                                            <button
                                                className="flex items-center justify-between w-full text-white hover:text-gray-300 transition-colors duration-200 text-[1.5em] font-normal"
                                                onClick={() => {
                                                    if (item.label === 'Services') toggleMobileServices();
                                                    else if (item.label === 'Industries') toggleMobileIndustries();
                                                    else if (item.label === 'Technologies') toggleMobileTechnologies();
                                                }}
                                                type="button"
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown
                                                    size={18}
                                                    className={`transition-transform duration-200 ${
                                                        (item.label === 'Services' && isMobileServicesOpen) ||
                                                        (item.label === 'Industries' && isMobileIndustriesOpen) ||
                                                        (item.label === 'Technologies' && isMobileTechnologiesOpen)
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
                                                    (item.label === 'Technologies' && isMobileTechnologiesOpen)
                                                        ? 'opacity-100'
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                                style={{
                                                    maxHeight: (item.label === 'Services' && isMobileServicesOpen) ||
                                                    (item.label === 'Industries' && isMobileIndustriesOpen) ||
                                                    (item.label === 'Technologies' && isMobileTechnologiesOpen)
                                                        ? '50rem'
                                                        : '0',
                                                }}
                                            >
                                                {(item.label === 'Services'
                                                        ? servicesSubmenuSections
                                                        : item.label === 'Industries'
                                                            ? industriesSubmenuSections
                                                            : technologiesSubmenuSections
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
                            className="mt-6 rounded-full text-[1.5em] font-medium py-[0.40em] px-[0.90em] border transition text-teal-400 hover:text-teal-600 border-teal-400 hover:border-teal-600"
                            onMouseMove={handleMouseMove}
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Start Your Project
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for FormComponent */}
            {
                isModalOpen && (
                    <div
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
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className={`absolute top-0 right-4 ${
                                        isDayTime ? 'text-black' : 'text-white'
                                    } hover:text-gray-300`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-10 w-10"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={'top-[20%] md:mt-[5em] mt-[35em] lg:top-[10%] w-full max-w-full px-4'}>
                                    <FormComponent/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Header;