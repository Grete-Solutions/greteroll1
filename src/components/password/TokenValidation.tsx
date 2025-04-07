
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface TokenValidationProps {
  isTokenChecking: boolean;
  isTokenValid: boolean;
  onReturnToLogin: () => void;
}

const TokenValidation: React.FC<TokenValidationProps> = ({ 
  isTokenChecking, 
  isTokenValid,
  onReturnToLogin
}) => {
  if (isTokenChecking) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verifying Reset Link</h2>
        <p className="text-gray-600 mb-6">Please wait while we verify your reset link...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <X className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold mt-4 mb-2">Invalid or Expired Link</h2>
        <p className="text-gray-600 mb-6">
          This password reset link is invalid or has expired. Please request a new password reset link.
        </p>
        <Button onClick={onReturnToLogin} className="w-full">
          Return to Login
        </Button>
      </div>
    );
  }

  return null;
};

export default TokenValidation;
