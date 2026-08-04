import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const MobileApplicationDevelopment = () => (
    <ServicePageTemplate
        title={<>Native & Cross-Platform <br className={'lg:block md:block hidden'}/>Mobile Applications</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                High-performing iOS and Android applications that engage users and drive business growth. We build native
                apps, cross-platform solutions, and scalable backends that handle millions of MAU. 4M+ monthly active users.
                98% uptime. 85% user retention. 4.8+ app store ratings.
            </>
        }
        eyebrow={<>Mobile apps that users <br className={'lg:block md:block hidden'}/>love and stick with</>}
        introHeading={<>Mobile Development <br className={'lg:block md:block hidden'}/>Built for User Acquisition</>}
        introBody={[
            <>
                Mobile applications are the front door to your business. At Grey InfoTech, we engineer native iOS (Swift) and
                Android (Kotlin) applications, as well as cross-platform solutions using React Native. Our mobile experts focus
                on app store optimization (ASO), user acquisition funnels, push notification strategies, and offline-first
                capabilities. From startup MVPs to apps serving millions of users monthly, we deliver applications that grow.
            </>,
            <>
                Our expertise spans consumer apps with viral growth mechanics, enterprise solutions with enterprise-grade
                security and offline capabilities, and real-time backend infrastructure that scales. We combine user-centric
                design, push notification optimization, ASO best practices, and post-launch growth acceleration to ensure your
                app succeeds in a competitive marketplace with millions of downloads competing for attention.
            </>,
        ]}
        solutionsHeading={<>Mobile Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From native iOS and Android development to cross-platform solutions and scalable backends, Grey InfoTech delivers
                comprehensive mobile engineering services. We specialize in high-performance applications, app store optimization,
                user acquisition, and post-launch growth acceleration that drive engagement and measurable business results.
            </>
        }
        solutions={[
            {
                id: '01', title: 'iOS Development (Swift)', target: 'IOS',
                tags: ['Native iOS', 'Swift', 'App Store Optimization'],
                body: <>We develop high-performance native iOS applications using Swift. Our expertise includes push notifications,
                    offline-first architecture, biometric authentication, HomeKit integration, and App Store Optimization (ASO) to
                    drive organic downloads. Our iOS apps achieve 4.8+ app store ratings and 98% uptime.</>,
            },
            {
                id: '02', title: 'Android Development (Kotlin)', target: 'ANDROID',
                tags: ['Native Android', 'Kotlin', 'Firebase'],
                body: <>Our Android engineers build robust native applications using Kotlin, with expertise in Firebase integration,
                    offline data sync, biometric security, push notifications, and Play Store optimization. We deliver apps that
                    perform reliably across device fragmentation with 85%+ user retention rates.</>,
            },
            {
                id: '03', title: 'Cross-Platform (React Native)', target: 'CROSS',
                tags: ['React Native', 'Code Sharing', 'Rapid Deployment'],
                body: <>We develop cross-platform applications using React Native, enabling simultaneous iOS and Android deployment
                    from a single TypeScript codebase. This accelerates time-to-market, reduces costs, and maintains platform-specific
                    optimizations for push notifications and offline capabilities.</>,
            },
            {
                id: '04', title: 'Backend & Real-Time Services', target: 'BACKEND',
                tags: ['APIs', 'Firebase', 'WebSockets'],
                body: <>We engineer Node.js/Go backends optimized for mobile apps: sub-2s API latency, real-time data sync, offline
                    queuing, push notification infrastructure, and analytics pipelines. Firebase and custom solutions supporting
                    4M+ MAU with 99.9% uptime SLAs.</>,
            },
            {
                id: '05', title: 'App Store Optimization (ASO)', target: 'UIUX',
                tags: ['ASO', 'User Acquisition', 'Growth Metrics'],
                body: <>We optimize app store presence for discoverability: keyword research, screenshot optimization, localization,
                    A/B testing, and conversion funnel optimization. Our ASO expertise drives 120%+ improvement in organic downloads
                    and user acquisition efficiency.</>,
            },
            {
                id: '06', title: 'Post-Launch Growth & Optimization', target: 'SUPPORT',
                tags: ['Analytics', 'Push Notifications', 'Retention'],
                body: <>Post-launch, we optimize for retention and growth: push notification campaigns (95%+ engagement rates),
                    in-app analytics, A/B testing frameworks, and growth experiments. Our clients see 85%+ monthly retention and
                    average 350% growth in first year post-launch.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: '10+ Years Mobile Expertise', image: '/assets/services/Development.jpg',
                description: <>We''ve delivered 150+ mobile applications, managing 4M+ monthly active users and handling 98% uptime
                    standards. Native iOS/Android expertise combined with React Native cross-platform delivery.</>,
            },
            {
                id: 2, title: 'App Store & User Acquisition', image: '/assets/services/Research-strategy.jpg',
                description: <>ASO specialists on our team drive average 120%+ improvement in organic downloads. We understand app
                    store algorithms, keyword optimization, and user acquisition funnels that result in 4.8+ ratings and 85%+
                    retention.</>,
            },
            {
                id: 3, title: 'Offline-First, Real-Time Architecture', image: '/assets/services/services.jpg',
                description: <>Our backend engineers design apps that work offline, sync when connection resumes, and deliver sub-2s
                    response times. Firebase, WebSockets, and message queues for reliable, responsive experiences at scale.</>,
            },
            {
                id: 4, title: '90-Day Post-Launch Growth Program', image: '/assets/services/digital-optimisation.jpg',
                description: <>After launch, we don''t disappear. We optimize push notification campaigns, run A/B tests, analyze user
                    behavior, and implement growth experiments. 85% of our clients achieve 350%+ growth in first year through our
                    post-launch optimization program.</>,
            },
        ]}
        ctaHeading={<>Build apps that <br className={'lg:block md:block hidden'}/>millions love and use daily</>}
        ctaBody={<>From consumer apps serving millions of users to enterprise solutions with offline capabilities, Grey InfoTech
            delivers high-performance mobile applications. ASO expertise, push notification optimization, and post-launch growth
            acceleration ensure your app succeeds. Let''s build something remarkable.</>}
        stats={[
            {label: 'Years Mobile Expertise', value: 10, suffix: '+'},
            {label: 'Mobile Apps Delivered', value: 150, suffix: '+'},
            {label: 'Monthly Active Users', value: 4, suffix: 'M+'},
            {label: 'Avg App Store Rating', value: 4, suffix: '.8+'},
            {label: 'User Retention Rate', value: 85, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Adekunle Obi', title: 'CEO, Consumer App Startup', message: <>Grey InfoTech''s app hit 2M downloads in year one. Their ASO expertise and post-launch optimization drove 350% growth. The team''s attention to user retention is outstanding.</>},
            {name: 'Toyin Adeyemi', title: 'VP Product, Enterprise SaaS', message: <>They built our enterprise mobile app with offline-first architecture and 99.9% uptime. Users migrated immediately from our legacy solution. Best technical partnership we''ve had.</>},
            {name: 'Kunle Okonkwo', title: 'Founder, FinTech Mobile App', message: <>The app achieved 4.8 stars with 85%+ monthly retention. Their push notification strategy and in-app analytics expertise transformed our user engagement metrics.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Consumer Apps & Marketplaces',
                description: 'Build engaging consumer apps that drive organic growth through ASO optimization, viral mechanics, and user acquisition strategies.'
            },
            {
                id: 'vs2',
                title: 'Enterprise Mobile Solutions',
                description: 'Develop secure enterprise apps with offline capabilities, real-time sync, and integration with backend systems supporting complex workflows.'
            },
            {
                id: 'vs3',
                title: 'FinTech & Healthcare Apps',
                description: 'Create compliant, secure mobile apps with encryption, biometric auth, and HIPAA/regulatory standards built in from the ground up.'
            }
        ]}/>
);

export default MobileApplicationDevelopment;
