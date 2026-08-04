import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const MagentoDevelopment = () => (
    <ServicePageTemplate
        title={<>Magento / Adobe<br className="lg:block md:block hidden" />Commerce</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/Development.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/Research-strategy.jpg']}
        intro="Enterprise-grade Magento and Adobe Commerce development -custom modules, performance engineering and complex B2B/B2C implementations that power serious e-commerce operations."
        eyebrow="Magento expertise for high-volume commerce"
        introHeading={<>Magento Built<br className="lg:block md:block hidden" />for Commerce at Scale</>}
        introBody={[
            <>Magento and Adobe Commerce remain the platform of choice for enterprises that need catalogue
            depth, multi-store management, complex pricing rules and the extensibility to build highly
            customised commerce experiences. At Grey InfoTech our Magento developers bring hands-on
            expertise across Magento Open Source and Adobe Commerce -building custom modules, optimising
            performance, executing upgrades and integrating with the ERP, OMS and marketing systems
            that enterprise commerce demands.</>,
            <>Magento&apos;s power comes with complexity, and complexity handled poorly becomes technical debt
            that slows every future change. Our approach is to build Magento extensions that follow
            service contracts, use dependency injection correctly, avoid direct database calls and ship
            with data patches rather than install scripts. We treat performance as a first-class concern -
            full-page cache configuration, Elasticsearch tuning, database query optimisation and Varnish
            configuration are part of every engagement. The result is a Magento platform that performs
            under load and is maintainable by your team long-term.</>,
        ]}
        solutionsHeading={<>Magento<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From custom module development to full Adobe Commerce implementations and performance engineering, Grey InfoTech delivers Magento expertise at every level."
        solutions={[
            {
                id: '01', title: 'Custom Module Development', target: 'CM',
                tags: ['PHP', 'Service Contracts', 'DI', 'Plugin', 'Observer'],
                body: <>We build Magento modules that extend the platform without compromising upgrade
                compatibility -using service contracts, plugins and observers instead of class rewrites.
                Custom checkout steps, pricing algorithms, inventory integrations, loyalty programmes,
                product configurators and admin grids are built to Magento coding standards with comprehensive
                unit and integration tests.</>,
            },
            {
                id: '02', title: 'Adobe Commerce (Magento 2) Implementation', target: 'AI',
                tags: ['Adobe Commerce', 'Multi-store', 'B2B', 'B2C', 'Cloud'],
                body: <>We implement Adobe Commerce for enterprise merchants -configuring multi-store/multi-website
                architectures, B2B company accounts and shared catalogues, advanced pricing rules, tiered
                discounts and quote workflows. Adobe Commerce Cloud deployments include Cloud Docker, ECE Tools,
                environment configuration and integration with Adobe Experience Cloud services.</>,
            },
            {
                id: '03', title: 'Performance Optimisation', target: 'PO',
                tags: ['FPC', 'Varnish', 'Elasticsearch', 'Redis', 'CDN'],
                body: <>Magento performance determines revenue. We configure Varnish for full-page caching,
                tune Elasticsearch for fast catalogue search, implement Redis for sessions and cache,
                optimise slow database queries, configure JavaScript bundling and defer non-critical assets.
                We profile with Blackfire and New Relic to identify bottlenecks and deliver documented
                performance benchmarks before and after optimisation.</>,
            },
            {
                id: '04', title: 'Magento Upgrades & Migration', target: 'MU',
                tags: ['M1 to M2', '2.3 to 2.4', 'Data Migration', 'Extension Audit'],
                body: <>Upgrading Magento requires detailed preparation -extension compatibility audits,
                custom code refactoring, data migration testing and phased rollout planning. We have
                executed M1-to-M2 migrations and multiple minor version upgrades for merchants with millions
                of SKUs, preserving customer data, order history, catalogue configuration and URL structures
                throughout the process.</>,
            },
            {
                id: '05', title: 'Magento Integrations', target: 'IN',
                tags: ['ERP', 'SAP', 'NetSuite', 'OMS', 'PIM', 'Marketing'],
                body: <>Complex Magento stores require deep integration with surrounding systems. We build
                integrations with ERP systems (SAP, NetSuite, Sage), order management, PIM platforms,
                marketing automation, loyalty programmes and payment gateways. Integrations use Magento&apos;s
                API layer and message queues for asynchronous processing, with dead-letter handling and
                operational dashboards for visibility.</>,
            },
            {
                id: '06', title: 'Headless & PWA Commerce', target: 'HC',
                tags: ['PWA Studio', 'Vue Storefront', 'GraphQL', 'Next.js'],
                body: <>Headless Magento delivers the flexibility of a modern JavaScript frontend with Magento&apos;s
                commerce engine behind it. We build PWA storefronts using Magento&apos;s GraphQL API -either with
                Magento PWA Studio, Vue Storefront or a custom Next.js implementation. PWA storefronts deliver
                app-like performance, offline support and significantly faster page loads than server-rendered
                Magento themes.</>,
            },
        ]}
        ctaHeading={<>Commerce at<br className="lg:block md:block hidden" />any scale</>}
        ctaBody="Magento rewards proper engineering. Grey InfoTech builds Adobe Commerce and Magento solutions that handle enterprise catalogue complexity and peak traffic without flinching."
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Enterprise E-commerce Platforms',
                description: 'Scalable, multi-site B2C and B2B commerce with advanced product management, pricing rules, segmentation and content merchandising.'
            },
            {
                id: 'vs2',
                title: 'Omnichannel Commerce',
                description: 'Unified commerce across online stores, physical locations and marketplaces with synchronized inventory, pricing and customer data.'
            },
            {
                id: 'vs3',
                title: 'High-traffic Store Operations',
                description: 'Optimize Magento for millions of daily shoppers with caching strategies, CDN integration, database optimization and elastic scaling.'
            }
        ]}/>
);

export default MagentoDevelopment;

