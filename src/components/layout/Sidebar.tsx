
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
} from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const Sidebar = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/companies", icon: <Building size={20} />, label: "Companies Management" },
    { to: "/company-setup", icon: <Cog size={20} />, label: "Company Setup" },
    { to: "/employees", icon: <Users size={20} />, label: "Employee Management" },
    { to: "/payroll-config", icon: <ClipboardList size={20} />, label: "Payroll Configurations" },
    { to: "/reports", icon: <FileText size={20} />, label: "Global Reports" },
    { to: "/system-settings", icon: <Settings size={20} />, label: "System Settings" },
    { to: "/audit-logs", icon: <BarChart3 size={20} />, label: "Audit Logs" },
  ];

  return (
    <ShadcnSidebar>
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
      <SidebarTrigger className="absolute top-3 -right-3 bg-sidebar-primary text-white p-1 rounded-full shadow-md hover:bg-primary/90 transition-colors" />
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
