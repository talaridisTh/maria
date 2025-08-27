<?php
namespace Database\Seeders;
use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'question' => 'Ποιον μήνα πήραμε τον γάτο;',
                'content' => '🐱',
                'type' => 'multiple_choice',
                'options' => ['Ιανουάριο', 'Μάρτιο', 'Απρίλιο', 'Οκτώβριο'],
                'correct_answer' => 2,
                'extra_text' => 'Η καλύτερη παρέα που μπορούσαμε να έχουμε! 💕',
                'coin_reward' => 10
            ],
            [
                'question' => 'Πού πήγαμε στο δεύτερο μας ταξίδι;',
                'content' => '✈️',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 15
            ],
            [
                'question' => 'Πού πήγαμε στην Ελλάδα στο πρώτο ταξίδι μας;',
                'content' => '🇬🇷',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 15
            ],
            [
                'question' => 'Ποια ταινία είδαμε στο πρώτο μας ραντεβού;',
                'content' => '🎬',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 20
            ],
            [
                'question' => 'Ποιο ήταν το πρώτο δώρο που σου πήρα;',
                'content' => '🎁',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 20
            ],
            [
                'question' => 'Ποιο ήταν το πρώτο δώρο που μου πήρες;',
                'content' => '💝',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 20
            ],
            [
                'question' => 'Τι ήθελα περισσότερο στο κάτω σπίτι και δεν μπήκε;',
                'content' => '🏡',
                'type' => 'multiple_choice',
                'options' => ['Ενυδρείο', 'Ψησταριά', 'Γάτα', 'Μεγάλο δέντρο'],
                'correct_answer' => 0,
                'extra_text' => 'Πάντα ήθελα ένα ενυδρείο 🐠',
                'coin_reward' => 10
            ],
            [
                'question' => 'Τι ήθελα περισσότερο στο πάνω σπίτι και δεν μπήκε;',
                'content' => '🏠',
                'type' => 'multiple_choice',
                'options' => ['Ενυδρείο', 'Ψησταριά', 'Σκύλο', 'Μεγάλο δέντρο'],
                'correct_answer' => 3,
                'extra_text' => 'Θα είχαμε τη σκιά μας έξω 🌳',
                'coin_reward' => 10
            ],
            [
                'question' => 'Ποια ήταν η πρώτη σειρά που είδαμε μαζί;',
                'content' => '📺',
                'type' => 'multiple_choice',
                'options' => ['Walking Dead', 'Mr. Robot', 'Better Call Saul', 'Breaking Bad'],
                'correct_answer' => 2,
                'extra_text' => 'Από εκείνη τη στιγμή, κολλήσαμε στις μαραθώνιο-βραδιές μας 🍿',
                'coin_reward' => 15
            ],
            [
                'question' => 'Ποιο είναι το αγαπημένο μου ποτό;',
                'content' => '🥂',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 10
            ],
            [
                'question' => 'Ποια είναι η ταινία που βλέπουμε ξανά και ξανά;',
                'content' => '🎞️',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 15
            ],
            [
                'question' => 'Ποιο είναι το μέρος που έχουμε πει ότι πάντα θέλουμε να ξαναπάμε;',
                'content' => '✨',
                'type' => 'text',
                'options' => null,
                'correct_answer' => null,
                'extra_text' => null,
                'coin_reward' => 25
            ],
        ];

        shuffle($questions);

        foreach ($questions as $index => $questionData) {
            $questionData['day_number'] = $index + 1;
            Question::create($questionData);
        }
    }
}
