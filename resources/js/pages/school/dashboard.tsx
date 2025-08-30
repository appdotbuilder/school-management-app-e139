import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Stats {
    total_students: number;
    active_students: number;
    total_teachers: number;
    active_teachers: number;
    total_classes: number;
    total_subjects: number;
    total_assignments: number;
    published_assignments: number;
    total_materials: number;
    total_grades: number;
}

interface Student {
    id: number;
    full_name: string;
    student_id: string;
    class: {
        name: string;
    };
}

interface Teacher {
    id: number;
    full_name: string;
    nip: string;
    email: string;
}

interface Assignment {
    id: number;
    title: string;
    due_date: string;
    class: {
        name: string;
    };
    subject: {
        name: string;
    };
    teacher: {
        full_name: string;
    };
}

interface Props {
    stats: Stats;
    recent_students: Student[];
    recent_teachers: Teacher[];
    recent_assignments: Assignment[];
    [key: string]: unknown;
}

export default function SchoolDashboard({ 
    stats, 
    recent_students, 
    recent_teachers, 
    recent_assignments 
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🎓 School Management Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Overview of students, teachers, classes, and academic activities
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Students</p>
                                <p className="text-3xl font-bold text-blue-600">{stats.total_students}</p>
                                <p className="text-xs text-gray-500">
                                    {stats.active_students} active
                                </p>
                            </div>
                            <div className="text-4xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                                <p className="text-3xl font-bold text-green-600">{stats.total_teachers}</p>
                                <p className="text-xs text-gray-500">
                                    {stats.active_teachers} active
                                </p>
                            </div>
                            <div className="text-4xl">👨‍🏫</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Classes</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.total_classes}</p>
                                <p className="text-xs text-gray-500">
                                    {stats.total_subjects} subjects
                                </p>
                            </div>
                            <div className="text-4xl">🏫</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Assignments</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.total_assignments}</p>
                                <p className="text-xs text-gray-500">
                                    {stats.published_assignments} published
                                </p>
                            </div>
                            <div className="text-4xl">📚</div>
                        </div>
                    </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Learning Materials</p>
                                <p className="text-2xl font-bold text-indigo-600">{stats.total_materials}</p>
                                <p className="text-xs text-gray-500">Files, texts, and links</p>
                            </div>
                            <div className="text-4xl">📖</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Grades</p>
                                <p className="text-2xl font-bold text-pink-600">{stats.total_grades}</p>
                                <p className="text-xs text-gray-500">Student assessments</p>
                            </div>
                            <div className="text-4xl">📊</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">🚀 Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button 
                            onClick={() => router.visit(route('students.create'))}
                            className="flex items-center justify-center p-4"
                        >
                            <span className="mr-2">👥</span>
                            Add Student
                        </Button>
                        <Button 
                            onClick={() => router.visit(route('teachers.create'))}
                            variant="outline"
                            className="flex items-center justify-center p-4"
                        >
                            <span className="mr-2">👨‍🏫</span>
                            Add Teacher
                        </Button>
                        <Button 
                            onClick={() => router.visit(route('students.index'))}
                            variant="secondary"
                            className="flex items-center justify-center p-4"
                        >
                            <span className="mr-2">🔍</span>
                            Search Students
                        </Button>
                        <Button 
                            onClick={() => router.visit(route('teachers.index'))}
                            variant="secondary"
                            className="flex items-center justify-center p-4"
                        >
                            <span className="mr-2">🔍</span>
                            Search Teachers
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Students */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            👥 Recent Students
                        </h3>
                        <div className="space-y-3">
                            {recent_students.length > 0 ? (
                                recent_students.map((student) => (
                                    <div key={student.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{student.full_name}</p>
                                            <p className="text-sm text-gray-500">
                                                ID: {student.student_id} | Class: {student.class.name}
                                            </p>
                                        </div>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => router.visit(route('students.show', student.id))}
                                        >
                                            View
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent students</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Teachers */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            👨‍🏫 Recent Teachers
                        </h3>
                        <div className="space-y-3">
                            {recent_teachers.length > 0 ? (
                                recent_teachers.map((teacher) => (
                                    <div key={teacher.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{teacher.full_name}</p>
                                            <p className="text-sm text-gray-500">
                                                NIP: {teacher.nip}
                                            </p>
                                        </div>
                                        <Button 
                                            size="sm" 
                                            variant="outline"
                                            onClick={() => router.visit(route('teachers.show', teacher.id))}
                                        >
                                            View
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent teachers</p>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Assignments */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            📚 Upcoming Assignments
                        </h3>
                        <div className="space-y-3">
                            {recent_assignments.length > 0 ? (
                                recent_assignments.map((assignment) => (
                                    <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-900">{assignment.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {assignment.class.name} | {assignment.subject.name}
                                        </p>
                                        <p className="text-xs text-orange-600">
                                            Due: {formatDate(assignment.due_date)}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No upcoming assignments</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}