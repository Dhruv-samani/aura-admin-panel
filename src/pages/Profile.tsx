import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Mail, User, Shield } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information and settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {user?.name.split(' ').map((n) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge className="capitalize">{user?.role}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="name" defaultValue={user?.name} className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" defaultValue={user?.email} className="pl-10" />
            </div>
          </div>
        </div>
        <Button className="mt-6">Save Changes</Button>
      </div>

      {/* Security */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
