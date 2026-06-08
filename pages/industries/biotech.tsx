import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Biotech = () => (
    <ServicePageTemplate
        title={<>Biotech Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/Research-strategy.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro={
            <>
                Accelerating science with software—LIMS, research data platforms, bioinformatics and compliant
                systems that turn complex biological data into discovery.
            </>
        }
        eyebrow={<>Software that <br className={'lg:block md:block hidden'}/>accelerates discovery</>}
        introHeading={<>Biotech Innovation <br className={'lg:block md:block hidden'}/>Powered by Software</>}
        introBody={[
            <>
                Modern biotechnology runs on data—genomic sequences, assay results, clinical samples, instrument
                readouts and research records that must be captured, managed and analysed with absolute rigour.
                Grey InfoTech builds the software that makes that possible. We develop laboratory information
                management systems (LIMS), research data platforms, sample-tracking tools and bioinformatics
                pipelines that bring order to complex scientific data, accelerate workflows and free researchers
                to focus on the science. Whether you are a research lab, a diagnostics company, or a
                biotech startup, we engineer systems that are precise, traceable and built around how scientists
                actually work.
            </>,
            <>
                In life sciences, compliance and data integrity are non-negotiable. We design systems with
                auditability, access control, validation and traceability at their core, mindful of standards
                such as GxP, HIPAA and data-protection regulations that govern sensitive health and research
                data. We integrate with laboratory instruments and existing scientific tools, build secure cloud
                platforms that scale with growing datasets, and apply analytics and machine learning to surface
                insight from complex biological information. The result is software you can trust with your most
                valuable data—and that helps you reach discovery faster.
            </>,
        ]}
        solutionsHeading={<>Biotech <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From LIMS and bioinformatics to compliant research platforms, Grey InfoTech builds software for
                life sciences. Based in Nigeria and serving clients globally, we engineer precise, traceable and
                secure systems that turn complex biological data into discovery.
            </>
        }
        solutions={[
            {
                id: '01', title: 'LIMS & Lab Software', target: 'LM',
                tags: ['Sample Tracking', 'Workflows', 'Instruments'],
                body: <>We build laboratory information management systems that track samples, manage workflows,
                    capture results and integrate with instruments—bringing precision and full traceability to
                    lab operations, from intake to reporting.</>,
            },
            {
                id: '02', title: 'Research Data Platforms', target: 'RD',
                tags: ['Data Capture', 'ELN', 'Collaboration'],
                body: <>We develop research data platforms and electronic lab notebooks that centralise
                    experimental data, support collaboration, and preserve a complete, auditable record of the
                    science—so knowledge is never lost and results are always reproducible.</>,
            },
            {
                id: '03', title: 'Bioinformatics Pipelines', target: 'BP',
                tags: ['Genomics', 'Pipelines', 'Visualisation'],
                body: <>We build and automate bioinformatics pipelines—processing genomic and other high-volume
                    biological data at scale—with reliable orchestration and clear visualisation that turns raw
                    sequence data into interpretable, actionable results.</>,
            },
            {
                id: '04', title: 'Compliance & Data Integrity', target: 'CD',
                tags: ['GxP', 'Audit Trails', 'Validation'],
                body: <>We engineer systems with the auditability, access control, validation and traceability
                    that regulated life sciences demand—mindful of GxP, HIPAA and data-protection requirements—so
                    your data and processes stand up to scrutiny.</>,
            },
            {
                id: '05', title: 'Analytics & AI for Life Sciences', target: 'AA',
                tags: ['ML', 'Insights', 'Predictive'],
                body: <>We apply analytics and machine learning to complex biological datasets—pattern discovery,
                    classification and prediction—surfacing insight that accelerates research and supports better
                    scientific and clinical decisions.</>,
            },
            {
                id: '06', title: 'Integration & Secure Cloud', target: 'IC',
                tags: ['Instruments', 'Cloud', 'Scale', 'Security'],
                body: <>We integrate with lab instruments and scientific tools and deploy on secure, scalable
                    cloud infrastructure built for growing datasets—keeping sensitive research and health data
                    protected, available and performant.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Built for Scientific Rigour', image: '/assets/services/Research-strategy.jpg',
                description: <>Precision, traceability and reproducibility are designed in. We build software that
                    scientists and auditors can trust with critical data.</>,
            },
            {
                id: 2, title: 'Compliance-Aware Engineering', image: '/assets/services/digital-transformatio.jpg',
                description: <>We design with GxP, HIPAA and data-protection requirements in mind—audit trails,
                    validation and access control as first-class concerns, not afterthoughts.</>,
            },
            {
                id: 3, title: 'Handles Complex Data at Scale', image: '/assets/services/Development.jpg',
                description: <>Genomic and high-volume biological data needs robust pipelines and scalable cloud.
                    We engineer systems that stay fast as datasets grow.</>,
            },
            {
                id: 4, title: 'Insight from Information', image: '/assets/services/digital-optimisation.jpg',
                description: <>Analytics and ML turn raw biological data into discovery—patterns, predictions and
                    insight that move research forward.</>,
            },
        ]}
        ctaHeading={<>Accelerate your <br className={'lg:block md:block hidden'}/>science</>}
        ctaBody={<>From LIMS and research platforms to bioinformatics and compliant data systems, Grey InfoTech
            builds software for life sciences. Let&apos;s engineer tools that bring rigour, scale and insight to your
            research.</>}
        faqs={[
            {q: 'What biotech and life-science software do you build?', a: 'LIMS and lab software, electronic lab notebooks, research data platforms, sample-tracking systems, bioinformatics pipelines, and compliant cloud platforms for managing and analysing biological and clinical data.'},
            {q: 'Do you understand regulatory compliance?', a: 'Yes. We engineer with data integrity, auditability, validation and access control as core requirements, mindful of standards like GxP and HIPAA and relevant data-protection regulations. We work closely with your quality and compliance teams.'},
            {q: 'Can you handle large genomic or research datasets?', a: 'Absolutely. We build automated bioinformatics pipelines and scalable cloud infrastructure designed to process high-volume biological data reliably and visualise results clearly.'},
            {q: 'Can your software integrate with lab instruments?', a: 'Yes. We integrate with laboratory instruments and existing scientific tools so results flow automatically into your systems with full traceability, reducing manual transcription and error.'},
            {q: 'How do you protect sensitive data?', a: 'Through encryption, strict access control, audit logging and secure cloud architecture, with attention to the privacy regulations governing health and research data, so your most sensitive information stays protected.'},
            {q: 'Can you apply AI to our research data?', a: 'Yes. We use analytics and machine learning for pattern discovery, classification and prediction on complex datasets, surfacing insight that accelerates research while keeping results interpretable and trustworthy.'},
        ]}
        testimonials={[
            {name: 'Dr. Ada Nwankwo', title: 'Lab Director, GenomeCare', message: <>Grey InfoTech built our LIMS with full sample traceability and instrument integration. Our throughput rose and audits became painless. They understood the science.</>},
            {name: 'Dr. Kwame Asante', title: 'Head of Research, BioSphere Labs', message: <>Their bioinformatics pipeline processes our sequencing data reliably and at scale. What used to take days of manual work now runs automatically.</>},
            {name: 'Dr. Halima Yusuf', title: 'CSO, ClariDiagnostics', message: <>They engineered a compliant research platform we trust with sensitive clinical data. Auditable, secure and genuinely built for how our scientists work.</>},
        ]}
    />
);

export default Biotech;
