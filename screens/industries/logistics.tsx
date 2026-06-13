import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Logistics = () => (
    <ServicePageTemplate
        title={<>Logistics Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-optimisation.jpg']}
        intro={
            <>
                Moving goods smarter—fleet and route optimisation, real-time tracking, warehouse and supply-chain
                systems that cut cost and deliver on time, every time.
            </>
        }
        eyebrow={<>Software that keeps <br className={'lg:block md:block hidden'}/>your supply chain moving</>}
        introHeading={<>Logistics & Supply Chain <br className={'lg:block md:block hidden'}/>How We Optimise It</>}
        introBody={[
            <>
                Logistics is a business of margins, timing and visibility—and software is what turns chaos into
                coordination. Grey InfoTech builds the systems that move goods efficiently: transportation
                management, fleet and route optimisation, real-time shipment tracking, warehouse management and
                supply-chain platforms that give you control end to end. We connect dispatchers, drivers,
                warehouse teams and customers in one coordinated flow, automating the manual work that creates
                delays and errors. Whether you run a courier service, a freight operation, a distribution
                network, or an e-commerce fulfilment chain, we build software that cuts cost, speeds delivery and
                keeps every stakeholder informed.
            </>,
            <>
                Visibility and optimisation are where logistics software earns its keep. We engineer real-time
                tracking so you and your customers always know where a shipment is, route-optimisation that
                reduces fuel and time, and analytics that expose inefficiencies across the chain. We integrate
                with carriers, GPS, telematics, ERPs and e-commerce platforms so data flows without manual
                re-entry, and we architect for the scale and reliability logistics demands—because downtime
                means missed deliveries. The result is a connected, data-driven operation that runs leaner,
                delivers faster, and adapts as your network grows.
            </>,
        ]}
        solutionsHeading={<>Logistics <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From fleet and route optimisation to warehouse and supply-chain systems, Grey InfoTech delivers
                logistics software that performs. Based in Nigeria and serving clients globally, we build
                connected, data-driven platforms that cut cost and deliver on time.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Transportation Management (TMS)', target: 'TM',
                tags: ['Dispatch', 'Orders', 'Carriers'],
                body: <>We build transportation management systems that handle order intake, dispatch, carrier
                    selection and documentation—coordinating shipments end to end and replacing spreadsheets and
                    phone calls with one streamlined platform.</>,
            },
            {
                id: '02', title: 'Fleet & Route Optimisation', target: 'FR',
                tags: ['Routing', 'Telematics', 'Fuel', 'Maintenance'],
                body: <>We engineer route-optimisation and fleet management—reducing distance, fuel and time while
                    tracking vehicle health and driver activity. Smarter routing means more deliveries per shift
                    and lower operating cost.</>,
            },
            {
                id: '03', title: 'Real-Time Tracking & Visibility', target: 'RT',
                tags: ['GPS', 'Live ETA', 'Notifications'],
                body: <>We deliver real-time shipment tracking with GPS, live ETAs and proactive notifications, so
                    you, your team and your customers always know where goods are—turning visibility into trust
                    and fewer support calls.</>,
            },
            {
                id: '04', title: 'Warehouse Management (WMS)', target: 'WM',
                tags: ['Inventory', 'Picking', 'Barcode'],
                body: <>We build warehouse management systems that optimise inventory, picking, packing and
                    stock accuracy—with barcode and scanning workflows—so fulfilment is fast, accurate and fully
                    visible from receipt to dispatch.</>,
            },
            {
                id: '05', title: 'Supply-Chain Platforms', target: 'SC',
                tags: ['End-to-End', 'Suppliers', 'Forecasting'],
                body: <>We develop supply-chain platforms that connect suppliers, inventory, transport and
                    demand—with forecasting and analytics—giving you end-to-end control and the insight to plan
                    ahead rather than react.</>,
            },
            {
                id: '06', title: 'Integrations & Analytics', target: 'IA',
                tags: ['Carriers', 'ERP', 'E-commerce', 'Insights'],
                body: <>We integrate with carriers, telematics, ERPs and e-commerce platforms so data flows
                    seamlessly, and add analytics that expose inefficiencies and cost—helping you continuously
                    optimise the whole operation.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Visibility End to End', image: '/assets/services/Development.jpg',
                description: <>Real-time tracking across the chain means no more blind spots—you and your
                    customers always know where every shipment stands.</>,
            },
            {
                id: 2, title: 'Optimisation That Pays', image: '/assets/services/digital-transformatio.jpg',
                description: <>Smarter routing, fuller loads and leaner warehouses cut real cost. We engineer the
                    optimisation that improves your margins shipment by shipment.</>,
            },
            {
                id: 3, title: 'Connected Operations', image: '/assets/services/services.jpg',
                description: <>Carriers, telematics, ERPs and e-commerce all integrated, so data flows without
                    manual re-entry and your whole operation works as one.</>,
            },
            {
                id: 4, title: 'Reliable at Scale', image: '/assets/services/digital-optimisation.jpg',
                description: <>Logistics can&apos;t afford downtime. We build resilient, scalable systems that keep
                    delivering as your network and volumes grow.</>,
            },
        ]}
        ctaHeading={<>Move goods <br className={'lg:block md:block hidden'}/>smarter</>}
        ctaBody={<>From fleet and route optimisation to real-time tracking and warehouse systems, Grey InfoTech
            builds logistics software that cuts cost and delivers on time. Let&apos;s bring visibility and efficiency
            to your supply chain.</>}
        faqs={[
            {q: 'What logistics software do you build?', a: 'Transportation management systems, fleet and route optimisation, real-time tracking, warehouse management systems, supply-chain platforms, and driver and customer apps—for couriers, freight, distribution and e-commerce fulfilment.'},
            {q: 'Can you provide real-time shipment tracking?', a: 'Yes. We integrate GPS and telematics to deliver live location, ETAs and proactive notifications, giving full visibility to your team and your customers and reducing support enquiries.'},
            {q: 'How does route optimisation reduce cost?', a: 'By minimising distance and time, balancing loads and accounting for constraints, optimised routing increases deliveries per shift and cuts fuel and labour cost—savings that compound across your fleet.'},
            {q: 'Can you integrate with our carriers and ERP?', a: 'Absolutely. We integrate with carriers, telematics devices, ERPs and e-commerce platforms so data flows automatically across your operation without manual re-entry.'},
            {q: 'Do you build warehouse management features?', a: 'Yes. We build WMS capabilities—inventory, picking, packing, barcode/scanning workflows and stock accuracy—so fulfilment is fast, accurate and fully visible.'},
            {q: 'Will the system scale with our network?', a: 'Yes. We architect resilient, scalable platforms that keep performing as your volumes, fleet and geographic coverage grow, because logistics cannot tolerate downtime.'},
        ]}
        testimonials={[
            {name: 'Emeka Obi', title: 'Operations Head, SwiftHaul', message: <>Grey InfoTech built our TMS and route optimisation, and our fuel costs dropped while deliveries per day went up. Real-time tracking ended the constant where-is-my-shipment calls.</>},
            {name: 'Lerato Dube', title: 'CEO, CargoLink', message: <>Their warehouse and supply-chain platform gave us visibility we never had. Stock accuracy improved dramatically and fulfilment is far faster.</>},
            {name: 'Ahmed Bello', title: 'Logistics Manager, FreightPro', message: <>They integrated all our carriers and telematics into one dashboard. Our dispatchers finally have everything in one place, and it scales with our growth.</>},
        ]}
    />
);

export default Logistics;
