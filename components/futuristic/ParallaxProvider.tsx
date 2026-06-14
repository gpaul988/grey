'use client';

/**
 * ParallaxProvider — "respond to user movement" without a camera.
 *
 * Publishes pointer position + device tilt as CSS custom properties on
 * <html>, so any element can react with pure CSS (no per-frame React renders):
 *
 *   --grey-px / --grey-py   : pointer, range -1..1 (0 = centre)
 *   --grey-tiltx/--grey-tilty: device orientation, range -1..1
 *   --grey-mx / --grey-my   : combined pointer+tilt, range -1..1
 *
 * Uses a single rAF loop, passive listeners, and is fully gated by
 * useDeviceCapabilities (off for reduced-motion / save-data). Privacy-safe:
 * no data leaves the browser.
 */
import {useEffect} from 'react';
import {useDeviceCapabilities} from '@/lib/futuristic/useDeviceCapabilities';

export default function ParallaxProvider() {
    const caps = useDeviceCapabilities();

    useEffect(() => {
        if (!caps.ready || !caps.allowParallax) return;

        const root = document.documentElement;
        let px = 0, py = 0; // target pointer
        let tx = 0, ty = 0; // target tilt
        let cpx = 0, cpy = 0, ctx = 0, cty = 0; // current (eased)
        let raf = 0;
        let running = true;

        const onPointer = (e: PointerEvent) => {
            px = (e.clientX / window.innerWidth) * 2 - 1;
            py = (e.clientY / window.innerHeight) * 2 - 1;
        };

        const onOrient = (e: DeviceOrientationEvent) => {
            // gamma: left/right [-90,90], beta: front/back [-180,180]
            const g = e.gamma ?? 0;
            const b = e.beta ?? 0;
            tx = Math.max(-1, Math.min(1, g / 45));
            ty = Math.max(-1, Math.min(1, (b - 45) / 45));
        };

        const loop = () => {
            if (!running) return;
            // critically-damped easing for an inertial, "physics" feel
            cpx += (px - cpx) * 0.08;
            cpy += (py - cpy) * 0.08;
            ctx += (tx - ctx) * 0.06;
            cty += (ty - cty) * 0.06;
            const mx = Math.max(-1, Math.min(1, cpx + ctx));
            const my = Math.max(-1, Math.min(1, cpy + cty));
            root.style.setProperty('--grey-px', cpx.toFixed(4));
            root.style.setProperty('--grey-py', cpy.toFixed(4));
            root.style.setProperty('--grey-tiltx', ctx.toFixed(4));
            root.style.setProperty('--grey-tilty', cty.toFixed(4));
            root.style.setProperty('--grey-mx', mx.toFixed(4));
            root.style.setProperty('--grey-my', my.toFixed(4));
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener('pointermove', onPointer, {passive: true});
        if (!caps.touch) {
            // desktop: pointer is enough
        } else if (typeof DeviceOrientationEvent !== 'undefined') {
            window.addEventListener('deviceorientation', onOrient, {passive: true});
        }
        raf = requestAnimationFrame(loop);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', onPointer);
            window.removeEventListener('deviceorientation', onOrient);
        };
    }, [caps.ready, caps.allowParallax, caps.touch]);

    return null;
}
