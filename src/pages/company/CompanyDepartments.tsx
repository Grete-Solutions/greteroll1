
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Edit, MoreVertical } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const CompanyDepartments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<any>(null);
  
  // Mock data for departments
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Engineering', head: 'Robert Taylor', headId: 7, employees: 12, status: 'Active', description: 'Software development and technical operations' },
    { id: 2, name: 'Marketing', head: 'Sarah Johnson', headId: 2, employees: 8, status: 'Active', description: 'Brand management and marketing campaigns' },
    { id: 3, name: 'Sales', head: 'Nicole Garcia', headId: 10, employees: 15, status: 'Active', description: 'Sales operations and customer acquisition' },
    { id: 4, name: 'Finance', head: 'David Kim', headId: 5, employees: 5, status: 'Active', description: 'Financial planning and accounting' },
    { id: 5, name: 'Operations', head: 'Jessica Lee', headId: 6, employees: 7, status: 'Active', description: 'Day-to-day business operations' },
    { id: 6, name: 'Human Resources', head: 'Amanda White', headId: 8, employees: 3, status: 'Active', description: 'Employee management and recruitment' },
    { id: 7, name: 'Research', head: 'Unassigned', headId: null, employees: 0, status: 'Inactive', description: 'Product research and development' }
  ]);

  // Mock data for employees (for department head selection)
  const employees = [
    { id: 2, name: 'Sarah Johnson', department: 'Marketing', position: 'Marketing Manager' },
    { id: 5, name: 'David Kim', department: 'Finance', position: 'Financial Analyst' },
    { id: 6, name: 'Jessica Lee', department: 'Operations', position: 'Operations Manager' },
    { id: 7, name: 'Robert Taylor', department: 'Engineering', position: 'Backend Developer' },
    { id: 8, name: 'Amanda White', department: 'Human Resources', position: 'HR Specialist' },
    { id: 10, name: 'Nicole Garcia', department: 'Sales', position: 'Sales Lead' },
  ];

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditDepartment = (department: any) => {
    setEditingDepartment({...department});
    setIsDialogOpen(true);
  };

  const handleAddDepartment = () => {
    setEditingDepartment({
      id: null,
      name: '',
      head: 'Unassigned',
      headId: null,
      employees: 0,
      status: 'Active',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveDepartment = () => {
    if (editingDepartment.name) {
      if (editingDepartment.id) {
        // Update existing department
        setDepartments(
          departments.map((dept) =>
            dept.id === editingDepartment.id ? editingDepartment : dept
          )
        );
        toast({
          title: "Department Updated",
          description: `${editingDepartment.name} has been updated successfully.`,
        });
      } else {
        // Add new department
        const newDepartment = {
          ...editingDepartment,
          id: departments.length + 1,
        };
        setDepartments([...departments, newDepartment]);
        toast({
          title: "Department Added",
          description: `${editingDepartment.name} has been added successfully.`,
        });
      }
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Department Management</h1>
        <Button onClick={handleAddDepartment} className="flex gap-2">
          <Plus className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle>All Departments</CardTitle>
              <CardDescription>Manage company departments and organizational structure</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search departments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department Name</TableHead>
                  <TableHead>Department Head</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.name}</TableCell>
                      <TableCell>{department.head}</TableCell>
                      <TableCell>{department.employees}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${department.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {department.status}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditDepartment(department)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No departments found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingDepartment?.id ? 'Edit Department' : 'Add New Department'}
            </DialogTitle>
            <DialogDescription>
              {editingDepartment?.id
                ? 'Update department information and settings'
                : 'Enter details to create a new department'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="department-name">Department Name *</Label>
              <Input
                id="department-name"
                value={editingDepartment?.name || ''}
                onChange={(e) =>
                  setEditingDepartment({ ...editingDepartment, name: e.target.value })
                }
                placeholder="Enter department name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department-head">Department Head</Label>
              <Select
                value={editingDepartment?.headId?.toString() || ''}
                onValueChange={(value) => {
                  const selectedEmployee = employees.find(emp => emp.id.toString() === value);
                  setEditingDepartment({ 
                    ...editingDepartment, 
                    headId: value ? parseInt(value) : null,
                    head: selectedEmployee ? selectedEmployee.name : 'Unassigned'
                  });
                }}
              >
                <SelectTrigger id="department-head">
                  <SelectValue placeholder="Select department head" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name} - {employee.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department-description">Description</Label>
              <Textarea
                id="department-description"
                value={editingDepartment?.description || ''}
                onChange={(e) =>
                  setEditingDepartment({ ...editingDepartment, description: e.target.value })
                }
                placeholder="Enter department description and responsibilities"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="department-status"
                checked={editingDepartment?.status === 'Active'}
                onCheckedChange={(checked) =>
                  setEditingDepartment({ 
                    ...editingDepartment, 
                    status: checked ? 'Active' : 'Inactive' 
                  })
                }
              />
              <Label htmlFor="department-status">Department Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDepartment}>Save Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyDepartments;
