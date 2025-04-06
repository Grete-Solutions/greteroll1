
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CompanyAttendance = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Attendance & Timesheets</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Management</CardTitle>
          <CardDescription>Track employee time and attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyAttendance;
