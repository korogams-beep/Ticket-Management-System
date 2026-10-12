import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PriorityBadge, StatusBadge } from '@/Components/Badge';

export default function Index({ tickets }) {
    const { data, links, meta } = tickets;

    function handleDelete(id) {
        if (!confirm('Are you sure you want to delete this ticket? This cannot be undone.')) return;
        router.delete(route('tickets.destroy', id), {
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">My Tickets</h2>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        + New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="My Tickets" />

            {/* Empty state */}
            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center shadow-sm">
                    <span className="text-5xl mb-4">🎫</span>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">No tickets yet</h3>
                    <p className="text-gray-400 text-sm mb-6">Create your first support ticket to get started.</p>
                    <Link
                        href={route('tickets.create')}
                        className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        + New Ticket
                    </Link>
                </div>
            ) : (
                <>
                    {/* Desktop table */}
                    <div className="hidden sm:block overflow-hidden rounded-xl bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {data.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <Link
                                                href={route('tickets.show', ticket.id)}
                                                className="font-medium text-indigo-600 hover:underline"
                                            >
                                                {ticket.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                                        <td className="px-6 py-4"><PriorityBadge priority={ticket.priority} /></td>
                                        <td className="px-6 py-4"><StatusBadge status={ticket.status} /></td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm space-x-3">
                                            <Link
                                                href={route('tickets.edit', ticket.id)}
                                                className="text-indigo-600 hover:underline font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(ticket.id)}
                                                className="text-red-500 hover:underline font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile stacked cards */}
                    <div className="sm:hidden space-y-4">
                        {data.map((ticket) => (
                            <div key={ticket.id} className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <Link
                                        href={route('tickets.show', ticket.id)}
                                        className="font-semibold text-indigo-600 hover:underline leading-snug"
                                    >
                                        {ticket.title}
                                    </Link>
                                    <span className="text-xs text-gray-400 shrink-0">
                                        {new Date(ticket.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">{ticket.category}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <PriorityBadge priority={ticket.priority} />
                                    <StatusBadge status={ticket.status} />
                                </div>
                                <div className="flex gap-4 border-t border-gray-100 pt-3">
                                    <Link
                                        href={route('tickets.edit', ticket.id)}
                                        className="text-sm text-indigo-600 font-medium hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(ticket.id)}
                                        className="text-sm text-red-500 font-medium hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {links && links.length > 3 && (
                        <div className="mt-6 flex flex-wrap justify-center gap-1">
                            {links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={`px-3 py-1.5 rounded-md text-sm border transition
                                        ${link.active
                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                        }
                                        ${!link.url ? 'opacity-40 pointer-events-none' : ''}
                                    `}
                                    children={link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </AuthenticatedLayout>
    );
}
