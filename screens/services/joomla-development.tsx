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

const JoomlaDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - Joomla Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/joomla/hero.jpg"
        >
          <source src="/assets/joomla/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/joomla/hero.jpg"
          alt="Joomla Development Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Joomla CMS</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Flexible CMS <span className="gx-gradient-text">Solutions</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Custom Joomla development, extensions, and optimization. Enterprise content management with Joomla.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Custom Components", "Extensions", "Multi-Language", "Performance", "Security"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Build Your Joomla Site →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    View Joomla Examples
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Joomla Sites', value: '200+' },
                  { label: 'Content Items', value: '1M+' },
                  { label: 'Daily Visitors', value: '50M+' },
                  { label: 'Client Retention', value: '94%' }
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
              { label: 'Sites', value: '200+' },
              { label: 'Content', value: '1M+' },
              { label: 'Visitors', value: '50M+' }
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
            <FxChip day={!isDayTime}>JOOMLA DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Content Management <span className="gx-gradient-text">Excellence</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Joomla's flexibility and power make it ideal for complex content management—but building great implementations takes expertise. We architect custom Joomla solutions, build powerful extensions, and optimize for performance.</p>
                </div>
                <div>
                  <p>From site architecture to custom development to multi-language support, we deliver Joomla solutions that work at scale.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process90 totalDays={85} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            Joomla<br className="lg:block md:block hidden" />Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From custom components to full enterprise portals, Grey InfoTech delivers Joomla development that's clean, fast and built to last.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01', title: 'Custom Component & Plugin Development', target: 'CC',
                tags: ['MVC', 'Components', 'Plugins', 'Modules'],
                body: 'We build bespoke Joomla components, plugins and modules following the MVC architecture and Joomla extension standards. Custom features—membership systems, booking engines, directory listings, custom forms—are built as proper extensions rather than hacked templates, making them upgrade-safe and independently maintainable.',
              },
              {
                id: '02', title: 'Template & Theme Development', target: 'TD',
                tags: ['Custom Templates', 'Responsive', 'Page Builder', 'Accessibility'],
                body: 'We design and build custom Joomla templates that deliver pixel-perfect, responsive interfaces optimised for Core Web Vitals. Our templates use clean semantic HTML, optimised asset loading and proper Joomla override architecture so template customisations survive core updates. We also build on frameworks like Helix or YOOtheme Pro where clients prefer a page builder workflow.',
              },
              {
                id: '03', title: 'Joomla Migration & Upgrades', target: 'MU',
                tags: ['J3 to J4', 'J4 to J5', 'Platform Migration', 'Data Integrity'],
                body: 'Joomla version migrations require careful planning to preserve content, user accounts, extensions and SEO rankings. We audit your current installation, identify incompatible extensions, map migration risks and execute a phased upgrade with full database backups and rollback capability. We also handle migrations from other CMS platforms—WordPress, Drupal—to Joomla.',
              },
              {
                id: '04', title: 'Performance Optimisation', target: 'PO',
                tags: ['Caching', 'CDN', 'Image Optimisation', 'Core Web Vitals'],
                body: 'A slow Joomla site hurts SEO and loses visitors. We profile your site using GTmetrix and Lighthouse, implement Joomla\'s caching framework correctly, configure a CDN, optimise images and eliminate render-blocking resources. Clients typically achieve 50–80% improvement in page load times and significant Core Web Vitals score improvements after optimisation.',
              },
              {
                id: '05', title: 'Joomla Security Hardening', target: 'SH',
                tags: ['Security Audit', 'Malware Removal', 'Firewall', '2FA'],
                body: 'Joomla sites are frequent targets for automated attacks. We conduct security audits, remove malware, implement a web application firewall, enforce 2FA for admin accounts, harden file permissions, disable unused PHP functions and configure automated security update pipelines. We also set up uptime monitoring and breach notification alerts.',
              },
              {
                id: '06', title: 'Enterprise Portals & Multilingual Sites', target: 'EP',
                tags: ['Multilingual', 'Memberships', 'ACL', 'Integrations'],
                body: 'Joomla\'s access control system and multilingual capabilities make it ideal for enterprise portals and international sites. We architect complex multi-language sites, implement role-based content access, integrate with SSO providers, CRMs and payment gateways, and build custom member dashboards that extend Joomla\'s native user management.',
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
              { label: 'Joomla Sites Launched', value: 200, suffix: '+' },
              { label: 'Content Items Managed', value: 1, suffix: 'M+' },
              { label: 'Daily Site Visitors', value: 50, suffix: 'M+' },
              { label: 'Client Retention Rate', value: 94, suffix: '%' },
              { label: 'Enterprise Clients', value: 120, suffix: '+' },
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
            Joomla done<br className="lg:block md:block hidden" />properly
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">Joomla rewards expertise. Grey InfoTech builds Joomla sites that perform, stay secure and empower your editors to manage content without developer help.</p>
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

export default JoomlaDevelopment;

