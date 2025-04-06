
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

const CompanyLeave = () => {
  const [activeTab, setActiveTab] = useState('requests');
  
  const leaveRequests = [
    { id: 1, employee: 'John Doe', type: 'Annual Leave', startDate: '2024-04-15', endDate: '2024-04-20', days: 5, status: 'Pending' },
    { id: 2, employee: 'Jane Smith', type: 'Sick Leave', startDate: '2024-04-10', endDate: '2024-04-12', days: 2, status: 'Approved' },
    { id: 3, employee: 'Mike Johnson', type: 'Annual Leave', startDate: '2024-04-25', endDate: '2024-04-28', days: 3, status: 'Pending' },
    { id: 4, employee: 'Sarah Williams', type: 'Family Emergency', startDate: '2024-04-05', endDate: '2024-04-07', days: 2, status: 'Rejected' },
  ];
  
  const leaveBalances = [
    { id: 1, employee: 'John Doe', annual: 20, annualUsed: 8, sick: 14, sickUsed: 2, unpaid: 0 },
    { id: 2, employee: 'Jane Smith', annual: 18, annualUsed: 12, sick: 14, sickUsed: 8, unpaid: 0 },
    { id: 3, employee: 'Mike Johnson', annual: 15, annualUsed: 3, sick: 10, sickUsed: 0, unpaid: 0 },
    { id: 4, employee: 'Sarah Williams', annual: 22, annualUsed: 15, sick: 14, sickUsed: 5, unpaid: 2 },
  ];
  
  const leaveTypes = [
    { id: 1, name: 'Annual Leave', days: 21, carryForward: true, maxCarryDays: 5 },
    { id: 2, name: 'Sick Leave', days: 14, carryForward: false, maxCarryDays: 0 },
    { id: 3, name: 'Maternity Leave', days: 90, carryForward: false, maxCarryDays: 0 },
    { id: 4, name: 'Paternity Leave', days: 14, carryForward: false, maxCarryDays: 0 },
    { id: 5, name: 'Unpaid Leave', days: '-', carryForward: false, maxCarryDays: 0 },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="requests">
            <Clock className="mr-2 h-4 w-4" />
            Leave Requests
          </TabsTrigger>
          <TabsTrigger value="balances">
            <Calendar className="mr-2 h-4 w-4" />
            Leave Balances
          </TabsTrigger>
          <TabsTrigger value="policies">
            <CheckCircle className="mr-2 h-4 w-4" />
            Leave Policies
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>Review and manage employee leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Status filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="annual">Annual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  New Leave Request
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead className="hidden md:table-cell">Start Date</TableHead>
                    <TableHead className="hidden md:table-cell">End Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employee}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.startDate}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.endDate}</TableCell>
                      <TableCell>{request.days}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {request.status === 'Pending' && (
                            <>
                              <Button size="sm" variant="outline" className="h-8 px-2 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 px-2 text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="ghost" className="h-8">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balances" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balances</CardTitle>
              <CardDescription>Track employee leave balances and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Annual Leave</TableHead>
                    <TableHead>Sick Leave</TableHead>
                    <TableHead>Unpaid Leave</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveBalances.map((balance) => (
                    <TableRow key={balance.id}>
                      <TableCell className="font-medium">{balance.employee}</TableCell>
                      <TableCell>{balance.annualUsed} / {balance.annual} days</TableCell>
                      <TableCell>{balance.sickUsed} / {balance.sick} days</TableCell>
                      <TableCell>{balance.unpaid} days</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost">Adjust</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Leave Policies</CardTitle>
              <CardDescription>Configure company leave policies and entitlements</CardDescription>
              <Button className="mt-2">
                Add Leave Type
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Days Per Year</TableHead>
                    <TableHead>Carry Forward</TableHead>
                    <TableHead>Max Carry Days</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell>{type.days}</TableCell>
                      <TableCell>{type.carryForward ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{type.maxCarryDays}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-600">Delete</Button>
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
    </div>
  );
};

export default CompanyLeave;
