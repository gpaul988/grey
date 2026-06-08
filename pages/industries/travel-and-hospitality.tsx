import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const TravelAndHospitality = () => (
    <ServicePageTemplate
        title="Travel & Hospitality"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/product-design.jpg"
        intro={
            <>
                We build travel and hospitality technology—booking platforms, property management and
                guest apps,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for seamless journeys and stays.
            </>
        }
        eyebrow={<>Technology for <br className={'lg:block md:block hidden'}/>memorable journeys</>}
        introHeading="Travel & Hospitality Engineering"
        introBody={[
            <>
                Travel and hospitality are all about experience—and great software makes that experience
                effortless. At Grey InfoTech we build booking platforms, hotel and property management
                systems, and guest-facing apps that delight travellers and streamline operations. From
                search and booking to check-in and beyond, we help you deliver journeys guests remember for
                the right reasons.
            </>,
            <>
                We handle the engineering challenges unique to this industry: real-time availability and
                pricing, secure payments, channel and inventory management, and integrations with booking
                engines and OTAs. Our platforms keep operators in control and guests happy—scalable through
                peak seasons and reliable when it matters most.
            </>,
        ]}
        solutionsHeading="Our Travel & Hospitality Solutions"
        solutions={[
            {
                id: '01', title: 'Booking & Reservation Platforms', target: 'BP',
                tags: ['Availability', 'Payments', 'Search'],
                body: <>We build booking platforms with real-time availability, dynamic pricing and secure
                    payments—making it easy for guests to search, book and pay.</>,
            },
            {
                id: '02', title: 'Property Management Systems', target: 'PM',
                tags: ['Front Desk', 'Housekeeping', 'Channels'],
                body: <>We develop PMS tools covering front desk, housekeeping, rates and channel
                    management—giving operators full control of their property.</>,
            },
            {
                id: '03', title: 'Guest Experience Apps', target: 'GE',
                tags: ['Check-in', 'Services', 'Loyalty'],
                body: <>We create guest apps for mobile check-in, in-stay services, requests and loyalty—
                    elevating the experience and reducing front-desk load.</>,
            },
            {
                id: '04', title: 'Travel & OTA Integrations', target: 'TI',
                tags: ['OTAs', 'GDS', 'Sync'],
                body: <>We integrate with OTAs, booking engines and distribution channels so availability,
                    rates and reservations stay perfectly in sync everywhere.</>,
            },
        ]}
        faqs={[
            {q: 'Can you handle real-time availability and pricing?', a: 'Yes. We build real-time availability, dynamic pricing and secure booking flows that stay accurate even during peak demand.'},
            {q: 'Do you integrate with OTAs and booking engines?', a: 'Absolutely. We connect with OTAs, GDS and channel managers so your inventory and rates stay in sync across all platforms.'},
            {q: 'Can you build guest-facing apps?', a: 'Yes. We develop guest apps for mobile check-in, in-stay services and loyalty that enhance the experience and ease operations.'},
        ]}
        testimonials={[
            {name: 'Amara Okeke', title: 'GM, Lagos Bay Hotels', message: <>Grey InfoTech built our booking platform and PMS. Operations are smoother, double-bookings are gone, and our guests love the mobile check-in.</>},
            {name: 'Thabo Nkosi', title: 'Founder, SafariStay', message: <>Their OTA integrations keep our availability perfectly synced everywhere. Bookings went up and our team spends far less time on manual updates.</>},
        ]}
    />
);

export default TravelAndHospitality;
