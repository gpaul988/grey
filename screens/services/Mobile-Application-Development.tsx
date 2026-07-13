import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const MobileApplicationDevelopment = () => (
    <ServicePageTemplate
        title={<>Mobile Application <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                Engaging mobile applications that drive user engagement. From consumer-facing apps to enterprise solutions 
                and IoT integration, we build native and cross-platform mobile experiences that perform, scale, and delight users.
            </>
        }
        eyebrow={<>Mobile-first solutions <br className={'lg:block md:block hidden'}/>for every platform</>}
        introHeading={<>Mobile Development <br className={'lg:block md:block hidden'}/>That Delivers Results</>}
        introBody={[
            <>
                Mobile applications have become essential to business success, reaching customers where they are—in their 
                pockets. At Grey InfoTech, we develop native iOS and Android applications, as well as cross-platform solutions 
                using frameworks like React Native and Flutter. From initial consultation and app design to development, backend 
                infrastructure, and continuing maintenance, we provide a comprehensive solution that brings your idea to life, 
                whether you're a startup or an established company.
            </>,
            <>
                Our expertise spans consumer applications that delight users with intuitive design and powerful functionality, 
                enterprise solutions that integrate with backend systems and support complex workflows, and IoT mobile applications 
                that enable remote monitoring and control of smart systems. We combine user-centric design with scalable backend 
                architecture, comprehensive testing, and ongoing support to ensure your mobile application succeeds in a competitive 
                market.
            </>,
        ]}
        solutionsHeading={<>Mobile Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From native iOS and Android development to cross-platform solutions and IoT integration, Grey InfoTech delivers 
                comprehensive mobile development services. We engineer high-performing, user-centric applications that drive engagement 
                and deliver measurable business results.
            </>
        }
        solutions={[
            {
                id: '01', title: 'iOS Development', target: 'IOS',
                tags: ['Native iOS', 'Swift', 'App Store'],
                body: <>We develop high-performance native iOS applications using Swift that deliver exceptional user experiences 
                    on Apple devices. Our iOS apps feature intuitive interfaces, smooth animations, and seamless integration with 
                    device features—ensuring your application stands out in the App Store.</>,
            },
            {
                id: '02', title: 'Android Development', target: 'ANDROID',
                tags: ['Native Android', 'Kotlin', 'Play Store'],
                body: <>Our Android development team builds robust native applications using Kotlin that perform reliably across 
                    devices and Android versions. We create apps that leverage Android capabilities and deliver exceptional performance 
                    in the Play Store ecosystem.</>,
            },
            {
                id: '03', title: 'Cross-Platform Development', target: 'CROSS',
                tags: ['React Native', 'Flutter', 'Code Sharing'],
                body: <>We develop cross-platform applications using React Native and Flutter that run seamlessly on iOS and Android 
                    from a single codebase. This approach accelerates development, reduces costs, and ensures consistent user experience 
                    across platforms.</>,
            },
            {
                id: '04', title: 'Backend Infrastructure', target: 'BACKEND',
                tags: ['APIs', 'Cloud Services', 'Scalability'],
                body: <>We build robust backend systems and APIs that power your mobile application. Our infrastructure is designed 
                    for scalability, reliability, and performance—supporting real-time features, data synchronization, and growth.</>,
            },
            {
                id: '05', title: 'UI/UX Design', target: 'UIUX',
                tags: ['Mobile Design', 'User Experience', 'Interaction Design'],
                body: <>Our design team creates intuitive, engaging mobile interfaces that delight users. We conduct user research, 
                    wireframe experiences, and design compelling interfaces that drive engagement and support business goals.</>,
            },
            {
                id: '06', title: 'App Maintenance & Support', target: 'SUPPORT',
                tags: ['Bug Fixes', 'Updates', 'Performance Optimization'],
                body: <>We provide ongoing maintenance and support after launch. Our team handles bug fixes, feature updates, 
                    performance optimization, and security patches to keep your application reliable and competitive.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Proven Track Record', image: '/assets/services/Development.jpg',
                description: <>From initial consultation and app design to development, backend infrastructure, and continuing 
                    maintenance, we provide comprehensive solutions that bring your idea to life reliably.</>,
            },
            {
                id: 2, title: 'Technology Innovation', image: '/assets/services/Research-strategy.jpg',
                description: <>We develop using the most effective and future-proof technologies, keeping ahead of the curve with 
                    the latest frameworks, integrations, and best practices in mobile development.</>,
            },
            {
                id: 3, title: 'Bespoke Solutions', image: '/assets/services/services.jpg',
                description: <>We take time to understand your business objectives and customers' needs to develop custom mobile 
                    applications that add value and make a statement in your market.</>,
            },
            {
                id: 4, title: 'Ongoing Support & Maintenance', image: '/assets/services/digital-optimisation.jpg',
                description: <>Our partnership continues after launch. We provide ongoing support, frequent updates, feature additions, 
                    and security patches to keep your app current and operating at its best as your business expands.</>,
            },
        ]}
        ctaHeading={<>Build engaging <br className={'lg:block md:block hidden'}/>mobile experiences</>}
        ctaBody={<>From consumer apps and enterprise solutions to IoT integration, Grey InfoTech delivers mobile applications that 
            drive engagement and deliver measurable results. Let's bring your app idea to life.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 18, suffix: '+'},
            {label: 'Mobile Apps Delivered', value: 120, suffix: '+'},
            {label: 'Projects Completed', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 96, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Adekunle Obi', title: 'CEO, MobileFirst Startup', message: <>Grey InfoTech delivered our iOS and Android apps on schedule. The user adoption has been excellent, and the code quality is impressive.</>},
            {name: 'Toyin Adeyemi', title: 'Product Director, Enterprise Firm', message: <>Their mobile development expertise transformed our internal tools into a market-ready application. Excellent architecture and support.</>},
            {name: 'Kunle Okonkwo', title: 'Founder, Health Tech App', message: <>The team built a beautiful, performant healthcare app that users love. Their attention to detail and user experience is outstanding.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Consumer Apps',
                description: 'Create engaging consumer-facing mobile applications that delight users with intuitive design and powerful functionality.'
            },
            {
                id: 'vs2',
                title: 'Enterprise Solutions',
                description: 'Build secure, scalable enterprise mobile applications that integrate with backend systems and support complex workflows.'
            },
            {
                id: 'vs3',
                title: 'IoT Mobile',
                description: 'Develop mobile applications that connect with IoT devices, enabling remote monitoring and control of smart systems.'
            }
        ]}/>
);

export default MobileApplicationDevelopment;
