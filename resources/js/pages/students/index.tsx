import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

interface Student {
    id: number;
    full_name: string;
    student_id: string;
    date_of_birth: string;
    parent_phone: string;
    status: string;
    class: {
        name: string;
    };
}

interface SchoolClass {
    id: number;
    name: string;
}

interface PaginatedStudents {
    data: Student[];
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
    students: PaginatedStudents;
    classes: SchoolClass[];
    filters: {
        search?: string;
        class_id?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function StudentsIndex({ students, classes, filters }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [selectedClass, setSelectedClass] = React.useState(filters.class_id || '');
    const [selectedStatus, setSelectedStatus] = React.useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('students.index'), {
            search: searchTerm,
            class_id: selectedClass,
            status: selectedStatus,
        }, {
            preserveState: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedClass('');
        setSelectedStatus('');
        router.get(route('students.index'));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusBadge = (status: string) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            inactive: 'bg-gray-100 text-gray-800',
            graduated: 'bg-blue-100 text-blue-800',
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
                            <h1 className="text-3xl font-bold text-gray-900">👥 Students</h1>
                            <p className="text-gray-600">
                                Manage student information and records
                            </p>
                        </div>
                        <Button onClick={() => router.visit(route('students.create'))}>
                            <span className="mr-2">➕</span>
                            Add Student
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Students
                                    </label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Name, Student ID, or Parent..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Class
                                    </label>
                                    <select
                                        value={selectedClass}
                                        onChange={(e) => setSelectedClass(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Classes</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.name}
                                            </option>
                                        ))}
                                    </select>
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
                                        <option value="graduated">Graduated</option>
                                    </select>
                                </div>

                                <div className="flex items-end gap-2">
                                    <Button type="submit" className="flex-1">
                                        🔍 Search
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={clearFilters}
                                        className="flex-1"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            Student List ({students.meta.total} total)
                        </h3>
                    </div>

                    {students.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Student
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Class
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date of Birth
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Parent Phone
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
                                        {students.data.map((student) => (
                                            <tr key={student.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {student.full_name}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {student.student_id}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {student.class.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatDate(student.date_of_birth)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {student.parent_phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(student.status)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => router.visit(route('students.show', student.id))}
                                                    >
                                                        View
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => router.visit(route('students.edit', student.id))}
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
                            {students.meta.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                Showing page {students.meta.current_page} of {students.meta.last_page}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            {students.links.map((link, index) => {
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
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
                            <p className="text-gray-500 mb-4">
                                {Object.values(filters).some(f => f) 
                                    ? "Try adjusting your search criteria"
                                    : "Get started by adding your first student"
                                }
                            </p>
                            <Button onClick={() => router.visit(route('students.create'))}>
                                Add First Student
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}