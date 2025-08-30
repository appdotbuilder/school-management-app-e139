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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Assignment title');
            $table->text('description')->comment('Assignment description');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->datetime('due_date')->comment('Assignment due date');
            $table->integer('max_points')->default(100)->comment('Maximum points for this assignment');
            $table->enum('status', ['draft', 'published', 'closed'])->default('draft');
            $table->timestamps();
            
            $table->index('class_id');
            $table->index('teacher_id');
            $table->index('subject_id');
            $table->index('due_date');
            $table->index('status');
            $table->index(['class_id', 'subject_id', 'due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};