import type {Metadata, Viewport} from "next";
// Google fonts
import {Merriweather, Roboto} from "next/font/google";
// global css
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import TawkChat from "@/components/TawkChat";
import {OrganizationSchema, WebSiteSchema} from "@/components/StructuredData";
import {ThemeProvider, themeInitScript} from "@/components/ThemeProvider";
import AIChat from "@/components/AIChat";
import {SITE} from "@/lib/seo";

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
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* FIX (FOUC): set the theme class before first paint */}
            <script dangerouslySetInnerHTML={{__html: themeInitScript}}/>
        </head>
        <body
            className={`${merriweather.variable} ${roboto.variable} antialiased`}
        >
        <ThemeProvider>
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

            <Header/>

            {/* semantic <main> landmark + id target for skip link */}
            <main id="main-content">{children}</main>

            <Footer/>

            {/* Live human chat (Tawk) + AI assistant run side-by-side */}
            <TawkChat propertyId="6a1ba828a3242d1c2ed9db1d" widgetId="1jpu0ho3p"/>
            <AIChat/>
        </ThemeProvider>
        </body>
        </html>
    );
}
