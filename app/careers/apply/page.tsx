import type { Metadata } from 'next';
import CareerApplyScreen from '@/screens/careers/apply';

export const metadata: Metadata = {
  title: 'Submit Your CV — Grey InfoTech',
  description: "No open positions right now? Send us your CV and we'll reach out when the right role opens up.",
};

export default function Page() {
  return <CareerApplyScreen />;
}
