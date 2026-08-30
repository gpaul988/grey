import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ServicesScreen from '@/screens/services';

export const metadata: Metadata = buildMetadata('/services', {
  title: 'Services | Graham Sobiribo Paul',
  description: 'Explore our comprehensive software development and digital services.',
});

export default function Page() {
  return <ServicesScreen />;
}
