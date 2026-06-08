import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const SocialNetworking = () => (
    <ServicePageTemplate
        title="Social Networking"
        heroImage="/assets/services/Web-App-Development-company.jpg"
        midImage="/assets/services/product-design.jpg"
        intro={
            <>
                We design and build social networking platforms—from niche communities and
                creator networks to large-scale social apps,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for real-time interaction,
                engagement and growth.
            </>
        }
        eyebrow={<>Communities that <br className={'lg:block md:block hidden'}/>connect and scale</>}
        introHeading="Social Platform Engineering"
        introBody={[
            <>
                Great social products live or die on engagement. At Grey InfoTech we build social
                networking platforms that keep people coming back—combining real-time feeds, messaging,
                notifications and rich media with the performance and reliability needed to handle rapid
                community growth. Whether you are launching a niche community, a creator economy product
                or a full-scale social app, we focus on the experience and the infrastructure together.
            </>,
            <>
                Behind every smooth feed is hard engineering: efficient data models, scalable real-time
                infrastructure, smart caching and recommendation logic that surfaces the right content.
                We pair these with thoughtful moderation tools, privacy controls and analytics so your
                platform stays safe, healthy and measurable as your user base expands from hundreds to
                millions.
            </>,
        ]}
        solutionsHeading="Our Social Networking Solutions"
        solutions={[
            {
                id: '01', title: 'Feeds & Content Sharing', target: 'FC',
                tags: ['Timelines', 'Media', 'Ranking'],
                body: <>We build dynamic, personalised feeds with support for text, images, video and
                    stories. Using efficient ranking and pagination strategies, we deliver fast, relevant
                    timelines that keep users scrolling—backed by media pipelines that handle uploads,
                    transcoding and delivery at scale.</>,
            },
            {
                id: '02', title: 'Real-Time Messaging', target: 'RM',
                tags: ['Chat', 'WebSockets', 'Notifications'],
                body: <>We develop one-to-one and group messaging with typing indicators, read receipts,
                    presence and push notifications. Built on WebSockets and reliable event infrastructure,
                    our chat systems feel instant and stay consistent across devices.</>,
            },
            {
                id: '03', title: 'Profiles & Social Graph', target: 'SG',
                tags: ['Follows', 'Connections', 'Discovery'],
                body: <>We model the social graph that powers your network—follows, friendships, groups and
                    recommendations. Our discovery features help users find relevant people and content,
                    driving the network effects that make social products sticky.</>,
            },
            {
                id: '04', title: 'Moderation & Safety', target: 'MS',
                tags: ['Reporting', 'Privacy', 'Admin Tools'],
                body: <>We build the trust-and-safety layer every community needs: reporting and blocking,
                    content moderation workflows, granular privacy controls and admin dashboards—keeping your
                    platform welcoming and compliant as it grows.</>,
            },
        ]}
        faqs={[
            {q: 'Can you handle real-time features at scale?', a: 'Yes. We architect real-time messaging and notifications using WebSockets, pub/sub systems and horizontally scalable infrastructure designed to grow with your user base.'},
            {q: 'Do you build moderation and safety tools?', a: 'Absolutely. We include reporting, blocking, privacy controls and admin moderation dashboards as core parts of every social platform we build.'},
            {q: 'Can you integrate recommendation and discovery features?', a: 'Yes. We implement content ranking, people-you-may-know and discovery feeds tailored to your engagement and growth goals.'},
        ]}
        testimonials={[
            {name: 'Chidi Okafor', title: 'Founder, NaijaConnect', message: <>Grey InfoTech built our community app from scratch—real-time chat, feeds and moderation tools that just work. Our engagement numbers speak for themselves.</>},
            {name: 'Sara Bello', title: 'Product Lead, CreatorLoop', message: <>They understood social UX deeply. The feed feels fast, the messaging is rock solid, and the platform scaled smoothly through our launch spike.</>},
        ]}
    />
);

export default SocialNetworking;
