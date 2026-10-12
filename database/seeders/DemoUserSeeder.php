<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'demo@helpdesk.com'],
            [
                'name'     => 'Demo User',
                'password' => Hash::make('password'),
            ]
        );

        // Seed a few sample tickets for the demo account
        $samples = [
            [
                'title'       => 'Printer not working on 2nd floor',
                'description' => 'The shared printer on the 2nd floor office is offline. All users get a "printer not found" error when trying to print.',
                'priority'    => 'High',
                'status'      => 'Open',
                'category'    => 'Hardware',
            ],
            [
                'title'       => 'Cannot access company email',
                'description' => 'My Outlook account says credentials are invalid since this morning. Password reset did not resolve the issue.',
                'priority'    => 'Urgent',
                'status'      => 'In Progress',
                'category'    => 'Account',
            ],
            [
                'title'       => 'Slow internet on floor 3',
                'description' => 'Internet speed on the 3rd floor has been extremely slow since Monday. Speeds are below 2 Mbps during business hours.',
                'priority'    => 'Medium',
                'status'      => 'Resolved',
                'category'    => 'Network',
            ],
        ];

        foreach ($samples as $sample) {
            Ticket::firstOrCreate(
                ['user_id' => $user->id, 'title' => $sample['title']],
                array_merge($sample, ['user_id' => $user->id])
            );
        }
    }
}
