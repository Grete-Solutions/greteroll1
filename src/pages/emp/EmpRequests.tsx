
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { PlusCircle, FileText, Calendar, Clock, User, Clock3, MessageCircle, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type RequestCategory = 'Profile Update' | 'Leave' | 'Time Adjustment' | 'Document' | 'Other';
type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

interface Request {
  id: string;
  category: RequestCategory;
  title: string;
  description: string;
  submittedDate: Date;
  status: RequestStatus;
  feedback?: string;
  approver?: string;
}

const EmpRequests = () => {
  const { toast } = useToast();
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<RequestCategory>('Profile Update');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Mock data for requests
  const requests: Request[] = [
    {
      id: 'REQ-2025-001',
      category: 'Profile Update',
      title: 'Update phone number',
      description: 'I need to update my contact phone number to (555) 123-4567',
      submittedDate: new Date('2025-03-15'),
      status: 'Approved',
      feedback: 'Contact information updated in system',
      approver: 'Sarah Johnson'
    },
    {
      id: 'REQ-2025-002',
      category: 'Leave',
      title: 'Annual leave request',
      description: 'Requesting annual leave from April 15-20 for family vacation',
      submittedDate: new Date('2025-04-01'),
      status: 'Pending'
    },
    {
      id: 'REQ-2025-003',
      category: 'Time Adjustment',
      title: 'Missing clock-out on March 10',
      description: 'I forgot to clock out on March 10. Left office at 6:30 PM',
      submittedDate: new Date('2025-03-12'),
      status: 'Approved',
      feedback: 'Timesheet updated accordingly',
      approver: 'Michael Wong'
    },
    {
      id: 'REQ-2025-004',
      category: 'Document',
      title: 'Income tax certificate',
      description: 'Requesting income tax certificate for fiscal year 2024',
      submittedDate: new Date('2025-02-25'),
      status: 'Rejected',
      feedback: 'Please fill out the tax certificate request form instead',
      approver: 'Finance Department'
    }
  ];

  const handleSubmitNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requestTitle || !requestDescription) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Request Submitted",
      description: `Your ${selectedCategory.toLowerCase()} request has been submitted for review.`
    });
    
    // Close dialog and reset form
    setIsNewRequestOpen(false);
    setRequestTitle('');
    setRequestDescription('');
    setSelectedCategory('Profile Update');
  };
  
  const getCategoryIcon = (category: RequestCategory) => {
    switch(category) {
      case 'Profile Update': return <User className="h-4 w-4" />;
      case 'Leave': return <Calendar className="h-4 w-4" />;
      case 'Time Adjustment': return <Clock className="h-4 w-4" />;
      case 'Document': return <FileText className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };
  
  const getStatusIcon = (status: RequestStatus) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="h-4 w-4" />;
      case 'Rejected': return <X className="h-4 w-4" />;
      default: return <Clock3 className="h-4 w-4" />;
    }
  };
  
  const getStatusStyle = (status: RequestStatus) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const filteredRequests = requests.filter(request => {
    if (statusFilter !== "all" && request.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (categoryFilter !== "all" && request.category.toLowerCase().replace(' ', '') !== categoryFilter.toLowerCase()) return false;
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
        <Button onClick={() => setIsNewRequestOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>View status of all your requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Label htmlFor="categoryFilter" className="mb-2 block">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoryFilter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="profileupdate">Profile Update</SelectItem>
                  <SelectItem value="leave">Leave</SelectItem>
                  <SelectItem value="timeadjustment">Time Adjustment</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(request.category)}
                        <span>{request.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{format(request.submittedDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${getStatusStyle(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {request.feedback || 'No feedback yet'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No requests found matching the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Request</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmitNewRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Request Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as RequestCategory)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Profile Update">Profile Update</SelectItem>
                  <SelectItem value="Leave">Leave Request</SelectItem>
                  <SelectItem value="Time Adjustment">Time Adjustment</SelectItem>
                  <SelectItem value="Document">Document Request</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <div className="flex items-center">
                {getCategoryIcon(selectedCategory)}
                <input
                  id="title"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ml-2 flex-1"
                  placeholder={`Enter ${selectedCategory.toLowerCase()} title`}
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Request Details</Label>
              <Textarea
                id="description"
                placeholder={`Please provide details for your ${selectedCategory.toLowerCase()} request`}
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            
            {selectedCategory === 'Profile Update' && (
              <div className="rounded-md bg-amber-50 p-4 border border-amber-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      For simple profile updates like phone number or address, you can also make these changes directly in your profile page.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setIsNewRequestOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpRequests;
