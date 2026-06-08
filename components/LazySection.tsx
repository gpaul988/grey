'use client';

import React, {useEffect, useRef, useState} from 'react';

interface LazySectionProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    className?: string;
    onVisible?: () => void;
}

export const LazySection = React.forwardRef<
    HTMLDivElement,
    LazySectionProps
>(
    (
        {
            children,
            fallback,
            threshold = 0.1,
            rootMargin = '0px',
            className = '',
            onVisible,
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);
        const internalRef = useRef<HTMLDivElement>(null);
        const divRef = ref || internalRef;

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        onVisible?.();
                        if (divRef && 'current' in divRef && divRef.current) {
                            observer.unobserve(divRef.current);
                        }
                    }
                },
                {threshold, rootMargin}
            );

            if (divRef && 'current' in divRef && divRef.current) {
                observer.observe(divRef.current);
            }

            return () => {
                if (divRef && 'current' in divRef && divRef.current) {
                    observer.unobserve(divRef.current);
                }
            };
        }, [threshold, rootMargin, onVisible]);

        return (
            <div ref={divRef as any} className={className}>
                {isVisible ? children : fallback}
            </div>
        );
    }
);

LazySection.displayName = 'LazySection';