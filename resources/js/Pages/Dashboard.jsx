import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const cards = [
        { label: 'Total Tickets',   value: stats?.total      ?? 0, color: 'bg-indigo-50 text-indigo-700' },
        { label: 'Open',            value: stats?.open       ?? 0, color: 'bg-blue-50 text-blue-700' },
        { label: 'In Progress',     value: stats?.in_progress ?? 0, color: 'bg-purple-50 text-purple-700' },
        { label: 'Resolved',        value: stats?.resolved   ?? 0, color: 'bg-green-50 text-green-700' },
    ];

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>}>
            <Head title="Dashboard" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
                {cards.map((c) => (
                    <div key={c.label} className={`rounded-xl p-5 shadow-sm ${c.color}`}>
                        <p className="text-3xl font-bold">{c.value}</p>
                        <p className="text-sm mt-1 font-medium">{c.label}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Actions</h3>
                <p className="text-gray-500 text-sm mb-4">Manage your support tickets from one place.</p>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        + New Ticket
                    </Link>
                    <Link
                        href={route('tickets.index')}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        View All Tickets
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
