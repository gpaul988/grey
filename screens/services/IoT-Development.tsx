import React from 'react';


import ServicePageTemplate from '@/components/ServicePageTemplate';

const IoTDevelopment = () => (
    <ServicePageTemplate
        title={<>IoT Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/product-design.jpg"
        topImages={['/assets/services/ecommerce-web-design.jpg', '/assets/services/digital-optimisation.jpg']}
        intro={
            <>
                Connected products, end to end—firmware, secure connectivity, cloud platforms and real-time
                dashboards that turn devices and sensor data into actionable intelligence.
            </>
        }
        eyebrow={<>Connecting devices, <br className={'lg:block md:block hidden'}/>data and decisions</>}
        introHeading={<>The Internet of Things <br className={'lg:block md:block hidden'}/>Engineered End to End</>}
        introBody={[
            <>
                The Internet of Things turns physical products into intelligent, connected systems—but delivering
                IoT well demands expertise across firmware, connectivity, cloud and analytics, all working as one.
                Grey InfoTech builds complete IoT solutions: we engineer the embedded firmware on the device,
                the secure protocols that move data, the cloud platform that ingests and processes it at scale,
                and the dashboards and mobile apps that put insight in front of the people who act on it. Whether
                you are launching a smart consumer product, instrumenting a factory floor, or building a fleet of
                connected assets, we make the complexity disappear behind a reliable, secure experience.
            </>,
            <>
                Security and reliability sit at the heart of everything we ship. IoT systems are only as strong as
                their weakest link, so we design for secure provisioning, encrypted transport, over-the-air
                updates and device identity from day one. We work with MQTT, CoAP and HTTPS, and integrate with
                AWS IoT, Azure IoT Hub and Google Cloud IoT, applying edge computing where latency or bandwidth
                demands it. The result is a connected product that stays online, stays protected, and turns raw
                telemetry into the real-time intelligence that drives efficiency, new revenue and better
                decisions.
            </>,
        ]}
        solutionsHeading={<>IoT <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From embedded firmware to cloud platforms and analytics, Grey InfoTech delivers the full IoT
                stack. Based in Nigeria and serving clients globally, we build secure, scalable connected
                products that bridge hardware and software—turning devices and sensor data into measurable
                business value.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Embedded Firmware & Devices', target: 'EF',
                tags: ['C/C++', 'RTOS', 'Microcontrollers', 'Sensors'],
                body: <>We develop reliable embedded firmware for microcontrollers and edge devices—integrating
                    sensors, actuators and radios with efficient, low-power C/C++ and RTOS code. We handle secure
                    boot, device provisioning and over-the-air updates so your fleet stays maintainable in the
                    field long after deployment.</>,
            },
            {
                id: '02', title: 'Connectivity & Protocols', target: 'CN',
                tags: ['MQTT', 'CoAP', 'BLE', 'LoRaWAN'],
                body: <>We implement the right connectivity for your use case—MQTT, CoAP and HTTPS over Wi-Fi,
                    cellular, BLE or LoRaWAN—with encrypted transport and resilient reconnection. Devices stay
                    connected reliably even across unstable networks, and data flows securely to the cloud.</>,
            },
            {
                id: '03', title: 'Cloud IoT Platforms', target: 'CP',
                tags: ['AWS IoT', 'Azure IoT', 'Ingestion', 'Scale'],
                body: <>We build cloud back-ends that ingest, store and process millions of device messages,
                    using AWS IoT, Azure IoT Hub or Google Cloud. We design for horizontal scale, device
                    management, command-and-control and secure APIs, so your platform grows smoothly from one
                    device to an entire fleet.</>,
            },
            {
                id: '04', title: 'Real-Time Dashboards & Apps', target: 'DA',
                tags: ['Telemetry', 'Alerts', 'Mobile', 'Web'],
                body: <>We create web and mobile dashboards that visualise live telemetry, trigger alerts, and let
                    users monitor and control devices remotely. Clear, real-time interfaces turn raw data streams
                    into the insight your operators and customers need to act fast.</>,
            },
            {
                id: '05', title: 'Edge Computing & Analytics', target: 'EC',
                tags: ['Edge AI', 'Filtering', 'Predictive'],
                body: <>When latency, bandwidth or privacy matter, we push processing to the edge—filtering,
                    aggregating and even running ML inference on-device. Combined with cloud analytics, this
                    enables predictive maintenance, anomaly detection and smarter automation across your fleet.</>,
            },
            {
                id: '06', title: 'Security & Lifecycle Management', target: 'SL',
                tags: ['Device Identity', 'OTA', 'Encryption', 'Monitoring'],
                body: <>We secure the whole system—unique device identity, encrypted communication, signed OTA
                    updates and continuous monitoring—and manage the device lifecycle from provisioning to
                    decommissioning. Your connected products stay protected, compliant and up to date.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Full-Stack IoT Expertise', image: '/assets/services/Development.jpg',
                description: <>Firmware, connectivity, cloud and analytics from one team. No finger-pointing
                    between hardware and software vendors—we own the entire connected experience.</>,
            },
            {
                id: 2, title: 'Security by Design', image: '/assets/services/digital-transformatio.jpg',
                description: <>Device identity, encrypted transport and signed OTA updates are built in from day
                    one, not bolted on later—because an insecure IoT device is a liability, not an asset.</>,
            },
            {
                id: 3, title: 'Built to Scale', image: '/assets/services/services.jpg',
                description: <>From a single prototype to a fleet of millions, our cloud architectures ingest and
                    process telemetry without breaking a sweat as your deployment grows.</>,
            },
            {
                id: 4, title: 'Data into Decisions', image: '/assets/services/digital-optimisation.jpg',
                description: <>Real-time dashboards, alerts and predictive analytics turn raw sensor streams into
                    the insight that cuts cost, prevents downtime and unlocks new revenue.</>,
            },
        ]}
        ctaHeading={<>Bring your devices <br className={'lg:block md:block hidden'}/>online</>}
        ctaBody={<>From firmware to cloud dashboards, Grey InfoTech builds secure, scalable IoT systems that turn
            connected devices into actionable intelligence. Let&apos;s engineer a connected product your customers
            and operators can rely on.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Devices Connected', value: 50, suffix: 'K+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Chidi Anyaoku', title: 'Operations Director, AgroSense', message: <>Grey InfoTech built our agricultural sensor platform end to end—firmware, connectivity and dashboards. We now monitor soil and climate data across hundreds of farms in real time.</>},
            {name: 'Lerato Molefe', title: 'CTO, SmartMeter Africa', message: <>Their security-first approach to OTA updates and device identity gave us total confidence rolling out tens of thousands of connected meters. Rock-solid and scalable.</>},
            {name: 'Emeka Nwosu', title: 'Plant Manager, FabriX Industries', message: <>The predictive-maintenance system they built cut our unplanned downtime dramatically. Edge analytics flag issues before they become failures. Genuinely transformative.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Industrial IoT & Manufacturing',
                description: 'Connect production equipment and facilities with sensor networks for real-time monitoring, predictive maintenance and process optimization.'
            },
            {
                id: 'vs2',
                title: 'Smart Home & Consumer Devices',
                description: 'Build connected consumer devices with reliable cloud backends, mobile apps, OTA updates and secure device management at scale.'
            },
            {
                id: 'vs3',
                title: 'Asset Tracking & Logistics',
                description: 'Deploy GPS and RFID tracking solutions for real-time visibility into asset location, condition and chain-of-custody across supply chains.'
            }
        ]}/>
);

export default IoTDevelopment;
