
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanySetup from "./pages/CompanySetup";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/company-setup"
            element={
              <MainLayout>
                <CompanySetup />
              </MainLayout>
            }
          />

          {/* Placeholder routes for future implementation */}
          <Route
            path="/companies"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Companies Management</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          <Route
            path="/employees"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          <Route
            path="/payroll-config"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Payroll Configurations</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Global Reports</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          <Route
            path="/system-settings"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">System Settings</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <MainLayout>
                <div className="p-8">
                  <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
                  <p>This page is under construction.</p>
                </div>
              </MainLayout>
            }
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
