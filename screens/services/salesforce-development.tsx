import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const SalesforceDevelopment = () => (
    <ServicePageTemplate
        title={<>Salesforce<br className="lg:block md:block hidden" />Development</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Research-strategy.jpg', '/assets/services/ecommerce-web-design.jpg']}
        intro="Custom Salesforce implementations, integrations and Apex development that maximise your CRM investment and unify your customer data across every touchpoint."
        eyebrow="Salesforce engineered for your exact process"
        introHeading={<>Salesforce That<br className="lg:block md:block hidden" />Fits Your Business</>}
        introBody={[
            <>Salesforce is the world&apos;s leading CRM, but out-of-the-box configuration rarely matches the
            nuance of a real business process. At Grey InfoTech our certified Salesforce developers and
            architects customise, integrate and optimise the platform to match exactly how your teams sell,
            service and operate. We bring deep expertise in Sales Cloud, Service Cloud, Marketing Cloud,
            Experience Cloud and Salesforce Platform—delivering solutions that drive adoption rather than
            frustration.</>,
            <>Our engagements go beyond clicking through setup menus. We write clean Apex, build Lightning
            Web Components, design scalable data models and integrate Salesforce with your wider technology
            stack using APIs, middleware and native connectors. We also implement DevOps best practices for
            Salesforce—version-controlled metadata, CI/CD with Salesforce DX, automated testing with Apex
            test classes, and sandbox management—so your org is maintainable and deployable like a proper
            software project.</>,
        ]}
        solutionsHeading={<>Salesforce<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From fresh implementations to complex custom development and integrations, Grey InfoTech builds Salesforce solutions that your teams actually use."
        solutions={[
            {
                id: '01', title: 'Salesforce Implementation', target: 'SI',
                tags: ['Sales Cloud', 'Service Cloud', 'Experience Cloud', 'Setup'],
                body: <>We implement Salesforce from scratch or augment existing orgs—covering requirements
                discovery, data model design, process automation, user permission configuration, validation
                rules, page layouts and reports/dashboards. Every implementation is documented, tested
                and backed by change management support to drive user adoption from day one.</>,
            },
            {
                id: '02', title: 'Apex & LWC Development', target: 'AP',
                tags: ['Apex', 'Lightning Web Components', 'Triggers', 'Batch Jobs'],
                body: <>When declarative tools reach their limits, we write clean, well-tested Apex code.
                Our developers build custom triggers, batch processes, scheduled jobs and REST/SOAP API
                services. On the front-end we create Lightning Web Components that extend the Salesforce UI
                with functionality tailored to your users&apos; workflows—fast, accessible and mobile-responsive.</>,
            },
            {
                id: '03', title: 'Salesforce Integrations', target: 'IN',
                tags: ['MuleSoft', 'REST', 'Platform Events', 'ERP', 'Marketing'],
                body: <>Salesforce is most powerful when connected to your wider systems—ERP, marketing
                automation, billing, support ticketing and data warehouse. We design integration architectures
                using Platform Events, Change Data Capture, Salesforce APIs and middleware like MuleSoft
                or custom Node.js/Python services. We build for reliability with retry logic, dead-letter
                queues and comprehensive logging.</>,
            },
            {
                id: '04', title: 'Marketing Cloud & Pardot', target: 'MC',
                tags: ['Email Studio', 'Journey Builder', 'AMPscript', 'Pardot'],
                body: <>We configure and customise Marketing Cloud to power sophisticated customer journeys—
                personalised email campaigns, SMS flows, push notifications and social studio. Our work
                covers Journey Builder design, AMPscript and SQL query activities, connector setup and
                cross-cloud data synchronisation with Sales Cloud for closed-loop reporting on marketing ROI.</>,
            },
            {
                id: '05', title: 'Salesforce CPQ & Billing', target: 'CPQ',
                tags: ['CPQ', 'Billing', 'Contracts', 'Revenue Cloud'],
                body: <>Configuring complex products and generating accurate quotes and contracts is a common
                pain point. We implement Salesforce CPQ with product catalogues, pricing rules, discount
                schedules, approval workflows and document generation. For companies with recurring revenue
                we extend into Salesforce Billing to automate invoicing, amendments and revenue recognition.</>,
            },
            {
                id: '06', title: 'Salesforce DevOps & Migrations', target: 'DO',
                tags: ['SFDX', 'Copado', 'Gearset', 'Org Migration'],
                body: <>We modernise Salesforce development with proper DevOps practices—Salesforce DX project
                structure, version control in Git, CI/CD with Gearset or Copado and automated Apex test
                execution. For org migrations and refreshes we design sandbox strategies, manage metadata
                deployments and handle data migration with tools like Data Loader, Informatica and
                custom scripts.</>,
            },
        ]}
        ctaHeading={<>Salesforce that<br className="lg:block md:block hidden" />drives revenue</>}
        ctaBody="Your CRM should be your competitive advantage, not a system your team works around. Grey InfoTech builds Salesforce solutions that match your process perfectly."/>
);

export default SalesforceDevelopment;

