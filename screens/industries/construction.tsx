import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const ConstructionIndustry = () => (
    <ServicePageTemplate
        title={<>Construction &amp;<br className="lg:block md:block hidden" />PropTech</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Construction management platforms, PropTech solutions, BIM integration and real estate technology that modernise project delivery and property transactions across Africa."
        eyebrow="Construction and PropTech for modern development"
        introHeading={<>Building the<br className="lg:block md:block hidden" />Digital Infrastructure</>}
        introBody={[
            <>Construction and real estate are among the largest sectors of the African economy and among
            the least digitised. Grey InfoTech builds technology that changes that -project management
            platforms that give developers and contractors real-time visibility of progress, cost and
            risk; PropTech solutions that streamline property search, transaction and management; and
            the data infrastructure that helps planners, investors and developers make better decisions.
            We work with developers, contractors, quantity surveyors, property managers and government
            planning agencies.</>,
            <>Our construction and PropTech practice is grounded in understanding how projects actually fail -
            poor information flow, slow approval processes, fragmented subcontractor coordination and
            inadequate defect tracking. We build solutions that address these root causes: mobile-first
            field tools that work on site, approval workflows that keep projects moving and data
            platforms that give the whole project team a single version of the truth. For PropTech
            we design for Nigerian land registry integration, Naira and FX transactions and the specific
            patterns of the housing market.</>,
        ]}
        solutionsHeading={<>Construction &amp; PropTech<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From construction project management to property marketplaces and smart building technology, Grey InfoTech builds digital infrastructure for the built environment."
        solutions={[
            {
                id: '01', title: 'Construction Project Management', target: 'CP',
                tags: ['Programme', 'Cost Control', 'RFIs', 'Site Reports', 'Mobile'],
                body: <>We build construction project management platforms that give project owners,
                contractors and consultants real-time visibility of programme, budget and quality.
                Mobile field tools capture daily site reports, RFIs, issue logs and progress photos
                without requiring internet connectivity, syncing when connection is available. Approval
                workflows, subcontractor management and document control are integrated into a single
                platform that replaces scattered WhatsApp groups and spreadsheets.</>,
            },
            {
                id: '02', title: 'Property Marketplace & Search', target: 'PM',
                tags: ['Listing Platform', 'Virtual Tours', 'Mortgage Calculator', 'Agent Tools'],
                body: <>We build property search and transaction platforms tailored to African markets -
                advanced search and filtering, virtual tour integration, mortgage calculator with local
                bank product data, agent management portals and developer project microsites. SEO-optimised
                listing platforms with rich media support drive organic discovery and lead generation
                for developers and agents.</>,
            },
            {
                id: '03', title: 'Property Management Systems', target: 'PMS',
                tags: ['Tenancy', 'Rent Collection', 'Maintenance', 'Leases', 'Statements'],
                body: <>Property managers overseeing multiple assets need efficient tools for tenancy
                management, rent collection, maintenance request tracking, lease renewal and financial
                reporting. We build property management platforms with tenant portals for self-service
                and automated rent reminders, payment processing with Paystack/Flutterwave, maintenance
                job assignment and real-time financial statements for property owners.</>,
            },
            {
                id: '04', title: 'BIM & Digital Twins', target: 'BIM',
                tags: ['IFC', 'Revit Integration', 'Asset Management', 'Clash Detection'],
                body: <>Building Information Modelling transforms how projects are designed and operated.
                We build BIM integration platforms that connect design data from Revit and ArchiCAD to
                construction workflows and operations asset management. Digital twin solutions carry
                BIM data into the building&apos;s operational life, enabling facilities teams to manage
                assets with full design-intent context and maintenance history.</>,
            },
            {
                id: '05', title: 'Land Registry & Title Management', target: 'LR',
                tags: ['Title Verification', 'C of O', 'Survey Plans', 'Digital Register'],
                body: <>Land title uncertainty is one of the biggest barriers to property investment in
                Nigeria. We build title verification platforms that integrate with state land registry
                databases, provide Certificate of Occupancy validation, link survey plans to cadastral
                coordinates and provide title insurance underwriting data. For state governments we
                build digital land registry systems that replace manual records with searchable,
                auditable digital archives.</>,
            },
            {
                id: '06', title: 'Smart Building & Facility Management', target: 'SB',
                tags: ['BMS Integration', 'Energy', 'Access Control', 'Predictive Maintenance'],
                body: <>Smart buildings use sensor data and automation to reduce energy costs and improve
                occupant experience. We build facility management platforms that integrate with building
                management systems, process IoT sensor data from HVAC, lighting and access control,
                generate energy consumption reports and implement predictive maintenance alerts based
                on equipment telemetry. Dashboard access for property managers, FM teams and tenants
                reduces operational costs significantly.</>,
            },
        ]}
        ctaHeading={<>Build smarter.<br className="lg:block md:block hidden" />Develop faster.</>}
        ctaBody="The construction and property sector is overdue for digital transformation. Grey InfoTech builds the platforms that make African development more efficient, transparent and investable."/>
);

export default ConstructionIndustry;

