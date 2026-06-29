import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const JoomlaDevelopment = () => (
    <ServicePageTemplate
        title={<>Joomla<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Custom Joomla extensions, themes and enterprise portals—built for performance, security and long-term maintainability."
        eyebrow="Joomla expertise for enterprise and community"
        introHeading={<>Joomla Built<br className="lg:block md:block hidden" />for the Long Haul</>}
        introBody={[
            <>Joomla powers millions of websites worldwide, and its flexibility makes it the platform of choice
            for complex portals, multilingual sites and community platforms. At Grey InfoTech our Joomla
            developers bring deep expertise across custom component development, template creation, migration
            and performance optimisation. Whether you are building a new Joomla site from scratch, extending
            an existing one, or migrating from an older version, we deliver solutions that are fast, secure
            and easy for your team to manage.</>,
            <>Our approach starts with understanding your content architecture, user roles and performance
            requirements. We then design a clean Joomla architecture that avoids plugin bloat, implements
            caching correctly and keeps the admin experience intuitive for non-technical editors. Every
            extension we build follows Joomla coding standards, ships with documentation and is tested
            against the full Joomla extension verification workflow. We also implement hardened security
            configurations and regular update pipelines so your site stays protected.</>,
        ]}
        solutionsHeading={<>Joomla<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From custom components to full enterprise portals, Grey InfoTech delivers Joomla development that's clean, fast and built to last."
        solutions={[
            {
                id: '01', title: 'Custom Component & Plugin Development', target: 'CC',
                tags: ['MVC', 'Components', 'Plugins', 'Modules'],
                body: <>We build bespoke Joomla components, plugins and modules following the MVC architecture
                and Joomla extension standards. Custom features—membership systems, booking engines, directory
                listings, custom forms—are built as proper extensions rather than hacked templates, making them
                upgrade-safe and independently maintainable.</>,
            },
            {
                id: '02', title: 'Template & Theme Development', target: 'TD',
                tags: ['Custom Templates', 'Responsive', 'Page Builder', 'Accessibility'],
                body: <>We design and build custom Joomla templates that deliver pixel-perfect, responsive
                interfaces optimised for Core Web Vitals. Our templates use clean semantic HTML, optimised
                asset loading and proper Joomla override architecture so template customisations survive
                core updates. We also build on frameworks like Helix or YOOtheme Pro where clients prefer
                a page builder workflow.</>,
            },
            {
                id: '03', title: 'Joomla Migration & Upgrades', target: 'MU',
                tags: ['J3 to J4', 'J4 to J5', 'Platform Migration', 'Data Integrity'],
                body: <>Joomla version migrations require careful planning to preserve content, user accounts,
                extensions and SEO rankings. We audit your current installation, identify incompatible extensions,
                map migration risks and execute a phased upgrade with full database backups and rollback capability.
                We also handle migrations from other CMS platforms—WordPress, Drupal—to Joomla.</>,
            },
            {
                id: '04', title: 'Performance Optimisation', target: 'PO',
                tags: ['Caching', 'CDN', 'Image Optimisation', 'Core Web Vitals'],
                body: <>A slow Joomla site hurts SEO and loses visitors. We profile your site using GTmetrix
                and Lighthouse, implement Joomla's caching framework correctly, configure a CDN, optimise
                images and eliminate render-blocking resources. Clients typically achieve 50–80% improvement
                in page load times and significant Core Web Vitals score improvements after optimisation.</>,
            },
            {
                id: '05', title: 'Joomla Security Hardening', target: 'SH',
                tags: ['Security Audit', 'Malware Removal', 'Firewall', '2FA'],
                body: <>Joomla sites are frequent targets for automated attacks. We conduct security audits,
                remove malware, implement a web application firewall, enforce 2FA for admin accounts,
                harden file permissions, disable unused PHP functions and configure automated security
                update pipelines. We also set up uptime monitoring and breach notification alerts.</>,
            },
            {
                id: '06', title: 'Enterprise Portals & Multilingual Sites', target: 'EP',
                tags: ['Multilingual', 'Memberships', 'ACL', 'Integrations'],
                body: <>Joomla's access control system and multilingual capabilities make it ideal for enterprise
                portals and international sites. We architect complex multi-language sites, implement
                role-based content access, integrate with SSO providers, CRMs and payment gateways, and
                build custom member dashboards that extend Joomla's native user management.</>,
            },
        ]}
        ctaHeading={<>Joomla done<br className="lg:block md:block hidden" />properly</>}
        ctaBody="Joomla rewards expertise. Grey InfoTech builds Joomla sites that perform, stay secure and empower your editors to manage content without developer help."
        faqs={[
            {q: 'Which version of Joomla do you develop for?', a: 'We work with Joomla 4 and 5 for new projects, and provide migration services from Joomla 3. We do not build new sites on Joomla 3 which is end-of-life.'},
            {q: 'Can you migrate our WordPress site to Joomla?', a: 'Yes. We handle content migration, URL mapping for SEO preservation, user import and theme recreation in Joomla.'},
            {q: 'Do you maintain Joomla sites ongoing?', a: 'We offer monthly maintenance plans covering core updates, extension updates, security monitoring and performance reports.'},
            {q: 'What third-party extensions do you recommend?', a: 'We have preferred extension stacks for common requirements—forms (Fabrik or Hikashop), SEO (OSMap), galleries, memberships—and advise based on your specific needs.'},
        ]}
    />
);

export default JoomlaDevelopment;
