'use client';
import React, {useEffect, useState} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import Link from 'next/link';

const Portfolio = () => {
    const [isDayTime, setIsDayTime] = useState(true);

    useEffect(() => {
        const updateThemeByTime = () => {
            const hour = new Date().getHours();
            setIsDayTime(hour >= 6 && hour < 18);
        };

        updateThemeByTime();
        const intervalId = setInterval(updateThemeByTime, 60_000);
        return () => clearInterval(intervalId);
    }, []);

    const works = [
        {
            title: 'SaaS Analytics Platform',
            category: 'Web Platform',
            impact: 'Reduced reporting time by 62% with unified data dashboards.',
        },
        {
            title: 'E-commerce Conversion Revamp',
            category: 'Commerce',
            impact: 'Improved checkout completion through UX simplification and speed gains.',
        },
        {
            title: 'Enterprise Client Portal',
            category: 'B2B Product',
            impact: 'Digitized support workflows and lowered response time for key accounts.',
        },
        {
            title: 'Healthcare Booking Experience',
            category: 'HealthTech',
            impact: 'Streamlined appointment journeys across patient, clinic, and admin views.',
        },
        {
            title: 'Operations Command Dashboard',
            category: 'Internal Tools',
            impact: 'Centralized alerts and decision data for faster day-to-day execution.',
        },
        {
            title: 'Product Discovery Microsite',
            category: 'Brand + Web',
            impact: 'Accelerated lead capture with focused messaging and modular storytelling.',
        },
    ];

    const featuredWork = works[0];

    return (
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>
            {/* Header now provided globally by app/layout.tsx — duplicate render disabled to fix doubled header */ false && <Header />}

            <section className="relative w-full h-[320px] md:h-[380px] lg:h-[800px] overflow-hidden">
                <video
                    src="/assets/digital/Hero-P.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className={`absolute top-14 left-0 w-full h-full flex flex-col justify-center items-start text-start lg:max-w-[90em] px-4 sm:px-6 md:px-10 lg:px-[4.5em] xl:px-[4.5em] 2xl:px-[4.5em] ${
                        isDayTime ? 'text-white' : 'text-white'}`}>
                    <div
                        className="flex flex-col justify-start items-start border-b pb-[1.5em] border-gray-500/50 max-w-full w-full mx-auto ">
                        <h1
                            className={`px-0 constant-text lg:text-[5.35em] md:text-[4.4em] sm:text-[3.5em] text-[2em] lg:mt-[3em] md:mt-[3em] mt-[4em] w-auto h-auto leading-[1.2] pb-[0.08em] font-[600]`}>
                            Our Portfolio
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                A showcase of digital products and platforms designed to drive growth and measurable business impact.
                            </p>
                        </div>
                        <div
                            className={'relative grid lg:grid-cols-3 lg:gap-8 lg:ml-[13em]'}>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>8+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Years Experience</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>13+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Team Members</p>
                            </div>
                            <div className={'border-0 lg:block md:hidden sm:hidden hidden'}>
                                <h6 className={'text-[3em] font-[500] -mb-[0.3em] justify-center'}>123+</h6>
                                <p className={'text-[0.7em] font-[300]'}>Products Launched</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20 lg:py-24">
                <section className="border-b border-teal-600/20 pb-12 lg:pb-16 mb-10">
                    <p className="text-teal-500 font-semibold uppercase tracking-[0.22em] text-xs mb-4">Portfolio</p>
                    <div className="grid lg:grid-cols-2 gap-8 items-end">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                            Selected Work
                            <br />
                            Built for Growth
                        </h1>
                        <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-base md:text-lg leading-relaxed max-w-2xl`}>
                            A selection of digital products, platforms, and business-critical experiences we have designed
                            and delivered with measurable impact.
                        </p>
                    </div>
                </section>

                <section className="mb-12 lg:mb-14">
                    <article className={`rounded-3xl border p-6 lg:p-10 ${
                        isDayTime ? 'bg-teal-50 border-teal-100' : 'bg-zinc-950 border-zinc-800'
                    }`}>
                        <p className="text-xs uppercase tracking-[0.2em] text-teal-500 mb-4">Featured Work</p>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <span className={`inline-flex text-xs font-semibold rounded-full px-3 py-1 mb-5 ${
                                    isDayTime ? 'bg-teal-100 text-teal-700' : 'bg-teal-900/40 text-teal-200'
                                }`}>
                                    {featuredWork.category}
                                </span>
                                <h2 className="text-3xl lg:text-5xl font-semibold leading-[1.08] tracking-tight mb-4">
                                    {featuredWork.title}
                                </h2>
                                <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-base leading-relaxed`}>
                                    {featuredWork.impact}
                                </p>
                            </div>
                            <div className={`rounded-2xl border p-8 flex flex-col justify-between ${
                                isDayTime ? 'bg-white border-teal-100' : 'bg-black border-zinc-800'
                            }`}>
                                <p className={`${isDayTime ? 'text-gray-600' : 'text-gray-300'} text-sm leading-relaxed mb-5`}>
                                    Every engagement focuses on outcomes: improved efficiency, stronger conversion, and
                                    systems teams can scale confidently.
                                </p>
                                <Link
                                    href="/contact"
                                    className={`text-sm font-medium underline underline-offset-4 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}
                                >
                                    Start a project
                                </Link>
                            </div>
                        </div>
                    </article>
                </section>

                <section>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 lg:mb-8">More Work</h3>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {works.map((item) => (
                            <article
                                key={item.title}
                                className={`rounded-2xl border p-6 transition-all duration-300 ${
                                    isDayTime
                                        ? 'bg-white border-gray-200 hover:border-teal-300'
                                        : 'bg-zinc-950 border-zinc-800 hover:border-teal-700'
                                }`}
                            >
                                <span className={`inline-flex rounded-full text-xs font-semibold px-3 py-1 mb-4 ${
                                    isDayTime ? 'bg-teal-100 text-teal-700' : 'bg-teal-900/40 text-teal-200'
                                }`}>
                                    {item.category}
                                </span>
                                <h2 className="text-xl font-semibold leading-snug mb-3">{item.title}</h2>
                                <p className={`${isDayTime ? 'text-gray-600' : 'text-gray-300'} text-sm leading-relaxed`}>
                                    {item.impact}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
            {/* Footer now provided globally by app/layout.tsx — duplicate render disabled to fix doubled footer */ false && <Footer />}
        </div>
    );
};

export default Portfolio;