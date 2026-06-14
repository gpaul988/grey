'use client';

/**
 * WebGLScene — the actual three.js content (loaded lazily, never on the
 * critical path). A slowly-rotating wireframe icosahedron core wrapped in a
 * drifting particle field, with subtle pointer parallax. Brand-tinted, dark,
 * professional — not a toy.
 *
 * Imported ONLY via next/dynamic({ssr:false}) from WebGLHero, so three.js is
 * code-split out of the main bundle and only fetched on capable devices.
 */
import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import * as THREE from 'three';

function Core({pointer}: {pointer: React.MutableRefObject<{x: number; y: number}>}) {
    const mesh = useRef<THREE.Mesh>(null);
    const glow = useRef<THREE.Mesh>(null);

    useFrame((_, dt) => {
        if (mesh.current) {
            mesh.current.rotation.y += dt * 0.18;
            mesh.current.rotation.x += dt * 0.06;
            // ease toward pointer for parallax
            mesh.current.rotation.z += (pointer.current.x * 0.25 - mesh.current.rotation.z) * 0.05;
            mesh.current.position.y += (pointer.current.y * -0.3 - mesh.current.position.y) * 0.05;
        }
        if (glow.current) glow.current.rotation.y -= dt * 0.1;
    });

    return (
        <group>
            <mesh ref={glow} scale={1.55}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#0e7490" wireframe transparent opacity={0.12} />
            </mesh>
            <mesh ref={mesh}>
                <icosahedronGeometry args={[1, 2]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#0891b2"
                    emissiveIntensity={0.5}
                    metalness={0.7}
                    roughness={0.25}
                    wireframe
                />
            </mesh>
        </group>
    );
}

function Particles({count = 700}: {count?: number}) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.2 + Math.random() * 3.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            arr[i * 3 + 2] = r * Math.cos(phi);
        }
        return arr;
    }, [count]);

    useFrame((_, dt) => {
        if (ref.current) {
            ref.current.rotation.y += dt * 0.04;
            ref.current.rotation.x += dt * 0.015;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.025} color="#a855f7" transparent opacity={0.75} sizeAttenuation />
        </points>
    );
}

export default function WebGLScene({particleCount = 700}: {particleCount?: number}) {
    const pointer = useRef({x: 0, y: 0});

    return (
        <Canvas
            dpr={[1, 1.6]}
            gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}
            camera={{position: [0, 0, 5], fov: 50}}
            onPointerMove={(e) => {
                pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
                pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
            }}
            style={{width: '100%', height: '100%'}}
        >
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
            <pointLight position={[-5, -3, 2]} intensity={0.8} color="#a855f7" />
            <Core pointer={pointer} />
            <Particles count={particleCount} />
        </Canvas>
    );
}
