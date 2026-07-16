'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Layout, Blocks, Brain, Cloud, Megaphone, Palette, Briefcase, Zap, Rocket, Shield, BarChart3, CheckCircle, Package, ShoppingBag, Terminal, Cpu, Wrench, Settings } from 'lucide-react';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxChip, FxSectionHeading, FxButton, FxReveal, FxHoloCard, FxGlitchText } from '@/components/futuristic/fx';

const serviceIcons: Record<string, React.ReactNode> = {
    'Web-Development': <Code2 className="w-7 h-7" />,
    'Mobile-Application-Development': <Smartphone className="w-7 h-7" />,
    'backend-development': <Database className="w-7 h-7" />,
    'frontend-development': <Layout className="w-7 h-7" />,
    'blockchain-development': <Blocks className="w-7 h-7" />,
    'ai-development-services': <Brain className="w-7 h-7" />,
    'cloud-solutions': <Cloud className="w-7 h-7" />,
    'digital-marketing': <Megaphone className="w-7 h-7" />,
    'ui-ux-design': <Palette className="w-7 h-7" />,
    'branding': <Briefcase className="w-7 h-7" />,
    'consulting': <Zap className="w-7 h-7" />,
    'MVP': <Rocket className="w-7 h-7" />,
    'devops-services': <Settings className="w-7 h-7" />,
    'cybersecurity': <Shield className="w-7 h-7" />,
    'data-analytics': <BarChart3 className="w-7 h-7" />,
    'qa-testing': <CheckCircle className="w-7 h-7" />,
    'salesforce-development': <Cpu className="w-7 h-7" />,
    'golang-development': <Terminal className="w-7 h-7" />,
    'joomla-development': <Package className="w-7 h-7" />,
    'drupal-development': <Package className="w-7 h-7" />,
    'shopify-development': <ShoppingBag className="w-7 h-7" />,
    'wordpress-development': <Wrench className="w-7 h-7" />,
    'magento-development': <ShoppingBag className="w-7 h-7" />,
};

export default function ServicesScreen() {
    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const { top, bottom } = sectionRef.current.getBoundingClientRect();
                const wh = window.innerHeight;
                setIsBackgroundActive(top < wh * -0.1 || bottom < wh * -0.1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        { name: 'Web Development', slug: 'Web-Development', desc: 'Modern, scalable web applications with cutting-edge technologies', tag: 'Core' },
        { name: 'App Development', slug: 'Mobile-Application-Development', desc: 'Native and cross-platform mobile solutions', tag: 'Core' },
        { name: 'Backend Development', slug: 'backend-development', desc: 'Robust server-side architecture and APIs', tag: 'Engineering' },
        { name: 'Frontend Development', slug: 'frontend-development', desc: 'Beautiful, responsive user interfaces', tag: 'Engineering' },
        { name: 'Blockchain Development', slug: 'blockchain-development', desc: 'Secure distributed applications and smart contracts', tag: 'Web3' },
        { name: 'AI Development', slug: 'ai-development-services', desc: 'Machine learning and intelligent automation systems', tag: 'AI' },
        { name: 'Cloud Solutions', slug: 'cloud-solutions', desc: 'Scalable cloud infrastructure and DevOps', tag: 'Infra' },
        { name: 'Digital Marketing', slug: 'digital-marketing', desc: 'Growth-focused data-driven marketing strategies', tag: 'Growth' },
        { name: 'UI/UX Design', slug: 'ui-ux-design', desc: 'User-centred design excellence that converts', tag: 'Design' },
        { name: 'Branding', slug: 'branding', desc: 'Compelling brand identity and visual systems', tag: 'Design' },
        { name: 'Consulting', slug: 'consulting', desc: 'Strategic technology guidance and roadmapping', tag: 'Strategy' },
        { name: 'MVP Development', slug: 'MVP', desc: 'Fast-track product launches with validated foundations', tag: 'Startup' },
        { name: 'DevOps Services', slug: 'devops-services', desc: 'CI/CD pipelines, IaC and platform engineering', tag: 'Infra' },
        { name: 'Cybersecurity', slug: 'cybersecurity', desc: 'Penetration testing, security audits and compliance', tag: 'Security' },
        { name: 'Data Analytics', slug: 'data-analytics', desc: 'Data engineering, BI dashboards and ML models', tag: 'Data' },
        { name: 'QA & Testing', slug: 'qa-testing', desc: 'Manual, automated and performance testing', tag: 'Quality' },
        { name: 'Salesforce Development', slug: 'salesforce-development', desc: 'Custom CRM solutions and Salesforce integrations', tag: 'CRM' },
        { name: 'Go Development', slug: 'golang-development', desc: 'High-performance Go services and microservices', tag: 'Engineering' },
        { name: 'Joomla Development', slug: 'joomla-development', desc: 'Custom Joomla extensions and enterprise portals', tag: 'CMS' },
        { name: 'Drupal Development', slug: 'drupal-development', desc: 'Enterprise Drupal and headless CMS solutions', tag: 'CMS' },
        { name: 'Shopify Development', slug: 'shopify-development', desc: 'Custom Shopify themes, apps and storefronts', tag: 'Commerce' },
        { name: 'WordPress Development', slug: 'wordpress-development', desc: 'Custom themes, plugins and WooCommerce', tag: 'CMS' },
        { name: 'Magento Development', slug: 'magento-development', desc: 'Adobe Commerce and Magento enterprise solutions', tag: 'Commerce' },
    ];

    return (
        <main className={`relative min-h-screen transition-colors duration-500 ${dark ? 'bg-[#050810] text-white' : 'bg-white text-black'}`}>

            {/*  -  -  Hero  -  -  */}
            <section className="relative overflow-hidden min-h-[70vh] flex flex-col justify-end">
                {/* FX base */}
                <FxBackground day={false} grid aurora className="opacity-70" />
                {/* Scanlines */}
                <div className="gx-scanline pointer-events-none" />
                <div className="gx-hero-scan" />
                <div className="gx-noise-overlay" />

                {/* Orbit rings */}
                <div className="gx-orbit pointer-events-none absolute" style={{ width: '70vmax', height: '70vmax', top: '-25vmax', right: '-25vmax', opacity: .2 }} />
                <div className="gx-orbit gx-orbit-reverse pointer-events-none absolute" style={{ width: '45vmax', height: '45vmax', top: '-8vmax', right: '-4vmax', opacity: .12 }} />

                {/* Dark overlay for dark-mode hero */}
                {!dark && <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />}

                {/* Content */}
                <div className="relative z-10 gx-page-hero-content">
                    <div className="max-w-[90rem] mx-auto">
                        <FxReveal>
                            <FxChip day={false} className="mb-5">What We Build</FxChip>
                            <div className="border-b border-white/15 pb-7 mb-7 max-w-4xl">
                                <h1 className="gx-hero-title text-white">
                                    Our{' '}
                                    <span className="gx-gradient-text">Services</span>
                                </h1>
                            </div>
                            <p className="text-white/65 max-w-2xl text-[0.95em] md:text-[1.05em] leading-relaxed mb-8">
                                Comprehensive software development and digital solutions tailored to accelerate your business growth.
                            </p>
                            {/* Stat pills */}
                            <div className="flex flex-wrap gap-3">
                                {['12 Service Areas', '8+ Years Expertise', '15+ Industries', '50+ Products Shipped'].map(s => (
                                    <span key={s} className="gx-data-pill">{s}</span>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Intro  -  -  */}
            <section
                ref={sectionRef}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}
            >
                <FxBackground day={isDayTime} />
                <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>WHAT WE BUILD</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Comprehensive<br/><span className="gx-gradient-text">Solutions</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>Our extensive service portfolio spans modern development, AI, cloud infrastructure, and strategic consulting. From full-stack web applications to blockchain solutions, we deliver technology that scales.</p></div>
                                <div><p>Each service is designed with scalability, performance, and long-term business value in mind. We combine cutting-edge tools with strategic thinking to create solutions that drive measurable results.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Services grid  -  -  */}
            <section className={`relative z-10 px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20 lg:py-28 ${dark ? '' : ''}`}>
                {/* Subtle bg FX */}
                <FxBackground day={isDayTime} grid={true} aurora={false} className="opacity-20" />

                <motion.div
                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={service.slug}
                            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        >
                            <Link href={`/services/${service.slug}`} className="block h-full">
                                <FxHoloCard day={isDayTime} className="p-7 h-full flex flex-col justify-between group cursor-pointer">
                                    {/* Top */}
                                    <div>
                                        {/* Tag + icon row */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                                                dark
                                                    ? 'bg-gradient-to-br from-teal-400/20 to-cyan-500/20 text-teal-300'
                                                    : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100'
                                            }`}>
                                                {serviceIcons[service.slug] || <Zap className="w-7 h-7" />}
                                            </div>
                                            <span className="gx-data-pill text-[0.62em]">{service.tag}</span>
                                        </div>

                                        <h3 className="text-[1.1em] font-[700] mb-2.5 tracking-tight gx-glitch">{service.name}</h3>
                                        <p className={`text-[0.84em] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Bottom arrow */}
                                    <div className={`mt-6 flex items-center gap-2 text-[0.82em] font-[600] transition-all duration-300 group-hover:translate-x-1.5 ${dark ? 'text-teal-400' : 'text-teal-600'}`}>
                                        Explore <span className="text-[1.2em]">→</span>
                                    </div>

                                    {/* Neon line at bottom */}
                                    <div className={`mt-4 h-[1px] w-0 group-hover:w-full transition-all duration-500 ${dark ? 'bg-gradient-to-r from-teal-400/0 via-teal-400/60 to-teal-400/0' : 'bg-gradient-to-r from-teal-600/0 via-teal-600/40 to-teal-600/0'}`} />
                                </FxHoloCard>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/*  -  -  CTA  -  -  */}
            <section className={`relative overflow-hidden py-28 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center ${dark ? 'bg-black/40' : 'bg-teal-950'} text-white`}>
                <FxBackground day={false} grid aurora className="opacity-60" />
                <div className="gx-scanline pointer-events-none" />
                <div className="relative z-10">
                    <FxReveal>
                        <FxChip day={false} className="mb-6">Get Started</FxChip>
                        <FxGlitchText tag="h2" className="text-[2.5em] md:text-[3.5em] font-[800] leading-[1.1] tracking-tight mb-6">
                            Ready to Transform<br />
                            <span className="gx-gradient-text">Your Business?</span>
                        </FxGlitchText>
                        <p className="text-white/60 max-w-xl mx-auto mb-10 text-[0.95em] leading-relaxed">
                            Let&apos;s discuss which service is right for your project and build something extraordinary together.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <FxButton day={false} href="/quote-request" variant="solid">Get a Quote</FxButton>
                            <FxButton day={false} href="/contact" variant="ghost">Talk to Us</FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>
        </main>
    );
}
