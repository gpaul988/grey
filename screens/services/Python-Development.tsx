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

const PythonDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - Python Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/python/hero.jpg"
        >
          <source src="/assets/python/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/python/hero.jpg"
          alt="Python Development Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Python Development</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Scalable Backend Systems <span className="gx-gradient-text">Powered by Python</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Django, FastAPI, and scientific computing. Enterprise Python development for web applications, machine learning, and data science.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Django", "FastAPI", "ML/AI", "Data Science", "Real-Time Systems"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Build Your Python Backend →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    Explore Python Examples
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Services Built', value: '400+' },
                  { label: 'Code Quality', value: 'A Grade' },
                  { label: 'Deployment Time', value: '5 mins' },
                  { label: 'Performance', value: '10x Improvement' }
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
              { label: 'Services', value: '400+' },
              { label: 'Quality', value: 'A Grade' },
              { label: 'Speed', value: '5min' }
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
            <FxChip day={!isDayTime}>PYTHON DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Python-Powered Backend <span className="gx-gradient-text">At Enterprise Scale</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Python's flexibility and speed make it ideal for rapid development—but production success requires rigorous architecture. We build Python backends with Django and FastAPI, design scalable services, and optimize for performance and reliability.</p>
                </div>
                <div>
                  <p>From REST APIs to machine learning pipelines to real-time systems, we deliver Python solutions that power your business.</p>
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
            Python Development Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">
            From web APIs and data engineering to automation and machine learning, Grey InfoTech delivers the full breadth of Python development. Based in Nigeria and working globally, we build performant, well-tested Python systems that scale—turning complex requirements into reliable software.
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01',
                title: 'Web APIs & Back-Ends',
                tags: ['Django', 'FastAPI', 'Flask', 'REST/GraphQL'],
                body: 'We build robust, high-performance back-ends and APIs with Django, FastAPI and Flask—clean architecture, secure authentication, and well-documented REST or GraphQL endpoints. From monoliths to microservices, we engineer services that handle real traffic reliably and stay easy to extend.'
              },
              {
                id: '02',
                title: 'Data Engineering & Pipelines',
                tags: ['ETL', 'Airflow', 'Pandas', 'Warehousing'],
                body: 'We design and build data pipelines that ingest, clean, transform and load data at scale. Using Airflow, Pandas and modern warehousing, we move information reliably between systems and prepare it for analytics, reporting and machine learning—so your decisions rest on trustworthy data.'
              },
              {
                id: '03',
                title: 'Machine Learning & AI',
                tags: ['scikit-learn', 'PyTorch', 'TensorFlow', 'NLP'],
                body: 'We build and deploy machine-learning models for forecasting, classification, recommendation, computer vision and NLP. From data preparation and training to serving models behind reliable APIs and monitoring them in production, we turn data into intelligence that drives real business outcomes.'
              },
              {
                id: '04',
                title: 'Automation & Scripting',
                tags: ['Workflows', 'Scraping', 'Integrations'],
                body: 'We automate the repetitive and the complex—data scraping, report generation, system integrations and scheduled workflows—freeing your team from manual effort and reducing errors. Reliable automation that quietly does the heavy lifting day after day.'
              },
              {
                id: '05',
                title: 'Cloud, DevOps & Deployment',
                tags: ['Docker', 'CI/CD', 'AWS', 'Observability'],
                body: 'We containerise, deploy and operate Python services with Docker, CI/CD pipelines and cloud infrastructure on AWS, Azure or GCP. With monitoring, logging and autoscaling in place, your applications stay fast, observable and resilient under real-world load.'
              },
              {
                id: '06',
                title: 'Modernisation & Support',
                tags: ['Refactoring', 'Migration', 'Testing', 'Maintenance'],
                body: 'We refactor legacy Python, migrate to modern frameworks and Python versions, add test coverage, and provide ongoing maintenance. We bring ageing codebases up to current standards so they stay secure, performant and a pleasure to build on.'
              }
            ].map((solution) => (
              <div key={solution.id} className="p-6 rounded-xl border border-teal-400/20 bg-teal-400/5 hover:bg-teal-400/10 transition-all">
                <h3 className="text-[1.5em] font-[600] mb-4">{solution.title}</h3>
                <p className="text-[0.95em] mb-4">{solution.body}</p>
                <div className="flex flex-wrap gap-2">
                  {solution.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 text-[0.8em] rounded bg-teal-400/20 text-teal-300">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reasons Section */}
      <section className={`${isDayTime ? 'bg-black' : 'bg-white'} py-20`}>
        <FxBackground day={!isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">Why Choose Us</h2>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-12">
            {[
              {
                id: 1,
                title: 'Versatility Across Domains',
                image: '/assets/services/Development.jpg',
                description: 'Web, data, automation and AI—one expert team covers the full range of Python use cases, so you get coherent solutions instead of disconnected point tools.'
              },
              {
                id: 2,
                title: 'Performance & Scale',
                image: '/assets/services/Research-strategy.jpg',
                description: 'We architect for throughput and growth—async frameworks, efficient data access, caching and autoscaling—so your Python systems stay fast as demand climbs.'
              },
              {
                id: 3,
                title: 'AI & Data Ready',
                image: '/assets/services/services.jpg',
                description: 'Python is the language of modern data and ML. We bring production-grade machine learning and data engineering capability, not just experimentation in notebooks.'
              },
              {
                id: 4,
                title: 'Maintainable Codebases',
                image: '/assets/services/digital-optimisation.jpg',
                description: 'Clean architecture, type hints, tests and documentation mean the systems we build stay understandable and extensible for your team long after launch.'
              }
            ].map((reason) => (
              <div key={reason.id} className="flex gap-8">
                {reason.image && (
                  <Image src={reason.image} alt={reason.title} width={200} height={200} className="rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="text-[1.5em] font-[600] mb-4">{reason.title}</h3>
                  <p className="text-[0.95em]">{reason.description}</p>
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
              { label: 'Years Experience', value: 8, suffix: '+' },
              { label: 'Team Members', value: 13, suffix: '+' },
              { label: 'APIs & Services Built', value: 120, suffix: '+' },
              { label: 'Projects Delivered', value: 200, suffix: '+' },
              { label: 'Client Satisfaction', value: 98, suffix: '%' }
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

      {/* Testimonials Section */}
      <section className={`${isDayTime ? 'bg-black' : 'bg-white'} py-20`}>
        <FxBackground day={!isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                name: 'Ngozi Okafor',
                title: 'Head of Data, InsightLab',
                message: 'Grey InfoTech built our entire data platform in Python—pipelines, APIs and ML models. Reliable, well-tested and genuinely scalable. Our analysts finally trust the data.'
              },
              {
                name: 'Yusuf Abdullahi',
                title: 'CTO, RouteWise',
                message: 'Their FastAPI back-end handles our peak traffic effortlessly. Clean architecture, great documentation, and they delivered exactly on time.'
              },
              {
                name: 'Aisha Bello',
                title: 'Founder, ShopSense AI',
                message: 'The recommendation engine they built in Python lifted our conversion noticeably. They took us from notebook prototype to production-grade ML serving real users.'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-teal-400/20 bg-teal-400/5">
                <p className="text-[1.05em] mb-6 italic">"{testimonial.message}"</p>
                <div>
                  <p className="font-[600]">{testimonial.name}</p>
                  <p className="text-[0.9em] text-teal-300">{testimonial.title}</p>
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
            Build smarter with Python
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">
            From scalable APIs and data pipelines to automation and machine learning, Grey InfoTech delivers Python systems that perform and endure. Let's turn your toughest requirements into clean, reliable software.
          </p>
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

export default PythonDevelopment;
