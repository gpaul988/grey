import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const DrupalDevelopment = () => (
    <ServicePageTemplate
        title={<>Drupal<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/Research-strategy.jpg"
        topImages={['/assets/services/digital-transformatio.jpg', '/assets/services/digital-optimisation.jpg']}
        intro="Enterprise-grade Drupal solutions—custom modules, headless architecture and complex content models—built for the organisations that need serious content management power."
        eyebrow="Drupal expertise for complex digital experiences"
        introHeading={<>Enterprise Content<br className="lg:block md:block hidden" />Management, Evolved</>}
        introBody={[
            <>Drupal is the platform of choice for governments, universities, media organisations and large
            enterprises that need robust content modelling, fine-grained permissions and the flexibility to
            build highly customised digital experiences. At Grey InfoTech our Drupal developers bring deep
            expertise in custom module development, headless Drupal architectures, complex content migrations
            and Drupal performance at scale. We build Drupal solutions that match the complexity of your
            editorial workflows and content governance requirements.</>,
            <>Our Drupal practice follows best practices rigorously—Composer-managed dependencies, configuration
            management in Git, code reviews against Drupal coding standards, and automated testing with PHPUnit
            and Behat. We implement Drupal as part of a broader technology stack: headless as an API backend
            for a React or Next.js frontend, or fully coupled for content-heavy editorial environments.
            Every engagement includes performance profiling, caching strategy and a documented site architecture
            that your team can maintain and extend confidently.</>,
        ]}
        solutionsHeading={<>Drupal<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From custom module development to headless architecture and enterprise migrations, Grey InfoTech builds Drupal solutions that scale with your organisation."
        solutions={[
            {
                id: '01', title: 'Custom Module Development', target: 'CM',
                tags: ['Drupal 10', 'PHP', 'Services', 'Hooks', 'Plugins'],
                body: <>We build custom Drupal modules that extend the platform to meet your exact business
                requirements—custom field types, entity bundles, workflow integrations, payment gateways,
                API clients and complex data transformations. Modules follow Drupal&apos;s object-oriented
                architecture with dependency injection, event subscribers and proper testing, making them
                upgrade-safe and maintainable.</>,
            },
            {
                id: '02', title: 'Headless & Decoupled Drupal', target: 'HD',
                tags: ['JSON:API', 'GraphQL', 'Next.js', 'React', 'REST'],
                body: <>We architect Drupal as a headless CMS, exposing content via JSON:API or GraphQL to
                a modern React or Next.js frontend. This approach delivers the editorial power of Drupal with
                the performance and developer experience of a modern JavaScript frontend. We configure
                preview functionality, manage CORS, implement ISR/SSR strategies and handle authentication
                between the decoupled layers.</>,
            },
            {
                id: '03', title: 'Content Modelling & Architecture', target: 'CA',
                tags: ['Entity Types', 'Paragraphs', 'Taxonomy', 'Workflows'],
                body: <>Good Drupal architecture starts with a well-designed content model. We run discovery
                workshops with your editorial teams to understand content requirements, then design entity
                types, field configurations and reference structures that support flexible layouts without
                becoming unmaintainable. We also configure editorial workflows, content moderation states
                and publishing schedules to match your governance process.</>,
            },
            {
                id: '04', title: 'Drupal Migration & Upgrades', target: 'MU',
                tags: ['D7 to D10', 'Migrate API', 'Data Integrity', 'SEO'],
                body: <>Drupal 7 reaches end-of-life and legacy D8 sites need upgrading. We execute Drupal
                migrations using the Migrate API, mapping source data to destination entity types,
                handling media, redirects, user accounts and URL aliases. We run migration in parallel with
                the live site, validate data integrity programmatically, and execute cutover with minimal
                downtime and SEO-preserving 301 redirects.</>,
            },
            {
                id: '05', title: 'Performance & Scalability', target: 'PS',
                tags: ['BigPipe', 'Varnish', 'Redis', 'CDN', 'Profiling'],
                body: <>High-traffic Drupal sites require a layered caching strategy. We configure BigPipe
                for personalised content delivery, implement Varnish for full-page caching, Redis for
                cache bins and session storage, and CDN integration for static assets. We profile using
                XHProf or Blackfire to identify slow queries, N+1 problems and expensive render arrays,
                delivering measurable page load improvements.</>,
            },
            {
                id: '06', title: 'Drupal Security & Maintenance', target: 'SM',
                tags: ['Security Updates', 'Audit', 'Hardening', 'WAF'],
                body: <>Drupal sites in the wild are targeted by automated vulnerability scanners. We conduct
                security audits, apply Security Advisories promptly, harden configuration, implement a WAF,
                configure proper file permissions and disable development-only modules in production. Our
                maintenance plans include automated update testing in a staging environment before applying
                to production.</>,
            },
        ]}
        ctaHeading={<>Drupal that<br className="lg:block md:block hidden" />handles serious scale</>}
        ctaBody="When your content requirements outgrow simpler platforms, Drupal—implemented correctly—is unmatched. Grey InfoTech builds Drupal solutions that editorial teams love."/>
);

export default DrupalDevelopment;

