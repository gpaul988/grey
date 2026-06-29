'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Layout, Blocks, Brain, Cloud, Megaphone, Palette, Briefcase, Zap, Rocket } from 'lucide-react';
import { useIsDayTime } from '../components/useIsDayTime';
import { FxBackground, FxCard, FxChip, FxSectionHeading, FxButton, FxReveal } from '@/components/futuristic/fx';

const serviceIcons: Record<string, React.ReactNode> = {
    'Web-Development': <Code2 className="w-8 h-8" />,
    'Mobile-Application-Development': <Smartphone className="w-8 h-8" />,
    'backend-development': <Database className="w-8 h-8" />,
    'frontend-development': <Layout className="w-8 h-8" />,
    'blockchain-development': <Blocks className="w-8 h-8" />,
    'ai-development-services': <Brain className="w-8 h-8" />,
    'cloud-solutions': <Cloud className="w-8 h-8" />,
    'digital-marketing': <Megaphone className="w-8 h-8" />,
    'ui-ux-design': <Palette className="w-8 h-8" />,
    'branding': <Briefcase className="w-8 h-8" />,
    'consulting': <Zap className="w-8 h-8" />,
    'MVP': <Rocket className="w-8 h-8" />,
};

export default function ServicesScreen() {
    const isDayTime = useIsDayTime();

    const services = [
        { name: 'Web Development', slug: 'Web-Development', desc: 'Modern, scalable web applications with cutting-edge technologies' },
        { name: 'App Development', slug: 'Mobile-Application-Development', desc: 'Native and cross-platform mobile solutions' },
        { name: 'Backend Development', slug: 'backend-development', desc: 'Robust server-side architecture and APIs' },
        { name: 'Frontend Development', slug: 'frontend-development', desc: 'Beautiful, responsive user interfaces' },
        { name: 'Blockchain Development', slug: 'blockchain-development', desc: 'Secure distributed applications' },
        { name: 'AI Development', slug: 'ai-development-services', desc: 'Machine learning and intelligent systems' },
        { name: 'Cloud Solutions', slug: 'cloud-solutions', desc: 'Scalable cloud infrastructure' },
        { name: 'Digital Marketing', slug: 'digital-marketing', desc: 'Growth-focused marketing strategies' },
        { name: 'UI/UX Design', slug: 'ui-ux-design', desc: 'User-centered design excellence' },
        { name: 'Branding', slug: 'branding', desc: 'Compelling brand identity' },
        { name: 'Consulting', slug: 'consulting', desc: 'Strategic technology guidance' },
        { name: 'MVP Development', slug: 'MVP', desc: 'Fast-track product launches' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <main className={`relative min-h-screen transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
            {/* Background */}
            <FxBackground day={isDayTime} grid aurora className="fixed opacity-[0.04]" />

            <div className="relative z-10">
                {/* ── Hero ── */}
                <section className="pt-32 pb-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center">
                    <FxReveal>
                        <FxChip day={isDayTime} className="mb-6">What we do</FxChip>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                            Our <span className="gx-gradient-text">Services</span>
                        </h1>
                        <p className={`text-lg max-w-2xl mx-auto mb-4 ${isDayTime ? 'text-gray-600' : 'text-gray-400'}`}>
                            Comprehensive software development and digital solutions tailored to accelerate your business growth.
                        </p>
                    </FxReveal>
                </section>

                {/* ── Services grid ── */}
                <section className="px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-24">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((service) => (
                            <motion.div key={service.slug} variants={itemVariants}>
                                <Link href={`/services/${service.slug}`}>
                                    <FxCard day={isDayTime} className="p-8 h-full flex flex-col justify-between group cursor-pointer">
                                        {/* Icon */}
                                        <div className={`mb-6 transition-colors ${isDayTime ? 'text-teal-600 group-hover:text-teal-500' : 'text-teal-400 group-hover:text-teal-300'}`}>
                                            {serviceIcons[service.slug] || <Zap className="w-8 h-8" />}
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-bold mb-3">
                                            {service.name}
                                        </h3>

                                        <p className={`text-sm sm:text-base mb-6 flex-grow ${isDayTime ? 'text-gray-600' : 'text-slate-400'}`}>
                                            {service.desc}
                                        </p>

                                        <div className={`flex items-center gap-2 text-sm font-semibold group-hover:translate-x-2 transition-transform ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>
                                            Learn More <span>→</span>
                                        </div>
                                    </FxCard>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ── CTA ── */}
                <section className={`relative py-24 px-4 sm:px-6 md:px-10 lg:px-[4.5em] text-center overflow-hidden ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <FxBackground day={!isDayTime} grid aurora className="opacity-60" />
                    <div className="relative z-10">
                        <FxReveal>
                            <FxSectionHeading
                                day={!isDayTime}
                                eyebrow="Get started"
                                title="Ready to Transform Your Business?"
                                subtitle="Let's discuss which service is right for your project."
                                align="center"
                                className="mb-10 mx-auto"
                            />
                            <FxButton day={!isDayTime} href="/quote-request">Get a Quote</FxButton>
                        </FxReveal>
                    </div>
                </section>
            </div>
        </main>
    );
}
