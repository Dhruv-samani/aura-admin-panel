import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash2, Shield } from 'lucide-react';
import { TableHeader as TableHeaderComponent, TablePagination } from '@/components/table';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';

interface RoleItem {
    id: string;
    name: string;
    description: string;
    users: number;
    isSystem: boolean;
}

const rolesData: RoleItem[] = [
    { id: '1', name: 'Super Admin', description: 'Full access to all system modules and settings', users: 2, isSystem: true },
    { id: '2', name: 'Admin', description: 'Access to most modules, cannot manage system settings', users: 5, isSystem: false },
    { id: '3', name: 'Manager', description: 'Can view and approve requests', users: 12, isSystem: false },
    { id: '4', name: 'Support Agent', description: 'Can view and respond to tickets', users: 24, isSystem: false },
    { id: '5', name: 'Viewer', description: 'Read-only access to basic data', users: 8, isSystem: false },
    { id: '6', name: 'Editor', description: 'Can create and edit content', users: 15, isSystem: false },
    { id: '7', name: 'Moderator', description: 'Can moderate user content and comments', users: 7, isSystem: false },
    { id: '8', name: 'Analyst', description: 'Can view analytics and generate reports', users: 10, isSystem: false },
];

export default function RolePage() {
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
    const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

    // Filter roles based on search
    const filteredRoles = useMemo(() => {
        return rolesData.filter(
            (role) => role.name.toLowerCase().includes(search.toLowerCase()) ||
                role.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredRoles.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const paginatedRoles = filteredRoles.slice(startIndex, endIndex);

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
            // Only select non-system roles
            setSelectedRows(paginatedRoles.filter(r => !r.isSystem).map(r => r.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (roleId: string, checked: boolean) => {
        if (checked) {
            setSelectedRows([...selectedRows, roleId]);
        } else {
            setSelectedRows(selectedRows.filter(id => id !== roleId));
        }
    };

    const handleDeleteClick = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteSingle = (roleId: string, roleName: string) => {
        setRoleToDelete(roleId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (roleToDelete) {
            // Delete single role
            console.log('Deleting role:', roleToDelete);
            setRoleToDelete(null);
        } else {
            // Delete multiple roles
            console.log('Deleting roles:', selectedRows);
            setSelectedRows([]);
        }
    };

    // Get delete confirmation message
    const getDeleteMessage = () => {
        if (roleToDelete) {
            const role = rolesData.find(r => r.id === roleToDelete);
            return {
                title: 'Delete Role',
                description: `Are you sure you want to delete ${role?.name}? This action cannot be undone.`,
            };
        }
        return {
            title: 'Delete Roles',
            description: `Are you sure you want to delete ${selectedRows.length} selected role${selectedRows.length > 1 ? 's' : ''}? This action cannot be undone.`,
        };
    };

    const deleteMessage = getDeleteMessage();

    const selectableRoles = paginatedRoles.filter(r => !r.isSystem);
    const allSelected = selectableRoles.length > 0 && selectableRoles.every(r => selectedRows.includes(r.id));
    const someSelected = selectableRoles.some(r => selectedRows.includes(r.id)) && !allSelected;

    return (
        <div className="space-y-6 pt-4">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Roles & Permissions</h1>
                    {/* <p className="text-muted-foreground mt-1">
                        Manage system roles and their access permissions.
                    </p> */}
                </div>
            </div>

            {/* Table Header with Search, Entries, Delete, Add */}
            <TableHeaderComponent
                entriesPerPage={entriesPerPage}
                onEntriesChange={handleEntriesChange}
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search roles..."
                showDelete={true}
                deleteDisabled={selectedRows.length === 0}
                onDelete={handleDeleteClick}
                actionButton={{
                    label: 'Create Role',
                    onClick: () => navigate('/brand/team/roles/create'),
                    icon: <Plus size={18} />,
                }}
            />

            {/* Roles Table */}
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
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Role Name</th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Description</th>
                                <th className="text-center px-5 py-3 text-sm font-medium text-muted-foreground">Users</th>
                                <th className="text-end px-5 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRoles.map((role) => (
                                <tr key={role.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="px-5 py-4">
                                        <Checkbox
                                            checked={selectedRows.includes(role.id)}
                                            onCheckedChange={(checked) => handleSelectRow(role.id, checked as boolean)}
                                            aria-label={`Select ${role.name}`}
                                            disabled={role.isSystem}
                                        />
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                <Shield size={16} />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-foreground">{role.name}</span>
                                                {role.isSystem && (
                                                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                                                        SYSTEM
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <p className="text-sm text-muted-foreground">{role.description}</p>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <Badge variant="outline" className="font-normal">
                                            {role.users} users
                                        </Badge>
                                    </td>
                                    <td className="px-5 py-4 text-end">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Pencil size={16} />
                                            </Button>
                                            {!role.isSystem && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => handleDeleteSingle(role.id, role.name)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {filteredRoles.length === 0 && (
                <div className="text-center py-12">
                    <Shield size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground">No roles found</h3>
                    <p className="text-muted-foreground">Try adjusting your search.</p>
                </div>
            )}

            {/* Pagination */}
            {filteredRoles.length > 0 && (
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
                    if (!open) setRoleToDelete(null);
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
