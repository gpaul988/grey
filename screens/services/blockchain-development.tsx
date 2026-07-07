'use client';

import React, { useEffect, useRef, useState } from 'react';
import '@/app/globals.css';
import FloatingButton from "@/components/FloatingButton";
import Image from "next/image";
import Link from "next/link";
import { useIsDayTime } from '../../components/useIsDayTime';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FxBackground, FxReveal, FxChip } from '@/components/futuristic/fx';
import { CurrencyAwarePricing } from '@/components/ServicePageTemplate';
import Process90 from '@/components/futuristic/Process90';

const BlockchainDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" className="hidden lg:block absolute inset-0 w-full h-full object-cover" poster="/assets/blockchain/hero.jpg">
          <source src="/assets/blockchain/hero.mp4" type="video/mp4" />
        </video>
        <Image src="/assets/blockchain/hero.jpg" alt="Blockchain Hero" fill priority className="lg:hidden object-cover" />
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">Blockchain Solutions</span>
              </div>
              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Build Decentralized Applications <span className="gx-gradient-text">That Scale</span> Securely
              </h1>
              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Smart contracts, dApps, and infrastructure engineered for security, performance, and regulatory compliance. From tokenomics design to mainnet deployment, we deliver blockchain solutions that work.
              </p>
              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Smart Contracts", "dApps", "Layer 2", "DeFi", "NFTs", "Security"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Start Your Blockchain Project →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    View Our Case Studies
                  </button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Contracts Deployed', value: '500+' },
                  { label: 'TVL Secured', value: '$50M+' },
                  { label: 'Networks Supported', value: '10+' },
                  { label: 'Audit Pass Rate', value: '100%' }
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
              { label: 'Deployed', value: '500+' },
              { label: 'TVL', value: '$50M+' },
              { label: 'Networks', value: '10+' }
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
            <FxChip day={!isDayTime}>BLOCKCHAIN DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Enterprise-Grade Blockchain <span className="gx-gradient-text">Solutions</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>Blockchain success requires technical mastery and regulatory awareness. We design and deploy secure, scalable blockchain systems—from architecture and smart contract development to auditing and compliance—built for enterprise demands.</p>
                </div>
                <div>
                  <p>Whether you're building DeFi protocols, NFT platforms, or supply chain solutions, we engineer blockchain infrastructure that performs, secures assets, and scales to production demands.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <Process90 totalDays={120} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            Blockchain Development Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">From smart contracts and decentralised applications to enterprise ledgers and token economies, we deliver complete blockchain capability</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: 1,
                title: "Smart Contract Development",
                body: "We design, develop and audit smart contracts that automate trust without intermediaries. From token standards to complex DeFi vaults, staking, escrow and governance logic, we write clean, well-documented Solidity and Rust code.",
                tags: ["Solidity", "Rust", "Auditing", "Gas Optimisation"]
              },
              {
                id: 2,
                title: "Decentralised Apps (dApps)",
                body: "We build full-stack decentralised applications with intuitive front-ends and reliable on-chain back-ends. Using Ethers.js, Wagmi, Viem and modern React, we connect wallets and deliver responsive UX.",
                tags: ["Web3", "React", "Wallet Integration", "The Graph"]
              },
              {
                id: 3,
                title: "Tokenisation & NFTs",
                body: "We help businesses tokenise real-world and digital assets, launch utility or governance tokens, and build NFT platforms with secure minting, on-chain royalties and full marketplace functionality.",
                tags: ["Token Design", "Minting", "Royalties", "Marketplaces"]
              },
              {
                id: 4,
                title: "DeFi Platforms",
                body: "We engineer decentralised finance protocols—lending and borrowing markets, automated market makers, staking and yield strategies—with security and capital efficiency at their core.",
                tags: ["Lending", "DEX", "Staking", "Yield"]
              },
              {
                id: 5,
                title: "Enterprise Blockchain",
                body: "For organisations that need privacy and control, we implement permissioned ledgers using Hyperledger Fabric and similar frameworks for supply-chain traceability and tamper-evident record keeping.",
                tags: ["Hyperledger", "Supply Chain", "Permissioned Ledgers"]
              },
              {
                id: 6,
                title: "Audits, Integration & Support",
                body: "Beyond building, we secure and connect. We conduct smart-contract security reviews, build oracles and middleware, and provide ongoing monitoring, upgrades and support.",
                tags: ["Security Review", "Oracles", "APIs", "Maintenance"]
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

      {/* Reasons Section */}
      <section className={`${isDayTime ? 'bg-black' : 'bg-white'} py-20`}>
        <FxBackground day={!isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">Why Choose Us</h2>
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-12">
            {[
              {
                id: 1,
                title: "Security-First Engineering",
                image: "/assets/services/Development.jpg",
                description: "Every line of contract code we ship is tested, analysed and reviewed before it reaches mainnet. We design for the worst case so your protocol and your users' funds stay protected."
              },
              {
                id: 2,
                title: "Multi-Chain Expertise",
                image: "/assets/services/digital-transformatio.jpg",
                description: "We select the right chain for your performance, cost and governance needs—EVM chains, Solana or permissioned Hyperledger networks—and build interoperable systems that can grow across them."
              },
              {
                id: 3,
                title: "Production, Not Prototypes",
                image: "/assets/services/services.jpg",
                description: "We bring senior product engineering discipline—CI/CD, monitoring, documentation and clear upgrade paths—so your solution actually ships and stays maintainable."
              },
              {
                id: 4,
                title: "Transparent Partnership",
                image: "/assets/services/digital-optimisation.jpg",
                description: "You stay in control throughout. Clear communication, early demos, honest timelines and full ownership of code and keys mean you always know exactly where your project stands."
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
              { value: 8, label: "Years Experience", suffix: "+" },
              { value: 13, label: "Team Members", suffix: "+" },
              { value: 60, label: "Smart Contracts Shipped", suffix: "+" },
              { value: 200, label: "Projects Delivered", suffix: "+" },
              { value: 98, label: "Client Satisfaction", suffix: "%" }
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
                name: "Obinna Eze",
                title: "CEO, ProTask Hub",
                message: "Grey InfoTech delivered our token platform with airtight smart contracts and clear documentation. Their security-first approach gave our investors real confidence."
              },
              {
                name: "Amina Diallo",
                title: "Director of Operations, LogiFleet Systems",
                message: "The supply-chain traceability solution they built on Hyperledger transformed how we verify shipments. Tamper-proof, auditable, and surprisingly easy for our non-technical team."
              },
              {
                name: "Daniel Okonkwo",
                title: "Founder, YieldNest",
                message: "They engineered our DeFi staking protocol end to end—contracts, oracles, monitoring and front-end. The economic modelling they did up front saved us from mistakes."
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-xl border border-teal-400/20 bg-teal-400/5">
                <p className="text-[1.05em] mb-6 italic">\"{testimonial.message}\"</p>
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
            Build on decentralised rails
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">From smart contracts and DeFi to tokenisation and enterprise ledgers, Grey InfoTech turns blockchain ambition into secure, production-ready systems. Let's scope your idea, model the risks, and ship something your users—and your auditors—can trust.</p>
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

export default BlockchainDevelopment;
