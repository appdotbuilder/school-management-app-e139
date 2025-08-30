<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Material>
 */
class MaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['file', 'text', 'link']);
        
        return [
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->paragraph(),
            'class_id' => SchoolClass::factory(),
            'teacher_id' => Teacher::factory(),
            'subject_id' => Subject::factory(),
            'type' => $type,
            'content' => $type === 'text' ? fake()->paragraphs(3, true) : null,
            'external_link' => $type === 'link' ? fake()->url() : null,
            'file_name' => $type === 'file' ? fake()->word() . '.pdf' : null,
            'file_type' => $type === 'file' ? 'pdf' : null,
            'file_size' => $type === 'file' ? fake()->numberBetween(1000, 5000000) : null,
        ];
    }

    /**
     * Indicate that the material is a text document.
     */
    public function textDocument(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'text',
            'content' => fake()->paragraphs(5, true),
            'external_link' => null,
            'file_name' => null,
            'file_type' => null,
            'file_size' => null,
            'file_path' => null,
        ]);
    }

    /**
     * Indicate that the material is an external link.
     */
    public function externalLink(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'link',
            'external_link' => fake()->url(),
            'content' => null,
            'file_name' => null,
            'file_type' => null,
            'file_size' => null,
            'file_path' => null,
        ]);
    }
}