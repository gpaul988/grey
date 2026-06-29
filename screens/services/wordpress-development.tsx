import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const WordPressDevelopment = () => (
    <ServicePageTemplate
        title={<>WordPress<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Custom WordPress themes, plugins and headless implementations—built for performance, security and editorial teams that need genuine flexibility without developer dependency."
        eyebrow="WordPress built beyond the template"
        introHeading={<>WordPress That<br className="lg:block md:block hidden" />Works Seriously Hard</>}
        introBody={[
            <>WordPress powers 40% of the web, but most WordPress sites are held back by bloated themes, poorly
            written plugins and performance that degrades under real traffic. At Grey InfoTech we build custom
            WordPress solutions from the ground up—clean custom themes, purpose-built plugins, performant
            hosting configurations and headless architectures that use WordPress as a content API for modern
            frontends. Our WordPress is lean, fast and built to last.</>,
            <>We work with WordPress as a professional engineering platform, not a click-and-drag tool. That
            means custom post types and taxonomies designed for your content model, block themes built on
            Full Site Editing, proper use of the WordPress REST API and GraphQL via WPGraphQL, and
            development workflows with local dev, version control, staging and automated deployment.
            Every site we build is documented, performance-tested and handed over with training so your
            team is fully self-sufficient from day one.</>,
        ]}
        solutionsHeading={<>WordPress<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From custom themes and plugins to headless WordPress and WooCommerce—Grey InfoTech builds WordPress experiences that perform and empower your editors."
        solutions={[
            {
                id: '01', title: 'Custom Theme Development', target: 'CT',
                tags: ['Block Themes', 'FSE', 'ACF', 'Responsive', 'Core Web Vitals'],
                body: <>We build custom WordPress themes following modern WordPress standards—block themes with
                Full Site Editing, theme.json for design tokens, and template parts for editorial flexibility.
                For more controlled designs we build classic themes with ACF Pro field groups and custom
                templates. All themes are responsive, accessible, optimised for Core Web Vitals and
                thoroughly tested across browsers and devices.</>,
            },
            {
                id: '02', title: 'Custom Plugin Development', target: 'CP',
                tags: ['Custom Post Types', 'REST API', 'Admin UI', 'Cron', 'Blocks'],
                body: <>We build WordPress plugins that add functionality without the overhead and security risk
                of third-party plugins. Custom post types, meta boxes, admin settings pages, REST API
                endpoints, custom Gutenberg blocks, WP-CLI commands and background job processing—all written
                to WordPress coding standards with proper data sanitisation, capability checks and nonce
                verification.</>,
            },
            {
                id: '03', title: 'WooCommerce Development', target: 'WC',
                tags: ['WooCommerce', 'Custom Extensions', 'Payment Gateways', 'Subscriptions'],
                body: <>WooCommerce is a powerful commerce platform when implemented correctly. We build
                custom WooCommerce extensions, integrate payment gateways (Paystack, Stripe, Flutterwave),
                implement subscription and membership models, build custom checkout flows and optimise
                WooCommerce performance for high-traffic stores. We also migrate from Shopify and Magento
                to WooCommerce where it is the right fit.</>,
            },
            {
                id: '04', title: 'Headless WordPress', target: 'HW',
                tags: ['WPGraphQL', 'REST API', 'Next.js', 'Faust.js', 'ISR'],
                body: <>Headless WordPress uses the CMS as a content management layer while a modern JavaScript
                frontend—typically Next.js—handles rendering. This delivers preview performance, better
                developer experience and full control over the frontend stack while keeping the familiar
                WordPress editing experience for content teams. We implement WPGraphQL or REST API, configure
                preview, handle authentication and deploy on Vercel or Netlify.</>,
            },
            {
                id: '05', title: 'Performance Optimisation', target: 'PO',
                tags: ['Object Cache', 'Redis', 'CDN', 'Image Optimisation', 'Lazy Load'],
                body: <>Slow WordPress sites lose visitors and rankings. We audit with Lighthouse and New
                Relic, implement Redis object caching, configure full-page caching with nginx FastCGI or
                WP Rocket, set up CDN for assets, optimise images with WebP conversion and implement
                lazy loading. We also eliminate render-blocking scripts, minimise plugin count and
                tune PHP-FPM for your traffic profile.</>,
            },
            {
                id: '06', title: 'WordPress Security & Maintenance', target: 'SM',
                tags: ['Hardening', 'Malware Removal', 'Updates', 'Backups', 'WAF'],
                body: <>WordPress sites are the most attacked CMS on the web. We harden WordPress by
                restricting file editing, changing default URL paths, implementing 2FA, configuring a WAF,
                managing plugin updates proactively and setting up automated backups with off-site storage.
                For compromised sites we provide malware removal, root-cause analysis and hardening to
                prevent reinfection.</>,
            },
        ]}
        ctaHeading={<>WordPress that<br className="lg:block md:block hidden" />won't let you down</>}
        ctaBody="Properly built WordPress is fast, secure and a joy to manage. Grey InfoTech builds WordPress sites that your editors love and your users never notice—because they just work."
        faqs={[
            {q: 'Do you use page builders like Elementor or Divi?', a: 'For custom builds we prefer custom themes and Gutenberg blocks for performance and maintainability. We work with page builders when clients have specific requirements.'},
            {q: 'Can you rebuild our existing WordPress site properly?', a: 'Yes. We audit existing sites, identify performance and security issues, and rebuild incrementally or wholesale depending on the scope of problems.'},
            {q: 'Do you provide ongoing WordPress maintenance?', a: 'Yes. Monthly maintenance plans cover core/plugin updates, security monitoring, uptime checks, backups and a developer hour allowance for small changes.'},
            {q: 'What hosting do you recommend for WordPress?', a: 'Managed WordPress hosting like Kinsta or WP Engine for most sites, or a tuned VPS on AWS/DigitalOcean for high-traffic or custom server requirements.'},
        ]}
    />
);

export default WordPressDevelopment;
