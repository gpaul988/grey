import React from 'react';
import SocialProof from '@/components/SocialProof';

export default function ServicesLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            {children}
            <SocialProof page="services"/>
        </>
    );
}
