<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Grade;
use App\Models\Material;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create subjects first
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH', 'description' => 'Elementary Mathematics'],
            ['name' => 'English Language', 'code' => 'ENG', 'description' => 'English Language and Literature'],
            ['name' => 'Indonesian Language', 'code' => 'IND', 'description' => 'Indonesian Language and Culture'],
            ['name' => 'Natural Sciences', 'code' => 'SCI', 'description' => 'Basic Science and Nature Studies'],
            ['name' => 'Social Sciences', 'code' => 'SOC', 'description' => 'Social Studies and Geography'],
            ['name' => 'Physical Education', 'code' => 'PE', 'description' => 'Physical Education and Sports'],
            ['name' => 'Arts and Crafts', 'code' => 'ART', 'description' => 'Creative Arts and Handicrafts'],
            ['name' => 'Religious Education', 'code' => 'REL', 'description' => 'Religious and Moral Education'],
        ];

        foreach ($subjects as $subjectData) {
            Subject::create($subjectData);
        }

        // Create classes
        $classes = [
            ['name' => 'Grade 1A', 'academic_year' => '2024-2025', 'capacity' => 30],
            ['name' => 'Grade 1B', 'academic_year' => '2024-2025', 'capacity' => 30],
            ['name' => 'Grade 2A', 'academic_year' => '2024-2025', 'capacity' => 30],
            ['name' => 'Grade 2B', 'academic_year' => '2024-2025', 'capacity' => 30],
            ['name' => 'Grade 3A', 'academic_year' => '2024-2025', 'capacity' => 32],
            ['name' => 'Grade 3B', 'academic_year' => '2024-2025', 'capacity' => 32],
            ['name' => 'Grade 4A', 'academic_year' => '2024-2025', 'capacity' => 28],
            ['name' => 'Grade 4B', 'academic_year' => '2024-2025', 'capacity' => 28],
            ['name' => 'Grade 5A', 'academic_year' => '2024-2025', 'capacity' => 25],
            ['name' => 'Grade 5B', 'academic_year' => '2024-2025', 'capacity' => 25],
            ['name' => 'Grade 6A', 'academic_year' => '2024-2025', 'capacity' => 25],
            ['name' => 'Grade 6B', 'academic_year' => '2024-2025', 'capacity' => 25],
        ];

        foreach ($classes as $classData) {
            SchoolClass::create($classData);
        }

        // Create teachers with specific subjects
        $teacherData = [
            [
                'full_name' => 'Dr. Sarah Johnson',
                'nip' => '1234567890',
                'email' => 'sarah.johnson@school.edu',
                'subjects' => ['Mathematics', 'Natural Sciences'],
            ],
            [
                'full_name' => 'Mr. Ahmad Rahman',
                'nip' => '1234567891',
                'email' => 'ahmad.rahman@school.edu',
                'subjects' => ['English Language', 'Social Sciences'],
            ],
            [
                'full_name' => 'Ms. Maria Santos',
                'nip' => '1234567892',
                'email' => 'maria.santos@school.edu',
                'subjects' => ['Indonesian Language', 'Arts and Crafts'],
            ],
            [
                'full_name' => 'Mr. David Lee',
                'nip' => '1234567893',
                'email' => 'david.lee@school.edu',
                'subjects' => ['Physical Education', 'Natural Sciences'],
            ],
            [
                'full_name' => 'Mrs. Lisa Thompson',
                'nip' => '1234567894',
                'email' => 'lisa.thompson@school.edu',
                'subjects' => ['Religious Education', 'Social Sciences'],
            ],
        ];

        $subjects = Subject::all()->keyBy('name');

        foreach ($teacherData as $data) {
            $teacher = Teacher::create([
                'full_name' => $data['full_name'],
                'nip' => $data['nip'],
                'date_of_birth' => fake()->date('Y-m-d', '1980-01-01'),
                'address' => fake()->address(),
                'phone_number' => fake()->phoneNumber(),
                'email' => $data['email'],
                'status' => 'active',
            ]);

            // Attach subjects to teacher
            $subjectIds = [];
            foreach ($data['subjects'] as $subjectName) {
                if ($subjects->has($subjectName)) {
                    $subjectIds[] = $subjects[$subjectName]->id;
                }
            }
            $teacher->subjects()->attach($subjectIds);
        }

        // Create additional teachers using factory
        Teacher::factory(15)->active()->create()->each(function ($teacher) use ($subjects) {
            $randomSubjects = $subjects->random(random_int(1, 3));
            $teacher->subjects()->attach($randomSubjects->pluck('id'));
        });

        // Create students for each class
        $classes = SchoolClass::all();
        foreach ($classes as $class) {
            $studentCount = random_int(20, $class->capacity);
            Student::factory($studentCount)->create([
                'class_id' => $class->id,
                'status' => 'active',
            ]);
        }

        // Create some additional graduated students
        Student::factory(50)->graduated()->create();

        // Create assignments
        $teachers = Teacher::with('subjects', 'classes')->get();
        $classes = SchoolClass::all();
        
        foreach ($classes as $class) {
            $classTeachers = $teachers->filter(function ($teacher) {
                return $teacher->subjects->count() > 0;
            })->take(5);

            foreach ($classTeachers as $teacher) {
                $subject = $teacher->subjects->random();
                Assignment::factory(random_int(1, 3))->create([
                    'class_id' => $class->id,
                    'teacher_id' => $teacher->id,
                    'subject_id' => $subject->id,
                    'status' => 'published',
                ]);
            }
        }

        // Create materials
        foreach ($classes as $class) {
            $classTeachers = $teachers->filter(function ($teacher) {
                return $teacher->subjects->count() > 0;
            })->take(3);

            foreach ($classTeachers as $teacher) {
                $subject = $teacher->subjects->random();
                Material::factory(random_int(1, 2))->create([
                    'class_id' => $class->id,
                    'teacher_id' => $teacher->id,
                    'subject_id' => $subject->id,
                ]);
            }
        }

        // Create grades
        $students = Student::active()->with('class')->get();
        $assignments = Assignment::published()->get();

        foreach ($students as $student) {
            $classAssignments = $assignments->where('class_id', $student->class_id);
            
            foreach ($classAssignments->take(random_int(3, 8)) as $assignment) {
                Grade::factory()->create([
                    'student_id' => $student->id,
                    'subject_id' => $assignment->subject_id,
                    'teacher_id' => $assignment->teacher_id,
                    'assignment_id' => $assignment->id,
                    'points_possible' => $assignment->max_points,
                    'grade_type' => 'assignment',
                ]);
            }

            // Create some additional exam grades
            $subjectIds = $classAssignments->pluck('subject_id')->unique();
            foreach ($subjectIds->take(random_int(2, 4)) as $subjectId) {
                $teacher = $teachers->filter(function ($teacher) use ($subjectId) {
                    return $teacher->subjects->contains('id', $subjectId);
                })->first();

                if ($teacher) {
                    Grade::factory()->exam()->create([
                        'student_id' => $student->id,
                        'subject_id' => $subjectId,
                        'teacher_id' => $teacher->id,
                        'assignment_id' => null,
                    ]);
                }
            }
        }

        // Create class-teacher assignments
        foreach ($classes as $class) {
            $availableTeachers = $teachers->filter(function ($teacher) {
                return $teacher->subjects->count() > 0;
            });

            // Assign 3-5 teachers to each class
            $classTeachers = $availableTeachers->random(random_int(3, 5));
            
            foreach ($classTeachers as $teacher) {
                $subject = $teacher->subjects->random();
                
                $class->teachers()->attach($teacher->id, [
                    'subject_id' => $subject->id,
                    'is_homeroom_teacher' => $classTeachers->first() === $teacher,
                ]);
            }
        }
    }
}