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

const QATesting: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - QA Testing */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/qa/hero.jpg"
        >
          <source src="/assets/qa/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/qa/hero.jpg"
          alt="QA Testing Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">QA & Testing Services</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Ship Software <span className="gx-gradient-text">With Confidence</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Comprehensive testing—manual, automated, and performance—that catches defects before users do and ensures quality at every release.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Manual Testing", "Test Automation", "Performance", "Security Testing", "CI/CD Integration"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Improve Your Quality →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    See QA Success Stories
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Defects Prevented', value: '10K+' },
                  { label: 'Test Coverage', value: '95%' },
                  { label: 'Automation Rate', value: '90%' },
                  { label: 'Uptime', value: '99.8%' }
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
              { label: 'Defects', value: '10K+' },
              { label: 'Coverage', value: '95%' },
              { label: 'Uptime', value: '99.8%' }
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
            <FxChip day={!isDayTime}>QA & TESTING</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Quality First <span className="gx-gradient-text">Ship Confidence</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Quality assurance isn't a gate at the end—it's discipline woven through engineering. We embed QA with your development teams, writing tests in parallel with code, automating regression suites, and defining acceptance criteria upfront. This shift-left approach catches defects early, when they're cheapest to fix.</p>
                </div>
                <div>
                  <p>We combine manual exploratory testing with robust automation frameworks, covering functional, regression, integration, performance and security testing. Measurable quality improvement every release.</p>
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
            QA &amp; Testing Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From manual exploratory testing to full CI-integrated automation frameworks, Grey InfoTech provides the quality assurance capability your product deserves.</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01',
                title: 'Manual & Exploratory Testing',
                body: 'Our QA engineers conduct structured manual testing for functional correctness, edge cases and user experience. We run exploratory sessions to uncover issues automated tests miss, manage detailed test cases in tools like TestRail or Zephyr, and produce comprehensive defect reports with reproduction steps, severity ratings and screenshots or screen recordings.',
                tags: ['Functional', 'Regression', 'Exploratory', 'UAT']
              },
              {
                id: '02',
                title: 'Test Automation',
                body: 'We build automation frameworks that run in your CI pipeline and give fast, reliable feedback on every pull request. Our front-end automation uses Playwright or Cypress for end-to-end tests; mobile automation uses Appium or Detox. We design page-object patterns, data-driven test structures and retry logic so suites stay maintainable as your product evolves.',
                tags: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Jest']
              },
              {
                id: '03',
                title: 'API & Integration Testing',
                body: 'APIs are the backbone of modern applications and a prime source of defects. We build API test suites covering happy paths, error handling, authentication, rate limiting and schema validation. For microservices we implement contract testing with Pact to catch integration breaks between services before they reach a shared environment.',
                tags: ['Postman', 'REST Assured', 'Pact', 'Contract Testing']
              },
              {
                id: '04',
                title: 'Performance & Load Testing',
                body: 'Performance problems under load destroy user trust. We design load test scenarios that simulate realistic traffic patterns, identify throughput ceilings, measure latency percentiles and expose memory leaks or connection pool exhaustion. Using k6 or Gatling with cloud execution, we run tests at scale and provide actionable optimisation recommendations with before/after benchmarks.',
                tags: ['k6', 'Gatling', 'JMeter', 'Locust']
              },
              {
                id: '05',
                title: 'Mobile App Testing',
                body: 'Mobile testing is uniquely complex—device fragmentation, OS versions, gesture interactions and network conditions all affect quality. We test across real devices using cloud device farms (AWS Device Farm, BrowserStack), write Appium and XCUITest suites for automated regression, and conduct manual testing across the device matrix most representative of your user base.',
                tags: ['iOS', 'Android', 'Device Farm', 'Appium', 'XCUITest']
              },
              {
                id: '06',
                title: 'Security & Accessibility Testing',
                body: 'Quality extends beyond functional correctness. We integrate OWASP ZAP into CI for automated security scanning, conduct manual OWASP Top 10 reviews and run accessibility audits against WCAG 2.1 AA standards using Axe and manual assistive-technology testing. Products that pass our quality bar are not just bug-free—they are secure and inclusive.',
                tags: ['OWASP', 'WCAG 2.1', 'Axe', 'ZAP']
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

      {/* CTA Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em] text-center">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] mb-6">
            Quality is not optional
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">Every bug that reaches production costs 10× more to fix than one caught in development. Grey InfoTech makes quality a competitive advantage, not an afterthought.</p>
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

export default QATesting;
