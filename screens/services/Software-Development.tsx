import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const SoftwareDevelopment = () => (
    <ServicePageTemplate
        title={<>Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Custom software solutions for enterprise systems, business applications, and complex digital requirements.
                From conception to deployment, we deliver software that solves real business problems.
            </>
        }
        eyebrow={<>Custom solutions <br className={'lg:block md:block hidden'}/>built for your business</>}
        introHeading={<>Software Development <br className={'lg:block md:block hidden'}/>Problems to Solutions</>}
        introBody={[
            <>
                Software development is fundamentally about solving business problems. At Grey InfoTech we partner with organizations
                to understand their challenges, design solutions, and deliver reliable software that creates value. Whether building
                custom enterprise systems, business applications, or specialized tools, our expertise spans technologies, industries,
                and problem domains. We combine technical excellence with business acumen to deliver solutions that work.
            </>,
            <>
                Beyond writing code, great software development requires understanding business context, designing robust architectures,
                and building teams that collaborate effectively. We approach each project with strategic thinking—what problem are we solving,
                who benefits, what metrics matter. From architecture and design through development, testing, and deployment, we maintain focus
                on delivering real value. Software that lasts combines technical quality with thoughtful design and clear purpose.
            </>,
        ]}
        solutionsHeading={<>Software <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From custom enterprise systems to specialized business applications, Grey InfoTech delivers comprehensive software development.
                Problem-focused approach combined with technical excellence creates software that solves real business challenges and delivers measurable value.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Custom Enterprise Systems', target: 'WA',
                tags: ['Scalable', 'Integration', 'Enterprise-grade'],
                body: <>We architect and build custom enterprise systems tailored to your specific business processes. System integration, data management, workflow automation, and security architecture—designed for your organization's unique requirements and scale.</>,
            },
            {
                id: '02', title: 'Business Process Automation', target: 'DE',
                tags: ['Automation', 'Workflow', 'Integration'],
                body: <>We identify and automate repetitive business processes—from data entry and approval workflows to report generation and inter-system communication. Automation reduces errors, improves efficiency, and frees teams for higher-value work.</>,
            },
            {
                id: '03', title: 'Data Management Solutions', target: 'ML',
                tags: ['Databases', 'ETL', 'Analytics'],
                body: <>We design and build data management solutions—data warehouses, ETL pipelines, and analytics platforms. Transform raw data into actionable intelligence with solutions that scale with your business.</>,
            },
            {
                id: '04', title: 'Integration & API Development', target: 'AU',
                tags: ['Integration', 'APIs', 'Connectors'],
                body: <>We integrate disparate systems and build APIs that connect your software ecosystem. Seamless data flow between applications eliminates silos and enables better decision-making across your organization.</>,
            },
            {
                id: '05', title: 'Cloud Migration & Modernization', target: 'CD',
                tags: ['Cloud', 'Migration', 'Modernization'],
                body: <>We migrate legacy systems to cloud platforms and modernize outdated software. Reduce infrastructure costs, improve scalability, and leverage modern capabilities without disrupting operations.</>,
            },
            {
                id: '06', title: 'Quality Assurance & Testing', target: 'MS',
                tags: ['Testing', 'QA', 'Reliability'],
                body: <>We provide comprehensive testing and quality assurance ensuring software works reliably. Automated testing, performance optimization, and security validation build confidence in your software.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Problem-Focused Approach', image: '/assets/services/Development.jpg',
                description: <>We start by deeply understanding your business challenges and desired outcomes, ensuring every solution directly addresses your real needs and creates measurable value.</>,
            },
            {
                id: 2, title: 'Technical Excellence', image: '/assets/services/Research-strategy.jpg',
                description: <>Experienced teams, proven practices, and quality discipline ensure software that performs reliably, scales with demand, and stands the test of time.</>,
            },
            {
                id: 3, title: 'Industry Expertise', image: '/assets/services/services.jpg',
                description: <>Experience across industries means we understand domain-specific challenges, regulations, and best practices for your sector.</>,
            },
            {
                id: 4, title: 'Long-term Partnership', image: '/assets/services/digital-optimisation.jpg',
                description: <>We're committed to your success beyond launch—ongoing support, maintenance, and evolution as your business needs change and technology advances.</>,
            },
        ]}
        ctaHeading={<>Transform with custom <br className={'lg:block md:block hidden'}/>software solutions</>}
        ctaBody={<>From enterprise systems and business applications to specialized tools and integrations, Grey InfoTech delivers custom software that solves real business challenges. Let's build something that creates lasting value for your organization.</>}
        stats={[
            {label: 'Years Experience', value: 15, suffix: '+'},
            {label: 'Team Members', value: 20, suffix: '+'},
            {label: 'Systems Built', value: 250, suffix: '+'},
            {label: 'Projects Delivered', value: 400, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Grace Osei', title: 'CIO, Financial Services Company', message: <>Grey InfoTech built our core banking system and it's been rock-solid for 5 years. Reliability, security, and performance are exceptional. They truly understood our enterprise requirements.</>},
            {name: 'Thomas Weber', title: 'VP Operations, Manufacturing Company', message: <>Their automation solution eliminated 60% of manual data entry and reduced errors dramatically. The ROI was clear in the first month. Excellent implementation and ongoing support.</>},
            {name: 'Amina Hassan', title: 'CEO, Healthcare Provider', message: <>Custom software from Grey InfoTech improved patient data management and operational efficiency significantly. They understood healthcare complexity and delivered a HIPAA-compliant solution that works perfectly for our practices.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Custom Solutions',
                description: 'Build tailored software specifically designed for your unique business requirements, competitive advantages, and operational needs.'
            },
            {
                id: 'vs2',
                title: 'Enterprise Systems',
                description: 'Architect mission-critical enterprise applications with high availability, security, scalability, and integration with existing infrastructure.'
            },
            {
                id: 'vs3',
                title: 'Business Applications',
                description: 'Develop specialized applications that streamline operations, automate workflows, and transform business processes for competitive advantage.'
            }
        ]}/>
);

export default SoftwareDevelopment;
