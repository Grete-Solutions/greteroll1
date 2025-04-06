
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanyApprovals = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Approvals Center</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Review and manage approval requests</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyApprovals;
