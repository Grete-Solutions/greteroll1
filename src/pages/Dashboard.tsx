
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, Calendar, Server, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Legend } from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const activityData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 590 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 100 },
  ];

  const payrollModeData = [
    { name: 'Monthly', value: 65 },
    { name: 'Bi-weekly', value: 25 },
    { name: 'Weekly', value: 10 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Companies Registered"
          value="42"
          icon={<Building className="h-8 w-8 text-blue-500" />}
          change="+3 this month"
          positive={true}
        />
        <StatCard
          title="Active Payrolls"
          value="36"
          icon={<Calendar className="h-8 w-8 text-green-500" />}
          change="Processing 90%"
          positive={true}
        />
        <StatCard
          title="Total Employees"
          value="1,248"
          icon={<Users className="h-8 w-8 text-purple-500" />}
          change="+24 this week"
          positive={true}
        />
        <StatCard
          title="System Status"
          value="Online"
          icon={<Server className="h-8 w-8 text-teal-500" />}
          change="Last backup: 2h ago"
          positive={true}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
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
            <CardTitle>Payroll Modes Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payrollModeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {payrollModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Event</th>
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Company</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <ActivityRow
                  event="Login"
                  user="John Smith (Company Admin)"
                  company="Acme Inc."
                  timestamp="10 minutes ago"
                />
                <ActivityRow
                  event="Payroll Process"
                  user="System"
                  company="TechCorp"
                  timestamp="1 hour ago"
                />
                <ActivityRow
                  event="Employee Added"
                  user="Sarah Miller (HR Manager)"
                  company="Global Foods"
                  timestamp="3 hours ago"
                />
                <ActivityRow
                  event="Company Settings Updated"
                  user="You"
                  company="Acme Inc."
                  timestamp="5 hours ago"
                />
                <ActivityRow
                  event="System Backup"
                  user="System"
                  company="All"
                  timestamp="12 hours ago"
                />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  positive,
}) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p
              className={`text-xs mt-1 ${
                positive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {change}
            </p>
          </div>
          <div className="rounded-full p-3 bg-gray-50">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityRowProps {
  event: string;
  user: string;
  company: string;
  timestamp: string;
}

const ActivityRow: React.FC<ActivityRowProps> = ({
  event,
  user,
  company,
  timestamp,
}) => {
  return (
    <tr className="border-b">
      <td className="py-3 px-4">{event}</td>
      <td className="py-3 px-4">{user}</td>
      <td className="py-3 px-4">{company}</td>
      <td className="py-3 px-4 text-gray-500">{timestamp}</td>
    </tr>
  );
};

export default Dashboard;
