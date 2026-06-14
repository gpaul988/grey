import React from 'react';
import SocialProof from '@/components/SocialProof';

export default function IndustriesLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            {children}
            <SocialProof page="industries"/>
        </>
    );
}
