
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Key, Mail } from 'lucide-react';

interface PasswordResetOptionsProps {
  employeeEmail: string;
}

const PasswordResetOptions: React.FC<PasswordResetOptionsProps> = ({ employeeEmail }) => {
  const { toast } = useToast();
  const [forceReset, setForceReset] = useState(false);
  const [showManualReset, setShowManualReset] = useState(false);
  const [manualPassword, setManualPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sendPasswordByEmail, setSendPasswordByEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = () => {
    setIsLoading(true);
    
    // Simulate sending reset link
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Reset link sent",
        description: `A password reset link has been sent to ${employeeEmail}`,
      });
    }, 1500);
  };

  const handleForceResetChange = (checked: boolean) => {
    setForceReset(checked);
    
    if (checked) {
      toast({
        title: "Force password reset enabled",
        description: "User will be prompted to change their password at next login",
      });
    }
  };

  const handleManualPasswordSubmit = () => {
    if (manualPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate password update
    setTimeout(() => {
      setIsLoading(false);
      setShowManualReset(false);
      setManualPassword('');
      setConfirmPassword('');
      setSendPasswordByEmail(false);
      
      toast({
        title: "Password updated",
        description: sendPasswordByEmail 
          ? `Password has been updated and sent to ${employeeEmail}` 
          : "Password has been updated successfully",
      });
    }, 1500);
  };

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Key className="mr-2 h-5 w-5" />
          Password Management
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Button 
              variant="outline" 
              className="justify-start" 
              onClick={handleSendResetLink}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Password Reset Email
            </Button>
            <p className="text-xs text-muted-foreground pl-1">
              Sends a reset link to the employee's email for self-service.
            </p>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="force-reset">Force password reset on next login</Label>
              <p className="text-xs text-muted-foreground">
                User will be prompted to change their password after next login.
              </p>
            </div>
            <Switch
              id="force-reset"
              checked={forceReset}
              onCheckedChange={handleForceResetChange}
              disabled={isLoading}
            />
          </div>
          
          <Dialog open={showManualReset} onOpenChange={setShowManualReset}>
            <DialogTrigger asChild>
              <Button variant="secondary" className="w-full">
                Manually Set Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Manually Set Employee Password</DialogTitle>
                <DialogDescription>
                  Only use this option if absolutely necessary. This bypasses the normal password reset flow.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Setting passwords manually is not recommended for security reasons. 
                        Consider using the password reset email option instead.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="manual-password">New Password</Label>
                  <Input
                    id="manual-password"
                    type="password"
                    value={manualPassword}
                    onChange={(e) => setManualPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="send-password"
                    checked={sendPasswordByEmail}
                    onCheckedChange={(checked) => 
                      setSendPasswordByEmail(checked === true)
                    }
                  />
                  <Label htmlFor="send-password" className="text-sm">
                    Send password to employee via email
                  </Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowManualReset(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleManualPasswordSubmit}
                  disabled={!manualPassword || !confirmPassword || isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordResetOptions;
