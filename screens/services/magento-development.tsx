'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import { useIsDayTime } from '../../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FxBackground, FxReveal, FxChip } from '@/components/futuristic/fx';
import Process90 from '@/components/futuristic/Process90';
import CountUp from 'react-countup';
import { CurrencyAwarePricing } from '@/components/ServicePageTemplate';

const MagentoDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - Magento Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/magento/hero.jpg"
        >
          <source src="/assets/magento/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/magento/hero.jpg"
          alt="Magento Development Hero"
          fill
          priority
          className="lg:hidden object-cover"
        />

        <div className="pointer-events-none absolute inset-0 z-[1]">
          <FxBackground day={false} grid={true} aurora={true} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50 z-[2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,212,0.12),transparent_50%)] z-[2]" />

        <div className="pointer-events-none absolute inset-0 z-[3]">
          <div className="gx-scanline" />
          <div className="gx-noise-overlay" />
          <div className="gx-orbit absolute" style={{ width: '60vmax', height: '60vmax', top: '-20vmax', right: '-20vmax', opacity: 0.12 }} />
          <div className="gx-orbit absolute" style={{ width: '40vmax', height: '40vmax', bottom: '-15vmax', left: '-10vmax', opacity: 0.08 }} />
        </div>

        <div className="absolute inset-0 flex items-center top-32 z-[11] px-6 sm:px-6 md:px-10 lg:px-[4.5em]">
          <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Magento E-Commerce</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Scalable E-Commerce <span className="gx-gradient-text">Platforms</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Magento 2 development, customization, and optimization. Enterprise e-commerce solutions that drive sales and scale effortlessly.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Magento 2", "Custom Extensions", "Performance", "Multi-Channel", "Payment Integration"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Launch Your Magento Store →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    See Our E-Commerce Success
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Stores Launched', value: '300+' },
                  { label: 'Gross Sales', value: '$2B+' },
                  { label: 'Conversion Lift', value: '40%' },
                  { label: 'Uptime', value: '99.99%' }
                ].map((stat) => (
                  <div key={stat.label} className="px-6 py-5 rounded-2xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md hover:bg-teal-400/12 transition-all duration-300 hover:border-teal-400/50 text-right">
                    <div className="text-teal-300 text-[0.7em] uppercase tracking-wider font-[600] mb-2">{stat.label}</div>
                    <div className="text-white text-[1.8em] font-[700]">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden absolute bottom-12 left-0 right-0 z-[11] px-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Stores', value: '300+' },
              { label: 'Sales', value: '$2B+' },
              { label: 'Uptime', value: '99.99%' }
            ].map((stat) => (
              <div key={stat.label} className="px-3 py-2 rounded-xl border border-teal-400/25 bg-teal-400/8 backdrop-blur-md">
                <div className="text-teal-300 text-[0.5em] uppercase tracking-wider font-[600] mb-1">{stat.label}</div>
                <div className="text-white text-[1.2em] font-[700]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/4 left-8 z-[4] w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
        <div className="absolute bottom-1/3 right-12 z-[4] w-3 h-3 rounded-full bg-teal-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-3/4 left-1/3 z-[4] w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Introduction Section */}
      <section className={`pt-16 transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <div>
            <FxChip day={!isDayTime}>MAGENTO DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                E-Commerce Excellence <span className="gx-gradient-text">With Magento</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Magento powers high-volume e-commerce—but building great stores requires expertise. We architect custom Magento solutions, optimize for conversion and speed, and scale to handle millions of daily transactions.</p>
                </div>
                <div>
                  <p>From store setup to custom extensions to multi-channel integration, we build Magento platforms that sell.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process90 totalDays={90} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            Magento<br className="lg:block md:block hidden" />Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From custom module development to full Adobe Commerce implementations and performance engineering, Grey InfoTech delivers Magento expertise at every level.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01', title: 'Custom Module Development', target: 'CM',
                tags: ['PHP', 'Service Contracts', 'DI', 'Plugin', 'Observer'],
                body: 'We build Magento modules that extend the platform without compromising upgrade compatibility—using service contracts, plugins and observers instead of class rewrites. Custom checkout steps, pricing algorithms, inventory integrations, loyalty programmes, product configurators and admin grids are built to Magento coding standards with comprehensive unit and integration tests.',
              },
              {
                id: '02', title: 'Adobe Commerce (Magento 2) Implementation', target: 'AI',
                tags: ['Adobe Commerce', 'Multi-store', 'B2B', 'B2C', 'Cloud'],
                body: 'We implement Adobe Commerce for enterprise merchants—configuring multi-store/multi-website architectures, B2B company accounts and shared catalogues, advanced pricing rules, tiered discounts and quote workflows. Adobe Commerce Cloud deployments include Cloud Docker, ECE Tools, environment configuration and integration with Adobe Experience Cloud services.',
              },
              {
                id: '03', title: 'Performance Optimisation', target: 'PO',
                tags: ['FPC', 'Varnish', 'Elasticsearch', 'Redis', 'CDN'],
                body: 'Magento performance determines revenue. We configure Varnish for full-page caching, tune Elasticsearch for fast catalogue search, implement Redis for sessions and cache, optimise slow database queries, configure JavaScript bundling and defer non-critical assets. We profile with Blackfire and New Relic to identify bottlenecks and deliver documented performance benchmarks before and after optimisation.',
              },
              {
                id: '04', title: 'Magento Upgrades & Migration', target: 'MU',
                tags: ['M1 to M2', '2.3 to 2.4', 'Data Migration', 'Extension Audit'],
                body: 'Upgrading Magento requires detailed preparation—extension compatibility audits, custom code refactoring, data migration testing and phased rollout planning. We have executed M1-to-M2 migrations and multiple minor version upgrades for merchants with millions of SKUs, preserving customer data, order history, catalogue configuration and URL structures throughout the process.',
              },
              {
                id: '05', title: 'Magento Integrations', target: 'IN',
                tags: ['ERP', 'SAP', 'NetSuite', 'OMS', 'PIM', 'Marketing'],
                body: 'Complex Magento stores require deep integration with surrounding systems. We build integrations with ERP systems (SAP, NetSuite, Sage), order management, PIM platforms, marketing automation, loyalty programmes and payment gateways. Integrations use Magento\'s API layer and message queues for asynchronous processing, with dead-letter handling and operational dashboards for visibility.',
              },
              {
                id: '06', title: 'Headless & PWA Commerce', target: 'HC',
                tags: ['PWA Studio', 'Vue Storefront', 'GraphQL', 'Next.js'],
                body: 'Headless Magento delivers the flexibility of a modern JavaScript frontend with Magento\'s commerce engine behind it. We build PWA storefronts using Magento\'s GraphQL API—either with Magento PWA Studio, Vue Storefront or a custom Next.js implementation. PWA storefronts deliver app-like performance, offline support and significantly faster page loads than server-rendered Magento themes.',
              },
            ].map((solution) => (
              <div key={solution.id} className="p-6 rounded-xl border border-teal-400/20 bg-teal-400/5 hover:bg-teal-400/10 transition-all">
                <h3 className="text-[1.5em] font-[600] mb-4">{solution.title}</h3>
                <p className="text-[0.95em] mb-4">{solution.body}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags?.map(tag => <span key={tag} className="px-2 py-1 text-[0.8em] rounded bg-teal-400/20 text-teal-300">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              { label: 'Magento Implementations', value: 150, suffix: '+' },
              { label: 'Stores Optimized for Scale', value: 300, suffix: '+' },
              { label: 'Total Commerce Processed', value: 2, suffix: 'B+' },
              { label: 'Performance Improvement', value: 65, suffix: '%' },
              { label: 'Enterprise Clients', value: 80, suffix: '+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6">
                <div className="text-[3em] lg:text-[4em] font-[700] text-teal-400 mb-2">
                  <CountUp end={stat.value} duration={2} />{stat.suffix}
                </div>
                <p className="text-[0.95em] font-[600]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] text-center">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] mb-6">
            Commerce at<br className="lg:block md:block hidden" />any scale
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">Magento rewards proper engineering. Grey InfoTech builds Adobe Commerce and Magento solutions that handle enterprise catalogue complexity and peak traffic without flinching.</p>
          <Link href="/quote-request">
            <button className="px-10 py-4 rounded-full bg-teal-400 text-black font-[600] hover:bg-teal-300 transition-all">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <CurrencyAwarePricing />
    </div>
  );
};

export default MagentoDevelopment;

