import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const FlutterDevelopment = () => (
    <ServicePageTemplate
        title={<>Flutter App <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/product-design.jpg']}
        intro={
            <>
                One codebase, every platform. We build fast, beautiful, natively compiled Flutter apps for iOS,
                Android, web and desktop—shipped quickly without compromising quality.
            </>
        }
        eyebrow={<>One codebase, <br className={'lg:block md:block hidden'}/>every platform your users love</>}
        introHeading={<>Cross-Platform Apps <br className={'lg:block md:block hidden'}/>Built Once, Run Everywhere</>}
        introBody={[
            <>
                Flutter lets teams ship a single, high-performance codebase to iOS, Android, web and desktop—and
                Grey InfoTech uses it to help businesses reach every user faster and at a fraction of the cost of
                building separate native apps. We design pixel-perfect interfaces that feel native on each
                platform, backed by clean Dart architecture and robust state management. From early-stage MVPs
                that need to validate an idea quickly, to mature products serving thousands of daily users, we
                build Flutter applications that look stunning, run at 60–120fps, and remain a joy to maintain as
                your roadmap grows.
            </>,
            <>
                Our engineers treat Flutter as a serious production platform, not a shortcut. We architect apps
                with proven patterns—Riverpod or BLoC for state, clean separation of layers, dependency
                injection and comprehensive testing—so your codebase scales with confidence. We integrate native
                device capabilities, offline storage, real-time data, push notifications, payments and
                analytics, and we automate builds and releases through CI/CD pipelines that publish to both app
                stores. The outcome is a polished, reliable app delivered on time, with the long-term
                maintainability that protects your investment.
            </>,
        ]}
        solutionsHeading={<>Flutter <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                Grey InfoTech delivers the full Flutter lifecycle—from UI/UX and architecture to native
                integrations, store deployment and ongoing support. Based in Nigeria and working globally, we
                help startups and enterprises launch cross-platform products that are fast, beautiful and built
                to last.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Cross-Platform App Development', target: 'CP',
                tags: ['iOS', 'Android', 'Web', 'Desktop'],
                body: <>We build a single Flutter codebase that compiles to truly native iOS, Android, web and
                    desktop apps. This dramatically reduces cost and time-to-market while ensuring a consistent
                    brand experience everywhere your users are—without the maintenance burden of separate native
                    teams.</>,
            },
            {
                id: '02', title: 'UI/UX & Custom Animations', target: 'UI',
                tags: ['Design Systems', 'Motion', 'Pixel-Perfect'],
                body: <>Flutter&apos;s rendering engine lets us craft fluid, custom interfaces and rich animations
                    that elevate your brand. We translate your design system into reusable widgets, deliver
                    buttery 60–120fps motion, and ensure accessibility and responsiveness across every screen
                    size.</>,
            },
            {
                id: '03', title: 'Native Integrations & APIs', target: 'NI',
                tags: ['Camera', 'GPS', 'Bluetooth', 'Payments'],
                body: <>We connect your app to the device and the world—camera, GPS, sensors, Bluetooth, biometric
                    auth, push notifications and secure payments—while integrating cleanly with your REST or
                    GraphQL back-end and third-party services for a seamless end-to-end experience.</>,
            },
            {
                id: '04', title: 'State Management & Architecture', target: 'SA',
                tags: ['Riverpod', 'BLoC', 'Clean Architecture'],
                body: <>We engineer maintainable apps using proven patterns—Riverpod or BLoC for predictable
                    state, clean layered architecture, dependency injection and modular code—so your product
                    stays testable and easy to extend as features and team size grow.</>,
            },
            {
                id: '05', title: 'MVP & Product Engineering', target: 'MV',
                tags: ['Rapid Build', 'Validation', 'Scale'],
                body: <>Need to test an idea fast? We build lean, polished MVPs that validate your concept with
                    real users, then evolve the same codebase into a production-grade product—no costly rewrites,
                    just steady, confident growth.</>,
            },
            {
                id: '06', title: 'Testing, CI/CD & Support', target: 'CI',
                tags: ['Automated Tests', 'Store Release', 'Maintenance'],
                body: <>We bake in unit, widget and integration tests, automate builds and releases to the App
                    Store and Google Play through CI/CD, and provide ongoing monitoring, updates and support so
                    your app stays stable, secure and current with the latest Flutter releases.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Faster Time-to-Market', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>One codebase means one team shipping to every platform at once. You reach iOS,
                    Android, web and desktop users sooner—and update them all simultaneously.</>,
            },
            {
                id: 2, title: 'Native-Quality Performance', image: '/assets/services/product-design.jpg',
                description: <>Flutter compiles to native ARM code and renders its own UI, delivering smooth,
                    responsive experiences that feel right at home on every device.</>,
            },
            {
                id: 3, title: 'Lower Cost of Ownership', image: '/assets/services/services.jpg',
                description: <>Maintaining one shared codebase instead of two or three native ones reduces
                    long-term engineering cost without sacrificing the quality your users expect.</>,
            },
            {
                id: 4, title: 'Built to Scale', image: '/assets/services/digital-optimisation.jpg',
                description: <>Clean architecture, strong testing and CI/CD mean the MVP we build today grows
                    into the production product you need tomorrow—no rewrites required.</>,
            },
        ]}
        ctaHeading={<>Ship to every <br className={'lg:block md:block hidden'}/>platform at once</>}
        ctaBody={<>Whether you&apos;re validating an MVP or scaling a product to thousands of users, Grey InfoTech
            builds Flutter apps that are fast, beautiful and maintainable. One codebase, every platform—let&apos;s
            bring your app to life.</>}
        faqs={[
            {q: 'Why choose Flutter over native development?', a: 'Flutter lets you ship to iOS, Android, web and desktop from one codebase, cutting development and maintenance cost while keeping near-native performance. It is ideal when you want a consistent experience everywhere and faster iteration. We will still recommend native if your app needs deep platform-specific capabilities we cannot serve well in Flutter.'},
            {q: 'Will my Flutter app feel native?', a: 'Yes. Flutter compiles to native ARM code and renders its own pixel-perfect UI, so apps run smoothly at 60–120fps and respect platform conventions. Users typically cannot tell a well-built Flutter app from a native one.'},
            {q: 'Can you publish to the App Store and Google Play?', a: 'Absolutely. We handle the full release process—signing, store listings, compliance and CI/CD pipelines—so your app reaches both stores reliably, with smooth update cycles afterwards.'},
            {q: 'Can you take over or improve an existing Flutter app?', a: 'Yes. We audit existing codebases, fix performance and architecture issues, add features and stabilise releases. We can also migrate older apps to current Flutter and Dart versions.'},
            {q: 'How do you ensure the app stays maintainable?', a: 'We use clean layered architecture, predictable state management (Riverpod or BLoC), dependency injection, automated tests and clear documentation, so your team or ours can extend the app confidently for years.'},
            {q: 'Do you provide support after launch?', a: 'Yes. We offer maintenance plans covering monitoring, bug fixes, OS and Flutter updates, and new feature development, keeping your app stable, secure and current.'},
        ]}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Apps Launched', value: 90, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Tunde Bakare', title: 'Founder, MarketMate', message: <>Grey InfoTech delivered our marketplace app on iOS and Android from one Flutter codebase, on schedule and on budget. The animations and performance genuinely impressed our investors.</>},
            {name: 'Grace Mwangi', title: 'Product Lead, FitLoop', message: <>They rebuilt our fitness app in Flutter and the difference is night and day—smoother, faster, and we now ship updates to both stores at the same time.</>},
            {name: 'Samuel Adeyemi', title: 'CTO, PaySwift', message: <>Their architecture and testing discipline meant our payments app scaled cleanly from MVP to tens of thousands of users without a rewrite. A genuinely senior team.</>},
        ]}
    />
);

export default FlutterDevelopment;
