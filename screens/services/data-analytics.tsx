import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const DataAnalytics = () => (
    <ServicePageTemplate
        title={<>Data Analytics<br className="lg:block md:block hidden" />&amp; Engineering</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Turn raw data into competitive advantage—pipelines, warehouses, dashboards and ML models that surface the insights your business needs to act decisively."
        eyebrow="Data-driven decisions at every level"
        introHeading={<>From Raw Data<br className="lg:block md:block hidden" />To Real Decisions</>}
        introBody={[
            <>Data is only valuable when it is accurate, accessible and interpretable by the people who need
            to act on it. At Grey InfoTech we build the full data stack—ingestion pipelines, warehouses,
            transformation layers, analytical models and self-service dashboards—that turn fragmented data
            sources into a single source of truth your entire organisation can trust. Whether you are starting
            from spreadsheets or scaling a mature data platform, we meet you where you are.</>,
            <>Our data engineers combine modern tooling (dbt, Airbyte, Snowflake, BigQuery, Redshift) with
            strong data modelling and governance practices. We design schemas for analytical access patterns,
            implement row-level security, build CI pipelines for data models and establish data quality
            monitoring so issues are caught before they reach dashboards. The result is a data platform
            that your analysts love using and your leadership trusts for critical decisions.</>,
        ]}
        solutionsHeading={<>Data &amp; Analytics<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From data engineering foundations to executive dashboards and predictive models, Grey InfoTech builds the full data capability your organisation needs."
        solutions={[
            {
                id: '01', title: 'Data Engineering & Pipelines', target: 'DE',
                tags: ['Airbyte', 'Kafka', 'Spark', 'dbt', 'Airflow'],
                body: <>We design and build data pipelines that ingest from any source—APIs, databases, event
                streams, flat files—transform and validate the data, and load it into your analytical store.
                Pipelines are idempotent, observable and tested, with automated data quality checks at every
                stage to ensure what arrives in your warehouse is accurate and complete.</>,
            },
            {
                id: '02', title: 'Data Warehouse & Lakehouse', target: 'DW',
                tags: ['Snowflake', 'BigQuery', 'Redshift', 'Delta Lake', 'Iceberg'],
                body: <>We design dimensional models and star schemas optimised for analytical query patterns,
                implement partitioning and clustering strategies for cost-efficient queries, and set up
                role-based access control so sensitive data is protected. We work with Snowflake, BigQuery,
                Redshift and open lakehouse formats like Delta Lake and Apache Iceberg.</>,
            },
            {
                id: '03', title: 'Business Intelligence & Dashboards', target: 'BI',
                tags: ['Looker', 'Metabase', 'Tableau', 'Power BI', 'Superset'],
                body: <>We build executive dashboards and operational reports that put the right metrics in
                front of the right people at the right time. Our BI work covers semantic layer design,
                self-service analytics enablement, embedded analytics in product and white-labelled reporting
                portals. We ensure dashboards load fast, stay accurate and can be maintained without
                specialist help.</>,
            },
            {
                id: '04', title: 'Machine Learning & Predictive Analytics', target: 'ML',
                tags: ['Scikit-learn', 'TensorFlow', 'MLflow', 'Feature Store'],
                body: <>We build and productionise machine learning models for churn prediction, demand
                forecasting, recommendation engines, fraud detection and customer segmentation. Our ML
                engineering practice covers feature engineering, model training, experiment tracking with
                MLflow, model serving and drift monitoring so models remain accurate after deployment.</>,
            },
            {
                id: '05', title: 'Real-Time Analytics', target: 'RT',
                tags: ['Kafka', 'Flink', 'ClickHouse', 'Materialize'],
                body: <>Some decisions cannot wait for overnight batch jobs. We build real-time analytics
                systems using Kafka Streams or Apache Flink for event processing, with sub-second query
                latency in ClickHouse or Materialize. Use cases include live fraud scoring, operational
                dashboards, real-time personalisation and IoT telemetry analysis.</>,
            },
            {
                id: '06', title: 'Data Governance & Quality', target: 'DG',
                tags: ['Data Catalog', 'Lineage', 'Great Expectations', 'Monte Carlo'],
                body: <>A data platform without governance degrades over time. We implement data catalogues,
                lineage tracking, automated quality tests using Great Expectations, and anomaly detection
                with tools like Monte Carlo. We also establish data ownership frameworks and documentation
                standards so every dataset has a clear owner and definition that the whole organisation
                understands.</>,
            },
        ]}
        ctaHeading={<>Your data,<br className="lg:block md:block hidden" />finally working</>}
        ctaBody="Stop making decisions based on gut feel or broken spreadsheets. Grey InfoTech builds the data platform that makes every team in your organisation smarter."
        faqs={[
            {q: 'We have data in many different places—where do we start?', a: 'We start with a data audit to map your sources, quality levels and analytical needs. From there we design an ingestion and warehousing plan that consolidates data progressively.'},
            {q: 'Do you work with small datasets or only at scale?', a: 'Both. We build right-sized solutions—no need for Spark when Postgres and dbt will do the job. We scale the tooling to your actual data volume.'},
            {q: 'Can you build dashboards for non-technical stakeholders?', a: 'Absolutely. Clear, self-service dashboards for business users are central to how we work. We train users and write documentation so the BI layer stays useful after we exit.'},
            {q: 'Do you help with GDPR data handling requirements?', a: 'Yes. We implement data retention policies, PII masking, right-to-erasure pipelines and audit logs as part of every data platform engagement.'},
        ]}
    />
);

export default DataAnalytics;
