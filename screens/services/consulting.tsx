import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Consulting = () => (
    <ServicePageTemplate
        title={<>Technology<br className="lg:block md:block hidden" />Consulting</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/Web-App-Development-company.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/services.jpg']}
        intro="Strategic technology guidance that turns complex decisions into clear roadmaps -helping your business move faster, build the right things and avoid costly mistakes."
        eyebrow="Strategic technology guidance for growth"
        introHeading={<>Clarity From<br className="lg:block md:block hidden" />Complexity</>}
        introBody={[
            <>Technology decisions made today lock in the trajectory of your business for years. At Grey
            InfoTech we provide the strategic counsel and hands-on expertise to help you make those decisions
            with confidence. Whether you are a startup choosing a founding tech stack, a scale-up navigating a
            re-platform, or an enterprise modernising legacy systems, our consultants combine deep engineering
            knowledge with commercial acumen to give you recommendations that are practical, not theoretical.</>,
            <>We do not produce slide decks that gather dust. Every engagement produces actionable artefacts -
            architecture diagrams, build-vs-buy analyses, vendor shortlists, risk registers, RFP templates and
            prioritised roadmaps -and we remain available to validate implementation progress. Our consultants
            have shipped real products across fintech, healthtech, logistics and e-commerce, so the advice is
            grounded in what actually works in production, not just what looks good on paper.</>,
        ]}
        solutionsHeading={<>Consulting<br className="lg:block md:block hidden" />Services</>}
        solutionsIntro="From technology strategy to hands-on architecture review, Grey InfoTech consulting helps you make better decisions faster and build with confidence."
        solutions={[
            {
                id: '01', title: 'Technology Strategy & Roadmapping', target: 'TS',
                tags: ['Roadmap', 'OKRs', 'Investment Planning'],
                body: <>We align your technology investments with business objectives. Starting from stakeholder
                interviews, competitive analysis and current-state assessment, we produce a 12–24 month
                technology roadmap with initiative sequencing, resource requirements and expected ROI. The
                roadmap is designed to be a living document, reviewed quarterly as priorities evolve.</>,
            },
            {
                id: '02', title: 'Architecture Review & Design', target: 'AR',
                tags: ['System Design', 'Scalability', 'Security', 'Patterns'],
                body: <>We review existing architectures for performance bottlenecks, security gaps and
                scalability ceilings, then produce a prioritised findings report with remediation playbooks.
                For greenfield projects we run architecture design sessions, produce C4 diagrams and ADRs,
                and validate the design against your non-functional requirements before development begins.</>,
            },
            {
                id: '03', title: 'Digital Transformation Advisory', target: 'DT',
                tags: ['Legacy Modernisation', 'Process Automation', 'Change Management'],
                body: <>Digital transformation is as much a people and process challenge as a technology one.
                We help you define what to modernise, sequence the work to minimise disruption, select the
                right platforms and manage change across the organisation. Our advisory covers process mapping,
                automation opportunity identification, vendor selection and team capability building.</>,
            },
            {
                id: '04', title: 'Tech Stack Selection & Build vs Buy', target: 'BS',
                tags: ['Evaluation', 'Vendor Analysis', 'TCO'],
                body: <>Choosing the wrong stack or vendor is expensive. We run structured evaluations using
                weighted criteria covering total cost of ownership, lock-in risk, team capability, community
                health and scalability. We produce clear recommendation reports with evidence so stakeholders
                can make informed decisions quickly without months of analysis paralysis.</>,
            },
            {
                id: '05', title: 'CTO-as-a-Service', target: 'CTO',
                tags: ['Fractional CTO', 'Startups', 'Scale-ups'],
                body: <>Not every company needs a full-time CTO from day one. Our fractional CTO service
                provides senior technical leadership on a part-time basis -sitting in board meetings, leading
                engineering hiring, setting technical direction, reviewing vendor contracts and mentoring
                your engineering team. Engagement scales from 2 days/month to full-time as you grow.</>,
            },
            {
                id: '06', title: 'Security & Compliance Consulting', target: 'SC',
                tags: ['ISO 27001', 'SOC 2', 'GDPR', 'Pen Testing'],
                body: <>We help organisations achieve and maintain security certifications and compliance
                frameworks. Our work covers gap analysis, policy drafting, control implementation, vendor
                risk assessment and audit preparation. We translate dense compliance requirements into
                practical engineering tasks your team can execute and track to completion.</>,
            },
        ]}
        ctaHeading={<>Advice that<br className="lg:block md:block hidden" />actually ships</>}
        ctaBody="Great consulting doesn't end with a report. We stay engaged to validate implementation, unblock decisions and ensure the strategy translates into software that works."
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Digital Transformation Strategy',
                description: 'Evaluate technology landscape, identify modernization opportunities, and architect comprehensive digital strategies aligned with business objectives.'
            },
            {
                id: 'vs2',
                title: 'Technology Architecture',
                description: 'Design scalable, resilient systems architecture that balances innovation with operational excellence, cost and technical debt management.'
            },
            {
                id: 'vs3',
                title: 'Vendor & Partnership Strategy',
                description: 'Navigate vendor selection, negotiation, and long-term partnership strategies to optimize technology investments and business outcomes.'
            }
        ]}/>
);

export default Consulting;

