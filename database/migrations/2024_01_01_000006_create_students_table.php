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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('student_id', 20)->unique();
            $table->date('date_of_birth');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->text('address');
            $table->string('parent_phone', 20);
            $table->string('parent_name')->nullable();
            $table->string('email')->unique()->nullable();
            $table->enum('status', ['active', 'inactive', 'graduated'])->default('active');
            $table->timestamps();
            
            $table->index('full_name');
            $table->index('student_id');
            $table->index('class_id');
            $table->index('status');
            $table->index(['class_id', 'full_name']);
            $table->index(['status', 'full_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};