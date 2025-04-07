
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PasswordInputField from '@/components/password/PasswordInputField';
import PasswordRequirements from '@/components/password/PasswordRequirements';
import PasswordSuccessCard from '@/components/password/PasswordSuccessCard';

const formSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const NewPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const watchPassword = form.watch('password');

  React.useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;

    // Check length
    if (watchPassword.length >= 8) strength += 20;
    // Check for uppercase letters
    if (/[A-Z]/.test(watchPassword)) strength += 20;
    // Check for lowercase letters
    if (/[a-z]/.test(watchPassword)) strength += 20;
    // Check for numbers
    if (/[0-9]/.test(watchPassword)) strength += 20;
    // Check for special characters
    if (/[^A-Za-z0-9]/.test(watchPassword)) strength += 20;

    setPasswordStrength(strength);
  }, [watchPassword]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast({
        title: "Invalid request",
        description: "Missing authentication token. Please use the link from your email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Password updated",
        description: "Your password has been set successfully.",
      });
    }, 1500);
  }

  const handleNavigateToLogin = () => navigate('/login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <Card>
            <CardHeader className="space-y-1">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <LockKeyhole className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">Set a New Password</CardTitle>
              <CardDescription className="text-center">
                Create a strong password to secure your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <PasswordInputField
                        field={field}
                        label="New Password"
                        showPassword={showPassword}
                        toggleShowPassword={() => setShowPassword(!showPassword)}
                      >
                        <PasswordRequirements 
                          password={watchPassword} 
                          passwordStrength={passwordStrength} 
                        />
                      </PasswordInputField>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <PasswordInputField
                        field={field}
                        label="Confirm New Password"
                        showPassword={showConfirmPassword}
                        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                      />
                    )}
                  />
                  
                  <div className="bg-amber-50 text-amber-800 px-4 py-3 rounded-md text-sm flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      Password must be at least 8 characters long and include a combination of letters, numbers, and symbols.
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || passwordStrength < 60}
                  >
                    {isLoading ? "Setting password..." : "Set Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <PasswordSuccessCard 
            onLoginClick={handleNavigateToLogin}
            redirectPath="/login"
          />
        )}
      </div>
    </div>
  );
};

export default NewPasswordPage;
