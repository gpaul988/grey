import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const WebApplication = () => (
    <ServicePageTemplate
        title={<>Web Application <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Browser-based systems, SaaS applications, and progressive web apps that work across devices.
                Web applications deliver accessibility and reach that native apps can't match.
            </>
        }
        eyebrow={<>Browser-based, <br className={'lg:block md:block hidden'}/>accessible, powerful</>}
        introHeading={<>Web Application Development <br className={'lg:block md:block hidden'}/>Building for the Browser</>}
        introBody={[
            <>
                Web applications have become the dominant platform for business software. At Grey InfoTech we build web applications
                that harness modern browser capabilities to deliver experiences rivaling native applications. From SaaS platforms and
                content systems to progressive web apps and real-time collaboration tools, web technology enables us to build once
                and reach users on any device. We combine modern web technologies, proven patterns, and careful attention to performance
                and user experience to create applications that users actually want to use.
            </>,
            <>
                Web applications offer unmatched accessibility -no installation required, automatic updates, and reach across devices.
                Modern browser APIs enable offline functionality, push notifications, and near-native performance. We build progressive web apps
                that start simple but offer app-like experiences when installed. SaaS platforms that scale to millions of users. Content systems
                that power publishing at scale. Web applications are no longer second-class citizens compared to native apps -they're often the
                smarter choice for reaching users across devices and platforms.
            </>,
        ]}
        solutionsHeading={<>Web Application <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From browser-based systems and SaaS applications to progressive web apps and content platforms,
                Grey InfoTech delivers comprehensive web application development. Modern technologies and best practices
                create applications that users love and businesses can scale.
            </>
        }
        solutions={[
            {
                id: '01', title: 'SaaS Applications', target: 'WA',
                tags: ['Multi-tenant', 'Billing', 'Scalable'],
                body: <>We build subscription-based SaaS applications with multi-tenant architecture, billing integration, and team collaboration features. User authentication, role-based access, analytics, and automation enable businesses to monetize software effectively.</>,
            },
            {
                id: '02', title: 'Progressive Web Apps', target: 'DE',
                tags: ['PWA', 'Offline', 'Performance'],
                body: <>We develop progressive web apps that work offline, load instantly, and deliver app-like experiences from the browser. Service workers, caching strategies, and responsive design create applications that compete with native apps.</>,
            },
            {
                id: '03', title: 'Content Management & Publishing', target: 'ML',
                tags: ['CMS', 'Publishing', 'Content'],
                body: <>We build content management systems and publishing platforms that enable non-technical users to create and manage content. Editorial workflows, scheduling, SEO optimization, and multi-channel publishing drive content distribution at scale.</>,
            },
            {
                id: '04', title: 'E-commerce Platforms', target: 'AU',
                tags: ['Store', 'Checkout', 'Conversion'],
                body: <>We develop e-commerce platforms with product catalogs, shopping carts, secure checkout, and payment integration. Performance optimization, conversion rate optimization, and mobile responsiveness drive sales and customer satisfaction.</>,
            },
            {
                id: '05', title: 'Collaboration & Productivity Tools', target: 'CD',
                tags: ['Real-time', 'Collaboration', 'Features'],
                body: <>We build collaboration tools enabling teams to work together -document editing, task management, communication, and workflow automation. Real-time synchronization and responsive UI create seamless collaboration experiences.</>,
            },
            {
                id: '06', title: 'Analytics & Reporting Dashboards', target: 'MS',
                tags: ['Analytics', 'Reporting', 'Insights'],
                body: <>We develop analytics and reporting dashboards that transform data into actionable insights. Real-time metrics, custom reports, data visualization, and drill-down capabilities enable data-driven decision-making.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Universal Accessibility', image: '/assets/services/Development.jpg',
                description: <>Web applications work on any device with a browser -desktop, tablet, mobile. No installation required. Users stay updated automatically as you deploy changes.</>,
            },
            {
                id: 2, title: 'Modern Capabilities', image: '/assets/services/Research-strategy.jpg',
                description: <>Modern browser APIs provide offline functionality, push notifications, geolocation, and near-native performance. Capabilities once exclusive to native apps are now available in the browser.</>,
            },
            {
                id: 3, title: 'Performance & Speed', image: '/assets/services/services.jpg',
                description: <>Modern web technologies enable fast loading, smooth interactions, and responsive UI. Service workers and caching strategies make web apps competitive with native apps in performance.</>,
            },
            {
                id: 4, title: 'Cost Efficiency', image: '/assets/services/digital-optimisation.jpg',
                description: <>Single web application instead of native apps for each platform means lower development costs and smaller maintenance teams. Web applications scale your development ROI.</>,
            },
        ]}
        ctaHeading={<>Build powerful <br className={'lg:block md:block hidden'}/>web applications</>}
        ctaBody={<>From SaaS platforms and progressive web apps to content management systems and e-commerce platforms, Grey InfoTech delivers web applications that reach your users across devices and drive real business results. Let's build something extraordinary.</>}
        stats={[
            {label: 'Years Experience', value: 12, suffix: '+'},
            {label: 'Team Members', value: 18, suffix: '+'},
            {label: 'Applications Built', value: 220, suffix: '+'},
            {label: 'Projects Delivered', value: 350, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Kwame Mensah', title: 'CEO, SaaS Company', message: <>Grey InfoTech's web application platform handles 1M+ monthly users seamlessly. The architecture scales beautifully, and the user experience is excellent. Best investment we've made in our technology.</>},
            {name: 'Francesca Benedetti', title: 'Founder, Content Platform', message: <>Their progressive web app works offline which was critical for our mobile users with connectivity issues. Performance improved 40%, engagement increased significantly. Fantastic solution.</>},
            {name: 'Rajeev Kumar', title: 'VP Product, E-commerce Company', message: <>Web application from Grey InfoTech works perfectly on mobile, tablet, and desktop. Conversion rates improved noticeably and the development cost was half of building native apps. Excellent partnership.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Browser-based Systems',
                description: 'Develop powerful applications that run directly in the browser, eliminating installation complexity and enabling instant access across devices.'
            },
            {
                id: 'vs2',
                title: 'SaaS Platforms',
                description: 'Build subscription-based software with multi-tenant architecture, billing integration, analytics, and scaling capabilities for growing businesses.'
            },
            {
                id: 'vs3',
                title: 'Progressive Web Apps',
                description: 'Create app-like experiences with offline functionality, push notifications, and responsive design that work seamlessly across all devices.'
            }
        ]}/>
);

export default WebApplication;
