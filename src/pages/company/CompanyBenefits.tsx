
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Plus, Trash2 } from 'lucide-react';

const CompanyBenefits = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('deductions');
  const [formType, setFormType] = useState('deduction');
  
  const deductions = [
    { id: 1, name: 'Income Tax', type: 'Tax', amount: '15%', assignedTo: 'Global', taxable: false },
    { id: 2, name: 'Social Security', type: 'Statutory', amount: '6%', assignedTo: 'Global', taxable: false },
    { id: 3, name: 'Health Insurance', type: 'Insurance', amount: '$120', assignedTo: 'Global', taxable: false },
    { id: 4, name: 'Union Dues', type: 'Other', amount: '$45', assignedTo: 'Selected Employees', taxable: true },
  ];
  
  const benefits = [
    { id: 1, name: 'Health Insurance Premium', type: 'Insurance', amount: '$200', assignedTo: 'Global', taxable: true },
    { id: 2, name: 'Transportation Allowance', type: 'Allowance', amount: '$150', assignedTo: 'Global', taxable: true },
    { id: 3, name: 'Meal Allowance', type: 'Allowance', amount: '$100', assignedTo: 'Global', taxable: true },
    { id: 4, name: 'Performance Bonus', type: 'Bonus', amount: 'Variable', assignedTo: 'Selected Employees', taxable: true },
  ];

  const handleAddNew = (type) => {
    setFormType(type);
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Deductions & Benefits</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="deductions">
            Deductions
          </TabsTrigger>
          <TabsTrigger value="benefits">
            Benefits
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="deductions" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between">
              <div>
                <CardTitle>Deductions</CardTitle>
                <CardDescription>Manage employee payroll deductions</CardDescription>
              </div>
              <Button 
                className="mt-4 sm:mt-0" 
                onClick={() => handleAddNew('deduction')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Deduction
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                    <TableHead className="hidden md:table-cell">Taxable</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductions.map((deduction) => (
                    <TableRow key={deduction.id}>
                      <TableCell className="font-medium">{deduction.name}</TableCell>
                      <TableCell>{deduction.type}</TableCell>
                      <TableCell>{deduction.amount}</TableCell>
                      <TableCell className="hidden md:table-cell">{deduction.assignedTo}</TableCell>
                      <TableCell className="hidden md:table-cell">{deduction.taxable ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="benefits" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between">
              <div>
                <CardTitle>Benefits</CardTitle>
                <CardDescription>Manage employee benefits and allowances</CardDescription>
              </div>
              <Button 
                className="mt-4 sm:mt-0" 
                onClick={() => handleAddNew('benefit')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Benefit
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                    <TableHead className="hidden md:table-cell">Taxable</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benefits.map((benefit) => (
                    <TableRow key={benefit.id}>
                      <TableCell className="font-medium">{benefit.name}</TableCell>
                      <TableCell>{benefit.type}</TableCell>
                      <TableCell>{benefit.amount}</TableCell>
                      <TableCell className="hidden md:table-cell">{benefit.assignedTo}</TableCell>
                      <TableCell className="hidden md:table-cell">{benefit.taxable ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add {formType === 'deduction' ? 'Deduction' : 'Benefit'}</DialogTitle>
            <DialogDescription>
              Create a new {formType === 'deduction' ? 'deduction' : 'benefit'} for your employees.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" placeholder={`${formType === 'deduction' ? 'Health Insurance' : 'Transportation Allowance'}`} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {formType === 'deduction' ? (
                    <>
                      <SelectItem value="tax">Tax</SelectItem>
                      <SelectItem value="statutory">Statutory</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="loan">Loan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="allowance">Allowance</SelectItem>
                      <SelectItem value="reimbursement">Reimbursement</SelectItem>
                      <SelectItem value="bonus">Bonus</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input id="amount" className="col-span-3" placeholder="$100 or 5%" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assigned" className="text-right">
                Assigned To
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global (All Employees)</SelectItem>
                  <SelectItem value="selected">Selected Employees</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taxable" className="text-right">
                Taxable
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch id="taxable" />
                <Label htmlFor="taxable">This {formType} is taxable</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompanyBenefits;
