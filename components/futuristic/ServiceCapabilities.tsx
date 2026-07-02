'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FxBackground, FxChip, FxOrbit, FxReveal, FxHoloCard } from '@/components/futuristic/fx';

interface Capability {
  id: string;
  title: string;
  description: string;
  points?: string[];
  icon?: string;
}

interface ServiceCapabilitiesProps {
  heading?: string;
  subheading?: string;
  accentColor: string;
  capabilities: Capability[];
  variant?: 'tabs' | 'accordion' | 'cards' | 'terminal';
  ctaHref?: string;
  ctaLabel?: string;
  isDarkBg?: boolean;
}

/* ─── Terminal style variant ─────────────────────────────────────── */
function TerminalVariant({ capabilities, accentColor }: { capabilities: Capability[]; accentColor: string }) {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState('');

  React.useEffect(() => {
    const text = capabilities[active]?.description || '';
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      if (i <= text.length) {
        setTyped(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [active, capabilities]);

  return (
    <div className="grid lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-white/10">
      {/* Sidebar */}
      <div className="lg:col-span-2 bg-[#0d0d0d] border-r border-white/10 p-4">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 text-[0.7em] font-mono text-white/30">services.sh</span>
        </div>
        {capabilities.map((cap, i) => (
          <button
            key={cap.id}
            onClick={() => setActive(i)}
            className="w-full text-left px-3 py-2 rounded-lg text-[0.8em] font-mono transition-all duration-200 mb-1 flex items-center gap-2"
            style={{
              background: active === i ? accentColor + '18' : 'transparent',
              color: active === i ? accentColor : 'rgba(255,255,255,0.4)',
              border: active === i ? `1px solid ${accentColor}33` : '1px solid transparent',
            }}
          >
            <span style={{ color: active === i ? accentColor : 'rgba(255,255,255,0.2)' }}>$</span>
            {cap.id}
          </button>
        ))}
      </div>

      {/* Terminal output */}
      <div className="lg:col-span-3 bg-[#0a0a0a] p-6 font-mono min-h-[320px]">
        <div className="text-[0.72em] text-white/30 mb-4">
          <span style={{ color: accentColor }}>grey@infotech</span>
          <span className="text-white/30">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-white/30"> $ run {capabilities[active]?.id}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-[1em] font-bold text-white mb-3" style={{ color: accentColor }}>
              # {capabilities[active]?.title}
            </h3>
            <p className="text-[0.82em] text-white/60 leading-relaxed mb-4">
              {typed}
              <motion.span
                className="inline-block w-[2px] h-[1em] ml-[1px] align-middle"
                style={{ background: accentColor }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            </p>
            {capabilities[active]?.points && (
              <ul className="space-y-1.5">
                {capabilities[active].points!.map((point, pi) => (
                  <motion.li
                    key={pi}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pi * 0.08 }}
                    className="flex items-start gap-2 text-[0.78em] text-white/50"
                  >
                    <span style={{ color: accentColor }}>→</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Cards variant ──────────────────────────────────────────────── */
function CardsVariant({ capabilities, accentColor }: { capabilities: Capability[]; accentColor: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {capabilities.map((cap, i) => (
        <motion.div
          key={cap.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07 }}
          onHoverStart={() => setHovered(cap.id)}
          onHoverEnd={() => setHovered(null)}
          className="relative rounded-3xl p-6 cursor-default group overflow-hidden"
          style={{
            background: hovered === cap.id ? accentColor + '12' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${hovered === cap.id ? accentColor + '55' : 'rgba(255,255,255,0.08)'}`,
            transition: 'all 0.3s',
          }}
        >
          {/* Glow */}
          {hovered === cap.id && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}15, transparent 70%)` }}
            />
          )}
          {/* Number */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="inline-block text-[0.68em] font-mono px-2 py-0.5 rounded-md"
              style={{ background: accentColor + '15', color: accentColor }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="w-8 h-8 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }} />
          </div>
          <h3 className="text-[1.05em] font-[700] text-white mb-2 tracking-tight">{cap.title}</h3>
          <p className="text-[0.84em] text-white/55 leading-relaxed">{cap.description}</p>
          {cap.points && (
            <ul className="mt-3 space-y-1">
              {cap.points.slice(0, 3).map((point) => (
                <li key={point} className="text-[0.75em] text-white/40 flex items-start gap-1.5">
                  <span style={{ color: accentColor }}>·</span> {point}
                </li>
              ))}
            </ul>
          )}
          {/* Bottom border glow on hover */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[1px]"
            animate={{ opacity: hovered === cap.id ? 1 : 0, scaleX: hovered === cap.id ? 1 : 0 }}
            style={{ background: accentColor, transformOrigin: 'left' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Tabs variant ───────────────────────────────────────────────── */
function TabsVariant({ capabilities, accentColor }: { capabilities: Capability[]; accentColor: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      {/* Tab list */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {capabilities.map((cap, i) => (
          <button
            key={cap.id}
            onClick={() => setActive(i)}
            className="relative px-5 py-2 rounded-full text-[0.8em] font-medium transition-all duration-200"
            style={{
              background: active === i ? accentColor : 'transparent',
              color: active === i ? '#000' : 'rgba(255,255,255,0.4)',
              border: `1px solid ${active === i ? accentColor : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            {cap.title}
          </button>
        ))}
      </div>
      {/* Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-8"
          style={{ background: accentColor + '08', border: `1px solid ${accentColor}22` }}
        >
          <h3 className="text-[1.4em] font-bold text-white mb-4" style={{ color: accentColor }}>
            {capabilities[active].title}
          </h3>
          <p className="text-[0.9em] text-white/60 leading-relaxed mb-6">
            {capabilities[active].description}
          </p>
          {capabilities[active].points && (
            <div className="grid sm:grid-cols-2 gap-3">
              {capabilities[active].points!.map((point, pi) => (
                <motion.div
                  key={pi}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: pi * 0.05 }}
                  className="flex items-start gap-3 text-[0.84em] text-white/60"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[0.7em] font-bold" style={{ background: accentColor + '20', color: accentColor }}>✓</span>
                  {point}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────── */
export default function ServiceCapabilities({
  heading = 'What we deliver',
  subheading,
  accentColor,
  capabilities,
  variant = 'cards',
  ctaHref = '/contact',
  ctaLabel = 'Get a free consultation',
  isDarkBg = true,
}: ServiceCapabilitiesProps) {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: isDarkBg ? '#050505' : '#fafafa' }}
    >
      <FxBackground day={false} grid aurora className="opacity-20" />
      <FxOrbit size={520} top="-140px" right="-180px" opacity={0.08} speed={32} />
      <FxOrbit size={320} bottom="-100px" left="-120px" opacity={0.06} speed={26} reverse />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${isDarkBg ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkBg ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-[90em] mx-auto px-6 sm:px-10 lg:px-[4.6em]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          {subheading && (
            <span
              className="inline-block text-xs font-semibold uppercase tracking-[0.25em] mb-3 px-3 py-1 rounded-full"
              style={{ background: accentColor + '15', color: accentColor, border: `1px solid ${accentColor}33` }}
            >
              {subheading}
            </span>
          )}
          <h2
            className="text-[2.2em] sm:text-[3em] font-[700] leading-tight max-w-2xl"
            style={{ color: isDarkBg ? '#ffffff' : '#111111' }}
          >
            {heading}
          </h2>
        </motion.div>

        {/* Variant content */}
        {variant === 'terminal' && <TerminalVariant capabilities={capabilities} accentColor={accentColor} />}
        {variant === 'cards' && <CardsVariant capabilities={capabilities} accentColor={accentColor} />}
        {variant === 'tabs' && <TabsVariant capabilities={capabilities} accentColor={accentColor} />}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Link href={ctaHref}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-[0.88em] font-bold overflow-hidden"
              style={{ background: accentColor, color: '#000' }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <span className="relative">{ctaLabel}</span>
              <span className="relative text-[1.2em]">→</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
