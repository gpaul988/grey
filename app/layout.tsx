import type {Metadata, Viewport} from "next";
// Google fonts
import {Merriweather, Roboto} from "next/font/google";
// global css
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import TawkChat from "@/components/TawkChat";
import {OrganizationSchema} from "@/components/StructuredData";

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
    metadataBase: new URL("https://greyinfotech.com.ng"),

    // FIX: title template so child pages get "Page | Grey InfoTech" automatically
    title: {
        default:
            "Grey InfoTech Ltd. - Web Design & Development Agency | Port Harcourt, Nigeria",
        template: "%s | Grey InfoTech",
    },

    // FIX: descriptive, keyword-rich description (old one was too thin for SEO)
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

    authors: [{name: "Grey InfoTech", url: "https://greyinfotech.com.ng"}],
    creator: "Grey InfoTech",
    publisher: "Grey InfoTech Ltd.",

    // FIX: canonical URL — was completely missing (audit flagged this)
    alternates: {
        canonical: "https://greyinfotech.com.ng",
    },

    // FIX: Open Graph tags — were ALL missing (og:title/description/image)
    openGraph: {
        title: "Grey InfoTech - Creative Digital Solutions",
        description:
            "Innovative web design, development, and mobile apps tailored to your business goals.",
        url: "https://greyinfotech.com.ng",
        siteName: "Grey InfoTech",
        images: [
            {
                url: "/og-image.png", // place a 1200x630 image in /public
                width: 1200,
                height: 630,
                alt: "Grey InfoTech - Creative Digital Solutions",
            },
        ],
        type: "website",
        locale: "en_NG",
    },

    // FIX: Twitter card for proper link previews on X
    twitter: {
        card: "summary_large_image",
        title: "Grey InfoTech - Web Design & Development",
        description: "Transform your business with innovative digital solutions.",
        images: ["/og-image.png"],
    },

    // FIX: explicit robots directives for better crawling
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

    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    category: "technology",
};

// FIX: viewport is now its own export (Next.js 14+ requirement, not inside metadata)
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5, // allow zoom for accessibility — never lock to 1
    userScalable: true,
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "#ffffff"},
        {media: "(prefers-color-scheme: dark)", color: "#000000"},
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${merriweather.variable} ${roboto.variable} antialiased`}
        >
        {/* FIX: Skip-to-content link for keyboard/screen-reader users (WCAG) */}
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
            Skip to main content
        </a>

        {/* FIX: Organization structured data (Schema.org) for rich results */}
        <OrganizationSchema/>

        <Header/>

        <TawkChat
            propertyId="6a1ba828a3242d1c2ed9db1d"
            widgetId="1jpu0ho3p"
        />

        {/* FIX: semantic <main> landmark + id target for skip link */}
        <main id="main-content">{children}</main>

        <Footer/>
        </body>
        </html>
    );
}