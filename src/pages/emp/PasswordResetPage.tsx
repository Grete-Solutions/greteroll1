
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import TokenValidation from '@/components/password/TokenValidation';
import OtpVerification from '@/components/password/OtpVerification';
import CreatePassword from '@/components/password/CreatePassword';

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
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

  const handleOtpVerificationSuccess = () => {
    setShowOtpVerification(false);
    setIsTokenValid(true);
  };

  const handlePasswordUpdated = () => {
    // Redirect to login page after successful password update
    setTimeout(() => {
      navigate('/emp/login');
    }, 2000);
  };

  const handleReturnToLogin = () => navigate('/emp/login');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {isTokenChecking || (!isTokenValid && !showOtpVerification) ? (
          <TokenValidation 
            isTokenChecking={isTokenChecking}
            isTokenValid={isTokenValid}
            onReturnToLogin={handleReturnToLogin}
          />
        ) : showOtpVerification ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Verify Your Identity</h2>
              <p className="text-gray-600 mt-2">
                Enter the 6-digit code sent to your email or phone to continue.
              </p>
            </div>
            <OtpVerification onVerifySuccess={handleOtpVerificationSuccess} />
          </>
        ) : (
          <CreatePassword onPasswordUpdated={handlePasswordUpdated} />
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
