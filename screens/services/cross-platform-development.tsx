'use client';

import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import Link from 'next/link';

const CrossPlatformDevelopment = () => (
    <ServicePageTemplate
        title={<>Cross Platform <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/cross/hero-M.mp4"
        heroVideoMobile="/assets/cross/hero-P.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-optimisation.jpg']}
        eyebrow={<>Scalable Multi-Platform <br className={'lg:block md:block hidden'}/>Application Development</>}
        intro={
            <>
                One codebase, every platform—iOS, Android, and web—delivered with native-quality performance and
                consistent brand experiences that cut time-to-market by up to 60%.
            </>
        }
        introHeading={<>Best <span className={'text-[#0ef0dd]'}>Cross-Platform App</span> Development Services</>}
        introBody={[
            <>
                At Grey InfoTech, we solve the strategic challenges organisations face when developing applications
                across fragmented device ecosystems. Traditional platform-specific development creates duplicated
                codebases, extended timelines, and escalating costs. We eliminate these limitations through expert
                cross-platform development leveraging{' '}
                <Link href={'/services/React-Native-Development'} className="border-b border-gray-500 hover:border-white">
                    React Native
                </Link>
                ,{' '}
                <Link href={'/services/flutter-development'} className="border-b border-gray-500 hover:border-white">
                    Flutter
                </Link>
                , and Xamarin—enabling simultaneous deployment across{' '}
                <Link href={'/services/ios-development'} className="border-b border-gray-500 hover:border-white">iOS</Link>,{' '}
                <Link href={'/services/android-development'} className="border-b border-gray-500 hover:border-white">Android</Link>, and{' '}
                <Link href={'/services/Web-Development'} className="border-b border-gray-500 hover:border-white">web</Link>{' '}
                while maintaining native-like performance and brand integrity.
            </>,
            <>
                By implementing a single, strategically engineered codebase, we accelerate time-to-market by up to
                60% and reduce development costs by 40–50% compared to native approaches while ensuring absolute
                feature parity across all platforms. Our solutions incorporate offline functionality, real-time
                synchronisation, secure authentication, third-party integrations, and comprehensive analytics that
                drive continuous optimisation—giving you the agility to scale efficiently and achieve sustainable
                growth in an increasingly mobile-first digital marketplace.
            </>,
        ]}
        solutionsHeading={<>Cross-Platform <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From strategic consulting to enterprise integration, Grey InfoTech delivers the complete
                cross-platform development stack. Based in Nigeria and serving clients globally, we build
                scalable, high-performance applications that run flawlessly across every device and OS.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Strategy & Consulting', target: 'SC',
                tags: ['Competitive Positioning', 'Market Analysis', 'Strategic Roadmapping'],
                body: <>We develop comprehensive strategic roadmaps that position your cross-platform application
                    for sustained market success. Our consulting process begins with rigorous analysis of your
                    business objectives, target audience, competitive landscape, and emerging industry trends—then
                    translates that insight into clear success metrics, optimal platform selection, feature
                    prioritisation, and phased deployment approaches that balance speed-to-market with quality
                    and scalability.</>,
            },
            {
                id: '02', title: 'Cross-Platform App Design', target: 'CPAD',
                tags: ['User Experience Design', 'Interface Optimisation', 'Platform Consistency'],
                body: <>We deliver exceptional cross-platform application designs that integrate sophisticated
                    aesthetics with intuitive functionality. Our design team employs user-centred principles,
                    comprehensive usability research, and contemporary interface patterns to craft visually
                    compelling applications that balance platform-specific conventions with unified brand
                    expression—ensuring native-quality experiences on iOS, Android, and web while maximising
                    code reusability.</>,
            },
            {
                id: '03', title: 'Responsive Apps', target: 'RA',
                tags: ['Multi-Device Compatibility', 'Framework Optimisation', 'Unified UX', 'Cost-Efficient Deployment'],
                body: <>We specialise in cross-platform application development that delivers seamless, consistent
                    user experiences across diverse devices and operating systems. Through strategic architecture
                    design and efficient code implementation, we maximise development efficiency without
                    compromising functionality—providing unified feature sets, synchronised data experiences, and
                    consistent visual presentation that significantly expands market reach and reduces development
                    costs compared to native strategies.</>,
            },
            {
                id: '04', title: 'Cross-Platform App Migration', target: 'CPAM',
                tags: ['Platform Migration', 'Data Integrity', 'Legacy Modernisation', 'System Compatibility'],
                body: <>We provide comprehensive migration services that transition your existing native or legacy
                    applications to modern cross-platform architectures, expanding market reach while preserving
                    critical functionality and business logic. Our methodology employs rigorous planning, systematic
                    code analysis, and phased implementation strategies that minimise disruption and ensure
                    continuous service availability throughout the transition process.</>,
            },
            {
                id: '05', title: 'Cross-Platform App Support', target: 'CPAS',
                tags: ['Performance Optimisation', 'Proactive Monitoring', 'Security Management', 'Lifecycle Management'],
                body: <>We provide comprehensive support and maintenance services that ensure your cross-platform
                    application maintains optimal performance, security, and reliability throughout its operational
                    lifecycle. Our dedicated technical team delivers proactive monitoring, regular system updates,
                    performance optimisation, security patch management, and rapid issue resolution to minimise
                    downtime across all platforms.</>,
            },
            {
                id: '06', title: 'Custom Software Development', target: 'CSD',
                tags: ['Bespoke Solutions', 'Business Alignment', 'Operational Efficiency', 'Requirements-Driven Design'],
                body: <>We deliver tailor-made cross-platform applications engineered specifically to address your
                    organisation's unique operational requirements, strategic objectives, and competitive challenges.
                    Through collaborative development methodologies and iterative feedback cycles, we create
                    applications that incorporate the exact features, workflows, and integrations your business
                    demands—eliminating the compromises inherent in generic, off-the-shelf solutions.</>,
            },
            {
                id: '07', title: 'Cross-Platform App Integration', target: 'CPAI',
                tags: ['API Integration', 'System Interoperability', 'Enterprise Connectivity', 'Middleware Solutions'],
                body: <>We provide comprehensive application integration services that connect your application with
                    essential business systems and third-party services. We employ proven integration methodologies,
                    RESTful APIs, middleware solutions, and modern integration platforms to establish reliable
                    connections with CRM, ERP, payment gateways, analytics tools, and industry-specific applications—
                    eliminating data silos and ensuring real-time information availability across your entire
                    technology landscape.</>,
            },
        ]}
        faqs={[
            {
                q: 'What frameworks do you use for cross-platform development?',
                a: <>We primarily use React Native, Flutter, and Xamarin—selecting the framework that best matches
                    your project requirements, team expertise, and long-term maintainability goals.</>,
            },
            {
                q: 'How much cheaper is cross-platform vs native development?',
                a: <>Cross-platform development typically reduces costs by 40–50% compared to building separate
                    native apps for iOS and Android, since you maintain a single codebase across all platforms.</>,
            },
            {
                q: 'Will my cross-platform app feel native on each platform?',
                a: <>Yes. We use platform-specific UI components, native gestures, and optimised rendering to
                    ensure your app feels authentic on every OS—not like a web wrapper.</>,
            },
            {
                q: 'Can you migrate our existing native app to cross-platform?',
                a: <>Absolutely. Our migration process preserves your existing business logic and data integrity
                    while transitioning to a modern cross-platform architecture with minimal operational disruption.</>,
            },
            {
                q: 'Do you provide ongoing support after launch?',
                a: <>Yes—we offer comprehensive maintenance packages covering bug fixes, OS compatibility updates,
                    security patches, performance tuning, and feature enhancements aligned with user feedback.</>,
            },
        ]}
    />
);

export default CrossPlatformDevelopment;
