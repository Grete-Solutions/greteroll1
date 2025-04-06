
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, Calendar, Clock, FileType } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';

const Reports = () => {
  // State for filters
  const [reportType, setReportType] = useState('payroll');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 6)
  });
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(['all']);
  const [scheduleReport, setScheduleReport] = useState(false);

  // Sample data for reports
  const reportData = {
    payroll: [
      { id: 1, company: 'Acme Inc', period: 'April 2025', employees: 45, totalGross: '$125,450.00', totalNet: '$98,765.00', status: 'Processed' },
      { id: 2, company: 'TechCorp', period: 'April 2025', employees: 32, totalGross: '$98,230.00', totalNet: '$76,543.00', status: 'Pending' },
      { id: 3, company: 'Global Solutions', period: 'April 2025', employees: 78, totalGross: '$256,780.00', totalNet: '$198,654.00', status: 'Processed' },
    ],
    tax: [
      { id: 1, company: 'Acme Inc', period: 'Q1 2025', taxType: 'Income Tax', amount: '$35,670.00', status: 'Filed' },
      { id: 2, company: 'TechCorp', period: 'Q1 2025', taxType: 'Social Security', amount: '$24,560.00', status: 'Pending' },
      { id: 3, company: 'Global Solutions', period: 'Q1 2025', taxType: 'Medicare', amount: '$12,345.00', status: 'Filed' },
    ],
    benefits: [
      { id: 1, company: 'Acme Inc', benefit: 'Health Insurance', employees: 40, cost: '$15,600.00', employeeContrib: '$5,200.00' },
      { id: 2, company: 'TechCorp', benefit: '401k', employees: 28, cost: '$42,300.00', employeeContrib: '$21,150.00' },
      { id: 3, company: 'Global Solutions', benefit: 'Dental Insurance', employees: 65, cost: '$8,450.00', employeeContrib: '$2,600.00' },
    ],
    logs: [
      { id: 1, time: '2025-04-06 09:15:23', user: 'admin@payrollnexus.com', action: 'Payroll approved', company: 'Acme Inc' },
      { id: 2, time: '2025-04-05 14:22:47', user: 'manager@techcorp.com', action: 'Employee added', company: 'TechCorp' },
      { id: 3, time: '2025-04-04 11:05:33', user: 'hr@globalsolutions.com', action: 'Benefits updated', company: 'Global Solutions' },
    ]
  };

  // Available companies
  const companies = [
    { value: 'all', label: 'All Companies' },
    { value: 'acme', label: 'Acme Inc' },
    { value: 'techcorp', label: 'TechCorp' },
    { value: 'global', label: 'Global Solutions' }
  ];

  // Handle export function
  const handleExport = (format: string) => {
    console.log(`Exporting report in ${format} format...`);
    // In a real app, this would trigger the export functionality
  };

  // Render table based on report type
  const renderReportTable = () => {
    switch (reportType) {
      case 'payroll':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Total Gross</TableHead>
                <TableHead>Total Net</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.payroll.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.employees}</TableCell>
                  <TableCell>{row.totalGross}</TableCell>
                  <TableCell>{row.totalNet}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'tax':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Tax Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.tax.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.period}</TableCell>
                  <TableCell>{row.taxType}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'benefits':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Benefit</TableHead>
                <TableHead>Enrolled Employees</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Employee Contribution</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.benefits.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.benefit}</TableCell>
                  <TableCell>{row.employees}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.employeeContrib}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case 'logs':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.logs.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Global Reports</h1>
      
      {/* Filters Panel */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select filters to customize your report view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payroll">Payroll Reports</SelectItem>
                  <SelectItem value="tax">Tax Reports</SelectItem>
                  <SelectItem value="benefits">Benefits Reports</SelectItem>
                  <SelectItem value="logs">System Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date Range</Label>
              <DateRangePicker 
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select value={selectedCompanies[0]} onValueChange={(value) => setSelectedCompanies([value])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.value} value={company.value}>
                      {company.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Data Display */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {reportType === 'payroll' && 'Payroll Reports'}
              {reportType === 'tax' && 'Tax Reports'}
              {reportType === 'benefits' && 'Benefits Reports'}
              {reportType === 'logs' && 'System Logs'}
            </CardTitle>
            <CardDescription>
              {dateRange?.from && dateRange?.to 
                ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                : 'All dates'
              }
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
              <FileDown className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
              <FileType className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {renderReportTable()}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="schedule" 
              checked={scheduleReport}
              onCheckedChange={(checked) => setScheduleReport(checked as boolean)}
            />
            <Label htmlFor="schedule">Schedule automatic reports</Label>
          </div>
          {scheduleReport && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Weekly</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>Monday, 9:00 AM</span>
              </div>
              <Button size="sm">Configure Schedule</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Reports;
