<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TicketController;
use App\Models\Ticket;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Root redirects to dashboard
Route::get('/', function () {
    return redirect()->route('dashboard');
});

// Dashboard — requires auth, passes ticket stats to the page
Route::get('/dashboard', function () {
    $userId = auth()->id();

    return Inertia::render('Dashboard', [
        'stats' => [
            'total'       => Ticket::where('user_id', $userId)->count(),
            'open'        => Ticket::where('user_id', $userId)->where('status', 'Open')->count(),
            'in_progress' => Ticket::where('user_id', $userId)->where('status', 'In Progress')->count(),
            'resolved'    => Ticket::where('user_id', $userId)->where('status', 'Resolved')->count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// All ticket routes are protected by auth middleware
// Route::resource generates: index, create, store, show, edit, update, destroy
Route::middleware('auth')->group(function () {
    Route::resource('tickets', TicketController::class);
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
