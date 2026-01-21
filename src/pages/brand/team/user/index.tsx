import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { TableHeader as TableHeaderComponent, RowActions } from '@/components/table';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { userService, type User } from '@/services/userService';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

export default function UserPage() {
    const navigate = useNavigate();

    // Users state
    const [users, setUsers] = useState<User[]>(() => userService.getUsers());

    // Search state
    const [search, setSearch] = useState('');

    // Selection state
    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

    // Delete confirmation state
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const handleSearchChange = (value: string) => {
        setSearch(value);
    };

    const handleDeleteClick = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteSingle = (userId: string) => {
        setUserToDelete(userId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            userService.deleteUser(userToDelete);
            setUserToDelete(null);
        } else {
            const selectedIds = Object.keys(selectedRows);
            userService.deleteUsers(selectedIds);
            setSelectedRows({});
        }
        setUsers(userService.getUsers());
        setDeleteConfirmOpen(false);
    };

    // Define columns
    const columns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected()
                            ? true
                            : table.getIsSomePageRowsSelected()
                                ? "indeterminate"
                                : false
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "User",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const role = row.getValue("role") as string;
                return (
                    <Badge variant="outline" className="capitalize font-normal">
                        {role}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <div className="flex items-center gap-2">
                        {status === 'active' ? (
                            <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                            <XCircle size={16} className="text-muted-foreground" />
                        )}
                        <span className={`text-sm ${status === 'active' ? 'text-green-600' : 'text-muted-foreground'} capitalize`}>
                            {status}
                        </span>
                    </div>
                );
            }
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <RowActions
                        onEdit={() => navigate(`/brand/team/user/create?id=${user.id}&action=edit`)}
                        onDelete={() => handleDeleteSingle(user.id)}
                        onView={() => navigate(`/brand/team/user/create?id=${user.id}&action=view`)}
                    />
                );
            },
        },
    ];

    // Filter data for search
    const filteredData = useMemo(() => {
        if (!search) return users;
        return users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    const getDeleteMessage = () => {
        if (userToDelete) {
            const user = users.find(u => u.id === userToDelete);
            return {
                title: 'Delete User',
                description: `Are you sure you want to delete ${user?.name}? This action cannot be undone.`,
            };
        }
        const selectedCount = Object.keys(selectedRows).length;
        return {
            title: 'Delete Users',
            description: `Are you sure you want to delete ${selectedCount} selected user${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`,
        };
    };

    const deleteMessage = getDeleteMessage();
    const selectedIds = Object.keys(selectedRows);

    return (
        <div className="space-y-6 pt-4">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
                </div>
            </div>

            {/* Table Header with Search, Entries, Delete, Add */}
            <TableHeaderComponent
                entriesPerPage={2} // Driven by DataTable internal default, but component needs prop
                onEntriesChange={() => { }} // DataTable has internal pagination, or we could lift state
                searchValue={search}
                onSearchChange={handleSearchChange}
                searchPlaceholder="Search users..."
                showDelete={true}
                deleteDisabled={selectedIds.length === 0}
                onDelete={handleDeleteClick}
                actionButton={{
                    label: 'Add User',
                    onClick: () => navigate('/brand/team/user/create'),
                    icon: <Plus size={18} />,
                }}
            />

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={filteredData}
                rowSelection={selectedRows}
                onRowSelectionChange={setSelectedRows}
                showPagination={true}
                pageSize={2}
            />

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
