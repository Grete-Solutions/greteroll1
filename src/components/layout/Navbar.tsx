
import React, { useState } from 'react';
import { Bell, ChevronDown, Search, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  variant?: 'admin' | 'company' | 'employee';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'admin' }) => {
  const [notifications] = useState([
    { id: 1, message: variant === 'admin' ? 'New company registration: Acme Inc' : variant === 'company' ? 'New employee request awaiting approval' : 'Your leave request was approved', time: '10 mins ago' },
    { id: 2, message: variant === 'admin' ? 'Payroll processing complete for TechCorp' : variant === 'company' ? 'Payroll ready for review' : 'New payslip available', time: '1 hour ago' },
    { id: 3, message: variant === 'admin' ? 'System update scheduled for tonight' : variant === 'company' ? 'New leave request submitted' : 'Company announcement posted', time: '3 hours ago' },
  ]);
  
  const navigate = useNavigate();
  
  const profileName = variant === 'admin' ? 'Super Admin' : variant === 'company' ? 'Company Admin' : 'Employee';
  const profileInitials = variant === 'admin' ? 'SA' : variant === 'company' ? 'CA' : 'EM';
  const baseUrl = variant === 'admin' ? '/admin' : variant === 'company' ? '/company' : '/emp';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex-1 max-w-md">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="search"
              placeholder={
                variant === 'admin' 
                  ? "Search companies, reports..." 
                  : variant === 'company' 
                    ? "Search employees, departments..." 
                    : "Search payslips, documents..."
              }
              className="pl-10 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-4 py-3 font-medium">Notifications</div>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="px-4 py-3">
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center py-2 text-sm font-medium text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white">{profileInitials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden md:block">{profileName}</span>
                <ChevronDown size={16} className="hidden md:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => navigate(`${baseUrl}/profile`)}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              {variant !== 'employee' && (
                <DropdownMenuItem onSelect={() => navigate(variant === 'admin' ? '/admin/system-settings' : '/company/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate("/login")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
