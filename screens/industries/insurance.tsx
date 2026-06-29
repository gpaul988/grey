import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const InsuranceIndustry = () => (
    <ServicePageTemplate
        title={<>Insurance<br className="lg:block md:block hidden" />Technology</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="InsurTech platforms, claims automation, policy management systems and customer portals that modernise the insurance experience for both carriers and policyholders."
        eyebrow="InsurTech solutions for modern carriers"
        introHeading={<>Insurance<br className="lg:block md:block hidden" />Transformed</>}
        introBody={[
            <>The insurance industry is undergoing its most significant technology transformation in decades—
            driven by embedded insurance, usage-based products, AI underwriting and the expectation of
            consumer-grade digital experiences. At Grey InfoTech we build the platforms that put insurers
            and brokers ahead of this change. From policy administration systems and claims workflows to
            customer-facing portals and API distribution layers, we engineer the insurance technology stack
            for the next decade.</>,
            <>Our insurance technology team understands the nuances of the industry—regulatory requirements,
            actuarial data needs, claims fraud patterns and the complexity of reinsurance structures. We
            build systems that are not only technically excellent but compliant with NAICOM regulations in
            Nigeria and international insurance standards. We work with insurers, MGAs, brokers and embedded
            insurance providers, designing architecture that supports high transaction volumes, complex
            product configurations and the data granularity that modern actuarial teams demand.</>,
        ]}
        solutionsHeading={<>Insurance<br className="lg:block md:block hidden" />Technology Solutions</>}
        solutionsIntro="From policy administration to claims automation and InsurTech API platforms, Grey InfoTech engineers insurance systems that reduce cost, improve experience and grow revenue."
        solutions={[
            {
                id: '01', title: 'Policy Administration Systems', target: 'PA',
                tags: ['Policy Lifecycle', 'Endorsements', 'Renewals', 'Multi-line'],
                body: <>We build modern policy administration systems that handle the full policy lifecycle—
                quoting, binding, endorsements, renewals and cancellations—across multiple product lines
                and distribution channels. Systems integrate with rating engines, document generation,
                payment processors and regulatory reporting, designed for the flexibility that evolving
                product portfolios require.</>,
            },
            {
                id: '02', title: 'Claims Management & Automation', target: 'CL',
                tags: ['FNOL', 'Workflow', 'Fraud Detection', 'Settlement'],
                body: <>Claims are where insurer promises are kept or broken. We build claims management systems
                with digital FNOL, automated triage, adjuster workflow management, third-party integrations
                (repairers, assessors, legal), fraud scoring and straight-through processing for low-complexity
                claims. Automated settlement and payment release reduces handling costs while improving
                claimant experience.</>,
            },
            {
                id: '03', title: 'Customer & Broker Portals', target: 'CB',
                tags: ['Self-Service', 'Document Management', 'Claims Tracking', 'Broker APIs'],
                body: <>Self-service portals reduce call centre volume and improve customer satisfaction.
                We build policyholder portals for policy management, claims submission and document download,
                and broker portals with real-time quoting, mid-term adjustment and commission reporting.
                Both are built mobile-first with clean, accessible interfaces that match consumer app
                expectations.</>,
            },
            {
                id: '04', title: 'Embedded & API Insurance', target: 'EI',
                tags: ['Open Insurance', 'REST API', 'Embedded', 'Partnerships'],
                body: <>Embedded insurance distributes products at point of need—travel cover at checkout,
                device protection with purchase. We build the API infrastructure that enables this: product
                APIs, instant quoting engines, certificate generation, webhook notifications and partner
                management portals. We design for the latency and reliability requirements of real-time
                distribution at scale.</>,
            },
            {
                id: '05', title: 'Underwriting & Risk Analytics', target: 'UA',
                tags: ['Data Models', 'Scoring', 'BI', 'Telematics', 'Machine Learning'],
                body: <>Data-driven underwriting reduces loss ratios and enables new product structures.
                We build underwriting data platforms, risk scoring models, telematics data pipelines
                and actuarial reporting infrastructure. We work with your underwriting and actuarial teams
                to design data models that support the granularity and lineage required for pricing
                model development and regulatory scrutiny.</>,
            },
            {
                id: '06', title: 'Compliance & Regulatory Reporting', target: 'CR',
                tags: ['NAICOM', 'IFRS 17', 'Solvency', 'Audit Trail'],
                body: <>Insurance regulation is demanding and the cost of non-compliance is severe. We build
                regulatory reporting pipelines, IFRS 17 data transformation layers, solvency capital
                calculation engines and NAICOM submission workflows. We design audit trails and data lineage
                so compliance teams can trace every figure in every regulatory return to its source data.</>,
            },
        ]}
        ctaHeading={<>InsurTech that<br className="lg:block md:block hidden" />writes the future</>}
        ctaBody="The insurance market rewards those who modernise earliest. Grey InfoTech builds insurance technology that reduces costs, delights customers and opens new distribution channels."
        faqs={[
            {q: 'Do you work with Nigerian insurance regulations (NAICOM)?', a: 'Yes. We design systems with NAICOM reporting and compliance requirements built in, and our team is familiar with Nigerian insurance market structures.'},
            {q: 'Can you integrate with existing policy administration systems?', a: 'Absolutely. We build integration layers and APIs that connect legacy PAS with modern digital channels and analytics platforms.'},
            {q: 'Do you build InsurTech startups as well as established carriers?', a: 'Yes. We work with both—helping startups move quickly to market and helping established insurers modernise their technology estate.'},
            {q: 'How do you handle the security of sensitive policyholder data?', a: 'With encryption at rest and in transit, role-based access, audit logging, and security controls aligned to financial services data protection standards.'},
        ]}
    />
);

export default InsuranceIndustry;
