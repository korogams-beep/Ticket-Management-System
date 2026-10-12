import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PriorityBadge, StatusBadge } from '@/Components/Badge';

export default function Show({ ticket }) {
    function handleDelete() {
        if (!confirm('Are you sure you want to delete this ticket? This cannot be undone.')) return;
        router.delete(route('tickets.destroy', ticket.id));
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between flex-wrap gap-3">
                    <h2 className="text-xl font-semibold text-gray-800">Ticket #{ticket.id}</h2>
                    <div className="flex gap-2">
                        <Link
                            href={route('tickets.edit', ticket.id)}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Ticket: ${ticket.title}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{ticket.title}</h3>

                    <div className="flex flex-wrap gap-2 mb-6">
                        <PriorityBadge priority={ticket.priority} />
                        <StatusBadge status={ticket.status} />
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                            {ticket.category}
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                        <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                            <span className="font-medium text-gray-700">Created:</span>{' '}
                            {new Date(ticket.created_at).toLocaleString()}
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Updated:</span>{' '}
                            {new Date(ticket.updated_at).toLocaleString()}
                        </div>
                    </div>
                </div>

                <Link
                    href={route('tickets.index')}
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                >
                    ← Back to all tickets
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
