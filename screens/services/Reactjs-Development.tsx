import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ReactjsDevelopment = () => (
    <ServicePageTemplate
        title={<>React <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Interactive, performant user interfaces for SaaS dashboards, real-time applications, and e-commerce platforms.
                React delivers the responsive experiences your users expect and your business needs.
            </>
        }
        eyebrow={<>Component-driven development, <br className={'lg:block md:block hidden'}/>interactive UIs</>}
        introHeading={<>React Development <br className={'lg:block md:block hidden'}/>From Simple to Complex</>}
        introBody={[
            <>
                React powers some of the world's most interactive applications—SaaS dashboards, real-time collaboration tools,
                e-commerce platforms, and complex data visualizations. At Grey InfoTech we harness React's component model and
                modern JavaScript to build user interfaces that are fast, responsive, and a pleasure to use. Whether building from scratch
                or enhancing existing applications, our React expertise delivers interfaces that engage users and drive business metrics.
                We stay current with the latest React patterns, hooks, and best practices to build maintainable, scalable applications.
            </>,
            <>
                Beyond building interfaces, React excels at managing complex state, handling real-time updates, and delivering
                seamless user experiences. We build SaaS dashboards that visualize data intelligently, e-commerce applications that
                drive conversions, and real-time applications where instant responsiveness matters. With proper state management, performance
                optimization, and testing practices, React applications stay fast, reliable, and maintainable as they scale. React enables
                small teams to build sophisticated applications that compete with industry leaders.
            </>,
        ]}
        solutionsHeading={<>React <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From SaaS dashboards and real-time applications to e-commerce platforms and data-heavy interfaces,
                Grey InfoTech delivers comprehensive React development. Component-driven architecture and modern JavaScript
                create interfaces that are fast, scalable, and delightful to use.
            </>
        }
        solutions={[
            {
                id: '01', title: 'SaaS Dashboards', target: 'WA',
                tags: ['Data Visualization', 'Real-time', 'Performance'],
                body: <>We build intelligent SaaS dashboards that visualize data in ways users understand. Interactive charts, real-time updates, drill-down capabilities, and responsive design enable users to make data-driven decisions quickly and confidently.</>,
            },
            {
                id: '02', title: 'Real-time Applications', target: 'DE',
                tags: ['WebSocket', 'Live Updates', 'Collaboration'],
                body: <>We develop real-time applications where instant communication matters—collaborative tools, live notifications, streaming data, and instant messaging. React's efficient rendering combines with WebSocket architecture for seamless real-time experiences.</>,
            },
            {
                id: '03', title: 'E-commerce Platforms', target: 'ML',
                tags: ['Conversion', 'Shopping Experience', 'Scalable'],
                body: <>We build e-commerce applications that convert browsers into buyers. Product discovery, intuitive checkout, personalization, and mobile responsiveness drive sales. React enables fast, engaging shopping experiences that compete with industry leaders.</>,
            },
            {
                id: '04', title: 'Data Visualization & Analytics', target: 'AU',
                tags: ['Charts', 'Graphs', 'Interactive'],
                body: <>We create interactive data visualizations and analytics interfaces that transform raw data into insights. Custom charts, real-time metrics, drill-down capabilities, and responsive design make data accessible and actionable for decision-makers.</>,
            },
            {
                id: '05', title: 'Progressive Web Apps', target: 'CD',
                tags: ['PWA', 'Offline', 'Performance'],
                body: <>We build progressive web apps with React that work offline, load instantly, and feel like native applications. Reliable performance, reduced data usage, and app-like experience convert users into engaged customers.</>,
            },
            {
                id: '06', title: 'Performance & Optimization', target: 'MS',
                tags: ['Performance', 'Optimization', 'Scalability'],
                body: <>We optimize React applications for maximum performance—code-splitting, lazy loading, memoization, and efficient rendering. Fast applications drive conversions, improve SEO, and reduce infrastructure costs.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Component Reusability', image: '/assets/services/Development.jpg',
                description: <>React's component model creates reusable, maintainable building blocks. Build complex UIs quickly while keeping code organized and easy to test.</>,
            },
            {
                id: 2, title: 'Developer Experience', image: '/assets/services/Research-strategy.jpg',
                description: <>React's declarative model makes code easy to understand and modify. Hot reloading, great tooling, and massive ecosystem accelerate development while reducing bugs.</>,
            },
            {
                id: 3, title: 'Performance Optimizations', image: '/assets/services/services.jpg',
                description: <>React's virtual DOM and efficient rendering keep applications fast even with complex UIs. Proper optimization practices enable smooth experiences even on lower-end devices.</>,
            },
            {
                id: 4, title: 'Vibrant Ecosystem', image: '/assets/services/digital-optimisation.jpg',
                description: <>React's mature ecosystem provides battle-tested libraries for routing, state management, forms, and UI components. Libraries like Redux, Zustand, and React Query solve common problems elegantly.</>,
            },
        ]}
        ctaHeading={<>Build engaging interfaces <br className={'lg:block md:block hidden'}/>with React</>}
        ctaBody={<>From SaaS dashboards and real-time applications to e-commerce platforms and interactive data visualizations, Grey InfoTech delivers React solutions that engage users and drive business metrics. Let's build something amazing together.</>}
        stats={[
            {label: 'Years Experience', value: 9, suffix: '+'},
            {label: 'Team Members', value: 15, suffix: '+'},
            {label: 'Applications Built', value: 200, suffix: '+'},
            {label: 'Projects Delivered', value: 280, suffix: '+'},
            {label: 'Client Satisfaction', value: 99, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Kofi Asante', title: 'CEO, Analytics SaaS', message: <>Grey InfoTech built our analytics dashboard and it's phenomenal. Real-time updates, beautiful visualizations, and the performance is incredible. Our users love it and engagement metrics have soared.</>},
            {name: 'Priya Sharma', title: 'Founder, E-commerce Platform', message: <>Their React expertise transformed our online store. Conversion rates increased 40% after the redesign. The team understood e-commerce challenges and delivered solutions that actually drive sales.</>},
            {name: 'Marcus Johnson', title: 'Product Lead, Collaboration Tool', message: <>Real-time collaboration features from Grey InfoTech's React implementation are seamless. Users can collaborate effortlessly and performance never suffers even with thousands of concurrent edits. Excellent work.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'SaaS Dashboards',
                description: 'Build interactive dashboards that visualize business data in real-time, enabling users to monitor metrics and make data-driven decisions with confidence.'
            },
            {
                id: 'vs2',
                title: 'Real-time Applications',
                description: 'Develop applications with instant communication and live updates, from collaborative tools to instant messaging and streaming data platforms.'
            },
            {
                id: 'vs3',
                title: 'E-commerce Platforms',
                description: 'Create engaging online stores with intuitive product discovery, seamless checkout, and conversion-optimized experiences that drive sales.'
            }
        ]}/>
);

export default ReactjsDevelopment;
