import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const GovernmentIndustry = () => (
    <ServicePageTemplate
        title={<>Government &amp;<br className="lg:block md:block hidden" />Public Sector</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Secure, accessible and citizen-centred digital services that modernise government operations, improve service delivery and build public trust through technology."
        eyebrow="Digital transformation for public service"
        introHeading={<>Government Services<br className="lg:block md:block hidden" />Reimagined</>}
        introBody={[
            <>Governments face a unique technology challenge: serving citizens across every demographic, device
            and connectivity level while meeting strict security, accessibility and compliance requirements.
            At Graham Sobiribo Paul we design and build government digital services that put citizens at the centre -
            simple interfaces, inclusive design, fast performance and secure data handling. We work across
            federal, state and local government, understanding the procurement, compliance and change management
            constraints of the public sector.</>,
            <>Our government technology practice covers citizen portals, e-government platforms, case management
            systems, data analytics for policy teams and internal productivity tools. We comply with government
            accessibility standards (WCAG 2.1 AA), implement the security controls required for sensitive
            citizen data, and design for low-bandwidth environments. We also support governments navigating
            the transition from legacy systems to modern cloud architectures without disrupting service
            continuity for the citizens who depend on them.</>,
        ]}
        solutionsHeading={<>Government<br className="lg:block md:block hidden" />Technology Solutions</>}
        solutionsIntro="From citizen portals to data analytics and legacy modernisation, Graham Sobiribo Paul builds government technology that works for every citizen."
        solutions={[
            {
                id: '01', title: 'Citizen Service Portals', target: 'CP',
                tags: ['e-Government', 'Self-Service', 'Accessibility', 'Multi-channel'],
                body: <>We build citizen-facing portals that make government services accessible online -
                licence renewals, permit applications, tax submissions, benefit claims and document requests.
                Designed for inclusive access with screen reader support, plain language content and mobile-first
                interfaces that work on low-end devices and variable connectivity.</>,
            },
            {
                id: '02', title: 'Case Management Systems', target: 'CM',
                tags: ['Workflow', 'Document Management', 'Audit Trail', 'Integration'],
                body: <>We build case management systems for social services, regulatory bodies, courts and
                licensing agencies -managing applications, correspondence, approvals and case history with
                full audit trails, role-based access and integration with national databases and payment
                systems. Systems are designed for the caseworker&apos;s daily reality, not the IT department&apos;s
                preference.</>,
            },
            {
                id: '03', title: 'Data Analytics for Policy', target: 'DA',
                tags: ['Dashboards', 'Open Data', 'GIS', 'Reporting'],
                body: <>Policy decisions informed by data produce better outcomes. We build analytics platforms
                for government agencies covering population health monitoring, infrastructure utilisation,
                budget tracking, service demand forecasting and open data publication. GIS integration,
                demographic breakdowns and automated reporting make insights accessible to non-technical
                policy staff.</>,
            },
            {
                id: '04', title: 'Legacy System Modernisation', target: 'LM',
                tags: ['Strangler Fig', 'Microservices', 'API Layer', 'Migration'],
                body: <>Many critical government systems run on technology that is decades old and expensive
                to maintain. We modernise legacy systems using a strangler-fig approach -incrementally
                replacing functionality without big-bang rewrites that carry unacceptable delivery risk.
                We wrap legacy systems with API layers, migrate data to modern stores and retire old components
                as new ones are validated.</>,
            },
            {
                id: '05', title: 'Identity & Access Management', target: 'IA',
                tags: ['National ID', 'SSO', 'MFA', 'OIDC', 'BVN Integration'],
                body: <>Secure identity is foundational to trusted digital government. We integrate with
                national identity systems, implement SSO across multiple government portals, configure
                strong authentication including MFA and biometric options, and build citizen account
                management with privacy-by-design data handling. We are experienced with Nigerian NIN and
                BVN integration for identity verification.</>,
            },
            {
                id: '06', title: 'Smart City & IoT Platforms', target: 'SC',
                tags: ['Sensors', 'CCTV', 'Traffic', 'Utilities', 'Real-time'],
                body: <>Smart city initiatives require platforms that ingest, process and act on data from
                thousands of connected sensors -traffic cameras, environmental monitors, utility meters and
                emergency response systems. We build the data platforms, dashboards and alerting systems
                that help city operations teams manage urban infrastructure in real time.</>,
            },
        ]}
        ctaHeading={<>Technology<br className="lg:block md:block hidden" />in public service</>}
        ctaBody="When government technology works properly, millions of citizens benefit. Graham Sobiribo Paul builds public sector digital services that are reliable, inclusive and trusted."/>
);

export default GovernmentIndustry;

