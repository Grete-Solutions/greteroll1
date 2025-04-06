
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanyLeave = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Leave & PTO Management</CardTitle>
          <CardDescription>Manage employee leaves and paid time off</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyLeave;
