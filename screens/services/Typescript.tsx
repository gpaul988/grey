import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Typescript = () => (
    <ServicePageTemplate
        title={<>TypeScript <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Type-safe JavaScript for large-scale systems and enterprise platforms.
                TypeScript catches errors at compile-time and enables maintainable code at enterprise scale.
            </>
        }
        eyebrow={<>JavaScript with types, <br className={'lg:block md:block hidden'}/>scalable and robust</>}
        introHeading={<>TypeScript Development <br className={'lg:block md:block hidden'}/>Scale with Confidence</>}
        introBody={[
            <>
                TypeScript transforms JavaScript with a powerful type system that catches errors before they reach production.
                At Grey InfoTech we harness TypeScript's capabilities to build large-scale systems and enterprise platforms where
                reliability and maintainability matter. TypeScript catches bugs at compile-time, enables superior IDE support and
                developer experience, and makes large codebases navigable. Whether building microservices, data pipelines, or complex
                applications, TypeScript provides the safety and tooling needed for teams to collaborate effectively and scale code.
            </>,
            <>
                TypeScript excels at enabling teams to work with complex systems confidently. Type definitions serve as documentation,
                refactoring tools understand your code structure perfectly, and the compiler catches many bugs before runtime. We build
                full-stack TypeScript applications -backend services, frontend applications, and CLIs -all sharing consistent type definitions
                and patterns. TypeScript's maturity and adoption across frameworks (React, Node.js, Express, Next.js) make it the standard
                for production JavaScript applications.
            </>,
        ]}
        solutionsHeading={<>TypeScript <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From microservices and backend systems to frontend applications and CLIs,
                Grey InfoTech delivers comprehensive TypeScript development. Type-safety combined with JavaScript's flexibility
                creates scalable, maintainable systems suitable for enterprise environments.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Backend Systems & APIs', target: 'WA',
                tags: ['Node.js', 'Express', 'Type-safe'],
                body: <>We build robust backend systems and APIs with TypeScript, Node.js, and Express. Type definitions prevent entire classes of runtime errors. REST and GraphQL APIs with full type safety enable confident refactoring and easier maintenance as systems scale.</>,
            },
            {
                id: '02', title: 'Type-safe Frontend Applications', target: 'DE',
                tags: ['React', 'Vue', 'Type definitions'],
                body: <>We develop frontend applications with React, Vue, and TypeScript where component props and state are fully typed. Catch rendering bugs early, enable accurate IDE autocomplete, and maintain confidence during refactoring large codebases.</>,
            },
            {
                id: '03', title: 'Microservices Architecture', target: 'ML',
                tags: ['Microservices', 'Scalability', 'Type-safe'],
                body: <>We architect TypeScript microservices where services communicate through well-defined interfaces. Shared type definitions across services prevent integration bugs and enable safe evolution of service contracts.</>,
            },
            {
                id: '04', title: 'Data Pipelines & CLI Tools', target: 'AU',
                tags: ['Data Processing', 'CLI', 'Automation'],
                body: <>We build data processing systems and CLI tools with TypeScript ensuring data transformations work correctly. Type safety prevents silent data corruption and makes data flow changes traceable and safe.</>,
            },
            {
                id: '05', title: 'Full-Stack TypeScript', target: 'CD',
                tags: ['Full-stack', 'Type consistency', 'Integration'],
                body: <>We build complete TypeScript systems where frontend, backend, and shared types form a cohesive whole. Changes to shared types propagate throughout the codebase ensuring consistency and preventing integration bugs.</>,
            },
            {
                id: '06', title: 'Type Migration & Modernization', target: 'MS',
                tags: ['Migration', 'Refactoring', 'Modernization'],
                body: <>We migrate JavaScript codebases to TypeScript incrementally, adding type safety without disrupting operations. Gradual adoption enables teams to experience TypeScript benefits while maintaining productivity.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Compile-time Error Detection', image: '/assets/services/Development.jpg',
                description: <>TypeScript catches type-related errors at compile-time, preventing entire categories of runtime bugs from reaching production. Fewer production issues mean happier users and lower support costs.</>,
            },
            {
                id: 2, title: 'Superior Developer Experience', image: '/assets/services/Research-strategy.jpg',
                description: <>IDEs provide accurate autocomplete, refactoring tools understand code structure perfectly, and navigation is effortless. Developers focus on logic instead of hunting for method signatures.</>,
            },
            {
                id: 3, title: 'Scalable Codebases', image: '/assets/services/services.jpg',
                description: <>Type definitions serve as up-to-date documentation. Large teams understand code intent through types. Refactoring large systems becomes safe and tractable.</>,
            },
            {
                id: 4, title: 'JavaScript Flexibility', image: '/assets/services/digital-optimisation.jpg',
                description: <>TypeScript is a superset of JavaScript enabling incremental adoption. Use TypeScript features selectively while maintaining JavaScript compatibility and using untyped libraries.</>,
            },
        ]}
        ctaHeading={<>Build scalable systems <br className={'lg:block md:block hidden'}/>with TypeScript</>}
        ctaBody={<>From microservices and APIs to full-stack applications and data systems, Grey InfoTech delivers TypeScript solutions that combine type-safety with JavaScript flexibility. Let's build software that scales with your team and grows with your business.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 14, suffix: '+'},
            {label: 'Systems Built', value: 160, suffix: '+'},
            {label: 'Projects Delivered', value: 220, suffix: '+'},
            {label: 'Client Satisfaction', value: 99, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Robert Kim', title: 'Tech Lead, Fintech Company', message: <>TypeScript development from Grey InfoTech eliminated entire categories of production bugs. The type safety gave us confidence to refactor aggressively. Code quality improved dramatically and developer velocity increased.</>},
            {name: 'Adeline Dupont', title: 'CTO, SaaS Platform', message: <>Their full-stack TypeScript architecture unified our frontend and backend. Shared types prevent integration bugs. The coherence and type safety made scaling our team much easier.</>},
            {name: 'Vikram Singh', title: 'Founder, Data Platform', message: <>TypeScript microservices from Grey InfoTech scale beautifully. Service contracts are type-safe so we evolve APIs confidently. The developer experience is exceptional and code maintainability is outstanding.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Type-safe Applications',
                description: 'Develop applications with compile-time type checking that catches errors early, prevents runtime bugs, and improves code reliability significantly.'
            },
            {
                id: 'vs2',
                title: 'Large-scale Systems',
                description: 'Build enterprise systems where teams collaborate confidently through type definitions that serve as documentation and enable safe refactoring.'
            },
            {
                id: 'vs3',
                title: 'Enterprise Platforms',
                description: 'Create mission-critical platforms with full-stack TypeScript ensuring consistency across services, preventing integration issues, and enabling rapid evolution.'
            }
        ]}/>
);

export default Typescript;
