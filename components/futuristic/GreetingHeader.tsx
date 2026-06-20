'use client';

import React, { useEffect, useState } from 'react';

interface GreetingHeaderProps {
    translations: Record<string, any>;
    currentLanguage: string;
}

/**
 * Personalized greeting header that:
 * - Detects time of day (morning/afternoon/evening)
 * - Shows stored username from localStorage
 * - Allows user to edit their name
 * - Persists name in localStorage
 */
export default function GreetingHeader({ translations, currentLanguage }: GreetingHeaderProps) {
    const [name, setName] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState<string>('');
    const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');

    // Load name from localStorage on mount
    useEffect(() => {
        const savedName = localStorage.getItem('grey-user-name') || '';
        setName(savedName);
        setTempName(savedName);
    }, []);

    // Determine time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setTimeOfDay('morning');
        } else if (hour < 18) {
            setTimeOfDay('afternoon');
        } else {
            setTimeOfDay('evening');
        }
    }, []);

    const handleSaveName = () => {
        const trimmed = tempName.trim();
        setName(trimmed);
        localStorage.setItem('grey-user-name', trimmed);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempName(name);
        setIsEditing(false);
    };

    const greetingText = translations?.greeting?.[timeOfDay] || 'Hello';
    const displayName = name || 'there';

    return (
        <div className="py-3 px-4 bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-indigo-500/10 border-b border-cyan-400/20 text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {!isEditing ? (
                    <div 
                        className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            setIsEditing(true);
                            setTempName(name);
                        }}
                        title="Click to edit your name"
                    >
                        <p className="text-sm sm:text-base font-medium">
                            <span className="text-cyan-300">{greetingText}</span>
                            {name ? (
                                <span>, <span className="text-teal-200 font-semibold">{name}</span>!</span>
                            ) : (
                                <span>! 👋 <span className="text-gray-400 text-xs">(Click to add your name)</span></span>
                            )}
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center gap-2">
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder={translations?.greeting?.enterName || 'Enter your name'}
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveName();
                                if (e.key === 'Escape') handleCancel();
                            }}
                            className="px-3 py-1 bg-black/30 border border-cyan-400/50 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-300"
                        />
                        <button
                            onClick={handleSaveName}
                            className="px-3 py-1 bg-teal-500/80 hover:bg-teal-500 rounded text-white text-xs font-medium transition"
                        >
                            {translations?.greeting?.save || 'Save'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-3 py-1 bg-gray-600/80 hover:bg-gray-600 rounded text-white text-xs font-medium transition"
                        >
                            {translations?.greeting?.cancel || 'Cancel'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
