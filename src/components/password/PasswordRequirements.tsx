
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, X } from 'lucide-react';

interface PasswordCriterion {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

interface PasswordRequirementsProps {
  password: string;
  passwordStrength: number;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ 
  password, 
  passwordStrength 
}) => {
  const passwordCriteria: PasswordCriterion[] = [
    { id: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { id: 'uppercase', label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { id: 'lowercase', label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { id: 'number', label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
    { id: 'special', label: 'Contains special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  return (
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
        {passwordCriteria.map((criterion) => (
          <div 
            key={criterion.id}
            className="flex items-center gap-1.5 text-xs"
          >
            {password && criterion.test(password) ? (
              <CheckCircle className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <X className="h-3.5 w-3.5 text-gray-300" />
            )}
            <span className={password && criterion.test(password) 
              ? "text-green-600" 
              : "text-gray-500"
            }>
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordRequirements;
