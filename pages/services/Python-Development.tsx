import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const PythonDevelopment = () => (
    <ServicePageTemplate
        title="Python Development"
        heroImage="/assets/services/Development.jpg"
        midImage="/assets/services/digital-optimisation.jpg"
        intro={
            <>
                We build robust, scalable applications with Python—from high-performance web back-ends and
                APIs to data pipelines, automation and machine-learning systems,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for clarity, speed and long-term
                maintainability.
            </>
        }
        eyebrow={<>Versatile, powerful, <br className={'lg:block md:block hidden'}/>production-ready</>}
        introHeading="Python Engineering"
        introBody={[
            <>
                Python&#39;s versatility makes it one of the most valuable languages in modern software—powering
                everything from web platforms to AI. At Grey InfoTech we harness that versatility responsibly,
                building back-ends with Django and FastAPI, automating operations, and engineering data and
                machine-learning workflows. Whatever the domain, we write clean, well-tested, idiomatic Python
                that teams can read, extend and trust.
            </>,
            <>
                We pair Python&#39;s rapid development with engineering discipline: typed code, comprehensive
                tests, containerised deployment and observable production systems. From a fast MVP API to a
                high-throughput data platform, we design architectures that perform under load and remain
                maintainable as your product and team grow.
            </>,
        ]}
        solutionsHeading="Our Python Solutions"
        solutions={[
            {
                id: '01', title: 'Web Backends & APIs', target: 'BE',
                tags: ['Django', 'FastAPI', 'REST/GraphQL'],
                body: <>We build secure, scalable web back-ends and APIs using Django and FastAPI—complete with
                    authentication, validation, async performance and clean documentation. Ideal for SaaS platforms,
                    mobile back-ends and service-oriented architectures.</>,
            },
            {
                id: '02', title: 'Data Engineering & Pipelines', target: 'DE',
                tags: ['ETL', 'Pandas', 'Airflow'],
                body: <>We design data pipelines that ingest, clean, transform and deliver data reliably at scale—
                    using Pandas, Airflow and modern ETL tooling. Turn scattered data into trustworthy, analysis-ready
                    datasets that power reporting and decisions.</>,
            },
            {
                id: '03', title: 'Machine Learning & AI', target: 'ML',
                tags: ['scikit-learn', 'PyTorch', 'MLOps'],
                body: <>From predictive models to NLP and computer vision, we build and deploy ML systems with
                    scikit-learn, PyTorch and TensorFlow—then operationalise them with proper MLOps so models stay
                    accurate, monitored and easy to retrain in production.</>,
            },
            {
                id: '04', title: 'Automation & Scripting', target: 'AU',
                tags: ['Scripting', 'Integrations', 'Bots'],
                body: <>We automate repetitive tasks, system integrations and workflows with Python—saving time and
                    eliminating errors. From scheduled jobs and report generation to API integrations and chatbots,
                    we build dependable automation tailored to your operations.</>,
            },
        ]}
        faqs={[
            {q: 'Which Python frameworks do you use?', a: 'Primarily Django and FastAPI for web back-ends, plus Flask for lightweight services. For data and ML we use Pandas, scikit-learn, PyTorch and Airflow.'},
            {q: 'Is Python fast enough for production?', a: 'Yes—with the right architecture. We use async frameworks, caching, task queues and, where needed, native extensions to meet demanding performance requirements.'},
            {q: 'Can you deploy and maintain the system too?', a: 'Absolutely. We containerise with Docker, set up CI/CD, and run observable, monitored deployments on your chosen cloud, with ongoing maintenance available.'},
        ]}
        testimonials={[
            {name: 'Kwame Mensah', title: 'Head of Engineering, TaskFlow Inc.', message: <>Grey InfoTech rebuilt our API in FastAPI and the performance gains were immediate. Clean code, great tests, and easy to extend.</>},
            {name: 'Thandiwe Mokoena', title: 'CTO, PropEdge Technologies', message: <>Their Python data pipeline turned our messy data into reliable dashboards. It just works—every day, at scale.</>},
        ]}
    />
);

export default PythonDevelopment;
