'use client';

import React from 'react';
import { useIsDayTime } from '../../components/useIsDayTime';
import FuturisticServiceLayout, { ServiceIntro, ServiceSectionBlock, ServiceStatsRow } from '@/components/futuristic/FuturisticServiceLayout';
import FuturisticDevelopmentProcess from '@/components/FuturisticDevelopmentProcess';

/**
 * Redesigned App Store Optimization page — futuristic, immersive, and professional.
 * Uses the shared FuturisticServiceLayout so changes propagate across service pages.
 */
export default function AppStoreOptimization(): React.ReactElement {
  const isDayTime = useIsDayTime();

  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'process', label: 'Process' },
  ];

  const stats = [
    { label: 'Years Experience', value: 8 },
    { label: 'Products Launched', value: 150 },
    { label: 'Team Members', value: 10 },
    { label: 'Avg Organic Lift (%)', value: 120 },
  ];

  return (
    <FuturisticServiceLayout
      isDayTime={isDayTime}
      title="App Store Optimization"
      eyebrow="Mobile Growth"
      subtitle="Data-driven ASO that increases visibility, conversion and downloads"
      heroImage="/assets/aso/hero.jpg"
      navSections={navSections}
      stats={stats}
      ctaHref="/quote-request"
      ctaLabel="Talk to an ASO expert"
    >

      <ServiceIntro
        isDayTime={isDayTime}
        chip="ASO"
        heading={<>App Store Optimization</>}
        body={<>We combine keyword intelligence, conversion-focused creative, and continuous experimentation to make your app discoverable and highly converting in app stores.</>}
      />

      <ServiceSectionBlock
        isDayTime={isDayTime}
        id="strategy"
        number="01"
        title="Research & Strategy"
        body={<>Competitive analysis, keyword opportunity modeling, and a prioritized roadmap focused on high-impact, high-intent terms and localized markets.</>}
        image="/assets/aso/engine.jpg"
      />

      <ServiceSectionBlock
        isDayTime={isDayTime}
        id="creative"
        number="02"
        title="Creative & Store Assets"
        body={<>Design-first app icons, screenshots, and preview videos optimized for conversion with continuous A/B testing and store-specific best practices.</>}
        image="/assets/aso/hero.jpg"
      />

      <ServiceSectionBlock
        isDayTime={isDayTime}
        id="optimization"
        number="03"
        title="Keywords & Metadata"
        body={<>Metadata engineering, long-tail keyword capture, and structured experiments to maximize indexation and search ranking across stores and regions.</>}
        image="/assets/aso/aso.mp4"
      />

      <FuturisticDevelopmentProcess day={isDayTime} description="Iterative ASO loop: Discover → Test → Iterate → Scale. We pair data science with creative experimentation to unlock organic growth." />

      <div className="py-12">
        <ServiceStatsRow isDayTime={isDayTime} stats={stats.map(s => ({ label: s.label, value: s.value }))} />
      </div>

    </FuturisticServiceLayout>
  );
}
