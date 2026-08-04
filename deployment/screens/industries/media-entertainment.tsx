import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const MediaEntertainmentIndustry = () => (
    <ServicePageTemplate
        title={<>Media &amp;<br className="lg:block md:block hidden" />Entertainment</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Streaming platforms, content management systems, creator tools and audience analytics that power the next generation of digital media and entertainment experiences."
        eyebrow="Technology for storytellers and content creators"
        introHeading={<>Entertainment<br className="lg:block md:block hidden" />Engineered</>}
        introBody={[
            <>The media and entertainment industry has been transformed by streaming, social platforms and
            creator economies -and the technology that powers successful media businesses is increasingly
            complex. At Grey InfoTech we build the platforms, tools and infrastructure that help content
            creators, broadcasters, publishers and entertainment companies deliver compelling experiences
            to their audiences. From video streaming platforms to digital publishing systems and creator
            monetisation tools, we engineer for engagement and scale.</>,
            <>Our media technology practice understands the unique requirements of content-intensive systems -
            high-bandwidth video delivery, content protection, rights management, recommendation algorithms
            and the real-time analytics that drive editorial and product decisions. We work with African media
            companies navigating the shift from linear broadcast to digital-first distribution, and with
            global entertainment businesses entering African markets. We build for the connectivity realities
            of our market: adaptive bitrate streaming, offline viewing and low-data mode are standard
            considerations in our media platform designs.</>,
        ]}
        solutionsHeading={<>Media &amp; Entertainment<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From video streaming platforms to creator monetisation tools and audience analytics, Grey InfoTech builds media technology that audiences love and businesses scale on."
        solutions={[
            {
                id: '01', title: 'Video Streaming Platforms', target: 'VS',
                tags: ['OTT', 'HLS', 'DASH', 'ABR', 'CDN', 'DRM'],
                body: <>We build OTT video streaming platforms with adaptive bitrate delivery, content
                protection using Widevine and FairPlay DRM, multi-device support and offline download
                capability. Our streaming architectures use CDN distribution for global performance,
                transcode pipelines for multi-quality delivery and detailed playback analytics for
                content and infrastructure optimisation.</>,
            },
            {
                id: '02', title: 'Content Management & Publishing', target: 'CM',
                tags: ['Headless CMS', 'Editorial Workflow', 'DAM', 'Multi-platform'],
                body: <>Content teams need flexible tools that support multi-platform distribution without
                duplicating effort. We build headless CMS platforms with structured content models,
                editorial approval workflows, digital asset management and API distribution to web,
                mobile, smart TV and syndication channels. Editorial teams get intuitive tools;
                distribution teams get clean APIs.</>,
            },
            {
                id: '03', title: 'Creator Tools & Monetisation', target: 'CT',
                tags: ['Subscriptions', 'Pay-per-view', 'Creator Economy', 'Payouts'],
                body: <>We build creator platforms with the tools creators need to build sustainable
                businesses -channel management, subscription tiers, pay-per-view events, merchandise
                integration, fan communities and automated payout processing. Platforms are designed
                to maximise creator retention and give them the data they need to understand and
                grow their audience.</>,
            },
            {
                id: '04', title: 'Audience Analytics & Personalisation', target: 'AA',
                tags: ['Recommendation Engine', 'A/B Testing', 'Cohort Analysis', 'Real-time'],
                body: <>Audience data is a media company&apos;s most valuable strategic asset. We build
                analytics platforms that capture viewing behaviour, content performance and user
                journeys, then feed recommendation engines that personalise the content experience.
                We also build editorial analytics dashboards that help commissioning teams understand
                what content drives acquisition, engagement and retention.</>,
            },
            {
                id: '05', title: 'Live Streaming & Events', target: 'LS',
                tags: ['Live Video', 'Interactive', 'Pay-per-view', 'Low Latency'],
                body: <>Live events -concerts, sports, conferences, ceremonies -require real-time reliability
                at scale. We build live streaming infrastructure with low-latency delivery, concurrent
                viewer capacity, live chat and interactive features, pay-per-view ticketing and
                post-event VOD archiving. We design for peak traffic events where performance cannot
                be negotiated.</>,
            },
            {
                id: '06', title: 'Gaming & Interactive Entertainment', target: 'GI',
                tags: ['Game Backends', 'Leaderboards', 'Matchmaking', 'In-app Purchase'],
                body: <>We build the server-side infrastructure for games and interactive entertainment -
                player authentication and profiles, real-time leaderboards, matchmaking services,
                in-app purchase flows, virtual currency systems and game analytics. For African studios
                we design for the mobile-first, low-latency requirements of the Nigerian and pan-African
                gaming market.</>,
            },
        ]}
        ctaHeading={<>Technology that<br className="lg:block md:block hidden" />entertains at scale</>}
        ctaBody="Great content deserves great technology. Grey InfoTech builds the platforms that bring your stories to millions -reliably, beautifully and on every screen."/>
);

export default MediaEntertainmentIndustry;

