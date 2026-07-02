'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useIsDayTime } from '../../components/useIsDayTime';
import FuturisticServiceLayout, { ServiceIntro, ServiceSectionBlock, ServiceStatsRow } from '@/components/futuristic/FuturisticServiceLayout';
import FuturisticDevelopmentProcess from '@/components/FuturisticDevelopmentProcess';

/**
 * Futuristic App Store Optimization page — polished, responsive, and free of layout glitches.
 * Leverages existing FuturisticServiceLayout primitives and smooth motion for a professional finish.
 */
export default function AppStoreOptimization(): React.ReactElement {
  const isDayTime = useIsDayTime();

  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'process', label: 'Process' },
  ];

    const stats = [\n    { label: 'Years Experience', value: 8 },\n    { label: 'Products Launched', value: 150 },\n    { label: 'Team Members', value: 10 },\n    { label: 'Avg Organic Lift (%)', value: 120 },\n  ];

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

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10">
        <ServiceIntro
          isDayTime={isDayTime}
          chip="ASO"
          heading={<>App Store Optimization</>}
          body={<>We combine keyword intelligence, conversion-focused creative, and continuous experimentation to make your app discoverable and highly converting in app stores.</>}
        />

        <div className="max-w-6xl mx-auto grid gap-12 md:gap-20 mt-12 px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }}>
            <ServiceSectionBlock
              isDayTime={isDayTime}
              id="strategy"
              number="01"
              title="Research & Strategy"
              body={<>Competitive analysis, keyword opportunity modeling, and a prioritized roadmap focused on high-impact, high-intent terms and localized markets.</>}
              image="/assets/aso/engine.jpg"
            />
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <ServiceSectionBlock
              isDayTime={isDayTime}
              id="creative"
              number="02"
              title="Creative & Store Assets"
              body={<>Design-first app icons, screenshots, and preview videos optimized for conversion with continuous A/B testing and store-specific best practices.</>}
              image="/assets/aso/creative.jpg"
            />
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
            <ServiceSectionBlock
              isDayTime={isDayTime}
              id="optimization"
              number="03"
              title="Keywords & Metadata"
              body={<>Metadata engineering, long-tail keyword capture, and structured experiments to maximize indexation and search ranking across stores and regions.</>}
              image="/assets/aso/metadata.jpg"
            />
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-16">
          <FuturisticDevelopmentProcess day={isDayTime} description="Iterative ASO loop: Discover → Test → Iterate → Scale. We pair data science with creative experimentation to unlock organic growth." />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <ServiceStatsRow isDayTime={isDayTime} stats={stats} />
        </div>
      </motion.div>

    </FuturisticServiceLayout>
  );
}


