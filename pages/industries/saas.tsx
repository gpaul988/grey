import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Saas = () => (
    <ServicePageTemplate
        title="SaaS"
        heroImage="/assets/services/Development.jpg"
        midImage="/assets/services/digital-transformatio.jpg"
        intro={
            <>
                We build SaaS products end to end—multi-tenant platforms, subscriptions and dashboards,{' '}
                <br className={'lg:block md:block hidden'}/>engineered to scale and retain customers.
            </>
        }
        eyebrow={<>Software people <br className={'lg:block md:block hidden'}/>subscribe to and love</>}
        introHeading="SaaS Product Engineering"
        introBody={[
            <>
                Building SaaS is about more than features—it&apos;s about reliability, retention and a product
                that grows with its users. At Grey InfoTech we build SaaS platforms from MVP to scale:
                multi-tenant architectures, subscription billing, role-based access and the polished UX that
                keeps customers paying. We help founders and teams ship products that are both delightful
                and durable.
            </>,
            <>
                We engineer SaaS for the long run: secure multi-tenancy, observability, automated billing,
                onboarding flows that activate users, and dashboards that surface real value. With CI/CD,
                monitoring and scalable cloud infrastructure baked in, your product stays fast and reliable
                as your customer base—and your team—grows.
            </>,
        ]}
        solutionsHeading="Our SaaS Solutions"
        solutions={[
            {
                id: '01', title: 'Multi-Tenant Platforms', target: 'MT',
                tags: ['Architecture', 'Isolation', 'Scale'],
                body: <>We design secure multi-tenant architectures with proper data isolation and scalable
                    infrastructure—so one codebase serves all your customers safely.</>,
            },
            {
                id: '02', title: 'Subscriptions & Billing', target: 'SB',
                tags: ['Plans', 'Stripe', 'Usage'],
                body: <>We build subscription and billing systems with plans, trials, usage metering and
                    secure payments—automating revenue from signup to renewal.</>,
            },
            {
                id: '03', title: 'Dashboards & Admin', target: 'DA',
                tags: ['Analytics', 'RBAC', 'Reporting'],
                body: <>We create rich product dashboards and admin tools with role-based access, analytics
                    and reporting that show customers and your team real value.</>,
            },
            {
                id: '04', title: 'Onboarding & Retention', target: 'OR',
                tags: ['Activation', 'Notifications', 'UX'],
                body: <>We design onboarding flows, notifications and UX that activate users fast and keep
                    them engaged—directly improving retention and lifetime value.</>,
            },
        ]}
        faqs={[
            {q: 'Can you take a SaaS from idea to launch?', a: 'Yes. We work from MVP through to scale—architecture, build, billing and deployment—so you can launch fast and grow confidently.'},
            {q: 'Do you handle subscription billing?', a: 'Absolutely. We integrate Stripe and similar providers for plans, trials, usage-based billing and automated renewals.'},
            {q: 'Is the platform built to scale?', a: 'Yes. We use multi-tenant architecture, scalable cloud infrastructure, CI/CD and monitoring so your product stays fast and reliable as you grow.'},
        ]}
        testimonials={[
            {name: 'Ifeoma Nwankwo', title: 'Founder, FlowDesk', message: <>Grey InfoTech took our SaaS from idea to launch in record time. Billing, dashboards and onboarding all just work—and it scales effortlessly.</>},
            {name: 'Peter Ofori', title: 'CTO, MetricLab', message: <>Their multi-tenant architecture and observability set us up for growth from day one. Our churn dropped thanks to the onboarding they designed.</>},
        ]}
    />
);

export default Saas;
