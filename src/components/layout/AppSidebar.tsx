import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  User,
  Component,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles?: string[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/' },
  { label: 'Profile', icon: <User size={20} />, href: '/profile' },
  { label: 'Users', icon: <Users size={20} />, href: '/users', roles: ['admin', 'manager'] },
  { label: 'Tenants', icon: <Building2 size={20} />, href: '/tenants', roles: ['admin'] },
  { label: 'Components', icon: <Component size={20} />, href: '/components' },
  { label: 'Settings', icon: <Settings size={20} />, href: '/settings' },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { direction } = useTheme();

  const isExpanded = !collapsed || hovered;
  const isRtl = direction === 'rtl';

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'fixed top-0 h-screen bg-sidebar border-sidebar-border z-40 transition-all duration-300 ease-in-out flex flex-col',
        isRtl ? 'right-0 border-l' : 'left-0 border-r',
        isExpanded ? 'w-64' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-sidebar-border px-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            AP
          </div>
          <span
            className={cn(
              'font-semibold text-sidebar-foreground whitespace-nowrap transition-all duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0 w-0'
            )}
          >
            Admin Panel
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              <span
                className={cn(
                  'whitespace-nowrap transition-all duration-300',
                  isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                )}
              >
                {item.label}
              </span>
              {/* Tooltip when collapsed */}
              {!isExpanded && (
                <div
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50',
                    isRtl ? 'right-full mr-2' : 'left-full ml-2'
                  )}
                >
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {isRtl ? (
            collapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
          ) : (
            collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
          )}
          <span
            className={cn(
              'whitespace-nowrap transition-all duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
            )}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
