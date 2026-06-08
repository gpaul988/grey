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