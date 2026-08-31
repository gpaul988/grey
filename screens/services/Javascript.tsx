import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Javascript = () => (
    <ServicePageTemplate
        title={<>JavaScript <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/java/mid.jpg"
        topImages={['/assets/java/1.jpg', '/assets/java/2.jpg', '/assets/java/3.jpg', '/assets/java/4.jpg']}
        intro={
            <>
                Dynamic, scalable web solutions with JavaScript. Build modern websites, apps, and APIs with 
                React, Vue, Angular, and Node.js that perform reliably at scale and deliver measurable business value.
            </>
        }
        eyebrow={<>From front-end to full-stack <br className={'lg:block md:block hidden'}/>JavaScript expertise</>}
        introHeading={<>JavaScript Development <br className={'lg:block md:block hidden'}/>That Delivers Results</>}
        introBody={[
            <>
                JavaScript is a foundational technology in modern web development, trusted by businesses across 
                sectors including fintech, healthcare, real estate, and e-commerce. Its versatility enables the 
                creation of highly interactive, user-centric experiences through dynamic content rendering, real-time 
                form validation, animations, and seamless multimedia integration. At Grey InfoTech, we develop responsive 
                designs, enhance interactivity, and ensure seamless functionality across all devices. From sleek marketing 
                sites to complex web applications, our solutions are built for performance, scalability, and engagement.
            </>,
            <>
                Beyond the front end, JavaScript powers full-stack development through frameworks like Node.js, React, 
                and Next.js, enabling organizations to build end-to-end applications using a unified codebase. This 
                streamlines development workflows and reduces time-to-market. With broad browser compatibility, a vast 
                ecosystem of libraries, and strong community support, JavaScript remains a strategic choice for building 
                scalable, high-performance web applications that adapt to evolving business and user demands.
            </>,
        ]}
        solutionsHeading={<>JavaScript <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From front-end development and custom applications to API integration and legacy modernization, 
                Grey InfoTech delivers comprehensive JavaScript development services. Based in Nigeria and working globally, 
                we engineer scalable, well-tested JavaScript systems that turn complex requirements into reliable software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'JavaScript Web Development', target: 'JSWD',
                tags: ['Interactive Websites', 'Responsive Design', 'Web Interaction'],
                body: <>We build modern websites that go beyond static content to deliver dynamic, user-centric digital 
                    experiences. Utilizing the power of JavaScript, we develop responsive designs, enhance interactivity, 
                    and ensure seamless functionality across all devices -turning your web presence into a strategic asset 
                    that drives measurable business results.</>,
            },
            {
                id: '02', title: 'JavaScript App Development', target: 'JSAD',
                tags: ['Cross Platform Apps', 'React Native', 'Consistent Performance'],
                body: <>By leveraging powerful frameworks like Electron for desktop and React Native for mobile, our 
                    developers at Grey InfoTech create applications that run seamlessly across multiple platforms from a 
                    single codebase. This streamlined approach accelerates development timelines, reduces costs, and ensures 
                    consistent performance and user experience across devices.</>,
            },
            {
                id: '03', title: 'Custom JavaScript Development', target: 'CJSD',
                tags: ['Bespoke Solutions', 'Unique User Experience', 'Business-focused'],
                body: <>Our custom JavaScript development services focus on delivering tailored digital solutions that align 
                    precisely with your business objectives. Rather than relying on off-the-shelf software, we leverage 
                    JavaScript to build bespoke applications that address your unique requirements and provide competitive advantage.</>,
            },
            {
                id: '04', title: 'Front-end Development', target: 'FED',
                tags: ['Speed Optimisation', 'Responsive Design', 'User Experience'],
                body: <>Our front-end development team leverages modern JavaScript frameworks such as React, Vue, and Angular 
                    to build responsive, high-performing web applications tailored to user and business needs. We focus on 
                    delivering fast, scalable, and intuitive digital solutions that ensure every application provides a 
                    refined user experience supporting engagement and long-term growth.</>,
            },
            {
                id: '05', title: 'API Integration Services', target: 'AIS',
                tags: ['Third-party Integration', 'Scalability', 'GraphQL'],
                body: <>We deliver seamless third-party API integration services that ensure smooth communication between 
                    disparate systems and applications. By leveraging technologies such as Express.js and GraphQL, our team 
                    designs robust, maintainable APIs tailored to your architecture with comprehensive documentation and 
                    rigorous testing to guarantee reliability and security.</>,
            },
            {
                id: '06', title: 'JavaScript Legacy Migration', target: 'JSLM',
                tags: ['Technology Upgrade', 'Security Upgrade', 'Framework Migration'],
                body: <>Our JavaScript legacy migration service is designed to modernise outdated applications by transitioning 
                    them to current, high-performing JavaScript frameworks and environments. Whether migrating from jQuery to 
                    React or upgrading an older Node.js stack, we ensure a seamless transition that enhances security, scalability, 
                    and maintainability.</>,
            },
            {
                id: '07', title: 'JavaScript Maintenance & Support', target: 'JSMS',
                tags: ['Reliability', 'Continuous Updates', '24/7 Monitoring'],
                body: <>Launching your JavaScript application marks the start of its lifecycle. At Grey InfoTech, we offer 
                    comprehensive post-launch support, including bug fixes, performance optimisation, feature enhancements, and 
                    security patches. With 24/7 monitoring and assistance, we ensure your application remains reliable and aligned 
                    with evolving business needs.</>,
            },
            {
                id: '08', title: 'JavaScript Consulting Services', target: 'JSCS',
                tags: ['Strategic Guidance', 'Risk Migration', 'Tech Optimisation'],
                body: <>Ensure your JavaScript application becomes a high-performing, value-driven asset by partnering with Grey InfoTech. We provide end-to-end support from strategic planning and development to testing, risk mitigation, 
                    and scalable deployment, taking a thorough, data-informed approach to design custom solutions that drive efficiency 
                    and innovation.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Business-Oriented Development', image: '/assets/services/Development.jpg',
                description: <>At Grey InfoTech, our approach to JavaScript development is rooted in understanding your 
                    organization's strategic goals. We engineer scalable, maintainable solutions that align with your long-term 
                    vision and deliver measurable business outcomes.</>,
            },
            {
                id: 2, title: 'Robust Toolset & Innovation', image: '/assets/services/Research-strategy.jpg',
                description: <>Within the fast-evolving JavaScript ecosystem, we harness a wide array of modern libraries and 
                    frameworks including React, Vue, Angular, and Node.js. We adopt the most effective tools for each project, 
                    ensuring your solutions remain technologically advanced and highly performant.</>,
            },
            {
                id: 3, title: 'Scalability & Performance', image: '/assets/services/services.jpg',
                description: <>We design and develop scalable back-end systems using Node.js engineered to handle high volumes of 
                    user traffic without sacrificing performance. Our non-blocking I/O and event-driven architecture ensures your 
                    applications remain highly responsive and reliable even under peak load.</>,
            },
            {
                id: 4, title: 'Cost-efficient Solutions', image: '/assets/services/digital-optimisation.jpg',
                description: <>By seamlessly combining client-side and server-side development using JavaScript, we streamline your 
                    project's workflow and optimize resource allocation. Our unified approach delivers cost-effective development, 
                    comprehensive testing, and efficient maintenance.</>,
            },
        ]}
        ctaHeading={<>Build dynamic <br className={'lg:block md:block hidden'}/>with JavaScript</>}
        ctaBody={<>From scalable APIs and responsive front-ends to full-stack applications and real-time systems, Grey InfoTech 
            delivers JavaScript solutions that perform and endure. Let's turn your vision into high-performing software.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 15, suffix: '+'},
            {label: 'Web Applications Built', value: 150, suffix: '+'},
            {label: 'Projects Delivered', value: 250, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Amara Okonkwo', title: 'Product Lead, TechStart Nigeria', message: <>Grey InfoTech rebuilt our entire platform in React. The code is clean, the performance is exceptional, and the team delivered ahead of schedule.</>},
            {name: 'Chidi Nwafor', title: 'CTO, FinanceFlow', message: <>Their Node.js back-end handles our peak traffic effortlessly. Great architecture, excellent documentation, and they stayed aligned with our timeline.</>},
            {name: 'Zainab Hassan', title: 'Founder, ShopNow App', message: <>The JavaScript team transformed our legacy jQuery app into a modern React application. Our users love the speed improvements and new features.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Browser-based Applications',
                description: 'Build high-performance web applications with React, Vue, and Angular that deliver responsive user experiences across all devices and browsers.'
            },
            {
                id: 'vs2',
                title: 'Progressive Enhancement',
                description: 'Create resilient web experiences that work with or without JavaScript, ensuring accessibility and performance for all users.'
            },
            {
                id: 'vs3',
                title: 'Real-time Interactions',
                description: 'Engineer dynamic applications with WebSockets and real-time APIs that deliver instant updates and interactive features users expect.'
            }
        ]}/>
);

export default Javascript;
