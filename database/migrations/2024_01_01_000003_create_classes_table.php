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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Class name (e.g., Grade 1A, Grade 2B)');
            $table->string('academic_year', 9)->comment('Academic year (e.g., 2023-2024)');
            $table->integer('capacity')->default(30)->comment('Maximum number of students');
            $table->text('description')->nullable()->comment('Additional class description');
            $table->timestamps();
            
            $table->index('name');
            $table->index('academic_year');
            $table->index(['academic_year', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};