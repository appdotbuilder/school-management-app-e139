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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->comment('Teacher\'s full name');
            $table->string('nip', 20)->unique()->comment('Teacher ID Number (NIP)');
            $table->date('date_of_birth')->comment('Date of birth');
            $table->text('address')->comment('Home address');
            $table->string('phone_number', 20)->comment('Phone number');
            $table->string('email')->unique()->comment('Email address');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('full_name');
            $table->index('nip');
            $table->index('email');
            $table->index('status');
            $table->index(['status', 'full_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};