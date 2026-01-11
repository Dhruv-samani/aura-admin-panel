import React from 'react';
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useTenant } from '@/context/TenantContext';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { LineChartWidget } from '@/components/dashboard/LineChartWidget';
import { PieChartWidget } from '@/components/dashboard/PieChartWidget';
import { BarChartWidget } from '@/components/dashboard/BarChartWidget';
import { CircularChartWidget } from '@/components/dashboard/CircularChartWidget';
import { RecentTransactionsTable } from '@/components/dashboard/RecentTransactionsTable';

const kpiData = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up' as const,
    icon: <DollarSign size={20} />,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180',
    trend: 'up' as const,
    icon: <Users size={20} />,
  },
  {
    title: 'Orders',
    value: '12,234',
    change: '-3.2%',
    trend: 'down' as const,
    icon: <ShoppingCart size={20} />,
  },
  {
    title: 'Growth Rate',
    value: '+12.5%',
    change: '+2.1%',
    trend: 'up' as const,
    icon: <TrendingUp size={20} />,
  },
];

export default function Dashboard() {
  const { currentTenant } = useTenant();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with {currentTenant?.name}.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartWidget />
        </div>
        <div>
          <PieChartWidget />
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BarChartWidget />
        </div>
        <div>
          <CircularChartWidget />
        </div>
      </div>

      {/* Transactions Table */}
      <RecentTransactionsTable />
    </div>
  );
}
