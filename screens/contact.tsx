'use client';

import React from 'react';
import '@/app/globals.css';
import ContactFormFields from '@/components/ContactFormFields';
import ContactQuickActions from '@/components/ContactQuickActions';
import ContactBusinessInfo from '@/components/ContactBusinessInfo';
import AIProjectEstimator from '@/components/AIProjectEstimator';
import {motion} from 'framer-motion';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {Mail, Phone, MessageCircle, Clock, MapPin, Zap} from 'lucide-react';
import {useIsDayTime} from '../components/useIsDayTime';
import {
    FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxGlitchText, FxFrame, FxTerminal
} from '@/components/futuristic/fx';

const Contact: React.FC = () => {
    const whatsappNumber = '2348028095571';
    const whatsappMessage = "Hello Grey InfoTech, I'd like to discuss a project and get started.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    const calendlyUrl = 'https://calendly.com/greyinfotech/30min';

    const isDayTime = useIsDayTime();
    const dark = !isDayTime;
    const pageColor = '#7C3AED';

    const quickFacts = [
        {icon: <Clock className="w-5 h-5"/>, label: 'Response Time', value: '< 1 hours'},
        {icon: <MapPin className="w-5 h-5"/>, label: 'HQ Location', value: 'Port Harcourt, NG'},
        {icon: <Zap className="w-5 h-5"/>, label: 'Project Start', value: 'Within 1 week'},
    ];

    const terminalLines = [
        '> connecting to grey-infotech.com...',
        '> establishing secure channel ✓',
        '> loading contact protocols...',
        '> channels: WhatsApp, Email, Calendly, Form',
        '> avg response time: < 2 hours',
        '> status: ONLINE  - ready for your message',
    ];

    return (
        <div
            className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-[#040b14] text-white' : 'bg-white text-black'}`}
            style={{['--page-color' as any]: pageColor}}>

            {/*  -  -  Split-screen Hero  -  -  */}
            <section className={`relative overflow-hidden min-h-[78vh] flex flex-col lg:flex-row`}>
                {/* Left panel  - dark FX side */}
                <div
                    className="relative flex-1 min-h-[50vh] lg:min-h-full flex flex-col justify-end bg-[#020c18] overflow-hidden">
                    <FxBackground day={false} grid aurora className="opacity-70"/>
                    <div className="gx-scanline pointer-events-none"/>
                    <div className="gx-hero-scan"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit pointer-events-none absolute"
                         style={{width: '80vmax', height: '80vmax', top: '-30vmax', right: '-20vmax', opacity: .15}}/>

                    <div className="relative z-10 px-8 md:px-12 lg:px-16 pb-12 pt-24 lg:pt-0">
                        <FxReveal>
                            <FxChip day={false} className="mb-6" style={{color: 'var(--page-color)'}}>Get in Touch</FxChip>
                            <FxGlitchText tag="h1" className="gx-hero-title text-white mb-6">
                                Let&apos;s Build<br/>
                                <span className="gx-gradient-text" style={{color: 'var(--page-color)'}}>Something Great</span>
                            </FxGlitchText>
                            <p className="text-white/60 text-[0.95em] leading-relaxed max-w-sm mb-8">
                                Whether you have a project in mind, a business challenge to solve, or just want to
                                explore what&apos;s possible - we&apos;re ready to listen.
                            </p>
                            <div className="space-y-3">
                                {quickFacts.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div style={{color: 'var(--page-color)'}}>{f.icon}</div>
                                        <div>
                                            <div
                                                className="text-white/40 text-[0.65em] uppercase tracking-wider">{f.label}</div>
                                            <div className="text-white/90 text-[0.88em] font-[600]">{f.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FxReveal>
                    </div>
                </div>

                {/* Right panel  - terminal */}
                <div
                    className={`relative flex-1 flex flex-col justify-center items-center px-8 md:px-12 lg:px-14 py-16 ${dark ? 'bg-[#050e1a]' : 'bg-gray-900'} overflow-hidden`}>
                    {/* Subtle neon border */}
                    <div
                        className="absolute left-0 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-teal-500/50 to-transparent"/>
                    <FxReveal delay={0.15} className="w-full max-w-md">
                        <FxTerminal day={isDayTime} lines={terminalLines} className="w-full mb-8"/>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <FxButton day={false} href={whatsappUrl} variant="solid">
                                <MessageCircle className="w-4 h-4 mr-2 inline"/> WhatsApp
                            </FxButton>
                            <FxButton day={false} href={calendlyUrl} variant="ghost">
                                Book a Call
                            </FxButton>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/*  -  -  Intro  -  -  */}
            <section
                className={`pt-16 transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
                <FxBackground day={isDayTime}/>
                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={isDayTime} style={{color: 'var(--page-color)'}}>GET IN TOUCH</FxChip>
                    </div>
                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] lg:mt-[0.01em] rounded-none lg:tracking-normal tracking-tight leading-[1.3] lg:pb-10 pb-6">
                                Let's<br/><span className="gx-gradient-text" style={{color: 'var(--page-color)'}}>Connect</span>
                            </h3>
                        </FxReveal>
                        <FxReveal delay={0.1}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[0.873em] tracking-normal leading-[1.5]">
                                <div><p>Have a project in mind? We'd love to hear from you. Whether you're looking to
                                    start something new, scale an existing platform, or need strategic guidance, our
                                    team is ready to collaborate.</p></div>
                                <div><p>Reach out through any channel below. We respond within 2 hours and are committed
                                    to understanding your needs and delivering exceptional results.</p></div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/*  -  -  Quick Actions  -  -  */}
            <section
                className={`relative z-10 py-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#040b14]' : 'bg-gray-50'}`}>
                <div className="max-w-[90rem] mx-auto">
                    <FxReveal className="mb-10">
                        <FxChip day={isDayTime} className="mb-4" style={{color: 'var(--page-color)'}}>Fast Channels</FxChip>
                        <h2 className={`text-[1.8em] md:text-[2.2em] font-[700] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                            Reach us your way
                        </h2>
                    </FxReveal>
                    <ContactQuickActions whatsappUrl={whatsappUrl} calendlyUrl={calendlyUrl}/>
                </div>
            </section>

            {/*  -  -  Contact Form + Business Info  -  -  */}
            <section
                className={`relative z-10 py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#020c18]' : 'bg-white'}`}>
                <FxBackground day={isDayTime} grid={false} aurora={true} className="opacity-15"/>
                <div className="max-w-[90rem] mx-auto relative z-10">
                    <FxReveal className="mb-12">
                        <FxChip day={isDayTime} className="mb-4" style={{color: 'var(--page-color)'}}>Send a Message</FxChip>
                        <h2 className={`text-[1.8em] md:text-[2.4em] font-[700] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                            Drop us a line -<br/>
                            <span className="gx-gradient-text" style={{color: 'var(--page-color)'}}>we respond within hours.</span>
                        </h2>
                    </FxReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                        {/* Form */}
                        <motion.div
                            initial={{opacity: 0, y: 28}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}
                        >
                            <FxHoloCard day={isDayTime} className="p-8">
                                <ContactFormFields/>
                            </FxHoloCard>
                        </motion.div>

                        {/* Business info */}
                        <div>
                            <ContactBusinessInfo/>
                        </div>
                    </div>
                </div>
            </section>

            {/*  -  -  AI Estimator  -  -  */}
            <section
                className={`relative py-20 px-4 sm:px-6 md:px-10 lg:px-[4.5em] overflow-hidden ${dark ? 'bg-[#040b14]' : 'bg-gray-50'}`}>
                <FxBackground day={isDayTime} grid aurora={false} className="opacity-20"/>
                <div className="relative z-10 max-w-[90rem] mx-auto">
                    <FxReveal className="mb-10">
                        <FxChip day={isDayTime} className="mb-4" style={{color: 'var(--page-color)'}}>AI-Powered</FxChip>
                        <h2 className={`text-[1.8em] md:text-[2.4em] font-[700] tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>
                            Project Cost <span className="gx-gradient-text" style={{color: 'var(--page-color)'}}>Estimator</span>
                        </h2>
                        <p className={`text-[0.9em] mt-3 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Get an instant AI-generated ballpark for your project before we even talk.
                        </p>
                    </FxReveal>
                    <FxHoloCard day={isDayTime} className="p-8">
                        <AIProjectEstimator/>
                    </FxHoloCard>
                </div>
            </section>

            {/*  -  -  Map  -  -  */}
            <section
                className={`relative py-16 px-4 sm:px-6 md:px-10 lg:px-[4.5em] ${dark ? 'bg-[#020c18]' : 'bg-white'}`}>
                <div className="max-w-[90rem] mx-auto">
                    <FxReveal className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5" style={{color: 'var(--page-color)'}}/>
                            <h3 className={`text-[1.2em] font-[700] ${dark ? 'text-white' : 'text-gray-900'}`}>
                                Find Us - Port Harcourt, Nigeria
                            </h3>
                        </div>
                    </FxReveal>
                    <FxHoloCard day={isDayTime} className="overflow-hidden p-0">
                        <div className="w-full aspect-video">
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
                    </FxHoloCard>
                </div>
            </section>
        </div>
    );
};

export default Contact;

