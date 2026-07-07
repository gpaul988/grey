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

const ShopifyDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - Shopify Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/shopify/hero.jpg"
        >
          <source src="/assets/shopify/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/shopify/hero.jpg"
          alt="Shopify Development Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Shopify Development</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Fast Track to <span className="gx-gradient-text">E-Commerce</span> Success
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Custom Shopify apps, themes, and integrations. Launch beautiful, high-converting e-commerce stores quickly.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Custom Apps", "Theme Design", "Integrations", "Performance", "Conversions"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Build Your Shopify Store →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    View Shopify Success Stories
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Stores Built', value: '500+' },
                  { label: 'Combined Revenue', value: '$500M+' },
                  { label: 'Avg Order Value', value: '+35%' },
                  { label: 'Customers Served', value: '100K+' }
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
              { label: 'Stores', value: '500+' },
              { label: 'Revenue', value: '$500M+' },
              { label: 'Customers', value: '100K+' }
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
            <FxChip day={!isDayTime}>SHOPIFY DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                High-Converting Shopify <span className="gx-gradient-text">Stores</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Shopify makes launching stores fast—but success comes from optimization, integrations, and user experience. We build custom Shopify applications, optimize conversion funnels, and integrate with your business systems.</p>
                </div>
                <div>
                  <p>From store design to custom development to analytics, we build Shopify solutions that grow revenue.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process90 totalDays={60} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            Shopify<br className="lg:block md:block hidden" />Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From custom theme development to headless Hydrogen storefronts and private apps, Grey InfoTech builds Shopify experiences that turn visitors into loyal customers.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01', title: 'Custom Theme Development', target: 'CT',
                tags: ['Liquid', 'Dawn', 'OS 2.0', 'Responsive', 'CRO'],
                body: 'We build custom Shopify themes from scratch or customise existing ones—creating unique, brand-aligned storefronts with Online Store 2.0 sections and blocks. Our Liquid code is clean, well-structured and documented so your team can manage content independently. Themes are performance-optimised for Core Web Vitals and tested across devices and browsers before launch.',
              },
              {
                id: '02', title: 'Shopify App Development', target: 'AD',
                tags: ['Public Apps', 'Private Apps', 'App Extensions', 'Shopify CLI'],
                body: 'We build custom Shopify apps—both private apps for single-store functionality and public apps for the Shopify App Store. App development covers Shopify\'s REST and GraphQL Admin APIs, storefront API, webhooks, billing API and OAuth integration. We follow Shopify\'s app review guidelines and build apps with proper rate-limit handling, error recovery and comprehensive logging.',
              },
              {
                id: '03', title: 'Headless Shopify (Hydrogen)', target: 'HS',
                tags: ['Hydrogen', 'Remix', 'Oxygen', 'Storefront API', 'React'],
                body: 'Headless Shopify with Hydrogen and Remix delivers the fastest, most flexible storefront possible—a React-based frontend connected to Shopify\'s commerce engine via the Storefront API, deployed on Shopify Oxygen. We design headless architectures that preserve Shopify\'s checkout reliability while giving you complete control over the browsing experience, enabling advanced personalisation and sub-second page loads.',
              },
              {
                id: '04', title: 'Shopify Plus & Enterprise', target: 'SP',
                tags: ['Checkout Extensibility', 'Flow', 'Launchpad', 'B2B'],
                body: 'Shopify Plus unlocks powerful customisation for high-volume merchants. We implement checkout extensions and UI extensions, build Flow automations, configure Launchpad for flash sales, implement B2B wholesale portals and integrate with ERPs, WMS and fulfilment systems. We handle the complexity of multi-currency, multi-market and multi-storefront setups.',
              },
              {
                id: '05', title: 'Migration to Shopify', target: 'MS',
                tags: ['WooCommerce', 'Magento', 'BigCommerce', 'Data Migration'],
                body: 'We migrate stores from WooCommerce, Magento, BigCommerce and other platforms to Shopify with full data integrity—products, variants, metafields, customers, order history, reviews and blog content. We map URL structures and implement 301 redirects to protect SEO equity, and run the migration in parallel with your live store to ensure zero revenue disruption during cutover.',
              },
              {
                id: '06', title: 'Shopify Integrations', target: 'SI',
                tags: ['ERP', 'POS', 'Inventory', 'Marketing', 'Analytics'],
                body: 'A Shopify store is only as powerful as its integrations. We connect Shopify to your ERP, inventory management system, marketing automation platform, customer support tools, accounting software and analytics stack. Integrations are built with proper error handling, retry logic and reconciliation processes so your operational data stays in sync without manual intervention.',
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
              { label: 'Custom Shopify Stores Built', value: 500, suffix: '+' },
              { label: 'Combined Merchant Revenue', value: 500, suffix: 'M+' },
              { label: 'Average AOV Improvement', value: 35, suffix: '%' },
              { label: 'Customers Served', value: 100, suffix: 'K+' },
              { label: 'App Store Launches', value: 50, suffix: '+' },
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
            A Shopify store<br className="lg:block md:block hidden" />that earns its keep
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">A beautiful store that doesn't convert is just expensive decoration. Grey InfoTech builds Shopify experiences engineered to generate revenue from day one.</p>
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

export default ShopifyDevelopment;

