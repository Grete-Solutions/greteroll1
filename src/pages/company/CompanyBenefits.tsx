
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanyBenefits = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Deductions & Benefits</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Benefits Management</CardTitle>
          <CardDescription>Configure and manage employee benefits and deductions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyBenefits;
