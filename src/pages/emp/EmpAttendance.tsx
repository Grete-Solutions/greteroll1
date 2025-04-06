
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';

const EmpAttendance = () => {
  // Sample attendance data
  const attendanceRecords = [
    { date: '2025-04-06', status: 'Present', hoursWorked: '8:00', timeIn: '09:00', timeOut: '17:00' },
    { date: '2025-04-05', status: 'Present', hoursWorked: '8:00', timeIn: '09:00', timeOut: '17:00' },
    { date: '2025-04-04', status: 'Present', hoursWorked: '8:00', timeIn: '09:00', timeOut: '17:00' },
    { date: '2025-04-03', status: 'Present', hoursWorked: '8:00', timeIn: '09:00', timeOut: '17:00' },
    { date: '2025-04-02', status: 'Absent', hoursWorked: '0:00', timeIn: '-', timeOut: '-' },
    { date: '2025-04-01', status: 'Present', hoursWorked: '8:00', timeIn: '09:00', timeOut: '17:00' },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">My Attendance</h1>
      
      {/* Monthly Summary Card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Present Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20/22</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Absent Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/22</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160/176</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Attendance History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>Your recent attendance records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Time In</th>
                  <th className="text-left px-4 py-3">Time Out</th>
                  <th className="text-left px-4 py-3">Hours Worked</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">{record.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{record.timeIn}</td>
                    <td className="px-4 py-3">{record.timeOut}</td>
                    <td className="px-4 py-3">{record.hoursWorked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Monthly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>April 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar className="h-48 w-48 text-gray-400" />
            <p className="mt-4 text-center text-sm text-muted-foreground">Calendar view will display your monthly attendance pattern</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpAttendance;
