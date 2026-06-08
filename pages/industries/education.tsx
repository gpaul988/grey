import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Education = () => (
    <ServicePageTemplate
        title="Education"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/product-design.jpg"
        intro={
            <>
                We build education technology that engages learners—LMS platforms, e-learning apps and
                virtual classrooms,{' '}
                <br className={'lg:block md:block hidden'}/>designed for outcomes and scale.
            </>
        }
        eyebrow={<>Technology that <br className={'lg:block md:block hidden'}/>helps people learn</>}
        introHeading="EdTech Engineering"
        introBody={[
            <>
                Education technology has the power to make learning accessible, personal and engaging. At
                Grey InfoTech we build platforms that help institutions, educators and edtech startups
                deliver great learning experiences—whether that&apos;s a full learning management system, an
                interactive e-learning app, or a live virtual classroom. We focus on what keeps learners
                motivated and what helps educators teach effectively.
            </>,
            <>
                Behind every smooth learning experience is solid engineering: reliable video, robust content
                management, progress tracking and assessments that scale to thousands of concurrent users.
                We build accessible, mobile-friendly platforms with analytics that show educators what&apos;s
                working—so you can improve outcomes, not just deliver content.
            </>,
        ]}
        solutionsHeading="Our Education Solutions"
        solutions={[
            {
                id: '01', title: 'Learning Management Systems', target: 'LM',
                tags: ['Courses', 'Enrolment', 'Tracking'],
                body: <>We build full LMS platforms with course management, enrolment, progress tracking and
                    certificates—everything institutions need to deliver structured learning online.</>,
            },
            {
                id: '02', title: 'E-Learning & Mobile Apps', target: 'EL',
                tags: ['Interactive', 'Offline', 'Gamification'],
                body: <>We develop engaging e-learning apps with interactive lessons, gamification and offline
                    access—keeping learners motivated on any device.</>,
            },
            {
                id: '03', title: 'Virtual Classrooms', target: 'VC',
                tags: ['Live Video', 'Whiteboard', 'Chat'],
                body: <>We create live virtual classrooms with reliable video, whiteboards, screen sharing and
                    chat—bringing real-time teaching online at scale.</>,
            },
            {
                id: '04', title: 'Assessments & Analytics', target: 'AA',
                tags: ['Quizzes', 'Grading', 'Insights'],
                body: <>We build assessment tools with quizzes, auto-grading and rich analytics that give
                    educators clear insight into learner progress and engagement.</>,
            },
        ]}
        faqs={[
            {q: 'Can you build for large numbers of learners?', a: 'Yes. We architect platforms to handle thousands of concurrent users, with reliable video and content delivery that scales smoothly during peak usage.'},
            {q: 'Do you support mobile and offline learning?', a: 'Absolutely. We build mobile-friendly, accessible apps—often with offline access—so learners can study anywhere, on any device.'},
            {q: 'Can you include assessments and progress tracking?', a: 'Yes. Quizzes, auto-grading, certificates and detailed analytics are core features we build into education platforms.'},
        ]}
        testimonials={[
            {name: 'Adaeze Okafor', title: 'Founder, LearnBridge', message: <>Grey InfoTech built our LMS and mobile app from the ground up. Learner engagement jumped and our educators finally have the analytics they needed.</>},
            {name: 'Joseph Kamau', title: 'Director, SkillUp Academy', message: <>Their virtual classroom is rock solid—reliable video and great tools. Teaching online finally feels as natural as the real thing.</>},
        ]}
    />
);

export default Education;
