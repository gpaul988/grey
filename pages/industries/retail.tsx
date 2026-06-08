import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Retail = () => (
    <ServicePageTemplate
        title="Retail"
        heroImage="/assets/services/ecommerce-web-design.jpg"
        midImage="/assets/services/digital-optimisation.jpg"
        intro={
            <>
                We build retail technology—e-commerce, POS and inventory systems,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for seamless omnichannel selling.
            </>
        }
        eyebrow={<>Sell everywhere, <br className={'lg:block md:block hidden'}/>manage from one place</>}
        introHeading="Retail Technology Engineering"
        introBody={[
            <>
                Modern retail spans storefronts, online shops and marketplaces—and customers expect a
                seamless experience across all of them. At Grey InfoTech we build retail technology that
                connects these channels: e-commerce platforms, point-of-sale systems and inventory tools
                that keep stock, pricing and orders in perfect sync. We help retailers sell more and
                operate smarter.
            </>,
            <>
                We engineer for the realities of retail: high-traffic storefronts, real-time inventory,
                secure payments and rich product experiences. Our omnichannel platforms unify online and
                offline sales, give you a single view of stock and customers, and provide the analytics you
                need to make confident merchandising and pricing decisions.
            </>,
        ]}
        solutionsHeading="Our Retail Solutions"
        solutions={[
            {
                id: '01', title: 'E-Commerce Platforms', target: 'EC',
                tags: ['Storefront', 'Checkout', 'Payments'],
                body: <>We build fast, conversion-focused online stores with rich product pages, smooth
                    checkout and secure payments—ready for high traffic and growth.</>,
            },
            {
                id: '02', title: 'Point of Sale (POS)', target: 'PS',
                tags: ['In-store', 'Receipts', 'Offline'],
                body: <>We develop POS systems for in-store selling with fast checkout, receipts and offline
                    resilience—synced with your online inventory and orders.</>,
            },
            {
                id: '03', title: 'Inventory & Order Management', target: 'IM',
                tags: ['Stock', 'Fulfilment', 'Multi-location'],
                body: <>We create inventory and order systems that track stock across locations, automate
                    fulfilment and prevent overselling—online and offline.</>,
            },
            {
                id: '04', title: 'Omnichannel & Analytics', target: 'OA',
                tags: ['Unified', 'Loyalty', 'Insights'],
                body: <>We unify your sales channels and customer data, add loyalty features, and deliver
                    analytics that drive smarter merchandising and pricing.</>,
            },
        ]}
        faqs={[
            {q: 'Can you connect online and in-store sales?', a: 'Yes. We build omnichannel platforms that sync inventory, orders and customer data across e-commerce and physical stores.'},
            {q: 'Do you build for high-traffic storefronts?', a: 'Absolutely. We architect e-commerce platforms to handle peak traffic and sales events with fast performance and reliable checkout.'},
            {q: 'Can you handle inventory across multiple locations?', a: 'Yes. Our inventory systems track stock across warehouses and stores, automate fulfilment and prevent overselling.'},
        ]}
        testimonials={[
            {name: 'Chioma Eze', title: 'Founder, StyleMart', message: <>Grey InfoTech unified our online and in-store sales. Inventory is finally accurate everywhere and our checkout is lightning fast.</>},
            {name: 'Samuel Boateng', title: 'Operations Lead, FreshGoods', message: <>Their POS and inventory system transformed how we run our stores. Fewer stockouts, smoother fulfilment, happier customers.</>},
        ]}
    />
);

export default Retail;
