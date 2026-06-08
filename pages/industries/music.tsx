import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Music = () => (
    <ServicePageTemplate
        title="Music"
        heroImage="/assets/services/product-design.jpg"
        midImage="/assets/services/Web-App-Development-company.jpg"
        intro={
            <>
                We build music technology—streaming apps, artist platforms and audio tools,{' '}
                <br className={'lg:block md:block hidden'}/>engineered for great sound and seamless experience.
            </>
        }
        eyebrow={<>Technology for <br className={'lg:block md:block hidden'}/>the music industry</>}
        introHeading="Music Tech Engineering"
        introBody={[
            <>
                Music is experienced, not just consumed. At Grey InfoTech we build platforms that put great
                listening and creator tools at the centre—streaming apps, artist dashboards, fan engagement
                and audio products. We care about the things that make music tech feel premium: instant
                playback, smooth discovery and reliable delivery across devices.
            </>,
            <>
                Behind the scenes we handle the hard parts of audio at scale: efficient streaming,
                low-latency playback, rights and royalty tracking, and recommendation systems that surface
                the right music. Whether you&apos;re building for listeners, artists or labels, we deliver
                platforms that are fast, scalable and built around how people really enjoy music.
            </>,
        ]}
        solutionsHeading="Our Music Solutions"
        solutions={[
            {
                id: '01', title: 'Streaming Platforms', target: 'SP',
                tags: ['Playback', 'Playlists', 'Offline'],
                body: <>We build music streaming apps with instant playback, playlists, offline listening and
                    smooth cross-device sync—delivering a premium listening experience.</>,
            },
            {
                id: '02', title: 'Artist & Label Platforms', target: 'AL',
                tags: ['Dashboards', 'Royalties', 'Analytics'],
                body: <>We develop tools for artists and labels—release management, royalty tracking and
                    analytics that show how their music performs and earns.</>,
            },
            {
                id: '03', title: 'Discovery & Recommendations', target: 'DR',
                tags: ['Search', 'Recommendations', 'Curation'],
                body: <>We build discovery features and recommendation engines that help listeners find new
                    music and keep them engaged for longer.</>,
            },
            {
                id: '04', title: 'Audio Tools & Fan Engagement', target: 'FE',
                tags: ['Audio', 'Community', 'Monetisation'],
                body: <>We create audio tools and fan-engagement features—communities, exclusive content and
                    monetisation—that connect artists with their audiences.</>,
            },
        ]}
        faqs={[
            {q: 'Can you handle audio streaming at scale?', a: 'Yes. We build efficient, low-latency streaming with adaptive delivery and offline support, architected to scale to large audiences.'},
            {q: 'Do you support royalty and rights tracking?', a: 'Absolutely. We build royalty and analytics tools that track plays, revenue and performance for artists and labels.'},
            {q: 'Can you add recommendations and discovery?', a: 'Yes. We implement search, curation and recommendation engines that help listeners discover music and stay engaged.'},
        ]}
        testimonials={[
            {name: 'Kelechi Obi', title: 'Founder, AfroWave', message: <>Grey InfoTech built our streaming app with flawless playback and smart discovery. Our listeners stay longer and our artists love the analytics.</>},
            {name: 'Lerato Dube', title: 'Head of Product, SoundHub', message: <>Their royalty and artist dashboards are exactly what our label needed—clear, accurate and a joy to use.</>},
        ]}
    />
);

export default Music;
