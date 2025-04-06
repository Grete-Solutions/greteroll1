
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, FilePdf, FileSpreadsheet } from 'lucide-react';

const CompanyReports = () => {
  const [reportType, setReportType] = useState('payroll');
  const [department, setDepartment] = useState('all');
  const [period, setPeriod] = useState('current');
  
  const reports = [
    { id: 1, name: 'Monthly Payroll Summary', type: 'payroll', period: 'April 2024', status: 'Generated' },
    { id: 2, name: 'Tax Withholding Report', type: 'tax', period: 'Q1 2024', status: 'Generated' },
    { id: 3, name: 'Engineering Department Expenses', type: 'department', period: 'March 2024', status: 'Generated' },
    { id: 4, name: 'Leave Balance Summary', type: 'leave', period: 'April 2024', status: 'Generated' },
    { id: 5, name: 'Attendance Overview', type: 'attendance', period: 'March 2024', status: 'Generated' },
  ];

  const departments = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const periods = ['Current Month', 'Previous Month', 'Q1 2024', 'Q2 2024', 'Custom Range'];
  const reportTypes = ['Payroll Summary', 'Tax Reports', 'Leave Reports', 'Attendance Reports', 'Department Reports'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Create and export company reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Report Type</label>
              <Select onValueChange={setReportType} defaultValue={reportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Department</label>
              <Select onValueChange={setDepartment} defaultValue={department}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dep) => (
                    <SelectItem key={dep} value={dep.toLowerCase().replace(' ', '_')}>{dep}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Period</label>
              <Select onValueChange={setPeriod} defaultValue={period}>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((p) => (
                    <SelectItem key={p} value={p.toLowerCase().replace(' ', '_')}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mb-8">
            <Button variant="outline">Preview Report</Button>
            <Button>Generate Report</Button>
          </div>

          <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <FilePdf className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileDown className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyReports;
