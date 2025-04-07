
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, CheckCircle, X, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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

const EmployeeNewPassword = () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Set a New Password</CardTitle>
              <CardDescription>
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
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <div className="space-y-2 mt-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Password strength</span>
                              <span>
                                {passwordStrength === 0 && "None"}
                                {passwordStrength > 0 && passwordStrength < 40 && "Weak"}
                                {passwordStrength >= 40 && passwordStrength < 80 && "Medium"}
                                {passwordStrength >= 80 && "Strong"}
                              </span>
                            </div>
                            <Progress value={passwordStrength} className="h-1" />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="py-2">
                    <div className="text-sm text-muted-foreground">
                      Password must be at least 8 characters long and include a combination of letters, numbers, and symbols.
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading || passwordStrength < 60}>
                    {isLoading ? "Setting password..." : "Set Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold">Password Set Successfully</h2>
                <p className="text-gray-500">
                  Your new password has been set. You can now use it to log in to your account.
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => navigate('/emp/login')}
                >
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployeeNewPassword;
