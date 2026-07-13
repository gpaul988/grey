import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const NodejsDevelopment = () => (
    <ServicePageTemplate
        title={<>Node.js <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/node/mid.jpg"
        topImages={['/assets/node/3.jpg', '/assets/node/4.jpg', '/assets/node/1.jpg', '/assets/node/2.jpg']}
        intro={
            <>
                Powerful, scalable server-side JavaScript for microservices, real-time APIs, and high-performance
                backends built with Express, Nest.js and other frameworks for reliability you can trust.
            </>
        }
        eyebrow={<>JavaScript on the server, <br className={'lg:block md:block hidden'}/>powering the web</>}
        introHeading={<>Node.js Development <br className={'lg:block md:block hidden'}/>From APIs to Microservices</>}
        introBody={[
            <>
                Node.js powers some of the world's most demanding real-time applications—streaming services, messaging
                platforms, collaborative tools, and high-traffic APIs. At Grey InfoTech we harness its event-driven
                architecture and non-blocking I/O to build back-ends and services that are fast, scalable, and built
                for performance. Using Express, Nest.js and other frameworks, we engineer robust REST and GraphQL APIs,
                real-time services, WebSocket-driven features, and complex business logic—all backed by rigorous testing
                and thoughtful architecture. Whether you need a high-throughput API, a microservices mesh, or an
                end-to-end platform, our Node.js expertise turns ambitious requirements into dependable, production-ready systems.
            </>,
            <>
                Beyond traditional APIs, Node.js excels at powering real-time applications where instant communication matters.
                We build streaming services, collaborative platforms, IoT backends, and event-driven systems that react instantly
                to data and user actions. With Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure on AWS, Azure or GCP,
                we containerize, deploy and operate Node.js services reliably. From monitoring and logging to autoscaling and
                disaster recovery, we deliver Node.js systems that stay fast, observable, and resilient under real-world load.
            </>,
        ]}
        solutionsHeading={<>Node.js <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From real-time APIs and microservices to streaming platforms and IoT backends, Grey InfoTech delivers the
                full breadth of Node.js development. Based in Nigeria and working globally, we build performant,
                well-tested Node.js systems that scale—turning complex requirements into reliable software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'REST & GraphQL APIs', target: 'WA',
                tags: ['Express', 'Nest.js', 'REST/GraphQL'],
                body: <>We build robust, high-performance APIs with Express, Nest.js and other frameworks—clean architecture, secure authentication, and well-documented endpoints. From monoliths to microservices, we engineer services that handle real traffic reliably and stay easy to extend.</>,
            },
            {
                id: '02', title: 'Real-time Applications', target: 'DE',
                tags: ['WebSocket', 'Socket.io', 'Streaming'],
                body: <>We design and build real-time systems using WebSockets and streaming technologies that power collaborative apps, live dashboards, and instant messaging platforms. Event-driven architectures enable responsive, interactive experiences that react instantly to user actions and data changes.</>,
            },
            {
                id: '03', title: 'Microservices Architecture', target: 'ML',
                tags: ['Docker', 'Kubernetes', 'Service Mesh'],
                body: <>We architect and build microservices systems where independent, loosely-coupled services work together seamlessly. Service discovery, API gateways, and inter-service communication enable scalable, resilient platforms that evolve as your business grows.</>,
            },
            {
                id: '04', title: 'IoT & Streaming Backends', target: 'AU',
                tags: ['IoT', 'Data Streaming', 'MQTT'],
                body: <>We build backends that handle massive data ingestion from IoT devices and streaming sources. Processing pipelines collect, transform, and route data reliably—powering real-time analytics, monitoring systems, and automated workflows.</>,
            },
            {
                id: '05', title: 'Cloud, DevOps & Deployment', target: 'CD',
                tags: ['Docker', 'CI/CD', 'AWS', 'Observability'],
                body: <>We containerise, deploy and operate Node.js services with Docker, Kubernetes, CI/CD pipelines and cloud infrastructure on AWS, Azure or GCP. With monitoring, logging and autoscaling in place, your applications stay fast, observable and resilient.</>,
            },
            {
                id: '06', title: 'Modernisation & Support', target: 'MS',
                tags: ['Refactoring', 'Migration', 'Testing', 'Maintenance'],
                body: <>We refactor legacy Node.js codebases, upgrade frameworks and dependencies, add test coverage, and provide ongoing support. We bring outdated applications up to current standards so they stay secure, performant and ready for modern challenges.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Real-time Capabilities', image: '/assets/services/Development.jpg',
                description: <>Event-driven architecture and non-blocking I/O make Node.js ideal for real-time applications where instant communication and responsiveness matter.</>,
            },
            {
                id: 2, title: 'JavaScript Everywhere', image: '/assets/services/Research-strategy.jpg',
                description: <>Use the same language across frontend and backend for seamless full-stack development, shared code libraries, and teams that work together naturally.</>,
            },
            {
                id: 3, title: 'Scalability & Performance', image: '/assets/services/services.jpg',
                description: <>Non-blocking I/O handles thousands of concurrent connections efficiently. Horizontal scaling and clustering enable massive throughput without overwhelming resources.</>,
            },
            {
                id: 4, title: 'Rich Ecosystem', image: '/assets/services/digital-optimisation.jpg',
                description: <>npm ecosystem provides battle-tested libraries for virtually every use case. Mature frameworks like Express and Nest.js accelerate development while maintaining code quality and maintainability.</>,
            },
        ]}
        ctaHeading={<>Build scalable backends <br className={'lg:block md:block hidden'}/>with Node.js</>}
        ctaBody={<>From real-time APIs and microservices to streaming platforms and IoT systems, Grey InfoTech delivers Node.js solutions that perform and scale. Let's turn your backend requirements into fast, reliable infrastructure that powers your business.</>}
        stats={[
            {label: 'Years Experience', value: 10, suffix: '+'},
            {label: 'Team Members', value: 16, suffix: '+'},
            {label: 'APIs & Services Built', value: 180, suffix: '+'},
            {label: 'Projects Delivered', value: 250, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ibrahim Okonkwo', title: 'CTO, RealTime Systems', message: <>Their Node.js expertise enabled us to scale from thousands to millions of concurrent connections. The microservices architecture they designed runs reliably and performs beautifully.</>},
            {name: 'Fatima Al-Rashid', title: 'Founder, StreamData Platform', message: <>Grey InfoTech built our entire real-time data streaming platform in Node.js. It handles massive data ingestion effortlessly with minimal latency. Exceptional work.</>},
            {name: 'David Chen', title: 'Product Lead, Collaborative Tools', message: <>Their WebSocket implementation powers our collaboration features seamlessly. Thousands of concurrent users, zero issues. They're true Node.js specialists who understand performance at scale.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Microservices Architecture',
                description: 'Build distributed systems with independent, loosely-coupled services using Docker and Kubernetes for scalability, resilience, and independent deployment cycles.'
            },
            {
                id: 'vs2',
                title: 'Real-time APIs & Services',
                description: 'Engineer high-throughput REST and GraphQL APIs with WebSocket support for instant communication, real-time data delivery, and collaborative features.'
            },
            {
                id: 'vs3',
                title: 'Scalable Backend Infrastructure',
                description: 'Deploy production-grade Node.js systems with auto-scaling, load balancing, monitoring, and disaster recovery for applications that handle massive growth.'
            }
        ]}/>
);

export default NodejsDevelopment;
