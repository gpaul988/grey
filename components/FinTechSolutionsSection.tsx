'use client';

import React from 'react';
import { FxStickyScrollSection } from '@/components/futuristic/fx';

export const finTechSolutions = [
    {
        id: '01',
        title: 'Payments & Digital Wallets',
        target: 'PDW',
        tags: ['Payment Infrastructure', 'Wallet UX', 'Secure Transactions'],
        body: (
            <div>
                <p>We craft payment ecosystems with refined onboarding flows, real-time processing, and security-first designs that help users move money confidently. These platforms balance regulatory compliance, smart fraud controls, and intuitive financial experiences across web and mobile.</p>
                <p className="mt-3">From merchant platforms to digital wallets, the experience is built to support growth, reduce friction, and create lasting trust in every transaction.</p>
            </div>
        ),
        metrics: [
            {
                label: 'Deployment',
                value: '4–8 weeks',
                description: 'Fast MVP to launch-ready rollout'
            },
            {label: 'Focus', value: '99.9%', description: 'Reliability-first architecture'}
        ]
    },
    {
        id: '02',
        title: 'Blockchain & Security',
        target: 'BC',
        tags: ['Distributed Trust', 'Fraud Prevention', 'Immutable Records'],
        body: (
            <div>
                <p>Blockchain-enabled fintech products create transparent, tamper-resistant digital records that strengthen compliance and customer confidence. We design these systems around privacy, auditability, and seamless integration with existing financial workflows.</p>
                <p className="mt-3">Whether for tokenized assets, secure settlements, or identity verification, our approach keeps the experience elegant and operationally resilient.</p>
            </div>
        ),
        metrics: [
            {label: 'Security', value: 'Zero-Trust', description: 'Policy-led system design'},
            {label: 'Coverage', value: '24/7', description: 'Monitoring-ready operations'}
        ]
    },
    {
        id: '03',
        title: 'Wealth & Asset Management',
        target: 'WM',
        tags: ['Portfolio Platforms', 'Insight Dashboards', 'Advisor Tools'],
        body: (
            <div>
                <p>We build wealth management systems that turn complex financial data into clear, actionable digital experiences. These solutions combine high-clarity dashboards, secure workflows, and mobile-ready access for advisors and clients alike.</p>
                <p className="mt-3">The result is a polished experience that improves visibility, elevates engagement, and supports better decision-making at every stage of the client journey.</p>
            </div>
        ),
        metrics: [
            {
                label: 'Experience',
                value: 'Realtime',
                description: 'Live portfolio intelligence'
            },
            {label: 'Adoption', value: '+35%', description: 'Client engagement uplift'}
        ]
    },
    {
        id: '04',
        title: 'Investment Platforms',
        target: 'IM',
        tags: ['Analytics', 'Performance Tracking', 'Reporting Automation'],
        body: (
            <div>
                <p>Investment products need speed, accuracy, and traceability. We deliver platforms that combine modern analytics, portfolio visibility, and reporting automation so firms can respond faster and act with confidence.</p>
                <p className="mt-3">Every layer of the experience is designed to keep decision-makers aligned with market reality, compliance expectations, and client needs.</p>
            </div>
        ),
        metrics: [
            {label: 'Visibility', value: 'Live', description: 'Performance monitoring'},
            {label: 'Ops', value: 'Auto', description: 'Reporting workflows'}
        ]
    },
    {
        id: '05',
        title: 'Custom FinTech Applications',
        target: 'CFTA',
        tags: ['Tailored Platforms', 'Risk Controls', 'Embedded Finance'],
        body: (
            <div>
                <p>From lending journeys to financial operations suites, we create bespoke applications that solve specific business problems without compromising user experience. These products are built with thoughtful architecture and future-ready integrations.</p>
                <p className="mt-3">The result is a highly functional platform that supports growth, innovation, and a consistent experience across new product lines.</p>
            </div>
        ),
        metrics: [
            {label: 'Scope', value: 'Custom', description: 'Business-specific builds'},
            {label: 'Speed', value: 'Rapid', description: 'Iterative delivery'}
        ]
    },
    {
        id: '06',
        title: 'Accounting & Compliance Systems',
        target: 'AIS',
        tags: ['ERP Connectors', 'Audit Ready', 'Workflow Automation'],
        body: (
            <div>
                <p>Modern finance operations require tools that connect reporting, compliance, and performance in one coherent experience. We build systems that simplify core workflows and keep every process accountable.</p>
                <p className="mt-3">This enables teams to reduce friction, improve visibility, and scale operations with greater confidence and precision.</p>
            </div>
        ),
        metrics: [
            {label: 'Integration', value: 'ERP', description: 'Connected ecosystem support'},
            {label: 'Governance', value: 'Audit', description: 'Ready reporting systems'}
        ]
    },
    {
        id: '07',
        title: 'Insurance',
        target: 'IS',
        tags: ['Insurance Technology', 'Claims Processing', 'Fraud Prevention'],
        body: (
            <div>
                <p>FinTech software for insurance transforms key functions such as underwriting, claims processing, fraud prevention, and billing by automating and optimizing these workflows.</p>
                <p className="mt-3">This technology enables insurance companies to streamline operations, boost productivity, reduce errors, and deliver faster, more accurate services—ultimately enhancing customer satisfaction.</p>
            </div>
        ),
        metrics: [
            {label: 'Processing', value: 'Automated', description: 'Claims workflow efficiency'},
            {label: 'Accuracy', value: '99.8%', description: 'Error reduction'}
        ]
    },
    {
        id: '08',
        title: 'Personal Finance',
        target: 'PF',
        tags: ['Budget Management', 'Mobile Payments', 'Financial Planning'],
        body: (
            <div>
                <p>Personal finance software solutions deliver a broad range of tools designed to simplify budget management, facilitate mobile payments, and enable seamless online banking and financial planning.</p>
                <p className="mt-3">These platforms empower users with granular control through advanced features like expense tracking, savings goal analysis, and smart budgeting recommendations.</p>
            </div>
        ),
        metrics: [
            {label: 'Engagement', value: 'Real-time', description: 'Financial monitoring'},
            {label: 'Savings', value: '+40%', description: 'User goal achievement'}
        ]
    },
    {
        id: '09',
        title: 'Background Check Software',
        target: 'BCS',
        tags: ['Identity Verification', 'Criminal Screening', 'Compliance'],
        body: (
            <div>
                <p>Background check software verifies both personal and organisational information, helping businesses reduce the risk of fraud, identity theft, and regulatory non-compliance.</p>
                <p className="mt-3">By automating these checks, financial institutions can make informed decisions, streamline onboarding processes, and maintain the integrity and security of their operations.</p>
            </div>
        ),
        metrics: [
            {label: 'Verification', value: 'Instant', description: 'Real-time identity checks'},
            {label: 'Coverage', value: '150+', description: 'Data sources'}
        ]
    },
    {
        id: '10',
        title: 'Financial Reporting Software',
        target: 'FRS',
        tags: ['Automated Reporting', 'ERP Integration', 'Compliance'],
        body: (
            <div>
                <p>Automated financial reporting software facilitates precise, real-time analysis of financial transactions while significantly reducing manual effort and minimizing human error.</p>
                <p className="mt-3">By integrating with tools such as QuickBooks and Xero, this software improves operational efficiency, accelerates reporting cycles, and supports data-driven decision-making across organizations.</p>
            </div>
        ),
        metrics: [
            {label: 'Accuracy', value: '100%', description: 'Real-time data sync'},
            {label: 'Speed', value: '10x', description: 'Faster report generation'}
        ]
    },
    {
        id: '11',
        title: 'Financial Calculators',
        target: 'FC',
        tags: ['Mortgage Calc', 'Investment Tools', 'Retirement Planning'],
        body: (
            <div>
                <p>Financial calculators play a vital role in both personal and business financial planning by offering precise and easy-to-use tools for calculating mortgages, retirement savings, investments, loans, and compound interest.</p>
                <p className="mt-3">By enabling users to make informed decisions quickly, these calculators improve financial accuracy, support strategic planning, and enhance customer engagement.</p>
            </div>
        ),
        metrics: [
            {label: 'Calculators', value: '25+', description: 'Comprehensive tools'},
            {label: 'Accuracy', value: 'Industry', description: 'Standard precision'}
        ]
    }
];

interface FinTechFuturisticProps {
    isDayTime: boolean;
    activeId: string;
    onNavClickAction: (id: string) => void;
}

export function FinTechSolutionsSection({ isDayTime, activeId, onNavClickAction }: FinTechFuturisticProps) {
    return (
        <FxStickyScrollSection
            day={isDayTime}
            heading={<>FinTech<br/>Solutions</>}
            intro="We design and build fintech products that are secure, scalable, and tailored to the realities of modern financial operations. From digital wallets and payments to compliance-driven platforms and embedded analytics, each solution is engineered to drive trust, performance, and long-term growth."
            navLabel="All Solutions"
            activeId={activeId}
            onNavClickAction={onNavClickAction}
            colorScheme="cyan"
            items={finTechSolutions}
        />
    );
}

export function FinTechSolutionsGrid() {
    return null;
}
