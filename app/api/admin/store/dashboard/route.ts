import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: [
      { label: 'Total customers', value: '24.8K', delta: '+12.4%', tone: 'sky' },
      { label: 'Net sales', value: '₦8.4M', delta: '+9.1%', tone: 'emerald' },
      { label: 'Supplies delivered', value: '1,482', delta: '+18.7%', tone: 'amber' },
      { label: 'Avg. conversion', value: '7.8%', delta: '+1.3%', tone: 'violet' },
    ],
    salesTrend: [
      { month: 'Jan', sales: 2400000, target: 2200000 },
      { month: 'Feb', sales: 2600000, target: 2300000 },
      { month: 'Mar', sales: 2900000, target: 2500000 },
      { month: 'Apr', sales: 3200000, target: 2700000 },
      { month: 'May', sales: 3600000, target: 3000000 },
      { month: 'Jun', sales: 4100000, target: 3400000 },
      { month: 'Jul', sales: 4700000, target: 3700000 },
    ],
    nightingale: [
      { name: 'Laptops', value: 42, fill: '#38bdf8' },
      { name: 'Phones', value: 28, fill: '#8b5cf6' },
      { name: 'Servers', value: 19, fill: '#34d399' },
      { name: 'Accessories', value: 12, fill: '#fbbf24' },
    ],
    radar: [
      { subject: 'Availability', current: 88, benchmark: 74 },
      { subject: 'Speed', current: 82, benchmark: 70 },
      { subject: 'Retention', current: 76, benchmark: 68 },
      { subject: 'Orders', current: 92, benchmark: 77 },
      { subject: 'Repeat', current: 79, benchmark: 65 },
      { subject: 'Support', current: 84, benchmark: 72 },
    ],
    density: [
      { range: '0-20%', density: 12 },
      { range: '21-40%', density: 18 },
      { range: '41-60%', density: 23 },
      { range: '61-80%', density: 31 },
      { range: '81-100%', density: 41 },
    ],
    network: [
      { from: 'Rivers State', to: 'Port Harcourt', value: 7 },
      { from: 'Port Harcourt', to: 'Customers', value: 9 },
      { from: 'Nigeria', to: 'Abuja', value: 6 },
      { from: 'Nigeria', to: 'Customers', value: 8 },
      { from: 'Abuja', to: 'Supplied To', value: 4 },
      { from: 'Port Harcourt', to: 'Supplied To', value: 5 },
    ],
  });
}
