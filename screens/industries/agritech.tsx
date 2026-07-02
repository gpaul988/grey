import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const AgriTechIndustry = () => (
    <ServicePageTemplate
        title={<>AgriTech &amp;<br className="lg:block md:block hidden" />Agriculture</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Farm management platforms, agricultural marketplaces, supply chain traceability and precision agriculture tools that increase yields, reduce waste and connect farmers to markets."
        eyebrow="AgriTech solutions for food-secure futures"
        introHeading={<>Agriculture<br className="lg:block md:block hidden" />Reimagined</>}
        introBody={[
            <>Agriculture is the foundation of African economies, and technology has the power to transform
            productivity across the entire value chain—from seed selection and soil management through
            to harvest, storage, processing and market access. At Grey InfoTech we build agricultural
            technology platforms that solve the real problems facing African farmers: market fragmentation,
            input access, weather risk, post-harvest losses and financial exclusion. We design for the
            mobile-first, often-offline reality of smallholder agriculture.</>,
            <>Our AgriTech practice has experience across the agricultural value chain: farm management apps,
            marketplace platforms connecting farmers to buyers, supply chain traceability systems for
            export compliance, weather and advisory services, and financial technology that unlocks credit
            and insurance for smallholder farmers. We build on USSD and low-bandwidth web interfaces
            alongside modern apps, ensuring technology reaches farmers in areas with limited connectivity
            and low-spec devices.</>,
        ]}
        solutionsHeading={<>AgriTech<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From farm management tools to agricultural marketplaces and supply chain traceability, Grey InfoTech builds technology that works for farmers and the businesses that serve them."
        solutions={[
            {
                id: '01', title: 'Farm Management Platforms', target: 'FM',
                tags: ['Crop Monitoring', 'Input Tracking', 'Harvest Records', 'Mobile', 'USSD'],
                body: <>We build farm management applications that help farmers track planting schedules,
                input usage, crop health observations and harvest records. Mobile-first with offline
                capability and USSD fallback for feature phone users, platforms integrate with weather
                APIs, satellite imagery and advisory services to provide actionable guidance to farmers
                at the right moment in the growing season.</>,
            },
            {
                id: '02', title: 'Agricultural Marketplaces', target: 'AM',
                tags: ['Farmer-Buyer', 'Price Discovery', 'Escrow', 'Logistics'],
                body: <>Market fragmentation and information asymmetry cost African farmers significant
                income. We build agricultural marketplaces that connect farmers directly to buyers—
                processors, exporters, retailers and consumers—with real-time price discovery, quality
                grading, escrow payment and logistics coordination. Marketplace design accounts for
                literacy levels, language diversity and the transaction patterns of agricultural trade.</>,
            },
            {
                id: '03', title: 'Supply Chain Traceability', target: 'ST',
                tags: ['Blockchain', 'QR Code', 'Export Compliance', 'EUDR', 'Carbon'],
                body: <>Global buyers increasingly require traceability to farm level for compliance with
                regulations like the EU Deforestation Regulation. We build traceability systems that
                capture geolocation data, farm registration, purchase records and processing steps,
                generating the compliance documentation required for export markets. Blockchain anchoring
                provides immutable proof-of-provenance for premium market access.</>,
            },
            {
                id: '04', title: 'Precision Agriculture & IoT', target: 'PA',
                tags: ['Soil Sensors', 'Drones', 'Remote Sensing', 'Irrigation', 'NDVI'],
                body: <>Precision agriculture uses sensor data to optimise inputs and maximise yield. We
                build data platforms that ingest soil sensor readings, drone imagery, NDVI satellite data
                and weather station telemetry—providing farmers and agronomists with variable-rate
                application recommendations for fertiliser, irrigation and crop protection. IoT
                dashboards enable remote monitoring of large commercial farm operations.</>,
            },
            {
                id: '05', title: 'Agri-Finance & Insurance', target: 'AF',
                tags: ['Input Credit', 'Crop Insurance', 'Digital Wallet', 'Index Insurance'],
                body: <>Financial services unlock agricultural productivity. We build platforms for
                digital input credit disbursement, crop insurance claim management, index insurance
                products triggered by weather data and digital wallet infrastructure for farmer
                payments. KYC/identity verification, loan portfolio management and agent banking
                interfaces are standard components of our agri-finance platforms.</>,
            },
            {
                id: '06', title: 'Advisory & Extension Services', target: 'AE',
                tags: ['SMS/USSD', 'Chatbot', 'Agronomist Network', 'Weather Alerts'],
                body: <>Digital extension services close the knowledge gap between agronomists and smallholder
                farmers at scale. We build advisory platforms that deliver localised, crop-specific guidance
                via SMS, USSD, WhatsApp chatbot and app—covering planting calendars, pest and disease alerts,
                market prices and weather warnings. Agronomist management tools support field teams servicing
                large farmer networks.</>,
            },
        ]}
        ctaHeading={<>Technology that<br className="lg:block md:block hidden" />feeds the future</>}
        ctaBody="Agriculture is Africa's greatest economic opportunity. Grey InfoTech builds the technology that makes the food system more productive, transparent and equitable for every participant."/>
);

export default AgriTechIndustry;

