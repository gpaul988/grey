import type {Metadata, Viewport} from "next";
import Script from "next/script";
// Google fonts
import {Merriweather, Roboto} from "next/font/google";
// global css
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import TawkChat from "@/components/TawkChat";
import {OrganizationSchema, WebSiteSchema} from "@/components/StructuredData";
import {themeInitScript} from "@/components/ThemeProvider";
import AIChat from "@/components/AIChat";
import {SITE} from "@/lib/seo";
import AnnouncementBarWrapper from "@/components/futuristic/AnnouncementBarWrapper";


// ─── Render on-demand instead of pre-rendering all pages at build ──────────
// This site is served by a long-running custom Express server (server.ts), not
// `next start`, so there is NO benefit to statically pre-rendering every page
// at build time — the live Node process renders them per request anyway.
//
// Pre-rendering all 92 routes in a single build pass held every rendered page
// in memory at once and blew past cPanel's 1GB cap (peak ~1.8GB -> OOM/SIGABRT).
// Forcing dynamic rendering at the root removes that build-time memory pressure
// entirely while serving identical HTML to users. Content is static local data,
// so per-request render cost is negligible.
export const dynamic = "force-dynamic";

const merriweather = Merriweather({
    variable: "--font-merriweather",
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    display: "swap", // FIX: prevents invisible text while font loads (FOIT)
});

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
    display: "swap", // FIX: improves perceived performance + LCP
});

// FIX: metadataBase enables relative OG/canonical URLs to resolve correctly
export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),

    // FIX: title template so child pages get "Page | Grey InfoTech" automatically
    title: {
        default:
            "Grey InfoTech Ltd. - Web Design & Development Agency | Port Harcourt, Nigeria",
        template: "%s | Grey InfoTech",
    },

    description:
        "Grey InfoTech is a web design, web & mobile app development, and digital marketing agency in Port Harcourt, Nigeria. We build scalable, user-centered digital solutions for startups and enterprises.",

    keywords: [
        "web design Port Harcourt",
        "web development Nigeria",
        "mobile app development",
        "UI UX design",
        "digital marketing",
        "SEO Nigeria",
        "Grey InfoTech",
        "Software Development Port Harcourt",
        "Unity Development Port Harcourt",
        "MVP Development Port Harcourt",
    ],

    authors: [{name: "Grey InfoTech", url: SITE.url}],
    creator: "Grey InfoTech",
    publisher: "Grey InfoTech Ltd.",

    alternates: {canonical: SITE.url},

    openGraph: {
        title: "Grey InfoTech - Creative Digital Solutions",
        description:
            "Innovative web design, development, and mobile apps tailored to your business goals.",
        url: SITE.url,
        siteName: "Grey InfoTech",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Grey InfoTech - Creative Digital Solutions",
            },
        ],
        type: "website",
        locale: "en_NG",
    },

    twitter: {
        card: "summary_large_image",
        title: "Grey InfoTech - Web Design & Development",
        description: "Transform your business with innovative digital solutions.",
        images: ["/og-image.png"],
        creator: SITE.twitter,
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    manifest: "/manifest.json",

    icons: {
        icon: [
            {url: "/favicon.ico", sizes: "any"},
            {url: "/favicon.svg", type: "image/svg+xml"},
            {url: "/favicon-32.png", type: "image/png", sizes: "32x32"},
        ],
        apple: "/apple-touch-icon.png",
        shortcut: "/favicon.ico",
    },

    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "Grey InfoTech",
    },

    category: "technology",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // allow zoom for accessibility — never lock to 1
    userScalable: true,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#ffffff"},
        {media: "(prefers-color-scheme: dark)", color: "#05070d"},
    ],
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning style={{overflowX: 'hidden'}}>
        <head>
            {/* FIX (FOUC): set the theme class before first paint */}
            <Script
                id="theme-init"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{__html: themeInitScript}}
            />
        </head>
        <body
            className={`${merriweather.variable} ${roboto.variable} antialiased`}
        >
            {/* Skip-to-content link for keyboard/screen-reader users (WCAG) */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
            >
                Skip to main content
            </a>

            {/* Structured data (Schema.org) for rich results — now with real sameAs links */}
            <OrganizationSchema socialLinks={[...SITE.socials]}/>
            <WebSiteSchema/>

            {/* Schedule-aware promo / announcement strip above the header */}
            <AnnouncementBarWrapper/>

            {/* Header with language switcher in navbar */}
            <Header/>

            {/* semantic <main> landmark + id target for skip link */}
            <main id="main-content">{children}</main>

            <Footer/>

            {/* Live human chat (Tawk) + AI assistant run side-by-side */}
            {process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID && process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ? (
                <TawkChat 
                    propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
                    widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
                />
            ) : (
                process.env.NODE_ENV === 'development' && (
                    <div className="fixed bottom-96 right-5 z-[89] hidden lg:block rounded-lg bg-amber-100 border border-amber-400 p-3 text-xs text-amber-900 max-w-xs">
                        <strong>⚠️ Tawk.to not configured.</strong>
                        <br/>Set NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID in .env.local to enable live chat.
                    </div>
                )
            )}
            <AIChat/>
        </body>
        </html>
    );
}
