
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import CompanySetup from '@/pages/CompanySetup';
import EmployeeManagement from '@/pages/EmployeeManagement';
import PayrollConfig from '@/pages/PayrollConfig';
import Reports from '@/pages/Reports';
import SystemSettings from '@/pages/SystemSettings';
import AuditLogs from '@/pages/AuditLogs';
import AdminProfile from '@/pages/admin/AdminProfile';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/components/layout/MainLayout';
import CompanyDashboard from '@/pages/company/CompanyDashboard';
import CompanyEmployees from '@/pages/company/CompanyEmployees';
import CompanyDepartments from '@/pages/company/CompanyDepartments';
import CompanyPayroll from '@/pages/company/CompanyPayroll';
import CompanyBenefits from '@/pages/company/CompanyBenefits';
import CompanyAttendance from '@/pages/company/CompanyAttendance';
import CompanyLeave from '@/pages/company/CompanyLeave';
import CompanyApprovals from '@/pages/company/CompanyApprovals';
import CompanyReports from '@/pages/company/CompanyReports';
import CompanyProfile from '@/pages/company/CompanyProfile';
import CompanySettings from '@/pages/company/CompanySettings';
import EmpDashboard from '@/pages/emp/EmpDashboard';
import EmpProfile from '@/pages/emp/EmpProfile';
import EmpPayslips from '@/pages/emp/EmpPayslips';
import EmpLeave from '@/pages/emp/EmpLeave';
import EmpAttendance from '@/pages/emp/EmpAttendance';
import EmpRequests from '@/pages/emp/EmpRequests';
import EmpDocuments from '@/pages/emp/EmpDocuments';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<MainLayout variant="admin"><Dashboard /></MainLayout>} />
          <Route path="/admin/company-setup" element={<MainLayout variant="admin"><CompanySetup /></MainLayout>} />
          <Route path="/admin/employees" element={<MainLayout variant="admin"><EmployeeManagement /></MainLayout>} />
          <Route path="/admin/payroll-config" element={<MainLayout variant="admin"><PayrollConfig /></MainLayout>} />
          <Route path="/admin/reports" element={<MainLayout variant="admin"><Reports /></MainLayout>} />
          <Route path="/admin/profile" element={<MainLayout variant="admin"><AdminProfile /></MainLayout>} />
          <Route path="/admin/system-settings" element={<MainLayout variant="admin"><SystemSettings /></MainLayout>} />
          <Route path="/admin/audit-logs" element={<MainLayout variant="admin"><AuditLogs /></MainLayout>} />
          
          {/* Company Routes */}
          <Route path="/company/dashboard" element={<MainLayout variant="company"><CompanyDashboard /></MainLayout>} />
          <Route path="/company/employees" element={<MainLayout variant="company"><CompanyEmployees /></MainLayout>} />
          <Route path="/company/departments" element={<MainLayout variant="company"><CompanyDepartments /></MainLayout>} />
          <Route path="/company/payroll" element={<MainLayout variant="company"><CompanyPayroll /></MainLayout>} />
          <Route path="/company/benefits" element={<MainLayout variant="company"><CompanyBenefits /></MainLayout>} />
          <Route path="/company/attendance" element={<MainLayout variant="company"><CompanyAttendance /></MainLayout>} />
          <Route path="/company/leave" element={<MainLayout variant="company"><CompanyLeave /></MainLayout>} />
          <Route path="/company/approvals" element={<MainLayout variant="company"><CompanyApprovals /></MainLayout>} />
          <Route path="/company/reports" element={<MainLayout variant="company"><CompanyReports /></MainLayout>} />
          <Route path="/company/profile" element={<MainLayout variant="company"><CompanyProfile /></MainLayout>} />
          <Route path="/company/settings" element={<MainLayout variant="company"><CompanySettings /></MainLayout>} />
          
          {/* Employee Routes - without the settings route */}
          <Route path="/emp/dashboard" element={<MainLayout variant="employee"><EmpDashboard /></MainLayout>} />
          <Route path="/emp/payslips" element={<MainLayout variant="employee"><EmpPayslips /></MainLayout>} />
          <Route path="/emp/profile" element={<MainLayout variant="employee"><EmpProfile /></MainLayout>} />
          <Route path="/emp/leave" element={<MainLayout variant="employee"><EmpLeave /></MainLayout>} />
          <Route path="/emp/attendance" element={<MainLayout variant="employee"><EmpAttendance /></MainLayout>} />
          <Route path="/emp/requests" element={<MainLayout variant="employee"><EmpRequests /></MainLayout>} />
          <Route path="/emp/documents" element={<MainLayout variant="employee"><EmpDocuments /></MainLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
