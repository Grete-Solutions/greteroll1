
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type LeaveType = 'Annual' | 'Sick' | 'Personal' | 'Unpaid';
type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  remaining: number;
}

interface LeaveRequest {
  id: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: LeaveStatus;
  comments?: string;
  requestDate: Date;
}

const EmpLeave = () => {
  const { toast } = useToast();
  const [leaveType, setLeaveType] = useState<LeaveType>('Annual');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [reason, setReason] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Mock data for leave balances
  const leaveBalances: LeaveBalance[] = [
    { type: 'Annual', total: 20, used: 5, remaining: 15 },
    { type: 'Sick', total: 10, used: 2, remaining: 8 },
    { type: 'Personal', total: 5, used: 1, remaining: 4 },
    { type: 'Unpaid', total: 0, used: 0, remaining: 0 },
  ];
  
  // Mock data for leave history
  const leaveHistory: LeaveRequest[] = [
    {
      id: 'LR-2025-001',
      type: 'Annual',
      startDate: new Date('2025-03-15'),
      endDate: new Date('2025-03-19'),
      days: 5,
      reason: 'Family vacation',
      status: 'Approved',
      comments: 'Approved by manager on 2025-03-10',
      requestDate: new Date('2025-03-01')
    },
    {
      id: 'LR-2025-002',
      type: 'Sick',
      startDate: new Date('2025-02-05'),
      endDate: new Date('2025-02-06'),
      days: 2,
      reason: 'Flu',
      status: 'Approved',
      comments: 'Get well soon!',
      requestDate: new Date('2025-02-04')
    },
    {
      id: 'LR-2025-003',
      type: 'Personal',
      startDate: new Date('2025-04-20'),
      endDate: new Date('2025-04-20'),
      days: 1,
      reason: 'Personal appointment',
      status: 'Pending',
      requestDate: new Date('2025-04-10')
    }
  ];

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)) + 1;
    
    // Excluding weekends (Saturday and Sunday)
    let count = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }
    
    if (startDate > endDate) {
      toast({
        title: "Error",
        description: "End date cannot be before start date",
        variant: "destructive"
      });
      return;
    }
    
    const days = calculateDays();
    const balance = leaveBalances.find(balance => balance.type === leaveType);
    
    if (balance && balance.remaining < days && leaveType !== 'Unpaid') {
      toast({
        title: "Error",
        description: `You don't have enough ${leaveType} leave balance (${balance.remaining} days available)`,
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful submission
    toast({
      title: "Leave Request Submitted",
      description: `Your request for ${days} days of ${leaveType} leave has been submitted for approval.`
    });
    
    // Reset form
    setReason('');
  };

  const filteredLeaveHistory = leaveHistory.filter(leave => {
    if (statusFilter !== "all" && leave.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (typeFilter !== "all" && leave.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    return true;
  });

  const getStatusBadgeClass = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };
  
  const getStatusIcon = (status: LeaveStatus) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
      
      <Tabs defaultValue="apply" className="space-y-4">
        <TabsList>
          <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apply" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaveBalances.map((balance) => (
              <Card key={balance.type}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{balance.type} Leave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{balance.remaining}</p>
                      <p className="text-xs text-muted-foreground">Available days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{balance.used} used / {balance.total} total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Request Leave</CardTitle>
              <CardDescription>
                Submit a new leave request for approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leaveType">Leave Type</Label>
                    <Select value={leaveType} onValueChange={(value) => setLeaveType(value as LeaveType)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual">Annual Leave</SelectItem>
                        <SelectItem value="Sick">Sick Leave</SelectItem>
                        <SelectItem value="Personal">Personal Leave</SelectItem>
                        <SelectItem value="Unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="flex items-center">
                      <span className="text-lg font-bold">{calculateDays()}</span>
                      <span className="ml-2">working day(s)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMMM d, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMMM d, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => startDate ? date < startDate : false}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leave</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    required
                  />
                </div>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    All leave requests require approval from your manager. Please submit at least 1 week in advance for planned leave.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-end">
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Leave History</CardTitle>
              <CardDescription>View all your leave requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="statusFilter" className="mb-2 block">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="statusFilter">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="typeFilter" className="mb-2 block">Leave Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="typeFilter">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="sick">Sick</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeaveHistory.length > 0 ? (
                    filteredLeaveHistory.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell className="font-medium">{leave.id}</TableCell>
                        <TableCell>{leave.type}</TableCell>
                        <TableCell>
                          {format(leave.startDate, "MMM d, yyyy")}
                          {leave.days > 1 && ` to ${format(leave.endDate, "MMM d, yyyy")}`}
                        </TableCell>
                        <TableCell>{leave.days}</TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-md border ${getStatusBadgeClass(leave.status)}`}>
                            {getStatusIcon(leave.status)} {leave.status}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {leave.comments || "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No leave requests found matching the selected filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmpLeave;
