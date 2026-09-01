'use client';

import React from 'react';

interface ModernSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  background?: 'gradient' | 'grid' | 'glow' | 'none';
}

export const ModernSection: React.FC<ModernSectionProps> = ({
  children,
  className = '',
  title,
  subtitle,
  centered = false,
  background = 'gradient',
}) => {
  return (
    <section className={`relative py-16 sm:py-24 ${className}`}>
      {/* Background effects */}
      {background === 'gradient' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[100px]" />
        </div>
      )}

      {background === 'grid' && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      )}

      {background === 'glow' && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-indigo-500/5 blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className={`mb-12 sm:mb-16 ${centered ? 'text-center' : ''}`}>
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-400 text-lg sm:text-xl max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </section>
  );
};

export default ModernSection;
