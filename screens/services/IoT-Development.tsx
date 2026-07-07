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

const IoTDevelopment: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDayTime = useIsDayTime();

  return (
    <div className={`${isDayTime ? 'bg-white' : 'bg-black'} min-h-screen`}>
      <FloatingButton className="fixed bottom-6 right-6 transition-all z-50 duration-300" />

      {/* Futuristic Hero Section - IoT Development */}
      <section className="relative overflow-hidden lg:w-full lg:min-h-[90vh] lg:h-[720px] w-full h-[600px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/assets/iot/hero.jpg"
        >
          <source src="/assets/iot/hero.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/iot/hero.jpg"
          alt="IoT Development Hero"
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
                <span className="text-teal-400 text-[0.7em] lg:text-[0.82em] uppercase tracking-[0.22em] font-[600]">IoT Solutions</span>
              </div>

              <h1 className="text-white text-[2em] lg:text-[4.5em] font-[700] leading-[1.08] tracking-tight mb-6 lg:mb-8">
                Connected Devices <span className="gx-gradient-text">At Scale</span>
              </h1>

              <p className="text-white/70 text-[0.85em] lg:text-[1.08em] leading-[1.65] mb-8 lg:mb-10 font-[300]">
                Firmware, cloud connectivity, and edge computing. Build IoT solutions that collect, process, and act on data across millions of devices.
              </p>

              <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
                {["Firmware", "Cloud Connectivity", "Edge Computing", "Real-Time Analytics", "Device Management"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-[0.7em] lg:text-[0.75em] font-[600] uppercase tracking-wider">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link href="/quote-request">
                  <button className="relative px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-bold overflow-hidden hover:shadow-lg transition-shadow duration-300 whitespace-nowrap" style={{ background: '#00f5d4', color: '#000' }}>
                    <span className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                    <span className="relative">Build Your IoT Solution →</span>
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="px-8 py-3 rounded-full text-[0.85em] lg:text-[0.88em] font-semibold text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 whitespace-nowrap" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                    View IoT Case Studies
                  </button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <div className="grid grid-cols-2 gap-6 w-full">
                {[
                  { label: 'Devices Connected', value: '10M+' },
                  { label: 'Data Points/Day', value: '1B+' },
                  { label: 'Latency', value: '<100ms' },
                  { label: 'Availability', value: '99.99%' }
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
              { label: 'Devices', value: '10M+' },
              { label: 'Data/Day', value: '1B+' },
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
            <FxChip day={!isDayTime}>IOT DEVELOPMENT</FxChip>
          </div>
          <div className="lg:-ml-[19em]">
            <FxReveal>
              <h3 className="lg:text-[3.5em] md:text-[3em] text-[2em] font-[700] tracking-tight leading-[1.15] mt-4">
                Enterprise IoT <span className="gx-gradient-text">Solutions</span>
              </h3>
            </FxReveal>
            <FxReveal delay={0.08}>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4 font-[300] text-justify text-[1em] leading-relaxed">
                <div>
                  <p>IoT success demands three things: reliable firmware, secure cloud connectivity, and edge intelligence. We design IoT architectures—from device firmware to cloud platforms to edge processing—that connect and manage millions of devices reliably and securely.</p>
                </div>
                <div>
                  <p>From sensors to servers to insights, we build IoT solutions that process real-time data, scale gracefully, and deliver business value.</p>
                </div>
              </div>
            </FxReveal>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <Process90 totalDays={120} />

      {/* Solutions Section */}
      <section className={`${isDayTime ? 'bg-white' : 'bg-black'} py-20`}>
        <FxBackground day={isDayTime} />
        <div className="relative z-10 mx-auto px-6 sm:px-6 md:px-10 lg:px-[4.6em]">
          <h2 className="text-[2.5em] lg:text-[4em] font-[700] leading-[1.1] text-center mb-12">
            IoT Development Solutions
          </h2>
          <p className="text-center mb-16 text-[1.1em] max-w-3xl mx-auto">
            From embedded firmware to cloud platforms and analytics, Grey InfoTech delivers the full IoT stack. Based in Nigeria and serving clients globally, we build secure, scalable connected products that bridge hardware and software—turning devices and sensor data into measurable business value.
          </p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {[
              {
                id: '01',
                title: 'Embedded Firmware & Devices',
                tags: ['C/C++', 'RTOS', 'Microcontrollers', 'Sensors'],
                body: 'We develop reliable embedded firmware for microcontrollers and edge devices—integrating sensors, actuators and radios with efficient, low-power C/C++ and RTOS code. We handle secure boot, device provisioning and over-the-air updates so your fleet stays maintainable in the field long after deployment.'
              },
              {
                id: '02',
                title: 'Connectivity & Protocols',
                tags: ['MQTT', 'CoAP', 'BLE', 'LoRaWAN'],
                body: 'We implement the right connectivity for your use case—MQTT, CoAP and HTTPS over Wi-Fi, cellular, BLE or LoRaWAN—with encrypted transport and resilient reconnection. Devices stay connected reliably even across unstable networks, and data flows securely to the cloud.'
              },
              {
                id: '03',
                title: 'Cloud IoT Platforms',
                tags: ['AWS IoT', 'Azure IoT', 'Ingestion', 'Scale'],
                body: 'We build cloud back-ends that ingest, store and process millions of device messages, using AWS IoT, Azure IoT Hub or Google Cloud. We design for horizontal scale, device management, command-and-control and secure APIs, so your platform grows smoothly from one device to an entire fleet.'
              },
              {
                id: '04',
                title: 'Real-Time Dashboards & Apps',
                tags: ['Telemetry', 'Alerts', 'Mobile', 'Web'],
                body: 'We create web and mobile dashboards that visualise live telemetry, trigger alerts, and let users monitor and control devices remotely. Clear, real-time interfaces turn raw data streams into the insight your operators and customers need to act fast.'
              },
              {
                id: '05',
                title: 'Edge Computing & Analytics',
                tags: ['Edge AI', 'Filtering', 'Predictive'],
                body: 'When latency, bandwidth or privacy matter, we push processing to the edge—filtering, aggregating and even running ML inference on-device. Combined with cloud analytics, this enables predictive maintenance, anomaly detection and smarter automation across your fleet.'
              },
              {
                id: '06',
                title: 'Security & Lifecycle Management',
                tags: ['Device Identity', 'OTA', 'Encryption', 'Monitoring'],
                body: 'We secure the whole system—unique device identity, encrypted communication, signed OTA updates and continuous monitoring—and manage the device lifecycle from provisioning to decommissioning. Your connected products stay protected, compliant and up to date.'
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
                title: 'Full-Stack IoT Expertise',
                image: '/assets/services/Development.jpg',
                description: 'Firmware, connectivity, cloud and analytics from one team. No finger-pointing between hardware and software vendors—we own the entire connected experience.'
              },
              {
                id: 2,
                title: 'Security by Design',
                image: '/assets/services/digital-transformatio.jpg',
                description: 'Device identity, encrypted transport and signed OTA updates are built in from day one, not bolted on later—because an insecure IoT device is a liability, not an asset.'
              },
              {
                id: 3,
                title: 'Built to Scale',
                image: '/assets/services/services.jpg',
                description: 'From a single prototype to a fleet of millions, our cloud architectures ingest and process telemetry without breaking a sweat as your deployment grows.'
              },
              {
                id: 4,
                title: 'Data into Decisions',
                image: '/assets/services/digital-optimisation.jpg',
                description: 'Real-time dashboards, alerts and predictive analytics turn raw sensor streams into the insight that cuts cost, prevents downtime and unlocks new revenue.'
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
              { label: 'Devices Connected', value: 50, suffix: 'K+' },
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
                name: 'Chidi Anyaoku',
                title: 'Operations Director, AgroSense',
                message: 'Grey InfoTech built our agricultural sensor platform end to end—firmware, connectivity and dashboards. We now monitor soil and climate data across hundreds of farms in real time.'
              },
              {
                name: 'Lerato Molefe',
                title: 'CTO, SmartMeter Africa',
                message: 'Their security-first approach to OTA updates and device identity gave us total confidence rolling out tens of thousands of connected meters. Rock-solid and scalable.'
              },
              {
                name: 'Emeka Nwosu',
                title: 'Plant Manager, FabriX Industries',
                message: 'The predictive-maintenance system they built cut our unplanned downtime dramatically. Edge analytics flag issues before they become failures. Genuinely transformative.'
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
            Bring your devices online
          </h2>
          <p className="text-[1.1em] max-w-3xl mx-auto mb-8">
            From firmware to cloud dashboards, Grey InfoTech builds secure, scalable IoT systems that turn connected devices into actionable intelligence. Let's engineer a connected product your customers and operators can rely on.
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

export default IoTDevelopment;
