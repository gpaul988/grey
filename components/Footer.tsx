'use client';

import React, {useEffect, useState} from 'react';
import '../app/globals.css'
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaGitlab} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import {FormComponent} from "@/components/FormComponent";
import {BsThreads} from "react-icons/bs";


// Custom CSS for the infinite scroll animation
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
    animation: scrollUp 50s linear infinite;
  }
`;

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const backendLoginUrl = '/login';

    // State to manage modal visibility
    useEffect(() => {
        if (isModalOpen) {
            // Lock background scrolling and scroll page to the top
            document.body.style.overflow = "hidden";
            window.scrollTo({top: 0, behavior: "smooth"});
        } else {
            // Unlock background scrolling
            document.body.style.overflow = "auto";
        }

        // Cleanup to reset `overflow` when component unmounts
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

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

    const scrollingMessages = [
        (<>
            <h5>Web Design Agency in Port Harcourt, Nigeria</h5><br/>
            <p>Grey InfoTech is a leading web design and digital agency in Port Harcourt, Rivers State, Nigeria, trusted
                by businesses locally and internationally. Since our establishment in 2018, we have been at the
                forefront of delivering innovative, user-centric digital solutions that empower organizations to compete
                effectively in today’s global economy.<br/><br/>
                We specialize in professional website design, web development, mobile applications, web applications,
                UX/UI design, and digital strategy. From startups in Port Harcourt to established corporations across
                Nigeria and abroad, we provide scalable solutions that enhance digital presence, improve customer
                engagement, and drive measurable business growth.<br/><br/>
                Our reputation is built on helping organizations—whether local SMEs in Rivers State or international B2B
                and B2C clients—navigate digital transformation. For startups, we build minimum viable products (MVPs)
                and support them from ideation to market launch, while for established companies, we deliver
                enterprise-level platforms and digital strategies that create lasting competitive advantage.</p><br/>
            <h5>Web Design & Development Services</h5><br/>
            <p>As one of the most recognized web design companies in Port Harcourt, Nigeria, Grey InfoTech delivers
                bespoke websites and digital platforms that combine creativity with technical precision. Our solutions
                include corporate websites, e-commerce platforms, mobile-responsive websites, and custom web
                applications, all designed to align with business goals and deliver measurable ROI.<br/><br/>
                We work with global-standard technologies such as Laravel, Node.js, Next.js, and Ruby on Rails to build
                scalable, secure, and high-performance platforms. Our team is also proficient in leading content
                management systems, including WordPress, Drupal, Joomla, Webflow, Framer, Strapi, and Contentful.
                Whether you are a local business in Port Harcourt, a national brand in Nigeria, or an international
                company outsourcing development, we provide flexible, future-ready solutions that adapt to your needs.
            </p><br/><br/>
            <h5>Our Process</h5><br/>
            <p>Every successful digital project begins with a clear strategy. At Grey InfoTech, our process starts with
                market research, competitor analysis, and customer insights to ensure every project is positioned for
                success. We define project goals, objectives, and KPIs in collaboration with our clients, ensuring
                alignment from concept to delivery.<br/><br/>
                We then map user journeys and develop intuitive UX/UI designs through wireframes, prototypes, and
                high-fidelity mockups. Our development approach follows agile methodology, ensuring adaptability and
                speed without compromising quality. We produce clean, well-documented, and scalable code optimized for
                long-term growth.<br/><br/>
                Before launch, every website or application undergoes rigorous testing, performance optimization, and
                quality assurance to guarantee security and reliability. Once deployed, we monitor performance, gather
                user feedback, and implement data-driven improvements, ensuring that our clients’ platforms remain
                competitive both locally and internationally.</p><br/><br/>
            <h5>Digital Marketing & SEO Services</h5><br/>
            <p>Grey InfoTech is more than a design and development company—we are also a trusted digital marketing and
                SEO agency in Port Harcourt, Nigeria. We understand that visibility is critical for business success,
                and we deliver strategies that help our clients rank higher, attract qualified leads, and convert
                traffic into customers.<br/><br/>
                Our SEO services in Port Harcourt include keyword research, on-page and off-page optimization, technical
                SEO, and content marketing. We create tailored campaigns designed to strengthen online presence not just
                locally in Rivers State but also nationally and internationally. By aligning SEO with our web design and
                development services, we ensure that every website we build is optimized for both users and search
                engines.<br/><br/>
                We provide data-driven reports, analytics, and performance tracking, giving clients full transparency on
                traffic growth, search rankings, and conversion rates. With Grey InfoTech as your digital partner, your
                business gains both visibility and long-term growth potential.</p><br/><br/>
            <h5>Commitment to Local and Global Innovation</h5><br/>
            <p>At Grey InfoTech, we are committed to innovation and excellence. As one of the fastest-growing web design
                agencies in Nigeria, we continue to invest in emerging technologies and artificial intelligence to
                create smarter, more adaptive solutions. Our vision is to empower businesses in Port Harcourt, across
                Nigeria, and worldwide with digital platforms that deliver real business impact.<br/><br/>
                We remain the trusted partner for organizations seeking to establish or expand their digital presence.
                Whether you are a local business in Port Harcourt, an SME in Nigeria, or an international enterprise
                seeking a reliable web design and development partner in Africa, Grey InfoTech provides the expertise,
                professionalism, and results needed to succeed in today’s digital economy.</p><br/>
        </>)
    ];

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: customStyles}}/>
            <footer
                className="bg-black/75 text-white min-h-auto flex flex-col mx-auto w-full px-6 sm:px-12 md:px-20 lg:px-[4.6em]">
                {/* Main Footer Content */}
                <div className="flex-1 py-12">
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
                                <Link href="/#">
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
                        <div className="text-[0.8em] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/services/ui-ux-design" className="hover:text-white transition-colors">UX
                                    & UI design</Link>
                                </li>
                                <li><Link href="/services/Web-Application"
                                          className="hover:text-white transition-colors">Web
                                    application development</Link></li>
                                <li><Link href="/services/Mobile-Application-Development"
                                          className="hover:text-white transition-colors">Mobile app
                                    development</Link></li>
                                <li><Link href="/services/Web-Design" className="hover:text-white transition-colors">Web
                                    design agency</Link>
                                </li>
                                <li><Link href="/services/Web-Development"
                                          className="hover:text-white transition-colors">Web
                                    development</Link>
                                </li>
                                <li><Link href="/services/unity-development"
                                          className="hover:text-white transition-colors">Unity
                                    development</Link>
                                </li>
                                <li><Link href="/services/seo" className="hover:text-white transition-colors">Search
                                    engine optimisation</Link></li>
                                <li><Link href="/services/Laravel-Development"
                                          className="hover:text-white transition-colors">Laravel
                                    partners</Link></li>
                                <li><Link href="/services/cms-development"
                                          className="hover:text-white transition-colors">Drupal
                                    development services</Link></li>
                            </ul>
                        </div>

                        {/* Work Column */}
                        <div className="text-[0.8em] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/company" className="hover:text-white transition-colors">Company</Link>
                                </li>
                                <li><Link href="/case-studies" className="hover:text-white transition-colors">Case
                                    Studies</Link>
                                </li>
                                <li><Link href="/careers"
                                          className="hover:text-white transition-colors">Careers</Link>
                                </li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact
                                    us</Link>
                                </li>
                                <li><Link href="/support"
                                          className="hover:text-white transition-colors">Support</Link>
                                </li>
                            </ul>
                        </div>

                        {/* For Startups Column */}
                        <div className="text-[0.8em] font-medium mb-4 order-2 md:order-2">
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/Startups" className="hover:text-white transition-colors">For
                                    startups</Link>
                                </li>
                                <li><Link href="/industries/fintech" className="hover:text-white transition-colors">FinTech
                                    app development</Link></li>
                                <li><Link href="/industries/hr-tech" className="hover:text-white transition-colors">HR
                                    app development</Link>
                                </li>
                                <li><Link href="/industries/healthcare" className="hover:text-white transition-colors">Healthcare
                                    app</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Social Column */}
                        <div className="flex flex-col order-2 md:order-2 ">
                            {/* Social Media Icons */}
                            <div className="flex space-x-3 order-2 md:order-1 mb-4 w-full">
                                <Link href="https://www.instagram.com/greyinfotechltd"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaInstagram size={20}/>
                                </Link>
                                <Link href="https://www.facebook.com/greyinfotechltd"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaFacebook size={20}/>
                                </Link>
                                <Link href="https://www.threads.com/@greyinfotechltd"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <BsThreads size={20}/>
                                </Link>
                                <Link href="https://www.x.com/greyinfotechltd"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaTwitter size={20}/>
                                </Link>
                                <Link href="https://www.linkedin.com/company/greyinfotechltd"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaLinkedin size={20}/>
                                </Link>
                                <Link href="https://www.gitblab.com/grey-infotech"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaGithub size={20}/>
                                </Link>
                                <Link href="https://www.gitlab.com/grey-infotech"
                                      className="text-gray-400 hover:text-white transition-colors">
                                    <FaGitlab size={20}/>
                                </Link>
                            </div>

                            {/* Office Information */}
                            <div className="space-y-2 order-1 md:order-2 mb-6">
                                <div>
                                    <h4 className="text-white text-[0.87em] font-medium">Main office</h4>
                                    <p className="text-gray-400 text-[0.8em] leading-[1.3]">
                                        9 Godfery Tata Close,<br/>
                                        Rumuewhara New-Layout,<br/>
                                        Off Eneka-Igwuruta Road,<br/>
                                        Rivers State<br/>
                                        500102
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white text-[0.87em] font-medium">Branch office</h4>
                                    <p className="text-gray-400 text-[0.8em] leading-[1.3]">
                                        26 Alpha Gardens Estate,<br/>
                                        Apajo Farm Road,<br/>
                                        Akpajo-Eleme,<br/>
                                        Rivers State<br/>
                                        501101
                                    </p>
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
                            className="flex flex-col md:flex-row md:justify-between items-center text-[0.873em] text-gray-400">
                            {/* Footer Links */}
                            <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
                                <Link href="/Terms-Conditions" className="hover:text-white">Terms & Conditions</Link>
                                <Link href="/cookies-policy" className="hover:text-white">Cookies Policy</Link>
                                <Link href="/data-protection-policy" className="hover:text-white">Data Protection
                                    Policy</Link>
                                <Link href="/Links" className="hover:text-white">Links</Link>
                                <Link href="https://linktr.ee/greyinfotechltd"
                                      className="hover:text-white">Linktree</Link>
                                <Link href={backendLoginUrl} className="hover:text-white">login</Link>
                            </div>

                            {/* Copyright */}
                            <div className="mb-2 md:mb-0">
                                <p><Link href='#'>Grey InfoTech</Link> © 2017 - 2026</p>
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
                        <div className="scroll-container text-[0.8em] font-light w-full text-justify">
                            {[...scrollingMessages, ...scrollingMessages].map((message, idx) => (
                                <div key={idx} className="whitespace-normal">
                                    {message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

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