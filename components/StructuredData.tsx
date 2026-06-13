import React from "react";

interface OrganizationSchemaProps {
    socialLinks?: string[];
}

export function OrganizationSchema({
                                       socialLinks = [],
                                   }: OrganizationSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Grey InfoTech Limited",
        url: "https://greyinfotech.com.ng",
        logo: "https://greyinfotech.com.ng/logo.png",
        description:
            "Web design, web & mobile app development, and digital marketing agency in Port Harcourt, Nigeria.",
        foundingDate: "2017",
        areaServed: {"@type": "Country", name: "Nigeria"},
        address: {
            "@type": "PostalAddress",
            streetAddress: "9 Godfery Tata Close, Rumuewhara New-Layout, Off Eneka-Igwuruta Road",
            addressLocality: "Port Harcourt",
            addressRegion: "Rivers State",
            postalCode: "500102",
            addressCountry: "NG",
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "Sales",
            telephone: "+234-802-809-5571",
        },
        sameAs: socialLinks,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
            suppressHydrationWarning
        />
    );
}

/**
 * WebSite schema with SearchAction — enables the sitelinks search box in
 * Google results and reinforces the canonical site identity.
 */
export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Grey InfoTech",
        url: "https://greyinfotech.com.ng",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://greyinfotech.com.ng/blog?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
            suppressHydrationWarning
        />
    );
}

/**
 * BreadcrumbList schema generator — call from any page that wants breadcrumbs
 * in search results. items: [{name, url}] in order from Home → current page.
 */
export function BreadcrumbSchema({items}: {items: {name: string; url: string}[]}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: it.url,
        })),
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
            suppressHydrationWarning
        />
    );
}