<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    /**
     * Display a paginated list of the authenticated user's tickets.
     */
    public function index(): Response
    {
        $tickets = Ticket::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new ticket.
     */
    public function create(): Response
    {
        return Inertia::render('Tickets/Create');
    }

    /**
     * Store a newly created ticket. user_id is always set from auth(), never from form.
     */
    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $ticket = $request->user()->tickets()->create($request->validated());

        return redirect()->route('tickets.show', $ticket)
            ->with('flash', ['type' => 'success', 'message' => 'Ticket created.']);
    }

    /**
     * Display the specified ticket (owner only via policy).
     */
    public function show(Ticket $ticket): Response
    {
        $this->authorize('view', $ticket);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Show the form for editing the ticket (owner only via policy).
     */
    public function edit(Ticket $ticket): Response
    {
        $this->authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Update the ticket (owner only via policy).
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        $this->authorize('update', $ticket);

        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)
            ->with('flash', ['type' => 'success', 'message' => 'Ticket updated.']);
    }

    /**
     * Delete the ticket (owner only via policy).
     */
    public function destroy(Ticket $ticket): RedirectResponse
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')
            ->with('flash', ['type' => 'success', 'message' => 'Ticket deleted.']);
    }
}
