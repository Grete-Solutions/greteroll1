
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from '@/components/ui/dialog';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { 
  FileDown, 
  Filter, 
  Info, 
  Check, 
  X, 
  AlertTriangle 
} from 'lucide-react';

const AuditLogs = () => {
  // State for filters
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 2, 1), // March 1, 2023
    to: new Date(2023, 2, 31)   // March 31, 2023
  });
  const [actionType, setActionType] = useState('all');
  const [userRole, setUserRole] = useState('all');
  const [selectedLog, setSelectedLog] = useState<any>(null);

  // Mock data for audit logs
  const auditLogs = [
    { 
      id: 1, 
      timestamp: '2023-03-15 09:32:45', 
      action: 'Login', 
      entity: 'System', 
      entityId: null,
      user: 'John Smith', 
      userRole: 'Super Admin',
      ipAddress: '192.168.1.105',
      successful: true,
      details: 'User logged in successfully'
    },
    { 
      id: 2, 
      timestamp: '2023-03-15 10:15:22', 
      action: 'Update', 
      entity: 'Company', 
      entityId: 'COMP001',
      user: 'John Smith', 
      userRole: 'Super Admin',
      ipAddress: '192.168.1.105',
      successful: true,
      details: 'Updated company profile for Acme Inc.'
    },
    { 
      id: 3, 
      timestamp: '2023-03-14 16:45:33', 
      action: 'Create', 
      entity: 'Employee', 
      entityId: 'EMP042',
      user: 'Sarah Johnson', 
      userRole: 'Company Admin',
      ipAddress: '192.168.1.110',
      successful: true,
      details: 'Created new employee Michael Chen'
    },
    { 
      id: 4, 
      timestamp: '2023-03-14 14:22:01', 
      action: 'Delete', 
      entity: 'Payroll Record', 
      entityId: 'PAY2023-03',
      user: 'Jane Wilson', 
      userRole: 'Manager',
      ipAddress: '192.168.1.115',
      successful: false,
      details: 'Attempted to delete March 2023 payroll record. Insufficient permissions.'
    },
    { 
      id: 5, 
      timestamp: '2023-03-13 11:05:17', 
      action: 'Access', 
      entity: 'Reports', 
      entityId: 'REP-TAX-Q1',
      user: 'Robert Davis', 
      userRole: 'Company Admin',
      ipAddress: '192.168.1.108',
      successful: true,
      details: 'Accessed Q1 Tax Report for Globex Corp'
    },
    { 
      id: 6, 
      timestamp: '2023-03-13 09:58:33', 
      action: 'Update', 
      entity: 'System Settings', 
      entityId: null,
      user: 'John Smith', 
      userRole: 'Super Admin',
      ipAddress: '192.168.1.105',
      successful: true,
      details: 'Updated password policy settings'
    },
    { 
      id: 7, 
      timestamp: '2023-03-12 15:30:42', 
      action: 'Login', 
      entity: 'System', 
      entityId: null,
      user: 'Unknown', 
      userRole: 'Unknown',
      ipAddress: '203.0.113.45',
      successful: false,
      details: 'Failed login attempt for username admin'
    },
  ];

  // Action type options
  const actionTypes = [
    'All Actions', 'Login', 'Logout', 'Create', 'Update', 'Delete', 'Access'
  ];

  // User role options
  const userRoles = [
    'All Roles', 'Super Admin', 'Company Admin', 'Manager', 'Employee'
  ];

  // Filter the logs based on selected filters
  const filteredLogs = auditLogs.filter(log => {
    const logDate = new Date(log.timestamp.split(' ')[0]);
    const dateMatches = !dateRange?.from || !dateRange?.to || 
      (logDate >= dateRange.from && logDate <= dateRange.to);
    
    const actionMatches = actionType === 'all' || 
      actionType === 'All Actions' || 
      log.action === actionType;
    
    const roleMatches = userRole === 'all' || 
      userRole === 'All Roles' || 
      log.userRole === userRole;
    
    return dateMatches && actionMatches && roleMatches;
  });

  // Show log details
  const showLogDetails = (log: any) => {
    setSelectedLog(log);
  };

  const getStatusIcon = (successful: boolean) => {
    return successful ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    );
  };

  const getActionTypeIcon = (action: string) => {
    switch(action) {
      case 'Login':
      case 'Logout':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
      case 'Create':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
      case 'Update':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
      case 'Delete':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
      case 'Access':
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">{action}</span>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>System activity and change history</CardDescription>
            </div>
            <Button variant="outline" className="hidden md:flex">
              <FileDown className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-5">
              <label className="text-sm font-medium mb-1 block">Date Range</label>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>
            <div className="md:col-span-3">
              <label className="text-sm font-medium mb-1 block">Action Type</label>
              <Select defaultValue="all" onValueChange={setActionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3">
              <label className="text-sm font-medium mb-1 block">User Role</label>
              <Select defaultValue="all" onValueChange={setUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role} value={role.toLowerCase()}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Entity</TableHead>
                  <TableHead>Performed By</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      {getActionTypeIcon(log.action)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {log.entity}
                      {log.entityId && <span className="ml-1 text-gray-500 text-xs">({log.entityId})</span>}
                    </TableCell>
                    <TableCell>
                      <div>{log.user}</div>
                      <div className="text-xs text-gray-500">{log.userRole}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        {getStatusIcon(log.successful)}
                        <span className="ml-1">{log.successful ? 'Success' : 'Failed'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => showLogDetails(log)}
                          >
                            <Info className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Audit Log Details</DialogTitle>
                            <DialogDescription>
                              {selectedLog?.timestamp}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Action</h4>
                                <p>{selectedLog?.action}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Entity</h4>
                                <p>{selectedLog?.entity} {selectedLog?.entityId && `(${selectedLog.entityId})`}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">User</h4>
                                <p>{selectedLog?.user}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Role</h4>
                                <p>{selectedLog?.userRole}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">IP Address</h4>
                                <p>{selectedLog?.ipAddress}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                                <p className="flex items-center">
                                  {selectedLog && getStatusIcon(selectedLog.successful)}
                                  <span className="ml-1">
                                    {selectedLog?.successful ? 'Success' : 'Failed'}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Details</h4>
                              <p className="mt-1">{selectedLog?.details}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredLogs.length} of {auditLogs.length} logs
          </div>
          <Button variant="outline" className="md:hidden">
            <FileDown className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuditLogs;
