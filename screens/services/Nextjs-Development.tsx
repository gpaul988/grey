import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const NextjsDevelopment = () => (
    <ServicePageTemplate
        title={<>Next.js <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/next/mid.jpg"
        topImages={['/assets/node/3.jpg', '/assets/node/4.jpg', '/assets/node/1.jpg', '/assets/node/2.jpg']}
        intro={
            <>
                Server-rendered apps, static generation, and optimized experiences built with Next.js
                for performance and scalability you can trust.
            </>
        }
        eyebrow={<>Server-side rendering, <br className={'lg:block md:block hidden'}/>static generation, and more</>}
        introHeading={<>Next.js Development <br className={'lg:block md:block hidden'}/>From SSR to SSG</>}
        introBody={[
            <>
                Next.js is a leading development framework widely trusted for building modern,
                scalable web solutions. Its ability to accelerate time-to-market makes it ideal
                for businesses looking to launch software products quickly without compromising
                quality. With built-in responsive design and server-side rendering capabilities,
                it ensures seamless user experiences across all devices—from desktops to mobile.
                Combined with fast-loading pages, SEO-friendly performance, and active community support,
                Next.js stands out as a powerful, well-rounded framework for today's fast-moving digital landscape.
            </>,
            <>
                Beyond building web applications, Next.js excels at creating high-performance portals,
                hybrid web/mobile experiences, and dynamic content management systems. Its flexible data-fetching
                strategies support a wide range of architectures, allowing for highly customized builds.
                Whether you're launching a new digital product, modernizing an existing platform, or scaling
                to meet growing demand, Next.js provides the reliability, speed, and developer experience needed
                to build applications that perform and endure.
            </>,
        ]}
        solutionsHeading={<>Next.js <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From server-side rendering and static generation to advanced data-fetching strategies and API routes,
                Grey InfoTech delivers comprehensive Next.js development. Based in Nigeria and working globally, we build
                fast, scalable web applications that combine React's power with Next.js's performance and developer experience.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Web Application Development', target: 'NWAD',
                tags: ['Responsive Design', 'Dynamic Solutions', 'High Performance'],
                body: <>Web application development with Next.js delivers seamless experiences by combining React's flexibility with server-side rendering. Faster page load times, enhanced SEO, and responsive user interfaces across all devices. With powerful data-fetching, modular architecture, and streamlined deployment, we build dynamic, scalable applications tailored to your business goals.</>,
            },
            {
                id: '02', title: 'Consulting Services', target: 'NCS',
                tags: ['Business Analysis', 'Custom Solutions', 'Tech Strategy'],
                body: <>Our Next.js consulting services provide clarity, direction, and tailored technical solutions for your business. Expert analysis of your goals, market dynamics, and competitive landscape. Through strategic insights and technical expertise, we ensure your Next.js investment delivers measurable value—accelerating development, enhancing performance, and positioning your product for long-term success.</>,
            },
            {
                id: '03', title: 'Custom Application Development', target: 'CNAD',
                tags: ['Bespoke Solutions', 'Enterprise-grade', 'Scalable'],
                body: <>At Grey InfoTech, we leverage the full power of Next.js to craft bespoke applications that transform user experiences and drive business results. Deep expertise in server-side rendering, static generation, and dynamic routing enables fast, secure, scalable solutions. From eCommerce platforms to analytics dashboards and collaborative tools, we deliver seamless, high-performance digital products designed for both immediate impact and long-term growth.</>,
            },
            {
                id: '04', title: 'Server-Side Rendering (SSR) Implementation', target: 'NSSRI',
                tags: ['SEO Optimization', 'Fast Loading', 'Crawlable'],
                body: <>We understand the critical importance of making your website easily discoverable by search engines. Next.js's built-in server-side rendering capabilities significantly enhance both performance and SEO. By pre-rendering pages on the server, we ensure faster initial load times, better indexing by search engines, and improved visibility on SERPs. This delivers smoother user experiences and drives organic traffic.</>,
            },
            {
                id: '05', title: 'Static Site Generation (SSG)', target: 'NSSG',
                tags: ['Performance', 'Cost-effective', 'Scalable'],
                body: <>Next.js's powerful static site generation (SSG) feature builds high-performance websites that are fast, efficient, and cost-effective. Pre-rendering pages at build time results in instant loading and minimal server resources—lower hosting costs and enhanced user experience. Static sites deploy easily across platforms, making them ideal for maximizing performance while keeping infrastructure simple and scalable.</>,
            },
            {
                id: '06', title: 'Custom Web Components', target: 'CWC',
                tags: ['Enhanced Features', 'UX Improvements', 'Integration'],
                body: <>Already have a software product needing enhancement? Next.js is ideal for building custom web components that integrate smoothly into existing applications. Modular architecture and flexibility enable seamless feature additions without disrupting your current system. Whether enhancing functionality, improving performance, or refining the user interface, Next.js provides scalable enhancements that deliver richer, more dynamic experiences.</>,
            },
            {
                id: '07', title: 'Maintenance & Support', target: 'NMS',
                tags: ['Bug Fixing', 'App Maintenance', 'Scalability'],
                body: <>We're with you every step of the way. Our comprehensive maintenance and support services ensure your Next.js application performs reliably and scales effectively as your business grows. Routine updates, proactive bug fixes, performance monitoring, and system optimization keep your application running smoothly. With round-the-clock support from expert Next.js specialists, you gain a dependable technical partner minimizing downtime and ensuring uninterrupted functionality.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Performance at Scale', image: '/assets/services/Development.jpg',
                description: <>Next.js combines React's flexibility with server-side rendering and static generation to deliver fast, SEO-friendly applications that scale with your business demands.</>,
            },
            {
                id: 2, title: 'Developer Experience', image: '/assets/services/Research-strategy.jpg',
                description: <>From file-based routing to built-in API routes and automatic code-splitting, Next.js streamlines development workflows and enables teams to ship faster without compromising quality.</>,
            },
            {
                id: 3, title: 'Versatility Across Use Cases', image: '/assets/services/services.jpg',
                description: <>Whether building marketing sites with SSG, dynamic portals with SSR, or real-time dashboards, Next.js adapts to diverse requirements while maintaining excellent performance and developer productivity.</>,
            },
            {
                id: 4, title: 'Enterprise-Ready Capabilities', image: '/assets/services/digital-optimisation.jpg',
                description: <>Secure authentication, API integration, data validation, and production-grade deployment support make Next.js suitable for mission-critical enterprise applications and high-traffic platforms.</>,
            },
        ]}
        ctaHeading={<>Build powerful <br className={'lg:block md:block hidden'}/>with Next.js</>}
        ctaBody={<>From server-rendered portals and static sites to hybrid experiences and content management systems, Grey InfoTech delivers Next.js solutions that perform and scale. Let's turn your vision into fast, reliable applications that drive real business value.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Applications Built', value: 150, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ahmed Hassan', title: 'Founder, FastTrack Commerce', message: <>Grey InfoTech transformed our eCommerce platform to Next.js. The performance improvement was immediate—page loads are lightning-fast, and our SEO rankings soared within weeks.</>},
            {name: 'Zainab Mohammed', title: 'Tech Lead, DataFlow Analytics', message: <>Their expertise with SSR and data-fetching patterns was invaluable. They built us a complex analytics portal that feels native and performs beautifully across all devices.</>},
            {name: 'Chioma Adeyemi', title: 'Product Manager, SaaS Innovations', message: <>From consulting to production deployment, the Grey InfoTech team guided us through a full Next.js migration. Our application now scales effortlessly, and development velocity has doubled.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'SEO-optimized Portals',
                description: 'Build high-performance portal applications with Next.js server-side rendering and static generation for superior SEO visibility, fast page loads, and excellent search engine rankings.'
            },
            {
                id: 'vs2',
                title: 'Hybrid Web/Mobile Apps',
                description: 'Develop progressive web apps with Next.js that work seamlessly across desktop and mobile devices, delivering native-like performance and experiences with a single codebase.'
            },
            {
                id: 'vs3',
                title: 'Content Management Systems',
                description: 'Create scalable content management systems with Next.js ISR (Incremental Static Regeneration) for dynamic content delivery, real-time updates, and efficient content distribution.'
            }
        ]}/>
);

export default NextjsDevelopment;
