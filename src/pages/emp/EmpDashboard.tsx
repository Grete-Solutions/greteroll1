
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Calendar, DollarSign, Clock, Info, AlertTriangle } from 'lucide-react';

const EmpDashboard = () => {
  // Example data that would normally come from an API
  const nextPayDate = '2025-04-30';
  const lastPaidAmount = '$3,250.00';
  const leaveBalance = 15;
  const isClockedIn = false;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Payroll Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary mr-2" />
              <span className="text-lg font-bold">{formatDate(nextPayDate)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-lg font-bold">{lastPaidAmount}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leave Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-lg font-bold">{leaveBalance} days</span>
            </div>
            <Button variant="link" className="p-0 h-auto mt-2 text-sm">Request Leave</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            {isClockedIn ? (
              <Button variant="outline" className="w-full bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700">
                <Clock className="mr-2 h-4 w-4" />
                Clock Out
              </Button>
            ) : (
              <Button variant="outline" className="w-full bg-green-50 border-green-200 text-green-600 hover:bg-green-100 hover:text-green-700">
                <Clock className="mr-2 h-4 w-4" />
                Clock In
              </Button>
            )}
            <div className="text-xs text-muted-foreground mt-2 text-center">
              {isClockedIn ? 'Working since 9:00 AM' : 'Not clocked in'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Alerts & Notifications</h2>
        
        <Alert variant="default">
          <Info className="h-4 w-4" />
          <AlertTitle>Upcoming Company Meeting</AlertTitle>
          <AlertDescription>
            All-hands meeting scheduled for Friday, April 10th at 3:00 PM.
          </AlertDescription>
        </Alert>
        
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Leave Request Pending</AlertTitle>
          <AlertDescription>
            Your leave request for April 15-20 is awaiting manager approval.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default EmpDashboard;
