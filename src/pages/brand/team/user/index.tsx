import React, { useState, useMemo } from 'react';
import { Users as UsersIcon, Plus, MoreHorizontal, Edit, Trash2, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableHeader, TablePagination } from '@/components/table';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';

interface UserItem {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'user';
    status: 'active' | 'inactive';
}

const mockUsers: UserItem[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'manager', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'inactive' },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'manager', status: 'active' },
    { id: '6', name: 'David Lee', email: 'david@example.com', role: 'user', status: 'active' },
    { id: '7', name: 'Emma Davis', email: 'emma@example.com', role: 'manager', status: 'active' },
    { id: '8', name: 'Frank Miller', email: 'frank@example.com', role: 'user', status: 'inactive' },
    { id: '9', name: 'Grace Taylor', email: 'grace@example.com', role: 'admin', status: 'active' },
    { id: '10', name: 'Henry Anderson', email: 'henry@example.com', role: 'user', status: 'active' },
    { id: '11', name: 'Ivy Martinez', email: 'ivy@example.com', role: 'manager', status: 'active' },
    { id: '12', name: 'Jack Robinson', email: 'jack@example.com', role: 'user', status: 'active' },
];

const roleBadgeVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
    admin: 'default',
    manager: 'secondary',
    user: 'outline',
};

export default function UserPage() {
    const navigate = useNavigate();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Search state
    const [search, setSearch] = useState('');

    // Selection state
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    // Delete confirmation state
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    // Filter users based on search
    const filteredUsers = useMemo(() => {
        return mockUsers.filter(
            (u) => u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Reset to page 1 when search or entries per page changes
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleEntriesChange = (value: number) => {
        setEntriesPerPage(value);
        setCurrentPage(1);
    };

    // Row selection handlers
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedRows(paginatedUsers.map(u => u.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (userId: string, checked: boolean) => {
        if (checked) {
            setSelectedRows([...selectedRows, userId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== userId));
        }
    };

    const handleDeleteClick = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteSingle = (userId: string, userName: string) => {
        setUserToDelete(userId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            // Delete single user
            console.log('Deleting user:', userToDelete);
            setUserToDelete(null);
        } else {
            // Delete multiple users
            console.log('Deleting users:', selectedRows);
            setSelectedRows([]);
        }
    };

    // Get delete confirmation message
    const getDeleteMessage = () => {
        if (userToDelete) {
            const user = mockUsers.find(u => u.id === userToDelete);
            return {
                title: 'Delete User',
                description: `Are you sure you want to delete ${user?.name}? This action cannot be undone.`,
            };
        }
        return {
            title: 'Delete Users',
            description: `Are you sure you want to delete ${selectedRows.length} selected user${selectedRows.length > 1 ? 's' : ''}? This action cannot be undone.`,
        };
    };

    const deleteMessage = getDeleteMessage();

    const allSelected = paginatedUsers.length > 0 && paginatedUsers.every(u => selectedRows.includes(u.id));
    const someSelected = paginatedUsers.some(u => selectedRows.includes(u.id)) && !allSelected;

    return (
        <div className="space-y-6 pt-4">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
                    {/* <p className="text-muted-foreground mt-1">
                        Manage system users and their roles.
                    </p> */}
                </div>
            </div>

            {/* Table Header with Search, Entries, Delete, Add */}
            <TableHeader
                entriesPerPage={entriesPerPage}
                onEntriesChange={handleEntriesChange}
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search users..."
                showDelete={true}
                deleteDisabled={selectedRows.length === 0}
                onDelete={handleDeleteClick}
                actionButton={{
                    label: 'Add User',
                    onClick: () => navigate('/brand/team/users/create'),
                    icon: <Plus size={18} />,
                }}
            />

            {/* Users Table */}
            <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="px-5 py-3 w-[50px]">
                                    <Checkbox
                                        checked={allSelected ? true : someSelected ? "indeterminate" : false}
                                        onCheckedChange={handleSelectAll}
                                        aria-label="Select all"
                                    />
                                </th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">User</th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Role</th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-end px-5 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <Checkbox
                                            checked={selectedRows.includes(user.id)}
                                            onCheckedChange={(checked) => handleSelectRow(user.id, checked as boolean)}
                                            aria-label={`Select ${user.name}`}
                                        />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {user.name.split(' ').map((n) => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-foreground">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <Badge variant={roleBadgeVariants[user.role]} className="capitalize">
                                            <Shield size={12} className="mr-1" />
                                            {user.role}
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-4">
                                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-4 text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal size={18} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit size={16} className="mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Mail size={16} className="mr-2" />
                                                    Send Email
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => handleDeleteSingle(user.id, user.name)}
                                                >
                                                    <Trash2 size={16} className="mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <UsersIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground">No users found</h3>
                    <p className="text-muted-foreground">Try adjusting your search.</p>
                </div>
            )}

            {/* Pagination */}
            {filteredUsers.length > 0 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationDialog
                open={deleteConfirmOpen}
                onOpenChange={(open) => {
                    setDeleteConfirmOpen(open);
                    if (!open) setUserToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                title={deleteMessage.title}
                description={deleteMessage.description}
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        </div>
    );
}
