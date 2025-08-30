import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Subject {
    id: number;
    name: string;
}

interface Teacher {
    id: number;
    full_name: string;
    nip: string;
    email: string;
    phone_number: string;
    status: string;
    subjects: Subject[];
}

interface PaginatedTeachers {
    data: Teacher[];
    links: Array<{
        url?: string;
        label: string;
        active: boolean;
    }>;
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

interface Props {
    teachers: PaginatedTeachers;
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function TeachersIndex({ teachers, filters }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [selectedStatus, setSelectedStatus] = React.useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('teachers.index'), {
            search: searchTerm,
            status: selectedStatus,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedStatus('');
        router.get(route('teachers.index'));
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status}
            </span>
        );
    };

    return (
        <AppShell>
            <div className="p-6">
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">👨‍🏫 Teachers</h1>
                            <p className="text-gray-600">
                                Manage teacher information and assignments
                            </p>
                        </div>
                        <Button onClick={() => router.visit(route('teachers.create'))}>
                            <span className="mr-2">➕</span>
                            Add Teacher
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Teachers
                                    </label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Name, NIP, or Email..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1 md:flex-none">
                                    🔍 Search
                                </Button>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={clearFilters}
                                    className="flex-1 md:flex-none"
                                >
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Teachers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            Teacher List ({teachers.meta.total} total)
                        </h3>
                    </div>

                    {teachers.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Teacher
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Contact
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subjects
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {teachers.data.map((teacher) => (
                                            <tr key={teacher.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {teacher.full_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            NIP: {teacher.nip}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{teacher.email}</div>
                                                    <div className="text-sm text-gray-500">{teacher.phone_number}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {teacher.subjects.length > 0 ? (
                                                            teacher.subjects.map((subject) => (
                                                                <span
                                                                    key={subject.id}
                                                                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
                                                                >
                                                                    {subject.name}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-gray-500">No subjects assigned</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(teacher.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.visit(route('teachers.show', teacher.id))}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => router.visit(route('teachers.edit', teacher.id))}
                                                    >
                                                        Edit
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {teachers.meta.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing page {teachers.meta.current_page} of {teachers.meta.last_page}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {teachers.links.map((link, index) => {
                                                if (!link.url) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-2 text-sm text-gray-400"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    );
                                                }

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => router.visit(link.url!)}
                                                        className={`px-3 py-2 text-sm rounded-md ${
                                                            link.active
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👨‍🏫</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
                            <p className="text-gray-500 mb-4">
                                {Object.values(filters).some(f => f) 
                                    ? "Try adjusting your search criteria"
                                    : "Get started by adding your first teacher"
                                }
                            </p>
                            <Button onClick={() => router.visit(route('teachers.create'))}>
                                Add First Teacher
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}