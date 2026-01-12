import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  User,
  Search,
  Sun,
  Moon,
  Languages,
  Plus,
  Palette,
  Component,
  Shield,
  UserCog,
} from 'lucide-react';
import { useSpotlight } from '@/context/SpotlightContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface SpotlightItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  type: 'page' | 'action' | 'user' | 'tenant';
  action?: () => void;
  route?: string;
}

const spotlightItems: SpotlightItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'View analytics and metrics', icon: <LayoutDashboard size={18} />, type: 'page', route: '/' },
  { id: 'profile', label: 'Profile', description: 'Manage your account', icon: <User size={18} />, type: 'page', route: '/profile' },
  { id: 'users', label: 'User Management', description: 'Manage users and roles', icon: <Users size={18} />, type: 'page', route: '/users' },
  { id: 'system-users', label: 'System > Users', description: 'Manage system users', icon: <UserCog size={18} />, type: 'page', route: '/system/users' },
  { id: 'system-roles', label: 'System > Roles', description: 'Manage system roles', icon: <Shield size={18} />, type: 'page', route: '/system/roles' },
  { id: 'tenants', label: 'Tenants', description: 'Manage tenant organizations', icon: <Building2 size={18} />, type: 'page', route: '/tenants' },
  { id: 'settings', label: 'Settings', description: 'Theme, palette, and preferences', icon: <Settings size={18} />, type: 'page', route: '/settings' },
  { id: 'components', label: 'Component Showcase', description: 'Browse UI components', icon: <Component size={18} />, type: 'page', route: '/components' },
];

export function SpotlightSearch() {
  const { isOpen, close } = useSpotlight();
  const { toggleTheme, theme, toggleDirection, direction, setPalette } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const actionItems: SpotlightItem[] = useMemo(() => [
    { id: 'create-role', label: 'Create Role', icon: <Plus size={18} />, type: 'action', action: () => navigate('/system/roles/create') },
    { id: 'toggle-theme', label: `Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`, icon: theme === 'light' ? <Moon size={18} /> : <Sun size={18} />, type: 'action', action: toggleTheme },
    { id: 'toggle-rtl', label: `Switch to ${direction === 'ltr' ? 'RTL' : 'LTR'}`, icon: <Languages size={18} />, type: 'action', action: toggleDirection },
    { id: 'create-tenant', label: 'Create New Tenant', icon: <Plus size={18} />, type: 'action', action: () => navigate('/tenants?action=create') },
    { id: 'add-user', label: 'Add New User', icon: <Plus size={18} />, type: 'action', action: () => navigate('/users?action=create') },
    { id: 'palette-green', label: 'Set Green Palette', icon: <Palette size={18} />, type: 'action', action: () => setPalette('green') },
    { id: 'palette-blue', label: 'Set Blue Palette', icon: <Palette size={18} />, type: 'action', action: () => setPalette('blue') },
    { id: 'palette-violet', label: 'Set Violet Palette', icon: <Palette size={18} />, type: 'action', action: () => setPalette('violet') },
  ], [theme, direction, toggleTheme, toggleDirection, navigate, setPalette]);

  const allItems = useMemo(() => [...spotlightItems, ...actionItems], [actionItems]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const lowerQuery = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.label.toLowerCase().includes(lowerQuery) ||
        item.description?.toLowerCase().includes(lowerQuery)
    );
  }, [query, allItems]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const executeItem = useCallback((item: SpotlightItem) => {
    if (item.action) {
      item.action();
    } else if (item.route) {
      navigate(item.route);
    }
    close();
  }, [navigate, close]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      executeItem(filteredItems[selectedIndex]);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex] as HTMLElement;
      selectedEl?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm animate-fade-in"
        onClick={close}
      />
      <div className="relative z-10 w-full max-w-xl mx-4 bg-popover rounded-xl shadow-xl border border-border overflow-hidden animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-border">
          <Search className="text-muted-foreground" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, actions, commands..."
            className="flex-1 px-3 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-flex px-2 py-1 text-xs font-mono bg-muted rounded text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => executeItem(item)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-start transition-colors',
                  index === selectedIndex
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <div className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-lg',
                  index === selectedIndex ? 'bg-primary-foreground/20' : 'bg-muted'
                )}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.label}</div>
                  {item.description && (
                    <div className={cn(
                      'text-sm truncate',
                      index === selectedIndex ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}>
                      {item.description}
                    </div>
                  )}
                </div>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded capitalize',
                  index === selectedIndex
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {item.type}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">↵</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">K</kbd>
            to toggle
          </span>
        </div>
      </div>
    </div>
  );
}
