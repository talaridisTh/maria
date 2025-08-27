<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GameProgress extends Model
{
    protected $fillable = [
        'user_id',
        'day_number',
        'unlocked_at',
        'is_read',
        'read_at',
        'selected_answer',
        'answered_correctly',
        'coins_earned',
        'answer_revealed',
    ];

    protected function casts(): array
    {
        return [
            'unlocked_at' => 'datetime',
            'read_at' => 'datetime',
            'is_read' => 'boolean',
            'answered_correctly' => 'boolean',
            'answer_revealed' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
