
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, XCircle } from 'lucide-react';

const CompanyApprovals = () => {
  const [approvalFilter, setApprovalFilter] = useState('all');
  
  const approvals = [
    { 
      id: 1, 
      requestType: 'Profile Change', 
      submittedBy: 'John Doe', 
      date: '2024-04-03', 
      status: 'Pending',
      details: 'Changed department from Engineering to Product'
    },
    { 
      id: 2, 
      requestType: 'Leave Request', 
      submittedBy: 'Jane Smith', 
      date: '2024-04-02', 
      status: 'Pending',
      details: 'Annual leave: Apr 15 - Apr 20 (5 days)'
    },
    { 
      id: 3, 
      requestType: 'Payroll Adjustment', 
      submittedBy: 'Mike Johnson', 
      date: '2024-03-28', 
      status: 'Approved',
      details: 'Bonus adjustment: +$500'
    },
    { 
      id: 4, 
      requestType: 'Timesheet Modification', 
      submittedBy: 'Sarah Williams', 
      date: '2024-03-25', 
      status: 'Rejected',
      details: 'Manual time entry: March 20, 9am-6pm'
    },
    { 
      id: 5, 
      requestType: 'Expense Claim', 
      submittedBy: 'David Brown', 
      date: '2024-04-01', 
      status: 'Pending',
      details: 'Client meeting expenses: $120'
    }
  ];
  
  const filteredApprovals = approvalFilter === 'all' 
    ? approvals 
    : approvals.filter(a => a.status.toLowerCase() === approvalFilter);

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
      <h1 className="text-2xl font-bold tracking-tight">Approvals Center</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Review and manage approval requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <Select defaultValue={approvalFilter} onValueChange={setApprovalFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex space-x-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export Log
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Details</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell className="font-medium">{approval.requestType}</TableCell>
                  <TableCell>{approval.submittedBy}</TableCell>
                  <TableCell className="hidden md:table-cell">{approval.date}</TableCell>
                  <TableCell>{getStatusBadge(approval.status)}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[200px] truncate">{approval.details}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {approval.status === 'Pending' && (
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
    </div>
  );
};

export default CompanyApprovals;
