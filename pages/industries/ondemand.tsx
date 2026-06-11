import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Ondemand = () => (
    <ServicePageTemplate
        title={<>On-Demand Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/product-design.jpg']}
        intro={
            <>
                Delivering convenience at the tap of a button—real-time marketplaces, booking, dispatch and
                payments that connect customers, providers and services instantly.
            </>
        }
        eyebrow={<>On-demand platforms <br className={'lg:block md:block hidden'}/>that move at your
            customers&apos; pace</>}
        introHeading={<>The On-Demand Economy <br className={'lg:block md:block hidden'}/>How We Power It</>}
        introBody={[
            <>
                The on-demand economy has reset customer expectations—people now expect to summon rides, food,
                services and goods in a few taps, tracked in real time. Grey InfoTech builds the platforms that
                meet that expectation. We engineer multi-sided marketplaces that connect customers with
                providers, with real-time matching and dispatch, live tracking, in-app payments and the seamless
                experience that turns first-time users into loyal regulars. From Uber-style mobility and food
                delivery to home services, healthcare-on-demand and B2B logistics, we design products that feel
                instant and effortless on every device.
            </>,
            <>
                Behind that simplicity sits serious engineering. On-demand platforms must coordinate customer and
                provider apps, an admin and operations console, real-time location and dispatch logic, secure
                payments and notifications—all reliably, at scale, during demand spikes. We architect for exactly
                that: scalable cloud back-ends, real-time infrastructure, robust payment integrations and
                analytics that help you optimise pricing, supply and utilisation. The result is an on-demand
                business that launches fast, runs smoothly under pressure, and grows profitably as your market
                expands.
            </>,
        ]}
        solutionsHeading={<>On-Demand <br className={'lg:block md:block hidden'}/>Development <br
            className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From customer and provider apps to dispatch, payments and analytics, Grey InfoTech delivers the
                complete on-demand platform. Based in Nigeria and serving clients globally, we build real-time
                marketplaces that scale—connecting demand and supply seamlessly.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Marketplace Platforms', target: 'MP',
                tags: ['Two-Sided', 'Listings', 'Search', 'Ratings'],
                body: <>We build multi-sided marketplaces that connect customers and providers—listings, search
                    and filtering, ratings and reviews—with the trust signals and smooth flows that make both
                    sides want to transact again and again.</>,
            },
            {
                id: '02', title: 'Real-Time Matching & Dispatch', target: 'RM',
                tags: ['Geolocation', 'Routing', 'Live Tracking'],
                body: <>We engineer real-time matching and dispatch—pairing requests with the nearest available
                    provider, optimising routes, and giving customers live tracking. Fast, fair allocation keeps
                    wait times low and utilisation high.</>,
            },
            {
                id: '03', title: 'Booking & Scheduling', target: 'BS',
                tags: ['Calendars', 'Availability', 'Reminders'],
                body: <>We build flexible booking and scheduling—instant or pre-booked, with availability
                    management, reminders and rescheduling—so service-based on-demand businesses run like
                    clockwork.</>,
            },
            {
                id: '04', title: 'Payments & Wallets', target: 'PW',
                tags: ['In-App Payments', 'Split', 'Payouts', 'Wallets'],
                body: <>We integrate secure in-app payments, wallets, split payments and automated provider
                    payouts—handling pricing, surge, tips and refunds—so money moves smoothly and transparently
                    for everyone on the platform.</>,
            },
            {
                id: '05', title: 'Admin & Operations Console', target: 'AO',
                tags: ['Dashboards', 'Disputes', 'Pricing', 'Control'],
                body: <>We deliver a powerful operations console—manage users and providers, monitor live
                    activity, resolve disputes, configure pricing and zones, and run promotions—giving your team
                    full control of the platform from one place.</>,
            },
            {
                id: '06', title: 'Analytics & Scalable Infrastructure', target: 'AS',
                tags: ['Insights', 'Cloud', 'Demand Spikes'],
                body: <>We build analytics that reveal demand, supply and utilisation patterns, on top of cloud
                    infrastructure that absorbs demand spikes gracefully—so you optimise the business with data
                    and stay reliable when traffic surges.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Real-Time at the Core', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Matching, tracking and notifications happen instantly. We build the real-time
                    backbone that makes on-demand feel magical to customers and fair to providers.</>,
            },
            {
                id: 2, title: 'Built for Demand Spikes', image: '/assets/services/product-design.jpg',
                description: <>Lunch rushes, payday surges, viral growth—our scalable architectures absorb the
                    spikes that break lesser platforms.</>,
            },
            {
                id: 3, title: 'Two Apps, One Vision', image: '/assets/services/services.jpg',
                description: <>Customer app, provider app and admin console—designed together so the whole
                    ecosystem works in harmony, not as disconnected pieces.</>,
            },
            {
                id: 4, title: 'Optimised for Profit', image: '/assets/services/digital-optimisation.jpg',
                description: <>Analytics on demand, supply and pricing help you tune utilisation and margins,
                    turning a working platform into a profitable business.</>,
            },
        ]}
        ctaHeading={<>Launch your <br className={'lg:block md:block hidden'}/>on-demand platform</>}
        ctaBody={<>From ride-hailing and delivery to home services and beyond, Grey InfoTech builds on-demand
            platforms that connect demand and supply in real time. Let&apos;s bring convenience to your customers—and
            scale to your business.</>}
        faqs={[
            {
                q: 'What kinds of on-demand apps do you build?',
                a: 'Ride-hailing and mobility, food and grocery delivery, home and professional services, healthcare-on-demand, courier and B2B logistics, and custom marketplaces. If it connects customers with providers in real time, we can build it.'
            },
            {
                q: 'Do you build all the apps—customer, provider and admin?',
                a: 'Yes. We deliver the full ecosystem: the customer app, the provider/driver app, and the admin and operations console, all sharing one scalable back-end so the platform works as a coherent whole.'
            },
            {
                q: 'How do you handle real-time tracking and dispatch?',
                a: 'We use geolocation, real-time messaging and routing to match requests with the nearest provider, optimise routes and give customers live tracking, keeping wait times low and utilisation high.'
            },
            {
                q: 'Can the platform handle demand spikes?',
                a: 'Absolutely. We architect scalable cloud back-ends with load balancing, caching and autoscaling so your platform stays fast and reliable during rushes and rapid growth.'
            },
            {
                q: 'How are payments handled?',
                a: 'We integrate secure in-app payments, wallets, split payments, surge pricing, tips, refunds and automated provider payouts, so money moves smoothly and transparently.'
            },
            {
                q: 'Can you launch an MVP quickly then scale?',
                a: 'Yes. We can ship a focused MVP to validate your market fast, then grow the same platform with new features, regions and capacity as you scale—no costly rewrites.'
            },
        ]}
        testimonials={[
            {
                name: 'Bola Akintola',
                title: 'Founder, RideNaija',
                message: <>Grey InfoTech built our ride-hailing platform—rider app, driver app and dispatch—and it
                    handled launch-day demand without a hitch. Real-time tracking works flawlessly.</>
            },
            {
                name: 'Janet Owusu',
                title: 'CEO, FreshDrop',
                message: <>Our grocery delivery platform scales beautifully through peak hours thanks to their
                    architecture. The operations console gives us total control.</>
            },
            {
                name: 'Chukwuma Eze',
                title: 'COO, HomeFix',
                message: <>They turned our home-services idea into a real marketplace with booking, payments and
                    ratings. We launched fast and have grown steadily ever since.</>
            },
        ]}
    />
);

export default Ondemand;
