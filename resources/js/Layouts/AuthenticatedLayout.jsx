import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [showNav, setShowNav] = useState(false);
    const [flashMsg, setFlashMsg] = useState(null);

    // Show flash banner whenever a new flash arrives
    useEffect(() => {
        if (flash) {
            setFlashMsg(flash);
            const t = setTimeout(() => setFlashMsg(null), 4000);
            return () => clearTimeout(t);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ── Navigation bar ── */}
            <nav className="bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Left: logo + nav links */}
                        <div className="flex items-center gap-8">
                            <Link href={route('dashboard')} className="flex items-center gap-2">
                                <span className="text-xl font-bold text-indigo-600">🎫 HelpDesk</span>
                            </Link>
                            <div className="hidden sm:flex gap-6">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('tickets.index')} active={route().current('tickets.*')}>
                                    My Tickets
                                </NavLink>
                            </div>
                        </div>

                        {/* Right: New Ticket + user name + logout */}
                        <div className="hidden sm:flex items-center gap-4">
                            <Link
                                href={route('tickets.create')}
                                className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
                            >
                                + New Ticket
                            </Link>
                            <span className="text-sm text-gray-600 font-medium">{user.name}</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-500 hover:text-red-600 transition"
                            >
                                Logout
                            </Link>
                        </div>

                        {/* Hamburger for mobile */}
                        <button
                            className="sm:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
                            onClick={() => setShowNav(!showNav)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {showNav
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {showNav && (
                    <div className="sm:hidden border-t border-gray-200 bg-white px-4 pb-4 pt-2 space-y-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tickets.index')} active={route().current('tickets.*')}>
                            My Tickets
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tickets.create')}>
                            + New Ticket
                        </ResponsiveNavLink>
                        <div className="border-t border-gray-200 pt-3">
                            <p className="text-sm text-gray-600 font-medium px-1">{user.name}</p>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button">
                                Logout
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {/* ── Flash message banner ── */}
            {flashMsg && (
                <div
                    className={`mx-auto max-w-7xl mt-4 px-4 sm:px-6 lg:px-8`}
                >
                    <div
                        className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium shadow
                            ${flashMsg.type === 'success'
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                    >
                        <span>✅ {flashMsg.message}</span>
                        <button onClick={() => setFlashMsg(null)} className="ml-4 text-lg leading-none opacity-60 hover:opacity-100">×</button>
                    </div>
                </div>
            )}

            {/* ── Page header ── */}
            {header && (
                <header className="bg-white shadow-sm mt-4">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* ── Main content ── */}
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
