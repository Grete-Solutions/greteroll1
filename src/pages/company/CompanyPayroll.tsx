
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar, ChevronRight, Download, FileText, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CompanyPayroll = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [currentPeriod, setCurrentPeriod] = useState('April 2025');
  const [isRunPayrollDialogOpen, setIsRunPayrollDialogOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [allEmployeesSelected, setAllEmployeesSelected] = useState(false);

  // Mock data for payroll history
  const payrollHistory = [
    { id: 1, period: 'March 2025', date: '2025-03-31', employees: 73, totalGross: '$90,500', status: 'Completed' },
    { id: 2, period: 'February 2025', date: '2025-02-28', employees: 72, totalGross: '$89,200', status: 'Completed' },
    { id: 3, period: 'January 2025', date: '2025-01-31', employees: 70, totalGross: '$88,100', status: 'Completed' }
  ];

  // Mock data for employees
  const employees = [
    { id: 1, name: 'John Smith', position: 'Senior Developer', department: 'Engineering', baseSalary: 6500 },
    { id: 2, name: 'Sarah Johnson', position: 'Marketing Manager', department: 'Marketing', baseSalary: 5800 },
    { id: 3, name: 'Michael Chen', position: 'Frontend Developer', department: 'Engineering', baseSalary: 4900 },
    { id: 4, name: 'Emily Rodriguez', position: 'Sales Representative', department: 'Sales', baseSalary: 4200 },
    { id: 5, name: 'David Kim', position: 'Financial Analyst', department: 'Finance', baseSalary: 5100 },
    { id: 6, name: 'Jessica Lee', position: 'Operations Manager', department: 'Operations', baseSalary: 5500 },
    { id: 7, name: 'Robert Taylor', position: 'Backend Developer', department: 'Engineering', baseSalary: 5200 },
    { id: 8, name: 'Amanda White', position: 'HR Specialist', department: 'Human Resources', baseSalary: 4700 }
  ];

  // Payroll periods
  const payrollPeriods = ['April 2025', 'May 2025', 'June 2025'];

  // Handle select all employees
  const handleSelectAllEmployees = (checked: boolean) => {
    setAllEmployeesSelected(checked);
    if (checked) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  // Handle select individual employee
  const handleSelectEmployee = (employeeId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
      if (selectedEmployees.length + 1 === employees.length) {
        setAllEmployeesSelected(true);
      }
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
      setAllEmployeesSelected(false);
    }
  };

  // Start payroll run
  const handleStartPayrollRun = () => {
    setIsRunPayrollDialogOpen(true);
  };

  // Go to next step in payroll wizard
  const handleNextStep = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      // Complete payroll run
      setIsRunPayrollDialogOpen(false);
      toast({
        title: "Payroll Run Completed",
        description: `${currentPeriod} payroll has been processed successfully for ${selectedEmployees.length} employees.`,
      });
    }
  };

  // Handle download report
  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportType} for ${currentPeriod} will download shortly.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Payroll Management</h1>
        <Button onClick={handleStartPayrollRun} className="flex gap-2">
          <Calendar className="h-4 w-4" />
          Run Payroll
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Payroll Overview</CardTitle>
          <CardDescription>Current month and upcoming payrolls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stats-card">
              <p className="text-sm font-medium text-gray-500">Next Payroll Date</p>
              <p className="text-2xl font-bold mt-1">April 30, 2025</p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>In 24 days</span>
              </div>
            </div>

            <div className="stats-card">
              <p className="text-sm font-medium text-gray-500">Employees to Process</p>
              <p className="text-2xl font-bold mt-1">73</p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span>All departments</span>
              </div>
            </div>

            <div className="stats-card">
              <p className="text-sm font-medium text-gray-500">Estimated Total</p>
              <p className="text-2xl font-bold mt-1">$92,300</p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <span>+2% from last month</span>
              </div>
            </div>

            <div className="stats-card">
              <p className="text-sm font-medium text-gray-500">Approval Status</p>
              <p className="text-2xl font-bold mt-1">Pending</p>
              <div className="mt-2">
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
          <TabsTrigger value="reports">Payroll Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Past Payrolls</CardTitle>
              <CardDescription>View and manage previous payroll runs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell className="font-medium">{payroll.period}</TableCell>
                      <TableCell>{payroll.date}</TableCell>
                      <TableCell>{payroll.employees}</TableCell>
                      <TableCell>{payroll.totalGross}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {payroll.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadReport('Payroll Summary')}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generate and download payroll reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center" 
                        onClick={() => handleDownloadReport('Payroll Summary')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Payroll Summary</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center"
                        onClick={() => handleDownloadReport('Tax Report')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Tax Report</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center"
                        onClick={() => handleDownloadReport('Benefits Report')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Benefits Report</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center"
                        onClick={() => handleDownloadReport('Employee Earnings')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Employee Earnings</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center"
                        onClick={() => handleDownloadReport('Deductions Report')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Deductions Report</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center"
                        onClick={() => handleDownloadReport('Custom Report')}>
                  <FileText className="h-8 w-8 mb-2" />
                  <span>Custom Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Run Payroll Dialog */}
      <Dialog open={isRunPayrollDialogOpen} onOpenChange={setIsRunPayrollDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Run Payroll Wizard</DialogTitle>
            <DialogDescription>
              Step {activeStep} of 4: {
                activeStep === 1 ? 'Select Payroll Period' :
                activeStep === 2 ? 'Select Employees' :
                activeStep === 3 ? 'Add Adjustments' :
                'Review and Submit'
              }
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Select Period */}
          {activeStep === 1 && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payroll-period">Payroll Period</Label>
                  <Select 
                    defaultValue={currentPeriod}
                    onValueChange={setCurrentPeriod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      {payrollPeriods.map(period => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-date">Payment Date</Label>
                  <Input
                    id="payment-date"
                    type="date"
                    defaultValue="2025-04-30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payroll-notes">Payroll Notes (Optional)</Label>
                  <Input
                    id="payroll-notes"
                    placeholder="Add any notes for this payroll run"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Employees */}
          {activeStep === 2 && (
            <div className="py-4">
              <div className="flex items-center space-x-2 pb-4">
                <Checkbox 
                  id="select-all" 
                  checked={allEmployeesSelected}
                  onCheckedChange={handleSelectAllEmployees}
                />
                <Label htmlFor="select-all">Select All Employees</Label>
              </div>

              <div className="overflow-y-auto max-h-80">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Base Salary</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="p-2">
                          <Checkbox 
                            id={`employee-${employee.id}`}
                            checked={selectedEmployees.includes(employee.id)}
                            onCheckedChange={(checked) => handleSelectEmployee(employee.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-xs text-gray-500">{employee.position}</div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>${employee.baseSalary.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                Selected {selectedEmployees.length} of {employees.length} employees
              </div>
            </div>
          )}

          {/* Step 3: Add Adjustments */}
          {activeStep === 3 && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Add Bonuses, Commissions, or Other Adjustments</Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Apply one-time adjustments to this payroll run
                  </p>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Adjustment Type</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map(emp => (
                                <SelectItem key={emp.id} value={emp.id.toString()}>{emp.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bonus">Bonus</SelectItem>
                              <SelectItem value="commission">Commission</SelectItem>
                              <SelectItem value="overtime">Overtime</SelectItem>
                              <SelectItem value="deduction">Deduction</SelectItem>
                              <SelectItem value="allowance">Allowance</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Amount" type="number" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Button variant="outline" className="mt-2">
                    + Add Another Adjustment
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review and Submit */}
          {activeStep === 4 && (
            <div className="py-4">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-100 p-4 rounded-md">
                  <h3 className="font-medium text-green-800">Payroll Summary</h3>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Period:</span>
                      <span className="font-medium">{currentPeriod}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Employees to Process:</span>
                      <span className="font-medium">{selectedEmployees.length}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Base Salaries:</span>
                      <span className="font-medium">
                        ${employees
                          .filter(emp => selectedEmployees.includes(emp.id))
                          .reduce((sum, emp) => sum + emp.baseSalary, 0)
                          .toLocaleString()}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Adjustments:</span>
                      <span className="font-medium">$0.00</span>
                    </li>
                    <li className="flex justify-between border-t border-green-200 mt-2 pt-2">
                      <span>Estimated Total:</span>
                      <span className="font-medium">
                        ${employees
                          .filter(emp => selectedEmployees.includes(emp.id))
                          .reduce((sum, emp) => sum + emp.baseSalary, 0)
                          .toLocaleString()}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approval-note">Note for Approver (Optional)</Label>
                  <Input
                    id="approval-note"
                    placeholder="Add any notes for the approver"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="confirm-payroll" />
                  <Label htmlFor="confirm-payroll" className="text-sm">
                    I confirm that I have reviewed the payroll details and they are accurate.
                  </Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {activeStep > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            )}
            <Button onClick={handleNextStep}>
              {activeStep < 4 ? (
                <>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : 'Submit Payroll'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyPayroll;
