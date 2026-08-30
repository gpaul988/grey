import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Maritime = () => (
    <ServicePageTemplate
        title={<>Maritime &amp; Shipping<br className="lg:block md:block hidden"/>Technology</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/maritime-hero.jpg"
        topImages={["/assets/services/Development.jpg", "/assets/services/digital-optimisation.jpg"]}
        intro={
            <>
                Digital transformation for maritime operators: port-call optimisation, autonomous vessel telemetry, cargo chain visibility and secure maritime IoT.
            </>
        }
        eyebrow={<>Future-ready maritime<br className="lg:block md:block hidden"/>software</>}
        introHeading={<>Maritime Technology<br className="lg:block md:block hidden"/>and Innovation</>}
        introBody={[
            <>
                The maritime sector is entering a new era of automation, digital-first operations and data-driven decision making. Graham Sobiribo Paul builds the software backbone for modern shipping and maritime logistics: voyage optimisation, predictive maintenance for fleets, AIS and sensor aggregation, and secure gateways for satellite and terrestrial telemetry. Our platforms improve berth utilisation, reduce fuel consumption and provide live cargo visibility across multimodal legs.
            </>,
            <>
                We design hardened, low-bandwidth systems that operate reliably at sea and in port -offline-first dashboards, secure sync, and edge analytics that process sensor data locally before sending summaries to cloud decision platforms. Coupled with ML-driven ETA and demand forecasting, our solutions cut waiting times and demurrage costs while improving environmental performance through smarter routing and hybrid propulsion management.
            </>,
        ]}
        solutionsHeading={<>Maritime<br className="lg:block md:block hidden"/>Software<br className="lg:block md:block hidden"/>Solutions</>}
        solutionsIntro={<>Port calls, fleet operations and cargo visibility -engineered for reliability and regulatory compliance.</>}
        solutions={[
            {
                id: '01', title: 'Fleet Telemetry & Predictive Maintenance', target: 'FT',
                tags: ['IoT', 'Predictive Maintenance', 'Telematics'],
                body: <>Aggregate onboard sensors, run anomaly detection at the edge and schedule maintenance before failures occur -reducing downtime and repair costs.</>,
            },
            {
                id: '02', title: 'Voyage Optimisation & Emissions Management', target: 'VE',
                tags: ['Routing', 'Fuel Efficiency', 'Emissions'],
                body: <>Route optimisation combining weather, currents and fuel models to minimise consumption and emissions, with transparent reporting for compliance and sustainability targets.</>,
            },
            {
                id: '03', title: 'Cargo Chain Visibility', target: 'CV',
                tags: ['Tracking', 'Multimodal', 'ETAs'],
                body: <>End-to-end cargo tracking from port to final mile -integrating manifests, carrier feeds and IoT telemetry to provide trusted ETAs and exception alerts.</>,
            },
            {
                id: '04', title: 'Port Call & Berth Optimisation', target: 'PB',
                tags: ['Berth', 'Scheduling', 'AIS'],
                body: <>Optimise port call schedules, berth allocation and tug/pilot coordination to reduce berth occupancy time and increase throughput across terminals.</>,
            },
            {
                id: '05', title: 'Regulatory Compliance & Reporting', target: 'RC',
                tags: ['IMO', 'ISPS', 'Reporting'],
                body: <>Automated regulatory reporting, secure record keeping and audit trails designed to meet IMO, ISPS and local authority requirements.</>,
            },
        ]}
        reasons={[
            {id:1, title: 'Built for Harsh Environments', image: '/assets/services/Development.jpg', description: <>Edge-first, low-bandwidth designs that keep operations running when connectivity is intermittent.</>},
            {id:2, title: 'Reduced Operating Cost', image: '/assets/services/digital-transformatio.jpg', description: <>Predictive maintenance and route optimisation lower fuel and repair bills while increasing utilisation.</>},
            {id:3, title: 'Sustainability & Compliance', image: '/assets/services/services.jpg', description: <>Transparent emissions reporting and optimisation tools that support environmental goals and regulatory obligations.</>},
            {id:4, title: 'Secure By Design', image: '/assets/services/digital-optimisation.jpg', description: <>Cryptographic device identities, secure gateways and hardened data lakes protect commercial telemetry and manifests.</>},
        ]}
        ctaHeading={<>Modernise maritime<br className="lg:block md:block hidden"/>operations</>}
        ctaBody={<>Transform fleet, cargo and port operations with secure, data-driven platforms built to operate at sea and ashore.</>}
    />
);

export default Maritime;
