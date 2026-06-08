import Link from 'next/link';

export default function AdminCalendar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <p className="mb-4">This is a migrated placeholder for the admin calendar page. Replace with full UI as needed.</p>

      <div className="border rounded p-4 bg-white">
        <p className="text-sm text-gray-600">Calendar widget would be here (FullCalendar, etc.).</p>
      </div>

      <div className="mt-6">
        <Link href="/admin/dashboard" className="text-teal-600">Back to dashboard</Link>
      </div>
    </div>
  );
}

