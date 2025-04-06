
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Pencil, XCircle } from 'lucide-react';

const EmployeeManagement = () => {
  const [filters, setFilters] = useState({
    company: '',
    department: '',
    status: ''
  });

  // Mock data for employees
  const employees = [
    { id: 'EMP001', name: 'John Doe', company: 'Acme Inc', position: 'Software Developer', status: 'Active' },
    { id: 'EMP002', name: 'Jane Smith', company: 'Globex Corp', position: 'HR Manager', status: 'Active' },
    { id: 'EMP003', name: 'Mike Johnson', company: 'Acme Inc', position: 'Sales Representative', status: 'Suspended' },
    { id: 'EMP004', name: 'Sarah Williams', company: 'Initech', position: 'Project Manager', status: 'Active' },
    { id: 'EMP005', name: 'David Brown', company: 'Globex Corp', position: 'Financial Analyst', status: 'Active' },
  ];

  // Mock data for filter options
  const companies = ['All', 'Acme Inc', 'Globex Corp', 'Initech'];
  const departments = ['All', 'Engineering', 'Human Resources', 'Sales', 'Finance', 'Project Management'];
  const statuses = ['All', 'Active', 'Suspended'];

  const handleFilterChange = (value: string, filter: string) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      (filters.company === '' || filters.company === 'All' || employee.company === filters.company) &&
      (filters.status === '' || filters.status === 'All' || employee.status === filters.status)
      // Department filter would apply here if we had department data
    );
  });

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Company</label>
              <Select onValueChange={(value) => handleFilterChange(value, 'company')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Department</label>
              <Select onValueChange={(value) => handleFilterChange(value, 'department')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select onValueChange={(value) => handleFilterChange(value, 'status')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.company}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <XCircle className="h-4 w-4" />
                      </Button>
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

export default EmployeeManagement;
