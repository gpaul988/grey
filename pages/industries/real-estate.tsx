import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const RealEstate = () => (
    <ServicePageTemplate
        title={<>Real Estate Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/product-design.jpg']}
        intro={
            <>
                Transforming property—listing portals, property management, CRM and virtual tours that connect
                buyers, sellers, agents and tenants in one seamless digital experience.
            </>
        }
        eyebrow={<>PropTech that moves <br className={'lg:block md:block hidden'}/>property faster</>}
        introHeading={<>Real Estate Technology <br className={'lg:block md:block hidden'}/>How We Power Property</>}
        introBody={[
            <>
                Property is one of the world&apos;s largest markets, and it&apos;s being reshaped by software. Grey
                InfoTech builds the platforms that move it—listing portals with rich search, property and tenancy
                management systems, agent CRMs, virtual tours and the transaction tools that turn browsing into
                deals. We connect buyers, sellers, renters, agents and property managers in one seamless digital
                experience, replacing fragmented spreadsheets, paperwork and phone calls with platforms that are
                fast, transparent and genuinely useful. Whether you&apos;re a brokerage, a property manager, a
                developer, or a PropTech startup, we build software that closes more deals and runs operations
                smoothly.
            </>,
            <>
                Great PropTech blends discovery, management and trust. We engineer powerful search and map-based
                discovery so the right property surfaces instantly, immersive virtual tours and media that sell
                remotely, and CRM and lead tools that help agents convert. For owners and managers we build
                end-to-end management—listings, tenants, leases, maintenance, rent collection and reporting—and
                we integrate payments, e-signatures and analytics so transactions are smooth and decisions are
                data-driven. With secure handling of sensitive financial and personal data and the scale to serve
                large portfolios, we deliver real estate software that performs in the real market.
            </>,
        ]}
        solutionsHeading={<>Real Estate <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From listing portals and property management to CRM and virtual tours, Grey InfoTech builds
                PropTech that performs. Based in Nigeria and serving clients globally, we connect every party in
                the property journey with seamless, data-driven software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Property Listing Portals', target: 'PL',
                tags: ['Search', 'Maps', 'Media', 'Filters'],
                body: <>We build listing portals with powerful search, map-based discovery, rich media and smart
                    filters—so buyers and renters find the right property fast, and listings get the visibility
                    they deserve.</>,
            },
            {
                id: '02', title: 'Property Management Systems', target: 'PM',
                tags: ['Tenants', 'Leases', 'Maintenance', 'Rent'],
                body: <>We develop end-to-end management platforms—listings, tenants, leases, maintenance requests,
                    rent collection and reporting—giving owners and managers full control of their portfolios from
                    one place.</>,
            },
            {
                id: '03', title: 'Agent & Brokerage CRM', target: 'CR',
                tags: ['Leads', 'Pipeline', 'Automation'],
                body: <>We build CRMs tailored to real estate—lead capture, pipeline management, follow-up
                    automation and deal tracking—helping agents nurture prospects and close more transactions
                    with less manual effort.</>,
            },
            {
                id: '04', title: 'Virtual Tours & Media', target: 'VT',
                tags: ['3D Tours', '360°', 'Video'],
                body: <>We integrate immersive virtual tours, 360° walkthroughs and video so properties sell
                    remotely—letting buyers and renters explore from anywhere and dramatically widening your
                    market reach.</>,
            },
            {
                id: '05', title: 'Transactions, Payments & E-Sign', target: 'TP',
                tags: ['Payments', 'E-Signature', 'Documents'],
                body: <>We streamline the deal—online payments, e-signatures, document management and workflow—so
                    transactions complete faster with less friction and a clear, auditable record for everyone
                    involved.</>,
            },
            {
                id: '06', title: 'Analytics, Security & Scale', target: 'AS',
                tags: ['Insights', 'Data Security', 'Cloud'],
                body: <>We add market and portfolio analytics, protect sensitive financial and personal data with
                    strong security, and architect for scale so your platform handles large portfolios and high
                    traffic with ease.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Discovery That Converts', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Powerful search, maps and media help the right buyer find the right property fast—
                    turning browsing into genuine leads and deals.</>,
            },
            {
                id: 2, title: 'Operations Under Control', image: '/assets/services/product-design.jpg',
                description: <>Listings, tenants, leases, maintenance and rent in one platform mean owners and
                    managers spend less time on admin and more on growth.</>,
            },
            {
                id: 3, title: 'Sell Remotely', image: '/assets/services/services.jpg',
                description: <>Virtual tours and rich media let buyers explore from anywhere, widening your
                    market and accelerating decisions.</>,
            },
            {
                id: 4, title: 'Trust & Scale', image: '/assets/services/digital-optimisation.jpg',
                description: <>Secure handling of sensitive data and architecture built for large portfolios mean
                    your platform stays safe and fast as you grow.</>,
            },
        ]}
        ctaHeading={<>Move property <br className={'lg:block md:block hidden'}/>faster</>}
        ctaBody={<>From listing portals and property management to CRM and virtual tours, Grey InfoTech builds
            PropTech that closes deals and streamlines operations. Let&apos;s transform how you do property.</>}
        faqs={[
            {q: 'What real estate software do you build?', a: 'Property listing portals, property and tenancy management systems, agent and brokerage CRMs, virtual tour integrations, transaction and e-signature tools, and analytics platforms—for brokerages, property managers, developers and PropTech startups.'},
            {q: 'Can you build virtual tours and 360° walkthroughs?', a: 'Yes. We integrate immersive virtual tours, 360° walkthroughs and video so properties can be explored remotely, widening your market reach and speeding up buyer decisions.'},
            {q: 'Do you build property management features?', a: 'Absolutely. We build end-to-end management—listings, tenants, leases, maintenance requests, rent collection and reporting—so owners and managers control their portfolios from one platform.'},
            {q: 'Can you handle online payments and e-signatures?', a: 'Yes. We integrate secure payments, e-signatures and document management so transactions complete faster with a clear, auditable record for all parties.'},
            {q: 'How do you protect sensitive data?', a: 'Through encryption, strict access control and secure cloud architecture, with attention to the privacy regulations governing financial and personal data in property transactions.'},
            {q: 'Will the platform scale to large portfolios?', a: 'Yes. We architect scalable cloud infrastructure so your platform handles large portfolios, high listing volumes and heavy traffic without slowing down.'},
        ]}
        testimonials={[
            {name: 'Chinwe Okafor', title: 'MD, PrimeHomes Realty', message: <>Grey InfoTech built our listing portal and agent CRM, and our lead conversion jumped. The map search and virtual tours genuinely set us apart from competitors.</>},
            {name: 'Thabo Nkosi', title: 'Founder, RentEase', message: <>Their property management platform put listings, tenants, maintenance and rent collection in one place. Our admin workload dropped dramatically.</>},
            {name: 'Yetunde Lawal', title: 'CEO, UrbanNest', message: <>The virtual tours they integrated let us sell units remotely to diaspora buyers. It opened a whole new market for us, and the platform scales beautifully.</>},
        ]}
    />
);

export default RealEstate;
