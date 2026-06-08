import Link from 'next/link';

export default function AdminInvoices() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <p className="text-sm text-gray-600">Placeholder for invoice list. Use the legacy EJS views as reference when adding features.</p>

      <div className="mt-4">
        <Link href="/admin/apps/invoice-create" className="text-teal-600">Create invoice</Link>
      </div>
    </div>
  );
}

