import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const Music = () => (
    <ServicePageTemplate
        title={<>Music Software <br className={'lg:block md:block hidden'}/>Development Services</>}
        heroVideo="/assets/hero/hero.mp4"
        midImage="/assets/services/product-design.jpg"
        topImages={['/assets/services/Web-App-Development-company.jpg', '/assets/services/services.jpg']}
        intro={
            <>
                Bringing sound to life—streaming platforms, music apps, artist tools and royalty systems built
                for flawless playback, discovery and fair payouts at scale.
            </>
        }
        eyebrow={<>Technology that <br className={'lg:block md:block hidden'}/>makes music move</>}
        introHeading={<>Music Technology <br className={'lg:block md:block hidden'}/>How We Amplify It</>}
        introBody={[
            <>
                Music lives online now—streamed, shared, discovered and monetised through software. Grey InfoTech
                builds the platforms that power it. We develop music streaming services, artist and label tools,
                social music apps, royalty and distribution systems, and the audio infrastructure that delivers
                flawless playback at scale. From smart recommendations and curated playlists to live streaming
                and fan engagement, we engineer experiences that listeners love and that give artists new ways to
                reach and grow their audience. Whether you&apos;re launching a streaming startup, building tools for
                creators, or modernising a label&apos;s operations, we turn musical ambition into reliable products.
            </>,
            <>
                Music software has unique demands—seamless audio streaming, huge catalogues, real-time discovery,
                and the complex business of rights and royalties. We architect adaptive streaming and CDN-backed
                delivery for instant, gapless playback on any connection, build recommendation and search that
                surface the right track at the right moment, and engineer accurate royalty and distribution
                systems that ensure artists and rights-holders are paid fairly and transparently. With secure
                handling of content and payments, plus the scale to support millions of listeners, we deliver
                music platforms that perform beautifully and run as a sound business.
            </>,
        ]}
        solutionsHeading={<>Music <br className={'lg:block md:block hidden'}/>Software <br className={'lg:block md:block hidden'}/>Solutions</>}
        solutionsIntro={
            <>
                From streaming platforms and artist tools to royalty systems, Grey InfoTech builds music software
                that performs. Based in Nigeria and serving clients globally, we engineer flawless playback,
                smart discovery and fair payouts at scale.
            </>
        }
        solutions={[
            {
                id: '01', title: 'Streaming Platforms', target: 'SP',
                tags: ['Adaptive Audio', 'CDN', 'Catalogue'],
                body: <>We build streaming services with adaptive, gapless audio delivery over CDNs, vast
                    searchable catalogues, and reliable playback on any device and connection—the core experience
                    every listener expects, engineered to feel instant.</>,
            },
            {
                id: '02', title: 'Discovery & Recommendations', target: 'DR',
                tags: ['ML', 'Playlists', 'Search'],
                body: <>We engineer recommendation engines, curated playlists and powerful search that surface
                    the right music at the right moment—keeping listeners engaged and helping artists find new
                    audiences.</>,
            },
            {
                id: '03', title: 'Artist & Label Tools', target: 'AL',
                tags: ['Uploads', 'Analytics', 'Distribution'],
                body: <>We develop tools for artists and labels—uploads and catalogue management, audience and
                    streaming analytics, and distribution to platforms—giving creators control and insight over
                    their music and careers.</>,
            },
            {
                id: '04', title: 'Royalty & Rights Management', target: 'RM',
                tags: ['Royalties', 'Payouts', 'Transparency'],
                body: <>We build accurate royalty and rights systems that track plays, calculate splits and
                    automate transparent payouts—so artists and rights-holders are paid fairly, and your platform
                    stays trusted and compliant.</>,
            },
            {
                id: '05', title: 'Social & Live Music Apps', target: 'SL',
                tags: ['Sharing', 'Live Streaming', 'Fan Engagement'],
                body: <>We create social and live music experiences—sharing, comments, live streaming and fan
                    engagement—that turn listening into a community and give artists direct, monetisable
                    connection with their fans.</>,
            },
            {
                id: '06', title: 'Payments, Security & Scale', target: 'PS',
                tags: ['Subscriptions', 'Content Security', 'Cloud'],
                body: <>We integrate subscriptions and in-app purchases, protect content and rights with strong
                    security, and architect cloud infrastructure that scales to millions of listeners without a
                    skip in playback.</>,
            },
        ]}
        reasons={[
            {
                id: 1, title: 'Flawless Playback', image: '/assets/services/Web-App-Development-company.jpg',
                description: <>Adaptive streaming and CDN delivery mean instant, gapless audio on any connection—
                    because nothing loses a listener faster than buffering.</>,
            },
            {
                id: 2, title: 'Discovery That Engages', image: '/assets/services/product-design.jpg',
                description: <>Smart recommendations and search keep listeners exploring and artists discovered—
                    turning a catalogue into an experience.</>,
            },
            {
                id: 3, title: 'Fair, Transparent Royalties', image: '/assets/services/services.jpg',
                description: <>Accurate tracking and automated, transparent payouts keep artists and
                    rights-holders trusting your platform—and keep you compliant.</>,
            },
            {
                id: 4, title: 'Scales to Millions', image: '/assets/services/digital-optimisation.jpg',
                description: <>From launch to mass adoption, our cloud architecture streams to millions of
                    listeners without missing a beat.</>,
            },
        ]}
        ctaHeading={<>Build the sound <br className={'lg:block md:block hidden'}/>of tomorrow</>}
        ctaBody={<>From streaming platforms and artist tools to royalty systems, Grey InfoTech builds music
            software that delights listeners and empowers creators. Let&apos;s bring your music platform to life.</>}
        faqs={[
            {q: 'What music software do you build?', a: 'Streaming platforms, music and audio apps, artist and label tools, recommendation engines, royalty and rights-management systems, social and live music apps, and the audio infrastructure behind them—for streaming startups, creators and labels.'},
            {q: 'How do you ensure smooth audio playback?', a: 'We use adaptive bitrate streaming and CDN-backed delivery so audio plays instantly and gaplessly across devices and connection speeds, with offline support where needed.'},
            {q: 'Can you build music recommendations?', a: 'Yes. We engineer recommendation engines, curated playlists and powerful search using machine learning, surfacing the right tracks to keep listeners engaged and help artists get discovered.'},
            {q: 'How do you handle royalties and rights?', a: 'We build systems that accurately track plays, calculate splits across rights-holders, and automate transparent payouts, helping keep your platform fair, trusted and compliant.'},
            {q: 'Can you support millions of listeners?', a: 'Absolutely. We architect scalable cloud and streaming infrastructure that grows from launch to mass adoption without degrading playback quality.'},
            {q: 'How is content protected?', a: 'We apply strong security and access controls to protect audio content and rights, and integrate secure payments for subscriptions and purchases.'},
        ]}
        testimonials={[
            {name: 'Tega Okoro', title: 'Founder, AfroWave', message: <>Grey InfoTech built our streaming platform with flawless playback and smart recommendations. Our listeners stay engaged for hours and artists love the analytics.</>},
            {name: 'Naledi Khumalo', title: 'CEO, SoundLink', message: <>Their royalty system finally gave our artists transparent, accurate payouts. That trust transformed our relationships with creators.</>},
            {name: 'Ibrahim Sule', title: 'Product Lead, LiveBeat', message: <>The live music and fan-engagement features they built created a real community around our app. Streaming scales effortlessly even during big drops.</>},
        ]}
    />
);

export default Music;
