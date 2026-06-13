import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Automation = () => (
    <ServicePageTemplate
        title={<>Automation Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-optimisation.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro={
            <>
                Doing more with less—workflow automation, RPA, AI-driven processes and seamless integrations that
                eliminate manual work and unlock measurable efficiency.
            </>
        }
        eyebrow={<>Automate the routine, <br className={'lg:block md:block hidden'}/>amplify your people</>}
        introHeading={<>Intelligent Automation <br className={'lg:block md:block hidden'}/>How We Drive Efficiency</>}
        introBody={[
            <>
                Every business runs on processes—and too many of them still rely on manual, repetitive work that
                drains time, introduces errors and frustrates skilled people. Grey InfoTech builds automation
                that takes that burden away. We map your workflows, identify where automation delivers the
                greatest return, and build the software—workflow engines, robotic process automation, AI-driven
                decisioning and system integrations—that runs the routine reliably so your team can focus on the
                work that actually needs human judgement. The outcome is faster cycle times, fewer errors, lower
                cost and a workforce freed to do higher-value work.
            </>,
            <>
                Real automation goes beyond simple scripts. We connect the systems you already use—CRMs, ERPs,
                accounting, support tools and databases—so data flows automatically instead of being re-keyed,
                and we layer in AI where it adds intelligence, from document understanding to predictive routing.
                Everything we build is observable, resilient and auditable, with clear logging and human-in-the-
                loop controls where decisions matter. Whether you need to automate a single painful process or
                orchestrate operations across your whole organisation, we deliver automation that is dependable,
                measurable and genuinely transformative.
            </>,
        ]}
        solutionsHeading={<>Automation <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From workflow automation and RPA to AI-driven processes and integrations, Grey InfoTech delivers
                automation that works. Based in Nigeria and serving clients globally, we eliminate manual effort
                and connect your systems—turning operational friction into measurable efficiency.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Workflow Automation', target: 'WF',
                tags: ['Process Design', 'Orchestration', 'Approvals'],
                body: <>We design and automate end-to-end workflows—approvals, handoffs, notifications and
                    multi-step processes—so work moves through your organisation automatically, with clear status
                    visibility and no items falling through the cracks.</>,
            },
            {
                id: '02', title: 'Robotic Process Automation (RPA)', target: 'RP',
                tags: ['Bots', 'Data Entry', 'Repetitive Tasks'],
                body: <>We build software bots that handle high-volume, rule-based tasks—data entry, reconciliation,
                    report generation and form processing—across applications, even those without APIs, freeing
                    staff from tedious work and slashing error rates.</>,
            },
            {
                id: '03', title: 'AI-Driven Automation', target: 'AI',
                tags: ['Document AI', 'NLP', 'Predictive', 'Decisioning'],
                body: <>We add intelligence to automation—document understanding, classification, natural-language
                    processing and predictive decisioning—so processes handle unstructured inputs and judgement
                    calls that traditional rules can&apos;t, with human oversight where it counts.</>,
            },
            {
                id: '04', title: 'System Integrations', target: 'SI',
                tags: ['APIs', 'CRM/ERP', 'Webhooks', 'iPaaS'],
                body: <>We connect your tools—CRMs, ERPs, accounting, support and databases—through APIs, webhooks
                    and integration platforms, so data flows automatically between systems instead of being
                    manually copied, keeping everything in sync.</>,
            },
            {
                id: '05', title: 'Custom Automation Software', target: 'CA',
                tags: ['Bespoke', 'Scheduling', 'Dashboards'],
                body: <>When off-the-shelf tools fall short, we build bespoke automation software tailored to your
                    exact processes—schedulers, internal tools and dashboards—that fit how your business actually
                    works and scale as it grows.</>,
            },
            {
                id: '06', title: 'Monitoring & Support', target: 'MS',
                tags: ['Logging', 'Alerts', 'Audit', 'Maintenance'],
                body: <>We make automation observable and dependable—logging, alerting, audit trails and
                    error-handling—and provide ongoing support so your automated processes keep running smoothly
                    and adapt as your systems and rules evolve.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'ROI-Focused Approach', image: '/assets/services/Development.jpg',
                description: <>We start by finding where automation pays back fastest, so you see measurable
                    efficiency and cost savings—not automation for its own sake.</>,
            },
            {
                id: 2, title: 'Intelligence Where It Counts', image: '/assets/services/digital-transformatio.jpg',
                description: <>We blend rules-based automation with AI for unstructured data and decisions,
                    handling the cases that simple scripts never could.</>,
            },
            {
                id: 3, title: 'Connected, Not Siloed', image: '/assets/services/services.jpg',
                description: <>We integrate the systems you already use so data flows automatically, ending the
                    re-keying and copy-paste that slows teams down.</>,
            },
            {
                id: 4, title: 'Reliable & Auditable', image: '/assets/services/digital-optimisation.jpg',
                description: <>Logging, alerts, audit trails and human-in-the-loop controls keep automation
                    dependable and compliant—so you can trust it with critical work.</>,
            },
        ]}
        ctaHeading={<>Automate what <br className={'lg:block md:block hidden'}/>slows you down</>}
        ctaBody={<>From workflow automation and RPA to AI-driven processes, Grey InfoTech eliminates manual effort
            and connects your systems. Let&apos;s find your biggest time-drains and turn them into measurable
            efficiency.</>}
        faqs={[
            {q: 'What processes are good candidates for automation?', a: 'High-volume, repetitive, rule-based tasks with clear inputs and outputs—data entry, reconciliation, reporting, approvals, onboarding and cross-system updates. During discovery we map your workflows and prioritise the ones with the strongest return.'},
            {q: 'What is the difference between workflow automation and RPA?', a: 'Workflow automation orchestrates steps and handoffs across a process, usually via APIs. RPA uses software bots to operate existing applications—even those without APIs—mimicking user actions. We use whichever fits, and often combine them.'},
            {q: 'Can automation use AI?', a: 'Yes. We add AI for tasks rules can\u2019t handle alone—document understanding, classification, NLP and predictive decisioning—always with human oversight where decisions carry risk.'},
            {q: 'Will automation integrate with our existing software?', a: 'Absolutely. We connect CRMs, ERPs, accounting, support tools and databases through APIs, webhooks and integration platforms so data flows automatically and stays in sync.'},
            {q: 'How do you ensure automation is reliable and safe?', a: 'We build in logging, alerting, audit trails, error-handling and human-in-the-loop controls, then monitor and maintain the automation so it keeps running correctly as your systems and rules change.'},
            {q: 'How quickly will we see results?', a: 'Many automations pay back within weeks of go-live by removing hours of manual work. We focus on high-ROI processes first so the value is visible early, then expand from there.'},
        ]}
        testimonials={[
            {name: 'Ifeanyi Okeke', title: 'Operations Director, LedgerPro', message: <>Grey InfoTech automated our invoice reconciliation with RPA and document AI. What took a team two days now runs overnight, error-free. The ROI was obvious within a month.</>},
            {name: 'Sarah Mutua', title: 'Head of Ops, CareConnect', message: <>They connected our CRM, scheduling and billing so data flows automatically. No more re-keying, far fewer mistakes, and our staff focus on patients instead of paperwork.</>},
            {name: 'Tobi Ogunleye', title: 'CEO, SwiftClaims', message: <>Their AI-driven claims automation transformed our turnaround times. Reliable, auditable and genuinely intelligent where it needs to be.</>},
        ]}
    />
);

export default Automation;
