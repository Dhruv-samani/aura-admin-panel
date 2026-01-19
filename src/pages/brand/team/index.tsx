import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Mail, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TeamAccess() {
    const teamMembers = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'admin',
            lastLogin: '2024-01-19',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'marketer',
            lastLogin: '2024-01-18',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team & Access</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage team members and their permissions
                    </p>
                </div>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite Member
                </Button>
            </div>

            <div className="grid gap-4">
                {teamMembers.map((member) => (
                    <Card key={member.id}>
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                    {member.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{member.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Mail className="h-3 w-3" />
                                        {member.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                                        <Shield className="h-3 w-3 mr-1" />
                                        {member.role}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Last login: {member.lastLogin}
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">Manage</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
