<?php

namespace Database\Seeders;

use App\Models\DailyNews;
use Illuminate\Database\Seeder;

class DailyNewsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['Πρωινή σκέψη', '<p>Γιατί τα πατατάκια έχουν γεύση “μπάρμπεκιου” και όχι “πατάτα”;</p>'],
            ['Δίλημμα', '<p>Πώς γίνεται η πιτζάμα να είναι "ζευγάρι", ενώ φοράς μόνο μία;</p>'],
        ];

        shuffle($items);

        foreach ($items as [$title, $content]) {
            DailyNews::create([
                'title' => $title,
                'content' => $content,
                'is_active' => true,
            ]);
        }
    }
}
