import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const RealEstate = () => (
    <ServicePageTemplate
        title="Real Estate"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/digital-transformatio.jpg"
        intro={
            <>
                We build real estate technology—property platforms, listing portals and management
                tools,{' '}
                <br className={'lg:block md:block hidden'}/>engineered to connect buyers, sellers and agents.
            </>
        }
        eyebrow={<>Technology for <br className={'lg:block md:block hidden'}/>property and place</>}
        introHeading="PropTech Engineering"
        introBody={[
            <>
                Real estate is being transformed by technology that makes finding, managing and
                transacting property simpler. At Grey InfoTech we build platforms that connect buyers,
                renters, sellers and agents—listing portals, virtual tours, CRM tools and property
                management systems. We focus on rich search, trustworthy listings and experiences that
                turn browsers into serious leads.
            </>,
            <>
                We handle the engineering that makes property platforms work: powerful geo-search and
                filtering, media-heavy listings, virtual tours, lead management and integrations with
                payment and verification services. The result is fast, reliable platforms that help agents
                close deals and help users find the right property with confidence.
            </>,
        ]}
        solutionsHeading="Our Real Estate Solutions"
        solutions={[
            {
                id: '01', title: 'Property Listing Portals', target: 'LP',
                tags: ['Search', 'Maps', 'Media'],
                body: <>We build listing portals with rich geo-search, map views, filters and high-quality
                    media galleries—helping users find the right property fast.</>,
            },
            {
                id: '02', title: 'Virtual Tours & Visualisation', target: 'VT',
                tags: ['360°', 'Video', 'Floor Plans'],
                body: <>We create immersive virtual tours, video walkthroughs and interactive floor plans that
                    let buyers explore properties from anywhere.</>,
            },
            {
                id: '03', title: 'Agent CRM & Lead Management', target: 'CR',
                tags: ['Leads', 'Pipeline', 'Automation'],
                body: <>We develop CRM tools that capture, track and nurture leads through the sales pipeline,
                    helping agents respond faster and close more deals.</>,
            },
            {
                id: '04', title: 'Property Management', target: 'PM',
                tags: ['Tenants', 'Payments', 'Maintenance'],
                body: <>We build management platforms for landlords and managers—tenant records, rent
                    payments and maintenance tracking in one place.</>,
            },
        ]}
        faqs={[
            {q: 'Can you build advanced property search?', a: 'Yes. We implement geo-search, map views and rich filtering so users can find exactly the properties they want, fast.'},
            {q: 'Do you support virtual tours?', a: 'Absolutely. We build 360° tours, video walkthroughs and interactive floor plans to give buyers an immersive experience.'},
            {q: 'Can you build tools for agents and landlords?', a: 'Yes. We develop agent CRMs and property-management systems covering leads, tenants, payments and maintenance.'},
        ]}
        testimonials={[
            {name: 'Bola Adekunle', title: 'CEO, HomeFinder NG', message: <>Grey InfoTech built our listing portal with brilliant search and virtual tours. Leads went up and our agents close faster.</>},
            {name: 'Michael Owusu', title: 'Director, EstateLink', message: <>Their property-management platform brought all our operations into one place. Rent, tenants and maintenance are finally under control.</>},
        ]}
    />
);

export default RealEstate;
