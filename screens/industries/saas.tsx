import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Saas = () => (
    <ServicePageTemplate
        title={<>SaaS Product <br className={'lg:block md:block hidden'}/>Development</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/digital-transformatio.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/services.jpg']}
        intro={
            <>
                Multi-tenant platforms, subscription billing, analytics dashboards and onboarding flows—SaaS
                products engineered from MVP to scale, built to acquire, activate and retain paying customers.
            </>
        }
        eyebrow={<>Software people subscribe <br className={'lg:block md:block hidden'}/>to—and stay for</>}
        introHeading={<>Engineering SaaS That <br className={'lg:block md:block hidden'}/>Customers Keep Paying For</>}
        introBody={[
            <>
                Building a SaaS business is about far more than shipping features. It is about reliability,
                retention and a product that compounds in value as your customer base grows. At Grey InfoTech we
                build SaaS platforms across the entire lifecycle—from a focused, validated MVP through to a
                hardened, multi-tenant product serving thousands of accounts. We help founders, product teams and
                established enterprises turn an idea into recurring revenue, designing secure tenant isolation,
                flexible subscription billing, granular role-based access and the polished, fast user experience
                that turns trials into long-term subscriptions. Our work is grounded in the metrics that actually
                matter to SaaS economics—activation, conversion, expansion and churn—so every architectural and
                design decision is made with unit economics in mind.
            </>,
            <>
                We engineer for the long run rather than the demo. That means observability and monitoring from
                day one, automated billing and dunning, self-serve onboarding that activates users quickly,
                usage metering for consumption-based plans, and dashboards that surface genuine value to your
                customers and your team. With CI/CD pipelines, infrastructure-as-code, automated testing and
                scalable cloud infrastructure baked in, your platform stays fast, secure and reliable as both
                your customer base and your engineering team expand. Whether you are launching your first product,
                re-platforming a legacy app, or adding enterprise-grade features like SSO, audit logs and
                multi-region deployment, we deliver SaaS that is built to scale and built to last.
            </>,
        ]}
        solutionsHeading={<>Our SaaS <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From multi-tenant architecture and subscription billing to product analytics and enterprise
                readiness, Grey InfoTech delivers a complete SaaS capability. Based in Nigeria and serving
                clients worldwide, we build secure, scalable, revenue-ready platforms that turn product vision
                into recurring revenue—without compromising on performance or customer experience.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Multi-Tenant Platforms', target: 'MT',
                tags: ['Architecture', 'Tenant Isolation', 'Scale', 'Security'],
                body: <>We design secure multi-tenant architectures with proper data isolation, configurable
                    per-tenant settings and scalable infrastructure—so a single codebase serves all your
                    customers safely and cost-efficiently. We handle the hard trade-offs around shared versus
                    isolated databases, noisy-neighbour protection, tenant-level rate limiting and data residency,
                    giving you a foundation that scales from your first ten customers to your ten-thousandth.</>,
            },
            {
                id: '02', title: 'Subscriptions & Billing', target: 'SB',
                tags: ['Stripe', 'Plans', 'Usage Metering', 'Dunning'],
                body: <>We build subscription and billing systems with tiered plans, free trials, proration,
                    usage-based metering and secure payments—automating revenue from signup to renewal.
                    Integrating Stripe, Paystack and similar providers, we implement webhooks, invoicing, dunning
                    flows for failed payments and revenue analytics, so your billing stays accurate, compliant and
                    resilient as your pricing evolves.</>,
            },
            {
                id: '03', title: 'Dashboards & Admin', target: 'DA',
                tags: ['Analytics', 'RBAC', 'Reporting', 'Visualisation'],
                body: <>We create rich product dashboards and internal admin tools with role-based access
                    control, real-time analytics and exportable reporting that demonstrate measurable value to
                    customers and equip your team to operate the product. From customer-facing usage charts to
                    back-office tooling for support and finance, we make data legible and actionable across the
                    organisation.</>,
            },
            {
                id: '04', title: 'Onboarding & Retention', target: 'OR',
                tags: ['Activation', 'Lifecycle Email', 'In-App UX', 'Notifications'],
                body: <>We design onboarding flows, lifecycle messaging and in-app experiences that activate
                    users fast and keep them engaged—directly improving retention and lifetime value. Through
                    guided setup, empty-state design, contextual nudges and behavioural email, we shorten
                    time-to-value and reduce early churn, the single biggest lever on SaaS growth.</>,
            },
            {
                id: '05', title: 'Enterprise Readiness', target: 'ER',
                tags: ['SSO', 'SCIM', 'Audit Logs', 'Compliance'],
                body: <>We add the capabilities that unlock larger contracts—single sign-on (SAML, OIDC), SCIM
                    provisioning, granular permissions, audit logging, data export and the security posture
                    needed to pass procurement and compliance reviews. We help you become enterprise-ready
                    without over-engineering before you need it.</>,
            },
            {
                id: '06', title: 'API & Integrations', target: 'AP',
                tags: ['Public API', 'Webhooks', 'Marketplace', 'SDKs'],
                body: <>We build well-documented public APIs, webhooks and integration layers that let your
                    product become part of your customers&apos; workflows. From Zapier-style connectors to native
                    integrations with the tools your users already rely on, we extend your platform&apos;s reach
                    and make it stickier and harder to replace.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Built for SaaS Economics', image: '/assets/services/digital-transformatio.jpg',
                description: <>We design around the metrics that drive SaaS value—activation, conversion,
                    expansion and churn. Every decision is made with unit economics and lifetime value in mind,
                    not just feature output.</>,
            },
            {
                id: 2, title: 'Scalable From Day One', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Secure multi-tenancy, infrastructure-as-code, CI/CD and observability are baked
                    in from the start, so your platform stays fast and reliable as you grow from ten to ten
                    thousand accounts.</>,
            },
            {
                id: 3, title: 'MVP to Scale', image: '/assets/services/services.jpg',
                description: <>We meet you wherever you are—validating an idea with a focused MVP, hardening a
                    product for growth, or adding enterprise features. The same senior team carries you through
                    every stage.</>,
            },
            {
                id: 4, title: 'Retention by Design', image: '/assets/services/digital-optimisation.jpg',
                description: <>Great onboarding and in-product experience aren&apos;t afterthoughts. We design the
                    flows that activate users and keep them subscribed, directly protecting your recurring
                    revenue.</>,
            },
        ]}
        ctaHeading={<>Turn your idea <br className={'lg:block md:block hidden'}/>into recurring revenue</>}
        ctaBody={<>From multi-tenant architecture and billing to onboarding and enterprise readiness, Grey
            InfoTech builds SaaS products that acquire, activate and retain. Let&apos;s scope your product, model
            the economics, and ship something customers keep paying for.</>}
        faqs={[
            {q: 'Can you take a SaaS from idea to launch?', a: 'Yes. We work end to end—from validating the concept and building a focused MVP through architecture, billing, deployment and scale. You get the same senior team across the whole journey, so you can launch fast and grow confidently.'},
            {q: 'How do you handle subscription billing?', a: 'We integrate Stripe, Paystack and similar providers to support tiered plans, free trials, proration, usage-based metering and automated renewals. We also implement webhooks, invoicing, dunning for failed payments and revenue reporting so your billing stays accurate and resilient.'},
            {q: 'Is the platform built to scale?', a: 'Absolutely. We use secure multi-tenant architecture, infrastructure-as-code, CI/CD pipelines, automated testing and monitoring so your product stays fast and reliable as your customer base and team expand.'},
            {q: 'Can you make our product enterprise-ready?', a: 'Yes. We add SSO (SAML/OIDC), SCIM provisioning, granular permissions, audit logging and data export, and help you build the security posture needed to pass procurement and compliance reviews—without over-engineering before you need it.'},
            {q: 'Do you provide a public API and integrations?', a: 'We build well-documented public APIs, webhooks and integration layers, including connectors to the tools your customers already use. This extends your reach and makes your product stickier and harder to replace.'},
            {q: 'How do you help reduce churn?', a: 'We treat retention as a design problem. Through guided onboarding, contextual in-app nudges, lifecycle email and clear value dashboards, we shorten time-to-value and reduce early churn—the single biggest lever on SaaS growth.'},
        ]}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'SaaS Products Shipped', value: 40, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ifeoma Nwankwo', title: 'Founder, FlowDesk', message: <>Grey InfoTech took our SaaS from idea to launch in record time. Billing, dashboards and onboarding all just work—and it scales effortlessly. They thought about our churn and conversion, not just the feature list.</>},
            {name: 'Peter Ofori', title: 'CTO, MetricLab', message: <>Their multi-tenant architecture and observability set us up for growth from day one. Our churn dropped thanks to the onboarding flows they designed, and the billing system has never let us down.</>},
            {name: 'Sarah Mensah', title: 'CEO, TeamPulse', message: <>When enterprise deals started landing, Grey InfoTech added SSO, audit logs and granular permissions fast. They made us procurement-ready without slowing the team down. Genuinely a partner, not just a vendor.</>},
        ]}
    />
);

export default Saas;
