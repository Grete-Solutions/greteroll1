
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface PasswordSuccessCardProps {
  onLoginClick: () => void;
  redirectPath: string;
}

const PasswordSuccessCard: React.FC<PasswordSuccessCardProps> = ({ 
  onLoginClick,
  redirectPath
}) => {
  return (
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
            onClick={onLoginClick}
          >
            Go to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordSuccessCard;
