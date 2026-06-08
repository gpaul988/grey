import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Retail = () => (
    <ServicePageTemplate
        title={<>Retail Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/ecommerce-web-design.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/RET.png']}
        intro={
            <>
                Retail that works everywhere—POS, inventory, e-commerce and omnichannel platforms that unify
                online and in-store, delight shoppers and grow sales.
            </>
        }
        eyebrow={<>Retail technology <br className={'lg:block md:block hidden'}/>built for omnichannel</>}
        introHeading={<>Retail Technology <br className={'lg:block md:block hidden'}/>How We Drive Sales</>}
        introBody={[
            <>
                Today&apos;s shoppers move fluidly between online and in-store, and they expect a seamless,
                personalised experience at every touchpoint. Grey InfoTech builds the retail technology that
                delivers it. We develop point-of-sale systems, inventory and order management, e-commerce
                storefronts and the omnichannel platforms that tie them together—so a customer can browse online,
                buy in store, return anywhere, and feel known throughout. From single-store retailers to
                multi-location chains and fast-growing D2C brands, we engineer software that increases sales,
                tightens operations and turns first-time buyers into loyal customers.
            </>,
            <>
                Unified data is what makes modern retail work. We connect your channels so inventory, pricing,
                customers and orders stay in sync in real time—no overselling, no fragmented customer view. We
                build fast, conversion-focused e-commerce, robust POS that works even offline, inventory and
                supply systems that prevent stockouts, and loyalty and personalisation that lift repeat
                purchases. With secure payments, analytics that reveal what sells, and infrastructure that scales
                through peak seasons and flash sales, we deliver retail platforms that perform when it matters
                most—and keep performing as you grow.
            </>,
        ]}
        solutionsHeading={<>Retail <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From POS and inventory to e-commerce and omnichannel, Grey InfoTech builds retail software that
                sells. Based in Nigeria and serving clients globally, we unify online and in-store into one
                seamless, data-driven experience.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Point-of-Sale (POS) Systems', target: 'PS',
                tags: ['In-Store', 'Offline-Ready', 'Payments'],
                body: <>We build fast, intuitive POS systems that handle sales, returns and payments in store—
                    working reliably even offline and syncing seamlessly with inventory and your wider platform
                    so the shop floor never slows down.</>,
            },
            {
                id: '02', title: 'Inventory & Order Management', target: 'IO',
                tags: ['Real-Time Stock', 'Multi-Location', 'Fulfilment'],
                body: <>We develop inventory and order management that keeps stock accurate across locations and
                    channels in real time—preventing overselling and stockouts and streamlining fulfilment from
                    any source to any destination.</>,
            },
            {
                id: '03', title: 'E-Commerce Storefronts', target: 'EC',
                tags: ['Conversion', 'Mobile', 'Checkout'],
                body: <>We craft fast, conversion-focused online stores—mobile-first, with frictionless checkout,
                    rich product pages and secure payments—that turn browsers into buyers and grow your online
                    revenue.</>,
            },
            {
                id: '04', title: 'Omnichannel Platforms', target: 'OM',
                tags: ['Unified', 'BOPIS', 'Single View'],
                body: <>We unify your channels so customers can buy online and pick up or return in store, and so
                    inventory, pricing and customer data stay consistent everywhere—delivering the seamless
                    experience shoppers now expect.</>,
            },
            {
                id: '05', title: 'Loyalty & Personalisation', target: 'LP',
                tags: ['Rewards', 'Recommendations', 'Retention'],
                body: <>We build loyalty programs and personalisation—rewards, targeted offers and product
                    recommendations—that increase repeat purchases and customer lifetime value by making every
                    shopper feel recognised.</>,
            },
            {
                id: '06', title: 'Analytics, Security & Scale', target: 'AS',
                tags: ['Insights', 'PCI', 'Peak Traffic'],
                body: <>We add analytics that reveal what sells and why, secure payments to PCI standards, and
                    cloud infrastructure that scales through peak seasons and flash sales—so your platform
                    performs exactly when it matters most.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'One Unified View', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Inventory, customers and orders synced across every channel mean no overselling,
                    no blind spots—and a single, complete view of your business.</>,
            },
            {
                id: 2, title: 'Built to Convert', image: '/assets/services/RET.png',
                description: <>Fast, mobile-first storefronts with frictionless checkout turn more visitors into
                    buyers and lift your online revenue.</>,
            },
            {
                id: 3, title: 'Loyalty That Lasts', image: '/assets/services/ecommerce-web-design.jpg',
                description: <>Rewards, personalisation and recommendations increase repeat purchases and
                    lifetime value, turning shoppers into regulars.</>,
            },
            {
                id: 4, title: 'Ready for Peak Season', image: '/assets/services/digital-optimisation.jpg',
                description: <>Black Friday, flash sales, festive rushes—our scalable infrastructure performs
                    when traffic spikes and revenue is on the line.</>,
            },
        ]}
        ctaHeading={<>Sell everywhere, <br className={'lg:block md:block hidden'}/>seamlessly</>}
        ctaBody={<>From POS and inventory to e-commerce and omnichannel, Grey InfoTech builds retail software that
            grows sales and unifies your operation. Let&apos;s create a shopping experience customers love—online and
            in store.</>}
        faqs={[
            {q: 'What retail software do you build?', a: 'Point-of-sale systems, inventory and order management, e-commerce storefronts, omnichannel platforms, loyalty and personalisation, and analytics—for single stores, multi-location chains and D2C brands.'},
            {q: 'What does omnichannel actually mean for my business?', a: 'It means your online and in-store channels share the same inventory, pricing, customer and order data in real time—so customers can buy online and collect in store, return anywhere, and feel recognised everywhere. We build that unified backbone.'},
            {q: 'Will the POS work if the internet goes down?', a: 'Yes. We build POS that operates offline and syncs automatically when connectivity returns, so your shop floor keeps selling no matter what.'},
            {q: 'Can you integrate payments securely?', a: 'Absolutely. We integrate secure payment providers to PCI standards, supporting cards, wallets and local payment methods online and in store.'},
            {q: 'How do you handle peak-season traffic?', a: 'We architect scalable cloud infrastructure so your platform stays fast and reliable during Black Friday, flash sales and festive peaks, when performance matters most.'},
            {q: 'Can you build loyalty and personalisation?', a: 'Yes. We build loyalty programs, targeted offers and recommendation engines that increase repeat purchases and customer lifetime value by making every shopper feel known.'},
        ]}
        testimonials={[
            {name: 'Adaeze Nnamdi', title: 'Founder, StyleHub', message: <>Grey InfoTech unified our online store and physical shops onto one platform. Inventory finally matches reality and customers can buy online, collect in store. Sales are up across the board.</>},
            {name: 'Sipho Dlamini', title: 'Retail Director, MartPlus', message: <>Their POS and inventory system works flawlessly across all our branches—even offline. The real-time stock visibility ended our overselling problems for good.</>},
            {name: 'Ngozi Eze', title: 'CEO, GlowCart', message: <>The loyalty and personalisation features they built noticeably lifted repeat purchases, and the platform sailed through our last Black Friday without a hiccup.</>},
        ]}
    />
);

export default Retail;
