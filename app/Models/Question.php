<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'day_number',
        'question',
        'content',
        'type',
        'options',
        'correct_answer',
        'extra_text',
        'coin_reward',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'options' => 'array',
        ];
    }
}
