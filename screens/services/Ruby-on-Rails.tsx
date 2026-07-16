import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const RubyOnRails = () => (
    <ServicePageTemplate
        title={<>Ruby on Rails <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Rapid MVP development and full-featured startup platforms built with Ruby on Rails.
                From proof-of-concept to production platform, Rails delivers speed and developer happiness.
            </>
        }
        eyebrow={<>Convention over configuration, <br className={'lg:block md:block hidden'}/>rapid development</>}
        introHeading={<>Ruby on Rails Development <br className={'lg:block md:block hidden'}/>Ideas to Launch</>}
        introBody={[
            <>
                Ruby on Rails powers some of the fastest-growing startups and platforms -from Airbnb and Shopify to GitHub and Hulu.
                At Grey InfoTech we harness Rails's "convention over configuration" philosophy and rich ecosystem to build MVPs and
                complete platforms in record time. Rails enables small teams to do what would require much larger teams with other
                frameworks. Whether proving an idea, launching a startup, or scaling existing platforms, our Rails expertise delivers
                applications that combine development speed with reliability and maintainability.
            </>,
            <>
                Beyond rapid development, Rails excels at managing complex business logic, background jobs, and real-time features.
                We build content management systems, marketplace platforms, SaaS applications, and startup infrastructure with Rails.
                Modern Rails combines with React/Vue frontends for sophisticated user experiences. Deployment to cloud platforms is
                straightforward, and scaling is supported natively. Rails is the smart choice for ambitious projects where speed of
                development matters and startup culture values developer productivity.
            </>,
        ]}
        solutionsHeading={<>Ruby on Rails <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From rapid MVP development to fully-scaled startup platforms, Grey InfoTech delivers comprehensive Ruby on Rails development.
                Convention-driven architecture and battle-tested patterns enable fast development without sacrificing quality or maintainability.
            </>
        }
        solutions={[
            {
                id: '01', title: 'MVP Development', target: 'WA',
                tags: ['Rapid', 'Proof of Concept', 'Iteration'],
                body: <>We build minimum viable products in weeks using Rails's productivity advantages. Quickly validate ideas, gather user feedback, and iterate rapidly. Rails's integrated tooling enables solo developers or small teams to ship production applications.</>,
            },
            {
                id: '02', title: 'Startup Platforms', target: 'DE',
                tags: ['Scalable', 'Full-featured', 'Production-ready'],
                body: <>We architect and build complete startup platforms with Rails. User authentication, payments integration, admin interfaces, and business logic come together rapidly. Rails scales from prototype to millions of users without architectural rewrites.</>,
            },
            {
                id: '03', title: 'Content Management Systems', target: 'ML',
                tags: ['CMS', 'Content Publishing', 'Flexible'],
                body: <>We build custom content management systems with Rails tailored to specific business needs. Content workflows, editorial calendars, multi-language support, and publishing automation -all built on Rails's solid foundation.</>,
            },
            {
                id: '04', title: 'Marketplace Platforms', target: 'AU',
                tags: ['Two-sided', 'Payments', 'Ratings'],
                body: <>We develop marketplace platforms connecting buyers and sellers. Payment processing, reputation systems, dispute resolution, and commission management -Rails handles the complexity of two-sided platforms elegantly.</>,
            },
            {
                id: '05', title: 'Admin Interfaces & Dashboards', target: 'CD',
                tags: ['Admin Panels', 'Reporting', 'Automation'],
                body: <>We build powerful admin interfaces and operational dashboards with Rails. Manage your business data efficiently with tools for reporting, batch operations, user management, and system configuration.</>,
            },
            {
                id: '06', title: 'Modernisation & Support', target: 'MS',
                tags: ['Upgrades', 'Refactoring', 'Maintenance'],
                body: <>We maintain and upgrade Rails applications -framework updates, dependency management, performance optimization, and security patches. Keep your applications current, secure, and maintainable as Rails and Ruby evolve.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Development Speed', image: '/assets/services/Development.jpg',
                description: <>Rails's conventions and integrated tools enable teams to build complete features in a fraction of the time required by other frameworks, dramatically accelerating time-to-market.</>,
            },
            {
                id: 2, title: 'Developer Happiness', image: '/assets/services/Research-strategy.jpg',
                description: <>Rails prioritizes developer productivity and experience. The elegant syntax and philosophy attract talented developers who deliver better code faster and stay motivated.</>,
            },
            {
                id: 3, title: 'Proven at Scale', image: '/assets/services/services.jpg',
                description: <>Rails powers platforms handling millions of users and transactions daily. Proven scalability, performance optimization practices, and deployment strategies mean Rails can grow with your business.</>,
            },
            {
                id: 4, title: 'Rich Ecosystem', image: '/assets/services/digital-optimisation.jpg',
                description: <>Rails community provides battle-tested gems (libraries) for virtually every requirement. Authentication, payments, file storage, and business logic -proven solutions exist and integrate seamlessly.</>,
            },
        ]}
        ctaHeading={<>Launch your startup <br className={'lg:block md:block hidden'}/>with Rails</>}
        ctaBody={<>From rapid MVP development to fully-scaled startup platforms, Grey InfoTech delivers Ruby on Rails solutions that combine development speed with reliability and scalability. Let's turn your vision into a market-ready platform faster than you thought possible.</>}
        stats={[
            {label: 'Years Experience', value: 9, suffix: '+'},
            {label: 'Team Members', value: 12, suffix: '+'},
            {label: 'Platforms Built', value: 110, suffix: '+'},
            {label: 'Projects Delivered', value: 190, suffix: '+'},
            {label: 'Client Satisfaction', value: 97, suffix: '%'},
        ]}
        testimonials={[
            {name: 'David Mensah', title: 'Founder, Tech Startup', message: <>Grey InfoTech's Rails expertise got our MVP to market in 8 weeks. The platform handles our growth seamlessly and the code quality is exceptional. Best decision we made for our startup.</>},
            {name: 'Elena Vasquez', title: 'CEO, Marketplace Platform', message: <>They built our two-sided marketplace on Rails and it scales beautifully. From concept to 100k users took less than a year. Their understanding of Rails and startup challenges was invaluable.</>},
            {name: 'Raj Patel', title: 'Product Manager, SaaS Company', message: <>Rails development from Grey InfoTech powers our SaaS platform. The productivity advantages are incredible -features that would take weeks elsewhere ship in days. Highly recommended.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Rapid MVP Development',
                description: 'Launch your minimum viable product in weeks, not months, with Rails productivity advantages that enable small teams to build complete, production-ready applications.'
            },
            {
                id: 'vs2',
                title: 'Startup Platforms',
                description: 'Build full-featured startup platforms with user authentication, payments, analytics, and complex business logic using Rails conventions and integrated tooling.'
            },
            {
                id: 'vs3',
                title: 'Content Management Systems',
                description: 'Develop custom content management systems tailored to your business workflows, with publishing automation, multi-language support, and editorial tools.'
            }
        ]}/>
);

export default RubyOnRails;
