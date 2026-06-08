import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const IoTDevelopment = () => (
    <ServicePageTemplate
        title="IoT Development"
        heroImage="/assets/services/digital-transformatio.jpg"
        midImage="/assets/services/services.jpg"
        intro={
            <>
                We design and build end-to-end Internet of Things solutions—connecting devices, edge gateways
                and the cloud into secure, data-rich systems{' '}
                <br className={'lg:block md:block hidden'}/>that automate operations and unlock new
                intelligence for your business.
            </>
        }
        eyebrow={<>Connected devices, <br className={'lg:block md:block hidden'}/>real-time intelligence</>}
        introHeading="IoT Engineering"
        introBody={[
            <>
                The Internet of Things turns physical assets into living data sources—but the value lies in
                getting the whole stack right. At Grey InfoTech we engineer complete IoT systems: firmware on
                the device, secure connectivity through the gateway, scalable ingestion in the cloud, and
                dashboards that turn raw telemetry into decisions. We help businesses monitor equipment,
                automate processes and reduce downtime across industrial, commercial and consumer settings.
            </>,
            <>
                Security and scale are central to everything we build. We implement encrypted communication,
                device identity and over-the-air updates, and design cloud back-ends—on AWS IoT, Azure IoT or
                custom infrastructure—that handle millions of messages reliably. From proof of concept to
                fleet-wide deployment, we deliver IoT solutions that are robust, observable and ready to grow.
            </>,
        ]}
        solutionsHeading="Our IoT Solutions"
        solutions={[
            {
                id: '01', title: 'Device & Firmware Development', target: 'FW',
                tags: ['Embedded C', 'RTOS', 'Low Power'],
                body: <>We develop reliable firmware for sensors, controllers and edge devices—optimising for power,
                    memory and real-time performance. Our embedded engineers work across microcontrollers and RTOS
                    platforms to deliver hardware that behaves predictably in the field.</>,
            },
            {
                id: '02', title: 'Connectivity & Edge Gateways', target: 'EG',
                tags: ['MQTT', 'BLE', 'LoRaWAN'],
                body: <>We design the connectivity layer—MQTT, BLE, Wi-Fi, cellular and LoRaWAN—and build edge
                    gateways that pre-process data, run local logic and buffer against outages, so your system stays
                    responsive even with intermittent connectivity.</>,
            },
            {
                id: '03', title: 'Cloud Platform & Analytics', target: 'CP',
                tags: ['AWS IoT', 'Azure IoT', 'Dashboards'],
                body: <>We build scalable cloud back-ends that ingest, store and analyse device telemetry, plus
                    real-time dashboards and alerting. Turn streams of sensor data into actionable insight with
                    visualisation, anomaly detection and integration into your existing tools.</>,
            },
            {
                id: '04', title: 'Security & Device Management', target: 'SM',
                tags: ['Encryption', 'OTA Updates', 'Identity'],
                body: <>We secure every layer—device identity, encrypted transport and authenticated APIs—and
                    provide fleet management with remote monitoring and over-the-air updates, so your deployment
                    stays safe and maintainable at scale.</>,
            },
        ]}
        faqs={[
            {q: 'Can you work with our existing hardware?', a: 'Yes. We integrate with off-the-shelf sensors and controllers, or develop custom firmware where needed. We also advise on hardware selection for new deployments.'},
            {q: 'How do you handle IoT security?', a: 'We apply defence-in-depth: encrypted communication, unique device identities, signed firmware, OTA updates and authenticated cloud APIs—aligned with industry best practice.'},
            {q: 'Which cloud platforms do you use?', a: 'Typically AWS IoT or Azure IoT for managed scale, or custom infrastructure when you need full control. We choose based on your scale, budget and integration needs.'},
        ]}
        testimonials={[
            {name: 'Amina Diallo', title: 'Director of Operations, LogiFleet Systems', message: <>Grey InfoTech connected our fleet sensors to a single dashboard with real-time alerts. We&#39;ve cut unplanned downtime dramatically since launch.</>},
            {name: 'Obinna Eze', title: 'CEO, ProTask Hub', message: <>Their end-to-end IoT delivery—from firmware to cloud analytics—was seamless. The platform scales effortlessly as we add more devices.</>},
        ]}
    />
);

export default IoTDevelopment;
