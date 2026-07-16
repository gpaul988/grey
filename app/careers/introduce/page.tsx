import type { Metadata } from 'next';
import CareerIntroduceScreen from '@/screens/careers/introduce';

export const metadata: Metadata = {
  title: 'Introduce Yourself  - Grey InfoTech',
  description: "Don't see the right role? Introduce yourself and we'll keep your profile on file.",
};

export default function Page() {
  return <CareerIntroduceScreen />;
}
