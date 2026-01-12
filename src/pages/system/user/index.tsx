import React, { useState } from 'react';
import { Users as UsersIcon, Plus, Search, MoreHorizontal, Edit, Trash2, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
];

const roleBadgeVariants: Record<string, 'default' | 'secondary' | 'outline'> = {
    admin: 'default',
    manager: 'secondary',
    user: 'outline',
};

export default function UserPage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filteredUsers = mockUsers.filter(
        (u) => u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 pt-4">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">User Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage system users and their roles.
                    </p>
                </div>
                <Button onClick={() => navigate('/system/users/create')}>
                    <Plus size={18} className="mr-2" />
                    Add User
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Users Table */}
            <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">User</th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Role</th>
                                <th className="text-start px-5 py-3 text-sm font-medium text-muted-foreground">Status</th>
                                <th className="text-end px-5 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
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
                                                <DropdownMenuItem className="text-destructive">
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

            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <UsersIcon size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground">No users found</h3>
                    <p className="text-muted-foreground">Try adjusting your search.</p>
                </div>
            )}
        </div>
    );
}
