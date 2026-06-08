import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Biotech = () => (
    <ServicePageTemplate
        title="Biotech"
        heroImage="/assets/services/Research-strategy.jpg"
        midImage="/assets/services/Development.jpg"
        intro={
            <>
                We build software for biotech and life sciences—data platforms, lab systems and
                research tools,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for accuracy, compliance and scale.
            </>
        }
        eyebrow={<>Software for <br className={'lg:block md:block hidden'}/>life sciences</>}
        introHeading="Biotech Software Engineering"
        introBody={[
            <>
                Biotech and life-sciences organisations work with complex, high-stakes data. At Grey
                InfoTech we build software that helps research and clinical teams capture, manage and
                analyse that data with confidence—from laboratory information systems to research data
                platforms. We understand that in this field accuracy and traceability are not optional.
            </>,
            <>
                We design systems with compliance and integrity at their core—structured data capture,
                audit trails, access controls and validation built in. Whether you are managing samples,
                tracking experiments, or building tools to visualise genomic or clinical datasets, we
                deliver secure, scalable platforms that stand up to scientific and regulatory scrutiny.
            </>,
        ]}
        solutionsHeading="Our Biotech Solutions"
        solutions={[
            {
                id: '01', title: 'Lab Information Systems', target: 'LI',
                tags: ['LIMS', 'Samples', 'Workflows'],
                body: <>We build laboratory information management systems that track samples, experiments and
                    results with full traceability and structured, validated data capture.</>,
            },
            {
                id: '02', title: 'Research Data Platforms', target: 'RD',
                tags: ['Pipelines', 'Storage', 'Analysis'],
                body: <>We develop platforms to ingest, store and analyse large research datasets—genomic,
                    clinical and experimental—with reliable pipelines and powerful visualisation.</>,
            },
            {
                id: '03', title: 'Clinical & Trial Tools', target: 'CT',
                tags: ['eCRF', 'Audit Trails', 'Compliance'],
                body: <>We create tools for clinical workflows and trials with electronic data capture, audit
                    trails and access controls designed to meet regulatory expectations.</>,
            },
            {
                id: '04', title: 'Data Visualisation & Insights', target: 'DV',
                tags: ['Dashboards', 'Charts', 'Reporting'],
                body: <>We turn complex scientific data into clear dashboards and reports, helping research
                    teams spot patterns and make decisions faster.</>,
            },
        ]}
        faqs={[
            {q: 'Do you understand compliance requirements?', a: 'Yes. We build with data integrity, audit trails and access controls in mind, designing systems that support regulatory and validation requirements common in life sciences.'},
            {q: 'Can you handle large scientific datasets?', a: 'Absolutely. We architect scalable storage and processing pipelines for genomic, clinical and experimental data, with performant analysis and visualisation.'},
            {q: 'Can you integrate with lab instruments and existing systems?', a: 'Yes. We build integrations with instruments, LIMS and existing data sources so information flows reliably across your research environment.'},
        ]}
        testimonials={[
            {name: 'Dr. Funmi Adeyemi', title: 'Lab Director, BioCore Labs', message: <>Grey InfoTech built our sample-tracking system with full traceability. Our workflows are faster and our data integrity has never been stronger.</>},
            {name: 'Daniel Mensah', title: 'Head of Research, GenomeWorks', message: <>Their research data platform handles our large datasets effortlessly. The visualisations help our scientists draw insights quickly.</>},
        ]}
    />
);

export default Biotech;
