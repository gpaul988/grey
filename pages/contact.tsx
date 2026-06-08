'use client';

import React, {useEffect, useState} from 'react';
import '../app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactFormFields from '@/components/ContactFormFields';
import ContactHeroSection from '@/components/ContactHeroSection';
import ContactQuickActions from '@/components/ContactQuickActions';
import ContactBusinessInfo from '@/components/ContactBusinessInfo';
import {motion} from 'framer-motion';
import type {Transition} from 'framer-motion';
import {FaMapMarkerAlt} from 'react-icons/fa';
import AIProjectEstimator from "@/components/AIProjectEstimator";

const fadeUp: { transition: Transition } = {
    transition: {duration: 0.6, ease: [0.22, 1, 0.36, 1]}
};

const Contact: React.FC = () => {
    const whatsappNumber = '2348028095571';
    const whatsappMessage = "Hello Grey InfoTech, I'd like to discuss a project and get started.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

    // Replace it with your real Calendly link
    const calendlyUrl = 'https://calendly.com/greyinfotech/30min';

    return (
        <div className="bg-gray-100 text-black min-h-screen flex flex-col">
            <Header/>

            {/* Video Header */}
            <ContactHeroSection videoSrc="/assets/header/contact.mp4"/>

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pb-1">
                {/* Header Section */}
                <motion.div
                    initial={{opacity: 0, y: 28}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, amount: 0.25}}
                    {...fadeUp}
                    className="mb-10 text-center md:text-left"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        Have a project in mind, a business idea, or a challenge you&apos;d like to solve?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600">
                        Reach us quickly by WhatsApp, Calendly, live chat, or the contact form below.
                    </p>
                </motion.div>

                {/* Quick Action Cards */}
                <ContactQuickActions whatsappUrl={whatsappUrl} calendlyUrl={calendlyUrl}/>

                {/* Main Content: Form + Business Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    {/* Contact Form */}
                    <motion.section
                        initial={{opacity: 0, y: 28}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.25}}
                        {...fadeUp}
                        className="order-2 lg:order-1"
                    >
                        <ContactFormFields/>
                    </motion.section>

                    {/* Contact Details */}
                    <ContactBusinessInfo/>
                </div>

                <div
                    className={`relative mt-4 
                    py-14 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${
                        isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                    }`}
                >
                    <AIProjectEstimator/>
                </div>
            </main>

            {/* Google Maps at Bottom */}
            <motion.div
                initial={{opacity: 0, y: 28}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.25}}
                {...fadeUp}
                className="mt-6 bg-white rounded-4xl shadow-lg border border-gray-100 overflow-hidden mx-auto max-w-full w-full h-auto"
            >
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <FaMapMarkerAlt className="text-teal-600"/>
                    <h3 className="text-xl font-bold">Google Maps</h3>
                </div>
                <div className="w-full aspect-16/10">
                    <iframe
                        title="Grey InfoTech location"
                        src="https://www.google.com/maps?q=Grey%20InfoTech%20Port%20Harcourt&output=embed"
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    />
                </div>
            </motion.div>
            <Footer/>
        </div>
    );
};

export default Contact;