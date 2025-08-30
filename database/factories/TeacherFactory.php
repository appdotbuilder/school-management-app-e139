<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
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
            'nip' => fake()->unique()->numerify('##########'),
            'date_of_birth' => fake()->date('Y-m-d', '1980-01-01'),
            'address' => fake()->address(),
            'phone_number' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the teacher is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the teacher is a senior teacher.
     */
    public function senior(): static
    {
        return $this->state(fn (array $attributes) => [
            'date_of_birth' => fake()->date('Y-m-d', '1970-01-01'),
            'status' => 'active',
        ]);
    }
}