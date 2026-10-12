<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'category',
    ];

    // user_id is never in $fillable — always set from auth()->id()

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
