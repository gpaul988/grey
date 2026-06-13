'use client';

/**
 * Futuristic animated theme toggle — light / dark / system.
 * A compact segmented pill with a sliding glow indicator (framer-motion).
 */
import React from 'react';
import {motion} from 'framer-motion';
import {Moon, Sun, Monitor} from 'lucide-react';
import {useTheme, type Theme} from './ThemeProvider';

const OPTIONS: {key: Theme; icon: React.ReactNode; label: string}[] = [
    {key: 'light', icon: <Sun size={15}/>, label: 'Light'},
    {key: 'system', icon: <Monitor size={15}/>, label: 'System'},
    {key: 'dark', icon: <Moon size={15}/>, label: 'Dark'},
];

export default function ThemeToggle({className = ''}: {className?: string}) {
    const {theme, setTheme} = useTheme();
    return (
        <div
            role="radiogroup"
            aria-label="Color theme"
            className={`relative inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 p-1 backdrop-blur-md ${className}`}
        >
            {OPTIONS.map((opt) => {
                const active = theme === opt.key;
                return (
                    <button
                        key={opt.key}
                        role="radio"
                        aria-checked={active}
                        aria-label={opt.label}
                        title={opt.label}
                        onClick={() => setTheme(opt.key)}
                        className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
                    >
                        {active && (
                            <motion.span
                                layoutId="theme-glow"
                                transition={{type: 'spring', stiffness: 420, damping: 32}}
                                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_18px_-2px_rgba(45,212,191,0.7)]"
                            />
                        )}
                        <span className={active ? 'text-black' : ''}>{opt.icon}</span>
                    </button>
                );
            })}
        </div>
    );
}
