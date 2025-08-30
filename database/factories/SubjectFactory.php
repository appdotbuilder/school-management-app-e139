<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjects = [
            'Mathematics' => 'MATH',
            'English Language' => 'ENG',
            'Indonesian Language' => 'IND',
            'Natural Sciences' => 'SCI',
            'Social Sciences' => 'SOC',
            'Physical Education' => 'PE',
            'Arts and Crafts' => 'ART',
            'Religious Education' => 'REL',
            'Computer Science' => 'CS',
            'Music' => 'MUS'
        ];

        $subject = fake()->randomElement(array_keys($subjects));
        $code = $subjects[$subject];

        return [
            'name' => $subject,
            'code' => $code,
            'description' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the subject is a core subject.
     */
    public function core(): static
    {
        $coreSubjects = [
            'Mathematics' => 'MATH',
            'English Language' => 'ENG',
            'Indonesian Language' => 'IND',
            'Natural Sciences' => 'SCI',
        ];

        $subject = fake()->randomElement(array_keys($coreSubjects));
        $code = $coreSubjects[$subject];

        return $this->state(fn (array $attributes) => [
            'name' => $subject,
            'code' => $code,
            'description' => 'Core subject - required for all students',
        ]);
    }
}