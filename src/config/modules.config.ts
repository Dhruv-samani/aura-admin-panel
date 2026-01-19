import { ModuleConfig, AdminType } from '@/types/admin.types';
import { PERMISSIONS } from './permissions.config';

/**
 * Brand Admin Modules
 */
export const BRAND_MODULES: ModuleConfig[] = [
  {
    id: 'brand-dashboard',
    name: 'Dashboard',
    path: '/brand/dashboard',
    icon: 'LayoutDashboard',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_DASHBOARD_VIEW],
  },
  {
    id: 'brand-settings',
    name: 'Brand Settings',
    path: '/brand/settings',
    icon: 'Settings',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_SETTINGS_VIEW],
  },
  {
    id: 'brand-whatsapp',
    name: 'WhatsApp Configuration',
    path: '/brand/whatsapp',
    icon: 'MessageSquare',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_WHATSAPP_VIEW],
  },
  {
    id: 'brand-templates',
    name: 'Template Requests',
    path: '/brand/templates',
    icon: 'FileText',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_TEMPLATES_VIEW],
  },
  {
    id: 'brand-billing',
    name: 'Credits & Billing',
    path: '/brand/billing',
    icon: 'CreditCard',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_BILLING_VIEW],
  },
  {
    id: 'brand-team',
    name: 'Team & Access',
    path: '/brand/team',
    icon: 'Users',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_TEAM_VIEW],
    children: [
      {
        id: 'brand-team-users',
        name: 'Users',
        path: '/brand/team/users',
        icon: 'User',
        adminTypes: ['brand'],
        requiredPermissions: [PERMISSIONS.BRAND_TEAM_VIEW],
      },
      {
        id: 'brand-team-roles',
        name: 'Roles',
        path: '/brand/team/roles',
        icon: 'ShieldCheck',
        adminTypes: ['brand'],
        requiredPermissions: [PERMISSIONS.BRAND_TEAM_VIEW],
      },
    ],
  },
  {
    id: 'brand-compliance',
    name: 'Compliance & Safety',
    path: '/brand/compliance',
    icon: 'Shield',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_COMPLIANCE_VIEW],
  },
  {
    id: 'brand-webhooks',
    name: 'Webhooks & API',
    path: '/brand/webhooks',
    icon: 'Webhook',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_WEBHOOKS_VIEW],
  },
  {
    id: 'brand-notifications',
    name: 'Notifications',
    path: '/brand/notifications',
    icon: 'Bell',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_NOTIFICATIONS_MANAGE],
  },
  {
    id: 'brand-danger-zone',
    name: 'Danger Zone',
    path: '/brand/danger-zone',
    icon: 'AlertTriangle',
    adminTypes: ['brand'],
    requiredPermissions: [PERMISSIONS.BRAND_DANGER_ZONE],
  },
];

/**
 * Agency Admin Modules
 */
export const AGENCY_MODULES: ModuleConfig[] = [
  {
    id: 'agency-dashboard',
    name: 'Dashboard',
    path: '/agency/dashboard',
    icon: 'LayoutDashboard',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_DASHBOARD_VIEW],
  },
  {
    id: 'agency-brands',
    name: 'Brands',
    path: '/agency/brands',
    icon: 'Building2',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_BRANDS_VIEW],
  },
  {
    id: 'agency-templates',
    name: 'Templates',
    path: '/agency/templates',
    icon: 'FileText',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_TEMPLATES_VIEW],
  },
  {
    id: 'agency-reports',
    name: 'Reports',
    path: '/agency/reports',
    icon: 'BarChart3',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_REPORTS_VIEW],
  },
  {
    id: 'agency-settings',
    name: 'Agency Settings',
    path: '/agency/settings',
    icon: 'Settings',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_SETTINGS_VIEW],
  },
  {
    id: 'agency-whitelabel',
    name: 'White-Label Settings',
    path: '/agency/whitelabel',
    icon: 'Palette',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_WHITELABEL_MANAGE],
  },
  {
    id: 'agency-team',
    name: 'Team & Access',
    path: '/agency/team',
    icon: 'Users',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_TEAM_VIEW],
  },
  {
    id: 'agency-billing',
    name: 'Billing & Credits',
    path: '/agency/billing',
    icon: 'CreditCard',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_BILLING_VIEW],
  },
  {
    id: 'agency-compliance',
    name: 'Compliance',
    path: '/agency/compliance',
    icon: 'Shield',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_COMPLIANCE_MANAGE],
  },
  {
    id: 'agency-danger-zone',
    name: 'Danger Zone',
    path: '/agency/danger-zone',
    icon: 'AlertTriangle',
    adminTypes: ['agency'],
    requiredPermissions: [PERMISSIONS.AGENCY_DANGER_ZONE],
  },
];

/**
 * VaakuOS Owner Admin Modules
 */
export const OWNER_MODULES: ModuleConfig[] = [
  {
    id: 'owner-dashboard',
    name: 'Global Overview',
    path: '/owner/dashboard',
    icon: 'LayoutDashboard',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_DASHBOARD_VIEW],
  },
  {
    id: 'owner-agencies',
    name: 'Agencies',
    path: '/owner/agencies',
    icon: 'Building',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_AGENCIES_VIEW],
  },
  {
    id: 'owner-brands',
    name: 'Brands',
    path: '/owner/brands',
    icon: 'Building2',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_BRANDS_VIEW],
  },
  {
    id: 'owner-templates',
    name: 'Template Moderation',
    path: '/owner/templates',
    icon: 'FileCheck',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_TEMPLATES_MODERATE],
  },
  {
    id: 'owner-billing',
    name: 'Credit Management',
    path: '/owner/billing',
    icon: 'DollarSign',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_BILLING_VIEW],
  },
  {
    id: 'owner-monitoring',
    name: 'Monitoring',
    path: '/owner/monitoring',
    icon: 'Activity',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_MONITORING_VIEW],
  },
  {
    id: 'owner-logs',
    name: 'Logs & Debug',
    path: '/owner/logs',
    icon: 'FileCode',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_LOGS_VIEW],
  },
  {
    id: 'owner-features',
    name: 'Feature Flags',
    path: '/owner/features',
    icon: 'Flag',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_FEATURES_MANAGE],
  },
  {
    id: 'owner-config',
    name: 'Core Config',
    path: '/owner/config',
    icon: 'Settings',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_CONFIG_VIEW],
  },
  {
    id: 'owner-emergency',
    name: 'Emergency Controls',
    path: '/owner/emergency',
    icon: 'AlertOctagon',
    adminTypes: ['owner'],
    requiredPermissions: [PERMISSIONS.OWNER_EMERGENCY_CONTROLS],
  },
];

/**
 * Get modules by admin type
 */
export function getModulesByAdminType(adminType: AdminType): ModuleConfig[] {
  switch (adminType) {
    case 'brand':
      return BRAND_MODULES;
    case 'agency':
      return AGENCY_MODULES;
    case 'owner':
      return OWNER_MODULES;
    default:
      return [];
  }
}

/**
 * Find module by path
 */
export function findModuleByPath(path: string, modules: ModuleConfig[]): ModuleConfig | null {
  for (const module of modules) {
    if (module.path === path) {
      return module;
    }
    if (module.children) {
      const found = findModuleByPath(path, module.children);
      if (found) return found;
    }
  }
  return null;
}
