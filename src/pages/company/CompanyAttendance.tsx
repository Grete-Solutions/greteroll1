
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Download, FileUp, PlusCircle, ClockIcon, AlertCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const CompanyAttendance = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('attendance');
  
  // Mock data for attendance records
  const attendanceRecords = [
    { id: 1, employee: 'John Doe', date: '2024-04-05', clockIn: '08:55', clockOut: '17:30', status: 'Present', hours: 8.5, overtime: 0 },
    { id: 2, employee: 'Jane Smith', date: '2024-04-05', clockIn: '09:10', clockOut: '18:15', status: 'Present', hours: 9, overtime: 1 },
    { id: 3, employee: 'Mike Johnson', date: '2024-04-05', clockIn: '-', clockOut: '-', status: 'Absent', hours: 0, overtime: 0 },
    { id: 4, employee: 'Sarah Williams', date: '2024-04-05', clockIn: '08:30', clockOut: '16:30', status: 'Present', hours: 8, overtime: 0 },
    { id: 5, employee: 'David Brown', date: '2024-04-05', clockIn: '09:45', clockOut: '17:45', status: 'Late', hours: 8, overtime: 0 },
  ];
  
  // Mock data for timesheets
  const timeSheets = [
    { id: 1, employee: 'John Doe', period: 'April 1-15, 2024', status: 'Submitted', regularHours: 80, overtimeHours: 5, approvalStatus: 'Pending' },
    { id: 2, employee: 'Jane Smith', period: 'April 1-15, 2024', status: 'Submitted', regularHours: 76, overtimeHours: 8, approvalStatus: 'Approved' },
    { id: 3, employee: 'Mike Johnson', period: 'April 1-15, 2024', status: 'Draft', regularHours: 72, overtimeHours: 0, approvalStatus: 'Not Submitted' },
    { id: 4, employee: 'Sarah Williams', period: 'April 1-15, 2024', status: 'Submitted', regularHours: 80, overtimeHours: 0, approvalStatus: 'Rejected' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Present':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Present</Badge>;
      case 'Absent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Absent</Badge>;
      case 'Late':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Late</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getApprovalStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Attendance & Timesheets</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="attendance">
            <Clock className="mr-2 h-4 w-4" />
            Daily Attendance
          </TabsTrigger>
          <TabsTrigger value="timesheets">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Timesheets
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col md:flex-row justify-between">
              <div>
                <CardTitle>Daily Attendance</CardTitle>
                <CardDescription>View and manage employee attendance records</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row mt-4 md:mt-0 space-y-2 sm:space-y-0 sm:space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full sm:w-auto justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={() => setShowAddDialog(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Manual Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 w-full md:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <FileUp className="mr-2 h-4 w-4" />
                    Import CSV
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Clock In</TableHead>
                    <TableHead>Clock Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Hours</TableHead>
                    <TableHead className="hidden md:table-cell">Overtime</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employee}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.date}</TableCell>
                      <TableCell>{record.clockIn}</TableCell>
                      <TableCell>{record.clockOut}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.hours}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.overtime}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timesheets" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Timesheets</CardTitle>
              <CardDescription>Manage employee timesheet submissions and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Select defaultValue="current">
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Pay Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">April 1-15, 2024</SelectItem>
                      <SelectItem value="previous">March 16-31, 2024</SelectItem>
                      <SelectItem value="older1">March 1-15, 2024</SelectItem>
                      <SelectItem value="older2">February 16-29, 2024</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="submitted">Submitted</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Regular Hours</TableHead>
                    <TableHead className="hidden md:table-cell">Overtime</TableHead>
                    <TableHead>Approval Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSheets.map((sheet) => (
                    <TableRow key={sheet.id}>
                      <TableCell className="font-medium">{sheet.employee}</TableCell>
                      <TableCell className="hidden md:table-cell">{sheet.period}</TableCell>
                      <TableCell>{sheet.status}</TableCell>
                      <TableCell>{sheet.regularHours}h</TableCell>
                      <TableCell className="hidden md:table-cell">{sheet.overtimeHours}h</TableCell>
                      <TableCell>{getApprovalStatusBadge(sheet.approvalStatus)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          {sheet.approvalStatus === 'Pending' && (
                            <Button variant="ghost" size="sm">Approve</Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manual Attendance Entry</DialogTitle>
            <DialogDescription>
              Add or edit attendance record for an employee.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="employee" className="text-right">
                Employee
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="sarah">Sarah Williams</SelectItem>
                  <SelectItem value="david">David Brown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clockin" className="text-right">
                Clock In
              </Label>
              <Input id="clockin" type="time" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clockout" className="text-right">
                Clock Out
              </Label>
              <Input id="clockout" type="time" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="halfday">Half Day</SelectItem>
                  <SelectItem value="leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input id="notes" className="col-span-3" placeholder="Optional comments" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Record</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyAttendance;
