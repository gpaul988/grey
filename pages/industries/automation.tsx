import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Automation = () => (
    <ServicePageTemplate
        title="Automation"
        heroImage="/assets/services/digital-transformatio.jpg"
        midImage="/assets/services/digital-optimisation.jpg"
        intro={
            <>
                We help businesses automate repetitive work—workflows, integrations and intelligent
                processes,{' '}
                <br className={'lg:block md:block hidden'}/>so teams move faster and focus on what matters.
            </>
        }
        eyebrow={<>Less busywork, <br className={'lg:block md:block hidden'}/>more impact</>}
        introHeading="Business Process Automation"
        introBody={[
            <>
                Every business carries hidden costs in manual, repetitive tasks. At Grey InfoTech we
                identify those bottlenecks and replace them with reliable automation—connecting your tools,
                streamlining approvals and removing the friction that slows teams down. The result is fewer
                errors, faster turnaround and people freed to do higher-value work.
            </>,
            <>
                We build automation that fits how you actually work. From workflow engines and integration
                pipelines to AI-assisted document processing and scheduled jobs, we design systems that are
                observable, maintainable and easy to evolve. Automation should reduce risk, not add it—so we
                bake in logging, error handling and human-in-the-loop controls where they matter.
            </>,
        ]}
        solutionsHeading="Our Automation Solutions"
        solutions={[
            {
                id: '01', title: 'Workflow Automation', target: 'WA',
                tags: ['Approvals', 'Triggers', 'Rules'],
                body: <>We automate multi-step business workflows—approvals, handoffs and notifications—using
                    rules-based engines that cut delays and eliminate manual coordination.</>,
            },
            {
                id: '02', title: 'System Integrations', target: 'SI',
                tags: ['APIs', 'Webhooks', 'Sync'],
                body: <>We connect your CRM, ERP, finance and marketing tools so data flows automatically—no
                    more copy-paste between systems or out-of-sync records.</>,
            },
            {
                id: '03', title: 'Intelligent Document Processing', target: 'DP',
                tags: ['OCR', 'AI', 'Extraction'],
                body: <>We automate document-heavy processes with OCR and AI extraction—invoices, forms and
                    contracts processed in seconds with validation and exception handling.</>,
            },
            {
                id: '04', title: 'Scheduled & Batch Jobs', target: 'BJ',
                tags: ['Cron', 'Reports', 'Pipelines'],
                body: <>We build reliable scheduled and batch processes—reporting, data pipelines and
                    housekeeping tasks—that run on time with monitoring and alerting built in.</>,
            },
        ]}
        faqs={[
            {q: 'What processes are good candidates for automation?', a: 'High-volume, rule-based and repetitive tasks—data entry, approvals, reporting and system syncing—deliver the fastest ROI. We assess your workflows and prioritise the highest-impact wins.'},
            {q: 'Can you integrate with the tools we already use?', a: 'Yes. We connect popular CRMs, ERPs and SaaS tools via APIs and webhooks, and build custom integrations where standard connectors fall short.'},
            {q: 'Is automation reliable and safe?', a: 'We build in logging, error handling and human-in-the-loop controls so automation is observable, auditable and safe to trust with critical processes.'},
        ]}
        testimonials={[
            {name: 'Ngozi Eze', title: 'Operations Director, FinServe', message: <>Grey InfoTech automated our approval workflows and invoice processing. We cut turnaround time by more than half and eliminated manual errors.</>},
            {name: 'David Okonkwo', title: 'CTO, RetailPlus', message: <>Their integration work synced our systems perfectly. Data flows automatically now—our team stopped wasting hours on manual exports.</>},
        ]}
    />
);

export default Automation;
