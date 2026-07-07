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

const WordPressDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - WordPress Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/wordpress/hero.jpg"
        >
          <source src="/assets/wordpress/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/wordpress/hero.jpg"
          alt="WordPress Development Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">WordPress Solutions</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Enterprise WordPress <span className="gx-gradient-text">Platforms</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Custom WordPress development, optimization, and security. Powerful, flexible websites built on WordPress at enterprise scale.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Custom Themes", "Plugins", "Performance", "Security", "Multi-Site"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Build Your WordPress Site →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    See WordPress Portfolio
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Sites Built', value: '1K+' },
                  { label: 'Traffic Managed', value: '100M+ Monthly' },
                  { label: 'Uptime', value: '99.95%' },
                  { label: 'Client Satisfaction', value: '97%' }
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
              { label: 'Sites', value: '1K+' },
              { label: 'Traffic', value: '100M+' },
              { label: 'Uptime', value: '99.95%' }
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
            <FxChip day={!isDayTime}>WORDPRESS DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Enterprise WordPress <span className="gx-gradient-text">Solutions</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>WordPress powers millions of sites—but enterprise success requires careful architecture. We design WordPress solutions that scale, optimize for speed and SEO, and build custom functionality tailored to your business.</p>
                </div>
                <div>
                  <p>From custom theme development to plugin architecture to security hardening, we build WordPress platforms that grow with you.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process90 totalDays={75} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            WordPress<br className="lg:block md:block hidden" />Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From custom themes and plugins to headless WordPress and WooCommerce—Grey InfoTech builds WordPress experiences that perform and empower your editors.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01', title: 'Custom Theme Development', target: 'CT',
                tags: ['Block Themes', 'FSE', 'ACF', 'Responsive', 'Core Web Vitals'],
                body: 'We build custom WordPress themes following modern WordPress standards—block themes with Full Site Editing, theme.json for design tokens, and template parts for editorial flexibility. For more controlled designs we build classic themes with ACF Pro field groups and custom templates. All themes are responsive, accessible, optimised for Core Web Vitals and thoroughly tested across browsers and devices.',
              },
              {
                id: '02', title: 'Custom Plugin Development', target: 'CP',
                tags: ['Custom Post Types', 'REST API', 'Admin UI', 'Cron', 'Blocks'],
                body: 'We build WordPress plugins that add functionality without the overhead and security risk of third-party plugins. Custom post types, meta boxes, admin settings pages, REST API endpoints, custom Gutenberg blocks, WP-CLI commands and background job processing—all written to WordPress coding standards with proper data sanitisation, capability checks and nonce verification.',
              },
              {
                id: '03', title: 'WooCommerce Development', target: 'WC',
                tags: ['WooCommerce', 'Custom Extensions', 'Payment Gateways', 'Subscriptions'],
                body: 'WooCommerce is a powerful commerce platform when implemented correctly. We build custom WooCommerce extensions, integrate payment gateways (Paystack, Stripe, Flutterwave), implement subscription and membership models, build custom checkout flows and optimise WooCommerce performance for high-traffic stores. We also migrate from Shopify and Magento to WooCommerce where it is the right fit.',
              },
              {
                id: '04', title: 'Headless WordPress', target: 'HW',
                tags: ['WPGraphQL', 'REST API', 'Next.js', 'Faust.js', 'ISR'],
                body: 'Headless WordPress uses the CMS as a content management layer while a modern JavaScript frontend—typically Next.js—handles rendering. This delivers preview performance, better developer experience and full control over the frontend stack while keeping the familiar WordPress editing experience for content teams. We implement WPGraphQL or REST API, configure preview, handle authentication and deploy on Vercel or Netlify.',
              },
              {
                id: '05', title: 'Performance Optimisation', target: 'PO',
                tags: ['Object Cache', 'Redis', 'CDN', 'Image Optimisation', 'Lazy Load'],
                body: 'Slow WordPress sites lose visitors and rankings. We audit with Lighthouse and New Relic, implement Redis object caching, configure full-page caching with nginx FastCGI or WP Rocket, set up CDN for assets, optimise images with WebP conversion and implement lazy loading. We also eliminate render-blocking scripts, minimise plugin count and tune PHP-FPM for your traffic profile.',
              },
              {
                id: '06', title: 'WordPress Security & Maintenance', target: 'SM',
                tags: ['Hardening', 'Malware Removal', 'Updates', 'Backups', 'WAF'],
                body: 'WordPress sites are the most attacked CMS on the web. We harden WordPress by restricting file editing, changing default URL paths, implementing 2FA, configuring a WAF, managing plugin updates proactively and setting up automated backups with off-site storage. For compromised sites we provide malware removal, root-cause analysis and hardening to prevent reinfection.',
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
              { label: 'WordPress Sites Built', value: 1000, suffix: '+' },
              { label: 'Monthly Traffic Managed', value: 100, suffix: 'M+' },
              { label: 'Enterprise Clients', value: 200, suffix: '+' },
              { label: 'Uptime Guarantee', value: 99.95, suffix: '%' },
              { label: 'Client Satisfaction', value: 97, suffix: '%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6">
                <div className="text-[3em] lg:text-[4em] font-[700] text-teal-400 mb-2">
                  <CountUp end={stat.value} duration={2} decimals={stat.label.includes('Uptime') || stat.label.includes('Client') ? 2 : 0} />{stat.suffix}
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
            WordPress that<br className="lg:block md:block hidden" />won't let you down
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">Properly built WordPress is fast, secure and a joy to manage. Grey InfoTech builds WordPress sites that your editors love and your users never notice—because they just work.</p>
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

export default WordPressDevelopment;

