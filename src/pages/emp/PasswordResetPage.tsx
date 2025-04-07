
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      setIsTokenChecking(false);
      return;
    }

    // Simulate token validation
    const validateToken = async () => {
      try {
        // In a real app, this would be an API call to verify the token
        setTimeout(() => {
          // For demo purposes, we'll consider all tokens valid
          setIsTokenValid(true);
          setIsTokenChecking(false);
        }, 1500);
      } catch (error) {
        setIsTokenValid(false);
        setIsTokenChecking(false);
      }
    };

    validateToken();
  }, [token]);

  // Check password strength and validation
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordErrors({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: password === confirmPassword && password !== ''
      });
      return;
    }

    const errors = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      match: password === confirmPassword && password !== ''
    };

    setPasswordErrors(errors);

    // Calculate strength
    const criteriaCount = Object.values(errors).filter(Boolean).length;
    // Don't count match in strength calculation
    const strengthPercentage = ((criteriaCount - (errors.match ? 1 : 0)) / 5) * 100;
    setPasswordStrength(strengthPercentage);
  }, [password, confirmPassword]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordStrength < 60) {
      toast({
        title: "Password too weak",
        description: "Please choose a stronger password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate password update API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Password updated successfully",
        description: "You can now login with your new password.",
      });
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/emp/login');
      }, 2000);
    }, 1500);
  };

  if (isTokenChecking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Verifying Reset Link</h2>
            <p className="text-gray-600 mb-6">Please wait while we verify your reset link...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold mt-4 mb-2">Invalid or Expired Link</h2>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <Button onClick={() => navigate('/emp/login')} className="w-full">
              Return to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create New Password</h2>
          <p className="text-gray-600 mt-2">
            Please enter your new password below
          </p>
        </div>
        
        <form onSubmit={handlePasswordUpdate}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password strength meter */}
              <div className="mt-2 space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Password Strength:</span>
                    <span>
                      {passwordStrength < 30 ? "Weak" : 
                       passwordStrength < 60 ? "Medium" : 
                       passwordStrength < 80 ? "Strong" : "Very Strong"}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mt-2">
                  <div className="flex items-center gap-1">
                    {passwordErrors.length ? 
                      <Check size={14} className="text-green-500" /> : 
                      <X size={14} className="text-gray-300" />}
                    <span className={passwordErrors.length ? "text-green-500" : "text-gray-500"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordErrors.uppercase ? 
                      <Check size={14} className="text-green-500" /> : 
                      <X size={14} className="text-gray-300" />}
                    <span className={passwordErrors.uppercase ? "text-green-500" : "text-gray-500"}>
                      Uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordErrors.lowercase ? 
                      <Check size={14} className="text-green-500" /> : 
                      <X size={14} className="text-gray-300" />}
                    <span className={passwordErrors.lowercase ? "text-green-500" : "text-gray-500"}>
                      Lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordErrors.number ? 
                      <Check size={14} className="text-green-500" /> : 
                      <X size={14} className="text-gray-300" />}
                    <span className={passwordErrors.number ? "text-green-500" : "text-gray-500"}>
                      Number
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {passwordErrors.special ? 
                      <Check size={14} className="text-green-500" /> : 
                      <X size={14} className="text-gray-300" />}
                    <span className={passwordErrors.special ? "text-green-500" : "text-gray-500"}>
                      Special character
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pr-10"
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {password && confirmPassword && !passwordErrors.match && (
                <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !passwordErrors.match || passwordStrength < 30}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;
