import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { AdvancedSelect } from '@/components/ui/advanced-select';
import { ArrowLeft } from 'lucide-react';

const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
];

export default function CreateUserPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6 h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/brand/team/users')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Add New User</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/brand/team/users')}>Cancel</Button>
                    <Button>Create User</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4 max-w-2xl">
                    <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name<span className="text-red-500">*</span></Label>
                        <Input id="user-name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="user-email">Email<span className="text-red-500">*</span></Label>
                        <Input id="user-email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>Role<span className="text-red-500">*</span></Label>
                        <AdvancedSelect options={roleOptions} placeholder="Select role..." />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
