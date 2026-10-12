<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

class TicketPolicy
{
    /**
     * Only the ticket owner may view it.
     */
    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Any authenticated user may create tickets.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Only the ticket owner may update it.
     */
    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }

    /**
     * Only the ticket owner may delete it.
     */
    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id;
    }
}
