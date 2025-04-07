
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

const EmpLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // In a real app, this would be an API call to verify credentials
      if (formData.email && formData.password) {
        // Success case
        toast({
          title: "Login successful",
          description: "Welcome to the GreteRoll Employee Portal",
        });
        navigate('/emp/dashboard');
      } else {
        // Failure case
        setAttempts(prev => prev + 1);
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  const handleSendResetLink = () => {
    if (!resetEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setResetLoading(true);

    // Simulate sending reset link
    setTimeout(() => {
      setResetLoading(false);
      setResetSent(true);

      // Generic success message (for security, we don't confirm if email exists)
      toast({
        title: "Password Reset Link Sent",
        description: "If this email is registered, you will receive a reset link shortly.",
      });

      // Close the dialog after 3 seconds
      setTimeout(() => {
        setShowPasswordReset(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side branding */}
        <div className="bg-primary/90 text-white p-10 flex flex-col justify-center w-full md:w-2/5">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">GreteRoll</h1>
            <p className="text-lg opacity-90">
              Welcome to the Employee Self-Service Portal. Access your payroll information, request leaves, and manage your profile with ease.
            </p>
            <div className="pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm opacity-90">Easy access to payslips</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm opacity-90">Manage leave requests</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm opacity-90">Update personal information</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side login form */}
        <div className="w-full md:w-3/5 flex items-center justify-center p-4 md:p-10">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Please enter your credentials to access your employee dashboard.</p>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor="email" className="form-label">
                    Username or Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="email"
                      required
                      className="pl-10"
                      placeholder="Enter your email or username"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="password" className="form-label">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <Lock size={18} />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="pl-10"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </Label>
                </div>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setShowPasswordReset(true)}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              {attempts > 2 && (
                <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertCircle className="text-yellow-600 mr-2 h-5 w-5" />
                  <p className="text-sm text-yellow-700">
                    Multiple failed login attempts detected. Please reset your password if you're having trouble.
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Password Reset Dialog */}
      <Dialog open={showPasswordReset} onOpenChange={setShowPasswordReset}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {!resetSent 
                ? "Enter your email address below and we'll send you a link to reset your password."
                : "Password reset link sent!"}
            </DialogDescription>
          </DialogHeader>
          
          {!resetSent ? (
            <>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email address</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="name@example.com"
                    value={resetEmail}
                    onChange={handleResetEmailChange}
                    disabled={resetLoading}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  For security reasons, we do not disclose if an email is registered in our system.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPasswordReset(false)} disabled={resetLoading}>
                  Cancel
                </Button>
                <Button onClick={handleSendResetLink} disabled={resetLoading}>
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Check your email for a link to reset your password. The link will expire in 30 minutes.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpLoginPage;
