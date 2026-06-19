import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata('/industries', {
  title: 'Industries | Grey InfoTech',
  description: 'Solutions for various industries including fintech, healthcare, e-commerce, and more.',
});

export default function IndustriesPage() {
  const industries = [
    { name: 'Fintech', slug: 'fintech' },
    { name: 'Healthcare', slug: 'healthcare' },
    { name: 'E-Commerce', slug: 'e-commerce-development' },
    { name: 'Education', slug: 'education' },
    { name: 'Real Estate', slug: 'real-estate' },
    { name: 'Manufacturing', slug: 'manufacturing' },
    { name: 'Automation', slug: 'automation' },
    { name: 'Biotech', slug: 'biotech' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">Industries We Serve</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl">
          Industry-specific solutions with deep expertise across sectors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`/industries/${industry.slug}`}>
              <div className="bg-slate-700 hover:bg-slate-600 transition-colors p-8 rounded-lg cursor-pointer h-full">
                <h3 className="text-2xl font-bold mb-4">{industry.name}</h3>
                <p className="text-gray-300">Specialized solutions for the {industry.name.toLowerCase()} sector.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
