'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
} from 'recharts';

// Sample data for charts
const userGrowthData = [
  { month: 'Jan', users: 400, newUsers: 100 },
  { month: 'Feb', users: 600, newUsers: 200 },
  { month: 'Mar', users: 900, newUsers: 300 },
  { month: 'Apr', users: 1200, newUsers: 300 },
  { month: 'May', users: 1400, newUsers: 200 },
  { month: 'Jun', users: 1800, newUsers: 400 },
];

const revenueData = [
  { name: 'Stripe', value: 45, color: '#3b82f6' },
  { name: 'PayPal', value: 35, color: '#f59e0b' },
  { name: 'Wire', value: 15, color: '#10b981' },
  { name: 'Other', value: 5, color: '#8b5cf6' },
];

const servicePopularityData = [
  { service: 'Web Dev', audits: 250 },
  { service: 'Mobile App', audits: 180 },
  { service: 'UI/UX', audits: 120 },
  { service: 'DevOps', audits: 90 },
  { service: 'Consulting', audits: 60 },
];

const conversionFunnelData = [
  { name: 'Visitors', value: 5000 },
  { name: 'FAQs Viewed', value: 3200 },
  { name: 'Leads', value: 1800 },
  { name: 'Audits Run', value: 900 },
  { name: 'Conversions', value: 450 },
];

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export function UserGrowthChart() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={userGrowthData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="newUsers"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueBreakdownChart() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={revenueData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {revenueData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
              color: '#e2e8f0',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ServicePopularityChart() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Service Popularity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={servicePopularityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
          <XAxis dataKey="service" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="audits" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConversionFunnelChart() {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Conversion Funnel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <FunnelChart margin={{ top: 20, right: 160, bottom: 20, left: 0 }}>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
              color: '#e2e8f0',
            }}
          />
          <Funnel
            dataKey="value"
            data={conversionFunnelData}
            isAnimationActive
          >
            {conversionFunnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AuditRateChart() {
  const auditRateData = [
    { date: '2026-06-12', audits: 12 },
    { date: '2026-06-13', audits: 18 },
    { date: '2026-06-14', audits: 14 },
    { date: '2026-06-15', audits: 22 },
    { date: '2026-06-16', audits: 19 },
    { date: '2026-06-17', audits: 25 },
    { date: '2026-06-18', audits: 28 },
  ];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Daily Audit Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={auditRateData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="audits" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SearchAnalyticsChart() {
  const searchData = [
    { keyword: 'React', count: 45 },
    { keyword: 'Node.js', count: 38 },
    { keyword: 'TypeScript', count: 32 },
    { keyword: 'Next.js', count: 28 },
    { keyword: 'API Design', count: 22 },
  ];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Top Search Queries</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={searchData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
          <XAxis type="number" stroke="#94a3b8" />
          <YAxis dataKey="keyword" type="category" stroke="#94a3b8" width={140} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Bar dataKey="count" fill="#10b981" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
