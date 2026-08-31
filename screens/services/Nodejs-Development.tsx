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
                Scalable backend services with Express, NestJS, microservices. 10M+ requests/day, 99.9%+ uptime, sub-100ms latency. $100M+ in transactions processed. Enterprise-grade API design and microservices architecture.
            </>
        }
        eyebrow={<>JavaScript backend infrastructure, <br className={'lg:block md:block hidden'}/>built for enterprise scale</>}
        introHeading={<>Node.js Development <br className={'lg:block md:block hidden'}/>APIs, Microservices, and Real-time Systems</>}
        introBody={[
            <>
                Node.js powers some of the world's most demanding systems handling 10M+ requests daily. At Grey InfoTech with 9+ years of specialization, we harness Node.js's event-driven architecture and non-blocking I/O to build backends processing $100M+ in transactions with 99.9%+ uptime. Using Express, NestJS, and advanced microservices patterns, we engineer robust REST and GraphQL APIs achieving sub-100ms response times, real-time services with WebSocket integration, and complex business logic backed by rigorous testing. Our 16+ dedicated backend engineers have delivered 250+ backend services maintaining 99.2% uptime across enterprise deployments.
            </>,
            <>
                Beyond traditional APIs, Node.js excels at real-time applications where instant communication and responsiveness drive competitive advantage. We build streaming platforms, collaborative tools, IoT backends, and event-driven systems reacting instantly to data and user actions. With Docker, Kubernetes, CI/CD pipelines, and cloud infrastructure on AWS, Azure, and GCP, we containerize, deploy, and operate Node.js services reliably. Comprehensive monitoring, logging, autoscaling, and disaster recovery ensure your systems remain fast, observable, and resilient under demanding production loads.
            </>,
        ]}
        solutionsHeading={<>Node.js <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                Grey InfoTech delivers comprehensive Node.js development across 250+ backend services handling 10M+ daily requests with 99.9%+ uptime. From scalable API architecture to microservices patterns, event-driven systems, and real-time platforms, we process $100M+ in transactions maintaining sub-100ms response times. 99.2% uptime and 350+ projects demonstrate our expertise in enterprise-grade backend development.
            </>
        }
        solutions={[
            {
                id: '01', title: 'REST & GraphQL APIs', target: 'WA',
                tags: ['Express', 'NestJS', 'GraphQL'],
                body: <>Enterprise-grade APIs with Express and NestJS handling 10M+ daily requests. Clean architecture, OAuth authentication, rate limiting, and comprehensive documentation. From monolithic services to microservices, we engineer systems maintaining sub-100ms latency and 99.9%+ uptime across 250+ production deployments processing $100M+ in transactions.</>,
            },
            {
                id: '02', title: 'Real-time Applications', target: 'DE',
                tags: ['WebSocket', 'Socket.io', 'Streaming'],
                body: <>Real-time systems with WebSockets and streaming technologies for collaborative apps, live dashboards, and instant messaging. Event-driven architecture enables responsive experiences reacting instantly to user actions. Proven performance handling thousands of concurrent connections with sub-100ms response times.</>,
            },
            {
                id: '03', title: 'Microservices Architecture', target: 'ML',
                tags: ['Docker', 'Kubernetes', 'Service Mesh'],
                body: <>Distributed systems with independent, loosely-coupled services orchestrated with Kubernetes. Service discovery, API gateways, and inter-service communication enable scalable, resilient platforms. 250+ backend services deployed maintaining independent scaling and deployment cycles for enterprise agility.</>,
            },
            {
                id: '04', title: 'IoT & Data Streaming', target: 'AU',
                tags: ['IoT', 'Kafka', 'Data Pipelines'],
                body: <>High-throughput backends processing massive data ingestion from IoT devices and streaming sources. Event-driven pipelines collect, transform, and route data reliably. Processing 10M+ requests/day with sub-100ms latency powering real-time analytics, monitoring systems, and automated workflows at scale.</>,
            },
            {
                id: '05', title: 'Cloud & DevOps Deployment', target: 'CD',
                tags: ['Docker', 'Kubernetes', 'CI/CD'],
                body: <>Production-grade containerization with Docker and Kubernetes on AWS, Azure, and GCP. CI/CD pipelines, comprehensive monitoring, distributed logging, and autoscaling ensure 99.9%+ uptime. Zero-downtime deployments, disaster recovery, and cost optimization enable reliable infrastructure for enterprise applications.</>,
            },
            {
                id: '06', title: 'Modernisation & Support', target: 'MS',
                tags: ['Refactoring', 'Performance Optimization', 'Testing'],
                body: <>Legacy codbase refactoring, framework upgrades, test coverage improvements, and ongoing support. 9+ years of Node.js expertise brings outdated systems to current standards. Continuous optimization, security patches, and performance monitoring maintain 99.2% uptime and operational excellence.</>,
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
        ctaHeading={<>Build scalable, enterprise-grade <br className={'lg:block md:block hidden'}/>backend infrastructure with Node.js</>}
        ctaBody={<>Grey InfoTech delivers 250+ backend services handling 10M+ requests/day with 99.9%+ uptime. From REST/GraphQL APIs to microservices and real-time platforms, we process $100M+ in transactions maintaining sub-100ms latency. Let's build your next-generation backend together.</>}
        stats={[
            {label: 'Years Experience', value: 9, suffix: '+'},
            {label: 'Team Members', value: 16, suffix: '+'},
            {label: 'Backend Services', value: 250, suffix: '+'},
            {label: 'Total Projects', value: 350, suffix: '+'},
            {label: 'Uptime Guarantee', value: 99.2, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ibrahim Okonkwo', title: 'CTO, RealTime Systems', message: <>Node.js platform from Grey InfoTech scales to millions of concurrent connections with 99.9%+ uptime. Their microservices architecture handles 10M+ requests/day with sub-100ms latency. Technical expertise at enterprise scale is exceptional. Highly recommended.</>,},
            {name: 'Fatima Al-Rashid', title: 'Founder, StreamData Platform', message: <>Real-time data streaming platform processing $100M+ in transactions. Grey InfoTech's Node.js expertise delivered 99.2% uptime with minimal infrastructure costs. Their engineering quality and reliability are outstanding. True partnership in driving platform success.</>,},
            {name: 'David Chen', title: 'Product Lead, Collaborative Tools', message: <>WebSocket implementation handles thousands of concurrent users across 250+ backend services. Zero downtime despite massive scale. Their Node.js specialists understand performance optimization and operational excellence at the highest level. Excellent technical partnership.</>,},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Enterprise Microservices',
                description: 'Distributed systems handling 10M+ daily requests with 99.9%+ uptime. Docker and Kubernetes orchestration, service discovery, and event-driven communication enable enterprise-grade scalability.'
            },
            {
                id: 'vs2',
                title: 'High-Throughput APIs',
                description: 'REST and GraphQL APIs processing $100M+ in transactions with sub-100ms latency. Enterprise authentication, rate limiting, and comprehensive monitoring maintain 99.2% uptime.'
            },
            {
                id: 'vs3',
                title: 'Real-time Platforms',
                description: 'WebSocket and event-driven systems handling thousands of concurrent connections. IoT backends, data streaming, and collaborative tools with proven performance at enterprise scale.'
            }
        ]}/>
);

export default NodejsDevelopment;
