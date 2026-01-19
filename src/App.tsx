import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { TenantProvider } from "@/context/TenantContext";
import { AuthProvider } from "@/context/AuthContext";
import { SpotlightProvider } from "@/context/SpotlightContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminTypeGuard } from "@/components/guards/AdminTypeGuard";
import ComponentShowcase from "@/pages/ComponentShowcase";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import NotFound from "@/pages/NotFound";

// Brand Admin Pages
import BrandDashboard from "@/pages/brand/dashboard";
import BrandSettings from "@/pages/brand/settings";
import BrandWhatsApp from "@/pages/brand/whatsapp";
import BrandTemplates from "@/pages/brand/templates";
import BrandBilling from "@/pages/brand/billing";
import BrandTeam from "@/pages/brand/team";
import BrandCompliance from "@/pages/brand/compliance";
import BrandWebhooks from "@/pages/brand/webhooks";
import BrandNotifications from "@/pages/brand/notifications";
import BrandDangerZone from "@/pages/brand/danger-zone";

// Owner Admin Pages
import OwnerDashboard from "@/pages/owner/dashboard";
import OwnerAgencies from "@/pages/owner/agencies";
import OwnerBrands from "@/pages/owner/brands";
import OwnerTemplates from "@/pages/owner/templates";
import { OwnerBilling, OwnerMonitoring, OwnerLogs, OwnerFeatures, OwnerConfig, OwnerEmergency } from "@/pages/owner/placeholders";

// Agency Admin Pages
import AgencyDashboard from "@/pages/agency/dashboard";
import AgencyBrands from "@/pages/agency/brands";
import { AgencyTemplates, AgencyReports, AgencySettings, AgencyWhiteLabel, AgencyTeam, AgencyBilling, AgencyCompliance, AgencyDangerZone } from "@/pages/agency/placeholders";

// System Pages (for Brand Admin Team & Access)
import UsersPage from "@/pages/system/user";
import CreateUserPage from "@/pages/system/user/create";
import RolesPage from "@/pages/system/role";
import CreateRolePage from "@/pages/system/role/create";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TenantProvider>
        <AuthProvider>
          <SpotlightProvider>
            <SidebarProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Protected Routes */}
                    <Route element={<AppLayout />}>
                      {/* Brand Admin Routes */}
                      <Route path="/brand/*" element={
                        <AdminTypeGuard allowedAdminTypes={['brand']}>
                          <Routes>
                            <Route path="dashboard" element={<BrandDashboard />} />
                            <Route path="settings" element={<BrandSettings />} />
                            <Route path="whatsapp" element={<BrandWhatsApp />} />
                            <Route path="templates" element={<BrandTemplates />} />
                            <Route path="billing" element={<BrandBilling />} />
                            <Route path="team" element={<BrandTeam />} />
                            <Route path="team/users" element={<UsersPage />} />
                            <Route path="team/users/create" element={<CreateUserPage />} />
                            <Route path="team/roles" element={<RolesPage />} />
                            <Route path="team/roles/create" element={<CreateRolePage />} />
                            <Route path="compliance" element={<BrandCompliance />} />
                            <Route path="webhooks" element={<BrandWebhooks />} />
                            <Route path="notifications" element={<BrandNotifications />} />
                            <Route path="danger-zone" element={<BrandDangerZone />} />
                          </Routes>
                        </AdminTypeGuard>
                      } />

                      {/* Agency Admin Routes */}
                      <Route path="/agency/*" element={
                        <AdminTypeGuard allowedAdminTypes={['agency']}>
                          <Routes>
                            <Route path="dashboard" element={<AgencyDashboard />} />
                            <Route path="brands" element={<AgencyBrands />} />
                            <Route path="templates" element={<AgencyTemplates />} />
                            <Route path="reports" element={<AgencyReports />} />
                            <Route path="settings" element={<AgencySettings />} />
                            <Route path="white-label" element={<AgencyWhiteLabel />} />
                            <Route path="team" element={<AgencyTeam />} />
                            <Route path="billing" element={<AgencyBilling />} />
                            <Route path="compliance" element={<AgencyCompliance />} />
                            <Route path="danger-zone" element={<AgencyDangerZone />} />
                          </Routes>
                        </AdminTypeGuard>
                      } />

                      {/* Owner Admin Routes */}
                      <Route path="/owner/*" element={
                        <AdminTypeGuard allowedAdminTypes={['owner']}>
                          <Routes>
                            <Route path="dashboard" element={<OwnerDashboard />} />
                            <Route path="agencies" element={<OwnerAgencies />} />
                            <Route path="brands" element={<OwnerBrands />} />
                            <Route path="templates" element={<OwnerTemplates />} />
                            <Route path="billing" element={<OwnerBilling />} />
                            <Route path="monitoring" element={<OwnerMonitoring />} />
                            <Route path="logs" element={<OwnerLogs />} />
                            <Route path="features" element={<OwnerFeatures />} />
                            <Route path="config" element={<OwnerConfig />} />
                            <Route path="emergency" element={<OwnerEmergency />} />
                          </Routes>
                        </AdminTypeGuard>
                      } />

                      {/* Component Showcase */}
                      <Route path="/components" element={<ComponentShowcase />} />

                      {/* Root redirect based on admin type */}
                      <Route path="/" element={<Navigate to="/brand/dashboard" replace />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </SidebarProvider>
          </SpotlightProvider>
        </AuthProvider>
      </TenantProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
