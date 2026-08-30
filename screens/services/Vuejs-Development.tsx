import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const VueJsDevelopment = () => (
    <ServicePageTemplate
        title={<>Vue.js <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Progressive Vue.js framework with 95%+ Core Web Vitals scores. 200+ Vue projects delivered, 40+ Nuxt full-stack applications. Composition API, reactive data binding, and server-side rendering for performance-driven development.
            </>
        }
        eyebrow={<>Progressive Vue.js and Nuxt, <br className={'lg:block md:block hidden'}/>built for scale</>}
        introHeading={<>Vue.js & Nuxt Development <br className={'lg:block md:block hidden'}/>From Interactive UIs to Full-Stack Applications</>}
        introBody={[
            <>
                Vue.js offers an elegant yet powerful framework for building interactive user interfaces at scale. At Graham Sobiribo Paul we harness Vue's Composition API, reactive data binding, and component system to deliver 200+ high-performance applications. From sophisticated single-page applications to real-time data dashboards maintaining 95%+ performance scores, Vue enables developers to build maintainable solutions that scale seamlessly. Nuxt.js extends Vue with server-side rendering and static generation, delivering superior SEO and 40+ production deployments managing mission-critical data flows.
            </>,
            <>
                Vue.js combines React's component flexibility with Angular's architectural patterns while maintaining elegant simplicity. The Composition API enables code reusability across 300+ projects. Nuxt.js layers server-side rendering and static generation on Vue, creating applications that load instantly while maintaining 4.7+ average user ratings. We build progressive web apps delivering offline functionality, interactive dashboards processing real-time data, and single-page applications competing with native apps. Our 6+ years of specialized experience, 12+ dedicated team members, and 98% client satisfaction rate ensure your Vue.js investment delivers measurable results and long-term scalability.
            </>,
        ]}
        solutionsHeading={<>Vue.js & Nuxt <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                Graham Sobiribo Paul delivers comprehensive Vue.js and Nuxt solutions for 200+ projects with 95%+ performance optimization. From progressive web apps and interactive dashboards to Nuxt full-stack applications, our Vue expertise ensures 4.7+ average user ratings and 98% client satisfaction. Composition API, reactive data binding, and server-side rendering drive measurable business results.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Progressive Web Apps', target: 'WA',
                tags: ['PWA', 'Offline', 'Performance'],
                body: <>Our Vue.js PWAs deliver 95%+ Core Web Vitals scores with offline functionality and native-like performance. Service workers, advanced caching, and responsive design create engaging experiences across 50+ production deployments, reducing bounce rates and increasing user engagement metrics significantly.</>,
            },
            {
                id: '02', title: 'Interactive Dashboards', target: 'DE',
                tags: ['Real-time', 'Data Viz', 'Performance'],
                body: <>We develop Vue.js dashboards processing real-time data streams for 40+ enterprise clients. Vue's reactive system handles complex state management elegantly. Charts, tables, and KPI metrics update instantly, enabling data-driven decisions and 4.7+ user satisfaction ratings.</>,
            },
            {
                id: '03', title: 'Single-Page Applications', target: 'ML',
                tags: ['SPA', 'Routing', 'Scalable'],
                body: <>Our Vue.js SPAs with Vue Router deliver fast, responsive experiences across 200+ production applications. Client-side routing, lazy loading, and state management optimization create seamless user interactions maintaining 98% client retention and measurable performance improvements.</>,
            },
            {
                id: '04', title: 'Real-time Collaboration Tools', target: 'AU',
                tags: ['WebSocket', 'Collaboration', 'Real-time'],
                body: <>We create Vue.js real-time collaboration features where users see instant updates. Vue's Composition API handles dynamic data changes elegantly. Multi-user collaboration feels natural and performant, improving team productivity and engagement metrics across enterprise deployments.</>,
            },
            {
                id: '05', title: 'Server-side Rendering with Nuxt', target: 'CD',
                tags: ['Nuxt', 'SSR', 'SEO'],
                body: <>Our Nuxt applications combine Vue.js with server-side rendering for superior SEO and 95%+ performance scores. 40+ Nuxt deployments deliver instant page loads and excellent search rankings. Static generation for content-rich applications, SSR for dynamic data, built once deployed anywhere.</>,
            },
            {
                id: '06', title: 'Component Libraries & Design Systems', target: 'MS',
                tags: ['Components', 'Design Systems', 'Reusable'],
                body: <>We build Vue.js component libraries and design systems enabling teams to ship features 30% faster. Consistent, maintainable components maintain visual and functional consistency. Composition API enables code reuse across 300+ projects, reducing development time and improving scalability.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Approachable Learning Curve', image: '/assets/services/Development.jpg',
                description: <>Vue.js is easier to learn than React or Angular while remaining powerful. Developers become productive quickly and enjoy the elegant syntax and intuitive API.</>,
            },
            {
                id: 2, title: 'Reactive Data Binding', image: '/assets/services/Research-strategy.jpg',
                description: <>Vue's reactive system automatically updates the UI when data changes. No manual DOM manipulation needed. Complex state management feels natural and straightforward.</>,
            },
            {
                id: 3, title: 'Progressive Enhancement', image: '/assets/services/services.jpg',
                description: <>Start simple with basic templates and gradually add complexity. Vue scales from enhancing HTML to building sophisticated single-page applications without architectural changes.</>,
            },
            {
                id: 4, title: 'Excellent Documentation', image: '/assets/services/digital-optimisation.jpg',
                description: <>Vue.js has exceptional documentation and active community. Examples are clear, concepts are explained well, and learning resources abound for all skill levels.</>,
            },
        ]}
        ctaHeading={<>Build high-performance applications <br className={'lg:block md:block hidden'}/>with Vue.js & Nuxt</>}
        ctaBody={<>Graham Sobiribo Paul delivers 200+ Vue.js applications with 95%+ performance scores and 40+ Nuxt full-stack deployments. From interactive dashboards to progressive web apps, we achieve 98% client satisfaction and 4.7+ user ratings. Let's build your next generation application together.</>}
        stats={[
            {label: 'Years Experience', value: 6, suffix: '+'},
            {label: 'Team Members', value: 12, suffix: '+'},
            {label: 'Vue Applications', value: 200, suffix: '+'},
            {label: 'Total Projects', value: 300, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Marco Rossi', title: 'CTO, Analytics Company', message: <>Vue.js dashboard from Graham Sobiribo Paul delivers 95%+ Core Web Vitals with real-time data processing. Performance improvements reduced our bounce rate by 40% and user engagement metrics increased significantly. Exceptional execution and outstanding support.</>,},
            {name: 'Zainab Aminu', title: 'Founder, Productivity App', message: <>Their Nuxt.js PWA works flawlessly offline with 4.7-star user ratings. Users in low-connectivity regions can now work uninterrupted. 30% faster feature delivery using their component library. Great partnership and excellent technical leadership.</>,},
            {name: 'Jean-Luc Moreau', title: 'Product Lead, Collaboration Platform', message: <>Vue.js real-time collaboration features from Graham Sobiribo Paul deliver instant updates with native-like performance. User engagement increased 50% and platform stability improved dramatically. Outstanding technical expertise and reliable partnership.</>,},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Progressive Web Apps',
                description: 'Vue.js PWAs delivering 95%+ Core Web Vitals scores with offline functionality, instant loading, and native-like performance across 50+ production deployments.'
            },
            {
                id: 'vs2',
                title: 'Interactive Dashboards',
                description: 'Real-time data visualization with Vue.js for 40+ enterprise clients processing mission-critical data streams with 4.7+ user satisfaction ratings.'
            },
            {
                id: 'vs3',
                title: 'Nuxt Full-Stack Applications',
                description: 'Server-side rendering and static generation for SEO excellence and instant page loads. 40+ Nuxt deployments delivering superior performance and search rankings.'
            }
        ]}/>
);

export default VueJsDevelopment;
