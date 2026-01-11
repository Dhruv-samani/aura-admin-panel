import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { SpotlightSearch } from '@/components/SpotlightSearch';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const { direction } = useTheme();
  const isRtl = direction === 'rtl';

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className={cn('transition-all duration-300', isRtl ? 'mr-16 lg:mr-64' : 'ml-16 lg:ml-64')}>
        <AppHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <SpotlightSearch />
    </div>
  );
}
