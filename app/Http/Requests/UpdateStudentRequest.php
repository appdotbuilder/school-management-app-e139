<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'student_id' => 'required|string|max:20|unique:students,student_id,' . $this->route('student')->id,
            'date_of_birth' => 'required|date|before:today',
            'class_id' => 'required|exists:classes,id',
            'address' => 'required|string',
            'parent_phone' => 'required|string|max:20',
            'parent_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:students,email,' . $this->route('student')->id,
            'status' => 'nullable|in:active,inactive,graduated',
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
            'full_name.required' => 'Student name is required.',
            'student_id.required' => 'Student ID is required.',
            'student_id.unique' => 'This Student ID is already in use by another student.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before' => 'Date of birth must be in the past.',
            'class_id.required' => 'Please select a class.',
            'class_id.exists' => 'Selected class does not exist.',
            'address.required' => 'Address is required.',
            'parent_phone.required' => 'Parent phone number is required.',
            'email.unique' => 'This email is already registered to another student.',
        ];
    }
}