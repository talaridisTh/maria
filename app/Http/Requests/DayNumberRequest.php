<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DayNumberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'day_number' => ['required', 'integer', 'between:1,30'],
        ];
    }
}
