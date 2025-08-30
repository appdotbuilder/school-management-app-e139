<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'nip' => 'required|string|max:20|unique:teachers,nip,' . $this->route('teacher')->id,
            'date_of_birth' => 'required|date|before:today',
            'address' => 'required|string',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|unique:teachers,email,' . $this->route('teacher')->id,
            'status' => 'nullable|in:active,inactive',
            'subject_ids' => 'nullable|array',
            'subject_ids.*' => 'exists:subjects,id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Teacher name is required.',
            'nip.required' => 'NIP (Teacher ID) is required.',
            'nip.unique' => 'This NIP is already in use by another teacher.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before' => 'Date of birth must be in the past.',
            'address.required' => 'Address is required.',
            'phone_number.required' => 'Phone number is required.',
            'email.required' => 'Email address is required.',
            'email.unique' => 'This email is already registered to another teacher.',
            'subject_ids.*.exists' => 'One or more selected subjects do not exist.',
        ];
    }
}