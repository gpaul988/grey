'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FuturisticCard } from '@/components/futuristic/FuturisticCard';
import { ModernSection } from '@/components/futuristic/ModernSection';
import { Code2, Smartphone, Database, Layout, Blocks, Brain, Cloud, Megaphone, Palette, Briefcase, Zap, Rocket } from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  'Web-Development': <Code2 className="w-8 h-8" />,
  'Mobile-Application-Development': <Smartphone className="w-8 h-8" />,
  'backend-development': <Database className="w-8 h-8" />,
  'frontend-development': <Layout className="w-8 h-8" />,
  'blockchain-development': <Blocks className="w-8 h-8" />,
  'ai-development-services': <Brain className="w-8 h-8" />,
  'cloud-solutions': <Cloud className="w-8 h-8" />,
  'digital-marketing': <Megaphone className="w-8 h-8" />,
  'ui-ux-design': <Palette className="w-8 h-8" />,
  'branding': <Briefcase className="w-8 h-8" />,
  'consulting': <Zap className="w-8 h-8" />,
  'MVP': <Rocket className="w-8 h-8" />,
};

export default function ServicesContent() {
  const services = [
    { name: 'Web Development', slug: 'Web-Development', desc: 'Modern, scalable web applications with cutting-edge technologies' },
    { name: 'App Development', slug: 'Mobile-Application-Development', desc: 'Native and cross-platform mobile solutions' },
    { name: 'Backend Development', slug: 'backend-development', desc: 'Robust server-side architecture and APIs' },
    { name: 'Frontend Development', slug: 'frontend-development', desc: 'Beautiful, responsive user interfaces' },
    { name: 'Blockchain Development', slug: 'blockchain-development', desc: 'Secure distributed applications' },
    { name: 'AI Development', slug: 'ai-development-services', desc: 'Machine learning and intelligent systems' },
    { name: 'Cloud Solutions', slug: 'cloud-solutions', desc: 'Scalable cloud infrastructure' },
    { name: 'Digital Marketing', slug: 'digital-marketing', desc: 'Growth-focused marketing strategies' },
    { name: 'UI/UX Design', slug: 'ui-ux-design', desc: 'User-centered design excellence' },
    { name: 'Branding', slug: 'branding', desc: 'Compelling brand identity' },
    { name: 'Consulting', slug: 'consulting', desc: 'Strategic technology guidance' },
    { name: 'MVP Development', slug: 'MVP', desc: 'Fast-track product launches' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="relative min-h-screen bg-black">
      {/* Background grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <ModernSection
          title="Our Services"
          subtitle="Comprehensive software development and digital solutions tailored to accelerate your business growth"
          centered
          background="glow"
          className="pt-32"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service) => (
              <motion.div key={service.slug} variants={itemVariants}>
                <Link href={`/services/${service.slug}`}>
                  <FuturisticCard
                    gradient={Math.random() > 0.5 ? 'cyan' : 'purple'}
                    hover="lift"
                    className="p-8 h-full flex flex-col justify-between group"
                  >
                    {/* Icon */}
                    <div className="mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {serviceIcons[service.slug] || <Zap className="w-8 h-8" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-400 group-hover:text-slate-300 transition-colors mb-6 flex-grow">
                      {service.desc}
                    </p>

                    {/* Link indicator */}
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                      Learn More
                      <span>→</span>
                    </div>
                  </FuturisticCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </ModernSection>

        {/* CTA Section */}
        <ModernSection background="glow" className="pb-32">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss which service is right for your project.
            </p>
            <Link href="/quote-request">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 hover:brightness-110 transition-all duration-300">
                Get a Quote
              </button>
            </Link>
          </div>
        </ModernSection>
      </div>
    </main>
  );
}

