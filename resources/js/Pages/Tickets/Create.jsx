import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];
const STATUSES   = ['Open', 'In Progress', 'Resolved', 'Closed'];
const CATEGORIES = ['Hardware', 'Software', 'Network', 'Account', 'Other'];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title:       '',
        description: '',
        priority:    'Low',
        status:      'Open',
        category:    'Hardware',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('tickets.store'));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-gray-800">Create Ticket</h2>}>
            <Head title="Create Ticket" />

            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
                    <form onSubmit={handleSubmit} noValidate className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                    ${errors.title ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Short descriptive title (5–255 chars)"
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                    ${errors.description ? 'border-red-400' : 'border-gray-300'}`}
                                placeholder="Describe the issue in detail (min 10 chars)"
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>

                        {/* Priority / Status / Category in a responsive grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={data.priority}
                                    onChange={e => setData('priority', e.target.value)}
                                    className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        ${errors.priority ? 'border-red-400' : 'border-gray-300'}`}
                                >
                                    {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                                </select>
                                {errors.priority && <p className="mt-1 text-xs text-red-600">{errors.priority}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                    className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        ${errors.status ? 'border-red-400' : 'border-gray-300'}`}
                                >
                                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                                </select>
                                {errors.status && <p className="mt-1 text-xs text-red-600">{errors.status}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                                        ${errors.category ? 'border-red-400' : 'border-gray-300'}`}
                                >
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                                {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creating…' : 'Create Ticket'}
                            </button>
                            <Link
                                href={route('tickets.index')}
                                className="rounded-md border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
