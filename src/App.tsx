import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { TenantProvider } from "@/context/TenantContext";
import { AuthProvider } from "@/context/AuthContext";
import { SpotlightProvider } from "@/context/SpotlightContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Tenants from "@/pages/Tenants";
import Users from "@/pages/Users";
import ComponentShowcase from "@/pages/ComponentShowcase";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route element={<AppLayout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/tenants" element={<Tenants />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/components" element={<ComponentShowcase />} />
                    </Route>
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
