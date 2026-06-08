import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const SocialNetworking = () => (
    <ServicePageTemplate
        title={<>Social Networking <br className={'lg:block md:block hidden'}/>App Development</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/product-design.jpg', '/assets/services/Web-App-Development-company.jpg']}
        intro={
            <>
                Communities people love—real-time feeds, chat, profiles and content sharing, engineered to scale
                to millions while keeping users safe, engaged and coming back.
            </>
        }
        eyebrow={<>Building communities <br className={'lg:block md:block hidden'}/>that grow and last</>}
        introHeading={<>Social Platforms <br className={'lg:block md:block hidden'}/>Built to Scale and Engage</>}
        introBody={[
            <>
                A great social network lives or dies on engagement and trust—and both depend on engineering done
                right. Grey InfoTech builds social and community platforms end to end: real-time feeds, messaging,
                profiles, content sharing, notifications and discovery, all wrapped in interfaces that feel fast
                and effortless. We design the data models, APIs and real-time infrastructure that let
                conversations flow instantly, and we architect from the start for the scale every social product
                hopes to reach. Whether you&apos;re launching a niche community, a creator platform, or the next
                large-scale network, we build the foundation that keeps users active and coming back.
            </>,
            <>
                Scale and safety are inseparable in social products. We engineer for millions of concurrent users
                with horizontally scalable back-ends, real-time technologies like WebSockets, efficient feed
                ranking, caching and search, plus media handling that stays fast under load. Just as importantly,
                we build the trust and safety layer—content moderation, reporting, privacy controls and abuse
                prevention—that protects your community and your brand. Combined with thoughtful engagement
                mechanics, analytics and notification strategies, we deliver social platforms that don&apos;t just
                launch, but grow, retain and thrive.
            </>,
        ]}
        solutionsHeading={<>Social App <br className={'lg:block md:block hidden'}/>Development <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From real-time feeds and messaging to moderation and scale, Grey InfoTech delivers the full social
                platform stack. Based in Nigeria and working globally, we build community products that are fast,
                safe and engaging—engineered to grow from launch to millions of users.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Feeds & Content Sharing', target: 'FC',
                tags: ['Timelines', 'Ranking', 'Media', 'Discovery'],
                body: <>We build dynamic feeds and content-sharing systems—timelines, ranking algorithms, media
                    uploads, hashtags and discovery—that surface the right content at the right time. Efficient
                    fan-out and caching keep feeds fast even as your content volume and audience grow.</>,
            },
            {
                id: '02', title: 'Real-Time Chat & Messaging', target: 'RC',
                tags: ['WebSockets', '1:1 & Group', 'Presence', 'Media'],
                body: <>We engineer real-time messaging with WebSockets—one-to-one and group chats, typing and
                    presence indicators, read receipts, media sharing and push notifications. Conversations feel
                    instant and reliable, even at high concurrency.</>,
            },
            {
                id: '03', title: 'Profiles, Social Graph & Auth', target: 'PG',
                tags: ['Follow/Friend', 'OAuth', 'Privacy', 'Search'],
                body: <>We design rich user profiles and the social graph that connects them—follows, friendships,
                    groups and recommendations—with secure authentication (including social login) and granular
                    privacy controls that put users in command of their data and visibility.</>,
            },
            {
                id: '04', title: 'Notifications & Engagement', target: 'NE',
                tags: ['Push', 'In-App', 'Gamification', 'Retention'],
                body: <>We build notification and engagement systems—push and in-app alerts, activity feeds,
                    reactions and gamification—that bring users back without overwhelming them. Smart, well-timed
                    nudges that lift retention and daily active usage.</>,
            },
            {
                id: '05', title: 'Trust, Safety & Moderation', target: 'TS',
                tags: ['Reporting', 'Moderation', 'Abuse Prevention'],
                body: <>We implement the safety layer every social platform needs—content moderation (manual and
                    automated), reporting and blocking, spam and abuse prevention, and admin tooling—protecting
                    your community, your users and your brand from harm.</>,
            },
            {
                id: '06', title: 'Scalable Infrastructure & Analytics', target: 'SI',
                tags: ['Cloud', 'Caching', 'Search', 'Insights'],
                body: <>We architect back-ends that scale horizontally to millions of users—load-balanced
                    services, caching, search, media CDNs and observability—and add analytics that reveal how your
                    community behaves, so you can grow it with data, not guesswork.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Engineered for Scale', image: '/assets/services/product-design.jpg',
                description: <>Social products succeed suddenly. We architect feeds, messaging and infrastructure
                    to handle millions of users from day one, so growth becomes a celebration—not a crisis.</>,
            },
            {
                id: 2, title: 'Real-Time by Design', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Instant feeds, chat and notifications keep communities alive. We build the
                    real-time infrastructure that makes interactions feel immediate and effortless.</>,
            },
            {
                id: 3, title: 'Trust & Safety Built In', image: '/assets/services/services.jpg',
                description: <>Moderation, reporting, privacy and abuse prevention protect your users and brand.
                    We treat safety as core engineering, not an afterthought.</>,
            },
            {
                id: 4, title: 'Designed for Retention', image: '/assets/services/digital-optimisation.jpg',
                description: <>Thoughtful engagement mechanics, notifications and analytics turn first-time
                    visitors into daily active users who keep coming back.</>,
            },
        ]}
        ctaHeading={<>Launch a community <br className={'lg:block md:block hidden'}/>that thrives</>}
        ctaBody={<>From real-time feeds and chat to moderation and scale, Grey InfoTech builds social platforms
            engineered to engage and grow. Let&apos;s build a community your users love—and that&apos;s ready for the
            day it takes off.</>}
        faqs={[
            {q: 'Can you build a social app that scales to millions of users?', a: 'Yes. We architect for scale from the start—horizontally scalable services, efficient feed fan-out, caching, search, media CDNs and observability—so your platform grows smoothly from launch to millions of active users.'},
            {q: 'Do you implement real-time chat and feeds?', a: 'Absolutely. We use WebSockets and proven real-time infrastructure to deliver instant messaging, live feeds, presence and notifications that feel immediate even at high concurrency.'},
            {q: 'How do you handle content moderation and safety?', a: 'We build a full trust and safety layer: automated and manual moderation, reporting and blocking, spam and abuse prevention, privacy controls and admin tooling—protecting your community and brand.'},
            {q: 'Can you build for both web and mobile?', a: 'Yes. We build responsive web apps and native or cross-platform mobile apps (including Flutter and React Native), sharing a common API and real-time back-end so the experience is consistent everywhere.'},
            {q: 'What about monetisation?', a: 'We can integrate subscriptions, in-app purchases, ads, creator payouts and tipping, designing monetisation that fits your community without harming the experience that keeps users engaged.'},
            {q: 'How do you keep users engaged and retained?', a: 'We design engagement mechanics—personalised feeds, well-timed notifications, reactions, gamification and discovery—backed by analytics that show what works, so you can grow retention with data.'},
        ]}
        stats={[
            {label: 'Years Experience', value: 8, suffix: '+'},
            {label: 'Team Members', value: 13, suffix: '+'},
            {label: 'Platforms Launched', value: 40, suffix: '+'},
            {label: 'Projects Delivered', value: 200, suffix: '+'},
            {label: 'Client Satisfaction', value: 98, suffix: '%'},
        ]}
        testimonials={[
            {name: 'Kemi Adewale', title: 'Founder, NaijaConnect', message: <>Grey InfoTech built our social platform from scratch—feeds, chat, moderation, the lot. It scaled effortlessly when we went viral, and the safety tooling kept our community healthy.</>},
            {name: 'David Mensah', title: 'CEO, CreatorHub', message: <>Their real-time messaging and notification work transformed engagement on our creator platform. Daily active users climbed steadily after launch.</>},
            {name: 'Fatima Sani', title: 'Product Lead, StudyCircle', message: <>They understood that safety and scale matter as much as features. Our student community feels fast, fun and secure—exactly what we hoped for.</>},
        ]}
    />
);

export default SocialNetworking;
