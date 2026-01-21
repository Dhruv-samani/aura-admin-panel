import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { StatusSwitch } from '@/components/ui/status-switch';
import { ArrowLeft } from 'lucide-react';

export default function CreateUserPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        isActive: true,
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        // TODO: Implement user creation logic
        console.log('Creating user:', formData);
    };

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
                    <Button onClick={handleSubmit}>Create User</Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4 max-w-2xl">
                    <div className="space-y-2">
                        <Label htmlFor="user-name">Full Name<span className="text-red-500">*</span></Label>
                        <Input
                            id="user-name"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="user-email">Email<span className="text-red-500">*</span></Label>
                        <Input
                            id="user-email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="user-password">Password<span className="text-red-500">*</span></Label>
                        <Input
                            id="user-password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="user-phone">Phone</Label>
                        <Input
                            id="user-phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>
                    <div className="pt-2">
                        <StatusSwitch
                            checked={formData.isActive}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                            label="Active Status"
                            description="Enable or disable this user account"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
