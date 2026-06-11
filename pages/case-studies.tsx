import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../app/globals.css';
import Link from 'next/link';

const CaseStudies = () => {
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

    const studies = [
        {
            title: 'Healthcare Platform Transformation',
            challenge: 'Legacy booking flows caused delays and high support volume.',
            approach: 'Redesigned appointment journeys and unified admin tooling.',
            impact: 'Faster patient access and reduced manual processing overhead.'
        },
        {
            title: 'Logistics Dashboard Optimization',
            challenge: 'Fragmented data slowed dispatch and route decision-making.',
            approach: 'Built a single command view for fleet, route, and exceptions.',
            impact: 'Improved visibility and shortened response time for operations teams.'
        },
        {
            title: 'Fintech Product Launch',
            challenge: 'Tight launch window with strict reliability and security requirements.',
            approach: 'Delivered modular architecture with clear release controls.',
            impact: 'Shipped on time with a stable foundation for rapid iteration.'
        },
        {
            title: 'Education Platform Expansion',
            challenge: 'Growth in user volume introduced performance bottlenecks.',
            approach: 'Optimized core flows, caching, and high-traffic content delivery.',
            impact: 'Smoother learning sessions and stronger retention across cohorts.'
        },
    ];

    const featuredStudy = studies[0];

    return (
        <div className={`${isDayTime ? 'bg-white text-black' : 'bg-black text-white'} min-h-screen transition-colors duration-500`}>
            <Header />

            <section className="relative w-full h-[320px] md:h-[380px] lg:h-[800px] overflow-hidden">
                <video
                    src="/assets/fin/hero.mp4"
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
                            Case Studies
                        </h1>
                    </div>
                    <div
                        className={'relative grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 lg:mt-[1em] md:mt-[1em] mt-[0.5em] '}>
                        <div className={'lg:-mr-[4em] md:-mr-[1em] lg:mt-[1em] md:mt-[1em]'}>
                            <p className={'text-[0.87em] font-[300]'}>
                                Real-world challenges, strategic decisions, and outcomes delivered across complex digital projects.
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
                    <p className="text-teal-500 font-semibold uppercase tracking-[0.22em] text-xs mb-4">Case Studies</p>
                    <div className="grid lg:grid-cols-2 gap-8 items-end">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                            How We Solve
                            <br />
                            Real Problems
                        </h1>
                        <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-base md:text-lg leading-relaxed max-w-2xl`}>
                            A closer look at challenges, decisions, and outcomes across digital transformation projects.
                            We focus on clear business impact, not just visual polish.
                        </p>
                    </div>
                </section>

                <section className="mb-12 lg:mb-14">
                    <article className={`rounded-3xl border p-6 lg:p-10 ${
                        isDayTime ? 'bg-teal-50 border-teal-100' : 'bg-zinc-950 border-zinc-800'
                    }`}>
                        <p className="text-xs uppercase tracking-[0.2em] text-teal-500 mb-4">Featured Case</p>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-3xl lg:text-5xl font-semibold leading-[1.08] tracking-tight mb-6">
                                    {featuredStudy.title}
                                </h2>
                                <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm lg:text-base leading-relaxed mb-3`}>
                                    <span className="font-medium">Challenge:</span> {featuredStudy.challenge}
                                </p>
                                <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm lg:text-base leading-relaxed mb-3`}>
                                    <span className="font-medium">Approach:</span> {featuredStudy.approach}
                                </p>
                                <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm lg:text-base leading-relaxed`}>
                                    <span className="font-medium">Impact:</span> {featuredStudy.impact}
                                </p>
                            </div>
                            <div className={`rounded-2xl border p-8 flex items-end ${
                                isDayTime ? 'bg-white border-teal-100' : 'bg-black border-zinc-800'
                            }`}>
                                <Link
                                    href="/contact"
                                    className={`text-sm font-medium underline underline-offset-4 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}
                                >
                                    Discuss your project
                                </Link>
                            </div>
                        </div>
                    </article>
                </section>

                <section className="grid gap-5 md:grid-cols-2">
                    {studies.map((item) => (
                        <article
                            key={item.title}
                            className={`rounded-2xl border p-6 lg:p-7 transition-all duration-300 ${
                                isDayTime
                                    ? 'bg-white border-gray-200 hover:border-teal-300'
                                    : 'bg-zinc-950 border-zinc-800 hover:border-teal-700'
                            }`}
                        >
                            <h2 className="text-xl lg:text-2xl font-semibold mb-4 leading-snug">{item.title}</h2>
                            <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm leading-relaxed mb-2`}>
                                <span className="font-medium">Challenge:</span> {item.challenge}
                            </p>
                            <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm leading-relaxed mb-2`}>
                                <span className="font-medium">Approach:</span> {item.approach}
                            </p>
                            <p className={`${isDayTime ? 'text-gray-700' : 'text-gray-300'} text-sm leading-relaxed`}>
                                <span className="font-medium">Impact:</span> {item.impact}
                            </p>
                        </article>
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CaseStudies;

