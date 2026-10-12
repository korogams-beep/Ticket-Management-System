<?php

namespace App\Providers;

use App\Models\Ticket;
use App\Policies\TicketPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register TicketPolicy explicitly (Laravel also auto-discovers it)
        Gate::policy(Ticket::class, TicketPolicy::class);

        // Force HTTPS in production so asset URLs don't cause mixed-content errors
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
