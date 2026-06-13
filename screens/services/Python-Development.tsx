import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const PythonDevelopment = () => (
    <ServicePageTemplate
        title={<>Python <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/Research-strategy.jpg']}
        intro={
            <>
                Versatile, scalable Python engineering—APIs and back-ends, data pipelines, automation, and AI/ML
                systems built with Django, FastAPI and Flask for performance you can trust.
            </>
        }
        eyebrow={<>One language, <br className={'lg:block md:block hidden'}/>endless possibilities</>}
        introHeading={<>Python Engineering <br className={'lg:block md:block hidden'}/>From APIs to AI</>}
        introBody={[
            <>
                Python powers some of the world&apos;s most demanding software—web platforms, data pipelines,
                automation and the machine-learning systems behind modern AI. At Grey InfoTech we harness that
                versatility to build back-ends and applications that are clean, scalable and a pleasure to
                maintain. Using Django, FastAPI and Flask, we engineer robust REST and GraphQL APIs, real-time
                services and complex business logic, all backed by rigorous testing and thoughtful architecture.
                Whether you need a high-throughput API, a data-processing engine, or an end-to-end product, our
                Python expertise turns ambitious requirements into dependable, production-ready systems.
            </>,
            <>
                Beyond web back-ends, Python is the language of data and intelligence—and we use it to give your
                business an edge. We build ETL and data pipelines that move and transform information reliably,
                automation that eliminates repetitive manual work, and machine-learning solutions that
                forecast, classify and recommend. With Pandas, NumPy, scikit-learn, PyTorch and TensorFlow in
                our toolkit, and disciplined practices around containerisation, CI/CD and observability, we
                deliver Python systems that perform under load, scale with demand, and integrate smoothly with
                the rest of your stack.
            </>,
        ]}
        solutionsHeading={<>Python <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From web APIs and data engineering to automation and machine learning, Grey InfoTech delivers the
                full breadth of Python development. Based in Nigeria and working globally, we build performant,
                well-tested Python systems that scale—turning complex requirements into reliable software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Web APIs & Back-Ends', target: 'WA',
                tags: ['Django', 'FastAPI', 'Flask', 'REST/GraphQL'],
                body: <>We build robust, high-performance back-ends and APIs with Django, FastAPI and Flask—clean
                    architecture, secure authentication, and well-documented REST or GraphQL endpoints. From
                    monoliths to microservices, we engineer services that handle real traffic reliably and stay
                    easy to extend.</>,
            },
            {
                id: '02', title: 'Data Engineering & Pipelines', target: 'DE',
                tags: ['ETL', 'Airflow', 'Pandas', 'Warehousing'],
                body: <>We design and build data pipelines that ingest, clean, transform and load data at scale.
                    Using Airflow, Pandas and modern warehousing, we move information reliably between systems and
                    prepare it for analytics, reporting and machine learning—so your decisions rest on
                    trustworthy data.</>,
            },
            {
                id: '03', title: 'Machine Learning & AI', target: 'ML',
                tags: ['scikit-learn', 'PyTorch', 'TensorFlow', 'NLP'],
                body: <>We build and deploy machine-learning models for forecasting, classification,
                    recommendation, computer vision and NLP. From data preparation and training to serving models
                    behind reliable APIs and monitoring them in production, we turn data into intelligence that
                    drives real business outcomes.</>,
            },
            {
                id: '04', title: 'Automation & Scripting', target: 'AU',
                tags: ['Workflows', 'Scraping', 'Integrations'],
                body: <>We automate the repetitive and the complex—data scraping, report generation, system
                    integrations and scheduled workflows—freeing your team from manual effort and reducing
                    errors. Reliable automation that quietly does the heavy lifting day after day.</>,
            },
            {
                id: '05', title: 'Cloud, DevOps & Deployment', target: 'CD',
                tags: ['Docker', 'CI/CD', 'AWS', 'Observability'],
                body: <>We containerise, deploy and operate Python services with Docker, CI/CD pipelines and cloud
                    infrastructure on AWS, Azure or GCP. With monitoring, logging and autoscaling in place, your
                    applications stay fast, observable and resilient under real-world load.</>,
            },
            {
                id: '06', title: 'Modernisation & Support', target: 'MS',
                tags: ['Refactoring', 'Migration', 'Testing', 'Maintenance'],
                body: <>We refactor legacy Python, migrate to modern frameworks and Python versions, add test
                    coverage, and provide ongoing maintenance. We bring ageing codebases up to current standards
                    so they stay secure, performant and a pleasure to build on.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Versatility Across Domains', image: '/assets/services/Development.jpg',
                description: <>Web, data, automation and AI—one expert team covers the full range of Python use
                    cases, so you get coherent solutions instead of disconnected point tools.</>,
            },
            {
                id: 2, title: 'Performance & Scale', image: '/assets/services/Research-strategy.jpg',
                description: <>We architect for throughput and growth—async frameworks, efficient data access,
                    caching and autoscaling—so your Python systems stay fast as demand climbs.</>,
            },
            {
                id: 3, title: 'AI & Data Ready', image: '/assets/services/services.jpg',
                description: <>Python is the language of modern data and ML. We bring production-grade machine
                    learning and data engineering capability, not just experimentation in notebooks.</>,
            },
            {
                id: 4, title: 'Maintainable Codebases', image: '/assets/services/digital-optimisation.jpg',
                description: <>Clean architecture, type hints, tests and documentation mean the systems we build
                    stay understandable and extensible for your team long after launch.</>,
            },
        ]}
        ctaHeading={<>Build smarter <br className={'lg:block md:block hidden'}/>with Python</>}
        ctaBody={<>From scalable APIs and data pipelines to automation and machine learning, Grey InfoTech delivers
            Python systems that perform and endure. Let&apos;s turn your toughest requirements into clean, reliable
            software.</>}
        faqs={[
            {q: 'Which Python frameworks do you work with?', a: 'We work with Django, FastAPI and Flask for web and APIs, plus the broader data and ML ecosystem—Pandas, NumPy, scikit-learn, PyTorch, TensorFlow and Airflow. We pick the right tool for your performance, complexity and team needs.'},
            {q: 'Can you build machine learning into our product?', a: 'Yes. We handle the full ML lifecycle—data preparation, model training, evaluation, deployment behind reliable APIs, and monitoring in production—for use cases like forecasting, recommendation, classification, NLP and computer vision.'},
            {q: 'Is Python fast enough for high-traffic systems?', a: 'For most workloads, yes—especially with async frameworks like FastAPI, efficient data access, caching and horizontal scaling. Where raw CPU performance is critical, we optimise hot paths or integrate lower-level components, so Python rarely becomes the bottleneck.'},
            {q: 'Can you modernise our existing Python application?', a: 'Absolutely. We refactor legacy code, migrate to current Python versions and frameworks, add automated tests, and improve architecture and performance—bringing ageing systems up to modern standards safely.'},
            {q: 'Do you handle deployment and DevOps?', a: 'Yes. We containerise with Docker, build CI/CD pipelines, deploy to AWS, Azure or GCP, and set up monitoring, logging and autoscaling so your Python services stay reliable and observable in production.'},
            {q: 'Can you build data pipelines and automation?', a: 'Definitely. We design ETL and data pipelines with tools like Airflow and Pandas, and build automation for scraping, reporting, integrations and scheduled workflows that remove manual effort and reduce errors.'},
        ]}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'APIs & Services Built', value: 120, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ngozi Okafor', title: 'Head of Data, InsightLab', message: <>Grey InfoTech built our entire data platform in Python—pipelines, APIs and ML models. Reliable, well-tested and genuinely scalable. Our analysts finally trust the data.</>},
            {name: 'Yusuf Abdullahi', title: 'CTO, RouteWise', message: <>Their FastAPI back-end handles our peak traffic effortlessly. Clean architecture, great documentation, and they delivered exactly on time.</>},
            {name: 'Aisha Bello', title: 'Founder, ShopSense AI', message: <>The recommendation engine they built in Python lifted our conversion noticeably. They took us from notebook prototype to production-grade ML serving real users.</>},
        ]}
    />
);

export default PythonDevelopment;
