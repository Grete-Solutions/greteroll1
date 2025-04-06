
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanySetup from "./pages/CompanySetup";
import EmployeeManagement from "./pages/EmployeeManagement";
import PayrollConfig from "./pages/PayrollConfig";
import Reports from "./pages/Reports";
import SystemSettings from "./pages/SystemSettings";
import AuditLogs from "./pages/AuditLogs";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CompanyEmployees from "./pages/company/CompanyEmployees";
import CompanyDepartments from "./pages/company/CompanyDepartments";
import CompanyPayroll from "./pages/company/CompanyPayroll";
import CompanyBenefits from "./pages/company/CompanyBenefits";
import CompanyAttendance from "./pages/company/CompanyAttendance";
import CompanyLeave from "./pages/company/CompanyLeave";
import CompanyApprovals from "./pages/company/CompanyApprovals";
import CompanyReports from "./pages/company/CompanyReports";
import CompanySettings from "./pages/company/CompanySettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <MainLayout variant="admin">
                <Dashboard />
              </MainLayout>
            }
          />
          <Route
            path="/admin/company-setup"
            element={
              <MainLayout variant="admin">
                <CompanySetup />
              </MainLayout>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <MainLayout variant="admin">
                <EmployeeManagement />
              </MainLayout>
            }
          />
          <Route
            path="/admin/payroll-config"
            element={
              <MainLayout variant="admin">
                <PayrollConfig />
              </MainLayout>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <MainLayout variant="admin">
                <Reports />
              </MainLayout>
            }
          />
          <Route
            path="/admin/system-settings"
            element={
              <MainLayout variant="admin">
                <SystemSettings />
              </MainLayout>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <MainLayout variant="admin">
                <AuditLogs />
              </MainLayout>
            }
          />
          
          {/* Company Admin Routes */}
          <Route
            path="/company/dashboard"
            element={
              <MainLayout variant="company">
                <CompanyDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/company/employees"
            element={
              <MainLayout variant="company">
                <CompanyEmployees />
              </MainLayout>
            }
          />
          <Route
            path="/company/departments"
            element={
              <MainLayout variant="company">
                <CompanyDepartments />
              </MainLayout>
            }
          />
          <Route
            path="/company/payroll"
            element={
              <MainLayout variant="company">
                <CompanyPayroll />
              </MainLayout>
            }
          />
          <Route
            path="/company/benefits"
            element={
              <MainLayout variant="company">
                <CompanyBenefits />
              </MainLayout>
            }
          />
          <Route
            path="/company/attendance"
            element={
              <MainLayout variant="company">
                <CompanyAttendance />
              </MainLayout>
            }
          />
          <Route
            path="/company/leave"
            element={
              <MainLayout variant="company">
                <CompanyLeave />
              </MainLayout>
            }
          />
          <Route
            path="/company/approvals"
            element={
              <MainLayout variant="company">
                <CompanyApprovals />
              </MainLayout>
            }
          />
          <Route
            path="/company/reports"
            element={
              <MainLayout variant="company">
                <CompanyReports />
              </MainLayout>
            }
          />
          <Route
            path="/company/settings"
            element={
              <MainLayout variant="company">
                <CompanySettings />
              </MainLayout>
            }
          />
          
          {/* Legacy routes redirects */}
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/company-setup" element={<Navigate to="/admin/company-setup" replace />} />
          <Route path="/employees" element={<Navigate to="/admin/employees" replace />} />
          <Route path="/payroll-config" element={<Navigate to="/admin/payroll-config" replace />} />
          <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />
          <Route path="/system-settings" element={<Navigate to="/admin/system-settings" replace />} />
          <Route path="/audit-logs" element={<Navigate to="/admin/audit-logs" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
