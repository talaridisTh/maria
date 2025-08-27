<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('game_progress', function (Blueprint $table) {
            $table->integer('selected_answer')->nullable()->after('read_at');
            $table->boolean('answered_correctly')->default(false)->after('selected_answer');
            $table->integer('coins_earned')->default(0)->after('answered_correctly');
            $table->boolean('answer_revealed')->default(false)->after('coins_earned');
        });
    }

    public function down(): void
    {
        Schema::table('game_progress', function (Blueprint $table) {
            $table->dropColumn(['selected_answer', 'answered_correctly', 'coins_earned', 'answer_revealed']);
        });
    }
};
