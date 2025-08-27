<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\DailyNewsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GameController::class, 'index'])->name('home');
Route::match(['get', 'post'], '/unlock', [GameController::class, 'unlockDay'])->name('game.unlock');
Route::match(['get', 'post'], '/answer', [GameController::class, 'answerQuestion'])->name('game.answer');
Route::match(['get', 'post'], '/reveal-answer', [GameController::class, 'revealAnswer'])->name('game.reveal-answer');
Route::match(['get', 'post'], '/found-answer', [GameController::class, 'foundAnswer'])->name('game.found-answer');
Route::match(['get', 'post'], '/mark-read', [GameController::class, 'markAsRead'])->name('game.mark-read');
Route::post('/reset', [GameController::class, 'resetProgress'])->name('game.reset');
Route::get('/reset', [GameController::class, 'resetProgress'])->name('game.reset.get');

Route::get('/daily-news', [DailyNewsController::class, 'index'])->name('daily-news');
Route::get('/daily-news/mark-read', function () {
    return redirect()->route('home');
});
Route::post('/daily-news/mark-read', [DailyNewsController::class, 'markAsRead'])->name('daily-news.mark-read');
