import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const LegalTechIndustry = () => (
    <ServicePageTemplate
        title={<>Legal<br className="lg:block md:block hidden" />Technology</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Legal technology platforms, contract automation, document management and client portals that increase law firm productivity and make legal services more accessible."
        eyebrow="LegalTech for the modern legal profession"
        introHeading={<>Legal Services<br className="lg:block md:block hidden" />Powered by Technology</>}
        introBody={[
            <>The legal profession is at an inflection point. Clients expect faster responses, transparent
            billing and digital access to their matters. Firms that embrace technology win clients and
            run more profitably. At Grey InfoTech we build legal technology platforms—practice management
            systems, contract lifecycle management, legal research tools, document automation and client
            portals—that give law firms and legal departments the productivity gains they need to compete
            in a changing market.</>,
            <>Our legal technology work is grounded in an understanding of how legal professionals actually
            work—billing, matter management, compliance, privilege and confidentiality are first-class
            concerns in everything we build. We design for the reality of busy lawyers: interfaces that
            minimise data entry, automation that handles routine tasks, and integrations with the court
            filing systems, e-signature platforms and billing tools that form the backbone of legal
            practice.</>,
        ]}
        solutionsHeading={<>LegalTech<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From practice management to contract automation and AI legal research, Grey InfoTech builds technology that makes legal professionals more productive and clients better served."
        solutions={[
            {
                id: '01', title: 'Practice Management Systems', target: 'PM',
                tags: ['Matter Management', 'Time & Billing', 'Client Portal', 'Conflict Check'],
                body: <>We build legal practice management systems covering matter lifecycle, time recording,
                billing and invoicing, trust accounting, document management, conflict-of-interest checking
                and deadline tracking. Systems are designed around the billing partner, associate and
                paralegal workflows, with mobile access for time capture and client communication.</>,
            },
            {
                id: '02', title: 'Contract Lifecycle Management', target: 'CL',
                tags: ['Drafting', 'Negotiation', 'Approval', 'Obligations', 'Renewal'],
                body: <>We build contract lifecycle management platforms that automate the journey from
                template selection through drafting, negotiation, approval, e-signature, obligation tracking
                and renewal. Clause libraries, playbooks and deviation alerts help in-house legal teams
                manage contract risk at scale without reading every clause manually.</>,
            },
            {
                id: '03', title: 'Legal Document Automation', target: 'DA',
                tags: ['Template Engine', 'Conditional Logic', 'e-Signature', 'PDF Generation'],
                body: <>Repetitive document generation—NDAs, employment agreements, shareholder resolutions,
                demand letters—is a massive productivity drain. We build document automation platforms
                that generate complex legal documents from intelligent questionnaires, integrating with
                e-signature platforms for end-to-end automation and built-in version control for
                template management.</>,
            },
            {
                id: '04', title: 'AI Legal Research & Analysis', target: 'AI',
                tags: ['Case Law', 'Statute Search', 'Summarisation', 'LLM', 'RAG'],
                body: <>AI-powered legal research dramatically reduces the time junior lawyers spend
                on routine research tasks. We build legal research tools using RAG architectures over
                curated legal corpora—case law, statutes, regulatory guidance—with citation tracking,
                answer grounding and hallucination controls. We also build AI contract review tools
                that flag risk clauses against firm playbooks.</>,
            },
            {
                id: '05', title: 'Client Portals & Onboarding', target: 'CP',
                tags: ['AML/KYC', 'Digital Onboarding', 'Matter Updates', 'Secure Messaging'],
                body: <>Client experience is a competitive differentiator for law firms. We build secure
                client portals for digital onboarding with AML/KYC verification, matter status updates,
                document sharing, invoice payment and encrypted messaging. Portals reduce administrative
                overhead while providing the communication transparency that clients increasingly expect.</>,
            },
            {
                id: '06', title: 'Court Filing & Case Management', target: 'CF',
                tags: ['e-Filing', 'Deadline Management', 'Court Integration', 'Litigation'],
                body: <>Litigation support requires precise deadline management and organised case files.
                We build systems that integrate with court e-filing portals, automate deadline calculation
                from event triggers, manage case bundles and link correspondence, filings and evidence to
                the relevant proceeding. Automated reminders and escalation ensure critical deadlines
                are never missed.</>,
            },
        ]}
        ctaHeading={<>Legal work,<br className="lg:block md:block hidden" />done smarter</>}
        ctaBody="The firms that invest in technology today will define the legal market tomorrow. Grey InfoTech builds legal technology that multiplies what your lawyers can accomplish."/>
);

export default LegalTechIndustry;

