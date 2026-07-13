import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const PHPDevelopment = () => (
    <ServicePageTemplate
        title={<>PHP <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Robust, scalable PHP applications for content platforms, business applications, and modern web systems.
                Modernizing legacy code and building new solutions with performance and security you can trust.
            </>
        }
        eyebrow={<>Web's most popular language, <br className={'lg:block md:block hidden'}/>powering the web</>}
        introHeading={<>PHP Development <br className={'lg:block md:block hidden'}/>From Legacy to Modern</>}
        introBody={[
            <>
                PHP powers over 77% of the web, from WordPress and Drupal to enterprise applications handling millions
                of transactions. At Grey InfoTech we harness PHP's versatility to build content platforms, business
                applications, and high-performance web systems. Whether using Laravel for rapid development, Symfony for
                enterprise applications, or custom solutions, we engineer robust, scalable applications backed by rigorous
                testing and clean architecture. Our expertise spans both modern PHP frameworks and legacy system modernization.
            </>,
            <>
                Beyond traditional web applications, PHP excels at powering content management systems, eCommerce platforms,
                and business-critical applications. We modernize aging PHP codebases with modern frameworks, upgrade security
                practices, improve performance, and add new capabilities. With containerization, CI/CD pipelines, and cloud
                deployment, we deliver PHP systems that are secure, scalable, and maintainable. From content management to
                complex business logic, we build PHP solutions that grow with your business.
            </>,
        ]}
        solutionsHeading={<>PHP <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From content management systems and eCommerce platforms to business applications and legacy modernization,
                Grey InfoTech delivers comprehensive PHP development. Based in Nigeria and working globally, we build performant,
                well-tested PHP systems that power millions of websites and applications worldwide.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Content Management Systems', target: 'WA',
                tags: ['WordPress', 'Drupal', 'Custom CMS'],
                body: <>We build and customize powerful content management systems—WordPress for flexibility, Drupal for enterprise complexity, or bespoke solutions for unique requirements. Intuitive admin interfaces, extensibility, and performance optimization ensure your content reaches your audience effectively.</>,
            },
            {
                id: '02', title: 'eCommerce Platforms', target: 'DE',
                tags: ['Magento', 'WooCommerce', 'Custom'],
                body: <>We architect and build scalable eCommerce solutions using Magento for large catalogs, WooCommerce for quick launches, or custom platforms for unique business models. Payment integration, inventory management, and conversion optimization drive sales.</>,
            },
            {
                id: '03', title: 'Business Applications', target: 'ML',
                tags: ['Laravel', 'Symfony', 'Database'],
                body: <>We develop custom business applications with Laravel for rapid development or Symfony for enterprise complexity. Workflow automation, data management, reporting, and integration with existing systems streamline operations and reduce costs.</>,
            },
            {
                id: '04', title: 'API Development & Integration', target: 'AU',
                tags: ['REST APIs', 'Webhooks', 'Integration'],
                body: <>We engineer REST APIs that power mobile apps, third-party integrations, and modern frontends. Secure authentication, rate limiting, comprehensive documentation, and reliable performance ensure seamless integration with your ecosystem.</>,
            },
            {
                id: '05', title: 'Legacy System Modernization', target: 'CD',
                tags: ['Refactoring', 'Migration', 'Security'],
                body: <>We refactor aging PHP applications—upgrading to modern frameworks, improving security practices, adding tests, and enhancing performance. Gradual modernization minimizes disruption while bringing applications to current standards.</>,
            },
            {
                id: '06', title: 'Support & Maintenance', target: 'MS',
                tags: ['Updates', 'Security', 'Performance'],
                body: <>We provide ongoing support and maintenance for PHP applications—security patches, dependency updates, performance optimization, and feature enhancements. Proactive monitoring and rapid issue resolution keep your systems running reliably.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Mature, Battle-tested', image: '/assets/services/Development.jpg',
                description: <>PHP's 25+ year history and deployment on billions of websites makes it incredibly stable, well-documented, and battle-tested in production environments worldwide.</>,
            },
            {
                id: 2, title: 'Rapid Development', image: '/assets/services/Research-strategy.jpg',
                description: <>Modern PHP frameworks like Laravel enable fast development with built-in tools for routing, authentication, databases, and testing. Get to market quickly without sacrificing quality.</>,
            },
            {
                id: 3, title: 'Ubiquitous Hosting', image: '/assets/services/services.jpg',
                description: <>PHP hosting is available everywhere, affordable, and requires minimal configuration. Deploy on any platform without expensive infrastructure or specialized DevOps knowledge.</>,
            },
            {
                id: 4, title: 'Excellent for Content', image: '/assets/services/digital-optimisation.jpg',
                description: <>Built from the ground up for web content, PHP powers the world's leading content platforms. CMS options range from WordPress to enterprise Drupal, all proven at massive scale.</>,
            },
        ]}
        ctaHeading={<>Build reliable systems <br className={'lg:block md:block hidden'}/>with PHP</>}
        ctaBody={<>From content management and eCommerce to business applications and legacy modernization, Grey InfoTech delivers PHP solutions that work. Let's transform your vision into reliable, scalable applications that power your business.</>}
        stats={[
            {label: 'Years Experience', value: 12, suffix: '+'},
            {label: 'Team Members', value: 14, suffix: '+'},
            {label: 'Applications Built', value: 200, suffix: '+'},
            {label: 'Projects Delivered', value: 300, suffix: '+'},
            {label: 'Client Satisfaction', value: 96, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ngozi Chiwendu', title: 'Publisher, Digital Content Hub', message: <>Grey InfoTech built our WordPress platform that now serves millions of monthly visitors. Reliable, fast, and easy to manage. Highly recommend them.</>},
            {name: 'Hassan Malik', title: 'CEO, Online Marketplace', message: <>They took our outdated PHP codebase and modernized it to Laravel while maintaining 100% uptime. The improvements in speed and maintainability are night and day.</>},
            {name: 'Sophia Rodriguez', title: 'Founder, B2B Platform', message: <>Custom PHP development from Grey InfoTech powers our B2B marketplace. The API integrations are seamless, the performance is excellent, and their support is fantastic.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Content Platforms',
                description: 'Build and manage powerful content platforms with WordPress, Drupal, or custom CMS solutions for publishing, blogging, and content distribution at scale.'
            },
            {
                id: 'vs2',
                title: 'Business Applications',
                description: 'Develop custom business applications with Laravel and Symfony for workflow automation, data management, reporting, and operational excellence.'
            },
            {
                id: 'vs3',
                title: 'Legacy System Modernization',
                description: 'Upgrade aging PHP applications with modern frameworks, enhanced security practices, improved performance, and new capabilities without disrupting operations.'
            }
        ]}/>
);

export default PHPDevelopment;
