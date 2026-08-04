"use client";
import {usePathname} from "next/navigation";
import {useEffect} from "react";

function hashString(str: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function hslToHex(h: number, s: number, l: number) {
  const [r, g, b] = hslToRgb(h, s, l);
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export default function PageAccentProvider() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    // derive a stable hue from the pathname so each page gets a unique, repeatable color
    const key = pathname;
    const h = hashString(key) % 360; // hue
    const s = 62; // saturation
    const l = 52; // lightness

    const hex = hslToHex(h, s, l);
    const [r, g, b] = hslToRgb(h, s, l);
    const rgb = `${r}, ${g}, ${b}`;

    document.documentElement.style.setProperty('--page-accent', hex);
    document.documentElement.style.setProperty('--page-accent-rgb', rgb);
  }, [pathname]);

  return null;
}
