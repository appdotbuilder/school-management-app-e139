<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Grade;
use App\Models\Material;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Inertia\Inertia;

class SchoolController extends Controller
{
    /**
     * Display the main dashboard with school statistics.
     */
    public function index()
    {
        $stats = [
            'total_students' => Student::count(),
            'active_students' => Student::active()->count(),
            'total_teachers' => Teacher::count(),
            'active_teachers' => Teacher::active()->count(),
            'total_classes' => SchoolClass::count(),
            'total_subjects' => Subject::count(),
            'total_assignments' => Assignment::count(),
            'published_assignments' => Assignment::published()->count(),
            'total_materials' => Material::count(),
            'total_grades' => Grade::count(),
        ];

        // Recent activities
        $recent_students = Student::with('class')
            ->active()
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recent_teachers = Teacher::active()
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recent_assignments = Assignment::with(['class', 'subject', 'teacher'])
            ->published()
            ->orderBy('due_date', 'asc')
            ->limit(5)
            ->get();

        return Inertia::render('school/dashboard', [
            'stats' => $stats,
            'recent_students' => $recent_students,
            'recent_teachers' => $recent_teachers,
            'recent_assignments' => $recent_assignments,
        ]);
    }
}