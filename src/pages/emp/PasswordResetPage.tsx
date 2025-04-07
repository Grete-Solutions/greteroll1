
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

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
  
  // OTP verification state
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpResendTimer, setOtpResendTimer] = useState(45);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      setIsTokenChecking(false);
      setShowOtpVerification(true); // Show OTP verification if no token
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

  // OTP resend timer
  useEffect(() => {
    if (showOtpVerification && otpResendTimer > 0) {
      const timer = setTimeout(() => {
        setOtpResendTimer(prevTime => prevTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (otpResendTimer === 0) {
      setCanResendOtp(true);
    }
  }, [showOtpVerification, otpResendTimer]);

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

  const handleVerifyOtp = () => {
    if (otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code.",
        variant: "destructive",
      });
      return;
    }

    setVerifyingOtp(true);

    // Simulate OTP verification
    setTimeout(() => {
      setVerifyingOtp(false);
      
      // For demo, we'll consider OTP valid if it has 6 digits
      if (otp.length === 6) {
        setShowOtpVerification(false);
        setIsTokenValid(true);
      } else {
        toast({
          title: "Invalid OTP",
          description: "The code you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    if (!canResendOtp) return;
    
    // Reset timer and disable resend button
    setOtpResendTimer(45);
    setCanResendOtp(false);
    
    // Simulate sending new OTP
    toast({
      title: "New code sent",
      description: "A new verification code has been sent to your email.",
    });
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

  if (showOtpVerification) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Verify Your Identity</h2>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit code sent to your email or phone to continue.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <div className="flex justify-center">
                <InputOTP 
                  maxLength={6} 
                  value={otp} 
                  onChange={setOtp}
                  disabled={verifyingOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleVerifyOtp}
              disabled={verifyingOtp || otp.length < 6}
            >
              {verifyingOtp ? "Verifying..." : "Verify"}
            </Button>
            
            <div className="text-center text-sm">
              <p className="text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={`font-medium ${canResendOtp ? "text-primary hover:text-primary/80" : "text-gray-400"}`}
                  disabled={!canResendOtp}
                >
                  {canResendOtp ? "Resend code" : `Resend in ${otpResendTimer < 10 ? `0${otpResendTimer}` : otpResendTimer}`}
                </button>
              </p>
              <p className="mt-4 text-gray-500">
                For assistance, contact your administrator.
              </p>
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
