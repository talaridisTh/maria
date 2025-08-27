<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnswerQuestionRequest;
use App\Http\Requests\DayNumberRequest;
use App\Http\Requests\FoundAnswerRequest;
use App\Models\GameProgress;
use App\Models\Question;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index(): \Inertia\Response
    {
        $user = User::first();
        $debugMode = config('app.debug', false);
        $gameData = $this->getGameData($user, $debugMode);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
        ]);
    }

    public function unlockDay(DayNumberRequest $request): \Inertia\Response
    {
        $user = User::first();
        $dayNumber = $request->validated()['day_number'];
        $debugMode = config('app.debug', false);

        if (! $debugMode && ! $this->canUnlockDay($user, $dayNumber)) {
            $gameData = $this->getGameData($user, $debugMode);

            return Inertia::render('Game/Index', [
                'gameData' => $gameData,
                'user' => $user,
                'debugMode' => $debugMode,
            ])->with('error', 'Δεν μπορείς να ανοίξεις αυτό το κουτί ακόμα!');
        }

        $progress = GameProgress::firstOrCreate([
            'user_id' => $user->id,
            'day_number' => $dayNumber,
        ], [
            'unlocked_at' => now(),
            'is_read' => false,
            'read_at' => null,
        ]);

        $question = Question::where('day_number', $dayNumber)->first();
        $gameData = $this->getGameData($user, $debugMode);
        $selected = collect($gameData)->firstWhere('day_number', $dayNumber);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
            'selectedQuestion' => $selected,
            'showModal' => true,
        ]);
    }

    public function answerQuestion(AnswerQuestionRequest $request): \Inertia\Response
    {
        $user = User::first();
        $dayNumber = $request->validated()['day_number'];
        $selectedAnswer = $request->validated()['selected_answer'];
        $debugMode = config('app.debug', false);

        $question = Question::where('day_number', $dayNumber)->first();
        $progress = GameProgress::where('user_id', $user->id)
            ->where('day_number', $dayNumber)
            ->first();

        if (! $progress || ! $question) {
            $gameData = $this->getGameData($user, $debugMode);

            return Inertia::render('Game/Index', [
                'gameData' => $gameData,
                'user' => $user,
                'debugMode' => $debugMode,
            ])->with('error', 'Δεν βρέθηκε η ερώτηση!');
        }

        $isCorrect = $question->correct_answer === $selectedAnswer;
        $coinsEarned = $isCorrect ? 10 : 0;

        $progress->update([
            'selected_answer' => $selectedAnswer,
            'answered_correctly' => $isCorrect,
            'coins_earned' => $coinsEarned,
        ]);

        $gameData = $this->getGameData($user, $debugMode);
        $selected = collect($gameData)->firstWhere('day_number', $dayNumber);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
            'selectedQuestion' => $selected,
            'showModal' => true,
            'showResult' => true,
        ]);
    }

    public function revealAnswer(DayNumberRequest $request): \Inertia\Response
    {
        $user = User::first();
        $dayNumber = $request->validated()['day_number'];
        $debugMode = config('app.debug', false);

        $question = Question::where('day_number', $dayNumber)->first();
        $progress = GameProgress::where('user_id', $user->id)
            ->where('day_number', $dayNumber)
            ->first();

        if (! $progress) {
            $progress = GameProgress::create([
                'user_id' => $user->id,
                'day_number' => $dayNumber,
                'unlocked_at' => now(),
                'is_read' => false,
                'read_at' => null,
            ]);
        }

        $progress->update([
            'answer_revealed' => true,
            'is_read' => true,
            'read_at' => now(),
        ]);

        $gameData = $this->getGameData($user, $debugMode);
        $selected = collect($gameData)->firstWhere('day_number', $dayNumber);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
            'selectedQuestion' => $selected,
            'showModal' => true,
            'showAnswer' => true,
        ]);
    }

    public function foundAnswer(FoundAnswerRequest $request): \Inertia\Response
    {
        $user = User::first();
        $dayNumber = $request->validated()['day_number'];
        $foundAnswer = $request->validated()['found_answer'];
        $debugMode = config('app.debug', false);

        $question = Question::where('day_number', $dayNumber)->first();
        $progress = GameProgress::where('user_id', $user->id)
            ->where('day_number', $dayNumber)
            ->first();

        if (! $question) {
            $gameData = $this->getGameData($user, $debugMode);

            return Inertia::render('Game/Index', [
                'gameData' => $gameData,
                'user' => $user,
                'debugMode' => $debugMode,
            ])->with('error', 'Δεν βρέθηκε η ερώτηση!');
        }

        if (! $progress) {
            $progress = GameProgress::create([
                'user_id' => $user->id,
                'day_number' => $dayNumber,
                'unlocked_at' => now(),
                'is_read' => false,
                'read_at' => null,
            ]);
        }

        $coinsEarned = $foundAnswer ? 10 : 0;

        $progress->update([
            'answered_correctly' => $foundAnswer,
            'coins_earned' => $coinsEarned,
            'is_read' => true,
            'read_at' => now(),
        ]);

        $gameData = $this->getGameData($user, $debugMode);
        $selected = collect($gameData)->firstWhere('day_number', $dayNumber);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
            'selectedQuestion' => $selected,
            'showModal' => true,
            'showAnswer' => true,
            'showResult' => true,
        ]);
    }

    public function resetProgress(Request $request)
    {
        $user = User::first();

        GameProgress::where('user_id', $user->id)->delete();

        DB::table('daily_news_reads')->where('user_id', $user->id)->delete();

        return redirect()->route('home')->with('success', 'Η πρόοδος μηδενίστηκε!');
    }

    public function markAsRead(DayNumberRequest $request): \Inertia\Response
    {
        $user = User::first();
        $dayNumber = $request->validated()['day_number'];
        $debugMode = config('app.debug', false);

        $progress = GameProgress::where('user_id', $user->id)
            ->where('day_number', $dayNumber)
            ->first();

        if ($progress) {
            $progress->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
        }

        $gameData = $this->getGameData($user, $debugMode);

        return Inertia::render('Game/Index', [
            'gameData' => $gameData,
            'user' => $user,
            'debugMode' => $debugMode,
        ]);
    }

    public function getGameData(User $user, bool $debugMode = false): array
    {
        $questionsByDay = Question::orderBy('day_number')->get()->keyBy('day_number');
        $progress = GameProgress::where('user_id', $user->id)->get()->keyBy('day_number');
        $hasUnlockedToday = GameProgress::where('user_id', $user->id)
            ->whereDate('unlocked_at', Carbon::today())
            ->exists();

        $gameData = [];
        $startDate = Carbon::parse('2025-08-27');
        $maxDays = 30;

        for ($day = 1; $day <= $maxDays; $day++) {
            $question = $questionsByDay->get($day);
            $dayProgress = $progress->get($day);
            $unlockDateObj = $startDate->copy()->addDays($day - 1);

            if ($question) {
                $canUnlock = false;
                if (! $dayProgress) {
                    if ($debugMode) {
                        $canUnlock = true;
                    } else {
                        $canUnlock = ! $hasUnlockedToday;
                    }
                }

                $gameData[] = [
                    'day_number' => $day,
                    'question' => $question->question,
                    'content' => $question->content,
                    'type' => $question->type,
                    'options' => $question->options,
                    'correct_answer' => $question->correct_answer,
                    'extra_text' => $question->extra_text,
                    'coin_reward' => 10,
                    'is_unlocked' => $dayProgress !== null,
                    'is_read' => $dayProgress ? $dayProgress->is_read : false,
                    'can_unlock' => $canUnlock,
                    'unlocked_at' => $dayProgress ? $dayProgress->unlocked_at : null,
                    'unlock_date' => $unlockDateObj->format('Y-m-d'),
                    'selected_answer' => $dayProgress ? $dayProgress->selected_answer : null,
                    'answered_correctly' => $dayProgress ? $dayProgress->answered_correctly : false,
                    'coins_earned' => $dayProgress ? $dayProgress->coins_earned : 0,
                    'answer_revealed' => $dayProgress ? $dayProgress->answer_revealed : false,
                ];
            } else {
                $gameData[] = [
                    'day_number' => $day,
                    'question' => 'Κλειδωμένο κουτί',
                    'content' => 'Σύντομα θα προστεθεί νέα ερώτηση',
                    'type' => 'message',
                    'options' => null,
                    'correct_answer' => null,
                    'extra_text' => null,
                    'coin_reward' => 0,
                    'is_unlocked' => false,
                    'is_read' => false,
                    'can_unlock' => false,
                    'unlocked_at' => null,
                    'unlock_date' => $unlockDateObj->format('Y-m-d'),
                    'selected_answer' => null,
                    'answered_correctly' => false,
                    'coins_earned' => 0,
                    'answer_revealed' => false,
                ];
            }
        }

        return $gameData;
    }

    private function canUnlockDay(User $user, int $dayNumber): bool
    {
        $existingForDay = GameProgress::where('user_id', $user->id)
            ->where('day_number', $dayNumber)
            ->exists();
        if ($existingForDay) {
            return false;
        }

        $debugMode = config('app.debug', false);
        if ($debugMode) {
            return true;
        }

        $alreadyUnlockedToday = GameProgress::where('user_id', $user->id)
            ->whereDate('unlocked_at', Carbon::today())
            ->exists();

        return ! $alreadyUnlockedToday;
    }
}
