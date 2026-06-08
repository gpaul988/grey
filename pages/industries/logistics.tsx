import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Logistics = () => (
    <ServicePageTemplate
        title="Logistics"
        heroImage="/assets/services/digital-optimisation.jpg"
        midImage="/assets/services/services.jpg"
        intro={
            <>
                We build logistics and supply-chain software—fleet management, tracking and warehouse
                systems,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for visibility and efficiency.
            </>
        }
        eyebrow={<>Move goods <br className={'lg:block md:block hidden'}/>smarter and faster</>}
        introHeading="Logistics & Supply Chain Engineering"
        introBody={[
            <>
                Logistics runs on visibility and timing. At Grey InfoTech we build software that gives
                operators real-time control over fleets, shipments and inventory—turning fragmented,
                manual processes into connected, data-driven operations. From first mile to last mile, we
                help you see where everything is and move it more efficiently.
            </>,
            <>
                We design systems for the realities of logistics: route optimisation, live tracking,
                warehouse workflows and integrations with carriers and ERPs. Our platforms reduce delays,
                cut costs and improve delivery reliability—while giving managers the dashboards and alerts
                they need to act fast when things change.
            </>,
        ]}
        solutionsHeading="Our Logistics Solutions"
        solutions={[
            {
                id: '01', title: 'Fleet Management', target: 'FM',
                tags: ['Tracking', 'Maintenance', 'Dispatch'],
                body: <>We build fleet platforms with GPS tracking, maintenance scheduling and dispatch
                    management—keeping vehicles efficient, available and accountable.</>,
            },
            {
                id: '02', title: 'Shipment & Delivery Tracking', target: 'ST',
                tags: ['Live ETA', 'Proof of Delivery', 'Alerts'],
                body: <>We develop tracking systems with live ETAs, proof of delivery and proactive alerts,
                    giving customers and operators full visibility from dispatch to doorstep.</>,
            },
            {
                id: '03', title: 'Warehouse Management', target: 'WM',
                tags: ['Inventory', 'Picking', 'Barcodes'],
                body: <>We create warehouse systems for inventory control, picking and packing workflows and
                    barcode scanning—boosting accuracy and throughput on the floor.</>,
            },
            {
                id: '04', title: 'Route Optimisation', target: 'RO',
                tags: ['Planning', 'Geofencing', 'Cost'],
                body: <>We build route-optimisation engines that plan efficient deliveries, cut fuel and time
                    costs, and adapt to real-world conditions on the road.</>,
            },
        ]}
        faqs={[
            {q: 'Can you provide real-time shipment tracking?', a: 'Yes. Live tracking, ETAs and alerts are core to our logistics platforms, backed by reliable GPS and real-time data infrastructure.'},
            {q: 'Do you integrate with carriers and ERPs?', a: 'Absolutely. We connect with carriers, ERPs and existing systems so orders, inventory and shipments stay in sync across your operation.'},
            {q: 'Can you optimise delivery routes?', a: 'Yes. We build route-optimisation engines that reduce time and fuel costs while improving delivery reliability.'},
        ]}
        testimonials={[
            {name: 'Emeka Nwosu', title: 'Operations Head, CargoLink', message: <>Grey InfoTech gave us real-time visibility across our whole fleet. Delays dropped and our customers finally trust our ETAs.</>},
            {name: 'Fatima Sani', title: 'CEO, WareFlow', message: <>Their warehouse system transformed our floor operations—faster picking, fewer errors, and inventory we can actually trust.</>},
        ]}
    />
);

export default Logistics;
