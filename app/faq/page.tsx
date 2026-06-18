import type {Metadata} from 'next';
import {buildMetadata} from '@/lib/seo';
import Screen from '@/screens/faq';

export const metadata: Metadata = buildMetadata('/faq', {
    title: 'FAQs - Web Development, Mobile Apps, Digital Services | Grey InfoTech',
    description:
        'Find answers to frequently asked questions about web design, mobile app development, SEO, digital marketing, project timelines, pricing, and support. Get clarity on our process and services.',
    keywords: ['faq', 'frequently asked questions', 'web development', 'mobile apps', 'digital services'],
});

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'What services does Grey InfoTech offer?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'We offer web design & development, mobile app development, UI/UX design, digital marketing, and SEO services.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'How long does a typical project take?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Project timelines vary depending on scope and complexity. Contact us for a custom estimate.',
                                },
                            },
                        ],
                    }),
                }}
            />
            <Screen />
        </>
    );
}
