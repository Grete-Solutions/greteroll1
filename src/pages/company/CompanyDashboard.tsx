
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';
import { Users, DollarSign, Calendar, Clock, AlertCircle } from 'lucide-react';

const CompanyDashboard = () => {
  // Mock data for charts
  const payrollHistoryData = [
    { month: 'Jan', amount: 86500 },
    { month: 'Feb', amount: 89200 },
    { month: 'Mar', amount: 88100 },
    { month: 'Apr', amount: 90500 },
    { month: 'May', amount: 92300 },
    { month: 'Jun', amount: 91800 },
  ];

  const salaryDistributionData = [
    { role: 'Executive', count: 3, salary: 25000 },
    { role: 'Manager', count: 12, salary: 15000 },
    { role: 'Senior', count: 18, salary: 10000 },
    { role: 'Junior', count: 25, salary: 5000 },
    { role: 'Associate', count: 15, salary: 3500 },
  ];

  // Mock data for stats
  const stats = {
    totalEmployees: 73,
    totalMonthlyPayroll: '$92,300',
    upcomingPayroll: {
      date: '2025-04-15',
      status: 'Pending'
    },
    pendingApprovals: 5,
    leaveRequests: 3
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Company Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            Run Payroll
          </Button>
          <Button variant="outline">
            Add Employee
          </Button>
          <Button variant="outline">
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees.toString()}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          linkText="View all employees"
          linkUrl="/company/employees"
        />
        <StatCard
          title="Monthly Payroll"
          value={stats.totalMonthlyPayroll}
          icon={<DollarSign className="h-8 w-8 text-green-500" />}
          linkText="View details"
          linkUrl="/company/payroll"
        />
        <StatCard
          title="Upcoming Payroll"
          value={new Date(stats.upcomingPayroll.date).toLocaleDateString()}
          icon={<Calendar className="h-8 w-8 text-purple-500" />}
          linkText={stats.upcomingPayroll.status}
          linkUrl="/company/payroll"
          badgeColor="bg-yellow-100 text-yellow-800"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals.toString()}
          icon={<AlertCircle className="h-8 w-8 text-orange-500" />}
          linkText="View approvals"
          linkUrl="/company/approvals"
          badgeColor="bg-orange-100 text-orange-800"
        />
        <StatCard
          title="Leave Requests"
          value={stats.leaveRequests.toString()}
          icon={<Clock className="h-8 w-8 text-teal-500" />}
          linkText="View requests"
          linkUrl="/company/leave"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payroll History (6 Months)</CardTitle>
            <CardDescription>Monthly payroll expense trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollHistoryData}>
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>By employee role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryDistributionData}>
                  <XAxis dataKey="role" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="count" name="Number of Employees" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="salary" name="Average Salary ($)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Activity</th>
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <ActivityRow
                  activity="Salary change request"
                  employee="Sarah Johnson"
                  department="Marketing"
                  date="2025-04-06"
                  status="Pending approval"
                  statusColor="text-yellow-600 bg-yellow-100"
                />
                <ActivityRow
                  activity="Leave request"
                  employee="Michael Chen"
                  department="Engineering"
                  date="2025-04-05"
                  status="Approved"
                  statusColor="text-green-600 bg-green-100"
                />
                <ActivityRow
                  activity="New hire onboarding"
                  employee="Emily Rodriguez"
                  department="Sales"
                  date="2025-04-04"
                  status="In progress"
                  statusColor="text-blue-600 bg-blue-100"
                />
                <ActivityRow
                  activity="Bonus payment processed"
                  employee="David Kim"
                  department="Finance"
                  date="2025-04-03"
                  status="Completed"
                  statusColor="text-green-600 bg-green-100"
                />
                <ActivityRow
                  activity="Overtime request"
                  employee="Jessica Lee"
                  department="Operations"
                  date="2025-04-02"
                  status="Rejected"
                  statusColor="text-red-600 bg-red-100"
                />
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">View All Activities</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
  badgeColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  linkText,
  linkUrl,
  badgeColor = "bg-blue-100 text-blue-800"
}) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <a
              href={linkUrl}
              className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${badgeColor}`}
            >
              {linkText}
            </a>
          </div>
          <div className="rounded-full p-3 bg-gray-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityRowProps {
  activity: string;
  employee: string;
  department: string;
  date: string;
  status: string;
  statusColor: string;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
  activity,
  employee,
  department,
  date,
  status,
  statusColor
}) => {
  return (
    <tr className="border-b">
      <td className="py-3 px-4">{activity}</td>
      <td className="py-3 px-4">{employee}</td>
      <td className="py-3 px-4">{department}</td>
      <td className="py-3 px-4">{date}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default CompanyDashboard;
