import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ReactNativeDevelopment = () => (
    <ServicePageTemplate
        title={<>React Native <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Cross-platform mobile applications from a single codebase. React Native powers MVP launches, multi-platform
                services, and startups that need to reach iOS and Android users fast.
            </>
        }
        eyebrow={<>One codebase, <br className={'lg:block md:block hidden'}/>iOS and Android</>}
        introHeading={<>React Native Development <br className={'lg:block md:block hidden'}/>From Startup to Scale</>}
        introBody={[
            <>
                React Native enables startups and enterprises to build high-quality iOS and Android applications from a single
                JavaScript codebase. At Graham Sobiribo Paul we harness React Native's code-sharing capabilities and native performance
                to deliver cross-platform apps that feel genuinely native. Whether launching an MVP, scaling a successful startup,
                or building multi-platform services, React Native dramatically reduces development time and cost while maintaining
                excellent user experiences. Our expertise spans navigation patterns, native module integration, and performance optimization.
            </>,
            <>
                React Native excels at delivering rapid MVP launches where time-to-market is critical. Share code between iOS and Android,
                iterate quickly based on user feedback, and scale efficiently as your user base grows. With proper architecture and tooling,
                React Native apps perform at near-native speeds while maintaining a single development team. We build production-grade apps with
                proper state management, offline capabilities, analytics integration, and app store deployment expertise. React Native is the
                smart choice for startups and growing companies that need to reach mobile users on both platforms.
            </>,
        ]}
        solutionsHeading={<>React Native <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From MVP launches to fully-scaled multi-platform services, Graham Sobiribo Paul delivers comprehensive React Native development.
                Code-sharing efficiency combined with native performance creates applications that work brilliantly on iOS and Android
                while maximizing your development investment.
            </>
        }
        solutions={[
            {
                id: '01', title: 'MVP & Startup Apps', target: 'WA',
                tags: ['Rapid Development', 'iOS & Android', 'MVP Launch'],
                body: <>We build minimum viable products (MVPs) that work on iOS and Android from day one. Single codebase means faster development, lower costs, and quicker time-to-market. Perfect for validating ideas and launching startups in weeks instead of months.</>,
            },
            {
                id: '02', title: 'Multi-platform Services', target: 'DE',
                tags: ['Cross-platform', 'Scalable', 'Performance'],
                body: <>We architect and build scalable multi-platform services using React Native. Code-sharing efficiency enables small teams to maintain production apps across iOS and Android while delivering excellent native performance and user experience.</>,
            },
            {
                id: '03', title: 'Native Module Integration', target: 'ML',
                tags: ['Native Modules', 'Platform APIs', 'Performance'],
                body: <>We integrate native modules when JavaScript performance isn't enough. Access platform-specific capabilities like camera, sensors, and system features while maintaining cross-platform code-sharing benefits.</>,
            },
            {
                id: '04', title: 'State Management & Architecture', target: 'AU',
                tags: ['Redux', 'MobX', 'Architecture'],
                body: <>We implement robust state management solutions and architecture patterns that scale as your app grows. Proper separation of concerns, performance optimization, and testability ensure your codebase stays maintainable.</>,
            },
            {
                id: '05', title: 'Offline & Sync Features', target: 'CD',
                tags: ['Offline', 'Data Sync', 'Reliability'],
                body: <>We build apps that work offline and sync when connectivity returns. Essential for real-world applications where network reliability varies. Users stay productive whether online or offline.</>,
            },
            {
                id: '06', title: 'App Store Deployment & Support', target: 'MS',
                tags: ['Release Management', 'Updates', 'Monitoring'],
                body: <>We handle everything from building release versions to submitting to app stores and managing updates. Continuous improvement, bug fixes, and feature rollouts keep your app competitive and users satisfied.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Time-to-Market Speed', image: '/assets/services/Development.jpg',
                description: <>React Native enables building iOS and Android apps in half the time of separate native apps. Validate market fit faster and adapt quickly as user needs evolve.</>,
            },
            {
                id: 2, title: 'Cost Efficiency', image: '/assets/services/Research-strategy.jpg',
                description: <>One codebase instead of two means smaller development teams, faster hiring, and significantly lower costs. Perfect for startups and scaling companies managing budgets carefully.</>,
            },
            {
                id: 3, title: 'Native Performance', image: '/assets/services/services.jpg',
                description: <>React Native compiles to native code and can access platform APIs directly. Performance matches native apps for most use cases, with the flexibility of cross-platform code-sharing.</>,
            },
            {
                id: 4, title: 'Large Ecosystem', image: '/assets/services/digital-optimisation.jpg',
                description: <>Battle-tested libraries, active community, and proven production deployments (Uber, Instagram, Airbnb) make React Native reliable and well-supported for serious applications.</>,
            },
        ]}
        ctaHeading={<>Launch mobile apps faster <br className={'lg:block md:block hidden'}/>with React Native</>}
        ctaBody={<>From MVP launches to multi-platform services, Graham Sobiribo Paul delivers React Native solutions that reach iOS and Android users with minimal development overhead. Let's bring your mobile vision to life faster and more cost-effectively.</>}
        stats={[
            {label: 'Years Experience', value: 6, suffix: '+'},
            {label: 'Team Members', value: 11, suffix: '+'},
            {label: 'Apps Published', value: 85, suffix: '+'},
            {label: 'Projects Delivered', value: 120, suffix: '+'},
            {label: 'Client Satisfaction', value: 97, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Amara Okafor', title: 'Founder, Fintech Startup', message: <>Graham Sobiribo Paul built our MVP in React Native and we launched on both platforms in 6 weeks. The team was incredibly responsive to feedback. We saved 60% compared to native development.</>},
            {name: 'Jatin Patel', title: 'Product Manager, Delivery App', message: <>React Native from Graham Sobiribo Paul powers our iOS and Android apps reaching 500k users. Performance is excellent and the development velocity lets us ship new features weekly.</>},
            {name: 'Sarah Mitchell', title: 'CEO, Social Platform', message: <>They understood our need to scale quickly. React Native was the right choice and their execution was flawless. We're now at 2M users with a small team maintaining both platforms.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Cross-platform Startups',
                description: 'Launch your startup on iOS and Android with a single React Native codebase, reaching maximum users with minimal development overhead.'
            },
            {
                id: 'vs2',
                title: 'MVP Launch',
                description: 'Validate your ideas faster with React Native MVPs that work across platforms, enabling rapid iteration and market testing with limited budget.'
            },
            {
                id: 'vs3',
                title: 'Multi-platform Services',
                description: 'Build scalable services that work seamlessly on iOS and Android, maintaining consistency across platforms while maximizing code-sharing efficiency.'
            }
        ]}/>
);

export default ReactNativeDevelopment;
