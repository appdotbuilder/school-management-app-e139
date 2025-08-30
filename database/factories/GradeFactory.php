<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grade>
 */
class GradeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pointsPossible = fake()->randomElement([50, 75, 100, 125, 150]);
        $pointsEarned = fake()->randomFloat(2, $pointsPossible * 0.5, $pointsPossible);

        return [
            'student_id' => Student::factory(),
            'subject_id' => Subject::factory(),
            'teacher_id' => Teacher::factory(),
            'assignment_id' => fake()->optional()->randomElement([null, Assignment::factory()]),
            'points_earned' => $pointsEarned,
            'points_possible' => $pointsPossible,
            'grade_type' => fake()->randomElement(['assignment', 'quiz', 'exam', 'participation', 'project', 'other']),
            'comments' => fake()->optional()->sentence(),
            'graded_date' => fake()->date(),
        ];
    }

    /**
     * Indicate that the grade is excellent (90%+ score).
     */
    public function excellent(): static
    {
        return $this->state(function (array $attributes) {
            $pointsPossible = $attributes['points_possible'] ?? 100;
            return [
                'points_earned' => fake()->randomFloat(2, $pointsPossible * 0.9, $pointsPossible),
                'comments' => fake()->randomElement([
                    'Excellent work!',
                    'Outstanding performance!',
                    'Keep up the great work!'
                ]),
            ];
        });
    }

    /**
     * Indicate that the grade is for an exam.
     */
    public function exam(): static
    {
        return $this->state(fn (array $attributes) => [
            'grade_type' => 'exam',
            'points_possible' => 100,
            'assignment_id' => null,
        ]);
    }
}