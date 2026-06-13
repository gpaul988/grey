import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const TravelAndHospitality = () => (
    <ServicePageTemplate
        title={<>Travel & Hospitality <br className={'lg:block md:block hidden'}/>Technology</>}
        heroVideo="/assets/travel/hero.webm"
        midImage="/assets/services/product-design.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/services.jpg']}
        intro={
            <>
                Booking platforms, property management systems and guest-facing apps—travel and hospitality
                technology engineered for seamless journeys, frictionless stays and operations that run
                smoothly through every peak season.
            </>
        }
        eyebrow={<>Technology for <br className={'lg:block md:block hidden'}/>memorable journeys</>}
        introHeading={<>Software That Makes Every <br className={'lg:block md:block hidden'}/>Journey Effortless</>}
        introBody={[
            <>
                Travel and hospitality are, above all, about experience—and great software is what makes that
                experience feel effortless. At Grey InfoTech we build booking and reservation platforms, hotel
                and property management systems, and guest-facing apps that delight travellers while
                streamlining the operations behind the scenes. From the first search and booking through to
                check-in, in-stay services and post-stay loyalty, we help operators deliver the kind of journeys
                guests remember for the right reasons. We understand that in this industry a single technical
                failure—an overbooking, a payment error, a slow page during a flash sale—translates directly
                into lost revenue and damaged reputation, so reliability and performance sit at the heart of
                everything we build.
            </>,
            <>
                We handle the engineering challenges that are unique to travel and hospitality: real-time
                availability and dynamic pricing, secure multi-currency payments, channel and inventory
                management, and deep integrations with booking engines, GDS and online travel agencies. Our
                platforms keep operators firmly in control while keeping guests happy—scalable enough to absorb
                peak-season surges and resilient enough to stay reliable when it matters most. Whether you run a
                boutique property, a growing hotel group, a tour operator or an online travel marketplace, we
                build technology that synchronises inventory everywhere, reduces manual work for your team and
                turns a smooth digital experience into repeat bookings and loyal guests.
            </>,
        ]}
        solutionsHeading={<>Our Travel & <br className={'lg:block md:block hidden'}/>Hospitality <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From booking platforms and property management to guest apps and OTA integrations, Grey
                InfoTech delivers a complete travel and hospitality technology capability. Based in Nigeria and
                serving clients worldwide, we build secure, scalable, real-time systems that turn seamless
                digital experiences into higher occupancy, smoother operations and loyal, returning guests.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Booking & Reservation Platforms', target: 'BP',
                tags: ['Real-Time Availability', 'Dynamic Pricing', 'Payments', 'Search'],
                body: <>We build booking platforms with real-time availability, dynamic pricing and secure
                    multi-currency payments—making it effortless for guests to search, compare, book and pay.
                    Our flows are engineered to stay accurate and fast even during flash sales and peak demand,
                    with abandoned-cart recovery, flexible cancellation rules and instant confirmations that keep
                    conversion high and support tickets low.</>,
            },
            {
                id: '02', title: 'Property Management Systems', target: 'PM',
                tags: ['Front Desk', 'Housekeeping', 'Rates', 'Channel Manager'],
                body: <>We develop property management systems covering front desk, reservations, housekeeping,
                    rate management and channel distribution—giving operators full control of their property from
                    a single dashboard. Automated workflows for arrivals, departures and room status reduce manual
                    effort and eliminate the double-bookings and miscommunication that erode guest trust.</>,
            },
            {
                id: '03', title: 'Guest Experience Apps', target: 'GE',
                tags: ['Mobile Check-in', 'In-Stay Services', 'Loyalty', 'Messaging'],
                body: <>We create guest-facing apps for mobile check-in and check-out, in-stay service requests,
                    digital room keys, concierge messaging and loyalty programmes—elevating the guest experience
                    while reducing front-desk load. By putting control in the guest&apos;s hands, we increase
                    satisfaction scores and free your team to focus on hospitality rather than admin.</>,
            },
            {
                id: '04', title: 'Travel & OTA Integrations', target: 'TI',
                tags: ['OTAs', 'GDS', 'Channel Sync', 'APIs'],
                body: <>We integrate with online travel agencies, global distribution systems, booking engines
                    and channel managers so availability, rates and reservations stay perfectly in sync across
                    every platform. Two-way sync prevents overbooking and rate parity issues, while a unified
                    inventory view means your team manages everything from one place.</>,
            },
            {
                id: '05', title: 'Tour & Activity Platforms', target: 'TA',
                tags: ['Itineraries', 'Scheduling', 'Capacity', 'Vouchers'],
                body: <>For tour operators and experience providers, we build platforms that handle itinerary
                    design, scheduling, capacity management, ticketing and digital vouchers. We support
                    multi-day packages, guides and resource allocation, and seasonal pricing—so you can sell and
                    operate complex experiences with confidence.</>,
            },
            {
                id: '06', title: 'Analytics & Revenue Management', target: 'AR',
                tags: ['Occupancy', 'RevPAR', 'Forecasting', 'Dashboards'],
                body: <>We build analytics and revenue-management dashboards that surface occupancy, RevPAR,
                    booking pace, channel performance and guest behaviour. With clear forecasting and reporting,
                    your team can price intelligently, anticipate demand and make decisions backed by data rather
                    than guesswork.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Built for Peak Demand', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Flash sales and seasonal surges don&apos;t break our platforms. We engineer for
                    scale and resilience so your booking flows stay fast and accurate exactly when revenue is on
                    the line.</>,
            },
            {
                id: 2, title: 'Synchronised Everywhere', image: '/assets/services/product-design.jpg',
                description: <>Two-way OTA, GDS and channel-manager integrations keep availability and rates in
                    perfect sync, eliminating overbooking and the manual updates that drain your team&apos;s
                    time.</>,
            },
            {
                id: 3, title: 'Guest-First Experience', image: '/assets/services/services.jpg',
                description: <>From mobile check-in to loyalty, we design experiences guests genuinely enjoy—
                    raising satisfaction scores and turning one-time visitors into repeat bookings.</>,
            },
            {
                id: 4, title: 'Operations Made Simple', image: '/assets/services/digital-optimisation.jpg',
                description: <>A single dashboard for front desk, housekeeping, rates and distribution means
                    less manual work, fewer errors and more time for your team to focus on hospitality.</>,
            },
        ]}
        ctaHeading={<>Build journeys <br className={'lg:block md:block hidden'}/>guests remember</>}
        ctaBody={<>From booking platforms and property management to guest apps and OTA integrations, Grey
            InfoTech turns travel and hospitality ambition into reliable, scalable technology. Let&apos;s map
            your guest journey and build software that fills rooms and earns loyalty.</>}
        faqs={[
            {q: 'Can you handle real-time availability and pricing?', a: 'Yes. We build real-time availability, dynamic pricing and secure booking flows that stay accurate and fast even during flash sales and peak demand, with confirmations, flexible cancellation rules and abandoned-cart recovery built in.'},
            {q: 'Do you integrate with OTAs and booking engines?', a: 'Absolutely. We connect with OTAs, GDS and channel managers using two-way sync so your inventory and rates stay consistent across every platform, preventing overbooking and rate-parity issues.'},
            {q: 'Can you build guest-facing apps?', a: 'Yes. We develop guest apps for mobile check-in and check-out, in-stay service requests, digital room keys, concierge messaging and loyalty programmes that enhance the experience and reduce front-desk load.'},
            {q: 'Do you support tour and activity operators?', a: 'We do. We build platforms for itinerary design, scheduling, capacity management, ticketing and digital vouchers, including multi-day packages, guide and resource allocation, and seasonal pricing.'},
            {q: 'Can you provide revenue and occupancy analytics?', a: 'Yes. We build dashboards that surface occupancy, RevPAR, booking pace, channel performance and guest behaviour, with forecasting and reporting so you can price intelligently and anticipate demand.'},
            {q: 'Will the platform scale through peak seasons?', a: 'Reliability at peak is a core design goal. We engineer for scale and resilience using scalable cloud infrastructure, caching and monitoring so your systems stay fast and dependable when demand spikes.'},
        ]}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Booking Platforms Built', value: 25, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Amara Okeke', title: 'GM, Lagos Bay Hotels', message: <>Grey InfoTech built our booking platform and PMS. Operations are smoother, double-bookings are gone, and our guests love the mobile check-in. Our occupancy is up and the front desk finally has time to focus on guests.</>},
            {name: 'Thabo Nkosi', title: 'Founder, SafariStay', message: <>Their OTA integrations keep our availability perfectly synced everywhere. Bookings went up and our team spends far less time on manual updates. The analytics dashboard changed how we price entirely.</>},
            {name: 'Chioma Adeyemi', title: 'Operations Director, Coastline Tours', message: <>The tour platform they built handles our multi-day itineraries, capacity and vouchers flawlessly. What used to be spreadsheets and chaos is now one clean system the whole team trusts.</>},
        ]}
    />
);

export default TravelAndHospitality;
