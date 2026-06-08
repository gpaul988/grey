import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const OnDemand = () => (
    <ServicePageTemplate
        title="On-Demand Solutions"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/services.jpg"
        intro={
            <>
                We build on-demand platforms that connect users to services in real time—delivery,
                ride-hailing, home services and marketplaces,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for speed, scale and reliability.
            </>
        }
        eyebrow={<>Service at the <br className={'lg:block md:block hidden'}/>tap of a button</>}
        introHeading="On-Demand Platform Engineering"
        introBody={[
            <>
                The on-demand economy runs on convenience and trust. At Grey InfoTech we build platforms
                that match supply and demand instantly—whether that&apos;s riders and drivers, customers and
                couriers, or clients and service providers. We obsess over the details that make on-demand
                feel effortless: live tracking, smart dispatch, seamless payments and notifications that
                keep everyone in sync.
            </>,
            <>
                Under the hood, on-demand is a hard real-time problem. We design geolocation services,
                matching algorithms, surge logic and resilient payment flows that hold up under peak load.
                Our multi-sided apps—customer, provider and admin—share one robust backend, giving you full
                visibility and control as your marketplace scales across cities and categories.
            </>,
        ]}
        solutionsHeading="Our On-Demand Solutions"
        solutions={[
            {
                id: '01', title: 'Delivery & Logistics Apps', target: 'DL',
                tags: ['Tracking', 'Dispatch', 'Routing'],
                body: <>We build delivery platforms with real-time order tracking, intelligent dispatch and
                    route optimisation—connecting customers, merchants and couriers in one smooth flow.</>,
            },
            {
                id: '02', title: 'Ride-Hailing & Mobility', target: 'RH',
                tags: ['Geolocation', 'Matching', 'Live ETA'],
                body: <>We develop ride and mobility apps with live driver matching, geofencing, fare
                    calculation and accurate ETAs—delivering the responsive experience riders expect.</>,
            },
            {
                id: '03', title: 'Home & Field Services', target: 'HS',
                tags: ['Booking', 'Scheduling', 'Reviews'],
                body: <>We create service-marketplace platforms for home and field services—booking,
                    scheduling, provider verification and reviews—so customers find trusted help fast.</>,
            },
            {
                id: '04', title: 'Multi-Sided Marketplaces', target: 'MM',
                tags: ['Payments', 'Admin', 'Analytics'],
                body: <>We build marketplaces with secure split payments, provider onboarding, commission
                    handling and powerful admin dashboards for full operational control.</>,
            },
        ]}
        faqs={[
            {q: 'Can you build real-time tracking?', a: 'Yes. Live location tracking, ETAs and notifications are core to every on-demand platform we build, powered by reliable geolocation and real-time infrastructure.'},
            {q: 'Do you handle payments and payouts?', a: 'Absolutely. We integrate secure payment gateways with split payments, commissions and automated provider payouts.'},
            {q: 'Can the platform scale across multiple cities?', a: 'Yes. We architect for multi-region scale from the start, so you can expand to new cities and service categories without re-engineering.'},
        ]}
        testimonials={[
            {name: 'Tunde Adebayo', title: 'CEO, SwiftDrop', message: <>Grey InfoTech delivered our delivery app with live tracking and smart dispatch. Order times dropped and our couriers love the workflow.</>},
            {name: 'Grace Mwangi', title: 'Founder, HomeFix', message: <>They built our home-services marketplace end to end. Booking is seamless and the admin tools give us total visibility.</>},
        ]}
    />
);

export default OnDemand;
