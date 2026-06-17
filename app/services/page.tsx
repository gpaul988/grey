import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = buildMetadata('/services', {
  title: 'Services | Grey InfoTech',
  description: 'Explore our comprehensive software development and digital services.',
});

export default function ServicesPage() {
  const services = [
    { name: 'Web Development', slug: 'Web-Development' },
    { name: 'App Development', slug: 'Mobile-Application-Development' },
    { name: 'Backend Development', slug: 'backend-development' },
    { name: 'Frontend Development', slug: 'frontend-development' },
    { name: 'Blockchain Development', slug: 'blockchain-development' },
    { name: 'AI Development', slug: 'ai-development-services' },
    { name: 'Cloud Solutions', slug: 'cloud-solutions' },
    { name: 'Digital Marketing', slug: 'digital-marketing' },
    { name: 'UI/UX Design', slug: 'ui-ux-design' },
    { name: 'Branding', slug: 'branding' },
    { name: 'Consulting', slug: 'consulting' },
    { name: 'MVP Development', slug: 'MVP' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">Our Services</h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl">
          We deliver cutting-edge software solutions tailored to your business needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <div className="bg-slate-700 hover:bg-slate-600 transition-colors p-8 rounded-lg cursor-pointer h-full">
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <p className="text-gray-300">Learn more about our {service.name.toLowerCase()} offerings.</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
