import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
            {/* Logo / Brand */}
            <div className="mb-6 text-center">
                <Link href="/" className="inline-flex items-center gap-2">
                    <span className="text-3xl">🎫</span>
                    <span className="text-2xl font-bold text-indigo-600">HelpDesk</span>
                </Link>
                <p className="mt-1 text-sm text-gray-500">Ticket Management System</p>
            </div>

            {/* Card */}
            <div className="w-full max-w-md overflow-hidden rounded-xl bg-white px-8 py-7 shadow-md">
                {children}
            </div>
        </div>
    );
}
