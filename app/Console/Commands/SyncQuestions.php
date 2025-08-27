<?php

namespace App\Console\Commands;

use App\Models\Question;
use Illuminate\Console\Command;

class SyncQuestions extends Command
{
    protected $signature = 'questions:sync';

    protected $description = 'Sync questions from config/questions.php into the database';

    public function handle(): int
    {
        $items = config('questions', []);
        if (!is_array($items)) {
            $this->error('Invalid questions config.');
            return self::FAILURE;
        }

        $created = 0;
        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $questionText = $item['question'] ?? null;
            if (!$questionText) {
                continue;
            }

            $exists = Question::query()->where('question', $questionText)->exists();
            if ($exists) {
                continue;
            }

            $nextDay = (int) Question::max('day_number') + 1;

            $payload = [
                'day_number' => $item['day_number'] ?? $nextDay,
                'question' => $questionText,
                'content' => $item['content'] ?? null,
                'type' => $item['type'] ?? 'message',
                'options' => $item['options'] ?? null,
                'correct_answer' => $item['correct_answer'] ?? null,
                'extra_text' => $item['extra_text'] ?? null,
                'coin_reward' => $item['coin_reward'] ?? 0,
                'is_active' => $item['is_active'] ?? true,
            ];

            Question::create($payload);
            $created++;
        }

        $this->info("Synced. Created: {$created}");
        return self::SUCCESS;
    }
}
