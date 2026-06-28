'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

/* ─── Service Data ───────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'web-design',
    label: 'Web Design',
    title: 'Web Design & Development',
    tags: ['Web development', 'Web design', 'UI & UX design'],
    image: '/assets/home/web-design.jpg',
    href: '/services/Web-Design',
    cta: 'Web design agency',
    color: '#00f5d4',
    accent: 'from-cyan-400/20 to-teal-600/10',
    description:
      'Effective web design goes beyond looking good — it drives tangible outcomes. Our approach centers on the user and is driven by results, ensuring every site we build is visually compelling, strategically crafted, and optimized to captivate your audience and boost revenue.',
  },
  {
    id: 'web-app',
    label: 'Web Apps',
    title: 'Web Applications',
    tags: ['React.js', 'Node.js', 'Laravel', 'Javascript', 'PHP'],
    image: '/assets/home/web-app.jpg',
    href: '/services/Web-Application',
    cta: 'Web app development',
    color: '#7c3aed',
    accent: 'from-violet-400/20 to-purple-600/10',
    description:
      'Web applications play a critical role in driving innovation and efficiency. From launching bold digital products to transforming outdated systems, we build tailored web apps that solve real challenges with focus on performance, scalability, and user experience.',
  },
  {
    id: 'mobile-app',
    label: 'Mobile Apps',
    title: 'Mobile Applications',
    tags: ['iOS apps', 'Android apps', 'Hybrid apps'],
    image: '/assets/home/mobile-app.jpg',
    href: '/services/Mobile-Application-Development',
    cta: 'Mobile apps',
    color: '#f59e0b',
    accent: 'from-amber-400/20 to-orange-600/10',
    description:
      'We build modern, intuitive mobile apps for both iOS and Android. Whether you need native, cross-platform, or hybrid — we have the expertise to deliver engaging, high-quality applications from concept to app store launch.',
  },
  {
    id: 'digital-market',
    label: 'Marketing',
    title: 'Digital Marketing & Strategy',
    tags: ['SEO', 'PPC', 'Content', 'Analytics'],
    image: '/assets/home/digital-market.jpg',
    href: '/services/digital-marketing',
    cta: 'Digital marketing services',
    color: '#ec4899',
    accent: 'from-pink-400/20 to-rose-600/10',
    description:
      'In a competitive digital world, your online presence is your first impression. Through strategic SEO, targeted PPC campaigns, and data-driven optimization, we position you where your customers are — and turn visibility into growth.',
  },
  {
    id: 'ui-ux',
    label: 'UX / UI',
    title: 'UX/UI & Product Design',
    tags: ['Wireframes', 'Prototyping', 'User Research', 'Design Systems'],
    image: '/assets/home/ui-ux.jpg',
    href: '/services/ui-ux-design',
    cta: 'UX & UI design services',
    color: '#22d3ee',
    accent: 'from-sky-400/20 to-blue-600/10',
    description:
      'Our UX/UI design strategy blends human-centered design, creative expertise, and business insight. From early wireframes to polished interfaces, we create intuitive, impactful experiences that support your goals and delight your users.',
  },
  {
    id: 'branding',
    label: 'Branding',
    title: 'Digital Branding & Brand Management',
    tags: ['Logo', 'Brand identity', 'Color systems', 'Brand voice'],
    image: '/assets/home/branding.jpg',
    href: '/services/branding',
    cta: 'Branding services',
    color: '#a3e635',
    accent: 'from-lime-400/20 to-green-600/10',
    description:
      'Customer retention is about creating a brand experience that connects and endures. We help companies build strong, consistent identities that inspire trust and foster loyalty — from visual identity to brand voice and positioning.',
  },
  {
    id: 'discovery',
    label: 'Discovery',
    title: 'Discovery & Strategy',
    tags: ['Product strategy', 'Roadmap', 'Workshops', 'Research'],
    image: '/assets/home/discovery.jpg',
    href: '/services/discovery-phase',
    cta: 'Discovery phase',
    color: '#f97316',
    accent: 'from-orange-400/20 to-red-600/10',
    description:
      'Jumpstart your product journey with a tailored discovery process that aligns strategy with vision. We uncover key insights, define clear goals, and shape a roadmap that drives your business forward — turning early-stage thinking into confident action.',
  },
];

/* ─── Animated orbit ring ────────────────────────────────────────────── */
function OrbitRing({ color, size, duration, delay }: { color: string; size: number; duration: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: color + '33',
        left: '50%',
        top: '50%',
        x: '-50%',
        y: '-50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      {/* Dot on the ring */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: color, top: -4, left: '50%', x: '-50%', boxShadow: `0 0 8px ${color}` }}
      />
    </motion.div>
  );
}

/* ─── Counter badge ──────────────────────────────────────────────────── */
function ServiceNumber({ n, color }: { n: number; color: string }) {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shrink-0"
      style={{ background: color + '18', border: `1px solid ${color}44`, color }}
    >
      {String(n).padStart(2, '0')}
    </div>
  );
}

/* ─── Tag pill ───────────────────────────────────────────────────────── */
function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-3 py-1 text-[0.7em] font-medium rounded-full tracking-wide"
      style={{ background: color + '15', border: `1px solid ${color}33`, color }}
    >
      {label}
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */
export default function ServicesSection({ isDayTime = false }: { isDayTime?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const [sectionBottom, setSectionBottom] = useState(0);

  const bg = isDayTime ? '#ffffff' : '#000000';
  const text = isDayTime ? '#111111' : '#f5f5f5';
  const muted = isDayTime ? '#555' : '#888';

  // Track active service based on scroll
  const updateActiveService = useCallback(() => {
    const serviceEls = SERVICES.map((s) => document.getElementById(`svc-${s.id}`));
    const mid = window.innerHeight * 0.45;
    for (let i = serviceEls.length - 1; i >= 0; i--) {
      const el = serviceEls[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) {
          setActiveIndex(i);
          break;
        }
      }
    }
  }, []);

  // Track section bounds for fixed/absolute image
  const updateImagePosition = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const within = rect.top <= 0 && rect.bottom >= window.innerHeight;
    const past = rect.bottom < window.innerHeight;
    setIsFixed(within);
    setIsPast(past);
    setSectionBottom(section.offsetTop + section.offsetHeight);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      updateActiveService();
      updateImagePosition();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateActiveService, updateImagePosition]);

  const active = SERVICES[activeIndex];

  // Image panel positioning
  const imagePanelStyle: React.CSSProperties = isPast
    ? { position: 'absolute', bottom: 0, right: 0, width: '50%', height: '100vh' }
    : isFixed
    ? { position: 'fixed', top: 0, right: 0, width: '50%', height: '100vh' }
    : { position: 'absolute', top: 0, right: 0, width: '50%', height: '100vh' };

  return (
    <section
      ref={sectionRef}
      id="service"
      className="relative"
      style={{ background: bg, color: text }}
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div
        className="relative border-b px-6 sm:px-10 lg:px-[4.6em] pt-24 pb-10 overflow-hidden"
        style={{ borderColor: isDayTime ? '#e5e7eb' : '#1f2937' }}
      >
        {/* Animated grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${text} 1px, transparent 1px), linear-gradient(90deg, ${text} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] mb-4 px-3 py-1 rounded-full"
            style={{ background: active.color + '15', color: active.color, border: `1px solid ${active.color}33` }}
          >
            What we do
          </span>
          <h2 className="text-[2.4em] sm:text-[3.2em] font-[700] leading-tight">Our services</h2>
          <p className="mt-3 text-[0.9em] max-w-lg" style={{ color: muted }}>
            From strategy to launch — full-spectrum digital capability, built for results.
          </p>
        </motion.div>

        {/* Service nav dots (desktop) */}
        <div className="hidden lg:flex items-center gap-2 mt-6">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                const el = document.getElementById(`svc-${s.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: activeIndex === i ? 28 : 8,
                height: 8,
                background: activeIndex === i ? s.color : (isDayTime ? '#d1d5db' : '#374151'),
              }}
              title={s.label}
            />
          ))}
        </div>
      </div>

      {/* ── Body: Left scroll / Right fixed image ─────────────────────── */}
      <div className="relative lg:grid lg:grid-cols-2">

        {/* LEFT — scrollable service entries */}
        <div className="px-6 sm:px-10 lg:px-[4.6em] lg:pr-12 py-0 lg:pb-32">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              id={`svc-${svc.id}`}
              className="relative py-16 lg:py-28 border-b last:border-b-0 group"
              style={{ borderColor: isDayTime ? '#f3f4f6' : '#111827' }}
            >
              {/* Glow on left edge when active */}
              <motion.div
                className="absolute left-0 top-0 w-[3px] h-full rounded-full"
                animate={{ background: activeIndex === i ? svc.color : 'transparent' }}
                transition={{ duration: 0.4 }}
              />

              {/* Number + title row */}
              <div className="flex items-center gap-4 mb-5">
                <ServiceNumber n={i + 1} color={svc.color} />
                <h3 className="text-[1.4em] sm:text-[1.6em] font-[600] leading-tight">{svc.title}</h3>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {svc.tags.map((t) => (
                  <Tag key={t} label={t} color={svc.color} />
                ))}
              </div>

              {/* Description */}
              <p className="text-[0.85em] leading-[1.7] mb-6 max-w-lg" style={{ color: muted }}>
                {svc.description}
              </p>

              {/* Mobile image (shows only on small screens) */}
              <div className="lg:hidden relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
                <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${svc.color}22, transparent)` }} />
              </div>

              {/* CTA */}
              <Link href={svc.href}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-[0.82em] font-semibold tracking-wide overflow-hidden group/btn"
                  style={{ border: `1px solid ${svc.color}55`, color: svc.color }}
                >
                  {/* Fill on hover */}
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: svc.color + '18', originX: 0 }}
                  />
                  <span className="relative z-10">{svc.cta}</span>
                  <span className="relative z-10 text-[1.3em] leading-none">→</span>
                </motion.button>
              </Link>
            </div>
          ))}
        </div>

        {/* RIGHT — fixed image panel (desktop only) */}
        <div className="hidden lg:block" style={{ height: `${SERVICES.length * 520}px` }}>
          <div style={imagePanelStyle} className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="relative w-full h-full"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {/* Main image */}
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Color overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${active.color}25 0%, #00000088 100%)` }}
                />

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Orbit rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <OrbitRing color={active.color} size={220} duration={12} delay={0} />
                  <OrbitRing color={active.color} size={360} duration={20} delay={2} />
                  <OrbitRing color={active.color} size={500} duration={30} delay={5} />
                </div>

                {/* Info overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div
                    className="rounded-2xl p-6 backdrop-blur-md"
                    style={{ background: 'rgba(0,0,0,0.55)', border: `1px solid ${active.color}33` }}
                  >
                    {/* Progress bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-[2px] rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: active.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <span className="text-[0.72em] font-mono text-white/50">
                        {activeIndex + 1}/{SERVICES.length}
                      </span>
                    </div>

                    <motion.h4
                      key={active.id + '-title'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white font-bold text-[1.1em] mb-1"
                    >
                      {active.title}
                    </motion.h4>
                    <motion.p
                      key={active.id + '-desc'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-white/60 text-[0.78em] leading-relaxed line-clamp-2"
                    >
                      {active.description}
                    </motion.p>

                    {/* Color accent dots for all services */}
                    <div className="flex gap-2 mt-4">
                      {SERVICES.map((s, i) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            const el = document.getElementById(`svc-${s.id}`);
                            el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            background: i === activeIndex ? s.color : 'rgba(255,255,255,0.2)',
                            transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner scanline effect */}
                <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: active.color }} />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: active.color }} />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-[13rem] left-4 w-6 h-6 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: active.color }} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── Sticky bottom nav (desktop, within service section) ───────── */}
      <StickyServiceNav activeIndex={activeIndex} isDayTime={isDayTime} />
    </section>
  );
}

/* ─── Sticky bottom service nav ─────────────────────────────────────── */
function StickyServiceNav({ activeIndex, isDayTime }: { activeIndex: number; isDayTime: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const section = document.getElementById('service');
      const adventure = document.getElementById('Adventure-section');
      if (!section) { setVisible(false); return; }
      const sr = section.getBoundingClientRect();
      const inSection = sr.top <= 0 && sr.bottom >= 80;
      const aboveAdventure = adventure ? adventure.getBoundingClientRect().top >= window.innerHeight : true;
      setVisible(inSection && aboveAdventure);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-0 left-0 right-0 z-50 hidden lg:block"
          style={{
            background: isDayTime ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${SERVICES[activeIndex].color}44`,
          }}
        >
          <div className="max-w-[90em] mx-auto px-[4.6em] py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    const el = document.getElementById(`svc-${s.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="text-[0.78em] font-medium transition-all duration-300"
                  style={{
                    color: i === activeIndex ? s.color : isDayTime ? '#9ca3af' : '#6b7280',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <span
              className="text-[0.72em] font-mono px-3 py-1 rounded-full"
              style={{
                background: SERVICES[activeIndex].color + '18',
                color: SERVICES[activeIndex].color,
                border: `1px solid ${SERVICES[activeIndex].color}33`,
              }}
            >
              {activeIndex + 1} / {SERVICES.length}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
