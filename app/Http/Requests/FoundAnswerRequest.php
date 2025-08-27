<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FoundAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'day_number' => ['required', 'integer', 'min:1'],
            'found_answer' => ['required', 'boolean'],
        ];
    }
}
