<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolClass>
 */
class SchoolClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Grade 1A', 'Grade 1B', 'Grade 2A', 'Grade 2B', 'Grade 3A', 'Grade 3B',
                'Grade 4A', 'Grade 4B', 'Grade 5A', 'Grade 5B', 'Grade 6A', 'Grade 6B'
            ]),
            'academic_year' => fake()->randomElement(['2023-2024', '2024-2025']),
            'capacity' => fake()->numberBetween(25, 35),
            'description' => fake()->optional()->sentence(),
        ];
    }

    /**
     * Indicate that the class is for the current academic year.
     */
    public function currentYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'academic_year' => '2024-2025',
        ]);
    }

    /**
     * Indicate that the class has a smaller capacity.
     */
    public function smallClass(): static
    {
        return $this->state(fn (array $attributes) => [
            'capacity' => fake()->numberBetween(15, 20),
            'description' => 'Small class size for personalized learning',
        ]);
    }
}