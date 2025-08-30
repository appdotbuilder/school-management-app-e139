import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';

interface Subject {
    id: number;
    name: string;
}

interface Props {
    subjects: Subject[];
    [key: string]: unknown;
}



export default function CreateTeacher({ subjects }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        nip: '',
        date_of_birth: '',
        address: '',
        phone_number: '',
        email: '',
        status: 'active',
        subject_ids: [] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('teachers.store'));
    };

    const handleSubjectChange = (subjectId: number, checked: boolean) => {
        if (checked) {
            setData('subject_ids', [...data.subject_ids, subjectId]);
        } else {
            setData('subject_ids', data.subject_ids.filter(id => id !== subjectId));
        }
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ➕ Add New Teacher
                    </h1>
                    <p className="text-gray-600">
                        Enter teacher information to create a new teacher record
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
                                    placeholder="Enter teacher's full name"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                )}
                            </div>

                            {/* NIP */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    NIP (Teacher ID) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nip}
                                    onChange={(e) => setData('nip', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., 1234567890"
                                />
                                {errors.nip && (
                                    <p className="mt-1 text-sm text-red-600">{errors.nip}</p>
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

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter phone number"
                                />
                                {errors.phone_number && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="teacher@school.edu"
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
                                placeholder="Enter teacher's address"
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>

                        {/* Subjects */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Subjects Taught
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {subjects.map((subject) => (
                                    <label key={subject.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={data.subject_ids.includes(subject.id)}
                                            onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        />
                                        <span className="text-sm text-gray-700">{subject.name}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.subject_ids && (
                                <p className="mt-1 text-sm text-red-600">{errors.subject_ids}</p>
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
                                {processing ? 'Creating...' : 'Create Teacher'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}