<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('assignment_id')->nullable()->constrained()->onDelete('set null');
            $table->decimal('points_earned', 5, 2)->comment('Points earned by student');
            $table->decimal('points_possible', 5, 2)->comment('Total points possible');
            $table->enum('grade_type', ['assignment', 'quiz', 'exam', 'participation', 'project', 'other'])->default('assignment');
            $table->text('comments')->nullable()->comment('Teacher comments on the grade');
            $table->date('graded_date')->comment('Date the grade was assigned');
            $table->timestamps();
            
            $table->index('student_id');
            $table->index('subject_id');
            $table->index('teacher_id');
            $table->index('assignment_id');
            $table->index('grade_type');
            $table->index('graded_date');
            $table->index(['student_id', 'subject_id', 'graded_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};