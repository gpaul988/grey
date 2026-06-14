'use client';

/**
 * MagneticButton — physics-based micro-interaction primitive.
 *
 * - magnetic pull toward the cursor (inertial, spring-eased via framer-motion)
 * - squish on press, expand on release (makes flat UI feel 3D)
 * - haptic tap on press (where supported)
 * - fully degrades: on touch / reduced-motion it renders a plain element
 *
 * Polymorphic: render as <button> (default) or <a>/Link via `as`.
 */
import React, {useRef, useState} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';
import {useHaptics} from '@/lib/futuristic/useHaptics';
import {useDeviceCapabilities} from '@/lib/futuristic/useDeviceCapabilities';

type MagneticButtonProps = {
    children: React.ReactNode;
    className?: string;
    strength?: number; // px of magnetic travel
    haptic?: boolean;
    onClick?: () => void;
    href?: string;
    as?: 'button' | 'a';
    type?: 'button' | 'submit';
    'aria-label'?: string;
};

export default function MagneticButton({
    children,
    className = '',
    strength = 14,
    haptic = true,
    onClick,
    href,
    as = 'button',
    type = 'button',
    ...rest
}: MagneticButtonProps) {
    const ref = useRef<HTMLElement | null>(null);
    const caps = useDeviceCapabilities();
    const {vibrate} = useHaptics();
    const [pressed, setPressed] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, {stiffness: 220, damping: 18, mass: 0.4});
    const sy = useSpring(y, {stiffness: 220, damping: 18, mass: 0.4});

    const enabled = caps.ready && caps.allowParallax && !caps.touch;

    const onMove = (e: React.MouseEvent) => {
        if (!enabled || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set((dx / (r.width / 2)) * strength);
        y.set((dy / (r.height / 2)) * strength);
    };
    const reset = () => {
        x.set(0);
        y.set(0);
    };
    const press = () => {
        setPressed(true);
        if (haptic) vibrate('tap');
    };

    const MotionTag: any = as === 'a' ? motion.a : motion.button;
    const tagProps: any = as === 'a' ? {href} : {type};

    return (
        <MotionTag
            ref={ref as React.Ref<HTMLButtonElement>}
            {...tagProps}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={reset}
            onMouseDown={press}
            onMouseUp={() => setPressed(false)}
            onBlur={() => setPressed(false)}
            className={`grey-magnetic ${className}`}
            style={enabled ? {x: sx, y: sy} : undefined}
            animate={{scale: pressed ? 0.94 : 1}}
            transition={{type: 'spring', stiffness: 400, damping: 17}}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}
