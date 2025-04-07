
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Check, Eye, EyeOff, X } from 'lucide-react';

interface CreatePasswordProps {
  onPasswordUpdated: () => void;
}

const CreatePassword: React.FC<CreatePasswordProps> = ({ onPasswordUpdated }) => {
  const [isLoading, setIsLoading] = useState(false);
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
  
  const { toast } = useToast();

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
      
      // Call the callback after successful update
      onPasswordUpdated();
    }, 1500);
  };

  return (
    <div>
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
  );
};

export default CreatePassword;
