'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import { useIsDayTime } from '../../components/useIsDayTime';
import { motion } from 'framer-motion';
import { FxBackground, FxReveal, FxChip } from '@/components/futuristic/fx';
import { CurrencyAwarePricing } from '@/components/ServicePageTemplate';
import Process90 from '@/components/futuristic/Process90';

const CloudSolutions: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="hidden lg:block absolute inset-0 w-full h-full object-cover" poster="/assets/cloud/hero.jpg">
          <source src="/assets/cloud/hero.mp4" type="video/mp4" />
        </video>
        <Image src="/assets/cloud/hero.jpg" alt="Cloud Solutions Hero" fill priority className="lg:hidden object-cover" />
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Cloud Infrastructure</span>
              </div>
              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Enterprise Cloud <span className="gx-gradient-text">Infrastructure</span> Built for Scale
              </h1>
              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                AWS, Azure, GCP architecture, migration, and optimization. We design cloud solutions that reduce costs, boost performance, and ensure security at every layer.
              </p>
              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["AWS", "Azure", "GCP", "Migration", "DevOps", "Disaster Recovery"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Optimize Your Cloud →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    See Migration Success Stories
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Migrations Completed', value: '200+' },
                  { label: 'Cost Savings', value: '$100M+' },
                  { label: 'Uptime', value: '99.99%' },
                  { label: 'Security Compliance', value: 'SOC2' }
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
              { label: 'Migrations', value: '200+' },
              { label: 'Savings', value: '$100M+' },
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

      {/* INTRO SECTION */}
      <section className={`pt-16 transition-colors duration-500 ${isDayTime ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 lg:gap-14 gap-6 lg:pt-20 pt-6 lg:pb-32 pb-6 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <div>
            <FxChip day={!isDayTime}>CLOUD SOLUTIONS</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Multi-Cloud Strategy <span className="gx-gradient-text">For Modern Enterprise</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Cloud infrastructure powers today's businesses—but only when designed right. We architect multi-cloud strategies, handle complex migrations, optimize costs, and ensure security, so your teams focus on innovation, not infrastructure.</p>
                </div>
                <div>
                  <p>From infrastructure-as-code to disaster recovery, we build cloud solutions that are secure, performant, and cost-efficient at scale.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <Process90 totalDays={90} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            Cloud Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From lift-and-shift migrations to cloud-native architectures, we deliver the full cloud stack—designed for scale, security and speed</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: 1,
                title: "Cloud Architecture & Design",
                body: "We architect cloud environments that balance performance, cost and compliance. Starting from your workload requirements and growth projections, we produce reference architectures with network topology, compute strategy, data-tier design and disaster-recovery runbooks.",
                tags: ["AWS", "GCP", "Azure", "Multi-Cloud"]
              },
              {
                id: 2,
                title: "Cloud Migration",
                body: "Moving to cloud without disruption requires careful sequencing. We run discovery workshops, dependency mapping and risk assessment before writing a single migration script. Our migration factory approach handles wave planning and cutover testing.",
                tags: ["Lift & Shift", "Re-platform", "Re-factor"]
              },
              {
                id: 3,
                title: "Kubernetes & Containers",
                body: "We containerise applications, build Helm charts and deploy production-grade Kubernetes clusters on EKS, GKE or AKS. Our work covers horizontal pod autoscaling, resource quotas, network policies and GitOps pipelines.",
                tags: ["Kubernetes", "Docker", "Helm", "Service Mesh"]
              },
              {
                id: 4,
                title: "DevOps & CI/CD",
                body: "Fast, reliable delivery pipelines are the engine of software velocity. We design CI/CD workflows using GitHub Actions, GitLab or CircleCI, pair them with infrastructure-as-code in Terraform and instrument everything with Prometheus and Grafana.",
                tags: ["GitHub Actions", "Terraform", "ArgoCD", "Monitoring"]
              },
              {
                id: 5,
                title: "Cloud Cost Optimisation (FinOps)",
                body: "Cloud bills spiral quickly without discipline. We audit your existing spend, rightsize compute, migrate eligible workloads to spot or savings plans, and deploy real-time cost dashboards. Clients typically see 25–40% spend reduction within the first quarter.",
                tags: ["FinOps", "Reserved Instances", "Spot", "Rightsizing"]
              },
              {
                id: 6,
                title: "Cloud Security & Compliance",
                body: "Security in cloud is continuous, not a one-time audit. We configure IAM least-privilege policies, enable GuardDuty or Security Command Center, integrate SIEM pipelines and run automated compliance checks against CIS benchmarks.",
                tags: ["IAM", "SIEM", "SOC 2", "PCI DSS"]
              }
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
            Your cloud, perfected
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">Ready to move faster, spend less, and scale on demand? Grey InfoTech designs and operates cloud infrastructure that grows with your business.</p>
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

export default CloudSolutions;