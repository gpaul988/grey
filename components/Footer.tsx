'use client';

import React, {useEffect, useState, useRef} from 'react';
import '../app/globals.css'
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaGitlab} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FormComponent} from "@/components/FormComponent";
import {BsThreads} from "react-icons/bs";
import {useIsDayTime} from './useIsDayTime';


// Custom CSS for the infinite scroll animation + futuristic FX (additive).
const customStyles = `
  @keyframes scrollUp {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
  
  .scroll-container {
    max-height: 220px;
    overflow: hidden;
    position: relative;
  }

  .scroll-container > * {
    display: block;
    animation: scrollUp 50s linear infinite;
  }

  /* --- Futuristic footer enhancements (added, non-breaking) --- */
  @keyframes greyAccentSlide {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  .grey-accent-bar {
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #14b8a6, #2dd4bf, #14b8a6);
    background-size: 200% 100%;
    animation: greyAccentSlide 6s linear infinite;
    box-shadow: 0 0 18px rgba(20,184,166,0.35);
  }
  .grey-grid-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at 50% 0%, #000 0%, transparent 70%);
  }
  .grey-social {
    position: relative;
    display: inline-flex;
    transition: transform .25s ease, color .25s ease, filter .25s ease;
  }
  .grey-social:hover {
    transform: translateY(-3px) scale(1.12);
    color: #fff;
    filter: drop-shadow(0 0 8px rgba(20,184,166,0.8));
  }
  @keyframes greyFloatUp {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .grey-totop {
    animation: greyFloatUp .4s ease both;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .grey-totop:hover {
    transform: translateY(-4px) scale(1.06);
    box-shadow: 0 10px 30px rgba(20,184,166,0.5);
  }

  /* --- EXTREME futuristic footer layer (additive) --- */
  @keyframes greyMeshDrift {
    0%   { transform: translate3d(-6%, 0, 0) scale(1.1); opacity:.5; }
    50%  { transform: translate3d(6%, 3%, 0) scale(1.25); opacity:.8; }
    100% { transform: translate3d(-6%, 0, 0) scale(1.1); opacity:.5; }
  }
  @keyframes greyGridPan {
    0% { background-position: 0 0, 0 0; }
    100% { background-position: 48px 48px, 48px 48px; }
  }
  @keyframes greyHueSpin { 0% { filter: hue-rotate(0); } 100% { filter: hue-rotate(360deg); } }
  @keyframes greyScanFooter {
    0% { transform: translateY(0); opacity:0; }
    10% { opacity:.85; }
    100% { transform: translateY(100%); opacity:0; }
  }

  /* Animated holographic mesh blobs behind the footer */
  .grey-mesh { position:absolute; inset:-30% -10%; pointer-events:none; z-index:0; filter:blur(70px); mix-blend-mode:screen; will-change:transform; }
  .grey-mesh.m1 { background: radial-gradient(35% 50% at 20% 30%, rgba(20,184,166,.36), transparent 70%); animation: greyMeshDrift 16s ease-in-out infinite; }
  .grey-mesh.m2 { background: radial-gradient(35% 50% at 80% 20%, rgba(20,184,166,.28), transparent 70%); animation: greyMeshDrift 20s ease-in-out infinite reverse; }
  .grey-mesh.m3 { background: radial-gradient(30% 45% at 55% 80%, rgba(20,184,166,.22), transparent 70%); animation: greyMeshDrift 24s ease-in-out infinite; }

  /* Panning tech grid (upgrade over the static glow) */
  .grey-grid-glow { animation: greyGridPan 8s linear infinite; }

  /* Horizontal neon scan sweeping the footer */
  .grey-scan-footer {
    position:absolute; left:0; right:0; top:0; height:120px; z-index:0; pointer-events:none;
    background: linear-gradient(180deg, rgba(20,184,166,.18), transparent);
    animation: greyScanFooter 7s ease-in-out infinite;
  }

  /* Social icons get an animated halo ring on hover */
  .grey-social::before {
    content:""; position:absolute; inset:-8px; border-radius:9999px; z-index:-1;
    background: conic-gradient(from 0deg, #14b8a6, #2dd4bf, #14b8a6);
    background-size:200% 200%; filter:blur(6px); opacity:0; transition:opacity .3s;
    animation: greyAccentSlide 3s linear infinite;
  }
  .grey-social:hover::before { opacity:.85; }

  /* Glowing pill CTA helper for the footer login/cta */
  .grey-glow-pill { position:relative; isolation:isolate; transition: transform .25s ease; }
  .grey-glow-pill:hover { transform: translateY(-2px) scale(1.04); }
  .grey-glow-pill::before {
    content:""; position:absolute; inset:-2px; border-radius:inherit; z-index:-1;
    background: conic-gradient(from 0deg, #14b8a6, #2dd4bf, #14b8a6);
    background-size:200% 200%; filter:blur(7px); opacity:0; transition:opacity .3s;
    animation: greyAccentSlide 3s linear infinite;
  }
  .grey-glow-pill:hover::before { opacity:.9; }

  /* Thicker, richer animated accent bar */
  .grey-accent-bar { height: 3px; background: linear-gradient(90deg, #14b8a6, #2dd4bf, #14b8a6); background-size: 300% 100%; }

  @media (prefers-reduced-motion: reduce) {
    .grey-mesh, .grey-grid-glow, .grey-scan-footer, .grey-social::before,
    .grey-glow-pill::before, .grey-accent-bar { animation: none !important; }
  }
`;

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const backendLoginUrl = '/login';
    const pathname = usePathname();

    // Newsletter signup state
    const [subEmail, setSubEmail] = useState('');
    const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
    const [subMsg, setSubMsg] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (subStatus === 'loading') return;
        setSubStatus('loading');
        setSubMsg('');
        try {
            const r = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: subEmail, source: 'footer'}),
            });
            const d = await r.json();
            if (r.ok && d.success) {
                setSubStatus('ok');
                setSubMsg(d.message || "You're on the list.");
                setSubEmail('');
            } else {
                setSubStatus('error');
                setSubMsg(d.message || 'Could not subscribe.');
            }
        } catch {
            setSubStatus('error');
            setSubMsg('Network error. Please try again.');
        }
    };

    // State to manage modal visibility
    const prevOverflowRef = useRef<string | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (isModalOpen) {
            if (prevOverflowRef.current === null) prevOverflowRef.current = document.body.style.overflow || '';
            // Lock background scrolling and scroll page to the top
            document.body.style.overflow = 'hidden';
            window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
            // Unlock background scrolling
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        }

        // Cleanup to reset `overflow` when component unmounts
        return () => {
            document.body.style.overflow = prevOverflowRef.current ?? '';
            prevOverflowRef.current = null;
        };
    }, [isModalOpen]);

    // isDaytime react hook
    const isDayTime = useIsDayTime();


    const scrollingMessages = [
        (<>
            <h5 className="text-lg font-semibold text-white">Web design and digital growth partner in Port Harcourt</h5><br/>
            <p className="text-base leading-relaxed text-white/85">Grey InfoTech helps businesses build stronger digital experiences, from strategy and branding to responsive websites, web applications, and performance-focused growth campaigns. We work with startups, SMEs, and established organisations that need practical digital solutions that look professional and deliver measurable business value.</p><br/>
            <h5 className="text-lg font-semibold text-white">Bespoke websites and product experiences</h5><br/>
            <p className="text-base leading-relaxed text-white/85">Our team designs and develops tailored digital platforms for business, including corporate websites, e-commerce stores, mobile-friendly landing pages, and custom web applications. We focus on clarity, speed, user experience, and conversion so every interaction supports real business goals.</p><br/>
            <h5 className="text-lg font-semibold text-white">Strategy, UX, development, and marketing</h5><br/>
            <p className="text-base leading-relaxed text-white/85">From discovery and planning to UI/UX design, engineering, testing, and launch, Grey InfoTech supports the full digital journey. We also help businesses improve visibility through SEO, digital marketing, and data-driven optimisation that turns traffic into leads and customers.</p><br/>
            <h5 className="text-lg font-semibold text-white">Built for real business outcomes</h5><br/>
            <p className="text-base leading-relaxed text-white/85">We create solutions for the realities of modern business—reliable performance, clean presentation, secure infrastructure, and digital experiences that build trust. Whether you are launching a new idea or upgrading an existing brand, we help you move forward with confidence.</p><br/>
        </>)
    ];

    // The /store/* routes render their own storefront footer via StoreLayout.
    // Suppress the global site footer there to prevent a duplicated footer.
    // Additive guard  - placed after all hooks so hook order stays stable.
    if (pathname?.startsWith('/store')) {
        return null;
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: customStyles}}/>
            {/* Futuristic animated accent bar (added) */}
            <div className="grey-accent-bar" aria-hidden="true"/>
            <footer
                className="relative z-20 overflow-hidden bg-black/75 text-white min-h-auto flex flex-col mx-auto w-full px-6 sm:px-12 md:px-20 lg:px-[4.6em]">
                {/* Holographic mesh blobs + neon scan (decorative, behind content) */}
                <span className="grey-mesh m1" aria-hidden="true"/>
                <span className="grey-mesh m2" aria-hidden="true"/>
                <span className="grey-mesh m3" aria-hidden="true"/>
                <span className="grey-scan-footer" aria-hidden="true"/>
                {/* Animated tech-grid glow backdrop (added, decorative) */}
                <div className="grey-grid-glow" aria-hidden="true"/>
                {/* Main Footer Content */}
                <div className="relative z-10 flex-1 py-12">
                    {/* Hero Section */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-16 mx-auto lg:mb-14 md:mb-12 mb-8">
                        {/* Left – heading (takes 2/3 on md+) */}
                        <div className="order-1 md:col-span-2 text-start ">
                            <h1 className="lg:text-[5.5em] md:text-[3.5em] text-[1.5em] font-bold leading-none lg:mb-6 md:mb-4 mb-2">
                                Let&apos;s create<br/>
                                <span className="text-teal-400">something</span> exceptional
                                <span className="text-teal-400">.</span>
                            </h1>
                        </div>

                        {/* Right – phone + CTA (takes 1/3 on md+) */}
                        <div
                            className="order-2 md:col-span-1 flex flex-col justify-end text-end lg:items-end md:items-end items-start ">
                            <Link
                                href="tel:+2348028095571"
                                className="lg:text-[2em] md:text-[1.5em] text-[1.5em] font-medium block lg:mb-6 md:mb-4 mb-2 text-teal-400"
                            >
                                802<span className="text-white">-809</span>-5571
                            </Link>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="relative group rounded-full text-[1em] font-medium py-[0.40em] px-[0.90em] border transition-colors text-teal-500 hover:text-teal-300 border-teal-500 hover:border-teal-300 duration-300 lg:mb-20 md:mb-20 mb-12 flex items-center w-fit"
                            >
                                Start a project
                                <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">
        →
      </span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Links Grid */}
                    <div
                        className="mx-auto grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 lg:gap-10 md:gap-10 gap-4 w-full">
                        {/* Logo */}
                        <div className="order-1 md:col-span-4 md:order-1 lg:col-span-1 lg:order-0">
                            <div className="text-4xl font-bold mb-4">
                                <Link href="/">
                                    <Image
                                        src={'/footer.svg'}
                                        alt="Grey InfoTech Logo"
                                        width={300}
                                        height={80}
                                        className="h-20 w-auto md:h-24 lg:h-32 object-contain"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Discovery Column */}
                        <div className="text-[0.75rem] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-1 text-white">
                                <li><Link href="/services/ui-ux-design" className="text-white hover:text-white transition-colors">UX
                                    & UI design</Link>
                                </li>
                                <li><Link href="/services/Web-Application"
                                          className="text-white hover:text-white transition-colors">Web
                                    application development</Link></li>
                                <li><Link href="/services/Mobile-Application-Development"
                                          className="text-white hover:text-white transition-colors">Mobile app
                                    development</Link></li>
                                <li><Link href="/services/Web-Design" className="text-white hover:text-white transition-colors">Web
                                    design agency</Link>
                                </li>
                                <li><Link href="/services/Web-Development"
                                          className="text-white hover:text-white transition-colors">Web
                                    development</Link>
                                </li>
                                <li><Link href="/services/unity-development"
                                          className="text-white hover:text-white transition-colors">Unity
                                    development</Link>
                                </li>
                                <li><Link href="/services/seo" className="text-white hover:text-white transition-colors">Search
                                    engine optimisation</Link></li>
                                <li><Link href="/services/Laravel-Development"
                                          className="text-white hover:text-white transition-colors">Laravel
                                    Development</Link></li>
                                <li><Link href="/services/cms-development"
                                          className="text-white hover:text-white transition-colors">Drupal
                                    development services</Link></li>
                            </ul>
                        </div>

                        {/* Work Column */}
                        <div className="text-[0.75rem] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-1 text-white">
                                <li><Link href="/company" className="text-white hover:text-white transition-colors">Company</Link>
                                </li>
                                <li><Link href="/case-studies" className="text-white hover:text-white transition-colors">Case
                                    Studies</Link>
                                </li>
                                <li><Link href="/careers"
                                          className="text-white hover:text-white transition-colors">Careers</Link>
                                </li>
                                <li><Link href="/contact" className="text-white hover:text-white transition-colors">Contact
                                    us</Link>
                                </li>
                                <li><Link href="/partners" className="text-white hover:text-white transition-colors">Partner with
                                    us</Link>
                                </li>
                                <li><Link href="/support"
                                          className="text-white hover:text-white transition-colors">Support</Link>
                                </li>
                                <li><Link href="/audit"
                                          className="text-white hover:text-white transition-colors">Free Site Audit</Link>
                                </li>
                                <li><Link href="/faq"
                                          className="text-white hover:text-white transition-colors">See all FAQs</Link>
                                </li>
                            </ul>
                        </div>

                        {/* For Startups Column */}
                        <div className="text-[0.75rem] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-1 text-white">
                                <li><Link href="/Startups" className="text-white hover:text-white transition-colors">For
                                    startups</Link>
                                </li>
                                <li><Link href="/industries/fintech" className="text-white hover:text-white transition-colors">FinTech
                                    app development</Link></li>
                                <li><Link href="/industries/hr-tech" className="text-white hover:text-white transition-colors">HR
                                    app development</Link>
                                </li>
                                <li><Link href="/industries/healthcare" className="text-white hover:text-white transition-colors">Healthcare
                                    app</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Social Column */}
                        <div className="flex flex-col order-2 md:order-2 ">
                            {/* Social Media Icons */}
                            <div className="flex space-x-3 order-2 md:order-1 mb-4 w-full">
                                <Link href="https://www.instagram.com/greyinfotechltd"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaInstagram size={20}/>
                                </Link>
                                <Link href="https://www.facebook.com/greyinfotechltd"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaFacebook size={20}/>
                                </Link>
                                <Link href="https://www.threads.com/@greyinfotechltd"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <BsThreads size={20}/>
                                </Link>
                                <Link href="https://www.x.com/greyinfotechltd"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaTwitter size={20}/>
                                </Link>
                                <Link href="https://www.linkedin.com/company/grey-infotech-limited"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaLinkedin size={20}/>
                                </Link>
                                <Link href="https://github.com/GREY-INFOTECH-LTD"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaGithub size={20}/>
                                </Link>
                                <Link href="https://www.gitlab.com/grey-infotech"
                                      className="grey-social text-white hover:text-white transition-colors">
                                    <FaGitlab size={20}/>
                                </Link>
                            </div>

                            {/* Office Information */}
                            <div className="space-y-3 order-1 md:order-2 mb-6">
                                <div>
                                    <h4 className="text-white text-[0.87em] font-medium">Main office</h4>
                                    <p className="text-white/80 text-[0.8em] leading-[1.3]">
                                        9 Godfery Tata Close,<br/>
                                        Rumuewhara New-Layout,<br/>
                                        Off Eneka-Igwuruta Road,<br/>
                                        Rivers State<br/>
                                        500102
                                    </p>
                                </div>

                                {/* Compact newsletter signup  - sits right below the main office address */}
                                <div
                                    className="rounded-xl border border-cyan-400/20 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 p-3">
                                    <h4 className="text-white text-[0.85em] font-medium">
                                        Stay in the <span className="text-teal-400">loop</span>
                                    </h4>
                                    <p className="mt-0.5 text-white/80 text-[0.72em] leading-[1.3]">
                                        Updates & insights to your inbox. No spam.
                                    </p>
                                    <form onSubmit={handleSubscribe} className="mt-2">
                                        <div className="flex items-stretch gap-1.5">
                                            <input
                                                type="email"
                                                required
                                                value={subEmail}
                                                onChange={(e) => setSubEmail(e.target.value)}
                                                placeholder="you@company.com"
                                                aria-label="Email address"
                                                className="min-w-0 flex-1 rounded-lg border border-cyan-400/20 bg-white/5 px-3 py-2 text-[0.78em] text-white placeholder-gray-500 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                                            />
                                            <button
                                                type="submit"
                                                disabled={subStatus === 'loading'}
                                                aria-label="Subscribe"
                                                className="shrink-0 rounded-lg bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-500 px-3 py-2 text-[0.78em] font-semibold text-white shadow shadow-cyan-500/20 transition hover:shadow-cyan-400/40 disabled:opacity-60"
                                            >
                                                {subStatus === 'loading' ? '…' : 'Subscribe'}
                                            </button>
                                        </div>
                                        {subMsg && (
                                            <p
                                                className={`mt-1.5 text-[0.72em] ${subStatus === 'ok' ? 'text-teal-400' : 'text-rose-400'}`}
                                                aria-live="polite"
                                            >
                                                {subMsg}
                                            </p>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="w-full max-w-full mx-auto ">
                    {/* Legal Links */}
                    <div className="mb-2">
                        <div
                            className="flex flex-col md:flex-row md:justify-between items-center text-[0.873em] text-white">
                            {/* Footer Links */}
                            <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
                                <Link href="/terms-conditions" className="text-white hover:text-white">Terms & Conditions</Link>
                                <Link href="/cookies-policy" className="text-white hover:text-white">Cookies Policy</Link>
                                <Link href="/data-protection-policy" className="text-white hover:text-white">Data Protection
                                    Policy</Link>
                                <Link href="/links" className="text-white hover:text-white">Links</Link>
                                <Link href="https://linktr.ee/greyinfotechltd"
                                      className="text-white hover:text-white">Linktree</Link>
                            </div>

                            {/* Copyright */}
                            <div className="mb-2 md:mb-0 text-white">
                                <p><Link href='/company' className="text-white hover:text-white">Grey InfoTech</Link> © 2026</p>
                            </div>
                        </div>
                    </div>

                    {/* Scrolling Message */}
                    <style>
                        {`
                      .scroll-container {
                        display: flex;
                        flex-direction: column;
                        animation: scrollUp 120s linear infinite;
                      }
                      @keyframes scrollUp {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-50%); }
                      }
                    `}
                    </style>
                    <div className="relative h-10 mx-0 lg:w-1/2 md:w-1/2 w-full leading-normal overflow-hidden mb-4">
                        <div className="scroll-container text-[0.95em] font-light w-full text-justify">
                            {[...scrollingMessages, ...scrollingMessages].map((message, idx) => (
                                <div key={idx} className="whitespace-normal">
                                    {message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Back-to-top (added, futuristic) */}
                <div className="flex justify-center pb-8">
                    <button
                        type="button"
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        aria-label="Back to top"
                        className="grey-totop inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-indigo-500/20 px-5 py-2.5 text-sm font-medium text-cyan-100 backdrop-blur-sm hover:text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
                        </svg>
                        Back to top
                    </button>
                </div>
            </footer>

            {/* Modal for FormComponent */}
            {
                isModalOpen && (
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
                                <div className={'mt-[10em] py-[2em]'}>
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

export default Footer;