import { Suspense } from 'react';
import StoreShell from '@/components/store/StoreShell';

async function ReferralsPageContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/store/referrals`, { cache: 'no-store' });
  const data = res.ok ? await res.json() : { referralProgram: null };
  const referralProgram = data.referralProgram;

  if (!referralProgram) {
    return <div className="st-card p-8 text-[var(--st-muted)]">Referral details are not available right now.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="st-card p-6">
        <p className="text-[var(--st-teal)] text-xs uppercase tracking-[0.2em] font-semibold">Referrals</p>
        <h1 className="mt-2 text-3xl font-bold">Invite friends and earn rewards</h1>
        <p className="mt-3 text-[var(--st-muted)] max-w-2xl">Share your referral code with friends, colleagues, and creators. When they place a qualifying order, both of you unlock rewards.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="st-card p-5">
          <p className="text-[var(--st-muted)] text-xs uppercase tracking-[0.2em]">Referral code</p>
          <p className="mt-3 font-mono text-2xl font-bold text-[var(--st-teal)]">{referralProgram.code}</p>
        </div>
        <div className="st-card p-5">
          <p className="text-[var(--st-muted)] text-xs uppercase tracking-[0.2em]">Reward for you</p>
          <p className="mt-3 text-2xl font-bold">{referralProgram.reward}</p>
        </div>
        <div className="st-card p-5">
          <p className="text-[var(--st-muted)] text-xs uppercase tracking-[0.2em]">Friend reward</p>
          <p className="mt-3 text-2xl font-bold">{referralProgram.friendReward}</p>
        </div>
      </div>

      <div className="st-card p-6">
        <h2 className="text-2xl font-bold mb-4">How it works</h2>
        <ol className="space-y-3 text-[var(--st-muted)]">
          {referralProgram.steps.map((step: string) => (
            <li key={step} className="flex items-start gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[var(--st-teal)]" /> {step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <StoreShell title="Referrals">
      <Suspense fallback={<div className="st-card p-8 text-[var(--st-muted)]">Loading referral details…</div>}>
        <ReferralsPageContent />
      </Suspense>
    </StoreShell>
  );
}
