import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const FlutterDevelopment = () => (
    <ServicePageTemplate
        title="Flutter Development"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/Development.jpg"
        intro={
            <>
                We craft beautiful, high-performance cross-platform apps with Flutter—one codebase that
                delivers native-quality experiences on iOS, Android, web and desktop,{' '}
                <br className={'lg:block md:block hidden'}/>shipped faster and maintained with ease.
            </>
        }
        eyebrow={<>One codebase, <br className={'lg:block md:block hidden'}/>every platform</>}
        introHeading="Flutter Engineering"
        introBody={[
            <>
                Flutter has become the framework of choice for teams that want a single, expressive codebase
                without compromising on speed or polish. At Grey InfoTech we use Flutter and Dart to build
                apps that feel genuinely native—smooth 60/120fps animations, pixel-perfect custom UI, and
                platform-aware behaviour—while dramatically cutting the time and cost of maintaining separate
                iOS and Android codebases.
            </>,
            <>
                Our Flutter practice goes beyond UI. We architect apps for scale using clean state management
                (Riverpod, Bloc), robust offline-first data layers, secure API integration, and automated
                testing. From MVP to enterprise rollout, we deliver maintainable, well-documented code and
                set up CI/CD so your team can ship confident updates to every store from a single pipeline.
            </>,
        ]}
        solutionsHeading="Our Flutter Solutions"
        solutions={[
            {
                id: '01', title: 'Cross-Platform App Development', target: 'CP',
                tags: ['iOS', 'Android', 'Single Codebase'],
                body: <>We build production apps that run natively across iOS and Android from one Flutter codebase—
                    reducing development cost and keeping feature parity effortless. Your users get a consistent,
                    high-quality experience while your team maintains far less code.</>,
            },
            {
                id: '02', title: 'Custom UI & Animations', target: 'UI',
                tags: ['Material', 'Cupertino', 'Motion Design'],
                body: <>Flutter&#39;s rendering engine lets us create distinctive, brand-led interfaces and fluid
                    animations that would be costly to build natively. We craft custom widgets, micro-interactions
                    and adaptive layouts that delight users and reinforce your identity.</>,
            },
            {
                id: '03', title: 'Backend & API Integration', target: 'BE',
                tags: ['REST', 'GraphQL', 'Firebase'],
                body: <>We connect your Flutter app to robust back-ends—REST and GraphQL APIs, Firebase, or custom
                    Node services—with secure authentication, real-time sync and resilient offline-first data
                    handling so the app stays fast and reliable even on poor connections.</>,
            },
            {
                id: '04', title: 'Maintenance & Store Deployment', target: 'MD',
                tags: ['CI/CD', 'App Store', 'Play Store'],
                body: <>We set up automated build and release pipelines, manage App Store and Play Store
                    submissions, and provide ongoing maintenance—monitoring crashes, optimising performance and
                    rolling out updates smoothly across every platform.</>,
            },
        ]}
        faqs={[
            {q: 'Is Flutter suitable for large, complex apps?', a: 'Yes. Flutter powers apps used by millions at companies like Google, Alibaba and BMW. With the right architecture and state management, it scales comfortably from MVP to enterprise.'},
            {q: 'Will my Flutter app feel native?', a: 'Flutter compiles to native ARM code and renders its own UI, so apps are fast and smooth. We follow platform conventions (Material on Android, Cupertino on iOS) so each platform feels right at home.'},
            {q: 'Can you also target web and desktop?', a: 'Yes. The same Flutter codebase can target web, Windows, macOS and Linux. We advise on which targets make sense for your product and budget.'},
        ]}
        testimonials={[
            {name: 'Kwame Mensah', title: 'Head of Engineering, TaskFlow Inc.', message: <>Grey InfoTech delivered our iOS and Android apps from a single Flutter codebase—on time and gorgeous. Maintenance is now a fraction of what it used to cost us.</>},
            {name: 'Thandiwe Mokoena', title: 'CTO, PropEdge Technologies', message: <>The animations and custom UI they built in Flutter genuinely set our product apart. Performance has been flawless across devices.</>},
        ]}
    />
);

export default FlutterDevelopment;
