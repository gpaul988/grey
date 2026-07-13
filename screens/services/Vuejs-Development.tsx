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
                Progressive web apps, interactive dashboards, and single-page applications built with Vue.js.
                Vue's approachable learning curve and powerful ecosystem make sophisticated UIs accessible.
            </>
        }
        eyebrow={<>Progressive framework, <br className={'lg:block md:block hidden'}/>delightful to use</>}
        introHeading={<>Vue.js Development <br className={'lg:block md:block hidden'}/>From Simple to Complex</>}
        introBody={[
            <>
                Vue.js offers an approachable yet powerful framework for building interactive user interfaces.
                At Grey InfoTech we harness Vue's gentle learning curve, reactive data binding, and component system
                to build progressive web apps, interactive dashboards, and sophisticated single-page applications.
                Vue excels at creating UIs that feel smooth and responsive while remaining maintainable as complexity grows.
                Whether building from scratch or enhancing existing applications, Vue enables developers to express intent clearly.
            </>,
            <>
                Vue.js combines the best ideas from React and Angular while maintaining its own identity. Progressive enhancement
                means starting simple and adding complexity gradually. The component model enables code reuse and testing. Nuxt.js
                adds server-side rendering and static generation for SEO and performance. We build progressive web apps that work
                offline, interactive dashboards that process data intelligently, and single-page applications that compete with
                native apps in responsiveness and functionality.
            </>,
        ]}
        solutionsHeading={<>Vue.js <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From progressive web apps and interactive dashboards to sophisticated single-page applications,
                Grey InfoTech delivers comprehensive Vue.js development. Vue's reactive system and intuitive API
                create interfaces that are powerful, maintainable, and delightful to use.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Progressive Web Apps', target: 'WA',
                tags: ['PWA', 'Offline', 'Performance'],
                body: <>We build progressive web apps with Vue.js that work offline, load instantly, and feel like native applications. Service workers, caching strategies, and responsive design create engaging experiences that users love.</>,
            },
            {
                id: '02', title: 'Interactive Dashboards', target: 'DE',
                tags: ['Real-time', 'Data Viz', 'Performance'],
                body: <>We develop interactive dashboards with Vue.js that visualize data intelligently and update in real-time. Vue's reactive system makes handling complex state changes elegant. Charts, tables, and metrics update smoothly as data changes.</>,
            },
            {
                id: '03', title: 'Single-Page Applications', target: 'ML',
                tags: ['SPA', 'Routing', 'Scalable'],
                body: <>We build sophisticated single-page applications with Vue.js and Vue Router. Client-side routing, lazy loading, and state management create fast, responsive experiences. Modern JavaScript tooling enables code-splitting and performance optimization.</>,
            },
            {
                id: '04', title: 'Real-time Collaboration Tools', target: 'AU',
                tags: ['WebSocket', 'Collaboration', 'Real-time'],
                body: <>We create real-time collaboration features with Vue.js where users see instant updates. Vue's reactivity system handles dynamic data changes beautifully. Multiple users collaborating feel natural and performant.</>,
            },
            {
                id: '05', title: 'Server-side Rendering with Nuxt', target: 'CD',
                tags: ['Nuxt', 'SSR', 'SEO'],
                body: <>We build Nuxt applications combining Vue.js with server-side rendering for superior SEO and performance. Build once, deploy anywhere. Static generation for performance, SSR for content-rich applications.</>,
            },
            {
                id: '06', title: 'Component Libraries & Design Systems', target: 'MS',
                tags: ['Components', 'Design Systems', 'Reusable'],
                body: <>We build reusable component libraries and design systems with Vue.js. Consistent, maintainable components enable teams to ship features faster while maintaining visual and functional consistency across applications.</>,
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
        ctaHeading={<>Build engaging interfaces <br className={'lg:block md:block hidden'}/>with Vue.js</>}
        ctaBody={<>From progressive web apps and interactive dashboards to sophisticated single-page applications, Grey InfoTech delivers Vue.js solutions that engage users and drive business results. Let's create something amazing together.</>}
        stats={[
            {label: 'Years Experience', value: 7, suffix: '+'},
            {label: 'Team Members', value: 10, suffix: '+'},
            {label: 'Applications Built', value: 140, suffix: '+'},
            {label: 'Projects Delivered', value: 180, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Marco Rossi', title: 'CTO, Analytics Company', message: <>Vue.js dashboard from Grey InfoTech is fantastic. Real-time data updates, smooth interactions, and excellent performance. Our users love the experience and adoption rates increased significantly.</>},
            {name: 'Zainab Aminu', title: 'Founder, Productivity App', message: <>Their progressive web app built with Vue.js works offline seamlessly. Users who had spotty connectivity can now work uninterrupted. Great implementation and outstanding support.</>},
            {name: 'Jean-Luc Moreau', title: 'Product Lead, Collaboration Platform', message: <>Vue.js real-time collaboration features from Grey InfoTech work beautifully. Users see instant updates and the experience feels native. Excellent work and great partnership.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Progressive Web Apps',
                description: 'Build web apps that work offline, load instantly, and feel like native applications using Vue.js and modern PWA technologies.'
            },
            {
                id: 'vs2',
                title: 'Interactive Dashboards',
                description: 'Create real-time data dashboards with Vue.js that visualize business intelligence and update instantly as data changes.'
            },
            {
                id: 'vs3',
                title: 'Single Page Applications',
                description: 'Develop responsive single-page applications with Vue.js that load quickly, handle complex interactions, and provide excellent user experiences.'
            }
        ]}/>
);

export default VueJsDevelopment;
