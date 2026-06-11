'use client';

import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import AIProjectEstimator from "@/components/AIProjectEstimator";

// ─── Static data (mirrors the listing page) ──────────────────────────────────
const STATIC_STUDIES = [
    {
        id: 's1',
        slug: 'healthcare-platform-transformation',
        title: 'Healthcare Platform Transformation',
        client: 'MediConnect NG',
        industry: 'Healthcare',
        services: ['Product Strategy', 'UX Design', 'Web Development'],
        tagline: 'From broken booking to a seamless patient journey — in 10 weeks.',
        summary: 'Redesigned a legacy patient booking system that was causing high support volume and drop-off at key registration steps.',
        image: '/assets/services/digital-transformatio.jpg',
        heroImage: '/assets/services/digital-transformatio.jpg',
        results: '+62% booking completion · −40% support tickets',
        website: null,
        body: `MediConnect NG had been struggling with an aging booking platform built six years earlier. Patients routinely abandoned the registration flow; support staff were handling 300+ manual bookings per week.\n\nOur engagement began with a two-week discovery phase — user interviews, session recordings, and a full audit of the existing flow. We found three critical drop-off points: an overly long registration form, a confusing time-slot picker, and a lack of SMS confirmation.\n\nWe proposed a phased redesign: Phase 1 simplified the booking journey to three steps. Phase 2 introduced real-time availability and SMS confirmations via Termii. Phase 3 unified the admin scheduling interface.`,
        sections: [
            {
                title: 'Discovery & Research',
                body: 'We conducted 14 user interviews and analysed six months of session recordings. The biggest pain point wasn\'t the form length — it was uncertainty. Users didn\'t trust that their booking had actually been recorded, leading to duplicate submissions and phone calls to confirm.',
                image: '/assets/ui-ux/stages/testing.jpg',
                caption: 'User testing sessions at MediConnect HQ, Lagos'
            },
            {
                title: 'Design & Prototyping',
                body: 'We moved from a 12-field form to a progressive 3-step flow, introducing inline validation and a prominent confirmation modal. Every interaction was prototyped and tested before a single line of code was written.',
                image: '/assets/ui-ux/hero.jpg',
                caption: 'High-fidelity prototype — booking step 2 of 3'
            },
            {
                title: 'Development & Launch',
                body: 'The frontend was rebuilt in Next.js with a Laravel API backend. We deployed to a managed cloud environment, integrated Termii for SMS, and ran a two-week parallel test before full cutover.',
                image: null,
                caption: null
            },
        ],
        resultsList: ['+62% booking completion rate', '−40% inbound support volume', '−80% duplicate submissions', '300+ manual bookings per week eliminated'],
    },
    {
        id: 's2',
        slug: 'logistics-dashboard-optimization',
        title: 'Logistics Dashboard Optimization',
        client: 'FleetEdge Nigeria',
        industry: 'Logistics',
        services: ['Dashboard Design', 'React Development', 'Data Integration'],
        tagline: 'One screen, every vehicle, every route — in real time.',
        summary: 'Consolidated fragmented fleet data into a single real-time command centre for dispatch teams managing 200+ vehicles.',
        image: '/assets/services/services.jpg',
        heroImage: '/assets/services/services.jpg',
        results: '3× faster dispatch · Real-time visibility across 200+ vehicles',
        website: null,
        body: `FleetEdge's dispatch team was managing operations across five separate tools: a legacy GPS portal, a WhatsApp group for driver updates, a shared spreadsheet for job assignments, and two separate systems for invoicing and fuel tracking.\n\nThis fragmentation meant decisions were slow and errors were common. Our brief was simple: build one dashboard that surfaces everything dispatch needs to make a decision in under 30 seconds.`,
        sections: [
            {
                title: 'Problem Mapping',
                body: 'We shadowed dispatch operators for three days and mapped every workflow step. The critical insight: 70% of decision latency came from switching between tools, not from the decisions themselves.',
                image: '/assets/services/Research-strategy.jpg',
                caption: 'Workflow mapping session with dispatch team'
            },
            {
                title: 'Unified Data Layer',
                body: 'We built an integration layer that pulled live GPS data, driver status, job queue, and fuel levels into a single normalized API. The React frontend subscribed via WebSocket for real-time updates.',
                image: null,
                caption: null
            },
        ],
        resultsList: ['3× faster dispatch decision time', 'Real-time visibility across 200+ vehicles', '−55% phone calls between dispatch and drivers', 'Full route + fuel audit trail'],
    },
    {
        id: 's3',
        slug: 'fintech-product-launch',
        title: 'Fintech Product Launch',
        client: 'PayLink Africa',
        industry: 'Fintech',
        services: ['Architecture Design', 'Backend Development', 'DevOps'],
        tagline: 'Zero to compliant, zero to live — in 14 weeks.',
        summary: 'Delivered a modular, PCI-compliant payments platform from concept to production in 14 weeks with zero launch-day downtime.',
        image: '/assets/startup/market.jpg',
        heroImage: '/assets/startup/market.jpg',
        results: 'Launched on schedule · Zero downtime in first 90 days',
        website: null,
        body: `PayLink needed to launch before a competitor entered the Nigerian SME payments market. They had a seed round, a product vision, and a 14-week runway before their investor update.\n\nWe joined as a full delivery partner — architecture, backend, DevOps, and QA. We made the deliberate choice to start with a narrower feature set and build it exceptionally well, rather than ship a broad but fragile product.`,
        sections: [
            {
                title: 'Architecture Decisions',
                body: 'We chose a modular monolith over microservices for the initial launch — faster to ship, easier to debug, and straightforward to decompose later. Paystack and Flutterwave integrations were wrapped behind a unified payment abstraction layer.',
                image: '/assets/node/hero.jpg',
                caption: null
            },
            {
                title: 'Reliability Engineering',
                body: 'Every critical path had automated integration tests. We ran load tests simulating 10× expected launch traffic before go-live. The first 90 days saw zero unplanned downtime.',
                image: null,
                caption: null
            },
        ],
        resultsList: ['Launched on schedule (14 weeks)', 'Zero unplanned downtime in first 90 days', 'Paystack + Flutterwave live on day one', 'Passed independent security audit'],
    },
    {
        id: 's4',
        slug: 'education-platform-expansion',
        title: 'Education Platform Expansion',
        client: 'EduPath',
        industry: 'EdTech',
        services: ['Performance Engineering', 'CDN Strategy', 'Caching Architecture'],
        tagline: 'Scaled to 10× traffic without touching the product team.',
        summary: 'Scaled a growing EdTech platform to handle 10× traffic spikes with no degradation in user experience.',
        image: '/assets/ui-ux/hero.jpg',
        heroImage: '/assets/ui-ux/hero.jpg',
        results: '91% faster page loads · 4× user retention uplift',
        website: null,
        body: `EduPath was growing fast — cohort sizes had tripled in eight months. But their infrastructure hadn't kept up. During peak lesson times, pages took 12–18 seconds to load and video delivery was unreliable.\n\nOur engagement was pure infrastructure and performance work, with no changes to the product itself. We audited every layer of the stack and implemented fixes in order of impact.`,
        sections: [
            {
                title: 'Audit & Triage',
                body: 'The first week was entirely diagnostic. We profiled N+1 queries, identified render-blocking resources, and found a misconfigured CDN that was bypassing cache on 90% of requests. Three fixes in week one reduced median page load from 14s to 4s.',
                image: '/assets/seo/hero.jpg',
                caption: 'Performance waterfall before (top) and after (bottom)'
            },
            {
                title: 'CDN & Caching Architecture',
                body: 'We restructured the CDN configuration to separate static assets, user-specific content, and video delivery into different cache policies. Video was moved to adaptive bitrate streaming with regional edge nodes.',
                image: null,
                caption: null
            },
        ],
        resultsList: ['91% reduction in median page load time (14s → 1.2s)', '4× improvement in 30-day user retention', 'CDN cache hit rate improved from 12% to 94%', 'Zero performance incidents in subsequent quarter'],
    },
    {
        id: 's5',
        slug: 'enterprise-saas-rebrand',
        title: 'Enterprise SaaS Rebrand & Website',
        client: 'Novaflow Systems',
        industry: 'SaaS',
        services: ['Brand Strategy', 'Web Design', 'Copywriting'],
        tagline: 'A rebrand built to close enterprise deals, not just look good.',
        summary: 'Full brand overhaul and website rebuild for a B2B SaaS company ahead of a Series A fundraise.',
        image: '/assets/services/services.jpg',
        heroImage: '/assets/services/services.jpg',
        results: '+180% qualified leads · Series A closed within 6 months',
        website: null,
        body: `Novaflow's product had matured but their brand hadn't. Competitors with fewer features were winning deals because they looked more enterprise-ready. The company had 8 weeks before a major industry conference that would serve as the unofficial Series A launch.\n\nWe ran a compressed brand sprint: competitor audit, positioning workshop, messaging framework, and visual identity — all in week one. The following six weeks were design and build.`,
        sections: [
            {
                title: 'Positioning & Messaging',
                body: 'The key insight from the positioning workshop: Novaflow\'s real differentiator wasn\'t features, it was implementation speed. Competitors averaged 6-month deployments; Novaflow averaged 6 weeks. We rebuilt every message around that proof point.',
                image: '/assets/services/digital-branding.png',
                caption: 'Brand positioning workshop output'
            },
            {
                title: 'Website Design & Build',
                body: 'We designed and built the site in Next.js with Sanity CMS, optimised for enterprise buyer journeys — longer consideration cycles, multiple stakeholders, and a heavy emphasis on social proof.',
                image: null,
                caption: null
            },
        ],
        resultsList: ['+180% qualified inbound leads (3-month comparison)', 'Series A closed within 6 months of launch', 'Average deal size increased by 40%', 'Conference booth led to 3 enterprise pilots'],
    },
];

export default function CaseStudyDetail() {
    const router = useRouter();
    const {slug} = router.query;
    const [isDayTime, setIsDayTime] = useState(true);

    useEffect(() => {
        const update = () => {
            const h = new Date().getHours();
            setIsDayTime(h >= 6 && h < 18);
        };
        update();
        const id = setInterval(update, 60_000);
        return () => clearInterval(id);
    }, []);

    const study = STATIC_STUDIES.find(s => s.slug === slug);
    const related = STATIC_STUDIES.filter(s => s.slug !== slug).slice(0, 3);

    const bg = isDayTime ? 'bg-white text-black' : 'bg-black text-white';

    if (!study) {
        return (
            <div className={`${bg} min-h-screen`}>
                <Header/>
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em] py-20">
                    <p className={isDayTime ? 'text-gray-600' : 'text-gray-400'}>Loading…</p>
                </div>
                <Footer/>
            </div>
        );
    }

    return (
        <div className={`${bg} min-h-screen transition-colors duration-500`}>
            <Header/>

            {/* ── Hero ── */}
            <section className="relative w-full aspect-[16/7] max-h-[720px] overflow-hidden">
                <Image src={study.heroImage} alt={study.title} fill className="object-cover" priority sizes="100vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10"/>
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 lg:px-[4.5em] pb-10 md:pb-14">
                    <span
                        className={`text-xs font-semibold uppercase tracking-widest text-teal-400 mb-3 block`}>{study.industry}</span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
                        {study.title}
                    </h1>
                </div>
            </section>

            <main className="mx-auto max-w-[100rem] px-4 sm:px-6 md:px-10 lg:px-[4.5em]">

                {/* ── Project meta bar ── */}
                <section
                    className={`py-8 border-b grid grid-cols-2 md:grid-cols-4 gap-6 ${isDayTime ? 'border-gray-200' : 'border-zinc-800'}`}>
                    <div>
                        <p className={`text-xs uppercase tracking-widest mb-1.5 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Client</p>
                        <p className="text-sm font-semibold">{study.client}</p>
                    </div>
                    <div>
                        <p className={`text-xs uppercase tracking-widest mb-1.5 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Industry</p>
                        <p className="text-sm font-semibold">{study.industry}</p>
                    </div>
                    <div className="col-span-2">
                        <p className={`text-xs uppercase tracking-widest mb-1.5 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Services</p>
                        <div className="flex flex-wrap gap-2">
                            {study.services.map(s => (
                                <span key={s}
                                      className={`text-xs px-2.5 py-1 rounded-full border ${isDayTime ? 'border-gray-200 text-gray-600' : 'border-zinc-700 text-gray-300'}`}>{s}</span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Content + Sidebar ── */}
                <section
                    className="py-14 md:py-20 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_300px] gap-16 items-start">

                    {/* Main content */}
                    <article>
                        {/* Tagline */}
                        {study.tagline && (
                            <p className={`text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-10 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                "{study.tagline}"
                            </p>
                        )}

                        {/* Intro paragraphs */}
                        <div className={`space-y-5 mb-14 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                            {study.body.split('\n\n').map((p, i) => (
                                <p key={i}
                                   className={`leading-relaxed ${i === 0 ? 'text-lg md:text-xl text-gray-800' : 'text-base md:text-lg'}`}>{p}</p>
                            ))}
                        </div>

                        {/* Sections */}
                        {study.sections.map((section, i) => (
                            <div key={i}
                                 className={`mb-16 pb-16 ${i < study.sections.length - 1 ? `border-b ${isDayTime ? 'border-gray-100' : 'border-zinc-800'}` : ''}`}>
                                <h2 className={`text-2xl md:text-3xl font-semibold mb-5 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                    {section.title}
                                </h2>
                                <p className={`text-base md:text-lg leading-relaxed mb-6 ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {section.body}
                                </p>
                                {section.image && (
                                    <figure className="rounded-2xl overflow-hidden">
                                        <div className="relative w-full aspect-[16/9]">
                                            <Image src={section.image} alt={section.title} fill className="object-cover"
                                                   sizes="(max-width:1024px) 100vw, 70vw"/>
                                        </div>
                                        {section.caption && (
                                            <figcaption
                                                className={`text-xs mt-3 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>{section.caption}</figcaption>
                                        )}
                                    </figure>
                                )}
                            </div>
                        ))}
                    </article>

                    {/* Sidebar */}
                    <aside className="xl:sticky xl:top-24 self-start space-y-6">
                        {/* Results */}
                        {study.resultsList.length > 0 && (
                            <div
                                className={`rounded-2xl border p-6 ${isDayTime ? 'bg-teal-50 border-teal-100' : 'bg-teal-900/10 border-teal-800/30'}`}>
                                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>Outcomes</p>
                                <ul className="space-y-3">
                                    {study.resultsList.map((r, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"/>
                                            <span
                                                className={`text-sm leading-snug font-medium ${isDayTime ? 'text-teal-800' : 'text-teal-200'}`}>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div
                            className={`rounded-2xl border p-6 ${isDayTime ? 'bg-gray-50 border-gray-100' : 'bg-zinc-900 border-zinc-800'}`}>
                            <h3 className="text-base font-semibold mb-2">Have a similar challenge?</h3>
                            <p className={`text-sm mb-5 leading-relaxed ${isDayTime ? 'text-gray-500' : 'text-gray-400'}`}>
                                We'd love to hear about your project and explore how we can help.
                            </p>
                            <Link href="/contact"
                                  className="block w-full text-center px-5 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
                                Start a conversation
                            </Link>
                        </div>

                        {/* Services used */}
                        <div
                            className={`rounded-2xl border p-6 ${isDayTime ? 'bg-white border-gray-100' : 'bg-zinc-950 border-zinc-800'}`}>
                            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${isDayTime ? 'text-gray-400' : 'text-gray-500'}`}>Services</p>
                            <div className="flex flex-wrap gap-2">
                                {study.services.map(s => (
                                    <span key={s}
                                          className={`text-xs px-2.5 py-1 rounded-full border ${isDayTime ? 'border-gray-200 text-gray-600' : 'border-zinc-700 text-gray-300'}`}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </section>

                {/* ── Related work ── */}
                {related.length > 0 && (
                    <section className={`py-14 md:py-16 border-t ${isDayTime ? 'border-gray-200' : 'border-zinc-800'}`}>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-10">More work</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map(s => (
                                <Link key={s.id} href={`/case-studies/${s.slug}`} className="group flex flex-col gap-4">
                                    <div
                                        className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden ${isDayTime ? 'bg-gray-100' : 'bg-zinc-900'}`}>
                                        <Image src={s.image} alt={s.title} fill
                                               className="object-cover transition-transform duration-500 group-hover:scale-105"
                                               sizes="(max-width:768px) 100vw, 33vw"/>
                                    </div>
                                    <div>
                                        <span
                                            className={`text-xs font-semibold uppercase tracking-widest block mb-1.5 ${isDayTime ? 'text-teal-600' : 'text-teal-400'}`}>{s.industry}</span>
                                        <h3 className={`text-lg font-semibold leading-snug transition-colors ${isDayTime ? 'group-hover:text-teal-600' : 'group-hover:text-teal-400'}`}>{s.title}</h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* ── CTA ── */}

            <div
                className={`relative py-8 mx-auto px-4 sm:px-[2em] md:px-[3.2em] lg:px-[4.6em] max-w-full w-full h-auto ${
                    isDayTime ? 'bg-teal-100 text-teal-900' : 'bg-teal-950 text-white'
                }`}
            >
                <AIProjectEstimator/>
            </div>

            <Footer/>
        </div>
    );
}

export async function getStaticPaths() {
    const SLUGS = ['healthcare-platform-transformation', 'logistics-dashboard-optimization', 'fintech-product-launch', 'education-platform-expansion', 'enterprise-saas-rebrand'];
    return {paths: SLUGS.map(slug => ({params: {slug}})), fallback: 'blocking'};
}

export async function getStaticProps({params}: { params: { slug: string } }) {
    return {props: {}, revalidate: 60};
}