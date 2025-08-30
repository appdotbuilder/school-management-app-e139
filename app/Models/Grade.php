<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Grade
 *
 * @property int $id
 * @property int $student_id
 * @property int $subject_id
 * @property int $teacher_id
 * @property int|null $assignment_id
 * @property float $points_earned
 * @property float $points_possible
 * @property string $grade_type
 * @property string|null $comments
 * @property \Illuminate\Support\Carbon $graded_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Student $student
 * @property-read \App\Models\Subject $subject
 * @property-read \App\Models\Teacher $teacher
 * @property-read \App\Models\Assignment|null $assignment
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade query()
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereAssignmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade wherePointsEarned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade wherePointsPossible($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereComments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereGradedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Grade whereUpdatedAt($value)
 * @method static \Database\Factories\GradeFactory factory($count = null, $state = [])
 * @method static Grade create(array $attributes = [])
 * @method static Grade firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Grade extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'student_id',
        'subject_id',
        'teacher_id',
        'assignment_id',
        'points_earned',
        'points_possible',
        'grade_type',
        'comments',
        'graded_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'student_id' => 'integer',
        'subject_id' => 'integer',
        'teacher_id' => 'integer',
        'assignment_id' => 'integer',
        'points_earned' => 'decimal:2',
        'points_possible' => 'decimal:2',
        'graded_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the student who received this grade.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    /**
     * Get the subject for this grade.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }

    /**
     * Get the teacher who assigned this grade.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    /**
     * Get the assignment this grade is for (if applicable).
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class, 'assignment_id');
    }
}