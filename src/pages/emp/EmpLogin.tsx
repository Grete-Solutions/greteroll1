
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const EmpLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/emp/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-primary rounded-full mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect width="20" height="14" x="2" y="7" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">PayrollNexus</h1>
          <p className="text-gray-600">Employee Self-Service Portal</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Employee Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID / Email</Label>
                <Input 
                  id="employeeId" 
                  type="text" 
                  placeholder="Enter your employee ID or email" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Log In</Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} PayrollNexus. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default EmpLogin;
