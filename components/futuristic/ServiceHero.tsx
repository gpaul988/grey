'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { FxBackground, FxChip, FxOrbit, FxHoloCard } from '@/components/futuristic/fx';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  tags?: string[];
  badges?: string[];  // alias for tags
  accentColor: string;
  secondaryColor?: string;
  ctaHref?: string;
  ctaLabel?: string;
  stats?: { value: string; label: string }[];
  variant?: 'grid' | 'circuit' | 'wave' | 'particles' | 'hologram';
}

/* ─── Animated Particle field ─────────────────────────────────────── */
function ParticleField({ color }: { color: string }) {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            opacity: 0.4,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Circuit Board Lines ─────────────────────────────────────────── */
function CircuitLines({ color }: { color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M10 50 L40 50 L40 20 L70 20" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="40" cy="50" r="3" fill={color} />
          <circle cx="70" cy="20" r="3" fill={color} />
          <path d="M60 80 L90 80 L90 40" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="90" cy="40" r="3" fill={color} />
          <circle cx="10" cy="50" r="2" fill={color} />
          <path d="M20 10 L20 40 L50 40" stroke={color} strokeWidth="0.5" fill="none" strokeDasharray="4 2" />
          <circle cx="50" cy="40" r="2" fill={color} opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

/* ─── Hologram scanline ───────────────────────────────────────────── */
function ScanLine({ color }: { color: string }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none"
      style={{ background: `linear-gradient(90deg, transparent, ${color}88, transparent)` }}
      animate={{ top: ['-2px', '100%'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  );
}

/* ─── Corner Bracket ──────────────────────────────────────────────── */
function CornerBracket({ color, position }: { color: string; position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 16, left: 16, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: 16, right: 16, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: 16, left: 16, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: 16, right: 16, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return (
    <div className="absolute w-6 h-6 rounded-sm pointer-events-none" style={styles[position]} />
  );
}

/* ─── Main ServiceHero ────────────────────────────────────────────── */
export default function ServiceHero({
  title,
  subtitle,
  description,
  tags,
  badges,
  accentColor,
  secondaryColor,
  ctaHref = '/contact',
  ctaLabel = 'Start a project',
  stats = [],
  variant = 'particles',
}: ServiceHeroProps) {
  const resolvedTags = tags || badges || [];
  const bg = '#000000';
  const sec = secondaryColor || accentColor;

  return (
    <div
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      style={{ background: bg }}
    >
      <FxBackground day={false} grid aurora className="opacity-35" />
      <FxOrbit size={700} top="-180px" right="-180px" opacity={0.12} speed={38} />
      <FxOrbit size={420} top="120px" left="-120px" opacity={0.08} speed={28} reverse />

      {/* Background effects */}
      {variant === 'particles' && <ParticleField color={accentColor} />}
      {variant === 'circuit' && <CircuitLines color={accentColor} />}
      {variant === 'hologram' && (
        <>
          <CircuitLines color={accentColor} />
          <ScanLine color={accentColor} />
        </>
      )}
      {variant === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 60% 50%, ${accentColor}12 0%, transparent 70%)` }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 30% 80%, ${sec}08 0%, transparent 60%)`,
        }}
      />

      {/* Corner brackets */}
      <CornerBracket color={accentColor} position="tl" />
      <CornerBracket color={accentColor} position="tr" />
      <CornerBracket color={accentColor} position="bl" />
      <CornerBracket color={accentColor} position="br" />

      {/* Content */}
      <div className="relative z-10 max-w-[90em] mx-auto px-6 sm:px-10 lg:px-[4.6em] py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <FxChip day={false} className="mb-6">{subtitle}</FxChip>

            <h1 className="text-[2.9em] sm:text-[3.8em] lg:text-[5em] font-[800] leading-[1.02] tracking-tight text-white mb-6 max-w-[12ch]">
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="inline-block mr-[0.2em]"
                  style={i === 0 ? { color: accentColor } : {}}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <p className="text-[1em] md:text-[1.05em] leading-[1.8] text-white/62 max-w-2xl mb-8">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {resolvedTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[0.72em] font-medium rounded-full"
                  style={{ background: accentColor + '12', border: `1px solid ${accentColor}30`, color: accentColor }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href={ctaHref}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3 rounded-full text-[0.88em] font-bold overflow-hidden"
                  style={{ background: accentColor, color: '#000' }}
                >
                  <motion.span
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                  />
                  <span className="relative">{ctaLabel} →</span>
                </motion.button>
              </Link>
              <Link href="/portfolio">
                <button
                  className="px-8 py-3 rounded-full text-[0.88em] font-semibold text-white/70 hover:text-white transition-colors"
                  style={{ border: `1px solid rgba(255,255,255,0.15)` }}
                >
                  View our work
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="hidden lg:block"
          >
            <FxHoloCard day={false} className="p-7 bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="text-[0.68em] uppercase tracking-[0.25em] text-white/45">Capabilities</div>
                <div className="h-px flex-1 mx-4 bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              </div>

              <div className="space-y-4">
                {stats.length > 0 && stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <div className="text-white/55 text-[0.76em] uppercase tracking-[0.18em]">{s.label}</div>
                    <div className="text-[1.3em] font-[800]" style={{ color: accentColor }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {resolvedTags.slice(0, 5).map((tag) => (
                  <span key={tag} className="gx-data-pill">{tag}</span>
                ))}
              </div>
            </FxHoloCard>
          </motion.div>
        </div>

        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl"
          >
            {stats.map((s) => (
              <FxHoloCard key={s.label} day={false} className="p-5 text-center bg-white/[0.03]">
                <div className="text-[2em] font-[800] leading-none" style={{ color: accentColor }}>
                  {s.value}
                </div>
                <div className="text-[0.74em] text-white/45 mt-1 font-medium uppercase tracking-[0.18em]">{s.label}</div>
              </FxHoloCard>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
