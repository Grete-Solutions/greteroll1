
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, AlertCircle, FileUp, Download, Search, Plus, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyEmployees = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'all',
    status: 'all',
    contractType: 'all'
  });

  const handleFilterChange = (value: string, filter: string) => {
    setFilters(prev => ({ ...prev, [filter]: value }));
  };

  // Mock data for employees
  const employees = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', position: 'Senior Developer', status: 'Active', contractType: 'Full-time', hireDate: '2022-03-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Marketing', position: 'Marketing Manager', status: 'Active', contractType: 'Full-time', hireDate: '2021-06-22' },
    { id: 3, name: 'Michael Chen', email: 'michael.chen@company.com', department: 'Engineering', position: 'Frontend Developer', status: 'Active', contractType: 'Full-time', hireDate: '2023-01-10' },
    { id: 4, name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', department: 'Sales', position: 'Sales Representative', status: 'Active', contractType: 'Full-time', hireDate: '2022-08-05' },
    { id: 5, name: 'David Kim', email: 'david.kim@company.com', department: 'Finance', position: 'Financial Analyst', status: 'Active', contractType: 'Full-time', hireDate: '2021-11-18' },
    { id: 6, name: 'Jessica Lee', email: 'jessica.lee@company.com', department: 'Operations', position: 'Operations Manager', status: 'On Leave', contractType: 'Full-time', hireDate: '2020-04-30' },
    { id: 7, name: 'Robert Taylor', email: 'robert.taylor@company.com', department: 'Engineering', position: 'Backend Developer', status: 'Active', contractType: 'Contract', hireDate: '2023-03-01' },
    { id: 8, name: 'Amanda White', email: 'amanda.white@company.com', department: 'Human Resources', position: 'HR Specialist', status: 'Active', contractType: 'Part-time', hireDate: '2022-05-12' },
    { id: 9, name: 'Daniel Brown', email: 'daniel.brown@company.com', department: 'Marketing', position: 'Content Creator', status: 'Suspended', contractType: 'Contract', hireDate: '2023-02-15' },
    { id: 10, name: 'Nicole Garcia', email: 'nicole.garcia@company.com', department: 'Sales', position: 'Sales Lead', status: 'Active', contractType: 'Full-time', hireDate: '2021-09-08' },
  ];

  // Filter employees based on search term and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === 'all' || employee.department === filters.department;
    const matchesStatus = filters.status === 'all' || employee.status === filters.status;
    const matchesContractType = filters.contractType === 'all' || employee.contractType === filters.contractType;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesContractType;
  });

  // Department filter options
  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'Finance', 'Operations', 'Human Resources'];
  
  // Status filter options
  const statuses = ['All', 'Active', 'On Leave', 'Suspended'];
  
  // Contract type filter options
  const contractTypes = ['All', 'Full-time', 'Part-time', 'Contract'];

  // Handle bulk upload
  const handleBulkUpload = () => {
    toast({
      title: "Bulk upload initiated",
      description: "Please select your employee data file (.csv, .xlsx)",
    });
  };

  // Handle export
  const handleExport = () => {
    toast({
      title: "Export started",
      description: "The employee data export will download shortly",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Employee Management</h1>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2">
                <UserPlus className="h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Enter the details for the new employee. All fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="personal" className="mt-5">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="work">Work</TabsTrigger>
                  <TabsTrigger value="salary">Salary</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name *</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name *</Label>
                      <Input id="last-name" placeholder="Smith" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john.smith@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St, City, State, ZIP" />
                  </div>
                </TabsContent>
                <TabsContent value="work" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Department *</Label>
                      <Select>
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.slice(1).map((dept) => (
                            <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position/Role *</Label>
                      <Input id="position" placeholder="Software Developer" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contract-type">Contract Type *</Label>
                      <Select>
                        <SelectTrigger id="contract-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {contractTypes.slice(1).map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hire-date">Hire Date *</Label>
                      <Input id="hire-date" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager">Reports To</Label>
                    <Select>
                      <SelectTrigger id="manager">
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id.toString()}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="salary" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="base-salary">Base Salary/Rate *</Label>
                      <Input id="base-salary" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary-frequency">Frequency</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger id="salary-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" placeholder="Bank name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-account">Account Number</Label>
                      <Input id="bank-account" placeholder="Account number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-id">Tax ID/SSN</Label>
                    <Input id="tax-id" placeholder="Tax ID or Social Security Number" />
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="id-document">ID Document</Label>
                    <Input id="id-document" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contract-document">Employment Contract</Label>
                    <Input id="contract-document" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other-documents">Other Supporting Documents</Label>
                    <Input id="other-documents" type="file" multiple />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Save Employee</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleBulkUpload} className="flex gap-2">
            <FileUp className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>All Employees</CardTitle>
              <CardDescription>Manage your company's employees</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search employees..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label className="text-sm font-medium mb-1 block">Department</Label>
              <Select
                defaultValue="all"
                onValueChange={(value) => handleFilterChange(value, 'department')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem 
                      key={dept} 
                      value={dept === 'All' ? 'all' : dept}
                    >
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium mb-1 block">Status</Label>
              <Select
                defaultValue="all"
                onValueChange={(value) => handleFilterChange(value, 'status')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem 
                      key={status} 
                      value={status === 'All' ? 'all' : status}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label className="text-sm font-medium mb-1 block">Contract Type</Label>
              <Select
                defaultValue="all"
                onValueChange={(value) => handleFilterChange(value, 'contractType')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by contract" />
                </SelectTrigger>
                <SelectContent>
                  {contractTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type === 'All' ? 'all' : type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contract</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${employee.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : employee.status === 'On Leave'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell>{employee.contractType}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <AlertCircle className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No employees found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyEmployees;
