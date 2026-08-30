import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Port = () => (
    <ServicePageTemplate
        title={<>Ports &amp; Terminals<br className="lg:block md:block hidden"/>Technology</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/port-operations.jpg"
        topImages={["/assets/services/terminal.jpg", "/assets/services/digital-optimisation.jpg"]}
        intro={
            <>
                Digitally optimised port operations: terminal orchestration, quay automation, gate systems and cargo release workflows.
            </>
        }
        eyebrow={<>Next-gen port<br className="lg:block md:block hidden"/>management systems</>}
        introHeading={<>Port Digitalisation<br className="lg:block md:block hidden"/>and Operational Excellence</>}
        introBody={[
            <>
                Ports are the linchpin of global trade. Graham Sobiribo Paul designs terminal operating systems and orchestration platforms that synchronise cranes, yard planning, hinterland movements and customs workflows. Our solutions reduce dwell time, speed cargo handover and automate repetitive manual tasks that introduce delays.
            </>,
            <>
                With real-time telemetry, predictive yard planning and AI-assisted gate processing, terminals can achieve higher throughput with the same footprint. Integrations with carriers, customs and inland logistics allow automated clearance and prioritisation of high-value cargo, while digital twins enable operational simulation and continuous improvement.
            </>,
        ]}
        solutionsHeading={<>Port<br className="lg:block md:block hidden"/>Management<br className="lg:block md:block hidden"/>Solutions</>}
        solutionsIntro={<>Terminal orchestration, yard optimisation and secure cargo release systems designed for throughput and compliance.</>}
        solutions={[
            {
                id: '01', title: 'Terminal Operating System (TOS)', target: 'TOS',
                tags: ['Yard', 'Crane', 'Scheduling'],
                body: <>A modern TOS that handles vessel stowage, yard planning, yard equipment scheduling and resource allocation -optimising throughput and minimising conflicts.</>,
            },
            {
                id: '02', title: 'Quay & Crane Automation', target: 'QC',
                tags: ['Automation', 'Cranes', 'Sensors'],
                body: <>Integrate crane telemetry and automation to speed container moves, reduce manual handoffs and capture precise movement data for analytics.</>,
            },
            {
                id: '03', title: 'Gate & Customs Integration', target: 'GC',
                tags: ['Gate', 'Customs', 'e-Release'],
                body: <>Automated gate processing with OCR, RFID and customs e-clearance integration to reduce truck turnaround times and paperwork bottlenecks.</>,
            },
            {
                id: '04', title: 'Yard Optimisation & Digital Twin', target: 'YD',
                tags: ['Simulation', 'AI', 'Planning'],
                body: <>AI-backed yard planning and digital twins for scenario simulation -improving stacking strategies and equipment utilisation under peak demand.</>,
            },
            {
                id: '05', title: 'Secure Cargo Release', target: 'CR',
                tags: ['Blockchain', 'e-Docs', 'Authentication'],
                body: <>Secure, auditable cargo release workflows that combine cryptographic signatures, e-document exchange and multi-party approval to prevent fraud and speed handover.</>,
            },
        ]}
        reasons={[
            {id:1, title: 'Higher Throughput', image: '/assets/services/Development.jpg', description: <>Optimised scheduling and automation reduce berth occupancy and truck turnaround times.</>},
            {id:2, title: 'Lower Operating Cost', image: '/assets/services/digital-transformatio.jpg', description: <>Reduced manual processing and better yard planning lower labour and equipment idle time costs.</>},
            {id:3, title: 'Improved Compliance', image: '/assets/services/services.jpg', description: <>Integrated customs, documentation and secure cargo release reduce clearance delays and compliance risk.</>},
            {id:4, title: 'Data-Driven Decisions', image: '/assets/services/digital-optimisation.jpg', description: <>Operational analytics and digital twins enable continuous optimisation and investment prioritisation.</>},
        ]}
        ctaHeading={<>Optimise terminal<br className="lg:block md:block hidden"/>operations</>}
        ctaBody={<>Increase throughput, reduce dwell time and modernise your terminal with secure, automated systems built for global trade.</>}
    />
);

export default Port;
