
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Eye, Pencil, Ban, Trash2 } from 'lucide-react';

const EmployeeManagement = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    company: '',
    department: '',
    status: ''
  });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Mock data for employees
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'John Doe', company: 'Acme Inc', position: 'Software Developer', status: 'Active', email: 'john.doe@acme.com', department: 'Engineering', hireDate: '2022-05-10' },
    { id: 'EMP002', name: 'Jane Smith', company: 'Globex Corp', position: 'HR Manager', status: 'Active', email: 'jane.smith@globex.com', department: 'Human Resources', hireDate: '2021-03-15' },
    { id: 'EMP003', name: 'Mike Johnson', company: 'Acme Inc', position: 'Sales Representative', status: 'Suspended', email: 'mike.johnson@acme.com', department: 'Sales', hireDate: '2023-01-20' },
    { id: 'EMP004', name: 'Sarah Williams', company: 'Initech', position: 'Project Manager', status: 'Active', email: 'sarah.williams@initech.com', department: 'Project Management', hireDate: '2022-08-05' },
    { id: 'EMP005', name: 'David Brown', company: 'Globex Corp', position: 'Financial Analyst', status: 'Active', email: 'david.brown@globex.com', department: 'Finance', hireDate: '2023-04-12' },
  ]);

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
      (filters.status === '' || filters.status === 'All' || employee.status === filters.status) &&
      (filters.department === '' || filters.department === 'All' || employee.department === filters.department)
    );
  });

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setViewDialogOpen(true);
  };

  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee({...employee});
    setEditDialogOpen(true);
  };

  const handleSuspendEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setSuspendDialogOpen(true);
  };

  const confirmSuspendEmployee = () => {
    setEmployees(
      employees.map(emp => 
        emp.id === selectedEmployee.id 
          ? {...emp, status: emp.status === 'Active' ? 'Suspended' : 'Active'} 
          : emp
      )
    );
    
    toast({
      title: selectedEmployee.status === 'Active' ? "Employee Suspended" : "Employee Activated",
      description: `${selectedEmployee.name} has been ${selectedEmployee.status === 'Active' ? 'suspended' : 'activated'}.`
    });
    
    setSuspendDialogOpen(false);
  };

  const handleDeleteEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteEmployee = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    
    toast({
      title: "Employee Deleted",
      description: `${selectedEmployee.name} has been permanently removed.`,
    });
    
    setDeleteDialogOpen(false);
  };

  const handleSaveEmployee = () => {
    setEmployees(
      employees.map(emp => 
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      )
    );
    
    toast({
      title: "Employee Updated",
      description: `${selectedEmployee.name}'s information has been updated.`
    });
    
    setEditDialogOpen(false);
  };

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
                      <Button variant="ghost" size="sm" onClick={() => handleViewEmployee(employee)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(employee)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSuspendEmployee(employee)}>
                        <Ban className="h-4 w-4" color={employee.status === 'Active' ? 'currentColor' : 'green'} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteEmployee(employee)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Employee Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              View complete information for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Employee ID</h3>
                  <p className="mt-1">{selectedEmployee.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1">{selectedEmployee.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedEmployee.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="mt-1">{selectedEmployee.company}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="mt-1">{selectedEmployee.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Position</h3>
                  <p className="mt-1">{selectedEmployee.position}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedEmployee.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedEmployee.status}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Hire Date</h3>
                  <p className="mt-1">{selectedEmployee.hireDate}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Modify employee information for {selectedEmployee?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={selectedEmployee.name} 
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={selectedEmployee.email}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedEmployee.status}
                    onValueChange={(value) => setSelectedEmployee({...selectedEmployee, status: value})}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="employment" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Select 
                    value={selectedEmployee.company}
                    onValueChange={(value) => setSelectedEmployee({...selectedEmployee, company: value})}
                  >
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.filter(c => c !== 'All').map((company) => (
                        <SelectItem key={company} value={company}>{company}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={selectedEmployee.department}
                    onValueChange={(value) => setSelectedEmployee({...selectedEmployee, department: value})}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.filter(d => d !== 'All').map((department) => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input 
                    id="position" 
                    value={selectedEmployee.position}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, position: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">Hire Date</Label>
                  <Input 
                    id="hireDate" 
                    type="date"
                    value={selectedEmployee.hireDate}
                    onChange={(e) => setSelectedEmployee({...selectedEmployee, hireDate: e.target.value})}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Enter address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input 
                    id="emergencyContact" 
                    placeholder="Enter emergency contact"
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEmployee}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend/Activate Employee Dialog */}
      <AlertDialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedEmployee?.status === 'Active' ? 'Suspend Employee' : 'Activate Employee'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedEmployee?.status === 'Active' 
                ? `Are you sure you want to suspend ${selectedEmployee?.name}? They will no longer be able to access the system.`
                : `Are you sure you want to activate ${selectedEmployee?.name}? They will regain access to the system.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmSuspendEmployee}
              className={selectedEmployee?.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
            >
              {selectedEmployee?.status === 'Active' ? 'Suspend' : 'Activate'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Employee Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedEmployee?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteEmployee}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeManagement;
