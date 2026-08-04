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
                Full-stack React with SSR/SSG, edge functions, and API routes. 90+ Core Web Vitals, 25+ enterprise adoptions, $200M+ GMV handled. 99.8% uptime delivering performance-driven solutions.
            </>
        }
        eyebrow={<>Full-stack React framework, <br className={'lg:block md:block hidden'}/>edge-native architecture</>}
        introHeading={<>Next.js Development <br className={'lg:block md:block hidden'}/>SSR, SSG, and Edge Computing</>}
        introBody={[
            <>
                Next.js is the leading framework for building modern, enterprise-scale applications. With 5+ years of specialization, we harness Next.js's server-side rendering and static generation to deliver 180+ production applications achieving 90%+ Core Web Vitals. Our expertise spans API routes, incremental static regeneration, edge middleware, and edge functions—enabling applications managing $200M+ in transactions across 25+ enterprise adoptions. Built on React with enterprise-grade performance, Next.js enables rapid deployment without compromising quality, making it ideal for businesses requiring fast, SEO-friendly, highly scalable solutions.
            </>,
            <>
                Beyond traditional web applications, Next.js excels at building high-performance portals, hybrid experiences, and real-time dashboards handling mission-critical workloads. With 14+ dedicated developers, 250+ total projects delivered, and 99% client satisfaction, we create applications optimized for performance, security, and scalability. Incremental Static Regeneration, API routes, and edge computing enable sophisticated architectures supporting complex business requirements. Whether launching new digital products, modernizing platforms, or scaling to handle exponential growth, Next.js provides the reliability, speed, and developer productivity needed to build applications that drive measurable business results and maintain 99.8%+ uptime in production.
            </>,
        ]}
        solutionsHeading={<>Next.js <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                Grey InfoTech delivers comprehensive Next.js development across 180+ applications with 90%+ Core Web Vitals and 99.8% uptime. From API routes and incremental static regeneration to edge middleware and edge functions, we build full-stack solutions managing $200M+ in transactions. 25+ enterprise adoptions and 99% client satisfaction demonstrate our expertise in performance-driven development.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Web Application Development', target: 'NWAD',
                tags: ['Responsive Design', 'API Routes', 'High Performance'],
                body: <>Full-stack Next.js applications delivering 90%+ Core Web Vitals with seamless React flexibility and server-side rendering. Responsive design ensures flawless experiences across devices. Our 180+ production applications achieve 99.8% uptime with API routes powering complex business logic, dynamic data-fetching, and scalable architecture tailored to drive measurable business results.</>,
            },
            {
                id: '02', title: 'Enterprise Platform Development', target: 'NCS',
                tags: ['Business Analysis', 'Enterprise Scale', 'Mission-Critical'],
                body: <>Our Next.js enterprise consulting delivers strategic solutions for organizations managing mission-critical workloads. We handle $200M+ in transaction volumes across 25+ enterprise adoptions. Expert analysis of architecture, performance bottlenecks, and competitive positioning ensures your investment delivers measurable ROI—accelerating development, enhancing reliability, and positioning your platform for sustained growth.</>,
            },
            {
                id: '03', title: 'Custom Application Development', target: 'CNAD',
                tags: ['Bespoke Solutions', 'Edge Computing', 'Scalable'],
                body: <>Bespoke Next.js applications leveraging edge functions, incremental static regeneration, and API routes for maximum performance. From fintech platforms to analytics dashboards managing billions of data points, we deliver secure, scalable solutions optimized for enterprise requirements. 14+ dedicated developers ensure fast, reliable delivery maintaining 99% client satisfaction.</>,
            },
            {
                id: '04', title: 'Server-Side Rendering (SSR)', target: 'NSSRI',
                tags: ['SEO Optimization', 'Fast Loading', 'Enterprise'],
                body: <>Next.js SSR implementation delivers superior search engine visibility and performance. Server-rendered pages load faster, rank higher on SERPs, and provide enhanced user experiences. Ideal for content-rich applications, eCommerce platforms, and public-facing applications requiring immediate SEO impact and crawlability across 90%+ Core Web Vitals benchmarks.</>,
            },
            {
                id: '05', title: 'Incremental Static Regeneration (ISR)', target: 'NSSG',
                tags: ['Performance', 'Cost-effective', 'Scalable'],
                body: <>ISR enables content management at scale without rebuild cycles. Dynamic content updates instantly while maintaining static performance benefits. Perfect for content platforms, marketplaces, and applications requiring real-time updates without sacrificing speed. Reduces infrastructure costs while delivering instant page loads and superior user experiences.</>,
            },
            {
                id: '06', title: 'Edge Functions & Middleware', target: 'CWC',
                tags: ['Global Distribution', 'Real-time', 'Low Latency'],
                body: <>Next.js edge functions enable global distribution with sub-millisecond latency. Request-level middleware, authentication, redirects, and personalization happen at the edge. Ideal for high-traffic applications, multi-tenant platforms, and services requiring geographic redundancy and instant response times across worldwide audiences.</>,
            },
            {
                id: '07', title: 'Maintenance & Enterprise Support', target: 'NMS',
                tags: ['Bug Fixing', 'Performance Optimization', '99.8% Uptime'],
                body: <>Comprehensive support ensuring your Next.js application maintains 99.8%+ uptime. Proactive monitoring, performance optimization, security updates, and scalability enhancements from expert engineers. Round-the-clock support minimizes downtime, maximizes efficiency, and ensures your application scales seamlessly with business growth.</>,
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
        ctaHeading={<>Build high-performance applications <br className={'lg:block md:block hidden'}/>with Next.js</>}
        ctaBody={<>Grey InfoTech delivers 180+ Next.js applications with 90%+ Core Web Vitals and 99.8%+ uptime. From full-stack applications managing $200M+ GMV to edge-powered global platforms, we achieve 99% client satisfaction across 25+ enterprise adoptions. Let's build your next generation application together.</>}
        stats={[
            {label: 'Years Experience', value: 5, suffix: '+'},
            {label: 'Team Members', value: 14, suffix: '+'},
            {label: 'Next.js Applications', value: 180, suffix: '+'},
            {label: 'Total Projects', value: 250, suffix: '+'},
            {label: 'Client Satisfaction', value: 99, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ahmed Hassan', title: 'Founder, FastTrack Commerce', message: <>Next.js platform from Grey InfoTech increased our checkout conversion rate by 35% through 90%+ Core Web Vitals performance improvements. Page loads dropped by 60%. Their expertise with API routes and edge functions delivered exceptional results. Highly recommend for eCommerce.</>,},
            {name: 'Zainab Mohammed', title: 'Tech Lead, DataFlow Analytics', message: <>Complex analytics portal handling millions of data points. Their ISR implementation delivers real-time content updates at scale. 99.8% uptime maintained consistently. Exceptional technical leadership and reliability. A true partnership in driving our business growth.</>,},
            {name: 'Chioma Adeyemi', title: 'Product Manager, SaaS Innovations', message: <>Full Next.js migration managing $200M+ transaction volume. Development velocity doubled, infrastructure costs reduced 40%, uptime improved to 99.8%. Their team's expertise with edge functions and API routes was instrumental. Outstanding execution and strategic partnership throughout.</>,},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Enterprise E-Commerce',
                description: 'High-performance Next.js platforms managing $200M+ GMV with 90%+ Core Web Vitals, API routes, and edge functions delivering instant checkouts and superior conversion rates.'
            },
            {
                id: 'vs2',
                title: 'Mission-Critical Portals',
                description: 'Enterprise-grade Next.js applications with 99.8%+ uptime, SSR for SEO, and edge middleware supporting complex workflows across 25+ enterprise adoptions.'
            },
            {
                id: 'vs3',
                title: 'Real-time Data Platforms',
                description: 'ISR-powered applications delivering real-time content updates at scale. Analytics dashboards, content management systems, and collaborative tools with instant global distribution.'
            }
        ]}/>
);

export default NextjsDevelopment;
