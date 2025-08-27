<?php

namespace App\Http\Controllers;

use App\Models\DailyNews;
use App\Models\GameProgress;
use App\Models\Question;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DailyNewsController extends Controller
{
    public function index(): \Inertia\Response
    {
        $user = User::first();
        $debugMode = config('app.debug', false);
        $news = $this->getUnreadNews($user, $debugMode);
        $gameData = $this->getGameData($user, $debugMode);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'dailyNews' => $news,
            'user' => $user,
            'debugMode' => $debugMode,
            'showNewsModal' => ! empty($news),
        ]);
    }

    public function markAsRead(Request $request): \Inertia\Response
    {
        $user = User::first();
        $newsId = $request->input('news_id');
        $debugMode = config('app.debug', false);

        $news = DailyNews::find($newsId);
        $gameData = $this->getGameData($user, $debugMode);

        if (! $news) {
            return Inertia::render('Game/Index', [
                'gameData' => $gameData,
                'user' => $user,
                'debugMode' => $debugMode,
            ])->with('error', 'Το νέο δεν βρέθηκε!');
        }

        $user->dailyNewsReads()->syncWithoutDetaching([$news->id => ['read_at' => now()]]);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
        ]);
    }

    private function getUnreadNews(User $user, bool $debugMode = false): ?array
    {
        if (! $debugMode) {
            $hasReadToday = $user->dailyNewsReads()
                ->whereDate('read_at', now()->toDateString())
                ->exists();
            if ($hasReadToday) {
                return [
                    'id' => 0,
                    'title' => 'Καθημερινά Νέα',
                    'content' => '<div class="text-center"><p>Δεν υπάρχουν άλλα νέα για σήμερα.</p><p>Έλα ξανά αύριο.</p></div>',
                    'created_at' => now()->format('Y-m-d H:i:s'),
                ];
            }
        }

        $readNewsIds = $user->dailyNewsReads()->pluck('daily_news_id')->toArray();
        $news = DailyNews::whereNotIn('id', $readNewsIds)
            ->where('is_active', true)
            ->orderBy('created_at', 'asc')
            ->first();

        if (! $news) {
            return null;
        }

        return [
            'id' => $news->id,
            'title' => $news->title,
            'content' => $news->content,
            'created_at' => $news->created_at->format('Y-m-d H:i:s'),
        ];
    }

    private function getGameData(User $user, bool $debugMode = false): array
    {
        $questions = Question::orderBy('day_number')->get();
        $progress = GameProgress::where('user_id', $user->id)->get()->keyBy('day_number');

        $gameData = [];

        foreach ($questions as $question) {
            $dayNumber = $question->day_number;
            $userProgress = $progress->get($dayNumber);

            $gameData[] = [
                'day_number' => $dayNumber,
                'question' => $question->question,
                'type' => $question->type,
                'options' => $question->options,
                'correct_answer' => $question->correct_answer,
                'is_active' => $question->is_active,
                'unlocked' => $userProgress ? true : false,
                'unlocked_at' => $userProgress ? $userProgress->unlocked_at : null,
                'is_read' => $userProgress ? $userProgress->is_read : false,
                'read_at' => $userProgress ? $userProgress->read_at : null,
                'answer' => $userProgress ? $userProgress->answer : null,
                'answered_at' => $userProgress ? $userProgress->answered_at : null,
                'is_correct' => $userProgress ? $userProgress->is_correct : null,
                'revealed_answer' => $userProgress ? $userProgress->revealed_answer : false,
                'revealed_at' => $userProgress ? $userProgress->revealed_at : null,
                'found_answer' => $userProgress ? $userProgress->found_answer : null,
                'can_unlock' => $debugMode || $this->canUnlock($dayNumber, $progress),
            ];
        }

        return $gameData;
    }

    private function canUnlock(int $dayNumber, $progress): bool
    {
        if ($dayNumber === 1) {
            return true;
        }

        return $progress->has($dayNumber - 1);
    }
}
