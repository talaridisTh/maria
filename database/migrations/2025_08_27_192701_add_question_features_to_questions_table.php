<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->enum('type', ['message', 'multiple_choice'])->default('message')->after('content');
            $table->json('options')->nullable()->after('type');
            $table->integer('correct_answer')->nullable()->after('options');
            $table->text('extra_text')->nullable()->after('correct_answer');
            $table->integer('coin_reward')->default(0)->after('extra_text');
        });
    }

    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn(['type', 'options', 'correct_answer', 'extra_text', 'coin_reward']);
        });
    }
};
