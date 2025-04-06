
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanySettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Company Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Company Configuration</CardTitle>
          <CardDescription>Manage company settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySettings;
