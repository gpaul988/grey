import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const SportsTechIndustry = () => (
    <ServicePageTemplate
        title={<>Sports<br className="lg:block md:block hidden" />Technology</>}
        heroVideo="/assets/hero/hero.mp4"
        heroVideoMobile="/assets/hero/hero.mp4"
        midImage="/assets/services/services.jpg"
        topImages={['/assets/services/Development.jpg', '/assets/services/digital-transformatio.jpg']}
        intro="Fan engagement platforms, sports analytics, ticketing systems and athlete performance tools that power the next generation of sport—from grassroots to elite."
        eyebrow="SportsTech for the next generation of sport"
        introHeading={<>Sport Powered<br className="lg:block md:block hidden" />by Data</>}
        introBody={[
            <>Sport is no longer just about what happens on the pitch. Data analytics, fan engagement
            platforms, digital ticketing, athlete tracking and fantasy sports are reshaping how sport is
            played, watched and monetised. At Grey InfoTech we build sports technology that serves clubs,
            federations, sports media companies and sports betting operators—engineering the digital
            infrastructure that connects athletes, coaches, fans and commercial partners in a seamless
            digital ecosystem.</>,
            <>Our sports technology team brings deep experience building high-concurrency systems—fan platforms
            that handle the instantaneous spikes of match day, live data pipelines that process real-time
            stats and betting markets, and mobile apps that are the primary touchpoint between clubs and
            their supporters. We understand African sport: the fan demographics, mobile-first behaviour,
            payment preferences and the commercial opportunity in football, athletics and e-sports across
            the continent.</>,
        ]}
        solutionsHeading={<>Sports Technology<br className="lg:block md:block hidden" />Solutions</>}
        solutionsIntro="From fan engagement apps to sports analytics platforms and digital ticketing, Grey InfoTech builds sports technology that monetises fandom and elevates athletic performance."
        solutions={[
            {
                id: '01', title: 'Fan Engagement Platforms', target: 'FE',
                tags: ['Mobile App', 'Community', 'Loyalty', 'Second Screen'],
                body: <>We build official club apps and fan platforms with live match updates, player
                statistics, fan community features, loyalty programmes and exclusive content. Second-screen
                experiences deliver real-time data, polls and interactive features that keep fans engaged
                throughout the match—increasing session time, merchandise sales and subscription revenue.</>,
            },
            {
                id: '02', title: 'Sports Analytics & Performance', target: 'SA',
                tags: ['Player Tracking', 'Video Analysis', 'Wearables', 'Data Visualisation'],
                body: <>Elite performance requires elite data. We build sports analytics platforms that
                ingest player tracking data, wearable sensor streams and video analysis outputs—presenting
                coaches with actionable dashboards covering physical load, tactical patterns and opposition
                analysis. Data pipelines handle real-time ingestion and historical analysis for session
                planning and contract decision support.</>,
            },
            {
                id: '03', title: 'Digital Ticketing & Access Control', target: 'DT',
                tags: ['E-Ticket', 'QR Code', 'Turnstile Integration', 'Season Tickets'],
                body: <>We build digital ticketing platforms covering event creation, seat selection, mobile
                ticket delivery, NFC/QR access control and turnstile integration. Season ticket management,
                resale marketplaces and premium hospitality booking are additional modules that maximise
                revenue per seat. Real-time stadium occupancy dashboards give operations teams visibility
                throughout the event day.</>,
            },
            {
                id: '04', title: 'Fantasy Sports & Prediction Games', target: 'FS',
                tags: ['Fantasy Football', 'Prediction Games', 'Leaderboards', 'Prizes'],
                body: <>Fantasy sports and prediction games are powerful fan retention tools and monetisation
                vectors. We build fantasy sports platforms with real-time player data integration, private
                leagues, live scoring, prize management and anti-abuse controls. Prediction game mechanics—
                match result forecasts, player stat predictions—are built for rapid deployment around
                live fixtures.</>,
            },
            {
                id: '05', title: 'Sports Betting Technology', target: 'SB',
                tags: ['Odds Engine', 'In-play Betting', 'Risk Management', 'Compliance'],
                body: <>We build sports betting platforms and operator tools—odds integration, bet placement
                flows, in-play betting with real-time data feeds, wallet management, responsible gambling
                controls and regulatory reporting for operators licensed by the National Lottery Regulatory
                Commission. We work with betting operators and their technology partners to build fast,
                reliable wagering infrastructure.</>,
            },
            {
                id: '06', title: 'Sports Broadcast & OTT', target: 'OT',
                tags: ['Live Streaming', 'Rights Management', 'Subscriptions', 'Clips'],
                body: <>Sports media rights are increasingly monetised through owned digital channels. We
                build sports OTT platforms with live streaming, on-demand archives, highlight clip
                engines and subscription or pay-per-view monetisation. Low-latency delivery for live
                sport, in-stream statistics overlays and social sharing features are standard components
                of our sports broadcasting stack.</>,
            },
        ]}
        ctaHeading={<>Where sport meets<br className="lg:block md:block hidden" />technology</>}
        ctaBody="The sports organisations that invest in digital infrastructure today are building the loyal, data-rich fan relationships that will define the next decade. Grey InfoTech makes it happen."
        faqs={[
            {q: 'Do you work with Nigerian sports federations and clubs?', a: 'Yes. We work with football clubs, athletics federations and sports organisations across Nigeria and the wider African market.'},
            {q: 'Can you build a fantasy football app?', a: 'Yes—fantasy football, prediction games, mini-games and loyalty mechanics built for African football fans on mobile-first architecture.'},
            {q: 'Do you integrate with live sports data providers?', a: 'Yes. We integrate with Opta, Stats Perform, SportRadar and other data providers for real-time statistics and odds feeds.'},
            {q: 'Can you handle high concurrency on match day?', a: 'Designing for match-day spikes is core to our sports platform architecture—auto-scaling, CDN, database read replicas and queue-based processing.'},
        ]}
    />
);

export default SportsTechIndustry;
