import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Building,
  Cog,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  FileText,
  ClipboardList,
  Menu,
  Clock,
  Calendar,
  CheckCircle,
  PieChart,
  UserRound,
  X,
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  variant?: 'admin' | 'company' | 'employee';
}

const Sidebar: React.FC<SidebarProps> = ({ variant = 'admin' }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  
  const adminSidebarItems = [
    { to: "/admin/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/admin/company-setup", icon: <Cog size={20} />, label: "Company Setup" },
    { to: "/admin/employees", icon: <Users size={20} />, label: "Employee Management" },
    { to: "/admin/payroll-config", icon: <ClipboardList size={20} />, label: "Payroll Configurations" },
    { to: "/admin/reports", icon: <FileText size={20} />, label: "Global Reports" },
    { to: "/admin/profile", icon: <UserRound size={20} />, label: "My Profile" },
    { to: "/admin/system-settings", icon: <Settings size={20} />, label: "System Settings" },
    { to: "/admin/audit-logs", icon: <BarChart3 size={20} />, label: "Audit Logs" },
  ];

  const companySidebarItems = [
    { to: "/company/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/company/employees", icon: <Users size={20} />, label: "Employees" },
    { to: "/company/departments", icon: <Building size={20} />, label: "Departments" },
    { to: "/company/payroll", icon: <ClipboardList size={20} />, label: "Payroll" },
    { to: "/company/benefits", icon: <PieChart size={20} />, label: "Deductions & Benefits" },
    { to: "/company/attendance", icon: <Clock size={20} />, label: "Attendance & Timesheets" },
    { to: "/company/leave", icon: <Calendar size={20} />, label: "Leave Management" },
    { to: "/company/approvals", icon: <CheckCircle size={20} />, label: "Approvals Center" },
    { to: "/company/reports", icon: <FileText size={20} />, label: "Reports" },
    { to: "/company/profile", icon: <UserRound size={20} />, label: "My Profile" },
    { to: "/company/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const employeeSidebarItems = [
    { to: "/emp/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/emp/payslips", icon: <FileText size={20} />, label: "My Payslips" },
    { to: "/emp/profile", icon: <UserRound size={20} />, label: "My Profile" },
    { to: "/emp/leave", icon: <Calendar size={20} />, label: "Leave Management" },
    { to: "/emp/attendance", icon: <Clock size={20} />, label: "Attendance" },
    { to: "/emp/requests", icon: <ClipboardList size={20} />, label: "My Requests" },
    { to: "/emp/documents", icon: <FileText size={20} />, label: "Company Documents" },
  ];

  let sidebarItems;
  switch (variant) {
    case 'employee':
      sidebarItems = employeeSidebarItems;
      break;
    case 'company':
      sidebarItems = companySidebarItems;
      break;
    default:
      sidebarItems = adminSidebarItems;
  }

  const MobileSidebar = () => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed top-3 left-3 z-40 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85%] pt-10">
        <div className="px-4 flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded-full p-2">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">PayrollNexus</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsDrawerOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsDrawerOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 ${
                  isActive || location.pathname === item.to
                    ? 'bg-sidebar-accent text-sidebar-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
                } rounded-md transition-colors`
              }
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-4 py-4">
          <NavLink
            to="/"
            className="flex items-center px-4 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-medium">Logout</span>
          </NavLink>
        </div>
      </DrawerContent>
    </Drawer>
  );

  if (isMobile) {
    return <MobileSidebar />;
  }

  return (
    <ShadcnSidebar className="z-50 hidden md:block">
      <SidebarHeader className="flex justify-center items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary rounded-full p-2">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl">PayrollNexus</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <nav className="space-y-1 px-2 py-5">
          {sidebarItems.map((item) => (
            <NavItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              isActive={location.pathname === item.to}
            />
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <NavLink
          to="/"
          className="flex items-center px-4 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Logout</span>
        </NavLink>
      </SidebarFooter>
      <SidebarTrigger className={cn(
        "absolute top-3 -right-3 bg-sidebar-primary text-white p-1 rounded-full shadow-md hover:bg-primary/90 transition-colors",
        isMobile && "flex md:hidden"
      )}>
        <Menu className="h-4 w-4" />
      </SidebarTrigger>
    </ShadcnSidebar>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive: navActive }) =>
        `flex items-center px-4 py-2.5 ${
          isActive || navActive
            ? 'bg-sidebar-accent text-sidebar-foreground'
            : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50'
        } rounded-md transition-colors`
      }
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

export default Sidebar;
