<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'description' => fake()->paragraph(),
            'class_id' => SchoolClass::factory(),
            'teacher_id' => Teacher::factory(),
            'subject_id' => Subject::factory(),
            'due_date' => fake()->dateTimeBetween('now', '+2 months'),
            'max_points' => fake()->randomElement([50, 75, 100, 125, 150]),
            'status' => fake()->randomElement(['draft', 'published', 'closed']),
        ];
    }

    /**
     * Indicate that the assignment is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'due_date' => fake()->dateTimeBetween('+1 week', '+2 months'),
        ]);
    }

    /**
     * Indicate that the assignment is overdue.
     */
    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'due_date' => fake()->dateTimeBetween('-2 weeks', '-1 day'),
        ]);
    }
}