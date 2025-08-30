<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'student_id' => fake()->unique()->numerify('STD########'),
            'date_of_birth' => fake()->date('Y-m-d', '2015-01-01'),
            'class_id' => SchoolClass::factory(),
            'address' => fake()->address(),
            'parent_phone' => fake()->phoneNumber(),
            'parent_name' => fake()->name(),
            'email' => fake()->optional()->safeEmail(),
            'status' => fake()->randomElement(['active', 'inactive', 'graduated']),
        ];
    }

    /**
     * Indicate that the student is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the student has graduated.
     */
    public function graduated(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'graduated',
            'date_of_birth' => fake()->date('Y-m-d', '2010-01-01'),
        ]);
    }
}