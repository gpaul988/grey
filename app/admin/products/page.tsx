import db from '@/Admin/db';
import { requireAdminSession } from '@/lib/admin/server-auth';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await requireAdminSession();
  const products = (db.prepare(
    `SELECT p.id, p.name, p.sku, p.stock, p.price, p.status, p.updated_at AS updatedAt,
            COALESCE(SUM(oi.quantity), 0) AS sold
     FROM products p
     LEFT JOIN order_items oi ON oi.product_id = p.id
     GROUP BY p.id
     ORDER BY p.updated_at DESC
     LIMIT 10`,
  ).all() as Array<{ id: number; name: string; sku: string | null; stock: number; price: number; status: string; updatedAt: string; sold: number }> );

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-slate-800 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Products</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Catalog management</h1>
      </header>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Inventory overview</h2>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300">
              {products.length} listings
            </span>
            <a href="/admin/products/new" className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-slate-950">New product</a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="pb-3 pr-4 font-medium">Product</th>
                <th className="pb-3 pr-4 font-medium">SKU</th>
                <th className="pb-3 pr-4 font-medium">Price</th>
                <th className="pb-3 pr-4 font-medium">Stock</th>
                <th className="pb-3 pr-4 font-medium">Sold</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-slate-800/70 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-white">{product.name}</td>
                  <td className="py-3 pr-4 text-slate-300">{product.sku ?? '—'}</td>
                  <td className="py-3 pr-4 text-slate-200">{formatMoney(product.price)}</td>
                  <td className="py-3 pr-4 text-slate-200">{product.stock}</td>
                  <td className="py-3 pr-4 text-slate-200">{product.sold}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-1 text-xs capitalize text-slate-200">
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                   <a href={`/admin/products/${product.id}/edit`} className="text-xs font-medium text-sky-300 hover:text-sky-200">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
