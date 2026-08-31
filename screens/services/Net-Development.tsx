import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const NetDevelopment = () => (
    <ServicePageTemplate
        title={<>.NET <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                Enterprise-grade .NET development for scalable applications. Build complex enterprise systems, cloud-native 
                microservices, and high-performance APIs with .NET that handle high transaction volumes and scale elastically.
            </>
        }
        eyebrow={<>Modern .NET for <br className={'lg:block md:block hidden'}/>enterprise excellence</>}
        introHeading={<>.NET Development <br className={'lg:block md:block hidden'}/>Built for Enterprise</>}
        introBody={[
            <>
                .NET is a powerful, modern framework trusted by enterprises worldwide for building scalable, secure applications. 
                At Grey InfoTech, we leverage .NET and C# to engineer complex enterprise systems, cloud-native microservices, and 
                high-performance APIs that handle high transaction volumes and integrate seamlessly with existing systems. From 
                monolithic applications to distributed microservices architectures, we deliver .NET solutions backed by rigorous 
                testing and thoughtful architecture.
            </>,
            <>
                The evolution of .NET Core to .NET has made cross-platform development seamless, enabling us to build applications 
                that run on Windows, Linux, and cloud platforms with equal performance. We build scalable microservices, cloud-native 
                APIs on Azure, AWS, and GCP, and enterprise applications that support independent scaling, deployment, and team autonomy. 
                With best practices in containerisation, CI/CD, and observability, we deliver .NET systems that perform under load, 
                scale with demand, and integrate smoothly with your existing technology stack.
            </>,
        ]}
        solutionsHeading={<>.NET Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From enterprise applications and cloud services to microservices and APIs, Grey InfoTech delivers comprehensive .NET 
                development services. We engineer robust, scalable systems that handle complex business requirements and drive enterprise 
                success.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Enterprise Applications', target: 'NAD',
                tags: ['.NET Framework', 'Enterprise Architecture', 'Integration'],
                body: <>We build complex enterprise applications with .NET that handle high transaction volumes and integrate 
                    seamlessly with existing systems. Our applications feature robust architecture, comprehensive security, and 
                    scalable infrastructure to support mission-critical operations.</>,
            },
            {
                id: '02', title: 'Cloud Services & APIs', target: 'NI',
                tags: ['Azure', 'AWS', 'Cloud-native'],
                body: <>Engineer cloud-native microservices and APIs on Azure, AWS, and GCP that scale elastically with modern 
                    architectures. We design distributed systems that leverage cloud capabilities for elasticity, reliability, and 
                    cost-effectiveness.</>,
            },
            {
                id: '03', title: 'Microservices Architecture', target: 'NMS',
                tags: ['Microservices', 'Docker', 'Kubernetes'],
                body: <>We design and implement microservices architectures using .NET that enable independent scaling, deployment, 
                    and team autonomy. Our microservices approach supports rapid iteration, resilience, and operational flexibility.</>,
            },
            {
                id: '04', title: 'Web APIs & Services', target: 'NM',
                tags: ['REST', 'GraphQL', 'WebAPI'],
                body: <>We develop robust REST and GraphQL APIs with .NET that power web frontends, mobile apps, and third-party 
                    integrations. Our APIs feature clean architecture, comprehensive documentation, and reliable performance at scale.</>,
            },
            {
                id: '05', title: 'Database Solutions', target: 'NMD',
                tags: ['SQL Server', 'Entity Framework', 'Optimization'],
                body: <>We design and implement database solutions using SQL Server and Entity Framework that provide efficient data 
                    access, performance optimization, and reliable data management for enterprise applications.</>,
            },
            {
                id: '06', title: 'Legacy Modernization', target: 'LM',
                tags: ['Migration', 'Refactoring', 'Modernization'],
                body: <>We modernize legacy .NET applications by upgrading to current versions, migrating to microservices, and 
                    implementing cloud-native patterns. Our approach improves maintainability, security, and performance.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Enterprise-Ready Platform', image: '/assets/services/Development.jpg',
                description: <>The .NET platform is specifically designed for enterprise development with built-in security, 
                    performance optimization, and integration capabilities that make enterprise solutions reliable and scalable.</>,
            },
            {
                id: 2, title: 'Cloud-Native Capabilities', image: '/assets/services/Research-strategy.jpg',
                description: <>Modern .NET is cloud-native from the ground up, with seamless integration with Azure, AWS, and GCP. 
                    We leverage container orchestration and cloud services to build scalable, resilient systems.</>,
            },
            {
                id: 3, title: 'Performance & Scalability', image: '/assets/services/services.jpg',
                description: <>We architect .NET applications for throughput and growth using async patterns, caching strategies, and 
                    horizontal scaling. Your systems stay fast and responsive as demand increases.</>,
            },
            {
                id: 4, title: 'Security & Compliance', image: '/assets/services/digital-optimisation.jpg',
                description: <>.NET provides comprehensive security features and our adherence to best practices ensures your enterprise 
                    applications meet regulatory requirements and protect sensitive data from evolving threats.</>,
            },
        ]}
        ctaHeading={<>Build enterprise-scale <br className={'lg:block md:block hidden'}/>with .NET</>}
        ctaBody={<>From complex enterprise systems and cloud services to microservices and APIs, Grey InfoTech delivers .NET solutions 
            that perform and scale. Let's build the next generation of your enterprise platform.</>}
        stats={[
            {label: 'Years Experience', value: 9, suffix: '+'},
            {label: 'Team Members', value: 16, suffix: '+'},
            {label: '.NET Apps Built', value: 110, suffix: '+'},
            {label: 'Projects Delivered', value: 190, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Olawale Okafor', title: 'CIO, Financial Services Corp', message: <>Grey InfoTech migrated our legacy systems to modern .NET microservices. The architecture is excellent, and the performance improvements are significant.</>},
            {name: 'Chioma Udeze', title: 'VP Engineering, Tech Enterprise', message: <>Their .NET expertise helped us build a scalable, cloud-native platform on Azure that handles millions of transactions daily.</>},
            {name: 'Femi Adebayo', title: 'Director, Enterprise Solutions', message: <>The team's .NET development capabilities are outstanding. They delivered a complex enterprise system that exceeded our performance expectations.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Enterprise Applications',
                description: 'Build complex enterprise applications with .NET that handle high transaction volumes and integrate seamlessly with existing systems.'
            },
            {
                id: 'vs2',
                title: 'Cloud Services',
                description: 'Engineer cloud-native microservices and APIs on Azure, AWS, and GCP that scale elastically with modern architectures.'
            },
            {
                id: 'vs3',
                title: 'Microservices',
                description: 'Design and implement microservices architectures using .NET that enable independent scaling, deployment and team autonomy.'
            }
        ]}/>
);

export default NetDevelopment;
