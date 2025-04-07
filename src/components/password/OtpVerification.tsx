
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';

interface OtpVerificationProps {
  onVerifySuccess: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ onVerifySuccess }) => {
  const [otp, setOtp] = useState('');
  const [otpResendTimer, setOtpResendTimer] = useState(45);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const { toast } = useToast();

  // OTP resend timer
  useEffect(() => {
    if (otpResendTimer > 0) {
      const timer = setTimeout(() => {
        setOtpResendTimer(prevTime => prevTime - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (otpResendTimer === 0) {
      setCanResendOtp(true);
    }
  }, [otpResendTimer]);

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
        onVerifySuccess();
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

  return (
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
  );
};

export default OtpVerification;
