import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Education = () => (
    <ServicePageTemplate
        title={<>Education Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/product-design.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/Development.jpg']}
        intro={
            <>
                Transforming how the world learns—LMS platforms, virtual classrooms, e-learning apps and school
                management systems that make education engaging, accessible and measurable.
            </>
        }
        eyebrow={<>EdTech that makes <br className={'lg:block md:block hidden'}/>learning stick</>}
        introHeading={<>Education Technology <br className={'lg:block md:block hidden'}/>How We Empower Learning</>}
        introBody={[
            <>
                Education is being reinvented by technology, and learners now expect engaging, personalised,
                always-available experiences. Grey InfoTech builds the platforms that deliver them. We develop
                learning management systems, e-learning apps, virtual classrooms and school management software
                that make teaching and learning more effective—interactive content, assessments, progress
                tracking, live and recorded classes, and analytics that show educators exactly how their
                students are doing. Whether you run a school, a university, a training company, or an EdTech
                startup, we build products that engage learners, support teachers and scale to thousands of
                concurrent users.
            </>,
            <>
                Great EdTech is more than content delivery—it&apos;s about outcomes, accessibility and
                administration working together. We design platforms that personalise learning paths, gamify
                engagement, and surface analytics that help educators intervene early. We build accessible,
                multi-device experiences so learning happens anywhere, integrate video, payments and
                certification, and engineer the administrative backbone—enrolment, scheduling, grading and
                reporting—that keeps institutions running. With secure handling of student data and the ability
                to scale during exam seasons and enrolment peaks, we deliver education software that improves
                results and stands up to real-world demand.
            </>,
        ]}
        solutionsHeading={<>Education <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From LMS platforms and virtual classrooms to school management and e-learning apps, Grey InfoTech
                builds EdTech that works. Based in Nigeria and serving clients globally, we engineer engaging,
                accessible and scalable learning experiences.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Learning Management Systems', target: 'LM',
                tags: ['Courses', 'Assessments', 'Tracking'],
                body: <>We build full-featured LMS platforms—course creation, content delivery, quizzes and
                    assessments, progress tracking and certificates—giving educators the tools to teach
                    effectively and learners a clear path through their studies.</>,
            },
            {
                id: '02', title: 'Virtual Classrooms & Live Learning', target: 'VC',
                tags: ['Video', 'Whiteboard', 'Recording'],
                body: <>We develop virtual classroom experiences with live video, interactive whiteboards, chat,
                    breakout rooms and recordings—recreating the energy of in-person teaching online and making
                    it available on demand.</>,
            },
            {
                id: '03', title: 'E-Learning & Mobile Apps', target: 'EL',
                tags: ['Interactive', 'Offline', 'Gamification'],
                body: <>We craft engaging e-learning web and mobile apps—interactive lessons, gamification,
                    offline access and microlearning—that keep learners motivated and let education happen
                    anywhere, on any device.</>,
            },
            {
                id: '04', title: 'School & Institution Management', target: 'SM',
                tags: ['Enrolment', 'Grading', 'Scheduling', 'Reporting'],
                body: <>We build the administrative backbone—enrolment, attendance, scheduling, grading, fees and
                    reporting—plus parent and teacher portals, so institutions run smoothly and everyone stays
                    informed.</>,
            },
            {
                id: '05', title: 'Personalisation & Analytics', target: 'PA',
                tags: ['Adaptive', 'Insights', 'Early Intervention'],
                body: <>We add adaptive learning paths and analytics that reveal how each student is progressing,
                    helping educators personalise teaching and intervene early—turning data into better learning
                    outcomes.</>,
            },
            {
                id: '06', title: 'Payments, Security & Scale', target: 'PS',
                tags: ['Payments', 'Student Data', 'Cloud'],
                body: <>We integrate payments and certification, protect sensitive student data with strong
                    security, and architect for scale so platforms stay fast during exam seasons and enrolment
                    peaks.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Engagement That Lasts', image: '/assets/services/product-design.jpg',
                description: <>Interactivity, gamification and thoughtful UX keep learners motivated—because
                    completed courses, not just enrolments, are what matter.</>,
            },
            {
                id: 2, title: 'Outcomes, Not Just Content', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Adaptive paths and analytics help educators see progress and intervene early,
                    turning platforms into genuine drivers of learning outcomes.</>,
            },
            {
                id: 3, title: 'Accessible Everywhere', image: '/assets/services/Development.jpg',
                description: <>Multi-device, accessible and offline-capable experiences mean learning isn&apos;t
                    limited by location, device or connectivity.</>,
            },
            {
                id: 4, title: 'Scales for Peak Demand', image: '/assets/services/digital-optimisation.jpg',
                description: <>Exam seasons and enrolment surges won&apos;t break your platform—we architect for the
                    spikes that education inevitably brings.</>,
            },
        ]}
        ctaHeading={<>Build the future <br className={'lg:block md:block hidden'}/>of learning</>}
        ctaBody={<>From LMS platforms and virtual classrooms to school management systems, Grey InfoTech builds
            EdTech that engages learners and empowers educators. Let&apos;s create a learning experience that
            delivers real outcomes.</>}
        faqs={[
            {q: 'What education software do you build?', a: 'Learning management systems, virtual classrooms, e-learning web and mobile apps, school and institution management systems, assessment tools, and analytics platforms—for schools, universities, training providers and EdTech startups.'},
            {q: 'Can you build live virtual classrooms?', a: 'Yes. We develop live video classrooms with interactive whiteboards, chat, breakout rooms and recording, so teaching feels engaging in real time and remains available on demand.'},
            {q: 'How do you keep learners engaged?', a: 'Through interactive content, gamification, microlearning, progress tracking and thoughtful UX—plus adaptive learning paths and analytics that personalise the experience and help educators support each learner.'},
            {q: 'Do you build administrative features too?', a: 'Absolutely. We build the full administrative backbone—enrolment, attendance, scheduling, grading, fees, reporting and parent/teacher portals—so institutions run smoothly.'},
            {q: 'How do you protect student data?', a: 'We apply strong security, encryption and access control, with attention to the privacy regulations governing student and minor data, so sensitive information stays protected.'},
            {q: 'Can the platform handle exam-season traffic?', a: 'Yes. We architect scalable cloud infrastructure so your platform stays fast and reliable during exam periods, enrolment peaks and rapid growth.'},
        ]}
        testimonials={[
            {name: 'Funmi Adebayo', title: 'Founder, LearnBridge', message: <>Grey InfoTech built our LMS and mobile app, and engagement soared. Course completion rates are the best we&apos;ve ever seen. They clearly understand learners.</>},
            {name: 'Joseph Mwangi', title: 'IT Director, Summit Academy', message: <>Their school management system transformed our admin—enrolment, grading and parent portals all in one place. It even held up flawlessly through exam season.</>},
            {name: 'Aisha Garba', title: 'CEO, SkillUp Africa', message: <>The virtual classroom platform they built feels alive—live video, whiteboards, recordings. Our trainers and students love it, and it scales beautifully.</>},
        ]}
    />
);

export default Education;
