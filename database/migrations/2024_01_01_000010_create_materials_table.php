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
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Material title');
            $table->text('description')->nullable()->comment('Material description');
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->string('file_path')->nullable()->comment('Path to uploaded file');
            $table->string('file_name')->nullable()->comment('Original file name');
            $table->string('file_type')->nullable()->comment('File type/extension');
            $table->integer('file_size')->nullable()->comment('File size in bytes');
            $table->text('content')->nullable()->comment('Text content for non-file materials');
            $table->enum('type', ['file', 'text', 'link'])->default('text');
            $table->string('external_link')->nullable()->comment('External link URL');
            $table->timestamps();
            
            $table->index('class_id');
            $table->index('teacher_id');
            $table->index('subject_id');
            $table->index('type');
            $table->index(['class_id', 'subject_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};