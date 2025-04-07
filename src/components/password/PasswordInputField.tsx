
import React from 'react';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

interface PasswordInputFieldProps {
  field: ControllerRenderProps<any, any>;
  label: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  children?: React.ReactNode;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  field,
  label,
  showPassword,
  toggleShowPassword,
  children
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            {...field}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </FormControl>
      {children}
      <FormMessage />
    </FormItem>
  );
};

export default PasswordInputField;
