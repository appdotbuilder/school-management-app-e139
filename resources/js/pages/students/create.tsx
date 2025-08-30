import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface SchoolClass {
    id: number;
    name: string;
}

interface Props {
    classes: SchoolClass[];
    [key: string]: unknown;
}



export default function CreateStudent({ classes }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        student_id: '',
        date_of_birth: '',
        class_id: '',
        address: '',
        parent_phone: '',
        parent_name: '',
        email: '',
        status: 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ➕ Add New Student
                    </h1>
                    <p className="text-gray-600">
                        Enter student information to create a new student record
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter student's full name"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                )}
                            </div>

                            {/* Student ID */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., STD12345678"
                                />
                                {errors.student_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.date_of_birth && (
                                    <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>
                                )}
                            </div>

                            {/* Class */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Class <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.class_id}
                                    onChange={(e) => setData('class_id', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.class_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.class_id}</p>
                                )}
                            </div>

                            {/* Parent Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent Name
                                </label>
                                <input
                                    type="text"
                                    value={data.parent_name}
                                    onChange={(e) => setData('parent_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter parent's name"
                                />
                                {errors.parent_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.parent_name}</p>
                                )}
                            </div>

                            {/* Parent Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={data.parent_phone}
                                    onChange={(e) => setData('parent_phone', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter parent's phone number"
                                />
                                {errors.parent_phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.parent_phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="student@email.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="graduated">Graduated</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter student's home address"
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-between items-center pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                ← Back
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Student'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}