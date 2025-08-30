<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Material
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $class_id
 * @property int $teacher_id
 * @property int $subject_id
 * @property string|null $file_path
 * @property string|null $file_name
 * @property string|null $file_type
 * @property int|null $file_size
 * @property string|null $content
 * @property string $type
 * @property string|null $external_link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\SchoolClass $class
 * @property-read \App\Models\Teacher $teacher
 * @property-read \App\Models\Subject $subject
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Material newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Material newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Material query()
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereSubjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereExternalLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Material whereUpdatedAt($value)
 * @method static \Database\Factories\MaterialFactory factory($count = null, $state = [])
 * @method static Material create(array $attributes = [])
 * @method static Material firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Material extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'class_id',
        'teacher_id',
        'subject_id',
        'file_path',
        'file_name',
        'file_type',
        'file_size',
        'content',
        'type',
        'external_link',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'class_id' => 'integer',
        'teacher_id' => 'integer',
        'subject_id' => 'integer',
        'file_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the class this material belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function class(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /**
     * Get the teacher who created this material.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id');
    }

    /**
     * Get the subject this material is for.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
}