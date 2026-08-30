'use client';
import React from 'react';
import AIChat from '@/components/AIChat';
import FloatingButton from '@/components/FloatingButton';

export default function ClientOnlyWidgets() {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/store')) return null;
    return (
        <>
            <AIChat />
            <FloatingButton />
        </>
    );
}
