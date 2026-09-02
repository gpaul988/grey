import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.18),_transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)]">
          <div className="h-full overflow-auto px-5 py-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
