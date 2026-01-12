import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Pencil, Trash2, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const rolesData = [
    { id: 1, name: 'Super Admin', description: 'Full access to all system modules and settings', users: 2, isSystem: true },
    { id: 2, name: 'Admin', description: 'Access to most modules, cannot manage system settings', users: 5, isSystem: false },
    { id: 3, name: 'Manager', description: 'Can view and approve requests', users: 12, isSystem: false },
    { id: 4, name: 'Support Agent', description: 'Can view and respond to tickets', users: 24, isSystem: false },
    { id: 5, name: 'Viewer', description: 'Read-only access to basic data', users: 8, isSystem: false },
];

export default function RolePage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Roles & Permissions</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage system roles and their access permissions.
                    </p>
                </div>
                <Button onClick={() => navigate('/system/roles/create')}>
                    <Plus className="mr-2 h-4 w-4" /> Create Role
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-card">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[200px]">Role Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[100px] text-center">Users</TableHead>
                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rolesData.map((role) => (
                                <TableRow key={role.id} className="cursor-pointer hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                                <Shield size={16} />
                                            </div>
                                            <span>{role.name}</span>
                                            {role.isSystem && (
                                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 ml-1">
                                                    SYSTEM
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{role.description}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="font-normal">
                                            {role.users} users
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Pencil size={16} />
                                            </Button>
                                            {!role.isSystem && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                    <Trash2 size={16} />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
