
import React, { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
  variant?: 'admin' | 'company' | 'employee';
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, variant = 'admin' }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar variant={variant} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar variant={variant} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pt-16 md:pt-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
