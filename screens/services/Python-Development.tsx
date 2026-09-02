import React from 'react';


import ServicePageTemplate from '@/components/ServicePageTemplate';

const PythonDevelopment = () => (
    <ServicePageTemplate
        title={<>Python <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/digital-optimisation.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                Python for web APIs, data science, ML, and automation. 200+ projects delivered, 50+ ML models deployed, 30+ production data pipelines. 95%+ model accuracy. Django, FastAPI, TensorFlow, scikit-learn expertise.
            </>
        }
        eyebrow={<>One language, <br className={'lg:block md:block hidden'}/>endless possibilities</>}
        introHeading={<>Python Development <br className={'lg:block md:block hidden'}/>APIs, Data Science, and AI/ML</>}
        introBody={[
            <>
                Python powers enterprise systems handling data science, machine learning, and complex business logic. With 8+ years of specialized expertise, Graham Sobiribo Paul has delivered 200+ Python projects including 50+ production ML models achieving 95%+ accuracy. Using Django, FastAPI, and Flask, we engineer REST and GraphQL APIs, 30+ enterprise data pipelines, and automation systems. Our 14+ dedicated Python engineers combine clean architecture, rigorous testing, and thoughtful design to build backend services, data platforms, and intelligent systems that scale reliably with your business.
            </>,
            <>
                Beyond traditional web backends, Python enables data-driven competitive advantage. We build ETL pipelines processing massive data volumes, machine learning models powering predictions and recommendations, and automation eliminating repetitive workflows. With 300+ total solutions delivered, Pandas, NumPy, scikit-learn, PyTorch, and TensorFlow expertise, combined with production-grade containerization, CI/CD pipelines, and cloud infrastructure, we deliver Python systems that perform under load, scale with demand, and integrate seamlessly across your technology stack. From data engineering to AI deployment, we transform complex requirements into reliable, maintainable production systems.
            </>,
        ]}
        solutionsHeading={<>Python <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From web APIs and data engineering to automation and machine learning, Graham Sobiribo Paul delivers the
                full breadth of Python development. Based in Nigeria and working globally, we build performant,
                well-tested Python systems that scale -turning complex requirements into reliable software.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Web APIs & Back-Ends', target: 'WA',
                tags: ['Django', 'FastAPI', 'Flask', 'REST/GraphQL'],
                body: <>We build robust, high-performance back-ends and APIs with Django, FastAPI and Flask -clean
                    architecture, secure authentication, and well-documented REST or GraphQL endpoints. From
                    monoliths to microservices, we engineer services that handle real traffic reliably and stay
                    easy to extend.</>,
            },
            {
                id: '02', title: 'Data Engineering & Pipelines', target: 'DE',
                tags: ['ETL', 'Airflow', 'Pandas', 'Warehousing'],
                body: <>We design and build data pipelines that ingest, clean, transform and load data at scale.
                    Using Airflow, Pandas and modern warehousing, we move information reliably between systems and
                    prepare it for analytics, reporting and machine learning -so your decisions rest on
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
                body: <>We automate the repetitive and the complex -data scraping, report generation, system
                    integrations and scheduled workflows -freeing your team from manual effort and reducing
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
                description: <>Web, data, automation and AI -one expert team covers the full range of Python use
                    cases, so you get coherent solutions instead of disconnected point tools.</>,
            },
            {
                id: 2, title: 'Performance & Scale', image: '/assets/services/Research-strategy.jpg',
                description: <>We architect for throughput and growth -async frameworks, efficient data access,
                    caching and autoscaling -so your Python systems stay fast as demand climbs.</>,
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
        ctaBody={<>From scalable APIs and data pipelines to automation and machine learning, Graham Sobiribo Paul delivers
            Python systems that perform and endure. Let&apos;s turn your toughest requirements into clean, reliable
            software.</>}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'APIs & Services Built', value: 120, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Ngozi Okafor', title: 'Head of Data, InsightLab', message: <>Graham Sobiribo Paul built our entire data platform in Python -pipelines, APIs and ML models. Reliable, well-tested and genuinely scalable. Our analysts finally trust the data.</>},
            {name: 'Yusuf Abdullahi', title: 'CTO, RouteWise', message: <>Their FastAPI back-end handles our peak traffic effortlessly. Clean architecture, great documentation, and they delivered exactly on time.</>},
            {name: 'Aisha Bello', title: 'Founder, ShopSense AI', message: <>The recommendation engine they built in Python lifted our conversion noticeably. They took us from notebook prototype to production-grade ML serving real users.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Data Engineering & Analytics',
                description: 'Build scalable data pipelines with Pandas and Airflow that ingest, transform and load data from multiple sources into analytics platforms.'
            },
            {
                id: 'vs2',
                title: 'Machine Learning & AI Systems',
                description: 'Deploy production machine learning models for prediction, classification and recommendation using scikit-learn, PyTorch and TensorFlow.'
            },
            {
                id: 'vs3',
                title: 'API Backends & Services',
                description: 'Engineer robust REST and GraphQL APIs with Django and FastAPI that power mobile apps, web frontends and third-party integrations at scale.'
            }
        ]}/>
);

export default PythonDevelopment;
