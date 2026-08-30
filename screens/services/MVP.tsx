import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const MVP = () => (
    <ServicePageTemplate
        title={<>MVP <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/mvp/cert.jpg', '/assets/mvp/prove.jpg', '/assets/mvp/start.jpg', '/assets/mvp/team.jpg']}
        intro={
            <>
                Rapid MVP development for startups and innovators. Validate your product concept, test market demand, and 
                prove business value with a focused, production-ready minimum viable product built to scale.
            </>
        }
        eyebrow={<>From concept to market <br className={'lg:block md:block hidden'}/>in weeks, not months</>}
        introHeading={<>MVP Development <br className={'lg:block md:block hidden'}/>That Validates Ideas</>}
        introBody={[
            <>
                Launching a startup requires speed, precision, and strategic thinking. An MVP is your opportunity to validate 
                your core idea with real users before investing in full-scale development. At Graham Sobiribo Paul, we specialize in 
                rapid MVP development that gets your product to market quickly, captures early adopters, and generates the 
                market feedback and traction needed to attract investment. We focus on essential features, clean architecture, 
                and reliable infrastructure to create products that prove concept viability.
            </>,
            <>
                Our MVP development process combines agile methodologies with proven technology stacks to accelerate time-to-market 
                without compromising quality. We build scalable foundations that support growth, implement comprehensive testing to 
                ensure reliability, and provide strategic guidance on feature prioritization. Whether you're validating a consumer 
                app, B2B platform, or enterprise solution, we deliver production-ready MVPs that work reliably from day one, giving 
                you the confidence to iterate based on real user feedback.
            </>,
        ]}
        solutionsHeading={<>MVP Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From concept validation and rapid prototyping to market testing and scaling, Graham Sobiribo Paul delivers comprehensive 
                MVP development services designed for startup success. We transform your vision into a focused, market-ready product 
                that proves business value and attracts investment.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Startup Validation MVP', target: 'SVM',
                tags: ['Concept Proof', 'User Validation', 'Rapid Development'],
                body: <>Rapidly prototype and validate your startup idea with a focused MVP that proves market fit and attracts 
                    early adopters. We prioritize essential features, build in weeks not months, and create a production-ready product 
                    that tests your core assumptions with real users.</>,
            },
            {
                id: '02', title: 'Market Testing Platform', target: 'MTP',
                tags: ['Market Testing', 'User Feedback', 'Iteration Ready'],
                body: <>Launch a minimal viable product to test market demand, gather user feedback, and refine your product vision 
                    quickly. Our MVPs provide the data and insights you need to make informed decisions about scaling and future 
                    development direction.</>,
            },
            {
                id: '03', title: 'Product Validation Engine', target: 'PVE',
                tags: ['Production Ready', 'Scalable', 'Feature-rich'],
                body: <>Build a production-ready MVP that validates core assumptions and demonstrates value before scaling to full 
                    development. We combine essential features, reliable infrastructure, and thoughtful UX to create MVPs that perform 
                    well and generate user engagement.</>,
            },
            {
                id: '04', title: 'Technical Architecture', target: 'TA',
                tags: ['Scalable Stack', 'Cloud Ready', 'Microservices'],
                body: <>We design scalable technical foundations that support growth beyond the MVP phase. Our architecture choices 
                    enable seamless scaling and feature addition as your product and user base expand.</>,
            },
            {
                id: '05', title: 'User Testing & Analytics', target: 'UTA',
                tags: ['User Analytics', 'Feedback Loop', 'Metrics'],
                body: <>We implement comprehensive analytics, user testing, and feedback collection to help you understand user 
                    behavior and validate assumptions. Our instrumentation provides actionable insights for product iteration and 
                    development prioritization.</>,
            },
            {
                id: '06', title: 'Investor-Ready Presentation', target: 'IRP',
                tags: ['Pitch Ready', 'Demo-friendly', 'Scalable'],
                body: <>Your MVP needs to impress investors. We build products with clean UI, compelling demos, and traction-driving 
                    features that help you tell a compelling story and secure funding for the next phase.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Certified to the Highest ISO Standards', image: '/assets/mvp/cert.jpg',
                description: <>Our development process is guided by industry best practices and strict quality standards, ensuring 
                    that every MVP we deliver is secure, reliable, and built for long-term success.</>,
            },
            {
                id: 2, title: 'Proven Expertise', image: '/assets/mvp/prove.jpg',
                description: <>With a history of launching high-impact MVPs that drive user adoption and attract investment, we're 
                    the strategic partner you can rely on to transform your vision into a scalable, market-ready product.</>,
            },
            {
                id: 3, title: 'Startup-Friendly Mindset', image: '/assets/mvp/start.jpg',
                description: <>We understand the strategic and operational challenges startups encounter, which is why we deliver 
                    customised solutions that align with your business goals, optimise resources, and position you for scalable growth.</>,
            },
            {
                id: 4, title: 'Quality Assurance', image: '/assets/mvp/team.jpg',
                description: <>Every MVP we build undergoes comprehensive, business-aligned testing to ensure it performs flawlessly, 
                    supports your strategic goals, and delivers a reliable foundation for growth and market entry.</>,
            },
        ]}
        ctaHeading={<>Launch your product <br className={'lg:block md:block hidden'}/>with confidence</>}
        ctaBody={<>From concept validation to market testing to product launch, Graham Sobiribo Paul delivers MVPs that prove business 
            value and attract investment. Let's validate your idea and accelerate your path to success.</>}
        stats={[
            {label: 'Years Experience', value: 6, suffix: '+'},
            {label: 'Team Members', value: 10, suffix: '+'},
            {label: 'MVPs Launched', value: 85, suffix: '+'},
            {label: 'Startups Funded', value: 65, suffix: '+'},
            {label: 'Client Success Rate', value: 94, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Chinedu Obi', title: 'Founder, TechStart Accelerator', message: <>Graham Sobiribo Paul delivered our MVP in just 8 weeks. The product is solid, users love it, and we've already raised Series A funding.</>},
            {name: 'Blessing Ifeoma', title: 'CEO, FinTech Startup', message: <>Their rapid development process is impressive. We went from idea to market in record time, and the quality is exceptional for an MVP.</>},
            {name: 'Tunde Adekunle', title: 'Founder, E-Learning Platform', message: <>Graham Sobiribo Paul understood our startup constraints and delivered a lean, effective MVP that helped us validate our market hypothesis quickly.</>},
        ]}
        verticalSolutions={[
            {
                id: 'vs1',
                title: 'Startup Validation',
                description: 'Rapidly prototype and validate your startup idea with a focused MVP that proves market fit and attracts early adopters.'
            },
            {
                id: 'vs2',
                title: 'Market Testing',
                description: 'Launch a minimal viable product to test market demand, gather user feedback, and refine your product vision quickly.'
            },
            {
                id: 'vs3',
                title: 'Product Validation',
                description: 'Build a production-ready MVP that validates core assumptions and demonstrates value before scaling to full development.'
            }
        ]}/>
);

export default MVP;
