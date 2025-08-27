<?php

use App\Http\Controllers\DailyNewsController;
use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/', [GameController::class, 'index'])->name('home');
Route::post('/unlock', [GameController::class, 'unlockDay'])->name('game.unlock');
Route::post('/answer', [GameController::class, 'answerQuestion'])->name('game.answer');
Route::post('/reveal-answer', [GameController::class, 'revealAnswer'])->name('game.reveal-answer');
Route::post('/found-answer', [GameController::class, 'foundAnswer'])->name('game.found-answer');
Route::post('/mark-read', [GameController::class, 'markAsRead'])->name('game.mark-read');
Route::get('/unlock', fn () => redirect()->route('home'));
Route::get('/answer', fn () => redirect()->route('home'));
Route::get('/reveal-answer', fn () => redirect()->route('home'));
Route::get('/found-answer', fn () => redirect()->route('home'));
Route::get('/mark-read', fn () => redirect()->route('home'));
Route::post('/reset', [GameController::class, 'resetProgress'])->name('game.reset');
Route::get('/reset', [GameController::class, 'resetProgress'])->name('game.reset.get');

Route::get('/daily-news', [DailyNewsController::class, 'index'])->name('daily-news');
Route::get('/daily-news/mark-read', function () {
    return redirect()->route('home');
});
Route::post('/daily-news/mark-read', [DailyNewsController::class, 'markAsRead'])->name('daily-news.mark-read');
