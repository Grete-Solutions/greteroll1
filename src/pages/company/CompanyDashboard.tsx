import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, ArrowDown, DollarSign, Users, Clock, Calendar } from 'lucide-react';
import ActivityLogs from '@/components/logs/ActivityLogs';

const CompanyDashboard = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your company dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Employees"
          value="124"
          change="+4"
          changeType="increase"
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard 
          title="Payroll Processed"
          value="$45,231"
          change="+2.5%"
          changeType="increase"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatCard 
          title="Leave Requests"
          value="8"
          change="+3"
          changeType="increase"
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatCard 
          title="Pending Approvals"
          value="5"
          change="-2"
          changeType="decrease"
          icon={<Clock className="h-6 w-6" />}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PendingCard />
          <UpcomingCard />
          <AttendanceCard />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityLogs />
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Department chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payroll Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Payroll trend chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatCard = ({ title, value, change, changeType, icon }: { 
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              <div className={`ml-2 flex items-center text-sm ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {change}
              </div>
            </div>
          </div>
          <div className="p-2 bg-gray-100 rounded-full dark:bg-gray-800">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PendingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>Leave Request - John Doe</span>
            <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Expense Claim - Jane Smith</span>
            <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Overtime Request - Alex Johnson</span>
            <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

const UpcomingCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>Payroll Processing</span>
            <span className="text-sm text-gray-500">Tomorrow</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Department Meeting</span>
            <span className="text-sm text-gray-500">3 days</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Tax Filing Deadline</span>
            <span className="text-sm text-gray-500">Next week</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

const AttendanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Present</span>
            <div className="flex items-center">
              <div className="h-2.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">85%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>Absent</span>
            <div className="flex items-center">
              <div className="h-2.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '8%' }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">8%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span>On Leave</span>
            <div className="flex items-center">
              <div className="h-2.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '7%' }}></div>
              </div>
              <span className="ml-2 text-sm font-medium">7%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDashboard;
