import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const LaravelDevelopment = () => (
    <ServicePageTemplate
        title={<>Laravel <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                Robust Laravel development for scalable web applications. Build content management systems, business 
                applications, and modernized legacy systems with Laravel that organize, automate, and drive operational excellence.
            </>
        }
        eyebrow={<>Enterprise-grade PHP <br className={'lg:block md:block hidden'}/>with Laravel</>}
        introHeading={<>Laravel Development <br className={'lg:block md:block hidden'}/>From MVPs to Enterprise</>}
        introBody={[
            <>
                Laravel is one of the most elegant and expressive PHP frameworks available, trusted by enterprises worldwide 
                for building scalable, maintainable web applications. At Grey InfoTech, we harness Laravel's powerful features 
                including Eloquent ORM, Blade templating, and comprehensive ecosystem tools to engineer robust back-ends and 
                applications that are clean, scalable, and a pleasure to maintain. From high-throughput APIs to complex business 
                logic, we deliver Laravel solutions backed by rigorous testing and thoughtful architecture.
            </>,
            <>
                Beyond web applications, Laravel powers scalable content platforms, robust enterprise applications, and 
                seamless legacy system modernization. We build ETL pipelines, automation workflows, and microservices that 
                transform and integrate information reliably. With best practices around containerisation, CI/CD, and observability, 
                we deliver Laravel systems that perform under load, scale with demand, and integrate smoothly with the rest of your stack.
            </>,
        ]}
        solutionsHeading={<>Laravel <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From content management systems and business applications to API development and legacy modernization, Grey InfoTech 
                delivers comprehensive Laravel development services. Based in Nigeria and working globally, we build performant, 
                well-tested Laravel systems that scale and turn complex requirements into reliable software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Content Management Systems', target: 'CWAD',
                tags: ['CMS Development', 'Laravel', 'Scalable'],
                body: <>We build scalable content management systems and platforms with Laravel that organize, publish and 
                    distribute content efficiently. Our CMS solutions provide powerful content administration tools, flexible 
                    workflows, and seamless content delivery across channels -empowering teams to manage digital assets effectively.</>,
            },
            {
                id: '02', title: 'Business Applications', target: 'BAD',
                tags: ['Enterprise Apps', 'Workflow Automation', 'Integration'],
                body: <>Engineer robust enterprise applications with Laravel that automate workflows and drive operational 
                    excellence at scale. We build business-critical systems that handle complex operations, integrate with existing 
                    infrastructure, and support growth through scalable, maintainable architecture.</>,
            },
            {
                id: '03', title: 'API Development', target: 'AD',
                tags: ['REST APIs', 'GraphQL', 'Authentication'],
                body: <>We develop robust REST and GraphQL APIs with Laravel that power mobile apps, web frontends, and 
                    third-party integrations. Our APIs feature clean architecture, secure authentication, comprehensive documentation, 
                    and well-tested endpoints that handle real traffic reliably.</>,
            },
            {
                id: '04', title: 'E-Commerce Solutions', target: 'ES',
                tags: ['Laravel Ecommerce', 'Payment Integration', 'Scalability'],
                body: <>Build powerful e-commerce platforms with Laravel that drive sales and customer engagement. We engineer 
                    shopping systems with product catalogs, shopping carts, secure payment processing, inventory management, and 
                    order fulfillment that scale reliably.</>,
            },
            {
                id: '05', title: 'Real-time Features', target: 'RF',
                tags: ['Broadcasting', 'WebSockets', 'Real-time Data'],
                body: <>We implement real-time features using Laravel Broadcasting and WebSockets that deliver instant updates, 
                    live notifications, and interactive experiences. Our solutions ensure low-latency communication and seamless 
                    real-time synchronization across connected clients.</>,
            },
            {
                id: '06', title: 'Legacy System Modernization', target: 'LSM',
                tags: ['Refactoring', 'Migration', 'Modernization'],
                body: <>Refactor and migrate legacy systems to modern Laravel architecture, improving maintainability and adding 
                    new capabilities. We modernize outdated applications by transitioning them to current Laravel practices, enhancing 
                    security, scalability, and developer experience.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Elegant & Expressive Framework', image: '/assets/services/Development.jpg',
                description: <>Laravel provides an elegant, expressive syntax that makes development efficient and enjoyable. 
                    Its convention-over-configuration approach accelerates development while maintaining code quality and readability.</>,
            },
            {
                id: 2, title: 'Rich Ecosystem & Tools', image: '/assets/services/Research-strategy.jpg',
                description: <>Laravel's comprehensive ecosystem includes tools for authentication, caching, testing, queuing, and 
                    more. We leverage these powerful tools to build complete, production-ready applications quickly and reliably.</>,
            },
            {
                id: 3, title: 'Scalability & Performance', image: '/assets/services/services.jpg',
                description: <>We architect Laravel applications for throughput and growth using caching strategies, database 
                    optimization, and microservices patterns. Your Laravel systems stay fast and responsive as demand climbs.</>,
            },
            {
                id: 4, title: 'Security & Best Practices', image: '/assets/services/digital-optimisation.jpg',
                description: <>Laravel's built-in security features and our adherence to best practices mean your applications 
                    protect user data and remain secure from evolving threats. We implement comprehensive testing, code reviews, 
                    and security audits.</>,
            },
        ]}
        ctaHeading={<>Build powerful <br className={'lg:block md:block hidden'}/>with Laravel</>}
        ctaBody={<>From scalable content platforms and business applications to legacy modernization, Grey InfoTech delivers Laravel 
            systems that perform and endure. Let's turn your toughest requirements into clean, reliable software.</>}
        stats={[
            {label: 'Years Experience', value: 7, suffix: '+'},
            {label: 'Team Members', value: 12, suffix: '+'},
            {label: 'Laravel Apps Built', value: 100, suffix: '+'},
            {label: 'Projects Delivered', value: 180, suffix: '+'},
            {label: 'Client Satisfaction', value: 97, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Emeka Ukaegbu', title: 'Director, ContentHub Nigeria', message: <>Grey InfoTech built our entire CMS in Laravel. The system is robust, easy to maintain, and has handled our growth effortlessly.</>},
            {name: 'Folake Adeyemi', title: 'CTO, Business Solutions Ltd', message: <>Their Laravel expertise transformed our legacy system into a modern, scalable application. Great architecture and excellent support.</>},
            {name: 'Seun Oluwaseun', title: 'Founder, E-Commerce Platform', message: <>The team delivered a high-performing e-commerce platform in Laravel that handles thousands of daily transactions reliably.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Content Platforms',
                description: 'Build scalable content management systems and platforms with Laravel that organize, publish and distribute content efficiently.'
            },
            {
                id: 'vs2',
                title: 'Business Applications',
                description: 'Engineer robust enterprise applications with Laravel that automate workflows and drive operational excellence at scale.'
            },
            {
                id: 'vs3',
                title: 'Legacy System Modernization',
                description: 'Refactor and migrate legacy systems to modern Laravel architecture, improving maintainability and adding new capabilities.'
            }
        ]}/>
);

export default LaravelDevelopment;
