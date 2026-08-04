/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, {useEffect, useRef, useState} from 'react';
import {motion} from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import '@/app/globals.css';
import {useIsDayTime} from '../../components/useIsDayTime';

import FuturisticIndustryLayout from '@/components/futuristic/FuturisticIndustryLayout';

import {FxBackground, FxChip, FxReveal, FxButton, FxHoloCard, FxStickyScrollSection, FxFrame} from '@/components/futuristic/fx';

const testimonials = [
    {
        name: "Isabel MartÃ­nez",
        title: "UX Lead, TaskFlow Inc.",
        message: (
            <>
                Grey InfoTech delivered a clean, modern web design that perfectly aligns with our brand and enhances
                user experience. Their design team was creative, attentive, and always open to feedback. Our product now
                looks as polished as it performs.
            </>
        ),
    },
    {
        name: "Sofia Nieminen",
        title: "Director of Digital Experience, PayCore Solutions",
        message: (
            <>
                Grey InfoTech completely reimagined our website with a sleek, user-centric design that reinforces our
                credibility in the fintech space. The process was collaborative and efficient, and the end result is
                something weâ€™re truly proud to show clients and partners.
            </>
        ),
    },
    {
        name: "Jonathan Lee",
        title: "VP of Product, PropEdge Technologies",
        message: (
            <>
                We came to Grey InfoTech with a cluttered and outdated interface. They gave our platform a fresh,
                intuitive design that not only looks great but also improved engagement and usability. Their work speaks
                for itself - sharp, professional, and conversion-focused.
            </>
        ),
    },
];

const services = [
    {
        id: "01",
        title: "Careers Websites",
        target: "CW",
        tags: ["Careers Website", "Candidate Attraction", "Online Hiring Strategy"],
        body: (
            <div>
                <p>
                    Your careers website is a vital component of your talent acquisition strategy, serving as a key
                    touchpoint for prospective candidates. Statistics show that nearly every successful hire will visit
                    your site at least once. At Grey InfoTech, we focus on creating recruitment websites that are
                    professionally designed, fully optimised for speed, accessibility, and mobile responsiveness,
                    ensuring a seamless user experience across all devices.
                </p>
                <p className="mt-3">
                    By aligning design, content, and functionality with your employer brand and hiring objectives, we
                    help you attract, engage, and convert top talent more effectively.
                </p>
            </div>
        ),
        metrics: [
            {label: 'Mobile Ready', value: '100%', description: 'Full responsive design'},
            {label: 'Load Time', value: '<2s', description: 'Optimised performance'},
            {label: 'Conversion', value: '35%+', description: 'Increased applications'},
        ],
        deliverables: ['Custom design', 'Job listings integration', 'Application portal', 'Mobile optimised', 'SEO setup', 'Analytics tracking'],
        timeline: '6â€“10 weeks',
        engagement: 'Fixed-price or Dedicated Team',
    },
    {
        id: "02",
        title: "Customisable HR Portal",
        target: "CHRP",
        tags: ["Branded HR Portals", "Training and Development", "Workforce Engagement"],
        body: (
            <div>
                <p>
                    Tailored to reflect your brand's identity and culture, our custom HR portals provide a centralised,
                    user-friendly hub where employees can efficiently access and manage essential HR functions such as
                    benefits administration, training resources, performance evaluations, leave management, and internal
                    communications.
                </p>
                <p className="mt-3">
                    This seamless integration not only improves employee engagement and productivity but also reinforces
                    consistency across your digital workplace experience.
                </p>
            </div>
        ),
        metrics: [
            {label: 'User Engagement', value: '85%+', description: 'Active monthly usage'},
            {label: 'Self-Service Rate', value: '70%', description: 'Reduced HR workload'},
            {label: 'Satisfaction', value: '4.8/5', description: 'Employee feedback'},
        ],
        deliverables: ['Custom portal design', 'Multi-module setup', 'SSO integration', 'Training materials', 'Support documentation', 'Change management'],
        timeline: '10â€“14 weeks',
        engagement: 'Agile sprints or Dedicated Team',
    },
    {
        id: "03",
        title: "HR Analytics & Reporting",
        target: "HRAR",
        tags: ["Data-Driven Insights", "HR Analytics", "Performance Metrics"],
        body: (
            <div>
                <p>
                    Leverage data-driven insights to drive smarter, more strategic HR decision-making across your
                    organisation. Our solutions provide robust analytics and fully customisable reporting tools,
                    enabling you to track and analyse critical HR metrics such as employee performance, engagement
                    levels, retention trends, recruitment efficiency, and workforce productivity.
                </p>
                <p className="mt-3">
                    By turning data into actionable intelligence, we help you identify areas for improvement, optimise
                    resource allocation, and align your HR initiatives with broader business goals for long-term
                    success.
                </p>
            </div>
        ),
        metrics: [
            {label: 'Dashboards', value: '50+', description: 'Pre-built analytics'},
            {label: 'Data Accuracy', value: '99.8%', description: 'Real-time insights'},
            {label: 'ROI Impact', value: '2.5x', description: 'Decision efficiency'},
        ],
        deliverables: ['Custom dashboards', 'Real-time reporting', 'Data visualisation', 'Predictive analytics', 'Export capabilities', 'Training program'],
        timeline: '8â€“12 weeks',
        engagement: 'Fixed-price, Time & Materials, or Team',
    },
    {
        id: "04",
        title: "Automated Workflows & Processes",
        target: "AWP",
        tags: ["HR Automation", "Onboarding Solutions", "Increased Accuracy"],
        body: (
            <div>
                <p>
                    Streamline your HR operations through intelligent automation that enhances efficiency across the
                    entire employee lifecycle. From onboarding and compliance management to performance reviews and
                    offboarding, our technology simplifies complex processes, eliminates repetitive manual tasks, and
                    ensures greater accuracy and consistency.
                </p>
                <p className="mt-3">
                    This not only reduces administrative overhead but also frees up your HR team to focus on strategic
                    initiatives that drive employee satisfaction and organisational growth.
                </p>
            </div>
        ),
        metrics: [
            {label: 'Time Saved', value: '60%', description: 'Process efficiency'},
            {label: 'Error Rate', value: '< 0.5%', description: 'Automation accuracy'},
            {label: 'Coverage', value: '95%', description: 'Process automation'},
        ],
        deliverables: ['Workflow design', 'Process mapping', 'Automation setup', 'Compliance integration', 'Testing & QA', 'Go-live support'],
        timeline: '8â€“12 weeks',
        engagement: 'Dedicated Team or Time & Materials',
    },
    {
        id: "05",
        title: "Engagement & Recruiting Tools",
        target: "ERT",
        tags: ["Talent Acquisition", "Talent Management", "Applicant Tracking Systems"],
        body: (
            <div>
                <p>
                    From advanced applicant tracking systems that simplify and accelerate the recruitment process to
                    employee engagement platforms that foster a connected and motivated workplace culture, our HR
                    technology solutions are designed to enhance every stage of the employee journey.
                </p>
                <p className="mt-3">
                    These tools not only improve hiring efficiency and candidate experience but also support ongoing
                    engagement, retention, and performance across your organisation.
                </p>
            </div>
        ),
        metrics: [
            {label: 'Hiring Speed', value: '40%', description: 'Faster recruitment'},
            {label: 'ATS Adoption', value: '92%', description: 'Team utilisation'},
            {label: 'Retention', value: '45%+', description: 'Engagement impact'},
        ],
        deliverables: ['ATS implementation', 'Engagement platform', 'Custom workflows', 'Integration setup', 'User training', 'Support plan'],
        timeline: '10â€“14 weeks',
        engagement: 'Dedicated Team or Agile sprints',
    },
    {
        id: "06",
        title: "Talent Acquisition",
        target: "TA",
        tags: ["Recruitment Strategies", "Dynamic Work Environment", "Cutting-Edge Tools"],
        body: (
            <div>
                <p>
                    Talent acquisition is a strategic function focused not only on sourcing qualified candidates but on
                    identifying individuals whose capabilities, values, and ambitions align with your organisation's
                    vision and culture. At Grey InfoTech, we develop and execute tailored recruitment strategies that
                    combine industry expertise, technology-driven sourcing tools, and data insights.
                </p>
                <p className="mt-3">
                    Our approach ensures you secure talent that contributes to long-term business success, supports
                    innovation, and drives meaningful growth in competitive and evolving markets.
                </p>
            </div>
        ),
        metrics: [
            {label: 'Hire Quality', value: '88%', description: 'Long-term retention'},
            {label: 'Cost per Hire', value: '-45%', description: 'Efficiency gains'},
            {label: 'Time to Fill', value: '21 days', description: 'Average reduction'},
        ],
        deliverables: ['Talent pipeline', 'Sourcing strategy', 'Candidate screening', 'Assessment tools', 'Employer branding', 'Analytics reports'],
        timeline: '12â€“16 weeks',
        engagement: 'Dedicated Recruitment Team',
    },
];

const carouselLogos = [
    {name: "Broadbean", light: "/assets/hr/broadbean1.svg", dark: "/assets/hr/broadbean.svg"},
    {name: "Bullhorn", light: "/assets/hr/bullhorn1.svg", dark: "/assets/hr/bullhorn.svg"},
    {name: "Glassdoor", light: "/assets/hr/glassdoor1.svg", dark: "/assets/hr/glassdoor.svg"},
    {name: "Google", light: "/assets/hr/google1.svg", dark: "/assets/hr/google.svg"},
    {name: "Hubspot", light: "/assets/hr/hubspot1.svg", dark: "/assets/hr/hubspot.svg"},
    {name: "Indeed", light: "/assets/hr/indeed1.svg", dark: "/assets/hr/indeed.svg"},
    {name: "JobAdder", light: "/assets/hr/jobadder1.svg", dark: "/assets/hr/jobadder.svg"},
    {name: "JobberMan", light: "/assets/hr/jobberman1.svg", dark: "/assets/hr/jobberman.svg"},
    {name: "Salesforce", light: "/assets/hr/salesforce1.svg", dark: "/assets/hr/salesforce.svg"},
    {name: "Workday", light: "/assets/hr/workday1.svg", dark: "/assets/hr/workday.svg"},
    {name: "Workforce", light: "/assets/hr/workforce1.svg", dark: "/assets/hr/workforce.svg"},
];

const benefits = [
    {
        id: "expertise",
        iconLight: "/assets/hr/icon/wap1.svg",
        iconDark: "/assets/hr/icon/wap.svg",
        alt: "Business-Oriented Development",
        title: "Expertise in HR Tech",
        feature: "HR Domain Expertise",
        description:
            "With years of experience in HR technology, our team brings a comprehensive understanding of human resource processes, compliance standards, and workforce dynamics. We stay at the forefront of industry advancements, leveraging emerging technologies to design and implement solutions that streamline HR operations, improve employee experiences, and support strategic business goals.",
    },
    {
        id: "customisation",
        iconLight: "/assets/hr/icon/tap1.svg",
        iconDark: "/assets/hr/icon/tap.svg",
        alt: "Customisation and Flexibility",
        title: "Customisation and Flexibility",
        feature: "Tailored Integrations",
        description:
            "We believe in delivering solutions tailored to your specific business needs, ensuring every service we provide is adaptable, scalable, and aligned with your corporate environment. Our approach prioritises flexibility and strategic alignment, allowing us to create value-driven HR technology solutions that evolve with your organisationâ€™s goals and workforce requirements.",
    },
    {
        id: "user-centric",
        iconLight: "/assets/hr/icon/sc1.svg",
        iconDark: "/assets/hr/icon/sc.svg",
        alt: "User-centric Design",
        title: "User-centric Design",
        feature: "Intuitive UX",
        description:
            "Our emphasis on user experience ensures that both employees and HR managers benefit from intuitive, efficient, and accessible solutions. By designing with usability in mind, we help streamline daily HR tasks, improve engagement, and enhance overall productivity across your organisation.",
    },
    {
        id: "continuous-support-development",
        iconLight: "/assets/hr/icon/sf1.svg",
        iconDark: "/assets/hr/icon/sf.svg",
        alt: "Continuous support and development",
        title: "Continuous Support and Development",
        feature: "Ongoing SLA-backed Support",
        description:
            "We are committed to continuous improvement, providing ongoing support, regular updates, and enhancements to ensure your HR technology remains secure, scalable, and aligned with evolving business needs and industry standards.",
    },
];

const benefitOutcomes: Record<string, {impact: string; time: string; compliance: string}> = {
    expertise: {impact: '+30% Hiring Efficiency', time: '4â€“6 wks', compliance: 'GDPR-ready'},
    customisation: {impact: '40% faster integrations', time: '6â€“10 wks', compliance: 'SAML/SSO'},
    'user-centric': {impact: '+25% Adoption', time: '3â€“6 wks', compliance: 'WCAG AA'},
    'continuous-support-development': {impact: '99.9% uptime', time: 'Ongoing', compliance: 'SLA-backed'},
};

const integrations = [
    {
        id: "bullhorn",
        title: "Bullhorn",
        alt: "Bullhorn",
        logoLight: "/assets/hr/bullhorn1.svg",
        logoDark: "/assets/hr/bullhorn.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Bullhorn is a cloud-based CRM and operations platform tailored for the staffing industry, offering streamlined recruitment management. Our integration with Bullhorn enables efficient handling of the entire recruitment lifecycle -from candidate sourcing and tracking to placement -seamlessly embedding its powerful features into your HR system. This integration enhances your staffing operations by improving workflow automation, candidate engagement, and data accuracy, ultimately boosting recruitment efficiency and outcomes.",
    },
    {
        id: "broadbean",
        title: "Broadbean",
        alt: "Broadbean",
        logoLight: "/assets/hr/broadbean1.svg",
        logoDark: "/assets/hr/broadbean.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Broadbean is a robust platform designed for distributing job postings and sourcing candidates across diverse channels. By integrating Broadbean with your HR system, you streamline the process of publishing vacancies, ensuring broad reach to targeted talent pools. This integration also enables comprehensive tracking and analysis of each recruitment channelâ€™s performance, allowing you to optimise your hiring strategy for maximum efficiency and impact.",
    },
    {
        id: "hubspot",
        title: "HubSpot",
        alt: "HubSpot",
        logoLight: "/assets/hr/hubspot1.svg",
        logoDark: "/assets/hr/hubspot.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "HubSpot, widely recognized for its inbound marketing, sales, and service platforms, plays a valuable role in HR management as well. Our integration with HubSpot enables streamlined management of employee and candidate engagement by leveraging automated email campaigns, personalized communication workflows, and in-depth analytics on candidate behavior. These capabilities empower your HR teams to enhance recruitment outreach, improve candidate nurturing, and make data-driven decisions that optimize overall talent acquisition and retention strategies.",
    },
    {
        id: "salesforce",
        title: "Salesforce",
        alt: "Salesforce",
        logoLight: "/assets/hr/salesforce1.svg",
        logoDark: "/assets/hr/salesforce.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Salesforce, best known for its customer relationship management capabilities, also provides powerful features that support HR functions. By integrating Salesforce with your HR system, you can streamline employee data management, improve internal communication workflows, and leverage advanced analytics to gain deeper insights into workforce performance. This integration facilitates more informed, data-driven HR decisions, enhances employee engagement, and drives operational efficiency across your organisation.",
    },
    {
        id: "jobadder",
        title: "Job Adder",
        alt: "Job Adder",
        logoLight: "/assets/hr/jobadder1.svg",
        logoDark: "/assets/hr/jobadder.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Job Adder is a user-friendly, comprehensive recruitment platform designed to simplify hiring workflows. Integrating Job Adder streamlines applicant tracking, job order management, and candidate relationship maintenance, automating key recruitment tasks. This integration enhances efficiency, reduces administrative burdens, and ensures a smoother, more effective hiring process aligned with your business goals.",
    },
    {
        id: "google",
        title: "Google for Jobs",
        alt: "Google",
        logoLight: "/assets/hr/google1.svg",
        logoDark: "/assets/hr/google.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Google for Jobs is an integrated job search feature within Google Search that significantly enhances job visibility. Our solutions optimise your job listings to comply with Google for Jobs standards, ensuring your vacancies are prominently displayed to relevant candidates. This increased visibility drives higher quality applicant traffic, helping you attract top talent efficiently and effectively.",
    },
    {
        id: "workday",
        title: "Workday ATS",
        alt: "Workday ATS",
        logoLight: "/assets/hr/workday1.svg",
        logoDark: "/assets/hr/workday.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Workday Applicant Tracking System, a component of Workdayâ€™s comprehensive human capital management suite, offers seamless applicant tracking, job posting management, and recruitment data analysis. Integrating Workday ATS streamlines your hiring process, ensuring efficiency and cohesion from initial job posting through to candidate selection and onboarding, thereby enhancing overall recruitment effectiveness.",
    },
    {
        id: "indeed",
        title: "Indeed",
        alt: "Indeed",
        logoLight: "/assets/hr/indeed1.svg",
        logoDark: "/assets/hr/indeed.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Indeed is a leading global employment search engine that aggregates job listings from numerous sources. Integrating Indeed into your HR system significantly broadens the reach of your job postings, connecting you with a worldwide talent pool. This integration leverages advanced search capabilities for both employers and candidates, enhancing your recruitment efforts by attracting diverse and qualified applicants efficiently.",
    },
    {
        id: "glassdoor",
        title: "Glassdoor",
        alt: "Glassdoor",
        logoLight: "/assets/hr/glassdoor1.svg",
        logoDark: "/assets/hr/glassdoor.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Glassdoor is a premier global platform that provides company reviews, salary insights, and job listings from employees and employers worldwide. Integrating Glassdoor into your HR and recruitment strategy amplifies your employer brand by showcasing authentic workplace experiences and transparent compensation data. This integration helps attract top talent by building trust and engagement, while empowering candidates to make informed career decisions.",
    },
    {
        id: "jobberman",
        title: "Jobberman",
        alt: "Jobberman",
        logoLight: "/assets/hr/jobberman1.svg",
        logoDark: "/assets/hr/jobberman.svg",
        imageOffset: "lg:-mt-[1em] md:-mt-[1em]",
        description:
            "Jobberman is a leading job portal in West Africa, connecting employers with a vast network of qualified candidates across multiple industries. Integrating Jobberman into your recruitment process expands your reach within the regional talent market, enabling you to attract skilled professionals efficiently. This integration leverages Jobbermanâ€™s targeted job matching and extensive database to streamline hiring, improve candidate quality, and accelerate your recruitment outcomes.",
    },
    {
        id: "workforce",
        title: "Workforce",
        alt: "Workforce",
        logoLight: "/assets/hr/workforce1.svg",
        logoDark: "/assets/hr/workforce.svg",
        imageOffset: "lg:-mt-[3em] md:-mt-[3em]",
        description:
            "Workforce is a comprehensive human capital management platform that streamlines recruitment, employee management, and payroll processes. Integrating Workforce into your HR operations enhances efficiency by automating key workflows and providing real-time insights into your talent pool. This integration supports better workforce planning and engagement, helping you attract, retain, and develop skilled employees while driving overall organizational productivity.",
    },
];

// Advanced Accordion Integration Component for 2-Column Layout (Compact Version)
const AccordionIntegrationAdvanced = ({ integration, isDayTime, index }: { integration: any; isDayTime: boolean; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`group relative rounded-2xl overflow-hidden border backdrop-blur-lg transition-all duration-500 ${
                isOpen
                    ? isDayTime
                        ? 'bg-gradient-to-br from-purple-50/90 to-white/70 border-purple-300/60 shadow-2xl'
                        : 'bg-gradient-to-br from-purple-500/20 to-white/8 border-purple-400/60 shadow-[0_20px_60px_rgba(139,92,246,0.3)]'
                    : isDayTime
                    ? 'bg-white/50 border-gray-200/40 hover:border-purple-300/50 hover:bg-white/60'
                    : 'bg-white/8 border-white/15 hover:border-purple-400/40 hover:bg-white/10'
            }`}
        >
            {/* Gradient overlay on expand */}
            {isOpen && (
                <div className="absolute inset-0 opacity-100 transition-opacity duration-500" style={{background: isDayTime ? 'linear-gradient(135deg, rgba(147,51,234,0.08), transparent)' : 'linear-gradient(135deg, rgba(139,92,246,0.15), transparent)'}}/>
            )}

            <div className="relative">
                {/* Header - Always Visible */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left p-5 lg:p-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4 flex-1">
                        {/* Logo Badge */}
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isDayTime ? 'bg-gray-100 group-hover:bg-purple-100' : 'bg-white/12 group-hover:bg-purple-500/20'} transition-colors duration-300`}>
                            <Image
                                src={isDayTime ? integration.logoLight : integration.logoDark}
                                alt={integration.alt}
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>

                        {/* Title & Status */}
                        <div className="flex-1 min-w-0">
                            <h3 className={`text-[1.1em] font-[700] leading-tight transition-all duration-300 truncate ${isDayTime ? 'text-black' : 'text-white'}`}>
                                {integration.title}
                            </h3>
                            <p className={`text-xs transition-all duration-300 truncate ${isDayTime ? 'text-gray-600' : 'text-white/50'}`}>
                                Enterprise Integration
                            </p>
                        </div>
                    </div>

                    {/* Toggle Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-500 ml-3 ${
                        isDayTime 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-purple-500/20 text-purple-300'
                    } ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div className={`px-5 lg:px-6 pb-6 border-t ${isDayTime ? 'border-gray-200/40' : 'border-white/10'}`}>
                            <div className="pt-6 space-y-6">
                                {/* Main Description */}
                                <div>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>
                                        Overview
                                    </h4>
                                    <p className={`text-sm leading-[1.6] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                                        {integration.description}
                                    </p>
                                </div>

                                {/* Tech Specs Grid - Compact 2x2 */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>API</div>
                                        <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>REST/GraphQL</div>
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Data Sync</div>
                                        <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>Real-time</div>
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Security</div>
                                        <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>OAuth 2.0</div>
                                    </div>
                                    <div>
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Status</div>
                                        <div className={`text-sm font-[700] flex items-center gap-2 ${isDayTime ? 'text-green-700' : 'text-green-400'}`}>
                                            <span className="w-2 h-2 rounded-full bg-current inline-block" style={{animation: 'pulse 2s infinite'}}></span>
                                            Active
                                        </div>
                                    </div>
                                </div>

                                {/* Feature Highlights - Compact */}
                                <div>
                                    <h5 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Key Features</h5>
                                    <ul className={`space-y-2 ${isDayTime ? 'text-black/65' : 'text-white/70'}`}>
                                        <li className="flex items-start gap-2 text-xs">
                                            <span className={`text-base flex-shrink-0 ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                            <span>Enterprise-grade API reliability</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs">
                                            <span className={`text-base flex-shrink-0 ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                            <span>Bidirectional data synchronization</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-xs">
                                            <span className={`text-base flex-shrink-0 ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                            <span>Advanced compliance protocols</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* CTA Button - Compact */}
                                <Link
                                    href={`/integrations/${integration.id}`}
                                    className={`block w-full text-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                                        isDayTime
                                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                            : 'bg-purple-500/30 hover:bg-purple-500/40 text-purple-200 border border-purple-400/40'
                                    }`}
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// Futuristic Accordion Integration Component (Original - Full Featured)
const AccordionIntegration = ({ integration, isDayTime, index }: { integration: any; isDayTime: boolean; index: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`group relative rounded-2xl overflow-hidden border backdrop-blur-lg transition-all duration-500 ${
                isOpen
                    ? isDayTime
                        ? 'bg-gradient-to-br from-purple-50/90 to-white/70 border-purple-300/60 shadow-2xl'
                        : 'bg-gradient-to-br from-purple-500/20 to-white/8 border-purple-400/60 shadow-[0_20px_60px_rgba(139,92,246,0.3)]'
                    : isDayTime
                    ? 'bg-white/50 border-gray-200/40 hover:border-purple-300/50 hover:bg-white/60'
                    : 'bg-white/8 border-white/15 hover:border-purple-400/40 hover:bg-white/10'
            }`}
        >
            {/* Gradient overlay on expand */}
            {isOpen && (
                <div className="absolute inset-0 opacity-100 transition-opacity duration-500" style={{background: isDayTime ? 'linear-gradient(135deg, rgba(147,51,234,0.08), transparent)' : 'linear-gradient(135deg, rgba(139,92,246,0.15), transparent)'}}/>
            )}

            <div className="relative">
                {/* Header - Always Visible */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left p-6 lg:p-8 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6 flex-1">
                        {/* Logo Badge */}
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${isDayTime ? 'bg-gray-100 group-hover:bg-purple-100' : 'bg-white/12 group-hover:bg-purple-500/20'} transition-colors duration-300`}>
                            <Image
                                src={isDayTime ? integration.logoLight : integration.logoDark}
                                alt={integration.alt}
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>

                        {/* Title & Status */}
                        <div className="flex-1">
                            <h3 className={`text-[1.4em] font-[700] mb-1 transition-all duration-300 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                {integration.title}
                            </h3>
                            <p className={`text-sm transition-all duration-300 ${isDayTime ? 'text-gray-600' : 'text-white/50'}`}>
                                Enterprise API Integration
                            </p>
                        </div>
                    </div>

                    {/* Toggle Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 ${
                        isDayTime 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-purple-500/20 text-purple-300'
                    } ${isOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div className={`px-6 lg:px-8 pb-8 border-t ${isDayTime ? 'border-gray-200/40' : 'border-white/10'}`}>
                            <div className="pt-8 grid lg:grid-cols-3 gap-8">
                                {/* Main Description */}
                                <div className="lg:col-span-2">
                                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>
                                        Overview
                                    </h4>
                                    <p className={`text-[0.95em] leading-[1.8] mb-8 ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                                        {integration.description}
                                    </p>

                                    {/* Tech Specs Grid */}
                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>API Standard</div>
                                            <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>REST / GraphQL</div>
                                        </div>
                                        <div>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Data Sync</div>
                                            <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>Real-time</div>
                                        </div>
                                        <div>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Security</div>
                                            <div className={`text-sm font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>OAuth 2.0</div>
                                        </div>
                                        <div>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Status</div>
                                            <div className={`text-sm font-[700] flex items-center gap-2 ${isDayTime ? 'text-green-700' : 'text-green-400'}`}>
                                                <span className="w-2 h-2 rounded-full bg-current inline-block" style={{animation: 'pulse 2s infinite'}}></span>
                                                Active
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feature Highlights */}
                                    <div>
                                        <h5 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Key Features</h5>
                                        <ul className={`space-y-2 ${isDayTime ? 'text-black/65' : 'text-white/70'}`}>
                                            <li className="flex items-start gap-3 text-sm">
                                                <span className={`text-lg ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                                <span>Native API integration with enterprise-grade reliability</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-sm">
                                                <span className={`text-lg ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                                <span>Bidirectional data synchronization at scale</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-sm">
                                                <span className={`text-lg ${isDayTime ? 'text-purple-600' : 'text-purple-400'}`}>âœ¦</span>
                                                <span>Advanced security protocols and compliance standards</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Sidebar - Logo Showcase + CTA */}
                                <div className="flex flex-col items-center justify-between">
                                    {/* Logo Display */}
                                    <div className={`w-full p-6 rounded-xl mb-8 flex items-center justify-center min-h-[200px] ${isDayTime ? 'bg-gray-100' : 'bg-white/8 border border-white/15'}`}>
                                        <Image
                                            src={isDayTime ? integration.logoLight : integration.logoDark}
                                            alt={integration.alt}
                                            width={120}
                                            height={120}
                                            className="object-contain"
                                        />
                                    </div>

                                    {/* Tech Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8 w-full justify-center">
                                        <span className={`text-xs px-3 py-2 rounded-full font-semibold ${isDayTime ? 'bg-purple-100 text-purple-700' : 'bg-purple-500/20 text-purple-300'}`}>
                                            REST API
                                        </span>
                                        <span className={`text-xs px-3 py-2 rounded-full font-semibold ${isDayTime ? 'bg-blue-100 text-blue-700' : 'bg-blue-500/20 text-blue-300'}`}>
                                            OAuth 2.0
                                        </span>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col gap-3 w-full">
                                        <Link
                                            href={`/integrations/${integration.id}`}
                                            className={`text-center py-3 px-4 rounded-lg font-[600] text-sm transition-all ${
                                                isDayTime
                                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                    : 'bg-purple-500/40 text-purple-200 hover:bg-purple-500/60'
                                            }`}
                                        >
                                            Explore Integration
                                        </Link>
                                        <Link
                                            href={`/contact?integration=${integration.id}`}
                                            className={`text-center py-3 px-4 rounded-lg font-[600] text-sm border transition-all ${
                                                isDayTime
                                                    ? 'border-purple-300 text-purple-700 hover:bg-purple-50'
                                                    : 'border-purple-400/40 text-purple-300 hover:bg-purple-500/10'
                                            }`}
                                        >
                                            Request Demo
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const HrTech = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isBackgroundActive, setIsBackgroundActive] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [current, setCurrent] = useState(0);

    const isDayTime = useIsDayTime();

    // Page-specific accent color (HR Tech)
    const pageAccent = '#7c3aed'; // purple-indigo
    const hexToRgb = (hex: string) => {
        const cleaned = hex.replace('#', '');
        const bigint = parseInt(cleaned, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r},${g},${b}`;
    };
    const accentRgb = hexToRgb(pageAccent);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const handleIntroScroll = () => {
            if (!sectionRef.current) return;

            const {top, bottom} = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            setIsBackgroundActive(top < windowHeight * -0.1 || bottom < windowHeight * -0.1);
        };

        window.addEventListener("scroll", handleIntroScroll);
        handleIntroScroll();

        return () => window.removeEventListener("scroll", handleIntroScroll);
    }, []);

    useEffect(() => {
        const handleActiveSectionScroll = () => {
            for (const service of services) {
                const section = document.getElementById(service.target);

                if (!section) continue;

                const rect = section.getBoundingClientRect();

                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    setActiveId(service.target);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleActiveSectionScroll);
        handleActiveSectionScroll();

        return () => window.removeEventListener("scroll", handleActiveSectionScroll);
    }, []);

    const scrollToSection = (target: string) => {
        const section = document.getElementById(target);

        if (section) {
            section.scrollIntoView({behavior: "smooth", block: "start"});
            setActiveId(target);
        }
    };

    // Orbit animation state for partner orb (high-performance DOM-driven animation)
    const orbitRef = useRef<HTMLDivElement | null>(null);
    const orbitPausedRef = useRef(false);
    const [orbitHovered, setOrbitHovered] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Respect reduced-motion
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        let rafId: number | null = null;
        let last = performance.now();
        let rotation = 0; // degrees
        const speed = 6; // degrees per second (gentle)

        const tick = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;

            if (!orbitPausedRef.current) {
                rotation = (rotation + dt * speed) % 360;
                // update child transforms directly for smoother perf (no React re-renders)
                const el = orbitRef.current;
                if (el) {
                    const children = Array.from(el.children) as HTMLElement[];
                    const N = Math.max(1, children.length);
                    // radius relative to container size for responsiveness
                    const radius = Math.min(130, Math.max(60, el.clientWidth * 0.35 || 130));

                    children.forEach((c, i) => {
                        const step = 360 / N;
                        const a = (rotation + step * i) * (Math.PI / 180);
                        const x = Math.cos(a) * radius;
                        const y = Math.sin(a) * radius;
                        // outer wrapper is positioned at 50%/50% and will be translated
                        (c as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotate(${-(rotation + step * i)}deg)`;
                    });
                }
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const prev = () => setCurrent((value) => (value - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((value) => (value + 1) % testimonials.length);

    const {name, title, message} = testimonials[current];

    return (
        <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>

            {/* Unified Futuristic HR Tech Hero - Background Image/Video with overlay */}
            <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
                {/* Video Background (desktop) and Image fallback (mobile) */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="hidden lg:block absolute inset-0 w-full h-full object-cover"
                    poster="/assets/hr/hero.jpg"
                >
                    <source src="/assets/hr/hero-video.mp4" type="video/mp4"/>
                </video>

                <Image
                    src="/assets/hr/hero.jpg"
                    alt="HR Tech Hero"
                    fill
                    priority
                    className="lg:hidden object-cover absolute inset-0"
                />

                {/* Grid & FX Background */}
                <div className="pointer-events-none absolute inset-0 z-[1]">
                    <FxBackground day={false} grid={true} aurora={true}/>
                </div>

                {/* Gradient Overlay with Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]"/>
                <div
                    className="absolute inset-0 z-[2]"
                    style={{background: `radial-gradient(circle at top right, rgba(${accentRgb},0.12), transparent 50%)`}}
                />

                {/* Futuristic FX Elements */}
                <div className="pointer-events-none absolute inset-0 z-[3]">
                    <div className="gx-scanline"/>
                    <div className="gx-noise-overlay"/>
                    <div className="gx-orbit absolute"
                         style={{width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: .12}}/>
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                                <div className="w-2.5 h-2.5 rounded-full animate-pulse"
                                     style={{background: pageAccent}}/>
                                <span style={{color: pageAccent}}
                                      className="text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">HR Tech</span>
                            </div>

                            <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                                Build Modern, <span className="gx-gradient-text">People-First HR Platforms</span>
                            </h1>

                            <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                                Enterprise-grade HR software that streamlines hiring, onboarding, payroll, and
                                performance management â€” designed for scale, security, and outstanding employee
                                experience.
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                                {['Talent Acquisition', 'HR Portals', 'Analytics', 'Automation', 'Integrations'].map((badge) => (
                                    <span key={badge}
                                          className="px-3 py-1.5 rounded-full text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider"
                                          style={{
                                              backgroundColor: `rgba(${accentRgb},0.08)`,
                                              border: `1px solid rgba(${accentRgb},0.18)`,
                                              color: pageAccent
                                          }}>
                                            {badge}
                                        </span>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href="/contact"
                                   className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap"
                                   style={{background: pageAccent, color: '#fff'}}>
                                    <span className="absolute inset-0"
                                          style={{background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'}}/>
                                    <span className="relative">Start a project â†’</span>
                                </Link>
                                <Link href="/case-studies"
                                   className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap"
                                   style={{border: `1px solid rgba(255,255,255,0.15)`}}>
                                    View Case Studies
                                </Link>
                            </div>
                        </div>

                        {/* Right Column - Impact Stats */}
                        <div className="hidden lg:flex flex-col items-end">
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {[
                                    {label: 'Years Experience', value: '8+'},
                                    {label: 'Team Members', value: '13+'},
                                    {label: 'Products Launched', value: '123+'},
                                    {label: 'Avg Efficiency Lift', value: '40%'}
                                ].map((stat) => (
                                    <div key={stat.label}
                                         className="px-6 py-5 rounded-2xl transition-all duration-300 text-right"
                                         style={{
                                             border: `1px solid rgba(${accentRgb},0.25)`,
                                             background: `rgba(${accentRgb},0.08)`,
                                             backdropFilter: 'blur(6px)'
                                         }}>
                                        <div style={{color: pageAccent}}
                                             className="text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
                                        <div className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Stats - Visible on small screens only */}
                <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {label: 'Years', value: '8+'},
                            {label: 'Experts', value: '13+'},
                            {label: 'Products', value: '123+'}
                        ].map((stat) => (
                            <div key={stat.label}
                                 className="px-3 py-2 rounded-xl transition-all duration-300"
                                 style={{
                                     border: `1px solid rgba(${accentRgb},0.25)`,
                                     background: `rgba(${accentRgb},0.08)`,
                                     backdropFilter: 'blur(6px)'
                                 }}>
                                <div style={{color: pageAccent}}
                                     className="text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                                <div className="text-white text-[1.2em] font-[700]">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introductory section (futuristic style) */}
            <section
                ref={sectionRef}
                data-bg={isBackgroundActive ? (isDayTime ? 'Dark' : 'Light') : (isDayTime ? 'Light' : 'Dark')}
                className={`pt-16 transition-colors duration-500 ${
                    isBackgroundActive
                        ? isDayTime ? 'bg-black text-white' : 'bg-white text-black'
                        : isDayTime ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                <FxBackground day={isDayTime}/>

                <div
                    className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] xl:px-[4.6em] 2xl:px-[4.6em]">
                    <div>
                        <FxChip day={!isBackgroundActive ? !isDayTime : isDayTime}>HR TECHNOLOGY</FxChip>
                    </div>

                    <div className="lg:-ml-[19em]">
                        <FxReveal>
                            <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                                Empowering your <span className="gx-gradient-text">HR Tech</span> Journey Forward
                            </h3>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div
                                className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6 font-[300] text-justify text-[0.95em] md:text-[1.05em] leading-relaxed">
                                <div className="space-y-4">
                                    <p>
                                        In todayâ€™s competitive business landscape, integrating HR technology is
                                        strategic â€” not optional. Our HR solutions prioritise security, scalability, and
                                        employee experience, ensuring your platforms support recruitment, onboarding,
                                        payroll, and performance at enterprise scale.
                                    </p>
                                    <p>
                                        We combine product thinking, UX-led design, and robust engineering practices to
                                        deliver systems that reduce administrative overhead, improve data visibility,
                                        and drive measurable HR outcomes.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {['Talent Acquisition', 'HR Portals', 'Analytics', 'Automation'].map((p) => (
                                            <span key={p} className="gx-data-pill" style={{
                                                backgroundColor: `rgba(${accentRgb},0.08)`,
                                                border: `1px solid rgba(${accentRgb},0.16)`,
                                                color: pageAccent
                                            }}>{p}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p>
                                        Our integrations with ATS, payroll providers and analytics tooling ensure a
                                        unified HR ecosystem. Every deployment is backed by secure APIs, role-based
                                        access, and observability so your HR teams can operate with confidence.
                                    </p>

                                    <p>
                                        Deliverables include architecture blueprints, integration playbooks, data
                                        mapping, and operational runbooks to keep your HR platform reliable and
                                        future-ready.
                                    </p>

                                    <div className="mt-6 flex items-center gap-4">
                                        <Link href="/contact"
                                              className="inline-flex items-center justify-center rounded-xl transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
                                              style={{
                                                  background: pageAccent,
                                                  color: '#fff',
                                                  padding: '12px 20px',
                                                  fontWeight: 600
                                              }}>Start discovery</Link>
                                        <Link href="/company"
                                              className="inline-flex items-center justify-center rounded-xl border border-white/10 text-sm text-slate-400 px-4 py-2 transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/30">Our
                                            approach</Link>
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>
                </div>
            </section>

            {/* HR Technology & Marketing Services */}
            <FxStickyScrollSection
                day={isDayTime}
                colorScheme="purple"
                heading={<>HR Technology &<br className="lg:block md:block hidden"/>Marketing Services</>}
                intro="We deliver end-to-end solutions that seamlessly integrate human resources functionality into your corporate websiteâ€”covering everything from employee onboarding and performance tracking to benefits management, payroll systems, employee profiles, and beyond."
                navLabel="Our Services"
                activeId={activeId}
                onNavClickAction={scrollToSection}
                items={services}
            />

            {/* Futuristic partner carousel */}
            <section className={`relative py-20 overflow-hidden ${isDayTime ? 'bg-black' : 'bg-white'}`}
                     aria-label="Trusted partners">
                <FxHoloCard day={isDayTime}
                            className="relative max-w-7xl mx-auto p-8 lg:p-12">
                    {/* Ambient gradients and orbits for depth */}
                    <div className="pointer-events-none absolute inset-0">
                        <div
                            className="absolute -left-40 -top-40 w-96 h-96 rounded-full"
                            style={{background: `radial-gradient(circle at top left, rgba(${accentRgb},0.12), transparent 40%)`}}/>
                        <div
                            className="absolute -right-28 -bottom-28 w-72 h-72 rounded-full"
                            style={{background: `radial-gradient(circle at bottom right, rgba(${accentRgb},0.08), transparent 40%)`}}/>
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h3 className={`text-[1.25em] lg:text-[1.6em] font-[700] tracking-tight ${isDayTime ? 'text-white' : 'text-black'}`}>Trusted
                                by HR innovators</h3>
                            <p className="mt-3 text-sm text-gray-400 max-w-xl">
                                Leading HR platforms and enterprises rely on our secure, scalable HR tech solutions. The
                                visual below presents partner integrations and platform certifications that form the
                                backbone of modern HR ecosystems.
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <Link href="/contact"
                                      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
                                      style={{background: pageAccent, color: '#fff'}}>
                                    Talk to an HR tech specialist
                                </Link>
                                <Link href="/case-studies"
                                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-lg border transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/30 ${isDayTime ? 'text-white' : 'text-black'}`}
                                      style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                    View case studies
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center">
                            {/* Logo orb: logos arranged on a circular orbit for a futuristic holo effect */}
                            <div
                                className={`relative w-[360px] h-[360px] flex items-center justify-center transform transition-all duration-500 ${orbitHovered ? 'scale-105' : 'scale-100'}`}
                                style={orbitHovered ? {boxShadow: `0 20px 60px rgba(${accentRgb},0.18)`} : undefined}>
                                <div
                                    className="absolute inset-0 rounded-full border border-purple-400/6 backdrop-blur-md"/>
                                <div className="absolute w-[280px] h-[280px] rounded-full"
                                     style={{background: `radial-gradient(circle at center, rgba(${accentRgb},0.06), transparent 40%)`}}/>

                                {/* Center holographic badge */}
                                <div className="relative z-20 w-28 h-28 rounded-full flex items-center justify-center"
                                     style={{background: pageAccent, boxShadow: `0 8px 48px rgba(${accentRgb},0.18)`}}>
                                    <span className="text-white font-extrabold">HR</span>
                                </div>

                                {/* Orbiting logos - high-performance DOM-driven animation */}
                                <div className="absolute inset-0" ref={orbitRef} onMouseEnter={() => {
                                    orbitPausedRef.current = true;
                                    setOrbitHovered(true);
                                }} onMouseLeave={() => {
                                    orbitPausedRef.current = false;
                                    setOrbitHovered(false);
                                }} onFocus={() => {
                                    orbitPausedRef.current = true;
                                    setOrbitHovered(true);
                                }} onBlur={() => {
                                    orbitPausedRef.current = false;
                                    setOrbitHovered(false);
                                }} role="list" aria-label="Partner integrations">
                                    {carouselLogos.map((logo) => (
                                        <div key={logo.name} style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            transform: 'translate(0px, 0px) rotate(0deg)'
                                        }}>
                                            <div tabIndex={0} role="listitem" aria-label={logo.name}
                                                 className="w-16 h-16 rounded-full flex items-center justify-center p-2 bg-white/6 backdrop-blur-sm border border-white/6 transition-transform duration-300 ease-out hover:scale-110 focus:scale-110"
                                                 style={{boxShadow: '0 6px 30px rgba(12,18,36,0.45)'}}>
                                                <Image src={isDayTime ? logo.light : logo.dark} alt={logo.name}
                                                       width={48} height={48} style={{width: 'auto', height: 'auto'}}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Subtle rotation on hover for interactivity */}
                                <div className="absolute inset-0 z-0" aria-hidden>
                                    {/* Decorative ring */}
                                    <svg className="w-full h-full" viewBox="0 0 360 360" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="180" cy="180" r="130" stroke={`rgba(${accentRgb},0.06)`}
                                                strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </FxHoloCard>
            </section>

            {/* First image - Futuristic showcase */}
            <section id="first-image" className="relative w-full max-w-full mx-auto">
                <FxHoloCard day={isDayTime} className="relative overflow-hidden p-0">
                    {/* Layered ambient gradients */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div
                            style={{background: `radial-gradient(circle at 10% 10%, rgba(${accentRgb},0.12), transparent 25%)`}}
                            className="absolute inset-0"/>
                        <div
                            style={{background: `radial-gradient(circle at 90% 80%, rgba(${accentRgb},0.06), transparent 25%)`}}
                            className="absolute inset-0"/>
                        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 600"
                             preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0" stopColor="rgba(255,255,255,0.04)"/>
                                    <stop offset="1" stopColor="rgba(255,255,255,0)"/>
                                </linearGradient>
                            </defs>
                            <rect width="1200" height="600" fill="url(#g1)"/>
                            <g stroke={`rgba(255, 255, 255, 0.03)`} strokeWidth="1">
                                {[...Array(10)].map((_, i) => (
                                    <line key={i} x1={0} y1={(i + 1) * 50} x2={1200} y2={(i + 1) * 50}/>
                                ))}
                            </g>
                        </svg>
                    </div>

                    {/* Hero image with glass overlay and holographic content */}
                    <div className="relative w-full">
                        <Image
                            className="w-full h-[75vh] object-cover"
                            src="/assets/hr/first.jpg"
                            alt="HR technology platform"
                            width={2560}
                            height={1440}
                            style={{objectFit: 'cover', objectPosition: 'center'}}
                        />

                        {/* Glass content card - center */}
                        <div
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-3/4 lg:w-2/3">
                            <div
                                className="backdrop-blur-3xl bg-white/6 dark:bg-black/40 rounded-2xl p-6 lg:p-10 border border-white/6"
                                style={{boxShadow: '0 24px 80px rgba(16,24,40,0.5)'}}>
                                <h2 className="text-[1.4em] lg:text-[2.6em] font-extrabold tracking-tight"
                                    style={{color: pageAccent}}>
                                    Modern HR Platform Architecture
                                </h2>
                                <p className="mt-3 text-sm lg:text-[1em] font-[300] text-white/85">
                                    Secure, composable HR infrastructureâ€”identity, payroll, performance, and
                                    analyticsâ€”connected through realtime APIs and event-driven pipelines. Designed for
                                    scale, observability and privacy.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <FxChip day={isDayTime} className="px-4 py-2">SSO & SAML</FxChip>
                                    <FxChip day={isDayTime} className="px-4 py-2">GDPR-ready</FxChip>
                                    <FxChip day={isDayTime} className="px-4 py-2">Realtime Analytics</FxChip>
                                </div>

                                <div className="mt-6 flex items-center gap-4">
                                    <Link href="/contact"
                                          className="inline-flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-400/30"
                                          style={{background: pageAccent, color: '#fff'}}>
                                        Speak with HR architects
                                    </Link>
                                    <Link href="/our-approach"
                                          className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400/30"
                                          style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                        Learn our approach
                                    </Link>
                                </div>
                            </div>

                            {/* Floating micro-metrics */}
                            <div className="mt-6 flex gap-4 justify-center lg:justify-start">
                                <div
                                    className="p-3 rounded-lg bg-white/4 border border-white/6 backdrop-blur-sm text-center">
                                    <div className="text-[1.1em] font-extrabold">99.8%</div>
                                    <div className="text-xs mt-1">Data accuracy</div>
                                </div>
                                <div
                                    className="p-3 rounded-lg bg-white/4 border border-white/6 backdrop-blur-sm text-center">
                                    <div className="text-[1.1em] font-extrabold"><span
                                        style={{color: pageAccent}}>8â€“12</span> wks
                                    </div>
                                    <div className="text-xs mt-1">Typical timeline</div>
                                </div>
                                <div
                                    className="p-3 rounded-lg bg-white/4 border border-white/6 backdrop-blur-sm text-center">
                                    <div className="text-[1.1em] font-extrabold">Scale</div>
                                    <div className="text-xs mt-1">Enterprise-ready</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FxHoloCard>
            </section>

            {/* What Grey InfoTech Does - Deeply detailed futuristic breakdown */}
            <section
                className={`relative overflow-visible lg:py-20 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}
                aria-label="What Grey InfoTech Does">
                <FxHoloCard day={isDayTime}
                            className="relative max-w-[95em] w-full mx-auto p-8 lg:p-12">

                    {/* Decorative depth layers */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div
                            style={{background: `radial-gradient(circle at 12% 12%, rgba(${accentRgb},0.08), transparent 18%)`}}
                            className="absolute inset-0"/>
                        <div style={{background: `linear-gradient(180deg, rgba(${accentRgb},0.02), transparent 30%)`}}
                             className="absolute inset-0"/>
                        <svg className="absolute inset-0 w-full h-full opacity-7" viewBox="0 0 1200 600"
                             preserveAspectRatio="none">
                            <defs>
                                <filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="12" result="b"/>
                                    <feBlend in="SourceGraphic" in2="b" mode="normal"/>
                                </filter>
                            </defs>
                            <g stroke={`rgba(255, 255, 255, 0.02)`} strokeWidth="1">
                                {[...Array(10)].map((_, i) => (
                                    <line key={i} x1={0} y1={(i + 1) * 55} x2={1200} y2={(i + 1) * 55}/>
                                ))}
                            </g>
                        </svg>
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 gap-10 items-start">
                        {/* Left column: Authoritative narrative + technical specifics */}
                        <div className="space-y-6 lg:pr-8">
                            <h3 className="text-[2.6rem] lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.02]">
                                What Grey <br className="lg:block md:block hidden"/>Infotech Does
                            </h3>

                            <p className="text-[1em] font-[300] leading-[1.7] text-justify max-w-2xl">
                                Grey InfoTech architects enterprise HR platforms with production-grade practices and
                                engineering rigor. Solutions are built API-first, backed by event streams for realtime
                                orchestration (Kafka / Pulsar), persisted in resilient datastores with sensible sharding
                                and
                                encryption-at-rest, and observed through OpenTelemetry for full traceability.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                                         style={{background: pageAccent}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M20 12h-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M12 20v-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                            <path d="M4 12h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">API-first Integration</div>
                                        <div className="text-xs text-slate-400 mt-1">OpenAPI contracts, versioning, SDK
                                            generation and secure API gateways.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center "
                                         style={{background: pageAccent}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Event-driven Workflows</div>
                                        <div className="text-xs text-slate-400 mt-1">Stream processing, idempotent
                                            consumers, and robust retries for onboarding and payroll flows.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center "
                                         style={{background: pageAccent}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Observability & Security</div>
                                        <div className="text-xs text-slate-400 mt-1">OpenTelemetry tracing, Prometheus
                                            metrics, SSO (SAML/OAuth2), RBAC and encryption keys managed via KMS.
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center "
                                         style={{background: pageAccent}}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="#fff"
                                                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Privacy by Design</div>
                                        <div className="text-xs text-slate-400 mt-1">Data minimisation,
                                            pseudonymisation, consent flows, and compliance artefacts for GDPR/CCPA.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link href="/contact"
                                      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg"
                                      style={{background: pageAccent, color: '#fff'}}>
                                    Start a discovery
                                </Link>
                                <Link href="/case-studies"
                                      className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border transition-transform transform hover:scale-105"
                                      style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                    View case studies
                                </Link>
                            </div>

                            {/* Compact architecture summary */}
                            <div className="mt-6 p-4 rounded-xl border border-white/6 bg-white/4 backdrop-blur-sm">
                                <div className="text-sm font-semibold mb-2">Architecture at a glance</div>
                                <ul className="text-xs space-y-1 text-slate-400">
                                    <li>â€¢ API Gateway â†’ Authentication & rate limiting</li>
                                    <li>â€¢ Event Bus (Kafka/Pulsar) â†’ Asynchronous workflows</li>
                                    <li>â€¢ Microservices (stateless) â†’ Horizontal scaling</li>
                                    <li>â€¢ Data Warehouse & OLAP â†’ Analytics & retention modelling</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right column: detailed holographic capability panels */}
                        <div className="space-y-6 lg:pl-6">
                            {[
                                {
                                    k: 'architecture',
                                    title: 'Composable Architecture',
                                    desc: 'Microservices, API gateways, and clear contracts enabling incremental delivery and safe migrations.',
                                    metric: 'Scale to 10k+'
                                },
                                {
                                    k: 'automation',
                                    title: 'Intelligent Automation',
                                    desc: 'Orchestrated onboarding, compliance and payroll with retry-logic and human-in-the-loop steps.',
                                    metric: '60% time saved'
                                },
                                {
                                    k: 'insights',
                                    title: 'Operational Insights',
                                    desc: 'Realtime dashboards, cohort analysis, predictive retention modelling and anomaly detection.',
                                    metric: '99.8% accuracy'
                                }
                            ].map((c, i) => (
                                <FxReveal key={c.k} className="relative">
                                    <div
                                        className="p-5 lg:p-6 rounded-2xl border border-white/6 bg-white/4 backdrop-blur-md hover:scale-[1.03] transform transition-all duration-350"
                                        style={{boxShadow: '0 20px 80px rgba(12,18,36,0.55)'}}>
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold">{i + 1}</div>
                                            <div>
                                                <div className="font-semibold text-lg">{c.title}</div>
                                                <div className="text-sm text-slate-400 mt-2">{c.desc}</div>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            <div>
                                                <div className="text-xs text-slate-400">Typical deliverables</div>
                                                <ul className="text-sm mt-2 list-disc pl-4 space-y-1">
                                                    {c.k === 'architecture' && (
                                                        <>
                                                            <li>System design & blueprints</li>
                                                            <li>API contract library (OpenAPI)</li>
                                                            <li>Deployment & CI/CD pipelines</li>
                                                        </>
                                                    )}
                                                    {c.k === 'automation' && (
                                                        <>
                                                            <li>Workflow definitions & automations</li>
                                                            <li>Human-in-loop escalation playbooks</li>
                                                            <li>Test harness & rollback strategies</li>
                                                        </>
                                                    )}
                                                    {c.k === 'insights' && (
                                                        <>
                                                            <li>Realtime dashboards</li>
                                                            <li>Cohort & retention reports</li>
                                                            <li>Predictive models & alerting</li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="text-right self-center">
                                                <div className="text-sm font-bold"
                                                     style={{color: pageAccent}}>{c.metric}</div>
                                                <div className="text-xs text-slate-400 mt-2">Engagements: Fixed-price,
                                                    T&M, Dedicated
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative holo ring */}
                                    <svg className="absolute -right-6 -top-6 w-28 h-28 opacity-30 pointer-events-none"
                                         viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="40" cy="40" r="32" stroke={`rgba(${accentRgb},0.08)`}
                                                strokeWidth="2"/>
                                        <path d="M10 40h60" stroke={`rgba(${accentRgb},0.06)`} strokeWidth="1"/>
                                    </svg>
                                </FxReveal>
                            ))}
                        </div>
                    </div>
                </FxHoloCard>
            </section>

            {/* Mid image - Futuristic collaborative showcase */}
            <section id="mid-image" className="relative w-full max-w-full mx-auto">
                <FxHoloCard day={isDayTime} className="relative overflow-hidden p-6 lg:p-10">
                    {/* Depth layers */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div
                            style={{background: `radial-gradient(circle at 20% 20%, rgba(${accentRgb},0.12), transparent 25%)`}}
                            className="absolute inset-0"/>
                        <div
                            style={{background: `radial-gradient(circle at 80% 80%, rgba(${accentRgb},0.06), transparent 25%)`}}
                            className="absolute inset-0"/>
                    </div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-6 items-center">
                        <div className="p-4 lg:pr-8">
                            <h3 className="text-[1.6rem] lg:text-[2.4rem] font-extrabold tracking-tight"
                                style={{color: pageAccent}}>
                                Collaborative HR Workspaces
                            </h3>
                            <p className="mt-3 text-sm text-slate-400 max-w-xl">
                                Embed secure collaboration directly inside your HR platform â€” encrypted document vaults,
                                role-based workflows, threaded feedback and realtime notifications. Built for
                                auditability
                                and scale, with enterprise-grade controls.
                            </p>

                            <ul className="mt-4 list-disc pl-5 text-sm space-y-2 text-slate-400">
                                <li>Encrypted document vaults with immutable audit logs and retention controls</li>
                                <li>Role-based task queues, approvals and SLA monitoring with alerts</li>
                                <li>Realtime collaboration, comments and micro-surveys integrated into employee
                                    records
                                </li>
                            </ul>

                            <div className="mt-6 flex gap-3">
                                <Link href="/contact"
                                      className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:shadow-lg"
                                      style={{background: pageAccent, color: '#fff'}}>
                                    Request demo
                                </Link>
                                <Link href="/case-studies"
                                      className="inline-flex items-center px-4 py-2 rounded-lg border transition-transform transform hover:scale-105"
                                      style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                    See examples
                                </Link>
                            </div>

                            <div
                                className="mt-6 p-4 rounded-xl border border-white/6 bg-white/4 backdrop-blur-sm text-sm text-slate-400">
                                <div className="font-semibold mb-2">Technology highlights</div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>API-first sync & webhooks</div>
                                    <div>Encrypted at-rest & in-transit</div>
                                    <div>OpenTelemetry tracing</div>
                                    <div>Fine-grained RBAC & SSO</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex items-center justify-center">
                            <div
                                className="relative w-[520px] h-[320px] rounded-2xl overflow-hidden border border-white/6"
                                style={{boxShadow: `0 30px 80px rgba(${accentRgb},0.08)`}}>
                                <Image src="/assets/hr/mid.jpg" alt="Office collaboration" fill
                                       className="object-cover"/>

                                <div
                                    className="absolute bottom-4 left-4 p-3 rounded-md bg-white/6 backdrop-blur-sm text-sm"
                                    style={{border: `1px solid rgba(${accentRgb},0.08)`}}>
                                    Live collaboration â€¢ Encrypted â€¢ Audit-ready
                                </div>

                                {/* Micro overlay metrics */}
                                <div className="absolute top-4 right-4 flex gap-3">
                                    <div className="px-3 py-2 rounded-lg bg-white/6 text-xs font-semibold"
                                         style={{border: `1px solid rgba(${accentRgb},0.06)`}}>99.8% uptime
                                    </div>
                                    <div className="px-3 py-2 rounded-lg bg-white/6 text-xs font-semibold"
                                         style={{border: `1px solid rgba(${accentRgb},0.06)`}}>Realtime sync
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FxHoloCard>
            </section>

            {/* Designers Collaborate - Digital Adventure Style (Recruitment SEO rewritten) */}
            <section
                className={`relative lg:py-[4em] py-[2em] lg:my-[3em] my-[2em] ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <FxBackground day={isDayTime} grid aurora/>

                <div className="relative z-10 max-w-[95em] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <FxReveal>
                        <h2 className={`mb-6 lg:mb-12 text-[1.6em] lg:text-[3.2em] font-[700] tracking-tight ${isDayTime ? 'text-black' : 'text-white'}`}>
                            Recruitment SEO â€” <span className="gx-gradient-text">Digital Discovery & Visibility</span>
                        </h2>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
                        <FxReveal>
                            <div className="space-y-4">
                                <p className="text-[0.95em] font-[300] leading-[1.7] text-justify">
                                    At Grey InfoTech, SEO is baked into every stage of development â€” from structured
                                    job schema and accessible markup to fast, indexable templates and discoverable
                                    career listings. Our technical SEO playbooks ensure compliance with Google for Jobs
                                    and maximise candidate reach while preserving privacy and performance.
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    {['Structured Data', 'Canonicalization', 'Sitemap Automation', 'Google for Jobs'].map((p) => (
                                        <span key={p}
                                              className={`px-3 py-1.5 rounded-full text-[0.78em] font-[600] ${isDayTime ? 'bg-black/5 text-black' : 'bg-white/5 text-white'}`}>
                                            {p}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <Link href="/contact"
                                          className="inline-flex items-center gap-3 px-4 py-2 rounded-full font-semibold transition-transform transform hover:scale-105 hover:shadow-lg"
                                          style={{background: pageAccent, color: '#fff'}}>
                                        Start your SEO audit
                                    </Link>
                                    <Link href="/case-studies"
                                          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-transform transform hover:scale-105"
                                          style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                        See recruitment case studies
                                    </Link>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 text-center">
                                        <div className="text-[1.1em] font-extrabold" style={{color: pageAccent}}>98%
                                        </div>
                                        <div className="text-xs mt-1">Indexing accuracy</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 text-center">
                                        <div className="text-[1.1em] font-extrabold"><span
                                            style={{color: pageAccent}}>4â€“8</span> wks
                                        </div>
                                        <div className="text-xs mt-1">Audit & fixes</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/4 border border-white/6 text-center">
                                        <div className="text-[1.1em] font-extrabold">Reliable</div>
                                        <div className="text-xs mt-1">Enterprise-grade hosting</div>
                                    </div>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal>
                            <div className="relative">
                                <div className="rounded-2xl overflow-hidden border border-white/6"
                                     style={{boxShadow: `0 30px 80px rgba(${accentRgb},0.06)`}}>
                                    <Image src="/assets/fin/data.jpg" alt="Recruitment SEO data insights" width={900}
                                           height={600} className="w-full h-auto object-cover"/>

                                    <div
                                        className="absolute bottom-4 left-4 p-3 rounded-md bg-white/6 backdrop-blur-sm text-sm"
                                        style={{border: `1px solid rgba(${accentRgb},0.08)`}}>
                                        Structured markup â€¢ Fast index â€¢ Google for Jobs ready
                                    </div>

                                    <div className="absolute top-4 right-4 flex gap-3">
                                        <div className="px-3 py-2 rounded-lg bg-white/6 text-xs font-semibold"
                                             style={{border: `1px solid rgba(${accentRgb},0.06)`}}>98% uptime
                                        </div>
                                        <div className="px-3 py-2 rounded-lg bg-white/6 text-xs font-semibold"
                                             style={{border: `1px solid rgba(${accentRgb},0.06)`}}>Realtime sync
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FxReveal>
                    </div>

                    {/* Bottom CTA bar (digital adventure style) */}
                    <FxReveal delay={0.18} className="mt-10">
                        <div
                            className={`p-6 rounded-2xl border ${isDayTime ? 'bg-gradient-to-r from-black/2 to-black/5 border-gray-200' : 'bg-gradient-to-r from-white/5 to-white/8 border-white/10'}`}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h4 className={`text-[1.25em] font-[700] ${isDayTime ? 'text-black' : 'text-white'}`}>Ready
                                        to be discovered?</h4>
                                    <p className={`text-sm ${isDayTime ? 'text-gray-700' : 'text-gray-300'}`}>Schedule a
                                        technical SEO review and get a prioritized action list for your recruitment
                                        platform.</p>
                                </div>

                                <div className="flex gap-3">
                                    <Link href="/contact"
                                          className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-transform transform hover:scale-105"
                                          style={{background: pageAccent, color: '#fff'}}>
                                        Book a review
                                    </Link>
                                    <Link href="/quote-request"
                                          className="inline-flex items-center px-4 py-2 rounded-lg border transition-transform transform hover:scale-105"
                                          style={{borderColor: `rgba(${accentRgb},0.12)`}}>
                                        Get a quote
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

            {/* Why Choose Us â€” Advanced Premium Benefits Grid */}
            <section
                className={`relative lg:py-[4em] py-[2.5em] transition-colors duration-500 ${isDayTime ? 'bg-black text-white' : 'bg-white text-black'}`}>
                {/* Subtle grid + aurora background using page accent */}
                <div className="pointer-events-none absolute inset-0 opacity-40" style={{
                    backgroundImage: `linear-gradient( ${isDayTime ? `rgba(${accentRgb},0.06)` : `rgba(${accentRgb},0.06)`} 1px, transparent 1px), linear-gradient(90deg, ${isDayTime ? `rgba(${accentRgb},0.06)` : `rgba(${accentRgb},0.06)`} 1px, transparent 1px)`,
                    backgroundSize: '44px 44px'
                }}/>
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-18"
                         style={{background: `radial-gradient(circle, ${pageAccent} 0%, transparent 70%)`}}/>
                    <div className="absolute -bottom-28 -right-20 w-[420px] h-[420px] rounded-full opacity-12"
                         style={{background: `radial-gradient(circle, ${pageAccent}55 0%, transparent 70%)`}}/>
                </div>

                <div id="why-choose-us"
                     className="relative z-10 max-w-[95em] mx-auto px-4 sm:px-6 md:px-10 lg:px-[4.5em]">
                    <FxReveal>
                        <div className="flex items-center gap-5 mb-12">
                            <FxChip day={isDayTime}>BUSINESS IMPACT</FxChip>
                            <div className={`flex-1 h-px ${isDayTime ? 'bg-white/10' : 'bg-black/10'}`}/>
                            <span
                                className={`font-mono text-[0.7em] tracking-widest ${isDayTime ? 'text-white/30' : 'text-black/30'}`}>HR TRANSFORMATION</span>
                        </div>
                    </FxReveal>

                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                        <FxReveal>
                            <div>
                                <h2 className={`text-[2em] lg:text-[2.8em] font-[700] leading-[1.08] tracking-tight mb-6`}>
                                    Why Choose Grey for HR Tech?
                                </h2>
                                <p className={`text-[0.95em] leading-[1.8] mb-4 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    We combine deep HR domain knowledge with robust engineering to deliver career
                                    platforms that scale, stay secure, and keep candidate experience central.
                                </p>
                                <p className={`text-[0.95em] leading-[1.8] mb-6 ${isDayTime ? 'text-white/75' : 'text-black/70'}`}>
                                    From GDPR-compliant applicant flows to optimized job indexing and enterprise
                                    integrations, Grey delivers measurable efficiency and engagement improvements.
                                </p>

                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg" style={{
                                    background: `rgba(${accentRgb},0.06)`,
                                    border: `1px solid rgba(${accentRgb},0.08)`
                                }}>
                                    <div className={`w-2 h-2 rounded-full animate-pulse`}
                                         style={{background: pageAccent}}/>
                                    <span className={`text-xs font-semibold`}
                                          style={{color: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'}}>Proven HR outcomes</span>
                                </div>
                            </div>
                        </FxReveal>

                        <FxReveal delay={0.08}>
                            <div className="grid grid-cols-2 gap-6 relative">
                                <div className={`absolute -inset-3 rounded-2xl blur-2xl opacity-16`}
                                     style={{background: `linear-gradient(135deg, rgba(${accentRgb},0.12), rgba(${accentRgb},0.06)`}}/>

                                {[{value: '98%', label: 'Indexing Accuracy'}, {
                                    value: '4â€“8 wks',
                                    label: 'Audit & Fixes'
                                }, {value: 'Enterprise', label: 'Hosting'}, {
                                    value: 'Reliable',
                                    label: 'Support SLAs'
                                }].map((stat, idx) => (
                                    <motion.div key={stat.label} initial={{opacity: 0, y: 8}}
                                                whileInView={{opacity: 1, y: 0}} viewport={{once: true}}
                                                transition={{delay: 0.12 + idx * 0.06}}
                                                className={`group relative p-5 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${isDayTime ? 'border-white/8 bg-slate-900/60' : 'border-black/8 bg-white/80'}`}>
                                        <div className="text-2xl font-bold mb-1"
                                             style={{color: pageAccent}}>{stat.value}</div>
                                        <p className={`text-sm font-medium ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </FxReveal>
                    </div>

                    {/* Benefits grid â€” premium cards (3 columns on desktop) */}
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-6">
                        {benefits.map((b, i) => (
                            <FxReveal key={b.id} delay={0.08 + (i * 0.06)}>
                                <motion.div whileHover={{y: -6}} transition={{duration: 0.28}}
                                            className={`relative group h-full`}>
                                    <div
                                        className={`absolute -inset-2 rounded-xl blur-3xl opacity-20 group-hover:opacity-45 transition duration-700`}
                                        style={{background: `linear-gradient(135deg, rgba(${accentRgb},0.18), rgba(${accentRgb},0.06)`}}/>
                                    <div
                                        className={`relative rounded-xl overflow-hidden border h-full p-6 flex flex-col backdrop-blur-md transition-all duration-300 ${isDayTime ? 'border-white/10 bg-slate-900/80 hover:bg-slate-900/95' : 'border-black/10 bg-white/90 hover:bg-white/98'}`}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div
                                                className={`w-14 h-14 rounded-lg flex items-center justify-center ${isDayTime ? 'bg-white/6' : 'bg-black/6'} border`}
                                                style={{borderColor: `rgba(${accentRgb},0.08)`}}>
                                                <Image src={isDayTime ? b.iconLight : b.iconDark} alt={b.alt} width={36}
                                                       height={36}/>
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold"
                                                     style={{color: pageAccent}}>{b.title}</div>
                                                <div className="text-sm text-[0.9em] mt-1"
                                                     style={{color: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'}}>{b.feature || ''}</div>
                                            </div>
                                        </div>

                                        <h4 className={`text-lg font-bold mb-3 ${isDayTime ? 'text-white' : 'text-black'}`}>{b.title}</h4>
                                        <p className={`text-[0.92em] leading-[1.6] flex-1 ${isDayTime ? 'text-white/70' : 'text-black/70'}`}>{b.description}</p>

                                        {/* Key outcomes & delivery quick-glance */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {benefitOutcomes[b.id] ? (
                                                <>
                                                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{background: `rgba(${accentRgb},0.08)`, color: pageAccent}}>{benefitOutcomes[b.id].impact}</span>
                                                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(0,0,0,0.04)'}}>{benefitOutcomes[b.id].time}</span>
                                                    <span className="text-xs px-2 py-1 rounded-full font-medium" style={{background: 'rgba(0,0,0,0.02)'}}>{benefitOutcomes[b.id].compliance}</span>
                                                </>
                                            ) : null}
                                        </div>

                                        <div className={`mt-6 pt-4 border-t flex items-center justify-between ${isDayTime ? 'border-white/6' : 'border-black/6'}`}>
                                            <Link href={`/case-studies?topic=${b.id}`} className="inline-flex items-center gap-2 text-xs font-semibold" aria-label={`Learn more about ${b.title}`}>
                                                <span style={{color: isDayTime ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'}}>Learn more</span>
                                                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1`} style={{color: pageAccent}}/>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </FxReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Middle - Futuristic showcase */}
            <section className="relative h-auto pt-16 lg:pt-20">
                <div className="relative max-w-Full mx-auto px-4 sm:px-6 lg:px-[4.6em]">
                    <div className="relative rounded-2xl overflow-hidden">
                        {/* Decorative orbs and aurora */}
                        <FxBackground day={isDayTime} grid={false} aurora/>
                        <div className="absolute inset-0 pointer-events-none">
                            <div
                                className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_40%)] blur-3xl transform-gpu animate-tilt"/>
                            <div
                                className="absolute -bottom-32 -right-20 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_40%)] blur-2xl"/>
                        </div>

                        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                            <FxReveal>
                                <FxFrame className="lg:order-1">
                                    <Image
                                        src={'/assets/hr/1.jpg'}
                                        alt={'HR platform showcase'}
                                        width={1536}
                                        height={1025}
                                        className={`w-full h-auto object-cover rounded-xl`}
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/28 to-transparent rounded-xl mix-blend-overlay"/>
                                </FxFrame>
                            </FxReveal>

                            <FxReveal>
                                <div className="p-6 lg:p-12 relative z-10">
                                    <FxChip day={isDayTime} colorScheme="purple">HR INTERFACES</FxChip>
                                    <h3 className={`mt-4 text-[1.6em] font-[700] ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        Futuristic HR Interfaces
                                    </h3>
                                    <p className={`mt-4 text-[0.95em] ${isDayTime ? 'text-black/70' : 'text-white/75'}`}>
                                        A curated showcase of our premium HR product interfaces demonstrating clean information hierarchy, accessible interactions, and enterprise-ready integrations â€” presented with layered depth and cutting-edge visual treatments.
                                    </p>

                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Platform</div>
                                            <div className="text-lg font-[700] mt-1">Enterprise</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Users</div>
                                            <div className="text-lg font-[700] mt-1">Unlimited</div>
                                        </div>
                                        <div
                                            className={`p-3 rounded-lg text-center ${isDayTime ? 'bg-black/6 border border-black/6' : 'bg-white/6 border border-white/6'}`}>
                                            <div className="text-sm font-semibold">Uptime</div>
                                            <div className="text-lg font-[700] mt-1">99.9%</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-3">
                                        <FxButton href="/case-studies" day={isDayTime} colorScheme="purple">Explore Cases</FxButton>
                                        <FxButton href="/contact" day={isDayTime} variant="ghost" colorScheme="purple">Book Demo</FxButton>
                                    </div>

                                    <ul className={`mt-6 space-y-2 text-sm ${isDayTime ? 'text-black/70' : 'text-white/70'}`}>
                                        <li>â€¢ Talent Dashboard with real-time analytics</li>
                                        <li>â€¢ Collaborative workflows for seamless onboarding</li>
                                        <li>â€¢ Automated compliance and audit trails</li>
                                    </ul>
                                </div>
                            </FxReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations - Premium Futuristic 2-Column with Accordions */}
            <section className={`relative mx-auto lg:px-[4.6em] md:px-[4.6em] px-4 sm:px-6 lg:py-[10em] md:py-[8em] py-[4em] ${isDayTime ? 'bg-white' : 'bg-black'}`}>
                {/* Advanced Decorative Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <FxBackground day={isDayTime} className="opacity-25" />
                    <div className="absolute top-0 right-1/4 w-[900px] h-[900px] bg-gradient-to-br from-purple-600/15 to-transparent rounded-full blur-3xl transform -translate-y-1/4 translate-x-1/3"/>
                    <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl transform translate-y-1/4 -translate-x-1/3"/>
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-blue-500/8 to-transparent rounded-full blur-3xl transform translate-y-1/2"/>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <FxReveal>
                        <div className="text-center mb-16">
                            <FxChip day={isDayTime} colorScheme="purple" className="mb-6 inline-block">ENTERPRISE ECOSYSTEM</FxChip>
                            <h2 className="lg:text-[3.8em] md:text-[3em] text-[2em] font-[800] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
                                <span className={isDayTime ? 'text-black' : 'text-white'}>Integrated HR</span>
                                <br/>
                                <span className={`bg-gradient-to-r ${isDayTime ? 'from-purple-700 to-purple-600' : 'from-purple-400 to-purple-300'} bg-clip-text text-transparent`}>
                                    Technology Platform
                                </span>
                            </h2>
                            <p className={`text-[1em] font-[400] leading-[1.7] max-w-3xl mx-auto ${isDayTime ? 'text-black/65' : 'text-white/70'}`}>
                                12+ enterprise platforms. Real-time APIs. Advanced security. Seamless sync.
                            </p>
                        </div>
                    </FxReveal>

                    {/* 2-Column Layout */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* LEFT: Logo Showcase */}
                        <FxReveal>
                            <div className={`rounded-3xl overflow-hidden border backdrop-blur-xl p-12 sticky top-20 ${
                                isDayTime 
                                    ? 'bg-gradient-to-br from-purple-50/80 to-white/60 border-gray-200/50' 
                                    : 'bg-gradient-to-br from-purple-500/15 to-white/8 border-white/20'
                            }`}>
                                <div>
                                    <h3 className={`text-[1.3em] font-[700] mb-8 ${isDayTime ? 'text-black' : 'text-white'}`}>
                                        Connected Platforms
                                    </h3>
                                    
                                    {/* Logo Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-12">
                                        {integrations.map((integration, idx) => (
                                            <motion.div 
                                                key={integration.id}
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                                className={`p-4 rounded-xl flex items-center justify-center h-24 border transition-all ${
                                                    isDayTime 
                                                        ? 'bg-white/50 border-gray-200/40 hover:border-purple-300/60 hover:bg-white/70' 
                                                        : 'bg-white/8 border-white/15 hover:border-purple-400/50 hover:bg-white/12'
                                                }`}
                                            >
                                                <Image
                                                    src={isDayTime ? integration.logoLight : integration.logoDark}
                                                    alt={integration.alt}
                                                    width={48}
                                                    height={48}
                                                    className="object-contain"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className={`border-t ${isDayTime ? 'border-gray-200/40' : 'border-white/10'} pt-8 space-y-4`}>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Total Integrations</span>
                                            <span className={`text-lg font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>12+</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>API Support</span>
                                            <span className={`text-lg font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>REST/GraphQL</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-semibold ${isDayTime ? 'text-gray-600' : 'text-white/60'}`}>Uptime SLA</span>
                                            <span className={`text-lg font-[700] ${isDayTime ? 'text-purple-700' : 'text-purple-300'}`}>99.9%</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className={`mt-8 text-sm leading-[1.6] ${isDayTime ? 'text-black/60' : 'text-white/65'}`}>
                                        Enterprise-grade ecosystem with real-time synchronization, advanced security protocols, and intelligent workflow orchestration built for Fortune 500 scale.
                                    </p>
                                </div>
                            </div>
                        </FxReveal>

                        {/* RIGHT: Accordion Dropdowns */}
                        <div className="space-y-3">
                            {integrations.map((integration, index) => (
                                <FxReveal key={integration.id} delay={0.05 + index * 0.03}>
                                    <AccordionIntegrationAdvanced 
                                        integration={integration} 
                                        isDayTime={isDayTime}
                                        index={index}
                                    />
                                </FxReveal>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <FxReveal delay={0.6}>
                        <div className={`mt-20 rounded-2xl overflow-hidden border backdrop-blur-lg ${
                            isDayTime 
                                ? 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-400/50' 
                                : 'bg-gradient-to-r from-purple-600/40 to-purple-700/30 border-purple-400/30'
                        }`}>
                            <div className="p-12 lg:p-16 text-center">
                                <h3 className="text-[2em] font-[800] mb-4 text-white">
                                    Need Custom Integration?
                                </h3>
                                <p className={`text-[1em] max-w-2xl mx-auto mb-8 leading-[1.7] ${isDayTime ? 'text-white/90' : 'text-white/80'}`}>
                                    Our engineering architects build bespoke integrations tailored to your unique enterprise requirements.
                                </p>
                                <FxButton href="/contact" day={isDayTime} colorScheme="purple">
                                    Schedule Consultation
                                </FxButton>
                            </div>
                        </div>
                    </FxReveal>
                </div>
            </section>

        </div>
    );
};

export default HrTech;

