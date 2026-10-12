const PRIORITY_COLORS = {
    Low:    'bg-gray-100 text-gray-700',
    Medium: 'bg-yellow-100 text-yellow-800',
    High:   'bg-orange-100 text-orange-800',
    Urgent: 'bg-red-100 text-red-800',
};

const STATUS_COLORS = {
    'Open':        'bg-blue-100 text-blue-800',
    'In Progress': 'bg-purple-100 text-purple-800',
    'Resolved':    'bg-green-100 text-green-800',
    'Closed':      'bg-gray-200 text-gray-600',
};

export function PriorityBadge({ priority }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_COLORS[priority] ?? 'bg-gray-100 text-gray-700'}`}>
            {priority}
        </span>
    );
}

export function StatusBadge({ status }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
}
