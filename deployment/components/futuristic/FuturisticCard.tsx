'use client';

import React from 'react';

interface FuturisticCardProps {
  children: React.ReactNode;
  className?: string;
  onClickAction?: () => void;
  href?: string;
  gradient?: 'cyan' | 'purple' | 'indigo' | 'blue' | 'teal' | string;
  hover?: 'lift' | 'glow' | 'scale' | 'none';
  interactive?: boolean;
}

export const FuturisticCard: React.FC<FuturisticCardProps> = ({
  children,
  className = '',
  onClickAction,
  gradient = 'cyan',
  hover = 'lift',
  interactive = true,
}) => {
  const gradients: Record<string, string> = {
    cyan: 'from-cyan-500/10 via-slate-900 to-slate-950',
    purple: 'from-purple-500/10 via-slate-900 to-slate-950',
    indigo: 'from-indigo-500/10 via-slate-900 to-slate-950',
    blue: 'from-blue-500/10 via-slate-900 to-slate-950',
    teal: 'from-teal-500/10 via-slate-900 to-slate-950',
  };

  const hoverClasses = {
    lift: 'hover:shadow-2xl hover:shadow-cyan-500/20 hover:translate-y-[-8px] transform transition-all duration-300',
    glow: 'hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300',
    scale: 'hover:scale-105 transition-transform duration-300',
    none: '',
  };

  return (
    <div
      onClick={onClickAction}
      className={`
        relative overflow-hidden rounded-2xl border border-white/10
        bg-gradient-to-br ${gradients[gradient] || gradient}
        backdrop-blur-xl
        ${interactive ? 'cursor-pointer' : ''}
        ${hoverClasses[hover]}
        ${className}
      `}
    >
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FuturisticCard;
