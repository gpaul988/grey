import { Suspense } from 'react';
import StoreShell from '@/components/store/StoreShell';

async function LoyaltyPageContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/store/loyalty`, { cache: 'no-store' });
  const data = res.ok ? await res.json() : { loyalty: null };
  const loyalty = data.loyalty;

  if (!loyalty) {
    return <div className="st-card p-8 text-[var(--st-muted)]">Loyalty data is not available right now.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="st-card p-6">
        <p className="text-[var(--st-teal)] text-xs uppercase tracking-[0.2em] font-semibold">Store loyalty</p>
        <h1 className="mt-2 text-3xl font-bold">{loyalty.tier} membership</h1>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-extrabold text-[var(--st-teal)]">{loyalty.points} pts</p>
            <p className="text-sm text-[var(--st-muted)]">Next tier: {loyalty.nextTier}</p>
          </div>
          <div className="text-right text-sm text-[var(--st-muted)]">
            <p>{loyalty.progress}% to next tier</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-[var(--st-surface-2)] overflow-hidden">
          <div className="h-full rounded-full bg-[var(--st-teal)]" style={{ width: `${Math.min(loyalty.progress, 100)}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {loyalty.rewards.map((reward: { name: string; value: number }) => (
          <div key={reward.name} className="st-card p-5">
            <p className="text-[var(--st-muted)] text-xs uppercase tracking-[0.2em]">Reward</p>
            <h2 className="mt-2 text-xl font-bold">{reward.name}</h2>
            <p className="mt-2 text-[var(--st-teal)] text-lg font-bold">{reward.value} points</p>
          </div>
        ))}
      </div>

      <div className="st-card p-6">
        <h2 className="text-2xl font-bold mb-4">VIP benefits</h2>
        <ul className="space-y-2 text-[var(--st-muted)]">
          {loyalty.vipBenefits.map((benefit: string) => (
            <li key={benefit} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--st-teal)]" /> {benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <StoreShell title="Loyalty">
      <Suspense fallback={<div className="st-card p-8 text-[var(--st-muted)]">Loading loyalty details…</div>}>
        <LoyaltyPageContent />
      </Suspense>
    </StoreShell>
  );
}
