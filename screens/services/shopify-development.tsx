import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ShopifyDevelopment = () => (
    <ServicePageTemplate
        title={<>Shopify<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Custom Shopify themes, apps and headless storefronts that convert browsers into buyers—engineered for performance, brand fidelity and long-term commercial growth."
        eyebrow="Shopify engineered to convert and scale"
        introHeading={<>Shopify Stores<br className="lg:block md:block hidden" />Built to Sell</>}
        introBody={[
            <>Shopify powers over four million online stores, but the difference between a store that converts
            and one that frustrates lies entirely in implementation quality. At Grey InfoTech our Shopify
            specialists build custom themes, apps and Hydrogen/Remix headless storefronts that deliver the
            brand experience your customers expect and the conversion rates your business demands. We have
            built Shopify stores across fashion, electronics, health, food and B2B—understanding the unique
            requirements of each vertical.</>,
            <>Our Shopify work is grounded in conversion rate optimisation—every design and development
            decision is evaluated against its impact on add-to-cart rate, checkout completion and average
            order value. We instrument stores with meaningful analytics, implement A/B testing infrastructure
            and build custom checkout extensions and app blocks that extend Shopify without compromising
            performance. Whether you need a fresh store, a theme rebuild, a custom app or a full migration
            from WooCommerce or Magento, we deliver it with speed and quality.</>,
        ]}
        solutionsHeading={<>Shopify<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From custom theme development to headless Hydrogen storefronts and private apps, Grey InfoTech builds Shopify experiences that turn visitors into loyal customers."
        solutions={[
            {
                id: '01', title: 'Custom Theme Development', target: 'CT',
                tags: ['Liquid', 'Dawn', 'OS 2.0', 'Responsive', 'CRO'],
                body: <>We build custom Shopify themes from scratch or customise existing ones—creating unique,
                brand-aligned storefronts with Online Store 2.0 sections and blocks. Our Liquid code is
                clean, well-structured and documented so your team can manage content independently.
                Themes are performance-optimised for Core Web Vitals and tested across devices and browsers
                before launch.</>,
            },
            {
                id: '02', title: 'Shopify App Development', target: 'AD',
                tags: ['Public Apps', 'Private Apps', 'App Extensions', 'Shopify CLI'],
                body: <>We build custom Shopify apps—both private apps for single-store functionality and
                public apps for the Shopify App Store. App development covers Shopify&apos;s REST and GraphQL
                Admin APIs, storefront API, webhooks, billing API and OAuth integration. We follow Shopify&apos;s
                app review guidelines and build apps with proper rate-limit handling, error recovery and
                comprehensive logging.</>,
            },
            {
                id: '03', title: 'Headless Shopify (Hydrogen)', target: 'HS',
                tags: ['Hydrogen', 'Remix', 'Oxygen', 'Storefront API', 'React'],
                body: <>Headless Shopify with Hydrogen and Remix delivers the fastest, most flexible storefront
                possible—a React-based frontend connected to Shopify&apos;s commerce engine via the Storefront API,
                deployed on Shopify Oxygen. We design headless architectures that preserve Shopify&apos;s checkout
                reliability while giving you complete control over the browsing experience, enabling advanced
                personalisation and sub-second page loads.</>,
            },
            {
                id: '04', title: 'Shopify Plus & Enterprise', target: 'SP',
                tags: ['Checkout Extensibility', 'Flow', 'Launchpad', 'B2B'],
                body: <>Shopify Plus unlocks powerful customisation for high-volume merchants. We implement
                checkout extensions and UI extensions, build Flow automations, configure Launchpad for flash
                sales, implement B2B wholesale portals and integrate with ERPs, WMS and fulfilment systems.
                We handle the complexity of multi-currency, multi-market and multi-storefront setups.</>,
            },
            {
                id: '05', title: 'Migration to Shopify', target: 'MS',
                tags: ['WooCommerce', 'Magento', 'BigCommerce', 'Data Migration'],
                body: <>We migrate stores from WooCommerce, Magento, BigCommerce and other platforms to
                Shopify with full data integrity—products, variants, metafields, customers, order history,
                reviews and blog content. We map URL structures and implement 301 redirects to protect SEO
                equity, and run the migration in parallel with your live store to ensure zero revenue
                disruption during cutover.</>,
            },
            {
                id: '06', title: 'Shopify Integrations', target: 'SI',
                tags: ['ERP', 'POS', 'Inventory', 'Marketing', 'Analytics'],
                body: <>A Shopify store is only as powerful as its integrations. We connect Shopify to
                your ERP, inventory management system, marketing automation platform, customer support tools,
                accounting software and analytics stack. Integrations are built with proper error handling,
                retry logic and reconciliation processes so your operational data stays in sync without
                manual intervention.</>,
            },
        ]}
        ctaHeading={<>A Shopify store<br className="lg:block md:block hidden" />that earns its keep</>}
        ctaBody="A beautiful store that doesn't convert is just expensive decoration. Grey InfoTech builds Shopify experiences engineered to generate revenue from day one."
        faqs={[
            {q: 'Do you work on Shopify or Shopify Plus?', a: 'Both. Standard Shopify for growing businesses and Shopify Plus for high-volume merchants needing advanced customisation and dedicated support.'},
            {q: 'How long does a custom Shopify theme take to build?', a: 'A fully custom theme typically takes 4–8 weeks. Customisation of an existing theme is faster—2–4 weeks depending on scope.'},
            {q: "Can you improve our existing store's conversion rate?", a: 'Yes. We run CRO audits covering page speed, UX flows, checkout friction and analytics gaps, then implement improvements with measurable A/B tests.'},
            {q: 'Do you handle Shopify SEO?', a: 'Yes. URL structure, meta tags, JSON-LD, canonical URLs, sitemap and page speed optimisation are all part of our store builds.'},
        ]}
    />
);

export default ShopifyDevelopment;
