import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

export default function Welcome() {
    const handleLogin = () => {
        router.visit(route('login'));
    };

    const handleRegister = () => {
        router.visit(route('register'));
    };

    const handleViewDashboard = () => {
        router.visit(route('school.dashboard'));
    };

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                🎓 School Management System
                            </h1>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive solution for managing students, teachers, classes, assignments, 
                                materials, and grades for schools with up to 1,500 individuals.
                            </p>
                        </div>
                        
                        <div className="flex justify-center gap-4 mb-12">
                            <Button 
                                onClick={handleLogin}
                                size="lg"
                                className="px-8 py-3 text-lg"
                            >
                                🔐 Login to System
                            </Button>
                            <Button 
                                onClick={handleRegister}
                                variant="outline"
                                size="lg"
                                className="px-8 py-3 text-lg"
                            >
                                📝 Register Account
                            </Button>
                            <Button 
                                onClick={handleViewDashboard}
                                variant="secondary"
                                size="lg"
                                className="px-8 py-3 text-lg"
                            >
                                📊 View Dashboard
                            </Button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {/* Student Management */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Student Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Full Name & Student ID</li>
                                <li>• Date of Birth & Class Assignment</li>
                                <li>• Address & Parent Contact</li>
                                <li>• Search & Filter Students</li>
                            </ul>
                        </div>

                        {/* Teacher Management */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">👨‍🏫</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Teacher Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Full Name & NIP (Teacher ID)</li>
                                <li>• Subjects Taught</li>
                                <li>• Contact Information</li>
                                <li>• Class Assignments</li>
                            </ul>
                        </div>

                        {/* Class Management */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🏫</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Class Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Class Organization</li>
                                <li>• Teacher-Class Assignments</li>
                                <li>• Student-Class Associations</li>
                                <li>• Academic Year Tracking</li>
                            </ul>
                        </div>

                        {/* Assignment Management */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Assignment Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Create & Manage Assignments</li>
                                <li>• Due Date Tracking</li>
                                <li>• Class & Subject Association</li>
                                <li>• Status Management</li>
                            </ul>
                        </div>

                        {/* Learning Materials */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📖</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Learning Materials</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Upload & Manage Files</li>
                                <li>• Text Content Creation</li>
                                <li>• External Link Resources</li>
                                <li>• Subject Organization</li>
                            </ul>
                        </div>

                        {/* Grade Management */}
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Grade Management</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>• Input & Track Grades</li>
                                <li>• Multiple Grade Types</li>
                                <li>• Teacher Comments</li>
                                <li>• Student Progress Reports</li>
                            </ul>
                        </div>
                    </div>

                    {/* User Roles Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                            🔐 Role-Based Access Control
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="text-5xl mb-4">👩‍💼</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">Administrator</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• Full access to all data</li>
                                    <li>• Manage students, teachers & classes</li>
                                    <li>• System-wide reporting</li>
                                    <li>• User management</li>
                                </ul>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍🏫</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">Teacher</h3>
                                <ul className="text-gray-600 space-y-2">
                                    <li>• View assigned students only</li>
                                    <li>• Manage their classes</li>
                                    <li>• Create assignments & materials</li>
                                    <li>• Input grades for their students</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Preview */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-3xl font-bold mb-6">📈 Built for Scale</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-4xl font-bold">1,500</div>
                                <div className="text-blue-100">Max Users</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">∞</div>
                                <div className="text-blue-100">Classes</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">∞</div>
                                <div className="text-blue-100">Subjects</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">∞</div>
                                <div className="text-blue-100">Assignments</div>
                            </div>
                        </div>
                        <p className="mt-6 text-blue-100 text-lg">
                            Comprehensive school management solution ready for immediate deployment
                        </p>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}