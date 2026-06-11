'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import '../app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';
import {
    FaWhatsapp,
    FaEnvelope,
    FaTicketAlt,
    FaQuestionCircle,
    FaBook,
    FaPhoneAlt,
    FaChevronDown,
} from 'react-icons/fa';

const fadeUp: { transition: Transition } = {
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]},
};

interface SupportFaq {
    q: string;
    a: string;
}

const FAQS: SupportFaq[] = [
    {
        q: 'How do I report a problem or raise a support ticket?',
        a: 'Use the contact form, email us at hello@greyinfotech.com.ng, or message us on WhatsApp. Include your project name and a clear description of the issue, and our team will create a ticket and respond promptly.',
    },
    {
        q: 'What are your support hours?',
        a: 'Our team is available Monday to Friday, 9:00am – 6:00pm (WAT). For urgent issues on active projects with a support agreement, we offer extended and priority response.',
    },
    {
        q: 'How quickly will I get a response?',
        a: 'We aim to acknowledge new requests within one business day. Priority and critical issues for clients on a support plan are handled faster, according to your agreed service levels.',
    },
    {
        q: 'Do you offer ongoing maintenance and support plans?',
        a: 'Yes. We provide flexible maintenance and support retainers covering updates, monitoring, bug fixes and improvements. Contact us to discuss a plan that fits your product.',
    },
    {
        q: 'I have a new project, not a support issue. Where do I start?',
        a: 'Head to our contact page or request a quote. Tell us about your idea and goals, and we will schedule a discovery call to map out the right approach.',
    },
];

const Support: React.FC = () => {
    const whatsappNumber = '2348028095571';
    const whatsappMessage = "Hello Grey InfoTech, I need support with my project.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const [isDayTime, setIsDayTime] = useState<boolean>(() => {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 18;
    });

    useEffect(() => {
        const id = setInterval(() => {
            const hour = new Date().getHours();
            setIsDayTime(prev => {
                const next = hour >= 6 && hour < 18;
                return prev === next ? prev : next;
            });
        }, 60_000);
        return () => clearInterval(id);
    }, []);

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const channels = [
        {
            icon: <FaWhatsapp className="text-2xl"/>,
            title: 'WhatsApp',
            desc: 'Chat with our team in real time for quick questions and updates.',
            cta: 'Message us',
            href: whatsappUrl,
            external: true,
        },
        {
            icon: <FaEnvelope className="text-2xl"/>,
            title: 'Email Support',
            desc: 'Send us a detailed message and we’ll get back within one business day.',
            cta: 'hello@greyinfotech.com.ng',
            href: 'mailto:hello@greyinfotech.com.ng',
            external: true,
        },
        {
            icon: <FaTicketAlt className="text-2xl"/>,
            title: 'Raise a Ticket',
            desc: 'Report an issue or request through our contact form to open a ticket.',
            cta: 'Open a ticket',
            href: '/contact',
            external: false,
        },
        {
            icon: <FaPhoneAlt className="text-2xl"/>,
            title: 'Call Us',
            desc: 'Speak directly with our team during business hours (WAT).',
            cta: '+234 802 809 5571',
            href: 'tel:+2348028095571',
            external: true,
        },
    ];

    const heroBg = isDayTime ? 'from-gray-900 to-gray-800' : 'from-black to-gray-900';

    return (
        <div className="bg-gray-100 text-black min-h-screen flex flex-col">
            <Header/>

            {/* Hero */}
            <section className={`relative bg-gradient-to-br ${heroBg} text-white`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-20 md:py-28">
                    <motion.div
                        initial={{opacity: 0, y: 28}}
                        animate={{opacity: 1, y: 0}}
                        {...fadeUp}
                        className="max-w-3xl"
                    >
                        <span className="inline-block text-sm uppercase tracking-widest text-gray-300 mb-4">
                            Support Centre
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight">
                            We’re here to help
                        </h1>
                        <p className="text-base sm:text-lg text-gray-300">
                            Get support for your project, report an issue, or find answers to common
                            questions. Choose the channel that works best for you.
                        </p>
                    </motion.div>
                </div>
            </section>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-14 md:py-20">
                {/* Support channels */}
                <motion.div
                    initial={{opacity: 0, y: 28}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    {...fadeUp}
                    className="mb-12 text-center md:text-left"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">How can we help you?</h2>
                    <p className="text-base sm:text-lg text-gray-600">
                        Reach our team through any of these channels.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {channels.map((c, i) => {
                        const inner = (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-4">
                                    {c.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-1">{c.desc}</p>
                                <span className="text-sm font-medium text-gray-900 underline underline-offset-4">
                                    {c.cta}
                                </span>
                            </>
                        );
                        const cls =
                            'bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full';
                        return (
                            <motion.div
                                key={c.title}
                                initial={{opacity: 0, y: 24}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.2}}
                                transition={{duration: 0.5, delay: i * 0.08}}
                            >
                                {c.external ? (
                                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>
                                        {inner}
                                    </a>
                                ) : (
                                    <Link href={c.href} className={cls}>
                                        {inner}
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Resources */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <Link
                        href="/case-studies"
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4"
                    >
                        <FaBook className="text-2xl text-gray-900 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Case Studies</h3>
                            <p className="text-sm text-gray-600">See how we’ve solved problems for other clients.</p>
                        </div>
                    </Link>
                    <Link
                        href="/blog"
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4"
                    >
                        <FaQuestionCircle className="text-2xl text-gray-900 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Guides & Articles</h3>
                            <p className="text-sm text-gray-600">Tips, insights and how-tos from our team.</p>
                        </div>
                    </Link>
                    <Link
                        href="/quote-request"
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4"
                    >
                        <FaTicketAlt className="text-2xl text-gray-900 mt-1"/>
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Request a Quote</h3>
                            <p className="text-sm text-gray-600">Starting something new? Tell us about it.</p>
                        </div>
                    </Link>
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <motion.h2
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        {...fadeUp}
                        className="text-2xl sm:text-3xl font-bold mb-8 text-center"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="space-y-3">
                        {FAQS.map((faq, i) => {
                            const open = openFaq === i;
                            return (
                                <div
                                    key={faq.q}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                                        aria-expanded={open}
                                    >
                                        <span className="font-medium text-gray-900">{faq.q}</span>
                                        <FaChevronDown
                                            className={`text-gray-500 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    {open && (
                                        <div className="px-5 pb-5 -mt-1 text-sm text-gray-600 leading-relaxed">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{opacity: 0, y: 28}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.2}}
                    {...fadeUp}
                    className="mt-20 bg-gray-900 text-white rounded-3xl px-6 py-12 md:px-12 md:py-16 text-center"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">Still need help?</h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Our team is ready to assist. Reach out and we’ll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <FaTicketAlt/> Contact Support
                        </Link>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <FaWhatsapp/> Chat on WhatsApp
                        </a>
                    </div>
                </motion.div>
            </main>

            <Footer/>
        </div>
    );
};

export default Support;
