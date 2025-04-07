
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, AlertCircle } from 'lucide-react';

interface EmployeePasswordManagementProps {
  employeeEmail: string;
  employeeId: string;
}

const EmployeePasswordManagement = ({ employeeEmail, employeeId }: EmployeePasswordManagementProps) => {
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [forceReset, setForceReset] = useState(false);
  const [showManualReset, setShowManualReset] = useState(false);
  const [sendPasswordByEmail, setSendPasswordByEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [manualPassword, setManualPassword] = useState('');
  const [confirmManualPassword, setConfirmManualPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { toast } = useToast();
  
  const handleSendResetLink = () => {
    setIsSendingReset(true);
    
    // Simulate API call to send reset link
    setTimeout(() => {
      setIsSendingReset(false);
      
      toast({
        title: "Reset link sent",
        description: `Reset link sent to ${employeeEmail}`,
      });
    }, 1500);
  };
  
  const handleToggleForceReset = (checked: boolean) => {
    setForceReset(checked);
    
    if (checked) {
      toast({
        title: "Force password reset enabled",
        description: "Employee will be required to change password on next login.",
      });
    }
  };
  
  const handleSetManualPassword = () => {
    if (!manualPassword || manualPassword !== confirmManualPassword) {
      toast({
        title: "Password error",
        description: "Passwords do not match or are empty.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call to update password
    setTimeout(() => {
      setIsUpdating(false);
      
      toast({
        title: "Password updated",
        description: sendPasswordByEmail 
          ? `Password has been updated and sent to ${employeeEmail}` 
          : "Password has been updated successfully.",
      });
      
      // Reset form
      setManualPassword('');
      setConfirmManualPassword('');
      setShowManualReset(false);
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password Management</CardTitle>
        <CardDescription>
          Manage password settings for this employee
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Send Reset Link</h3>
            <p className="text-sm text-muted-foreground">
              Send a password reset link to the employee's email.
            </p>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleSendResetLink} 
                      disabled={isSendingReset}
                      className="flex items-center gap-2"
                    >
                      <Mail size={16} />
                      {isSendingReset ? "Sending..." : "Send Password Reset Email"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sends a reset link to the employee's email for self-service.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="pt-4 border-t space-y-2">
            <h3 className="text-lg font-medium">Force Password Reset</h3>
            <p className="text-sm text-muted-foreground">
              Force the employee to change their password on next login.
            </p>
            <div className="flex items-center space-x-2">
              <Switch
                id="force-reset"
                checked={forceReset}
                onCheckedChange={handleToggleForceReset}
              />
              <Label htmlFor="force-reset">
                Force password reset on next login
              </Label>
            </div>
          </div>
          
          <div className="pt-4 border-t space-y-2">
            <h3 className="text-lg font-medium">Manually Set Password</h3>
            <p className="text-sm text-muted-foreground">
              Manually set a new password for the employee (use with caution).
            </p>
            
            {!showManualReset ? (
              <Button
                variant="outline"
                onClick={() => setShowManualReset(true)}
              >
                Manually Set Password
              </Button>
            ) : (
              <div className="space-y-4 bg-gray-50 p-4 rounded-md dark:bg-gray-800">
                <div className="flex items-center p-2 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-900/30 dark:border-amber-800">
                  <AlertCircle className="text-amber-600 mr-2 h-5 w-5 dark:text-amber-500" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Setting a password manually is not recommended. Consider sending a reset link instead.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manual-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="manual-password"
                      type={showPassword ? "text" : "password"}
                      value={manualPassword}
                      onChange={(e) => setManualPassword(e.target.value)}
                      className="pr-10"
                      placeholder="Enter new password"
                      disabled={isUpdating}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-manual-password">Confirm Password</Label>
                  <Input
                    id="confirm-manual-password"
                    type="password"
                    value={confirmManualPassword}
                    onChange={(e) => setConfirmManualPassword(e.target.value)}
                    placeholder="Confirm new password"
                    disabled={isUpdating}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-email"
                    checked={sendPasswordByEmail}
                    onCheckedChange={(checked) => setSendPasswordByEmail(checked as boolean)}
                    disabled={isUpdating}
                  />
                  <Label htmlFor="send-email" className="text-sm">
                    Send password to employee via email
                  </Label>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowManualReset(false);
                      setManualPassword('');
                      setConfirmManualPassword('');
                    }}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSetManualPassword}
                    disabled={isUpdating || !manualPassword || manualPassword !== confirmManualPassword}
                  >
                    {isUpdating ? "Updating..." : "Set Password"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeePasswordManagement;
